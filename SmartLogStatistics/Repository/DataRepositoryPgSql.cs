using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Data.Common;
using System.Data;
using Microsoft.JSInterop;

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
          
            var query = from line in context.Log
                        join firm in context.Firmware
                        on new { line.file_id, line.unit, line.subunit } equals new { firm.file_id, firm.unit, firm.subunit}
                        group line by new { line.code, data = (data ? line.date : DateOnly.MinValue), firmware = (firmware ? firm.INI_file_name : ""), unit = (unit ? firm.unit : 0), subunit = (subunit ? firm.subunit : 0) } into g
                        select new { key = g.Key, count = g.Count() };

            List<LogRowEnhanced> logRowEnhanceds = new();

            query.ToList().ForEach(r =>
                 logRowEnhanceds.Add(new LogRowEnhanced
                 {
                     Code = r.key.code,
                     Date = data ? r.key.data : null,
                     Firmware = firmware ? r.key.firmware : null,
                     Unit = unit ? r.key.unit : null,
                     SubUnit = subunit ? r.key.subunit : null,
                     Frequency = r.count
                 })
            );

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

            //Se l'intervallo temporale
            int interval = (end - start).TotalDays < 31 ? 1 : 24;

            for (var day = start; day <= end; day = day.AddHours(interval))
            {
                records.Add(new CumulativeRecord
                {
                    dateTime = day,
                    EventOccurencies = eventsFiltered.Where(e => e.date < DateOnly.FromDateTime(day)).Count(),
                });
            }

            return new CumulativeDto
            {
                Code = code,
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
