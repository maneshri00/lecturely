import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl border transition-all duration-300 flex items-center gap-1.5 font-bold text-xs ${
        theme === 'light'
          ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-sm'
          : 'bg-[#0a2540] text-[#ffebbf] border-[#b58153]/40 hover:bg-[#1a385c] shadow-md'
      } ${className}`}
      title={theme === 'light' ? 'Switch to Dark Mode 🌙' : 'Switch to Bright Mode ☀️'}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <>
          <Sun className="w-4 h-4 text-amber-600 fill-amber-500 animate-spin-slow" />
          <span>Bright</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
};
