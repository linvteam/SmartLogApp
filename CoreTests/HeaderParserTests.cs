using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests {
    [TestClass()]
    public class HeaderParserTests {
        [TestMethod()]
        public void Instantiation() { // Questo test è potenzialmente inutile in quanto HeaderParse usa il costruttore di default
            Assert.IsNotNull(new HeaderParser());
        }

        [TestMethod()]
        public void ParseOk() {
            HeaderParser parser = new();

            // Uso lo StringReader per creare un qualsiasi TextReader che possa essere passato al parser
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            Header header = parser.Parse(reader);

            Assert.IsNotNull(header);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), header.UPSDate);
            Assert.AreEqual("MAPK_Unit_v2_04_00.ini", header.INIFile[0].Item1); // INI File
            Assert.AreEqual(0, header.INIFile[0].Item2); // Unit
            Assert.AreEqual(0, header.INIFile[0].Item3); // SubUnit

        }


        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void PCDateError() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DatedTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void PCDateInvalidDateValues() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 40.14.2022 33:77:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void UPSDateError() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS c DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void UPDateInvalidDateValues() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 40.14.2022 33:77:18\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileMissingVOnFirmwareVersion() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_3_04_00.ini; Unit=0 - SubUnit=0");
            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileUsingLetters() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_dc_00.ini; Unit=0 - SubUnit=0");
            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileMissingFirmwareExtension() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_04_00; Unit=0 - SubUnit=0");
            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileInvalidUnit() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_04_00.ini; Unit=ad - SubUnit=0");
            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileInvalidSubUnit() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_04_00.ini; Unit=0 - SubUnit=bc");
            parser.Parse(reader);
        }

        [TestMethod()]
        public void MultipleINIFiles() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14");
            Header header = headerParser.Parse(reader);

            Assert.IsNotNull(header);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), header.UPSDate);

            // Oracolo
            List<Tuple<string, int, int>> inifiles = new List<Tuple<string, int, int>>{
                new Tuple<string, int, int>("MAPK_Unit_v2_04_00.ini", 0, 0),
                new Tuple<string, int, int>("MAPK_Unit_v2_04_00.ini", 1, 0),
                new Tuple<string, int, int>("MAPK_Module_RD_IV_v2_04_00.ini", 1, 1),
                new Tuple<string, int, int>("MAPK_ByPass_v2_04_00.ini", 1, 14)
            };

            Assert.AreEqual(inifiles.Count, inifiles.Count);
            for(int i = 0; i < inifiles.Count; i++) {
                Assert.AreEqual(inifiles[i].Item1, header.INIFile[i].Item1);
                Assert.AreEqual(inifiles[i].Item2, header.INIFile[i].Item2);
                Assert.AreEqual(inifiles[i].Item3, header.INIFile[i].Item3);
            }
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void EmptyStream() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("");
            headerParser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void OnlyPCDate() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18");
            headerParser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void OnlyPCAndUPSTime() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DatedTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17");
            parser.Parse(reader);
        }

        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidIniLine() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DatedTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nCiao");
            parser.Parse(reader);
        }

        [TestMethod()]
        public void PostParseStreamCheck() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nStringa di test");
            headerParser.Parse(reader);
            Assert.AreEqual("Stringa di test", reader.ReadLine());
        }
    }
}