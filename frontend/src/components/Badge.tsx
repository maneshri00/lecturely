import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants: Record<string, string> = {
    primary: 'bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40',
    secondary: 'bg-[#010101] text-slate-300 border border-[#0a2540]',
    success: 'bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/50',
    warning: 'bg-[#010101] text-amber-300 border border-amber-500/40',
    danger: 'bg-rose-950/60 text-rose-400 border border-rose-500/40',
    info: 'bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40',
    gold: 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] font-black border border-[#ffebbf] shadow-ns-gold'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
