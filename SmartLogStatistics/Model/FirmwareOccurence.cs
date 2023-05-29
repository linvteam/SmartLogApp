namespace SmartLogStatistics.Model {
    public class FirmwareOccurrence {

        public string Firmware { get; set; }

        public int EventOccurrences { get; set; }

        public FirmwareOccurrence(string firmware, int eventOccurrences) {
            Firmware = firmware;
            EventOccurrences = eventOccurrences;
        }
    }
}
