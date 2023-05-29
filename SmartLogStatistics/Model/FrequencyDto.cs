namespace SmartLogStatistics.Model {
    public class FrequencyDto {
        public List<LogRowEnhanced> events {  get; set; }

        public FrequencyDto(List<LogRowEnhanced> events) {
            this.events = events;
        }
    }
}
