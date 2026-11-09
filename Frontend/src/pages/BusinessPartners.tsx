import React from 'react';
import { 
  Shield, 
  Map, 
  TrendingUp 
} from 'lucide-react';

export const BusinessPartners: React.FC = () => {
  return (
    <div className="font-sans bg-white text-slate-800">
      <style>{`
        /* ===== Business Partners Premium Styles ===== */
        .bp-page-header {
          position: relative;
          background: #001f4a;
          padding: 55px 0 45px 0;
          color: white;
          overflow: hidden;
        }
        .bp-page-header-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('/image/News4.jpg') center/cover no-repeat;
          filter: blur(6px) brightness(0.5);
          opacity: 0.35;
          transform: scale(1.08);
          z-index: 0;
        }
        .bp-page-header-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(0,61,143,0.88) 0%, rgba(0,31,74,0.96) 100%);
          z-index: 1;
        }
        .bp-header-content { position: relative; z-index: 2; }
        .bp-header-tag {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          color: #cbd5e1;
          font-size: 0.73rem;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 50px;
          margin-bottom: 14px;
        }
        .bp-header-title { font-size: 2.5rem; font-weight: 800; color: #fff; margin: 0 0 10px; line-height: 1.15; }
        .bp-header-line { width: 55px; height: 4px; background: linear-gradient(90deg, #94a3b8, #cbd5e1); border-radius: 3px; margin-bottom: 14px; }
        .bp-header-sub { color: rgba(255,255,255,0.78); font-size: 0.95rem; max-width: 540px; line-height: 1.6; margin: 0; }
        .bp-breadcrumb {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 22px; border-radius: 50px; font-size: 0.85rem;
        }
        .bp-breadcrumb a { color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 600; }
        .bp-breadcrumb a:hover { color: #cbd5e1; }
        .bp-breadcrumb .sep { color: rgba(255,255,255,0.4); }
        .bp-breadcrumb span:last-child { color: #cbd5e1; font-weight: 700; }

        /* Stats Bar */
        .bp-stats-bar {
          background: linear-gradient(135deg, #003d8f 0%, #001f4a 100%);
          padding: 40px 0;
        }
        .bp-stat-item { text-align: center; padding: 10px 20px; color: #fff; }
        .bp-stat-number {
          font-size: 2.8rem; font-weight: 900; color: #e2e8f0;
          line-height: 1; margin-bottom: 6px;
        }
        .bp-stat-label { font-size: 0.85rem; color: rgba(255,255,255,0.75); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .bp-stat-divider { border-left: 1px solid rgba(255,255,255,0.15); height: 60px; margin: auto; }

        /* Partners Section */
        .bp-section { padding: 60px 0; }
        .bp-section-alt { background: #f8fbff; }
        .bp-section-tag { color: #003d8f; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; font-size: 0.75rem; display: inline-block; margin-bottom: 10px; }
        .bp-section-title { font-size: 2.1rem; font-weight: 800; color: #002060; margin-bottom: 10px; }
        .bp-section-divider { width: 45px; height: 3px; background: linear-gradient(90deg, #94a3b8, #cbd5e1); border-radius: 2px; margin-bottom: 20px; }
        .bp-section-desc { color: #475569; font-size: 0.97rem; line-height: 1.7; max-width: 650px; }
        .bp-partner-lead-desc {
          max-width: 1000px !important;
          text-align: center !important;
        }
        @media (min-width: 992px) {
          .bp-partners-nowrap {
            white-space: nowrap;
          }
        }

        /* Partner Cards (Redesigned) */
        .partner-card {
          background: #fff;
          border: 1px solid #e8eef6;
          border-radius: 16px;
          padding: 14px 16px;
          display: flex; align-items: center; justify-content: center;
          height: 105px;
          max-width: 195px;
          margin: 0 auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: pointer;
        }
        .partner-card:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 24px rgba(0, 31, 74, 0.08);
          border-color: #cbd5e1;
        }
        .partner-logo-img {
          max-height: 58px;
          max-width: 135px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .partner-logo-bajaj {
          max-height: 58px;
          max-width: 105px;
        }
        .partner-logo-honda {
          max-height: 54px;
          max-width: 110px;
        }
        .partner-logo-tvs {
          max-height: 42px;
          max-width: 135px;
        }
        .partner-logo-hero {
          max-height: 46px;
          max-width: 130px;
        }

        /* Benefits of Partnering Section */
        .bp-benefits-section { background: #fdfdfd; padding: 80px 0; position: relative; overflow: hidden; }
        .bp-benefits-section::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 100% 0%, rgba(17,108,247,0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .benefit-card-premium {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 45px 32px;
          height: 100%;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          position: relative; z-index: 1;
        }
        .benefit-card-premium:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px -12px rgba(0, 31, 74, 0.12);
          border-color: rgba(0, 61, 143, 0.2);
          background: linear-gradient(180deg, #fff 0%, #f8faff 100%);
        }
        .benefit-icon-wrapper {
          width: 85px; height: 85px;
          margin: 0 auto 28px;
          background: linear-gradient(135deg, rgba(0, 61, 143, 0.08) 0%, rgba(0, 212, 255, 0.08) 100%);
          border: 1px solid rgba(0, 61, 143, 0.1);
          border-radius: 22px;
          display: flex; align-items: center; justify-content: center;
          color: #003d8f; font-size: 2.2rem;
          transition: all 0.4s;
        }
        .benefit-card-premium:hover .benefit-icon-wrapper {
          background: linear-gradient(135deg, #003d8f, #116cf7);
          color: #ffffff;
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 20px rgba(0, 61, 143, 0.2);
          border-color: transparent;
        }
        .benefit-title { 
          font-size: 1.4rem; font-weight: 800; color: #001f4a; margin-bottom: 18px; 
          letter-spacing: -0.5px;
        }
        .benefit-text { 
          color: #475569; font-size: 1rem; line-height: 1.6; margin: 0; 
          font-weight: 500;
          text-align: justify;
          text-justify: inter-word;
          width: 100%;
        }
      `}</style>

      {/* ===== PREMIUM PAGE HEADER ===== */}
      <section className="bp-page-header">
        <div className="bp-page-header-bg"></div>
        <div className="bp-page-header-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bp-header-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div data-aos="fade-right">
              <span className="bp-header-tag">Strategic Alliances</span>
              <h1 className="bp-header-title">Business Partners</h1>
              <p className="bp-header-sub">
                A legacy of excellence built hand-in-hand with trusted business partners across Sri Lanka over nine transformative decades.
              </p>
            </div>
            <div data-aos="fade-left">
              <nav className="bp-breadcrumb">
                <a href="/">Home</a>
                <span className="sep">›</span>
                <span>Business Partners</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bp-stats-bar" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15 gap-4 md:gap-0 text-center">
            <div className="bp-stat-item">
              <div className="bp-stat-number">95+</div>
              <div className="bp-stat-label">Years of Service</div>
            </div>
            <div className="bp-stat-item">
              <div className="bp-stat-number">500+</div>
              <div className="bp-stat-label">Island-Wide Dealers</div>
            </div>
            <div className="bp-stat-item">
              <div className="bp-stat-number">23</div>
              <div className="bp-stat-label">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNER LOGOS SECTION ===== */}
      <section className="bp-section bp-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8" data-aos="fade-up">
            <span className="bp-section-tag">Trusted With The Best</span>
            <h2 className="bp-section-title">Our Business Partners</h2>
            <div className="bp-section-divider mx-auto"></div>
            <p className="bp-section-desc mx-auto bp-partner-lead-desc">
              A 95-year legacy would not have been possible without our trusted business partners. D.J. Trust maintains longstanding relationships with leading motorcycle brands including <strong>Honda, Bajaj, TVS and Hero</strong> through authorized dealerships in partnership with <span className="bp-partners-nowrap">Stafford Motor Co. (Pvt) Ltd, David Pieris Motor Co. (Pvt) Ltd, TVS Lanka (Pvt) Ltd and Abans Auto (Pvt) Ltd.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            {/* Honda */}
            <div>
              <div className="partner-card">
                <img className="partner-logo-img partner-logo-honda" src="/Image/Honda_cropped.png" alt="Honda" />
              </div>
            </div>
            {/* Bajaj */}
            <div>
              <div className="partner-card">
                <img className="partner-logo-img partner-logo-bajaj" src="/Image/Bajaj2.png" alt="Bajaj" />
              </div>
            </div>
            {/* TVS */}
            <div>
              <div className="partner-card">
                <img className="partner-logo-img partner-logo-tvs" src="/Image/tvs.png" alt="TVS" />
              </div>
            </div>
            {/* Hero */}
            <div>
              <div className="partner-card">
                <img className="partner-logo-img partner-logo-hero" src="/Image/Hero_cropped.png" alt="Hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS OF PARTNERING SECTION ===== */}
      <section className="bp-benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="bp-section-tag">Grow With Us</span>
            <h2 className="bp-section-title">Why Partner With D.J. Trust?</h2>
            <div className="bp-section-divider mx-auto"></div>
            <p className="bp-section-desc mx-auto text-center">
              We offer our business partners unparalleled support, cutting-edge resources, and a trusted brand name to help expand your reach and maximize your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Trusted Legacy */}
            <div className="benefit-card-premium" data-aos="fade-up" data-aos-delay="100">
              <div className="benefit-icon-wrapper">
                <Shield className="w-10 h-10" />
              </div>
              <h4 className="benefit-title">Trusted Legacy</h4>
              <p className="benefit-text">
                Backed by the reputation of a company with 95 years of proven excellence, now ranked among one of Sri Lanka's leading two-wheeler loan providers.
              </p>
            </div>

            {/* Card 2: Reach across 8 provinces */}
            <div className="benefit-card-premium" data-aos="fade-up" data-aos-delay="200">
              <div className="benefit-icon-wrapper">
                <Map className="w-10 h-10" />
              </div>
              <h4 className="benefit-title">Reach across 8 provinces</h4>
              <p className="benefit-text">
                A dealer and loan agent network spanning the Western, Southern, Central, Eastern, Northwestern, North Central, Sabaragamuwa, and Uva provinces, with over <strong>100,000 existing customers</strong>.
              </p>
            </div>

            {/* Card 3: Mutual Growth */}
            <div className="benefit-card-premium" data-aos="fade-up" data-aos-delay="300">
              <div className="benefit-icon-wrapper">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h4 className="benefit-title">Mutual Growth</h4>
              <p className="benefit-text">
                Dedicated training and resources to help you succeed alongside us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPartners;
