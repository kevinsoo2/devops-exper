'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { Sparkles, X } from 'lucide-react';

export function WelcomeBack() {
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (!user) return;
    if (typeof window === 'undefined') return;

    // Only show once per session
    const shown = sessionStorage.getItem('devops-welcome-shown');
    if (shown) return;

    // Determine greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');

    // Show after 2 seconds
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem('devops-welcome-shown', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || !user) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] animate-slide-down">
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-dark-card/95 backdrop-blur-xl border border-primary-500/20 shadow-2xl shadow-primary-500/10">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <Sparkles size={14} className="text-white" />
        </div>
        <div>
          <p className="text-sm text-white font-medium">{greeting}, {user.username} ! 👋</p>
          <p className="text-[11px] text-gray-500">Prêt à continuer votre apprentissage DevOps ?</p>
        </div>
        <button onClick={() => setShow(false)} className="ml-2 p-1 text-gray-600 hover:text-white transition">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
