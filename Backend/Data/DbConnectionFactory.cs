using System.Data;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;

namespace DjTrust.Api.Data
{
    public class DbConnectionFactory
    {
        private readonly string _primaryConnStr;
        private static string? _workingConnStr;
        private readonly ILogger<DbConnectionFactory> _logger;

        public DbConnectionFactory(IConfiguration config, ILogger<DbConnectionFactory> logger)
        {
            _primaryConnStr = config.GetConnectionString("DefaultConnection") 
                ?? "Data Source=DJBATAPOLA;Initial Catalog=djweb_new;Persist Security Info=True;User ID=sa;Password=Tommya@123;Connect Timeout=10;TrustServerCertificate=True";
            _logger = logger;
        }

        public async Task<SqlConnection> CreateOpenConnectionAsync(CancellationToken cancellationToken = default)
        {
            // 1. Try cached working connection string first
            if (!string.IsNullOrEmpty(_workingConnStr))
            {
                try
                {
                    var conn = new SqlConnection(_workingConnStr);
                    await conn.OpenAsync(cancellationToken);
                    return conn;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Cached connection string failed: {Msg}. Retrying all candidate sources...", ex.Message);
                    _workingConnStr = null;
                }
            }

            // 2. Build list of candidate server sources
            var candidates = new List<string> { _primaryConnStr };

            // Variations to handle server name resolution differences (e.g. DJBATAPOLA, localhost, ., (local), 127.0.0.1)
            var serverVariants = new[] { "localhost", ".", "(local)", "127.0.0.1", @"DJBATAPOLA\SQLEXPRESS", @".\SQLEXPRESS", @"localhost\SQLEXPRESS" };
            foreach (var s in serverVariants)
            {
                var candidate = Regex.Replace(
                    _primaryConnStr, 
                    @"(Data Source|Server)\s*=\s*[^;]+", 
                    $"Data Source={s}", 
                    RegexOptions.IgnoreCase);

                if (!candidates.Contains(candidate, StringComparer.OrdinalIgnoreCase))
                {
                    candidates.Add(candidate);
                }
            }

            Exception? lastEx = null;
            foreach (var connStr in candidates)
            {
                try
                {
                    var builder = new SqlConnectionStringBuilder(connStr);
                    builder.TrustServerCertificate = true;
                    builder.ConnectTimeout = 8;
                    builder.Pooling = true;

                    var conn = new SqlConnection(builder.ConnectionString);
                    await conn.OpenAsync(cancellationToken);
                    _workingConnStr = builder.ConnectionString;
                    
                    var masked = Regex.Replace(builder.ConnectionString, @"Password=[^;]+", "Password=******", RegexOptions.IgnoreCase);
                    _logger.LogInformation("Connected successfully to SQL Server using: {ConnStr}", masked);
                    return conn;
                }
                catch (Exception ex)
                {
                    lastEx = ex;
                    var masked = Regex.Replace(connStr, @"Password=[^;]+", "Password=******", RegexOptions.IgnoreCase);
                    _logger.LogDebug("Candidate connection failed ({ConnStr}): {Error}", masked, ex.Message);
                }
            }

            _logger.LogError(lastEx, "Failed to connect to SQL database using any candidate connection strings.");
            throw lastEx ?? new InvalidOperationException("Failed to establish SQL Server connection.");
        }
    }
}
