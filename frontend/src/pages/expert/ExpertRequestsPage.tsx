import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, formatDate } from '../../utils';
import { Clock, Check, X, ArrowLeftRight } from 'lucide-react';

export const ExpertRequestsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [counterFee, setCounterFee] = useState<number>(5000);
  const [counterNote, setCounterNote] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['expert-bookings'],
    queryFn: bookingService.getAll,
    refetchInterval: 3000,
  });

  const bookings = data?.data || [];
  const pendingRequests = bookings.filter((b: any) => b.status === 'PENDING');

  const acceptMutation = useMutation({
    mutationFn: (id: number) => bookingService.accept(id),
    onSuccess: () => {
      toast.success('Session request accepted!');
      queryClient.invalidateQueries({ queryKey: ['expert-bookings'] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => bookingService.reject(id, 'Not available at requested time'),
    onSuccess: () => {
      toast.success('Session request declined');
      queryClient.invalidateQueries({ queryKey: ['expert-bookings'] });
    },
  });

  const counterOfferMutation = useMutation({
    mutationFn: ({ id, fee, note }: { id: number; fee: number; note: string }) =>
      bookingService.counterOffer(id, { counterOfferFee: fee, counterOfferNote: note }),
    onSuccess: () => {
      toast.success('Counter offer sent to student!');
      setSelectedBooking(null);
      queryClient.invalidateQueries({ queryKey: ['expert-bookings'] });
    },
  });

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-black font-display text-white">Pending Session Requests</h1>
        <p className="text-[#ffebbf] text-sm mt-1 font-medium">Accept, decline, or send custom counter offers to institution requests.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-40 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : pendingRequests.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <Clock className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No pending requests</h3>
          <p className="text-slate-300 text-sm mt-1">New guest lecture requests from colleges will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((req: any) => (
            <div key={req.id} className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#0a2540]">
                <div>
                  <h3 className="font-bold text-white text-lg">{req.student?.fullName || 'Student Institution'}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{req.student?.institution} • {req.student?.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-300 block font-semibold">Offered Fee</span>
                  <span className="font-black text-[#ffebbf] text-xl">{formatCurrency(req.sessionFee)}</span>
                </div>
              </div>

              <div className="text-sm text-slate-300 bg-[#010101] p-4 rounded-xl border border-[#0a2540]">
                <p className="font-semibold text-[#ffebbf] text-xs uppercase tracking-wider mb-1">Student Request Note:</p>
                <p>{req.studentMessage || 'No specific notes provided.'}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-300 font-mono">Requested: {formatDate(req.createdAt)}</span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={rejectMutation.isPending || acceptMutation.isPending}
                    onClick={() => rejectMutation.mutate(req.id)}
                    className="btn-secondary text-xs px-4 py-2 text-rose-400 border-rose-500/30 hover:border-rose-500 font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-50"
                  >
                    <X className="w-3.5 h-3.5" /> {rejectMutation.isPending ? 'Declining...' : 'Decline'}
                  </button>

                  <button
                    disabled={acceptMutation.isPending || rejectMutation.isPending}
                    onClick={() => { setSelectedBooking(req); setCounterFee(req.sessionFee || 5000); }}
                    className="btn-secondary text-xs px-4 py-2 font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-50"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" /> Counter Offer
                  </button>

                  <button
                    disabled={acceptMutation.isPending || rejectMutation.isPending}
                    onClick={() => acceptMutation.mutate(req.id)}
                    className="btn-primary text-xs px-5 py-2.5 font-black uppercase tracking-wider shadow-ns-gold flex items-center gap-1 disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" /> {acceptMutation.isPending ? 'Accepting...' : 'Accept Session'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counter Offer Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-premium max-w-md w-full border border-[#0a2540] p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-display text-white">Send Counter Offer</h3>
            <p className="text-xs text-slate-300">Propose a revised session fee or date note to the institution.</p>

            <div>
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Proposed Fee (₹)</label>
              <input
                type="number"
                step="500"
                value={counterFee}
                onChange={(e) => setCounterFee(Number(e.target.value))}
                className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Note / Reason for Counter Offer</label>
              <textarea
                rows={3}
                value={counterNote}
                onChange={(e) => setCounterNote(e.target.value)}
                placeholder="e.g. Available on Saturday at 11 AM instead, fee includes customized lab material..."
                className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setSelectedBooking(null)} className="btn-secondary text-xs px-4 py-2 font-bold uppercase">Cancel</button>
              <button
                onClick={() => counterOfferMutation.mutate({ id: selectedBooking.id, fee: counterFee, note: counterNote })}
                className="btn-primary text-xs px-5 py-2.5 font-black uppercase shadow-ns-gold"
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
