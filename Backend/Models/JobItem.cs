namespace DjTrust.Api.Models
{
    public class JobItem
    {
        public string Serial { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? TitleSi { get; set; }
        public string End { get; set; } = string.Empty;
        public string? Start { get; set; }
        public string? Description { get; set; }
        public string? DescriptionSi { get; set; }
        public DateTime? CreatedAt { get; set; }
    }

    public class JobApplicationRequest
    {
        public string Refcode { get; set; } = string.Empty;
        public string Jobtitle { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Tpno { get; set; } = string.Empty;
        public string Head { get; set; } = string.Empty;
        public string? Body { get; set; }
        public string? Coverletter { get; set; }
    }
}

