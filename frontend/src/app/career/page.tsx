'use client';

import { Briefcase, TrendingUp, DollarSign, MapPin, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const careers = [
  {
    title: 'Administrateur Système Linux',
    level: 'Junior',
    salary: '30-40K€',
    skills: ['Linux', 'Bash', 'Réseau', 'DNS', 'SSH', 'Systemd'],
    courses: ['scripting-bash-automatisation', 'administration-debian-ubuntu', 'redhat-rhcsa-rhce'],
    description: 'Gère les serveurs Linux, assure la disponibilité des services et automatise les tâches répétitives.',
    color: 'from-slate-500 to-gray-600',
  },
  {
    title: 'Ingénieur DevOps',
    level: 'Intermédiaire',
    salary: '45-65K€',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring', 'Git'],
    courses: ['maitriser-docker', 'kubernetes-production', 'terraform-iac', 'cicd-github-actions'],
    description: 'Automatise les processus de build, test et déploiement. Pont entre développement et opérations.',
    color: 'from-primary-500 to-indigo-600',
  },
  {
    title: 'SRE (Site Reliability Engineer)',
    level: 'Senior',
    salary: '60-85K€',
    skills: ['SLOs', 'Monitoring', 'Chaos Engineering', 'Go/Python', 'On-Call', 'Incident Mgmt'],
    courses: ['sre-avance-error-budgets', 'chaos-engineering-resilience', 'monitoring-prometheus-grafana'],
    description: 'Assure la fiabilité des systèmes en production avec des pratiques d\'ingénierie logicielle.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    title: 'Cloud Architect',
    level: 'Senior',
    salary: '70-100K€',
    skills: ['AWS/Azure/GCP', 'Multi-Cloud', 'IaC', 'Networking', 'Sécurité', 'FinOps'],
    courses: ['cloud-aws-devops', 'multi-cloud-hybride', 'terraform-modules-patterns'],
    description: 'Conçoit et implémente des architectures cloud scalables, sécurisées et optimisées en coûts.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    title: 'DevSecOps Engineer',
    level: 'Intermédiaire',
    salary: '50-75K€',
    skills: ['SAST/DAST', 'Container Security', 'Vault', 'Zero Trust', 'Compliance', 'SBOM'],
    courses: ['devsecops-securite', 'securite-conteneurs-supply-chain', 'gestion-secrets-production'],
    description: 'Intègre la sécurité dans chaque étape du pipeline DevOps (shift-left security).',
    color: 'from-red-500 to-pink-600',
  },
  {
    title: 'Platform Engineer',
    level: 'Senior',
    salary: '65-95K€',
    skills: ['Kubernetes', 'Internal Developer Platform', 'Backstage', 'GitOps', 'Self-Service'],
    courses: ['platform-engineering-idp', 'crossplane-infrastructure-k8s', 'helm-charts-avance-operators'],
    description: 'Construit la plateforme interne pour que les développeurs déploient en self-service.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'DBA (Database Administrator)',
    level: 'Intermédiaire',
    salary: '45-65K€',
    skills: ['PostgreSQL', 'MySQL', 'Oracle', 'Réplication', 'Performance', 'Backup'],
    courses: ['postgresql-avance-administration', 'mysql-administration-optimisation', 'oracle-database-administration'],
    description: 'Administre les bases de données : performance, haute disponibilité, backup et sécurité.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Network Engineer DevOps',
    level: 'Intermédiaire',
    salary: '40-60K€',
    skills: ['TCP/IP', 'DNS', 'Load Balancing', 'VPN', 'Firewall', 'SDN'],
    courses: ['tcp-ip-modele-osi-profondeur', 'haproxy-load-balancing-avance', 'vpn-tunneling-openvpn-wireguard'],
    description: 'Conçoit et maintient l\'infrastructure réseau avec une approche automatisée et programmable.',
    color: 'from-sky-500 to-blue-600',
  },
];

const levelColors: Record<string, string> = {
  'Junior': 'text-green-400 bg-green-500/10 border-green-500/30',
  'Intermédiaire': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'Senior': 'text-red-400 bg-red-500/10 border-red-500/30',
};

export default function CareerPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <Briefcase size={16} className="text-accent-400" />
            Carrières DevOps
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Métiers <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Découvrez les métiers du DevOps, les compétences requises, les salaires et les formations correspondantes.
          </p>
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((career, i) => (
            <div key={i} className="card !p-0 overflow-hidden hover:border-primary-500/30 transition-all group">
              {/* Header gradient */}
              <div className={`h-2 bg-gradient-to-r ${career.color}`} />
              <div className="p-6">
                {/* Title + Level */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white text-lg group-hover:text-primary-400 transition">{career.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${levelColors[career.level]}`}>
                    {career.level}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4">{career.description}</p>

                {/* Salary */}
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign size={14} className="text-success-400" />
                  <span className="text-sm text-success-400 font-medium">{career.salary}/an</span>
                  <span className="text-xs text-gray-600">(France)</span>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Compétences clés :</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-300 border border-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related courses */}
                <div className="pt-3 border-t border-gray-800">
                  <p className="text-xs text-gray-500 mb-2">Formations recommandées :</p>
                  <div className="space-y-1">
                    {career.courses.slice(0, 3).map(slug => (
                      <Link key={slug} href={`/courses/${slug}`}
                        className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition">
                        <BookOpen size={10} />
                        <span className="truncate">{slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).slice(0, 40)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="card mt-12 text-center bg-gradient-to-r from-primary-500/5 to-secondary-500/5 border-primary-500/20">
          <TrendingUp size={32} className="mx-auto text-primary-400 mb-4" />
          <h2 className="text-xl font-bold dark:text-white mb-2">Prêt à lancer votre carrière DevOps ?</h2>
          <p className="text-gray-500 text-sm mb-6">Suivez nos parcours structurés et atteignez votre objectif professionnel.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/progress" className="btn-primary text-sm">Voir les parcours</Link>
            <Link href="/courses" className="btn-outline text-sm">Explorer les formations</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
