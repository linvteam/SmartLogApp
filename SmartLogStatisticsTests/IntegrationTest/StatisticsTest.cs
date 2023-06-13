using Moq;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SmartLogStatistics.Controller;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SmartLogStatisticsTests.IntegrationTest {
    [TestClass]
    public class StatisticsTest {

        private static Mock<DbSet<T>> CreateDbSetMock<T>(IEnumerable<T> elements) where T : class {
            var elementsAsQueryable = elements.AsQueryable();
            var dbSetMock = new Mock<DbSet<T>>();

            dbSetMock.As<IQueryable<T>>().Setup(m => m.Provider).Returns(elementsAsQueryable.Provider);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.Expression).Returns(elementsAsQueryable.Expression);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(elementsAsQueryable.ElementType);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(elementsAsQueryable.GetEnumerator());

            return dbSetMock;
        }

        [TestMethod()]
        public void GoodStatisticsTest() {
            var mockContext = new Mock<SmartLogContext>();

            List<LogFile> files = new()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new(2022, 08, 05, 08, 47, 18),
                    UPS_datetime = new(2022, 08, 05, 08, 47, 17),
                },
                new LogFile{
                    id = 2,
                    filename = "file.csv",
                    PC_datetime = new(2023, 08, 05, 08, 47, 18),
                    UPS_datetime = new(2023, 08, 05, 08, 47, 17)
                }
            };

            List<Firmware> firmwares = new()
            {
                new Firmware
                {
                    INI_file_name = "MAPK_Module_RD_IV_v2_04_00.ini",
                    unit = 1,
                    subunit = 1,
                },
                new Firmware
                {
                    INI_file_name = "MAPK_ByPass_v2_04_00.ini",
                    unit = 1,
                    subunit = 14,
                }
            };

            List<Log> logLines = new()
            {
                new Log
                {
                    file_id = 1,
                    code = "A001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id = 1,
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {   
                    file_id = 2,
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    code = "C001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id=2,
                    code = "C001",
                    date = new DateOnly(2022,03,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    code = "C001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    code = "C001",
                    date = new DateOnly(2022,05,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Log
                {
                    file_id=2,
                    code = "C001",
                    date = new DateOnly(2022,07,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 14,
                    value = false,
                }
            };
            var logLineMock = CreateDbSetMock(logLines);
            var firmwareMock = CreateDbSetMock(firmwares);
            var fileMock = CreateDbSetMock(files);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);

            StatisticsRepositoryPgSql repo = new(mockContext.Object);

            StatisticsController controller = new(repo);

            OkObjectResult result = (OkObjectResult)controller.Statistics(new DateTime(2022, 03, 04), new DateTime(2022, 07, 06));

            Assert.IsNotNull(result.Value);

            StatisticsDto val = (StatisticsDto)result.Value;

            Assert.AreEqual(new DateTime(2022, 03, 04), val.StartDate);
            Assert.AreEqual(new DateTime(2022, 07, 06), val.EndDate);

            var stats = val.Statistics;
            var fileNumb = stats.Find(stat => stat.Name == "Numero di file");
            var maxEventNumb = stats.Find(stat => stat.Name == "Massimo numero di eventi");
            var eventMean = stats.Find(stat => stat.Name == "Media di eventi");
            var stdDeviation = stats.Find(stat => stat.Name == "Deviazione standard");

            Assert.IsNotNull(fileNumb);
            Assert.IsNotNull(maxEventNumb);
            Assert.IsNotNull(eventMean);
            Assert.IsNotNull(stdDeviation);

            Assert.AreEqual(2, fileNumb.Value);
            Assert.AreEqual(5, maxEventNumb.Value);
            Assert.AreEqual(4, eventMean.Value);
            Assert.AreEqual(1, stdDeviation.Value);

        }

        [TestMethod()]
        public void NoStatisticsTest() {
            var mockContext = new Mock<SmartLogContext>();

            List<LogFile> files = new()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new(2022, 08, 05, 08, 47, 18),
                    UPS_datetime = new(2022, 08, 05, 08, 47, 17),
                },
                new LogFile{
                    id = 2,
                    filename = "file.csv",
                    PC_datetime = new(2023, 08, 05, 08, 47, 18),
                    UPS_datetime = new(2023, 08, 05, 08, 47, 17)
                }
            };

            List<Firmware> firmwares = new()
            {
                new Firmware
                {
                    INI_file_name = "MAPK_Module_RD_IV_v2_04_00.ini",
                    unit = 1,
                    subunit = 1,
                },
                new Firmware
                {
                    INI_file_name = "MAPK_ByPass_v2_04_00.ini",
                    unit = 1,
                    subunit = 14,
                }
            };

            List<Log> logLines = new()
            {
                new Log
                {
                    file_id = 1,
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id = 2,
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    code = "C001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id=2,
                    code = "C001",
                    date = new DateOnly(2022,03,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    code = "C001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                }
            };
            var logLineMock = CreateDbSetMock(logLines);
            var firmwareMock = CreateDbSetMock(firmwares);
            var fileMock = CreateDbSetMock(files);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);

            StatisticsRepositoryPgSql repo = new(mockContext.Object);

            StatisticsController controller = new(repo);

            ObjectResult result = (ObjectResult)controller.Statistics(new DateTime(2020, 03, 04), new DateTime(2020, 07, 06));

            Assert.AreEqual(400, result.StatusCode);

            Assert.IsNotNull(result.Value);

            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati",error.Message);

        }


        [TestMethod()]
        public void EmptyDatabaseTest() {
            var mockContext = new Mock<SmartLogContext>();

            List<LogFile> files = new();

            List<Firmware> firmwares = new();

            List<Log> logLines = new();

            var logLineMock = CreateDbSetMock(logLines);
            var firmwareMock = CreateDbSetMock(firmwares);
            var fileMock = CreateDbSetMock(files);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);

            StatisticsRepositoryPgSql repo = new(mockContext.Object);

            StatisticsController controller = new(repo);

            ObjectResult result = (ObjectResult)controller.Statistics(new DateTime(2020, 03, 04), new DateTime(2020, 07, 06));

            Assert.AreEqual(400, result.StatusCode);

            Assert.IsNotNull(result.Value);

            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati", error.Message);

        }
    }
}
