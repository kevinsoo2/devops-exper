'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { api } from '@/lib/api';
import { BookOpen, FlaskConical, Award, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user, token, isLoading } = useAuthStore();
  const router = useRouter();
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }
    if (token) {
      api.progress.get(token)
        .then(setProgress)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, token, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <i className="fas fa-spinner fa-spin text-2xl text-primary"></i>
      </div>
    );
  }

  const stats = progress?.stats || {
    courses_enrolled: 0,
    courses_completed: 0,
    labs_completed: 0,
    hours_learned: 0,
    certifications_in_progress: 0,
  };

  const statCards = [
    { icon: BookOpen, label: 'Cours inscrits', value: stats.courses_enrolled, color: 'text-primary' },
    { icon: FlaskConical, label: 'Labs complétés', value: stats.labs_completed, color: 'text-secondary' },
    { icon: Award, label: 'Certifs en cours', value: stats.certifications_in_progress, color: 'text-amber-400' },
    { icon: Clock, label: 'Heures apprises', value: stats.hours_learned, color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Bonjour, <span className="gradient-text">{user.name}</span> 👋
          </h1>
          <p className="text-slate-400">
            Plan: <span className="text-primary-light font-medium capitalize">{user.plan}</span> • Continuez votre progression DevOps
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => (
            <div key={stat.label} className="card flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent enrollments */}
        {progress?.enrollments?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Mes formations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.enrollments.slice(0, 4).map((enrollment: any) => (
                <div key={enrollment.id} className="card flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <i className={`${enrollment.icon || 'fas fa-book'} text-primary`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{enrollment.title}</h4>
                    <div className="mt-1.5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${enrollment.progress_percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">{enrollment.progress_percent}% complété</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {loading ? (
          <div className="card animate-pulse h-40" />
        ) : stats.courses_enrolled === 0 && (
          <div className="card text-center py-16">
            <BookOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Commencez votre parcours</h3>
            <p className="text-sm text-slate-400 mb-6">Explorez nos formations et inscrivez-vous pour commencer.</p>
            <a href="/courses" className="btn-primary">Explorer les cours</a>
          </div>
        )}
      </div>
    </div>
  );
}
