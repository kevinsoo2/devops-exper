'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FlaskConical, Clock, Zap, Filter } from 'lucide-react';
import { labs as labsApi } from '@/lib/api';

const difficulties = ['Tous', 'facile', 'moyen', 'difficile'];
const difficultyLabels: Record<string, string> = {
  'Tous': 'Tous', 'facile': 'Débutant', 'moyen': 'Intermédiaire', 'difficile': 'Avancé'
};
const categories = ['Tous', 'conteneurisation', 'cicd', 'cloud', 'orchestration', 'securite', 'iac', 'monitoring', 'network', 'systeme', 'gitops', 'sre', 'donnees', 'virtualisation'];
const categoryLabels: Record<string, string> = {
  'Tous': 'Tous', 'conteneurisation': 'Conteneurs', 'cicd': 'CI/CD', 'cloud': 'Cloud',
  'orchestration': 'Orchestration', 'securite': 'Sécurité', 'iac': 'IaC', 'monitoring': 'Monitoring',
  'network': 'Réseau', 'systeme': 'Système', 'gitops': 'GitOps', 'sre': 'SRE', 'donnees': 'Données', 'virtualisation': 'Virtualisation'
};


const fallbackLabs = [
  { id: '1', title: 'Déployer une app multi-conteneurs avec Docker Compose', slug: 'docker-compose-deploy', difficulty: 'Débutant', duration: '30 min', xp: 150, category: 'Conteneurs', description: 'Apprenez à orchestrer plusieurs conteneurs avec Docker Compose.' },
  { id: '2', title: 'Setup Cluster Kubernetes avec kubeadm', slug: 'k8s-kubeadm-setup', difficulty: 'Intermédiaire', duration: '60 min', xp: 300, category: 'Orchestration', description: 'Mettez en place un cluster Kubernetes prêt pour la production.' },
  { id: '3', title: 'Pipeline CI/CD avec GitHub Actions', slug: 'github-actions-pipeline', difficulty: 'Débutant', duration: '45 min', xp: 200, category: 'CI/CD', description: 'Construisez un pipeline CI/CD complet avec tests et déploiement.' },
  { id: '4', title: 'Réseau Zero-Trust avec Istio', slug: 'istio-zero-trust', difficulty: 'Avancé', duration: '90 min', xp: 500, category: 'Sécurité', description: 'Implémentez la sécurité service mesh avec Istio.' },
  { id: '5', title: 'Infrastructure AWS avec Terraform', slug: 'terraform-aws', difficulty: 'Intermédiaire', duration: '45 min', xp: 250, category: 'IaC', description: 'Provisionnez une infrastructure AWS avec les modules Terraform.' },
  { id: '6', title: 'Setup Monitoring Prometheus', slug: 'prometheus-setup', difficulty: 'Intermédiaire', duration: '40 min', xp: 200, category: 'Monitoring', description: 'Mettez en place un monitoring complet avec Prometheus et Grafana.' },
  { id: '7', title: 'Déployer sur AWS ECS', slug: 'aws-ecs-deploy', difficulty: 'Intermédiaire', duration: '50 min', xp: 250, category: 'Cloud', description: 'Déployez des applications conteneurisées sur AWS ECS.' },
  { id: '8', title: 'Sécurité RBAC Kubernetes', slug: 'k8s-rbac', difficulty: 'Avancé', duration: '60 min', xp: 400, category: 'Sécurité', description: 'Implémentez le contrôle d\'accès basé sur les rôles dans Kubernetes.' },
];


export default function LabsPage() {
  const [labList, setLabList] = useState(fallbackLabs);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('Tous');
  const [category, setCategory] = useState('Tous');

  useEffect(() => {
    labsApi.list()
      .then((data) => { if (data && data.length > 0) setLabList(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = labList.filter((lab: any) => {
    const matchDiff = difficulty === 'Tous' || lab.difficulty === difficulty;
    const matchCat = category === 'Tous' || lab.category === category;
    return matchDiff && matchCat;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            Labs <span className="gradient-text">Pratiques</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Pratiquez les compétences DevOps dans de vrais environnements cloud avec des exercices guidés.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Filter size={14} className="text-gray-400" />
            {difficulties.map((d) => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{difficultyLabels[d] || d}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === c ? 'bg-secondary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{categoryLabels[c] || c}</button>
            ))}
          </div>
        </div>


        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{filtered.length} labs disponibles</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((lab) => (
                <Link key={lab.id} href={`/labs/${lab.slug}`} className="card-hover group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      lab.difficulty === 'facile' ? 'difficulty-easy' :
                      lab.difficulty === 'moyen' ? 'difficulty-medium' : 'difficulty-hard'
                    }`}>{difficultyLabels[lab.difficulty] || lab.difficulty}</span>
                    <span className="text-xs text-accent-400 font-medium">+{(lab as any).xp_reward || (lab as any).xp || 25} XP</span>
                    <span className="skill-tag text-xs">{lab.category}</span>
                  </div>
                  <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition-colors">{lab.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{lab.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {(lab as any).duration_minutes ? (lab as any).duration_minutes + ' min' : (lab as any).duration}</span>
                    <span className="flex items-center gap-1"><FlaskConical size={12} /> Pratique</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
