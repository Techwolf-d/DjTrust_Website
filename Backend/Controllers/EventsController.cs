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
    public class EventsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EventsController> _logger;
        private readonly DbConnectionFactory _dbFactory;
        private readonly IWebHostEnvironment _env;

        public EventsController(IConfiguration config, ILogger<EventsController> logger, IWebHostEnvironment env, DbConnectionFactory dbFactory)
        {
            _config = config;
            _logger = logger;
            _env = env;
            _dbFactory = dbFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] string lang = "EN")
        {
            try
            {
                using var db = await _dbFactory.CreateOpenConnectionAsync();
                string query = @"
                    SELECT 
                        CONVERT(VARCHAR(50), [NewsSerial]) AS Id, 
                        COALESCE(NULLIF(CASE WHEN UPPER(@Lang) = 'SIN' THEN [newsheadSI] ELSE [News_head] END, ''), [News_head], '') AS Title, 
                        COALESCE(NULLIF(CASE WHEN UPPER(@Lang) = 'SIN' THEN [NewsabstractSI] ELSE [News_abstract] END, ''), [News_abstract], '') AS Abstract, 
                        COALESCE(NULLIF(CASE WHEN UPPER(@Lang) = 'SIN' THEN [news_bodySI] ELSE [News_body] END, ''), [News_body], '') AS Content, 
                        [News_image] AS ImageUrl, 
                        CASE 
                            WHEN [DateUpdate] IS NOT NULL THEN CONVERT(VARCHAR(20), [DateUpdate], 107) 
                            ELSE '2024' 
                        END AS PublishedDate 
                    FROM [dbo].[News] 
                    WHERE ([Status] IS NULL 
                       OR [Status] = '' 
                       OR [Status] = 'Published' 
                       OR [Status] = 'published' 
                       OR [Status] = 'Active' 
                       OR [Status] = 'active' 
                       OR [Status] = '1'
                       OR [Status] NOT IN ('Draft', 'Deleted', 'Inactive', 'Disabled', '0'))
                    ORDER BY [DateUpdate] DESC, [NewsSerial] DESC";

                var events = (await db.QueryAsync<EventItem>(query, new { Lang = lang ?? "EN" })).ToList();

                foreach (var ev in events)
                {
                    ev.Content = ResolveEventContent(ev.Id, ev.Content, ev.Abstract);
                    ev.ImageUrl = NormalizeImageUrl(ev.ImageUrl);
                }

                return Ok(new { success = true, data = events });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to query News table from database.");
                return Ok(new { 
                    success = false, 
                    message = "Unable to load events at this time. Please try again later.", 
                    data = new List<EventItem>() 
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(string id, [FromQuery] string lang = "EN")
        {
            try
            {
                using var db = await _dbFactory.CreateOpenConnectionAsync();
                string query = @"
                    SELECT 
                        CONVERT(VARCHAR(50), [NewsSerial]) AS Id, 
                        COALESCE(NULLIF(CASE WHEN UPPER(@Lang) = 'SIN' THEN [newsheadSI] ELSE [News_head] END, ''), [News_head], '') AS Title, 
                        COALESCE(NULLIF(CASE WHEN UPPER(@Lang) = 'SIN' THEN [NewsabstractSI] ELSE [News_abstract] END, ''), [News_abstract], '') AS Abstract, 
                        COALESCE(NULLIF(CASE WHEN UPPER(@Lang) = 'SIN' THEN [news_bodySI] ELSE [News_body] END, ''), [News_body], '') AS Content, 
                        [News_image] AS ImageUrl, 
                        CASE 
                            WHEN [DateUpdate] IS NOT NULL THEN CONVERT(VARCHAR(20), [DateUpdate], 107) 
                            ELSE '2024' 
                        END AS PublishedDate 
                    FROM [dbo].[News] 
                    WHERE CONVERT(VARCHAR(50), [NewsSerial]) = @Id";

                var eventItem = await db.QueryFirstOrDefaultAsync<EventItem>(query, new { Id = id, Lang = lang ?? "EN" });
                if (eventItem == null)
                {
                    return NotFound(new { success = false, message = $"Event with ID {id} not found." });
                }

                eventItem.Content = ResolveEventContent(eventItem.Id, eventItem.Content, eventItem.Abstract);
                eventItem.ImageUrl = NormalizeImageUrl(eventItem.ImageUrl);
                return Ok(new { success = true, data = eventItem });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to query event {id} from database.");
                return StatusCode(500, new { success = false, message = "Unable to load event details. Please try again later." });
            }
        }

        private string NormalizeImageUrl(string? rawUrl)
        {
            if (string.IsNullOrWhiteSpace(rawUrl)) return "/Image/News4.jpg";
            var clean = rawUrl.Trim().Replace('\\', '/');
            if (clean.StartsWith("~/")) clean = clean.Substring(1);
            if (!clean.StartsWith("/") && !clean.StartsWith("http://", StringComparison.OrdinalIgnoreCase) && !clean.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            {
                if (clean.StartsWith("Image/", StringComparison.OrdinalIgnoreCase))
                {
                    clean = "/" + clean;
                }
                else
                {
                    clean = "/Image/" + clean;
                }
            }
            return clean;
        }

        private static readonly Dictionary<string, string> BuiltInEventContents = new(StringComparer.OrdinalIgnoreCase)
        {
            ["4"] = @"<p>We are pleased to announce the grand reopening and expansion of our branch in Sooriyawewa on 19th September 2025.</p>
<p>This expansion is part of our mission to provide convenient and reliable vehicle loan services to more communities across the country. Our new branch is equipped to offer a full range of loan facilities, including loans for purchasing motorcycles, to support your personal and business needs, bringing the latest brand-new Hero motorcycles to customers in the area.</p>
<div class=""event-callout"">
    <h3>Experience the Latest Hero Lineup</h3>
    <p>This addition brings a wider range of the latest Hero motorcycles, giving our customers greater choice and convenience as we continue to grow.</p>
</div>
<p>Visit <strong>D.J. Trust</strong> today and discover your next riding experience with us!</p>
<div class=""meta"">
    <dl>
        <dt>Branch Location</dt>
        <dd>No: 6407, Ambalanthota Road, Sooriyawewa.</dd>
        <dt>Opening Date</dt>
        <dd>19th September 2025</dd>
    </dl>
</div>
<div class=""row"">
    <img src=""/Image/S2.jpg"" alt=""Showroom Reopening Ceremony"">
    <img src=""/Image/opening.webp"" alt=""Showroom Procession"">
    <img src=""/Image/shop_front.webp"" alt=""Showroom Front Entrance"">
</div>",

            ["2002"] = @"<p>We are pleased to announce the grand reopening and expansion of our branch in Sooriyawewa on 19th September 2025.</p>
<p>This expansion is part of our mission to provide convenient and reliable vehicle loan services to more communities across the country. Our new branch is equipped to offer a full range of loan facilities, including loans for purchasing motorcycles, to support your personal and business needs, bringing the latest brand-new Hero motorcycles to customers in the area.</p>
<div class=""event-callout"">
    <h3>Experience the Latest Hero Lineup</h3>
    <p>This addition brings a wider range of the latest Hero motorcycles, giving our customers greater choice and convenience as we continue to grow.</p>
</div>
<p>Visit <strong>D.J. Trust</strong> today and discover your next riding experience with us!</p>
<div class=""meta"">
    <dl>
        <dt>Branch Location</dt>
        <dd>No: 6407, Ambalanthota Road, Sooriyawewa.</dd>
        <dt>Opening Date</dt>
        <dd>19th September 2025</dd>
    </dl>
</div>
<div class=""row"">
    <img src=""/Image/S2.jpg"" alt=""Showroom Reopening Ceremony"">
    <img src=""/Image/opening.webp"" alt=""Showroom Procession"">
    <img src=""/Image/shop_front.webp"" alt=""Showroom Front Entrance"">
</div>",

            ["2010"] = @"<p>We are pleased to announce the opening of our new branch in Matara on 19th January 2026.</p>
<p>This expansion is part of our mission to provide convenient and reliable vehicle loan services to more communities across the country. Our new branch is equipped to offer a full range of loan solutions, including loans for purchasing motorcycles, to support your personal and business needs.</p>
<div class=""meta"">
    <dl>
        <dt>Branch Location</dt>
        <dd>Matara Town</dd>
        <dt>Opening Date</dt>
        <dd>19th January 2026</dd>
    </dl>
</div>
<div class=""row"">
    <img src=""/Image/shop_front.webp"" alt=""Matara Showroom Front"">
    <img src=""/Image/opening.webp"" alt=""Opening Ceremony"">
    <img src=""/Image/Shop_inside.webp"" alt=""Inside Showroom"">
    <img src=""/Image/customer.jpg"" alt=""Customer Care"">
</div>",

            ["1"] = @"<p>The Southern Province Dealers Meeting of D.J. Trust and facility coordinators was held on 10th August 2024 at Hotel Shiny in Hikkaduwa. The meeting focused on the group's ongoing mission to provide quality vehicle loan services and automobile spare parts across the region. As a group with nearly five decades of experience, D.J. Trust remains committed to supporting communities through diversified interests in vehicle credit services and the plantation sector including tea, rubber, coconut, and cinnamon estates.</p>",

            ["2"] = @"<p>The Western Province Dealers Meeting of D.J. Trust was held on 18th May 2024 at Hotel Alaka Mandawa, Kadawatha. The event was attended by approximately 120 dealers and facility coordinators. During the meeting, excellence in service was recognized and awarded. Darshanie Motors was awarded the first place among the best dealers, while Chanaka Motors secured the first runner-up position, and Raja Motors was named the third runner-up for the number of facilities offered in 2023. The company representatives thanked all dealers for their continuous support and contribution to the group's success.</p>",

            ["3"] = @"<p>D.J. Trust has concentrated on numerous areas to streamline the loan giving procedure and offers loans for both two-wheelers and three-wheelers. We have begun providing our customers with enhanced advantages including maximum eligibility age up to 70 years, loan period up to 5 years, processing within 24 hours, and hassle-free re-loan facilities for existing customers.</p>",

            ["1002"] = @"<p>D.J. Trust has concentrated on numerous areas to streamline the loan giving procedure and offers loans for both two-wheelers and three-wheelers. We have begun providing our customers with enhanced advantages including maximum eligibility age up to 70 years, loan period up to 5 years, processing within 24 hours, and hassle-free re-loan facilities for existing customers.</p>"
        };

        private string ResolveEventContent(string? id, string? contentOrPath, string? fallbackAbstract = null)
        {
            // 1. If content is actual text (not a file path pointing to .txt or /Text/)
            if (!string.IsNullOrWhiteSpace(contentOrPath) && 
                !contentOrPath.Trim().EndsWith(".txt", StringComparison.OrdinalIgnoreCase) && 
                !contentOrPath.Trim().Contains("/Text/", StringComparison.OrdinalIgnoreCase) &&
                !contentOrPath.Trim().Contains(@"\Text\", StringComparison.OrdinalIgnoreCase))
            {
                return contentOrPath;
            }

            // 2. Check built-in content by ID
            if (!string.IsNullOrEmpty(id) && BuiltInEventContents.TryGetValue(id, out var builtIn))
            {
                return builtIn;
            }

            // 3. Check built-in content by file name key (e.g. if content was "4.txt" or "\Text\News\4.txt")
            if (!string.IsNullOrWhiteSpace(contentOrPath))
            {
                var fileNameKey = Path.GetFileNameWithoutExtension(contentOrPath.Trim().Replace('\\', '/'));
                if (!string.IsNullOrEmpty(fileNameKey) && BuiltInEventContents.TryGetValue(fileNameKey, out var fileBuiltIn))
                {
                    return fileBuiltIn;
                }
            }

            // 4. Fallback to abstract or empty string
            return !string.IsNullOrWhiteSpace(fallbackAbstract) ? fallbackAbstract : string.Empty;
        }
    }
}
