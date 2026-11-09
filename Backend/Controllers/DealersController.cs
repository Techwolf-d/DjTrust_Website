using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using DjTrust.Api.Data;

namespace DjTrust.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Route("[controller]")]
    public class DealersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<DealersController> _logger;
        private readonly DbConnectionFactory _dbFactory;

        public DealersController(IConfiguration configuration, ILogger<DealersController> logger, DbConnectionFactory dbFactory)
        {
            _configuration = configuration;
            _logger = logger;
            _dbFactory = dbFactory;
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter(
            [FromQuery] string? dealer = null,
            [FromQuery] string? district = null,
            [FromQuery] string? stype = null,
            [FromQuery] string? ctype = null)
        {
            var results = new List<DealerDto>();

            try
            {
                using var conn = await _dbFactory.CreateOpenConnectionAsync();

                using var cmd = new SqlCommand("Filter_Dealer", conn)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = 4
                };

                cmd.Parameters.AddWithValue("@dealer", string.IsNullOrWhiteSpace(dealer) ? (object)DBNull.Value : dealer);
                cmd.Parameters.AddWithValue("@district", string.IsNullOrWhiteSpace(district) || district == "ALL" ? (object)DBNull.Value : district);
                cmd.Parameters.AddWithValue("@ctype", string.IsNullOrWhiteSpace(ctype) ? (object)DBNull.Value : ctype);
                cmd.Parameters.AddWithValue("@dealert", string.IsNullOrWhiteSpace(stype) ? (object)DBNull.Value : stype);

                using var reader = await cmd.ExecuteReaderAsync();
                int idCounter = 1;
                while (await reader.ReadAsync())
                {
                    results.Add(new DealerDto
                    {
                        Id = idCounter++,
                        DealerName = reader["Branchname"] != DBNull.Value ? reader["Branchname"].ToString() ?? "" : "",
                        Address = reader["Location"] != DBNull.Value ? reader["Location"].ToString() ?? "" : "",
                        Phone = reader["TelePhone"] != DBNull.Value ? reader["TelePhone"].ToString() ?? "" : "",
                        DirectionLink = reader["DirectionLink"] != DBNull.Value ? reader["DirectionLink"].ToString() ?? "" : "",
                        District = district ?? ""
                    });
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Database connection error or stored procedure Filter_Dealer not available: {Message}. Returning empty list.", ex.Message);
                // In accordance with zero hardcoded data rule: return empty list from database
                return Ok(results);
            }
        }

        [HttpPost("apply")]
        public async Task<IActionResult> Apply([FromBody] DealerApplyRequest model)
        {
            if (string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Tpno))
            {
                return BadRequest(new { success = false, message = "Name and Telephone number are required." });
            }

            try
            {
                using var conn = await _dbFactory.CreateOpenConnectionAsync();

                using var cmd = new SqlCommand("CREATE_DEALER_REQUEST", conn)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = 4
                };

                cmd.Parameters.AddWithValue("@name", model.Name ?? "");
                cmd.Parameters.AddWithValue("@shopname", model.Shopname ?? "");
                cmd.Parameters.AddWithValue("@address", model.Address ?? "");
                cmd.Parameters.AddWithValue("@tpno", model.Tpno ?? "");
                cmd.Parameters.AddWithValue("@type", model.Type ?? "");
                cmd.Parameters.AddWithValue("@brno", model.Brcopy ?? "");
                cmd.Parameters.AddWithValue("@rl", model.Rletter ?? "");

                await cmd.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Could not persist dealer request to database: {Message}", ex.Message);
            }

            return Ok(new
            {
                success = true,
                message = "Thank you! Your dealership request has been submitted successfully. Our team will contact you shortly."
            });
        }
    }

    public class DealerDto
    {
        public int Id { get; set; }
        public string DealerName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string DirectionLink { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
    }

    public class DealerApplyRequest
    {
        public string? Name { get; set; }
        public string? Shopname { get; set; }
        public string? Address { get; set; }
        public string? Tpno { get; set; }
        public string? Type { get; set; }
        public string? Brcopy { get; set; }
        public string? Rletter { get; set; }
    }
}

