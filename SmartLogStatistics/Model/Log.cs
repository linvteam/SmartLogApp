using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

public class Log
{
    public int file_id { get; set; }
    public int log_line { get; set; }

    public DateTime date { get; set; }
    public DateTime time { get; set; }
    public string code { get; set; }
    public bool value { get; set; }
    
    
    [NotMapped]
    public virtual Event Event { get; set; }
    
    [NotMapped]
    public virtual LogFile LogFile { get; set; }
}