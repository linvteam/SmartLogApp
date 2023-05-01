namespace SmartLogViewer.Model {
    /// <summary>
    /// Classe che codifca le caratteristiche di una sequenza nota
    /// </summary>
    public class Sequence {

        /// <summary>
        /// Costruisce un evento con il suo relativo stato
        /// </summary>
        /// <param name="Code">Codice dell'evento</param>
        /// <param name="Status">Stato dell'evento</param>
        public record Event(string Code, bool Status);

        /// <summary>
        /// Il nome della sequenza
        /// </summary>
        public string Name { get; private set; }

        /// <summary>
        /// Lista delle possibili subunit sul quale può scatenarsi l'evento di inizio
        /// </summary>
        public List<int> StartEventsAvailableSubUnits { get; private set; }
        
        /// <summary>
        /// Gli eventi di inizio della sequenza
        /// </summary>
        public List<Event> StartEvents { get; private set; }

        /// <summary>
        /// Lista delle possibili subunit sul quale può scatenarsi l'evento di fine
        /// </summary>
        public List<int> EndEventsAvailableSubUnits { get; private set; }

        /// <summary>
        /// Gli eventi di fine della sequenza
        /// </summary>
        public List<Event> EndEvents { get; private set; }

        /// <summary>
        /// La durata massima dell'esecuzione di una sequenza in millisecondi
        /// </summary>
        public int MaxDuration { get; private set; }

        /// <summary>
        /// Crea una nuova istanza di Sequence
        /// </summary>
        /// <param name="name">Nome della sequenza</param>
        /// <param name="startEvents">Eventi di inizo della sequenza</param>
        /// <param name="startEventSubunit">Lista di subunit sul quale può scatenarsi l'evento di partenza</param>
        /// <param name="endEvents">Eventi di fine della sequenza</param>
        /// <param name="endEventSubunit">Lista delle subunit sul quale può scatenarsi l'evento di fine</param>
        /// <param name="maxDuration">Durata massima dell'esecuzione della sequenza in millisecondi</param>
        public Sequence(string name, List<Event> startEvents, List<int> startEventSubunit, List<Event> endEvents, List<int> endEventSubunit, int maxDuration) {
            Name = name;
            StartEventsAvailableSubUnits = startEventSubunit;
            StartEvents = startEvents;
            EndEventsAvailableSubUnits = endEventSubunit;
            EndEvents = endEvents;
            MaxDuration = maxDuration;
        }

    }
}
