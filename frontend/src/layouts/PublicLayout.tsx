import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { Outlet } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#010101] text-white selection:bg-[#0a2540] selection:text-[#ffebbf]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FeedbackWidget />
    </div>
  );
};
