import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { MessageSquare, Star } from 'lucide-react';
import { formatDate } from '../../utils';

export const AdminFeedbackPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-feedback'],
    queryFn: () => adminService.getFeedback(),
  });

  const rawFeedback = (data as any)?.data;
  const feedbackList = Array.isArray(rawFeedback) ? rawFeedback : (rawFeedback?.content || []);

  const filtered = filter === 'ALL'
    ? feedbackList
    : feedbackList.filter((fb: any) => fb.category === filter);

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-black font-display text-white">Platform Feedback & Reviews</h1>
        <p className="text-[#ffebbf] text-sm mt-1 font-medium">User suggestions, bug reports, and platform experience ratings.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#010101] p-1.5 rounded-xl border border-[#0a2540] gap-1 w-fit">
        {['ALL', 'GENERAL', 'BUG_REPORT', 'FEATURE_REQUEST', 'COMPLAINT'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              filter === tab
                ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-28 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <MessageSquare className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No feedback submissions</h3>
          <p className="text-slate-400 text-sm mt-1">No feedback entries under "{filter}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((fb: any) => (
            <div key={fb.id} className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-base">{fb.name || 'Anonymous User'}</h3>
                  <p className="text-xs text-slate-400">{fb.email}</p>
                </div>
                <div className="flex items-center text-[#ffebbf] text-xs font-bold bg-[#010101] px-2.5 py-1 rounded-full border border-[#0a2540]">
                  <Star className="w-3.5 h-3.5 fill-current text-[#b58153] mr-1" /> {fb.platformRating || 5}/5
                </div>
              </div>

              <p className="text-slate-300 text-sm">{fb.message}</p>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-[#0a2540]">
                <span className="font-bold text-[#ffebbf] uppercase tracking-wider">{fb.category || 'GENERAL'}</span>
                <span className="font-mono">{formatDate(fb.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
