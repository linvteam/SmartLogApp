using Microsoft.VisualStudio.TestTools.UnitTesting;
using SmartLogStatistics.Model;
using Moq;

namespace SmartLogStatistics.Repository.Tests {
    [TestClass()]
    public class StatisticsRepositoryPgSqlTests {

        [TestMethod()]
        public void StatisticsTest() {
            // Arrange
            // Inseriamo 10 file di log
            // Sui quali inserimo X eventi arbitrari

            double NumberOfLogFile = 10;
            double MaxLogsPerFile = 29;
            double MediaLogPerFile = 14.5;
            double DevStandard = 8.237;

            List<int> numberOfEvents = new() { 5, 7, 10, 4, 25, 15, 29, 20, 10, 20 };
            List<Log> logs = new();

            for(int i = 0; i < numberOfEvents.Count; i++) {

                for(int j = 0; j < numberOfEvents[i]; j++) {
                    Log log = new() {
                        file_id = i,
                        log_line = j,
                        date = new DateOnly(2022, 1, i + 1),
                        time = new TimeOnly(10, 10, j),
                        code = "E1",
                        value = j % 2 == 0,
                    };
                    logs.Add(log);
                }

            }

            Mock<Microsoft.EntityFrameworkCore.DbSet<Log>> logMock = new();
            var LogQuery = logs.AsQueryable();

            logMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(LogQuery.Provider);
            logMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(LogQuery.Expression);
            logMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(LogQuery.ElementType);
            logMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(LogQuery.GetEnumerator());

            Mock<SmartLogContext> contextMock = new();
            contextMock.Setup(x => x.Log).Returns(logMock.Object);


            StatisticsRepositoryPgSql repository = new(contextMock.Object);

            // Act
            StatisticsDto res = repository.Statistics(new DateTime(2022, 1, 1, 10, 10, 0), new DateTime(2022, 1, 10, 10, 10, 29));

            // Assert
            StatisticsDto.Statistic? nFiles = res.Statistics.Find(x => x.Name == "Numero di file");
            Assert.IsNotNull(nFiles);
            Assert.AreEqual(NumberOfLogFile, nFiles.Value);

            StatisticsDto.Statistic? maxLogs = res.Statistics.Find(x => x.Name == "Massimo numero di eventi");
            Assert.IsNotNull(maxLogs);
            Assert.AreEqual(MaxLogsPerFile, maxLogs.Value);

            StatisticsDto.Statistic? MeanLogs = res.Statistics.Find(x => x.Name == "Media di eventi");
            Assert.IsNotNull(MeanLogs);
            Assert.IsTrue(Math.Abs(MeanLogs.Value - MediaLogPerFile) < 0.01);

            StatisticsDto.Statistic? SD = res.Statistics.Find(x => x.Name == "Deviazione standard");
            Assert.IsNotNull(SD);
            Assert.IsTrue(Math.Abs(SD.Value - DevStandard) < 0.01);
        }

        [TestMethod()]
        [ExpectedException(typeof(Exceptions.EmptyOrFailedQuery))]
        public void TestQueryWithEmptyDatabase() {
            List<Log> logs = new();

            Mock<Microsoft.EntityFrameworkCore.DbSet<Log>> logMock = new();
            var LogQuery = logs.AsQueryable();

            logMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(LogQuery.Provider);
            logMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(LogQuery.Expression);
            logMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(LogQuery.ElementType);
            logMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(LogQuery.GetEnumerator());

            Mock<SmartLogContext> contextMock = new();
            contextMock.Setup(x => x.Log).Returns(logMock.Object);

            StatisticsRepositoryPgSql repository = new(contextMock.Object);

            // Act
            repository.Statistics(new DateTime(2022, 1, 1, 10, 10, 0), new DateTime(2022, 1, 10, 10, 10, 29));
        }

        [TestMethod()]
        public void TestQueryWithSingleLogReturn() {
            double NumberOfLogFile = 1;
            double MaxLogsPerFile = 1;
            double MediaLogPerFile = 1;
            double DevStandard = 0;

            List<Log> logs = new();

            Log log = new() {
                file_id = 1,
                log_line = 0,
                date = new DateOnly(2022, 1, 1),
                time = new TimeOnly(10, 10, 0),
                code = "E1",
                value = false,
            };
            logs.Add(log);

            Mock<Microsoft.EntityFrameworkCore.DbSet<Log>> logMock = new();
            var LogQuery = logs.AsQueryable();

            logMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(LogQuery.Provider);
            logMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(LogQuery.Expression);
            logMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(LogQuery.ElementType);
            logMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(LogQuery.GetEnumerator());

            Mock<SmartLogContext> contextMock = new();
            contextMock.Setup(x => x.Log).Returns(logMock.Object);


            StatisticsRepositoryPgSql repository = new(contextMock.Object);

            // Act
            StatisticsDto res = repository.Statistics(new DateTime(2022, 1, 1, 10, 10, 0), new DateTime(2022, 1, 10, 10, 10, 29));

            // Assert
            StatisticsDto.Statistic? nFiles = res.Statistics.Find(x => x.Name == "Numero di file");
            Assert.IsNotNull(nFiles);
            Assert.AreEqual(NumberOfLogFile, nFiles.Value);

            StatisticsDto.Statistic? maxLogs = res.Statistics.Find(x => x.Name == "Massimo numero di eventi");
            Assert.IsNotNull(maxLogs);
            Assert.AreEqual(MaxLogsPerFile, maxLogs.Value);

            StatisticsDto.Statistic? MeanLogs = res.Statistics.Find(x => x.Name == "Media di eventi");
            Assert.IsNotNull(MeanLogs);
            Assert.IsTrue(Math.Abs(MeanLogs.Value - MediaLogPerFile) < 0.01);

            StatisticsDto.Statistic? SD = res.Statistics.Find(x => x.Name == "Deviazione standard");
            Assert.IsNotNull(SD);
            Assert.IsTrue(Math.Abs(SD.Value - DevStandard) < 0.01);
        }

        [TestMethod()]
        [ExpectedException(typeof(Exceptions.EmptyOrFailedQuery))]
        public void StatisticsWithLogButEmptyDateFilter() {
            // Arrange
            // Inseriamo 10 file di log
            // Sui quali inserimo X eventi arbitrari


            List<int> numberOfEvents = new() { 5, 7, 10, 4, 25, 15, 29, 20, 10, 20 };
            List<Log> logs = new();

            for(int i = 0; i < numberOfEvents.Count; i++) {

                for(int j = 0; j < numberOfEvents[i]; j++) {
                    Log log = new() {
                        file_id = i,
                        log_line = j,
                        date = new DateOnly(2022, 1, i + 1),
                        time = new TimeOnly(10, 10, j),
                        code = "E1",
                        value = j % 2 == 0,
                    };
                    logs.Add(log);
                }

            }

            Mock<Microsoft.EntityFrameworkCore.DbSet<Log>> logMock = new();
            var LogQuery = logs.AsQueryable();

            logMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(LogQuery.Provider);
            logMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(LogQuery.Expression);
            logMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(LogQuery.ElementType);
            logMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(LogQuery.GetEnumerator());

            Mock<SmartLogContext> contextMock = new();
            contextMock.Setup(x => x.Log).Returns(logMock.Object);


            StatisticsRepositoryPgSql repository = new(contextMock.Object);

            // Act
            repository.Statistics(new DateTime(2022, 1, 5, 11, 10, 0), new DateTime(2022, 1, 6, 9, 10, 29));
        }
    }
}