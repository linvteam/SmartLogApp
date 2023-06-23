using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartLogViewer.Controllers;
using SmartLogViewer.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLogViewerTests.IntegrationTest {
    [TestClass]
    public class SequencesTest {

        /// <summary>
        /// TIV-5: Verifica che la classe ritorni un errore provando a caricare un file di sequenze vuoto
        /// </summary>
        [TestMethod()]
        public void TestEmptySequencesFile() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(new StreamReader(
                new MemoryStream(
                    Encoding.UTF8.GetBytes(""))
                )
            );

            SequencesManagerJson sequencesManagerJson = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            EventSequenceController controller = new(sequencesManagerJson);

            StatusCodeResult res = (StatusCodeResult)controller.GetSequenceNames();

            Assert.AreEqual(500, res.StatusCode);

            res = (StatusCodeResult)controller.GetSequenceParameters("Test");

            Assert.AreEqual(500, res.StatusCode);
        }

        /// <summary>
        /// TIV-6: Verifica che la classe ritorni un errore provando a richiedere una sequenza che non c'è
        /// </summary>
        [TestMethod()]
        public void TestGoodSequences() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(new StreamReader(
                new MemoryStream(
                    Encoding.UTF8.GetBytes("[{" +
                        "\"Name\": \"TestSequence\"," +
                        "\"StartEvents\": [{\"Code\": \"E01\"," +
                        "\"Status\": true}]," +
                        "\"StartEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                        "\"EndEvents\": [{\"Code\": \"E02\"," +
                        "\"Status\": false }]," +
                        "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                        "\"MaxDuration\": 5000" +
                        "}]")
                    )
                )
            );

            SequencesManagerJson sequencesManagerJson = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            EventSequenceController controller = new(sequencesManagerJson);

            ObjectResult res = (ObjectResult)controller.GetSequenceNames();
            Assert.AreEqual(200, res.StatusCode);

            Assert.IsNotNull(res.Value);
            List<string>? names = (List<string>)res.Value;
            Assert.IsNotNull(names);
            Assert.AreEqual("TestSequence", names[0]);

            res = (ObjectResult)(controller.GetSequenceParameters("TestSequence"));
            Assert.IsNotNull(res.Value);
            Sequence s = (Sequence)res.Value;
            Assert.IsNotNull(s);
            Assert.AreEqual("TestSequence", s.Name);

            NotFoundObjectResult notFound = (NotFoundObjectResult)controller.GetSequenceParameters("InvalidName");
            Assert.AreEqual(404, notFound.StatusCode);

        }

        /// <summary>
        /// TIV-7: Verifica che la classe ritorni correttamente le informazioni corrette sulle sequenze richieste
        /// </summary>
        [TestMethod()]
        public void MultipleSequences() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvents\": [{\"Code\": \"E01\"," +
                    "\"Status\": true }]," +
                    "\"StartEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvents\": [{\"Code\": \"E02\"," +
                    "\"Status\": false}]," +
                    "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "},{" +
                    "\"Name\": \"TestSequence2\"," +
                    "\"StartEvents\": [{\"Code\": \"E11\"," +
                    "\"Status\": false }]," +
                    "\"StartEventsAvailableSubUnits\": [5, 6, 7, 8]," +
                    "\"EndEvents\": [{ \"Code\": \"E12\"," +
                    "\"Status\": true }]," +
                    "\"EndEventsAvailableSubUnits\": [5, 6, 7, 8]," +
                    "\"MaxDuration\": 50" +
                    "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            EventSequenceController controller = new(manager);

            ObjectResult res = (ObjectResult)controller.GetSequenceNames();

            Assert.AreEqual(200, res.StatusCode);
            Assert.IsNotNull(res.Value);

            List<string>? names = (List<string>)res.Value;
            Assert.IsNotNull(names);
            Assert.IsTrue(names.Contains("TestSequence"));
            Assert.IsTrue(names.Contains("TestSequence2"));

            res = (ObjectResult)controller.GetSequenceParameters("TestSequence");
            Assert.AreEqual(200, res.StatusCode);
            Assert.IsNotNull(res.Value);
            Sequence? s = (Sequence)res.Value;   
            Assert.IsNotNull(s);

            Assert.AreEqual("TestSequence", s.Name);

        }
    }
}
