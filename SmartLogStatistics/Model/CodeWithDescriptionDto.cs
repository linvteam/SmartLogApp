namespace SmartLogStatistics.Model
{
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
