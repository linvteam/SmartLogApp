using System.Runtime.Serialization;

namespace Core {
    public class ParsingException: Exception {

        public enum ErrorCode {
            FormatoErrato = 1,
            DatoErrato = 2
        }

        public int Code {
            get;
        }

        public ParsingException() : base() { }

        public ParsingException(string message, ErrorCode errorCode): base(message) {
            Code = (int)errorCode;
        }

        public ParsingException(string message, int errorCode = 0) : base(message) {
            Code = errorCode;
        }

        public ParsingException(string message, int errorCode, Exception innerException) : base(message, innerException) {
            Code = errorCode;
        }

        public ParsingException(string message, ErrorCode errorCode, Exception innerException) : base(message, innerException) {
            Code = (int)errorCode;
        }

    }
}
