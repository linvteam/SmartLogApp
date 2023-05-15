using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

/// <summary>
/// Classe che rappresenta gli oggeti di tipo Firmware nel DB e le caratteristiche della relativa tabella
/// </summary>
public class Firmware
{
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna file_id nel DB, dotato di getter e setter
    /// </summary>
    public int file_id { get; set; }
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna unit nel DB, dotato di getter e setter
    /// </summary>
    public int unit { get; set; }
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna subunit nel DB, dotato di getter e setter
    /// </summary>
    public int subunit { get; set; }
    /// <summary>
    /// Oggetto di tipo string che corrisponde alla colonna INI_file_name nel DB, dotato di getter e setter
    /// </summary>
    public string INI_file_name { get; set; }
    
    /// <summary>
    /// Oggetto di tipo LogFile che corrisponde agli elementi della tabella File facenti riferimento alla tabella Firmware, dotato di getter e setter
    /// </summary>
    [NotMapped]
    public virtual LogFile LogFile { get; set; }
}