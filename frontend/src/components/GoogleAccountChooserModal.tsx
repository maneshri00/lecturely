import React, { useState, useEffect } from 'react';
import { X, Plus, ArrowRight, CheckCircle2, User, Trash2 } from 'lucide-react';

interface SavedGoogleAccount {
  name: string;
  email: string;
}

interface GoogleAccountChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (email: string, name: string) => void;
}

const STORAGE_KEY = 'lecturely_saved_google_accounts';

export const GoogleAccountChooserModal: React.FC<GoogleAccountChooserModalProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
}) => {
  const [savedAccounts, setSavedAccounts] = useState<SavedGoogleAccount[]>([]);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSavedAccounts(parsed);
            setShowInput(false);
          } else {
            setShowInput(true);
          }
        } else {
          setShowInput(true);
        }
      } catch (_) {
        setShowInput(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveAccountToMemory = (email: string, name: string) => {
    try {
      const existing = savedAccounts.filter((a) => a.email.toLowerCase() !== email.toLowerCase());
      const updated = [{ name, email }, ...existing].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (_) {}
  };

  const handleChooseAccount = (email: string, name: string) => {
    saveAccountToMemory(email, name);
    onSelectAccount(email, name);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmail) {
      const resolvedName = customName.trim() || customEmail.split('@')[0];
      handleChooseAccount(customEmail.trim(), resolvedName);
    }
  };

  const handleRemoveAccount = (e: React.MouseEvent, email: string) => {
    e.stopPropagation();
    const updated = savedAccounts.filter((a) => a.email.toLowerCase() !== email.toLowerCase());
    setSavedAccounts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (_) {}
    if (updated.length === 0) setShowInput(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#1e1e1e] border border-[#3c4043] rounded-3xl p-8 sm:p-10 shadow-2xl text-white relative font-sans animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
          title="Close modal"
        >
          <X size={20} />
        </button>

        {/* Google Header */}
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.35 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span className="text-slate-300 font-semibold text-base">Sign in with Google</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-2 tracking-tight">
          Choose your account
        </h2>
        <p className="text-slate-400 text-sm font-medium mb-8">
          to continue to <span className="text-[#8ab4f8] font-bold">Lecturely India</span>
        </p>

        {/* Saved Chrome Accounts List */}
        {savedAccounts.length > 0 && (
          <div className="mb-6 space-y-2">
            <div className="text-xs font-bold text-[#8ab4f8] uppercase tracking-wider mb-2">
              Recent Accounts
            </div>
            {savedAccounts.map((acc) => {
              const initials = acc.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || 'G';
              return (
                <div
                  key={acc.email}
                  onClick={() => handleChooseAccount(acc.email, acc.name)}
                  className="w-full p-3.5 rounded-2xl hover:bg-white/5 border border-[#3c4043]/60 hover:border-[#8ab4f8] transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8ab4f8] to-[#4285F4] text-[#121212] font-black text-sm flex items-center justify-center shadow-md">
                      {initials}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-[#8ab4f8] transition-colors">
                        {acc.name}
                      </div>
                      <div className="text-slate-400 text-xs font-medium">
                        {acc.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleRemoveAccount(e, acc.email)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition opacity-0 group-hover:opacity-100"
                      title="Remove saved account"
                    >
                      <Trash2 size={15} />
                    </button>
                    <ArrowRight size={16} className="text-slate-500 group-hover:text-[#8ab4f8] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Chrome Google Email Input Form */}
        {(showInput || savedAccounts.length === 0) ? (
          <form onSubmit={handleCustomSubmit} className="p-5 bg-[#28292c] border border-[#8ab4f8]/50 rounded-2xl space-y-4 mb-6 shadow-xl">
            <div className="text-xs font-bold text-[#8ab4f8] uppercase tracking-wider flex items-center justify-between">
              <span>Enter Chrome Google Account</span>
              <span className="text-[10px] text-slate-400 normal-case font-normal">Fast 1-Click SSO</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Google Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. yourname@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#3c4043] focus:border-[#8ab4f8] text-white text-sm rounded-xl outline-none font-medium shadow-inner"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Shriraj Mane"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#3c4043] focus:border-[#8ab4f8] text-white text-sm rounded-xl outline-none font-medium shadow-inner"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {savedAccounts.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-lg"
                >
                  Use Saved
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#121212] text-xs font-black uppercase rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                Sign in with Google <ArrowRight size={14} />
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full p-4 rounded-2xl hover:bg-white/5 border border-dashed border-[#3c4043] hover:border-[#8ab4f8] transition flex items-center gap-3 group text-left mb-6"
          >
            <div className="w-9 h-9 rounded-full bg-[#2a2b2e] text-slate-300 flex items-center justify-center border border-white/10 group-hover:border-[#8ab4f8]">
              <Plus size={18} className="group-hover:text-[#8ab4f8] transition-colors" />
            </div>
            <span className="font-semibold text-slate-300 text-sm group-hover:text-white transition-colors">
              Add another Chrome email address
            </span>
          </button>
        )}

        {/* Disclaimer */}
        <div className="border-t border-[#3c4043] pt-5 text-xs text-slate-400 leading-relaxed">
          Before using this app, you can review Lecturely India's{' '}
          <a href="#" className="text-[#8ab4f8] hover:underline font-medium">Privacy Policy</a> and{' '}
          <a href="#" className="text-[#8ab4f8] hover:underline font-medium">Terms of Service</a>.
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium border-t border-[#2a2b2e]">
          <span>English (United States)</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Help</a>
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};
