import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { expertService } from '../services/expertService';
import { reviewService } from '../services/reviewService';
import { formatCurrency, formatDateTime, getServiceFee, calculateFeeDetails } from '../utils';
import { SERVICE_CATEGORIES } from '../utils/constants';
import { Rating } from '../components/Rating';
import { BookingCalendarModal } from '../components/BookingCalendarModal';
import { TopicSyllabusModal } from '../components/TopicSyllabusModal';
import { useAuthStore } from '../store/authStore';
import { MapPin, Building, Briefcase, CheckCircle2, Shield, Video, ArrowRight, Linkedin, ExternalLink, Calendar as CalendarIcon, BookOpen, Star, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const ExpertProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTopicModal, setSelectedTopicModal] = useState<{
    isOpen: boolean;
    topicName: string;
    topicFee?: number;
    syllabusModules?: any[];
    downloadableMaterials?: any[];
  }>({
    isOpen: false,
    topicName: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['expert', id],
    queryFn: () => expertService.getById(id!),
    enabled: !!id,
  });

  const expert = data?.data;

  const { data: reviewsData } = useQuery({
    queryKey: ['expert-reviews', id],
    queryFn: () => reviewService.getByExpert(id!),
    enabled: !!id,
  });

  const reviews: any[] = reviewsData?.data || (Array.isArray(reviewsData) ? reviewsData : []);

  const handleBookSession = () => {
    if (!user) {
      toast.error('Please sign in as a student to book sessions');
      navigate('/login');
      return;
    }
    if (user.role !== 'STUDENT') {
      toast.error('Only students or institution admins can book sessions');
      return;
    }
    setIsCalendarOpen(true);
  };

  const handleSlotConfirmed = (date: string, timeSlot: string, deliveryMode: 'online' | 'offline') => {
    navigate('/student/requirements/create', { 
      state: { 
        targetExpertId: expert?.id,
        preferredDate: date,
        preferredTimeSlot: timeSlot,
        preferredMode: deliveryMode
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="h-96 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-white">
        <h2 className="text-2xl font-bold font-display text-white">Expert not found</h2>
        <button onClick={() => navigate('/experts')} className="btn-primary mt-4 text-xs font-bold uppercase">
          Back to Directory
        </button>
      </div>
    );
  }

  const feeInfo = calculateFeeDetails(expert.sessionFee);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 cols: Profile Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card-premium border border-[#0a2540] bg-[#090e18] overflow-hidden rounded-3xl shadow-2xl">
            {/* Cover Banner Header */}
            <div className="h-44 sm:h-52 md:h-56 w-full relative bg-gradient-to-r from-[#0a2540] via-[#090e18] to-[#010101] overflow-hidden border-b border-[#0a2540]">
              {expert.bannerPhotoUrl ? (
                <img src={expert.bannerPhotoUrl} alt="Cover Banner" className="w-full h-full object-cover" />
              ) : (
                <div 
                  className="w-full h-full bg-cover bg-center relative" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e18]/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Profile Picture Vertically Centered */}
              <div className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10">
                <div className="w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black text-3xl sm:text-4xl flex items-center justify-center flex-shrink-0 shadow-2xl border-4 border-[#ffebbf] overflow-hidden relative group">
                  {expert.profilePhotoUrl ? (
                    <img src={expert.profilePhotoUrl} alt={expert.fullName} className="w-full h-full object-cover" />
                  ) : (
                    expert.fullName ? expert.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'EX'
                  )}
                </div>
              </div>

              {/* Rating Pill Badge */}
              <div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-4 z-10 bg-[#090e18]/95 backdrop-blur-md px-4 py-1.5 rounded-full border-2 border-[#b58153]/60 shadow-2xl flex items-center gap-2.5 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-black text-[#ffebbf]">
                    {expert.rating ? expert.rating.toFixed(1) : (expert.totalSessions ? '5.0' : '0.0')}
                  </span>
                </div>
                <span className="text-xs text-white font-bold tracking-wide">({expert.totalSessions ?? 0} sessions completed)</span>
              </div>
            </div>

            {/* Details Section Below Banner */}
            <div className="p-6 sm:p-8 space-y-5">
              {/* Header Info Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0a2540]">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl sm:text-4xl font-black font-display text-white">{expert.fullName}</h1>
                    <span className="inline-flex items-center gap-1.5 bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ffebbf]" /> Verified Speaker
                    </span>
                  </div>

                  <p className="text-[#ffebbf] font-bold text-lg mt-1">{expert.designation} at {expert.organization}</p>

                  <div className="flex items-center gap-4 text-sm text-slate-300 mt-2 flex-wrap font-medium">
                    <span className="flex items-center gap-1.5 bg-[#010101] px-3 py-1 rounded-lg border border-[#0a2540]">
                      <MapPin className="w-4 h-4 text-[#ffebbf]" /> {expert.city}, {expert.state}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#010101] px-3 py-1 rounded-lg border border-[#0a2540]">
                      <Briefcase className="w-4 h-4 text-[#ffebbf]" /> {expert.industryExperience}y Industry / {expert.academicExperience}y Academic
                    </span>
                  </div>
                </div>

                {expert.linkedinUrl && (
                  <a
                    href={expert.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0077b5] text-white hover:bg-[#006097] rounded-full text-xs font-bold transition shadow-lg self-start sm:self-center"
                  >
                    <Linkedin className="w-4 h-4 fill-current" />
                    <span>LinkedIn Verified Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Summary & Bio */}
              <div className="pt-4 border-t border-[#0a2540] space-y-2">
                <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#ffebbf]" /> Professional Summary & Background
                </h3>
                <div className="bg-[#010101] p-4 rounded-2xl border border-[#0a2540] shadow-inner text-slate-200 text-sm font-medium leading-relaxed whitespace-pre-line">
                  {expert.bio || `${expert.fullName} is a senior ${expert.designation} at ${expert.organization}. Specializing in keynotes, technical guest lectures, and mentoring sessions.`}
                </div>
              </div>

              {/* Multi-Tiered Services & Custom Pricing Matrix */}
              <div className="mt-6 pt-6 border-t border-[#0a2540] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#ffebbf]" /> Services Offered & Pricing Breakdown (Incl. 10% Platform Fee)
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">Select a service to book</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const offeredList = expert.servicesOffered || ['GUEST_LECTURE', 'MENTORSHIP', 'PERSONAL_TUTOR'];
                    if (!offeredList.includes(cat.value)) return null;

                    const baseServiceFee = getServiceFee(expert, cat.value);
                    const srvFeeInfo = calculateFeeDetails(baseServiceFee);

                    return (
                      <div
                        key={cat.value}
                        className="p-4 bg-[#010101] border border-[#0a2540] hover:border-[#b58153] rounded-2xl transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-[#ffebbf] uppercase tracking-wider">{cat.badge}</span>
                            <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40 font-mono">
                              {formatCurrency(srvFeeInfo.totalFee)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1">{cat.desc}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-1">
                            ({formatCurrency(srvFeeInfo.baseFee)} + {formatCurrency(srvFeeInfo.platformFee)} 10% platform fee)
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            if (!user) {
                              toast.error('Please sign in as a student to book sessions');
                              navigate('/login');
                              return;
                            }
                            navigate('/student/requirements/create', {
                              state: {
                                targetExpertId: expert.id,
                                preferredService: cat.value,
                                calculatedFee: srvFeeInfo.totalFee,
                              }
                            });
                          }}
                          className="btn-secondary w-full text-[11px] py-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mt-2 text-[#ffebbf]"
                        >
                          <CalendarIcon className="w-3.5 h-3.5" /> Book {cat.badge.split(' ')[1] || 'Service'} ({formatCurrency(srvFeeInfo.totalFee)})
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expertise & Session Topics */}
              <div className="mt-6 pt-6 border-t border-[#0a2540]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                    Expertise & Subject Topics
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">Click any topic to view syllabus & materials</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {expert.expertise?.map((area: string) => {
                    const skillRate = expert.skillRates?.find((sr: any) => sr.subjectName.toLowerCase() === area.toLowerCase());
                    const baseFee = skillRate?.fee || expert.sessionFee || 5000;
                    const topicFeeInfo = calculateFeeDetails(baseFee);

                    return (
                      <button
                        key={area}
                        onClick={() => setSelectedTopicModal({
                          isOpen: true,
                          topicName: area,
                          topicFee: topicFeeInfo.totalFee,
                          syllabusModules: expert.syllabusModules?.[area] || [],
                          downloadableMaterials: expert.resourceMaterials?.[area] || [],
                        })}
                        className="bg-[#0a2540] text-[#ffebbf] font-bold text-xs px-4 py-2 rounded-xl border border-[#b58153]/40 hover:border-[#ffebbf] hover:scale-105 transition-all cursor-pointer flex items-center gap-2 shadow-sm group"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#b58153] group-hover:text-[#ffebbf]" />
                        <span className="capitalize">{area}</span>
                        <span className="text-[10px] text-amber-300 font-extrabold bg-[#010101] px-2 py-0.5 rounded-md border border-[#b58153]/40 font-mono">
                          {formatCurrency(topicFeeInfo.totalFee)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Student Reviews & Testimonials Section */}
          <div className="glass-card p-8 border border-[#0a2540] bg-[#090e18] space-y-6 rounded-3xl">
            <div className="flex items-center justify-between border-b border-[#0a2540] pb-4">
              <div>
                <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#b58153] fill-current" /> Student Reviews & Feedback
                </h2>
                <p className="text-xs text-slate-300 mt-1">Verified reviews from completed guest lectures and mentorship sessions.</p>
              </div>
              <div className="flex items-center gap-2 bg-[#010101] px-3.5 py-1.5 rounded-full border border-[#b58153]/40">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-black text-[#ffebbf]">{expert.rating ? expert.rating.toFixed(1) : '5.0'}</span>
                <span className="text-xs text-slate-400">({reviews.length} reviews)</span>
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8 bg-[#010101] rounded-2xl border border-[#0a2540] p-6 space-y-2">
                <Star className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-300">No public reviews yet</p>
                <p className="text-xs text-slate-400">Be the first student to book a session and leave feedback for {expert.fullName}!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev: any) => (
                  <div key={rev.id} className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-3 shadow-md hover:border-[#b58153]/40 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a2540] to-[#1a385c] border border-[#b58153]/40 text-[#ffebbf] font-bold flex items-center justify-center text-sm shadow-inner">
                          {rev.reviewerName ? rev.reviewerName.substring(0, 2).toUpperCase() : 'ST'}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{rev.reviewerName || 'Student'}</h4>
                          {rev.createdAt && (
                            <span className="text-[10px] text-slate-400 font-mono">{formatDateTime(rev.createdAt)}</span>
                          )}
                        </div>
                      </div>
                      <Rating value={rev.rating} onChange={() => {}} readOnly size="sm" />
                    </div>

                    {rev.comment && (
                      <p className="text-xs text-slate-300 leading-relaxed font-medium bg-[#090e18] p-3.5 rounded-xl border border-[#0a2540]/80 italic">
                        "{rev.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Booking Sticky Sidebar */}
        <div className="space-y-6">
          <div className="glass-card-premium p-6 border border-[#0a2540] bg-[#090e18] sticky top-24 shadow-2xl space-y-4 rounded-3xl">
            <div className="text-center pb-4 border-b border-[#0a2540] space-y-1">
              <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider">Total Payable Session Fee</span>
              <div className="text-3xl font-black text-white mt-1">
                {formatCurrency(feeInfo.totalFee)}
              </div>
              <div className="text-[11px] text-slate-400 font-mono bg-[#010101] py-1 px-3 rounded-lg border border-[#0a2540] inline-block">
                Base Fee {formatCurrency(feeInfo.baseFee)} + 10% Platform Fee ({formatCurrency(feeInfo.platformFee)})
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <Video className="w-4 h-4 text-[#ffebbf]" /> Online Session
                </span>
                <span className="font-bold text-[#ffebbf]">Available</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <Building className="w-4 h-4 text-[#ffebbf]" /> On-Campus Visit
                </span>
                <span className="font-bold text-white">{expert.isOfflineAvailable ? 'Available' : 'On Request'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#ffebbf]" /> Escrow Guarantee
                </span>
                <span className="font-bold text-[#ffebbf]">Lecturely Escrow Protected</span>
              </div>
            </div>

            <button
              onClick={handleBookSession}
              className="btn-primary w-full py-3.5 text-xs font-black uppercase tracking-wider shadow-ns-gold flex items-center justify-center gap-2 group"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Select Date & Time Slot</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Booking Calendar Modal */}
      <BookingCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        expertName={expert.fullName}
        expertId={expert.id}
        sessionFee={feeInfo.baseFee}
        onSelectSlot={handleSlotConfirmed}
      />

      {/* Topic Syllabus & Downloadable Resource Viewer Modal */}
      <TopicSyllabusModal
        isOpen={selectedTopicModal.isOpen}
        onClose={() => setSelectedTopicModal({ ...selectedTopicModal, isOpen: false })}
        topicName={selectedTopicModal.topicName}
        topicFee={selectedTopicModal.topicFee}
        expertName={expert.fullName}
        expertPhoto={expert.profilePhotoUrl}
        syllabusModules={selectedTopicModal.syllabusModules}
        downloadableMaterials={selectedTopicModal.downloadableMaterials}
      />
    </div>
  );
};

export default ExpertProfilePage;
