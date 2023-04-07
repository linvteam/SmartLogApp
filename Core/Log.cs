namespace Core {
    /// <summary>
    /// Classe rappresentante il log di una macchina
    /// </summary>
    public class Log {
        /// <summary>
        /// Header del log, contiene la data di rilevazione e la composizione delle sistema
        /// </summary>
        public Header Header { get; private set; }

        /// <summary>
        /// Eventi rilevati nel log
        /// </summary>
        public List<LogRow> Events { get; private set; }

        /// <summary>
        /// Crea una nuova istanza di Log
        /// </summary>
        /// <param name="header">Header del log</param>
        /// <param name="events">Eventi rilevati</param>
        public Log(Header header, List<LogRow> events) {
            Header = header;
            Events = events;
        }
    }
}
