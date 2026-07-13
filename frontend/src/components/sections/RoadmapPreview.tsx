'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Map, ChevronRight, CheckCircle, Circle, Lock } from 'lucide-react';

const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

const roadmapSteps = [
  {
    level: 'Débutant',
    title: 'Fondations',
    description: 'Linux, Git, bases du réseau',
    xp: 500,
    status: 'completed',
    category: 'systeme', items: ['Linux Fundamentals', 'Git & Version Control', 'Networking Basics', 'Shell Scripting'],
  },
  {
    level: 'Débutant',
    title: 'Conteneurisation',
    description: 'Docker, concepts de conteneurs',
    xp: 750,
    status: 'completed',
    category: 'conteneurisation', items: ['Docker Basics', 'Dockerfile Best Practices', 'Docker Compose', 'Container Security'],
  },
  {
    level: 'Intermédiaire',
    title: 'Pipelines CI/CD',
    description: 'Jenkins, GitHub Actions, GitLab CI',
    xp: 1000,
    status: 'current',
    category: 'cicd', items: ['CI/CD Concepts', 'GitHub Actions', 'Jenkins Pipelines', 'GitLab CI/CD'],
  },
  {
    level: 'Intermédiaire',
    title: 'Orchestration',
    description: 'Kubernetes, Helm, Service Mesh',
    xp: 1500,
    status: 'locked',
    items: ['Kubernetes Basics', 'Helm Charts', 'Service Mesh (Istio)', 'K8s Security'],
  },
  {
    level: 'Avancé',
    title: 'Infrastructure as Code',
    description: 'Terraform, Ansible, Pulumi',
    xp: 2000,
    status: 'locked',
    items: ['Terraform Basics', 'Ansible Automation', 'Pulumi', 'State Management'],
  },
  {
    level: 'Expert',
    title: 'Platform Engineering',
    description: 'Plateformes internes, SRE',
    xp: 3000,
    status: 'locked',
    category: 'sre', items: ['Platform Design', 'Developer Experience', 'SRE Principles', 'Chaos Engineering'],
  },
  {
    level: 'Débutant',
    title: 'Scripting & Automatisation',
    description: 'Bash, Python, automatisation des tâches',
    xp: 600,
    status: 'available',
    category: 'systeme', items: ['Bash Scripting', 'Python pour DevOps', 'Cron & Systemd', 'Automatisation SSH'],
  },
  {
    level: 'Intermédiaire',
    title: 'Cloud Computing',
    description: 'AWS, Azure, GCP - services essentiels',
    xp: 1200,
    status: 'locked',
    category: 'cloud', items: ['AWS (EC2, S3, VPC, IAM)', 'Azure (AKS, Functions)', 'GCP (GKE, Cloud Run)', 'Multi-cloud strategies'],
  },
  {
    level: 'Intermédiaire',
    title: 'Monitoring & Observabilité',
    description: 'Prometheus, Grafana, ELK, tracing',
    xp: 1100,
    status: 'locked',
    category: 'monitoring', items: ['Prometheus & PromQL', 'Grafana Dashboards', 'ELK Stack (Logs)', 'OpenTelemetry (Traces)'],
  },
  {
    level: 'Avancé',
    title: 'Sécurité DevSecOps',
    description: 'SAST, DAST, scanning, secrets, compliance',
    xp: 1800,
    status: 'locked',
    category: 'securite', items: ['Scan de vulnérabilités (Trivy)', 'SAST/DAST en pipeline', 'Gestion des secrets (Vault)', 'OPA & Policy as Code'],
  },
  {
    level: 'Avancé',
    title: 'GitOps & Déploiement Avancé',
    description: 'ArgoCD, Flux, canary, blue-green',
    xp: 1600,
    status: 'locked',
    category: 'gitops', items: ['ArgoCD & Flux CD', 'Canary Deployments', 'Blue-Green & A/B Testing', 'Progressive Delivery'],
  },
  {
    level: 'Avancé',
    title: 'Réseaux pour DevOps',
    description: 'DNS, Load Balancing, Service Mesh, VPN',
    xp: 1400,
    status: 'locked',
    category: 'network', items: ['DNS & HTTP avancé', 'Load Balancing (Nginx, HAProxy)', 'Service Mesh (Istio)', 'VPN & Firewalling'],
  },
  {
    level: 'Expert',
    title: 'Kubernetes Avancé',
    description: 'Operators, CRDs, multi-cluster, federation',
    xp: 2500,
    status: 'locked',
    category: 'orchestration', items: ['Custom Operators & CRDs', 'Multi-cluster management', 'Service Mesh avancé', 'FinOps & Cost optimization'],
  },
  {
    level: 'Expert',
    title: 'SRE & Fiabilité',
    description: 'SLO/SLI, Error Budgets, Chaos Engineering',
    xp: 2800,
    status: 'locked',
    category: 'sre', items: ['SLO, SLI & Error Budgets', 'Incident Management', 'Chaos Engineering (Litmus)', 'Capacity Planning'],
  },
];

export function RoadmapPreview() {
  const [filter, setFilter] = useState('Tous');

  const filtered = filter === 'Tous' ? roadmapSteps : roadmapSteps.filter((s) => s.level === filter);

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Map size={16} />
            Parcours d&apos;apprentissage
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Votre chemin vers la <span className="gradient-text">Maîtrise DevOps</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Suivez notre parcours structuré des fondations au platform engineering de niveau expert.
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === level
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform md:-translate-x-0.5" />

          <div className="space-y-8">
            {filtered.map((step, idx) => (
              <div
                key={step.title}
                className={`relative flex flex-col md:flex-row ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-4 md:gap-8`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 transform -translate-x-2 md:-translate-x-2 z-10">
                  {step.status === 'completed' ? (
                    <CheckCircle size={16} className="text-success-500" />
                  ) : step.status === 'current' ? (
                    <Circle size={16} className="text-primary-500 fill-primary-500" />
                  ) : (
                    <Lock size={16} className="text-gray-500" />
                  )}
                </div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="card-hover">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                        step.level === 'Débutant' ? 'difficulty-beginner' :
                        step.level === 'Intermédiaire' ? 'difficulty-intermediate' :
                        step.level === 'Avancé' ? 'difficulty-advanced' :
                        'text-purple-400 bg-purple-500/10 border-purple-500/20'
                      }`}>
                        {step.level}
                      </span>
                      <span className="text-xs text-accent-400 font-medium">+{step.xp} XP</span>
                    </div>
                    <h3 className="text-lg font-bold dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {step.items.map((item) => (
                        <span key={item} className="skill-tag text-xs">{item}</span>
                      ))}
                    </div>
                    <Link 
                      href={`/courses?category=${(step as any).category || ''}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-400 hover:text-primary-300 transition"
                    >
                      Voir les formations de ce parcours <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/roadmap" className="btn-outline inline-flex items-center gap-2">
            Voir le Parcours Complet <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
