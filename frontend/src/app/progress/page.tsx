'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Map, BookOpen, CheckCircle2, Lock, ArrowRight, TrendingUp, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const learningPaths = [
  {
    id: 'devops-fundamentals',
    title: 'Fondamentaux DevOps',
    description: 'Les bases essentielles pour démarrer en DevOps',
    color: 'from-green-500 to-emerald-500',
    icon: '🌱',
    steps: [
      { title: 'Linux & Bash', slug: 'scripting-bash-automatisation', status: 'available' },
      { title: 'Réseaux TCP/IP', slug: 'tcp-ip-modele-osi-profondeur', status: 'available' },
      { title: 'Git Fondamentaux', slug: 'git-avance-workflows', status: 'available' },
      { title: 'Docker Basics', slug: 'maitriser-docker', status: 'locked' },
      { title: 'CI/CD Intro', slug: 'cicd-github-actions', status: 'locked' },
    ],
  },
  {
    id: 'container-orchestration',
    title: 'Conteneurisation & Orchestration',
    description: 'De Docker à Kubernetes en production',
    color: 'from-blue-500 to-cyan-500',
    icon: '🐳',
    steps: [
      { title: 'Docker Avancé', slug: 'maitriser-docker', status: 'available' },
      { title: 'Docker Compose', slug: 'docker-swarm-orchestration', status: 'available' },
      { title: 'Kubernetes Basics', slug: 'kubernetes-production', status: 'available' },
      { title: 'Helm & Charts', slug: 'helm-charts-avance-operators', status: 'locked' },
      { title: 'K8s Networking', slug: 'kubernetes-networking-deep-dive', status: 'locked' },
      { title: 'K8s Security', slug: 'container-security-hardening', status: 'locked' },
    ],
  },
  {
    id: 'infrastructure-code',
    title: 'Infrastructure as Code',
    description: 'Automatisez toute votre infrastructure',
    color: 'from-purple-500 to-violet-500',
    icon: '🏗️',
    steps: [
      { title: 'Terraform Basics', slug: 'terraform-iac', status: 'available' },
      { title: 'Ansible', slug: 'ansible-avance-roles-awx', status: 'available' },
      { title: 'Terraform Avancé', slug: 'terraform-modules-patterns', status: 'available' },
      { title: 'Packer', slug: 'packer-images-machine', status: 'locked' },
      { title: 'Crossplane', slug: 'crossplane-infrastructure-k8s', status: 'locked' },
      { title: 'Pulumi', slug: 'pulumi-iac', status: 'locked' },
    ],
  },
  {
    id: 'cloud-mastery',
    title: 'Maîtrise du Cloud',
    description: 'AWS, Azure, GCP et multi-cloud',
    color: 'from-orange-500 to-amber-500',
    icon: '☁️',
    steps: [
      { title: 'AWS Fondamentaux', slug: 'cloud-aws-devops', status: 'available' },
      { title: 'AWS EKS', slug: 'aws-eks-conteneurs-production', status: 'available' },
      { title: 'Azure DevOps', slug: 'azure-devops-cloud', status: 'available' },
      { title: 'GCP', slug: 'gcp-devops', status: 'locked' },
      { title: 'Serverless', slug: 'serverless-framework-aws-lambda', status: 'locked' },
      { title: 'Multi-Cloud', slug: 'multi-cloud-hybride', status: 'locked' },
    ],
  },
  {
    id: 'monitoring-sre',
    title: 'Monitoring & SRE',
    description: 'Observabilité, alerting et fiabilité',
    color: 'from-yellow-500 to-orange-500',
    icon: '📊',
    steps: [
      { title: 'Prometheus & Grafana', slug: 'monitoring-prometheus-grafana', status: 'available' },
      { title: 'ELK Stack', slug: 'elasticsearch-elk-stack', status: 'available' },
      { title: 'Loki Logging', slug: 'grafana-loki-logging', status: 'available' },
      { title: 'OpenTelemetry', slug: 'observabilite-opentelemetry', status: 'locked' },
      { title: 'Alerting & On-Call', slug: 'alerting-oncall-engineering', status: 'locked' },
      { title: 'SRE Practices', slug: 'sre-avance-error-budgets', status: 'locked' },
    ],
  },
  {
    id: 'databases-expert',
    title: 'Expert Bases de Données',
    description: 'PostgreSQL, MySQL, MongoDB et plus',
    color: 'from-teal-500 to-green-500',
    icon: '🗄️',
    steps: [
      { title: 'PostgreSQL', slug: 'postgresql-avance-administration', status: 'available' },
      { title: 'MySQL', slug: 'mysql-administration-optimisation', status: 'available' },
      { title: 'MongoDB', slug: 'mongodb-administration-nosql', status: 'available' },
      { title: 'Redis', slug: 'redis-cache-messaging', status: 'locked' },
      { title: 'DB & Apps', slug: 'databases-serveurs-applicatifs', status: 'locked' },
      { title: 'Migration', slug: 'migration-interoperabilite-bdd', status: 'locked' },
    ],
  },
];

