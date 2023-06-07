using Core;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Repository;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Core.Injectables.Injectable.RegisterClasses(builder);


builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
});

builder.Services.AddCors(options => options.AddPolicy(name: "FrontendUI",
    policy => {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }
));

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    var xmlFIlename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFIlename));
});

builder.Services.AddDbContext<SmartLogContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("SmartLogContext")), ServiceLifetime.Transient);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("FrontendUI");
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseStaticFiles();
    app.MapFallbackToFile("index.html");
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<SmartLogContext>();

    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}


app.UseHttpsRedirection();

app.UseAuthorization();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();
