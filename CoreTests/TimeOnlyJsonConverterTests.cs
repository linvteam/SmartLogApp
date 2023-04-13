using System.Buffers;
using System.Text.Json;
using CsvHelper.TypeConversion;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests {
    [TestClass()]
    public class TimeOnlyJsonConverterTests {
        
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new TimeOnlyConverter());
        }

    }
}