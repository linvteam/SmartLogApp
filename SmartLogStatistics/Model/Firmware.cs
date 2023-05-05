using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

public class Firmware
{
    public int file_id { get; set; }
    public int unit { get; set; }
    public int subunit { get; set; }

    public string INI_file_name { get; set; }
    
    [NotMapped]
    public virtual LogFile LogFile { get; set; }
}