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
            repository.Setup(x => x.Frequency(DateTime.Now, DateTime.Now, false, false, false, false)).Returns(new FrequencyDto());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Frequency(DateTime.Now, DateTime.Now, false, false, false, false);

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void CumulativeTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.Cumulative(DateTime.Now, DateTime.Now, "AZ")).Returns(new CumulativeDto());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.Cumulative(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(200, result.StatusCode);
        }


        [TestMethod()]
        public void TotalByCodeTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByCode(DateTime.Now, DateTime.Now)).Returns(new TotalByCodeDto());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByCode(DateTime.Now, DateTime.Now);

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void TotalByFirmwareTest()
        {
            Mock<DataRepository> repository = new();
            repository.Setup(x => x.TotalByFirmware(DateTime.Now, DateTime.Now, "AZ")).Returns(new TotalByFirmwareDto());

            DataController dataController = new(repository.Object);
            ObjectResult result = (ObjectResult)dataController.TotalByFirmware(DateTime.Now, DateTime.Now, "AZ");

            Assert.AreEqual(200, result.StatusCode);
        }

    }
}