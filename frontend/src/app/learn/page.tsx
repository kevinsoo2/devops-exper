'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, PlayCircle, BookOpen, Clock, Trophy, ExternalLink } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

// Map de vidéos YouTube éducatives par thème DevOps
const videoMap: Record<string, string> = {
  // Docker
  'docker': 'https://www.youtube.com/embed/caXHwYC3tq8',
  'conteneur': 'https://www.youtube.com/embed/caXHwYC3tq8',
  'dockerfile': 'https://www.youtube.com/embed/LQjaJINkQXY',
  'docker compose': 'https://www.youtube.com/embed/SXwC9fSwct8',
  'image docker': 'https://www.youtube.com/embed/LQjaJINkQXY',
  'volume': 'https://www.youtube.com/embed/p2PH_YPCsis',
  'réseau docker': 'https://www.youtube.com/embed/bKFMS5C4CG0',
  'multi-stage': 'https://www.youtube.com/embed/zpkqNPwEzac',
  // Kubernetes
  'kubernetes': 'https://www.youtube.com/embed/X48VuDVv0do',
  'pod': 'https://www.youtube.com/embed/5cNrTU6o3Fw',
  'deployment': 'https://www.youtube.com/embed/EQNO_kM96Mo',
  'service': 'https://www.youtube.com/embed/T4Z7visMM4E',
  'ingress': 'https://www.youtube.com/embed/80Ew_fsV4rM',
  'helm': 'https://www.youtube.com/embed/fy8SHvNZGeE',
  'rbac': 'https://www.youtube.com/embed/jvhKOAFGDRo',
  'hpa': 'https://www.youtube.com/embed/uxuyPru3_Lc',
  'kubectl': 'https://www.youtube.com/embed/feLpGydQVio',
  'etcd': 'https://www.youtube.com/embed/OmphHSaO1sE',
  'statefulset': 'https://www.youtube.com/embed/pPQKAR1pA9U',
  'daemonset': 'https://www.youtube.com/embed/yYeUic4B3LI',
  'configmap': 'https://www.youtube.com/embed/FAnQTgr04mU',
  'secret': 'https://www.youtube.com/embed/FAnQTgr04mU',
  'network polic': 'https://www.youtube.com/embed/3gGpMmYeEO8',
  // Terraform
  'terraform': 'https://www.youtube.com/embed/7xngnjfIlK4',
  'hcl': 'https://www.youtube.com/embed/7xngnjfIlK4',
  'provider': 'https://www.youtube.com/embed/SLB_c_ayRMo',
  'state': 'https://www.youtube.com/embed/dCGXlLYmaMw',
  'module': 'https://www.youtube.com/embed/SLB_c_ayRMo',
  // CI/CD
  'github actions': 'https://www.youtube.com/embed/R8_veQiYBjI',
  'ci/cd': 'https://www.youtube.com/embed/scEDHsr3APg',
  'pipeline': 'https://www.youtube.com/embed/scEDHsr3APg',
  'workflow': 'https://www.youtube.com/embed/R8_veQiYBjI',
  'jenkins': 'https://www.youtube.com/embed/FX322RVNGj4',
  'argocd': 'https://www.youtube.com/embed/MeU5_k9ssrs',
  'gitops': 'https://www.youtube.com/embed/MeU5_k9ssrs',
  // Monitoring
  'prometheus': 'https://www.youtube.com/embed/h4Sl21AKiDg',
  'grafana': 'https://www.youtube.com/embed/lILY8eSspEo',
  'alerting': 'https://www.youtube.com/embed/h4Sl21AKiDg',
  'promql': 'https://www.youtube.com/embed/hvACEDjHQZE',
  'loki': 'https://www.youtube.com/embed/7IcmRCjDYNs',
  'opentelemetry': 'https://www.youtube.com/embed/r8UvWSX3KA8',
  'jaeger': 'https://www.youtube.com/embed/UNqilb9_zwY',
  // Security
  'sécurité': 'https://www.youtube.com/embed/oBf5lrmquYI',
  'trivy': 'https://www.youtube.com/embed/Xpn1IP7Cxfk',
  'vault': 'https://www.youtube.com/embed/VYfl-DGun6E',
  'sast': 'https://www.youtube.com/embed/Xpn1IP7Cxfk',
  'falco': 'https://www.youtube.com/embed/8o804koab2g',
  'opa': 'https://www.youtube.com/embed/Yup1FUc2Qn0',
  // Linux
  'linux': 'https://www.youtube.com/embed/ROjZy1WbCIA',
  'bash': 'https://www.youtube.com/embed/tK9Oc6AEnR4',
  'ssh': 'https://www.youtube.com/embed/YS5Zh7KExvE',
  'permission': 'https://www.youtube.com/embed/D-9s_vTBgs4',
  'systemd': 'https://www.youtube.com/embed/5JVBpXiYMKo',
  'processus': 'https://www.youtube.com/embed/TJzltwFLKDo',
  'filesystem': 'https://www.youtube.com/embed/42iQKuQodW4',
  // Réseau
  'osi': 'https://www.youtube.com/embed/7IS7gigunyI',
  'tcp/ip': 'https://www.youtube.com/embed/3b_TAYtzuho',
  'dns': 'https://www.youtube.com/embed/27r4Bzuj5NQ',
  'http': 'https://www.youtube.com/embed/iYM2zFP3Zn0',
  'tls': 'https://www.youtube.com/embed/AlE5X1NlHgg',
  'load balancing': 'https://www.youtube.com/embed/sCR3SAVdyCc',
  'firewall': 'https://www.youtube.com/embed/kDEX1HXybrU',
  'vpn': 'https://www.youtube.com/embed/WVDQEoe6ZWY',
  'subnetting': 'https://www.youtube.com/embed/BWZ-MHIhqjM',
  // AWS
  'aws': 'https://www.youtube.com/embed/k1RI5locZE4',
  'ec2': 'https://www.youtube.com/embed/TsRBftzZsQo',
  'vpc': 'https://www.youtube.com/embed/7_NNlnH7sAg',
  's3': 'https://www.youtube.com/embed/tfU0JEZjFIQ',
  'iam': 'https://www.youtube.com/embed/iF9fs8Rdue4',
  'lambda': 'https://www.youtube.com/embed/eOBq__h4OJ4',
  'eks': 'https://www.youtube.com/embed/p6xDCz00TxU',
  'cloudformation': 'https://www.youtube.com/embed/Omppm_YUG2g',
  // Ansible
  'ansible': 'https://www.youtube.com/embed/1id6ERvfozo',
  'playbook': 'https://www.youtube.com/embed/1id6ERvfozo',
  'inventory': 'https://www.youtube.com/embed/GPntfMT2hPM',
  // SRE
  'sre': 'https://www.youtube.com/embed/uTEL8Ff1Zvk',
  'slo': 'https://www.youtube.com/embed/tEylFyxbDLE',
  'error budget': 'https://www.youtube.com/embed/y2ILKr8kCJU',
  'incident': 'https://www.youtube.com/embed/4e3s45F5rem',
  'chaos': 'https://www.youtube.com/embed/rOppVyYWOjA',
  'post-mortem': 'https://www.youtube.com/embed/4e3s45F5rem',
};

