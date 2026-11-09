namespace DjTrust.Api.Models
{
    public class EventItem
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Abstract { get; set; }
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        public string? PublishedDate { get; set; }
        public string? Category { get; set; } = "Event";
    }
}
