import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '../services/publicService';
import { Search, BookOpen, Users, Calendar, Sparkles, ShieldCheck, ArrowRight, Award, Star, Target, GraduationCap, Microscope, Laptop, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function LandingPage() {
  const { data: statsData } = useQuery({
    queryKey: ['public-stats'],
    queryFn: publicService.getPublicStats,
    refetchInterval: 5000, // Real-time polling every 5s
  });

  const stats = statsData?.data;

  const serviceOfferings = [
    {
      badge: '🎓 Guest Lectures & Keynotes',
      title: 'College Seminars & Keynotes',
      desc: 'Invite top IIT professors, Google staff engineers, and industry leaders to deliver inspiring keynotes and technical talks.',
      filter: 'GUEST_LECTURE',
      accent: 'border-[#b58153]/50',
      icon: <GraduationCap size={28} className="text-[#ffebbf]" />,
    },
    {
      badge: '🎯 1-on-1 Mentorship',
      title: 'Career & Higher-Ed Mentors',
      desc: 'Get personalized 1-on-1 guidance on career roadmaps, resume audits, mock technical interviews, and Ph.D./MS applications.',
      filter: 'MENTORSHIP',
      accent: 'border-emerald-500/50',
      icon: <Target size={28} className="text-emerald-400" />,
    },
    {
      badge: '📖 Personal Tutoring',
      title: 'Coursework & Exam Prep Tutors',
      desc: 'Dedicated 1-on-1 subject tuition for university courses, semester exam preparation, lab assignments, and competitive exams.',
      filter: 'PERSONAL_TUTOR',
      accent: 'border-sky-500/50',
      icon: <BookOpen size={28} className="text-sky-400" />,
    },
    {
      badge: '🔬 Research & Paper Guidance',
      title: 'Thesis & Publication Advisors',
      desc: 'Work directly with published researchers for journal paper writing, IEEE thesis reviews, and research methodology mentoring.',
      filter: 'RESEARCH_ADVISOR',
      accent: 'border-purple-500/50',
      icon: <Microscope size={28} className="text-purple-400" />,
    },
    {
      badge: '💻 Workshops & Bootcamps',
      title: 'Hands-on Technical Bootcamps',
      desc: 'Multi-day practical coding bootcamps, VLSI chip design labs, cybersecurity hackathons, and enterprise training.',
      filter: 'WORKSHOP_TRAINER',
      accent: 'border-amber-500/50',
      icon: <Laptop size={28} className="text-amber-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans selection:bg-[#0a2540] selection:text-[#ffebbf] overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
        
        {/* Ambient Glow Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#0a2540]/50 via-[#0a2540]/20 to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#b58153]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-[#ffebbf]/10 rounded-full blur-[130px] pointer-events-none animate-pulse-slow"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/80 border border-[#b58153]/40 text-[#ffebbf] text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-[0_0_20px_rgba(181,129,83,0.2)]">
            <Sparkles size={14} className="text-[#ffebbf] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Never Settle For Ordinary Learning</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-display text-white mb-6 animate-slide-up leading-[1.1] tracking-tight">
            Book Elite <span className="text-gold-shiny drop-shadow-[0_10px_20px_rgba(181,129,83,0.4)]">Lecturers, Mentors & Personal Tutors</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-in font-normal leading-relaxed">
            Connect directly with verified professors, research guides, 1-on-1 mentors, and personal tutors across India.
          </p>

          {/* Service Role Quick Nav Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {serviceOfferings.map((srv) => (
              <Link key={srv.filter} to={`/experts?service=${srv.filter}`}>
                <span className="px-4 py-2 bg-[#0a2540] hover:bg-[#b58153] text-white hover:text-[#010101] border border-[#b58153]/40 text-xs font-extrabold rounded-full transition-all duration-200 shadow-md flex items-center gap-1.5">
                  {srv.badge}
                </span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-[#090e18]/95 border border-[#0a2540] hover:border-[#b58153]/70 p-2.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center gap-3 mb-10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(181,129,83,0.3)]">
            <div className="flex items-center w-full px-3 py-1">
              <Search className="text-[#ffebbf] shrink-0 mr-3" size={24} />
              <input 
                type="text" 
                placeholder="What topic do you want to learn? (e.g. AI/ML, Personal Tutoring, Mentorship)"
                className="w-full !bg-transparent border-none focus:ring-0 text-base md:text-lg text-white placeholder:text-slate-400 outline-none shadow-none"
              />
            </div>
            <Link to="/experts" className="w-full sm:w-auto shrink-0">
              <Button size="lg" variant="primary" className="w-full sm:w-auto rounded-xl px-8 py-3.5 text-base font-black shadow-ns-gold">
                Search Directory
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Offerings Section */}
      <div className="py-20 bg-[#090e18] border-y border-[#0a2540] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3.5 py-1 bg-[#0a2540] border border-[#b58153]/40 text-[#ffebbf] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              Complete Educational Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-4">
              Tailored Offerings For <span className="text-gold-shiny">Every Learner</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto font-normal">
              Whether you are an institution booking keynotes, or a student seeking personal tutoring and career mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceOfferings.map((srv, idx) => (
              <div
                key={idx}
                className={`glass-card p-6 border ${srv.accent} bg-[#010101] hover:bg-[#090e18] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#0a2540] rounded-xl border border-[#b58153]/30 group-hover:scale-110 transition-transform">
                      {srv.icon}
                    </div>
                    <span className="text-xs font-black text-[#ffebbf] uppercase tracking-wider bg-[#0a2540] px-2.5 py-1 rounded-md">
                      Verified
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-[#ffebbf] transition-colors mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <Link
                  to={`/experts?service=${srv.filter}`}
                  className="btn-secondary w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-[#0a2540] group-hover:text-[#ffebbf]"
                >
                  Explore Experts <ArrowRight size={14} />
                </Link>
              </div>
            ))}

            {/* Trust Guarantee Card */}
            <div className="glass-card-premium p-6 border border-[#b58153]/50 bg-gradient-to-br from-[#0a2540] to-[#090e18] flex flex-col justify-between">
              <div>
                <div className="p-3 bg-[#ffebbf] text-[#010101] rounded-xl font-bold w-fit mb-4">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold font-display text-[#ffebbf] mb-2">
                  LinkedIn & Escrow Protected
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Every mentor and personal tutor is verified via institutional ID and LinkedIn. Payments are protected in Escrow until completion.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Direct 1-on-1 Video Link</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Instant Counter-Offer Option</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Flexible Hourly & Session Rates</li>
                </ul>
              </div>
              <Link to="/register" className="mt-6">
                <Button variant="primary" className="w-full text-xs py-2.5 font-bold uppercase">
                  Become a Mentor / Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Platform Stats Bar */}
      <div className="bg-[#090e18] py-16 border-b border-[#0a2540] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="glass-card-premium p-6 text-center group border border-[#b58153]/30 hover:border-[#ffebbf] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0a2540] border border-[#b58153]/40 flex items-center justify-center text-[#ffebbf] mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Users size={24} />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-gold-shiny mb-1">
                {(stats?.totalStudents ?? 0).toLocaleString()}
              </div>
              <div className="text-slate-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Active Registered Students
              </div>
            </div>

            <div className="glass-card-premium p-6 text-center group border border-[#b58153]/30 hover:border-[#ffebbf] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0a2540] border border-[#b58153]/40 flex items-center justify-center text-[#ffebbf] mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                <ShieldCheck size={24} />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#ffebbf] mb-1">
                {(stats?.totalVerifiedExperts ?? 0).toLocaleString()}
              </div>
              <div className="text-slate-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Mentors & Tutors in System
              </div>
            </div>

            <div className="glass-card-premium p-6 text-center group border border-[#b58153]/30 hover:border-[#ffebbf] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0a2540] border border-[#b58153]/40 flex items-center justify-center text-[#ffebbf] mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Award size={24} />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-gold-shiny mb-1">
                {(stats?.totalInstitutions ?? 0).toLocaleString()}
              </div>
              <div className="text-slate-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Partner Colleges & Institutions
              </div>
            </div>

            <div className="glass-card-premium p-6 text-center group border border-[#b58153]/30 hover:border-[#ffebbf] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0a2540] border border-[#b58153]/40 flex items-center justify-center text-[#ffebbf] mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Star size={24} />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#ffebbf] mb-1">
                {stats?.averageRating ? `${stats.averageRating.toFixed(1)} / 5` : '5.0 / 5'}
              </div>
              <div className="text-slate-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Live Average Rating
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#090e18] text-white py-24 relative overflow-hidden border-t border-[#0a2540]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0a2540]/60 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-display mb-6 tracking-tight">
            Ready to Accelerate <span className="text-gold-shiny">Your Learning Journey?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students, educators, and 1-on-1 mentors connecting across India today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/experts">
              <Button size="lg" variant="primary" className="px-8 text-base shadow-ns-gold">
                Find a Mentor / Tutor <ArrowRight size={18} className="ml-2 inline" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 text-base">
                Apply as a Mentor / Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
