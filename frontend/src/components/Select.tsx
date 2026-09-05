import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, className, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">
        {label}
      </label>
    )}
    <select
      ref={ref}
      className={`w-full px-4 py-3 bg-[#010101] border ${error ? 'border-rose-500' : 'border-[#0a2540]'} focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner ${className || ''}`}
      {...props}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-[#090e18] text-white">
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-rose-400 text-xs mt-1 font-semibold">{error}</p>}
  </div>
));
Select.displayName = 'Select';
