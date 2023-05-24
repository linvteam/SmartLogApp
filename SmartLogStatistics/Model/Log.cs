using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

/// <summary>
/// Classe che rappresenta gli oggeti di tipo Log nel DB e le caratteristiche della relativa tabella
/// </summary>
public class Log
{
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna file_id nel DB, dotato di getter e setter
    /// </summary>
    public int file_id { get; set; }
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna log_line nel DB, dotato di getter e setter
    /// </summary>
    public int log_line { get; set; }
    /// <summary>
    /// Oggetto di tipo DateOnly che corrisponde alla colonna date nel DB, dotato di getter e setter
    /// </summary>
    public DateOnly date { get; set; }
    /// <summary>
    /// Oggetto di tipo DateOnly che corrisponde alla colonna time nel DB, dotato di getter e setter
    /// </summary>
    public DateOnly time { get; set; }
    /// <summary>
    /// Oggetto di tipo string che corrisponde alla colonna code nel DB, dotato di getter e setter
    /// </summary>
    public string code { get; set; }
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna unit nel DB, dotato di getter e setter
    /// </summary>
    public int unit { get; set; }
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna subunit nel DB, dotato di getter e setter
    /// </summary>
    public int subunit { get; set; }
    /// <summary>
    /// Oggetto di tipo bool che corrisponde alla colonna value nel DB, dotato di getter e setter
    /// </summary>
    public bool value { get; set; }
    
    /// <summary>
    /// Oggetto di tipo Event che corrisponde agli elementi della tabella Event facenti riferimento alla tabella Log, dotato di getter e setter
    /// </summary>
    [NotMapped]
    public virtual Event Event { get; set; }
    /// <summary>
    /// Oggetto di tipo LogFile che corrisponde agli elementi della tabella File facenti riferimento alla tabella Log, dotato di getter e setter
    /// </summary>
    [NotMapped]
    public virtual LogFile LogFile { get; set; }
}