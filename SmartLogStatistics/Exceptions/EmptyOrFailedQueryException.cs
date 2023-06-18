namespace SmartLogStatistics.Exceptions {
    /// <summary>
    /// Eccezione che rappresenta il caso di query fallita o che non produce un risultato
    /// </summary>
    public class EmptyOrFailedQueryException: Exception {

        /// <summary>
        /// Codice numerico associato all'eccezione
        /// </summary>
        public int Code { get; private set; }

        /// <summary>
        /// Crea un nuovo oggetto impostando codice e messaggio dell'errore
        /// </summary>
        public EmptyOrFailedQueryException(): base("La query non ha prodotto risultati") {
            this.Code = 5;
        }

    }
}
