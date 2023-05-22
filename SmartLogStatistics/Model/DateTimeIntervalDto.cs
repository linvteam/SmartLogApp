namespace SmartLogStatistics.Model {
    /// <summary>
    /// Classe di trasferimento dai che contiene il minimo e il massimo delle date degli eventi contenuti nel database
    /// </summary>
    public class DateTimeIntervalDto {
        
        public DateTime start {get; private set;}
        public DateTime end {get; private set;}
        public DateTimeIntervalDto(DateTime start, DateTime end) {
            this.start = start;
            this.end = end;
        }
    }
}
