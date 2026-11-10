import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  FileText, 
  Phone, 
  Percent, 
  CalendarCheck, 
  Lock, 
  Shield, 
  Headphones, 
  Building, 
  MapPin, 
  ListOrdered, 
  CreditCard, 
  Smartphone, 
  Landmark, 
  Mail, 
  ArrowRight,
  Info
} from 'lucide-react';

interface FinanceProps {
  onOpenLoanModal?: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS_OF_TRUST = CURRENT_YEAR - 1931;

export const Finance: React.FC<FinanceProps> = ({ onOpenLoanModal }) => {
  const yearsOfTrust = YEARS_OF_TRUST;

  const benefits = [
    {
      title: 'Competitive Rates',
      desc: 'Attractive loan options designed around manageable repayment plans.',
      icon: <Percent className="w-5 h-5 text-current" />
    },
    {
      title: 'Early Settlement Benefit',
      desc: 'Settle your loan ahead of schedule and benefit from reduced future interest.',
      icon: <CalendarCheck className="w-5 h-5 text-current" />
    },
    {
      title: 'Secured Lending Options',
      desc: 'Flexible credit options supported by vehicle ownership documentation, providing customers with access to funds against eligible vehicles.',
      icon: <Lock className="w-5 h-5 text-current" />
    },
    {
      title: 'Third-Party Insurance Options',
      desc: 'Access to third-party insurance solutions alongside your loan facility.',
      icon: <Shield className="w-5 h-5 text-current" />
    },
    {
      title: 'Dedicated Customer Support',
      desc: 'A dedicated team supporting you at every step of your loan journey.',
      icon: <Headphones className="w-5 h-5 text-current" />
    },
    {
      title: 'Minimal Documentation',
      desc: 'A straightforward application and documentation process designed for greater convenience.',
      icon: <FileText className="w-5 h-5 text-current" />
    },
    {
      title: 'Branch Network',
      desc: 'Access our services through branches in Batapola, Colombo, Kohuwala, Ambalangoda, Matara, and Sooriyawewa.',
      icon: <Building className="w-5 h-5 text-current" />
    },
    {
      title: 'Nation-Wide Partner Network',
      desc: 'Supported by a network of 500+ dealers and authorized agents across multiple provinces, extending our reach to customers throughout Sri Lanka.',
      icon: <MapPin className="w-5 h-5 text-current" />
    }
  ];

  return (
    <div className="font-['Inter',sans-serif] bg-white">
      {/* 1. Page Header Banner */}
      <section className="relative bg-[#001f4a] py-14 sm:py-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d8f]/90 to-[#001f4a]/85 z-0" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div data-aos="fade-right">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-1px] text-white m-0">
                Loan Facility
              </h1>
            </div>
            <div data-aos="fade-left">
              <nav className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm border border-white/10">
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <span className="text-white font-medium">Loan Facility</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video Hero Section */}
      <div className="relative w-full min-h-[460px] sm:min-h-[480px] lg:min-h-[520px] flex items-center overflow-hidden bg-black py-10 sm:py-14 lg:py-16">
        {/* Background Video */}
        <video 
          playsInline 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src="/Image/video/bikeSale.mp4" type="video/mp4" />
        </video>
        
