'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Clock, BookOpen, FlaskConical, Trophy, TrendingUp, Calendar, Target } from 'lucide-react';
import { ProgressRing } from '@/components/ui/ProgressRing';

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalMinutes: 0,
    streak: 0,
    lessonsCompleted: 0,
    labsCompleted: 0,
    quizzesPassed: 0,
    notesCount: 0,
    bookmarksCount: 0,
    dailyChallengesCompleted: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const studyMinutes = parseInt(localStorage.getItem('devops-study-minutes') || '0');
    const streakData = JSON.parse(localStorage.getItem('devops-streak') || '{}');
    const notes = JSON.parse(localStorage.getItem('devops-notes') || '[]');
    const bookmarks = JSON.parse(localStorage.getItem('devops-bookmarks') || '[]');

    setStats({
      totalMinutes: studyMinutes,
      streak: streakData.streak || 0,
      lessonsCompleted: Math.floor(studyMinutes / 10),
      labsCompleted: Math.floor(studyMinutes / 30),
      quizzesPassed: Math.floor(studyMinutes / 20),
      notesCount: notes.length,
      bookmarksCount: bookmarks.length,
      dailyChallengesCompleted: Object.keys(streakData.calendar || {}).length,
    });
  }, []);

  const totalHours = Math.floor(stats.totalMinutes / 60);
  const progressPercent = Math.min(100, Math.floor((stats.totalMinutes / (200 * 60)) * 100)); // 200h target

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="section-badge"><BarChart3 size={14} /> Statistiques</span>
          <h1 className="text-3xl font-bold dark:text-white mt-4">
            Vos <span className="gradient-text">Statistiques</span>
          </h1>
          <p className="text-gray-500 mt-2">Votre progression détaillée sur la plateforme.</p>
        </div>

        {/* Main progress */}
        <div className="card mb-8 flex flex-col md:flex-row items-center gap-8 p-8">
          <ProgressRing progress={progressPercent} size={120} strokeWidth={8}>
            <div className="text-center">
              <span className="text-xl font-bold text-white">{totalHours}h</span>
              <p className="text-[9px] text-gray-500">/ 200h</p>
            </div>
          </ProgressRing>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-2">Progression globale</h2>
            <p className="text-gray-400 text-sm mb-4">
              Vous avez étudié {totalHours} heures sur un objectif de 200 heures pour devenir expert DevOps.
            </p>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">{progressPercent}% complété • {200 - totalHours}h restantes</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: 'Temps d\'étude', value: `${totalHours}h ${stats.totalMinutes % 60}m`, color: 'text-primary-400 bg-primary-500/10' },
            { icon: Calendar, label: 'Jours de suite', value: stats.streak, color: 'text-accent-400 bg-accent-500/10' },
            { icon: BookOpen, label: 'Leçons terminées', value: stats.lessonsCompleted, color: 'text-secondary-400 bg-secondary-500/10' },
            { icon: FlaskConical, label: 'Labs complétés', value: stats.labsCompleted, color: 'text-success-400 bg-success-500/10' },
            { icon: Target, label: 'Quiz réussis', value: stats.quizzesPassed, color: 'text-purple-400 bg-purple-500/10' },
            { icon: Trophy, label: 'Défis du jour', value: stats.dailyChallengesCompleted, color: 'text-danger-400 bg-danger-500/10' },
            { icon: TrendingUp, label: 'Notes prises', value: stats.notesCount, color: 'text-cyan-400 bg-cyan-500/10' },
            { icon: BarChart3, label: 'Favoris', value: stats.bookmarksCount, color: 'text-pink-400 bg-pink-500/10' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card text-center">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon size={18} />
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Weekly activity (fake chart) */}
        <div className="card mb-8">
          <h3 className="font-bold dark:text-white mb-4">Activité de la semaine</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => {
              const height = [60, 80, 45, 90, 70, 30, 50][i];
              const isToday = i === new Date().getDay() - 1;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-primary-500' : 'bg-gray-700'}`}
                    style={{ height: `${height}%` }}
                  />
                  <span className={`text-[10px] ${isToday ? 'text-primary-400 font-medium' : 'text-gray-600'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/dashboard" className="btn-outline text-sm">← Retour au Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
