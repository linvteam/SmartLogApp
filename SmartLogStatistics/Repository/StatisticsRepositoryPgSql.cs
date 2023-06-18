using Microsoft.CodeAnalysis.CSharp.Syntax;
using SmartLogStatistics.Model;
using System.Collections.Immutable;
using System.Diagnostics;

namespace SmartLogStatistics.Repository {
    /// <summary>
    /// Classe che gestisce il fetch dal database delle statistiche generali
    /// </summary>
    [Core.Injectables.Transient(typeof(StatisticsRepository))]
    public class StatisticsRepositoryPgSql: StatisticsRepository {

        private readonly SmartLogContext context;

        /// <summary>
        /// Costruisce un nuovo oggetto di tipo StatisticRepositoryPgSql
        /// </summary>
        /// <param name="db">Il database da cui prelevare i dati</param>
        public StatisticsRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        /// <summary>
        /// Preleva le statistiche
        /// </summary>
        /// <param name="start">Data di inizio degli eventi da considerare</param>
        /// <param name="end">Data di fine degli eventi da considerare</param>
        /// <returns>Numero di file analizzati, numero massimo di eventi per log, media di eventi per log, deviazione standard del numero di eventi per file di log</returns>
        public StatisticsDto Statistics(DateTime start, DateTime end) {

            /// Questa query ha un potenziale problema di saturazione di memoria. 
            /// Per ora abbiamo cercato di ridurlo al minimo facendo un fetch solamente 
            /// del valore che ci serve e calcolando i valori delle statistiche al momento.
            /// Il problema deriva dall'oggetto ritornato dall'ultima Select della query, 
            /// un IEnumerable, che quando viene utilizzato con un metodo che prevede l'aggregazione
            /// dei dati in esso contenuti, svuota il contenitore,
            /// non permettendo altre chiamate di aggregazione dei dati.
            /// Per ora abbiamo risolto con un array di Integer, ma per sua natura è un potenziale rischio 
            /// di saturazione di memoria.
            /// 
            /// Abbiamo pensato di risolvere calcolando manualmente i valori consumando a mano i dati contenuti nel
            /// risultato della query. Questa soluzione però non permette di calcolare la deviazione standard 
            /// che prevede di conoscere a priori la media di eventi per file di log.

            bool filterByDate(Log log) {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            }

            try {
                var filesAndEventCount = context.Log.Where(filterByDate)
                                                    .Select(x => x)
                                                    .GroupBy(x => x.file_id)
                                                    .Select(x => x.Count()).ToArray();

                // Lancio questa eccezione quando viene rilevato che la query non ha prodotto risultati
                // Serve per rispettare la specifica tecnica
                if(filesAndEventCount.Length == 0) {
                    throw new Exceptions.EmptyOrFailedQueryException();
                }

                int NumberOfFiles = filesAndEventCount.Length;
                double MaxNumberOfEvent = filesAndEventCount.Max();
                double AverageNumberOfEvents = filesAndEventCount.Average();
                double StandardDeviation = Math.Sqrt(filesAndEventCount.Average(x => Math.Pow(x - AverageNumberOfEvents, 2)));

                return new StatisticsDto(start, end, new List<StatisticsDto.Statistic> {
                    new StatisticsDto.Statistic("Numero di file", NumberOfFiles),
                    new StatisticsDto.Statistic("Massimo numero di eventi", MaxNumberOfEvent),
                    new StatisticsDto.Statistic("Media di eventi", AverageNumberOfEvents),
                    new StatisticsDto.Statistic("Deviazione standard", StandardDeviation)
                });
            } catch(Exceptions.EmptyOrFailedQueryException) {
                throw;
            } catch {
                throw new Exceptions.FailedConnectionException();
            }
        }
    }
}
