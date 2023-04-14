using System.Text;
using System.Text.Json;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Tests
{
    [TestClass()]
    public class DateOnlyJsonConverterTests
    {

        [TestMethod()]
        public void Instantiation() {
            Assert.IsNotNull(new DateOnlyJsonConverter());
        }

        [TestMethod()]
        public void Read_ReturnsParsedDateOnly()
        {
            // Arrange
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{ \"date\" : \"21/05/2001\" }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(DateOnly);

            var converter = new DateOnlyJsonConverter();

            // Act
            DateOnly result = converter.Read(ref reader, typeToConvert, options);

            // Assert
            Assert.AreEqual(new DateOnly(2001, 05, 21), result);
        }
        
        [TestMethod()]
        [ExpectedException(typeof(FormatException))]
        public void Read_WrongFormatDate()
        {
            // Arrange
            Utf8JsonReader reader = new Utf8JsonReader(Encoding.UTF8.GetBytes("{  \"date\" : \"21/15/2001\"  }"));
            JsonSerializerOptions options = new JsonSerializerOptions();
            Type typeToConvert = typeof(DateOnly);

            var converter = new DateOnlyJsonConverter();

            // Act
            converter.Read(ref reader, typeToConvert, options);
        }
    }
}