import React from 'react';
import { ChevronDown, Handshake, Leaf } from 'lucide-react';

interface HomeProps {
  onOpenLoanModal: () => void;
  onOpenFinanceModal?: (serviceType?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenLoanModal, onOpenFinanceModal }) => {
  const scrollToBottom = () => {
    const bottomPosition = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    window.scrollTo({
      top: bottomPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className="font-sans antialiased bg-white">
      {/* ========================================================
          1. Hero Video Banner with Aspect Ratio & Bouncing Scroll Button
         ======================================================== */}
      <div className="relative overflow-hidden w-full aspect-[16/9] max-h-[85vh] bg-black">
        <video 
          playsInline 
          autoPlay 
          muted 
          loop 
          preload="auto" 
          id="heroVideo" 
          aria-hidden="true" 
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src="/Image/video/Batapola New 4.mp4" type="video/mp4" />
        </video>

        {/* Hero Scroll-Down Button with bouncing animation */}
        <button 
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-[#003d8f] hover:text-white transition-all transform hover:scale-110 active:scale-95 z-20 flex items-center justify-center w-14 h-14 animate-bounce focus:outline-none cursor-pointer"
          aria-label="Scroll to bottom"
          title="Scroll to bottom"
        >
          <ChevronDown className="w-10 h-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] stroke-[2.5]" />
        </button>
      </div>

      {/* ========================================================
          2. About Section: "95 YEARS AND BEYOND"
         ======================================================== */}
      <section id="about-section" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center">
            <h4 className="text-sm sm:text-base md:text-[30px] font-normal text-[#777777] uppercase tracking-[0.2em] mb-2 sm:mb-3">
              95 YEARS AND BEYOND
            </h4>
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#003b8c] uppercase tracking-wide mb-6 sm:mb-8 leading-tight">
              A MOTORCYCLE FOR EVERY HOME
            </h1>
          </div>
          <div className="max-w-[1060px] mx-auto">
            <p className="text-[#555555] text-sm sm:text-[16px] lg:text-[16px] leading-relaxed sm:leading-[1.75] text-justify [text-align-last:left] font-normal">
              D.J. Trust's story began in 1931, when Mr. D. James Silva opened a modest retail boutique in Batapola, Ambalangoda, in the Galle District, under the name D. James Silva & Sons. Under the leadership of successive generations, the business grew steadily formally adopting the name “D.J. Batapola” in 1995 and later becoming “D.J. Trust” in 2026. Built on generations of business experience and long-standing customer relationships, we make the lending process simple, transparent, and dependable, so your journey never has to&nbsp;wait.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. Our Expertise Section (PLC Replication with Gradient)
         ======================================================== */}
      <section id="services-section" className="relative py-16 sm:py-20 text-white overflow-hidden bg-[#003d8f]">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Image/IMG_2361.webp" 
            alt="Expertise Background" 
            className="w-full h-full object-cover filter blur-[2px] opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d8f]/95 via-[#003d8f]/90 to-[#0a5591]/88" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
              Our Expertise
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                Built on a 95-year business legacy and nearly four decades of expertise in two-wheeler lending, D.J. Trust has reached over <strong className="text-white font-bold">500,000</strong> customers throughout its history and serves a customer base of more than <strong className="text-white font-bold">100,000</strong> across Sri Lanka today
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1: Loan Services */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-white">
                <Handshake className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Loan Services</h3>
                <p className="text-sm text-white/80 leading-relaxed text-justify">
                  Flexible two-wheeler and three-wheeler loan facilities designed around customer needs, with a simple and efficient approval process.
                </p>
              </div>
            </div>

            {/* Service 2: Two-Wheeler Sector */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
            >
              <div 
                className="w-14 h-14 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-white"
                style={{ fontSize: '30px' }}
              >
                <i 
                  className="fa fa-motorcycle text-white" 
                  style={{ fontSize: '30px', lineHeight: 1 }} 
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Two-Wheeler Sector</h3>
                <p className="text-sm text-white/80 leading-relaxed text-justify">
                  Decades of experience in the two-wheeler industry, with an established presence in Sri Lanka's two-wheeler market.
                </p>
              </div>
            </div>

            {/* Service 3: Plantation */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-white">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Plantation</h3>
                <p className="text-sm text-white/80 leading-relaxed text-justify">
                  Sustainable excellence in tea, rubber, and coconut estates management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. Core Services Section ("Our Loan Services")
         ======================================================== */}
      <section id="services" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003d8f] uppercase tracking-wide">
              Our Loan Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Motorcycle Loans */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="bg-white rounded-xl border border-[#003d8f]/10 shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div 
                  className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-[#003d8f] mb-5"
                  style={{ fontSize: '25px' }}
                >
                  <i 
                    className="fa fa-motorcycle text-[#003d8f]" 
                    style={{ fontSize: '25px', lineHeight: 1 }} 
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Motorcycle Loans
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Make your motorcycle dream a reality with lowest installments and minimal documentation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenFinanceModal ? onOpenFinanceModal('Motorcycle Loan') : onOpenLoanModal()}
                className="w-full bg-[#003d8f] hover:bg-[#002d66] text-white font-semibold py-3 px-6 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md hover:shadow-blue-900/20 cursor-pointer"
              >
                Apply Now
              </button>
            </div>

            {/* Card 2: Three-Wheeler Loans */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="bg-white rounded-xl border border-[#003d8f]/10 shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-[#003d8f] mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-9 h-9 fill-current">
                    <g transform="translate(512, 0) scale(-1, 1)">
                      <path d="M55.467,315.733C24.892,315.733,0,340.617,0,371.2c0,30.583,24.892,55.467,55.467,55.467s55.467-24.883,55.467-55.467 C110.933,340.617,86.05,315.733,55.467,315.733z M55.467,409.6c-21.171,0-38.4-17.229-38.4-38.4s17.229-38.4,38.4-38.4 s38.4,17.229,38.4,38.4S76.646,409.6,55.467,409.6z"/>
                      <path d="M503.467,256h-8.533v-93.867c0-38.05-27.819-69.734-64.188-75.768c-1.212-0.657-2.603-1.033-4.079-1.033H153.6 c-0.29,0-0.572,0.009-0.862,0.043c-54.443,5.513-88.055,98.987-99.388,136.491H42.667c-4.71,0-8.533,3.823-8.533,8.533v34.133 c0,4.71,3.823,8.533,8.533,8.533h25.6v8.96c-2.807-0.282-5.649-0.427-8.533-0.427c-21.035,0-41.242,7.714-56.892,21.734 c-3.516,3.14-3.806,8.533-0.666,12.049c3.149,3.516,8.533,3.814,12.049,0.666c12.518-11.204,28.689-17.382,45.508-17.382 c37.641,0,68.267,30.626,68.267,68.267c0,4.71,3.823,8.533,8.533,8.533h222.549c4.164,28.902,29.022,51.2,59.051,51.2 c30.029,0,54.886-22.298,59.051-51.2h9.216c4.71,0,8.533-3.823,8.533-8.533V307.2h8.533c4.71,0,8.533-3.823,8.533-8.533v-34.133 C512,259.823,508.186,256,503.467,256z M154.061,102.4h264.073c32.939,0,59.733,26.795,59.733,59.733v85.333H358.4V128 c0-4.71-3.823-8.533-8.533-8.533H147.652l-13.406-8.943C140.629,106.044,147.243,103.168,154.061,102.4z M341.333,136.533v115.934 L309.7,284.1c-1.596,1.596-2.5,3.772-2.5,6.033v34.133h-59.733V136.533H341.333z M230.4,136.533v85.333H128.316l23.27-85.333 H230.4z M121.122,122.291l14.097,9.404l-23.287,85.393l-33.434-16.717C89.762,169.694,104.346,140.706,121.122,122.291z M418.133,409.6c-21.171,0-38.4-17.229-38.4-38.4s17.229-38.4,38.4-38.4s38.4,17.229,38.4,38.4S439.304,409.6,418.133,409.6z M494.933,281.6h-8.533c-4.71,0-8.533,3.823-8.533,8.533v17.067H390.4v-17.067c0-4.71-3.823-8.533-8.533-8.533H320 v-25.6h176V281.6z"/>
                    </g>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Three-Wheeler Loans
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Make your three-wheeler dream a reality with lowest installments and minimal documentation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenFinanceModal ? onOpenFinanceModal('Three-Wheeler Loan') : onOpenLoanModal()}
                className="w-full bg-[#003d8f] hover:bg-[#002d66] text-white font-semibold py-3 px-6 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md hover:shadow-blue-900/20 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
