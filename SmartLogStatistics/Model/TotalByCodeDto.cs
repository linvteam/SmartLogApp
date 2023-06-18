namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta le occorrenze degli eventi per code
    /// </summary>
    public class TotalByCodeDto {

        /// <summary>
        /// Data di inizio dell'analisi
        /// </summary>
        public DateTime Start { get; private set; }

        /// <summary>
        /// Data di fine dell'analisi
        /// </summary>
        public DateTime End { get; private set; }

        /// <summary>
        /// Lista che rappresenta le occorrenze degli eventi per code
        /// </summary>
        public List<CodeOccurrence> CodeOccurences { get; set; }

        /// <summary>
        /// Crea un oggetto con le occorrenze degli eventi per code
        /// </summary>
        /// <param name="start">La data di inizio dell'analisi</param>
        /// <param name="end">La data di fine dell'analisi</param>
        /// <param name="codeOccurences">Le occorrenze degli eventi per code</param>
        public TotalByCodeDto(DateTime start, DateTime end, List<CodeOccurrence> codeOccurences) {
            CodeOccurences = codeOccurences;
            Start = start;
            End = end;
        }
    }
}
