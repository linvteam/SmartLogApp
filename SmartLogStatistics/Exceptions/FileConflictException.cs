using MessagePack;

namespace SmartLogStatistics.Exceptions {

    /// <summary>
    /// Eccezione lanciata quando si tenta di caricare un file già presente nel database
    /// </summary>
    public class FileConflictException : Exception {

        /// <summary>
        /// Codice numerico associato all'eccezione
        /// </summary>
        public int Code { get; private set; }

        /// <summary>
        /// Crea un nuovo oggetto impostando codice e messaggio dell'errore
        /// </summary>
        public FileConflictException() : base("Il file è già stato salvato nel database")
        { 
            Code = 2;
        }

    }
}
