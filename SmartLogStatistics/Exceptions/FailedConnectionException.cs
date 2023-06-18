namespace SmartLogStatistics.Exceptions {

    /// <summary>
    /// Eccezione che rappresenta una connesione fallita con il database
    /// </summary>
    public class FailedConnectionException: Exception {
        /// <summary>
        /// Codice numerico associato all'errore
        /// </summary>
        public int Code { get; private set; }

        /// <summary>
        /// Crea un nuovo oggetto impostando codice e messaggio dell'errore
        /// </summary>
        public FailedConnectionException(): base("Connessione con il database fallita") {
            Code = 4;
        }
    }

}
