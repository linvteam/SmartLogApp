using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

/// <summary>
/// Classe che rappresenta gli oggeti di tipo Event nel DB e le caratteristiche della relativa tabella
/// </summary>
public class Event
{
    /// <summary>
    /// Oggetto di tipo string che corrisponde alla colonna code nel DB, dotato di getter e setter
    /// </summary>
    public string code { get; set; }
    /// <summary>
    /// Oggetto di tipo string che corrisponde alla colonna description nel DB, dotato di getter e setter
    /// </summary>
    public string description { get; set; }
    /// <summary>
    /// Oggetto di tipo string che corrisponde alla colonna color nel DB, dotato di getter e setter
    /// </summary>
    [MaxLength(9)]
    public string color { get; set; }
    
    /// <summary>
    /// Oggetto di tipo ICollection che contiene i riferimenti alla tabella Log associati agli elementi della tabella Event, dotato di getter e setter
    /// </summary>
    [NotMapped]
    public virtual ICollection<Log> Logs { get; set; }
}