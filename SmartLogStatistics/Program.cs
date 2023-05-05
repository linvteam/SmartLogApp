using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmartLogContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("SmartLogContext")));
builder.Services.AddControllersWithViews();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

// Configure the HTTP request pipeline.

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
} 
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<SmartLogContext>();
    context.Database.EnsureCreated();
    //DbInitializer.Initialize(context);
}


app.UseHttpsRedirection();

app.UseAuthorization();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();
