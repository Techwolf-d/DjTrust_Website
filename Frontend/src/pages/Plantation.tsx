import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface EstateCard {
  id: string;
  title: string;
  image: string;
}

export const Plantation: React.FC = () => {
  const estates: EstateCard[] = [
    {
      id: '1',
      title: 'Coconut',
      image: '/Image/LivingStone/DSC_0012.JPG'
    },
    {
      id: '2',
      title: 'Cinnamon',
      image: '/Image/Mahaduwa/DSC_0033.JPG'
    },
    {
      id: '1002',
      title: 'Rubber',
      image: '/Image/Rubber.jpg'
    },
    {
      id: '1003',
      title: 'Tea',
      image: '/Image/close-up-tea-leaves-farm-sri-lanka.jpg'
    }
  ];

  return (
    <div className="font-['Inter',sans-serif] bg-white">
      {/* Video Hero Header */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center text-white">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            playsInline 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          >
            <source src="/Image/video/plantations.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Blue Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001f4a]/80 via-[#001f4a]/50 to-[#001f4a]/90 z-[1]" />

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[2] text-center" data-aos="fade-down">
          <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-[#cbd5e1] text-xs font-bold uppercase tracking-[2px] px-5 py-2 rounded-full mb-5">
            Agriculture &amp; Exports
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white mb-4 drop-shadow-md tracking-[-0.5px]">
            Plantation
          </h1>
          <nav className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm border border-white/10">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-[#cbd5e1] font-bold">Plantation</span>
          </nav>
        </div>
      </section>

      {/* Sustainable Growth Section */}
      <section className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-4" data-aos="fade-right">
              <span className="inline-block bg-gradient-to-r from-[#003d8f]/[0.08] to-[#00a850]/[0.08] text-[#003d8f] font-bold uppercase tracking-[3px] text-xs px-4 py-1.5 rounded-full border border-[#003d8f]/[0.18]">
                Our Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-black text-[#002060] leading-tight m-0">
                Sustainable Growth
              </h2>

              <p className="text-lg sm:text-xl text-[#475569] font-medium leading-relaxed">
                Export crops such as tea, rubber, coconut, and cinnamon play a vital role in the strength of the Sri Lankan economy.
              </p>
              
              <p className="text-base text-[#555] leading-[1.8] text-justify pt-2">
                D.J. Trust maintains a diversified portfolio of agricultural estates across
                Sri Lanka's Southern and Western Provinces. Our operations encompass
                the cultivation and production of tea, cinnamon, rubber, and coconut,
                reflecting the Group's longstanding presence in the country's plantation
                sector.
              </p>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-6" data-aos="fade-left">
              <div className="rounded-[24px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 group">
                <img 
                  src="/Image/close-up-tea-leaves-farm-sri-lanka.jpg" 
                  alt="Tea Farm Sri Lanka" 
                  loading="lazy"
                  className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Estate Portfolio Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#001433] via-[#002060] to-[#003d8f] overflow-hidden text-white">
        {/* Glow Effects */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00a850]/[0.12] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#003d8f]/[0.25] blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="mb-6" data-aos="fade-right">
            <span className="inline-block bg-[#00a850]/[0.15] text-[#7dd3a8] font-bold uppercase tracking-[4px] text-xs px-4 py-1.5 rounded-full border border-[#00a850]/[0.35] mb-3">
              Estates
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-black text-white m-0 tracking-tight drop-shadow-md">
              Our Estates
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-2 m-0">
              D.J. Trust's portfolio of plantation estates reflects the Group's longstanding presence in Sri Lanka's plantation sector.
            </p>
          </div>

          {/* Divider line */}
          <div className="h-[1px] bg-white/10 my-8 sm:my-10" />

          {/* 4 Estates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {estates.map((estate, idx) => (
              <div 
                key={estate.id}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
                className="group relative rounded-[20px] overflow-hidden h-[360px] sm:h-[390px] shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2.5 hover:shadow-[0_35px_60px_rgba(0,0,0,0.45)] transition-all duration-400 border border-white/10 bg-slate-900 cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={estate.image} 
                  alt={estate.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay with dynamic hover state */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000823]/95 via-[#00143c]/55 to-transparent group-hover:from-[#00194b]/98 group-hover:via-[#003d8f]/70 group-hover:to-black/10 transition-all duration-400 flex flex-col justify-end p-7">
                  <h4 className="text-2xl font-black text-white m-0 drop-shadow-md tracking-[0.5px]">
                    {estate.title}
                  </h4>
                  <div className="w-10 h-1 bg-[#00a850] rounded-full mt-3 opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
