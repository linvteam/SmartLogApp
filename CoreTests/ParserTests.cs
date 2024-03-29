﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Tests {
    /// <summary>
    /// In questa classe di test eviterò di testare nuovamente gli errori dei singoli campi in quanto già testati nelle rispettive classi dei parser
    /// </summary>

    [TestClass()]
    public class ParserTests {
        /// <summary>
        /// TUG-24 Test di istanziazione della classe Parser
        /// </summary>
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new Parser());
        }

        /// <summary>
        /// TUG-25 Controllo parsing di un header valido e una tabella CSV senza dati
        /// </summary>
        [TestMethod()]
        public void HeaderNoData() {
            Parser parser = new();
            TextReader data = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color");
            Log log = parser.Parse("FileDiLog.csv", data);

            Assert.AreEqual("FileDiLog.csv", log.FileName);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), log.Header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), log.Header.UPSDate);
            Assert.AreEqual("MAPK_Unit_v2_04_00.ini", log.Header.INIFile[0].FileName);
            Assert.AreEqual(0, log.Header.INIFile[0].Unit);
            Assert.AreEqual(0, log.Header.INIFile[0].SubUnit);
            Assert.AreEqual("MAPK_Unit_v2_04_00.ini", log.Header.INIFile[1].FileName);
            Assert.AreEqual(1, log.Header.INIFile[1].Unit);
            Assert.AreEqual(0, log.Header.INIFile[1].SubUnit);
            Assert.AreEqual(0, log.Events.Count);
        }

        /// <summary>
        /// TUG-26 Controllo header mancante
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(ParsingException))]
        public void NoHeader() {
            Parser parser = new();
            TextReader data = new StringReader("Date ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:38:21.719 ; 1 ; 0 ; S009 ; In Service mode ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            parser.Parse("FileDiLog.csv", data);
        }

        /// <summary>
        /// TUG-27 Controllo parsing di un file valido
        /// </summary>
        [TestMethod()]
        public void CorrectHeaderAndData() {
            Parser parser = new();
            TextReader data = new StringReader("PC DateTime: 05.03.2022 08:47:18\r\nUPS DateTime: 05.03.2022 08:47:17\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=0 - SubUnit=0\r\nINI File name :  MAPK_Unit_v2_04_00.ini; Unit=1 - SubUnit=0\r\nINI File name :  MAPK_Module_RD_IV_v2_04_00.ini; Unit=1 - SubUnit=1\r\nINI File name :  MAPK_ByPass_v2_04_00.ini; Unit=1 - SubUnit=14\r\nDate ; Time ; Unit  ; SubUnit ; Code ; Description ; Value ; Type/UM ; Snapshot ; Color\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorUnitSubunit ; AplCmdErrorUnitSubunit ; 0x0000 ; Hex ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorIndex ; AplCmdErrorIndex ; 112 ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:46:55.807 ; 1 ; 0 ; AplCmdErrorCode ; AplCmdErrorCode ; AplCmd_ErrCode_SysPermission ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:38:21.719 ; 1 ; 0 ; S009 ; In Service mode ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:38:21.619 ; 1 ; 0 ; COMMAND (Ethernet) ; [-] ; Service Mode On ; [-] ; 0 ; 0xFFADFF2F\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S002 ; Load supplied by automatic Bypass ; OFF ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.618 ; 1 ; 0 ; S000 ; Load protected by inverter ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.238 ; 1 ; 14 ; ES047 ; Inverter contactor/relay is closed ; ON ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.238 ; 1 ; 14 ; ES026 ; Bypass Static Switch ON ; OFF ; BIN ; 0 ; 0xFFE0FFFF\r\n05/03/2022 ; 08:36:29.237 ; 1 ; 1 ; S053 ; Inverter switch ON ; ON ; BIN ; 0 ; 0xFFE0FFFF");
            Log log = parser.Parse("FileDiLog.csv", data);

            Assert.AreEqual("FileDiLog.csv", log.FileName);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 18), log.Header.PCDate);
            Assert.AreEqual(new DateTime(2022, 03, 05, 08, 47, 17), log.Header.UPSDate);

            List<INIFile> inifiles = new() {
                new INIFile("MAPK_Unit_v2_04_00.ini", 0, 0),
                new INIFile("MAPK_Unit_v2_04_00.ini", 1, 0),
                new INIFile("MAPK_Module_RD_IV_v2_04_00.ini", 1, 1),
                new INIFile("MAPK_ByPass_v2_04_00.ini", 1, 14)
            };

            for(int i = 0; i < inifiles.Count; i++) {
                Assert.AreEqual(inifiles[i].FileName, log.Header.INIFile[i].FileName);
                Assert.AreEqual(inifiles[i].Unit, log.Header.INIFile[i].Unit);
                Assert.AreEqual(inifiles[i].SubUnit, log.Header.INIFile[i].SubUnit);
            }

            List<LogRow> expectedValues = new() {
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08,38,21,719), 1, 0, "S009", "In Service mode" , true, "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08,36,29,618), 1, 0 , "S002", "Load supplied by automatic Bypass", false , "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08,36,29,618), 1, 0 , "S000", "Load protected by inverter", true , "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08,36,29,238), 1, 14, "ES047", "Inverter contactor/relay is closed", true , "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08,36,29,238), 1, 14, "ES026", "Bypass Static Switch ON", false , "0xFFE0FFFF"),
                new LogRow(new DateOnly(2022, 03, 05), new TimeOnly(08,36,29,237), 1, 1 , "S053", "Inverter switch ON", true, "0xFFE0FFFF"),
            };

            for(int i = 0; i < expectedValues.Count; i++) {
                LogRow row = log.Events[i];
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