function getVideoUrl(title: string): string {
  const lowerTitle = title.toLowerCase();
  for (const [keyword, url] of Object.entries(videoMap)) {
    if (lowerTitle.includes(keyword)) return url;
  }
  // Fallback: vidéo générique DevOps
  return 'https://www.youtube.com/embed/Xrgk023l4lI';
}

// Génère du contenu éducatif basé sur le titre de la leçon
function generateLessonContent(title: string, type: string): string[] {
  const t = title.toLowerCase();
  
  // Contenu spécifique par thème
  if (t.includes('osi')) return [
    "Le modèle OSI (Open Systems Interconnection) est un modèle de référence qui décrit comment les données sont transmises sur un réseau.",
    "Il se compose de 7 couches, chacune avec un rôle spécifique :",
    "**Couche 7 - Application** : Interface avec l'utilisateur (HTTP, FTP, DNS, SMTP)",
    "**Couche 6 - Présentation** : Formatage, chiffrement, compression des données",
    "**Couche 5 - Session** : Gestion des sessions de communication",
    "**Couche 4 - Transport** : Fiabilité de la transmission (TCP/UDP), segmentation",
    "**Couche 3 - Réseau** : Routage et adressage logique (IP)",
    "**Couche 2 - Liaison** : Adressage physique (MAC), détection d'erreurs",
    "**Couche 1 - Physique** : Transmission des bits bruts sur le médium",
    "En DevOps, comprendre ce modèle est essentiel pour debugger les problèmes réseau, configurer les firewalls et optimiser les communications entre services."
  ];
  
  if (t.includes('tcp/ip')) return [
    "Le modèle TCP/IP est le modèle pratique utilisé sur Internet, en 4 couches :",
    "**Couche Application** : HTTP, HTTPS, DNS, SSH, FTP — les protocoles applicatifs",
    "**Couche Transport** : TCP (fiable, orienté connexion) et UDP (rapide, non fiable)",
    "**Couche Internet** : IP (v4 et v6), ICMP, ARP — routage des paquets",
    "**Couche Accès réseau** : Ethernet, Wi-Fi — transmission physique",
    "TCP utilise un handshake en 3 étapes (SYN, SYN-ACK, ACK) pour établir une connexion fiable.",
    "UDP est préféré pour le streaming, DNS et les applications temps réel.",
    "En tant que DevOps, vous configurerez souvent des règles basées sur TCP/UDP dans les Security Groups, Network Policies et firewalls."
  ];

  if (t.includes('docker') && (t.includes('intro') || t.includes('histoire') || t.includes('conteneur'))) return [
    "Docker est une plateforme de conteneurisation qui permet d'empaqueter une application avec toutes ses dépendances.",
    "**Différence VM vs Conteneur** :",
    "- VM : hyperviseur + OS complet + application (lourd, GB)",
    "- Conteneur : partage le kernel hôte, isolé via namespaces et cgroups (léger, MB)",
    "**Architecture Docker** :",
    "- Docker Daemon (dockerd) : gère les conteneurs",
    "- Docker Client (CLI) : interface utilisateur",
    "- Docker Registry : stocke les images (Docker Hub, ECR, GCR)",
    "**Commandes essentielles** :",
    "```docker run -d --name webapp -p 8080:80 nginx```",
    "```docker ps``` — lister les conteneurs actifs",
    "```docker logs webapp``` — voir les logs",
    "```docker exec -it webapp bash``` — entrer dans un conteneur",
    "Docker a révolutionné le déploiement en garantissant : 'Ça marche sur ma machine' → 'Ça marche partout'."
  ];

  if (t.includes('dockerfile')) return [
    "Un Dockerfile est un fichier texte contenant les instructions pour construire une image Docker.",
    "**Instructions principales** :",
    "```FROM node:20-alpine``` — Image de base",
    "```WORKDIR /app``` — Répertoire de travail",
    "```COPY package*.json ./``` — Copier les fichiers",
    "```RUN npm ci --only=production``` — Exécuter une commande",
    "```COPY . .``` — Copier le reste du code",
    "```EXPOSE 3000``` — Documenter le port",
    "```CMD [\"node\", \"server.js\"]``` — Commande de démarrage",
    "**Bonnes pratiques** :",
    "- Utiliser des images Alpine (plus légères)",
    "- Ordonner les instructions du moins au plus changeant (cache)",
    "- Un seul processus par conteneur",
    "- Utiliser .dockerignore pour exclure node_modules, .git",
    "- Préférer COPY à ADD sauf pour les archives"
  ];

  if (t.includes('kubernetes') && (t.includes('architecture') || t.includes('fondament'))) return [
    "Kubernetes (K8s) est un orchestrateur de conteneurs open-source créé par Google.",
    "**Architecture du cluster** :",
    "**Control Plane** (Master) :",
    "- kube-apiserver : point d'entrée API REST",
    "- etcd : base de données clé-valeur distribuée (état du cluster)",
    "- kube-scheduler : assigne les pods aux nodes",
    "- controller-manager : boucles de réconciliation (Deployment, ReplicaSet...)",
    "**Worker Nodes** :",
    "- kubelet : agent sur chaque node, gère les pods",
    "- kube-proxy : gère les règles réseau (iptables/IPVS)",
    "- Container Runtime : containerd ou CRI-O",
    "**Objets fondamentaux** : Pod, Service, Deployment, Namespace, ConfigMap, Secret",
    "```kubectl get nodes``` — voir les nodes",
    "```kubectl get pods -A``` — voir tous les pods",
    "```kubectl describe pod <name>``` — détails d'un pod"
  ];

  if (t.includes('terraform') && (t.includes('intro') || t.includes('premier'))) return [
    "Terraform est un outil d'Infrastructure as Code (IaC) par HashiCorp.",
    "**Pourquoi Terraform ?** :",
    "- Déclaratif : vous décrivez l'état souhaité, Terraform calcule les changements",
    "- Multi-cloud : AWS, Azure, GCP, Kubernetes...",
    "- State : suit l'état réel de votre infrastructure",
    "- Plan : preview des changements avant application",
    "**Workflow** : Write → Plan → Apply",
    "```terraform init``` — Initialise le projet, télécharge les providers",
    "```terraform plan``` — Montre ce qui va être créé/modifié/supprimé",
    "```terraform apply``` — Applique les changements",
    "```terraform destroy``` — Détruit l'infrastructure",
    "**Exemple basique** :",
    "```hcl\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t3.micro\"\n  tags = { Name = \"MonServeur\" }\n}```"
  ];

  if (t.includes('prometheus')) return [
    "Prometheus est un système de monitoring et d'alerting open-source (CNCF).",
    "**Architecture** :",
    "- Prometheus Server : scrape les métriques via HTTP (pull model)",
    "- Exporters : exposent les métriques (node_exporter, blackbox...)",
    "- Alertmanager : gère les alertes (routing, silences, notifications)",
    "- Grafana : visualisation des métriques",
    "**Types de métriques** :",
    "- Counter : valeur qui ne fait qu'augmenter (requêtes totales)",
    "- Gauge : valeur qui monte et descend (mémoire utilisée)",
    "- Histogram : distribution de valeurs (latence des requêtes)",
    "- Summary : similaire à histogram avec quantiles pré-calculés",
    "**PromQL basique** :",
    "```rate(http_requests_total[5m])``` — requêtes/seconde sur 5min",
    "```sum by (status)(http_requests_total)``` — total par code HTTP"
  ];

  // Contenu générique intelligent basé sur le titre
  return [
    `Cette leçon vous enseigne les concepts fondamentaux de **${title}**.`,
    "Objectifs d'apprentissage :",
    `- Comprendre les principes et l'architecture de ${title}`,
    "- Identifier les cas d'utilisation en environnement professionnel",
    "- Maîtriser les commandes et configurations essentielles",
    "- Appliquer les bonnes pratiques recommandées par l'industrie",
    "",
    "📌 **Concepts clés** abordés dans cette leçon :",
    "1. Les fondamentaux théoriques et leur importance en DevOps",
    "2. L'installation et la configuration initiale",
    "3. Les commandes et workflows de base",
    "4. Les patterns et anti-patterns courants",
    "5. L'intégration avec les autres outils de l'écosystème DevOps",
    "",
    "🔧 **Exercice recommandé** : Après avoir visionné la vidéo, reproduisez les exemples dans votre environnement de lab.",
    "💡 **Conseil** : Prenez des notes et créez votre propre cheat sheet pour ce sujet."
  ];
}

