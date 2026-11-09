import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Send, 
  Navigation, 
  Check, 
  Loader2 
} from 'lucide-react';
import { submitContactInquiry } from '../services/api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handlePhoneClick = (phoneNum: string, telHref: string) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${telHref}`;
      return;
    }

    navigator.clipboard.writeText(phoneNum).then(() => {
      setCopiedPhone(phoneNum);
      setTimeout(() => {
        setCopiedPhone(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy phone number:', err);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: boolean } = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.phone.trim() || formData.phone.trim().length < 9) errors.phone = true;
    if (!formData.subject.trim()) errors.subject = true;
    if (!formData.message.trim()) errors.message = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitContactInquiry({
        name: formData.name,
        tpno: formData.phone,
        subject: formData.subject,
        message: formData.message
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    } catch (err: any) {
      setErrorMessage('Sorry, something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showrooms = [
    {
      name: 'Matara Honda Showroom',
      address: 'Walgama Central, Matara',
      phone: '091 4111 8080',
      tel: '09141118080',
      description: 'Explore our exclusive range of brand new Honda motorcycles with flexible loan facilities and professional services.',
      directionUrl: 'https://maps.app.goo.gl/4Pzu7bAHpdE46gfm7',
      isPending: false
    },
    {
      name: 'Matara Showroom',
      address: '381 Galle Road, Matara',
      phone: '041 222 6006',
      tel: '0412226006',
      description: 'Your trusted destination for brand new Bajaj motorcycles and quick loan approvals in the heart of Matara.',
      directionUrl: '',
      isPending: true
    },
    {
      name: 'Ambalangoda Showroom',
      address: 'Elpitiya Road, Ambalangoda',
      phone: '091 225 1402',
      tel: '0912251402',
      description: 'Visit us for a wide selection of brand new TVS vehicles, amazing customer care, and convenient loan options.',
      directionUrl: 'https://www.google.com/maps/place/D.+J.+Trading+(Pvt.)+Ltd./6.241283,80.0515553,17z/data=!4m12!1m6!3m5!1s0x3ae1819d7f1f2053:0xe0add1452a2f0db3!2sD.+J.+Trading+(Pvt.)+Ltd.!8m2!3d6.241283!4d80.053744!3m4!1s0x3ae1819d7f1f2053:0xe0add1452a2f0db3!8m2!3d6.241283!4d80.053744',
      isPending: false
    },
    {
      name: 'Kohuwala Showroom',
      address: 'No:51/B S.D.S Jayasingha Mw, Kohuwala',
      phone: '011 432 2053',
      tel: '0114322053',
      description: 'Offering the best prices for brand new TVS motorcycles with instant loan processing in the heart of Kohuwala.',
      directionUrl: '',
      isPending: true
    },
    {
      name: 'Borella Showroom',
      address: '912/A, Maradana Road, Punchi Boralla, Colombo 8',
      phone: '011 432 2038',
      tel: '0114322038',
      description: 'Your premier showroom in Colombo for new and used vehicles along with fast, secure loan services.',
      directionUrl: '',
      isPending: true
    },
    {
      name: 'Sooriyawewa Showroom',
      address: 'No 6407, Ambalantota Road, Sooriyawewa',
      phone: '091 411 8050',
      tel: '0914118050',
      description: 'Discover the latest Hero motorcycles and trishaws with easy loan solutions right here in Sooriyawewa.',
      directionUrl: '',
      isPending: true
    }
  ];

  return (
    <div className="font-sans bg-white text-slate-800">
      <style>{`
        /* ===== Contact Page Premium Styles ===== */
        .ct-header {
          position: relative;
          background: #001f4a;
          padding: 60px 0 40px;
          color: white;
          overflow: hidden;
        }
        .ct-header-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/image/News4.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(7px) brightness(0.5);
          opacity: 0.35;
          transform: scale(1.08);
          z-index: 0;
        }
        .ct-header-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(0,61,143,0.88) 0%, rgba(0,31,74,0.96) 100%);
          z-index: 1;
        }
        .ct-header-content {
          position: relative;
          z-index: 2;
        }
        .ct-header-tag {
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
        .ct-header-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 10px;
          line-height: 1.15;
        }
        .ct-header-line {
          width: 55px;
          height: 4px;
          background: linear-gradient(90deg, #cbd5e1, #ffffff);
          border-radius: 3px;
          margin-bottom: 14px;
        }
        .ct-header-sub {
          color: rgba(255,255,255,0.78);
          font-size: 0.97rem;
          max-width: 520px;
          line-height: 1.7;
          margin: 0;
        }
        .ct-breadcrumb {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          border-radius: 50px;
          font-size: 0.85rem;
        }
        .ct-breadcrumb a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-weight: 600;
        }
        .ct-breadcrumb a:hover {
          color: #cbd5e1;
        }
        .ct-breadcrumb .sep {
          color: rgba(255,255,255,0.4);
        }
        .ct-breadcrumb span:last-child {
          color: #cbd5e1;
          font-weight: 700;
        }

        /* Quick Contact Strip */
        .ct-quick-strip {
          background: linear-gradient(135deg, #003d8f 0%, #001f4a 100%);
          padding: 0;
        }
        .ct-quick-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 30px;
          border-right: 1px solid rgba(255,255,255,0.08);
          text-decoration: none;
          color: #fff;
          transition: background 0.3s;
        }
        .ct-quick-item:hover {
          background: rgba(255,255,255,0.06);
          color: #cbd5e1;
        }
        .ct-quick-icon {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .ct-quick-item:hover .ct-quick-icon {
          background: #cbd5e1;
          color: #001f4a;
        }
        .ct-quick-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }
        .ct-quick-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          margin: 2px 0 0;
        }
        .ct-quick-item:hover .ct-quick-value {
          color: #cbd5e1;
        }

        /* Map Section */
        .ct-map-section {
          background: #f8fbff;
          padding: 70px 0 0;
        }
        .ct-map-wrapper {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,31,74,0.12);
          border: 1px solid #dde8f5;
        }
        .ct-map-wrapper iframe {
          display: block;
          width: 100%;
          height: 450px;
          border: none;
        }

        /* Location Cards */
        .ct-locations-section {
          padding: 70px 0;
          background: #f8fbff;
        }
        .ct-section-tag {
          color: #003d8f;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.78rem;
          display: block;
          margin-bottom: 8px;
        }
        .ct-section-title {
          font-size: 2.1rem;
          font-weight: 800;
          color: #002060;
          margin-bottom: 10px;
        }
        .ct-section-divider {
          width: 45px;
          height: 3px;
          background: #cbd5e1;
          border-radius: 2px;
          margin-bottom: 30px;
        }

        /* Head Office Card */
        .ct-head-office-card {
          background: linear-gradient(135deg, #003d8f 0%, #001f4a 100%);
          border-radius: 22px;
          padding: 40px;
          color: #fff;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .ct-head-office-card::before {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 140px;
          height: 140px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }
        .ct-head-office-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ct-contact-item {
          display: flex;
          gap: 14px;
          margin-bottom: 22px;
          align-items: flex-start;
        }
        .ct-contact-icon {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.12);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .ct-contact-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin: 0 0 3px;
        }
        .ct-contact-value {
          font-size: 0.92rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        /* Showroom Cards */
        .ct-showroom-card {
          background: #fff;
          border: 1px solid #edf2f7;
          border-radius: 18px;
          padding: 28px;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.165,0.84,0.44,1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
        }
        .ct-showroom-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,61,143,0.1);
          border-color: rgba(0,61,143,0.12);
        }
        .ct-showroom-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f0f4fa;
        }
        .ct-showroom-icon {
          width: 42px;
          height: 42px;
          background: #f0f6ff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #003d8f;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .ct-showroom-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #002060;
          margin: 0;
        }
        .ct-showroom-detail {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
          align-items: flex-start;
        }
        .ct-showroom-detail-icon {
          color: #003d8f;
          font-size: 0.85rem;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .ct-showroom-detail span {
          color: #64748b;
          font-size: 0.88rem;
          line-height: 1.5;
        }
        .ct-showroom-desc {
          background: #f8fafc;
          border-left: 3px solid #003d8f;
          padding: 12px 15px;
          font-size: 0.85rem;
          color: #475569;
          margin: 15px 0;
          border-radius: 4px;
          line-height: 1.5;
        }
        .ct-business-details-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 20px;
          border-top: 1px solid #e2e8f0;
          padding-top: 15px;
        }
        .ct-business-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.85rem;
          color: #475569;
          padding: 8px 0;
        }
        .ct-directions-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0f6ff;
          color: #003d8f;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 8px 18px;
          border-radius: 8px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: auto;
          align-self: flex-start;
        }
        .ct-directions-btn:hover {
          background: #003d8f;
          color: #fff;
        }
        .ct-showroom-phone {
          color: #003d8f;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.2s ease-in-out;
          border-bottom: 1px dashed rgba(0, 61, 143, 0.4);
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
        }
        .ct-showroom-phone:hover {
          color: #001f4a;
          background-color: #f0f6ff;
          border-bottom-color: #001f4a;
        }

        /* Form Section */
        .ct-form-section {
          padding: 80px 0;
          background: #f4f7fa;
        }
        .ct-form-card {
          background: linear-gradient(145deg, #001f4a 0%, #003377 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 50px 60px;
          box-shadow: 0 25px 60px rgba(0, 31, 74, 0.15);
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .ct-form-card {
            padding: 30px 20px;
          }
          .ct-header-title {
            font-size: 2.5rem;
          }
        }
        .ct-input-field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          padding: 14px 18px;
          font-size: 0.95rem;
          color: #ffffff;
          transition: all 0.35s ease;
          outline: none;
        }
        .ct-input-field:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #4fa3ff;
          box-shadow: 0 0 0 4px rgba(79, 163, 255, 0.15);
        }
        .ct-input-field.is-invalid {
          border-color: #e74c3c !important;
          background-color: rgba(231, 76, 60, 0.08) !important;
        }
        .ct-submit-btn {
          background: #4fa3ff;
          color: #001f4a;
          border: none;
          border-radius: 50px;
          padding: 16px 45px;
          font-weight: 800;
          font-size: 1.05rem;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 20px rgba(79, 163, 255, 0.2);
        }
        .ct-submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(79, 163, 255, 0.4);
          background: #ffffff;
        }
        .ct-submit-btn:active {
          transform: translateY(-1px);
        }
      `}</style>

      {/* ===== HEADER BANNER ===== */}
      <section className="ct-header">
        <div className="ct-header-bg"></div>
        <div className="ct-header-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ct-header-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div data-aos="fade-right">
              <span className="ct-header-tag">Contact</span>
              <h1 className="ct-header-title">Contact Us</h1>
              <p className="ct-header-sub">
                We're here to help. Reach out to us at our Head Office or any of our showrooms across Sri Lanka.
              </p>
            </div>
            <div data-aos="fade-left">
              <nav className="ct-breadcrumb">
                <a href="/">Home</a>
                <span className="sep">›</span>
                <span>Contact</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK CONTACT STRIP ===== */}
      <section className="ct-quick-strip" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Phone */}
            <a href="tel:+94914501030" className="ct-quick-item">
              <div className="ct-quick-icon">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="ct-quick-label">Call Us</p>
                <p className="ct-quick-value">+94 (91) 450 1030</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:info@djtrust.lk" className="ct-quick-item">
              <div className="ct-quick-icon">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="ct-quick-label">Email Us</p>
                <p className="ct-quick-value">info@djtrust.lk</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/94761355465" target="_blank" rel="noopener noreferrer" className="ct-quick-item">
              <div className="ct-quick-icon">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="ct-quick-label">WhatsApp</p>
                <p className="ct-quick-value">+94 76 135 5465</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="ct-map-section" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ct-map-wrapper">
            <iframe 
              id="showroom-map-iframe" 
              src="https://maps.google.com/maps?q=D.J.+Trust,+Batapola,+Sri+Lanka&hl=en&z=15&output=embed" 
              title="D.J. Trust Office Location Map"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS SECTION ===== */}
      <section className="ct-locations-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8" data-aos="fade-up">
            <span className="ct-section-tag">Find Us</span>
            <h2 className="ct-section-title">Our Locations</h2>
            <div className="ct-section-divider"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Head Office Card (col-lg-4) */}
            <div className="lg:col-span-4" data-aos="fade-up">
              <div className="ct-head-office-card">
                <div className="ct-head-office-title">
                  <Building2 className="w-6 h-6 text-[#4fa3ff]" />
                  <span>Head Office</span>
                </div>

                <div className="ct-contact-item">
                  <div className="ct-contact-icon">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="ct-contact-label">Location</p>
                    <p className="ct-contact-value">D.J. Trust, Batapola</p>
                  </div>
                </div>

                <div className="ct-contact-item">
                  <div className="ct-contact-icon">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="ct-contact-label">Email</p>
                    <p className="ct-contact-value">info@djtrust.lk</p>
                  </div>
                </div>

                <div className="ct-contact-item">
                  <div className="ct-contact-icon">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="ct-contact-label">Phone</p>
                    <p className="ct-contact-value">+94 (91) 450 1030</p>
                  </div>
                </div>

                <div className="ct-contact-item">
                  <div className="ct-contact-icon">
                    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="ct-contact-label">WhatsApp</p>
                    <p className="ct-contact-value">+94 76 135 5465</p>
                  </div>
                </div>

                <div className="ct-contact-item">
                  <div className="ct-contact-icon">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="ct-contact-label">Operating Hours</p>
                    <div className="text-xs text-white/90 space-y-1 mt-1 font-medium">
                      <div className="flex justify-between">
                        <span className="text-white/70">Weekdays:</span>
                        <span>8.30 AM - 5.00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Saturday:</span>
                        <span>8.30 AM - 1.00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Sunday:</span>
                        <span className="text-rose-300 font-bold">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showrooms Grid (col-lg-8) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {showrooms.map((showroom, idx) => (
                  <div key={idx} className="ct-showroom-card" data-aos="fade-up" data-aos-delay={(idx + 1) * 50}>
                    <div className="ct-showroom-header">
                      <div className="ct-showroom-icon">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h5 className="ct-showroom-name">{showroom.name}</h5>
                    </div>

                    <div className="ct-showroom-detail">
                      <Navigation className="w-4 h-4 ct-showroom-detail-icon" />
                      <span>{showroom.address}</span>
                    </div>

                    <div className="ct-showroom-detail">
                      <Phone className="w-4 h-4 ct-showroom-detail-icon" />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePhoneClick(showroom.phone, showroom.tel)}
                          className="ct-showroom-phone text-left cursor-pointer"
                          title="Click to copy or call"
                        >
                          {showroom.phone}
                        </button>
                        {copiedPhone === showroom.phone && (
                          <span className="text-emerald-600 text-[11px] font-bold flex items-center gap-1 animate-in fade-in duration-200">
                            <Check className="w-3 h-3" /> Copied!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ct-showroom-desc">
                      {showroom.description}
                    </div>

                    <ul className="ct-business-details-list">
                      <li className="ct-business-detail-item">
                        <Clock className="w-4 h-4 text-[#003d8f] shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-bold text-[#002060] mb-1">Operating Hours</div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Weekdays:</span>
                            <span className="font-semibold text-slate-800">8.30 AM - 5.00 PM</span>
                          </div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Saturday:</span>
                            <span className="font-semibold text-slate-800">8.30 AM - 1.00 PM</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Sunday:</span>
                            <span className="font-bold text-rose-500">Closed</span>
                          </div>
                        </div>
                      </li>
                    </ul>

                    {showroom.isPending ? (
                      <button
                        type="button"
                        onClick={() => alert('Google Map location is currently pending.')}
                        className="ct-directions-btn !bg-slate-200 !text-slate-500 cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Location Pending
                      </button>
                    ) : (
                      <a
                        href={showroom.directionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ct-directions-btn"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Get Directions
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM SECTION ===== */}
      <section className="ct-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
            <span className="ct-section-tag !text-[#003d8f]">Send a Message</span>
            <h2 className="ct-section-title">Get In Touch</h2>
            <div className="ct-section-divider mx-auto"></div>
            <p className="text-slate-500 text-sm">
              Have a question or want to get in touch? Fill in the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="ct-form-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Full Name"
                      className={`ct-input-field ${formErrors.name ? 'is-invalid' : ''}`}
                    />
                    {formErrors.name && (
                      <p className="text-rose-400 text-[11px] mt-1 font-semibold">Name is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="07XXXXXXXX"
                      maxLength={12}
                      className={`ct-input-field ${formErrors.phone ? 'is-invalid' : ''}`}
                    />
                    {formErrors.phone && (
                      <p className="text-rose-400 text-[11px] mt-1 font-semibold">Valid phone number is required.</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className={`ct-input-field ${formErrors.subject ? 'is-invalid' : ''}`}
                  />
                  {formErrors.subject && (
                    <p className="text-rose-400 text-[11px] mt-1 font-semibold">Subject is required.</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`ct-input-field resize-none ${formErrors.message ? 'is-invalid' : ''}`}
                  />
                  {formErrors.message && (
                    <p className="text-rose-400 text-[11px] mt-1 font-semibold">Message is required.</p>
                  )}
                </div>

                {/* Status Messages */}
                {errorMessage && (
                  <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 px-4 py-3 rounded-xl text-center text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {isSuccess && (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Your message has been sent. Thank you!
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ct-submit-btn inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
