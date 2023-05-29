namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta le frequenze di occorrenza dei eventi raggruppati per certi campi
    /// </summary>
    public class FrequencyDto {

        /// <summary>
        /// Gli eventi raggruppati e la loro frequenza di occorrenza
        /// </summary>
        public List<LogRowEnhanced> events {  get; set; }

        /// <summary>
        /// Oggetto che rappresenta le frequenze di occorrenza dei eventi raggruppati per certi campi
        /// </summary>
        /// <param name="events">Gli eventi raggruppati e la loro frequenza di occorrenza</param>
        public FrequencyDto(List<LogRowEnhanced> events) {
            this.events = events;
        }
    }
}
