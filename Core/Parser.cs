﻿namespace Core {
    /// <summary>
    /// Classe che si occupa di leggere interamente un file di log
    /// </summary>
    public class Parser {
        /// <summary>
        /// Converte un file di log
        /// </summary>
        /// <param name="reader">Lo stream di lettura</param>
        /// <returns>Un oggetto Log contenente header e tutti i record del log di tipo BIN</returns>
        public Log Parse(TextReader reader) {
            HeaderParser parser = new();
            Header header = parser.Parse(reader);
            DataParser dataParser = new();
            List<LogRow> rows = dataParser.Parse(reader);
            return new Log(header, rows);
        }
    }
}
