namespace SmartLogStatistics.Model {
    public class CumulativeRecord {

        public DateTime Instant {  get; set; }

        public int EventOccurencies { get; set; }

        public CumulativeRecord(DateTime dateTime, int eventOccurencies) {
            this.Instant = dateTime;
            this.EventOccurencies = eventOccurencies;
        }
    }
}
