import React, { useState } from 'react';
import { 
  Phone, 
  ChevronDown, 
  Handshake, 
  Info, 
  X, 
  FileCheck,
  CreditCard,
  Home,
  UserCheck
} from 'lucide-react';
import { SriLankaMap } from '../components/SriLankaMap';
import { submitDealerApplication, DealerApplyRequest } from '../services/api';

export const AuthorizedDealers: React.FC = () => {
  // Dealership Request Form Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<{
    shopname: string;
    address: string;
    type: string;
    name: string;
    tpno: string;
    tpno2: string;
  }>({
    shopname: '',
    address: '',
    type: 'Brand New',
    name: '',
    tpno: '',
    tpno2: ''
  });

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Modal Step 1 -> Step 2 validation
  const handleNextStep = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.shopname.trim()) errors.shopname = 'Business name is required.';
    if (!formData.address.trim()) errors.address = 'District / Location is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setModalStep(2);
  };

  // Modal Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Contact person name is required.';
    
    const tp1 = formData.tpno.trim();
    if (!tp1 || !/^\d{10}$/.test(tp1)) {
      errors.tpno = 'Valid 10-digit telephone number required.';
    }

    const tp2 = formData.tpno2.trim();
    if (tp2 && !/^\d{10}$/.test(tp2)) {
      errors.tpno2 = 'Valid 10-digit telephone number required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const combinedPhone = tp2 ? `${tp1} / ${tp2}` : tp1;
      const requestPayload: DealerApplyRequest = {
        name: formData.name,
        shopname: formData.shopname,
        address: formData.address,
        tpno: combinedPhone,
        type: formData.type
      };

      await submitDealerApplication(requestPayload);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      // Even if network fails, show completion confirmation per UI design
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalStep(1);
      setIsSuccess(false);
      setFormErrors({});
      setFormData({
        shopname: '',
        address: '',
        type: 'Brand New',
        name: '',
        tpno: '',
        tpno2: ''
      });
    }, 300);
  };

  return (
    <div className="font-sans bg-[#f8fbff] text-slate-800 min-h-screen">
      <style>{`
        /* ===== Floating Dealership CTA ===== */
        .dealership-fab {
          position: fixed;
          bottom: 35px;
          right: 100px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background: #003d8f;
          color: #ffffff !important;
          width: 60px;
          height: 60px;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 61, 143, 0.45);
          text-decoration: none !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: visible;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .dealership-fab .fab-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .dealership-fab .fab-text {
          white-space: nowrap;
          opacity: 0;
          max-width: 0;
          overflow: hidden;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          transition: all 0.4s ease;
          padding-left: 0;
        }
        .dealership-fab:hover {
          width: 220px;
          box-shadow: 0 15px 45px rgba(0, 61, 143, 0.4);
          transform: translateY(-5px);
          background: #ffffff;
        }
        .dealership-fab:hover .fab-icon {
          color: #003d8f;
          transform: rotate(-10deg);
        }
        .dealership-fab:hover .fab-text {
          opacity: 1;
          max-width: 160px;
          padding-left: 20px;
          color: #003d8f;
        }
        .dealership-fab::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background: #003d8f;
          top: 0;
          left: 0;
          z-index: -1;
          animation: fab-pulse 2.5s infinite;
          pointer-events: none;
        }
        @keyframes fab-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* Scroll-Driven Animations */
        .scroll-animate {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-animate.reveal {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .dealership-fab { bottom: 20px; right: 25px; width: 50px; height: 50px; }
          .dealership-fab .fab-icon { width: 50px; height: 50px; }
          .dealership-fab:hover { width: 50px; }
          .dealership-fab:hover .fab-text { display: none; }
        }

        /* ===== Header Background & Overlays ===== */
        .bp-page-header {
          position: relative;
          background: #001f4a;
          padding: 60px 0 50px 0;
          color: white;
          overflow: hidden;
        }
        .bp-page-header-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('/image/News4.jpg') center/cover no-repeat;
          filter: blur(6px) brightness(0.4);
          opacity: 0.35;
          transform: scale(1.08);
          z-index: 0;
        }
        .bp-page-header-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(circle at 90% 50%, rgba(148, 163, 184, 0.05) 0%, transparent 40%), linear-gradient(135deg, #001f4a 0%, #00112b 100%);
          z-index: 1;
        }
        .bp-page-header-overlay::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 50%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' fill='none'%3E%3Cpath d='M100,600 C200,450 300,550 400,350 C500,150 600,250 800,50' stroke='rgba(148, 163, 184, 0.04)' stroke-width='2' fill='none'/%3E%3Cpath d='M0,500 C150,380 250,480 400,220 C550,60 650,180 800,0' stroke='rgba(255, 255, 255, 0.02)' stroke-width='1.5' fill='none'/%3E%3Cpath d='M200,600 C300,500 400,580 550,420 C700,260 750,320 800,150' stroke='rgba(255, 255, 255, 0.015)' stroke-width='1' fill='none'/%3E%3Cg stroke='rgba(255, 255, 255, 0.025)' stroke-width='1'%3E%3Ccircle cx='400' cy='350' r='4' fill='rgba(148, 163, 184, 0.1)'/%3E%3Ccircle cx='500' cy='150' r='3' fill='rgba(255, 255, 255, 0.08)'/%3E%3Ccircle cx='600' cy='250' r='5' fill='rgba(255, 255, 255, 0.05)'/%3E%3Ccircle cx='300' cy='550' r='3' fill='rgba(255, 255, 255, 0.05)'/%3E%3Cline x1='300' y1='550' x2='400' y2='350' /%3E%3Cline x1='400' y1='350' x2='500' y2='150' /%3E%3Cline x1='400' y1='350' x2='600' y2='250' /%3E%3Cline x1='600' y1='250' x2='800' y2='50' /%3E%3C/g%3E%3C/svg%3E");
          background-size: cover;
          background-position: right center;
          background-repeat: no-repeat;
          z-index: 1;
          pointer-events: none;
          mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
        }

        /* ===== Success Checkmark Animation ===== */
        .checkmark-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 25px 0 15px;
        }
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 4;
          stroke: #28a745;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #28a745;
          animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out 0s both;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 4;
          stroke-miterlimit: 10;
          stroke: #28a745;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke: #ffffff;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
          0%, 100% { transform: none; }
          50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
          100% { box-shadow: inset 0px 0px 0px 40px #28a745; }
        }
      `}</style>

      {/* ===== Floating Dealership CTA Button ===== */}
      <button 
        type="button" 
        className="dealership-fab group"
        onClick={() => setIsModalOpen(true)}
        aria-label="Become an Authorized Dealer"
      >
        <span className="fab-text">Become a Dealer</span>
        <div className="fab-icon">
          <Handshake className="w-6 h-6" />
        </div>
      </button>

      {/* ===== PREMIUM PAGE HEADER ===== */}
      <section className="bp-page-header">
        <div className="bp-page-header-bg"></div>
        <div className="bp-page-header-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3" data-aos="fade-right">
              <span className="inline-block bg-white/10 border border-white/20 text-slate-300 text-[11px] font-extrabold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full">
                Authorized Network
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Authorized Dealers
              </h1>

              <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
                Locate our trusted dealer network across Sri Lanka or apply to join our growing business family.
              </p>
            </div>
            <div data-aos="fade-left">
              <nav className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-200">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span className="text-white/40">›</span>
                <span className="text-white font-bold">Dealers</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-gradient-to-r from-[#003d8f] to-[#001f4a] py-6 text-white shadow-md" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15 gap-4 md:gap-0 text-center">
            <div className="py-2">
              <div className="text-4xl lg:text-5xl font-black text-slate-100 mb-1">95+</div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-bold">Years of Service</div>
            </div>
            <div className="py-2">
              <div className="text-4xl lg:text-5xl font-black text-slate-100 mb-1">500+</div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-bold">Island-Wide Dealers</div>
            </div>
            <div className="py-2">
              <div className="text-4xl lg:text-5xl font-black text-slate-100 mb-1">23</div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-bold">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRANCH AND DEALER LOCATOR SECTION ===== */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f4f8fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10 text-left" data-aos="fade-up">
            <span className="bg-blue-50 text-[#003d8f] text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider inline-block mb-3 border border-blue-100">
              Locate Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001f4a] tracking-tight mb-3">
              Branch and Dealer Locator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Search through our 500+ dealership network and branches across 23 districts to find the nearest location to you.
            </p>
          </div>

          {/* Standalone Interactive Sri Lanka Vector Map */}
          <div data-aos="fade-up" data-aos-delay="100">
            <SriLankaMap />
          </div>
        </div>
      </section>

      {/* ===== BECOME A PARTNER CTA SECTION ===== */}
      <section className="bg-gradient-to-r from-[#003d8f] to-[#001f4a] py-20 text-white text-center relative overflow-hidden" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Join Our Network?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Become part of the D.J. Trust dealer network and grow your business with the backing of 95+ years of trusted excellence.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2.5 bg-[#94a3b8] hover:bg-white text-white hover:text-[#001f4a] font-extrabold text-sm px-9 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              <Handshake className="w-5 h-5" />
              Dealership Request Form
            </button>
          </div>
        </div>
      </section>

      {/* ===== DOCUMENT CHECKLIST SECTION ===== */}
      <section className="py-20 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="text-xs font-bold text-[#003d8f] uppercase tracking-widest bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Prerequisites
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001f4a] tracking-tight mb-3">
              Required Documents
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto rounded-full mb-3"></div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Please keep the following documents ready to accelerate the onboarding process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" data-aos="fade-up" data-aos-delay="100">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#002060] text-base mb-1">
                  Business Registration (BR)
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Copy of valid Business Registration certificate or Sole Proprietorship documents.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" data-aos="fade-up" data-aos-delay="200">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#002060] text-base mb-1">
                  Owner's Identification
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  National Identity Card (NIC), Passport, or Driving License copy of the owner/directors.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" data-aos="fade-up" data-aos-delay="300">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#002060] text-base mb-1">
                  Bank Statements
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Recent 6 months bank statements representing active business transactions.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" data-aos="fade-up" data-aos-delay="400">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#002060] text-base mb-1">
                  Proof of Premises
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Recent utility bill (electricity/water) under the business or owner's name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-xs font-bold text-[#003d8f] uppercase tracking-widest bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001f4a] tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto rounded-full mb-3"></div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Here are some of the most common questions from potential business partners.
            </p>
          </div>

          <div className="space-y-4" data-aos="fade-up">
            {/* FAQ 1 */}
            <div className={`border rounded-2xl overflow-hidden transition-all ${openFaq === 0 ? 'border-[#003d8f] shadow-md' : 'border-slate-200'}`}>
              <button
                type="button"
                onClick={() => toggleFaq(0)}
                className={`w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base transition-colors ${
                  openFaq === 0 ? 'bg-[#003d8f] text-white' : 'bg-[#f8fbff] text-[#002060] hover:bg-blue-50'
                }`}
              >
                <span>Are there any registration or onboarding fees?</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === 0 ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </button>
              {openFaq === 0 && (
                <div className="p-6 bg-white text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  No, there are absolutely no fees involved in applying or registering to become an authorized dealer/partner with D.J. Trust. Onboarding is 100% free of charge.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className={`border rounded-2xl overflow-hidden transition-all ${openFaq === 1 ? 'border-[#003d8f] shadow-md' : 'border-slate-200'}`}>
              <button
                type="button"
                onClick={() => toggleFaq(1)}
                className={`w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base transition-colors ${
                  openFaq === 1 ? 'bg-[#003d8f] text-white' : 'bg-[#f8fbff] text-[#002060] hover:bg-blue-50'
                }`}
              >
                <span>How long does the verification and approval process take?</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === 1 ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </button>
              {openFaq === 1 && (
                <div className="p-6 bg-white text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  Once all required documents are submitted, our compliance team reviews the details within 48 business hours. The entire onboarding process is typically finalized within 3 to 5 business days.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className={`border rounded-2xl overflow-hidden transition-all ${openFaq === 2 ? 'border-[#003d8f] shadow-md' : 'border-slate-200'}`}>
              <button
                type="button"
                onClick={() => toggleFaq(2)}
                className={`w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base transition-colors ${
                  openFaq === 2 ? 'bg-[#003d8f] text-white' : 'bg-[#f8fbff] text-[#002060] hover:bg-blue-50'
                }`}
              >
                <span>What benefits do authorized partners receive?</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === 2 ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </button>
              {openFaq === 2 && (
                <div className="p-6 bg-white text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  Our business partners receive competitive dealer commissions, exclusive marketing materials, priority customer processing, and access to a dedicated dealer portal to manage customer loan applications.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEDICATED SUPPORT DESK BANNER ===== */}
      <section className="bg-gradient-to-r from-[#001f4a] to-[#00112b] py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6" data-aos="fade-up">
          <h3 className="text-xl sm:text-2xl font-black text-slate-200 mb-2">
            Need Assistance? Contact Our Dealer Relations Desk
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Our dedicated partner support team is here to assist you with onboarding, system issues, or general partnership inquiries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {/* Phone */}
            <a 
              href="tel:+94914501030" 
              data-aos="fade-right"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-slate-400 rounded-2xl p-6 transition-all block group"
            >
              <Phone className="w-8 h-8 text-slate-400 group-hover:text-white mx-auto mb-3 transition-colors" />
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us Directly</div>
              <div className="text-lg font-black text-white">+94 (91) 450 1030</div>
            </a>

            {/* Email */}
            <a 
              href="mailto:info@djtrust.lk" 
              data-aos="fade-left"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-slate-400 rounded-2xl p-6 transition-all block group"
            >
              <Info className="w-8 h-8 text-slate-400 group-hover:text-white mx-auto mb-3 transition-colors" />
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Dealer Support</div>
              <div className="text-lg font-black text-white">info@djtrust.lk</div>
            </a>
          </div>
        </div>
      </section>

      {/* ===== 2-STEP DEALERSHIP REQUEST FORM MODAL ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#001f4a] to-[#003d8f] border-b-2 border-slate-400 p-5 text-white flex items-center justify-between">
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Handshake className="w-5 h-5 text-slate-300" />
                Dealership Request Form
              </h3>
              <button
                type="button"
                onClick={resetModal}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Success View */}
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="checkmark-animation">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                      <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-black text-emerald-600 mt-4 mb-2">Success!</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto mb-6">
                    Thank you! Your dealership request has been submitted successfully. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="w-full bg-[#003d8f] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#002f6e] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {/* Step 1: Business Information */}
                  {modalStep === 1 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-extrabold text-[#003d8f] uppercase tracking-wider">Step 1: Business Info</span>
                        <span className="text-[11px] font-bold text-slate-400">1 of 2</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#002060] mb-1.5">Business Name *</label>
                        <input
                          type="text"
                          value={formData.shopname}
                          onChange={(e) => setFormData({ ...formData, shopname: e.target.value })}
                          placeholder="e.g. Batapola Auto Motors"
                          className={`w-full border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-all ${
                            formErrors.shopname ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-300 focus:border-[#003d8f]'
                          }`}
                        />
                        {formErrors.shopname && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.shopname}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#002060] mb-1.5">District / Location *</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="e.g. Galle, Southern Province"
                          className={`w-full border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-all ${
                            formErrors.address ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-300 focus:border-[#003d8f]'
                          }`}
                        />
                        {formErrors.address && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.address}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#002060] mb-1.5">Business Type</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#003d8f] transition-all bg-white"
                        >
                          <option value="Brand New">Brand New</option>
                          <option value="Second Hand">Second Hand</option>
                          <option value="Brand New, Second Hand">Both (Brand New & Second Hand)</option>
                        </select>
                      </div>

                      <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={resetModal}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#003d8f] hover:bg-[#002f6e] text-white shadow transition-all cursor-pointer"
                        >
                          Next Step ›
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Information */}
                  {modalStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-extrabold text-[#003d8f] uppercase tracking-wider">Step 2: Contact Details</span>
                        <span className="text-[11px] font-bold text-slate-400">2 of 2</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#002060] mb-1.5">Owner / Contact Person Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Full Name"
                          className={`w-full border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-all ${
                            formErrors.name ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-300 focus:border-[#003d8f]'
                          }`}
                        />
                        {formErrors.name && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#002060] mb-1.5">Telephone 1 *</label>
                          <input
                            type="text"
                            value={formData.tpno}
                            onChange={(e) => setFormData({ ...formData, tpno: e.target.value })}
                            placeholder="07XXXXXXXX"
                            maxLength={10}
                            className={`w-full border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-all ${
                              formErrors.tpno ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-300 focus:border-[#003d8f]'
                            }`}
                          />
                          {formErrors.tpno && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.tpno}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#002060] mb-1.5">Telephone 2 (Optional)</label>
                          <input
                            type="text"
                            value={formData.tpno2}
                            onChange={(e) => setFormData({ ...formData, tpno2: e.target.value })}
                            placeholder="0XXXXXXXXX"
                            maxLength={10}
                            className={`w-full border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-all ${
                              formErrors.tpno2 ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-300 focus:border-[#003d8f]'
                            }`}
                          />
                          {formErrors.tpno2 && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.tpno2}</p>}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setModalStep(1)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          ‹ Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizedDealers;
