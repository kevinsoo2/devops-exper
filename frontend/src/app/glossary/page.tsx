'use client';

import { useState } from 'react';
import { Search, BookOpen, Hash, ArrowUp } from 'lucide-react';

const glossaryTerms = [
  { term: 'API Gateway', definition: 'Point d\'entrée unique qui gère le routage, l\'authentification et le rate limiting pour les microservices.', category: 'Architecture' },
  { term: 'Ansible', definition: 'Outil d\'automatisation sans agent pour la gestion de configuration, le déploiement d\'applications et l\'orchestration.', category: 'IaC' },
  { term: 'ArgoCD', definition: 'Outil de livraison continue déclaratif basé sur GitOps pour Kubernetes.', category: 'CI/CD' },
  { term: 'Artifact', definition: 'Résultat d\'un build (binaire, image Docker, package) stocké dans un registry pour le déploiement.', category: 'CI/CD' },
  { term: 'Auto-scaling', definition: 'Ajustement automatique du nombre d\'instances en fonction de la charge (HPA en K8s, ASG sur AWS).', category: 'Cloud' },
  { term: 'Blue/Green Deployment', definition: 'Stratégie de déploiement avec deux environnements identiques pour un switch instantané sans downtime.', category: 'Déploiement' },
  { term: 'Canary Deployment', definition: 'Déploiement progressif : nouvelle version servie à un petit pourcentage d\'utilisateurs avant le rollout complet.', category: 'Déploiement' },
  { term: 'CDC (Change Data Capture)', definition: 'Technique de capture des changements dans une base de données pour les propager en temps réel (ex: Debezium).', category: 'Données' },
  { term: 'CI/CD', definition: 'Intégration Continue / Déploiement Continu. Automatisation du build, test et déploiement du code.', category: 'CI/CD' },
  { term: 'ConfigMap', definition: 'Objet Kubernetes pour stocker la configuration non-sensible sous forme de paires clé-valeur.', category: 'Kubernetes' },
  { term: 'Container', definition: 'Unité légère et isolée qui embarque une application et ses dépendances, utilisant les namespaces et cgroups Linux.', category: 'Conteneurs' },
  { term: 'Container Registry', definition: 'Dépôt pour stocker et distribuer des images de conteneurs (Docker Hub, ECR, GCR, Harbor).', category: 'Conteneurs' },
  { term: 'CQRS', definition: 'Command Query Responsibility Segregation : séparer les opérations de lecture et d\'écriture pour optimiser les performances.', category: 'Architecture' },
  { term: 'CRD (Custom Resource Definition)', definition: 'Extension de l\'API Kubernetes permettant de définir des ressources personnalisées.', category: 'Kubernetes' },
  { term: 'DaemonSet', definition: 'Objet K8s garantissant qu\'un Pod tourne sur chaque nœud du cluster (monitoring, logs, networking).', category: 'Kubernetes' },
  { term: 'Data Mesh', definition: 'Architecture décentralisée où chaque domaine est propriétaire de ses données, exposées comme des produits.', category: 'Données' },
  { term: 'Deployment', definition: 'Objet Kubernetes gérant le déploiement déclaratif de Pods avec rolling updates et rollbacks.', category: 'Kubernetes' },
  { term: 'Docker Compose', definition: 'Outil pour définir et exécuter des applications multi-conteneurs avec un fichier YAML.', category: 'Conteneurs' },
  { term: 'Dockerfile', definition: 'Fichier texte contenant les instructions pour construire une image Docker couche par couche.', category: 'Conteneurs' },
  { term: 'ELK Stack', definition: 'Elasticsearch, Logstash, Kibana : stack de logging centralisé pour collecter, indexer et visualiser les logs.', category: 'Monitoring' },
  { term: 'etcd', definition: 'Base de données clé-valeur distribuée utilisée par Kubernetes pour stocker l\'état du cluster.', category: 'Kubernetes' },
  { term: 'Event Sourcing', definition: 'Pattern où l\'état est dérivé d\'une séquence immuable d\'événements plutôt que de mises à jour directes.', category: 'Architecture' },
  { term: 'Feature Flag', definition: 'Technique permettant d\'activer/désactiver des fonctionnalités sans nouveau déploiement.', category: 'Déploiement' },
  { term: 'GitOps', definition: 'Pratique utilisant Git comme source de vérité pour la configuration de l\'infrastructure et des applications.', category: 'CI/CD' },
  { term: 'Grafana', definition: 'Plateforme de visualisation et d\'analytique pour les métriques, logs et traces.', category: 'Monitoring' },
  { term: 'Helm', definition: 'Gestionnaire de packages pour Kubernetes. Les Helm Charts sont des templates de ressources K8s.', category: 'Kubernetes' },
  { term: 'HPA (Horizontal Pod Autoscaler)', definition: 'Autoscaling horizontal dans K8s basé sur les métriques CPU/mémoire ou métriques custom.', category: 'Kubernetes' },
  { term: 'Idempotence', definition: 'Propriété d\'une opération qui produit le même résultat qu\'elle soit exécutée une ou plusieurs fois.', category: 'Architecture' },
  { term: 'IaC (Infrastructure as Code)', definition: 'Gestion de l\'infrastructure via du code versionné (Terraform, CloudFormation, Pulumi).', category: 'IaC' },
  { term: 'Immutable Infrastructure', definition: 'Approche où les serveurs ne sont jamais modifiés : on les remplace par de nouvelles instances.', category: 'Architecture' },
  { term: 'Ingress', definition: 'Ressource K8s gérant l\'accès HTTP/HTTPS externe vers les services du cluster (routing, TLS).', category: 'Kubernetes' },
  { term: 'Init Container', definition: 'Conteneur K8s exécuté avant les conteneurs principaux pour l\'initialisation (migrations, attente deps).', category: 'Kubernetes' },
  { term: 'Istio', definition: 'Service Mesh pour Kubernetes : gestion du trafic, sécurité (mTLS), et observabilité des microservices.', category: 'Réseau' },
  { term: 'Jenkinsfile', definition: 'Fichier définissant un pipeline Jenkins en code (Pipeline as Code).', category: 'CI/CD' },
  { term: 'Kafka', definition: 'Plateforme de streaming distribué pour le messaging haute performance et le traitement d\'événements.', category: 'Données' },
  { term: 'Kustomize', definition: 'Outil de personnalisation de configurations K8s sans templates, intégré à kubectl.', category: 'Kubernetes' },
  { term: 'Liveness Probe', definition: 'Vérification K8s pour détecter si un conteneur est bloqué et doit être redémarré.', category: 'Kubernetes' },
  { term: 'Load Balancer', definition: 'Répartiteur de charge distribuant le trafic entre plusieurs instances (L4/L7, ALB, NLB).', category: 'Réseau' },
  { term: 'Microservices', definition: 'Architecture où l\'application est découpée en services indépendants, chacun avec sa propre base de données.', category: 'Architecture' },
  { term: 'mTLS', definition: 'Mutual TLS : authentification bidirectionnelle entre client et serveur via certificats.', category: 'Sécurité' },
  { term: 'Namespace', definition: 'Isolation logique des ressources dans un cluster Kubernetes (multi-tenancy, environnements).', category: 'Kubernetes' },
  { term: 'Observabilité', definition: 'Capacité à comprendre l\'état interne d\'un système via les métriques, logs et traces (les 3 piliers).', category: 'Monitoring' },
  { term: 'OCI', definition: 'Open Container Initiative : standards pour les formats d\'images et les runtimes de conteneurs.', category: 'Conteneurs' },
  { term: 'Operator (K8s)', definition: 'Pattern K8s étendant l\'API pour automatiser la gestion d\'applications complexes (bases de données, etc).', category: 'Kubernetes' },
  { term: 'PersistentVolume', definition: 'Ressource K8s représentant un stockage persistant indépendant du cycle de vie des Pods.', category: 'Kubernetes' },
  { term: 'Pipeline', definition: 'Séquence automatisée d\'étapes (build, test, deploy) déclenchée par un changement de code.', category: 'CI/CD' },
  { term: 'Pod', definition: 'Plus petite unité déployable dans Kubernetes, contenant un ou plusieurs conteneurs partageant le réseau.', category: 'Kubernetes' },
  { term: 'Prometheus', definition: 'Système de monitoring et d\'alerting pull-based avec un langage de requêtes PromQL.', category: 'Monitoring' },
  { term: 'Readiness Probe', definition: 'Vérification K8s pour déterminer si un Pod est prêt à recevoir du trafic.', category: 'Kubernetes' },
  { term: 'Replica Set', definition: 'Contrôleur K8s garantissant qu\'un nombre spécifique de répliques de Pods sont en exécution.', category: 'Kubernetes' },
  { term: 'Rolling Update', definition: 'Mise à jour progressive des Pods un par un pour éviter les interruptions de service.', category: 'Déploiement' },
  { term: 'SLA/SLO/SLI', definition: 'Service Level Agreement/Objective/Indicator : métriques et engagements de fiabilité.', category: 'SRE' },
  { term: 'Secret', definition: 'Objet K8s pour stocker des données sensibles (mots de passe, tokens, clés) encodées en base64.', category: 'Kubernetes' },
  { term: 'Service Mesh', definition: 'Couche d\'infrastructure pour gérer la communication inter-services (Istio, Linkerd, Consul Connect).', category: 'Réseau' },
  { term: 'Sidecar', definition: 'Pattern K8s : conteneur auxiliaire déployé dans le même Pod pour ajouter des fonctionnalités (proxy, logs).', category: 'Kubernetes' },
  { term: 'SRE', definition: 'Site Reliability Engineering : discipline appliquant les pratiques logicielles à l\'exploitation (error budgets, SLOs).', category: 'SRE' },
  { term: 'StatefulSet', definition: 'Objet K8s pour les applications avec état : identité réseau stable, stockage persistant, déploiement ordonné.', category: 'Kubernetes' },
  { term: 'Terraform', definition: 'Outil IaC de HashiCorp utilisant HCL pour provisionner des ressources cloud de manière déclarative.', category: 'IaC' },
  { term: 'Toil', definition: 'En SRE : travail manuel, répétitif et automatisable qui n\'apporte pas de valeur durable.', category: 'SRE' },
  { term: 'Twelve-Factor App', definition: '12 principes pour construire des applications cloud-native (config, logs, processus, ports, etc).', category: 'Architecture' },
  { term: 'Vault', definition: 'Outil HashiCorp de gestion des secrets : rotation, chiffrement, contrôle d\'accès dynamique.', category: 'Sécurité' },
  { term: 'VPA (Vertical Pod Autoscaler)', definition: 'Autoscaling vertical dans K8s : ajustement automatique des ressources CPU/mémoire des Pods.', category: 'Kubernetes' },
  { term: 'WAF', definition: 'Web Application Firewall : protection contre les attaques web (injection SQL, XSS, DDoS L7).', category: 'Sécurité' },
  { term: 'Zero Trust', definition: 'Modèle de sécurité où rien n\'est implicitement fiable : vérification systématique de chaque accès.', category: 'Sécurité' },
];

