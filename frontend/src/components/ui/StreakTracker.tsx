'use client';

import { useState, useEffect } from 'react';
import { Flame, Calendar } from 'lucide-react';

export function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [calendar, setCalendar] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('devops-streak');
    if (saved) {
      const data = JSON.parse(saved);
      setStreak(data.streak || 0);
      setCalendar(data.calendar || {});
    }
    // Mark today as active
    const today = new Date().toISOString().split('T')[0];
    const updated = { ...JSON.parse(saved || '{}').calendar, [today]: true };
    const streakCount = calculateStreak(updated);
    const newData = { streak: streakCount, calendar: updated, lastVisit: today };
    localStorage.setItem('devops-streak', JSON.stringify(newData));
    setStreak(streakCount);
    setCalendar(updated);
  }, []);

  function calculateStreak(cal: Record<string, boolean>): number {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      if (cal[key]) count++;
      else break;
    }
    return count;
  }

  // Generate last 28 days for mini calendar
  const days = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    days.push({ key, active: !!calendar[key], isToday: i === 0 });
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={20} className={streak > 0 ? 'text-accent-400' : 'text-gray-600'} />
          <div>
            <span className="text-lg font-bold text-white">{streak}</span>
            <span className="text-xs text-gray-500 ml-1">jours de suite</span>
          </div>
        </div>
        <Calendar size={16} className="text-gray-500" />
      </div>

      {/* Mini calendar (28 days) */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div
            key={day.key}
            className={`w-full aspect-square rounded-sm transition-all ${
              day.active
                ? 'bg-primary-500 shadow-sm shadow-primary-500/30'
                : 'bg-gray-800'
            } ${day.isToday ? 'ring-1 ring-primary-400' : ''}`}
            title={day.key}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 text-[10px] text-gray-600">
        <span>4 semaines</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-gray-800" /> Inactif
          <div className="w-2 h-2 rounded-sm bg-primary-500 ml-2" /> Actif
        </div>
      </div>

      {streak >= 7 && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-accent-500/10 border border-accent-500/20 text-center">
          <span className="text-xs text-accent-400 font-medium">
            🔥 {streak >= 30 ? 'Streak Légendaire !' : streak >= 7 ? 'Semaine parfaite !' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
