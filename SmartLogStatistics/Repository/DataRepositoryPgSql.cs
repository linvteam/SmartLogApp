using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using System.Data;

namespace SmartLogStatistics.Repository {

    /// <summary>
    /// Classe per ottenere le statistiche sugli eventi prelevati dal database PostgreSQL
    /// </summary>
    [Core.Injectables.Singleton(typeof(DataRepository))]
    public class DataRepositoryPgSql: DataRepository {

        private readonly SmartLogContext context;

        /// <summary>
        /// Costruisce un nuovo oggetto di tipo DataRepositoryPgSql
        /// </summary>
        /// <param name="context">Il database da cui prelevare i dati</param>
        public DataRepositoryPgSql(SmartLogContext context) {
            this.context = context;
        }

        /// <summary>
        /// Record per unire i dati di interesse di log e firmware
        /// </summary>
        /// <param name="Code">Il campo "Code" del log</param>
        /// <param name="Unit">Unit che ha scatenato l'evento</param>
        /// <param name="SubUnit">SubUnit che ha scatenato l'evento</param>
        /// <param name="Date">La data in cui è stato registrato l'evento</param>
        /// <param name="Time">L'ora in cui è stato registrato l'evento</param>
        /// <param name="Firmware">Il firmware installato nel macchinario al momento della registrazione dell'evento</param>
        private sealed record LogWithFirmware(string Code, int Unit, int SubUnit, DateOnly Date, TimeOnly Time, string Firmware);

        /// <summary>
        /// Record per indicare a LINQ i campi su cui fare join
        /// </summary>
        /// <param name="Code">Il campo "Code" del log</param>
        /// <param name="Unit">Unit che ha scatenato l'evento</param>
        /// <param name="SubUnit">SubUnit che ha scatenato l'evento</param>
        /// <param name="Date">La data in cui è stato registrato l'evento</param>
        /// <param name="Firmware">Il firmware installato nel macchinario al momento della registrazione dell'evento</param>
        private sealed record GroupedFields(string Code, int? Unit, int? SubUnit, DateOnly? Date, string? Firmware);

