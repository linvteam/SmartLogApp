namespace SmartLogViewer.Model {
    public class JsonReadingException: Exception {
        public JsonReadingException(): base() { }
        public JsonReadingException(string message) : base(message) { }
        public JsonReadingException(string message,  Exception innerException) : base(message, innerException) { }
    }
}
