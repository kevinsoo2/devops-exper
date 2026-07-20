'use client';

import { useState } from 'react';
import { ExternalLink, Star, Search, BookOpen, Video, FileText, Wrench, Globe } from 'lucide-react';

const resources = [
  // Documentation
  { title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/', category: 'Documentation', icon: '☸️', desc: 'Documentation officielle Kubernetes' },
  { title: 'Docker Docs', url: 'https://docs.docker.com/', category: 'Documentation', icon: '🐳', desc: 'Référence complète Docker' },
  { title: 'Terraform Registry', url: 'https://registry.terraform.io/', category: 'Documentation', icon: '🏗️', desc: 'Providers et modules Terraform' },
  { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', category: 'Documentation', icon: '☁️', desc: 'Docs de tous les services AWS' },
  { title: 'Red Hat Docs', url: 'https://access.redhat.com/documentation/', category: 'Documentation', icon: '🎩', desc: 'Documentation RHEL officielle' },
  { title: 'Ansible Docs', url: 'https://docs.ansible.com/', category: 'Documentation', icon: '⚙️', desc: 'Modules et playbooks Ansible' },
  { title: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/', category: 'Documentation', icon: '🐘', desc: 'Manuel PostgreSQL' },
  // Vidéos/Formations
  { title: 'TechWorld with Nana', url: 'https://www.youtube.com/@TechWorldwithNana', category: 'YouTube', icon: '🎬', desc: 'DevOps, K8s, Docker, CI/CD en vidéo' },
  { title: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck', category: 'YouTube', icon: '🎬', desc: 'Réseau, Linux, Hacking, Cloud' },
  { title: 'Fireship', url: 'https://www.youtube.com/@Fireship', category: 'YouTube', icon: '🎬', desc: 'Explications rapides (100 seconds of)' },
  { title: 'DevOps Toolkit', url: 'https://www.youtube.com/@DevOpsToolkit', category: 'YouTube', icon: '🎬', desc: 'GitOps, K8s, Platform Engineering' },
  { title: 'Xavki', url: 'https://www.youtube.com/@xabordes', category: 'YouTube', icon: '🇫🇷', desc: 'DevOps en français (Ansible, Docker, K8s)' },
  { title: 'Cocadmin', url: 'https://www.youtube.com/@cocadmin', category: 'YouTube', icon: '🇫🇷', desc: 'Sysadmin et DevOps en français' },
  // Outils
  { title: 'Play with Docker', url: 'https://labs.play-with-docker.com/', category: 'Playground', icon: '🧪', desc: 'Lab Docker gratuit 4h' },
  { title: 'Killercoda', url: 'https://killercoda.com/', category: 'Playground', icon: '🧪', desc: 'Labs K8s, Linux, Terraform gratuits' },
  { title: 'Google Cloud Shell', url: 'https://shell.cloud.google.com/', category: 'Playground', icon: '🧪', desc: 'Terminal Linux cloud gratuit' },
  { title: 'Katacoda (Archive)', url: 'https://www.katacoda.com/', category: 'Playground', icon: '🧪', desc: 'Anciens labs interactifs (certains encore actifs)' },
  // Certifications
  { title: 'CNCF Certifications', url: 'https://www.cncf.io/certification/', category: 'Certifications', icon: '🏆', desc: 'CKA, CKAD, CKS (Kubernetes)' },
  { title: 'AWS Certifications', url: 'https://aws.amazon.com/certification/', category: 'Certifications', icon: '🏆', desc: 'SAA, SAP, DevOps Professional' },
  { title: 'Red Hat Certifications', url: 'https://www.redhat.com/en/services/certifications', category: 'Certifications', icon: '🏆', desc: 'RHCSA, RHCE, OpenShift' },
  { title: 'HashiCorp Certifications', url: 'https://www.hashicorp.com/certifications', category: 'Certifications', icon: '🏆', desc: 'Terraform, Vault, Consul' },
  // Blogs
  { title: 'DevOps.com', url: 'https://devops.com/', category: 'Blog', icon: '📝', desc: 'News et articles DevOps' },
  { title: 'The New Stack', url: 'https://thenewstack.io/', category: 'Blog', icon: '📝', desc: 'Cloud-native, K8s, DevOps' },
  { title: 'Learnk8s', url: 'https://learnk8s.io/blog', category: 'Blog', icon: '📝', desc: 'Articles approfondis sur Kubernetes' },
  { title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', category: 'Blog', icon: '🗺️', desc: 'Roadmap interactive DevOps' },
  // Outils en ligne
  { title: 'Crontab Guru', url: 'https://crontab.guru/', category: 'Utilitaire', icon: '🔧', desc: 'Éditeur de cron expressions' },
  { title: 'Regex101', url: 'https://regex101.com/', category: 'Utilitaire', icon: '🔧', desc: 'Testeur de regex interactif' },
  { title: 'CIDR Calculator', url: 'https://www.ipaddressguide.com/cidr', category: 'Utilitaire', icon: '🔧', desc: 'Calculateur de sous-réseaux' },
  { title: 'YAML Validator', url: 'https://www.yamllint.com/', category: 'Utilitaire', icon: '🔧', desc: 'Validateur YAML en ligne' },
  { title: 'JSON Formatter', url: 'https://jsonformatter.curiousconcept.com/', category: 'Utilitaire', icon: '🔧', desc: 'Formatteur et validateur JSON' },
  { title: 'ExplainShell', url: 'https://explainshell.com/', category: 'Utilitaire', icon: '🔧', desc: 'Explique chaque partie d\'une commande' },
];

const categories = ['Tous', 'Documentation', 'YouTube', 'Playground', 'Certifications', 'Blog', 'Utilitaire'];

export default function ResourcesPage() {
  const [category, setCategory] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = resources.filter(r => {
    const matchCat = category === 'Tous' || r.category === category;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-badge"><Globe size={16} className="text-secondary-400" /> Ressources</span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Ressources <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {resources.length} liens essentiels : docs officielles, chaînes YouTube, playgrounds, certifications et outils en ligne.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === c ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} ressources</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="card-hover group flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold dark:text-white group-hover:text-primary-400 transition text-sm truncate">{r.title}</h3>
                  <ExternalLink size={12} className="text-gray-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                <span className="text-[10px] text-gray-600 mt-1 inline-block px-1.5 py-0.5 rounded bg-gray-800">{r.category}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
