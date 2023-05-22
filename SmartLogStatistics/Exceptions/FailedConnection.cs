namespace SmartLogStatistics.Exceptions; 

public class FailedConnection : Exception{

    public int Code {get; private set;}

    public FailedConnection() : base("Connessione con il database fallita") {
        Code = 5;
    }
}