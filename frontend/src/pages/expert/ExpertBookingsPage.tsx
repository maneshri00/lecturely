import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/bookingService';
import { expertService } from '../../services/expertService';
import { StatusBadge } from '../../components/StatusBadge';
import { formatCurrency, formatDateTime } from '../../utils';
import { Calendar, ChevronRight, Clock, Plus, Trash2, Video, Check, ShieldCheck, Sparkles, Lock } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ExpertBookingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('ALL');
  const [availabilitySlots, setAvailabilitySlots] = useState<any[]>([]);

  // New slot form state
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [isOnline, setIsOnline] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const { data: bookingsData, isLoading: isBookingsLoading } = useQuery({
    queryKey: ['expert-bookings'],
    queryFn: bookingService.getAll,
    refetchInterval: 3000,
  });

  const { data: availabilityData, isLoading: isAvailLoading } = useQuery({
    queryKey: ['my-availability'],
    queryFn: expertService.getMyAvailability,
  });

  useEffect(() => {
    if (availabilityData?.data && Array.isArray(availabilityData.data)) {
      setAvailabilitySlots(availabilityData.data);
    }
  }, [availabilityData]);

  const saveAvailabilityMutation = useMutation({
    mutationFn: (slots: any[]) => expertService.updateMyAvailability(slots),
    onSuccess: () => {
      toast.success('Availability schedule saved successfully! 🎉');
      queryClient.invalidateQueries({ queryKey: ['my-availability'] });
    },
    onError: () => {
      toast.error('Failed to update availability schedule.');
    },
  });

  const handleAddSlot = () => {
    const newSlot = {
      dayOfWeek: selectedDay,
      startTime: startTime.length === 5 ? `${startTime}:00` : startTime,
      endTime: endTime.length === 5 ? `${endTime}:00` : endTime,
      isOnline,
      isOffline,
    };
    setAvailabilitySlots((prev) => [...prev, newSlot]);
    toast.success(`Added slot for ${DAYS[selectedDay - 1]}! Click Save to apply.`);
  };

  const handleRemoveSlot = (index: number) => {
    setAvailabilitySlots((prev) => prev.filter((_, i) => i !== index));
  };

  const bookings = bookingsData?.data || [];

  const filteredBookings = filter === 'ALL'
    ? bookings
    : bookings.filter((b: any) => b.status === filter);

  return (
    <div className="px-2 sm:px-4 py-3 sm:py-6 space-y-6 text-white max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="glass-card-premium p-4 sm:p-8 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight">
            Expert Availability & Time Slots
          </h1>
          <span className="self-start sm:self-auto text-[10px] sm:text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Real-Time Schedule
          </span>
        </div>
        <p className="text-[#ffebbf] text-xs sm:text-sm font-medium leading-relaxed">
          Configure your available date & time slots for institutions and manage all booked sessions.
        </p>
      </div>

      {/* Time Slot Availability Configurator */}
      <div className="glass-card p-4 sm:p-8 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#0a2540] pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#ffebbf] shrink-0" />
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              Configure Your Weekly Available Time Slots
            </h2>
          </div>
          <button
            onClick={() => saveAvailabilityMutation.mutate(availabilitySlots)}
            disabled={saveAvailabilityMutation.isPending}
            className="w-full sm:w-auto btn-primary text-xs px-5 py-3 font-black uppercase tracking-wider shadow-ns-gold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> {saveAvailabilityMutation.isPending ? 'Saving Schedule...' : 'Save Availability Schedule'}
          </button>
        </div>

        {/* Add Slot Control Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-[#010101] p-3.5 sm:p-4 rounded-xl border border-[#0a2540]">
          <div>
            <label className="block text-[11px] font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Select Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full p-3 bg-[#090e18] border border-[#0a2540] text-white rounded-xl text-xs focus:outline-none font-medium"
            >
              {DAYS.map((day, idx) => (
                <option key={day} value={idx + 1}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#ffebbf] uppercase tracking-wider mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 bg-[#090e18] border border-[#0a2540] text-white rounded-xl text-xs focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#ffebbf] uppercase tracking-wider mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 bg-[#090e18] border border-[#0a2540] text-white rounded-xl text-xs focus:outline-none font-medium"
            />
          </div>

          <div className="flex items-center justify-start gap-6 py-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                className="w-4 h-4 rounded accent-[#b58153]"
              />
              Online
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isOffline}
                onChange={(e) => setIsOffline(e.target.checked)}
                className="w-4 h-4 rounded accent-[#b58153]"
              />
              Offline
            </label>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAddSlot}
              className="w-full btn-secondary text-xs py-3 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-[#b58153]/40 text-[#ffebbf] hover:bg-[#b58153] hover:text-black transition"
            >
              <Plus className="w-4 h-4" /> Add Available Slot
            </button>
          </div>
        </div>

        {/* Configured Slots Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Active Configured Slots ({availabilitySlots.length})
          </h3>
          {availabilitySlots.length === 0 ? (
            <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-xl text-center text-xs text-slate-400">
              No weekly recurring time slots configured yet. Use the form above to add your available dates & times.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availabilitySlots.map((slot, index) => (
                <div key={index} className="p-3.5 bg-[#010101] border border-[#0a2540] hover:border-[#b58153]/50 rounded-xl flex items-center justify-between transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{DAYS[(slot.dayOfWeek || 1) - 1]}</span>
                      <span className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2 py-0.5 rounded font-bold uppercase">
                        {slot.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono font-medium">
                      ⏰ {slot.startTime ? slot.startTime.substring(0, 5) : '10:00'} - {slot.endTime ? slot.endTime.substring(0, 5) : '12:00'}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveSlot(index)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    title="Remove Slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booked Sessions & Requests List Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              Booked Guest Sessions & Scheduled Requests
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">View full details, scheduled date & time, and meeting links.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#010101] p-1.5 rounded-xl border border-[#0a2540] overflow-x-auto no-scrollbar scroll-smooth w-full">
            {['ALL', 'PENDING', 'ACCEPTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 rounded-lg text-[11px] sm:text-xs font-extrabold uppercase tracking-wider whitespace-nowrap shrink-0 transition ${
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

        {isBookingsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-36 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 glass-card-premium p-6 border border-[#0a2540] rounded-2xl">
            <Calendar className="w-10 h-10 text-[#ffebbf] mx-auto mb-3" />
            <h3 className="text-base font-bold font-display text-white">No sessions found</h3>
            <p className="text-slate-300 text-xs mt-1">You don't have any bookings under status "{filter}".</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b: any) => {
              const isMeetUnlocked = b.meetingLink && ['CONFIRMED', 'COMPLETED'].includes(b.status);

              return (
                <div key={b.id} className="glass-card p-4 sm:p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-4 hover:border-[#b58153]/40 transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[#0a2540]">
                    <div>
                      <h3 className="font-bold text-white text-base sm:text-lg">{b.student?.fullName || 'Student Institution'}</h3>
                      <p className="text-xs text-slate-300 mt-0.5">{b.student?.institution} • {b.student?.city}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="p-3.5 sm:p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Scheduled Slot: <span className="text-[#ffebbf]">{b.scheduledAt ? formatDateTime(b.scheduledAt) : formatDateTime(b.createdAt)}</span></span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#0a2540]/80 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Session Fee</span>
                        <strong className="text-[#ffebbf] font-black">{formatCurrency(b.sessionFee)}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Duration</span>
                        <strong className="text-white font-bold">{b.durationMinutes || 60} mins</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Mode</span>
                        <strong className="text-teal-400 font-bold">{b.mode || 'ONLINE'}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex sm:items-center justify-end gap-2 pt-1 w-full">
                      {isMeetUnlocked ? (
                        <a
                          href={b.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary text-xs py-3 sm:py-2.5 px-4 font-black uppercase shadow-ns-gold flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <Video className="w-4 h-4" /> Join Live Meet
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 bg-[#090e18] px-3 py-2 rounded-lg border border-[#0a2540]">
                          <Lock className="w-3.5 h-3.5 text-amber-400" /> Meet link unlocks after payment verification
                        </span>
                      )}

                      <Link
                        to={`/student/bookings/${b.id}`}
                        className="btn-secondary text-xs py-3 sm:py-2.5 px-4 font-bold uppercase tracking-wider flex items-center justify-center gap-1 w-full sm:w-auto"
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
      </div>
    </div>
  );
};

export default ExpertBookingsPage;
