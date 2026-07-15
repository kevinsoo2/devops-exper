'use client';

import { 
  Target, 
  Users, 
  Rocket, 
  BookOpen, 
  Award, 
  Code, 
  Server, 
  Shield, 
  Globe, 
  Heart,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  Zap,
  TrendingUp,
  Brain,
  Clock
} from 'lucide-react';

const stats = [
  { label: 'Formations', value: '40+', icon: BookOpen },
  { label: 'Leçons', value: '1600+', icon: Code },
  { label: 'Labs Pratiques', value: '87+', icon: Server },
  { label: 'Certifications', value: '8', icon: Award },
];

const values = [
  {
    icon: Target,
    title: 'Apprentissage Ciblé',
    description: 'Chaque formation est construite pour vous mener de débutant à expert avec un parcours structuré et progressif.',
  },
  {
    icon: Rocket,
    title: 'Pratique Avant Tout',
    description: 'Des labs interactifs, des projets concrets et des exercices pratiques pour maîtriser chaque technologie.',
  },
  {
    icon: Brain,
    title: 'Contenu Expert',
    description: 'Des cours rédigés par des professionnels DevOps avec des années d\'expérience en production.',
  },
  {
    icon: TrendingUp,
    title: 'Progression Continue',
    description: 'Suivez votre avancement avec notre système de XP, badges, streaks et tableau de bord personnalisé.',
  },
  {
    icon: Users,
    title: 'Communauté Active',
    description: 'Rejoignez une communauté de passionnés DevOps pour échanger, s\'entraider et progresser ensemble.',
  },
  {
    icon: Clock,
    title: 'À Votre Rythme',
    description: 'Apprenez quand vous voulez, où vous voulez. Le contenu est accessible 24/7 depuis n\'importe quel appareil.',
  },
];

