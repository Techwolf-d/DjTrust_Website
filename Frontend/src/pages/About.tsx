import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface ArchiveImage {
  id: number;
  title: string;
  caption: string;
  image: string;
}

export const About: React.FC = () => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const archiveImages: ArchiveImage[] = [
    {
      id: 1,
      title: 'First Office of D.J. Trust.',
      caption: 'Our Humble Beginnings',
      image: '/Image/History/History5.jpg'
    },
    {
      id: 2,
      title: 'First ever transaction of D.J. Trust and Investment (Pvt) Ltd.',
      caption: 'The First of Many Transactions',
      image: '/Image/History/History4.jpg'
    },
    {
      id: 3,
      title: 'Opening D.J. Trust and Investment (Pvt) Ltd.',
      caption: 'Where it all began',
      image: '/Image/History/History3.jpg'
    },
    {
      id: 4,
      title: 'Inauguration of the Spare Parts Outlet.',
      caption: 'The Beginning of Our Spare Parts Business',
      image: '/Image/History/History1.jpg'
    }
  ];

  const handlePrevImage = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev! > 0 ? prev! - 1 : archiveImages.length - 1));
  };

  const handleNextImage = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev! < archiveImages.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="font-['Inter',sans-serif] bg-white">
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
                About Us
              </h1>
            </div>
            <div data-aos="fade-left">
              <nav className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm border border-white/10">
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <span className="text-white font-medium">About</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-white overflow-hidden">
        {/* Subtle Background Watermark */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 pointer-events-none z-0"
          style={{ backgroundImage: `url('/Image/CoverJPG/IMG_5090-2 copy copy.png')` }}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Heritage Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" data-aos="fade-up">
            {/* Left Highlight Box */}
            <div className="lg:col-span-4">
              <div className="bg-[#f8faff] border-l-4 sm:border-l-[5px] border-[#003d8f] p-8 rounded-r-2xl shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
                <h2 className="text-[#003d8f] font-extrabold text-3xl sm:text-[2.2rem] mb-1.5 leading-tight">
                  D.J. Trust
                </h2>
                <h3 className="text-xl sm:text-[1.25rem] text-[#555] font-normal leading-snug">
                  Heritage Since 1931.
                </h3>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-8">
              <div className="text-[1.1rem] leading-[1.8] text-[#444] text-justify space-y-5">
                <p>
                  D.J. Trust's story began in 1931, when Mr. D. James Silva opened a modest retail boutique in Batapola, Ambalangoda, in the Galle District, under the name D. James Silva & Sons. Serving the everyday needs of the local community, the business would go on to be defined for decades by the name &ldquo;D.J.&rdquo; inspired by the founder's own initials, as the business became known locally as D.J. Batapola over the following decades.
                </p>
                <p>
                  Under the reigns of the second-generation Mr. D. Chandradasa the business expanded into hardware, fertilizer, and installment-based sales of bicycles and radios, early signs of the customerfirst payment model the company is known for today.
                </p>
                <p>
                  In 1987, the business entered the Japanese secondhand motorcycle market, introducing installment-based ownership solutions that would go on to define its core identity. By 1995, under third-generation leadership, the company expanded with new branches in Borella and Matara. In 2000, following Sri Lanka's economic liberalization, the business strategically pivoted toward the Indian motorcycle market. By 2010, further branches were opened in Kohuwala and Ambalangoda, alongside the establishment of the company's own dealer and loan agent network positioning the group as a leading two-wheeler loan provider and primary automobile dealer for Honda and Bajaj, in partnership with Stafford Motor Co. (Pvt) Ltd and David Pieris Motor Co. (Pvt) Ltd.
                </p>
                <p>
                  The group introduced &ldquo;D.J. Trust&rdquo; as its unified brand identity in 2026, reflecting its evolution from a regional business into a broader Sri Lankan business group built on long-standing relationships, credibility, and trust. At present, D.J. Trust operates as a fourth-generation family business. With continued growth in Matara and Sooriyawewa, the Group has since expanded its automobile dealership operations to include TVS and Hero, in partnership with TVS Lanka (Pvt) Ltd and Abans Auto (Pvt) Ltd. With branches across Batapola, Colombo, Kohuwala, Ambalangoda, Matara, and Sooriyawewa, and a dealer and loan agent network of over 500 partners spanning eight provinces, D.J. Trust has grown into one of Sri Lanka's established two-wheeler and three-wheeler loan providers a 95-year legacy built on trust, service, and community.
                </p>
              </div>
            </div>
          </div>

          {/* Our Group Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 pt-10 border-t border-slate-100" data-aos="fade-up">
            {/* Left Highlight Box */}
            <div className="lg:col-span-4">
              <div className="bg-[#f8faff] border-l-4 sm:border-l-[5px] border-[#003d8f] p-8 rounded-r-2xl shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
                <h2 className="text-[#003d8f] font-extrabold text-3xl sm:text-[2.2rem] m-0 leading-tight">
                  Our Group
                </h2>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-8">
              <div className="text-[1.1rem] leading-[1.8] text-[#444] text-justify space-y-5">
                <p>
                  The wider business group comprises several entities, with operations spanning lending, automobile dealerships, and plantations.
                </p>
                <ul className="list-none pl-0 space-y-4">
                  <li className="relative pl-7 text-[1.05rem]">
                    <span className="w-2 h-2 rounded-full bg-[#cc292b] absolute left-1 top-2.5" />
                    <strong className="text-[#1a202c]">D.J. Trading Co. (Pvt) Ltd &amp; D.J. Trust &amp; Investment (Pvt) Ltd</strong> &mdash; Provides loan facilities for two-wheelers and three-wheelers.
                  </li>
                  <li className="relative pl-7 text-[1.05rem]">
                    <span className="w-2 h-2 rounded-full bg-[#cc292b] absolute left-1 top-2.5" />
                    <strong className="text-[#1a202c]">D.J. Auto (Pvt) Ltd &amp; D.J. Auto World (Pvt) Ltd</strong> &mdash; Manage multi-brand automobile dealerships representing brands Honda, Bajaj, TVS and Hero.
                  </li>
                  <li className="relative pl-7 text-[1.05rem]">
                    <span className="w-2 h-2 rounded-full bg-[#cc292b] absolute left-1 top-2.5" />
                    <strong className="text-[#1a202c]">D.J. Plantation (Pvt) Ltd</strong> &mdash; Owns and manages tea, cinnamon, rubber, and coconut estates.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Founders Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-8 justify-center">
            {/* Founder 1 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="bg-white rounded-[22px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2.5 hover:shadow-[0_25px_55px_rgba(0,61,143,0.15)] transition-all duration-400 border border-[#003d8f]/[0.08] flex flex-col"
            >
              <div className="h-[360px] sm:h-[380px] overflow-hidden relative">
                <img 
                  src="/Image/History/MRDJ.jpg" 
                  alt="Mr. D. James Silva" 
                  loading="lazy"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 text-center flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[0.95rem] font-bold text-[#003d8f] uppercase tracking-[1.5px] block mb-2">
                    Founder
                  </span>
                  <h4 className="text-[1.45rem] font-bold text-[#1a202c] mb-3">
                    Mr. D. James Silva
                  </h4>
                </div>
                <div>
                  <span className="text-[0.9rem] text-[#64748b] bg-[#f1f5ff] px-5 py-1.5 rounded-full font-medium inline-block">
                    1931 - 1960
                  </span>
                </div>
              </div>
            </div>

            {/* Founder 2 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="bg-white rounded-[22px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2.5 hover:shadow-[0_25px_55px_rgba(0,61,143,0.15)] transition-all duration-400 border border-[#003d8f]/[0.08] flex flex-col"
            >
              <div className="h-[360px] sm:h-[380px] overflow-hidden relative">
                <img 
                  src="/Image/History/MRDC.jpg" 
                  alt="Mr. D. Chandradasa" 
                  loading="lazy"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 text-center flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[0.95rem] font-bold text-[#003d8f] uppercase tracking-[1.5px] block mb-2">
                    Late Chairman
                  </span>
                  <h4 className="text-[1.45rem] font-bold text-[#1a202c] mb-3">
                    Mr. D. Chandradasa
                  </h4>
                </div>
                <div>
                  <span className="text-[0.9rem] text-[#64748b] bg-[#f1f5ff] px-5 py-1.5 rounded-full font-medium inline-block">
                    1960 - 1995
                  </span>
                </div>
              </div>
            </div>

            {/* Founder 3 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="bg-white rounded-[22px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2.5 hover:shadow-[0_25px_55px_rgba(0,61,143,0.15)] transition-all duration-400 border border-[#003d8f]/[0.08] flex flex-col"
            >
              <div className="h-[360px] sm:h-[380px] overflow-hidden relative">
                <img 
                  src="/Image/History/MRSK.jpg" 
                  alt="Mrs. Kamala Chandradasa" 
                  loading="lazy"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 text-center flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[0.95rem] font-bold text-[#003d8f] uppercase tracking-[1.5px] block mb-2">
                    Late Chairperson
                  </span>
                  <h4 className="text-[1.45rem] font-bold text-[#1a202c] mb-3">
                    Mrs. Kamala Chandradasa
                  </h4>
                </div>
                <div>
                  <span className="text-[0.9rem] text-[#64748b] bg-[#f1f5ff] px-5 py-1.5 rounded-full font-medium inline-block">
                    1995 - 2015
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Our Archives Section */}
      <section id="chapters" className="py-20 bg-[#f4f8fb]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-14" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222] relative inline-block pb-4">
              From Our Archives
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-1 bg-[#003d8f] rounded-full" />
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {archiveImages.map((item, index) => (
              <div 
                key={item.id} 
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveModalIndex(index)}
              >
                <div className="h-[210px] overflow-hidden relative bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h6 className="text-[0.95rem] font-semibold text-[#333] m-0 line-clamp-1 leading-snug">
                    {item.caption}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gallery Lightbox Modal */}
      {activeModalIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalIndex(null)}
        >
          <div 
            className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#003d8f] text-white px-6 py-4 flex items-center justify-between">
              <h4 className="text-base sm:text-lg font-bold truncate pr-4">
                {archiveImages[activeModalIndex].title}
              </h4>
              <button 
                type="button"
                onClick={() => setActiveModalIndex(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden max-h-[70vh]">
              <img 
                src={archiveImages[activeModalIndex].image} 
                alt={archiveImages[activeModalIndex].title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-100 px-6 py-4 flex items-center justify-between border-t border-slate-200">
              <button 
                type="button"
                onClick={handlePrevImage}
                className="inline-flex items-center gap-2 bg-[#003d8f] hover:bg-[#002d6b] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-semibold text-slate-500">
                {activeModalIndex + 1} of {archiveImages.length}
              </span>

              <button 
                type="button"
                onClick={handleNextImage}
                className="inline-flex items-center gap-2 bg-[#003d8f] hover:bg-[#002d6b] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};