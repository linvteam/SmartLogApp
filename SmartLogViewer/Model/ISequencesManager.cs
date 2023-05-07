namespace SmartLogViewer.Model {
    /// <summary>
    /// Interfaccia base per gestire la lettura dei file delle sequenze
    /// </summary>
    public interface SequencesManagerBase {
        /// <summary>
        /// Indica se ci sono stati problemi nella lettura del file
        /// </summary>
        bool ParsingError { get; }

        /// <summary>
        /// Ottine i dettagli della sequenza con il nome fornito
        /// </summary>
        /// <param name="name">Il nome della sequenza voluta</param>
        /// <returns>I dettagli della sequenza voluta, null se la sequenza non esiste</returns>
        Sequence? Sequence(string name);

        /// <summary>
        /// Ottiene i nomi delle sequenze disponibili
        /// </summary>
        /// <returns>Lista dei nomi delle sequenze</returns>
        List<string> SequenceNames();
    }
}