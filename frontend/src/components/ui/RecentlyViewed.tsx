'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface RecentItem {
  slug: string;
  title: string;
  type: 'course' | 'lab' | 'lesson';
  visitedAt: string;
}

// Hook to track recently viewed items
export function useRecentlyViewed() {
  const addRecent = (item: Omit<RecentItem, 'visitedAt'>) => {
    if (typeof window === 'undefined') return;
    const saved = JSON.parse(localStorage.getItem('devops-recent') || '[]');
    const filtered = saved.filter((i: RecentItem) => i.slug !== item.slug);
    const updated = [{ ...item, visitedAt: new Date().toISOString() }, ...filtered].slice(0, 10);
    localStorage.setItem('devops-recent', JSON.stringify(updated));
  };

  return { addRecent };
}

// Component to display recently viewed
export function RecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = JSON.parse(localStorage.getItem('devops-recent') || '[]');
    setItems(saved.slice(0, 5));
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="card mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-gray-500" />
        <h3 className="font-semibold text-white text-sm">Récemment consulté</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.type === 'course' ? `/courses/${item.slug}` : item.type === 'lab' ? `/labs/${item.slug}` : `/learn?lesson=${item.slug}`}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition group"
          >
            <BookOpen size={14} className="text-gray-500 group-hover:text-primary-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300 truncate group-hover:text-primary-400 transition">{item.title}</p>
              <p className="text-[10px] text-gray-600">
                {new Date(item.visitedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <ArrowRight size={12} className="text-gray-700 group-hover:text-primary-400 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}
