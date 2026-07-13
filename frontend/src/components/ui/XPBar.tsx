'use client';

import { useAuthStore } from '@/lib/store';
import { Zap } from 'lucide-react';

export function XPBar() {
  const { user } = useAuthStore();
  
  if (!user) return null;

  const xp = user.xp_points || 0;
  const level = user.level || 1;
  const xpForNextLevel = level * 500;
  const xpInCurrentLevel = xp % 500;
  const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/50 border border-gray-700/50">
      <Zap size={12} className="text-accent-400" />
      <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-400 font-mono">Niv.{level}</span>
    </div>
  );
}
