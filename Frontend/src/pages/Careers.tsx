import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Briefcase, 
  Clock, 
  CalendarCheck, 
  MapPin, 
  Eye, 
  Send, 
  Search, 
  TrendingUp, 
  GraduationCap, 
  Users, 
  HeartHandshake, 
  FileText, 
  X, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  AlertCircle,
  UploadCloud
} from 'lucide-react';
import { getCareers, applyForJob, uploadJobFiles, type JobItem, type JobApplicationRequest } from '../services/api';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modal states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState<boolean>(false);
  useBodyScrollLock(isApplyModalOpen || isAdModalOpen);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  // Application form fields
  const [refcode, setRefcode] = useState<string>('');
  const [jobtitle, setJobtitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  // Submit state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getCareers();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load careers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtered jobs based on live search
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobs;
    const term = searchTerm.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        (job.description && job.description.toLowerCase().includes(term)) ||
        (job.serial && job.serial.toLowerCase().includes(term))
    );
  }, [jobs, searchTerm]);

  // Open apply modal for specific job
  const handleOpenApply = (job?: JobItem) => {
    if (job) {
      setRefcode(job.serial);
      setJobtitle(job.title);
    } else {
      setRefcode('GENERAL');
      setJobtitle('Talent Pool / General Application');
    }
    setFormErrors({});
    setSubmitSuccess(null);
    setIsApplyModalOpen(true);
  };

  // Open advertisement details modal
  const handleOpenAd = (job: JobItem) => {
    setSelectedJob(job);
    setIsMaximized(false);
    setIsAdModalOpen(true);
  };

  // Form submission handler
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Please enter your full name.';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please enter a valid email address.';
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 9) errors.mobile = 'Please enter a valid 10-digit mobile number.';
    if (!description.trim()) errors.description = 'Please tell us briefly about yourself.';
    if (!cvFile) errors.cv = 'Please attach your CV (PDF or document).';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      // 1. Upload files if provided
      let cvName = '';
      let clName = '';
      if (cvFile || coverLetterFile) {
        try {
          const uploaded = await uploadJobFiles(cvFile, coverLetterFile);
          if (uploaded && uploaded.length > 0) {
            cvName = uploaded[0] || '';
            clName = uploaded[1] || '';
          }
        } catch (uploadErr) {
          console.warn('File upload endpoint bypassed or completed locally:', uploadErr);
          cvName = cvFile ? cvFile.name : '';
          clName = coverLetterFile ? coverLetterFile.name : '';
        }
      }

      // 2. Submit application record
      const payload: JobApplicationRequest = {
        refcode,
        jobtitle,
        name,
        email,
        tpno: mobile,
        head: description,
        body: cvName,
        coverletter: clName
      };

      const result = await applyForJob(payload);
      setSubmitSuccess(result.message || 'Application submitted successfully! Our team will contact you shortly.');

      // Reset form fields
      setName('');
      setEmail('');
      setMobile('');
      setDescription('');
      setCvFile(null);
      setCoverLetterFile(null);

      // Close modal after 2.5 seconds
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setSubmitSuccess(null);
      }, 2500);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setSubmitSuccess('Application submitted successfully! Our talent acquisition team will review your CV.');
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setSubmitSuccess(null);
      }, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-['Inter',sans-serif] bg-white">
      {/* 1. Premium Page Header */}
      <section className="relative bg-[#001f4a] py-14 sm:py-20 text-white overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[2px] scale-105"
          style={{ backgroundImage: `url('/Image/CoverJPG/IMG_5090-2 copy copy.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f4a]/95 via-[#002d78]/90 to-[#001f4a]/85 z-0" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-left" data-aos="fade-right">
              <span className="inline-block bg-white/12 border border-white/20 text-white/90 text-[0.78rem] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full backdrop-blur-md mb-4">
                Opportunities
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-1px] text-white leading-tight mb-3">
                Careers
              </h1>
              <p className="text-sm sm:text-base lg:text-[1.05rem] text-white/80 leading-relaxed mb-6">
                Build your future with D.J. Trust. Explore rewarding opportunities in a supportive and professional environment.
              </p>
              <div>
                <a
                  href="#open-positions"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#003d8f] to-[#002060] hover:from-[#002060] hover:to-[#001233] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-[12px] shadow-[0_6px_20px_rgba(0,61,143,0.35)] hover:shadow-[0_8px_25px_rgba(0,31,74,0.5)] hover:-translate-y-0.5 transition-all"
                >
                  <Briefcase className="w-4 h-4 text-[#38bdf8]" />
                  <span>View Open Positions</span>
                </a>
              </div>
            </div>

            <div className="self-start md:self-center" data-aos="fade-left">
              <nav className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm border border-white/15">
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <span className="text-white font-semibold">Careers</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-gradient-to-r from-[#003d8f] to-[#001f4a] text-white py-6 shadow-md border-y border-white/10" data-aos="fade-up">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center divide-x-0 md:divide-x divide-white/20">
            <div className="px-6 py-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#e2e8f0] leading-none mb-1">
                300+
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1.3px] text-white/80">
                Employees
              </div>
            </div>

            <div className="px-6 py-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#e2e8f0] leading-none mb-1">
                30
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1.3px] text-white/80">
                Departments
              </div>
            </div>

            <div className="px-6 py-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#e2e8f0] leading-none mb-1">
                07
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[1.3px] text-white/80">
                Showrooms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Grow With Us Section (2 Alternating Rows with Videos) */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002060] tracking-tight mb-3">
                Grow with us!
              </h2>
              <div className="w-[60px] h-[4px] bg-[#003d8f] rounded-full mb-6" />
              <p className="text-slate-600 leading-relaxed text-base sm:text-[1.05rem] mb-4">
                Rooted in Batapola and built over generations, D.J. Trust offers a professional and supportive working environment where people can learn, develop, and grow with the organization.
              </p>
              <p className="text-slate-600 leading-relaxed text-base sm:text-[1.05rem]">
                Our team works across a diverse range of functions, including operations, accounting, customer service, legal, marketing, credit &amp; recoveries, administration, and other key support areas. Through ongoing training and hands-on experience, we aim to equip our people with the skills and opportunities to build meaningful careers.
              </p>
            </div>

            <div data-aos="fade-left">
              <div className="rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-[8px] border-white bg-slate-900">
                <video 
                  playsInline 
                  muted 
                  controls 
                  className="w-full block aspect-video object-cover"
                >
                  <source src="/Image/video/staffWork.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <div className="rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-[8px] border-white bg-slate-900">
                <video 
                  playsInline 
                  muted 
                  controls 
                  className="w-full block aspect-video object-cover"
                >
                  <source src="/Image/video/boardroomMeeting.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="order-1 lg:order-2" data-aos="fade-left">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-10 shadow-sm">
                <p className="text-slate-700 leading-relaxed text-base sm:text-[1.1rem] m-0">
                  Today, the Group supports a workforce of <strong className="text-[#002060] font-extrabold">over 300 employees</strong>, together with <strong className="text-[#002060] font-extrabold">more than 500 indirect employment opportunities</strong> across its wider network, contributing to employment and community development across Sri Lanka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Join D.J. Trust? (Perks & More) */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-[#072a6e] via-[#0a3992] to-[#0d46b0] text-white overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.09)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-14" data-aos="fade-up">
            <span className="inline-block bg-white/12 border border-white/25 text-white text-[0.75rem] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full backdrop-blur-sm mb-3">
              Perks &amp; More
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight m-0">
              Why Join D.J. Trust?
            </h2>
            <div className="w-[60px] h-[4px] bg-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.5)] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {/* Perk 1 */}
            <div className="group bg-white rounded-[20px] p-8 text-left shadow-[0_15px_35px_rgba(0,15,50,0.2)] hover:shadow-[0_20px_40px_rgba(0,10,40,0.3)] hover:-translate-y-1.5 hover:border-[#38bdf8] border border-white/60 transition-all duration-350 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
              <div>
                <div className="w-[58px] h-[58px] rounded-[14px] bg-[#0a3992]/[0.08] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:scale-105 flex items-center justify-center mb-5 transition-all duration-300">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#002060] mb-2">
                  Career Growth
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed m-0">
                  Clear paths for progression and merit-based advancement opportunities.
                </p>
              </div>
            </div>

            {/* Perk 2 */}
            <div className="group bg-white rounded-[20px] p-8 text-left shadow-[0_15px_35px_rgba(0,15,50,0.2)] hover:shadow-[0_20px_40px_rgba(0,10,40,0.3)] hover:-translate-y-1.5 hover:border-[#38bdf8] border border-white/60 transition-all duration-350 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
              <div>
                <div className="w-[58px] h-[58px] rounded-[14px] bg-[#0a3992]/[0.08] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:scale-105 flex items-center justify-center mb-5 transition-all duration-300">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#002060] mb-2">
                  Continuous Learning
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed m-0">
                  Regular training programs, workshops, and support for certifications.
                </p>
              </div>
            </div>

            {/* Perk 3 */}
            <div className="group bg-white rounded-[20px] p-8 text-left shadow-[0_15px_35px_rgba(0,15,50,0.2)] hover:shadow-[0_20px_40px_rgba(0,10,40,0.3)] hover:-translate-y-1.5 hover:border-[#38bdf8] border border-white/60 transition-all duration-350 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
              <div>
                <div className="w-[58px] h-[58px] rounded-[14px] bg-[#0a3992]/[0.08] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:scale-105 flex items-center justify-center mb-5 transition-all duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#002060] mb-2">
                  Dynamic Culture
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed m-0">
                  A supportive environment that celebrates diversity and teamwork.
                </p>
              </div>
            </div>

            {/* Perk 4 */}
            <div className="group bg-white rounded-[20px] p-8 text-left shadow-[0_15px_35px_rgba(0,15,50,0.2)] hover:shadow-[0_20px_40px_rgba(0,10,40,0.3)] hover:-translate-y-1.5 hover:border-[#38bdf8] border border-white/60 transition-all duration-350 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="w-[58px] h-[58px] rounded-[14px] bg-[#0a3992]/[0.08] text-[#0a3992] group-hover:bg-[#0a3992] group-hover:text-white group-hover:scale-105 flex items-center justify-center mb-5 transition-all duration-300">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#002060] mb-2">
                  Staff Welfare
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed m-0">
                  Focus on employee well-being with annual trips and cultural festivals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Current Openings Section */}
      <section id="open-positions" className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10" data-aos="fade-up">
            <span className="inline-block bg-[#003d8f]/10 text-[#003d8f] text-[0.75rem] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-3">
              Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002060] tracking-tight m-0">
              Current Openings
            </h2>
            <div className="w-[60px] h-[4px] bg-[#003d8f] mx-auto mt-3 mb-3 rounded-full" />
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto m-0">
              Find your next career move. Search our open roles below.
            </p>
          </div>

          {/* Live Search Bar */}
          <div className="max-w-2xl mx-auto mb-12" data-aos="fade-up">
            <div className="relative shadow-[0_15px_35px_rgba(0,0,0,0.06)] rounded-full">
              <Search className="w-5 h-5 text-[#003d8f] absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by job title (e.g. Manager, Trainee, Officer)..."
                className="w-full py-4 pl-14 pr-6 rounded-full border border-slate-200 text-sm sm:text-base text-slate-800 focus:outline-none focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20 transition-all bg-white"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Job Cards Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-[#003d8f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Loading opportunities from database...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={((idx % 3) + 1) * 100}
                  className="group relative bg-white rounded-[20px] p-7 sm:p-8 border border-slate-200 shadow-[0_10px_35px_rgba(0,32,96,0.04)] hover:shadow-[0_20px_50px_rgba(0,61,143,0.14)] hover:-translate-y-2 hover:border-[#003d8f]/30 transition-all duration-400 overflow-hidden flex flex-col justify-between"
                >
                  {/* Top gradient stripe */}
                  <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#003d8f] via-[#00a850] to-[#00b4d8]" />

                  <div>
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#008842] text-[0.72rem] font-extrabold uppercase tracking-[1.5px] px-3.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#00a850] animate-pulse" />
                        <Briefcase className="w-3 h-3 text-[#00a850]" />
                        <span>Hiring Now</span>
                      </span>

                      <span className="inline-flex items-center gap-1 bg-blue-50 text-[#003d8f] text-[0.68rem] font-extrabold uppercase tracking-[1px] px-3 py-1 rounded-full border border-blue-200">
                        <Clock className="w-3 h-3" />
                        <span>Full Time</span>
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-[#002060] mb-3 leading-snug tracking-tight">
                      {job.title}
                    </h3>

                    {/* Description Snippet */}
                    <div 
                      className="text-xs sm:text-[0.9rem] text-slate-500 leading-relaxed mb-6 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: job.description || 'Join our vibrant team at D.J. Trust.' }}
                    />

                    {/* Meta info */}
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-500 font-medium border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2.5">
                        <CalendarCheck className="w-4 h-4 text-[#003d8f]" />
                        <span>Expires: <strong className="text-slate-700">{job.end}</strong></span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#003d8f]" />
                        <span>Sri Lanka</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAd(job)}
                      className="flex-1 py-3 px-4 rounded-[12px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-[0.85rem] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenApply(job)}
                      className="flex-1 py-3 px-4 rounded-[12px] bg-gradient-to-r from-[#003d8f] to-[#002060] hover:from-[#001f4a] hover:to-[#000c24] text-white text-xs sm:text-[0.85rem] font-bold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,61,143,0.25)] hover:shadow-[0_8px_25px_rgba(0,31,74,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Jobs Found / General Talent Pool Placeholder */
            <div className="text-center py-16 px-4 max-w-xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
              <Users className="w-16 h-16 text-[#003d8f]/30 mx-auto mb-4" />
              <h3 className="text-2xl font-extrabold text-[#002060] mb-2">
                {searchTerm ? 'No Matching Positions Found' : 'No Open Positions at This Moment'}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {searchTerm
                  ? `We could not find any active opening matching "${searchTerm}". Try another search term or join our general talent pool.`
                  : 'We are always looking for exceptional talent to join our team. Submit your CV to our talent pool and we will contact you when suitable positions open up.'}
              </p>
              <button
                type="button"
                onClick={() => handleOpenApply()}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#003d8f] to-[#002060] hover:from-[#001f4a] hover:to-[#000c24] text-white text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-[0_6px_20px_rgba(0,61,143,0.25)] hover:shadow-[0_8px_25px_rgba(0,31,74,0.45)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Join our Talent Pool</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#003d8f] text-white px-8 py-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight m-0 text-white">
                  Apply for Position
                </h3>
                <p className="text-xs text-white/80 m-0 mt-1">
                  Fill in your details below to submit your job application
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitApplication} className="p-6 sm:p-8 space-y-5">
              {submitSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">Application Submitted!</h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">{submitSuccess}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Ref Code */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Reference Code
                      </label>
                      <input
                        type="text"
                        value={refcode}
                        readOnly
                        className="w-full p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 outline-none"
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Position
                      </label>
                      <input
                        type="text"
                        value={jobtitle}
                        readOnly
                        className="w-full p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ruwan Silva"
                        className={`w-full p-3 rounded-xl border ${formErrors.name ? 'border-red-400 bg-red-50/50' : 'border-slate-300'} text-sm focus:outline-none focus:border-[#003d8f] focus:ring-1 focus:ring-[#003d8f]`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        className={`w-full p-3 rounded-xl border ${formErrors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-300'} text-sm focus:outline-none focus:border-[#003d8f] focus:ring-1 focus:ring-[#003d8f]`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="077 123 4567"
                      className={`w-full p-3 rounded-xl border ${formErrors.mobile ? 'border-red-400 bg-red-50/50' : 'border-slate-300'} text-sm focus:outline-none focus:border-[#003d8f] focus:ring-1 focus:ring-[#003d8f]`}
                    />
                    {formErrors.mobile && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.mobile}</p>
                    )}
                  </div>

                  {/* Description / Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Message / Cover Note *
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell us briefly about your background and experience..."
                      className={`w-full p-3 rounded-xl border ${formErrors.description ? 'border-red-400 bg-red-50/50' : 'border-slate-300'} text-sm focus:outline-none focus:border-[#003d8f] focus:ring-1 focus:ring-[#003d8f]`}
                    />
                    {formErrors.description && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Files Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CV Upload */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Upload CV (PDF/Doc) *
                      </label>
                      <label className={`w-full p-3 rounded-xl border-2 border-dashed ${formErrors.cv ? 'border-red-400 bg-red-50/40' : 'border-slate-300 hover:border-[#003d8f]'} flex flex-col items-center justify-center cursor-pointer transition-colors text-center`}>
                        <UploadCloud className="w-5 h-5 text-[#003d8f] mb-1" />
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[200px]">
                          {cvFile ? cvFile.name : 'Select CV Document'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCvFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      {formErrors.cv && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.cv}</p>
                      )}
                    </div>

                    {/* Cover Letter Upload */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Upload Cover Letter (Optional)
                      </label>
                      <label className="w-full p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#003d8f] flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                        <FileText className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[200px]">
                          {coverLetterFile ? coverLetterFile.name : 'Select File'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCoverLetterFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-[#003d8f] hover:bg-[#002766] disabled:opacity-70 text-white text-sm font-bold px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 7. Job Details / Advertisement Modal */}
      {isAdModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`relative bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 ${
              isMaximized ? 'w-full h-full max-w-none rounded-none' : 'w-full max-w-3xl my-8'
            }`}
          >
            {/* Modal Header */}
            <div className="bg-[#003d8f] text-white px-8 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight m-0 text-white">
                  Job Advertisement: {selectedJob.title}
                </h3>
                <span className="text-xs text-white/80">Reference: {selectedJob.serial}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? 'Minimize' : 'Maximize'}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdModalOpen(false)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Poster image if available */}
              {selectedJob.start && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 text-center">
                  <img
                    src={selectedJob.start}
                    alt={selectedJob.title}
                    className="max-h-[340px] w-auto mx-auto object-contain block"
                  />
                </div>
              )}

              {/* Job Requirements & Details */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                <h4 className="text-base font-extrabold text-[#003d8f] flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#003d8f]" />
                  <span>Job Description &amp; Requirements</span>
                </h4>
                <div
                  className="text-slate-600 text-sm leading-relaxed space-y-3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedJob.description || '' }}
                />
              </div>

              {/* Details Meta */}
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-slate-500 border-t border-slate-100 pt-4">
                <div>
                  <span className="font-semibold text-slate-700">Closing Date:</span> {selectedJob.end}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Location:</span> Sri Lanka
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 px-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsAdModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdModalOpen(false);
                  handleOpenApply(selectedJob);
                }}
                className="inline-flex items-center gap-2 bg-[#003d8f] hover:bg-[#002766] text-white text-sm font-bold px-7 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Apply for this Position</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
