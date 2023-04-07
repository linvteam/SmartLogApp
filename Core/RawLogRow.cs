namespace Core {
    /// <summary>
    /// Classe interna alla libreria core, necessaria come supporto per la libreria di parsing del CSV
    /// </summary>
    internal class RawLogRow {
        public DateOnly Date { get; private set; }
        public TimeOnly Time { get; private set; }
        public int Unit { get; private set; }
        public int SubUnit { get; private set; }    
        public string Code { get; private set; }
        public string Description { get; private set; }
        public bool Value { get; private set; }
        public string Type { get; private set; }
        public int Snapshot { get; private set; }
        public string Color { get; private set; }
    
        public RawLogRow(DateOnly date, TimeOnly time, int unit, int subUnit, string code, string description, bool value, string type, int snapshot, string color) {
            Date = date;
            Time = time;
            Unit = unit;
            SubUnit = subUnit;
            Code = code;
            Description = description;
            Value = value;
            Type = type;
            Snapshot = snapshot;
            Color = color;
        }
    }
}
