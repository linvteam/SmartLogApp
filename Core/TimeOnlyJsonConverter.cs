using System.Text.Json;
using System.Text.Json.Serialization;

namespace Core
{

    /// <summary>
    /// Classe per gestire la serializzazione e la de-serializzazione JSON di oggetti di tipo TimeOnly
    /// </summary>
    public class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
    {
        /// <summary>
        /// Formato dell'ora da serializzare
        /// </summary>
        private readonly string serializationFormat;

        /// <summary>
        /// Costruisce un'istanza di TimeOnlyJsonConverter
        /// </summary>
        /// <param name="serializationFormat">Il formato dell'ora utilizzato</param>
        public TimeOnlyJsonConverter(string serializationFormat = "HH:mm:ss.fff")
        {
            this.serializationFormat = serializationFormat;
        }

        /// <summary>
        /// De-serializzazione della stringa che contiene l'ora
        /// </summary>
        /// <param name="reader">Lo stream JSON da cui leggere l'ora</param>
        /// <param name="typeToConvert">Il tipo dichiarato dell'oggetto da de-serializzare</param>
        /// <param name="options">Le opzioni di de-serializzazione JSON</param>
        /// <returns>L'ora in formato TimeOnly</returns>
        public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return TimeOnly.Parse(value!);
        }

        /// <summary>
        /// Serializzazione dell'ora in uno stream JSON
        /// </summary>
        /// <param name="writer">Lo stream JSON su cui serializzare la data</param>
        /// <param name="value">La data da serializzare</param>
        /// <param name="options">Le opzioni di serializzazione JSON</param>
        public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(serializationFormat));
        }
    }
}