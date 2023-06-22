using Moq;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Controller;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Core;
using Microsoft.EntityFrameworkCore;
using Log = SmartLogStatistics.Model.Log;

namespace SmartLogStatisticsTests.IntegrationTest {

    [TestClass]
    public class DataTest {

        private readonly SmartLogContext _context;
        private readonly DataController _controller;
        public DataTest() {
            string databaseName = Guid.NewGuid().ToString();

            var options = new DbContextOptionsBuilder<SmartLogContext>().UseNpgsql($"Host=localhost;Database={databaseName};Username=Utente;Password=Password")
                                                                        .Options;
            _context = new SmartLogContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _controller = new DataController(new DataRepositoryPgSql(_context));
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
                    date = new DateOnly(2022,01,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id = 1,
                    log_line = 2,
                    code = "A001",
                    date = new DateOnly(2022,01,10),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id = 1,
                    log_line = 3,
                    code = "A001",
                    date = new DateOnly(2022,02,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = false,
                },
                new Log
                {
                    file_id = 1,
                    log_line = 4,
                    code = "B001",
                    date = new DateOnly(2022,03,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    log_line = 5,
                    code = "C001",
                    date = new DateOnly(2022,04,05),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =1,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    log_line = 6,
                    code = "C001",
                    date = new DateOnly(2022,04,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit =14,
                    value = true,
                },
                new Log
                {
                    file_id=1,
                    log_line = 7,
                    code = "C001",
                    date = new DateOnly(2022,04,15),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    log_line = 8,
                    code = "C001",
                    date = new DateOnly(2022,05,07),
                    time = new TimeOnly(08,36,29,618),
                    unit = 1,
                    subunit = 1,
                    value = false,
                },
                new Log
                {
                    file_id=1,
                    log_line = 9,
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

        [TestMethod()]
        public void FrequencyTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Frequency(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12), true, true, true, true);

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);
            
            var frequencyDto = (FrequencyDto)result.Value;

            Assert.AreEqual(new DateTime(2021, 01, 01), frequencyDto.Start);
            Assert.AreEqual(new DateTime(2022, 12, 12), frequencyDto.End);

            var events = frequencyDto.Events;
            
            Assert.AreEqual(9, events.Count);

            var groupBy = frequencyDto.GroupBy;
            var e1 = events[0];
            var e2 = events[3];

            Assert.AreEqual(5, groupBy.Count);

            Assert.AreEqual(1.0d/9.0d, e1.Frequency);
            Assert.AreEqual(1.0d/9.0d, e2.Frequency);
            Assert.AreEqual("A001", e1.Code);
            Assert.AreEqual("B001", e2.Code);
            Assert.AreEqual(new DateOnly(2022, 01, 05), e1.Date);
            Assert.AreEqual(new DateOnly(2022, 03, 05), e2.Date);

        }

        [TestMethod]
        public void NoGroupByFrequencyTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Frequency(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12), false, false, false, false);

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            var frequencyDto = (FrequencyDto)result.Value;

            Assert.AreEqual(new DateTime(2021, 01, 01), frequencyDto.Start);
            Assert.AreEqual(new DateTime(2022, 12, 12), frequencyDto.End);

            var events = frequencyDto.Events;

            Assert.AreEqual(3, events.Count);

            var groupBy = frequencyDto.GroupBy;
            var e1 = events[0];
            var e2 = events[1];

            Assert.AreEqual(1, groupBy.Count);

            Assert.AreEqual(3.0d/9.0d, e1.Frequency);
            Assert.AreEqual(1.0d/9.0d, e2.Frequency);
            Assert.AreEqual("A001", e1.Code);
            Assert.AreEqual("B001", e2.Code);
        }

        [TestMethod()]
        public void FirmwareGroupByFrequencyTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Frequency(new DateTime(2021, 02, 01), new DateTime(2022, 12, 12), false, true, false, false);

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            var frequencyDto = (FrequencyDto)result.Value;

            Assert.AreEqual(new DateTime(2021, 02, 01), frequencyDto.Start);
            Assert.AreEqual(new DateTime(2022, 12, 12), frequencyDto.End);

            var events = frequencyDto.Events;

            Assert.AreEqual(5, events.Count);

            var groupBy = frequencyDto.GroupBy;
            var e1 = events[1];
            var e2 = events[2];

            Assert.AreEqual(2, groupBy.Count);

            Assert.AreEqual(2.0d / 9.0d, e1.Frequency);
            Assert.AreEqual(1.0d / 9.0d, e2.Frequency);
            Assert.AreEqual("A001", e1.Code);
            Assert.AreEqual("MAPK_ByPass_v2_04_00.ini", e1.Firmware);
            Assert.AreEqual("B001", e2.Code);
            Assert.AreEqual("MAPK_Module_RD_IV_v2_04_00.ini", e2.Firmware);
        }

