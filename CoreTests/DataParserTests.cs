using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests {
    [TestClass()]
    public class DataParserTests {
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new DataParser());
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void EmptyStream() {
            DataParser dataParser = new();

            dataParser.Parse(new StringReader(string.Empty));
        }

        [TestMethod()]
        public void HeaderWithoutData() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n");
            List<LogRow> res = dataParser.Parse(data);
            Assert.AreEqual(0, res.Count);
        }

        [TestMethod()]
        public void SingleLineOfLogTypeNotBIN() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F");
            List<LogRow> res = dataParser.Parse(data);
            Assert.AreEqual(0, res.Count);
        }

        [TestMethod()]
        public void SingleLineOfLogTypeBinOn() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; OFF ; BIN ; 0 ; 0xFFE0FFFF");

            List<LogRow > res = dataParser.Parse(data);
            Assert.AreEqual(1, res.Count);
            
            // Asserts sui dati parsati
            LogRow logRow = res[0];
            Assert.AreEqual(new DateOnly(2022, 03, 05), logRow.Date);
            Assert.AreEqual(new TimeOnly(08, 36, 29, 618), logRow.Time);
            Assert.AreEqual(1, logRow.Unit);
            Assert.AreEqual(0, logRow.SubUnit);
            Assert.AreEqual("S002", logRow.Code);
            Assert.AreEqual("Load supplied by automatic Bypass", logRow.Description);
            Assert.IsFalse(logRow.Value);
            Assert.AreEqual("0xFFE0FFFF", logRow.Color);
        }

        [TestMethod()]
        public void SingleLineOfLogBinOff() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; ON ; BIN ; 0 ; 0xFFE0FFFF");

            List<LogRow> res = dataParser.Parse(data);
            Assert.AreEqual(1, res.Count);

            // Asserts sui dati parsati
            LogRow logRow = res[0];
            Assert.AreEqual(new DateOnly(2022, 03, 05), logRow.Date);
            Assert.AreEqual(new TimeOnly(08, 36, 29, 618), logRow.Time);
            Assert.AreEqual(1, logRow.Unit);
            Assert.AreEqual(0, logRow.SubUnit);
            Assert.AreEqual("S002", logRow.Code);
            Assert.AreEqual("Load supplied by automatic Bypass", logRow.Description);
            Assert.IsTrue(logRow.Value);
            Assert.AreEqual("0xFFE0FFFF", logRow.Color);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidLogLine() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; ON ; BIN ; ");
            dataParser.Parse(data);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidDate() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05.03/20d2 ; 08:36:29.618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            dataParser.Parse(data);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidTime() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:d6:29/618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            dataParser.Parse(data);
        }

        [TestMethod()]
        public void MultiLineLog() {
            DataParser dataParser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:38:21.719 ; 1 ; 0 ; S009 ; In Service mode ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:38:21.619 ; 1 ; 0 ; COMMAND (Ethernet) ; [-] ; Service Mode On ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; OFF ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S000 ; Load protected by inverter ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            List<LogRow> res = dataParser.Parse(data);
            Assert.AreEqual(3, res.Count);

            List<LogRow> expectedValues = new() {
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08, 38, 21, 719), 1, 0, "S009", "In Service mode", true, "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08, 36, 29, 618), 1, 0, "S002", "Load supplied by automatic Bypass", false, "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08, 36, 29, 618), 1, 0, "S000", "Load protected by inverter", true, "0xFFE0FFFF")
            };

            for (int i  = 0; i < res.Count; i++) {
                LogRow row = res[i];
                LogRow expected = expectedValues[i];
                Assert.AreEqual(expected.Date, row.Date);
                Assert.AreEqual(expected.Time, row.Time);
                Assert.AreEqual(expected.Unit, row.Unit);
                Assert.AreEqual(expected.SubUnit, row.SubUnit);
                Assert.AreEqual(expected.Code, row.Code);
                Assert.AreEqual(expected.Description, row.Description);
                Assert.AreEqual(expected.Value, row.Value);
                Assert.AreEqual(expected.Color, row.Color);
            }
        }
    }
}