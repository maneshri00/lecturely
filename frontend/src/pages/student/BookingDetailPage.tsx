import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../../services/bookingService';
import { paymentService } from '../../services/paymentService';
import { reviewService } from '../../services/reviewService';
import { StatusBadge } from '../../components/StatusBadge';
import { PaymentModal } from '../../components/PaymentModal';
import { TopicSyllabusModal } from '../../components/TopicSyllabusModal';
import { Rating } from '../../components/Rating';
import { formatCurrency, formatDateTime, calculateFeeDetails } from '../../utils';
import { SERVICE_CATEGORIES } from '../../utils/constants';
import { MessageSquare, Send, CreditCard, Star, Linkedin, ExternalLink, ShieldCheck, Briefcase, GraduationCap, MapPin, User, Sparkles, Clock, Coins, Video, Copy, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{ name: string; fee: number } | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [hasReviewed, setHasReviewed] = useState<boolean | null>(null);
  const [existingReview, setExistingReview] = useState<any>(null);

  const { data: bookingData, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingService.getById(id!),
    enabled: !!id,
    refetchInterval: 2000,
  });

  const { data: messagesData } = useQuery({
    queryKey: ['booking-messages', id],
    queryFn: () => bookingService.getMessages(id!),
    enabled: !!id,
    refetchInterval: 2000,
  });

  const booking = bookingData?.data;

  useEffect(() => {
    if (booking?.status === 'COMPLETED' && hasReviewed === null) {
      reviewService.hasReviewed(Number(id)).then((exists) => {
        setHasReviewed(exists);
        if (exists) {
          reviewService.getReview(Number(id)).then(setExistingReview);
        }
      });
    }
  }, [booking, id, hasReviewed]);

  const messages = messagesData?.data || [];

  const sendMessageMutation = useMutation({
    mutationFn: (msg: string) => bookingService.sendMessage(id!, msg),
    onSuccess: () => {
      setChatMessage('');
      queryClient.invalidateQueries({ queryKey: ['booking-messages', id] });
    },
  });

  const acceptCounterMutation = useMutation({
    mutationFn: () => bookingService.confirm(id!),
    onSuccess: () => {
      toast.success('Counter offer accepted! You can now proceed to payment.');
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => bookingService.cancel(id!, 'Cancelled by student'),
    onSuccess: () => {
      toast.success('Booking cancelled');
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });

  const submitReviewMutation = useMutation({
    mutationFn: () => reviewService.create(Number(id), rating, reviewComment),
    onSuccess: () => {
      toast.success('Review submitted! Thank you.');
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });

  const handlePaymentSuccess = async (paymentDetails: any) => {
    try {
      await paymentService.verifyPayment(
        paymentDetails.orderId,
        paymentDetails.paymentId,
        paymentDetails.signature,
        Number(id)
      );
      toast.success('Payment verified! Booking confirmed 🎉');
      setShowPaymentModal(false);
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    } catch (err: any) {
      toast.error('Payment verification failed. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading session details...</div>;
  }

  if (!booking) {
    return <div className="p-8 text-center text-slate-400">Booking not found.</div>;
  }

  const expert = booking.expert;
  const feeInfo = calculateFeeDetails(booking.sessionFee);
  const isMeetRoomUnlocked = booking.meetingLink && ['CONFIRMED', 'COMPLETED'].includes(booking.status);

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-white">
      {/* Header Banner */}
      <div className="glass-card-premium p-6 sm:p-8 border border-[#0a2540] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#090e18]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black font-display text-white">Session Request #{booking.id}</h1>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">Requested on {formatDateTime(booking.createdAt)}</p>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          {booking.status === 'ACCEPTED' && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="btn-primary text-xs px-5 py-3 shadow-ns-gold font-black uppercase flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Pay & Confirm via QR ({formatCurrency(feeInfo.totalFee)})
            </button>
          )}

          {booking.status === 'VERIFYING' && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-2 rounded-xl font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> Payment Under Admin Verification
              </span>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="btn-secondary text-xs px-3.5 py-2 font-bold uppercase tracking-wider text-[#ffebbf]"
              >
                Re-submit QR Payment
              </button>
            </div>
          )}

          {booking.status === 'COUNTER_OFFERED' && (
            <button
              onClick={() => acceptCounterMutation.mutate()}
              className="btn-primary text-xs px-5 py-3 shadow-ns-gold font-black uppercase"
            >
              Accept Counter Offer ({formatCurrency(booking.counterOfferFee)})
            </button>
          )}

          {['PENDING', 'ACCEPTED'].includes(booking.status) && (
            <button
              onClick={() => cancelMutation.mutate()}
              className="btn-secondary text-xs px-4 py-2 text-rose-400 border-rose-500/30 font-bold uppercase"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card border border-[#0a2540] bg-[#090e18] overflow-hidden rounded-2xl space-y-0">
            {/* Cover Banner */}
            <div className="h-28 bg-gradient-to-r from-[#0a2540] via-[#1a385c] to-[#b58153]/40 relative p-4 flex justify-between items-start">
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#ffebbf] border border-[#b58153]/40">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Verified Speaker Profile
              </div>
              {expert?.linkedinUrl && (
                <a
                  href={expert.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#0077b5] text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-[#0077b5]/80 transition shadow-lg"
                >
                  <Linkedin className="w-4 h-4 fill-current" /> LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Profile Avatar & Details Section */}
            <div className="p-6 pt-0 relative space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 -mt-10 mb-2">
                <div className="w-20 h-20 rounded-full border-4 border-[#090e18] bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black text-2xl flex items-center justify-center overflow-hidden shadow-2xl">
                  {expert?.profilePhotoUrl ? (
                    <img src={expert.profilePhotoUrl} alt={expert.fullName} className="w-full h-full object-cover" />
                  ) : (
                    expert?.fullName ? expert.fullName.substring(0, 2).toUpperCase() : 'EX'
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {expert?.id && (
                    <button
                      onClick={() => navigate(`/experts/${expert.id}`)}
                      className="btn-secondary text-xs px-3.5 py-1.5 font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <User className="w-3.5 h-3.5" /> Full Speaker Profile
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black font-display text-white">{expert?.fullName}</h2>
                  <span className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2 py-0.5 rounded border border-[#b58153]/40 font-bold uppercase">
                    Speaker / Mentor
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#ffebbf] mt-0.5">
                  {expert?.designation} at {expert?.organization}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                  {(expert?.city || expert?.state) && (
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#b58153]" /> {expert?.city}, {expert?.state}
                    </span>
                  )}
                </div>
              </div>

              {/* Bio Summary Section */}
              <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider block">Speaker Bio & Mentoring Focus</span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {expert?.bio || 'Guest speaker and industry expert specialized in keynotes, technical workshops, and mentorship.'}
                </p>
              </div>

              {/* Google Meet Online Session Callout Card - VISIBLE ONLY AFTER ADMIN PAYMENT VERIFICATION */}
              {isMeetRoomUnlocked ? (
                <div className="p-5 bg-gradient-to-r from-[#090e18] via-[#0a2540]/90 to-[#090e18] border-2 border-[#b58153]/60 rounded-2xl shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0a2540] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center font-bold shadow-md">
                        <Video className="w-5 h-5 text-teal-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-white">Google Meet Video Session</h3>
                          <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-400/30 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                            {booking.status === 'COMPLETED' ? 'Session Completed' : 'Google Meet Ready'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#ffebbf]" />
                          <span>
                            {booking.scheduledAt
                              ? `Scheduled Start Time: ${formatDateTime(booking.scheduledAt)} (${booking.durationMinutes || 60} mins)`
                              : 'Online Video Conference Room Generated'}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#010101] p-3.5 rounded-xl border border-[#0a2540]">
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-[#ffebbf] font-bold uppercase tracking-wider block">Official Session Room Link</span>
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-sky-400 hover:text-sky-300 underline truncate block mt-0.5"
                      >
                        {booking.meetingLink}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(booking.meetingLink!);
                          toast.success('Google Meet link copied to clipboard!');
                        }}
                        className="px-3 py-2.5 bg-[#0a2540] text-[#ffebbf] hover:bg-[#b58153] hover:text-black border border-[#b58153]/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Link
                      </button>

                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary text-xs px-5 py-2.5 font-black uppercase shadow-ns-gold flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" /> Join Live Meet
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Google Meet session room link is locked. Unlocks automatically after Admin verifies payment proof.</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded font-mono font-bold uppercase shrink-0">
                    {booking.status === 'VERIFYING' ? 'Under Admin Verification' : 'Payment Verification Pending'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Financial Breakdown */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-3 rounded-2xl shadow-xl">
            <h2 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider border-b border-[#0a2540] pb-2">
              Fee Summary & Platform Commission
            </h2>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-300">Base Speaker Fee</span>
              <span className="font-bold text-white">{formatCurrency(feeInfo.baseFee)}</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#0a2540]">
              <span className="text-slate-400">+ 10% Platform Fee</span>
              <span className="font-semibold text-amber-300">+{formatCurrency(feeInfo.platformFee)}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1 font-bold">
              <span className="text-white">Total Payable Amount</span>
              <span className="text-[#ffebbf] font-black text-lg">{formatCurrency(feeInfo.totalFee)}</span>
            </div>
            <div className="p-2.5 bg-[#010101] rounded-xl border border-[#0a2540] text-[10px] text-slate-400 font-mono text-center">
              Includes 10% platform fee for Lecturely escrow protection & Meet generation.
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        sessionFee={feeInfo.totalFee}
        platformFee={feeInfo.platformFee}
        bookingId={booking.id}
        onSuccess={handlePaymentSuccess}
      />

      {/* Topic Syllabus Modal */}
      {selectedTopic && (
        <TopicSyllabusModal
          isOpen={!!selectedTopic}
          onClose={() => setSelectedTopic(null)}
          topicName={selectedTopic.name}
          topicFee={selectedTopic.fee}
          expertName={expert?.fullName}
          expertPhoto={expert?.profilePhotoUrl}
        />
      )}
    </div>
  );
};

export default BookingDetailPage;
