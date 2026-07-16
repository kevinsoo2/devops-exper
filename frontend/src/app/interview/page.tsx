'use client';

import { useState } from 'react';
import { MessageSquare, ChevronDown, Search, Filter, Award, Lightbulb, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const interviewQuestions = [
  // Docker
  { id: 1, question: "Quelle est la différence entre une image Docker et un conteneur ?", answer: "Une **image** est un template immuable (lecture seule) contenant le code, les dépendances et la configuration. Un **conteneur** est une instance en cours d'exécution d'une image — c'est un processus isolé avec son propre filesystem, réseau et PID namespace.\n\nAnalogie : l'image est la classe, le conteneur est l'objet instancié.", category: "Docker", difficulty: "facile" },
  { id: 2, question: "Qu'est-ce qu'un multi-stage build et pourquoi l'utiliser ?", answer: "Un **multi-stage build** utilise plusieurs instructions `FROM` dans un Dockerfile. Chaque stage peut utiliser une image de base différente. On copie uniquement les artefacts nécessaires du stage de build vers le stage final.\n\n**Avantages :**\n- Réduction drastique de la taille de l'image (souvent 80%+)\n- Séparation build/runtime\n- Pas d'outils de compilation dans l'image finale\n\n```dockerfile\n# Stage 1: Build\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\n# Stage 2: Runtime\nFROM node:18-alpine\nCOPY --from=builder /app/dist ./dist\nCMD [\"node\", \"dist/index.js\"]\n```", category: "Docker", difficulty: "moyen" },
  { id: 3, question: "Comment fonctionne le networking Docker ?", answer: "Docker propose plusieurs drivers réseau :\n\n- **bridge** (défaut) : réseau privé interne, NAT vers l'hôte\n- **host** : partage le réseau de l'hôte (pas d'isolation)\n- **overlay** : réseau multi-hôte pour Docker Swarm/K8s\n- **none** : pas de réseau\n- **macvlan** : adresse MAC dédiée, apparaît comme device physique\n\nLes conteneurs sur le même bridge communiquent via DNS interne (nom du conteneur = hostname).", category: "Docker", difficulty: "moyen" },
  // Kubernetes
  { id: 4, question: "Expliquez le rôle de chaque composant du Control Plane Kubernetes.", answer: "Le **Control Plane** gère l'état du cluster :\n\n- **kube-apiserver** : point d'entrée de l'API REST, authentification, validation\n- **etcd** : base de données clé-valeur distribuée stockant l'état du cluster\n- **kube-scheduler** : assigne les Pods aux nœuds selon les contraintes (resources, affinités)\n- **kube-controller-manager** : boucles de contrôle (ReplicaSet, Node, Endpoint controllers)\n- **cloud-controller-manager** : intégration avec le cloud provider (Load Balancers, Volumes)\n\nSur les **Worker Nodes** :\n- **kubelet** : agent qui exécute les Pods\n- **kube-proxy** : gestion du réseau (iptables/IPVS)\n- **Container Runtime** : containerd, CRI-O", category: "Kubernetes", difficulty: "moyen" },
  { id: 5, question: "Quelle est la différence entre un Deployment, un StatefulSet et un DaemonSet ?", answer: "- **Deployment** : applications sans état (stateless). Rolling updates, scaling horizontal, Pods interchangeables.\n\n- **StatefulSet** : applications avec état (databases). Identité réseau stable (`pod-0`, `pod-1`), stockage persistant par Pod, déploiement/suppression ordonnés.\n\n- **DaemonSet** : un Pod par nœud. Utilisé pour les agents (monitoring, logs, CNI). Automatiquement déployé sur les nouveaux nœuds.\n\n**Cas d'usage :**\n- Deployment → API, frontend, microservices\n- StatefulSet → PostgreSQL, MongoDB, Kafka\n- DaemonSet → Fluentd, Prometheus node-exporter, Calico", category: "Kubernetes", difficulty: "moyen" },
  { id: 6, question: "Comment gérer les secrets dans Kubernetes en production ?", answer: "Les Secrets K8s natifs sont encodés en base64 (PAS chiffrés par défaut) !\n\n**Solutions production :**\n1. **Encryption at rest** : activer `EncryptionConfiguration` dans l'API server\n2. **External Secrets Operator** : synchronise depuis Vault, AWS Secrets Manager, etc.\n3. **HashiCorp Vault** : injection via sidecar ou CSI driver\n4. **Sealed Secrets** (Bitnami) : chiffrement asymétrique, safe pour Git\n5. **SOPS + Age/KMS** : chiffrement des fichiers YAML\n\n**Bonnes pratiques :**\n- RBAC strict sur les secrets\n- Rotation automatique\n- Audit logging activé\n- Ne JAMAIS commiter de secrets en clair", category: "Kubernetes", difficulty: "difficile" },
  // CI/CD
  { id: 7, question: "Quelle est la différence entre Continuous Integration, Delivery et Deployment ?", answer: "- **Continuous Integration (CI)** : chaque commit déclenche un build + tests automatiques. Détecte les régressions rapidement.\n\n- **Continuous Delivery (CD)** : le code est TOUJOURS dans un état déployable. Le déploiement en production nécessite une approbation manuelle.\n\n- **Continuous Deployment** : TOUT commit qui passe les tests est automatiquement déployé en production. Aucune intervention humaine.\n\n```\nCI → Build + Test automatique\nContinuous Delivery → CI + Deploy auto en staging + Approval pour prod\nContinuous Deployment → CI + Deploy auto en prod\n```", category: "CI/CD", difficulty: "facile" },
  { id: 8, question: "Comment implémenter un pipeline Blue/Green deployment ?", answer: "Le **Blue/Green deployment** maintient deux environnements identiques :\n\n1. **Blue** = version actuelle en production\n2. **Green** = nouvelle version déployée et testée\n3. Le switch se fait au niveau du **Load Balancer** ou DNS\n4. Rollback instantané = revenir vers Blue\n\n**Étapes du pipeline :**\n1. Deploy sur Green\n2. Tests smoke/sanity sur Green\n3. Switch du trafic (LB target group)\n4. Monitoring pendant X minutes\n5. Si OK → Green devient le nouveau Blue\n6. Si KO → Rollback (switch vers ancien Blue)\n\n**Avantages :** zero-downtime, rollback instantané\n**Inconvénients :** coût double d'infrastructure", category: "CI/CD", difficulty: "difficile" },
  // Terraform/IaC
  { id: 9, question: "Qu'est-ce que le Terraform State et comment le gérer en équipe ?", answer: "Le **state** est un fichier JSON qui mappe les ressources Terraform aux ressources réelles dans le cloud. Il contient les métadonnées, dépendances et attributs.\n\n**Problèmes du state local :**\n- Pas de partage en équipe\n- Risque de corruption\n- Pas de locking (conflits)\n\n**Solutions :**\n1. **Remote Backend** (S3 + DynamoDB, GCS, Azure Blob)\n2. **State Locking** : empêche les modifications concurrentes\n3. **Terraform Cloud/Enterprise** : gestion centralisée\n\n```hcl\nterraform {\n  backend \"s3\" {\n    bucket         = \"my-tf-state\"\n    key            = \"prod/terraform.tfstate\"\n    region         = \"eu-west-1\"\n    dynamodb_table = \"tf-locks\"\n    encrypt        = true\n  }\n}\n```", category: "Terraform", difficulty: "moyen" },
  { id: 10, question: "Expliquez la différence entre `terraform plan` et `terraform apply`.", answer: "- **`terraform plan`** : lecture seule. Compare le state actuel avec la configuration souhaitée et affiche les changements à effectuer (create, update, destroy). Ne modifie RIEN.\n\n- **`terraform apply`** : exécute les changements. Par défaut, affiche le plan et demande confirmation.\n\n**Bonnes pratiques CI/CD :**\n```bash\n# 1. Sauvegarder le plan\nterraform plan -out=tfplan\n\n# 2. Review du plan (PR)\n# 3. Appliquer exactement ce plan\nterraform apply tfplan\n```\n\nCela garantit que ce qui est appliqué est exactement ce qui a été reviewé (pas de drift entre plan et apply).", category: "Terraform", difficulty: "facile" },
  // Monitoring
  { id: 11, question: "Expliquez les 3 piliers de l'observabilité.", answer: "Les **3 piliers** de l'observabilité :\n\n1. **Métriques** (Prometheus, Datadog)\n   - Valeurs numériques agrégées dans le temps\n   - Compteurs, gauges, histogrammes\n   - Ex: CPU usage, request rate, error count\n\n2. **Logs** (ELK, Loki, CloudWatch Logs)\n   - Événements textuels horodatés\n   - Debug, info, error, fatal\n   - Contexte détaillé d'un événement\n\n3. **Traces** (Jaeger, Zipkin, OpenTelemetry)\n   - Suivi d'une requête à travers les services\n   - Spans imbriqués avec timing\n   - Identification des bottlenecks\n\n**Corrélation** : lier les 3 via un `trace_id` commun permet de passer d'une alerte métrique → aux logs → à la trace de la requête problématique.", category: "Monitoring", difficulty: "moyen" },
  // Linux/Réseau
  { id: 12, question: "Quelles commandes utilisez-vous pour diagnostiquer un problème réseau ?", answer: "Diagnostic **couche par couche** (modèle OSI) :\n\n**Couche 1-2 (Physique/Liaison) :**\n```bash\nip link show          # État des interfaces\nethtool eth0          # Stats physiques\n```\n\n**Couche 3 (Réseau) :**\n```bash\nip addr show          # Adresses IP\nping 8.8.8.8          # Connectivité\ntraceroute google.com # Chemin réseau\nip route show         # Table de routage\n```\n\n**Couche 4 (Transport) :**\n```bash\nss -tlnp              # Ports en écoute\nnc -zv host 443       # Test de connexion\ntcpdump -i eth0       # Capture de paquets\n```\n\n**Couche 7 (Application) :**\n```bash\ncurl -vI https://api  # HTTP debug\ndig +short domain.com # Résolution DNS\nnslookup domain.com   # DNS lookup\n```", category: "Linux", difficulty: "moyen" },
  // SRE
  { id: 13, question: "Qu'est-ce qu'un Error Budget et comment l'utiliser ?", answer: "L'**Error Budget** est la quantité d'erreurs \"acceptable\" avant de violer un SLO.\n\n**Calcul :**\n- SLO = 99.9% disponibilité\n- Error Budget = 100% - 99.9% = 0.1%\n- Sur 30 jours = 43.2 minutes de downtime autorisées\n\n**Utilisation :**\n- Budget restant > 50% → on peut prendre des risques (déployer, expérimenter)\n- Budget restant < 20% → ralentir les releases, focus stabilité\n- Budget épuisé → STOP releases, toute l'équipe sur la fiabilité\n\n**Avantages :**\n- Aligne développeurs et ops sur un objectif commun\n- Quantifie le compromis vitesse/fiabilité\n- Donne une raison objective de dire \"non\" à de nouvelles features", category: "SRE", difficulty: "difficile" },
  // Sécurité
  { id: 14, question: "Comment sécuriser un pipeline CI/CD ?", answer: "**Supply Chain Security :**\n1. Scanner les images avec **Trivy/Snyk** (CVE)\n2. Signer les images avec **Cosign/Notary**\n3. Générer un **SBOM** (Software Bill of Materials)\n4. Vérifier l'intégrité avec **SLSA framework**\n\n**Pipeline Security :**\n1. **Secrets** : utiliser un vault, JAMAIS en clair dans le code\n2. **RBAC** : principe du moindre privilège\n3. **Isolation** : runners éphémères, pas de secrets en cache\n4. **SAST/DAST** : analyse statique et dynamique du code\n5. **Dependency scanning** : Dependabot, Renovate\n\n**Best practices :**\n- Pin des versions (pas de `latest`)\n- Branch protection rules\n- Audit trail de tous les déploiements\n- Séparation des environnements\n- MFA sur les comptes CI/CD", category: "Sécurité", difficulty: "difficile" },
  // Cloud
  { id: 15, question: "Expliquez la différence entre IaaS, PaaS et SaaS avec des exemples.", answer: "**IaaS** (Infrastructure as a Service) :\n- Vous gérez : OS, runtime, apps, data\n- Le cloud gère : serveurs, stockage, réseau\n- Ex: AWS EC2, Azure VMs, GCP Compute Engine\n\n**PaaS** (Platform as a Service) :\n- Vous gérez : apps et data\n- Le cloud gère : OS, runtime, middleware, infra\n- Ex: Heroku, Google App Engine, Azure App Service\n\n**SaaS** (Software as a Service) :\n- Vous gérez : rien (juste utiliser)\n- Le cloud gère : tout\n- Ex: Gmail, Slack, Salesforce\n\n**Analogie pizza :**\n- IaaS = acheter les ingrédients\n- PaaS = pizza à cuire\n- SaaS = pizza livrée", category: "Cloud", difficulty: "facile" },
  { id: 16, question: "Comment fonctionne un Load Balancer L4 vs L7 ?", answer: "**L4 (Transport Layer) :**\n- Opère sur TCP/UDP\n- Routing basé sur IP source/dest et port\n- Très rapide, peu de latence\n- Ne comprend pas le contenu HTTP\n- Ex: AWS NLB, HAProxy mode TCP\n\n**L7 (Application Layer) :**\n- Opère sur HTTP/HTTPS\n- Routing basé sur URL path, headers, cookies\n- Peut faire de la terminaison SSL, compression\n- Plus de fonctionnalités mais plus de latence\n- Ex: AWS ALB, Nginx, Envoy, Traefik\n\n**Cas d'usage :**\n- L4 : bases de données, gRPC, gaming, TCP pur\n- L7 : APIs REST, microservices, routing par path (/api → backend, / → frontend)", category: "Réseau", difficulty: "moyen" },
];

const categories = ['Tous', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring', 'Linux', 'SRE', 'Sécurité', 'Cloud', 'Réseau'];
const difficulties = ['Tous', 'facile', 'moyen', 'difficile'];
const difficultyLabels: Record<string, string> = { 'facile': 'Facile', 'moyen': 'Moyen', 'difficile': 'Difficile' };
const difficultyColors: Record<string, string> = { 'facile': 'text-green-400 bg-green-500/10 border-green-500/30', 'moyen': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30', 'difficile': 'text-red-400 bg-red-500/10 border-red-500/30' };

export default function InterviewPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  const [difficulty, setDifficulty] = useState('Tous');
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = interviewQuestions.filter(q => {
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase()) || q.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Tous' || q.category === category;
    const matchDiff = difficulty === 'Tous' || q.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <Award size={16} className="text-accent-400" />
            Préparation Entretiens
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Questions d&apos;Entretien <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {interviewQuestions.length} questions fréquentes en entretien DevOps/SRE avec des réponses détaillées et des exemples concrets.
          </p>
        </div>

        {/* Tips */}
        <div className="card mb-8 border-primary-500/20 bg-primary-500/5">
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Conseils pour l&apos;entretien</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Structurez vos réponses : contexte → explication → exemple concret</li>
                <li>• Mentionnez votre expérience personnelle avec les outils</li>
                <li>• N&apos;hésitez pas à dire &quot;je ne sais pas&quot; plutôt que d&apos;inventer</li>
                <li>• Préparez des questions à poser à l&apos;intervieweur sur leur stack</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher une question..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === cat ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-500" />
            {difficulties.map(d => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${difficulty === d ? 'bg-secondary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {d === 'Tous' ? 'Tous niveaux' : difficultyLabels[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-4">{filtered.length} question{filtered.length > 1 ? 's' : ''}</p>

        {/* Questions */}
        <div className="space-y-3">
          {filtered.map((q) => (
            <div key={q.id} className={`card !p-0 overflow-hidden transition-all ${openId === q.id ? 'border-primary-500/30 shadow-lg shadow-primary-500/5' : ''}`}>
              <button
                onClick={() => setOpenId(openId === q.id ? null : q.id)}
                className="w-full flex items-start gap-3 p-5 text-left hover:bg-gray-800/30 transition-colors"
              >
                <MessageSquare size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-white text-sm pr-4">{q.question}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-400">{q.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${difficultyColors[q.difficulty]}`}>
                      {difficultyLabels[q.difficulty]}
                    </span>
                  </div>
                </div>
                <motion.div animate={{ rotate: openId === q.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} className="text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === q.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-5 pb-5 border-t border-gray-800 pt-4">
                      <div className="prose prose-invert prose-sm max-w-none">
                        {q.answer.split('\n').map((line, i) => {
                          if (line.startsWith('```')) return null;
                          if (line.startsWith('**') && line.endsWith('**')) return <h4 key={i} className="text-white font-semibold text-sm mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
                          if (line.startsWith('- ')) return <li key={i} className="text-gray-300 text-sm ml-4 list-disc">{line.slice(2)}</li>;
                          if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) return <li key={i} className="text-gray-300 text-sm ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
                          if (line.trim() === '') return <div key={i} className="h-2" />;
                          return <p key={i} className="text-gray-300 text-sm leading-relaxed">{
                            line.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
                              if (part.startsWith('`') && part.endsWith('`')) return <code key={j} className="px-1.5 py-0.5 bg-gray-800 rounded text-xs text-primary-400 font-mono">{part.slice(1, -1)}</code>;
                              return part;
                            })
                          }</p>;
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={40} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500">Aucune question trouvée.</p>
          </div>
        )}
      </div>
    </div>
  );
}
