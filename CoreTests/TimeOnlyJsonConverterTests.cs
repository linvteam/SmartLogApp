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

            TimeOnlyJsonConverter converter = new TimeOnlyJsonConverter();

            // Act
            TimeOnly result = converter.Read(ref reader, typeToConvert, options);

            // Assert
            Assert.AreEqual(new TimeOnly(13, 30, 0), result);
        }
        
        [TestMethod()]
        [ExpectedException(typeof(FormatException))]
        public void Read_WrongFormatTime()
        {
            // Arrange
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{  \"time\" : \"13:30:00:000\"  }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(TimeOnly);

            TimeOnlyJsonConverter converter = new TimeOnlyJsonConverter();

            // Act
            converter.Read(ref reader, typeToConvert, options);
        }

        [TestMethod()]
        public void Write_Correct() {
            
            // Arrange
            MemoryStream stream = new MemoryStream();
            Utf8JsonWriter writer = new Utf8JsonWriter(stream);
            JsonSerializerOptions options = new JsonSerializerOptions();
            
            TimeOnly value = new TimeOnly(10, 30);
            string serializationFormat = "hh:mm";
            TimeOnlyJsonConverter converter = new TimeOnlyJsonConverter(serializationFormat);

            // Act
            converter.Write(writer, value, options);
            
            // Pre - Assertion
            writer.Flush();
            byte[] result = stream.ToArray();
            string jsonString = Encoding.UTF8.GetString(result);
            
            // Assert
            Assert.AreEqual($"\"{value.ToString(serializationFormat)}\"", jsonString);
        }

    }
}