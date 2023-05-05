using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

public class Event
{
    public string code { get; set; }
    public string description { get; set; }
    [MaxLength(9)]
    public string color { get; set; }
    
    [NotMapped]
    public virtual ICollection<Log> Logs { get; set; }
}