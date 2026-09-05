import React from 'react';

interface RatingProps {
  value: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({ value, max = 5, readOnly = false, onChange, size = 'md' }) => {
  const roundedVal = Math.round(value);
  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(max)].map((_, i) => (
        <span
          key={i}
          className={`cursor-pointer transition-colors ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'} ${i < roundedVal ? 'text-amber-400 font-bold' : 'text-slate-500/50'}`}
          onClick={() => !readOnly && onChange?.(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};
