'use client';

import { useState } from 'react';
import { ArrowLeftRight, Check, X, Minus } from 'lucide-react';

const comparisons = [
  {
    id: 'docker-podman',
    title: 'Docker vs Podman',
    category: 'Conteneurs',
    items: ['Docker', 'Podman'],
    criteria: [
      { label: 'Daemon requis', values: ['Oui (dockerd)', 'Non (daemonless)'] },
      { label: 'Rootless par défaut', values: ['Non', 'Oui'] },
      { label: 'Compatible OCI', values: ['✅', '✅'] },
      { label: 'Docker Compose', values: ['✅ Natif', '✅ podman-compose'] },
      { label: 'Pods natifs', values: ['❌', '✅'] },
      { label: 'Systemd integration', values: ['Partielle', '✅ Complète'] },
      { label: 'Kubernetes (CRI)', values: ['Via containerd', 'Via CRI-O'] },
      { label: 'Écosystème', values: ['Très large', 'Croissant'] },
      { label: 'License', values: ['Apache 2.0', 'Apache 2.0'] },
    ],
  },
  {
    id: 'terraform-pulumi',
    title: 'Terraform vs Pulumi',
    category: 'IaC',
    items: ['Terraform', 'Pulumi'],
    criteria: [
      { label: 'Langage', values: ['HCL (déclaratif)', 'Python/TS/Go/C#'] },
      { label: 'State management', values: ['Fichier/Cloud', 'Pulumi Cloud/S3'] },
      { label: 'Multi-cloud', values: ['✅', '✅'] },
      { label: 'Boucles/Conditions', values: ['Limité (count, for_each)', '✅ Natif'] },
      { label: 'Testing', values: ['terraform test', 'Unit tests natifs'] },
      { label: 'Courbe d\'apprentissage', values: ['Moyenne (HCL)', 'Faible si dev'] },
      { label: 'Communauté', values: ['Très large', 'Croissante'] },
      { label: 'Providers', values: ['3000+', '100+ (+ Terraform bridge)'] },
      { label: 'License', values: ['BSL 1.1', 'Apache 2.0'] },
    ],
  },

  {
    id: 'jenkins-github-actions',
    title: 'Jenkins vs GitHub Actions',
    category: 'CI/CD',
    items: ['Jenkins', 'GitHub Actions'],
    criteria: [
      { label: 'Hébergement', values: ['Self-hosted', 'Cloud (GitHub)'] },
      { label: 'Configuration', values: ['Jenkinsfile (Groovy)', 'YAML workflows'] },
      { label: 'Plugins', values: ['1800+ plugins', 'Actions Marketplace'] },
      { label: 'Scalabilité', values: ['Agents distribués', 'Runners auto-scalés'] },
      { label: 'Coût', values: ['Gratuit (infra à charge)', 'Gratuit (limites)'] },
      { label: 'Maintenance', values: ['Élevée', 'Aucune'] },
      { label: 'Intégration Git', values: ['Multi-SCM', 'GitHub uniquement'] },
      { label: 'Courbe', values: ['Complexe', 'Simple'] },
    ],
  },
  {
    id: 'prometheus-datadog',
    title: 'Prometheus vs Datadog',
    category: 'Monitoring',
    items: ['Prometheus', 'Datadog'],
    criteria: [
      { label: 'Modèle', values: ['Pull (scraping)', 'Push (agent)'] },
      { label: 'Hébergement', values: ['Self-hosted', 'SaaS'] },
      { label: 'Coût', values: ['Gratuit (open-source)', 'Payant (par host)'] },
      { label: 'Langage requêtes', values: ['PromQL', 'Propriétaire'] },
      { label: 'Alerting', values: ['Alertmanager', 'Intégré'] },
      { label: 'Dashboards', values: ['Via Grafana', 'Intégrés'] },
      { label: 'APM/Traces', values: ['Via Jaeger/Tempo', '✅ Intégré'] },
      { label: 'Logs', values: ['Via Loki', '✅ Intégré'] },
      { label: 'Scalabilité', values: ['Thanos/Cortex', 'Automatique'] },
    ],
  },
  {
    id: 'mysql-postgresql',
    title: 'MySQL vs PostgreSQL',
    category: 'Données',
    items: ['MySQL', 'PostgreSQL'],
    criteria: [
      { label: 'JSONB natif', values: ['JSON (limité)', '✅ JSONB (indexable)'] },
      { label: 'Full-Text Search', values: ['Basique', '✅ Avancé (tsvector)'] },
      { label: 'Réplication', values: ['GTID, Group Rep.', 'Streaming, Logical'] },
      { label: 'Extensions', values: ['Limitées', '✅ 100+ (PostGIS, etc)'] },
      { label: 'MVCC', values: ['Undo logs', '✅ Natif (versions)'] },
      { label: 'Performance lecture', values: ['✅ Très rapide', 'Rapide'] },
      { label: 'Conformité SQL', values: ['Partielle', '✅ Très complète'] },
      { label: 'Licence', values: ['GPL v2', 'PostgreSQL (MIT-like)'] },
      { label: 'Cloud managé', values: ['RDS, PlanetScale', 'RDS, Supabase, Neon'] },
    ],
  },
  {
    id: 'aws-azure-gcp',
    title: 'AWS vs Azure vs GCP',
    category: 'Cloud',
    items: ['AWS', 'Azure'],
    criteria: [
      { label: 'Part de marché', values: ['~32%', '~23%'] },
      { label: 'Kubernetes', values: ['EKS', 'AKS'] },
      { label: 'Serverless', values: ['Lambda', 'Azure Functions'] },
      { label: 'IaC natif', values: ['CloudFormation', 'ARM/Bicep'] },
      { label: 'CI/CD', values: ['CodePipeline', 'Azure DevOps'] },
      { label: 'Monitoring', values: ['CloudWatch', 'Azure Monitor'] },
      { label: 'Base de données', values: ['RDS, DynamoDB', 'Azure SQL, Cosmos DB'] },
      { label: 'Réseau mondial', values: ['25 régions', '60+ régions'] },
      { label: 'Certifications', values: ['SAA, SAP, DevOps', 'AZ-104, AZ-400'] },
    ],
  },
];

