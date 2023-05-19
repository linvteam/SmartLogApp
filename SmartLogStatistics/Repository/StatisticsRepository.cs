namespace SmartLogStatistics.Repository {
    /// <summary>
    /// Interfaccia che definisce la comunicazione delle statistiche tra il database e il controller
    /// </summary>
    public interface StatisticsRepository {
        /// <summary>
        /// Ottieni le statistiche analizzate in base all'intervallo temporale specificato
        /// </summary>
        /// <param name="start">Data ora di inizio analisi</param>
        /// <param name="end">Data ora di fine analisi</param>
        /// <returns>Oggetto dello statistics </returns>
        public Model.StatisticsDto Statistics(DateTime start, DateTime end);
    }
}
