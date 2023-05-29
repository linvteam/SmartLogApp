namespace SmartLogStatistics.Model {
    public class TotalByCodeDto {

        public List<CodeOccurrence> CodeOccurences { get; set; }

        public TotalByCodeDto(List<CodeOccurrence> codeOccurences) {
            CodeOccurences = codeOccurences;
        }
    }
}
