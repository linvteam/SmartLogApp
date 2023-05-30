namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta l'andamento cumulativo di un evento
    /// </summary>
    public class CumulativeDto {

        /// <summary>
        /// Codice dell'evento
        /// </summary>
        public string Code { get; private set; }

        /// <summary>
        /// Lista di records che rappresentano gli istanti
        /// </summary>
        public List<CumulativeRecord> Records { get; private set; }

        /// <summary>
        /// Data di inizio dell'analisi
        /// </summary>
        public DateTime Start { get; private set; }

        /// <summary>
        /// Data di fine dell'analisi
        /// </summary>
        public DateTime End { get; private set; }

        /// <summary>
        /// Crea un oggetto con le istanze di un evento ed il codice dell'evento
        /// </summary>
        /// <param name="start">Data di inizio dell'analisi</param>
        /// <param name="end">Data di fine dell'analisi</param>
        /// <param name="code">Il codice dell'evento</param>
        /// <param name="records"></param>
        public CumulativeDto(DateTime start, DateTime end, string code, List<CumulativeRecord> records) {
            Start = start;
            End = end;
            Code = code;
            Records = records;
        }
    }
}
