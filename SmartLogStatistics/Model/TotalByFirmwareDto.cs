namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta le occorrenze degli eventi per firmware
    /// </summary>
    public class TotalByFirmwareDto {

        /// <summary>
        /// Data di inizio dell'analisi
        /// </summary>
        public DateTime Start { get; private set; }

        /// <summary>
        /// Data di fine dell'analisi
        /// </summary>
        public DateTime End { get; private set; }

        /// <summary>
        /// Code scelto per l'analisi
        /// </summary>
        public string Code { get; private set; }

        /// <summary>
        /// Lista che rappresenta le occorrenze degli eventi per firmware
        /// </summary>
        public List<FirmwareOccurrence> FirmwareOccurrences { get; set;}

        /// <summary>
        /// Crea un oggetto con le occorrenze degli eventi per firmware
        /// </summary>
        /// <param name="start">Data di inizio dell'analsi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Code scelto per l'analisi</param>
        /// <param name="firmwareOccurrences">Le occorrenze degli eventi per firmware</param>
        public TotalByFirmwareDto(DateTime start, DateTime end, string code, List<FirmwareOccurrence> firmwareOccurrences) {
            FirmwareOccurrences = firmwareOccurrences;
            Start = start;
            End = end;
            Code = code;
        }
    }
}
