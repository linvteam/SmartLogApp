using Microsoft.VisualStudio.TestTools.UnitTesting;
using SmartLogStatistics.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SmartLogStatisticsTests.Context;
using SmartLogStatistics.Model;
using Moq;
using System.Data.Entity;
using System.Diagnostics.Tracing;
using NuGet.Configuration;

namespace SmartLogStatistics.Repository.Tests {
    [TestClass()]
    public class StatisticsRepositoryPgSqlTests {
        [TestMethod()]
        public void StatisticsTest() {
            // Arrange
            DateTime start = DateTime.Now;

            

            var events = new List<Event>() {
                new() {
                    code = "E1",
                    description = "Evento",
                    color = "red"
                },
            };
            //var eventsQuery = events.AsQueryable();

            

            //eventMock.As<IQueryable<Event>>().Setup(x => x.Provider).Returns(eventsQuery.Provider);
            //eventMock.As<IQueryable<Event>>().Setup(x => x.Expression).Returns(eventsQuery.Expression);
            //eventMock.As<IQueryable<Event>>().Setup(x => x.ElementType).Returns(eventsQuery.ElementType);
            //eventMock.As<IQueryable<Event>>().Setup(x => x.GetEnumerator()).Returns(eventsQuery.GetEnumerator());


            // Inseriamo 10 file di log
            // Sui quali inserimo X eventi arbitrari

            List<int> numberOfEvents = new() { 5, 7, 10, 4, 25, 15, 29, 20, 10, 20 };
            List<LogFile> logFiles = new();
            List<Log> logs = new();

            for(int i = 0; i < 10; i++) {
                LogFile logFile = new() {
                    id = i,
                    filename = "File" + i,
                    PC_datetime = DateTime.Now,
                    UPS_datetime = DateTime.Now
                };
                logFiles.Add(logFile);

                for(int j = 0; j < numberOfEvents[i]; j++) {
                    Log log = new() {
                        file_id = i,
                        log_line = j,
                        date = DateOnly.FromDateTime(DateTime.Now),
                        time = TimeOnly.FromDateTime(DateTime.Now),
                        code = "E1",
                        value = j % 2 == 0,
                        Event = events[0],
                        LogFile = logFile,
                    };
                    logs.Add(log);
                }
            }


            //var LogFileQuery = logFiles.AsQueryable();
            //logFileMock.As<IQueryable<LogFile>>().Setup(x => x.Provider).Returns(LogFileQuery.Provider);
            //logFileMock.As<IQueryable<LogFile>>().Setup(x => x.Expression).Returns(LogFileQuery.Expression);
            //logFileMock.As<IQueryable<LogFile>>().Setup(x => x.ElementType).Returns(LogFileQuery.ElementType);
            //logFileMock.As<IQueryable<LogFile>>().Setup(x => x.GetEnumerator()).Returns(LogFileQuery.GetEnumerator());


            //var LogQuery = logs.AsQueryable();
            //logMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(LogQuery.Provider);
            //logMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(LogQuery.Expression);
            //logMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(LogQuery.ElementType);
            //logMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(LogQuery.GetEnumerator());

            Mock<SmartLogContext> contextMock = new();
            Mock<Microsoft.EntityFrameworkCore.DbSet<Event>> eventMock = new();
            Mock<Microsoft.EntityFrameworkCore.DbSet<LogFile>> logFileMock = new();
            Mock<Microsoft.EntityFrameworkCore.DbSet<Log>> logMock = new();

            contextMock.Setup(x => x.Log).Returns(logMock.Object);
            contextMock.Setup(x => x.File).Returns(logFileMock.Object);
            contextMock.Setup(x => x.Event).Returns(eventMock.Object);

            contextMock.Object.Log.AddRange(logs.ToArray());
            contextMock.Object.File.AddRange(logFileMock.Object);
            contextMock.Object.Event.AddRange(events.ToArray());
            contextMock.Object.SaveChanges();

            StatisticsRepositoryPgSql repository = new(contextMock.Object);

            double NumberOfLogFile = 10;
            double MaxLogsPerFile = 29;
            double MediaLogPerFile = 14.5;
            double DevStandard = 8.237;

            DateTime end = DateTime.Now;

            StatisticsDto res = repository.Statistics(start, end);

            StatisticsDto.Statistic? nFiles = res.Statistics.Find(x => x.Name == "Numero di file");
            Assert.IsNotNull(nFiles);
            Assert.AreEqual(NumberOfLogFile, nFiles.Value);

            StatisticsDto.Statistic? maxLogs = res.Statistics.Find(x => x.Name == "Massimo numero di eventi");
            Assert.IsNotNull(maxLogs);
            Assert.AreEqual(NumberOfLogFile, maxLogs.Value);

            StatisticsDto.Statistic? MeanLogs = res.Statistics.Find(x => x.Name == "Media di eventi");
            Assert.IsNotNull(MeanLogs);
            Assert.IsTrue(Math.Abs(MeanLogs.Value - MediaLogPerFile) < 0.01);

            StatisticsDto.Statistic? SD = res.Statistics.Find(x => x.Name == "Deviazione standard");
            Assert.IsNotNull(SD);
            Assert.IsTrue(Math.Abs(SD.Value - NumberOfLogFile) < 0.01);
        }
    }
}