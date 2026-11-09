import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { getEvents, type EventItem } from '../services/api';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getEvents()
      .then((data) => {
        if (isMounted) {
          setEvents(data);
        }
      })
      .catch((err) => {
        console.error('Error loading events:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredEvent = events.length > 0 ? events[0] : null;
  const remainingEvents = events.length > 1 ? events.slice(1) : [];

  return (
    <div className="font-['Inter',sans-serif] bg-[#f8fbff] min-h-screen">
      {/* 1. Premium Page Header Banner */}
      <section className="relative bg-[#001f4a] py-14 sm:py-16 text-white overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-[8px] contrast-125 scale-110 z-0"
          style={{ backgroundImage: `url('/Image/News4.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d8f]/90 via-[#002d78]/85 to-[#001f4a]/95 z-0" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-left" data-aos="fade-right">
              <span className="inline-block bg-white/12 border border-white/25 text-white/90 text-[0.72rem] font-bold uppercase tracking-[2.5px] px-4 py-1.5 rounded-full mb-3">
                Events
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.5px] text-white leading-tight mb-3">
                Events
              </h1>
              <p className="text-sm sm:text-base lg:text-[0.97rem] text-white/80 leading-relaxed max-w-lg m-0">
                Explore our branch openings, dealer meetings, and community events.
              </p>
            </div>

            <div className="self-start md:self-center" data-aos="fade-left">
              <nav className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm border border-white/20">
                <Link to="/" className="text-white/85 hover:text-white transition-colors font-semibold">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <span className="text-white font-bold">Events</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Blog Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-[#003d8f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium text-sm">Loading events from database...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              {/* Featured Post Hero (Index 0) */}
              {featuredEvent && (
                <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
                  <Link
                    to={`/events/${featuredEvent.id}`}
                    data-aos="zoom-in"
                    className="group block relative rounded-[20px] overflow-hidden h-[260px] sm:h-[340px] md:h-[380px] shadow-[0_20px_50px_rgba(0,31,74,0.12)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={featuredEvent.imageUrl || '/Image/News4.jpg'}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a1f]/95 via-[#000a1f]/40 via-40% to-transparent flex flex-col justify-end p-5 sm:p-7 md:p-8">
                      <span className="inline-block bg-[#003d8f] text-white text-[0.65rem] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full w-fit mb-2">
                        Featured Event
                      </span>
                      <h2 className="text-lg sm:text-2xl md:text-[1.65rem] font-extrabold text-white leading-snug mb-2 max-w-2xl drop-shadow">
                        {featuredEvent.title}
                      </h2>
                      {featuredEvent.abstract && (
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-xl mb-3 line-clamp-2 drop-shadow-sm">
                          {featuredEvent.abstract}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-1.5 bg-[#003d8f] group-hover:bg-white text-white group-hover:text-[#001f4a] font-bold text-xs sm:text-sm px-5 py-2 rounded-full w-fit transition-all duration-300 shadow">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Latest Events Section Title */}
              {remainingEvents.length > 0 && (
                <div className="flex items-center mb-6 sm:mb-8" data-aos="fade-right">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#002060] m-0 tracking-tight whitespace-nowrap">
                    Latest Events
                  </h3>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#003d8f] to-transparent ml-5" />
                </div>
              )}

              {/* Regular Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {remainingEvents.map((item, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={(idx % 3) * 100}
                    className="group bg-white rounded-[18px] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-[#eee] hover:border-[#003d8f]/15 hover:shadow-[0_20px_45px_rgba(0,61,143,0.1)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Box - framed with object-top so full top subject is visible */}
                      <div className="relative h-[190px] sm:h-[200px] overflow-hidden bg-slate-100">
                        <img
                          src={item.imageUrl || '/Image/News4.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-104"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-col">
                        <div className="flex items-center flex-wrap gap-2 mb-2.5">
                          <span className="text-[0.72rem] font-bold uppercase tracking-[1px] text-[#003d8f]">
                            {item.category || 'Event'}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-[#f0f6ff] text-[#003d8f] text-[0.7rem] font-bold px-2 py-0.5 rounded-full">
                            <Calendar className="w-3 h-3 text-[#003d8f]" />
                            <span>{item.publishedDate || '2024'}</span>
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-[#002060] group-hover:text-[#003d8f] mb-2.5 leading-snug tracking-tight transition-colors line-clamp-2">
                          <Link to={`/events/${item.id}`} className="hover:underline">
                            {item.title}
                          </Link>
                        </h4>

                        {item.abstract && (
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                            {item.abstract}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <Link
                        to={`/events/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#003d8f] hover:text-[#002060] transition-colors"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
              <Sparkles className="w-12 h-12 text-[#003d8f]/30 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-[#002060] mb-2">No Events Found</h3>
              <p className="text-sm text-slate-500 mb-0">
                Check back soon for upcoming corporate events, dealer meetings, and community initiatives.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
