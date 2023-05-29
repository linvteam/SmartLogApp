namespace SmartLogStatistics.Model {
    public class CumulativeDto {

        public string Code { get; set; }

        public List<CumulativeRecord> records { get; set; }

        public CumulativeDto(string code, List<CumulativeRecord> records) {
            Code = code;
            this.records = records;
        }
    }
}
