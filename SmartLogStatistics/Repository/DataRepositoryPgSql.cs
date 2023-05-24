using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore;

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
            //var eventsFiltered = context.Log.Where(e => e.date > DateOnly.FromDateTime(start) && e.date < DateOnly.FromDateTime(end))
            //                                .Join(context.Event,
            //                                      l => l.code,
            //                                      e => e.code,
            //                                      (line, e) =>
            //                                         new Log
            //                                         {
            //                                             code = e.code,
            //                                             date = line.date,
            //                                             Event = e,
            //                                         });

            //if (firmware)
            //{
            //    eventsFiltered = eventsFiltered.Join(context.Firmware,
            //                                         l => new { val1 = l.Event.uni, val2 = x.Id }
            //}

            return new FrequencyDto
            {

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
            var eventsFiltered = context.Log.Where(e => e.date > DateOnly.FromDateTime(start) && e.date < DateOnly.FromDateTime(end) && e.code == code);

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
            var eventsFiltered = context.Log.Where(e => e.date > DateOnly.FromDateTime(start) && e.date < DateOnly.FromDateTime(end));

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
            var eventsFiltered = context.Log.Where(e => e.date > DateOnly.FromDateTime(start) && e.date < DateOnly.FromDateTime(end) && e.code == code);

            var result = eventsFiltered.Join(context.Firmware,
                                             line => new { line.file_id, line.unit, line.subunit },
                                             f => new { f.file_id, f.unit, f.subunit },
                                             (line, f) => new
                                             {
                                                 firmware = f.INI_file_name,
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
