using MessagePack;

namespace SmartLogStatistics.Exceptions {

    /// <summary>
    /// Eccezione lanciata quando si tenta di caricare un file già presente
    /// </summary>
    public class FileConflictException : Exception {

        public int Code { get; private set; }
        public FileConflictException() : base("Il file è già stato salvato nel database")
        { 
            Code = 2;
        }

    }
}
