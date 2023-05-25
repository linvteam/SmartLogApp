using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Data.Common;
using System.Data;

namespace SmartLogStatistics.Repository {

    [Core.Injectables.Singleton(typeof(DataRepository))]
    public class DataRepositoryPgSql : DataRepository {

        private readonly SmartLogContext context;

        public DataRepositoryPgSql(SmartLogContext context)
        {
            this.context = context;
        }



        /// <summary>
        /// Ottieni la frequenza di occorrenza raggruppata almeno per code
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="data">Attiva il raggruppamento per data</param>
        /// <param name="firmware">Attiva il raggruppamento per firmware</param>
        /// <param name="unit">Attiva il raggruppamento per unit</param>
        /// <param name="subunit">Attiva il raggruppamento per subunit</param>
        /// <returns>Oggetto che contiene la frequenza di occorrenza degli eventi, con eventuale raggruppamento</returns>
        public FrequencyDto Frequency(DateTime start, DateTime end, bool data, bool firmware, bool unit, bool subunit)
        {
          
            StringBuilder stringBuilder = new();

            string groups = stringBuilder.Append(data ? "l.date," : "")
                                         .Append(firmware ? "f.\"INI_file_name\"," : "")
                                         .Append(unit ? "l.unit," : "")
                                         .Append(subunit ? "l.subunit," : "")
                                         .ToString();

            string groupByString = groups.Length > 0 ? ("," + groups.Remove(groups.Length - 1)) : groups;

            DbCommand command = context.Log.CreateDbCommand();

            command.CommandText = $"SELECT l.code,{groups}COUNT(*) FROM public.\"Log\" l LEFT JOIN public.\"Firmware\" f ON l.file_id = f.file_id AND l.unit = f.unit AND l.subunit =f.subunit  WHERE l.date > '{DateOnly.FromDateTime(start)}' AND l.date < '{DateOnly.FromDateTime(end)}' GROUP BY l.code{groupByString}";
            command.Connection = context.Database.GetDbConnection();
            command.Connection.Open();

            DbDataReader reader = command.ExecuteReader();
            DataTable dataTable = new();
            dataTable.Load(reader);

            if (dataTable.Rows.Count == 0) {
               throw new EmptyOrFailedQuery();
            }

            List<LogRowEnhanced> logRowEnhanceds = new();

            foreach ( DataRow row in dataTable.Rows)
            {
                LogRowEnhanced logRow = new()
                {
                    Code = Convert.ToString(row["code"]),
                    Frequency = Convert.ToInt32(row["count"])
                };

                if (data)
                    logRow.Date = DateOnly.FromDateTime(Convert.ToDateTime(row["date"]));
                if (firmware)
                    logRow.Firmware = Convert.ToString(row["INI_file_name"]);
                if (unit)
                    logRow.Unit = Convert.ToInt32(row["unit"]);
                if (subunit)
                    logRow.SubUnit = Convert.ToInt32(row["subunit"]);

                logRowEnhanceds.Add(logRow);
            }

            return new FrequencyDto
            {
                events = logRowEnhanceds,
            };
        }

        /// <summary>
        /// Ottieni l'analisi cumulativa di log degli eventi
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Code dell'evento da considerare</param>
        /// <returns>Oggetto contenente l'andamento cumulativo</returns>
        public CumulativeDto Cumulative(DateTime start, DateTime end, string code)
        {
            var filterByDateAndCode = (Log log) =>
            {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end && log.code == code;
            };

            var eventsFiltered = context.Log.Where(e => filterByDateAndCode(e));

            if (eventsFiltered.ToList().Count == 0)
            {
                throw new EmptyOrFailedQuery();
            }

            var records = new List<CumulativeRecord>();

            for (var day = start; start <= end; day = day.AddDays(1))
            {
                records.Add(new CumulativeRecord
                {
                    dateTime = day,
                    EventOccurencies = eventsFiltered.Where(e => e.date < DateOnly.FromDateTime(day)).Count(),
                });
            }

            return new CumulativeDto
            {
                records = records,
            };
        }

        /// <summary>
        /// Ottieni il numero di occorrenze per ogni code 
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <returns>Oggetto che raggruppa per ogni code il numero di occorrenze</returns>
        public TotalByCodeDto TotalByCode(DateTime start, DateTime end)
        {
            var filterByDate = (Log log) =>
            {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            };

            var eventsFiltered = context.Log.Where(e => filterByDate(e));

            if (eventsFiltered.ToList().Count == 0)
            {
                throw new EmptyOrFailedQuery();
            }


            var eventGroups = eventsFiltered.GroupBy(e => e.code)
                                            .Select(group => new CodeOccurrence { Code = group.Key, EventOccurrences = group.Count()})
                                            .ToList();

            return new TotalByCodeDto { CodeOccurences = eventGroups };
        }

        /// <summary>
        /// Ottieni il numero di occorrenze di un evento raggruppate per code e firmware
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Codice dell'evento voluto</param>
        /// <returns>Ritorna il numero di occorrenze dell'evento raggruppate per firmware</returns>
        public TotalByFirmwareDto TotalByFirmware(DateTime start, DateTime end, string code)
        {
            var filterByDateAndCode = (Log log) =>
            {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end && log.code == code;
            };

            var eventsFiltered = context.Log.Where(e => filterByDateAndCode(e));

            if (eventsFiltered.ToList().Count == 0) {
                throw new EmptyOrFailedQuery();
            }

            var result = eventsFiltered.Join(context.Firmware,
                                             line => new { line.file_id, line.unit, line.subunit },
                                             f => new { f.file_id, f.unit, f.subunit },
                                             (line, f) => new
                                             {
                                                 firmware = f.INI_file_name,
                                                 line.file_id,
                                                 line.code,
                                                 line.unit,
                                                 line.subunit,
                                             })
                                        .GroupBy(e => e.firmware)
                                        .Select(group => new FirmwareOccurrence { Firmware = group.Key, EventOccurrences = group.Count() })
                                        .ToList();
                         
            return new TotalByFirmwareDto
            {
                FirmwareOccurrences = result,
            };
        }
    }
}
