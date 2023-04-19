using System.Text;
using System.Text.Json;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests {
    [TestClass()]
    public class TimeOnlyJsonConverterTests {
        
        /// <summary>
        /// TUG-28: Verifica che la classe venga istanziata correttamente
        /// </summary>
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new TimeOnlyJsonConverter());
        }

        /// <summary>
        /// TUG-29: Verifica che l'orario venga de-serializzato correttamente in un oggetto di tipo TimeOnly
        /// </summary>
        [TestMethod()]
        public void Read_ReturnsParsedTimeOnly()
        {
            // Arrange
            TimeOnly expected = new TimeOnly(13, 30, 00);
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{ \"time\" : \"13:30:00\" }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(TimeOnly);

            TimeOnlyJsonConverter converter = new TimeOnlyJsonConverter();

            // Act
            TimeOnly result = converter.Read(ref reader, typeToConvert, options);

            // Assert
            Assert.AreEqual(expected, result);
        }
        
        /// <summary>
        /// TUG-30: Verificare che l'orario abbia un formato corretto
        /// </summary>
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

        /// <summary>
        /// TUG-31: Verifica che l'orario venga serializzato correttamente
        /// </summary>
        [TestMethod()]
        public void Write_Correct() {
            
            // Arrange
            MemoryStream stream = new MemoryStream();
            Utf8JsonWriter writer = new Utf8JsonWriter(stream);
            JsonSerializerOptions options = new JsonSerializerOptions();
            
            TimeOnly value = new TimeOnly(10, 30);
            string SerializationFormat = "hh:mm";
            TimeOnlyJsonConverter converter = new TimeOnlyJsonConverter(SerializationFormat);
            
            string expected = $"\"{value.ToString(SerializationFormat)}\"";

            // Act
            converter.Write(writer, value, options);
            
            // Pre - Assertion
            writer.Flush();
            byte[] result = stream.ToArray();
            string jsonString = Encoding.UTF8.GetString(result);
            
            // Assert
            Assert.AreEqual(expected, jsonString);
        }

    }
}