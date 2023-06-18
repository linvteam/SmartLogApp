namespace SmartLogStatistics.Controller{
    /// <summary>
    /// Messaggio di errore, record utilizzato per una corretta serializzazione delle Exception
    /// </summary>
    /// <param name="Code">Codice di errore</param>
    /// <param name="Message">Messaggio che descrive l'errore</param>
    public record ErrorObject(int Code, string Message);
}
