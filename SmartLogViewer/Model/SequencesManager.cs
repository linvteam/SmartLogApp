using System.Dynamic;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging.Configuration;
using Newtonsoft.Json;

namespace SmartLogViewer.Model {
    public class SequencesManager {

        private List<Sequence> sequences;
        public bool ParsingError { private set; get; }

        public SequencesManager(ILogger logger) {
            sequences = new();
            ParsingError = false;

            // Leggo il file di configurazione delle sequenze

            using(StreamReader reader = new("sequences.json")) {
                string json = reader.ReadToEnd();
                dynamic? array = JsonConvert.DeserializeObject<dynamic>(json);
                if(array == null) {
                    logger.LogError("Impossibile leggere il file delle sequenze");
                    ParsingError = true;
                } else {
                    foreach(var item in array) {
                        Sequence sequence = new();

                        sequence.Name = item.Name;
                        sequence.StartEvent = item.StartEvent;
                        sequence.EndEvent = item.EndEvent;

                        sequences.Add(sequence);

                    }
                }
            }
        }

        public List<string> SequenceNames() {
            return sequences.ConvertAll(x => x.Name);
        }

        public Sequence? Sequence(string name) {
            return sequences.Find(x => x.Name == name);
        }
    }
}
