import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = 2; // Mock

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-[#ffebbf] transition rounded-full hover:bg-[#0a2540]"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#b58153] rounded-full border border-[#010101]"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 glass-card-premium border border-[#0a2540] z-50 overflow-hidden shadow-2xl">
            <div className="p-3 border-b border-[#0a2540] flex justify-between items-center bg-[#010101]">
              <h4 className="text-sm font-bold text-white">Notifications</h4>
              <button className="text-xs text-[#ffebbf] font-semibold hover:underline">Mark all read</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-[#0a2540] hover:bg-[#0a2540]/40 transition cursor-pointer">
                <p className="text-sm text-[#ffebbf] font-bold">New Booking Request</p>
                <p className="text-xs text-slate-300 mt-1">Rahul Sharma has requested a session.</p>
                <p className="text-xs text-slate-400 mt-1 font-mono">10m ago</p>
              </div>
              <div className="p-3 border-b border-[#0a2540] hover:bg-[#0a2540]/40 transition cursor-pointer">
                <p className="text-sm text-[#ffebbf] font-bold">Session Confirmed</p>
                <p className="text-xs text-slate-300 mt-1">Your session on VLSI Design is confirmed.</p>
                <p className="text-xs text-slate-400 mt-1 font-mono">1h ago</p>
              </div>
            </div>
            <Link to="/notifications" className="block text-center p-2.5 text-xs font-bold text-[#ffebbf] bg-[#010101] hover:bg-[#0a2540] transition uppercase tracking-wider">
              View all
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
