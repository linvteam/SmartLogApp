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
        /// <summary>
        /// TUS-47: Verifica che la richiesta delle statistiche dia esito positivo
        /// </summary> 
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
        
        /// <summary>
        /// TUS-48: Verifica che la richiesta delle statistiche dia esito "BadRequest" in caso di date incompatibili
        /// </summary> 
        [TestMethod()]
        public void StatisticsIncompatibleDatesTest()
        {
            DateTime start = new DateTime(2023, 01, 10, 15, 0, 0, 000);
            DateTime end = new DateTime(2023, 01, 01, 15, 0, 0, 000);
            
            Mock<StatisticsRepository> repository = new();
            StatisticsDto dto = new StatisticsDto(start, end, new List<StatisticsDto.Statistic> {
                new StatisticsDto.Statistic("Numero di file", 1),
                new StatisticsDto.Statistic("Massimo numero di eventi", 1),
                new StatisticsDto.Statistic("Media di eventi", 1),
                new StatisticsDto.Statistic("Deviazione standard", 0)
            });
            repository.Setup(x => x.Statistics(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Returns(dto);

            StatisticsController statisticsController = new(repository.Object);
            ObjectResult result = (ObjectResult)statisticsController.Statistics(start, end);
            Assert.AreEqual(400, result.StatusCode);
        }
        
        /// <summary>
        /// TUS-49: Verifica che la richiesta delle statistiche dia esito "InternalServerError"
        /// </summary> 
        [TestMethod()]
        public void StatisticsInternalServerErrorTest()
        {
            Mock<StatisticsRepository> repository = new();
            repository.Setup(x => x.Statistics(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Throws(new Exceptions.FailedConnectionException());
            DateTime start = new DateTime(2023, 01, 05, 15, 0, 0, 000);
            DateTime end = new DateTime(2023, 01, 10, 15, 0, 0, 000);

            StatisticsController statisticsController = new(repository.Object);
            ObjectResult result = (ObjectResult)statisticsController.Statistics(start, end);
            
            Assert.AreEqual(500, result.StatusCode);
        }
        
        /// <summary>
        /// TUS-50: Verifica che la richiesta delle statistiche dia esito "BadRequest" in caso di assenza di dati nell'intervallo selezionato
        /// </summary> 
        [TestMethod()]
        public void StatisticsEmptyOrFailedQueryTest()
        {
            Mock<StatisticsRepository> repository = new();
            repository.Setup(x => x.Statistics(It.IsAny<DateTime>(), It.IsAny<DateTime>())).Throws(new Exceptions.EmptyOrFailedQueryException());
            DateTime start = new DateTime(2023, 01, 05, 15, 0, 0, 000);
            DateTime end = new DateTime(2023, 01, 10, 15, 0, 0, 000);

            StatisticsController statisticsController = new(repository.Object);
            ObjectResult result = (ObjectResult)statisticsController.Statistics(start, end);
            
            Assert.AreEqual(400, result.StatusCode);
        }
    }
}