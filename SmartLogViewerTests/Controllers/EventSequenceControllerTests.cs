using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using SmartLogViewer.Model;
using System.Collections.Generic;

namespace SmartLogViewer.Controllers.Tests {
    [TestClass()]
    public class EventSequenceControllerTests {
        [TestMethod()]
        public void EventSequenceControllerTest() {
            Mock<SequencesManager> manager = new();
            manager.Setup(x => x.ParsingError).Returns(true);
            manager.Setup(x => x.SequenceNames()).Returns(new List<string> { });
            manager.Setup(x => x.Sequence(It.IsAny<string>())).Returns((Sequence)null);
            EventSequenceController controller = new(manager.Object);

            StatusCodeResult res = (StatusCodeResult)controller.GetSequenceNames();
            Assert.AreEqual(500, res.StatusCode);
        }

        [TestMethod()]
        public void GetSequenceNamesTest() {
            Mock<SequencesManager> manager = new();
            manager.Setup(x => x.ParsingError).Returns(false);
            manager.Setup(x => x.SequenceNames()).Returns(new List<string>() { "Sequenza1", "Sequenza2" });

            EventSequenceController controller = new(manager.Object);
            ObjectResult res = (ObjectResult)controller.GetSequenceNames();
            Assert.IsNotNull(res);
            string body = JsonConvert.SerializeObject(res.Value);
            List<string>? sequences = JsonConvert.DeserializeObject<List<string>>(body);
            Assert.IsNotNull(sequences);
            Assert.IsTrue(sequences.Contains("Sequenza1"));
            Assert.IsTrue(sequences.Contains("Sequenza2"));
        }

        [TestMethod()]
        public void GetSequenceParametersTest() {
            Mock<SequencesManager> manager = new();
            manager.Setup(x => x.ParsingError).Returns(false);
            manager.Setup(x => x.SequenceNames()).Returns(new List<string> { "Sequenza1" });
            manager.Setup(x => x.Sequence(It.Is<string>(x => "Sequenza1" == x)))
                .Returns(new Sequence(
                    "Sequenza1", 
                    new List<Sequence.Event> { new Sequence.Event("E01", true) },
                    new List<int> { 1, 2, 3 },
                    new List<Sequence.Event> { new Sequence.Event("E02", false) },
                    new List<int> { 1, 3, 4 },
                    5000
                ));

            manager.Setup(x => x.Sequence(It.Is<string>(x => x != "Sequenza1"))).Returns((Sequence)null);

            EventSequenceController controller = new(manager.Object);

            NotFoundObjectResult InvaludRequest = (NotFoundObjectResult)controller.GetSequenceParameters("Sequenza2");
            Assert.AreEqual(404, InvaludRequest.StatusCode);
            Assert.AreEqual("Sequenza2", InvaludRequest.Value.ToString());

            ObjectResult res = (ObjectResult)controller.GetSequenceParameters("Sequenza1");

            Assert.IsNotNull(res.Value);
            Assert.IsNotNull(res.Value.ToString());
            string body = JsonConvert.SerializeObject(res.Value);
            Sequence? seq = JsonConvert.DeserializeObject<Sequence>(body);
            Assert.IsNotNull(seq);

            Assert.AreEqual("Sequenza1", seq.Name);
        }
    }
}