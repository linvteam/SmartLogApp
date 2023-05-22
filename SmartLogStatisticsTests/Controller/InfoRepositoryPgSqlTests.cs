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
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SmartLogStatistics.Model;
using Log = SmartLogStatistics.Model.Log;

namespace SmartLogStatistics.Controller.Tests
{
    [TestClass()]
    public class InfoRepositoryPgSqlTests
    {
        [TestMethod()]
        public void GetCodesWithDescriptionTest()
        {
            //TODO ANCORA DA FARE
            Mock<SmartLogContext> context = new();

            List<Log> logs = new();

            for(int i = 0; i < 10; i++) {
                Log log = new() {
                                    file_id = 1,
                                    log_line = i,
                                    date = new DateOnly(2022, 1,i+1),
                                    time = new TimeOnly(10, i, 0),
                                    code = "S009",
                                    value = i%2==1
                                };
                logs.Add(log);
            }

            Mock<DbSet<Log>> logsMock = new();

            var logQuery = logs.AsQueryable();
            logsMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(logQuery.Provider);
            logsMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(logQuery.Expression);
            logsMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(logQuery.ElementType);
            logsMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(logQuery.GetEnumerator());
            
            context.Setup(x => x.Log).Returns(logsMock.Object);
            
            InfoRepositoryPgSql infoRepository = new(context.Object);
            DateTimeIntervalDto result = infoRepository.GetTimeInterval();
            
            Assert.AreEqual(new DateTime(2022, 1, 1, 10,0,0), result.start);
            Assert.AreEqual(new DateTime(2022, 1, 10, 10,9,0), result.end);

            
        }

        [TestMethod()]
        public void GetCodeWithDescriptionInternalServerErrorTest()
        {
            
        }
        
        
        [TestMethod()]
        public void GetTimeIntervalTest()
        {
            Mock<SmartLogContext> context = new();

            List<Log> logs = new();

            for(int i = 0; i < 10; i++) {
            Log log = new() {
                                file_id = 1,
                                log_line = i,
                                date = new DateOnly(2022, 1,i+1),
                                time = new TimeOnly(10, i, 0),
                                code = "S009",
                                value = i%2==1
                            };
                logs.Add(log);
            }

            Mock<DbSet<Log>> logsMock = new();

            var logQuery = logs.AsQueryable();
            logsMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(logQuery.Provider);
            logsMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(logQuery.Expression);
            logsMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(logQuery.ElementType);
            logsMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(logQuery.GetEnumerator());
            
            context.Setup(x => x.Log).Returns(logsMock.Object);
            
            InfoRepositoryPgSql infoRepository = new(context.Object);
            DateTimeIntervalDto result = infoRepository.GetTimeInterval();
            
            Assert.AreEqual(new DateTime(2022, 1, 1, 10,0,0), result.start);
            Assert.AreEqual(new DateTime(2022, 1, 10, 10,9,0), result.end);
        }

        [TestMethod()]
        public void GetTimeIntervalInternalServerErrorTest()
        {
            
        }
        
        
        [TestMethod()]
        public void GetFirmwareListTest()
        {
            
        }

        [TestMethod()]
        public void GetFirmwareListInternalServerErrorTest()
        {
            Mock<InfoRepository> repository = new();
            repository.Setup(x => x.GetFirmwareList()).Throws(new ParsingException());//TODO:METTERE ECCEZIONE DATABASE;
            

            InfoController infoController = new(repository.Object);
            ObjectResult result = (ObjectResult)infoController.GetFirmwareList();

            Assert.AreEqual(500, result.StatusCode);
        }
    }
}