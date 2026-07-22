'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee, BookOpen, Target, TrendingUp } from 'lucide-react';

export default function StudyPage() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = parseInt(localStorage.getItem('devops-study-minutes') || '0');
      setTotalMinutes(saved);
      const savedSessions = parseInt(localStorage.getItem('devops-study-sessions') || '0');
      setSessions(savedSessions);
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session complete
      if (mode === 'focus') {
        const newSessions = sessions + 1;
        const newMinutes = totalMinutes + 25;
        setSessions(newSessions);
        setTotalMinutes(newMinutes);
        if (typeof window !== 'undefined') {
          localStorage.setItem('devops-study-minutes', String(newMinutes));
          localStorage.setItem('devops-study-sessions', String(newSessions));
        }
        setMode('break');
        setTimeLeft(breakTime);
      } else {
        setMode('focus');
        setTimeLeft(focusTime);
      }
      setIsRunning(false);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft, mode, sessions, totalMinutes]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => { setIsRunning(false); setTimeLeft(mode === 'focus' ? focusTime : breakTime); };
  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? focusTime : breakTime);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === 'focus' ? ((focusTime - timeLeft) / focusTime) * 100 : ((breakTime - timeLeft) / breakTime) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Header */}
        <span className="section-badge">
          <Timer size={16} className="text-primary-400" />
          Mode Étude
        </span>
        <h1 className="text-4xl font-bold dark:text-white mt-4">
          Pomodoro <span className="gradient-text">DevOps</span>
        </h1>
        <p className="mt-2 text-gray-500">
          25 min de focus, 5 min de pause. Restez concentré et progressez.
        </p>

        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button onClick={() => switchMode('focus')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === 'focus' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-800 text-gray-400'}`}>
            <BookOpen size={14} className="inline mr-2" /> Focus
          </button>
          <button onClick={() => switchMode('break')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === 'break' ? 'bg-success-500 text-white shadow-lg shadow-success-500/30' : 'bg-gray-800 text-gray-400'}`}>
            <Coffee size={14} className="inline mr-2" /> Pause
          </button>
        </div>

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mx-auto mt-10">
          {/* Progress ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="4" />
            <circle cx="50" cy="50" r="45" fill="none"
              stroke={mode === 'focus' ? '#6366f1' : '#10b981'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white font-mono">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
            <span className={`text-sm mt-2 font-medium ${mode === 'focus' ? 'text-primary-400' : 'text-success-400'}`}>
              {mode === 'focus' ? '🎯 Focus' : '☕ Pause'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={reset}
            className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 transition-all">
            <RotateCcw size={20} />
          </button>
          <button onClick={toggle}
            className={`p-5 rounded-2xl text-white shadow-xl transition-all hover:scale-105 ${
              mode === 'focus' ? 'bg-primary-500 shadow-primary-500/30' : 'bg-success-500 shadow-success-500/30'
            }`}>
            {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-0.5" />}
          </button>
          <div className="p-3 rounded-xl bg-gray-800 text-gray-400">
            <span className="text-xs font-mono">{sessions} 🍅</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <div className="card text-center">
            <Target size={20} className="mx-auto text-primary-400 mb-2" />
            <p className="text-2xl font-bold text-white">{sessions}</p>
            <p className="text-xs text-gray-500">Sessions</p>
          </div>
          <div className="card text-center">
            <Timer size={20} className="mx-auto text-success-400 mb-2" />
            <p className="text-2xl font-bold text-white">{Math.floor(totalMinutes / 60)}h{totalMinutes % 60}m</p>
            <p className="text-xs text-gray-500">Temps total</p>
          </div>
          <div className="card text-center">
            <TrendingUp size={20} className="mx-auto text-accent-400 mb-2" />
            <p className="text-2xl font-bold text-white">{Math.round(totalMinutes / 25)}</p>
            <p className="text-xs text-gray-500">Pomodoros</p>
          </div>
        </div>

        {/* Tips */}
        <div className="card mt-8 text-left border-primary-500/20 bg-primary-500/5">
          <h3 className="font-bold text-white text-sm mb-2">💡 Conseils pour étudier efficacement</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Désactivez les notifications pendant le focus</li>
            <li>• Un Pomodoro = une tâche unique (pas de multi-tasking)</li>
            <li>• Après 4 Pomodoros, prenez une longue pause (15-30 min)</li>
            <li>• Notez ce que vous apprenez dans la section Notes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
