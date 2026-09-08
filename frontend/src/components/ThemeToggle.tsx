import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`px-3 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 font-extrabold text-xs shadow-md cursor-pointer select-none active:scale-95 ${
        isDark
          ? 'bg-[#0a2540] text-[#ffebbf] border-[#b58153]/50 hover:bg-[#153a5e] hover:border-[#ffebbf]'
          : 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200 hover:border-amber-500 shadow-amber-200/50'
      } ${className}`}
      title={isDark ? 'Switch to Bright Mode ☀️' : 'Switch to Dark Mode 🌙'}
      aria-label="Toggle Dark / Bright Mode"
    >
      {isDark ? (
        <>
          <Moon className="w-4 h-4 text-[#ffebbf] fill-[#ffebbf]/20" />
          <span className="tracking-wide">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-600 fill-amber-500 animate-spin-slow" />
          <span className="tracking-wide">Bright</span>
        </>
      )}
    </button>
  );
};
