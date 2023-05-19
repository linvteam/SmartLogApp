using NuGet.Protocol.Plugins;
using System.Security.Policy;

namespace SmartLogStatistics.Model {
    public class StatisticsDto {

        public class Statistic {
            public string Name { get; private set; }
            public double Value { get; private set; }

            public Statistic(string name, double value) {
                Name = name;
                Value = value;
            }
        }

        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public List<Statistic> Statistics { get; private set; }

        public StatisticsDto(DateTime startDate, DateTime endDate, List<Statistic> statistics) {
            StartDate = startDate;
            EndDate = endDate;
            Statistics = statistics;
        }
    }
}
