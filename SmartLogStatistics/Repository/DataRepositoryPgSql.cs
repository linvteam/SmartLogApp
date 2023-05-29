using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Data.Common;
using System.Data;
using Microsoft.JSInterop;

namespace SmartLogStatistics.Repository {

    /// <summary>
    /// Classe per ottenere le statistiche sugli eventi prelevati dal database PostgreSQL
    /// </summary>
    [Core.Injectables.Singleton(typeof(DataRepository))]
    public class DataRepositoryPgSql : DataRepository {

        private readonly SmartLogContext context;

        /// <summary>
        /// Costruisce un nuovo oggetto di tipo DataRepositoryPgSql
        /// </summary>
        /// <param name="context">Il database da cui prelevare i dati</param>
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
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Oggetto che contiene la frequenza di occorrenza degli eventi, con eventuale raggruppamento</returns>
        public FrequencyDto Frequency(DateTime start, DateTime end, bool data, bool firmware, bool unit, bool subunit) {

            var filterByDate = (Log log) => {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            };

            //Raccolgo i dati nell'intervallo temporale selezionato
            var eventsFiltered = context.Log.Where(e => filterByDate(e));

            double eventCount = eventsFiltered.Count();

            //Se non trovo nulla lancio un eccezione
            if (eventCount == 0) {
                throw new EmptyOrFailedQuery();
            }

            //Faccio un join con la tabella firmware in caso si è scelto di raggruppare per firmware, poi ottengo le frequenze di occorrenza
            //Se un campo non è stato scelto il suo valore viene rimpiazzato da un valore fittizio, in modo da simulare un group by condizionale
            var query = from line in eventsFiltered
                        join firm in context.Firmware
                        on new { line.file_id, line.unit, line.subunit } equals new { firm.file_id, firm.unit, firm.subunit}
                        group line by new { line.code, data = (data ? line.date : DateOnly.MinValue), 
                                            firmware = (firmware ? firm.INI_file_name : ""), 
                                            unit = (unit ? firm.unit : 0), 
                                            subunit = (subunit ? firm.subunit : 0) } into g
                        select new { key = g.Key, count = (g.Count() / eventCount) };

            List<LogRowEnhanced> logRowEnhanceds = new();

            //Creo le righe con le frequenze, mettendo a null i campi non richiesti
            query.ToList().ForEach(r =>
                 logRowEnhanceds.Add(new LogRowEnhanced(r.key.code, r.count, data ? r.key.data : null, firmware ? r.key.firmware : null, unit ? r.key.unit : null, subunit ? r.key.subunit : null))
            );

            //Ritorno i dati al controller
            return new FrequencyDto(logRowEnhanceds);
        }

        /// <summary>
        /// Ottieni l'analisi cumulativa di log degli eventi
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Code dell'evento da considerare</param>
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Oggetto contenente l'andamento cumulativo</returns>
        public CumulativeDto Cumulative(DateTime start, DateTime end, string code)
        {
            var filterByDateAndCode = (Log log) => {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end && log.code == code;
            };

            //Raccolgo i dati nell'intervallo temporale selezionato e cerco il code che mi interessa
            var eventsFiltered = context.Log.Where(e => filterByDateAndCode(e))
                                            .OrderBy(e => e.date)
                                            .ToArray();

            //Se non trovo nulla lancio un eccezione
            if (eventsFiltered.Length == 0) {
                throw new EmptyOrFailedQuery();
            }

            var records = new List<CumulativeRecord>();

            for(var i = 0;i< eventsFiltered.Length; i++) {
                records.Add(new CumulativeRecord(eventsFiltered[i].date.ToDateTime(eventsFiltered[i].time),i + 1));
            }   

            //Ritorno i record al controller
            return new CumulativeDto(code,records);
        }

        /// <summary>
        /// Ottieni il numero di occorrenze per ogni code 
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <exception cref="EmptyOrFailedQuery">Eccezione lanciata quando non sono stati trovati dati nell'intervallo temporale</exception>
        /// <returns>Oggetto che raggruppa per ogni code il numero di occorrenze</returns>
        public TotalByCodeDto TotalByCode(DateTime start, DateTime end)
        {
            var filterByDate = (Log log) => {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            };

            //Raccolgo i dati nell'intervallo temporale selezionato
            var eventsFiltered = context.Log.Where(e => filterByDate(e));

            //Se non trovo nulla lancio un eccezione
            if (eventsFiltered.ToList().Count == 0) {
                throw new EmptyOrFailedQuery();
            }

            //Ottengo i ragruppamenti per code e il numero di occorrenze
            var eventGroups = eventsFiltered.GroupBy(e => e.code)
                                            .Select(group => new CodeOccurrence(group.Key,group.Count()))
                                            .ToList();

            //Ritorno i dati al controller
            return new TotalByCodeDto(eventGroups);
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

            var filterByDateAndCode = (Log log) => {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end && log.code == code;
            };

            //Raccolgo i dati nell'intervallo temporale selezionato e cerco il code che mi interessa
            var eventsFiltered = context.Log.Where(e => filterByDateAndCode(e));

            //Se non trovo nulla lancio un eccezione
            if (eventsFiltered.ToList().Count == 0) {
                throw new EmptyOrFailedQuery();
            }

            //Faccio il join con Firmware per ottenere i firmare associati agli eventi, poi ottenog il numero di occorenze per firmware
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
                                        .Select(group => new FirmwareOccurrence(group.Key, group.Count()))
                                        .ToList();
            
            //Ritorno i dati al controller
            return new TotalByFirmwareDto(result);
        }
    }
}
