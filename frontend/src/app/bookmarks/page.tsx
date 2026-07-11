'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, BookOpen, FlaskConical, FileText, Trash2 } from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  type: 'course' | 'lab' | 'cheatsheet' | 'post';
  slug: string;
  savedAt: string;
}

const typeConfig = {
  course: { icon: BookOpen, label: 'Formation', color: 'text-primary-400 bg-primary-500/10', href: '/courses/' },
  lab: { icon: FlaskConical, label: 'Lab', color: 'text-secondary-400 bg-secondary-500/10', href: '/labs/' },
  cheatsheet: { icon: FileText, label: 'Fiche', color: 'text-accent-400 bg-accent-500/10', href: '/cheatsheets' },
  post: { icon: BookOpen, label: 'Article', color: 'text-success-400 bg-success-500/10', href: '/blog/' },
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devops-bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('devops-bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="section-badge"><Bookmark size={16} /> Favoris</span>
          <h1 className="text-3xl font-bold dark:text-white mt-4">
            Mes <span className="gradient-text">Favoris</span>
          </h1>
          <p className="text-gray-500 mt-2">Vos formations, labs et fiches sauvegardés pour y revenir facilement.</p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="card text-center py-16">
            <Bookmark size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold dark:text-white mb-2">Aucun favori</h3>
            <p className="text-sm text-gray-500 mb-6">Sauvegardez des cours, labs ou fiches en cliquant sur l&apos;icône signet 🔖</p>
            <Link href="/courses" className="btn-primary">Explorer les formations</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map(bm => {
              const config = typeConfig[bm.type] || typeConfig.course;
              const Icon = config.icon;
              return (
                <div key={bm.id} className="card flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`${config.href}${bm.slug}`} className="font-medium dark:text-white hover:text-primary-400 transition truncate block">
                      {bm.title}
                    </Link>
                    <span className="text-xs text-gray-500">{config.label} • Sauvegardé le {new Date(bm.savedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <button onClick={() => removeBookmark(bm.id)} className="p-2 rounded-lg text-gray-600 hover:text-danger-400 hover:bg-danger-500/10 opacity-0 group-hover:opacity-100 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
