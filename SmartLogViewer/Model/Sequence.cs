namespace SmartLogViewer.Model {
    /// <summary>
    /// Classe che codifca le caratteristiche di una sequenza nota
    /// </summary>
    public class Sequence {

        /// <summary>
        /// Il nome della sequenza
        /// </summary>
        public string Name { get; private set; }

        /// <summary>
        /// Lista delle possibili subunit sul quale può scatenarsi l'evento di inizio
        /// </summary>
        public List<int> StartEventAvailableSubUnits { get; private set; }
        
        /// <summary>
        /// L'evento di inizio della sequenza
        /// </summary>
        public string StartEvent { get; private set; }

        /// <summary>
        /// Lo stato dell'evento di inizio
        /// </summary>
        public bool StartEventState { get; private set; }

        /// <summary>
        /// Lista delle possibili subunit sul quale può scatenarsi l'evento di fine
        /// </summary>
        public List<int> EndEventAvailableSubUnits { get; private set; }

        /// <summary>
        /// L'evento di fine della sequenza
        /// </summary>
        public string EndEvent { get; private set; }

        /// <summary>
        /// Lo stato dell'evento di fine
        /// </summary>
        public bool EndEventState { get; private set; }

        /// <summary>
        /// La durata massima dell'esecuzione di una sequenza in millisecondi
        /// </summary>
        public int MaxDuration { get; private set; }

        /// <summary>
        /// Crea una nuova istanza di Sequence
        /// </summary>
        /// <param name="name">Nome della sequenza</param>
        /// <param name="startEvent">Evento di inizo della sequenza</param>
        /// <param name="startEventState">Stato dell'evento di inizio</param>
        /// <param name="startEventSubunit">Lista di subunit sul quale può scatenarsi l'evento di partenza</param>
        /// <param name="endEvent">Evento di fine della sequenza</param>
        /// <param name="endEventState">Stato dell'evento di fine</param>
        /// <param name="endEventSubunit">Lista delle subunit sul quale può scatenarsi l'evento di fine</param>
        /// <param name="maxDuration">Durata massima dell'esecuzione della sequenza in millisecondi</param>
        public Sequence(string name, string startEvent, bool startEventState, List<int> startEventSubunit, string endEvent, bool endEventState, List<int> endEventSubunit, int maxDuration) {
            Name = name;
            StartEventAvailableSubUnits = startEventSubunit;
            StartEvent = startEvent;
            StartEventState = startEventState;
            EndEventAvailableSubUnits = endEventSubunit;
            EndEvent = endEvent;
            EndEventState = endEventState;
            MaxDuration = maxDuration;
        }

    }
}
