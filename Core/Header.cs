namespace Core {
    /// <summary>
    /// Classe rappresentante l'header di un file di log.
    /// </summary>
    public class Header {
        /// <summary>
        /// Rappresenta la data e l'ora del pc nel quale è stato scaricato il log
        /// </summary>
        public DateTime PCDate { get; private set; }

        /// <summary>
        /// Rappresenta la data e l'ora locale della macchina nel momento in cui viene scaricato il log
        /// </summary>
        public DateTime UPSDate { get; private set; }

        /// <summary>
        /// Lista di firmware con rispettive Unit e SubUnit che compongono il sistema 
        /// </summary>
        public List<INIFile> INIFile { get; private set; }

        /// <summary>
        /// Crea una nuova istanza di Header
        /// </summary>
        /// <param name="PCDate">La data e l'ora del pc nel momento in cui viene log</param>
        /// <param name="UPSDate">La data e l'ora della macchina nel momento in cui viene scaricato il log</param>
        /// <param name="INIFile">Lista di firmware con rispettive Unit e SubUnit che compongono il sistema</param>
        public Header(DateTime PCDate, DateTime UPSDate, List<INIFile> INIFile) {
            this.PCDate = PCDate;
            this.UPSDate = UPSDate;
            this.INIFile = INIFile;
        }
    }
}