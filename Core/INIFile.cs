namespace Core;

/// <summary>
/// Classe rappresentante un file di configurazione con formato INI presente nell'intestazione di un file di log
/// </summary>
public class INIFile
{
    /// <summary>
    /// Nome del file di configurazione
    /// </summary>
    public string FileName { get; private set; }
    
    /// <summary>
    /// Unità a cui si associa il file di configurazione
    /// </summary>
    public int Unit { get; private set; }
    
    /// <summary>
    /// Sotto-unità a cui si associa il file di configurazione
    /// </summary>
    public int SubUnit { get; private set; }

    /// <summary>
    /// Costruttore di istanze di INIFile
    /// </summary>
    /// <param name="fileName">Il nome del file di configurazione</param>
    /// <param name="unit">Unità a cui è associato il file di configurazione</param>
    /// <param name="subUnit">Sotto-unità a cui è associato il file di configurazione</param>
    public INIFile(string fileName, int unit, int subUnit)
    {
        FileName = fileName;
        Unit = unit;
        SubUnit = subUnit;
    }
}