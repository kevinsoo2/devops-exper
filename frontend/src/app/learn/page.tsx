'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Clock, Trophy, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';

function LearnContent() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const lessonId = searchParams.get('lesson');
  const courseSlug = searchParams.get('course');
  const [lesson, setLesson] = useState<any>(null);
  const [navigation, setNavigation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!lessonId) { setLoading(false); return; }
    
    fetch(`${API_URL}/lessons/${lessonId}`)
      .then(r => r.json())
      .then(data => {
        setLesson(data.lesson || null);
        setNavigation(data.navigation || null);
      })
      .catch(() => {
        setLesson({
          title: searchParams.get('title') || 'Leçon',
          content_type: searchParams.get('type') || 'text',
          duration_minutes: searchParams.get('duration') || '10',
          content: null,
        });
      })
      .finally(() => setLoading(false));
  }, [lessonId, searchParams]);

  const handleComplete = () => {
    setCompleted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-400" size={32} />
      </div>
    );
  }

  if (!lesson && !lessonId) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold dark:text-white mb-2">Sélectionnez une leçon</h2>
          <p className="text-gray-500 mb-4">Choisissez une leçon dans un cours pour commencer.</p>
          <Link href="/courses" className="btn-primary">Voir les formations</Link>
        </div>
      </div>
    );
  }

  // Render markdown-style content
  function renderContent(content: string) {
    if (!content) return <p className="text-gray-500 italic">Contenu en cours de rédaction...</p>;
    
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Headings
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-white mt-6 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mt-4 mb-4">{line.slice(2)}</h1>;
      
      // Code blocks
      if (line.startsWith('```')) {
        // Find the end of code block
        const codeLines: string[] = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith('```')) {
          codeLines.push(lines[j]);
          j++;
        }
        if (codeLines.length > 0 && i === lines.indexOf(line)) {
          return (
            <pre key={i} className="bg-gray-900 border border-gray-700 rounded-lg p-4 my-4 overflow-x-auto">
              <code className="text-sm font-mono text-green-400">{codeLines.join('\n')}</code>
            </pre>
          );
        }
        return null;
      }
      // Skip lines that are inside code blocks
      if (i > 0) {
        let inCode = false;
        for (let k = 0; k < i; k++) {
          if (lines[k].startsWith('```')) inCode = !inCode;
        }
        if (inCode) return null;
      }
      
      // Tables (simple rendering)
      if (line.startsWith('|') && line.endsWith('|')) {
        if (line.includes('---')) return null; // Skip separator
        const cells = line.split('|').filter(c => c.trim());
        const isHeader = i + 1 < lines.length && lines[i + 1]?.includes('---');
        return (
          <div key={i} className={`grid grid-cols-${Math.min(cells.length, 4)} gap-2 py-1 px-2 ${isHeader ? 'font-semibold text-white border-b border-gray-700' : 'text-gray-400'} text-sm`}>
            {cells.map((cell, ci) => <span key={ci} className="truncate">{cell.trim()}</span>)}
          </div>
        );
      }
      
      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const text = line.slice(2);
        return (
          <li key={i} className="ml-4 mb-1 text-gray-300 text-sm list-disc">
            {renderInlineMarkdown(text)}
          </li>
        );
      }
      
      // Numbered lists
      if (/^\d+\./.test(line)) {
        return <li key={i} className="ml-4 mb-1 text-gray-300 text-sm list-decimal">{renderInlineMarkdown(line.replace(/^\d+\.\s*/, ''))}</li>;
      }
      
      // Empty lines
      if (line.trim() === '') return <div key={i} className="h-3" />;
      
      // Regular paragraphs
      return <p key={i} className="text-gray-300 text-sm leading-relaxed mb-2">{renderInlineMarkdown(line)}</p>;
    });
  }

  function renderInlineMarkdown(text: string) {
    // Handle bold, code, and italic
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|_.*?_)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono text-primary-400">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith('_') && part.endsWith('_')) {
        return <em key={i} className="italic text-gray-400">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  }

  return (
    <div className="min-h-screen pt-20 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href={courseSlug ? `/courses/${courseSlug}` : '/courses'} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400 transition">
            <ArrowLeft size={16} /> Retour au cours
          </Link>
          {completed && (
            <span className="flex items-center gap-1 text-success-400 text-sm font-medium">
              <CheckCircle size={16} /> Complétée !
            </span>
          )}
        </div>

        {/* Sticky Navigation Bar */}
        {navigation && (
          <div className="sticky top-16 z-30 bg-dark/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 mb-6 flex items-center justify-between gap-2">
            {navigation.prev ? (
              <Link 
                href={`/learn?lesson=${navigation.prev.id}&course=${courseSlug || lesson?.course_slug || ''}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium transition"
              >
                <ArrowLeft size={14} /> <span className="hidden sm:inline">Précédente</span>
              </Link>
            ) : (
              <div className="px-3 py-2 text-xs text-gray-600">Début du cours</div>
            )}

            <div className="flex items-center gap-2 text-center">
              <span className="text-xs text-gray-400 hidden sm:block">{navigation.current}/{navigation.total}</span>
              <div className="w-24 sm:w-40 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                  style={{ width: `${(navigation.current / navigation.total) * 100}%` }}
                />
              </div>
            </div>

            {navigation.next ? (
              <Link 
                href={`/learn?lesson=${navigation.next.id}&course=${courseSlug || lesson?.course_slug || ''}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 hover:text-primary-300 text-xs font-medium transition"
              >
                <span className="hidden sm:inline">Suivante</span> <ArrowRight size={14} />
              </Link>
            ) : (
              <Link 
                href={courseSlug ? `/courses/${courseSlug}` : '/courses'}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-success-500/20 text-success-400 text-xs font-medium"
              >
                <CheckCircle size={14} /> <span className="hidden sm:inline">Terminé</span>
              </Link>
            )}
          </div>
        )}

        {/* Lesson Header */}
        <div className="card mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <BookOpen size={20} className="text-primary-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">{lesson?.title || searchParams.get('title')}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><Clock size={12} /> {lesson?.duration_minutes || searchParams.get('duration') || '10'} min</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">{lesson?.content_type || 'texte'}</span>
                {lesson?.chapter_title && <span className="text-gray-600">• {lesson.chapter_title}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="card mb-6">
          <div className="prose prose-invert max-w-none">
            {renderContent(lesson?.content || '')}
          </div>
        </div>

        {/* Complete Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Trophy size={14} className="text-accent-400" /> +{lesson?.xp_reward || 10} XP à la complétion
          </div>
          {!completed ? (
            <button onClick={handleComplete} className="btn-primary">
              <CheckCircle size={18} /> Marquer comme complétée
            </button>
          ) : (
            <span className="text-success-400 font-medium text-sm flex items-center gap-1">
              <CheckCircle size={16} /> Leçon complétée ! +{lesson?.xp_reward || 10} XP
            </span>
          )}
        </div>

        {/* Progress indicator */}
        {navigation && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">Progression du cours</span>
              <span className="text-xs text-primary-400 font-medium">{navigation.current} / {navigation.total} leçons</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-1">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                style={{ width: `${(navigation.current / navigation.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Course completed! */}
        {navigation?.isLast && completed && (
          <div className="card mb-6 border-success-500/30 bg-success-500/5 text-center py-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Félicitations !</h3>
            <p className="text-gray-400 text-sm mb-4">
              Vous avez terminé toutes les leçons de ce cours. Bravo pour votre persévérance !
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href={courseSlug ? `/courses/${courseSlug}` : '/courses'} className="btn-outline text-sm">
                Revoir le cours
              </Link>
              <Link href="/courses" className="btn-primary text-sm">
                Découvrir d'autres formations
              </Link>
            </div>
          </div>
        )}

        {/* Navigation prev/next */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navigation?.prev ? (
            <Link 
              href={`/learn?lesson=${navigation.prev.id}&course=${courseSlug || lesson?.course_slug || ''}`}
              className="card hover:border-primary-500/50 transition group"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <ArrowLeft size={12} /> Leçon précédente
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white transition truncate">{navigation.prev.title}</p>
            </Link>
          ) : (
            <div />
          )}
          
          {navigation?.next ? (
            <Link 
              href={`/learn?lesson=${navigation.next.id}&course=${courseSlug || lesson?.course_slug || ''}`}
              className="card hover:border-primary-500/50 transition group text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-gray-500 mb-1">
                Leçon suivante <ArrowRight size={12} />
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white transition truncate">{navigation.next.title}</p>
            </Link>
          ) : !navigation?.isLast ? null : (
            <Link 
              href={courseSlug ? `/courses/${courseSlug}` : '/courses'}
              className="card hover:border-success-500/50 border-success-500/20 transition group text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-success-400 mb-1">
                Fin du cours <CheckCircle size={12} />
              </div>
              <p className="text-sm text-success-400 group-hover:text-success-300 transition">Retour à la page du cours</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><Loader2 className="animate-spin text-primary-400" size={32} /></div>}>
      <LearnContent />
    </Suspense>
  );
}
