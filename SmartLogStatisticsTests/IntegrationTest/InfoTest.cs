using Moq;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SmartLogStatistics.Controller;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data.Entity;

namespace SmartLogStatisticsTests.IntegrationTest {

    [TestClass]
    public class InfoTest {

        private readonly SmartLogContext _context;
        private readonly InfoController _controller;

        public InfoTest() {
            string databaseName = Guid.NewGuid().ToString();

            var options = new DbContextOptionsBuilder<SmartLogContext>().UseNpgsql($"Host=localhost;Database={databaseName};Username=Utente;Password=Password")
                                                                        .Options;
            _context = new SmartLogContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _controller = new InfoController(new InfoRepositoryPgSql(_context));
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
                },
                new Firmware
                {
                    file_id = 1,
                    INI_file_name = "MAPK_Unit_v2_07_00.ini",
                    unit = 1,
                    subunit = 0,
                },
                new Firmware
                {
                    file_id = 2,
                    INI_file_name = "MAPK_Unit_v2_07_00.ini",
                    unit = 1,
                    subunit = 0,
                }
            };

            List<Event> events = new() {
                new Event
                {
                    code = "A001",
                    description = "descrizione A001",
                    color = "0xFFFFFFFF"
                },
                new Event
                {
                    code = "C001",
                    description = "descrizione C001",
                    color = "0xFFFFFFFF"
                }
            };

            List<Log> logLines = new()
            {
                new Log
                {
                    file_id = 1,
                    log_line = 1,
                    code = "A001",
                    date = new DateOnly(2022,03,04),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    log_line = 2,
                    code = "C001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    log_line = 3,
                    code = "C001",
                    date = new DateOnly(2022,03,12),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =0,
                    value = true,
                },
                new Log
                {
                    file_id=2,
                    log_line= 1,
                    code = "C001",
                    date = new DateOnly(2022,03,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 0,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    log_line= 4,
                    code = "C001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 14,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    log_line= 5,
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
                    log_line= 2,
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
         * TIS-21
         * Verificare che l'ottenimento della lista dei code con le relative descrizioni avvenga correttamente
         */
        [TestMethod()]
        public void GetCodeWithDescriptionTest() {

            PopulateContext();
            
            ObjectResult result = (ObjectResult)_controller.GetCodeWithDescription();

            var codeDescriptions = (List<CodeWithDescriptionDto>)result.Value;
            var A001 = codeDescriptions.Find(c => c.Code == "A001");
            var C001 = codeDescriptions.Find(c => c.Code == "C001");
            
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(2, codeDescriptions.Count);
            Assert.IsNotNull(A001);
            Assert.AreEqual("descrizione A001", A001.Description);
            Assert.IsNotNull(C001);
            Assert.AreEqual("descrizione C001", C001.Description);
        }

        /**
         * TIS-22
         * Verificare che venga ritornato un messaggio d'errore nel caso in cui si cercasse di ottenere la lista dei code con le relative descrizioni con un database privo di dati
         */
        [TestMethod()]
        public void EmptyDatabaseGetCodeWithDescriptionTest() {

            ObjectResult result = (ObjectResult)_controller.GetCodeWithDescription();
            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(404, result.StatusCode);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati", error.Message);
        }

        /**
        * TIS-23
        * Verificare che l'ottenimento della data-ora del primo e dell'ultimo evento presenti nel database avvenga correttamente
        */
        [TestMethod()]
        public void GetTimeIntervalTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.GetTimeInterval();

            var intervalDto = (DateTimeIntervalDto)result.Value;
            
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(result.Value);
            Assert.IsNotNull(intervalDto);
            Assert.AreEqual(new DateTime(2022, 03, 04, 08, 36, 29, 618), intervalDto.start);
            Assert.AreEqual(new DateTime(2022, 07, 05, 08, 36, 29, 618), intervalDto.end);

        }

        /**
        * TIS-24
        * Verificare che venga ritornato un messaggio d'errore nel caso in cui si cercasse di ottenere la data-ora del primo e dell'ultimo evento presenti nel database con un database privo di dati
        */
        [TestMethod()]
        public void EmptyDatabaseGetTimeIntervalTest() {

            ObjectResult result = (ObjectResult)_controller.GetTimeInterval();
            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(404, result.StatusCode);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati", error.Message);

        }

        /**
         * TIS-25
         * Verificare che l'ottenimento della lista delle versioni firmware dal database avvenga correttamente
         */
        [TestMethod()]
        public void GetFirmwareListTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.GetFirmwareList();

            var intervalDto = (List<string>)result.Value;
            
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(result.Value);
            Assert.IsNotNull(intervalDto);
            Assert.AreEqual(3, intervalDto.Count);
            Assert.AreEqual("MAPK_ByPass_v2_04_00.ini", intervalDto[0]);
            Assert.AreEqual("MAPK_Module_RD_IV_v2_04_00.ini", intervalDto[1]);
            Assert.AreEqual("MAPK_Unit_v2_07_00.ini", intervalDto[2]);
        }

        /**
        * TIS-26
        * Verificare che venga ritornato un messaggio d'errore nel caso in cui si cercasse di ottenere la lista delle versioni firmware con un database privo di dati
        */
        [TestMethod()]
        public void EmptyDatabaseGetFirmwareTest() {

            ObjectResult result = (ObjectResult)_controller.GetFirmwareList();
            ErrorObject error = (ErrorObject)result.Value;

            Assert.AreEqual(404, result.StatusCode);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(5, error.Code);
            Assert.AreEqual("La query non ha prodotto risultati", error.Message);
        }

        [TestCleanup()]
        public void TeardownDatabase() {
            _context.Database.EnsureDeleted();
        }
    }
}