const technologies = [
  { name: 'Docker', category: 'Conteneurisation' },
  { name: 'Kubernetes', category: 'Orchestration' },
  { name: 'Terraform', category: 'IaC' },
  { name: 'Ansible', category: 'Automatisation' },
  { name: 'Jenkins', category: 'CI/CD' },
  { name: 'GitLab CI', category: 'CI/CD' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Prometheus', category: 'Monitoring' },
  { name: 'Grafana', category: 'Monitoring' },
  { name: 'ELK Stack', category: 'Logging' },
  { name: 'Linux', category: 'Système' },
  { name: 'Red Hat', category: 'Système' },
  { name: 'Nginx', category: 'Web Server' },
  { name: 'Git', category: 'Versioning' },
  { name: 'Python', category: 'Scripting' },
  { name: 'Istio', category: 'Service Mesh' },
  { name: 'Kafka', category: 'Messaging' },
  { name: 'HashiCorp Vault', category: 'Sécurité' },
];

const roadmap = [
  { phase: '1', title: 'Fondamentaux', desc: 'Linux, Réseaux, Git, Scripting' },
  { phase: '2', title: 'Conteneurisation', desc: 'Docker, Podman, registres' },
  { phase: '3', title: 'Orchestration', desc: 'Kubernetes, Helm, Operators' },
  { phase: '4', title: 'CI/CD', desc: 'Jenkins, GitLab CI, GitHub Actions' },
  { phase: '5', title: 'Infrastructure as Code', desc: 'Terraform, Ansible, Pulumi' },
  { phase: '6', title: 'Cloud & Monitoring', desc: 'AWS/Azure/GCP, Prometheus, ELK' },
  { phase: '7', title: 'Sécurité & SRE', desc: 'DevSecOps, Chaos Engineering, FinOps' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <Globe size={16} />
              Plateforme d&apos;apprentissage DevOps
            </div>
            <h1 className="text-4xl md:text-6xl font-bold dark:text-white mb-6">
              Devenez{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Expert DevOps
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              DevOps Expert Academy est la plateforme francophone de référence pour maîtriser 
              les technologies DevOps, du débutant au niveau expert. Des formations complètes, 
              des labs pratiques et un parcours de certification structuré.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card text-center p-6">
                <Icon className="mx-auto mb-3 text-primary-400" size={28} />
                <p className="text-3xl font-bold dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold dark:text-white mb-6">Notre Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              Rendre l&apos;apprentissage DevOps accessible à tous les francophones. 
              Nous croyons que chaque développeur et administrateur système peut devenir 
              un expert DevOps avec les bonnes ressources et un accompagnement structuré.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              Notre plateforme couvre l&apos;ensemble de l&apos;écosystème DevOps : de Linux aux 
              conteneurs, du CI/CD au monitoring, de l&apos;Infrastructure as Code au Cloud, 
              en passant par la sécurité et le SRE.
            </p>
            <div className="space-y-3">
              {['100% en français', 'Contenu mis à jour régulièrement', 'Approche pratique et concrète', 'Parcours de certification guidé'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-success-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-6 bg-gradient-to-br from-primary-500/5 to-primary-500/10 border-primary-500/20">
              <Shield className="text-primary-400 mb-3" size={32} />
              <h3 className="font-bold dark:text-white mb-1">DevSecOps</h3>
              <p className="text-sm text-gray-500">Sécurité intégrée au pipeline</p>
            </div>
            <div className="card p-6 bg-gradient-to-br from-secondary-500/5 to-secondary-500/10 border-secondary-500/20">
              <Server className="text-secondary-400 mb-3" size={32} />
              <h3 className="font-bold dark:text-white mb-1">SRE</h3>
              <p className="text-sm text-gray-500">Fiabilité & résilience</p>
            </div>
            <div className="card p-6 bg-gradient-to-br from-success-500/5 to-success-500/10 border-success-500/20">
              <Code className="text-success-400 mb-3" size={32} />
              <h3 className="font-bold dark:text-white mb-1">IaC</h3>
              <p className="text-sm text-gray-500">Infrastructure as Code</p>
            </div>
            <div className="card p-6 bg-gradient-to-br from-warning-500/5 to-warning-500/10 border-warning-500/20">
              <Zap className="text-warning-400 mb-3" size={32} />
              <h3 className="font-bold dark:text-white mb-1">CI/CD</h3>
              <p className="text-sm text-gray-500">Automatisation continue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 dark:bg-dark-card/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white mb-4">Pourquoi DevOps Expert ?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Une plateforme conçue par des DevOps pour des DevOps, avec une approche pédagogique unique.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="card p-6 hover:border-primary-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <Icon size={24} className="text-primary-400" />
                  </div>
                  <h3 className="font-bold dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Covered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold dark:text-white mb-4">Technologies Couvertes</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Plus de 20 technologies et outils DevOps majeurs couverts en profondeur.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all cursor-default"
            >
              <span className="font-medium text-sm dark:text-white">{tech.name}</span>
              <span className="text-xs text-gray-500 ml-2">({tech.category})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="bg-gray-50 dark:bg-dark-card/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white mb-4">Parcours d&apos;Apprentissage</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Un chemin structuré de 7 phases pour devenir expert DevOps.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {roadmap.map((step, index) => (
              <div key={step.phase} className="flex gap-4 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {step.phase}
                  </div>
                  {index < roadmap.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-500/50 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-bold dark:text-white text-lg">{step.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold dark:text-white mb-4">Notre Stack Technique</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Cette plateforme est elle-même construite avec des technologies modernes.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4">
              <Globe size={28} className="text-blue-400" />
            </div>
            <h3 className="font-bold dark:text-white mb-2">Frontend</h3>
            <p className="text-sm text-gray-500">Next.js 14, TypeScript, Tailwind CSS, Zustand</p>
            <p className="text-xs text-gray-600 mt-2">Hébergé sur Vercel</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mb-4">
              <Server size={28} className="text-green-400" />
            </div>
            <h3 className="font-bold dark:text-white mb-2">Backend</h3>
            <p className="text-sm text-gray-500">Node.js, Express.js, JWT, bcrypt</p>
            <p className="text-xs text-gray-600 mt-2">Hébergé sur Render</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4">
              <Code size={28} className="text-purple-400" />
            </div>
            <h3 className="font-bold dark:text-white mb-2">Base de données</h3>
            <p className="text-sm text-gray-500">Turso (libSQL), SQLite distribué</p>
            <p className="text-xs text-gray-600 mt-2">Edge-ready & ultra-rapide</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card p-12 text-center bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 border-primary-500/20">
          <Heart className="mx-auto text-danger-400 mb-4" size={40} />
          <h2 className="text-3xl font-bold dark:text-white mb-4">
            Prêt à devenir Expert DevOps ?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Rejoignez des centaines d&apos;apprenants qui progressent chaque jour vers la maîtrise complète du DevOps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/courses" className="btn-primary !px-8 !py-3">
              Explorer les Formations
            </a>
            <a href="/roadmap" className="btn-outline !px-8 !py-3">
              Voir le Parcours
            </a>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <h3 className="text-lg font-bold dark:text-white mb-4">Nous Contacter</h3>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/kevinsoo2" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50 hover:bg-primary-500/10 hover:text-primary-400 transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50 hover:bg-primary-500/10 hover:text-primary-400 transition-all">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50 hover:bg-primary-500/10 hover:text-primary-400 transition-all">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            &copy; {new Date().getFullYear()} DevOps Expert Academy. Tous droits réservés.
          </p>
        </div>
      </section>
    </div>
  );
}
