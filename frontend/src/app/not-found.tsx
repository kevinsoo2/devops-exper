'use client';

import Link from 'next/link';
import { Home, Search, BookOpen, FlaskConical, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-dark">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] font-black text-gray-800/20 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce-in">🚀</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold dark:text-white mb-3">
          Houston, on a un <span className="gradient-text">problème</span> !
        </h2>
        <p className="text-gray-500 mb-8">
          Cette page s&apos;est envolée vers une galaxie lointaine... ou elle n&apos;existe tout simplement pas.
        </p>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Link href="/" className="card-hover flex flex-col items-center gap-2 py-4">
            <Home size={20} className="text-primary-400" />
            <span className="text-xs text-gray-400">Accueil</span>
          </Link>
          <Link href="/courses" className="card-hover flex flex-col items-center gap-2 py-4">
            <BookOpen size={20} className="text-secondary-400" />
            <span className="text-xs text-gray-400">Formations</span>
          </Link>
          <Link href="/labs" className="card-hover flex flex-col items-center gap-2 py-4">
            <FlaskConical size={20} className="text-accent-400" />
            <span className="text-xs text-gray-400">Labs</span>
          </Link>
        </div>

        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} /> Retourner à l&apos;accueil
        </Link>

        <p className="mt-6 text-xs text-gray-600">
          💡 Astuce : Utilisez <kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-mono">Ctrl+K</kbd> pour rechercher
        </p>
      </div>
    </div>
  );
}
