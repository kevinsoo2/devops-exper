'use client';

import { useState, useEffect } from 'react';
import { Wrench, ExternalLink, Search, X, BookOpen, Terminal, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { tools as toolsApi } from '@/lib/api';

const categories = ['Tous', 'CI/CD', 'Conteneurs', 'Cloud', 'Monitoring', 'IaC', 'Sécurité', 'Contrôle de Version'];

// Tool details data
const toolDetails: Record<string, { description: string; commands: { cmd: string; desc: string }[]; useCases: string[]; relatedCourse?: string }> = {
  'Docker': {
    description: 'Docker est la plateforme de conteneurisation la plus populaire. Elle permet de packager une application avec toutes ses dépendances dans un conteneur léger et portable.',
    commands: [
      { cmd: 'docker run -d -p 80:80 nginx', desc: 'Lancer un conteneur Nginx' },
      { cmd: 'docker build -t myapp:v1 .', desc: 'Construire une image' },
      { cmd: 'docker compose up -d', desc: 'Démarrer les services' },
      { cmd: 'docker logs -f container', desc: 'Suivre les logs' },
      { cmd: 'docker exec -it container bash', desc: 'Shell dans un conteneur' },
    ],
    useCases: ['Développement local unifié', 'Microservices', 'CI/CD pipelines', 'Environnements reproductibles'],
    relatedCourse: 'maitriser-docker',
  },
  'Kubernetes': {
    description: 'Kubernetes (K8s) est un orchestrateur de conteneurs open-source pour automatiser le déploiement, le scaling et la gestion des applications conteneurisées.',
    commands: [
      { cmd: 'kubectl get pods -A', desc: 'Lister tous les Pods' },
      { cmd: 'kubectl apply -f manifest.yaml', desc: 'Appliquer un manifeste' },
      { cmd: 'kubectl describe pod <name>', desc: 'Détails d\'un Pod' },
      { cmd: 'kubectl logs -f <pod>', desc: 'Logs en temps réel' },
      { cmd: 'kubectl rollout restart deploy/<name>', desc: 'Redémarrer un déploiement' },
    ],
    useCases: ['Production à grande échelle', 'Auto-scaling', 'Self-healing', 'Déploiements Blue/Green'],
    relatedCourse: 'kubernetes-production',
  },
  'Terraform': {
    description: 'Terraform est un outil d\'Infrastructure as Code (IaC) par HashiCorp. Il permet de provisionner et gérer des ressources cloud de manière déclarative avec le langage HCL.',
    commands: [
      { cmd: 'terraform init', desc: 'Initialiser le projet' },
      { cmd: 'terraform plan', desc: 'Prévisualiser les changements' },
      { cmd: 'terraform apply', desc: 'Appliquer les changements' },
      { cmd: 'terraform destroy', desc: 'Détruire l\'infrastructure' },
      { cmd: 'terraform state list', desc: 'Voir les ressources gérées' },
    ],
    useCases: ['Multi-cloud', 'Infra reproductible', 'GitOps', 'Modules réutilisables'],
    relatedCourse: 'terraform-iac',
  },
  'Ansible': {
    description: 'Ansible est un outil d\'automatisation sans agent pour la gestion de configuration, le déploiement d\'applications et l\'orchestration de tâches IT.',
    commands: [
      { cmd: 'ansible-playbook site.yml', desc: 'Exécuter un playbook' },
      { cmd: 'ansible all -m ping', desc: 'Tester la connectivité' },
      { cmd: 'ansible-galaxy install role', desc: 'Installer un rôle' },
      { cmd: 'ansible-vault encrypt file', desc: 'Chiffrer un fichier' },
      { cmd: 'ansible-lint playbook.yml', desc: 'Vérifier la syntaxe' },
    ],
    useCases: ['Configuration serveurs', 'Déploiement applicatif', 'Patching', 'Orchestration multi-serveurs'],
  },
  'Prometheus': {
    description: 'Prometheus est un système de monitoring et d\'alerting open-source, conçu pour les environnements cloud-native avec un modèle de données time-series et le langage PromQL.',
    commands: [
      { cmd: 'promtool check config prometheus.yml', desc: 'Valider la config' },
      { cmd: 'rate(http_requests_total[5m])', desc: 'Requête PromQL (taux)' },
      { cmd: 'histogram_quantile(0.95, ...)', desc: 'P95 latence' },
      { cmd: 'up == 0', desc: 'Targets down' },
    ],
    useCases: ['Métriques applicatives', 'Alerting', 'Service discovery', 'Kubernetes monitoring'],
    relatedCourse: 'monitoring-prometheus-grafana',
  },
  'Jenkins': {
    description: 'Jenkins est un serveur d\'automatisation open-source extensible avec plus de 1800 plugins pour construire, tester et déployer du code.',
    commands: [
      { cmd: 'pipeline { stages { ... } }', desc: 'Jenkinsfile déclaratif' },
      { cmd: 'jenkins-cli.jar build job', desc: 'Lancer un job CLI' },
      { cmd: 'withCredentials([...]) { }', desc: 'Utiliser des secrets' },
    ],
    useCases: ['Pipelines CI/CD complexes', 'Builds distribués', 'Intégration multi-outils', 'Orchestration'],
    relatedCourse: 'jenkins-pipeline-administration',
  },
  'Git': {
    description: 'Git est un système de contrôle de version distribué permettant de suivre les modifications du code source et de collaborer efficacement.',
    commands: [
      { cmd: 'git clone <repo>', desc: 'Cloner un dépôt' },
      { cmd: 'git checkout -b feature', desc: 'Nouvelle branche' },
      { cmd: 'git rebase -i HEAD~3', desc: 'Rebase interactif' },
      { cmd: 'git stash && git stash pop', desc: 'Sauvegarder temporaire' },
      { cmd: 'git log --oneline --graph', desc: 'Historique graphique' },
    ],
    useCases: ['Collaboration', 'Branching strategies', 'Code review', 'GitOps'],
    relatedCourse: 'git-avance-workflows',
  },
  'AWS': {
    description: 'Amazon Web Services est la plateforme cloud la plus utilisée avec 200+ services couvrant le compute, le stockage, les bases de données, le networking et plus.',
    commands: [
      { cmd: 'aws ec2 describe-instances', desc: 'Lister les instances' },
      { cmd: 'aws s3 sync ./build s3://bucket', desc: 'Sync vers S3' },
      { cmd: 'aws ecs update-service --force', desc: 'Redéployer un service ECS' },
      { cmd: 'aws cloudformation deploy', desc: 'Déployer un stack' },
    ],
    useCases: ['Hébergement web', 'Big Data', 'Machine Learning', 'Serverless'],
    relatedCourse: 'cloud-aws-devops',
  },
  'Grafana': {
    description: 'Grafana est une plateforme de visualisation et d\'analytique open-source pour créer des dashboards interactifs à partir de multiples sources de données.',
    commands: [
      { cmd: 'grafana-cli plugins install', desc: 'Installer un plugin' },
      { cmd: 'grafana-cli admin reset-admin-password', desc: 'Reset password' },
    ],
    useCases: ['Dashboards métriques', 'Alerting', 'Logs visualization', 'SLO tracking'],
    relatedCourse: 'monitoring-prometheus-grafana',
  },
};



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
  const [selectedTool, setSelectedTool] = useState<any>(null);

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
              <div key={tool.id} className="card-hover group cursor-pointer" onClick={() => setSelectedTool(tool)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <i className={`${tool.icon} ${tool.color} text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white group-hover:text-primary-400 transition-colors">{tool.name}</h3>
                    <span className="text-xs text-gray-500">{tool.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <a href={tool.website} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300">
                    Visiter le site <ExternalLink size={12} />
                  </a>
                  <span className="text-xs text-gray-600 group-hover:text-primary-400 transition-colors">Voir détails →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tool Detail Modal */}
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTool(null)}>
            <div className="card max-w-2xl w-full max-h-[85vh] overflow-y-auto !p-0" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="sticky top-0 bg-dark-card border-b border-gray-700/50 p-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center">
                    <i className={`${selectedTool.icon} ${selectedTool.color} text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedTool.name}</h2>
                    <span className="text-xs text-gray-500">{selectedTool.category}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedTool(null)} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Description */}
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {toolDetails[selectedTool.name]?.description || selectedTool.description}
                  </p>
                </div>

                {/* Commands */}
                {toolDetails[selectedTool.name]?.commands && (
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Terminal size={16} className="text-green-400" /> Commandes essentielles
                    </h3>
                    <div className="space-y-2">
                      {toolDetails[selectedTool.name].commands.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-900/50 border border-gray-800/50">
                          <code className="text-xs font-mono text-green-400 flex-1 break-all">{c.cmd}</code>
                          <span className="text-[10px] text-gray-500 flex-shrink-0 max-w-[120px] text-right">{c.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {toolDetails[selectedTool.name]?.useCases && (
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Wrench size={16} className="text-primary-400" /> Cas d&apos;usage
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {toolDetails[selectedTool.name].useCases.map((uc, i) => (
                        <span key={i} className="skill-tag">{uc}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-800">
                  <a href={selectedTool.website} target="_blank" rel="noopener noreferrer"
                    className="btn-outline text-sm !px-4 !py-2 flex items-center gap-2">
                    <Globe size={14} /> Site officiel
                  </a>
                  {toolDetails[selectedTool.name]?.relatedCourse && (
                    <Link href={`/courses/${toolDetails[selectedTool.name].relatedCourse}`}
                      className="btn-primary text-sm !px-4 !py-2 flex items-center gap-2">
                      <BookOpen size={14} /> Voir la formation
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