function LearnContent() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const lessonId = searchParams.get('lesson');
  const courseSlug = searchParams.get('course');
  const [lesson, setLesson] = useState<any>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    const title = searchParams.get('title') || 'Leçon';
    const type = searchParams.get('type') || 'video';
    const duration = searchParams.get('duration') || '10';
    
    setLesson({
      id: lessonId,
      title,
      type,
      duration,
      videoUrl: getVideoUrl(title),
      content: generateLessonContent(title, type),
    });
  }, [lessonId, searchParams]);

  const handleComplete = () => {
    setCompleted(true);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold dark:text-white mb-2">Sélectionnez une leçon</h2>
          <p className="text-gray-500 mb-4">Choisissez une leçon dans un cours pour commencer.</p>
          <Link href="/courses" className="btn-primary">Voir les formations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href={courseSlug ? `/courses/${courseSlug}` : '/courses'} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400">
            <ArrowLeft size={16} /> Retour au cours
          </Link>
          {completed && (
            <span className="flex items-center gap-1 text-success-400 text-sm font-medium">
              <CheckCircle size={16} /> Complétée !
            </span>
          )}
        </div>

        {/* Lesson Header */}
        <div className="card mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              {lesson.type === 'video' ? <PlayCircle size={20} className="text-primary-400" /> : <BookOpen size={20} className="text-primary-400" />}
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">{lesson.title}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><Clock size={12} /> {lesson.duration} min</span>
                <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">{lesson.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        {(lesson.type === 'video' || lesson.type === 'exercise') && lesson.videoUrl && (
          <div className="card mb-6 !p-0 overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
            {lesson.type === 'exercise' ? '🏋️ Exercice Pratique' : lesson.type === 'quiz' ? '❓ Quiz' : '📝 Notes & Contenu de la Leçon'}
          </h3>
          <div className="text-gray-300 text-sm leading-relaxed space-y-3">
            {lesson.content.map((line: string, i: number) => {
              if (line === '') return <br key={i} />;
              if (line.startsWith('```') && !line.startsWith('```\n')) {
                return <code key={i} className="block bg-gray-800/80 rounded-lg p-3 font-mono text-xs text-green-400 overflow-x-auto">{line.replace(/```/g, '').replace(/^hcl\n/, '')}</code>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={i} className="font-semibold text-white mt-4">{line.replace(/\*\*/g, '')}</h4>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 list-disc text-gray-400">{line.substring(2).split('**').map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}</li>;
              }
              if (line.match(/^\d+\./)) {
                return <p key={i} className="ml-2 text-gray-400">{line}</p>;
              }
              // Handle bold text within paragraphs
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} className="text-gray-400">
                  {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
                </p>
              );
            })}
          </div>

          {lesson.type === 'quiz' && (
            <div className="mt-6">
              <Link href="/quizzes" className="btn-primary">Accéder aux Quiz</Link>
            </div>
          )}
        </div>

        {/* Resources */}
        <div className="card mb-6">
          <h3 className="text-base font-semibold dark:text-white mb-3">📚 Ressources complémentaires</h3>
          <div className="space-y-2 text-sm">
            <a href="https://docs.docker.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-400 hover:text-primary-300">
              <ExternalLink size={14} /> Documentation officielle
            </a>
            <a href="https://kubernetes.io/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-400 hover:text-primary-300">
              <ExternalLink size={14} /> Guides et tutoriels
            </a>
            <a href="#" className="flex items-center gap-2 text-primary-400 hover:text-primary-300">
              <ExternalLink size={14} /> Lab pratique associé
            </a>
          </div>
        </div>

        {/* Complete Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <Trophy size={14} className="inline mr-1" /> +10 XP à la complétion
          </div>
          {!completed ? (
            <button onClick={handleComplete} className="btn-primary">
              <CheckCircle size={18} /> Marquer comme complétée
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-success-400 font-medium text-sm">✅ Leçon complétée ! +10 XP</span>
              <Link href={courseSlug ? `/courses/${courseSlug}` : '/courses'} className="btn-outline text-sm">
                Leçon suivante <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="animate-pulse text-gray-500">Chargement...</div></div>}>
      <LearnContent />
    </Suspense>
  );
}