        {/* Hero Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#001b44]/95 via-[#002d78]/85 to-black/60 z-0 pointer-events-none" />

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl text-left text-white" data-aos="fade-right">
            <h2 className="text-2xl sm:text-4xl lg:text-[2.85rem] font-extrabold leading-tight mb-3 sm:mb-4 text-white drop-shadow-md">
              Drive Your Dreams Forward
            </h2>
            <p className="text-xs sm:text-base lg:text-[1.05rem] text-white/90 leading-relaxed mb-6 sm:mb-8">
              Flexible two-wheeler and three-wheeler loan solutions designed to make the process simple, accessible, and convenient. With an established network and experienced team, D.J. Trust supports customers throughout their loan journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4">
              <button
                type="button"
                onClick={onOpenLoanModal}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-[#002868] text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#002868]" />
                <span>Apply for a Loan</span>
              </button>

              <a
                href="tel:0914501030"
                className="inline-flex items-center justify-center gap-2.5 bg-[#1d63ed] hover:bg-[#1752c7] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call Now</span>
              </a>

              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/40 text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg backdrop-blur-sm transition-all"
              >
                <span>Explore Benefits</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stats Bar (Matching exact #003d8f styling) */}
      <div className="bg-[#003d8f] text-white py-6 shadow-md border-y border-white/10" data-aos="fade-up">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x-0 md:divide-x divide-white/20">
            {/* Stat 1 */}
            <div className="py-2.5 px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none mb-1">
                {yearsOfTrust}<span className="text-2xl font-bold">+</span>
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1px] text-white/85">
                Years of Trust
              </div>
            </div>

            {/* Stat 2 */}
            <div className="py-2.5 px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none mb-1">
                07
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1px] text-white/85">
                Island-Wide Showrooms
              </div>
            </div>

            {/* Stat 3 */}
            <div className="py-2.5 px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none mb-1">
                24<span className="text-2xl font-bold">h</span>
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1px] text-white/85">
                Fast Approval
              </div>
            </div>

            {/* Stat 4 */}
            <div className="py-2.5 px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none mb-1">
                0%
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1px] text-white/85">
                Early Settlement Fee
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Why Choose D.J Trust? */}
      <section id="benefits" className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] font-bold text-[#0f172a] tracking-tight m-0">
              Why Choose D.J Trust?
            </h2>
            <div className="w-10 h-1 bg-[#003d8f] mx-auto mt-3 rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 max-w-[980px] mx-auto">
            {benefits.map((b, idx) => (
              <div 
                key={idx}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 50}
                className="group relative overflow-hidden w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-12px)] bg-[#04245c] hover:bg-[#062c6e] rounded-[14px] p-4.5 sm:p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(4,36,92,0.3)] hover:border-[#4fa3ff]/50 border border-[#0d347a]/40 flex flex-col justify-start"
              >
                {/* Top border sliding blue accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#4fa3ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon Box with hover transform and glow */}
                <div className="w-8 h-8 rounded-[8px] bg-[#123a78] text-[#5ea5ff] group-hover:bg-[#4fa3ff] group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_6px_16px_rgba(79,163,255,0.4)] flex items-center justify-center mb-3 shrink-0 transition-all duration-300 shadow-inner [&>svg]:w-4 [&>svg]:h-4">
                  {b.icon}
                </div>

                {/* Title */}
                <h3 className="text-[0.92rem] sm:text-[0.98rem] font-bold text-white mb-1.5 leading-snug tracking-tight group-hover:text-white transition-colors">
                  {b.title}
                </h3>

                {/* Description */}
                <p className="text-[0.78rem] sm:text-[0.82rem] text-[#b8c9e6] group-hover:text-white/90 leading-relaxed m-0 font-normal transition-colors">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section (Exact Royal Blue Gradient Background) */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-[#072a6e] via-[#0a3992] to-[#0d46b0] text-white overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-14" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] font-extrabold text-white m-0">
              How It Works
            </h2>
            <div className="w-[50px] h-[4px] bg-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.5)] mx-auto mt-3 mb-3 rounded-[2px]" />
            <p className="text-white/85 text-sm sm:text-[0.95rem] max-w-xl mx-auto m-0">
              A streamlined, transparent process to get you on the road faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {/* Step 1 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="group bg-white rounded-[14px] p-8 text-center shadow-[0_14px_35px_rgba(0,10,35,0.28)] hover:shadow-[0_22px_45px_rgba(0,10,35,0.4)] hover:-translate-y-2 transition-all duration-400 border border-white/95 relative overflow-hidden"
            >
              <div className="relative mb-5">
                <div className="w-[52px] h-[52px] rounded-full bg-[#f0f6ff] border-2 border-[#dbeafe] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:border-[#0a3992] group-hover:scale-110 group-hover:shadow-[0_8px_22px_rgba(10,57,146,0.35)] flex items-center justify-center mx-auto transition-all duration-400">
                  <ListOrdered className="w-6 h-6" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-7 w-6 h-6 rounded-full bg-[#38bdf8] text-[#001f4a] font-bold text-xs flex items-center justify-center shadow">
                  1
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#001f4a] mb-2">
                Submit Your Request
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed m-0">
                Complete our simple, secure online form with your details and vehicle preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="group bg-white rounded-[14px] p-8 text-center shadow-[0_14px_35px_rgba(0,10,35,0.28)] hover:shadow-[0_22px_45px_rgba(0,10,35,0.4)] hover:-translate-y-2 transition-all duration-400 border border-white/95 relative overflow-hidden"
            >
              <div className="relative mb-5">
                <div className="w-[52px] h-[52px] rounded-full bg-[#f0f6ff] border-2 border-[#dbeafe] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:border-[#0a3992] group-hover:scale-110 group-hover:shadow-[0_8px_22px_rgba(10,57,146,0.35)] flex items-center justify-center mx-auto transition-all duration-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-7 w-6 h-6 rounded-full bg-[#38bdf8] text-[#001f4a] font-bold text-xs flex items-center justify-center shadow">
                  2
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#001f4a] mb-2">
                We Contact You
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed m-0">
                Our team will get in touch to guide you through the application process and next steps.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="group bg-white rounded-[14px] p-8 text-center shadow-[0_14px_35px_rgba(0,10,35,0.28)] hover:shadow-[0_22px_45px_rgba(0,10,35,0.4)] hover:-translate-y-2 transition-all duration-400 border border-white/95 relative overflow-hidden"
            >
              <div className="relative mb-5">
                <div className="w-[52px] h-[52px] rounded-full bg-[#f0f6ff] border-2 border-[#dbeafe] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:border-[#0a3992] group-hover:scale-110 group-hover:shadow-[0_8px_22px_rgba(10,57,146,0.35)] flex items-center justify-center mx-auto transition-all duration-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-7 w-6 h-6 rounded-full bg-[#38bdf8] text-[#001f4a] font-bold text-xs flex items-center justify-center shadow">
                  3
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#001f4a] mb-2">
                Application assessment
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed m-0">
                Submit the required documentation for assessment and approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Payment Options Section */}
      <section id="payment-options" className="py-16 sm:py-20 bg-[#f0f6ff]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002060] flex items-center justify-center gap-2.5 m-0">
              <span>Payment Options</span>
              <CreditCard className="w-7 h-7 text-[#116cf7]" />
            </h2>
            <div className="w-[50px] h-[3px] bg-[#116cf7] mx-auto mt-2.5 mb-3 rounded-full" />
            <p className="text-sm sm:text-[0.95rem] text-[#555] leading-relaxed mb-2">
              Manage your loan repayments conveniently through a range of approved payment channels.
            </p>
            <p className="text-sm text-[#333] m-0">
              Need assistance? Contact our Customer Care team on{' '}
              <a href="tel:0914501030" className="text-[#003d8f] font-extrabold hover:underline">
                091 450 1030
              </a>.
            </p>
          </div>

          {/* 3 Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 text-center">
            {/* Card 1 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="group bg-white rounded-[12px] p-7 sm:p-8 border border-[#002d78]/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,61,143,0.12)] hover:-translate-y-1.5 hover:border-[#003d8f]/20 transition-all duration-400 flex flex-col items-center cursor-pointer"
            >
              <div className="w-[55px] h-[55px] rounded-full bg-[#f0f6ff] text-[#003d8f] group-hover:bg-[#003d8f] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_8px_16px_rgba(0,61,143,0.2)] flex items-center justify-center mb-4 transition-all duration-400">
                <Smartphone className="w-6 h-6 transition-transform duration-400" />
              </div>
              <h3 className="text-base sm:text-[1.05rem] font-extrabold text-[#0f172a] group-hover:text-[#003d8f] mb-2 tracking-[-0.2px] transition-colors duration-300">
                Digital Banking channels and banking Apps
              </h3>
              <p className="text-xs sm:text-[0.85rem] text-[#64748b] leading-[1.5] m-0">
                Make payments conveniently via digital banking channels across Commercial Bank, People's Bank, DFCC Bank, and HNB.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="group bg-white rounded-[12px] p-7 sm:p-8 border border-[#002d78]/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,61,143,0.12)] hover:-translate-y-1.5 hover:border-[#003d8f]/20 transition-all duration-400 flex flex-col items-center cursor-pointer"
            >
              <div className="w-[55px] h-[55px] rounded-full bg-[#f0f6ff] text-[#003d8f] group-hover:bg-[#003d8f] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_8px_16px_rgba(0,61,143,0.2)] flex items-center justify-center mb-4 transition-all duration-400">
                <Landmark className="w-6 h-6 transition-transform duration-400" />
              </div>
              <h3 className="text-base sm:text-[1.05rem] font-extrabold text-[#0f172a] group-hover:text-[#003d8f] mb-2 tracking-[-0.2px] transition-colors duration-300">
                ATM/CDM Network
              </h3>
              <p className="text-xs sm:text-[0.85rem] text-[#64748b] leading-[1.5] m-0">
                Payments can be made through supported ATM/CDM networks of Commercial Bank, People's Bank, DFCC Bank, and HNB.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="group bg-white rounded-[12px] p-7 sm:p-8 border border-[#002d78]/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,61,143,0.12)] hover:-translate-y-1.5 hover:border-[#003d8f]/20 transition-all duration-400 flex flex-col items-center cursor-pointer"
            >
              <div className="w-[55px] h-[55px] rounded-full bg-[#f0f6ff] text-[#003d8f] group-hover:bg-[#003d8f] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_8px_16px_rgba(0,61,143,0.2)] flex items-center justify-center mb-4 transition-all duration-400">
                <Building className="w-6 h-6 transition-transform duration-400" />
              </div>
              <h3 className="text-base sm:text-[1.05rem] font-extrabold text-[#0f172a] group-hover:text-[#003d8f] mb-2 tracking-[-0.2px] transition-colors duration-300">
                Banks
              </h3>
              <p className="text-xs sm:text-[0.85rem] text-[#64748b] leading-[1.5] m-0">
                Customers can also make payments directly at any branch of Commercial Bank, People's Bank, DFCC Bank, and HNB.
              </p>
            </div>
          </div>

          {/* Partner Banking Networks */}
          <div className="mt-9 pt-7 border-t border-dashed border-[#003d8f]/15 text-center" data-aos="fade-up" data-aos-delay="200">
            <span className="inline-flex items-center gap-1.5 bg-white text-[#003d8f] text-[0.78rem] font-bold uppercase tracking-[1.5px] px-[18px] py-[6px] rounded-full border border-[#d8e5f8] shadow-[0_2px_6px_rgba(0,61,143,0.04)] mb-2">
              <Landmark className="w-3.5 h-3.5 text-[#003d8f]" />
              <span>Banking Networks</span>
            </span>
            <p className="text-[0.88rem] text-[#64748b] max-w-xl mx-auto mb-[22px]">
              Repayments accepted across all branches, online &amp; mobile apps, and ATM / CDM machines
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-center max-w-[860px] mx-auto">
              {/* Commercial Bank */}
              <div className="bg-white border border-[#e2ecf9] rounded-[14px] p-3 flex items-center justify-center h-[80px] max-w-[195px] w-full mx-auto shadow-[0_4px_12px_rgba(0,31,74,0.03)] hover:-translate-y-1 hover:scale-103 hover:shadow-[0_10px_24px_rgba(0,31,74,0.08)] hover:border-[#cbd5e1] transition-all duration-350 cursor-pointer">
                <img 
                  src="/Image/Bank Logo/Commercial_Bank_logo.svg" 
                  alt="Commercial Bank" 
                  className="max-h-10 max-w-[135px] w-auto object-contain"
                />
              </div>

              {/* People's Bank */}
              <div className="bg-white border border-[#e2ecf9] rounded-[14px] p-3 flex items-center justify-center h-[80px] max-w-[195px] w-full mx-auto shadow-[0_4px_12px_rgba(0,31,74,0.03)] hover:-translate-y-1 hover:scale-103 hover:shadow-[0_10px_24px_rgba(0,31,74,0.08)] hover:border-[#cbd5e1] transition-all duration-350 cursor-pointer">
                <img 
                  src="/Image/Bank Logo/Peoplesbank1.png" 
                  alt="People's Bank" 
                  className="max-h-11 max-w-[135px] w-auto object-contain"
                />
              </div>

              {/* DFCC Bank */}
              <div className="bg-white border border-[#e2ecf9] rounded-[14px] p-3 flex items-center justify-center h-[80px] max-w-[195px] w-full mx-auto shadow-[0_4px_12px_rgba(0,31,74,0.03)] hover:-translate-y-1 hover:scale-103 hover:shadow-[0_10px_24px_rgba(0,31,74,0.08)] hover:border-[#cbd5e1] transition-all duration-350 cursor-pointer">
                <img 
                  src="/Image/Bank Logo/DFCC.png" 
                  alt="DFCC Bank" 
                  className="max-h-11 max-w-[135px] w-auto object-contain"
                />
              </div>

              {/* HNB */}
              <div className="bg-white border border-[#e2ecf9] rounded-[14px] p-3 flex items-center justify-center h-[80px] max-w-[195px] w-full mx-auto shadow-[0_4px_12px_rgba(0,31,74,0.03)] hover:-translate-y-1 hover:scale-103 hover:shadow-[0_10px_24px_rgba(0,31,74,0.08)] hover:border-[#cbd5e1] transition-all duration-350 cursor-pointer">
                <img 
                  src="/Image/Bank Logo/HNB.png" 
                  alt="Hatton National Bank (HNB)" 
                  className="max-h-11 max-w-[110px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Who Can Apply & Need Guidance */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: Who Can Apply? */}
            <div data-aos="fade-right" className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002060] mb-2">
                  Who Can Apply?
                </h2>
                <div className="w-12 h-1 bg-[#003d8f] mb-4 rounded-full" />
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our loan facilities are designed for a broad range of customers, from first-time vehicle owners to self-employed individuals and professionals.
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={onOpenLoanModal}
                  className="inline-flex items-center gap-2 bg-[#003d8f] hover:bg-[#002766] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>

            {/* Right: Need Expert Guidance? */}
            <div data-aos="fade-left" className="bg-gradient-to-br from-[#021b47] via-[#02276c] to-[#01358d] text-white rounded-[20px] p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-white/10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* White Phone Badge */}
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#002d78]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white m-0 tracking-tight">
                      Need Expert Guidance?
                    </h3>
                    <div className="w-12 h-1 bg-[#38bdf8] rounded-full mt-1.5" />
                  </div>
                </div>

                <p className="text-white/85 text-xs sm:text-sm lg:text-[0.95rem] leading-relaxed m-0">
                  Our dedicated loan teams are available island-wide to help you choose the best facility for your needs.
                </p>
              </div>

              {/* Divider & Bottom Action Row */}
              <div className="mt-6 pt-5 border-t border-white/15">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="tel:0914501030"
                    className="inline-flex items-center gap-2 bg-[#092b66]/70 hover:bg-[#0d347a] text-white border border-white/20 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg backdrop-blur-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#38bdf8]" />
                    <span>091 450 1030</span>
                  </a>

                  <a
                    href="mailto:info@djtrust.lk"
                    className="inline-flex items-center gap-2 bg-[#092b66]/70 hover:bg-[#0d347a] text-white border border-white/20 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg backdrop-blur-sm transition-all"
                    title="Email us"
                  >
                    <Mail className="w-4 h-4 text-[#38bdf8]" />
                    <span>info@djtrust.lk</span>
                  </a>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#002d78] text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Contact Support</span>
                    <ArrowRight className="w-4 h-4 text-[#002d78]" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Important Information Box */}
          <div data-aos="fade-up" className="bg-[#f8fafc] border-l-4 border-[#116cf7] p-6 sm:p-7 rounded-r-xl">
            <h2 className="text-base sm:text-lg font-bold text-[#002060] mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#116cf7]" />
              <span>Important Information</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0 text-justify">
              All loan applications are subject to assessment and approval. Applicable rates, charges, repayment terms, security requirements, and other conditions will be clearly communicated before entering into an agreement. Submission of an application does not guarantee approval. Please borrow responsibly and ensure repayments are affordable for your circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section data-aos="fade-up" className="bg-gradient-to-r from-[#001f4a] via-[#002d78] to-[#003d8f] py-14 sm:py-16 text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                Ready to Get Your Loan?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl m-0">
                Fill in our quick application form and our team will contact you within 24 hours. No hidden charges, no long waiting times.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onOpenLoanModal}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-[#002868] text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#002868]" />
                <span>Apply for a Loan</span>
              </button>

              <a
                href="tel:0914501030"
                className="inline-flex items-center gap-2.5 bg-[#1d63ed] hover:bg-[#1752c7] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};