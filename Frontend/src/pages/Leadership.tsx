import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface LeaderMember {
  role: string;
  name: string;
  desc?: string;
  image: string;
}

export const Leadership: React.FC = () => {
  const directors: LeaderMember[] = [
    {
      role: 'Chairman',
      name: 'Mr. Hiran Chandradasa',
      image: '/Image/History/DSC_0623.jpg'
    },
    {
      role: 'Managing Director',
      name: 'Mr. Mahesh Chandradasa',
      desc: 'Former Commissioned Officer, Sri Lanka Army',
      image: '/Image/History/DSC_0640.jpg'
    },
    {
      role: 'Director',
      name: 'Mr. Lakmal Chandradasa',
      image: '/Image/History/DSC_0633.jpg'
    },
    {
      role: 'Director',
      name: 'Mrs. Shermila Chandradasa',
      image: '/Image/History/DSC_0701.jpg'
    },
    {
      role: 'Director Admin',
      name: 'Mr. Premasiri Pinnaduwa',
      desc: 'Ex-Serviceman, Sri Lanka Army',
      image: '/Image/History/DSC_0635112.jpg'
    },
    {
      role: 'Director',
      name: 'Ms. Sachiki Chandradasa',
      desc: 'B.S.C (Hons) Special in Statistics (USJP), CIMA',
      image: '/Image/History/DSC_0679.jpg'
    },
    {
      role: 'Director',
      name: 'Mr. Lakwith Chandradasa',
      desc: 'B.A (Hons) Management and Leadership (UK)',
      image: '/Image/History/DSC_0605.jpg'
    },
    {
      role: 'Director',
      name: 'Mr. Dakshith Chandradasa',
      desc: 'B.A (Hons) Management and Leadership(UK), DCM (IBSl)',
      image: '/Image/History/DSC_0653.jpg'
    },
    {
      role: 'Director',
      name: 'Mr. Sachindra Kalansooriya',
      desc: 'B.Eng. Hons, Monash University',
      image: '/Image/History/DSC_0649.jpg'
    }
  ];

  const management: LeaderMember[] = [
    {
      role: 'Chief Executive Officer',
      name: 'Mr. Ranjith Waduge',
      desc: '(ACA, ACMA, MAAT)',
      image: '/Image/History/DSC_0203edt.jpg'
    },
    {
      role: 'Senior Manager - Operations',
      name: 'Mr. K.P. Ruwan Sameera',
      desc: '(B.Sc. Bus Admin (sp) USJP)',
      image: '/Image/History/DSC_0219edt.jpg'
    },
    {
      role: 'Customer Relationship Manager',
      name: 'Mr. Punsiri Badhugodahewa',
      image: '/Image/History/DSC_0158edt.jpg'
    },
    {
      role: 'Senior Manager',
      name: 'Mr Chaminda Lokuge',
      image: '/Image/History/DSC_0238edt.jpg'
    },
    {
      role: 'Chief Accountant',
      name: 'Mr. Nishantha Samarawickrama',
      desc: '(B.Sc. Bus Admin (sp) USJP) (MAAT, CBA)',
      image: '/Image/History/DSC_0175edt.jpg'
    },
    {
      role: 'Assistant Manager - Marketing & Sales',
      name: 'Ms. Sewwandhi Chanchala',
      image: '/Image/History/DSC_0398.jpg'
    },
    {
      role: 'Assistant Manager - Human Resources',
      name: 'Ms. Sakunthala Kumari',
      desc: '(Adv. Certificate in HR Management, CIPM)',
      image: '/Image/History/DSC_0395.jpg'
    }
  ];

  return (
    <div className="font-['Inter',sans-serif] bg-[#fbfdff]">
      {/* Premium Page Header */}
      <div className="relative bg-[#001f4a] py-16 sm:py-20 text-white overflow-hidden">
        {/* Background image with blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-[8px] brightness-[0.6] contrast-[1.2] opacity-40 scale-110 pointer-events-none z-0"
          style={{ backgroundImage: `url('/Image/CoverJPG/IMG_5090-2 copy copy.png')` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d8f]/85 to-[#001f4a]/95 z-[1]" />
        
        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div data-aos="fade-right">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-1px] text-white m-0">
                Leadership
              </h1>
            </div>
            <div data-aos="fade-left">
              <nav className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm border border-white/10">
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <span className="text-white font-medium">Leadership</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Team Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

          {/* 1. Board of Directors Header Banner */}
          <div data-aos="fade-up">
            <div className="relative overflow-hidden rounded-[24px] p-8 sm:p-12 text-center text-white bg-gradient-to-br from-[#001233] via-[#002060] to-[#0b2f6b] border border-white/[0.08] shadow-[0_20px_45px_rgba(0,18,51,0.25)] mb-10 sm:mb-14">
              {/* Radial glow accents */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/[0.08] blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#1e6acc]/[0.15] blur-2xl pointer-events-none" />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-extrabold tracking-[-1px] text-white m-0">
                  Board of Directors
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mt-4 m-0 font-normal">
                  D.J. Trust is guided by a distinguished Board of Directors combining deep operational experience
                  with strong professional credentials. Their collective vision and strategic direction continue to
                  guide D.J. Trust into its fourth generation of leadership.
                </p>
              </div>
            </div>

            {/* Directors Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {directors.map((member, idx) => (
                <div 
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={(idx % 3 + 1) * 100}
                  className="bg-white rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,61,143,0.12)] transition-all duration-400 border border-[#003d8f]/[0.06] flex flex-col"
                >
                  <div className="h-[250px] sm:h-[270px] overflow-hidden relative bg-slate-100">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 text-center flex-grow flex flex-col justify-center min-h-[90px]">
                    <span className="text-[0.8rem] font-extrabold text-[#003d8f] uppercase tracking-[0.8px] block mb-1">
                      {member.role}
                    </span>
                    <h4 className="text-[1.15rem] font-bold text-[#001f4a] m-0">
                      {member.name}
                    </h4>
                    {member.desc && (
                      <p className="text-[0.78rem] text-[#64748b] leading-tight pt-2 mt-2 border-t border-[#f1f5f9] m-0">
                        {member.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Management Team Header Banner */}
          <div data-aos="fade-up">
            <div className="relative overflow-hidden rounded-[24px] p-8 sm:p-12 text-center text-white bg-gradient-to-br from-[#0b2f6b] via-[#003d8f] to-[#1e6acc] border border-white/[0.08] shadow-[0_20px_45px_rgba(0,61,143,0.2)] mb-10 sm:mb-14">
              {/* Radial glow accents */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/[0.08] blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#1e6acc]/[0.2] blur-2xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-extrabold tracking-[-1px] text-white m-0">
                  Management Team
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mt-4 m-0 font-normal">
                  The management team brings together professional expertise with a shared commitment to
                  operational excellence. Through strong leadership and hands-on dedication, our team translates
                  strategic directions into measurable results, driving sustainable growth across all parts of the
                  organization.
                </p>
              </div>
            </div>

            {/* Management Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {management.map((member, idx) => (
                <div 
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={(idx % 3 + 1) * 100}
                  className="bg-white rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,61,143,0.12)] transition-all duration-400 border border-[#003d8f]/[0.06] flex flex-col"
                >
                  <div className="h-[250px] sm:h-[270px] overflow-hidden relative bg-slate-100">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 text-center flex-grow flex flex-col justify-center min-h-[90px]">
                    <span className="text-[0.8rem] font-extrabold text-[#003d8f] uppercase tracking-[0.8px] block mb-1">
                      {member.role}
                    </span>
                    <h4 className="text-[1.15rem] font-bold text-[#001f4a] m-0">
                      {member.name}
                    </h4>
                    {member.desc && (
                      <p className="text-[0.78rem] text-[#64748b] leading-tight pt-2 mt-2 border-t border-[#f1f5f9] m-0">
                        {member.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
