import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  CalendarCheck, 
  Clock, 
  ArrowLeft, 
  Newspaper, 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft 
} from 'lucide-react';
import { getEventById, getEvents, type EventItem } from '../services/api';

// Helper to determine the Highlights section title
const getHighlightsTitle = (title?: string): string => {
  if (!title) return 'Showroom Opening Highlights';
  if (/opening|reopening/i.test(title)) return 'Showroom Opening Highlights';
  if (/dealer/i.test(title)) return 'Dealers Meeting Highlights';
  return `${title} Highlights`;
};

// Fallback highlights if specific showroom event has no inline gallery images
const getFallbackHighlights = (event: EventItem | null): string[] => {
  if (!event) return [];
  const title = event.title || '';
  const idStr = String(event.id || '');
  if (/matara/i.test(title) || idStr === '2010') {
    return ['/Image/M2.jpg', '/Image/M3.jpg', '/Image/M4.jpg', '/Image/M5.jpg'];
  }
  if (/sooriyawewa|opening/i.test(title) || idStr === '4' || idStr === '2002') {
    return ['/Image/S1.jpg', '/Image/shop_front.webp', '/Image/S3.jpg', '/Image/S4.jpg'];
  }
  return [];
};

// Parse event HTML body to cleanly extract gallery images and strip broken bootstrap containers
const parseEventContent = (html: string, fallbackHeroUrl?: string, event?: EventItem | null) => {
  if (!html) {
    const fallback = getFallbackHighlights(event || null);
    return {
      cleanedHtml: '',
      galleryImages: fallback.length > 0 ? fallback : (fallbackHeroUrl ? [fallbackHeroUrl] : [])
    };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images: string[] = [];

    // 1. Collect all gallery images from .row or .thumbnail or <img>
    const imgNodes = doc.querySelectorAll('.row img, .thumbnail img, .gallery img, img');
    imgNodes.forEach((img) => {
      let src = img.getAttribute('src');
      if (src) {
        src = src.trim().replace(/\\/g, '/');
        if (!src.startsWith('/') && !src.startsWith('http')) {
          src = '/' + src;
        }
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    });

    // 2. Remove unstyled old bootstrap row containers that held these gallery images
    doc.querySelectorAll('.row').forEach((row) => {
      if (row.querySelector('img')) {
        row.remove();
      }
    });

    // 3. Remove duplicate article title and entry-img if present from .txt templates
    doc.querySelectorAll('.entry-img, .entry-title').forEach((el) => el.remove());

    // 4. Fallback if no images found in HTML
    let finalImages = images;
    if (finalImages.length === 0) {
      finalImages = getFallbackHighlights(event || null);
    }

    return {
      cleanedHtml: doc.body.innerHTML,
      galleryImages: finalImages
    };
  } catch {
    const fallback = getFallbackHighlights(event || null);
    return {
      cleanedHtml: html,
      galleryImages: fallback.length > 0 ? fallback : []
    };
  }
};

export const EventSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [recentEvents, setRecentEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (id) {
      getEventById(id)
        .then((data) => {
          if (isMounted) setEvent(data);
        })
        .catch((err) => {
          console.error('Error loading event detail:', err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    // Load recent posts for sidebar
    getEvents()
      .then((all) => {
        if (isMounted) {
          setRecentEvents(all.filter((e) => String(e.id) !== String(id)).slice(0, 5));
        }
      })
      .catch((err) => {
        console.error('Error loading recent events:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Parse body text and extract gallery images
  const { cleanedHtml, galleryImages } = useMemo(() => {
    if (!event) return { cleanedHtml: '', galleryImages: [] };
    return parseEventContent(event.content || event.abstract || '', event.imageUrl, event);
  }, [event]);

  // Reading progress scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const cardHeight = card.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolled = window.scrollY - (card.offsetTop || 0);
      const totalScrollable = cardHeight - windowHeight;

      if (totalScrollable > 0) {
        const progress = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, galleryImages.length]);

  return (
    <div className="font-['Inter',sans-serif] bg-[#f8fafc] min-h-screen">
      {/* 1. Synchronized Header Banner */}
      <section className="relative bg-gradient-to-r from-[#001f4a] via-[#003d8f] to-[#001540] py-14 sm:py-20 text-white overflow-hidden">
        {/* Glow circle */}
        <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-white/[0.04] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-3xl text-left" data-aos="fade-right">
              <span className="inline-block bg-white/15 border border-white/30 text-white text-[0.75rem] font-extrabold uppercase tracking-[2.5px] px-4 py-1.5 rounded-md mb-3 backdrop-blur-sm">
                Events
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-black text-white leading-tight mb-0 tracking-tight drop-shadow">
                {event?.title || 'Events'}
              </h1>
            </div>

            <div className="self-start md:self-center" data-aos="fade-left">
              <nav className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-xs sm:text-sm border border-white/15">
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <Link to="/events" className="text-white/80 hover:text-white transition-colors">
                  Events
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-white font-bold">Article</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Elevated Article Card */}
      <section className="relative z-10 pb-20 sm:pb-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={cardRef}
            data-aos="fade-up"
            className="relative bg-white rounded-[20px] shadow-[0_30px_80px_rgba(0,31,74,0.12)] border border-[#001f4a]/5 overflow-hidden -mt-8 sm:-mt-10"
          >
            {/* Reading Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-black/5 z-20">
              <div 
                className="h-full bg-[#003d8f] transition-all duration-100 ease-out" 
                style={{ width: `${scrollProgress}%` }} 
              />
            </div>

            {/* Inner Content */}
            <div className="p-4 sm:p-8 lg:p-14">
              {/* Meta Info Row */}
              <div className="flex items-center flex-wrap gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 bg-[#f0f6ff] text-[#003d8f] text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-1.5 rounded-md">
                  <CalendarCheck className="w-4 h-4 text-[#003d8f]" />
                  <span>{event?.publishedDate || 'March 17, 2026'}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm font-medium">
                  <Clock className="w-4 h-4 text-[#003d8f]" />
                  <span>4 min read</span>
                </div>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14">
                {/* Left: Article Body */}
                <div className="lg:col-span-2">
                  {loading ? (
                    <div className="py-20 text-center">
                      <div className="w-10 h-10 border-4 border-[#003d8f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">Loading article content...</p>
                    </div>
                  ) : event ? (
                    <div className="space-y-6">
                      {/* Hero Image if available */}
                      {event.imageUrl && (
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 mb-6 bg-slate-100 max-h-[380px]">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full max-h-[380px] object-cover object-top block"
                          />
                        </div>
                      )}

                      {/* Content Body with modern callout and typography */}
                      <div 
                        className="event-article-content text-slate-700 text-base sm:text-[1.05rem] leading-[1.85] text-justify space-y-4 max-w-none"
                        dangerouslySetInnerHTML={{ __html: cleanedHtml || event.abstract || '' }}
                      />

                      {/* 📷 Highlights Photo Gallery (2-column on mobile, 3-column on tablet/desktop) */}
                      {galleryImages.length > 0 && (
                        <div className="pt-6 sm:pt-8 mt-8 sm:mt-10 border-t border-slate-200">
                          {/* Highlights Header */}
                          <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
                            <span className="text-xl sm:text-2xl" role="img" aria-label="camera">📷</span>
                            <h3 className="text-lg sm:text-2xl font-black text-[#001f4a] tracking-tight m-0">
                              {getHighlightsTitle(event.title)}
                            </h3>
                          </div>

                          {/* 2 columns on Mobile, 3 columns on Desktop */}
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
                            {galleryImages.map((imgSrc, idx) => (
                              <div
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className="group relative bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/90 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                              >
                                <div className="aspect-square sm:aspect-square md:aspect-[4/5] overflow-hidden bg-slate-200">
                                  <img
                                    src={imgSrc}
                                    alt={`Event highlight ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                                {/* Zoom Icon Overlay */}
                                <div className="absolute inset-0 bg-[#001f4a]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                  <div className="bg-white/95 text-[#001f4a] p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
                                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trust Tagline Banner matching mobile mockup */}
                      <div className="mt-8 sm:mt-10 bg-[#001f4a] rounded-xl sm:rounded-2xl p-5 sm:p-7 text-center shadow-md border border-[#003d8f]/30">
                        <h4 className="text-base sm:text-xl font-extrabold text-white tracking-tight m-0">
                          A Legacy of Trust. A New Destination.
                        </h4>
                      </div>

                      {/* Back Button */}
                      <div className="pt-6 sm:pt-8 mt-8 sm:mt-10 border-t border-slate-200">
                        <Link
                          to="/events"
                          className="inline-flex items-center gap-2 bg-[#003d8f] hover:bg-[#002060] text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Events</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
                      <h4 className="text-lg font-bold text-[#002060] mb-2">Event Not Found</h4>
                      <p className="text-sm text-slate-500 mb-6">The requested event could not be found or has been removed.</p>
                      <Link
                        to="/events"
                        className="inline-flex items-center gap-2 bg-[#003d8f] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Events</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Right: Sidebar */}
                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-200 pt-8 lg:pt-0 lg:pl-10">
                  <div className="sticky top-28">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#001f4a] uppercase tracking-[1px] flex items-center gap-2.5 mb-6">
                      <Newspaper className="w-5 h-5 text-[#003d8f]" />
                      <span>Recent Posts</span>
                    </h3>

                    {recentEvents.length > 0 ? (
                      <div className="space-y-5 divide-y divide-slate-100">
                        {recentEvents.map((r, idx) => (
                          <div 
                            key={idx} 
                            className={`flex items-center gap-3.5 group ${idx > 0 ? 'pt-5' : ''}`}
                          >
                            <div className="w-[75px] h-[75px] rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-200/60">
                              <img
                                src={r.imageUrl || '/Image/News4.jpg'}
                                alt={r.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#002060] leading-snug line-clamp-2 transition-colors m-0">
                                <Link to={`/events/${r.id}`}>
                                  {r.title}
                                </Link>
                              </h4>
                              <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#003d8f] block mt-1">
                                {r.publishedDate || 'Latest Update'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No other recent posts at this moment.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lightbox Modal for Full Screen Image Preview */}
      {activeImageIndex !== null && galleryImages[activeImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all z-10 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[activeImageIndex]}
              alt={`Highlight ${activeImageIndex + 1}`}
              className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              {activeImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
