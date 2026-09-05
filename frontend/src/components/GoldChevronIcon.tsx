import React from 'react';

interface GoldChevronIconProps {
  className?: string;
  size?: number;
}

export const GoldChevronIcon: React.FC<GoldChevronIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="goldChevronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEBBF" />
          <stop offset="45%" stopColor="#E5BD67" />
          <stop offset="100%" stopColor="#B58153" />
        </linearGradient>
        <filter id="goldChevronGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Upward Gold Chevron Peak ^ Icon matching uploaded image (No Text) */}
      <path 
        d="M 18,76 L 50,20 L 82,76 L 67,76 L 50,45 L 33,76 Z" 
        fill="url(#goldChevronGrad)" 
        filter="url(#goldChevronGlow)" 
      />
    </svg>
  );
};

export default GoldChevronIcon;
