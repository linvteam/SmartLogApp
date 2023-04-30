namespace SmartLogViewer.Model {

    /// <summary>
    /// Interfaccia di configurazione per oggetti che necessitano di leggere un file dal disco
    /// </summary>
    public interface FileManager {
        /// <summary>
        /// Ritorna un StreamReader del file da leggere
        /// </summary>
        /// <returns>StreamReader del file</returns>
        public StreamReader StreamReader();
    }
}
