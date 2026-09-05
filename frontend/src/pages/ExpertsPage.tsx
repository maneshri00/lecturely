import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { expertService } from '../services/expertService';
import { ExpertCard } from '../components/ExpertCard';
import { SERVICE_CATEGORIES, SESSION_MODES } from '../utils/constants';
import { Search, Filter, RefreshCw, Award, Linkedin, ShieldCheck, Star, Sparkles } from 'lucide-react';

interface ExpertsPageProps {
  isExpertPortal?: boolean;
}

export const ExpertsPage: React.FC<ExpertsPageProps> = ({ isExpertPortal = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [city, setCity] = useState('');
  const [mode, setMode] = useState('');
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [minRating, setMinRating] = useState<number | undefined>();
  const [maxFee, setMaxFee] = useState<number | undefined>();
  const [linkedinOnly, setLinkedinOnly] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['experts', city, mode, minRating, maxFee],
    queryFn: () => expertService.search({ city, mode, minRating, maxFee, size: 20 }),
  });

  const rawExperts = data?.data?.content || [];

  const experts = rawExperts.filter((e: any) => {
    if (linkedinOnly && !e.linkedinUrl) return false;
    if (selectedService) {
      const offered = e.servicesOffered || ['GUEST_LECTURE', 'MENTORSHIP'];
      if (!offered.includes(selectedService)) return false;
    }
    return true;
  });

  const handleServiceTab = (val: string) => {
    setSelectedService(val);
    if (val) {
      setSearchParams({ service: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-[#ffebbf]" />
            {isExpertPortal ? (
              <span>Find & Hire <span className="text-gold-shiny">Co-Experts & Guest Lecturers</span></span>
            ) : (
              <span>Discover <span className="text-gold-shiny">Mentors, Tutors & Guest Speakers</span></span>
            )}
          </h1>
          <p className="text-slate-300 mt-2 text-base font-normal">
            {isExpertPortal
              ? 'Discover fellow professors, researchers, and domain experts for peer hiring, co-lecturing, and joint workshops.'
              : 'Book 1-on-1 Mentors, Personal Tutors, Research Guides, and Keynote Speakers across India.'}
          </p>
        </div>

        {/* Trust Highlight Pill */}
        <div className="flex items-center gap-2 bg-[#090e18] border border-[#0a2540] px-4 py-2 rounded-xl text-xs text-[#ffebbf] font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% LinkedIn & Escrow Protected
        </div>
      </div>

      {/* Service Category Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <button
          onClick={() => handleServiceTab('')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedService === ''
              ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
              : 'bg-[#090e18] text-slate-300 border border-[#0a2540] hover:border-[#b58153]/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> All Services
        </button>

        {SERVICE_CATEGORIES.map((cat) => {
          const isActive = selectedService === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleServiceTab(cat.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
                  : 'bg-[#090e18] text-slate-300 border border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              {cat.badge}
            </button>
          );
        })}
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center border border-[#0a2540] bg-[#090e18] shadow-2xl">
        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">City</label>
          <input
            type="text"
            placeholder="Search by city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Session Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition"
          >
            <option value="" className="bg-[#090e18] text-white">All Modes</option>
            {SESSION_MODES.map((m) => (
              <option key={m.value} value={m.value} className="bg-[#090e18] text-white">{m.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Min Rating</label>
          <select
            value={minRating || ''}
            onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3.5 py-2.5 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition"
          >
            <option value="" className="bg-[#090e18] text-white">Any Rating</option>
            <option value="4.5" className="bg-[#090e18] text-white">4.5+ ★ (Top Rated)</option>
            <option value="4.0" className="bg-[#090e18] text-white">4.0+ ★</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Max Fee (₹/hr)</label>
          <input
            type="number"
            placeholder="e.g. 8000"
            value={maxFee || ''}
            onChange={(e) => setMaxFee(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3.5 py-2.5 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
          />
        </div>

        {/* LinkedIn Verification Filter Toggle */}
        <div className="flex flex-col justify-end">
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" /> Verification
          </label>
          <button
            type="button"
            onClick={() => setLinkedinOnly(!linkedinOnly)}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              linkedinOnly
                ? 'bg-[#0077b5] text-white border-[#0077b5] shadow-lg'
                : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#0077b5]/50'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 fill-current" />
            {linkedinOnly ? 'LinkedIn Verified ✓' : 'Filter LinkedIn'}
          </button>
        </div>

        <div className="flex items-end h-full pt-4 sm:pt-0">
          <button
            onClick={() => { setCity(''); setMode(''); setMinRating(undefined); setMaxFee(undefined); setLinkedinOnly(false); handleServiceTab(''); }}
            className="btn-secondary w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Expert Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : experts.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 sm:p-12 border border-[#0a2540] max-w-2xl mx-auto">
          <Award className="w-16 h-16 text-[#ffebbf] mx-auto mb-4" />
          <h3 className="text-2xl font-black font-display text-white">No Registered Teachers Found Yet</h3>
          <p className="text-slate-300 text-sm mt-2 font-medium max-w-md mx-auto">
            Only real teachers who register and log in will be listed here. When a teacher signs up, their profile will automatically appear in this directory!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="/register"
              className="btn-primary px-6 py-3 text-xs font-black uppercase tracking-wider shadow-ns-gold"
            >
              Register as a Teacher / Expert
            </a>
            <a
              href="/student/requirements/create"
              className="btn-secondary px-6 py-3 text-xs font-bold uppercase tracking-wider"
            >
              Post Session Requirement
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert: any) => (
            <ExpertCard key={expert.id} expert={expert} isExpertPortal={isExpertPortal} selectedService={selectedService} />
          ))}
        </div>
      )}
    </div>
  );
};
