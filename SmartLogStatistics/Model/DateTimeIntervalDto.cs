namespace SmartLogStatistics.Model {
    public class DateTimeIntervalDto {
        
        public DateTime start {get; private set;}
        public DateTime end {get; private set;}
        public DateTimeIntervalDto(DateTime start, DateTime end) {
            this.start = start;
            this.end = end;
        }
    }
}
