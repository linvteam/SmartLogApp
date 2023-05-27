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
            DateTime start = new DateTime(2023, 01, 01, 15, 0, 0, 000);
            DateTime end = new DateTime(2023, 01, 10, 15, 0, 0, 000);

            Mock<StatisticsRepository> repository = new();
            StatisticsDto dto = new StatisticsDto(start, end, new List<StatisticsDto.Statistic> {
                new StatisticsDto.Statistic("Numero di file", 1),
                new StatisticsDto.Statistic("Massimo numero di eventi", 1),
                new StatisticsDto.Statistic("Media di eventi", 1),
                new StatisticsDto.Statistic("Deviazione standard", 0)
            });;
            repository.Setup(x => x.Statistics(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(dto);

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