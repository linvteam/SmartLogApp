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
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Controller.Tests
{
    [TestClass()]
    public class DataControllerTests
    {
        [TestMethod()]
        public void FrequencyTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Frequency(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>())).Returns(new FrequencyDto(DateTime.Now, DateTime.Now,new List<LogRowEnhanced>(), new List<string>() { "code"}));

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
            repository.Setup(x => x.Frequency(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>())).Returns(new FrequencyDto(startDateTime,endDateTime,new List<LogRowEnhanced>(),new List<string>() { "code"}));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Frequency(startDateTime, endDateTime, false, false, false, false);

            Assert.AreEqual(400, result.StatusCode);
        }
        
        [TestMethod()]
        public void FrequencyTestNotFound()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Frequency(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>(), It.IsAny<Boolean>())).Throws(new EmptyOrFailedQueryException());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Frequency(DateTime.Now, DateTime.Now, false, false, false, false);

            Assert.AreEqual(404, result.StatusCode);
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
            repository.Setup(x => x.Cumulative(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new CumulativeDto(DateTime.Now,DateTime.Now,"AZ",new List<CumulativeRecord>()));

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
            repository.Setup(x => x.Cumulative(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new CumulativeDto(startDateTime,endDateTime,"AZ",new List<CumulativeRecord>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Cumulative(startDateTime, endDateTime, "AZ");

            Assert.AreEqual(400, result.StatusCode);
        }
        
        [TestMethod()]
        public void CumulativeTestNotFound()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Cumulative(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Throws(new EmptyOrFailedQueryException());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Cumulative(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(404, result.StatusCode);
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
            repository.Setup(x => x.TotalByCode(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(new TotalByCodeDto(DateTime.Now, DateTime.Now, new List<CodeOccurrence>()));

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
            repository.Setup(x => x.TotalByCode(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(new TotalByCodeDto(startDateTime,endDateTime,new List<CodeOccurrence>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByCode(startDateTime, endDateTime);

            Assert.AreEqual(400, result.StatusCode);
        }
        
        [TestMethod()]
        public void TotalByCodeTestNotFound()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByCode(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Throws(new EmptyOrFailedQueryException());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByCode(DateTime.Now, DateTime.Now);

            Assert.AreEqual(404, result.StatusCode);
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
            repository.Setup(x => x.TotalByFirmware(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new TotalByFirmwareDto(DateTime.Now,DateTime.Now,"AZ",new List<FirmwareOccurrence>()));

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
            repository.Setup(x => x.TotalByFirmware(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Returns(new TotalByFirmwareDto(startDateTime,endDateTime,"AZ",new List<FirmwareOccurrence>()));

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByFirmware(startDateTime, endDateTime, "AZ");

            Assert.AreEqual(400, result.StatusCode);
        }
        
        [TestMethod()]
        public void TotalByFirmwareTestNotFound()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByFirmware(It.IsAny<DateTime>(), It.IsAny<DateTime>(), "AZ")).Throws(new EmptyOrFailedQueryException());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByFirmware(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(404, result.StatusCode);
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