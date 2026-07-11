'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, BookOpen, FlaskConical, Map, Trophy } from 'lucide-react';

const steps = [
  {
    icon: BookOpen,
    title: 'Bienvenue sur DevOps Expert ! 🚀',
    description: 'La plateforme #1 pour devenir expert DevOps. 39 cours, 1550 leçons et 87 labs vous attendent.',
    color: 'text-primary-400 bg-primary-500/10',
  },
  {
    icon: Map,
    title: 'Suivez le Parcours',
    description: 'Commencez par la roadmap pour un apprentissage structuré, du débutant à l\'expert.',
    color: 'text-secondary-400 bg-secondary-500/10',
  },
  {
    icon: FlaskConical,
    title: 'Pratiquez avec les Labs',
    description: '87 exercices pratiques avec des instructions étape par étape et commandes réelles.',
    color: 'text-success-400 bg-success-500/10',
  },
  {
    icon: Trophy,
    title: 'Gagnez de l\'XP et montez en niveau',
    description: 'Chaque leçon et lab complété vous rapporte de l\'XP. Débloquez des achievements et grimpez le leaderboard !',
    color: 'text-accent-400 bg-accent-500/10',
  },
];

export function Onboarding() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = localStorage.getItem('devops-onboarding-seen');
    if (!seen) {
      setTimeout(() => setShow(true), 1500);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('devops-onboarding-seen', 'true');
    }
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else dismiss();
  };

  if (!show) return null;

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" onClick={dismiss}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />
      <div className="relative bg-dark-card border border-gray-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={dismiss} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={18} />
        </button>

        {/* Step indicator */}
        <div className="flex gap-1 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary-500' : 'bg-gray-700'}`} />
          ))}
        </div>

        {/* Content */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-2xl ${currentStep.color} flex items-center justify-center mx-auto mb-5`}>
            <Icon size={28} />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">{currentStep.title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{currentStep.description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button onClick={dismiss} className="text-xs text-gray-500 hover:text-gray-300">
            Passer le tour
          </button>
          <button onClick={next} className="btn-primary text-sm">
            {step < steps.length - 1 ? (
              <>Suivant <ArrowRight size={14} /></>
            ) : (
              <>C&apos;est parti ! 🎉</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