        /// <summary>
        /// Ottieni la frequenza di occorrenza raggruppata almeno per code
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="date">Attiva il raggruppamento per data</param>
        /// <param name="firmware">Attiva il raggruppamento per firmware</param>
        /// <param name="unit">Attiva il raggruppamento per unit</param>
        /// <param name="subunit">Attiva il raggruppamento per subunit</param>
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Oggetto che contiene la frequenza di occorrenza degli eventi, con eventuale raggruppamento</returns>
        public FrequencyDto Frequency(DateTime start, DateTime end, bool date, bool firmware, bool unit, bool subunit) {

            // Funzione per filtrare i log per data/ora
            bool filterByDate(LogWithFirmware log) {
                DateTime logdatetime = new(log.Date.Year, log.Date.Month, log.Date.Day, log.Time.Hour, log.Time.Minute, log.Time.Second, log.Time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            }

            // Funzione per impostare i campi di raggruppamento
            GroupedFields GroupingSelector(LogWithFirmware r) {
                return new GroupedFields(r.Code, unit ? r.Unit : null, subunit ? r.SubUnit : null, date ? r.Date : null, firmware ? r.Firmware : null);
            }

            //Faccio un join con la tabella firmware in caso si è scelto di raggruppare per firmware, poi ottengo le frequenze di occorrenza
            //Se un campo non è stato scelto il suo valore viene rimpiazzato da un valore fittizio, in modo da simulare un group by condizionale
            var query = context.Log.Join(context.Firmware,
                                         x => new { x.unit, x.subunit, x.file_id },
                                         x => new { x.unit, x.subunit, x.file_id },
                                         (log, firm) => new LogWithFirmware(log.code, log.unit, log.subunit, log.date, log.time, firm.INI_file_name))
                                   .Where(filterByDate)
                                   .GroupBy(GroupingSelector)
                                   .Select(x => new { key = x.Key, count = x.Count() });

            List<LogRowEnhanced> logRowEnhanceds = new();

            var events = query.ToList();

            //Se non trovo nulla lancio un eccezione
            double count = events.Sum(x => x.count);
            if(count == 0) {
                throw new EmptyOrFailedQuery();
            }

            //Creo le righe con le frequenze, mettendo a null i campi non richiesti
            query.ToList().ForEach(r =>
                 logRowEnhanceds.Add(new LogRowEnhanced(r.key.Code, r.count / count, date ? r.key.Date : null, firmware ? r.key.Firmware : null, unit ? r.key.Unit : null, subunit ? r.key.SubUnit : null))
            );

            // Popolo la lista dei capi su cui si è raggruppato
            List<string> groupBy = new() { "code" };
            if(date) {
                groupBy.Add("date");
            }
            if(firmware) {
                groupBy.Add("firmware");
            }
            if(unit) {
                groupBy.Add("unit");
            }
            if(subunit) {
                groupBy.Add("subUnit");
            }

            //Ritorno i dati al controller
            return new FrequencyDto(start, end, logRowEnhanceds, groupBy);
        }

        /// <summary>
        /// Ottieni l'analisi cumulativa di log degli eventi
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Code dell'evento da considerare</param>
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Oggetto contenente l'andamento cumulativo</returns>
        public CumulativeDto Cumulative(DateTime start, DateTime end, string code) {

            bool filterByDateAndCode(Log log) {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end && log.code == code;
            };

            //Raccolgo i dati nell'intervallo temporale selezionato e cerco il code che mi interessa
            var eventsFiltered = context.Log.Where(filterByDateAndCode)
                                            .OrderBy(e => e.date)
                                            .Select(x => new {x.code, x.date, x.time })
                                            .ToList();

            //Se non trovo nulla lancio un eccezione
            if(!eventsFiltered.Any()) {
                throw new EmptyOrFailedQuery();
            }

            var records = new List<CumulativeRecord>();

            int i = 1;
            foreach(var e in eventsFiltered) {
                records.Add(new CumulativeRecord(e.date.ToDateTime(e.time), i++));
            }

            //Ritorno i record al controller
            return new CumulativeDto(start, end, code, records);
        }

        /// <summary>
        /// Ottieni il numero di occorrenze per ogni code 
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Oggetto che raggruppa per ogni code il numero di occorrenze</returns>
        public TotalByCodeDto TotalByCode(DateTime start, DateTime end) {
            bool filterByDate(Log log) {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            }

            //Ottengo i ragruppamenti per code e il numero di occorrenze
            var eventGroups = context.Log.Where(filterByDate)
                                         .GroupBy(e =>  e.code)
                                         .Select(group => new CodeOccurrence(group.Key, group.Count()))
                                         .ToList();

            // Se non ho eventi lancio un'eccezione
            if(eventGroups.Count == 0) {
                throw new EmptyOrFailedQuery();
            }

            //Ritorno i dati al controller
            return new TotalByCodeDto(start, end, eventGroups);
        }

        /// <summary>
        /// Ottieni il numero di occorrenze di un evento raggruppate per code e firmware
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Codice dell'evento voluto</param>
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Ritorna il numero di occorrenze dell'evento raggruppate per firmware</returns>
        public TotalByFirmwareDto TotalByFirmware(DateTime start, DateTime end, string code) {

            bool filterByDateAndCode(LogWithFirmware log)  {
                DateTime logdatetime = new(log.Date.Year, log.Date.Month, log.Date.Day, log.Time.Hour, log.Time.Minute, log.Time.Second, log.Time.Millisecond);
                return logdatetime >= start && logdatetime <= end && log.Code == code;
            }

            //Faccio il join con Firmware per ottenere i firmware associati agli eventi, filtro per data e poi ottengo il numero di occorenze per firmware
            var result = context.Log.Join(context.Firmware,
                                          line => new { line.file_id, line.unit, line.subunit },
                                          f => new { f.file_id, f.unit, f.subunit },
                                          (line, f) => new LogWithFirmware(line.code, line.unit, line.subunit, line.date, line.time, f.INI_file_name))
                                        .Where(filterByDateAndCode)
                                        .GroupBy(e => e.Firmware)
                                        .Select(group => new FirmwareOccurrence(group.Key, group.Count()))
                                        .ToList();

            if(result.Count == 0) {
                throw new EmptyOrFailedQuery();
            }

            //Ritorno i dati al controller
            return new TotalByFirmwareDto(start, end, code, result);
        }
    }
}
