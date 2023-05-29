using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Model;
using Microsoft.EntityFrameworkCore;
using Core;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace SmartLogStatistics.Repository.Tests {
    [TestClass()]
    public class UploadRepositoryPgSqlTests {

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
        public void UploadTest()
        {
            
            var logLineMock = new Mock<DbSet<Model.Log>>();
            var firmwareMock = new Mock<DbSet<Firmware>>();
            //var eventsMock = new Mock<DbSet<Event>>();
            
            var transactionMock = new Mock<IDbContextTransaction>();
            
            var mockContext = new Mock<SmartLogContext>();

            var files = new List<LogFile>();
            var events = new List<Event>();
            var dbMock = new Mock<DatabaseFacade>(mockContext.Object);
            dbMock.Setup(m => m.BeginTransaction()).Returns(transactionMock.Object);
            var fileMock = CreateDbSetMock(files);
            var eventsMock = CreateDbSetMock(events);

            mockContext.Setup(m => m.Database).Returns(dbMock.Object);
            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);
            
            UploadRepositoryPgSql repo = new(mockContext.Object);

            string fileName = "example.csv";
            DateTime pcDateTime = new(2022, 03, 05, 08, 47, 18);
            DateTime upsDateTime = new(2022, 03, 05, 08, 47, 17);

            List<INIFile> iniFiles = new List<INIFile>();
            iniFiles.AddRange(new List<INIFile>()
                    {
                        new INIFile("MAPK_Unit_v2_04_00.ini", 0, 0),
                        new INIFile("MAPK_Unit_v2_04_00.ini", 1, 0),
                        new INIFile("MAPK_Module_RD_IV_v2_04_00.ini", 1, 1),
                        new INIFile("MAPK_ByPass_v2_04_00.ini", 1, 14),
                    });
            Header header = new Header(pcDateTime, upsDateTime, iniFiles);
            List<LogRow> logRows = new List<LogRow>();
            logRows.AddRange(new List<LogRow>()
            {
                new LogRow(new DateOnly(2022,03,05), new TimeOnly(08,36,29,618),1,0,"A001", "Load protected by inverter",true,"0xFFE0FFFF"),
                new LogRow(new DateOnly(2022,03,05), new TimeOnly(08,36,29,618),1,0,"B001", "Load protected by inverter",true,"0xFFE0FFFF"),
                new LogRow(new DateOnly(2022,04,05), new TimeOnly(08,36,29,618),1,0,"B001", "Load protected by inverter",false,"0xFFE0FFFF"),
            });

            Core.Log logFIle = new(fileName, header, logRows);

            repo.Upload(logFIle);

            mockContext.Verify(m => m.SaveChanges(), Times.Exactly(3));
            mockContext.Verify(m => m.Log.AddRange(It.IsAny<List<Model.Log>>()), Times.Once());
            mockContext.Verify(m => m.File.Add(It.IsAny<LogFile>()), Times.Once());
            mockContext.Verify(m => m.Event.AddRange(It.IsAny<List<Event>>()), Times.Once());
            mockContext.Verify(m => m.Firmware.AddRange(It.IsAny<List<Firmware>>()), Times.Once());
            transactionMock.Verify(m => m.Commit(), Times.Once);


        }

        [TestMethod()]
        [ExpectedException(typeof(FileConflictException))]
        public void ExistingFileUploadTest()
        {
            var logLineMock = new Mock<DbSet<Model.Log>>();
            var firmwareMock = new Mock<DbSet<Firmware>>();
            var eventsMock = new Mock<DbSet<Event>>();

            var transactionMock = new Mock<IDbContextTransaction>();

            var mockContext = new Mock<SmartLogContext>();

            var dbMock = new Mock<DatabaseFacade>(mockContext.Object);
            dbMock.Setup(m => m.BeginTransaction()).Returns(transactionMock.Object);

            mockContext.Setup(m => m.Database).Returns(dbMock.Object);

            var files = new List<LogFile>()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new(2022, 03, 05, 08, 47, 18),
                    UPS_datetime = new(2022, 03, 05, 08, 47, 17),
                }
            };

            var fileMock = CreateDbSetMock(files);

            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            UploadRepositoryPgSql repo = new(mockContext.Object);

            string fileName = "Test.csv";
            DateTime pcDateTime = new(2022, 03, 05, 08, 47, 18);
            DateTime upsDateTime = new(2022, 03, 05, 08, 47, 17);

            List<INIFile> iniFiles = new List<INIFile>();

            Header header = new Header(pcDateTime, upsDateTime, iniFiles);
            List<LogRow> logRows = new List<LogRow>();

            Core.Log logFIle = new(fileName, header, logRows);

            repo.Upload(logFIle);

            transactionMock.Verify( m => m.Rollback(),Times.Once);
            Assert.AreEqual(1, fileMock.Object.Count());

        }

    }
}