'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full 
        bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/30
        flex items-center justify-center
        transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/40
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
