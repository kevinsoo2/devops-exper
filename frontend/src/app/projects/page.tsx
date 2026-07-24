'use client';

import { useState } from 'react';
import { Folder, Github, Clock, Star, Tag, ExternalLink, CheckCircle2, Circle } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Déployer un blog avec Docker Compose',
    description: 'Créez un blog WordPress avec MySQL et Nginx reverse proxy, le tout orchestré par Docker Compose avec des healthchecks.',
    difficulty: 'facile',
    duration: '2-3h',
    skills: ['Docker', 'Docker Compose', 'Nginx', 'MySQL'],
    steps: ['Écrire le docker-compose.yml', 'Configurer Nginx comme reverse proxy', 'Ajouter les healthchecks', 'Tester le déploiement', 'Ajouter SSL avec Certbot'],
    github: 'https://github.com/topics/docker-compose-wordpress',
    category: 'Conteneurs',
  },
  {
    id: 2,
    title: 'Pipeline CI/CD avec GitHub Actions',
    description: 'Construisez un pipeline complet : lint, tests, build Docker, push registry, déploiement staging/production avec approbation.',
    difficulty: 'moyen',
    duration: '4-5h',
    skills: ['GitHub Actions', 'Docker', 'Node.js', 'Testing'],
    steps: ['Créer l\'app Node.js avec tests', 'Configurer le workflow CI', 'Ajouter le build Docker', 'Push vers GitHub Container Registry', 'Déploiement avec environments', 'Ajouter la matrice de tests'],
    github: 'https://github.com/topics/github-actions-ci-cd',
    category: 'CI/CD',
  },
  {
    id: 3,
    title: 'Infrastructure AWS avec Terraform',
    description: 'Provisionnez un VPC complet avec subnets publics/privés, ALB, Auto Scaling Group, RDS et bastion host.',
    difficulty: 'moyen',
    duration: '6-8h',
    skills: ['Terraform', 'AWS', 'VPC', 'ALB', 'RDS'],
    steps: ['Créer le module VPC', 'Configurer les subnets et NAT', 'Déployer l\'ALB', 'Auto Scaling Group avec Launch Template', 'RDS en subnet privé', 'Bastion host avec Security Groups', 'Outputs et documentation'],
    github: 'https://github.com/topics/terraform-aws-vpc',
    category: 'IaC',
  },
  {
    id: 4,
    title: 'Cluster Kubernetes avec monitoring',
    description: 'Déployez une application microservices sur K8s avec Ingress, HPA, Prometheus, Grafana et alerting.',
    difficulty: 'difficile',
    duration: '8-10h',
    skills: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana', 'HPA'],
    steps: ['Créer les manifestes de l\'app', 'Configurer l\'Ingress (Nginx)', 'Installer Prometheus avec Helm', 'Créer les dashboards Grafana', 'Configurer le HPA', 'Ajouter les alertes', 'Network Policies'],
    github: 'https://github.com/topics/kubernetes-monitoring',
    category: 'Orchestration',
  },
  {
    id: 5,
    title: 'Serveur de backup automatisé',
    description: 'Automatisez les backups de 5 serveurs avec Borg/Restic, rotation, notifications Slack et monitoring.',
    difficulty: 'moyen',
    duration: '4-6h',
    skills: ['Bash', 'Borg', 'Cron', 'SSH', 'Notifications'],
    steps: ['Installer Borg Backup', 'Script de backup avec rotation', 'Cron job automatisé', 'Notifications Slack/email', 'Monitoring des backups', 'Test de restauration'],
    github: 'https://github.com/topics/borg-backup',
    category: 'Système',
  },
  {
    id: 6,
    title: 'Stack de logging ELK',
    description: 'Centralisez les logs de votre infrastructure avec Elasticsearch, Logstash, Kibana et Filebeat.',
    difficulty: 'moyen',
    duration: '5-7h',
    skills: ['Elasticsearch', 'Logstash', 'Kibana', 'Docker'],
    steps: ['Déployer le cluster ES avec Docker', 'Configurer Logstash pipelines', 'Installer Filebeat sur les serveurs', 'Créer les index patterns Kibana', 'Dashboards et visualisations', 'Retention et ILM'],
    github: 'https://github.com/topics/elk-stack-docker',
    category: 'Monitoring',
  },
  {
    id: 7,
    title: 'Hardening serveur Linux (CIS Benchmark)',
    description: 'Appliquez les CIS Benchmarks sur un serveur RHEL/Ubuntu : SSH, firewall, audit, mot de passe, permissions.',
    difficulty: 'moyen',
    duration: '4-5h',
    skills: ['Linux', 'Security', 'Ansible', 'CIS Benchmarks'],
    steps: ['Audit initial avec Lynis', 'Hardening SSH (clés only, fail2ban)', 'Configurer firewalld/UFW', 'Politique de mots de passe', 'Auditd et surveillance', 'Automatiser avec Ansible', 'Re-audit et rapport'],
    github: 'https://github.com/topics/cis-benchmark',
    category: 'Sécurité',
  },
  {
    id: 8,
    title: 'GitOps avec ArgoCD',
    description: 'Implémentez le GitOps : déploiement déclaratif, sync automatique, rollback et notifications.',
    difficulty: 'difficile',
    duration: '6-8h',
    skills: ['ArgoCD', 'Kubernetes', 'Git', 'Helm', 'Kustomize'],
    steps: ['Installer ArgoCD sur K8s', 'Créer le repo GitOps', 'Configurer l\'Application ArgoCD', 'Auto-sync et self-heal', 'App of Apps pattern', 'Notifications Slack', 'RBAC et multi-tenancy'],
    github: 'https://github.com/topics/argocd-gitops',
    category: 'GitOps',
  },
  {
    id: 9,
    title: 'Base de données HA avec réplication',
    description: 'Configurez PostgreSQL en haute disponibilité : streaming replication, Patroni, PgBouncer et failover automatique.',
    difficulty: 'difficile',
    duration: '8-10h',
    skills: ['PostgreSQL', 'Patroni', 'PgBouncer', 'Docker', 'HAProxy'],
    steps: ['Cluster PostgreSQL 3 nœuds', 'Streaming Replication', 'Patroni pour le failover auto', 'PgBouncer pour le pooling', 'HAProxy en frontend', 'Tests de failover', 'Monitoring avec pg_exporter'],
    github: 'https://github.com/topics/patroni-postgresql',
    category: 'Données',
  },
  {
    id: 10,
    title: 'Plateforme de déploiement self-service',
    description: 'Construisez un portail développeur avec Backstage pour le self-service : création de repos, déploiement, monitoring.',
    difficulty: 'difficile',
    duration: '10-15h',
    skills: ['Backstage', 'Kubernetes', 'Terraform', 'GitHub', 'ArgoCD'],
    steps: ['Installer Backstage', 'Créer un Software Template', 'Intégrer avec GitHub (création repo)', 'Ajouter le plugin Kubernetes', 'ArgoCD pour le déploiement', 'Dashboards Tech Radar', 'Documentation-as-Code'],
    github: 'https://github.com/topics/backstage-platform',
    category: 'Platform',
  },
];

