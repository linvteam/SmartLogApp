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
    public class InfoTest {

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
        public void GetCodeWithDescriptionTest() {
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

            List<Event> events = new() {
                new Event
                {
                    code = "A001",
                    description = "descrizione A001",
                    color = "0xFFFFFFFF"
                },
                new Event
                {
                    code = "C001",
                    description = "descrizione C001",
                    color = "0xFFFFFFFF"
                }
            };

            var logLineMock = CreateDbSetMock(logLines);
            var firmwareMock = CreateDbSetMock(firmwares);
            var fileMock = CreateDbSetMock(files);
            var eventsMock = CreateDbSetMock(events);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            InfoRepositoryPgSql repo = new InfoRepositoryPgSql(mockContext.Object);

            InfoController controller = new InfoController(repo);

            ObjectResult result = (ObjectResult)controller.GetCodeWithDescription();

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            var codeDescriptions = (List<CodeWithDescriptionDto>)result.Value;

            Assert.AreEqual(2, codeDescriptions.Count);

            var A001 = codeDescriptions.Find(c => c.Code == "A001");
            Assert.IsNotNull(A001);
            Assert.AreEqual("descrizione A001", A001.Description);

            var C001 = codeDescriptions.Find(c => c.Code == "C001");
            Assert.IsNotNull(C001);
            Assert.AreEqual("descrizione C001", C001.Description);
        
        }
    }
}
