import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { expertService } from '../../services/expertService';
import { requirementService } from '../../services/requirementService';
import { bookingService } from '../../services/bookingService';
import { SUBJECTS, SESSION_MODES, SERVICE_CATEGORIES } from '../../utils/constants';
import { getServiceFee, calculateFeeDetails, formatCurrency } from '../../utils';
import { BookingCalendarModal } from '../../components/BookingCalendarModal';
import { Calendar as CalendarIcon, Clock, Video, Building2, Lock, ShieldCheck } from 'lucide-react';

export const CreateRequirementPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const stateData = (location.state as any) || {};
  const queryExpertId = searchParams.get('expertId');
  const targetExpertId = stateData.targetExpertId || (queryExpertId ? Number(queryExpertId) : null);
  
  const [loading, setLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedSlotData, setSelectedSlotData] = useState<{
    date: string;
    timeSlot: string;
    mode: 'online' | 'offline';
  } | null>(() => {
    if (stateData.preferredDate && stateData.preferredTimeSlot) {
      return {
        date: stateData.preferredDate,
        timeSlot: stateData.preferredTimeSlot,
        mode: stateData.preferredMode || 'online',
      };
    }
    return null;
  });

  const { data: targetExpertData } = useQuery({
    queryKey: ['target-expert', targetExpertId],
    queryFn: () => expertService.getById(Number(targetExpertId)),
    enabled: !!targetExpertId,
  });

  const selectedExpert = targetExpertData?.data;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<any>({
    defaultValues: {
      mode: selectedSlotData?.mode === 'offline' ? 'OFFLINE' : 'ONLINE',
      subject: selectedExpert?.expertise?.[0] || SUBJECTS[0],
      expertCategory: stateData.preferredService || 'GUEST_LECTURE',
    }
  });

  let offeredServicesList: string[] | null = null;
  if (selectedExpert) {
    if (selectedExpert.servicesOffered && selectedExpert.servicesOffered.length > 0) {
      offeredServicesList = Array.isArray(selectedExpert.servicesOffered)
        ? selectedExpert.servicesOffered
        : selectedExpert.servicesOffered.split(',').map((s: string) => s.trim());
    } else if (selectedExpert.servicePricing && Object.keys(selectedExpert.servicePricing).length > 0) {
      offeredServicesList = Object.keys(selectedExpert.servicePricing);
    }
  }

  const availableCategories = (offeredServicesList && offeredServicesList.length > 0)
    ? SERVICE_CATEGORIES.filter((cat) => offeredServicesList!.includes(cat.value))
    : SERVICE_CATEGORIES;

  const defaultCategory = stateData.preferredService || availableCategories[0]?.value || 'GUEST_LECTURE';
  const selectedCategory = watch('expertCategory') || defaultCategory;
  const selectedSubject = watch('subject') || selectedExpert?.expertise?.[0] || SUBJECTS[0];

  const availableModes = (selectedExpert && !selectedExpert.isOfflineAvailable)
    ? SESSION_MODES.filter((m) => m.value === 'ONLINE')
    : SESSION_MODES;

  useEffect(() => {
    if (selectedExpert && availableCategories.length > 0) {
      const isCurrentValid = availableCategories.some(c => c.value === watch('expertCategory'));
      if (!isCurrentValid && availableCategories[0]) {
        setValue('expertCategory', availableCategories[0].value);
      }
    }
  }, [selectedExpert, availableCategories, setValue, watch]);

  useEffect(() => {
    if (!selectedExpert) return;

    const subjectRate = selectedExpert.skillRates?.find(
      (sr: any) => sr.subjectName.toLowerCase() === selectedSubject.toLowerCase()
    )?.fee;

    const categoryFee = getServiceFee(selectedExpert, selectedCategory);
    const finalFee = subjectRate ?? categoryFee;

    setValue('budgetMax', finalFee);
    setValue('budgetMin', finalFee);
  }, [selectedCategory, selectedSubject, selectedExpert, setValue]);

  const handleSlotSelected = (date: string, timeSlot: string, deliveryMode: 'online' | 'offline') => {
    setSelectedSlotData({ date, timeSlot, mode: deliveryMode });
    setValue('mode', deliveryMode === 'offline' ? 'OFFLINE' : 'ONLINE');
    toast.success(`Slot selected: ${date} (${timeSlot})`);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload: any = {
        title: data.title?.trim(),
        description: data.description?.trim(),
        subject: data.subject || 'General',
        mode: data.mode || 'ONLINE',
        expertCategory: data.expertCategory || 'GUEST_LECTURE',
        numAttendees: Number(data.numAttendees) || 50,
        durationMinutes: Number(data.durationMinutes) || 60,
        budgetMin: Number(data.budgetMin) || 2000,
        budgetMax: Number(data.budgetMax) || 10000,
      };

      if (selectedSlotData?.date) {
        payload.preferredDate = selectedSlotData.date;
      }
      if (selectedSlotData?.timeSlot) {
        payload.preferredTime = '10:00:00';
      }

      const res = await requirementService.create(payload);

      if (res.success) {
        if (targetExpertId) {
          const scheduledAt = selectedSlotData?.date
            ? `${selectedSlotData.date}T10:00:00`
            : new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 19);

          await bookingService.create({
            requirementId: res.data.id,
            expertId: targetExpertId,
            scheduledAt,
            durationMinutes: payload.durationMinutes,
            sessionFee: payload.budgetMax,
            mode: payload.mode || 'ONLINE',
            studentMessage: `${payload.description}\n\n[Requested Time Slot: ${selectedSlotData?.timeSlot || 'Flex'}]`,
          });
          toast.success('Session request with chosen time slot sent to expert!');
          navigate('/student/bookings');
        } else {
          toast.success('Requirement posted successfully!');
          navigate('/student/requirements');
        }
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      let errMsg = errorData?.message || 'Failed to create requirement';
      if (errorData?.data && typeof errorData.data === 'object') {
        const fieldMsgs = Object.values(errorData.data).join(', ');
        if (fieldMsgs) errMsg += `: ${fieldMsgs}`;
      }
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto glass-card-premium p-8 border border-[#0a2540] shadow-2xl space-y-6 text-white bg-[#090e18]">
      <div>
        <h1 className="text-2xl font-black font-display text-white">
          {selectedExpert ? `Direct Booking Request to ${selectedExpert.fullName}` : 'Post Requirement • Mentors, Tutors & Speakers'}
        </h1>
        <p className="text-[#ffebbf] text-sm mt-1 font-medium">
          {selectedExpert ? `Requesting session with ${selectedExpert.designation} at ${selectedExpert.organization}` : 'Specify your topic, session category, attendee count, and budget parameters.'}
        </p>
      </div>

      {selectedExpert && (() => {
        const feeInfo = calculateFeeDetails(selectedExpert.sessionFee);
        return (
          <div className="p-4 bg-[#010101] border border-[#ffebbf]/40 rounded-xl flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black text-base flex items-center justify-center">
                {selectedExpert.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{selectedExpert.fullName}</div>
                <div className="text-xs text-slate-300">{selectedExpert.designation} • {selectedExpert.organization}</div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-400 font-medium uppercase">Total Fee (incl. 10% Platform Fee)</div>
              <div className="text-sm font-black text-[#ffebbf]">{formatCurrency(feeInfo.totalFee)}</div>
              <div className="text-[10px] text-slate-400">({formatCurrency(feeInfo.baseFee)} base + {formatCurrency(feeInfo.platformFee)} platform)</div>
            </div>
          </div>
        );
      })()}

      {/* Selected Slot Banner */}
      <div className="p-4 bg-[#0a2540]/60 border border-[#b58153]/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] flex items-center justify-center font-bold shadow-md flex-shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Requested Booking Slot</div>
            {selectedSlotData ? (
              <div className="text-sm font-extrabold text-[#ffebbf] flex items-center gap-1.5 flex-wrap">
                <span>{selectedSlotData.date}</span>
                <span>•</span>
                <span>{selectedSlotData.timeSlot}</span>
                <span>•</span>
                <span className="capitalize">({selectedSlotData.mode})</span>
              </div>
            ) : (
              <div className="text-xs text-slate-300 font-medium">No slot selected yet. Click to pick date & time slot.</div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCalendarOpen(true)}
          className="btn-secondary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
        >
          <Clock className="w-4 h-4 text-[#ffebbf]" />
          <span>{selectedSlotData ? 'Change Slot' : 'Pick Calendar Slot'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Requirement Category</span>
              {selectedExpert && availableCategories.length === 1 && (
                <span className="text-[10px] text-[#ffebbf] font-bold">Expert Offering</span>
              )}
            </label>
            <select {...register('expertCategory')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none">
              {availableCategories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-[#090e18] text-white">{cat.badge} - {cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Subject Area</label>
            <select {...register('subject')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none">
              {(selectedExpert?.expertise?.length ? selectedExpert.expertise : SUBJECTS).map((s: string) => {
                const rateInfo = selectedExpert?.skillRates?.find((sr: any) => sr.subjectName.toLowerCase() === s.toLowerCase());
                const feeLabel = rateInfo?.fee ? ` (₹${rateInfo.fee.toLocaleString()})` : '';
                return (
                  <option key={s} value={s} className="bg-[#090e18] text-white">
                    {s}{feeLabel}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Session / Request Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none"
            placeholder="e.g. Need 1-on-1 Personal Tutor for Machine Learning Coursework or Career Mentor"
          />
          {errors.title && <p className="text-rose-400 text-xs mt-1 font-semibold">{String(errors.title.message)}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">
              Session Mode
            </label>
            <select {...register('mode')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none">
              {availableModes.map((m) => <option key={m.value} value={m.value} className="bg-[#090e18] text-white">{m.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Expected Duration</label>
            <select {...register('durationMinutes')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm focus:outline-none" defaultValue={60}>
              <option value={60} className="bg-[#090e18]">60 Minutes (1 hour)</option>
              <option value={90} className="bg-[#090e18]">90 Minutes (1.5 hours)</option>
              <option value={120} className="bg-[#090e18]">120 Minutes (2 hours)</option>
              <option value={180} className="bg-[#090e18]">180 Minutes (Half-day workshop)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Detailed Description / Learning Outcomes</label>
          <textarea
            rows={4}
            {...register('description', { required: 'Description required' })}
            className="w-full p-4 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none"
            placeholder="Describe the target student audience background, key topics to cover, and expected Q&A format..."
          />
          {errors.description && <p className="text-rose-400 text-xs mt-1 font-semibold">{String(errors.description.message)}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Expected Attendees</label>
            <input type="number" {...register('numAttendees')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm focus:outline-none" defaultValue={60} />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">
              {selectedExpert ? 'Base Session Fee (₹)' : 'Max Budget (₹)'}
            </label>
            <div className="relative">
              <input
                type="number"
                step="500"
                readOnly={!!selectedExpert}
                {...register('budgetMax')}
                className={`w-full px-4 py-3 border text-white rounded-xl text-sm font-bold focus:outline-none transition ${
                  selectedExpert
                    ? 'bg-[#0a2540] border-[#b58153]/60 text-[#ffebbf] cursor-not-allowed pr-10 shadow-sm'
                    : 'bg-[#010101] border-[#0a2540] focus:border-[#ffebbf]'
                }`}
              />
              {selectedExpert && (
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#ffebbf]">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </div>
            {watch('budgetMax') && (() => {
              const feeInfo = calculateFeeDetails(Number(watch('budgetMax')));
              return (
                <div className="mt-2 p-2.5 bg-[#010101] border border-[#0a2540] rounded-xl text-[11px] font-mono text-slate-300 flex items-center justify-between">
                  <span>Total Payable (incl. 10% Platform Fee):</span>
                  <span className="font-bold text-[#ffebbf]">{formatCurrency(feeInfo.totalFee)}</span>
                </div>
              );
            })()}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary text-xs px-5 py-3 font-bold uppercase tracking-wider">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary text-xs px-6 py-3 font-black uppercase tracking-wider shadow-ns-gold">
            {loading ? 'Submitting...' : 'Post Requirement'}
          </button>
        </div>
      </form>

      {/* Booking Calendar Modal */}
      <BookingCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        expertName={selectedExpert?.fullName || 'Expert'}
        expertId={selectedExpert?.id}
        sessionFee={selectedExpert?.sessionFee}
        onSelectSlot={handleSlotSelected}
      />
    </div>
  );
};

export default CreateRequirementPage;
