import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoanModal } from './components/LoanModal';
import { FinanceModal } from './components/FinanceModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Leadership } from './pages/Leadership';
import { Milestones } from './pages/Milestones';
import { Charity } from './pages/Charity';
import { Plantation } from './pages/Plantation';
import { AuthorizedDealers } from './pages/AuthorizedDealers';
import { BusinessPartners } from './pages/BusinessPartners';
import { Events } from './pages/Events';
import { EventSingle } from './pages/EventSingle';
import { Finance } from './pages/Finance';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';

// Scroll to top instantly before browser paints the new page
const ScrollToTopAndAOS: React.FC = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // If navigating to an in-page anchor hash (e.g. #benefits), smoothly scroll to that section
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // For all page-to-page navigations, jump to top INSTANTLY with zero scroll animation
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  useEffect(() => {
    // Short timeout allows React DOM to finish mounting elements before AOS recalculates
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default function App() {
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [financeServiceType, setFinanceServiceType] = useState('Loan Application');

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      offset: 40,
      easing: 'ease-out',
    });
  }, []);

  const handleOpenFinanceModal = (serviceType?: string) => {
    setFinanceServiceType(serviceType || 'Loan Application');
    setFinanceModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTopAndAOS />
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar onOpenLoanModal={() => setLoanModalOpen(true)} />

        <main className="flex-grow pt-[80px] lg:pt-[100px] overflow-x-clip w-full relative">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onOpenLoanModal={() => setLoanModalOpen(true)} 
                  onOpenFinanceModal={handleOpenFinanceModal}
                />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/about/leadership" element={<Leadership />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/about/milestones" element={<Milestones />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/about/charity" element={<Charity />} />
            <Route path="/charity" element={<Charity />} />
            <Route path="/about/csr" element={<Charity />} />
            <Route path="/plantation" element={<Plantation />} />
            <Route path="/about/plantation" element={<Plantation />} />
            <Route path="/finance" element={<Finance onOpenLoanModal={() => setLoanModalOpen(true)} />} />
            <Route path="/services/finance" element={<Finance onOpenLoanModal={() => setLoanModalOpen(true)} />} />
            <Route path="/services" element={<Finance onOpenLoanModal={() => setLoanModalOpen(true)} />} />
            <Route path="/dealers" element={<AuthorizedDealers />} />
            <Route path="/AuthorizedDealers" element={<AuthorizedDealers />} />
            <Route path="/businesspartners/dealers" element={<AuthorizedDealers />} />
            <Route path="/partners" element={<BusinessPartners />} />
            <Route path="/businesspartners" element={<BusinessPartners />} />
            <Route path="/business-partners" element={<BusinessPartners />} />
            <Route path="/BusinessPartners" element={<BusinessPartners />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventSingle />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        <LoanModal 
          isOpen={loanModalOpen} 
          onClose={() => setLoanModalOpen(false)} 
        />

        <FinanceModal
          isOpen={financeModalOpen}
          onClose={() => setFinanceModalOpen(false)}
          serviceType={financeServiceType}
        />

        {/* Global Floating Scroll-To-Top Button */}
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
