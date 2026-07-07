'use client';

import Link from 'next/link';
import { FlaskConical, Terminal, Clock, Zap, ChevronRight, Shield, Cloud, GitBranch } from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Environnements Réels',
    description: 'Lancez de vrais environnements cloud avec des outils et services pré-configurés.',
  },
  {
    icon: Shield,
    title: 'Expérimentez en sécurité',
    description: 'Des bacs à sable isolés pour expérimenter sans conséquences.',
  },
  {
    icon: Clock,
    title: 'Guidé et Chronométré',
    description: 'Instructions étape par étape avec des défis chronométrés optionnels pour des bonus XP.',
  },
  {
    icon: Zap,
    title: 'Feedback Instantané',
    description: 'La validation automatique vérifie votre travail en temps réel.',
  },
];

const labsData = [
  {
    title: 'Déployer une App Multi-Conteneurs avec Docker Compose',
    difficulty: 'Débutant',
    duration: '30 min',
    xp: 150,
    category: 'Conteneurs',
    icon: Terminal,
  },
  {
    title: 'Mettre en Place un Cluster Kubernetes avec kubeadm',
    difficulty: 'Intermédiaire',
    duration: '60 min',
    xp: 300,
    category: 'Orchestration',
    icon: Cloud,
  },
  {
    title: 'Construire un Pipeline CI/CD avec GitHub Actions',
    difficulty: 'Débutant',
    duration: '45 min',
    xp: 200,
    category: 'CI/CD',
    icon: GitBranch,
  },
  {
    title: 'Implémenter un Réseau Zero-Trust avec Istio',
    difficulty: 'Avancé',
    duration: '90 min',
    xp: 500,
    category: 'Sécurité',
    icon: Shield,
  },
];

export function LabsPreview() {
  return (
    <section className="py-24 dark:bg-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <FlaskConical size={16} />
            Labs Pratiques
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Apprenez en <span className="gradient-text">Pratiquant</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Des labs concrets avec des environnements réels. Pas d&apos;apprentissage uniquement théorique ici.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary-400" />
                </div>
                <h3 className="font-semibold dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labsData.map((lab) => {
            const Icon = lab.icon;
            return (
              <div key={lab.title} className="card-hover flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      lab.difficulty === 'Débutant' ? 'difficulty-beginner' :
                      lab.difficulty === 'Intermédiaire' ? 'difficulty-intermediate' :
                      'difficulty-advanced'
                    }`}>
                      {lab.difficulty}
                    </span>
                    <span className="text-xs text-accent-400 font-medium">+{lab.xp} XP</span>
                  </div>
                  <h3 className="font-semibold dark:text-white">{lab.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {lab.duration}
                    </span>
                    <span className="skill-tag">{lab.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/labs" className="btn-primary inline-flex items-center gap-2">
            Lancer un Lab <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
