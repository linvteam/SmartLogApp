using Newtonsoft.Json;

namespace SmartLogViewer.Model {
    public class SequencesManager {

        private readonly List<Sequence> sequences;
        
        private readonly ILogger<SequencesManager> _logger;
        
        /// <summary>
        /// Indica se il parsing delle sequenze ha scatenato degli errori
        /// </summary>
        public bool ParsingError { private set; get; }

        /// <summary>
        /// Crea una nuova istanza di SequencesManager
        /// </summary>
        /// <param name="logger">Default logger</param>
        /// <param name="fileReader">Classe che codifica la configurazione di lettura del file</param>
        public SequencesManager(ILogger<SequencesManager> logger, SequenceFileReader fileReader) {
            sequences = new();
            _logger = logger;
            ParsingError = true;

            // Leggo il file di configurazione delle sequenze
            using StreamReader reader = fileReader.StreamReader();
            string json = reader.ReadToEnd();
            try {
                // Converto il file in un oggetto dynamic, questo mi permette di individuare meglio gli errori sulle sequenze
                dynamic? array = JsonConvert.DeserializeObject<dynamic>(json, new JsonSerializerSettings {
                    MissingMemberHandling = MissingMemberHandling.Error
                });
                if(array == null) {
                    _logger.LogError("Impossibile leggere il file delle sequenze");
                } else {
                    foreach (var item in array) {
                        // Devo estrarre e convertire correttamente tutti i valori dell'oggetto (i dynamics sono un po' particolari da usare)
                        string Name = item.Name;
                        string StartEvent = item.StartEvent;
                        bool StartEventState = item.StartEventState;
                        List<int> StartEventAvailableSubUnit = new();
                        // Questo ciclo è stata la parte tribbolo del parsing :(
                        foreach (var subunit in item.StartEventAvalilableSubUnits)
                            StartEventAvailableSubUnit.Add((int)subunit.Value);

                        string EndEvent = item.EndEvent;
                        bool EndEventState = item.EndEventState;
                        List<int> EndEventAvailableSubUnit = new();
                        foreach(var subunit in item.EndEventAvalilableSubUnits)
                            EndEventAvailableSubUnit.Add((int)subunit.Value);

                        int MaxDuration = item.MaxDuration;

                        // È stato necessario estrarre tutti i valori singolarmente per eseguire le dovute conversioni ed individuare gli errori.
                        // Quando si scatena un errore qualsiasi viene lanciata una eccezione 
                        sequences.Add(new Sequence(
                                Name, 
                                StartEvent, 
                                StartEventState, 
                                StartEventAvailableSubUnit, 
                                EndEvent, 
                                EndEventState, 
                                EndEventAvailableSubUnit, 
                                MaxDuration)
                            );
                    }
                    ParsingError = false;
                }
            } catch(Exception e) {
                sequences.Clear();
                _logger.LogError("Impossibile leggere il file delle sequenze");
                _logger.LogError(e.Message);
            }

        }

        /// <summary>
        /// Ottiene la lista di tutti i nomi delle sequenze caricate
        /// </summary>
        /// <returns>Lista dei nomi delle sequenze</returns>
        public List<string> SequenceNames() {
            return sequences.ConvertAll(x => x.Name);
        }

        /// <summary>
        /// Ottiene l'oggetto che codifica la sequenza
        /// </summary>
        /// <param name="name">Il nome della sequenza che si sta cercando</param>
        /// <returns>L'oggetto che codifica la sequenza se esiste una sequenza con il nome fornito, null altrimenti</returns>
        public Sequence? Sequence(string name) {
            return sequences.Find(x => x.Name == name);
        }
    }
}
