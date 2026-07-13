'use client';

import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    // Fallback: hide after 2s max
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[500] bg-dark flex flex-col items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      {/* Logo */}
      <div className="mb-8 animate-pulse-slow">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-2xl shadow-primary-500/30">
          <span className="text-2xl font-black text-white">DE</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold text-white mb-2">DevOps Expert</h1>
      <p className="text-xs text-gray-500 mb-8">Chargement de la plateforme...</p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}
