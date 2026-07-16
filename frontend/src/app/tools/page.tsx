'use client';

import { useState, useEffect } from 'react';
import { Wrench, ExternalLink, Search } from 'lucide-react';
import { tools as toolsApi } from '@/lib/api';

const categories = ['Tous', 'CI/CD', 'Conteneurs', 'Cloud', 'Monitoring', 'IaC', 'Sécurité', 'Contrôle de Version'];


const fallbackTools = [
  { id: '1', name: 'Docker', slug: 'docker', category: 'Conteneurs', description: 'Construisez, partagez et exécutez des applications conteneurisées.', icon: 'fa-brands fa-docker', color: 'text-blue-400', website: 'https://docker.com' },
  { id: '2', name: 'Kubernetes', slug: 'kubernetes', category: 'Conteneurs', description: 'Orchestration de conteneurs pour automatiser le déploiement et la scalabilité.', icon: 'fa-solid fa-dharmachakra', color: 'text-blue-300', website: 'https://kubernetes.io' },
  { id: '3', name: 'Terraform', slug: 'terraform', category: 'IaC', description: 'Infrastructure as Code pour provisionner des ressources cloud.', icon: 'fa-solid fa-cube', color: 'text-purple-400', website: 'https://terraform.io' },
  { id: '4', name: 'Jenkins', slug: 'jenkins', category: 'CI/CD', description: 'Serveur d\'automatisation open-source pour les pipelines CI/CD.', icon: 'fa-solid fa-gear', color: 'text-red-400', website: 'https://jenkins.io' },
  { id: '5', name: 'Prometheus', slug: 'prometheus', category: 'Monitoring', description: 'Collecte de métriques et alertes pour les applications cloud-native.', icon: 'fa-solid fa-fire', color: 'text-orange-400', website: 'https://prometheus.io' },
  { id: '6', name: 'AWS', slug: 'aws', category: 'Cloud', description: 'Plateforme cloud leader avec plus de 200 services.', icon: 'fa-brands fa-aws', color: 'text-orange-300', website: 'https://aws.amazon.com' },
  { id: '7', name: 'GitHub Actions', slug: 'github-actions', category: 'CI/CD', description: 'Automatisez les workflows directement dans votre dépôt GitHub.', icon: 'fa-brands fa-github', color: 'text-gray-300', website: 'https://github.com/features/actions' },
  { id: '8', name: 'Vault', slug: 'vault', category: 'Sécurité', description: 'Gestion des secrets et chiffrement en tant que service.', icon: 'fa-solid fa-lock', color: 'text-yellow-400', website: 'https://vaultproject.io' },
  { id: '9', name: 'Ansible', slug: 'ansible', category: 'IaC', description: 'Automatisation sans agent pour la gestion de configuration.', icon: 'fa-solid fa-terminal', color: 'text-red-300', website: 'https://ansible.com' },
  { id: '10', name: 'Grafana', slug: 'grafana', category: 'Monitoring', description: 'Visualisation et analytique pour les tableaux de bord de métriques.', icon: 'fa-solid fa-chart-line', color: 'text-orange-500', website: 'https://grafana.com' },
  { id: '11', name: 'Git', slug: 'git', category: 'Contrôle de Version', description: 'Système de contrôle de version distribué pour le code source.', icon: 'fa-brands fa-git-alt', color: 'text-orange-400', website: 'https://git-scm.com' },
  { id: '12', name: 'ArgoCD', slug: 'argocd', category: 'CI/CD', description: 'Livraison continue déclarative GitOps pour Kubernetes.', icon: 'fa-solid fa-rotate', color: 'text-blue-400', website: 'https://argoproj.github.io/cd' },
];

export default function ToolsPage() {
  const [toolList, setToolList] = useState(fallbackTools);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    toolsApi.list()
      .then((data) => { if (data && data.length > 0) setToolList(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = toolList.filter((tool) => {
    const matchCat = category === 'Tous' || tool.category === category;
    const matchSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            Boîte à outils <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explorez les outils essentiels que tout ingénieur DevOps doit connaître.
          </p>
          <a href="/tools/compare" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-all">
            <span>⚖️</span> Comparer les outils entre eux
          </a>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher des outils..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{cat}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <div key={tool.id} className="card-hover group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <i className={`${tool.icon} ${tool.color} text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">{tool.name}</h3>
                    <span className="text-xs text-gray-500">{tool.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
                <a href={tool.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300">
                  Visiter le site <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
