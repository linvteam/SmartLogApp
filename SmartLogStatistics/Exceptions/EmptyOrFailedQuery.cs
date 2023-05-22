namespace SmartLogStatistics.Exceptions; 

public class EmptyOrFailedQuery : Exception {
    
    public int Code {get; private set;}

    public EmptyOrFailedQuery() : base("La query non ha prodotto risultati") {
        Code = 6;
    }
}