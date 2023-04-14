using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;
using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using SmartLogViewer.Controllers;

namespace SmartLogViewer.Tests{
    
    /// <summary>
    /// In questa classe sono testate le possibili risposte che il back-end può dare ad una chiamata POST sull'endpoint api/parse
    /// </summary>
    [TestClass()]
    public class ParseControllerTests
    {
        
        [TestMethod()]
        public void Instantiation() {
            Parser parser = new Parser();
            Assert.IsNotNull(new ParseController(parser));
        }
        
        [TestMethod()]
        public void CorrectRequest()
        {
            // Costruzione dell'oggetto di tipo Log atteso
            string fileName = "example.csv";
            DateTime PCDateTime = new DateTime(2022, 03, 05, 08, 47, 18);
            DateTime UPSDateTime = new DateTime(2022, 03, 05, 08, 47, 17);
            List<INIFile> INIFiles = new List<INIFile>();
                INIFiles.AddRange(new List<INIFile>()
                    {
                        new INIFile("MAPK_Unit_v2_04_00.ini", 0, 0),
                        new INIFile("MAPK_Unit_v2_04_00.ini", 1, 0),
                        new INIFile("MAPK_Module_RD_IV_v2_04_00.ini", 1, 1),
                        new INIFile("MAPK_ByPass_v2_04_00.ini", 1, 14),
                    });
            Header header = new Header(PCDateTime, UPSDateTime, INIFiles);
            List<LogRow> LogRows = new List<LogRow>();
            LogRows.AddRange(new List<LogRow>()
            {
                new LogRow(new DateOnly(2022,03,05), new TimeOnly(08,36,29,618),1,0,"S000", "Load protected by inverter",true,"0xFFE0FFFF"),
                new LogRow(new DateOnly(2022,03,05), new TimeOnly(08,36,29,238),1,14,"ES047", "Inverter contactor/relay is closed",true,"0xFFE0FFFF"),
            });

            Log expected = new Log(fileName, header, LogRows);
            
            // Mocking del parser
            var mockParser = new Mock<Parser>();
            mockParser.Setup(parser => parser.Parse(It.IsAny<string>(), It.IsAny<TextReader>())).Returns(expected);
            ParseController controller = new ParseController(mockParser.Object);
            
            // Creazione dello stream di lettura per il parser
            byte[] bytes = Encoding.ASCII.GetBytes("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S000 ; Load protected by inverter ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.238 ; 1 ; 14 ; ES047 ; Inverter contactor/relay is closed ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            FormFile file = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, fileName);

            // Metodo associato alla chiamata POST su endpoint api/parse
            ObjectResult result = (ObjectResult) controller.Upload(file);

            // Conversione del valore ritornato dalla chiamata POST
            var actual = (Log) result.Value;

            // Asserzione sul codice HTTP di ritorno della chiamata
            Assert.AreEqual(201, result.StatusCode);
            
            // Asserzioni sull'header custom del file di log
            Assert.AreEqual(expected.FileName, actual.FileName);
            Assert.AreEqual(expected.Header.PCDate, actual.Header.PCDate);
            Assert.AreEqual(expected.Header.UPSDate, actual.Header.UPSDate);

            for (int i = 0; i < expected.Header.INIFile.Count; i++) {
                Assert.AreEqual(expected.Header.INIFile[i].FileName, actual.Header.INIFile[i].FileName);
                Assert.AreEqual(expected.Header.INIFile[i].Unit, actual.Header.INIFile[i].Unit);
                Assert.AreEqual(expected.Header.INIFile[i].SubUnit, actual.Header.INIFile[i].SubUnit);
            }
            
            // Asserzioni sui dati del file di log
            for (int i = 0; i < expected.Events.Count; i++) {
                Assert.AreEqual(expected.Events[i].Date, actual.Events[i].Date);
                Assert.AreEqual(expected.Events[i].Time, actual.Events[i].Time);
                Assert.AreEqual(expected.Events[i].Unit, actual.Events[i].Unit);
                Assert.AreEqual(expected.Events[i].SubUnit, actual.Events[i].SubUnit);
                Assert.AreEqual(expected.Events[i].Code, actual.Events[i].Code);
                Assert.AreEqual(expected.Events[i].Description, actual.Events[i].Description);
                Assert.AreEqual(expected.Events[i].Value, actual.Events[i].Value);
                Assert.AreEqual(expected.Events[i].Color, actual.Events[i].Color);
            }
        }

        [TestMethod()]
        public void WrongRequest()
        {
            // Costruzione dell'oggetto di eccezione
            
            ParsingException exception = new ParsingException(
                "Impossibile eseguire il parsing del contenuto del file CSV", ParsingException.ErrorCode.FormatoErrato);
            string fileName = "example.csv";
            
            // Mocking del parser
            var mockParser = new Mock<Parser>();
            mockParser.Setup(parser => parser.Parse(It.IsAny<string>(), It.IsAny<TextReader>())).Throws(exception);
            ParseController controller = new ParseController(mockParser.Object);
            
            // Creazione dello stream di lettura per il parser
            byte[] bytes = Encoding.ASCII.GetBytes("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S000 ; Load protected by inverter ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.238 ; 1 ; 14 ; ES047 ; Inverter contactor/relay is closed ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            FormFile file = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, fileName);

            // Metodo associato alla chiamata POST su endpoint api/parse
            ObjectResult result = (ObjectResult)controller.Upload(file);
            
            // Conversione del risultato della chiamata POST in un oggetto di tipo anonimo
            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            // Costruzione dell'oggetto di tipo anonimo atteso
            var expected = new { Code = 1, Message = "Impossibile eseguire il parsing del contenuto del file CSV" };
            
            // Asserzioni
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(expected.Code, actual.Code);
            Assert.AreEqual(expected.Message, actual.Message);
        }
    }
}