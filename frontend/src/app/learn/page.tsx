'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, PlayCircle, BookOpen, Clock, Trophy } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

function LearnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, token } = useAuthStore();
  const lessonId = searchParams.get('lesson');
  const courseSlug = searchParams.get('course');
  const [lesson, setLesson] = useState<any>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    // For now, create a lesson view based on the ID
    // In production, you'd fetch lesson content from the API
    setLesson({
      id: lessonId,
      title: searchParams.get('title') || 'Leçon',
      type: searchParams.get('type') || 'video',
      duration: searchParams.get('duration') || '10',
    });
  }, [lessonId, searchParams]);

  const handleComplete = () => {
    setCompleted(true);
    // In production: call API to mark lesson as complete
    // progress.completeLesson(lessonId)
  };

  if (!lesson) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold dark:text-white mb-2">Sélectionnez une leçon</h2>
          <p className="text-gray-500 mb-4">Choisissez une leçon dans un cours pour commencer à apprendre.</p>
          <Link href="/courses" className="btn-primary">Voir les formations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href={courseSlug ? `/courses/${courseSlug}` : '/courses'} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400">
            <ArrowLeft size={16} /> Retour au cours
          </Link>
          {completed && (
            <span className="flex items-center gap-1 text-success-400 text-sm font-medium">
              <CheckCircle size={16} /> Complétée !
            </span>
          )}
        </div>

        {/* Lesson Header */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              {lesson.type === 'video' ? <PlayCircle size={20} className="text-primary-400" /> : <BookOpen size={20} className="text-primary-400" />}
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">{lesson.title}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><Clock size={12} /> {lesson.duration} min</span>
                <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">{lesson.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="card mb-6">
          {lesson.type === 'video' ? (
            <div>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <PlayCircle size={64} className="mx-auto text-primary-400 mb-3" />
                  <p className="text-gray-400 text-sm">Vidéo de la leçon</p>
                  <p className="text-gray-500 text-xs mt-1">Le contenu vidéo sera disponible prochainement</p>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold dark:text-white mb-3">📝 Notes de la leçon</h3>
                <div className="text-gray-400 text-sm leading-relaxed space-y-3">
                  <p>Cette leçon couvre les concepts essentiels de <strong className="text-white">{lesson.title}</strong>.</p>
                  <p>Points clés à retenir :</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Comprendre les fondamentaux du sujet</li>
                    <li>Identifier les cas d'utilisation pratiques</li>
                    <li>Appliquer les bonnes pratiques en environnement réel</li>
                    <li>Maîtriser les commandes et outils associés</li>
                  </ul>
                  <p className="mt-4">💡 <em>Conseil : Prenez des notes et pratiquez dans un lab pour mieux assimiler.</em></p>
                </div>
              </div>
            </div>
          ) : lesson.type === 'exercise' ? (
            <div>
              <h3 className="text-lg font-semibold dark:text-white mb-3">🏋️ Exercice Pratique</h3>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4 font-mono text-sm text-green-400">
                <p className="text-gray-500 mb-2"># Instructions de l'exercice</p>
                <p>Mettez en pratique les concepts appris dans cette leçon.</p>
                <p className="mt-2">Ouvrez un terminal et suivez les étapes ci-dessous.</p>
              </div>
              <div className="text-gray-400 text-sm space-y-2">
                <p>1. Préparez votre environnement de travail</p>
                <p>2. Appliquez les commandes vues dans la leçon précédente</p>
                <p>3. Vérifiez le résultat obtenu</p>
                <p>4. Comparez avec la solution proposée</p>
              </div>
            </div>
          ) : lesson.type === 'quiz' ? (
            <div>
              <h3 className="text-lg font-semibold dark:text-white mb-3">❓ Quiz de vérification</h3>
              <p className="text-gray-400 text-sm mb-4">Testez votre compréhension des concepts abordés dans ce chapitre.</p>
              <Link href="/quizzes" className="btn-primary">
                Accéder aux Quiz
              </Link>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold dark:text-white mb-3">📖 Contenu de la leçon</h3>
              <div className="text-gray-400 text-sm leading-relaxed space-y-3">
                <p>Cette leçon textuelle couvre <strong className="text-white">{lesson.title}</strong> en détail.</p>
                <p>Prenez le temps de lire et de comprendre chaque concept avant de passer à la suite.</p>
              </div>
            </div>
          )}
        </div>

        {/* Complete Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <Trophy size={14} className="inline mr-1" /> +10 XP à la complétion
          </div>
          {!completed ? (
            <button onClick={handleComplete} className="btn-primary">
              <CheckCircle size={18} /> Marquer comme complétée
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-success-400 font-medium text-sm">✅ Leçon complétée ! +10 XP</span>
              <Link href={courseSlug ? `/courses/${courseSlug}` : '/courses'} className="btn-outline text-sm">
                Leçon suivante <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="animate-pulse text-gray-500">Chargement...</div></div>}>
      <LearnContent />
    </Suspense>
  );
}
