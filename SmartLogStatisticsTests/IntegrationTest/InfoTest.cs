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

        private SmartLogContext _context;
        private InfoController _controller;

        public InfoTest() {
            string databaseName = Guid.NewGuid().ToString();

            var options = new DbContextOptionsBuilder<SmartLogContext>().UseNpgsql($"Host=localhost;Database={databaseName};Username=Utente;Password=Password")
                                                                        .Options;
            _context = new SmartLogContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

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
                    date = new DateOnly(2022,03,05),
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
                    file_id=2,
                    log_line= 1,
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
                    log_line= 3,
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
                    log_line= 4,
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

            _controller = new InfoController(new InfoRepositoryPgSql(_context));
        }

        [TestMethod()]
        public void GetCodeWithDescriptionTest() {
            
            ObjectResult result = (ObjectResult)_controller.GetCodeWithDescription();

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            var codeDescriptions = (List<CodeWithDescriptionDto>)result.Value;

            Assert.AreEqual(2, codeDescriptions.Count);

            var A001 = codeDescriptions.Find(c => c.Code == "A001");
            Assert.IsNotNull(A001);
            Assert.AreEqual("descrizione A001", A001.Description);

            var C001 = codeDescriptions.Find(c => c.Code == "C001");
            Assert.IsNotNull(C001);
            Assert.AreEqual("descrizione C001", C001.Description);
        
        }

        private void ClearContext() {

            _context.File.RemoveRange(_context.File.Select(f => f).ToArray());
            _context.Firmware.RemoveRange(_context.Firmware.Select(f => f).ToArray());
            _context.Log.RemoveRange(_context.Log.Select(f => f).ToArray());
            _context.SaveChanges();
        }

        [TestCleanup()]
        public void TeardownDatabase() {
            _context.Database.EnsureDeleted();
        }
    }
}
