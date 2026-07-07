'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FlaskConical, Clock, Zap, ArrowLeft, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { labs as labsApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';


const fallbackLab = {
  id: '1',
  title: 'Deploy Multi-Container App with Docker Compose',
  slug: 'docker-compose-deploy',
  difficulty: 'Beginner',
  duration: '30 min',
  xp: 150,
  category: 'Containers',
  description: 'In this lab you will learn to orchestrate multiple containers using Docker Compose. You will create a web application with a frontend, backend API, and database, all connected through Docker networking.',
  objectives: [
    'Create a docker-compose.yml file',
    'Configure multi-container networking',
    'Set up environment variables',
    'Implement health checks',
    'Use volumes for data persistence',
  ],
  prerequisites: ['Basic Docker knowledge', 'Command line familiarity'],
  tools: ['Docker', 'Docker Compose', 'VS Code'],
};

export default function LabDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    labsApi.get(params.slug as string)
      .then((data) => setLab(data))
      .catch(() => setLab(fallbackLab))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const handleStart = async () => {
    if (!user) { router.push('/login'); return; }
    setStarting(true);
    try {
      await labsApi.start(lab.id);
      setStarted(true);
    } catch { setStarted(true); }
    setStarting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );
  }

  const data = lab || fallbackLab;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/labs" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400 mb-6">
          <ArrowLeft size={16} /> Retour aux Labs
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${
            data.difficulty === 'Beginner' ? 'difficulty-beginner' :
            data.difficulty === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'
          }`}>{data.difficulty}</span>
          <span className="text-xs text-accent-400 font-medium">+{data.xp} XP</span>
          <span className="skill-tag text-xs">{data.category}</span>
        </div>

        <h1 className="text-3xl font-bold dark:text-white mb-4">{data.title}</h1>
        <p className="text-gray-500 mb-6">{data.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-1"><Clock size={14} /> {data.duration}</span>
          <span className="flex items-center gap-1"><Zap size={14} /> {data.xp} XP récompense</span>
        </div>

        {started ? (
          <div className="card border-success-500/50 mb-8">
            <div className="flex items-center gap-2 text-success-400 mb-2">
              <CheckCircle size={20} /> Environnement du Lab Prêt
            </div>
            <p className="text-sm text-gray-500">Votre environnement de lab se lance. Suivez les objectifs ci-dessous.</p>
          </div>
        ) : (
          <button onClick={handleStart} disabled={starting} className="btn-primary mb-8 flex items-center gap-2">
            <Play size={18} /> {starting ? 'Démarrage...' : 'Lancer le Lab'}
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="font-bold dark:text-white mb-4">Objectifs</h2>
            <ul className="space-y-2">
              {(data.objectives || fallbackLab.objectives).map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h2 className="font-bold dark:text-white mb-4">Prérequis</h2>
              <ul className="space-y-2">
                {(data.prerequisites || fallbackLab.prerequisites).map((p: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <AlertCircle size={14} className="text-accent-400" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="font-bold dark:text-white mb-4">Outils Utilisés</h2>
              <div className="flex flex-wrap gap-2">
                {(data.tools || fallbackLab.tools).map((t: string) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
