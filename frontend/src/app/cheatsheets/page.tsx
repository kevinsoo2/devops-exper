'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Search, Eye, BookOpen } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';

const categories = ['Tous', 'conteneurisation', 'orchestration', 'iac', 'cicd', 'monitoring', 'network', 'systeme', 'securite', 'cloud'];
const categoryLabels: Record<string, string> = {
  'Tous': 'Tous', 'conteneurisation': 'Docker', 'orchestration': 'Kubernetes', 'iac': 'IaC',
  'cicd': 'CI/CD', 'monitoring': 'Monitoring', 'network': 'Réseau', 'systeme': 'Système',
  'securite': 'Sécurité', 'cloud': 'Cloud'
};

export default function CheatsheetsPage() {
  const [sheets, setSheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Tous');
  const [selectedSheet, setSelectedSheet] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/cheatsheets`)
      .then(r => r.json())
      .then(data => setSheets(data.cheatsheets || []))
      .catch(() => setSheets([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = category === 'Tous' ? sheets : sheets.filter(s => s.category === category);

  // Simple markdown renderer for cheatsheet content
  function renderContent(content: string) {
    if (!content) return null;
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-white mt-5 mb-2">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-white mt-4 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith('```')) return null;
      if (line.startsWith('| ')) {
        const cells = line.split('|').filter(c => c.trim());
        if (line.includes('---')) return null;
        return (
          <div key={i} className="grid grid-cols-3 gap-2 py-1 text-xs text-gray-300 border-b border-gray-700/30">
            {cells.map((cell, j) => <span key={j} className="truncate">{cell.trim()}</span>)}
          </div>
        );
      }
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm text-gray-300 list-disc">{line.slice(2)}</li>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      // Check if we're inside a code block
      const prevLines = content.split('\n').slice(0, i);
      const codeBlockCount = prevLines.filter(l => l.startsWith('```')).length;
      if (codeBlockCount % 2 === 1) {
        return <code key={i} className="block text-xs font-mono text-green-400">{line}</code>;
      }
      return <p key={i} className="text-sm text-gray-300">{line}</p>;
    });
  }

  if (selectedSheet) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => setSelectedSheet(null)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400 mb-6">
            ← Retour aux fiches
          </button>
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{selectedSheet.icon}</span>
              <div>
                <h1 className="text-2xl font-bold dark:text-white">{selectedSheet.title}</h1>
                <p className="text-sm text-gray-500">{selectedSheet.description}</p>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 overflow-x-auto">
              {renderContent(selectedSheet.content)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge"><FileText size={16} /> Fiches pratiques</span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Cheat Sheets <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Toutes les commandes et syntaxes essentielles en un coup d&apos;œil. Parfait pour réviser rapidement.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}>{categoryLabels[cat] || cat}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="card animate-pulse h-40" />)}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">Aucune fiche dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sheet) => (
              <button key={sheet.id} onClick={() => {
                // Fetch full content
                fetch(`${API_URL}/cheatsheets/${sheet.slug}`)
                  .then(r => r.json())
                  .then(data => setSelectedSheet(data.cheatsheet))
                  .catch(() => setSelectedSheet(sheet));
              }} className="card card-hover text-left group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{sheet.icon || '📋'}</span>
                  <div>
                    <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition text-sm">{sheet.title}</h3>
                    <span className="skill-tag text-[10px]">{categoryLabels[sheet.category] || sheet.category}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{sheet.description}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-600">
                  <span className="flex items-center gap-1"><Eye size={10} /> {sheet.view_count || 0} vues</span>
                  <span className="text-primary-400 font-medium group-hover:underline">Voir la fiche →</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
