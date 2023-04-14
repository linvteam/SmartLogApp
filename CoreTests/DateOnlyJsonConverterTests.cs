using System.Text;
using System.Text.Json;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests
{
    [TestClass()]
    public class DateOnlyJsonConverterTests
    {

        /// <summary>
        /// TUG-32: Verifica che la classe venga istanziata correttamente
        /// </summary>
        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new DateOnlyJsonConverter());
        }

        /// <summary>
        /// TUG-33: Verifica che la data venga de-serializzata correttamente in un oggetto di tipo DateOnly
        /// </summary>
        [TestMethod()]
        public void Read_ReturnsParsedDateOnly() {
            // Arrange
            DateOnly expected = new DateOnly(2001, 05, 21);
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{ \"date\" : \"2001/05/21\" }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(DateOnly);

            DateOnlyJsonConverter converter = new DateOnlyJsonConverter();

            // Act
            DateOnly result = converter.Read(ref reader, typeToConvert, options);

            // Assert
            Assert.AreEqual(expected.ToString(), result.ToString());
        }
        
        /// <summary>
        /// TUG-34: Verificare che la data abbia un formato corretto
        /// </summary>
        [TestMethod()]
        [ExpectedException(typeof(FormatException))]
        public void Read_WrongFormatDate() {
            // Arrange
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{  \"date\" : \"2001/15/21\"  }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(DateOnly);

            DateOnlyJsonConverter converter = new DateOnlyJsonConverter();

            // Act
            converter.Read(ref reader, typeToConvert, options);
        }
        
        /// <summary>
        /// TUG-35: Verifica che la data venga serializzato correttamente
        /// </summary>
        [TestMethod()]
        public void Write_Correct() {
            
            // Arrange
            MemoryStream stream = new MemoryStream();
            Utf8JsonWriter writer = new Utf8JsonWriter(stream);
            JsonSerializerOptions options = new JsonSerializerOptions();
            
            DateOnly value = new DateOnly(2001,05,21);
            string serializationFormat = "yyyy/MM/dd";
            DateOnlyJsonConverter converter = new DateOnlyJsonConverter(serializationFormat);

            string expected = $"\"{value.ToString(serializationFormat)}\"";
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