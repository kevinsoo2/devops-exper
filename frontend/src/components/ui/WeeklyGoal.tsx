'use client';

import { useState, useEffect } from 'react';
import { Target, TrendingUp, Flame } from 'lucide-react';

export function WeeklyGoal() {
  const [goal, setGoal] = useState(5); // lessons per week
  const [completed, setCompleted] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('devops-weekly-goal');
    if (saved) {
      const data = JSON.parse(saved);
      const thisWeek = getWeekKey();
      setGoal(data.goal || 5);
      setCompleted(data.weeks?.[thisWeek] || 0);
    }
  }, []);

  function getWeekKey() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  }

  function saveGoal(newGoal: number) {
    setGoal(newGoal);
    setEditing(false);
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('devops-weekly-goal') || '{}');
      saved.goal = newGoal;
      localStorage.setItem('devops-weekly-goal', JSON.stringify(saved));
    }
  }

  const progress = Math.min(100, (completed / goal) * 100);
  const isCompleted = completed >= goal;

  return (
    <div className={`card ${isCompleted ? 'border-success-500/30 bg-success-500/5' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={18} className={isCompleted ? 'text-success-400' : 'text-primary-400'} />
          <h3 className="font-bold text-white text-sm">Objectif Hebdomadaire</h3>
        </div>
        <button onClick={() => setEditing(!editing)} className="text-xs text-gray-500 hover:text-primary-400 transition">
          {editing ? 'Annuler' : 'Modifier'}
        </button>
      </div>

      {editing ? (
        <div className="space-y-3">
          <p className="text-xs text-gray-400">Combien de leçons par semaine ?</p>
          <div className="flex items-center gap-2">
            {[3, 5, 7, 10, 15].map(g => (
              <button key={g} onClick={() => saveGoal(g)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${g === goal ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-white">{completed}</span>
              <span className="text-gray-500 text-sm">/{goal} leçons</span>
            </div>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-success-400 font-medium">
                <Flame size={12} /> Objectif atteint !
              </span>
            )}
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-gradient-to-r from-success-500 to-emerald-400' : 'bg-gradient-to-r from-primary-500 to-secondary-500'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-gray-600">{Math.round(progress)}% complété</span>
            <span className="text-[10px] text-gray-600 flex items-center gap-1">
              <TrendingUp size={10} /> {Math.max(0, goal - completed)} restantes
            </span>
          </div>
        </>
      )}
    </div>
  );
}
