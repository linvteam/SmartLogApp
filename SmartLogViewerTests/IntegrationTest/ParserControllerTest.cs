using Core;
using CsvHelper.Expressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SmartLogViewer.Controllers;
using System;
using System.IO;
using System.Text;

namespace SmartLogViewerTests.IntegrationTest {
    [TestClass]
    public class ParserControllerTest {

        /// <summary>
        /// TIV-1: Verifica che la classe esegua correttamente il parsing di un file di log
        /// </summary>
        [TestMethod()]
        public void ParsingGoodFile() {
            Parser parser = new();
            ParseController controller = new(parser);

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

            ObjectResult res = (ObjectResult)controller.Upload(formFile);

            Assert.AreEqual(201, res.StatusCode);

            Assert.IsNotNull(res.Value);
            Log? parsedLog = (Log)res.Value;
            Assert.IsNotNull(parsedLog);

            Assert.AreEqual("File.csv", parsedLog.FileName);
            Assert.AreEqual(new DateTime(2022, 04, 01, 11, 19, 24), parsedLog.Header.PCDate);
            Assert.AreEqual(new DateTime(2022, 04, 01, 11, 19, 19), parsedLog.Header.UPSDate);

            // Assert INI File, solo due a campione:

            Assert.AreEqual(6, parsedLog.Header.INIFile.Count);

            Assert.AreEqual("MAPK_Unit_v2_00_00.ini", parsedLog.Header.INIFile[0].FileName);
            Assert.AreEqual(0, parsedLog.Header.INIFile[0].Unit);
            Assert.AreEqual(0, parsedLog.Header.INIFile[0].SubUnit);

            Assert.AreEqual("MAPK_Unit_v2_00_00.ini", parsedLog.Header.INIFile[1].FileName);
            Assert.AreEqual(1, parsedLog.Header.INIFile[1].Unit);
            Assert.AreEqual(0, parsedLog.Header.INIFile[1].SubUnit);

            Assert.AreEqual(2, parsedLog.Events.Count);

            Assert.AreEqual(new DateOnly(2022, 04, 01), parsedLog.Events[0].Date);
            Assert.AreEqual(new TimeOnly(11, 17, 43, 740), parsedLog.Events[0].Time);
            Assert.AreEqual(1, parsedLog.Events[0].Unit);
            Assert.AreEqual(0, parsedLog.Events[0].SubUnit);
            Assert.AreEqual("S009", parsedLog.Events[0].Code);
            Assert.AreEqual("In Service mode", parsedLog.Events[0].Description);
            Assert.AreEqual(false, parsedLog.Events[0].Value);
            Assert.AreEqual("0xFFE0FFFF", parsedLog.Events[0].Color);

        }

        /// <summary>
        /// TIV-2: Verifica che la classe esegua correttamente il parsing di un file di log senza dati
        /// </summary>
        [TestMethod()]
        public void TestParseHeaderNoData() {
            Parser parser = new();
            ParseController controller = new(parser);

            string fileContent = "PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color";
            byte[] bytes = Encoding.UTF8.GetBytes(fileContent);
            FormFile formFile = new(new MemoryStream(bytes), 0, bytes.Length, null, "File.csv");

            ObjectResult res = (ObjectResult)controller.Upload(formFile);

            Assert.AreEqual(201, res.StatusCode);

            Assert.IsNotNull(res.Value);
            Log? parsedLog = (Log)res.Value;
            Assert.IsNotNull(parsedLog);

            Assert.AreEqual("File.csv", parsedLog.FileName);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), parsedLog.Header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), parsedLog.Header.UPSDate);
            Assert.AreEqual("MAPK_Unit_v2_04_00.ini", parsedLog.Header.INIFile[0].FileName);
            Assert.AreEqual(0, parsedLog.Header.INIFile[0].Unit);
            Assert.AreEqual(0, parsedLog.Header.INIFile[0].SubUnit);
            Assert.AreEqual("MAPK_Unit_v2_04_00.ini", parsedLog.Header.INIFile[1].FileName);
            Assert.AreEqual(1, parsedLog.Header.INIFile[1].Unit);
            Assert.AreEqual(0, parsedLog.Header.INIFile[1].SubUnit);
            Assert.AreEqual(0, parsedLog.Events.Count);
        }

        /// <summary>
        /// TIV-3: Verifica che la classe ritorni un errore provando ad eseguire il parsing di un file di log senza header
        /// </summary>
        [TestMethod()]
        public void NoHeader() {
            Parser parser = new();
            ParseController controller = new(parser);
            string fileContent = "Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:38:21.719 ; 1 ; 0 ; S009 ; In Service mode ; ON ; BIN ; 0 ; 0xFFE0FFFF";

            byte[] bytes = Encoding.UTF8.GetBytes(fileContent);
            FormFile formFile = new(new MemoryStream(bytes), 0, bytes.Length, null, "File.csv");

            ObjectResult res = (ObjectResult)controller.Upload(formFile);
            Assert.AreEqual(400, res.StatusCode);

            Assert.IsNotNull(res.Value);

        }

        /// <summary>
        /// TIV-4: Verifica che la classe ritorni un errore provando ad eseguire il parsing di un file di log vuoto
        /// </summary>
        [TestMethod()]
        public void EmptyFile() {
            Parser parser = new();
            ParseController controller = new(parser);
            string fileContent = "";
            byte[] bytes = Encoding.ASCII.GetBytes(fileContent);
            FormFile formFile = new(new MemoryStream(bytes), 0, bytes.Length, null, "File.csv");

            ObjectResult res = (ObjectResult)controller.Upload(formFile);
            Assert.AreEqual(400, res.StatusCode);

            Assert.IsNotNull(res.Value);
        }
    }
}
