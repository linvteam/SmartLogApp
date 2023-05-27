using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Controller;
using SmartLogStatistics.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLogStatistics.Controller.Tests
{
    [TestClass()]
    public class UploadControllerTests
    {
        [TestMethod()]
        public void UploadTest()
        {
            List<LogRow> logRow = new List<LogRow> {new LogRow(new DateOnly(), new TimeOnly(), 1,2,"B", "S",false,"0x000000") };
            Log log = new("Name", new Header(DateTime.Now, DateTime.Now, new List<INIFile> {new INIFile("B",1,2)}), logRow);
            Mock<Parser> parser = new();
            Mock<UploadRepository> repository = new();
            parser.Setup(x => x.Parse(It.IsAny<string>(),It.IsAny<TextReader>())).Returns(log);
            repository.Setup(x => x.Upload(It.IsAny<Log>()));
            byte[] bytes = Encoding.ASCII.GetBytes("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S000 ; Load protected by inverter ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.238 ; 1 ; 14 ; ES047 ; Inverter contactor/relay is closed ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            FormFile file = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, "name");

            UploadController uploadController = new(parser.Object,repository.Object);
            StatusCodeResult result = (StatusCodeResult)uploadController.Upload(file);

            Assert.AreEqual(201, result.StatusCode);
        }

        [TestMethod()]
        public void UploadTestBadRequest()
        {
            List<LogRow> logRow = new List<LogRow> { new LogRow(new DateOnly(), new TimeOnly(), 1, 2, "B", "S", false, "0x000000") };
            Log log = new("Name", new Header(DateTime.Now, DateTime.Now, new List<INIFile> { new INIFile("B", 1, 2) }), logRow);
            Mock<Parser> parser = new();
            Mock<UploadRepository> repository = new();
            parser.Setup(x => x.Parse(It.IsAny<string>(), It.IsAny<TextReader>())).Throws(new ParsingException("parsing Exception"));
            repository.Setup(x => x.Upload(It.IsAny<Log>()));
            byte[] bytes = Encoding.ASCII.GetBytes("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S000 ; Load protected by inverter ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.238 ; 1 ; 14 ; ES047 ; Inverter contactor/relay is closed ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            FormFile file = new FormFile(new MemoryStream(bytes), 0, bytes.Length, null, "name");

            UploadController uploadController = new(parser.Object, repository.Object);
            ObjectResult result = (ObjectResult)uploadController.Upload(file);

            Assert.AreEqual(400, result.StatusCode);
        }
    }
}