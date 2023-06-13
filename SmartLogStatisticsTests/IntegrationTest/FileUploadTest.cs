using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartLogStatistics.Model;
using Microsoft.EntityFrameworkCore;
using Core;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Controller;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SmartLogStatisticsTests.IntegrationTest {
    [TestClass]
    public class FileUploadTest {

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
        public void GoodUploadTest() {

            Parser parser = new();

            var fileMock = CreateDbSetMock(new List<LogFile>());
            var eventsMock = CreateDbSetMock(new List<Event>());
            var logLineMock = CreateDbSetMock(new List<SmartLogStatistics.Model.Log>());
            var firmwareMock = CreateDbSetMock(new List<Firmware>());

            var transactionMock = new Mock<IDbContextTransaction>();

            var mockContext = new Mock<SmartLogContext>();

            var dbMock = new Mock<DatabaseFacade>(mockContext.Object);
            dbMock.Setup(m => m.BeginTransaction()).Returns(transactionMock.Object);
            
            mockContext.Setup(m => m.Database).Returns(dbMock.Object);
            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            UploadRepositoryPgSql repo = new(mockContext.Object);

            UploadController controller = new(parser, repo);

            string fileContent = $@"PC DateTime: 01.04.2022 11:19:24
UPS DateTime: 01.04.2022 11:19:19
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=0 - SubUnit=0
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=1 - SubUnit=0
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=1
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=2
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=3
INI File name :  MAPK_ByPass_v2_00_00.ini; Unit=1 - SubUnit=14
Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:43.740 ; 1 ; 0 ; S009 ; In Service mode ; OFF ; BIN ; 0 ; 0xFFE0FFFF
01/04/2022 ; 11:17:43.640 ; 1 ; 0 ; COMMAND (Ethernet) ; [-] ; Service Mode OFF ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0100 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 87 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_UniPermission ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:16:56.038 ; 1 ; 0 ; CCX04 ; Reset History Log ; ON ; BIN ; 0 ; 0xFFD3D3D3
";

            byte[] bytes = Encoding.ASCII.GetBytes(fileContent);
            FormFile formFile = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, "File.csv");

            StatusCodeResult result = (StatusCodeResult)controller.Upload(formFile);

            Assert.AreEqual(201, result.StatusCode);
        
        }

        [TestMethod()]
        public void BadParsingUploadTest() {
            
            Parser parser = new();

            var fileMock = CreateDbSetMock(new List<LogFile>());
            var eventsMock = CreateDbSetMock(new List<Event>());
            var logLineMock = CreateDbSetMock(new List<SmartLogStatistics.Model.Log>());
            var firmwareMock = CreateDbSetMock(new List<Firmware>());

            var transactionMock = new Mock<IDbContextTransaction>();

            var mockContext = new Mock<SmartLogContext>();

            var dbMock = new Mock<DatabaseFacade>(mockContext.Object);
            dbMock.Setup(m => m.BeginTransaction()).Returns(transactionMock.Object);
            
            mockContext.Setup(m => m.Database).Returns(dbMock.Object);
            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            UploadRepositoryPgSql repo = new(mockContext.Object);

            UploadController controller = new(parser, repo);

            string fileContent = $@"BAD STRNG: 01.04.2022 11:19:24
UPS DateTime: 01.04.2022 11:19:19
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=0 - SubUnit=0
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=1 - SubUnit=0
INI File name :  MAPK_ByPass_v2_00_00.ini; Unit=1 - SubUnit=14
Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F
";

            byte[] bytes = Encoding.ASCII.GetBytes(fileContent);
            FormFile formFile = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, "File.csv");

            ObjectResult result = (ObjectResult)controller.Upload(formFile);

            Assert.AreEqual(400, result.StatusCode);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 1, Message = "Impossibile fare l'analisi della riga PC DateTime" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        
        }

        [TestMethod()]
        public void AlreayExistingUploadTest() {

            Parser parser = new();

            var file = new LogFile
            {
                filename = "test.csv",
                PC_datetime = DateTime.Now,
                UPS_datetime = DateTime.Now,
            };

            var fileMock = CreateDbSetMock(new List<LogFile>() { file });
            var eventsMock = CreateDbSetMock(new List<Event>());
            var logLineMock = CreateDbSetMock(new List<SmartLogStatistics.Model.Log>());
            var firmwareMock = CreateDbSetMock(new List<Firmware>());

            var transactionMock = new Mock<IDbContextTransaction>();

            var mockContext = new Mock<SmartLogContext>();

            var dbMock = new Mock<DatabaseFacade>(mockContext.Object);
            dbMock.Setup(m => m.BeginTransaction()).Returns(transactionMock.Object);

            mockContext.Setup(m => m.Database).Returns(dbMock.Object);
            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);

            UploadRepositoryPgSql repo = new(mockContext.Object);

            UploadController controller = new(parser, repo);

            string fileContent = $@"PC DateTime: 01.04.2022 11:19:24
