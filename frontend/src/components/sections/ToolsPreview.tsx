'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, ExternalLink, ChevronRight } from 'lucide-react';

const categories = ['Tous', 'CI/CD', 'Conteneurs', 'Cloud', 'Monitoring', 'IaC', 'Sécurité'];

const toolsData = [
  {
    name: 'Docker',
    category: 'Conteneurs',
    description: 'Construisez, partagez et exécutez des applications conteneurisées',
    icon: 'fa-brands fa-docker',
    color: 'text-blue-400',
    difficulty: 'Débutant',
  },
  {
    name: 'Kubernetes',
    category: 'Conteneurs',
    description: 'Orchestration de conteneurs pour les charges de travail en production',
    icon: 'fa-solid fa-dharmachakra',
    color: 'text-blue-300',
    difficulty: 'Intermédiaire',
  },
  {
    name: 'Terraform',
    category: 'IaC',
    description: 'Infrastructure as Code pour les environnements multi-cloud',
    icon: 'fa-solid fa-cube',
    color: 'text-purple-400',
    difficulty: 'Intermédiaire',
  },
  {
    name: 'Jenkins',
    category: 'CI/CD',
    description: 'Serveur d\'automatisation open-source extensible',
    icon: 'fa-solid fa-gear',
    color: 'text-red-400',
    difficulty: 'Intermédiaire',
  },
  {
    name: 'Prometheus',
    category: 'Monitoring',
    description: 'Métriques et alertes pour les applications cloud-native',
    icon: 'fa-solid fa-fire',
    color: 'text-orange-400',
    difficulty: 'Intermédiaire',
  },
  {
    name: 'AWS',
    category: 'Cloud',
    description: 'Plateforme cloud leader avec plus de 200 services',
    icon: 'fa-brands fa-aws',
    color: 'text-orange-300',
    difficulty: 'Débutant',
  },
  {
    name: 'GitHub Actions',
    category: 'CI/CD',
    description: 'Workflows CI/CD directement dans votre dépôt',
    icon: 'fa-brands fa-github',
    color: 'text-gray-300',
    difficulty: 'Débutant',
  },
  {
    name: 'Vault',
    category: 'Sécurité',
    description: 'Gestion des secrets et protection des données',
    icon: 'fa-solid fa-lock',
    color: 'text-yellow-400',
    difficulty: 'Avancé',
  },
];

export function ToolsPreview() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'Tous' ? toolsData : toolsData.filter((t) => t.category === filter);

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Wrench size={16} />
            Boîte à outils DevOps
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Maîtrisez les <span className="gradient-text">Outils Essentiels</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Des conteneurs aux plateformes cloud, apprenez les outils qui font tourner le DevOps moderne.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <div key={tool.name} className="card-hover group">
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
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  tool.difficulty === 'Débutant' ? 'difficulty-beginner' :
                  tool.difficulty === 'Intermédiaire' ? 'difficulty-intermediate' :
                  'difficulty-advanced'
                }`}>
                  {tool.difficulty}
                </span>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-primary-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/tools" className="btn-outline inline-flex items-center gap-2">
            Explorer tous les Outils <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
