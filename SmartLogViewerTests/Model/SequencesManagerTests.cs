using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.IO;
using System.Text;

namespace SmartLogViewer.Model.Tests {
    [TestClass()]
    public class SequencesManagerTests {
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

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }

        [TestMethod()]
        public void SequencesManagerTestEmptyObject() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("{}"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsFalse(manager.ParsingError);
        }

        [TestMethod()]
        public void SequencesManagerTestEmptyArray() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("[]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsFalse(manager.ParsingError);
        }

        [TestMethod()]
        public void SequencesManagerTestEmptyArrayWithEmptyObject() {

            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("[{}]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsTrue(manager.ParsingError);
        }

        [TestMethod()]
        public void SequenceManagerTestInvalidObjectWithoutArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("{" +
                    "\"Name\": \"TestSequence\"" +
                    "}"))));
            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsTrue(manager.ParsingError);
        }

        [TestMethod()]
        public void SequenceManagerTestInvalidObjectWithArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(
                    new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"" +
                    "}]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);

            Assert.AreEqual(0, manager.SequenceNames().Count);
            Assert.IsTrue(manager.ParsingError);
            
        }

        [TestMethod()]
        public void SequencesManagerTestValidObjectWithoutArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("{" +
                "\"Name\": \"TestSequence\"," +
                "\"StartEvent\": \"E01\"," +
                "\"StartEventState\": true," +
                "\"StartEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"EndEvent\": \"E02\"," +
                "\"EndEventState\": false," +
                "\"EndEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"MaxDuration\": 5000" +
                "}"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }

        [TestMethod()]
        public void SequencesManagerTestValidObjectWithArray() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                "\"Name\": \"TestSequence\"," +
                "\"StartEvent\": \"E01\"," +
                "\"StartEventState\": true," +
                "\"StartEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"EndEvent\": \"E02\"," +
                "\"EndEventState\": false," +
                "\"EndEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                "\"MaxDuration\": 5000" +
                "}]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.IsFalse(manager.ParsingError);
            Assert.AreEqual(1, manager.SequenceNames().Count);
            //Assert parsed values
            Assert.IsTrue(manager.SequenceNames().Contains("TestSequence"));

            Sequence? testSequence = manager.Sequence("TestSequence");
            Assert.IsNotNull(testSequence);
            Assert.AreEqual("TestSequence", testSequence.Name);
            Assert.AreEqual("E01", testSequence.StartEvent);
            Assert.AreEqual("E02", testSequence.EndEvent);
            Assert.IsTrue(testSequence.StartEventState);
            Assert.IsFalse(testSequence.EndEventState);
            Assert.AreEqual(5000, testSequence.MaxDuration);
            
            for(int i = 1; i <= 8; i++) {
                Assert.IsTrue(testSequence.StartEventAvailableSubUnits.Contains(i));
                Assert.IsTrue(testSequence.EndEventAvailableSubUnits.Contains(i));
            }
        }

        [TestMethod()]
        public void SequencesManagerTestTwoValidObjects() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvent\": \"E01\"," +
                    "\"StartEventState\": true," +
                    "\"StartEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvent\": \"E02\"," +
                    "\"EndEventState\": false," +
                    "\"EndEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "},{" +
                    "\"Name\": \"TestSequence2\"," +
                    "\"StartEvent\": \"E11\"," +
                    "\"StartEventState\": false," +
                    "\"StartEventAvalilableSubUnits\": [5, 6, 7, 8]," +
                    "\"EndEvent\": \"E12\"," +
                    "\"EndEventState\": true," +
                    "\"EndEventAvalilableSubUnits\": [5, 6, 7, 8]," +
                    "\"MaxDuration\": 50" +
                    "}]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.IsFalse(manager.ParsingError);

            Assert.AreEqual(2, manager.SequenceNames().Count);
            Assert.IsTrue(manager.SequenceNames().Contains("TestSequence"));
            Assert.IsTrue(manager.SequenceNames().Contains("TestSequence2"));

            Sequence? sequence = manager.Sequence("TestSequence2");
            Assert.IsNotNull(sequence);

            Assert.AreEqual("E11", sequence.StartEvent);
            Assert.AreEqual(4, sequence.StartEventAvailableSubUnits.Count);
            Assert.IsTrue(sequence.StartEventAvailableSubUnits.Contains(5));
            Assert.IsTrue(sequence.StartEventAvailableSubUnits.Contains(6));
            Assert.IsTrue(sequence.StartEventAvailableSubUnits.Contains(7));
            Assert.IsTrue(sequence.StartEventAvailableSubUnits.Contains(8));
        }

        [TestMethod()]
        public void SequencesManagerTestTwoObjectsOneInvalid() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvent\": \"E01\"," +
                    "\"StartEventState\": true," +
                    "\"StartEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvent\": \"E02\"," +
                    "\"EndEventState\": false," +
                    "\"EndEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "},{" +
                    "\"Name\": \"TestSequence2\"," +
                    "\"StartEvent\": \"E11\"," +
                    "\"StartEventState\": false," +
                    "\"StartEventAvalilableSubUnits\": \"ciao\"," +
                    "\"EndEvent\": \"E12\"," +
                    "\"EndEventState\": true," +
                    "\"EndEventAvalilableSubUnits\": [5, 6, 7, 8]," +
                    "\"MaxDuration\": 50" +
                    "}]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);
        }

        [TestMethod()]
        public void SequencesManagerTestTwoObjectsOneIncomplete() {
            Mock<SequenceFileReader> reader = new();
            reader.Setup(x => x.StreamReader()).Returns(
                new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes("[{" +
                    "\"Name\": \"TestSequence\"," +
                    "\"StartEvent\": \"E01\"," +
                    "\"StartEventState\": true," +
                    "\"StartEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"EndEvent\": \"E02\"," +
                    "\"EndEventState\": false," +
                    "\"EndEventAvalilableSubUnits\": [1, 2, 3, 4, 5, 6, 7, 8]," +
                    "\"MaxDuration\": 5000" +
                    "},{" +
                    "\"Name\": \"TestSequence2\"," +
                    "\"StartEvent\": \"E11\"," +
                    "\"StartEventState\": false," +
                    "\"EndEventState\": true," +
                    "\"EndEventAvalilableSubUnits\": [5, 6, 7, 8]," +
                    "\"MaxDuration\": 50" +
                    "}]"))));

            SequencesManager manager = new(Mock.Of<ILogger<SequencesManager>>(), reader.Object);
            Assert.IsTrue(manager.ParsingError);
            Assert.AreEqual(0, manager.SequenceNames().Count);

        }
    }
}