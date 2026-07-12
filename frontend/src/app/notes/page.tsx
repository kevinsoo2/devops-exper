'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Download, Trash2, Search, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Note {
  id: string;
  lessonId?: string;
  courseSlug?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devops-notes');
      if (saved) setNotes(JSON.parse(saved));
    }
  }, []);

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('devops-notes', JSON.stringify(updated));
  };

  const exportMarkdown = () => {
    const md = notes.map(n => `# ${n.title}\n\n${n.content}\n\n---\n_${new Date(n.updatedAt).toLocaleDateString('fr-FR')}_\n`).join('\n\n');
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mes-notes-devops.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="section-badge"><StickyNote size={14} /> Mes Notes</span>
            <h1 className="text-3xl font-bold dark:text-white mt-3">
              Mes <span className="gradient-text">Notes</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">{notes.length} note{notes.length > 1 ? 's' : ''} sauvegardée{notes.length > 1 ? 's' : ''}</p>
          </div>
          {notes.length > 0 && (
            <button onClick={exportMarkdown} className="btn-outline text-sm">
              <Download size={14} /> Exporter en Markdown
            </button>
          )}
        </div>

        {notes.length > 0 && (
          <div className="relative mb-6">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher dans mes notes..."
              className="input-field pl-10"
            />
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <StickyNote size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              {notes.length === 0 ? 'Aucune note' : 'Aucun résultat'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {notes.length === 0 
                ? 'Prenez des notes pendant vos leçons pour les retrouver ici.'
                : 'Essayez une autre recherche.'}
            </p>
            {notes.length === 0 && (
              <Link href="/courses" className="btn-primary">Commencer un cours</Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(note => (
              <div key={note.id} className="card group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold dark:text-white text-sm truncate">{note.title}</h3>
                      {note.courseSlug && (
                        <Link href={`/courses/${note.courseSlug}`} className="skill-tag text-[10px] shrink-0">
                          <BookOpen size={10} /> Voir le cours
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-3 whitespace-pre-line">{note.content}</p>
                    <p className="text-[11px] text-gray-600 mt-2">
                      Modifié le {new Date(note.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 rounded-lg text-gray-600 hover:text-danger-400 hover:bg-danger-500/10 opacity-0 group-hover:opacity-100 transition shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
