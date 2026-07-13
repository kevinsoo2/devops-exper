'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const pathLabels: Record<string, string> = {
  courses: 'Formations',
  labs: 'Labs',
  tools: 'Outils',
  certifications: 'Certifications',
  roadmap: 'Parcours',
  community: 'Communauté',
  blog: 'Blog',
  achievements: 'Succès',
  cheatsheets: 'Fiches',
  dashboard: 'Tableau de bord',
  profile: 'Profil',
  quizzes: 'Quiz',
  mentoring: 'Mentorat',
  bookmarks: 'Favoris',
  notes: 'Notes',
  stats: 'Statistiques',
  compare: 'Comparateur',
  learn: 'Leçon',
  login: 'Connexion',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;
  
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 pt-20 pb-2">
      <ol className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-primary-400 transition">
            <Home size={12} /> Accueil
          </Link>
        </li>
        {segments.map((segment, i) => {
          const path = '/' + segments.slice(0, i + 1).join('/');
          const label = pathLabels[segment] || decodeURIComponent(segment);
          const isLast = i === segments.length - 1;

          return (
            <li key={path} className="flex items-center gap-1">
              <ChevronRight size={10} className="text-gray-700" />
              {isLast ? (
                <span className="text-gray-300 font-medium">{label}</span>
              ) : (
                <Link href={path} className="hover:text-primary-400 transition">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
