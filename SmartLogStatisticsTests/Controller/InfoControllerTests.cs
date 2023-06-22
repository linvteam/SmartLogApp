using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Controller.Tests {
    [TestClass()]
    public class InfoControllerTests
    {
        /// <summary>
        /// TUS-38: Verifica che la richiesta della lista dei codici degli eventi salvati (con relative descrizioni) dia esito positivo
        /// </summary>
        [TestMethod()]
        public void GetCodeWithDescriptionTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetCodesWithDescription());

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetCodeWithDescription();

            Assert.AreEqual(200, result.StatusCode);
        }

        /// <summary>
        /// TUS-39: Verifica che la richiesta della lista dei codici degli eventi salvati (con relative descrizioni) dia esito "NotFound"
        /// </summary>
        [TestMethod()]
        public void GetCodeWithDescriptionEmptyEventTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetCodesWithDescription()).Throws(new EmptyOrFailedQueryException());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetCodeWithDescription();

            Assert.AreEqual(404, result.StatusCode);
        }
        
        /// <summary>
        /// TUS-40: Verifica che la richiesta della lista dei codici degli eventi salvati (con relative descrizioni) dia esito "InternalServerError"
        /// </summary>
        [TestMethod()]
        public void GetCodeWithDescriptionInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetCodesWithDescription()).Throws(new FailedConnectionException());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetCodeWithDescription();

            Assert.AreEqual(500, result.StatusCode);
        }
        
        /// <summary>
        /// TUS-41: Verifica che la richiesta dell'intervallo degli eventi salvati dia esito positivo
        /// </summary>
        [TestMethod()]
        public void GetTimeIntervalTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetTimeInterval());

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetTimeInterval();

            Assert.AreEqual(200, result.StatusCode);
        }

        /// <summary>
        /// TUS-42: Verifica che la richiesta della lista dell'intervallo degli eventi salvati (con relative descrizioni) dia esito "NotFound"
        /// </summary>
        [TestMethod()]
        public void GetTimeIntervalEmptyLogTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetTimeInterval()).Throws(new EmptyOrFailedQueryException());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetTimeInterval();

            Assert.AreEqual(404, result.StatusCode);
        }

        /// <summary>
        /// TUS-43: Verifica che la richiesta della lista dell'intervallo degli eventi salvati (con relative descrizioni) dia esito "InternalServerError"
        /// </summary>
        [TestMethod()]
        public void GetTimeIntervalInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetTimeInterval()).Throws(new FailedConnectionException());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetTimeInterval();

            Assert.AreEqual(500, result.StatusCode);
        }
        
        /// <summary>
        /// TUS-44: Verifica che la richiesta della lista dei firmware degli eventi salvati dia esito positivo
        /// </summary>        
        [TestMethod()]
        public void GetFirmwareListTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList());

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(200, result.StatusCode);
        }

        /// <summary>
        /// TUS-45: Verifica che la richiesta della lista dei firmware degli eventi salvati dia esito "NotFound"
        /// </summary> 
        [TestMethod()]
        public void GetFirmwareListEmptyFirmwareTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList()).Throws(new EmptyOrFailedQueryException());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(404, result.StatusCode);
        }

        /// <summary>
        /// TUS-46: Verifica che la richiesta della lista dei firmware degli eventi salvati dia esito "InternalServerError"
        /// </summary> 
        [TestMethod()]
        public void GetFirmwareListInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList()).Throws(new FailedConnectionException());
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(500, result.StatusCode);
        }
    }
}