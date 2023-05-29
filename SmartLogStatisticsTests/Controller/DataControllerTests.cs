using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Controller;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLogStatistics.Controller.Tests
{
    [TestClass()]
    public class DataControllerTests
    {
        [TestMethod()]
        public void FrequencyTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Frequency(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>())).Returns(new FrequencyDto(new List<LogRowEnhanced>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Frequency(DateTime.Now, DateTime.Now, false, false, false, false);

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void FrequencyTestBadRequest()
        {
            var startDateTime = DateTime.Parse("Jan 1, 2009");
            var endDateTime = DateTime.Parse("Jan 1, 2008");
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Frequency(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>())).Returns(new FrequencyDto(new List<LogRowEnhanced>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Frequency(startDateTime, endDateTime, false, false, false, false);

            Assert.AreEqual(400, result.StatusCode);
        }

        [TestMethod()]
        public void FrequencyTestInternalServerError()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Frequency(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>())).Throws(new Exception("Internal Server Error"));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Frequency(DateTime.Now, DateTime.Now, false, false, false, false);

            Assert.AreEqual(500, result.StatusCode);
        }





        [TestMethod()]
        public void CumulativeTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Cumulative(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new CumulativeDto("AZ",new List<CumulativeRecord>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Cumulative(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void CumulativeTestBadRequest()
        {
            var startDateTime = DateTime.Parse("Jan 1, 2009");
            var endDateTime = DateTime.Parse("Jan 1, 2008");
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Cumulative(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new CumulativeDto("AZ",new List<CumulativeRecord>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Cumulative(startDateTime, endDateTime, "AZ");

            Assert.AreEqual(400, result.StatusCode);
        }

        [TestMethod()]
        public void CumulativeTestInternalServerError()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Cumulative(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Throws(new Exception("Internal Server Error"));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Cumulative(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(500, result.StatusCode);
        }





        [TestMethod()]
        public void TotalByCodeTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByCode(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(new TotalByCodeDto(new List<CodeOccurrence>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByCode(DateTime.Now, DateTime.Now);

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void TotalByCodeTestBadRequest()
        {
            var startDateTime = DateTime.Parse("Jan 1, 2009");
            var endDateTime = DateTime.Parse("Jan 1, 2008");
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByCode(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(new TotalByCodeDto(new List<CodeOccurrence>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByCode(startDateTime, endDateTime);

            Assert.AreEqual(400, result.StatusCode);
        }

        [TestMethod()]
        public void TotalByCodeTestInternalServerError()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByCode(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Throws(new Exception("Internal Server Error"));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByCode(DateTime.Now, DateTime.Now);

            Assert.AreEqual(500, result.StatusCode);
        }






        [TestMethod()]
        public void TotalByFirmwareTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByFirmware(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new TotalByFirmwareDto(new List<FirmwareOccurrence>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByFirmware(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void TotalByFirmwareTestBadRequest()
        {
            var startDateTime = DateTime.Parse("Jan 1, 2009");
            var endDateTime = DateTime.Parse("Jan 1, 2008");
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByFirmware(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new TotalByFirmwareDto(new List<FirmwareOccurrence>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByFirmware(startDateTime, endDateTime, "AZ");

            Assert.AreEqual(400, result.StatusCode);
        }

        [TestMethod()]
        public void TotalByFirmwareTestInternalServerError()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByFirmware(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Throws(new Exception("Internal Server Error"));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByFirmware(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(500, result.StatusCode);
        }

    }
}