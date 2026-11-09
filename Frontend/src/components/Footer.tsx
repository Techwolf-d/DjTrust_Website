import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#06112a] text-[#94a3b8] font-['Inter',sans-serif] border-t-4 border-[#1a56db]">
      {/* Main Footer Container */}
      <div className="footer-main py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Column 1: Brand & Disclaimer (col-lg-4) */}
            <div className="lg:col-span-4 lg:pr-6">
              <div className="text-[2rem] font-extrabold text-white mb-2 tracking-[-0.5px]">
                D.J. Trust
              </div>
              <div className="inline-block text-[0.8rem] font-semibold text-[#4fa3ff] uppercase tracking-[2.5px] mb-5 pb-1 border-b-2 border-[#4fa3ff]/30">
                A Trusted Journey Since 1931
              </div>
              <p className="text-[#94a3b8] text-[0.95rem] leading-[1.8] max-w-[340px] mb-7 text-justify">
                D.J. Trust is not a bank or a registered / licensed finance company under Central bank of Sri Lanka. 
                Loan facilities are subject to eligibility, assessment, documentation, applicable rates, charges, 
                terms and conditions, and prevailing regulatory requirements.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/djtrustbatapola/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[42px] h-[42px] rounded-full bg-white/[0.05] hover:bg-[#1a56db] text-[#cbd5e1] hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(26,86,219,0.4)]"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.405 0 22.675 0z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/94761355465"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[42px] h-[42px] rounded-full bg-white/[0.05] hover:bg-[#1a56db] text-[#cbd5e1] hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(26,86,219,0.4)]"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/dj-trust/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[42px] h-[42px] rounded-full bg-white/[0.05] hover:bg-[#1a56db] text-[#cbd5e1] hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(26,86,219,0.4)]"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (col-lg-2) */}
            <div className="lg:col-span-2">
              <div className="text-[1.1rem] font-bold text-white mb-6">
                Quick Links
              </div>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Services', path: '/finance' },
                  { name: 'Careers', path: '/careers' },
                  { name: 'Plantation', path: '/plantation' },
                  { name: 'Events', path: '/events' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-2 text-[#94a3b8] hover:text-white text-[0.95rem] py-1.5 px-3 -ml-3 rounded-lg hover:bg-[#4fa3ff]/10 hover:translate-x-2 transition-all duration-300"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#4fa3ff] group-hover:translate-x-0.5 transition-transform" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Helpful Links (col-lg-2) */}
            <div className="lg:col-span-2">
              <div className="text-[1.1rem] font-bold text-white mb-6">
                Helpful Links
              </div>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {[
                  { name: 'Loan Service', path: '/finance' },
                  { name: 'Our Plantation', path: '/plantation' },
                  { name: 'Dealership', path: '/dealers' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Milestones', path: '/about/milestones' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-2 text-[#94a3b8] hover:text-white text-[0.95rem] py-1.5 px-3 -ml-3 rounded-lg hover:bg-[#4fa3ff]/10 hover:translate-x-2 transition-all duration-300"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#4fa3ff] group-hover:translate-x-0.5 transition-transform" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get In Touch (col-lg-4) */}
            <div className="lg:col-span-4">
              <div className="text-[1.1rem] font-bold text-white mb-6">
                Get In Touch
              </div>

              {/* Head Office */}
              <div className="group flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-[10px] bg-[#1a56db]/10 text-[#4fa3ff] group-hover:bg-[#1a56db] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[0.75rem] font-semibold text-[#64748b] uppercase tracking-[1px] m-0 mb-1">
                    Head Office
                  </p>
                  <p className="text-[0.95rem] font-medium text-[#e2e8f0] m-0 leading-relaxed">
                    D.J. Group of Companies<br />Batapola, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="group flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-[10px] bg-[#1a56db]/10 text-[#4fa3ff] group-hover:bg-[#1a56db] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[0.75rem] font-semibold text-[#64748b] uppercase tracking-[1px] m-0 mb-1">
                    Call Us
                  </p>
                  <p className="text-[0.95rem] font-medium text-[#e2e8f0] m-0">
                    <a href="tel:+94914501030" className="hover:text-[#4fa3ff] transition-colors">
                      +94 (91) 450 1030
                    </a>
                  </p>
                </div>
              </div>

              {/* Email Support */}
              <div className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-[10px] bg-[#1a56db]/10 text-[#4fa3ff] group-hover:bg-[#1a56db] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[0.75rem] font-semibold text-[#64748b] uppercase tracking-[1px] m-0 mb-1">
                    Email Support
                  </p>
                  <p className="text-[0.95rem] font-medium text-[#e2e8f0] m-0">
                    <a href="mailto:info@djtrust.lk" className="hover:text-[#4fa3ff] transition-colors">
                      info@djtrust.lk
                    </a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom Copyright */}
      <div className="footer-bottom py-6 bg-[#040d21] border-t border-white/[0.05]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#64748b] text-[0.9rem] text-center m-0">
            © Copyright <strong className="text-[#e2e8f0]">2026 D.J. Trust</strong>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};