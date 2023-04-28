namespace SmartLogViewer.Model {
    public class Sequence {

        public string Name { get; set; }
        public List<int> StartEventAvailableSubUnits { get; set; }
        public string StartEvent { get; set; }
        public bool StartEventState { get; set; }
        public List<int> EndEventAvailableSubUnits { get; set; }
        public string EndEvent { get; set; }
        public bool EndEventState { get; set; }
        public TimeSpan MaxDurationMs { get; set; }

        public Sequence() {
            Name = string.Empty;
            StartEventAvailableSubUnits = new();
            StartEvent = string.Empty;
            StartEventState = false;
            EndEventAvailableSubUnits = new();
            EndEvent = string.Empty;
            EndEventState = false;
            MaxDurationMs = new();
        }

    }
}
