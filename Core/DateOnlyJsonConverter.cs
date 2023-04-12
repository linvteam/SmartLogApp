using System.Text.Json;
using System.Text.Json.Serialization;

namespace SmartLogViewer;

public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    private readonly string serializationFormat;

    public DateOnlyJsonConverter() : this(null)
    {
    }

    public DateOnlyJsonConverter(string? serializationFormat)
    {
        this.serializationFormat = serializationFormat ?? "dd/MM/yyyy";
    }

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        return DateOnly.Parse(value!);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, 
        JsonSerializerOptions options)
        => writer.WriteStringValue(value.ToString(serializationFormat));
}