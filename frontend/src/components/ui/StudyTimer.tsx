'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee } from 'lucide-react';

type TimerMode = 'focus' | 'break';

export function StudyTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const focusDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      if (mode === 'focus') {
        setSessions(prev => prev + 1);
        setMode('break');
        setTimeLeft(breakDuration);
        // Save study time
        if (typeof window !== 'undefined') {
          const total = parseInt(localStorage.getItem('devops-study-minutes') || '0');
          localStorage.setItem('devops-study-minutes', String(total + 25));
        }
      } else {
        setMode('focus');
        setTimeLeft(focusDuration);
      }
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(focusDuration);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((focusDuration - timeLeft) / focusDuration) * 100
    : ((breakDuration - timeLeft) / breakDuration) * 100;

  // Floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-xl shadow-secondary-500/30 flex items-center justify-center hover:scale-110 transition-all"
        title="Timer d'étude Pomodoro"
      >
        <Timer size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-72 bg-dark-card border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/30 p-5 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {mode === 'focus' ? <Timer size={16} className="text-primary-400" /> : <Coffee size={16} className="text-success-400" />}
          <span className="text-sm font-medium text-white">
            {mode === 'focus' ? 'Focus' : 'Pause'}
          </span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white text-xs">
          Réduire
        </button>
      </div>

      {/* Timer display */}
      <div className="text-center mb-4">
        <div className="relative inline-flex items-center justify-center">
          {/* Progress ring */}
          <svg width="120" height="120" className="transform -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-800" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke={mode === 'focus' ? '#6366f1' : '#10b981'}
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-2xl font-mono font-bold text-white">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button onClick={resetTimer} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition">
          <RotateCcw size={16} />
        </button>
        <button
          onClick={toggleTimer}
          className={`px-5 py-2 rounded-xl font-medium text-sm transition-all ${
            isRunning
              ? 'bg-danger-500/20 text-danger-400 hover:bg-danger-500/30'
              : 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
          }`}
        >
          {isRunning ? <><Pause size={14} className="inline mr-1" /> Pause</> : <><Play size={14} className="inline mr-1" /> Démarrer</>}
        </button>
      </div>

      {/* Stats */}
      <div className="text-center text-xs text-gray-500">
        {sessions > 0 && <span>🎯 {sessions} session{sessions > 1 ? 's' : ''} aujourd&apos;hui</span>}
      </div>
    </div>
  );
}
