namespace SmartLogStatistics.Model {
    public class CumulativeRecord {

        public DateTime Instant {  get; set; }

        public int EventOccurencies { get; set; }

        public CumulativeRecord(DateTime dateTime, int eventOccurencies) {
            this.dateTime = dateTime;
            this.EventOccurencies = eventOccurencies;
        }
    }
}
