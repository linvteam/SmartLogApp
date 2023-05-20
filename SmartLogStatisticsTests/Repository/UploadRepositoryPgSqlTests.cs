using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Core;
using Newtonsoft.Json.Linq;
using System.Reflection.Metadata;

namespace SmartLogStatistics.Repository.Tests {
    [TestClass()]
    public class UploadRepositoryPgSqlTests {

        [TestMethod()]
        public void FileUploadTest()
        {

            var fileMock = new Mock<DbSet<LogFile>>();
            var logLineMock = new Mock<DbSet<Model.Log>>();
            var firmwareMock = new Mock<DbSet<Firmware>>();
            var eventsMock = new Mock<DbSet<Event>>();

            var mockContext = new Mock<SmartLogContext>();

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

            mockContext.Verify(m => m.SaveChanges(), Times.Exactly(8));
            mockContext.Verify(m => m.Log.Add(It.IsAny<Model.Log>()), Times.Exactly(3));
            mockContext.Verify(m => m.File.Add(It.IsAny<LogFile>()), Times.Once());
            mockContext.Verify(m => m.Event.Add(It.IsAny<Event>()), Times.Exactly(2));
            mockContext.Verify(m => m.Firmware.Add(It.IsAny<Firmware>()), Times.Exactly(4));


        }
    }
}