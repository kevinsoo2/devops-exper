'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Clock } from 'lucide-react';

interface RoadmapItem {
  id: number;
  order_index: number;
  title: string;
  description: string;
  level: string;
  duration_weeks: number;
  skills: string;
  progress_default: number;
}

const levels = [
  { key: 'all', label: 'Tous' },
  { key: 'fondamentaux', label: 'Fondamentaux' },
  { key: 'intermediaire', label: 'Intermédiaire' },
  { key: 'avance', label: 'Avancé' },
  { key: 'expert', label: 'Expert' },
];

const levelStyles: Record<string, string> = {
  fondamentaux: 'bg-emerald-500/15 text-emerald-400',
  intermediaire: 'bg-cyan-500/15 text-cyan-400',
  avance: 'bg-amber-500/15 text-amber-400',
  expert: 'bg-red-500/15 text-red-400',
};

export function RoadmapSection() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [activeLevel, setActiveLevel] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stats.roadmap(activeLevel)
      .then((data) => setItems(data.roadmap))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeLevel]);

  return (
    <section className="py-24 px-6" id="roadmap">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-badge mb-4">
            <i className="fas fa-map-signs"></i> Parcours d&apos;apprentissage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Roadmap DevOps <span className="gradient-text">Complète</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Un parcours structuré en 8 étapes pour vous emmener du débutant à l&apos;expert DevOps
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {levels.map((level) => (
            <button
              key={level.key}
              onClick={() => { setActiveLevel(level.key); setLoading(true); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeLevel === level.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-dark-card border border-slate-700 text-slate-400 hover:border-primary/50'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-amber-500 rounded-full" />

          {loading ? (
            <div className="space-y-6 pl-16">
              {[...Array(4)].map((_, i) => <div key={i} className="card animate-pulse h-40" />)}
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="relative pl-16 group">
                  {/* Marker */}
                  <div className="absolute left-1.5 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40 z-10">
                    <span className="text-xs font-bold text-white">{item.order_index}</span>
                  </div>

                  {/* Card */}
                  <div className="card group-hover:border-primary/50 group-hover:translate-x-1 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${levelStyles[item.level]}`}>
                        {item.level}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.duration_weeks} semaines
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{item.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.skills.split(',').map((skill) => (
                        <span key={skill} className="skill-tag">{skill.trim()}</span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                        style={{ width: `${item.progress_default}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
