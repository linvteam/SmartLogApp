namespace SmartLogStatistics.Model {
    public class LogRowEnhanced {
        /// <summary>
        /// Oggetto di tipo string che contiene il codice dell'evento
        /// </summary>
        public string? Code { get; set; }
        /// <summary>
        /// Oggetto di tipo int che corrisponde alla colonna log_line nel DB, dotato di getter e setter
        /// </summary>
        public DateOnly? Date { get; set; }
        /// <summary>
        /// Oggetto di tipo DateOnly che corrisponde alla colonna date nel DB, dotato di getter e setter
        /// </summary>
        public string? Firmware { get; set; }
        /// <summary>
        /// Oggetto di tipo DateOnly che corrisponde alla colonna time nel DB, dotato di getter e setter
        /// </summary>
        public int? Unit { get; set; }
        /// <summary>
        /// Oggetto di tipo string che corrisponde alla colonna code nel DB, dotato di getter e setter
        /// </summary>
        public int? SubUnit { get; set; }
        /// <summary>
        /// Oggetto di tipo bool che corrisponde alla colonna value nel DB, dotato di getter e setter
        /// </summary>
        public int? Frequency { get; set; }

        public LogRowEnhanced(string code, int frequency, DateOnly? date = null, string? firmware = null, int? unit = null, int? subUnit = null) {
            Code = code;
            Date = date;
            Firmware = firmware;
            Unit = unit;
            SubUnit = subUnit;
            Frequency = frequency;
        }
    }
}
