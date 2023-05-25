namespace SmartLogStatistics.Exceptions {

    /// <summary>
    /// Eccezione lanciata quando si tenta di caricare un file già presente
    /// </summary>
    public class FileConflictException : Exception {

        public FileConflictException() : base() { }

        public FileConflictException(string message) : base(message) { }

        public FileConflictException(string message, Exception innerException) : base(message, innerException) { }

    }
}
