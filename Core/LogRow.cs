namespace Core {
    /// <summary>
    /// Classe rappresentante una riga di log filtrata per i campi da considerare
    /// </summary>
    public class LogRow {
        /// <summary>
        /// La data di registrazione del log
        /// </summary>
        public DateOnly Date { get; private set; }

        /// <summary>
        /// L'ora di registrazione del log
        /// </summary>
        public TimeOnly Time { get; private set; }
        
        /// <summary>
        /// L'unità che ha generato il log
        /// </summary>
        public int Unit { get; private set; }
        
        /// <summary>
        /// La sotto-unità che ha generato il log
        /// </summary>
        public int SubUnit { get; private set; }
        
        /// <summary>
        /// Il codice dell'errore 
        /// </summary>
        public string Code { get; private set; }
        
        /// <summary>
        /// Descrizione relativa al codice di errore
        /// </summary>
        public string Description { get; private set; }
        
        /// <summary>
        /// Il valore di attivo/disattivo dell'evento
        /// </summary>
        public bool Value { get; private set; }
        
        /// <summary>
        /// Il colore associato all'evento
        /// </summary>
        public string Color { get; private set; }
        
        /// <summary>
        /// Costruisce un'istanza della classe LogRow
        /// </summary>
        /// <param name="date">La data di registrazione nel log</param>
        /// <param name="time">L'ora di registrazione del log</param>
        /// <param name="unit">L'unità che ha generato l'evento</param>
        /// <param name="subunit">La sotto-unità che ha generato l'evento</param>
        /// <param name="code">Il codice dell'evento</param>
        /// <param name="description">Una descrizione fornita per il codice evento</param>
        /// <param name="value">Il valore attivo/disattivo dell'evento</param>
        /// <param name="color">Il colore associato all'evento</param>
        public LogRow(DateOnly date, TimeOnly time, int unit, int subunit, string code, string description, bool value, string color) {
            Date = date;
            Time = time;
            Unit = unit;
            SubUnit = subunit;
            Code = code;
            Description = description;
            Value = value;
            Color = color;
        }
    }
}
