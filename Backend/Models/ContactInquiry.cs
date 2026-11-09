namespace DjTrust.Api.Models
{
    public class ContactInquiryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Tpno { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}

