import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import { StatusBadge } from '../../components/StatusBadge';
import { formatCurrency, formatDateTime } from '../../utils';
import { Calendar, ShieldCheck, Video, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('ALL');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-bookings', filter],
    queryFn: () => adminService.getBookings(filter === 'ALL' ? undefined : filter, 0, 50),
  });

  const overrideBookingMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => adminService.overrideBookingStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(`Booking status overridden to ${variables.status}! 🎉`);
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
    },
    onError: () => {
      toast.error('Failed to override booking status.');
    },
  });

  const rawBookings = (data as any)?.data?.content || (data as any)?.data || [];
  const bookings = Array.isArray(rawBookings) ? rawBookings : [];

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="glass-card-premium p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Platform Bookings Governance</h1>
            <span className="text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Supreme Control
            </span>
          </div>
          <p className="text-[#ffebbf] text-xs sm:text-sm mt-1.5 font-medium">
            Monitor, audit, and force status overrides across all guest lecture sessions in India.
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#010101] p-1.5 rounded-xl border border-[#0a2540] overflow-x-auto no-scrollbar max-w-full">
          {['ALL', 'PENDING', 'ACCEPTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase whitespace-nowrap transition ${
                filter === tab
                  ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-card p-12 text-center border border-[#0a2540] rounded-2xl">
          <Calendar className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No sessions found under status "{filter}"</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: any) => (
            <div key={b.id} className="glass-card p-5 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-4 hover:border-[#b58153]/40 transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#0a2540]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">ID #{b.id}</span>
                    <h3 className="font-bold text-white text-base">{b.student?.fullName || 'Student Institution'}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Assigned Expert ID: {b.expertId || b.expert?.id || 'N/A'}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className="p-3.5 bg-[#010101] border border-[#0a2540] rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Scheduled Slot: <span className="text-[#ffebbf]">{b.scheduledAt ? formatDateTime(b.scheduledAt) : formatDateTime(b.createdAt)}</span></span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-300 font-medium">
                    <span>Session Fee: <strong className="text-[#ffebbf]">{formatCurrency(b.sessionFee)}</strong></span>
                    <span>Platform Fee (10%): <strong className="text-teal-400">{formatCurrency(b.platformFee)}</strong></span>
                  </div>
                </div>

                {/* Master Override Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {b.meetingLink && (
                    <a
                      href={b.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-[11px] px-3 py-2 font-black uppercase shadow-ns-gold flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Live
                    </a>
                  )}

                  <select
                    value={b.status}
                    onChange={(e) => overrideBookingMutation.mutate({ id: b.id, status: e.target.value })}
                    className="p-2 bg-[#090e18] border border-[#0a2540] text-[#ffebbf] rounded-lg text-xs font-bold focus:outline-none uppercase"
                  >
                    <option value="PENDING">Set PENDING</option>
                    <option value="ACCEPTED">Set ACCEPTED</option>
                    <option value="CONFIRMED">Set CONFIRMED</option>
                    <option value="COMPLETED">Force COMPLETED</option>
                    <option value="CANCELLED">Force CANCELLED</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;
