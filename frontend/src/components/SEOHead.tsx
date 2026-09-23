import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Lecturely India — Book IIT Professors, Guest Lectures, 1-on-1 Mentors & Personal Tutors',
  description = "Connect directly with India's top verified IIT professors, Google staff engineers, research advisors, and 1-on-1 tutors. Book college guest lectures, technical workshops, GATE/AI-ML mentorship, and thesis guidance with Razorpay escrow protection.",
  keywords = 'Lecturely India, Guest Lectures in India, IIT Professors for Lectures, 1-on-1 Personal Tutor India, Engineering College Speakers, AI ML Mentors, Ph.D Research Advisors, GATE Tutors India, College Seminar Booking, Escrow Education Payments',
  canonicalPath = '/',
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update OG title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update OG description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // Update canonical link
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', `https://lecturely.netlify.app${canonicalPath}`);
    }
  }, [title, description, keywords, canonicalPath]);

  return null;
};
