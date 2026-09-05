import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { feedbackService } from '../services/feedbackService';
import { FEEDBACK_CATEGORIES } from '../utils/constants';

export const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', category: FEEDBACK_CATEGORIES[0].value, message: '', platformRating: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await feedbackService.submit(formData);
      toast.success('Thank you for your feedback!');
      setTimeout(() => setIsOpen(false), 2000);
      setFormData({ ...formData, message: '', platformRating: 5 });
    } catch (err) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gold-gradient text-slate-950 font-bold p-4 rounded-full shadow-gold hover:shadow-amber-500/50 hover:scale-105 transition-all flex items-center space-x-2 z-40"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="hidden md:inline font-bold">Feedback</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up backdrop-blur-xl">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-slate-950 flex justify-between items-center">
            <h3 className="font-bold text-slate-950 flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Share Feedback</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-950/80 hover:text-slate-950"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Category</label>
              <select 
                className="w-full text-sm p-2.5 bg-[#010101] border border-[#0a2540] rounded-xl text-white focus:ring-1 focus:ring-[#ffebbf]" 
                value={formData.category} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {FEEDBACK_CATEGORIES.map(c => <option key={c.value} value={c.value} className="bg-[#090e18] text-white">{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Message</label>
              <textarea
                required
                rows={3}
                className="w-full text-sm p-2.5 bg-[#010101] border border-[#0a2540] rounded-xl text-white placeholder:text-slate-400 resize-none focus:ring-1 focus:ring-[#ffebbf]"
                placeholder="Tell us what you think..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Rating</label>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button type="button" key={star} onClick={() => setFormData({ ...formData, platformRating: star })} className={`text-xl ${star <= formData.platformRating ? 'text-amber-400' : 'text-slate-600'}`}>
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full btn-primary py-2.5 text-sm">
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
