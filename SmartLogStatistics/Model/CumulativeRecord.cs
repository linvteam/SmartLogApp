namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta un istante di un evento e il numero di occorrenze dello stesso evento fino a quell' istante
    /// </summary>
    public class CumulativeRecord {

        /// <summary>
        /// Istante upper-bound dell'intervallo di tempo considerato
        /// </summary>
        public DateTime Instant {  get; set; }

        /// <summary>
        /// Numero di occorrenze dell'evento fino a quel istante
        /// </summary>
        public int EventOccurencies { get; set; }

        /// <summary>
        /// Costruisce un record di un istante di un evento
        /// </summary>
        /// <param name="dateTime">Paramnetro dell'istante temporale</param>
        /// <param name="eventOccurencies">Numero di occorrenze dell'evento fino a quel istante</param>
        public CumulativeRecord(DateTime dateTime, int eventOccurencies) {
            this.Instant = dateTime;
            this.EventOccurencies = eventOccurencies;
        }
    }
}
