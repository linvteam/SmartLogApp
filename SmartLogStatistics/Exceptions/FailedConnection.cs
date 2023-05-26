namespace SmartLogStatistics.Exceptions {
    /// <summary>
    /// Eccezione che rappresenta una connesione fallita con il database
    /// </summary>
    public class FailedConnection: Exception {
        /// <summary>
        /// Codice numerico associato all'erroe
        /// </summary>
        public int Code {  get; private set; }

        /// <summary>
        /// Crea un nuovo oggetto impostando codice e messaggio dell'errore
        /// </summary>
        public FailedConnection(): base("Connessione con il database fallita") {
            Code = 5;
        }
    }
}
