using Moq;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Controller;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Log = SmartLogStatistics.Model.Log;

namespace SmartLogStatisticsTests.IntegrationTest {
    [TestClass]
    public class StatisticsTest {

        private readonly SmartLogContext _context;
        private readonly StatisticsController _controller;
        public StatisticsTest() {
            string databaseName = Guid.NewGuid().ToString();

            var options = new DbContextOptionsBuilder<SmartLogContext>().UseNpgsql($"Host=localhost;Database={databaseName};Username=Utente;Password=Password")
                                                                        .Options;
            _context = new SmartLogContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _controller = new StatisticsController(new StatisticsRepositoryPgSql(_context));
        }

        private void PopulateContext() {
            List<LogFile> files = new()
            {
                new LogFile
                {
                    id = 1,
                    filename = "Test.csv",
                    PC_datetime = new DateTime(2022, 08, 05, 08, 47, 18).ToUniversalTime(),
                    UPS_datetime = new DateTime(2022, 08, 05, 08, 47, 17).ToUniversalTime(),
                },
                new LogFile{
                    id = 2,
                    filename = "file.csv",
                    PC_datetime = new DateTime(2023, 08, 05, 08, 47, 18).ToUniversalTime(),
                    UPS_datetime = new DateTime(2023, 08, 05, 08, 47, 17).ToUniversalTime()
                }
            };

            List<Firmware> firmwares = new()
            {
                new Firmware
                {
                    file_id = 1,
                    INI_file_name = "MAPK_Module_RD_IV_v2_04_00.ini",
                    unit = 1,
                    subunit = 1,
                },
                new Firmware
                {
                    file_id = 1,
                    INI_file_name = "MAPK_ByPass_v2_04_00.ini",
                    unit = 1,
                    subunit = 14,
                },
                new Firmware
                {
                    file_id = 2,
                    INI_file_name = "MAPK_Module_RD_IV_v2_04_00.ini",
                    unit = 1,
                    subunit = 1,
                },
                new Firmware
                {
                    file_id = 2,
                    INI_file_name = "MAPK_ByPass_v2_04_00.ini",
                    unit = 1,
                    subunit = 14,
                }
            };

            List<Event> events = new()
            {
                new Event
                {
                    code = "A001",
                    description = "Descrizione A001",
                    color = "0x00FF00"
                },
                new Event
                {
                    code = "B001",
                    description = "Descrizione B001",
                    color = "0xFF0000"
                },
                new Event
                {
                    code = "C001",
                    description = "Descrizione C001",
                    color = "0x0000FF"
                }
            };

            List<Log> logLines = new()
            {
                new Log
                {
                    file_id = 1,
                    log_line = 1,
                    code = "A001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id = 1,
                    log_line = 2,
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id = 2,
                    log_line = 3,
                    code = "B001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    log_line = 4,
                    code = "C001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id=2,
                    log_line = 5,
                    code = "C001",
                    date = new DateOnly(2022,03,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    log_line = 6,
                    code = "C001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    log_line = 7,
                    code = "C001",
                    date = new DateOnly(2022,05,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Log
                {
                    file_id=2,
                    log_line = 8,
                    code = "C001",
                    date = new DateOnly(2022,07,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 14,
                    value = false,
                }
            };

            _context.File.AddRange(files);
            _context.Event.AddRange(events);
            _context.Log.AddRange(logLines);
            _context.Firmware.AddRange(firmwares);
            _context.SaveChanges();
        }

        /**
         * TIS-27
         * Verificare che l'ottenimento delle statistiche avvenga correttamente
         */
        [TestMethod()]
        public void GoodStatisticsTest() {

            PopulateContext();

            OkObjectResult result = (OkObjectResult)_controller.Statistics(new DateTime(2022, 03, 04), new DateTime(2022, 07, 06));

            Assert.IsNotNull(result.Value);

            StatisticsDto val = (StatisticsDto)result.Value;

            Assert.AreEqual(new DateTime(2022, 03, 04), val.StartDate);
            Assert.AreEqual(new DateTime(2022, 07, 06), val.EndDate);

            var stats = val.Statistics;
            var fileNumb = stats.Find(stat => stat.Name == "Numero di file");
            var maxEventNumb = stats.Find(stat => stat.Name == "Massimo numero di eventi");
            var eventMean = stats.Find(stat => stat.Name == "Media di eventi");
            var stdDeviation = stats.Find(stat => stat.Name == "Deviazione standard");

            Assert.IsNotNull(fileNumb);
            Assert.IsNotNull(maxEventNumb);
            Assert.IsNotNull(eventMean);
            Assert.IsNotNull(stdDeviation);

            Assert.AreEqual(2, fileNumb.Value);
            Assert.AreEqual(5, maxEventNumb.Value);
            Assert.AreEqual(4, eventMean.Value);
            Assert.AreEqual(1, stdDeviation.Value);

        }

        /**
         * TIS-28
         * Verificare che viene visualizzato un messagio di query vuota nel caso in cui l'ottenimento delle statistiche ritorni risultato vuoto
         */
        [TestMethod()]
        public void NoStatisticsTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Statistics(new DateTime(2020, 03, 04), new DateTime(2020, 07, 06));

            Assert.AreEqual(400, result.StatusCode);

            Assert.IsNotNull(result.Value);

            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati",error.Message);

        }

        /**
         * TIS-29
         * Verificare che venga ritornato un messaggio d'errore nel caso in cui si cerchi di ottenere le statistiche con un database privo di dati
         */
        [TestMethod()]
        public void EmptyDatabaseTest() {

            ObjectResult result = (ObjectResult)_controller.Statistics(new DateTime(2020, 03, 04), new DateTime(2020, 07, 06));

            Assert.AreEqual(400, result.StatusCode);

            Assert.IsNotNull(result.Value);

            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati", error.Message);

        }

        [TestCleanup()]
        public void TeardownDatabase() {
            _context.Database.EnsureDeleted();
        }
    }
}
