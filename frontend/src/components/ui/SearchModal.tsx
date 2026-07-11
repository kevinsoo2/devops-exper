'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FlaskConical, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';

interface SearchResult {
  type: 'course' | 'lab' | 'cheatsheet';
  title: string;
  slug: string;
  category?: string;
  description?: string;
}

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Search when query changes
  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const [courses, labs] = await Promise.all([
          fetch(`${API_URL}/courses?search=${encodeURIComponent(query)}`).then(r => r.json()),
          fetch(`${API_URL}/labs`).then(r => r.json()),
        ]);
        const courseResults: SearchResult[] = (courses.courses || [])
          .filter((c: any) => c.title.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
          .map((c: any) => ({ type: 'course' as const, title: c.title, slug: c.slug, category: c.category, description: c.description }));
        const labResults: SearchResult[] = (labs.labs || [])
          .filter((l: any) => l.title.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 3)
          .map((l: any) => ({ type: 'lab' as const, title: l.title, slug: l.slug, category: l.category }));
        setResults([...courseResults, ...labResults]);
      } catch { setResults([]); }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-500 text-xs hover:border-primary-500/50 hover:text-gray-300 transition-all"
      >
        <Search size={14} />
        <span>Rechercher...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-gray-700 text-[10px] text-gray-400 font-mono">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-xl mx-4 bg-dark-card border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/40 animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-700/50">
          <Search size={18} className="text-gray-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher formations, labs, fiches..."
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
          />
          <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-700 text-gray-500">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {loading && (
            <div className="p-4 text-center text-gray-500 text-sm">Recherche en cours...</div>
          )}
          
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-6 text-center text-gray-500 text-sm">
              Aucun résultat pour « {query} »
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-1">
              {results.map((result, i) => (
                <Link
                  key={i}
                  href={result.type === 'course' ? `/courses/${result.slug}` : `/labs/${result.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/80 transition-all group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    result.type === 'course' ? 'bg-primary-500/20 text-primary-400' :
                    result.type === 'lab' ? 'bg-secondary-500/20 text-secondary-400' :
                    'bg-accent-500/20 text-accent-400'
                  }`}>
                    {result.type === 'course' ? <BookOpen size={14} /> :
                     result.type === 'lab' ? <FlaskConical size={14} /> :
                     <FileText size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate group-hover:text-primary-400 transition">{result.title}</p>
                    <p className="text-xs text-gray-500 truncate">{result.category} • {result.type === 'course' ? 'Formation' : 'Lab'}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-600 group-hover:text-primary-400 transition" />
                </Link>
              ))}
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm mb-3">Tapez au moins 2 caractères pour rechercher</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'AWS'].map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)} className="skill-tag text-xs cursor-pointer hover:bg-primary-500/20">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-gray-700/50 flex items-center justify-between text-[11px] text-gray-600">
          <span>↑↓ pour naviguer • Enter pour ouvrir</span>
          <span>Echap pour fermer</span>
        </div>
      </div>
    </div>
  );
}
