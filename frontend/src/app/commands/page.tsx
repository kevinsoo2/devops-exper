'use client';

import { useState } from 'react';
import { Terminal, Search, Copy, Check, Filter } from 'lucide-react';

const commands = [
  // File System
  { cmd: 'ls -la', desc: 'Liste détaillée des fichiers (permissions, taille, date)', cat: 'Fichiers' },
  { cmd: 'find / -name "*.log" -mtime -7', desc: 'Trouver les fichiers .log modifiés dans les 7 derniers jours', cat: 'Fichiers' },
  { cmd: 'du -sh /var/*', desc: 'Taille de chaque dossier dans /var', cat: 'Fichiers' },
  { cmd: 'df -h', desc: 'Espace disque disponible sur toutes les partitions', cat: 'Fichiers' },
  { cmd: 'ln -s /source /link', desc: 'Créer un lien symbolique', cat: 'Fichiers' },
  { cmd: 'tar -czf archive.tar.gz /dir', desc: 'Compresser un dossier en tar.gz', cat: 'Fichiers' },
  { cmd: 'chmod 755 script.sh', desc: 'Permissions rwxr-xr-x (propriétaire execute)', cat: 'Fichiers' },
  { cmd: 'chown -R user:group /dir', desc: 'Changer propriétaire récursivement', cat: 'Fichiers' },

  // Processus
  { cmd: 'ps aux | grep nginx', desc: 'Trouver les processus nginx', cat: 'Processus' },
  { cmd: 'top -bn1 | head -20', desc: 'Top processus (non-interactif, 1 itération)', cat: 'Processus' },
  { cmd: 'kill -9 PID', desc: 'Forcer l\'arrêt d\'un processus', cat: 'Processus' },
  { cmd: 'systemctl status nginx', desc: 'Statut d\'un service systemd', cat: 'Processus' },
  { cmd: 'systemctl restart nginx', desc: 'Redémarrer un service', cat: 'Processus' },
  { cmd: 'journalctl -u nginx -f', desc: 'Logs en temps réel d\'un service', cat: 'Processus' },
  { cmd: 'nohup ./script.sh &', desc: 'Exécuter en arrière-plan (survit à la déconnexion)', cat: 'Processus' },
  { cmd: 'lsof -i :8080', desc: 'Quel processus utilise le port 8080', cat: 'Processus' },
  // Réseau
  { cmd: 'ss -tlnp', desc: 'Ports TCP en écoute avec le PID', cat: 'Réseau' },
  { cmd: 'curl -vI https://api.com', desc: 'Headers HTTP verbose (debug)', cat: 'Réseau' },
  { cmd: 'dig +short google.com', desc: 'Résolution DNS rapide', cat: 'Réseau' },
  { cmd: 'ip addr show', desc: 'Adresses IP de toutes les interfaces', cat: 'Réseau' },
  { cmd: 'traceroute 8.8.8.8', desc: 'Tracer le chemin réseau vers une IP', cat: 'Réseau' },
  { cmd: 'tcpdump -i eth0 port 443', desc: 'Capturer le trafic HTTPS', cat: 'Réseau' },
  { cmd: 'iptables -L -n', desc: 'Lister les règles firewall', cat: 'Réseau' },
  { cmd: 'nc -zv host 22', desc: 'Tester si le port 22 est ouvert', cat: 'Réseau' },
  // Texte
  { cmd: 'grep -rn "error" /var/log/', desc: 'Chercher "error" récursivement avec numéros de ligne', cat: 'Texte' },
  { cmd: 'awk \'{print $1}\' access.log | sort | uniq -c | sort -rn | head', desc: 'Top IPs dans les logs', cat: 'Texte' },
  { cmd: 'sed -i \'s/old/new/g\' file.txt', desc: 'Remplacer du texte dans un fichier', cat: 'Texte' },
  { cmd: 'tail -f /var/log/syslog', desc: 'Suivre les logs en temps réel', cat: 'Texte' },
  { cmd: 'wc -l file.txt', desc: 'Compter le nombre de lignes', cat: 'Texte' },
  { cmd: 'jq \'.items[].name\' data.json', desc: 'Parser du JSON (extraire les noms)', cat: 'Texte' },

  // Docker
  { cmd: 'docker ps -a', desc: 'Tous les conteneurs (actifs + arrêtés)', cat: 'Docker' },
  { cmd: 'docker logs -f --tail=100 container', desc: 'Suivre les 100 dernières lignes de logs', cat: 'Docker' },
  { cmd: 'docker exec -it container bash', desc: 'Ouvrir un shell dans un conteneur', cat: 'Docker' },
  { cmd: 'docker system prune -af', desc: 'Nettoyer tout (images, conteneurs, volumes)', cat: 'Docker' },
  { cmd: 'docker stats', desc: 'Monitoring temps réel CPU/RAM/IO des conteneurs', cat: 'Docker' },
  { cmd: 'docker inspect container | jq \'.[0].NetworkSettings\'', desc: 'Infos réseau d\'un conteneur', cat: 'Docker' },
  { cmd: 'docker compose up -d --build', desc: 'Build et démarrer les services en arrière-plan', cat: 'Docker' },
  { cmd: 'docker image ls --format "{{.Repository}}:{{.Tag}} {{.Size}}"', desc: 'Images avec taille formatée', cat: 'Docker' },
  // Kubernetes
  { cmd: 'kubectl get pods -A', desc: 'Tous les Pods de tous les namespaces', cat: 'Kubernetes' },
  { cmd: 'kubectl describe pod pod-name', desc: 'Détails complets d\'un Pod (events inclus)', cat: 'Kubernetes' },
  { cmd: 'kubectl logs -f pod-name -c container', desc: 'Logs en temps réel d\'un conteneur spécifique', cat: 'Kubernetes' },
  { cmd: 'kubectl exec -it pod-name -- /bin/sh', desc: 'Shell dans un Pod', cat: 'Kubernetes' },
  { cmd: 'kubectl top pods --sort-by=memory', desc: 'Pods triés par consommation mémoire', cat: 'Kubernetes' },
  { cmd: 'kubectl rollout restart deployment/app', desc: 'Redémarrer un déploiement (rolling)', cat: 'Kubernetes' },
  { cmd: 'kubectl port-forward svc/app 8080:80', desc: 'Exposer un service en local', cat: 'Kubernetes' },
  { cmd: 'kubectl get events --sort-by=.lastTimestamp', desc: 'Événements récents du cluster', cat: 'Kubernetes' },
  // Git
  { cmd: 'git log --oneline --graph -20', desc: 'Historique graphique des 20 derniers commits', cat: 'Git' },
  { cmd: 'git stash && git stash pop', desc: 'Sauvegarder/restaurer les modifications locales', cat: 'Git' },
  { cmd: 'git rebase -i HEAD~3', desc: 'Rebase interactif des 3 derniers commits', cat: 'Git' },
  { cmd: 'git bisect start', desc: 'Trouver le commit qui a introduit un bug', cat: 'Git' },
  { cmd: 'git diff --stat main..feature', desc: 'Stats des changements entre branches', cat: 'Git' },
  { cmd: 'git cherry-pick abc123', desc: 'Appliquer un commit spécifique sur la branche courante', cat: 'Git' },
];

const allCategories = ['Tous', ...new Set(commands.map(c => c.cat))];

export default function CommandsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = commands.filter(c => {
    const matchSearch = c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Tous' || c.cat === category;
    return matchSearch && matchCat;
  });

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Terminal size={16} className="text-green-400" />
            Référence Rapide
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Commandes <span className="gradient-text">Essentielles</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {commands.length} commandes Linux, Docker, Kubernetes et Git indispensables pour le DevOps. Cliquez pour copier.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher une commande..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === cat ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} commandes</p>

        {/* Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((c, i) => (
            <div key={i} className="card !p-3 group hover:border-green-500/30 transition-all cursor-pointer"
              onClick={() => copyToClipboard(c.cmd)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <code className="text-sm font-mono text-green-400 break-all">{c.cmd}</code>
                  <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-1.5 py-0.5 rounded bg-gray-800 text-[9px] text-gray-500">{c.cat}</span>
                  {copied === c.cmd ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
