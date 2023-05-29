namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta il numero di occorrenze di un codice
    /// </summary>
    public class CodeOccurrence {

        /// <summary>
        /// Codice dell'evento
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Numero di occorenze del codice
        /// </summary>
        public int EventOccurrences { get; set; }

        /// <summary>
        /// Costruisce un oggetto contenente il numero di ooccorrenze di un certo codice
        /// </summary>
        /// <param name="code">Codice dell'evento</param>
        /// <param name="eventOccurrences">Numero di occorenze del codice</param>
        public CodeOccurrence(string code, int eventOccurrences) {
            Code = code;
            EventOccurrences = eventOccurrences;
        }
    }
}
