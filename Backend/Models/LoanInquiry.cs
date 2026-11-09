using System;

namespace DjTrust.Api.Models
{
    public class LoanInquiryRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string NicNumber { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string VehicleType { get; set; } = string.Empty;
        public decimal RequestedAmount { get; set; }
        public int PeriodMonths { get; set; }
        public string? Remarks { get; set; }
    }

    public class LoanCalculationResult
    {
        public decimal RequestedAmount { get; set; }
        public int PeriodMonths { get; set; }
        public decimal MonthlyInstallment { get; set; }
        public decimal TotalPayable { get; set; }
        public decimal InterestRate { get; set; }
    }

    public class LoanApplicationRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Nic { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public object? Loanamount { get; set; }
        public object? Noof { get; set; }
        public string? Model { get; set; } = "-";
        public string? Brand { get; set; } = "-";
        public string? Modelname { get; set; } = "N/A";
        public string? Brandname { get; set; } = "N/A";
        public string? Vehicleno { get; set; } = "Loan Application";
        public string? IDDocumentPath { get; set; }
        public string? BillingProofPath { get; set; }
    }

    public class VehicleOption
    {
        public string Value { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
    }
}
