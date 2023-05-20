using SmartLogStatistics.Model;
using System.Diagnostics;

namespace SmartLogStatistics.Repository {
    public class StatisticsRepositoryPgSql: StatisticsRepository {

        private readonly SmartLogContext context;

        public StatisticsRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        public StatisticsDto Statistics(DateTime start, DateTime end) {

            Debug.WriteLine("CIAO");

            Func<Log, bool> filterByDate = (log) => {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            };

            try {

                Debug.WriteLine($"Numero di eventi filtrati per data e ora {context.Log.Where(filterByDate).Count()}");

                var filesAndEventCount = context.Log.Where(filterByDate)
                                                    .GroupBy(x => x.file_id)
                                                    .Select(x => new { FileId = x.Key, EventsCount = x.Count() });


                //filesAndEventCount = from log in filesAndEventCount group log by log.file_id;
                //                         select new { FileId = logfilegroup.Key, EventsCount = logfilegroup.Count() };

                //Debug.WriteLine($"SEI SCEMO LA COLLEZIONE È VUOTA: {filesAndEventCount.Count()}");

                //foreach(var e in filesAndEventCount) {
                //    Debug.WriteLine($"File id: {e.FileId} Numero di log: {e.EventsCount}");
                //}

                //double NumberOfFiles = filesAndEventCount.Count();
                //double MaxNumberOfEvent = filesAndEventCount.Max((x) => x.EventsCount);
                //double AverageNumberOfEvents = filesAndEventCount.Average((x) => x.EventsCount);
                //double StandardDeviation = Math.Sqrt(filesAndEventCount.Average(x => Math.Pow(x.EventsCount - AverageNumberOfEvents, 2)));

                //return new StatisticsDto(start, end, new List<StatisticsDto.Statistic> {
                //    new StatisticsDto.Statistic("Numero di file", NumberOfFiles),
                //    new StatisticsDto.Statistic("Massimo numero di eventi", MaxNumberOfEvent),
                //    new StatisticsDto.Statistic("Media di eventi", AverageNumberOfEvents),
                //    new StatisticsDto.Statistic("Deviazione standard", StandardDeviation)
                //});
                
                return new StatisticsDto(start, end, new List<StatisticsDto.Statistic> {
                    new StatisticsDto.Statistic("Numero di file", 0),
                    new StatisticsDto.Statistic("Massimo numero di eventi", 0),
                    new StatisticsDto.Statistic("Media di eventi", 0),
                    new StatisticsDto.Statistic("Deviazione standard", 0)
                });

            } catch(Exception e) {
                Debug.WriteLine($"ECCEZIONE {e.Message}");
                return new StatisticsDto(start, end, new());
            }
        }
    }
}
