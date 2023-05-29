namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta le occorrenze degli eventi per code
    /// </summary>
    public class TotalByCodeDto {

        /// <summary>
        /// Lista che rappresenta le occorrenze degli eventi per code
        /// </summary>
        public List<CodeOccurrence> CodeOccurences { get; set; }

        /// <summary>
        /// Crea un oggetto con le occorrenze degli eventi per code
        /// </summary>
        /// <param name="codeOccurences">Le occorrenze degli eventi per code</param>
        public TotalByCodeDto(List<CodeOccurrence> codeOccurences) {
            CodeOccurences = codeOccurences;
        }
    }
}
