import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  FileText, 
  Info, 
  Users, 
  Award, 
  Heart, 
  Trees, 
  MapPin, 
  Handshake, 
  Briefcase, 
  Calendar, 
  Send
} from 'lucide-react';

interface NavbarProps {
  onOpenLoanModal?: () => void;
}

interface SearchItem {
  category: string;
  title: string;
  subtitle: string;
  url?: string;
  action?: 'modal';
  icon: React.ReactNode;
  aliases: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    category: 'Services & Financing',
    title: 'Apply for Loan',
    subtitle: 'Submit instant online loan request',
    action: 'modal',
    icon: <FileText className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['apply', 'request', 'loan request', 'vehicle loan', 'bike loan', 'online application']
  },
  {
    category: 'Services & Financing',
    title: 'Loan Facility',
    subtitle: 'Motorcycle & Three-Wheeler loan plans',
    url: '/finance',
    icon: <FileText className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['loan', 'loans', 'motorcycle loan', 'vehicle loan', 'money', 'borrow', 'credit', 'finance', 'bike loan']
  },
  {
    category: 'About D.J. Trust',
    title: 'About Us',
    subtitle: '90+ years of trusted journey & history since 1931',
    url: '/about',
    icon: <Info className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['about', 'history', 'company', 'who we are', 'team', 'founder']
  },
  {
    category: 'About D.J. Trust',
    title: 'Leadership & Management',
    subtitle: 'Board of Directors and corporate governance',
    url: '/about/leadership',
    icon: <Users className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['leadership', 'leaders', 'board of directors', 'management', 'directors']
  },
  {
    category: 'About D.J. Trust',
    title: 'Milestones',
    subtitle: 'Key historical highlights and legacy timeline',
    url: '/about/milestones',
    icon: <Award className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['milestones', 'history timeline', 'journey', 'achievements']
  },
  {
    category: 'About D.J. Trust',
    title: 'CSR & Community Welfare',
    subtitle: 'Social responsibility & sustainable community programs',
    url: '/about/charity',
    icon: <Heart className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['csr', 'charity', 'community', 'social responsibility', 'donation']
  },
  {
    category: 'About D.J. Trust',
    title: 'Plantation Estates',
    subtitle: 'Tea, Rubber, Cinnamon & Coconut estate operations',
    url: '/plantation',
    icon: <Trees className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['plantation', 'estate', 'rubber', 'tea', 'cinnamon', 'coconut', 'agriculture']
  },
  {
    category: 'Network & Careers',
    title: 'Authorized Dealers',
    subtitle: 'Locate 500+ partner showrooms across all 25 districts',
    url: '/dealers',
    icon: <MapPin className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['dealer', 'dealers', 'branch', 'branches', 'showrooms', 'agents', 'locations', 'map']
  },
  {
    category: 'Network & Careers',
    title: 'Business Partners',
    subtitle: 'Collaborate and grow with D.J. Trust dealer network',
    url: '/partners',
    icon: <Handshake className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['business partners', 'partnership', 'b2b', 'investors', 'collaborate']
  },
  {
    category: 'Network & Careers',
    title: 'Careers',
    subtitle: 'Explore open job vacancies and career opportunities',
    url: '/careers',
    icon: <Briefcase className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['career', 'careers', 'job', 'jobs', 'vacancy', 'vacancies', 'work', 'hiring']
  },
  {
    category: 'Network & Careers',
    title: 'Latest Events',
    subtitle: 'Branch openings, dealer conferences & ceremonies',
    url: '/events',
    icon: <Calendar className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['event', 'events', 'news', 'activities', 'gatherings', 'openings']
  },
  {
    category: 'Network & Careers',
    title: 'Contact Us',
    subtitle: 'Head office Batapola, branch inquiries & contact form',
    url: '/contact',
    icon: <Send className="w-4 h-4 text-[#003d8f]" />,
    aliases: ['contact', 'support', 'help', 'location', 'address', 'number', 'email', 'inquiry']
  }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenLoanModal }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [partnersDropdownOpen, setPartnersDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobilePartnersOpen, setMobilePartnersOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Scroll listener for dynamic height collapse (100px -> 70px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const filteredSearch = searchQuery.trim() === ''
    ? SEARCH_ITEMS.slice(0, 5)
    : SEARCH_ITEMS.filter(item => {
        const query = searchQuery.toLowerCase();
        const searchStr = `${item.title} ${item.subtitle} ${item.category} ${item.aliases.join(' ')}`.toLowerCase();
        return searchStr.includes(query);
      });

  const handleSearchResultClick = (item: SearchItem) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (item.action === 'modal') {
      onOpenLoanModal?.();
    } else if (item.url) {
      navigate(item.url);
    }
  };

  const isHomeActive = location.pathname === '/';
  const isAboutActive = ['/about', '/leadership', '/milestones', '/charity', '/plantation'].some(p => location.pathname.startsWith(p));
  const isFinanceActive = location.pathname.startsWith('/finance') || location.pathname.startsWith('/services');
  const isCareersActive = location.pathname.startsWith('/careers');
  const isEventsActive = location.pathname.startsWith('/events');
  const isPartnersActive = ['/dealers', '/AuthorizedDealers', '/partners', '/businesspartners', '/business-partners'].some(p => location.pathname.startsWith(p));
  const isContactActive = location.pathname.startsWith('/contact') || location.pathname.startsWith('/Contact');

  return (
    <header 
      id="header" 
      className={`fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.96)] backdrop-blur-md transition-all duration-300 font-sans ${
        isScrolled 
          ? 'shadow-[0_4px_25px_rgba(0,0,0,0.08)]' 
          : 'shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
      }`}
    >
      <div 
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-[70px]' : 'h-[80px] lg:h-[100px]'
        }`}
      >
        {/* Brand Logo */}
        <div className="logo flex items-center h-full py-1 shrink-0">
          <Link to="/" className="flex items-center h-full">
            <img 
              src="/Image/Logo_cropped.png" 
              alt="D.J. Trust Logo" 
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'max-h-[50px] sm:max-h-[52px]' : 'max-h-[54px] sm:max-h-[60px]'
              }`}
            />
          </Link>
        </div>

        {/* Header Right Column (Top Row + Bottom Row on Desktop) */}
        <div className="flex flex-col items-end justify-center h-full flex-grow pl-4 sm:pl-6">
          
          {/* Top Row: Contact Info + Spotlight Search (collapses on scroll) */}
          <div 
            className={`hidden lg:flex items-center justify-end w-full border-b border-[#003d8f]/10 text-xs text-[#64748b] transition-all duration-300 ${
              isScrolled 
                ? 'h-0 opacity-0 overflow-hidden pointer-events-none border-b-0' 
                : 'h-[32px] opacity-100'
            }`}
          >
            {/* Contact details */}
            <div className="flex items-center gap-6">
              <a 
                href="tel:+94914501030" 
                className="flex items-center gap-1.5 hover:text-[#003d8f] transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#003d8f]" />
                <span>Call Us: +94 91 450 1030</span>
              </a>
              <a 
                href="mailto:info@djtrust.lk" 
                className="flex items-center gap-1.5 hover:text-[#003d8f] transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#003d8f]" />
                <span>Email: info@djtrust.lk</span>
              </a>
            </div>

            {/* Smart Spotlight Navigation Search */}
            <div className="relative ml-6" ref={searchContainerRef}>
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <Search className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  className="w-[190px] focus:w-[260px] h-[28px] pl-8 pr-3 text-xs text-slate-800 bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#003d8f] rounded-full outline-none transition-all duration-300 focus:shadow-[0_2px_12px_rgba(0,61,143,0.18)]"
                />
              </form>

              {/* Autocomplete Results Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[340px] bg-white rounded-xl shadow-[0_18px_40px_rgba(0,31,74,0.16),0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100 py-2 z-50 max-h-[380px] overflow-y-auto animate-fade-in text-left">
                  <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {searchQuery ? 'Search Results' : 'Quick Recommendations'}
                  </div>

                  {filteredSearch.length > 0 ? (
                    filteredSearch.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSearchResultClick(item)}
                        className="px-3.5 py-2.5 hover:bg-[#f0f6ff] cursor-pointer flex items-center gap-3 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#003d8f] flex items-center justify-center shrink-0 transition-colors">
                          <span className="text-[#003d8f] group-hover:text-white transition-colors">
                            {item.icon}
                          </span>
                        </div>
                        <div className="min-w-0 flex-grow">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#003d8f] truncate transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-500 text-center">
                      No matching pages found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Navigation Menu & CTA */}
          <div className="flex items-center justify-end w-full h-[68px]">
            <nav className="nav-menu hidden lg:block">
              <ul className="flex items-center m-0 p-0 list-none gap-1">
                {/* Home */}
                <li>
                  <Link 
                    to="/" 
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-block ${
                      isHomeActive 
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]' 
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    Home
                  </Link>
                </li>

                {/* About Dropdown */}
                <li 
                  className="relative group"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-flex items-center gap-1 cursor-pointer ${
                      isAboutActive
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]'
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    <span>About</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-0 min-w-[260px] bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-b-[3px] border-[#d81f27] overflow-hidden py-1 z-50 text-left">
                      <Link 
                        to="/about" 
                        onClick={() => setAboutDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        About Us
                      </Link>
                      <Link 
                        to="/about/leadership" 
                        onClick={() => setAboutDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        Leadership
                      </Link>
                      <Link 
                        to="/about/milestones" 
                        onClick={() => setAboutDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        Milestones
                      </Link>
                      <Link 
                        to="/about/charity" 
                        onClick={() => setAboutDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        Corporate Social Responsibility
                      </Link>
                      <Link 
                        to="/plantation" 
                        onClick={() => setAboutDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        Plantation
                      </Link>
                    </div>
                  )}
                </li>

                {/* Loan Facility */}
                <li>
                  <Link 
                    to="/finance" 
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-block ${
                      isFinanceActive 
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]' 
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    Loan Facility
                  </Link>
                </li>

                {/* Careers */}
                <li>
                  <Link 
                    to="/careers" 
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-block ${
                      isCareersActive 
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]' 
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    Careers
                  </Link>
                </li>

                {/* Events */}
                <li>
                  <Link 
                    to="/events" 
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-block ${
                      isEventsActive 
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]' 
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    Events
                  </Link>
                </li>

                {/* Partners Dropdown */}
                <li 
                  className="relative group"
                  onMouseEnter={() => setPartnersDropdownOpen(true)}
                  onMouseLeave={() => setPartnersDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setPartnersDropdownOpen(!partnersDropdownOpen)}
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-flex items-center gap-1 cursor-pointer ${
                      isPartnersActive
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]'
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    <span>Partners</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${partnersDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {partnersDropdownOpen && (
                    <div className="absolute top-full left-0 min-w-[240px] bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-b-[3px] border-[#d81f27] overflow-hidden py-1 z-50 text-left">
                      <Link 
                        to="/dealers" 
                        onClick={() => setPartnersDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        Authorize Dealers
                      </Link>
                      <Link 
                        to="/partners" 
                        onClick={() => setPartnersDropdownOpen(false)}
                        className="block px-5 py-3 text-[0.86rem] font-semibold text-[#334155] hover:bg-[rgba(0,61,143,0.06)] hover:text-[#003d8f] transition-colors"
                      >
                        Business Partners
                      </Link>
                    </div>
                  )}
                </li>

                {/* Contact */}
                <li>
                  <Link 
                    to="/contact" 
                    className={`text-[0.78rem] font-bold px-4 py-2 rounded-full uppercase tracking-[0.5px] transition-all inline-block ${
                      isContactActive 
                        ? 'bg-[#d81f27] text-white shadow-[0_4px_12px_rgba(216,31,39,0.25)]' 
                        : 'text-[#475569] hover:text-[#003d8f] hover:bg-[rgba(0,61,143,0.06)]'
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Apply for Loan CTA Button (Desktop) */}
            <button
              type="button"
              onClick={onOpenLoanModal}
              className="ml-4 hidden lg:inline-block bg-gradient-to-r from-[#003d8f] to-[#0056cc] hover:from-[#002d6b] hover:to-[#0041a8] text-white text-[0.8rem] font-bold uppercase tracking-[0.5px] px-6 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,61,143,0.18)] hover:shadow-[0_8px_25px_rgba(0,61,143,0.28)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Apply for Loan
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-[44px] h-[44px] rounded-[10px] flex items-center justify-center transition-all cursor-pointer ml-3 ${
                mobileMenuOpen 
                  ? 'bg-[#003d8f] text-white shadow-[0_4px_14px_rgba(0,61,143,0.35)]' 
                  : 'bg-[rgba(0,61,143,0.08)] border border-[rgba(0,61,143,0.15)] text-[#003d8f] hover:bg-[rgba(0,61,143,0.14)]'
              }`}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Quick Contact Bar for Mobile */}
          <div className="pb-3 border-b border-slate-100 flex flex-col gap-2 text-xs text-slate-600">
            <a href="tel:+94914501030" className="flex items-center gap-2 text-[#003d8f] font-semibold">
              <Phone className="w-4 h-4" />
              <span>+94 91 450 1030</span>
            </a>
            <a href="mailto:info@djtrust.lk" className="flex items-center gap-2 text-slate-500">
              <Mail className="w-4 h-4 text-[#003d8f]" />
              <span>info@djtrust.lk</span>
            </a>
          </div>

          {/* Navigation Links */}
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-bold ${isHomeActive ? 'text-[#d81f27]' : 'text-slate-800 hover:text-[#003d8f]'}`}
          >
            Home
          </Link>

          {/* Mobile About Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="flex items-center justify-between w-full py-2 text-sm font-bold text-slate-800 hover:text-[#003d8f]"
            >
              <span>About</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180 text-[#003d8f]' : 'text-slate-400'}`} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-3 space-y-2 pt-1 pb-2 border-l-2 border-[#003d8f]/20 ml-2">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">About Us</Link>
                <Link to="/about/leadership" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">Leadership</Link>
                <Link to="/about/milestones" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">Milestones</Link>
                <Link to="/about/charity" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">Corporate Social Responsibility</Link>
                <Link to="/plantation" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">Plantation</Link>
              </div>
            )}
          </div>

          <Link 
            to="/finance" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-bold ${isFinanceActive ? 'text-[#d81f27]' : 'text-slate-800 hover:text-[#003d8f]'}`}
          >
            Loan Facility
          </Link>

          <Link 
            to="/careers" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-bold ${isCareersActive ? 'text-[#d81f27]' : 'text-slate-800 hover:text-[#003d8f]'}`}
          >
            Careers
          </Link>

          <Link 
            to="/events" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-bold ${isEventsActive ? 'text-[#d81f27]' : 'text-slate-800 hover:text-[#003d8f]'}`}
          >
            Events
          </Link>

          {/* Mobile Partners Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobilePartnersOpen(!mobilePartnersOpen)}
              className="flex items-center justify-between w-full py-2 text-sm font-bold text-slate-800 hover:text-[#003d8f]"
            >
              <span>Partners</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobilePartnersOpen ? 'rotate-180 text-[#003d8f]' : 'text-slate-400'}`} />
            </button>
            {mobilePartnersOpen && (
              <div className="pl-3 space-y-2 pt-1 pb-2 border-l-2 border-[#003d8f]/20 ml-2">
                <Link to="/dealers" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">Authorize Dealers</Link>
                <Link to="/partners" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-semibold text-slate-700 hover:text-[#003d8f]">Business Partners</Link>
              </div>
            )}
          </div>

          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-bold ${isContactActive ? 'text-[#d81f27]' : 'text-slate-800 hover:text-[#003d8f]'}`}
          >
            Contact
          </Link>

          {/* Apply for Loan Mobile Button */}
          <button 
            type="button"
            onClick={() => { setMobileMenuOpen(false); onOpenLoanModal?.(); }}
            className="w-full bg-gradient-to-r from-[#003d8f] to-[#0056cc] hover:from-[#002d6b] hover:to-[#0041a8] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-full shadow-[0_4px_15px_rgba(0,61,143,0.25)] mt-4 cursor-pointer"
          >
            Apply for Loan
          </button>
        </div>
      )}
    </header>
  );
};
