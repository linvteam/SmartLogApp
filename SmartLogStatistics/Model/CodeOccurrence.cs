namespace SmartLogStatistics.Model {
    public class CodeOccurrence {

        public string Code { get; set; }

        public int EventOccurrences { get; set; }

        public CodeOccurrence(string code, int eventOccurrences) {
            Code = code;
            EventOccurrences = eventOccurrences;
        }
    }
}
