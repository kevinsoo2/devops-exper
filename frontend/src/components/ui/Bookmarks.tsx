'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  type: 'course' | 'lab' | 'cheatsheet' | 'post';
  slug: string;
  savedAt: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (item: Omit<BookmarkItem, 'savedAt'>) => void;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
});

export function useBookmarks() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devops-bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    }
  }, []);

  const save = (items: BookmarkItem[]) => {
    setBookmarks(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem('devops-bookmarks', JSON.stringify(items));
    }
  };

  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

  const toggleBookmark = (item: Omit<BookmarkItem, 'savedAt'>) => {
    if (isBookmarked(item.id)) {
      save(bookmarks.filter(b => b.id !== item.id));
    } else {
      save([...bookmarks, { ...item, savedAt: new Date().toISOString() }]);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

// Bookmark button component
export function BookmarkButton({ id, title, type, slug, size = 18 }: { id: string; title: string; type: BookmarkItem['type']; slug: string; size?: number }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(id);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark({ id, title, type, slug }); }}
      className={`p-1.5 rounded-lg transition-all duration-200 ${saved ? 'text-accent-400 bg-accent-500/10' : 'text-gray-500 hover:text-accent-400 hover:bg-accent-500/5'}`}
      title={saved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      {saved ? <BookmarkCheck size={size} /> : <Bookmark size={size} />}
    </button>
  );
}