export default function ToolsComparePage() {
  const [selected, setSelected] = useState(comparisons[0].id);
  const current = comparisons.find(c => c.id === selected)!;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <ArrowLeftRight size={16} className="text-secondary-400" />
            Comparateur
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Comparer les <span className="gradient-text">Outils DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Comparez les technologies DevOps populaires pour choisir celle qui correspond à vos besoins.
          </p>
        </div>

        {/* Comparison selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {comparisons.map(comp => (
            <button
              key={comp.id}
              onClick={() => setSelected(comp.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selected === comp.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {comp.title}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="card overflow-hidden !p-0">
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-gray-700/50">
            <div className="p-4 flex items-center">
              <span className="text-xs text-gray-500 font-medium">CRITÈRE</span>
            </div>
            <div className="p-4 text-center border-l border-gray-700/50 bg-primary-500/5">
              <span className="font-bold text-primary-400">{current.items[0]}</span>
            </div>
            <div className="p-4 text-center border-l border-gray-700/50 bg-secondary-500/5">
              <span className="font-bold text-secondary-400">{current.items[1]}</span>
            </div>
          </div>

          {/* Data rows */}
          {current.criteria.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/20 transition-colors">
              <div className="p-4 text-sm text-gray-400 font-medium flex items-center">
                {row.label}
              </div>
              <div className="p-4 text-center border-l border-gray-800/30 text-sm">
                <CellValue value={row.values[0]} />
              </div>
              <div className="p-4 text-center border-l border-gray-800/30 text-sm">
                <CellValue value={row.values[1]} />
              </div>
            </div>
          ))}
        </div>

        {/* Category badge */}
        <div className="mt-6 text-center">
          <span className="px-3 py-1.5 rounded-full bg-gray-800 text-xs text-gray-400">
            Catégorie : {current.category}
          </span>
        </div>
      </div>
    </div>
  );
}

function CellValue({ value }: { value: string }) {
  if (value === '✅') return <Check size={18} className="mx-auto text-green-400" />;
  if (value === '❌') return <X size={18} className="mx-auto text-red-400" />;
  if (value === '-') return <Minus size={18} className="mx-auto text-gray-600" />;
  return <span className="text-gray-300">{value}</span>;
}
