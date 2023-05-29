namespace SmartLogStatistics.Model {
    /// <summary>
    /// Classe che rappresenta un evento e la sua frequenza di occorrenza, raggruppata a seconda dei campi scelti
    /// </summary>
    public class LogRowEnhanced {
        /// <summary>
        /// Codice dell'evento
        /// </summary>
        public string Code { get; private set; }
        /// <summary>
        /// La data nella quale si è scatenato l'evento
        /// </summary>
        public DateOnly? Date { get; private set; }
        /// <summary>
        /// La configurazione che ha generato l'evento
        /// </summary>
        public string? Firmware { get; private set; }
        /// <summary>
        /// La Unit che ha generato l'evento
        /// </summary>
        public int? Unit { get; private set; }
        /// <summary>
        /// La SubUnit che ha generato l'evento
        /// </summary>
        public int? SubUnit { get; private set; }
        /// <summary>
        /// La frequenza d'occorrenza dell'evento
        /// </summary>
        public double Frequency { get; private set; }

        /// <summary>
        /// Costruisce l'oggetto contenente la frequenza di occorrenza per code e altri campi se richiesti
        /// </summary>
        /// <param name="code">Codice dell'evento</param>
        /// <param name="frequency">Frequenza di occorrenza dell'evento</param>
        /// <param name="date">Data in cui si è scatenato l'evento</param>
        /// <param name="firmware">Configurazione che ha generato l'evento</param>
        /// <param name="unit">Unit che ha generato l'evento</param>
        /// <param name="subUnit">SubUnit che ha generato l'evento</param>
        public LogRowEnhanced(string code, double frequency, DateOnly? date = null, string? firmware = null, int? unit = null, int? subUnit = null) {
            Code = code;
            Date = date;
            Firmware = firmware;
            Unit = unit;
            SubUnit = subUnit;
            Frequency = frequency;
        }
    }
}
