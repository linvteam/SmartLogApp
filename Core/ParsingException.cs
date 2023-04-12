using System.Runtime.Serialization;

namespace Core {
    [Serializable()]
    public class ParsingException: Exception {

        public enum Code {
            FormatoErrato = 1,
            DatoErrato = 2
        }

        public int ErrorCode {
            get;
        }

        public ParsingException() : base() { }

        public ParsingException(string message, Code errorCode): base(message) {
            ErrorCode = (int)errorCode;
        }

        public ParsingException(string message, int errorCode = 0) : base(message) {
            ErrorCode = errorCode;
        }

        public ParsingException(string message, int errorCode, Exception innerException) : base(message, innerException) {
            ErrorCode = errorCode;
        }

        public ParsingException(string message, Code errorCode, Exception innerException) : base(message, innerException) {
            ErrorCode = (int)errorCode;
        }

        protected ParsingException(SerializationInfo info, StreamingContext context) : base(info, context) { }

    }
}
