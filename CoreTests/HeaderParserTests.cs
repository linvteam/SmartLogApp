using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests {
    [TestClass()]
    public class HeaderParserTests {
        /// <summary>
        /// TUG-11 Test di istanziazione della classe HeaderParser
        /// </summary>
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new HeaderParser());
        }

        /// <summary>
        /// TUG-12 Controllo che il parsing vada a buon fine
        /// </summary>
        [TestMethod()]
        public void ParseOk() {
            HeaderParser parser = new();

            // Uso lo StringReader per creare un qualsiasi TextReader che possa essere passato al parser
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            Header header = parser.Parse(reader);

            Assert.IsNotNull(header);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), header.UPSDate);
            Assert.AreEqual("MAPK_Unit_v2_04_00.ini", header.INIFile[0].FileName);
            Assert.AreEqual(0, header.INIFile[0].Unit);
            Assert.AreEqual(0, header.INIFile[0].SubUnit);

        }

        /// <summary>
        /// TUG-13 Controllo formato sul campo PC DateTime 
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void PCDateError() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DatedTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-14 Controllo su valori non validi di data/ora del campo PC DateTime
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void PCDateInvalidDateValues() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 40.14.2022 33:77:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-15 Controllo formato sul campo UPS DateTime
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void UPSDateError() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS c DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-16 Controllo su valori non validi di data/ora del campo UPS DateTime
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void UPDateInvalidDateValues() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 40.14.2022 33:77:18\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0");

            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-17 Controllo che il campo INI File name sia scritto nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileMissingVOnFirmwareVersion() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_3_04_00.ini; Unit=0 - SubUnit=0");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-17 Controllo che il campo INI File name sia scritto nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileUsingLetters() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_dc_00.ini; Unit=0 - SubUnit=0");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-17 Controllo che il campo INI File name sia scritto nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileMissingFirmwareExtension() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_04_00; Unit=0 - SubUnit=0");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-18 Controllo che il campo Unit sia nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileInvalidUnit() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_04_00.ini; Unit=ad - SubUnit=0");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-19 Controllo che il campo SubUnit sia nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidINIFileInvalidSubUnit() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v3_04_00.ini; Unit=0 - SubUnit=bc");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-20 Controllo che il parsing di più INI File name avvenga correttamente
        /// </summary>
        [TestMethod()]
        public void MultipleINIFiles() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14");
            Header header = headerParser.Parse(reader);

            Assert.IsNotNull(header);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), header.UPSDate);

            // Oracolo
            List<INIFile> inifiles = new List<INIFile>{
                new INIFile("MAPK_Unit_v2_04_00.ini", 0, 0),
                new INIFile("MAPK_Unit_v2_04_00.ini", 1, 0),
                new INIFile("MAPK_Module_RD_IV_v2_04_00.ini", 1, 1),
                new INIFile("MAPK_ByPass_v2_04_00.ini", 1, 14)
            };

            Assert.AreEqual(inifiles.Count, inifiles.Count);
            for(int i = 0; i < inifiles.Count; i++) {
                Assert.AreEqual(inifiles[i].FileName, header.INIFile[i].FileName);
                Assert.AreEqual(inifiles[i].Unit, header.INIFile[i].Unit);
                Assert.AreEqual(inifiles[i].SubUnit, header.INIFile[i].SubUnit);
            }
        }

        /// <summary>
        /// TUG-21 Controllo per file vuoto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void EmptyStream() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("");
            headerParser.Parse(reader);
        }

        /// <summary>
        /// TUG-22 Controllo che l'header sia nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void OnlyPCDate() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18");
            headerParser.Parse(reader);
        }

        /// <summary>
        /// TUG-22 Controllo che l'header sia nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void OnlyPCAndUPSTime() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DatedTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-22 Controllo che l'header sia nel formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void InvalidIniLine() {
            HeaderParser parser = new();
            TextReader reader = new StringReader("PC DatedTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nCiao");
            parser.Parse(reader);
        }

        /// <summary>
        /// TUG-23 Controllo di non consumazione della riga successiva degli INI File name
        /// </summary>
        [TestMethod()]
        public void PostParseStreamCheck() {
            HeaderParser headerParser = new();
            TextReader reader = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nStringa di test");
            headerParser.Parse(reader);
            Assert.AreEqual("Stringa di test", reader.ReadLine());
        }
    }
}