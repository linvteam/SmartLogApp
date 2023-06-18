namespace SmartLogStatistics.Model {
    /// <summary>
    /// Classe di trasferimento dai che contiene il minimo e il massimo delle date degli eventi contenuti nel database
    /// </summary>
    public class DateTimeIntervalDto {
        
        /// <summary>
        /// Il timestamp minimo degli eventi dal database
        /// </summary>
        public DateTime start {get; private set;}

        /// <summary>
        /// Il timestamp massimo degli eventi dal database
        /// </summary>
        public DateTime end {get; private set;}


        /// <summary>
        /// Crea un oggetto contenente il timestamp minimo e massimo dal database
        /// </summary>
        /// <param name="start">Il timestamp minimo</param>
        /// <param name="end">Il timestamp massimo</param>
        public DateTimeIntervalDto(DateTime start, DateTime end) {
            this.start = start;
            this.end = end;
        }
    }
}