const allCategories = Array.from(new Set(glossaryTerms.map(t => t.category))).sort();
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedLetter, setSelectedLetter] = useState('');

  const filtered = glossaryTerms.filter(t => {
    const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Tous' || t.category === selectedCategory;
    const matchLetter = !selectedLetter || t.term[0].toUpperCase() === selectedLetter;
    return matchSearch && matchCategory && matchLetter;
  });

  const grouped = filtered.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <BookOpen size={16} className="text-primary-400" />
            Glossaire
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Glossaire <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {glossaryTerms.length} termes essentiels du DevOps, de l&apos;infrastructure et du cloud expliqués simplement.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un terme..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedLetter(''); }}
            className="input-field pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button onClick={() => setSelectedCategory('Tous')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === 'Tous' ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            Tous
          </button>
          {allCategories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Alphabet Navigation */}
        <div className="flex flex-wrap justify-center gap-1 mb-8">
          {alphabet.map(letter => {
            const hasTerms = glossaryTerms.some(t => t.term[0].toUpperCase() === letter);
            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                disabled={!hasTerms}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  selectedLetter === letter ? 'bg-primary-500 text-white' :
                  hasTerms ? 'bg-gray-800 text-gray-300 hover:bg-primary-500/20 hover:text-primary-400' :
                  'bg-gray-900 text-gray-700 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">{filtered.length} terme{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>

        {/* Terms grouped by letter */}
        <div className="space-y-8">
          {Object.keys(grouped).sort().map(letter => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                  {letter}
                </div>
                <div className="flex-1 h-px bg-gray-800" />
                <span className="text-xs text-gray-600">{grouped[letter].length}</span>
              </div>
              <div className="grid gap-3">
                {grouped[letter].map(term => (
                  <div key={term.term} className="card !p-4 hover:border-primary-500/30 transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">{term.term}</h3>
                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">{term.definition}</p>
                      </div>
                      <span className="px-2 py-1 rounded-lg bg-gray-800 text-[10px] text-gray-500 font-medium whitespace-nowrap flex-shrink-0">
                        {term.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Hash size={40} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500">Aucun terme trouvé pour cette recherche.</p>
          </div>
        )}

        {/* Back to top */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:scale-110 transition-all"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
