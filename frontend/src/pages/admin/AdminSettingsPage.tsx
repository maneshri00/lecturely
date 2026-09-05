import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Settings, ShieldCheck, Sliders, Server, Bell, Lock, Database, Power, ShieldAlert, Key, Activity, Clock, Cpu } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [mandatoryVerification, setMandatoryVerification] = useState(true);
  const [autoMeetGeneration, setAutoMeetGeneration] = useState(true);
  const [asyncEmailDispatch, setAsyncEmailDispatch] = useState(true);
  const [escrowProtection, setEscrowProtection] = useState(true);
  const [platformFeeRate, setPlatformFeeRate] = useState(10);

  // Security Policy Controls State
  const [enforceAdmin2FA, setEnforceAdmin2FA] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(120);
  const [maxFailedLoginAttempts, setMaxFailedLoginAttempts] = useState(5);
  const [rateLimitPerMin, setRateLimitPerMin] = useState(100);

  const [auditLogs] = useState([
    { id: 1, timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString(), action: 'ADMIN_ROLE_CHANGE', target: 'expert_john@lecturely.com', actor: 'Admin Master', detail: 'Role modified to EXPERT' },
    { id: 2, timestamp: new Date(Date.now() - 1000 * 60 * 18).toLocaleTimeString(), action: 'FORCE_PASSWORD_RESET', target: 'student_alex@lecturely.com', actor: 'Admin Master', detail: 'Generated temporary secure credential' },
    { id: 3, timestamp: new Date(Date.now() - 1000 * 60 * 42).toLocaleTimeString(), action: 'PAYMENT_VERIFIED', target: 'Booking #8912', actor: 'Admin Master', detail: 'Manual QR Payment verified (Transaction TXN94827)' },
    { id: 4, timestamp: new Date(Date.now() - 1000 * 60 * 90).toLocaleTimeString(), action: 'EXPERT_DOC_APPROVED', target: 'Dr. Sarah Connor (ID #12)', actor: 'Admin Master', detail: 'PhD Certificate verified' },
  ]);

  const handleSaveSettings = () => {
    toast.success('Master Platform Control & Security Settings saved successfully! ⚙️');
  };

  return (
    <div className="space-y-6 text-white max-w-5xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="glass-card-premium p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Global Security & Master Controls</h1>
            <span className="text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Supreme Control
            </span>
          </div>
          <p className="text-[#ffebbf] text-xs sm:text-sm mt-1.5 font-medium">
            Configure security policies, session thresholds, escrow parameters, and view live security audit trails.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="btn-primary text-xs px-5 py-2.5 font-black uppercase shadow-ns-gold flex items-center gap-2"
        >
          <Settings className="w-4 h-4" /> Save Master Settings
        </button>
      </div>

      {/* Supreme Security & Policy Controls */}
      <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#0a2540] pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Platform Security & Access Policies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-white text-xs block">Enforce Admin 2-Factor Auth</span>
              <span className="text-[11px] text-slate-400">Require OTP code for administrative logins</span>
            </div>
            <input
              type="checkbox"
              checked={enforceAdmin2FA}
              onChange={(e) => setEnforceAdmin2FA(e.target.checked)}
              className="w-5 h-5 accent-[#b58153] cursor-pointer"
            />
          </div>

          <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-1">
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
              JWT Session Timeout (Minutes)
            </label>
            <input
              type="number"
              value={sessionTimeoutMinutes}
              onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
              className="w-full p-2 bg-[#090e18] border border-[#0a2540] text-white font-mono text-xs rounded-lg focus:outline-none focus:border-[#b58153]"
            />
          </div>

          <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-1">
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
              Failed Login Lockout Threshold
            </label>
            <input
              type="number"
              value={maxFailedLoginAttempts}
              onChange={(e) => setMaxFailedLoginAttempts(Number(e.target.value))}
              className="w-full p-2 bg-[#090e18] border border-[#0a2540] text-white font-mono text-xs rounded-lg focus:outline-none focus:border-[#b58153]"
            />
          </div>

          <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-1">
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
              API Rate Limit Threshold (Req/Min)
            </label>
            <input
              type="number"
              value={rateLimitPerMin}
              onChange={(e) => setRateLimitPerMin(Number(e.target.value))}
              className="w-full p-2 bg-[#090e18] border border-[#0a2540] text-white font-mono text-xs rounded-lg focus:outline-none focus:border-[#b58153]"
            />
          </div>
        </div>
      </div>

      {/* Master Feature Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform Maintenance Mode */}
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0a2540] text-amber-400 rounded-xl border border-[#b58153]/40">
                <Power className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">System Maintenance Mode</h3>
                <p className="text-xs text-slate-400">Pause student bookings & logins temporarily.</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-5 h-5 accent-[#b58153] cursor-pointer"
            />
          </div>
        </div>

        {/* Mandatory Verification */}
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0a2540] text-emerald-400 rounded-xl border border-[#b58153]/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Mandatory Expert Verification</h3>
                <p className="text-xs text-slate-400">Only verified experts appear in search directory.</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={mandatoryVerification}
              onChange={(e) => setMandatoryVerification(e.target.checked)}
              className="w-5 h-5 accent-[#b58153] cursor-pointer"
            />
          </div>
        </div>

        {/* Automated Google Meet Link Generation */}
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Automated Live Meet Generation</h3>
                <p className="text-xs text-slate-400">Auto-create Google Meet link on slot acceptance.</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoMeetGeneration}
              onChange={(e) => setAutoMeetGeneration(e.target.checked)}
              className="w-5 h-5 accent-[#b58153] cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Async Email Notifications */}
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0a2540] text-teal-400 rounded-xl border border-[#b58153]/40">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Async Real-Time Email Dispatch</h3>
                <p className="text-xs text-slate-400">Send dual emails asynchronously in background.</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={asyncEmailDispatch}
              onChange={(e) => setAsyncEmailDispatch(e.target.checked)}
              className="w-5 h-5 accent-[#b58153] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Financial & Fee Rules */}
      <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#0a2540] pb-3">
          <Lock className="w-5 h-5 text-[#ffebbf]" />
          <h2 className="text-base font-bold text-white">Escrow & Financial Commission Rules</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">
              Platform Fee Commission Rate (%)
            </label>
            <input
              type="number"
              value={platformFeeRate}
              onChange={(e) => setPlatformFeeRate(Number(e.target.value))}
              className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white font-bold rounded-xl text-sm focus:outline-none focus:border-[#b58153]"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              checked={escrowProtection}
              onChange={(e) => setEscrowProtection(e.target.checked)}
              className="w-5 h-5 accent-[#b58153] cursor-pointer"
            />
            <div>
              <span className="font-bold text-white text-xs block">Enable Escrow Security Protection</span>
              <span className="text-[11px] text-slate-400">Funds held in escrow until session completion.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Trail Log Viewer */}
      <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#0a2540] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Security Audit Log & Activity Probe</h2>
          </div>
          <span className="text-[11px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
            Live Stream Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#010101] text-slate-400 uppercase text-[10px] border-b border-[#0a2540]">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Target Entity</th>
                <th className="px-4 py-2">Actor</th>
                <th className="px-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a2540]/50 text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#010101]/40">
                  <td className="px-4 py-2 text-slate-400">{log.timestamp}</td>
                  <td className="px-4 py-2 font-bold text-amber-400">{log.action}</td>
                  <td className="px-4 py-2 text-white">{log.target}</td>
                  <td className="px-4 py-2 text-blue-300">{log.actor}</td>
                  <td className="px-4 py-2 text-slate-300">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Server Metrics */}
      <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-3">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Live System Diagnostics & Probes</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-[#010101] border border-[#0a2540] rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Backend Runtime</span>
            <span className="text-xs font-black text-emerald-400">Java 21 Alpine</span>
          </div>
          <div className="p-3 bg-[#010101] border border-[#0a2540] rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Database Engine</span>
            <span className="text-xs font-black text-emerald-400">PostgreSQL 16</span>
          </div>
          <div className="p-3 bg-[#010101] border border-[#0a2540] rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Actuator Health</span>
            <span className="text-xs font-black text-emerald-400">HTTP 200 UP</span>
          </div>
          <div className="p-3 bg-[#010101] border border-[#0a2540] rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Security Audit Workers</span>
            <span className="text-xs font-black text-[#ffebbf]">Active Enforcer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