export default function ProgressPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <Map size={16} className="text-primary-400" />
            Parcours d&apos;Apprentissage
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Votre <span className="gradient-text">Progression</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Suivez des parcours structurés pour devenir expert DevOps. Chaque parcours vous guide étape par étape.
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningPaths.map((path) => {
            const completedSteps = path.steps.filter(s => s.status === 'completed').length;
            const progress = Math.round((completedSteps / path.steps.length) * 100);
            
            return (
              <motion.div
                key={path.id}
                whileHover={{ y: -4 }}
                className={`card-hover cursor-pointer relative overflow-hidden ${selectedPath === path.id ? 'border-primary-500/50 shadow-lg shadow-primary-500/10' : ''}`}
                onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${path.color}`} />
                
                <div className="pt-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{path.icon}</span>
                    <span className="text-xs text-gray-500">{path.steps.length} étapes</span>
                  </div>
                  <h3 className="font-bold dark:text-white text-lg">{path.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{path.description}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{completedSteps}/{path.steps.length} complétées</span>
                      <span className="text-primary-400 font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${path.color} transition-all duration-500`} style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Path Detail */}
        {selectedPath && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            {(() => {
              const path = learningPaths.find(p => p.id === selectedPath)!;
              return (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{path.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold dark:text-white">{path.title}</h2>
                      <p className="text-sm text-gray-500">{path.description}</p>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-0">
                    {path.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === 'completed' ? 'bg-success-500/20 text-success-400' :
                            step.status === 'available' ? `bg-gradient-to-br ${path.color} text-white` :
                            'bg-gray-800 text-gray-600'
                          }`}>
                            {step.status === 'completed' ? <CheckCircle2 size={18} /> :
                             step.status === 'locked' ? <Lock size={14} /> :
                             <span className="text-xs font-bold">{i + 1}</span>}
                          </div>
                          {i < path.steps.length - 1 && (
                            <div className={`w-0.5 h-8 ${
                              step.status === 'completed' ? 'bg-success-500/50' : 'bg-gray-800'
                            }`} />
                          )}
                        </div>
                        <div className={`flex-1 pb-4 ${step.status === 'locked' ? 'opacity-50' : ''}`}>
                          <div className="flex items-center justify-between">
                            <span className={`font-medium text-sm ${step.status === 'completed' ? 'text-success-400' : 'dark:text-white'}`}>
                              {step.title}
                            </span>
                            {step.status === 'available' && (
                              <Link href={`/courses/${step.slug}`} className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                                Commencer <ArrowRight size={12} />
                              </Link>
                            )}
                            {step.status === 'completed' && (
                              <span className="text-xs text-success-400">✓ Terminé</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <TrendingUp size={24} className="mx-auto text-primary-400 mb-2" />
            <p className="text-2xl font-bold dark:text-white">6</p>
            <p className="text-xs text-gray-500">Parcours disponibles</p>
          </div>
          <div className="card text-center">
            <BookOpen size={24} className="mx-auto text-secondary-400 mb-2" />
            <p className="text-2xl font-bold dark:text-white">35</p>
            <p className="text-xs text-gray-500">Étapes au total</p>
          </div>
          <div className="card text-center">
            <Target size={24} className="mx-auto text-success-400 mb-2" />
            <p className="text-2xl font-bold dark:text-white">0</p>
            <p className="text-xs text-gray-500">Étapes complétées</p>
          </div>
          <div className="card text-center">
            <Zap size={24} className="mx-auto text-accent-400 mb-2" />
            <p className="text-2xl font-bold dark:text-white">0%</p>
            <p className="text-xs text-gray-500">Progression globale</p>
          </div>
        </div>
      </div>
    </div>
  );
}
