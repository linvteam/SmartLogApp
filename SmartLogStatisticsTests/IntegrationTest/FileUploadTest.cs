using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Core;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Controller;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SmartLogStatisticsTests.IntegrationTest {
    [TestClass]
    public class FileUploadTest {

        private readonly SmartLogContext _context;
        private readonly UploadController _controller;

        public FileUploadTest() {
            string databaseName = Guid.NewGuid().ToString();

            var options = new DbContextOptionsBuilder<SmartLogContext>().UseNpgsql($"Host=localhost;Database={databaseName};Username=Utente;Password=Password")
                                                                        .Options;
            _context = new SmartLogContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _controller = new UploadController(new Parser(),new UploadRepositoryPgSql(_context));
        }

        /**
         * TIS-18
         * Verificare che l'upload dei file avvenga correttamente
         */
        [TestMethod()]
        public void GoodUploadTest() {

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

            StatusCodeResult result = (StatusCodeResult)_controller.Upload(formFile);

            Assert.AreEqual(201, result.StatusCode);
        
        }
        
        /**
         * TIS-19
         * Verificare che venga segnalato un errore in caso che un file non venga letto correttamente
         */
        [TestMethod()]
        public void BadParsingUploadTest() {

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

            ObjectResult result = (ObjectResult)_controller.Upload(formFile);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);
            var expected = new { Code = 1, Message = "Impossibile fare l'analisi della riga PC DateTime" };
            
            Assert.AreEqual(400, result.StatusCode);
            Assert.IsNotNull(actual);
            Assert.AreEqual(expected, actual);
        
        }

        /**
         * TIS-20
         * Verificare che venga segnalato un errore nel caso in cui un file che si cerca di caricare sia già presente nel database
         */
        [TestMethod()]
        public void AlreayExistingUploadTest() {

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

            _controller.Upload(formFile);

            ObjectResult result = (ObjectResult)_controller.Upload(formFile);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);
            var expected = new { Code = 6, Message = "Il file è già stato salvato nel database" };
            
            Assert.AreEqual(409, result.StatusCode);
            Assert.IsNotNull(actual);
            Assert.AreEqual(expected, actual);

        }

        [TestCleanup()]
        public void TeardownDatabase() {
            _context.Database.EnsureDeleted();
        }

    }
}
