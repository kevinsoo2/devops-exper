'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Clock, Users, Cloud, Terminal as TermIcon, CheckCheck, Lightbulb } from 'lucide-react';

interface Lab {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  duration_minutes: number;
  technologies: string;
  completion_count: number;
}

const difficultyStyles: Record<string, string> = {
  facile: 'difficulty-easy',
  moyen: 'difficulty-medium',
  difficile: 'difficulty-hard',
  expert: 'difficulty-expert',
};

const features = [
  { icon: Cloud, title: 'Environnements Cloud', desc: 'Clusters K8s, VMs Linux - prêt en 30s' },
  { icon: TermIcon, title: 'Terminal Intégré', desc: 'Terminal directement dans le navigateur' },
  { icon: CheckCheck, title: 'Validation Auto', desc: 'Solutions validées en temps réel' },
  { icon: Lightbulb, title: 'Indices Progressifs', desc: 'Des aides sans donner la solution' },
];

export function LabsSection() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.labs.list()
      .then((data) => setLabs(data.labs))
      .catch(() => setLabs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-6 bg-dark-card/30" id="labs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-badge mb-4">
            <i className="fas fa-flask"></i> Pratique
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Labs <span className="gradient-text">Interactifs</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Environnements cloud réels pour pratiquer sans risque. Apprenez en faisant!
          </p>
        </div>

        {/* Features row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((f) => (
            <div key={f.title} className="card text-center py-8">
              <f.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
              <p className="text-xs text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Labs grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="card animate-pulse h-52" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {labs.map((lab) => (
              <div key={lab.id} className="card card-hover">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${difficultyStyles[lab.difficulty]}`}>
                    {lab.difficulty}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {lab.duration_minutes} min
                  </span>
                </div>

                {/* Content */}
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <i className={`${lab.icon} text-secondary`}></i>
                  {lab.title}
                </h4>
                <p className="text-xs text-slate-400 mb-4">{lab.description}</p>

                {/* Technologies */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {lab.technologies.split(',').map((tech) => (
                    <span key={tech} className="skill-tag text-[10px]">{tech.trim()}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Users className="w-3 h-3" /> {lab.completion_count.toLocaleString()} complétions
                  </span>
                  <button className="btn-primary text-[11px] px-3 py-1.5">Lancer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
