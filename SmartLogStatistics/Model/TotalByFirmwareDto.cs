namespace SmartLogStatistics.Model {
    public class TotalByFirmwareDto {

        public List<FirmwareOccurrence> FirmwareOccurrences { get; set;}

        public TotalByFirmwareDto(List<FirmwareOccurrence> firmwareOccurrences) {
            FirmwareOccurrences = firmwareOccurrences;
        }
    }
}
