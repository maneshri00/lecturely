import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#010101] text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-widest bg-[#0a2540] border border-[#b58153]/40 px-3.5 py-1.5 rounded-full inline-block mb-3">About Us</span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Bridging Industry & Academia <span className="text-gold-gradient">Across India</span></h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            Lecturely India empowers colleges, universities, and student committees to connect directly with premier experts, professors, and industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#090e18] p-8 rounded-2xl border border-[#0a2540] shadow-ns-card hover:border-[#b58153]/50 transition-all">
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              To democratize access to world-class guest lectures, practical workshops, and mentoring sessions for every engineering, management, and science student in India regardless of location.
            </p>
          </div>

          <div className="bg-[#090e18] p-8 rounded-2xl border border-[#0a2540] shadow-ns-card hover:border-[#b58153]/50 transition-all">
            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Becoming India's largest and most trusted network for knowledge dissemination, industry-academic collaboration, and career guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
