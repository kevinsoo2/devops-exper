'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  "C'est quoi Docker ?",
  "Différence CI vs CD ?",
  "Comment débuter K8s ?",
  "Qu'est-ce que Terraform ?",
];

// Knowledge base for the chatbot
const knowledgeBase: Record<string, string> = {
  'docker': "🐳 **Docker** est une plateforme de conteneurisation qui permet d'empaqueter une application avec toutes ses dépendances dans un conteneur léger et portable.\n\n**Commandes clés :**\n- `docker run` — lancer un conteneur\n- `docker build` — construire une image\n- `docker compose up` — lancer multi-conteneurs\n\n👉 Je te recommande le cours **Maîtriser Docker de A à Z** dans les formations !",
  'kubernetes': "☸️ **Kubernetes** (K8s) est un orchestrateur de conteneurs qui automatise le déploiement, le scaling et la gestion d'applications conteneurisées.\n\n**Concepts clés :**\n- **Pod** : plus petite unité déployable\n- **Deployment** : gère les réplicas\n- **Service** : expose les pods\n- **Ingress** : routage HTTP\n\n👉 Commence par le cours **Kubernetes en Production** !",
  'terraform': "🏗️ **Terraform** est un outil d'Infrastructure as Code (IaC) par HashiCorp qui permet de provisionner et gérer l'infrastructure de manière déclarative.\n\n**Workflow :**\n1. `terraform init` — initialiser\n2. `terraform plan` — prévisualiser\n3. `terraform apply` — appliquer\n4. `terraform destroy` — supprimer\n\n👉 Voir le cours **Terraform Infrastructure as Code** !",
  'ci/cd': "🔄 **CI/CD** = Continuous Integration / Continuous Delivery (ou Deployment)\n\n**CI (Intégration Continue) :**\n- Build automatique à chaque commit\n- Tests automatisés\n- Détection rapide des bugs\n\n**CD (Livraison/Déploiement Continu) :**\n- Déploiement automatisé vers staging/production\n- Rollback en cas de problème\n\n**Outils :** GitHub Actions, GitLab CI, Jenkins, ArgoCD\n\n👉 Cours recommandé : **CI/CD avec GitHub Actions** !",
  'ansible': "⚙️ **Ansible** est un outil d'automatisation IT pour la configuration, le déploiement et l'orchestration.\n\n**Avantages :**\n- Sans agent (agentless) — utilise SSH\n- Syntaxe YAML simple\n- Idempotent\n- +3000 modules\n\n**Structure :**\n```yaml\n- hosts: webservers\n  tasks:\n    - name: Install nginx\n      apt: name=nginx state=present\n```\n\n👉 Cours : **Ansible Automation** !",
  'prometheus': "📊 **Prometheus** est un système de monitoring open source qui collecte des métriques via un modèle pull (scraping HTTP).\n\n**Architecture :**\n- Prometheus Server (scrape + stockage TSDB)\n- Exporters (node_exporter, cadvisor)\n- Alertmanager (notifications)\n- Grafana (visualisation)\n\n**PromQL :** `rate(http_requests_total[5m])`\n\n👉 Cours : **Monitoring avec Prometheus & Grafana** !",
  'git': "📝 **Git** est un système de contrôle de version distribué.\n\n**Commandes essentielles :**\n- `git clone` — copier un repo\n- `git branch` — créer une branche\n- `git commit` — sauvegarder\n- `git push` — envoyer\n- `git merge` — fusionner\n- `git rebase` — réécrire l'historique\n\n**Workflows :** GitFlow, GitHub Flow, Trunk-based\n\n👉 Cours : **Git Avancé et Workflows** !",
  'linux': "🐧 **Linux** est le système d'exploitation de base pour le DevOps.\n\n**Compétences essentielles :**\n- Navigation fichiers (ls, cd, find)\n- Permissions (chmod, chown)\n- Processus (ps, top, kill)\n- Réseau (ss, ip, curl)\n- Services (systemctl)\n- Scripting Bash\n\n👉 Cours : **Administration Système Linux** et **Red Hat RHCSA/RHCE** !",
  'aws': "☁️ **AWS** (Amazon Web Services) est le leader du cloud computing.\n\n**Services clés DevOps :**\n- EC2 (compute), EKS (K8s), ECS (conteneurs)\n- S3 (stockage), RDS (bases de données)\n- CodePipeline (CI/CD), CloudFormation (IaC)\n- CloudWatch (monitoring), IAM (sécurité)\n\n👉 Cours : **Cloud AWS pour DevOps** !",
  'devsecops': "🔒 **DevSecOps** intègre la sécurité dans tout le cycle DevOps.\n\n**Pratiques :**\n- SAST (analyse statique du code)\n- DAST (tests dynamiques)\n- Scan d'images conteneur (Trivy)\n- Gestion des secrets (Vault)\n- Policy as Code (OPA)\n- Supply chain security (SBOM, Cosign)\n\n👉 Cours : **DevSecOps - Sécurité Continue** !",
  'rhcsa': "🎓 **RHCSA** (Red Hat Certified System Administrator) — EX200\n\n**Sujets d'examen :**\n- Gestion utilisateurs et permissions\n- Stockage LVM et systèmes de fichiers\n- SELinux configuration\n- Réseau et firewalld\n- Services systemd\n- Conteneurs Podman\n- Boot troubleshooting\n\n**Durée :** 2h30, examen pratique\n**Coût :** 400$\n\n👉 Cours : **Red Hat RHCSA & RHCE** !",
  'debuter': "🚀 **Pour débuter en DevOps**, voici le parcours recommandé :\n\n1. **Linux** — Bases système (4 semaines)\n2. **Docker** — Conteneurisation (3 semaines)\n3. **Git** — Versioning (2 semaines)\n4. **CI/CD** — Automatisation (3 semaines)\n5. **Kubernetes** — Orchestration (6 semaines)\n6. **Terraform** — IaC (4 semaines)\n7. **Monitoring** — Observabilité (4 semaines)\n\n👉 Va dans **Parcours** pour suivre la roadmap complète !",
  'salaire': "💰 **Salaires DevOps en France (2024) :**\n\n| Niveau | Salaire annuel |\n|--------|---------------|\n| Junior (0-2 ans) | 38-48k€ |\n| Confirmé (3-5 ans) | 50-65k€ |\n| Senior (5-8 ans) | 65-85k€ |\n| Lead/Expert (8+) | 80-110k€ |\n\n**Facteurs :** Paris vs Province (+20%), certifications (CKA, AWS), stack technique, remote.\n\nLes profils **SRE** et **Platform Engineer** sont les mieux payés.",
  'certification': "🏅 **Certifications DevOps recommandées :**\n\n**Débutant :**\n- Terraform Associate (70$)\n- LFCS (395$)\n\n**Intermédiaire :**\n- CKA - Kubernetes Admin (395$)\n- RHCSA - Red Hat (400$)\n- AWS Solutions Architect (150$)\n\n**Expert :**\n- CKS - K8s Security (395$)\n- RHCE - Red Hat Engineer (400$)\n- AWS DevOps Professional (300$)\n\n👉 Voir la section **Certifs** du site !",
};

