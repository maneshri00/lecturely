import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Video, Building2, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { expertService } from '../services/expertService';
import { formatCurrency, calculateFeeDetails } from '../utils';

interface BookingCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName: string;
  expertId?: number | string;
  sessionFee?: number;
  onSelectSlot: (date: string, timeSlot: string, deliveryMode: 'online' | 'offline') => void;
}

export const BookingCalendarModal: React.FC<BookingCalendarModalProps> = ({
  isOpen,
  onClose,
  expertName,
  expertId,
  sessionFee = 5000,
  onSelectSlot,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:00 AM');
  const [deliveryMode, setDeliveryMode] = useState<'online' | 'offline'>('online');

  const { data: bookedSlotsData } = useQuery({
    queryKey: ['expert-booked-slots', expertId],
    queryFn: () => expertService.getBookedSlots(expertId!),
    enabled: !!expertId && isOpen,
  });

  const bookedSlots: Array<{ date: string; timeSlot: string; status: string }> = bookedSlotsData?.data || [];

  const morningSlots = ['09:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '11:30 AM - 12:30 PM'];
  const afternoonSlots = ['02:00 PM - 03:00 PM', '03:30 PM - 04:30 PM', '04:30 PM - 05:30 PM'];
  const eveningSlots = ['06:00 PM - 07:00 PM', '07:30 PM - 08:30 PM'];
  const allSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];

  const isSlotBooked = (dateStr: string, slotStr: string) => {
    if (!dateStr || !slotStr) return false;
    return bookedSlots.some(
      (b) => b.date === dateStr && b.timeSlot.trim().toLowerCase() === slotStr.trim().toLowerCase()
    );
  };

  useEffect(() => {
    if (selectedDate && selectedSlot && isSlotBooked(selectedDate, selectedSlot)) {
      const available = allSlots.find((s) => !isSlotBooked(selectedDate, s));
      setSelectedSlot(available || '');
    }
  }, [selectedDate, bookedSlotsData]);

  if (!isOpen) return null;

  const feeInfo = calculateFeeDetails(sessionFee);

  // Calendar Math
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isDateDisabled = (dayNumber: number) => {
    const checkDate = new Date(year, month, dayNumber);
    const dateTodayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate < dateTodayNoTime;
  };

  const formatDateString = (dayNumber: number) => {
    const m = (month + 1).toString().padStart(2, '0');
    const d = dayNumber.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot || isSlotBooked(selectedDate, selectedSlot)) return;
    onSelectSlot(selectedDate, selectedSlot, deliveryMode);
    onClose();
  };

  const formattedDisplayDate = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-card-premium w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#b58153]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0a2540]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] flex items-center justify-center font-black shadow-ns-gold">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-display text-white">
                Book Session Slot with <span className="text-[#ffebbf]">{expertName}</span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Select your preferred date & time slot for the guest lecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0a2540] hover:bg-[#0a2540]/80 text-slate-300 hover:text-white border border-[#b58153]/30 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Fee Notice Box Before Booking Slot */}
        <div className="p-4 bg-[#010101] border-2 border-[#b58153]/50 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ffebbf]" /> Fee Breakdown (Includes 10% Platform Fee)
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-extrabold uppercase">
              Transparent Pricing
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
            <div className="p-2 bg-[#090e18] rounded-xl border border-[#0a2540]">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Speaker Fee</span>
              <span className="font-bold text-white">{formatCurrency(feeInfo.baseFee)}</span>
            </div>
            <div className="p-2 bg-[#090e18] rounded-xl border border-[#0a2540]">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">+ 10% Platform Fee</span>
              <span className="font-bold text-amber-300">+{formatCurrency(feeInfo.platformFee)}</span>
            </div>
            <div className="p-2 bg-[#090e18] rounded-xl border border-[#b58153]/40">
              <span className="text-[10px] text-[#ffebbf] uppercase font-bold block">Total Payable</span>
              <span className="font-black text-[#ffebbf] text-sm">{formatCurrency(feeInfo.totalFee)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Side: Calendar Date Picker */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-black uppercase tracking-wider text-white font-display">
                {monthNames[month]} {year}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg bg-[#0a2540] text-slate-300 hover:text-white border border-[#0a2540] hover:border-[#b58153]/40 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg bg-[#0a2540] text-slate-300 hover:text-white border border-[#0a2540] hover:border-[#b58153]/40 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10 rounded-xl bg-transparent" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const dayNum = index + 1;
                const dateStr = formatDateString(dayNum);
                const disabled = isDateDisabled(dayNum);
                const isSelected = selectedDate === dateStr;
                const dateHasBookings = bookedSlots.some(b => b.date === dateStr);

                return (
                  <button
                    key={dateStr}
                    disabled={disabled}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center relative ${
                      disabled
                        ? 'opacity-30 cursor-not-allowed bg-transparent text-slate-600'
                        : isSelected
                        ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold font-extrabold scale-105'
                        : 'bg-[#0a2540] text-slate-200 hover:bg-[#0a2540]/80 hover:text-[#ffebbf] border border-[#0a2540]'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {dateHasBookings && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 absolute bottom-1" />
                    )}
                    {isSelected && (
                      <span className="w-1 h-1 rounded-full bg-[#010101] absolute bottom-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Delivery Mode Selection */}
            <div className="pt-4 border-t border-[#0a2540] space-y-2">
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                Select Session Delivery Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('online')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    deliveryMode === 'online'
                      ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-md'
                      : 'bg-[#0a2540] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Online Google Meet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMode('offline')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    deliveryMode === 'offline'
                      ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-md'
                      : 'bg-[#0a2540] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>On-Campus Visit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Available Time Slots */}
          <div className="md:col-span-5 space-y-4 bg-[#0a2540]/40 p-4 rounded-2xl border border-[#0a2540]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#b58153]" /> Available Time Slots
              </h3>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                Live Slots
              </span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {/* Morning */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">🌅 Morning</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {morningSlots.map((slot) => {
                    const isBooked = isSlotBooked(selectedDate, slot);
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => !isBooked && setSelectedSlot(slot)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between border ${
                          isBooked
                            ? 'bg-rose-950/40 text-rose-300/70 border-rose-500/30 cursor-not-allowed opacity-75'
                            : selectedSlot === slot
                            ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-sm font-extrabold'
                            : 'bg-[#010101] text-slate-200 border-[#0a2540] hover:border-[#b58153]/40'
                        }`}
                      >
                        <span className={isBooked ? 'line-through text-rose-300/70' : ''}>{slot}</span>
                        {isBooked ? (
                          <span className="text-[10px] bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded border border-rose-700/50 font-mono font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3 text-rose-400" /> Booked
                          </span>
                        ) : (
                          selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-[#010101]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">☀️ Afternoon</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {afternoonSlots.map((slot) => {
                    const isBooked = isSlotBooked(selectedDate, slot);
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => !isBooked && setSelectedSlot(slot)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between border ${
                          isBooked
                            ? 'bg-rose-950/40 text-rose-300/70 border-rose-500/30 cursor-not-allowed opacity-75'
                            : selectedSlot === slot
                            ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-sm font-extrabold'
                            : 'bg-[#010101] text-slate-200 border-[#0a2540] hover:border-[#b58153]/40'
                        }`}
                      >
                        <span className={isBooked ? 'line-through text-rose-300/70' : ''}>{slot}</span>
                        {isBooked ? (
                          <span className="text-[10px] bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded border border-rose-700/50 font-mono font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3 text-rose-400" /> Booked
                          </span>
                        ) : (
                          selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-[#010101]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evening */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">🌙 Evening</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {eveningSlots.map((slot) => {
                    const isBooked = isSlotBooked(selectedDate, slot);
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => !isBooked && setSelectedSlot(slot)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between border ${
                          isBooked
                            ? 'bg-rose-950/40 text-rose-300/70 border-rose-500/30 cursor-not-allowed opacity-75'
                            : selectedSlot === slot
                            ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-sm font-extrabold'
                            : 'bg-[#010101] text-slate-200 border-[#0a2540] hover:border-[#b58153]/40'
                        }`}
                      >
                        <span className={isBooked ? 'line-through text-rose-300/70' : ''}>{slot}</span>
                        {isBooked ? (
                          <span className="text-[10px] bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded border border-rose-700/50 font-mono font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3 text-rose-400" /> Booked
                          </span>
                        ) : (
                          selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-[#010101]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Slot Summary & Action Footer */}
        <div className="pt-4 border-t border-[#0a2540] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Selected Slot Details</div>
            <div className="text-sm font-extrabold text-[#ffebbf] flex items-center gap-1.5 mt-0.5">
              <span>{formattedDisplayDate}</span>
              <span>•</span>
              <span>{selectedSlot}</span>
              <span>•</span>
              <span className="capitalize">({deliveryMode})</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Total Fee: <span className="font-bold text-white">{formatCurrency(feeInfo.totalFee)}</span> <span className="text-[11px] text-slate-400 font-mono">({formatCurrency(feeInfo.baseFee)} + {formatCurrency(feeInfo.platformFee)} platform fee)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#0a2540] bg-[#0a2540] text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-ns-gold flex items-center gap-2"
            >
              <span>Confirm & Proceed</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarModal;
