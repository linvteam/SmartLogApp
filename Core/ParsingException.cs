namespace Core {
    public class ParsingException: Exception {

        public int ErrorCode {
            get;
        }

        public ParsingException() : base() { }

        public ParsingException(string message, int errorCode = 0) : base(message) {
            ErrorCode = errorCode;
        }

        public ParsingException(string message, int errorCode, Exception innerException) : base(message, innerException) {
            ErrorCode = errorCode;
        }

    }
}
