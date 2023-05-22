namespace SmartLogStatistics.Model
{
    /// <summary>
    /// Classe di trasferimento dati che contiene un code e la sua relativa description
    /// </summary>
    public class CodeWithDescriptionDto
    {
        public string Code { get; private set; }
        public string Description { get; private set; }
        
        public CodeWithDescriptionDto(string code, string description) {
            Code = code;
            Description = description;
        }

        
    }
}
