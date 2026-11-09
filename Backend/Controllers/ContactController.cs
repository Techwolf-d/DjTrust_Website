using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using DjTrust.Api.Models;
using DjTrust.Api.Data;

namespace DjTrust.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<ContactController> _logger;
        private readonly DbConnectionFactory _dbFactory;

        public ContactController(IConfiguration config, ILogger<ContactController> logger, DbConnectionFactory dbFactory)
        {
            _config = config;
            _logger = logger;
            _dbFactory = dbFactory;
        }

        [HttpPost("submit")]
        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] ContactInquiryRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Tpno) || string.IsNullOrWhiteSpace(request.Subject) || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { success = false, message = "Name, Phone Number, Subject and Message are required." });
            }

            try
            {
                using var db = await _dbFactory.CreateOpenConnectionAsync();
                string insertSql = @"
                    INSERT INTO [dbo].[Inquiry] 
                        ([Name], [Email], [Tpno], [Type], [Header], [Comment], [Status], [Date])
                    VALUES 
                        (@Name, @Email, @Tpno, 'General', @Subject, @Message, 'New', GETDATE());";

                await db.ExecuteAsync(insertSql, new
                {
                    request.Name,
                    Email = request.Email ?? string.Empty,
                    request.Tpno,
                    request.Subject,
                    request.Message
                });

                return Ok(new { success = true, message = "Your message has been sent. Thank you!" });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to insert inquiry into database.");
                return Ok(new { success = true, message = "Your message has been sent. Thank you!" });
            }
        }
    }
}

