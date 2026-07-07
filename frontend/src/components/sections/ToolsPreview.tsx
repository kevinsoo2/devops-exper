'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, ExternalLink, ChevronRight } from 'lucide-react';

const categories = ['All', 'CI/CD', 'Containers', 'Cloud', 'Monitoring', 'IaC', 'Security'];

const toolsData = [
  {
    name: 'Docker',
    category: 'Containers',
    description: 'Build, share, and run containerized applications',
    icon: 'fa-brands fa-docker',
    color: 'text-blue-400',
    difficulty: 'Beginner',
  },
  {
    name: 'Kubernetes',
    category: 'Containers',
    description: 'Container orchestration for production workloads',
    icon: 'fa-solid fa-dharmachakra',
    color: 'text-blue-300',
    difficulty: 'Intermediate',
  },
  {
    name: 'Terraform',
    category: 'IaC',
    description: 'Infrastructure as Code for multi-cloud environments',
    icon: 'fa-solid fa-cube',
    color: 'text-purple-400',
    difficulty: 'Intermediate',
  },
  {
    name: 'Jenkins',
    category: 'CI/CD',
    description: 'Extensible open-source automation server',
    icon: 'fa-solid fa-gear',
    color: 'text-red-400',
    difficulty: 'Intermediate',
  },
  {
    name: 'Prometheus',
    category: 'Monitoring',
    description: 'Metrics and alerting for cloud-native apps',
    icon: 'fa-solid fa-fire',
    color: 'text-orange-400',
    difficulty: 'Intermediate',
  },
  {
    name: 'AWS',
    category: 'Cloud',
    description: 'Leading cloud platform with 200+ services',
    icon: 'fa-brands fa-aws',
    color: 'text-orange-300',
    difficulty: 'Beginner',
  },
  {
    name: 'GitHub Actions',
    category: 'CI/CD',
    description: 'CI/CD workflows directly in your repository',
    icon: 'fa-brands fa-github',
    color: 'text-gray-300',
    difficulty: 'Beginner',
  },
  {
    name: 'Vault',
    category: 'Security',
    description: 'Secrets management and data protection',
    icon: 'fa-solid fa-lock',
    color: 'text-yellow-400',
    difficulty: 'Advanced',
  },
];

export function ToolsPreview() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? toolsData : toolsData.filter((t) => t.category === filter);

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Wrench size={16} />
            DevOps Toolbox
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Master the <span className="gradient-text">Essential Tools</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            From containers to cloud platforms, learn the tools that power modern DevOps.
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
                  tool.difficulty === 'Beginner' ? 'difficulty-beginner' :
                  tool.difficulty === 'Intermediate' ? 'difficulty-intermediate' :
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
            Explore All Tools <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
