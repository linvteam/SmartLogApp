using System.Diagnostics;

namespace SmartLogViewer.Model {
    /// <summary>
    /// Classe che inietta la configurazione sulla classe SequencesManager, questo permette di fare un mock della configurazione e iniettare il Json che vogliamo
    /// </summary>
    public class SequenceFileReader {
        /// <summary>
        /// Ritorna uno stream contenente il json di configurazione di tutte le sequenze note
        /// </summary>
        /// <returns>Stream di lettura del file con le sequenze</returns>
        public virtual StreamReader StreamReader() {
            return new StreamReader("sequences.json");
        }
    }
}
