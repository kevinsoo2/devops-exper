'use client';

import { Calendar, Rocket, Bug, Sparkles, Wrench, Star } from 'lucide-react';

const changelog = [
  {
    version: '2.8.0',
    date: '15 Juillet 2026',
    type: 'feature',
    title: 'Terminal Interactif et Simulateur d\'Examen',
    items: [
      'Terminal Linux simulé avec 25+ commandes (ls, docker, kubectl...)',
      'Simulateur d\'examen DevOps : 20 questions, timer 30 min, explications',
      'Page Flashcards : 6 decks de révision (Docker, K8s, Terraform...)',
      'Page Ressources : 30 liens essentiels (docs, YouTube, playgrounds)',
    ],
  },
  {
    version: '2.7.0',
    date: '14 Juillet 2026',
    title: 'Contenu Linux Complet',
    type: 'feature',
    items: [
      '200+ commandes Linux ajoutées aux cours système et réseau',
      'Commandes pour RHEL (dnf) ET Debian/Ubuntu (apt)',
      'Fichier RHCSA EX200 avec 17 sections complètes',
      '5 nouvelles fiches : MySQL, PostgreSQL, Docker Compose, Terraform, K8s Troubleshooting',
    ],
  },
  {
    version: '2.6.0',
    date: '13 Juillet 2026',
    title: '24 Nouveaux Cours (Système, Réseau, Données)',
    type: 'feature',
    items: [
      'Système : Debian/Ubuntu, ZFS, Pacemaker HA, Logs, Backup, KVM, LDAP, Kernel Tuning',
      'Réseau : TCP/IP, Wireshark, VPN, IPv6, VLANs, Squid/pfSense, SDN',
      'Données : MariaDB, TimescaleDB, Elasticsearch, Cassandra, DynamoDB, Airflow, Neo4j, ClickHouse',
    ],
  },
  {
    version: '2.5.0',
    date: '12 Juillet 2026',
    title: 'Parcours d\'Apprentissage et Progression',
    type: 'feature',
    items: [
      'Page /progress avec 6 parcours structurés',
      'Objectif hebdomadaire configurable',
      'Quick Actions sur le Dashboard (5 raccourcis)',
      'Profil enrichi avec badges et stats',
    ],
  },
  {
    version: '2.4.0',
    date: '11 Juillet 2026',
    title: 'Préparation Entretiens et Commandes',
    type: 'feature',
    items: [
      'Page Entretiens : 16 questions/réponses DevOps',
      'Page Commandes : 54 commandes essentielles avec copier',
      '21 nouveaux labs (databases, cloud, monitoring, security)',
    ],
  },
  {
    version: '2.3.0',
    date: '10 Juillet 2026',
    title: 'Glossaire, FAQ et Comparateur',
    type: 'feature',
    items: [
      'Glossaire DevOps : 64 termes avec recherche et filtres',
      'FAQ : 8 questions fréquentes sur la plateforme',
      'Comparateur d\'outils : Docker vs Podman, Terraform vs Pulumi, etc.',
      'Astuce du jour sur la homepage',
    ],
  },
  {
    version: '2.2.0',
    date: '9 Juillet 2026',
    title: 'Témoignages et Partners',
    type: 'feature',
    items: [
      'Section Témoignages avec carousel animé',
      'Section Partenaires avec logos défilants',
      'Hero amélioré : effet typing, compteurs animés, particules',
      'Footer redesigné avec CTA et infos contact',
    ],
  },
  {
    version: '2.1.0',
    date: '8 Juillet 2026',
    title: 'Base de Données et OAuth',
    type: 'feature',
    items: [
      '11 cours Base de Données (Oracle, MySQL, PostgreSQL, MongoDB, Redis, SQL Server...)',
      'Connexion OAuth Google et GitHub',
      'Page À Propos complète',
      'Redirection automatique si déjà connecté',
    ],
  },
  {
    version: '2.0.0',
    date: '7 Juillet 2026',
    title: 'Lancement DevOps Expert Academy v2',
    type: 'feature',
    items: [
      '40 cours initiaux couvrant tout le DevOps',
      '87 labs pratiques',
      'Système de gamification (XP, niveaux, badges, streaks)',
      'Chatbot, recherche Ctrl+K, mode Pomodoro',
      'PWA installable, 100% français',
    ],
  },
];

const typeIcons: Record<string, any> = {
  feature: { icon: Sparkles, color: 'text-primary-400', bg: 'bg-primary-500/10' },
  fix: { icon: Bug, color: 'text-success-400', bg: 'bg-success-500/10' },
  improvement: { icon: Wrench, color: 'text-secondary-400', bg: 'bg-secondary-500/10' },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <Rocket size={16} className="text-accent-400" />
            Changelog
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Quoi de <span className="gradient-text">Neuf</span> ?
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Toutes les mises à jour et nouvelles fonctionnalités de la plateforme.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {changelog.map((entry, i) => {
            const typeConfig = typeIcons[entry.type] || typeIcons.feature;
            const Icon = typeConfig.icon;
            return (
              <div key={i} className="flex gap-4 pb-10 last:pb-0">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl ${typeConfig.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={typeConfig.color} />
                  </div>
                  {i < changelog.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-800 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-lg bg-primary-500/20 text-primary-400 text-xs font-bold">
                      v{entry.version}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={11} /> {entry.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3">{entry.title}</h3>
                  <ul className="space-y-1.5">
                    {entry.items.map((item, j) => (
                      <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                        <Star size={10} className="text-accent-400 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
