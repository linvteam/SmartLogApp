using NuGet.Protocol.Plugins;
using System.Security.Policy;

namespace SmartLogStatistics.Model {
    /// <summary>
    /// Classe contenente le statistiche di analisi dei log. È un contenitore per coppie chiave di tipo string, valore di tipo double, con date di inizio e fine analisi
    /// </summary>
    public class StatisticsDto {
        /// <summary>
        /// Classe rappresentante una singola statistica calcolata, rappresentata da una coppia chiave di tipo string e valore di tipo double
        /// </summary>
        public class Statistic {
            /// <summary>
            /// Il nome della statistica da rappresentare
            /// </summary>
            public string Name { get; private set; }
            /// <summary>
            /// Il valore calcolato della statistica
            /// </summary>
            public double Value { get; private set; }

            /// <summary>
            /// Crea una nuova statistica assengnadone i valori
            /// </summary>
            /// <param name="name">Il nome della statistica</param>
            /// <param name="value">Il valore calcolato della statistica</param>
            public Statistic(string name, double value) {
                Name = name;
                Value = value;
            }
        }

        /// <summary>
        /// La data di inizio dell'analisi su cui sono state calcolate le statistiche
        /// </summary>
        public DateTime StartDate { get; private set; }
        /// <summary>
        /// La data di fine dell'analisi su cui sono state calcolate le statistiche
        /// </summary>
        public DateTime EndDate { get; private set; }
        /// <summary>
        /// La lista di statistiche calcolate
        /// </summary>
        public List<Statistic> Statistics { get; private set; }

        /// <summary>
        /// Crea un nuovo oggetto con tutte le statistiche calcolate al suo interno
        /// </summary>
        /// <param name="startDate">La data di inizio dell'analisi</param>
        /// <param name="endDate">La data di fine dell'analisi</param>
        /// <param name="statistics">La lista di statistiche calcolate</param>
        public StatisticsDto(DateTime startDate, DateTime endDate, List<Statistic> statistics) {
            StartDate = startDate;
            EndDate = endDate;
            Statistics = statistics;
        }
    }
}
