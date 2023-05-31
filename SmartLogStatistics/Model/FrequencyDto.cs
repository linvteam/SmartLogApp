using Newtonsoft.Json;
using System.Diagnostics;

namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta le frequenze di occorrenza degli eventi raggruppati per certi campi
    /// </summary>
    public class FrequencyDto {

        /// <summary>
        /// Gli eventi raggruppati e la loro frequenza di occorrenza
        /// </summary>
        public List<LogRowEnhanced> Events { get; set; }

        /// <summary>
        /// Lista dei campi sui quali si sta raggruppando
        /// </summary>
        public List<string> GroupBy { get; set; }

        /// <summary>
        /// Data di inizio dell'analisi
        /// </summary>
        public DateTime Start { get; set; }

        /// <summary>
        /// Data di fine dell'analisi
        /// </summary>
        public DateTime End { get; set; }

        /// <summary>
        /// Oggetto che rappresenta le frequenze di occorrenza degli eventi raggruppati per certi campi
        /// </summary>
        /// <param name="start">La data di inizio dell'analisi</param>
        /// <param name="end">La data di fine dell'analisi</param>
        /// <param name="events">Gli eventi raggruppati e la loro frequenza di occorrenza</param>
        /// <param name="groupBy">La lista di capmi per cui si è raggruppato</param>
        public FrequencyDto(DateTime start, DateTime end, List<LogRowEnhanced> events, List<string> groupBy) {
            Events = events;
            GroupBy = groupBy;
            Start = start;
            End = end;
        }
    }
}
