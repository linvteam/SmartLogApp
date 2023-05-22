namespace SmartLogStatistics.Exceptions {
    public class FileConflictException : Exception {

        public FileConflictException() : base() { }

        public FileConflictException(string message) : base(message) { }

        public FileConflictException(string message, Exception innerException) : base(message, innerException) { }

    }
}
