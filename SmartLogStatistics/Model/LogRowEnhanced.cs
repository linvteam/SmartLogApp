namespace SmartLogStatistics.Model {
    /// <summary>
    /// Classe che rappresenta un evento e la sua frequenza di occorenza, raggrupata a seconda dei campi scelti
    /// </summary>
    public class LogRowEnhanced {
        /// <summary>
        /// Oggetto di tipo string che contiene il codice dell'evento
        /// </summary>
        public string? Code { get; set; }
        /// <summary>
        /// Oggetto di tipo DateOnly che contiene la data nella quale si è scatenato l'evento
        /// </summary>
        public DateOnly? Date { get; set; }
        /// <summary>
        /// Oggetto di tipo string che rappresenta la configurazione che ha generato l'evento
        /// </summary>
        public string? Firmware { get; set; }
        /// <summary>
        /// Oggetto di tipo unit che corrisponde alla unità che ha generato l'evento
        /// </summary>
        public int? Unit { get; set; }
        /// <summary>
        /// Oggetto di tipo unit che corrisponde alla sotto-unità che ha generato l'evento
        /// </summary>
        public int? SubUnit { get; set; }
        /// <summary>
        /// Oggetto di tipo int che rappresenta la frequenza d'occorenza dell'evento
        /// </summary>
        public int Frequency { get; set; }

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
