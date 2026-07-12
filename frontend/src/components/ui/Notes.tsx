'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Save, Download, Trash2, Plus } from 'lucide-react';

interface Note {
  id: string;
  lessonId?: string;
  courseSlug?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Hook for managing notes
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('devops-notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const save = (items: Note[]) => {
    setNotes(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem('devops-notes', JSON.stringify(items));
    }
  };

  const addNote = (title: string, content: string, lessonId?: string, courseSlug?: string) => {
    const note: Note = {
      id: Date.now().toString(),
      lessonId,
      courseSlug,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    save([note, ...notes]);
    return note;
  };

  const updateNote = (id: string, content: string) => {
    save(notes.map(n => n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = (id: string) => {
    save(notes.filter(n => n.id !== id));
  };

  const getNotesForLesson = (lessonId: string) => notes.filter(n => n.lessonId === lessonId);
  const getNotesForCourse = (courseSlug: string) => notes.filter(n => n.courseSlug === courseSlug);

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

  return { notes, addNote, updateNote, deleteNote, getNotesForLesson, getNotesForCourse, exportMarkdown };
}

// Note editor inline component
export function NoteEditor({ lessonId, courseSlug, lessonTitle }: { lessonId?: string; courseSlug?: string; lessonTitle?: string }) {
  const { notes, addNote, updateNote, deleteNote, getNotesForLesson } = useNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [existingNote, setExistingNote] = useState<Note | null>(null);

  useEffect(() => {
    if (lessonId) {
      const existing = getNotesForLesson(lessonId);
      if (existing.length > 0) {
        setExistingNote(existing[0]);
        setContent(existing[0].content);
      }
    }
  }, [lessonId]);

  const handleSave = () => {
    if (existingNote) {
      updateNote(existingNote.id, content);
    } else if (content.trim()) {
      const note = addNote(lessonTitle || 'Note', content, lessonId, courseSlug);
      setExistingNote(note);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary-400 transition"
      >
        <StickyNote size={14} />
        {isOpen ? 'Masquer les notes' : existingNote ? 'Voir ma note' : 'Prendre une note'}
      </button>

      {isOpen && (
        <div className="mt-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 animate-scale-in">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Écrivez vos notes ici... (Markdown supporté)"
            className="w-full h-24 bg-transparent text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none"
          />
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700/50">
            <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-500/20 text-primary-400 text-xs font-medium hover:bg-primary-500/30 transition">
              <Save size={12} /> Sauvegarder
            </button>
            {existingNote && (
              <button onClick={() => { deleteNote(existingNote.id); setContent(''); setExistingNote(null); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-danger-400 text-xs hover:bg-danger-500/10 transition">
                <Trash2 size={12} /> Supprimer
              </button>
            )}
            <span className="ml-auto text-[10px] text-gray-600">
              {existingNote ? `Modifié ${new Date(existingNote.updatedAt).toLocaleDateString('fr-FR')}` : 'Nouvelle note'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
