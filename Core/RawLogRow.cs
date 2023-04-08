using CsvHelper.Configuration.Attributes;

namespace Core {
    /// <summary>
    /// Classe interna alla libreria core, necessaria come supporto per la libreria di parsing del CSV. La classe parser si occupa di convertire questa classe in LowRow
    /// </summary>
    internal class RawLogRow {
        [Name("Date")]
        public string Date { get;  set; }

        [Name("Time")]
        public string Time { get;  set; }

        [Name("Unit")]
        public int Unit { get;  set; }

        [Name("SubUnit")]
        public int SubUnit { get;  set; }

        [Name("Code")]
        public string Code { get;  set; }

        [Name("Description")]
        public string Description { get;  set; }

        [Name("Value")]
        public string Value { get;  set; }

        [Name("Type/UM")] // Attributo per indicare alla libreria CsvHelper il nome del campo nel file
        public string Type { get; set; }

        [Name("Snapshot")]
        public int Snapshot { get; set; }

        [Name("Color")]
        public string Color { get; set; }

        public RawLogRow() {
            Date = Time = Value = Color = Type = Description = Code = "";
        }
    }
}
