using Newtonsoft.Json;

namespace SmartLogViewer.Model {
    /// <summary>
    /// Oggeto per gestire il caricamento delle sequenze note dal file di configurazione.
    /// </summary>
    [Core.Injectables.Singleton(typeof(SequencesManager))]
    public class SequencesManagerJson: SequencesManager {

        private readonly List<Sequence> Sequences;
        
        private readonly ILogger<SequencesManagerJson> _logger;
        
        /// <summary>
        /// Indica se il parsing delle sequenze ha scatenato degli errori
        /// </summary>
        public bool ParsingError { private set; get; }

        /// <summary>
        /// Crea una nuova istanza di SequencesManagerJson
        /// </summary>
        /// <param name="logger">Default logger</param>
        /// <param name="fileReader">Classe che codifica la configurazione di lettura del file</param>
        public SequencesManagerJson(ILogger<SequencesManagerJson> logger, SequenceFileReader fileReader) {
            Sequences = new();
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
                    ExtractSequences(array);
                    ParsingError = false;
                }
            } catch(Exception e) {
                Sequences.Clear();
                _logger.LogError("Impossibile leggere il file delle sequenze");
                _logger.LogError(e.Message);
            }

        }

        /// <summary>
        /// Estrae le sequenze dal file letto
        /// </summary>
        /// <param name="array">Oggetto dynamic generato dal lettore di file JSON</param>
        private void ExtractSequences(dynamic array) {
            foreach(var item in array) {
                // Devo estrarre e convertire correttamente tutti i valori dell'oggetto (i dynamics sono un po' particolari da usare)
                string name = item.Name;
                List<Sequence.Event> startEvents = ExtractEvents(item.StartEvents);

                List<int> startEventsAvailableSubUnits = ExtractSubUnitList(item.StartEventsAvailableSubUnits);

                List<Sequence.Event> endEvents = ExtractEvents(item.EndEvents);

                List<int> endEventsAvailableSubUnits = ExtractSubUnitList(item.EndEventsAvailableSubUnits);

                int maxDuration = item.MaxDuration;

                // È stato necessario estrarre tutti i valori singolarmente per eseguire le dovute conversioni ed individuare gli errori.
                // Quando si scatena un errore qualsiasi viene lanciata una eccezione 
                Sequences.Add(new Sequence(
                        name,
                        startEvents,
                        startEventsAvailableSubUnits,
                        endEvents,
                        endEventsAvailableSubUnits,
                        maxDuration)
                    );
            }
        }

        /// <summary>
        /// Estrae una lista di eventi dal file delle sequenze
        /// </summary>
        /// <param name="events">Oggetto JSON che contiene la lista di eventi</param>
        /// <returns>Lista di eventi convertita</returns>
        private List<Sequence.Event> ExtractEvents(dynamic events) {
            List<Sequence.Event> eventsList = new();
            foreach(var e in events) {
                string code = e.Code;
                bool status = e.Status;
                eventsList.Add(new Model.Sequence.Event(code, status));
            }
            return eventsList;
        }

        /// <summary>
        /// Estrai una lista di subunit dall'oggetto JSON
        /// </summary>
        /// <param name="unitList">Oggetto JSON che contiene la lista di subunit</param>
        /// <returns>Lista di subunit convertite</returns>
        private List<int> ExtractSubUnitList(dynamic unitList) {
            List<int> subunits = new();
            // Questo ciclo è stata la parte tribbolo del parsing :(
            foreach(var unit in unitList) {
                subunits.Add((int)unit.Value);
            }
            return subunits;
        }

        /// <summary>
        /// Ottiene la lista di tutti i nomi delle sequenze caricate
        /// </summary>
        /// <returns>Lista dei nomi delle sequenze</returns>
        public List<string> SequenceNames() {
            return Sequences.ConvertAll(x => x.Name);
        }

        /// <summary>
        /// Ottiene l'oggetto che codifica la sequenza
        /// </summary>
        /// <param name="name">Il nome della sequenza che si sta cercando</param>
        /// <returns>L'oggetto che codifica la sequenza se esiste una sequenza con il nome fornito, null altrimenti</returns>
        public Sequence? Sequence(string name) {
            return Sequences.Find(x => x.Name == name);
        }
    }
}
