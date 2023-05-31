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
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Controller.Tests
{
    [TestClass()]
    public class InfoControllerTests
    {
        [TestMethod()]
        public void GetCodeWithDescriptionTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetCodesWithDescription());

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetCodeWithDescription();

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void GetCodeWithDescriptionEmptyEventTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetCodesWithDescription()).Throws(new EmptyOrFailedQuery());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetCodeWithDescription();

            Assert.AreEqual(404, result.StatusCode);
        }
        
        [TestMethod()]
        public void GetCodeWithDescriptionInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetCodesWithDescription()).Throws(new FailedConnection());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetCodeWithDescription();

            Assert.AreEqual(500, result.StatusCode);
        }
        
        
        [TestMethod()]
        public void GetTimeIntervalTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetTimeInterval());

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetTimeInterval();

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void GetTimeIntervalEmptyLogTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetTimeInterval()).Throws(new EmptyOrFailedQuery());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetTimeInterval();

            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod()]
        public void GetTimeIntervalInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetTimeInterval()).Throws(new FailedConnection());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetTimeInterval();

            Assert.AreEqual(500, result.StatusCode);
        }
        
        
        [TestMethod()]
        public void GetFirmwareListTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList());

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod()]
        public void GetFirmwareListEmptyFirmwareTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList()).Throws(new EmptyOrFailedQuery());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod()]
        public void GetFirmwareListInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList()).Throws(new FailedConnection());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(500, result.StatusCode);
        }
    }
}