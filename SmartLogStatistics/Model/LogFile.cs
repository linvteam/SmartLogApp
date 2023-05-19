using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Core.Metadata.Edm;
using Microsoft.AspNetCore.Connections;

namespace SmartLogStatistics.Model;

/// <summary>
/// Classe che rappresenta gli oggeti di tipo File nel DB e le caratteristiche della relativa tabella
/// </summary>
public class LogFile
{
    /// <summary>
    /// Oggetto di tipo int che corrisponde alla colonna id nel DB, dotato di getter e setter
    /// </summary>
    public int id { get; set; }
    /// <summary>
    /// Oggetto di tipo string che corrisponde alla colonna filename nel DB, dotato di getter e setter
    /// </summary>
    public string filename { get; set; }
    /// <summary>
    /// Oggetto di tipo DateTime che corrisponde alla colonna PC_datetime nel DB, dotato di getter e setter
    /// </summary>
    public DateTime PC_datetime { get; set; }
    /// <summary>
    /// Oggetto di tipo DateTime che corrisponde alla colonna UPS_datetime nel DB, dotato di getter e setter
    /// </summary>
    public DateTime UPS_datetime { get; set; }
    
    /// <summary>
    /// Oggetto di tipo ICollection che contiene i riferimenti alla tabella Firmware associati agli elementi della tabella File, dotato di getter e setter
    /// </summary>
    [NotMapped]
    public virtual ICollection<Firmware> Firmwares { get; set; }
    /// <summary>
    /// Oggetto di tipo ICollection che contiene i riferimenti alla tabella Log associati agli elementi della tabella File, dotato di getter e setter
    /// </summary>
    [NotMapped]
    public virtual ICollection<Log> Logs { get; set; }
    
}