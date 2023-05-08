using Microsoft.AspNetCore.Mvc.Routing;
using Newtonsoft.Json;
using System.Diagnostics;

namespace SmartLogViewer.Model {
    /// <summary>
    /// Oggeto per gestire il caricamento delle sequenze note dal file di configurazione.
    /// </summary>
    public class SequencesManager: SequencesManagerBase {

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
                    foreach(var item in array) {
                        // Devo estrarre e convertire correttamente tutti i valori dell'oggetto (i dynamics sono un po' particolari da usare)
                        string Name = item.Name;
                        List<Model.Sequence.Event> StartEvents = new();
                        foreach(var startEvent in item.StartEvents) {
                            string code= startEvent.Code;
                            bool status = startEvent.Status;
                            StartEvents.Add(new Model.Sequence.Event(code, status));
                        }

                        List<int> StartEventsAvailableSubUnits = new();
                        // Questo ciclo è stata la parte tribbolo del parsing :(
                        foreach(var subunit in item.StartEventsAvailableSubUnits)
                            StartEventsAvailableSubUnits.Add((int)subunit.Value);


                        List<Model.Sequence.Event> EndEvents = new();
                        foreach(var endEvent in item.EndEvents) {
                            string code = endEvent.Code;
                            bool status = endEvent.Status;
                            EndEvents.Add(new Model.Sequence.Event(code, status));
                        }

                        List<int> EndEventsAvailableSubUnits = new();
                        foreach(var subunit in item.EndEventsAvailableSubUnits)
                            EndEventsAvailableSubUnits.Add((int)subunit.Value);

                        int MaxDuration = item.MaxDuration;

                        // È stato necessario estrarre tutti i valori singolarmente per eseguire le dovute conversioni ed individuare gli errori.
                        // Quando si scatena un errore qualsiasi viene lanciata una eccezione 
                        sequences.Add(new Sequence(
                                Name,
                                StartEvents,
                                StartEventsAvailableSubUnits,
                                EndEvents,
                                EndEventsAvailableSubUnits,
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
