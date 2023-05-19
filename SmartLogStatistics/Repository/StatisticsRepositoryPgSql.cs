using SmartLogStatistics.Model;

namespace SmartLogStatistics.Repository {
    public class StatisticsRepositoryPgSql: StatisticsRepository {

        private readonly SmartLogContext context;

        public StatisticsRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        public StatisticsDto Statistics(DateTime start, DateTime end) {

            var res = from l in context.Log from f in context.File.Where(x => x.id == l.file_id) select new { f.id };
            

            throw new NotImplementedException();
        }
    }
}
