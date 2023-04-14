using System.Text.Json;
using System.Text.Json.Serialization;

namespace Core
{

    /// <summary>
    /// Classe per gestire la serializzazione e la de-serializzazione JSON di oggetti di tipo DateOnly
    /// </summary>
    public class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        /// <summary>
        /// Formato della data da serializzare
        /// </summary>
        private readonly string serializationFormat;

        /// <summary>
        /// Costruisce un'istanza di DateOnlyJsonConverter
        /// </summary>
        /// <param name="serializationFormat">Il formato della data utilizzato</param>
        public DateOnlyJsonConverter(string serializationFormat = "dd/MM/yyyy")
        {
            this.serializationFormat = serializationFormat;
        }

        /// <summary>
        /// De-serializzazione della stringa che contiene la data
        /// </summary>
        /// <param name="reader">Lo stream JSON da cui leggere la data</param>
        /// <param name="typeToConvert">Il tipo dichiarato dell'oggetto da de-serializzare</param>
        /// <param name="options">Le opzioni di de-serializzazione JSON</param>
        /// <returns>La data in formato DateOnly</returns>
        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string value = "";
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.String)
                {
                    value = reader.GetString();
                }
            }
            return DateOnly.Parse(value);
        }

        /// <summary>
        /// Serializzazione della data in uno stream JSON
        /// </summary>
        /// <param name="writer">Lo stream JSON su cui serializzare la data</param>
        /// <param name="value">La data da serializzare</param>
        /// <param name="options">Le opzioni di serializzazione JSON</param>
        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options) {
            writer.WriteStringValue(value.ToString(serializationFormat));
        }
    }
}