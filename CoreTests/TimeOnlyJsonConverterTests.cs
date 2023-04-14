using System.Buffers;
using System.Text;
using System.Text.Json;
using CsvHelper.TypeConversion;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Core.Tests {
    [TestClass()]
    public class TimeOnlyJsonConverterTests {
        
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new TimeOnlyJsonConverter());
        }

        [TestMethod()]
        public void Read_ReturnsParsedTimeOnly()
        {
            // Arrange
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{ \"time\" : \"13:30:00\" }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(TimeOnly);

            var converter = new TimeOnlyJsonConverter();

            // Act
            TimeOnly result = converter.Read(ref reader, typeToConvert, options);

            // Assert
            Assert.AreEqual(new TimeOnly(13, 30, 0), result);
        }
        
        [TestMethod()]
        [ExpectedException(typeof(FormatException))]
        public void Read_WrongFormatDate()
        {
            // Arrange
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{  \"time\" : \"13:30:00:000\"  }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(TimeOnly);

            var converter = new TimeOnlyJsonConverter();

            // Act
            converter.Read(ref reader, typeToConvert, options);
        }

    }
}