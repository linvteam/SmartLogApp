﻿namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta il numero di occorrenze di un codice
    /// </summary>
    public class CodeOccurrence {

        /// <summary>
        /// Codice dell'evento
        /// </summary>
        public string Code { get; private set; }

        /// <summary>
        /// Numero di occorrenze dell'evento
        /// </summary>
        public int EventOccurrences { get; private set; }

        /// <summary>
        /// Costruisce un oggetto contenente il numero di occorrenze di un certo evento
        /// </summary>
        /// <param name="code">Codice dell'evento</param>
        /// <param name="eventOccurrences">Numero di occorrenze del codice</param>
        public CodeOccurrence(string code, int eventOccurrences) {
            Code = code;
            EventOccurrences = eventOccurrences;
        }
    }
}
