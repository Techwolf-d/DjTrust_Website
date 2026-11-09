import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface MilestoneItem {
  year: string;
  heading: string;
  desc: string;
  image: string;
  isCustomImage?: boolean;
}

export const Milestones: React.FC = () => {
  const milestones: MilestoneItem[] = [
    {
      year: '1931',
      heading: '1931 - First Generation: Where It All Began',
      desc: 'Founded by Mr. D. James Silva in Batapola, Ambalangoda, the business began as a retail boutique serving the everyday needs of the local community, then known as D. James Silva & Sons.',
      image: '/Image/IMG_2357.webp'
    },
    {
      year: '1960',
      heading: '1960 - Second Generation: Expanding into Trading',
      desc: 'Under the leadership of Mr. D. Chandradasa, the business expanded into hardware, fertilizer, bicycles, and radios, introducing accessible installment-based purchasing solutions to local households.',
      image: '/Image/MAIN10.jpg'
    },
    {
      year: '1987',
      heading: '1987 - Entering the Japanese Motorcycle Market',
      desc: 'The company entered the Japanese secondhand motorcycle market, introducing installment-based ownership solutions and establishing what would become its core business.',
      image: '/Image/19059447_836411523174149_2991702738548801171_n.jpg'
    },
    {
      year: '1995',
      heading: '1995 - Third Generation: Expanding Presence',
      desc: 'With new branches established in Borella and Matara, D.J. expanded beyond its Southern roots and strengthened its presence across key markets, and formally becoming known as "D.J. Batapola".',
      image: '/Image/History/History5.jpg'
    },
    {
      year: '2000',
      heading: '2000 - Pivoting to the Indian Motorcycle market',
      desc: 'Following Sri Lanka’s economic liberalization, the business transitioned towards the Indian motorcycle market, adapting its offering to a changing automotive landscape.',
      image: '/Image/History/History3.jpg'
    },
    {
      year: '2010',
      heading: '2010 - Building a Wider Network',
      desc: 'Further branches were established in Kohuwala and Ambalangoda, alongside the establishment of the company\'s own dealer and loan agent network with the group emerging as a leading two-wheeler loan provider and primary automobile dealer for Honda and Bajaj in partnership with Stafford Motor Co. (Pvt) Ltd & David Pieris Motor Co. (Pvt) Ltd.',
      image: '/Image/Untitled-1.jpg'
    },
    {
      year: '2020',
      heading: '2020 - Fourth Generation & Expansion',
      desc: 'With continued growth in Matara and Sooriyawewa, and an expanding presence across lending and automobile dealership operations for TVS and Hero, in partnership with TVS Lanka (Pvt) Ltd and Abans Auto (Pvt) Ltd, the Group has further strengthened its position in the two-wheeler industry.',
      image: '/Image/IMG_2361.jpg'
    },
    {
      year: '2026',
      heading: '2026 - Rebranding to D.J. Trust',
      desc: 'The group introduced "D.J. Trust" as its unified brand identity in 2026, reflecting its evolution from a regional business into a broader Sri Lankan business group built on long-standing relationships, credibility, and trust.',
      image: '/Image/Reband1.jpg',
      isCustomImage: true
    }
  ];

  return (
    <div className="font-['Inter',sans-serif] bg-[#fbfdff]">
      {/* Premium Page Header */}
      <div 
        className="relative bg-cover bg-center py-16 sm:py-20 text-white overflow-hidden"
        style={{ backgroundImage: `url('/Image/History/History5.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d8f]/90 to-[#001f4a]/85 z-0" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div data-aos="fade-right">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-1px] text-white m-0">
                Our Milestones
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
                <span className="text-white font-medium">Milestones</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-20 bg-[#fbfdff] relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-[36px] lg:left-1/2 top-0 bottom-0 w-[4px] bg-[#003d8f]/10 -translate-x-1/2 z-0" />

            {/* Milestones Items */}
            <div className="space-y-16 sm:space-y-20 relative z-10">
              {milestones.map((item, index) => {
                const isEven = index % 2 !== 0;

                return (
                  <div 
                    key={index}
                    data-aos="fade-up"
                    className={`relative flex flex-col lg:flex-row items-start justify-between ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Center Year Dot */}
                    <div 
                      data-aos="zoom-in"
                      className="absolute left-[36px] lg:left-1/2 -translate-x-1/2 top-0 w-[72px] h-[72px] sm:w-[75px] sm:h-[75px] bg-white border-4 border-[#003d8f] rounded-full flex items-center justify-center font-extrabold text-[#003d8f] text-base sm:text-[0.95rem] shadow-[0_5px_15px_rgba(0,61,143,0.2)] z-20"
                    >
                      {item.year}
                    </div>

                    {/* Card Content Container */}
                    <div 
                      data-aos={isEven ? "fade-left" : "fade-right"}
                      className="w-[calc(100%-85px)] ml-[85px] lg:ml-0 lg:w-[45%]"
                    >
                      <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-2.5 hover:shadow-[0_25px_55px_rgba(0,61,143,0.12)] transition-all duration-400 border border-[#003d8f]/[0.05]">
                        {/* Image */}
                        {item.isCustomImage ? (
                          <div className="w-full h-[250px] sm:h-[280px] bg-white flex items-center justify-center border-b border-slate-100 overflow-hidden relative p-4">
                            <img 
                              src={item.image} 
                              alt={item.year}
                              loading="lazy"
                              className="w-[85%] h-[85%] object-contain scale-125 transition-transform duration-500 hover:scale-135"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-[250px] sm:h-[280px] overflow-hidden bg-slate-100">
                            <img 
                              src={item.image} 
                              alt={item.year}
                              loading="lazy"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}

                        {/* Text info */}
                        <div className="p-6 sm:p-8">
                          <span className="inline-block text-[#003d8f] font-extrabold text-xl sm:text-[1.35rem] mb-3 leading-snug">
                            {item.heading}
                          </span>
                          <p className="text-[#64748b] leading-[1.7] text-sm sm:text-[0.95rem] m-0 text-justify">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Placeholder space for alternating side on large screens */}
                    <div className="hidden lg:block lg:w-[45%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
