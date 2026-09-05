import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { StatusBadge } from '../../components/StatusBadge';
import { PaymentModal } from '../../components/PaymentModal';
import { formatCurrency, formatDate, calculateFeeDetails } from '../../utils';
import { Calendar, ChevronRight, CreditCard, Clock, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentBookingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('ALL');
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['student-bookings'],
    queryFn: bookingService.getAll,
    refetchInterval: 3000,
  });

  const bookings = data?.data || [];

  const filteredBookings = filter === 'ALL'
    ? bookings
    : bookings.filter((b: any) => b.status === filter);

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="glass-card-premium p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">My Session Bookings</h1>
            <span className="text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Student Portal
            </span>
          </div>
          <p className="text-[#ffebbf] text-xs sm:text-sm mt-1.5 font-medium">
            Track slot request statuses, complete QR payments, and join Google Meet live sessions.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#010101] p-1.5 rounded-xl border border-[#0a2540] gap-1 overflow-x-auto">
        {['ALL', 'PENDING', 'ACCEPTED', 'VERIFYING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
              filter === tab
                ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540] rounded-2xl">
          <Calendar className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No sessions found</h3>
          <p className="text-slate-300 text-sm mt-1">You don't have any bookings under "{filter}".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking: any) => {
            const feeInfo = calculateFeeDetails(booking.sessionFee);

            return (
              <div key={booking.id} className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#0a2540]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black text-lg flex items-center justify-center shadow-lg">
                      {booking.expert?.fullName ? booking.expert.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'EX'}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{booking.expert?.fullName || 'Expert Speaker'}</h3>
                      <p className="text-xs text-slate-300 mt-0.5">{booking.expert?.designation} • {booking.expert?.organization}</p>
                    </div>
                  </div>

                  <StatusBadge status={booking.status} />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap font-medium">
                    <span className="flex items-center gap-1 font-bold text-[#ffebbf]">
                      Total Fee: {formatCurrency(feeInfo.totalFee)} <span className="text-[10px] text-slate-400 font-mono">({formatCurrency(feeInfo.baseFee)} + {formatCurrency(feeInfo.platformFee)} 10% platform fee)</span>
                    </span>
                    <span>Duration: {booking.durationMinutes || 60} mins</span>
                    <span>Requested: {formatDate(booking.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Immediate QR Payment Button */}
                    {booking.status === 'ACCEPTED' && (
                      <button
                        onClick={() => setSelectedBookingForPayment(booking)}
                        className="btn-primary text-xs px-4 py-2.5 shadow-ns-gold font-black uppercase flex items-center gap-2 animate-bounce hover:animate-none"
                      >
                        <CreditCard className="w-4 h-4 text-black" /> Pay Now (Scan QR)
                      </button>
                    )}

                    {/* Payment Verifying Status Button */}
                    {booking.status === 'VERIFYING' && (
                      <button
                        onClick={() => setSelectedBookingForPayment(booking)}
                        className="btn-secondary text-xs px-3.5 py-2 font-bold uppercase tracking-wider text-amber-300 border-amber-500/40 flex items-center gap-1.5"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Verifying (Re-submit QR)
                      </button>
                    )}

                    <Link
                      to={`/student/bookings/${booking.id}`}
                      className="btn-secondary text-xs px-4 py-2.5 font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {selectedBookingForPayment && (() => {
        const feeInfo = calculateFeeDetails(selectedBookingForPayment.sessionFee);
        return (
          <PaymentModal
            isOpen={!!selectedBookingForPayment}
            onClose={() => setSelectedBookingForPayment(null)}
            sessionFee={feeInfo.totalFee}
            platformFee={feeInfo.platformFee}
            bookingId={selectedBookingForPayment.id}
            onSuccess={() => {
              setSelectedBookingForPayment(null);
              toast.success('Payment proof submitted successfully!');
              queryClient.invalidateQueries({ queryKey: ['student-bookings'] });
            }}
          />
        );
      })()}
    </div>
  );
};

export default StudentBookingsPage;
