import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../../services/bookingService';
import { expertService } from '../../services/expertService';
import { requirementService } from '../../services/requirementService';
import { useAuthStore } from '../../store/authStore';
import { ExpertCard } from '../../components/ExpertCard';
import { StatusBadge } from '../../components/StatusBadge';
import { PaymentModal } from '../../components/PaymentModal';
import { Calendar, FileText, Clock, ArrowRight, PlusCircle, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentDashboardPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<any | null>(null);

  const { data: bookingsData } = useQuery({
    queryKey: ['student-bookings'],
    queryFn: bookingService.getAll,
  });

  const { data: requirementsData } = useQuery({
    queryKey: ['student-requirements'],
    queryFn: requirementService.getAll,
  });

  const { data: expertsData } = useQuery({
    queryKey: ['recommended-experts'],
    queryFn: () => expertService.search({ size: 6 }),
  });

  const bookings = bookingsData?.data || [];
  const requirements = requirementsData?.data || [];
  const recommendedExperts = expertsData?.data?.content || [];

  const pendingBookings = bookings.filter((b: any) => b.status === 'PENDING' || b.status === 'ACCEPTED' || b.status === 'VERIFYING');

  return (
    <div className="space-y-8 text-white">
      {/* Welcome Hero */}
      <div className="glass-card-premium p-6 sm:p-8 border border-[#0a2540] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#090e18]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Welcome back, {user?.fullName || 'Student'}! 👋</h1>
          <p className="text-[#ffebbf] text-sm mt-1 font-medium">Discover expert speakers & manage your session requests.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/student/quiz"
            className="px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 transition flex items-center gap-2"
          >
            🧠 AI Quiz & Diagnostics Bot
          </Link>
          <Link
            to="/student/requirements/create"
            className="btn-primary text-xs px-5 py-3 shadow-ns-gold flex items-center gap-2 uppercase font-black"
          >
            <PlusCircle className="w-4 h-4" /> Post Session Requirement
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 border border-[#0a2540] flex items-center gap-4 bg-[#090e18]">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{bookings.length}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Total Sessions</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] flex items-center gap-4 bg-[#090e18]">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{pendingBookings.length}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Active Requests</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] flex items-center gap-4 bg-[#090e18]">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{requirements.length}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Posted Requirements</div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="glass-card p-6 sm:p-8 border border-[#0a2540] bg-[#090e18]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-display text-white">Recent Session Requests</h2>
          <Link to="/student/bookings" className="text-xs font-bold text-[#ffebbf] hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-8 text-slate-300 text-sm">
            You haven't requested any sessions yet. Browse experts or post a requirement!
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 4).map((b: any) => (
              <div key={b.id} className="p-4 bg-[#010101] rounded-xl border border-[#0a2540] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{b.expert?.fullName || 'Expert Speaker'}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{b.expert?.designation} • {b.expert?.organization}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <StatusBadge status={b.status} />

                  {b.status === 'ACCEPTED' && (
                    <button
                      onClick={() => setSelectedBookingForPayment(b)}
                      className="btn-primary text-xs px-3.5 py-1.5 shadow-ns-gold font-black uppercase flex items-center gap-1.5 animate-bounce hover:animate-none"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-black" /> Pay Now (Scan QR)
                    </button>
                  )}

                  {b.status === 'VERIFYING' && (
                    <button
                      onClick={() => setSelectedBookingForPayment(b)}
                      className="btn-secondary text-xs px-3 py-1.5 text-amber-300 border-amber-500/40 font-bold"
                    >
                      Verifying QR
                    </button>
                  )}

                  <Link to={`/student/bookings/${b.id}`} className="btn-secondary text-xs px-3 py-1.5 font-bold">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Experts */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-display text-white">Recommended Experts for You</h2>
          <Link to="/student/experts" className="text-xs font-bold text-[#ffebbf] hover:underline flex items-center gap-1">
            Explore All Directory <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedExperts.slice(0, 3).map((exp: any) => (
            <ExpertCard key={exp.id} expert={exp} />
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedBookingForPayment && (
        <PaymentModal
          isOpen={!!selectedBookingForPayment}
          onClose={() => setSelectedBookingForPayment(null)}
          sessionFee={selectedBookingForPayment.sessionFee || 5000}
          platformFee={selectedBookingForPayment.platformFee || 500}
          bookingId={selectedBookingForPayment.id}
          onSuccess={() => {
            setSelectedBookingForPayment(null);
            toast.success('Payment proof submitted successfully!');
            queryClient.invalidateQueries({ queryKey: ['student-bookings'] });
          }}
        />
      )}
    </div>
  );
};

export default StudentDashboardPage;
