using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.IO;
using System.Text;

namespace SmartLogViewer.Model.Tests {

    /// <summary>
    /// In questa classe sono testate le possibili risposte che il back-end può dare ad una chiamata POST sull'endpoint api/parse
    /// </summary>
    [TestClass()]
    public class SequencesManagerTests {


        /// <summary>
        /// TUV-7: Verifica che la classe ritorni un insieme di sequenze vuoto nel caso il file delle sequenze fosse vuoto
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestEmptyStream() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(
                        Encoding.UTF8.GetBytes("")
                    )
                )
            );

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }

        /// <summary>
        /// TUV-8: Verifica che la classe ritorni un insieme di sequenze vuoto nel caso in cui il file delle sequenze contenesse un oggetto vuoto
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestEmptyObject() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("{}"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsFalse(manager.ParsingError);
        }

        /// <summary>
        /// TUV-9: Verifica che la classe ritorni un insieme di sequenze vuoto nel caso in cui il file delle sequenze contenesse un array vuoto
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestEmptyArray() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("[]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsFalse(manager.ParsingError);
        }

        /// <summary>
        /// TUV-10: Verifica che la classe ritorni un insieme di sequenze vuoto nel caso in cui il file delle sequenze contenesse un array con un elemento vuoto
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestEmptyArrayWithEmptyObject() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("[{}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsTrue(manager.ParsingError);
        }

        /// <summary>
        /// TUV-11: Verifica che la classe segnali un errore nel caso in cui le sequenze non siano all'interno di un array
        /// </summary>
        [TestMethod()]
        public void SequenceManagerTestInvalidObjectWithoutArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("{" +
                    "\"Name\": \"TestSequence\"" +
                    "}"))));
            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsTrue(manager.ParsingError);
        }

        /// <summary>
        /// TUV-12: Verifica che la classe segnali un errore nel caso in cui le sequenze non contengano tutti i campi dati
        /// </summary>
        [TestMethod()]
        public void SequenceManagerTestInvalidObjectWithArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"" +
                    "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);

            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsTrue(manager.ParsingError);

        }

        /// <summary>
        /// TUV-13: Verifica che la classe segnali un errore nel caso in cui le sequenze siano ben definite ma non siano all'interno di un array
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestValidObjectWithoutArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("{" +
                "\"Name\": \"TestSequence\"," +
                "\"StartEvents\": [{ \"Code\": \"E01\"," +
                "\"Status\": true }]," +
                "\"StartEventsAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"EndEvents\": [{ \"Code\": \"E02\"," +
                "\"Status\": false }]," +
                "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"MaxDuration\": 5000" +
                "}"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }

        /// <summary>
        /// TUV-14: Verifica che la classe ritorni un oggetto contenente la sequenza del file corrente
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestValidObjectWithArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                "\"Name\": \"TestSequence\"," +
                "\"StartEvents\": [{\"Code\": \"E01\"," +
                "\"Status\": true}]," +
                "\"StartEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"EndEvents\": [{\"Code\": \"E02\"," +
                "\"Status\": false }]," +
                "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"MaxDuration\": 5000" +
                "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsFalse(manager.ParsingError);
            Assert.AreEqual(1, manager.SequenceNames().Count);
            //Assert parsed values
            Assert.IsTrue(manager.SequenceNames().Contains("TestSequence"));

            Sequence? testSequence = manager.Sequence("TestSequence");
            Assert.IsNotNull(testSequence);
            Assert.AreEqual("TestSequence", testSequence.Name);
            Assert.AreEqual("E01", testSequence.StartEvents[0].Code);
            Assert.AreEqual("E02", testSequence.EndEvents[0].Code);
            Assert.IsTrue(testSequence.StartEvents[0].Status);
            Assert.IsFalse(testSequence.EndEvents[0].Status);
            Assert.AreEqual(5000, testSequence.MaxDuration);

            for(int i = 1; i <= 8; i++) {
                Assert.IsTrue(testSequence.StartEventsAvailableSubUnits.Contains(i));
                Assert.IsTrue(testSequence.EndEventsAvailableSubUnits.Contains(i));
            }
        }

        /// <summary>
        /// TUV-15: Verifica che la classe ritorni un oggetto contenente le sequenze del file corrente
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestTwoValidObjects() {
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
            Assert.IsFalse(manager.ParsingError);

            Assert.AreEqual(2, manager.SequenceNames().Count);
            Assert.IsTrue(manager.SequenceNames().Contains("TestSequence"));
            Assert.IsTrue(manager.SequenceNames().Contains("TestSequence2"));

            Sequence? sequence = manager.Sequence("TestSequence2");
            Assert.IsNotNull(sequence);

            Assert.AreEqual("E11", sequence.StartEvents[0].Code);
            Assert.AreEqual(4, sequence.StartEventsAvailableSubUnits.Count);
            Assert.IsTrue(sequence.StartEventsAvailableSubUnits.Contains(5));
            Assert.IsTrue(sequence.StartEventsAvailableSubUnits.Contains(6));
            Assert.IsTrue(sequence.StartEventsAvailableSubUnits.Contains(7));
            Assert.IsTrue(sequence.StartEventsAvailableSubUnits.Contains(8));
        }

        /// <summary>
        /// TUV-16: Verifica che la classe ritorni un errore nel caso in cui uno degli oggetti del file corrente fosse non valido
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestTwoObjectsOneInvalid() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvents\": [{\"Code\": \"E01\"," +
                    "\"Status\": true }]," +
                    "\"StartEventsAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvents\": [{\"Code\": \"E02\"," +
                    "\"Status\": false }]," +
                    "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "},{" +
                    "\"Name\": \"TestSequence2\"," +
                    "\"StartEvents\": \"E11\"," +
                    "\"StartEventsAvalilableSubUnits\": \"ciao\"," +
                    "\"EndEvents\": [{ \"Code\": \"E12\"," +
                    "\"Status\": true }]," +
                    "\"EndEventsAvailableSubUnits\": [5, 6, 7, 8]," +
                    "\"MaxDuration\": 50" +
                    "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }

        /// <summary>
        /// TUV-17: Verifica che la classe ritorni un errore nel caso in cui uno degli oggetti del file corrente fosse incompleto
        /// </summary>
        [TestMethod()]
        public void SequencesManagerTestTwoObjectsOneIncomplete() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvents\": [{\"Code\": \"E01\"," +
                    "\"Status\": true }]," +
                    "\"StartEventsAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvents\": [{\"Code\": \"E02\"," +
                    "\"Status\": false }]," +
                    "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "},{" +
                    "\"Name\": \"TestSequence2\"," +
                    "\"StartEvents\": [{\"Code\": \"E11\"," +
                    "\"Status\": false }]," +
                    "\"EndEventsAvailableSubUnits\": [5, 6, 7, 8]," +
                    "\"MaxDuration\": 50" +
                    "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);

        }

        /// <summary>
        /// TUV-18: Verifica che la classe ritorni un oggetto contenente le sequenze del file corrente aventi multipli eventi di inizio/fine
        /// </summary>
        [TestMethod()]
        public void SequencesManagerMultipleStartEndEvents() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(
                    Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvents\": [{\"Code\": \"E01\"," +
                    "\"Status\": true }," +
                    "{\"Code\": \"E02\", \"Status\": false}]," +
                    "\"StartEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvents\": [{\"Code\": \"E02\"," +
                    "\"Status\": false }," +
                    "{\"Code\": \"E05\", \"Status\": true}]," +
                    "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsFalse(manager.ParsingError);
            Sequence? seq = manager.Sequence("TestSequence");
            Assert.IsNotNull(seq);
            Assert.AreEqual("E01", seq.StartEvents[0].Code);
            Assert.AreEqual("E02", seq.StartEvents[1].Code);
            Assert.IsTrue(seq.StartEvents[0].Status);
            Assert.IsFalse(seq.StartEvents[1].Status);
            Assert.AreEqual("E02", seq.EndEvents[0].Code);
            Assert.AreEqual("E05", seq.EndEvents[1].Code);
            Assert.IsTrue(seq.EndEvents[1].Status);
            Assert.IsFalse(seq.EndEvents[0].Status);
        }

        /// <summary>
        /// TUV-19: Verifica che la classe ritorni un errore nel caso in cui uno degli oggetti del file corrente fosse non valido ed abbia più eventi di inizio/fine
        /// </summary>
        [TestMethod]
        public void SequencesManagerMultipleStartEndEventsInvalid() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(
                    Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvents\": [{\"Code\": \"E01\"," +
                    "\"Staus\": true }," +
                    "{\"Code\": \"E02\", \"Status\": \"false\"}]," +
                    "{\"Code\": \"E02\", \"Status\": \"false\"}]," +
                    "\"StartEventsAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvents\": [{\"Code\": \"E02\"," +
                    "\"Status\": false }," +
                    "{\"Code\": \"E05\", \"Status\": ue}]," +
                    "\"EndEventsAvailableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "}]"))));

            SequencesManagerJson manager = new(Mock.Of<ILogger<SequencesManagerJson>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }
    }
}