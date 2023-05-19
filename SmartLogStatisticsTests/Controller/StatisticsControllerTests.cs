using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Repository;
using System.Text;
using SmartLogStatistics.Model;

namespace SmartLogStatistics.Controller.Tests
{
    [TestClass()]
    public class StatisticsControllerTests
    {
        [TestMethod()]
        public void StatisticsSuccessfulTest()
        {
            Mock<StatisticsRepository> repository = new();
            Mock<StatisticsDto> dto = new();
            repository.Setup(x => x.Statistics(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(dto.Object);
            DateTime start = new DateTime(2023, 01, 01, 15, 0, 0, 000);
            DateTime end = new DateTime(2023, 01, 10, 15, 0, 0, 000);

            StatisticsController statisticsController = new(repository.Object);
            ObjectResult result = (ObjectResult)statisticsController.Statistics(start, end);

            Assert.AreEqual(200, result.StatusCode);
        }
        
        [TestMethod()]
        public void StatisticsInvalidFormatStartDateTest()
        {
            Mock<StatisticsRepository> repository = new();
            repository.Setup(x => x.Statistics(It.IsAny<DateTime>(), It.IsAny<DateTime>()));
            DateTime start = new DateTime(2023, 01, 01, 15, 0, 0, 000);
            DateTime end = new DateTime(2023, 01, 10, 15, 0, 0, 000);

            StatisticsController statisticsController = new(repository.Object);
            ObjectResult result = (ObjectResult)statisticsController.Statistics(start, end);

            Assert.AreEqual(200, result.StatusCode);
        }
        
        /**[TestMethod()]
        public void StatisticsInvalidFormatEndDateTest()
        {
            
        }
        
        [TestMethod()]
        public void StatisticsIncopatibleDatesTest()
        {
            
        }
        
        [TestMethod()]
        public void StatisticsInternalServerErrorTest()
        {
            
        }*/
    }
}