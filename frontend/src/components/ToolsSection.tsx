'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
  popularity: number;
}

const categories = [
  { key: 'all', label: 'Tous' },
  { key: 'containers', label: 'Containers' },
  { key: 'cicd', label: 'CI/CD' },
  { key: 'iac', label: 'IaC' },
  { key: 'monitoring', label: 'Monitoring' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'security', label: 'Sécurité' },
];

export function ToolsSection() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tools.list(activeCategory)
      .then((data) => setTools(data.tools))
      .catch(() => setTools([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <section className="py-24 px-6" id="tools">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-badge mb-4">
            <i className="fas fa-toolbox"></i> Écosystème
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Outils <span className="gradient-text">DevOps</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Découvrez et maîtrisez les outils essentiels de l&apos;écosystème DevOps
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setLoading(true); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-dark-card border border-slate-700 text-slate-400 hover:border-primary/50 hover:text-primary-light'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading
            ? [...Array(12)].map((_, i) => <div key={i} className="card animate-pulse h-40" />)
            : tools.map((tool) => (
                <div key={tool.id} className="card card-hover text-center py-6">
                  <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                    <i className={tool.icon}></i>
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{tool.name}</h4>
                  <p className="text-[11px] text-slate-500 mb-3">{tool.description}</p>
                  {/* Popularity bar */}
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden mx-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: `${tool.popularity}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">{tool.popularity}%</span>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