function generateResponse(message: string): string {
  const lower = message.toLowerCase();
  
  // Check knowledge base
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lower.includes(key)) return response;
  }
  
  // Generic patterns
  if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) {
    return "👋 Salut ! Je suis l'assistant DevOps Expert. Pose-moi une question sur Docker, Kubernetes, Terraform, CI/CD, Linux, AWS, ou n'importe quel sujet DevOps !\n\nTu peux aussi me demander :\n- Comment débuter en DevOps\n- Les certifications recommandées\n- Les salaires DevOps";
  }
  
  if (lower.includes('merci')) {
    return "🙏 De rien ! N'hésite pas si tu as d'autres questions. Bonne formation ! 🚀";
  }
  
  if (lower.includes('cours') || lower.includes('formation')) {
    return "📚 Nous avons **40 formations** couvrant tout le DevOps :\n\n- 🐳 Docker & Conteneurisation\n- ☸️ Kubernetes & Orchestration\n- 🏗️ Terraform & IaC\n- 🔄 CI/CD (GitHub Actions, Jenkins, GitLab)\n- 📊 Monitoring (Prometheus, ELK, OpenTelemetry)\n- ☁️ Cloud (AWS, Azure, GCP)\n- 🔒 Sécurité (DevSecOps)\n- 🐧 Système (Linux, Red Hat, Windows)\n- 🌐 Réseaux\n\n👉 Va dans **Formations** pour explorer !";
  }

  if (lower.includes('lab') || lower.includes('pratique') || lower.includes('exercice')) {
    return "🧪 Nous avons **87 labs pratiques** avec des instructions étape par étape !\n\nExemples :\n- Docker Compose multi-services\n- Déployer sur Kubernetes\n- Pipeline CI/CD complet\n- Infrastructure Terraform\n- Monitoring Prometheus+Grafana\n- Sécurité avec Trivy/Vault\n\n👉 Va dans **Labs** pour commencer à pratiquer !";
  }
  
  return "🤔 Je n'ai pas de réponse spécifique sur ce sujet, mais voici ce que je peux t'aider avec :\n\n- **Docker, Kubernetes, Terraform** — concepts et commandes\n- **CI/CD** — GitHub Actions, Jenkins, GitLab\n- **Cloud** — AWS, Azure, GCP\n- **Linux, RHCSA** — administration système\n- **Monitoring** — Prometheus, Grafana, ELK\n- **Sécurité** — DevSecOps, Vault, Trivy\n- **Carrière** — débuter, certifications, salaires\n\nReformule ta question et j'essaierai de t'aider ! 💡";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'bot', content: "👋 Salut ! Je suis l'assistant DevOps Expert. Pose-moi une question sur Docker, Kubernetes, CI/CD, ou n'importe quel sujet DevOps !", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(content);
      const botMsg: Message = { id: Date.now() + 1, role: 'bot', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  // Floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-xl shadow-primary-500/30 flex items-center justify-center hover:scale-110 transition-all group"
        title="Assistant DevOps"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-dark animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-dark-card border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/40 flex flex-col animate-scale-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-primary-600/20 to-secondary-600/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">Assistant DevOps</h3>
          <p className="text-[10px] text-success-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success-400" /> En ligne
          </p>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 transition">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'bot' ? 'bg-primary-500/20 text-primary-400' : 'bg-secondary-500/20 text-secondary-400'
            }`}>
              {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === 'bot' 
                ? 'bg-gray-800/80 text-gray-200' 
                : 'bg-primary-500/20 text-primary-100'
            }`}>
              {msg.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="block text-white">{line.replace(/\*\*/g, '')}</strong>;
                if (line.startsWith('- ')) return <div key={i} className="ml-2 text-xs">• {line.slice(2)}</div>;
                if (line.startsWith('👉')) return <div key={i} className="mt-2 text-xs text-primary-400">{line}</div>;
                if (line === '') return <br key={i} />;
                return <span key={i}>{line}<br/></span>;
              })}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <Bot size={14} className="text-primary-400" />
            </div>
            <div className="px-3 py-2 rounded-xl bg-gray-800/80">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '0ms'}} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '150ms'}} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1"><Sparkles size={10} /> Questions rapides</p>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map(q => (
              <button key={q} onClick={() => sendMessage(q)} className="px-2.5 py-1 rounded-lg bg-gray-800 border border-gray-700/50 text-[11px] text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-gray-700/50">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Posez votre question DevOps..."
            className="flex-1 px-3 py-2 bg-gray-800/80 border border-gray-700/50 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50"
          />
          <button type="submit" disabled={!input.trim()} className="p-2 rounded-xl bg-primary-500 text-white disabled:opacity-30 hover:bg-primary-600 transition">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
