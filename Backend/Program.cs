using DjTrust.Api.Data;
using Microsoft.Data.SqlClient;

// Load environment variables from .env file if present
var envCandidates = new[]
{
    Path.Combine(Directory.GetCurrentDirectory(), ".env"),
    Path.Combine(Directory.GetCurrentDirectory(), "backend", ".env"),
    Path.Combine(AppContext.BaseDirectory, ".env"),
    Path.Combine(AppContext.BaseDirectory, "..", "..", "..", ".env"),
    Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", ".env")
};

foreach (var envPath in envCandidates)
{
    if (File.Exists(envPath))
    {
        foreach (var line in File.ReadAllLines(envPath))
        {
            var trimmed = line.Trim();
            if (string.IsNullOrWhiteSpace(trimmed) || trimmed.StartsWith("#")) continue;
            var parts = trimmed.Split('=', 2);
            if (parts.Length == 2)
            {
                var key = parts[0].Trim();
                var val = parts[1].Trim().Trim('"', '\'');
                if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable(key)))
                {
                    Environment.SetEnvironmentVariable(key, val);
                }
            }
        }
        break;
    }
}

var builder = WebApplication.CreateBuilder(args);

// Apply custom URLs from .env (e.g. http://0.0.0.0:5000)
var urls = Environment.GetEnvironmentVariable("ASPNETCORE_URLS");
if (!string.IsNullOrEmpty(urls))
{
    builder.WebHost.UseUrls(urls);
}

// Register DB Connection Factory with fallback host resolution
builder.Services.AddSingleton<DbConnectionFactory>();

// Add controllers with JSON options
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// Swagger / OpenAPI documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for React Client & Production Server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Enable Swagger UI
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "D.J. Trust API v1");
    c.RoutePrefix = "swagger";
});

// Note: HttpsRedirection is disabled to allow plain HTTP access when hosted on IP/IIS without SSL certificates
// app.UseHttpsRedirection();

// Global CORS middleware ensuring CORS headers on all requests and 500 error responses
app.Use(async (context, next) =>
{
    var origin = context.Request.Headers["Origin"].ToString();
    if (!string.IsNullOrEmpty(origin))
    {
        context.Response.Headers.Append("Access-Control-Allow-Origin", origin);
        context.Response.Headers.Append("Access-Control-Allow-Credentials", "true");
        context.Response.Headers.Append("Access-Control-Allow-Headers", "*");
        context.Response.Headers.Append("Access-Control-Allow-Methods", "*");
    }

    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204;
        await context.Response.CompleteAsync();
        return;
    }

    await next();
});

app.UseCors("AllowReactApp");

app.UseAuthorization();

// Diagnostic endpoint to test database connectivity
var testDbHandler = async (DbConnectionFactory dbFactory) =>
{
    try
    {
        using var conn = await dbFactory.CreateOpenConnectionAsync();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            SELECT 
                (SELECT COUNT(*) FROM [dbo].[News]) AS NewsCount,
                (SELECT COUNT(*) FROM [dbo].[MAKE]) AS MakeCount,
                (SELECT COUNT(*) FROM [dbo].[ModalBike1]) AS ModelCount";

        using var reader = await cmd.ExecuteReaderAsync();
        int newsCount = 0, makeCount = 0, modelCount = 0;
        if (await reader.ReadAsync())
        {
            newsCount = reader.GetInt32(0);
            makeCount = reader.GetInt32(1);
            modelCount = reader.GetInt32(2);
        }

        return Results.Ok(new
        {
            success = true,
            message = "Database connection successful!",
            server = conn.DataSource,
            database = conn.Database,
            stats = new { newsCount, makeCount, modelCount }
        });
    }
    catch (Exception ex)
    {
        return Results.Json(new
        {
            success = false,
            message = "Database connection failed!",
            error = ex.Message,
            detail = ex.ToString()
        }, statusCode: 500);
    }
};

app.MapGet("/api/test-db", testDbHandler);
app.MapGet("/test-db", testDbHandler);

// Health check endpoints
app.MapGet("/", () => Results.Ok(new
{
    status = "online",
    service = "D.J. Trust Backend API",
    version = "1.0.0",
    docs = "/swagger",
    health = "/api/test-db"
}));
app.MapGet("/api", () => Results.Ok(new { status = "online", service = "D.J. Trust Backend API", version = "1.0.0" }));
app.MapGet("/api/health", () => Results.Ok(new { status = "healthy", serverTimeUtc = DateTime.UtcNow }));

app.MapControllers();

app.Run();
