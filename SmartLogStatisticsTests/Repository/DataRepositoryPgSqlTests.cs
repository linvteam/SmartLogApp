using Core;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Model;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Repository.Tests {
    [TestClass()]
    public class DataRepositoryPgSqlTests {

        private static Mock<DbSet<T>> CreateDbSetMock<T>(IEnumerable<T> elements) where T : class
        {
            var elementsAsQueryable = elements.AsQueryable();
            var dbSetMock = new Mock<DbSet<T>>();

            dbSetMock.As<IQueryable<T>>().Setup(m => m.Provider).Returns(elementsAsQueryable.Provider);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.Expression).Returns(elementsAsQueryable.Expression);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(elementsAsQueryable.ElementType);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(elementsAsQueryable.GetEnumerator());

            return dbSetMock;
        }

        [TestMethod()]
        public void FrequencyTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void CumulativeTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void TotalByCodeTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void TotalByFirmwareTest()
        {
           
            var mockContext = new Mock<SmartLogContext>();

            List<LogFile> files = new()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new(2022, 03, 05, 08, 47, 18),
                    UPS_datetime = new(2022, 03, 05, 08, 47, 17),
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

            List<Model.Log> logLines = new()
            {
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 14,
                    value = true,
                },
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 14,
                    value = true,
                }
            };
            var logLineMock = CreateDbSetMock(logLines);
            var firmwareMock = CreateDbSetMock(firmwares);
            var eventsMock = new Mock<DbSet<Event>>();
            var fileMock = CreateDbSetMock(files);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            DataRepositoryPgSql repo = new(mockContext.Object);

            var result = repo.TotalByFirmware(new DateOnly(2022, 01, 01).ToDateTime(TimeOnly.MinValue), new DateOnly(2024,01,01).ToDateTime(TimeOnly.MaxValue),"B001");
            
            FirmwareOccurrence? fw1 = result.FirmwareOccurrences.Find(f => f.Firmware == "MAPK_Module_RD_IV_v2_04_00.ini");
            FirmwareOccurrence? fw2 = result.FirmwareOccurrences.Find(f => f.Firmware == "MAPK_ByPass_v2_04_00.ini");
            
            Assert.IsNotNull(fw1);
            Assert.IsNotNull(fw2);
            Assert.AreEqual(fw1.EventOccurrences, 2);
            Assert.AreEqual(fw2.EventOccurrences, 2);
           
        }

        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQuery))]
        public void BlankSearchTotalByFirmwareTest()
        {

            var mockContext = new Mock<SmartLogContext>();

            List<LogFile> files = new()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new(2022, 03, 05, 08, 47, 18),
                    UPS_datetime = new(2022, 03, 05, 08, 47, 17),
                }
            };

            List<Firmware> firmwares = new()
            {
                new Firmware
                {
                    INI_file_name = "MAPK_Module_RD_IV_v2_04_00.ini",
                    unit = 1,
                    subunit = 1,
                }
            };

            List<Model.Log> logLines = new()
            {
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                }
            };
            var logLineMock = CreateDbSetMock(logLines);
            var firmwareMock = CreateDbSetMock(firmwares);
            var eventsMock = new Mock<DbSet<Event>>();
            var fileMock = CreateDbSetMock(files);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            DataRepositoryPgSql repo = new(mockContext.Object);
            
            var result = repo.TotalByFirmware(new DateOnly(2022, 01, 01).ToDateTime(TimeOnly.MinValue), new DateOnly(2024, 01, 01).ToDateTime(TimeOnly.MaxValue), "A");

        }
    }
}