namespace SmartLogStatistics.Model {

    /// <summary>
    /// Classe che rappresenta l'andamento cumulativo di un evento
    /// </summary>
    public class CumulativeDto {

        /// <summary>
        /// Codice dell'evento
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Lista di records che rappresentano gli istanti
        /// </summary>
        public List<CumulativeRecord> records { get; set; }

        /// <summary>
        /// Crea un oggetto con le istanze di un evento e il numero di occorrenze in quei istanti
        /// </summary>
        /// <param name="code">Il codice dell'evento</param>
        /// <param name="records"></param>
        public CumulativeDto(string code, List<CumulativeRecord> records) {
            Code = code;
            this.records = records;
        }
    }
}
