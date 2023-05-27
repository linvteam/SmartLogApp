using Core;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Model;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Exceptions;
using NuGet.Protocol;

namespace SmartLogStatistics.Repository.Tests {
    [TestClass()]
    public class DataRepositoryPgSqlTests {

        private DataRepositoryPgSql repo;
        private Mock<SmartLogContext> mockContext; 

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

        [TestInitialize()]
        public void Init() {
            mockContext = new Mock<SmartLogContext>();

            List<LogFile> files = new()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new(2022, 08, 05, 08, 47, 18),
                    UPS_datetime = new(2022, 08, 05, 08, 47, 17),
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
                    code = "A001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Model.Log
                {
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = false,
                },
                new Model.Log
                {
                    code = "C001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Model.Log
                {
                    code = "C001",
                    date = new DateOnly(2022,03,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Model.Log
                {
                    code = "C001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Model.Log
                {
                    code = "C001",
                    date = new DateOnly(2022,05,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = true,
                },
                new Model.Log
                {
                    code = "C001",
                    date = new DateOnly(2022,05,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Model.Log
                {
                    code = "C001",
                    date = new DateOnly(2022,06,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 14,
                    value = false,
                },
                new Model.Log
                {
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

            repo = new(mockContext.Object);
        }

        [TestMethod()]
        public void FrequencyTest() {
            var result = repo.Frequency(new DateTime(2022, 01, 01), new DateTime(2024, 01, 01), true, true, true, true);

            Assert.AreEqual(10, result.events.Count);
            var ev = result.events.Find(e => e.Date == new DateOnly(2022, 05, 07));
            Assert.IsNotNull(ev);
            Assert.AreEqual(1, ev.Frequency);

            var result2 = repo.Frequency(new DateTime(2022, 04, 01), new DateTime(2024, 01, 01), false, false, false, false);

            var ev2 = result2.events.Find(e => e.Code == "C001");
            Assert.AreEqual(2, result2.events.Count);
            Assert.IsNotNull(ev2);
            Assert.AreEqual(5, ev2.Frequency);

            var result3 = repo.Frequency(new DateTime(2022, 01, 01), new DateTime(2024, 01, 01), false, true, false, false);

            var ev3 = result3.events.Find(e => e.Code == "C001" && e.Firmware == "MAPK_ByPass_v2_04_00.ini");
            Assert.IsNotNull(ev3);
            Assert.AreEqual(3, ev3.Frequency);

        }

        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQuery))]
        public void BlankSearchFrequencyTest() {
           repo.Frequency(new DateTime(2010, 01, 01), new DateTime(2011, 01, 01), true, true, true, true);
        }


        [TestMethod()]
        public void CumulativeTest() {

            var result = repo.Cumulative(new DateTime(2022, 01, 01), new DateTime(2024, 01, 01), "C001");

            CumulativeRecord? record1 = result.records.Find(f => f.dateTime > new DateTime(2022,03,06));
            CumulativeRecord? record2 = result.records.Find(f => f.dateTime > new DateTime(2022,05,06));
            CumulativeRecord? record3 = result.records.Find(f => f.dateTime > new DateTime(2022,07,06));

            Assert.IsNotNull(record1);
            Assert.IsNotNull(record2);
            Assert.IsNotNull(record3);
            Assert.AreEqual(1,record1.EventOccurencies);
            Assert.AreEqual(4,record2.EventOccurencies);
            Assert.AreEqual(7,record3.EventOccurencies);
        }

        [TestMethod()]
        public void ShorterTimeIntervalCumulativeTest() {

            var result = repo.Cumulative(new DateTime(2022, 05, 01), new DateTime(2022, 05, 29), "C001");

            CumulativeRecord? record1 = result.records.Find(f => f.dateTime > new DateTime(2022, 05, 06));
            CumulativeRecord? record2 = result.records.Find(f => f.dateTime > new DateTime(2022, 05, 10));

            Assert.IsNotNull(record1);
            Assert.IsNotNull(record2);
            Assert.AreEqual(1, record1.EventOccurencies);
            Assert.AreEqual(2, record2.EventOccurencies);
        }

        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQuery))]
        public void BlankSearchCumulativeTest() {
          
            repo.Cumulative(new DateTime(2022, 05, 01), new DateTime(2022, 05, 29), "A");
        }

        [TestMethod()]
        public void TotalByCodeTest() {

            var result = repo.TotalByCode(new DateTime(2022, 01, 01), new DateTime(2024, 01, 01));

            CodeOccurrence? code1 = result.CodeOccurences.Find(c => c.Code == "A001");
            CodeOccurrence? code2 = result.CodeOccurences.Find(c => c.Code == "B001");
            CodeOccurrence? code3 = result.CodeOccurences.Find(c => c.Code == "C001");
            Assert.IsNotNull(code1);
            Assert.IsNotNull(code2);
            Assert.IsNotNull(code3);
            Assert.AreEqual(1, code1.EventOccurrences);
            Assert.AreEqual(2, code2.EventOccurrences);
            Assert.AreEqual(7, code3.EventOccurrences);
        }

        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQuery))]
        public void BlankSearchTotalByCodeTest() {
           repo.TotalByCode(new DateTime(2000, 01, 01), new DateTime(2001, 01, 01));

        }

        [TestMethod()]
        public void TotalByFirmwareTest() {

            var result = repo.TotalByFirmware(new DateTime(2022, 01, 01), new DateTime(2024,01,01),"C001");
            
            FirmwareOccurrence? fw1 = result.FirmwareOccurrences.Find(f => f.Firmware == "MAPK_Module_RD_IV_v2_04_00.ini");
            FirmwareOccurrence? fw2 = result.FirmwareOccurrences.Find(f => f.Firmware == "MAPK_ByPass_v2_04_00.ini");
            
            Assert.IsNotNull(fw1);
            Assert.IsNotNull(fw2);
            Assert.AreEqual(4,fw1.EventOccurrences);
            Assert.AreEqual(3,fw2.EventOccurrences);
           
        }

        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQuery))]
        public void BlankSearchTotalByFirmwareTest() {
            
            repo.TotalByFirmware(new DateTime(2022, 01, 01), new DateTime(2024, 01, 01), "A");

        }
    }
}