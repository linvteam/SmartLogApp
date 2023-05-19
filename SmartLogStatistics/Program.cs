using Core;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SmartLogStatistics.Repository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<Parser>();

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
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmartLogContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("SmartLogContext")));
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