const diffColors: Record<string, string> = {
  'facile': 'text-green-400 bg-green-500/10 border-green-500/30',
  'moyen': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'difficile': 'text-red-400 bg-red-500/10 border-red-500/30',
};

export default function ProjectsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', 'Conteneurs', 'CI/CD', 'IaC', 'Orchestration', 'Système', 'Monitoring', 'Sécurité', 'GitOps', 'Données', 'Platform'];

  const filtered = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-badge"><Folder size={16} className="text-accent-400" /> Portfolio</span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Projets <span className="gradient-text">DevOps</span> pour votre CV
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {projects.length} idées de projets concrets à réaliser pour démontrer vos compétences en entretien.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === cat ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(project => (
            <div key={project.id} className="card !p-0 overflow-hidden hover:border-primary-500/30 transition-all">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white text-base pr-4">{project.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${diffColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {project.duration}</span>
                  <span className="flex items-center gap-1"><Tag size={12} /> {project.category}</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-300 border border-gray-700">{s}</span>
                  ))}
                </div>

                {/* Toggle steps */}
                <button onClick={() => setSelected(selected === project.id ? null : project.id)}
                  className="text-xs text-primary-400 hover:text-primary-300 transition">
                  {selected === project.id ? 'Masquer les étapes ▲' : 'Voir les étapes ▼'}
                </button>

                {selected === project.id && (
                  <div className="mt-3 pt-3 border-t border-gray-800 space-y-1.5">
                    {project.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <Circle size={8} className="text-primary-400 flex-shrink-0 mt-1" />
                        {step}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-800 flex items-center justify-between">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-400 transition">
                  <Github size={12} /> Exemples GitHub <ExternalLink size={10} />
                </a>
                <span className="text-[10px] text-gray-600">Projet #{project.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
