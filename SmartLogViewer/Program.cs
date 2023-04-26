using Core;
using SmartLogViewer;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<Parser>();
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "FrontendUI",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }
));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendUI");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();