        [TestMethod()]
        public void EmptySearchFrequencyTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Frequency(new DateTime(2024, 02, 01), new DateTime(2025, 12, 12), false, true, false, false);

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod()]
        public void EmptyDatabaseFrequencyTest() {

            ObjectResult result = (ObjectResult)_controller.Frequency(new DateTime(2021, 02, 01), new DateTime(2022, 12, 12), false, true, false, false);

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod]
        public void CumulativeTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Cumulative(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12), "C001");

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            CumulativeDto cumulativeDto = (CumulativeDto)result.Value;

            Assert.AreEqual("C001", cumulativeDto.Code);
            Assert.AreEqual(new DateTime(2021, 01, 01), cumulativeDto.Start);
            Assert.AreEqual(new DateTime(2022, 12, 12), cumulativeDto.End);

            var records = cumulativeDto.Records;

            Assert.AreEqual(5, records.Count);

            var occ1 = records[2];
            var occ2 = records[^1];

            Assert.AreEqual(new DateTime(2022, 04, 15, 08, 36, 29, 618), occ1.Instant);
            Assert.AreEqual(3, occ1.EventOccurencies);

            Assert.AreEqual(new DateTime(2022, 07, 05, 08, 36, 29, 618), occ2.Instant);
            Assert.AreEqual(5, occ2.EventOccurencies);
        }

        [TestMethod()]
        public void EmptyDateSearchCumulativeTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Cumulative(new DateTime(2024, 01, 01), new DateTime(2026, 12, 12), "C001");

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);

        }

        [TestMethod()]
        public void EmptyCodeSearchCumulativeTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.Cumulative(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12), "X");

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);

        }

        [TestMethod()]
        public void EmptyDatabaseCumulativeTest() {

            ObjectResult result = (ObjectResult)_controller.Cumulative(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12), "C001");

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod()]
        public void TotalByCodeTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.TotalByCode(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12));

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            TotalByCodeDto totalByCodeDto = (TotalByCodeDto)result.Value;

            Assert.AreEqual(new DateTime(2021, 01, 01), totalByCodeDto.Start);
            Assert.AreEqual(new DateTime(2022, 12, 12), totalByCodeDto.End);

            var codeOccs = totalByCodeDto.CodeOccurences;
            var A001 = codeOccs.Find(c => c.Code == "A001");
            var C001 = codeOccs.Find(c => c.Code == "C001");

            Assert.IsNotNull(A001);
            Assert.IsNotNull(C001);
            Assert.AreEqual(3, A001.EventOccurrences);
            Assert.AreEqual(5, C001.EventOccurrences);

        }

        [TestMethod()]
        public void EmptySearchTotalByCodeTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.TotalByCode(new DateTime(2024, 01, 01), new DateTime(2026, 12, 12));

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod()]
        public void EmptyDatabaseTotalByCodeTest() {

            ObjectResult result = (ObjectResult)_controller.TotalByCode(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12));

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod()]
        public void TotalByFirmwareTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.TotalByFirmware(new DateTime(2021, 01, 01), new DateTime(2022, 12, 12), "C001");

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            TotalByFirmwareDto firmwareDto = (TotalByFirmwareDto)result.Value;

            Assert.AreEqual(new DateTime(2021, 01, 01), firmwareDto.Start);
            Assert.AreEqual(new DateTime(2022, 12, 12), firmwareDto.End);
            Assert.AreEqual("C001",firmwareDto.Code);

            var firmwareOccs = firmwareDto.FirmwareOccurrences;
            
            var fw1 = firmwareOccs[0];
            var fw2 = firmwareOccs[1];

            Assert.AreEqual(2, firmwareOccs.Count);

            Assert.AreEqual("MAPK_Module_RD_IV_v2_04_00.ini", fw1.Firmware);
            Assert.AreEqual(3, fw1.EventOccurrences);

            Assert.AreEqual("MAPK_ByPass_v2_04_00.ini", fw2.Firmware);
            Assert.AreEqual(2,fw2.EventOccurrences);
        }

        [TestMethod()]
        public void SingleTotalByFirmwareTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.TotalByFirmware(new DateTime(2022, 01, 09), new DateTime(2022, 03, 01), "A001");

            Assert.AreEqual(200, result.StatusCode);

            Assert.IsNotNull(result.Value);

            TotalByFirmwareDto firmwareDto = (TotalByFirmwareDto)result.Value;

            Assert.AreEqual(new DateTime(2022, 01, 09), firmwareDto.Start);
            Assert.AreEqual(new DateTime(2022, 03, 01), firmwareDto.End);
            Assert.AreEqual("A001", firmwareDto.Code);

            var firmwareOccs = firmwareDto.FirmwareOccurrences;

            var fw1 = firmwareOccs[0];

            Assert.AreEqual(1, firmwareOccs.Count);

            Assert.AreEqual("MAPK_ByPass_v2_04_00.ini", fw1.Firmware);
            Assert.AreEqual(2, fw1.EventOccurrences);

        }

        [TestMethod()]
        public void EmptyCodeSearchTotalByFirmwareTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.TotalByFirmware(new DateTime(2022, 01, 09), new DateTime(2022, 03, 01), "X");

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod()]
        public void EmptyDateSearchTotalByFirmwareTest() {

            PopulateContext();

            ObjectResult result = (ObjectResult)_controller.TotalByFirmware(new DateTime(2024, 01, 09), new DateTime(2024, 03, 01), "A001");

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestMethod()]
        public void EmptyDatabaseTotalByFirmwareTest() {

            ObjectResult result = (ObjectResult)_controller.TotalByFirmware(new DateTime(2021, 01, 09), new DateTime(2022, 03, 01), "A001");

            Assert.AreEqual(404, result.StatusCode);

            Assert.IsNotNull(result.Value);

            string resultBody = JsonConvert.SerializeObject(result.Value);
            var definition = new { Code = 0, Message = "" };
            var actual = JsonConvert.DeserializeAnonymousType(resultBody, definition);

            var excepted = new { Code = 5, Message = "La query non ha prodotto risultati" };

            Assert.IsNotNull(actual);
            Assert.AreEqual(excepted, actual);
        }

        [TestCleanup()]
        public void TeardownDatabase() {
            _context.Database.EnsureDeleted();
        }
    }
}
