using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogStatistics.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SmartLogStatistics.Exceptions;
using SmartLogStatistics.Model;
using Log = SmartLogStatistics.Model.Log;

namespace SmartLogStatisticsTests.Repository
{
    [TestClass()]
    public class InfoRepositoryPgSqlTests
    {
        /// <summary>
        /// TUS-10: Verifica che l'ottenimento della lista di tutti i code avvenga correttamente
        /// </summary>
        [TestMethod()]
        public void GetCodesWithDescriptionTest()
        {
            Mock<SmartLogContext> context = new();

            List<Event> events = new();

            for (int i = 0; i < 5; i++)
            {
                Event anEvent = new()
                {
                    code = "S00" + i,
                    description = "Descrizione n." + i,
                    color = "0xffffffff"
                };
                events.Add(anEvent);
            }

            Mock<DbSet<Event>> eventsMock = new();

            var eventQuery = events.AsQueryable();
            eventsMock.As<IQueryable<Event>>().Setup(x => x.Provider).Returns(eventQuery.Provider);
            eventsMock.As<IQueryable<Event>>().Setup(x => x.Expression).Returns(eventQuery.Expression);
            eventsMock.As<IQueryable<Event>>().Setup(x => x.ElementType).Returns(eventQuery.ElementType);
            eventsMock.As<IQueryable<Event>>().Setup(x => x.GetEnumerator()).Returns(eventQuery.GetEnumerator());

            context.Setup(x => x.Event).Returns(eventsMock.Object);

            InfoRepositoryPgSql infoRepository = new(context.Object);
            List<CodeWithDescriptionDto> result = infoRepository.GetCodesWithDescription();

            Assert.AreEqual("S000", result[0].Code);
            Assert.AreEqual("S001", result[1].Code);
            Assert.AreEqual("S002", result[2].Code);
            Assert.AreEqual("S003", result[3].Code);
            Assert.AreEqual("S004", result[4].Code);


        }

        /// <summary>
        /// TUS-11: Verifica che la classe ritorni un errore alla richiesta dei codici degli eventi in assenza di dati
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQueryException))]
        public void GetCodeWithDescriptionEmptyEventTest()
        {
            Mock<SmartLogContext> context = new();

            List<Event> events = new();

            Mock<DbSet<Event>> eventsMock = new();

            var eventQuery = events.AsQueryable();
            eventsMock.As<IQueryable<Event>>().Setup(x => x.Provider).Returns(eventQuery.Provider);
            eventsMock.As<IQueryable<Event>>().Setup(x => x.Expression).Returns(eventQuery.Expression);
            eventsMock.As<IQueryable<Event>>().Setup(x => x.ElementType).Returns(eventQuery.ElementType);
            eventsMock.As<IQueryable<Event>>().Setup(x => x.GetEnumerator()).Returns(eventQuery.GetEnumerator());

            context.Setup(x => x.Event).Returns(eventsMock.Object);

            InfoRepositoryPgSql infoRepository = new(context.Object);
            List<CodeWithDescriptionDto> result = infoRepository.GetCodesWithDescription();
        }

        /// <summary>
        /// TUS-12: Verifica che il calcolo della data/ora e del primo e dell'ultimo evento avvenga correttamente
        /// </summary>
        [TestMethod()]
        public void GetTimeIntervalTest()
        {
            Mock<SmartLogContext> context = new();

            List<Log> logs = new();

            for (int i = 0; i < 10; i++)
            {
                Log log = new()
                {
                    file_id = 1,
                    log_line = i,
                    date = new DateOnly(2022, 1, i + 1),
                    time = new TimeOnly(10, i, 0),
                    code = "S009",
                    value = i % 2 == 1
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

            Assert.AreEqual(new DateTime(2022, 1, 1, 10, 0, 0), result.start);
            Assert.AreEqual(new DateTime(2022, 1, 10, 10, 9, 0), result.end);
        }

        /// <summary>
        /// TUS-13: Verifica che la classe ritorni un errore alla richiesta della data/ora del primo e dell'ultimo evento in assenza di dati
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQueryException))]
        public void GetTimeIntervalEmptyLogTest()
        {
            Mock<SmartLogContext> context = new();

            List<Log> logs = new();

            Mock<DbSet<Log>> logsMock = new();

            var logQuery = logs.AsQueryable();
            logsMock.As<IQueryable<Log>>().Setup(x => x.Provider).Returns(logQuery.Provider);
            logsMock.As<IQueryable<Log>>().Setup(x => x.Expression).Returns(logQuery.Expression);
            logsMock.As<IQueryable<Log>>().Setup(x => x.ElementType).Returns(logQuery.ElementType);
            logsMock.As<IQueryable<Log>>().Setup(x => x.GetEnumerator()).Returns(logQuery.GetEnumerator());

            context.Setup(x => x.Log).Returns(logsMock.Object);

            InfoRepositoryPgSql infoRepository = new(context.Object);
            DateTimeIntervalDto result = infoRepository.GetTimeInterval();
        }

        /// <summary>
        /// TUS-14: Verifica che l'ottenimento della lista di tutti i firmware avvenga correttamente
        /// </summary>
        [TestMethod()]
        public void GetFirmwareListTest()
        {
            Mock<SmartLogContext> context = new();

            List<Firmware> firmwares = new();

            for (int i = 0; i < 10; i++)
            {
                Firmware firmware = new()
                {
                    file_id = 1,
                    unit = i / 5,
                    subunit = i % 5,
                    INI_file_name = "INI_" + i / 2
                };
                firmwares.Add(firmware);
            }

            Mock<DbSet<Firmware>> firmwaresMock = new();

            var firmwareQuery = firmwares.AsQueryable();
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.Provider).Returns(firmwareQuery.Provider);
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.Expression).Returns(firmwareQuery.Expression);
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.ElementType).Returns(firmwareQuery.ElementType);
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.GetEnumerator()).Returns(firmwareQuery.GetEnumerator());

            context.Setup(x => x.Firmware).Returns(firmwaresMock.Object);

            InfoRepositoryPgSql infoRepository = new(context.Object);
            List<string> result = infoRepository.GetFirmwareList();

            Assert.AreEqual("INI_0", result[0]);
            Assert.AreEqual("INI_1", result[1]);
            Assert.AreEqual("INI_2", result[2]);
            Assert.AreEqual("INI_3", result[3]);
            Assert.AreEqual("INI_4", result[4]);
        }

        /// <summary>
        /// TUS-15: Verifica che la classe ritorni un errore alla richiesta dei firmware in assenza di dati
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(EmptyOrFailedQueryException))]
        public void GetFirmwareListEmptyFirmwareTest()
        {
            Mock<SmartLogContext> context = new();

            List<Firmware> firmwares = new();

            Mock<DbSet<Firmware>> firmwaresMock = new();

            var firmwareQuery = firmwares.AsQueryable();
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.Provider).Returns(firmwareQuery.Provider);
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.Expression).Returns(firmwareQuery.Expression);
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.ElementType).Returns(firmwareQuery.ElementType);
            firmwaresMock.As<IQueryable<Firmware>>().Setup(x => x.GetEnumerator()).Returns(firmwareQuery.GetEnumerator());

            context.Setup(x => x.Firmware).Returns(firmwaresMock.Object);

            InfoRepositoryPgSql infoRepository = new(context.Object);
            List<string> result = infoRepository.GetFirmwareList();
        }
    }
}