using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLogStatistics.Model;

public class LogFile
{
    public int id { get; set; }
    
    public string filename { get; set; }
    [Timestamp]
    public byte[] PC_datetime { get; set; }
    [Timestamp]
    public byte[] UPS_datetime { get; set; }
    
    public ICollection<Firmware> Firmwares { get; set; }
    public ICollection<Log> Logs { get; set; }
    
}