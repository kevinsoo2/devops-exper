'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Rocket, Route, PlayCircle } from 'lucide-react';

const techIcons = [
  { icon: 'fab fa-docker', label: 'Docker' },
  { icon: 'fas fa-dharmachakra', label: 'Kubernetes' },
  { icon: 'fab fa-aws', label: 'AWS' },
  { icon: 'fab fa-linux', label: 'Linux' },
  { icon: 'fab fa-git-alt', label: 'Git' },
  { icon: 'fab fa-jenkins', label: 'Jenkins' },
  { icon: 'fab fa-python', label: 'Python' },
  { icon: 'fas fa-cubes', label: 'Terraform' },
];

interface StatProps {
  target: number;
  label: string;
  suffix?: string;
}

function AnimatedStat({ target, label, suffix = '+' }: StatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <span className="block text-3xl md:text-4xl font-extrabold gradient-text">
        {count.toLocaleString('fr-FR')}{suffix}
      </span>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-28 pb-20 px-6 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary-light text-sm font-medium mb-6 animate-in">
          <Rocket className="w-4 h-4" />
          <span>Plateforme #1 pour devenir Expert DevOps</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-in delay-200">
          Maîtrisez le <span className="gradient-text">DevOps</span>
          <br />
          De Débutant à <span className="gradient-text">Expert</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in delay-300">
          Parcours complet avec +200 heures de formation, labs pratiques, projets réels,
          préparation aux certifications et mentorat par des experts de l&apos;industrie.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 animate-in delay-400">
          <AnimatedStat target={15000} label="Apprenants" />
          <AnimatedStat target={200} label="Heures de contenu" />
          <AnimatedStat target={50} label="Labs pratiques" />
          <AnimatedStat target={95} label="% Réussite certif" suffix="%" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-in delay-500">
          <Link href="/roadmap" className="btn-primary text-base px-8 py-4">
            <Route className="w-5 h-5" /> Voir la Roadmap
          </Link>
          <Link href="/courses" className="btn-outline text-base px-8 py-4">
            <PlayCircle className="w-5 h-5" /> Explorer les cours
          </Link>
        </div>

        {/* Tech icons */}
        <div className="animate-in delay-500">
          <span className="block text-xs text-slate-500 uppercase tracking-widest mb-4">Technologies couvertes</span>
          <div className="flex justify-center gap-3 flex-wrap">
            {techIcons.map((tech) => (
              <div
                key={tech.label}
                title={tech.label}
                className="w-12 h-12 flex items-center justify-center bg-dark-card border border-slate-700 rounded-lg text-slate-400 text-lg hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <i className={tech.icon}></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
