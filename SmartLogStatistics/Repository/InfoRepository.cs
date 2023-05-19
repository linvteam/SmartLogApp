using SmartLogStatistics.Model;

namespace SmartLogStatistics.Repository {
    /// <summary>
    /// Interfaccia per ottenere informazioni generali sui dati disponibili, utili al frontend
    /// </summary>
    public interface InfoRepository {
        /// <summary>
        /// Ottieni una lista dei codici con relative descrizioni
        /// </summary>
        /// <returns>Lista di codici e descrizioni</returns>
        public List<CodeWithDescriptionDto> GetGodesWithDescription();

        /// <summary>
        /// Ottieni l'intervallo temporale dei dati disponibili sul database
        /// </summary>
        /// <returns>Oggetto con una coppia di DateTime per inizo e fine</returns>
        public DateTimeIntervalDto DateTimeInterval();

        /// <summary>
        /// Ottieni i firmware registrati nel database
        /// </summary>
        /// <returns>Lista dei firmware registrati nel database</returns>
        public List<string> GetFirmwareList();
    }
}
