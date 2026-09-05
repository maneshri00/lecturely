import React from 'react';
import ReactDOM from 'react-dom';

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; size?: 'sm'|'md'|'lg'|'xl' }> = ({ isOpen, onClose, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };
  
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className={`glass-card-premium border border-[#0a2540] relative z-10 w-full ${sizes[size]} transform transition-all p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)]`}>
        <button className="absolute top-4 right-4 text-slate-400 hover:text-[#ffebbf] text-lg font-bold" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    document.body
  );
};
