namespace SmartLogStatistics.Repository {
    /// <summary>
    /// Interfaccia che definisce la comunicazione con il database per l'upload del file
    /// </summary>
    public interface UploadRepository {
        /// <summary>
        /// Esegue l'upload di un file di log nel database
        /// </summary>
        /// <param name="log">Il log da caricare</param>
        /// <exception cref="">Eccezione lanciata quando avviene un errore nel caricamento del file sul database</exception>
        public void Upload(Core.Log log);
    }
}
