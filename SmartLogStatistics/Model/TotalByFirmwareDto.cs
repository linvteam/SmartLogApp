namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta le occorrenze degli eventi per firmware
    /// </summary>
    public class TotalByFirmwareDto {

        /// <summary>
        /// Lista che rappresenta le occorrenze degli eventi per firmware
        /// </summary>
        public List<FirmwareOccurrence> FirmwareOccurrences { get; set;}

        /// <summary>
        /// Crea un oggetto con le occorenze degli eventi per firmware
        /// </summary>
        /// <param name="firmwareOccurrences">Le occorrenze degli eventi per firmware</param>
        public TotalByFirmwareDto(List<FirmwareOccurrence> firmwareOccurrences) {
            FirmwareOccurrences = firmwareOccurrences;
        }
    }
}
