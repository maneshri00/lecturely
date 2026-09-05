import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, showCount, maxLength, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        maxLength={maxLength}
        className={`w-full p-4 bg-[#010101] border ${error ? 'border-rose-500' : 'border-[#0a2540]'} focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner ${className || ''}`}
        {...props}
      />
      <div className="flex justify-between mt-1">
        {error ? <p className="text-rose-400 text-xs font-semibold">{error}</p> : <span />}
        {showCount && maxLength && (
          <span className="text-xs text-slate-400 font-medium">
            {props.value?.toString().length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});
Textarea.displayName = 'Textarea';
