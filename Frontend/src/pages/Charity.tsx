import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CSRProgram {
  title: string;
  desc: string;
  image: string;
}

export const Charity: React.FC = () => {
  const programs: CSRProgram[] = [
    {
      title: 'Elder Care Home',
      desc: 'A company-funded residential care facility providing free accommodation and support for elderly individuals in the down south region of the Batapola area.',
      image: '/Image/Gallery/DSC_0008.jpg'
    },
    {
      title: 'Annual Student Scholarship Programme',
      desc: 'Supporting deserving students from underserved communities with access to educational opportunities.',
      image: '/Image/Gallery3/DSC_0194.JPG'
    },
    {
      title: 'Community Health Outreach',
      desc: 'Medical outreach programmes supporting staff, their families, and underserved communities in the area.',
      image: '/Image/Gallery2/CHO3.jpg'
    },
    {
      title: 'Annual Ration Distribution Programme',
      desc: 'Providing annual food ration packs to staff, estate workers, and their households across Group operations.',
      image: '/Image/Gallery1/DSC_0216.JPG'
    },
    {
      title: 'Annual Blood Donation Drive',
      desc: 'Conducted annually in partnership with the National Blood Transfusion Service, bringing together our people in support of Sri Lanka\'s healthcare needs.',
      image: '/Image/Gallery2/BDN.jpg'
    }
  ];

  return (
    <div className="font-['Inter',sans-serif] bg-[#f4f8fc]">
      {/* Premium Page Header */}
      <div 
        className="relative bg-cover bg-top py-16 sm:py-20 text-white overflow-hidden"
        style={{ backgroundImage: `url('/Image/Gallery/DSC_0008.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d8f]/90 to-[#001f4a]/80 z-0" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div data-aos="fade-right">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-1px] text-white m-0">
                Our Responsibility
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
                <span className="text-white font-medium">Charity (CSR)</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* CSR Content Section */}
      <section className="py-14 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Intro Paragraph */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16" data-aos="fade-up">
            <p className="text-base sm:text-[1.15rem] leading-[1.9] text-[#555] text-justify m-0">
              Giving back has long been part of D.J. Trust. Through initiatives in healthcare, education, elderly care, and staff welfare, we continue to support our people and the communities connected to our operations. Our initiatives contribute to selected United Nations Sustainable Development Goals, including Good Health &amp; Well-being, Quality Education, Reduced Inequalities, and Decent Work &amp; Economic Growth.
            </p>
          </div>

        </div>

        {/* Full Width Video Section */}
        <div className="w-full my-8 sm:my-14 bg-black overflow-hidden relative shadow-2xl" data-aos="fade-up">
          <video 
            playsInline 
            autoPlay 
            muted 
            loop 
            className="w-full max-h-[700px] object-cover block"
          >
            <source src="/Image/video/charity.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mt-12 sm:mt-16">
            {programs.map((prog, idx) => (
              <div 
                key={idx}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
                className="bg-white rounded-[25px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-3 hover:shadow-[0_25px_55px_rgba(0,61,143,0.1)] transition-all duration-400 border border-[#003d8f]/[0.03] flex flex-col"
              >
                <div className="h-[260px] sm:h-[280px] overflow-hidden bg-slate-100">
                  <img 
                    src={prog.image} 
                    alt={prog.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-600"
                  />
                </div>
                <div className="p-8 sm:p-9 flex-grow flex flex-col justify-center">
                  <h3 className="text-xl sm:text-[1.4rem] font-extrabold text-[#003d8f] mb-3 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-sm sm:text-[0.95rem] text-[#666] leading-[1.8] m-0">
                    {prog.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Outro Note */}
          <div className="mt-14 sm:mt-16 text-center">
            <p className="text-base sm:text-[1.1rem] text-[#475569] font-medium max-w-3xl mx-auto leading-relaxed m-0">
              As D.J. Trust continues to grow, we remain committed to creating a positive impact for our people and the communities around us.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};