UPS DateTime: 01.04.2022 11:19:19
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=0 - SubUnit=0
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=1 - SubUnit=0
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=1
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=2
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=3
INI File name :  MAPK_ByPass_v2_00_00.ini; Unit=1 - SubUnit=14
Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:43.740 ; 1 ; 0 ; S009 ; In Service mode ; OFF ; BIN ; 0 ; 0xFFE0FFFF
01/04/2022 ; 11:17:43.640 ; 1 ; 0 ; COMMAND (Ethernet) ; [-] ; Service Mode OFF ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0100 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 87 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_UniPermission ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:16:56.038 ; 1 ; 0 ; CCX04 ; Reset History Log ; ON ; BIN ; 0 ; 0xFFD3D3D3
";

            byte[] bytes = Encoding.ASCII.GetBytes(fileContent);
            FormFile formFile = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, "test.csv");

            ObjectResult result = (ObjectResult)controller.Upload(formFile);

            Assert.AreEqual(409, result.StatusCode);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 6, Message = "Il file è già stato salvato nel database" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);

        }

        [TestMethod()]
        public void ServerFailTest() {
            Parser parser = new();

            var fileMock = CreateDbSetMock(new List<LogFile>());
            var eventsMock = CreateDbSetMock(new List<Event>());
            var logLineMock = CreateDbSetMock(new List<SmartLogStatistics.Model.Log>());
            var firmwareMock = CreateDbSetMock(new List<Firmware>());

            var transactionMock = new Mock<IDbContextTransaction>();

            var mockContext = new Mock<SmartLogContext>();

            var dbMock = new Mock<DatabaseFacade>(mockContext.Object);
            dbMock.Setup(m => m.BeginTransaction()).Returns(transactionMock.Object);

            mockContext.Setup(m => m.Database).Returns(dbMock.Object);
            mockContext.Setup(m => m.File).Returns(fileMock.Object);
            mockContext.Setup(m => m.Log).Returns(logLineMock.Object);
            mockContext.Setup(m => m.Firmware).Returns(firmwareMock.Object);
            mockContext.Setup(m => m.Event).Returns(eventsMock.Object);
            mockContext.Setup(m => m.SaveChanges()).Throws(new DbUpdateException());

            UploadRepositoryPgSql repo = new(mockContext.Object);

            UploadController controller = new(parser, repo);

            string fileContent = $@"PC DateTime: 01.04.2022 11:19:24
UPS DateTime: 01.04.2022 11:19:19
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=0 - SubUnit=0
INI File name :  MAPK_Unit_v2_00_00.ini; Unit=1 - SubUnit=0
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=1
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=2
INI File name :  MAPK_Module_RD_IV_v2_00_00.ini; Unit=1 - SubUnit=3
INI File name :  MAPK_ByPass_v2_00_00.ini; Unit=1 - SubUnit=14
Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:18:24.443 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:43.740 ; 1 ; 0 ; S009 ; In Service mode ; OFF ; BIN ; 0 ; 0xFFE0FFFF
01/04/2022 ; 11:17:43.640 ; 1 ; 0 ; COMMAND (Ethernet) ; [-] ; Service Mode OFF ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0100 ; Hex ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 87 ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:17:30.040 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_UniPermission ; [-] ; 0 ; 0xFFADFF2F
01/04/2022 ; 11:16:56.038 ; 1 ; 0 ; CCX04 ; Reset History Log ; ON ; BIN ; 0 ; 0xFFD3D3D3
";

            byte[] bytes = Encoding.ASCII.GetBytes(fileContent);
            FormFile formFile = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, "File.csv");

            ObjectResult result = (ObjectResult)controller.Upload(formFile);

            Assert.AreEqual(500, result.StatusCode);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 4, Message = "Connessione con il database fallita" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

    }
}
