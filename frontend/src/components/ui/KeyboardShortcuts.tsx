'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Keyboard } from 'lucide-react';

export function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch(e.key) {
        case '?': setShowHelp(prev => !prev); break;
        case 'h': if (!e.ctrlKey) router.push('/'); break;
        case 'c': if (!e.ctrlKey) router.push('/courses'); break;
        case 'l': if (!e.ctrlKey) router.push('/labs'); break;
        case 'r': if (!e.ctrlKey) router.push('/roadmap'); break;
        case 'd': if (!e.ctrlKey) router.push('/dashboard'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center" onClick={() => setShowHelp(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-dark-card border border-gray-700/50 rounded-2xl p-6 max-w-sm w-full mx-4 animate-scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-4">
          <Keyboard size={18} className="text-primary-400" />
          <h3 className="font-bold text-white">Raccourcis clavier</h3>
        </div>
        <div className="space-y-2">
          {[
            ['⌘K', 'Rechercher'],
            ['H', 'Accueil'],
            ['C', 'Formations'],
            ['L', 'Labs'],
            ['R', 'Roadmap'],
            ['D', 'Dashboard'],
            ['?', 'Afficher/masquer cette aide'],
            ['Esc', 'Fermer les modales'],
          ].map(([key, desc]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-xs text-gray-300 font-mono">{key}</kbd>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-gray-600 text-center">Appuyez sur ? pour fermer</p>
      </div>
    </div>
  );
}
