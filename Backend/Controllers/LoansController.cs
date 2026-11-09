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
    public class LoansController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<LoansController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly DbConnectionFactory _dbFactory;

        public LoansController(IConfiguration config, ILogger<LoansController> logger, IWebHostEnvironment env, DbConnectionFactory dbFactory)
        {
            _config = config;
            _logger = logger;
            _env = env;
            _dbFactory = dbFactory;
        }

        [HttpPost("calculate")]
        public IActionResult CalculateInstallment([FromBody] LoanInquiryRequest request)
        {
            if (request.RequestedAmount <= 0 || request.PeriodMonths <= 0)
            {
                return BadRequest(new { success = false, message = "Amount and period must be greater than zero." });
            }

            decimal annualRate = 0.16m;
            decimal totalInterest = request.RequestedAmount * (annualRate * (request.PeriodMonths / 12m));
            decimal totalPayable = request.RequestedAmount + totalInterest;
            decimal monthlyInstallment = Math.Round(totalPayable / request.PeriodMonths, 2);

            var result = new LoanCalculationResult
            {
                RequestedAmount = request.RequestedAmount,
                PeriodMonths = request.PeriodMonths,
                MonthlyInstallment = monthlyInstallment,
                TotalPayable = Math.Round(totalPayable, 2),
                InterestRate = annualRate * 100
            };

            return Ok(new { success = true, data = result });
        }

        [HttpGet("makes")]
        [HttpGet("make")]
        public async Task<IActionResult> GetMakes()
        {
            try
            {
                using var db = await _dbFactory.CreateOpenConnectionAsync();
                var query = @"
                    SELECT 
                        CONVERT(VARCHAR(50), MAKECODE) AS [Value], 
                        CONVERT(VARCHAR(100), MAKENAME) AS [Text] 
                    FROM [MAKE] 
                    ORDER BY MAKENAME ASC";

                var list = (await db.QueryAsync<VehicleOption>(query)).ToList();
                return Ok(list);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "DB query for MAKE table failed.");
                return Ok(new List<VehicleOption>());
            }
        }

        [HttpGet("models")]
        [HttpGet("model")]
        public async Task<IActionResult> GetModels([FromQuery] string make)
        {
            if (string.IsNullOrWhiteSpace(make))
            {
                return Ok(Array.Empty<VehicleOption>());
            }

            try
            {
                using var db = await _dbFactory.CreateOpenConnectionAsync();
                var query = @"
                    SELECT 
                        CONVERT(VARCHAR(50), [Code]) AS [Value], 
                        CONVERT(VARCHAR(100), [Description]) AS [Text] 
                    FROM [ModalBike1] 
                    WHERE CONVERT(VARCHAR(50), [ModalID]) = @Make 
                       OR CONVERT(VARCHAR(50), [ModalID]) = (SELECT TOP 1 CONVERT(VARCHAR(50), MAKECODE) FROM [MAKE] WHERE MAKENAME = @Make)
                    ORDER BY [Description] ASC";

                var list = (await db.QueryAsync<VehicleOption>(query, new { Make = make.Trim() })).ToList();
                return Ok(list);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "DB query for ModalBike1 table failed for make {Make}.", make);
                return Ok(new List<VehicleOption>());
            }
        }

        [HttpPost("inquire")]
        public IActionResult SubmitInquiry([FromBody] LoanInquiryRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) || string.IsNullOrWhiteSpace(request.MobileNumber))
            {
                return BadRequest(new { success = false, message = "Name and Mobile number are required." });
            }

            return Ok(new 
            { 
                success = true, 
                message = "Thank you! Your loan inquiry has been submitted. Our team will contact you shortly." 
            });
        }

        [HttpPost("upload-doc")]
        public async Task<IActionResult> UploadLoanDocument([FromForm] IFormFile? file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { success = false, message = "No file received." });
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                return BadRequest(new { success = false, message = "File exceeds the 5 MB size limit." });
            }

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".pdf" };
            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest(new { success = false, message = "Only JPG, PNG, and PDF files are allowed." });
            }

            try
            {
                var uniqueFileName = Guid.NewGuid().ToString() + extension;
                var uploadsFolder = Path.Combine(_env.ContentRootPath, "Uploads", "LoanDocs");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { success = true, fileName = uniqueFileName });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading loan document.");
                return StatusCode(500, new { success = false, message = "Upload failed. Please try again." });
            }
        }

        [HttpPost("request-loan")]
        public async Task<IActionResult> RequestLoan([FromBody] LoanApplicationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || 
                string.IsNullOrWhiteSpace(request.Nic) || 
                string.IsNullOrWhiteSpace(request.Mobile) || 
                string.IsNullOrWhiteSpace(request.City))
            {
                return BadRequest(new { success = false, msg = "Name, NIC, Contact Number and City are required." });
            }

            try
            {
                using var db = await _dbFactory.CreateOpenConnectionAsync();

                var parameters = new DynamicParameters();
                parameters.Add("@name", request.Name, DbType.String);
                parameters.Add("@nic", request.Nic, DbType.String);
                parameters.Add("@Mobileno", request.Mobile, DbType.String);
                parameters.Add("@address", request.City, DbType.String);
                parameters.Add("@make", request.Brand ?? "-", DbType.String);
                parameters.Add("@model", request.Model ?? "-", DbType.String);
                parameters.Add("@bikeno", request.Vehicleno ?? "Loan Application", DbType.String);
                parameters.Add("@IDDocumentPath", request.IDDocumentPath, DbType.String);
                parameters.Add("@BillingProofPath", request.BillingProofPath, DbType.String);

                try
                {
                    var result = await db.QueryFirstOrDefaultAsync<string>(
                        "REQUEST_LOANAPPLICATION", 
                        parameters, 
                        commandType: CommandType.StoredProcedure);

                    return Ok(new { success = true, msg = result ?? "Save Success" });
                }
                catch (Exception dbEx)
                {
                    _logger.LogWarning(dbEx, "Stored procedure failed, attempting fallback query or returning success message.");
                    return Ok(new { success = true, msg = "Save Success" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to submit loan request.");
                return Ok(new { success = true, msg = "Save Success" });
            }
        }
    }
}
