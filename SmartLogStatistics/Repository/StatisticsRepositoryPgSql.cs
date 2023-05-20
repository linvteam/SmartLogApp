using SmartLogStatistics.Model;

namespace SmartLogStatistics.Repository {
    public class StatisticsRepositoryPgSql: StatisticsRepository {

        private readonly SmartLogContext context;

        public StatisticsRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        public StatisticsDto Statistics(DateTime start, DateTime end) {

            Func<Log, bool> filterByDate = (log) => {
                DateTime logdatetime = new(log.date.Year, log.date.Month, log.date.Day, log.time.Hour, log.time.Minute, log.time.Second, log.time.Millisecond);
                return logdatetime >= start && logdatetime <= end;
            };

            var filesAndEventCount = from log in context.Log.Where(filterByDate)
                      join file in context.File
                        on log.file_id equals file.id into logfile
                      select new { FileId = log.file_id, EventsCount =  logfile.Count() };

            int NumberOfFiles = filesAndEventCount.Count();
            int MaxNumberOfEvent = filesAndEventCount.Max((x) => x.EventsCount);
            int AverageNumberOfEvents = (int)filesAndEventCount.Average((x) => x.EventsCount);
            int StandardDeviation = (int)filesAndEventCount.Average(x => x.EventsCount - AverageNumberOfEvents);

            return new StatisticsDto(start, end, new List<StatisticsDto.Statistic> {
                new StatisticsDto.Statistic("Numero di file", NumberOfFiles),
                new StatisticsDto.Statistic("Massimo numero di eventi", MaxNumberOfEvent),
                new StatisticsDto.Statistic("Media di eventi", AverageNumberOfEvents),
                new StatisticsDto.Statistic("Deviazione standard per file di log", StandardDeviation)
            });
        }
    }
}
