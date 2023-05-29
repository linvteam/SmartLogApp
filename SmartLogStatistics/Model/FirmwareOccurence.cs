namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta il numero di occorrenze registrate da un firmware
    /// </summary>
    public class FirmwareOccurrence {

        /// <summary>
        /// Stringa che rappresenta il firmware
        /// </summary>
        public string Firmware { get; private set; }

        /// <summary>
        /// Numero di eventi registrati dal firmware
        /// </summary>
        public int EventOccurrences { get; private set; }

        /// <summary>
        /// Costruisce un oggetto che rappresenta il numero di occorrenze registrate da un firmware
        /// </summary>
        /// <param name="firmware">Il firmware interessato</param>
        /// <param name="eventOccurrences">Il numero di occorrenze registrate sul firmware</param>
        public FirmwareOccurrence(string firmware, int eventOccurrences) {
            Firmware = firmware;
            EventOccurrences = eventOccurrences;
        }
    }
}
