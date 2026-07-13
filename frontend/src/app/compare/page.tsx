'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Clock, BookOpen, Star, Users, Check, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';

export default function ComparePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selected, setSelected] = useState<[string, string]>(['', '']);
  const [courseA, setCourseA] = useState<any>(null);
  const [courseB, setCourseB] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then(r => r.json())
      .then(data => setCourses(data.courses || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selected[0]) {
      fetch(`${API_URL}/courses/${selected[0]}`)
        .then(r => r.json())
        .then(data => setCourseA(data.course || data))
        .catch(() => setCourseA(null));
    }
    if (selected[1]) {
      fetch(`${API_URL}/courses/${selected[1]}`)
        .then(r => r.json())
        .then(data => setCourseB(data.course || data))
        .catch(() => setCourseB(null));
    }
  }, [selected]);

  const renderComparison = (a: any, b: any) => {
    if (!a || !b) return null;
    
    const rows = [
      { label: 'Durée', a: `${a.duration_hours || 0}h`, b: `${b.duration_hours || 0}h`, icon: Clock },
      { label: 'Niveau', a: a.level || '-', b: b.level || '-', icon: Star },
      { label: 'Catégorie', a: a.category || '-', b: b.category || '-', icon: BookOpen },
      { label: 'Chapitres', a: (a.chapters?.length || 0).toString(), b: (b.chapters?.length || 0).toString(), icon: BookOpen },
      { label: 'Instructeur', a: a.instructor || '-', b: b.instructor || '-', icon: Users },
    ];

    return (
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <h3 className="font-bold text-white text-sm truncate">{a.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{a.category}</p>
          </div>
          <div className="flex items-center justify-center">
            <ArrowLeftRight size={20} className="text-primary-400" />
          </div>
          <div className="card text-center">
            <h3 className="font-bold text-white text-sm truncate">{b.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{b.category}</p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Critère</th>
                <th className="text-center py-3 px-4 text-xs text-primary-400 font-medium">Cours A</th>
                <th className="text-center py-3 px-4 text-xs text-secondary-400 font-medium">Cours B</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const Icon = row.icon;
                return (
                  <tr key={row.label} className="border-b border-gray-800 last:border-0">
                    <td className="py-3 px-4 text-sm text-gray-400 flex items-center gap-2">
                      <Icon size={14} className="text-gray-600" /> {row.label}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-white font-medium">{row.a}</td>
                    <td className="py-3 px-4 text-center text-sm text-white font-medium">{row.b}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link href={`/courses/${selected[0]}`} className="btn-primary text-sm justify-center">
            Voir {a.title?.split(' ').slice(0, 3).join(' ')}
          </Link>
          <Link href={`/courses/${selected[1]}`} className="btn-outline text-sm justify-center">
            Voir {b.title?.split(' ').slice(0, 3).join(' ')}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="section-badge"><ArrowLeftRight size={14} /> Comparateur</span>
          <h1 className="text-3xl font-bold dark:text-white mt-4">
            Comparer des <span className="gradient-text">Formations</span>
          </h1>
          <p className="text-gray-500 mt-2">Comparez deux cours côte à côte pour choisir celui qui vous convient.</p>
        </div>

        {/* Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Cours A</label>
            <select
              value={selected[0]}
              onChange={e => setSelected([e.target.value, selected[1]])}
              className="input-field"
            >
              <option value="">Sélectionner un cours...</option>
              {courses.map(c => (
                <option key={c.slug} value={c.slug}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Cours B</label>
            <select
              value={selected[1]}
              onChange={e => setSelected([selected[0], e.target.value])}
              className="input-field"
            >
              <option value="">Sélectionner un cours...</option>
              {courses.map(c => (
                <option key={c.slug} value={c.slug}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison */}
        {selected[0] && selected[1] ? (
          renderComparison(courseA, courseB)
        ) : (
          <div className="card text-center py-12 mt-8">
            <ArrowLeftRight size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">Sélectionnez deux cours ci-dessus pour les comparer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
