import React from 'react';
import { cn } from './Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border border-[#0a2540] bg-[#010101] px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#ffebbf] focus:ring-2 focus:ring-[#b58153]/40 transition-all duration-200 shadow-inner',
              icon && 'pl-10',
              error 
                ? 'border-rose-500 focus:ring-rose-500' 
                : 'border-[#0a2540]',
              className
            )}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={cn("mt-1.5 text-xs font-semibold", error ? "text-rose-400" : "text-slate-400")}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
