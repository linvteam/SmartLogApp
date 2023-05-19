using Core;
using SmartLogViewer;
using SmartLogViewer.Model;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

//Add services to the container.

// Lascio alla classe Injectable aggiungere tutte le classi correttamente annotate al builder
Core.Injectables.Injectable.RegisterClasses(builder);

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    var xmlFIlename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFIlename));
});

builder.Services.AddCors(options => options.AddPolicy(name: "FrontendUI",
    policy => {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }
));

var app = builder.Build();

// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("FrontendUI");
} else {
    app.UseStaticFiles();
    app.MapFallbackToFile("index.html");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
