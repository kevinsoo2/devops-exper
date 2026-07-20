'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, ChevronRight, ExternalLink, Monitor, Download, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Simulated filesystem
const filesystem: Record<string, string[]> = {
  '/': ['home', 'etc', 'var', 'usr', 'tmp', 'opt', 'root'],
  '/home': ['devops'],
  '/home/devops': ['projects', 'scripts', '.bashrc', '.ssh'],
  '/home/devops/projects': ['webapp', 'infra', 'docker-lab'],
  '/home/devops/scripts': ['backup.sh', 'deploy.sh', 'monitor.sh'],
  '/etc': ['nginx', 'ssh', 'hosts', 'resolv.conf', 'fstab', 'passwd', 'shadow', 'group'],
  '/var': ['log', 'www', 'lib'],
  '/var/log': ['syslog', 'auth.log', 'nginx'],
};

// Command responses
const commandResponses: Record<string, (args: string[], state: any) => string> = {
  'help': () => `Commandes disponibles :
  ls [dir]        - Lister les fichiers
  cd [dir]        - Changer de répertoire
  pwd             - Répertoire courant
  cat [file]      - Afficher un fichier
  echo [text]     - Afficher du texte
  whoami          - Utilisateur courant
  hostname        - Nom de la machine
  date            - Date et heure
  uptime          - Temps de fonctionnement
  uname -a        - Infos système
  ps aux          - Processus actifs
  df -h           - Espace disque
  free -h         - Mémoire
  ip addr         - Interfaces réseau
  docker ps       - Conteneurs Docker
  docker images   - Images Docker
  kubectl get pods - Pods Kubernetes
  systemctl status - Services
  clear           - Effacer l'écran
  history         - Historique des commandes`,

  'pwd': (_args, state) => state.cwd,
  'whoami': () => 'devops',
  'hostname': () => 'lab-devops-expert',
  'date': () => new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'medium' }),
  'uptime': () => ' 14:32:07 up 47 days, 3:21, 1 user, load average: 0.12, 0.08, 0.05',
  'uname': (args) => args.includes('-a') ? 'Linux lab-devops-expert 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux' : 'Linux',
  'clear': () => '__CLEAR__',
  'echo': (args) => args.join(' ').replace(/"/g, '').replace(/'/g, ''),

  'ls': (args, state) => {
    const target = args[0] || state.cwd;
    const path = target.startsWith('/') ? target : `${state.cwd === '/' ? '' : state.cwd}/${target}`;
    const contents = filesystem[path];
    if (!contents) return `ls: impossible d'accéder à '${target}': Aucun fichier ou dossier de ce type`;
    if (args.includes('-la') || args.includes('-l')) {
      return contents.map((f, i) => {
        const isDir = filesystem[`${path === '/' ? '' : path}/${f}`];
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = isDir ? '4096' : `${(i + 1) * 234}`;
        return `${perms}  1 devops devops  ${size.padStart(5)} Jul 15 10:${(i*3+10).toString().padStart(2,'0')} ${isDir ? `\x1b[1;34m${f}\x1b[0m` : f}`;
      }).join('\n');
    }
    return contents.map(f => {
      const isDir = filesystem[`${path === '/' ? '' : path}/${f}`];
      return isDir ? f + '/' : f;
    }).join('  ');
  },

  'cd': (args, state) => {
    if (!args[0] || args[0] === '~') { state.cwd = '/home/devops'; return ''; }
    if (args[0] === '..') {
      const parts = state.cwd.split('/').filter(Boolean);
      parts.pop();
      state.cwd = '/' + parts.join('/');
      return '';
    }
    const target = args[0].startsWith('/') ? args[0] : `${state.cwd === '/' ? '' : state.cwd}/${args[0]}`;
    if (filesystem[target]) { state.cwd = target; return ''; }
    return `bash: cd: ${args[0]}: Aucun fichier ou dossier de ce type`;
  },

  'cat': (args) => {
    const file = args[0];
    if (!file) return 'cat: opérande manquant';
    const contents: Record<string, string> = {
      '/etc/hosts': '127.0.0.1\tlocalhost\n127.0.1.1\tlab-devops-expert\n::1\t\tlocalhost ip6-localhost',
      '/etc/resolv.conf': 'nameserver 8.8.8.8\nnameserver 8.8.4.4\nsearch lab.local',
      '/etc/fstab': '# <file system>  <mount point>  <type>  <options>  <dump>  <pass>\n/dev/sda1        /              ext4    defaults   0       1\n/dev/sda2        /home          ext4    defaults   0       2\n/dev/sdb1        swap           swap    defaults   0       0',
      '/home/devops/.bashrc': '# ~/.bashrc\nexport PS1="\\u@\\h:\\w\\$ "\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\nalias k="kubectl"\nalias d="docker"',
      '/home/devops/scripts/backup.sh': '#!/bin/bash\n# Script de backup quotidien\nDATE=$(date +%Y%m%d)\nBACKUP_DIR="/backup/$DATE"\nmkdir -p $BACKUP_DIR\ntar -czf $BACKUP_DIR/data.tar.gz /var/www/\necho "Backup terminé: $BACKUP_DIR"',
      '/home/devops/scripts/deploy.sh': '#!/bin/bash\n# Script de déploiement\necho "🚀 Déploiement en cours..."\ncd /home/devops/projects/webapp\ngit pull origin main\ndocker compose down\ndocker compose up -d --build\necho "✅ Déploiement terminé"',
    };
    return contents[file] || `cat: ${file}: Aucun fichier ou dossier de ce type`;
  },

  'ps': () => `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169432 11844 ?        Ss   Jul10   0:12 /sbin/init
root       423  0.0  0.1  72312  6244 ?        Ss   Jul10   0:01 /usr/sbin/sshd
www-data  1234  0.1  0.5 144832 41024 ?        S    10:30   0:45 nginx: worker
devops    2001  0.0  0.0  21484  5120 pts/0    Ss   14:30   0:00 -bash
devops    2050  0.0  0.0  37364  3200 pts/0    R+   14:32   0:00 ps aux`,

  'df': (args) => args.includes('-h') ? `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   12G   35G  26% /
/dev/sda2        100G  45G   50G  47% /home
tmpfs            3.9G  1.2M  3.9G   1% /tmp
/dev/sdb1        200G  80G  110G  42% /data` : 'Utiliser: df -h',

  'free': (args) => args.includes('-h') ? `               total        used        free      shared  buff/cache   available
Mem:           7.8Gi       2.1Gi       3.2Gi       256Mi       2.5Gi       5.2Gi
Swap:          2.0Gi          0B       2.0Gi` : 'Utiliser: free -h',

  'ip': (args) => {
    if (args[0] === 'addr' || args[0] === 'a') return `1: lo: <LOOPBACK,UP> mtu 65536
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0
3: docker0: <BROADCAST,MULTICAST,UP> mtu 1500
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0`;
    return 'Usage: ip addr | ip route | ip link';
  },

  'docker': (args) => {
    if (args[0] === 'ps') return `CONTAINER ID   IMAGE          COMMAND                  STATUS          PORTS                  NAMES
a1b2c3d4e5f6   nginx:alpine   "/docker-entrypoint.…"   Up 2 hours      0.0.0.0:80->80/tcp     web-frontend
f6e5d4c3b2a1   postgres:15    "docker-entrypoint.s…"   Up 2 hours      5432/tcp               db-postgres
1234567890ab   redis:7        "docker-entrypoint.s…"   Up 2 hours      6379/tcp               cache-redis`;
    if (args[0] === 'images') return `REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
nginx          alpine    1234abcd5678   2 weeks ago    23.5MB
postgres       15        abcd1234efgh   3 weeks ago    379MB
redis          7         efgh5678abcd   1 month ago    130MB
node           18-slim   5678efgh1234   2 weeks ago    180MB
python         3.11      9012abcd3456   1 month ago    920MB`;
    if (args[0] === 'version') return `Docker version 24.0.7, build afdd53b\nAPI version: 1.43`;
    return 'Usage: docker [ps|images|version|run|build|compose]';
  },

  'kubectl': (args) => {
    if (args[0] === 'get' && args[1] === 'pods') return `NAME                          READY   STATUS    RESTARTS   AGE
web-frontend-7d4f8b6c9-x2k4l  1/1     Running   0          2d
api-backend-5c8e9f7a2-m9n3p   1/1     Running   0          2d
db-postgres-0                  1/1     Running   0          5d
redis-cache-6f7a8b9c1-q4r5s   1/1     Running   0          5d`;
    if (args[0] === 'get' && args[1] === 'nodes') return `NAME           STATUS   ROLES           AGE   VERSION
master-01      Ready    control-plane   30d   v1.28.4
worker-01      Ready    <none>          30d   v1.28.4
worker-02      Ready    <none>          30d   v1.28.4`;
    if (args[0] === 'get' && args[1] === 'svc') return `NAME          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes    ClusterIP   10.96.0.1      <none>        443/TCP        30d
web-frontend  NodePort    10.96.45.123   <none>        80:30080/TCP   2d
api-backend   ClusterIP   10.96.78.45    <none>        3000/TCP       2d`;
    return 'Usage: kubectl [get|describe|logs|exec|apply] [pods|nodes|svc|deploy]';
  },

  'systemctl': (args) => {
    if (args[0] === 'status' && args[1]) return `● ${args[1]}.service - ${args[1]} Service\n     Loaded: loaded (/lib/systemd/system/${args[1]}.service; enabled)\n     Active: active (running) since Mon 2026-07-15 10:00:00 UTC; 4h ago\n   Main PID: 1234 (${args[1]})\n      Tasks: 4 (limit: 4096)\n     Memory: 32.0M\n        CPU: 1.234s`;
    if (args[0] === 'status') return '● Loaded units: 245\n  Active: 180 running\n  Failed: 0 units';
    return 'Usage: systemctl [start|stop|restart|status|enable] <service>';
  },

  'history': (_args, state) => state.history.map((cmd: string, i: number) => `  ${(i+1).toString().padStart(4)}  ${cmd}`).join('\n'),

  'man': (args) => args[0] ? `Pas de page de manuel pour '${args[0]}' dans ce simulateur.\nUtilisez 'help' pour voir les commandes disponibles.` : 'Usage: man <commande>',

  'grep': (args) => {
    if (args.length < 2) return 'Usage: grep <pattern> <file>';
    return `(simulation) Résultats pour "${args[0]}" dans ${args[1]}:\n  Ligne 12: match trouvé\n  Ligne 45: match trouvé`;
  },

  'mkdir': (args) => args[0] ? '' : 'mkdir: opérande manquant',
  'touch': (args) => args[0] ? '' : 'touch: opérande manquant',
  'rm': (args) => args[0] ? '' : 'rm: opérande manquant',
  'cp': (args) => args.length >= 2 ? '' : 'cp: opérande manquant',
  'mv': (args) => args.length >= 2 ? '' : 'mv: opérande manquant',
  'chmod': (args) => args.length >= 2 ? '' : 'chmod: opérande manquant',
  'chown': (args) => args.length >= 2 ? '' : 'chown: opérande manquant',
};


// Lab exercises
const labExercises = [
  { id: 'linux-basics', title: '🐧 Linux Basics', tasks: ['Listez les fichiers dans /etc', 'Affichez le contenu de /etc/hosts', 'Changez de répertoire vers /home/devops', 'Affichez l\'espace disque'] },
  { id: 'docker-intro', title: '🐳 Docker Introduction', tasks: ['Listez les conteneurs actifs', 'Affichez les images Docker', 'Vérifiez la version Docker'] },
  { id: 'k8s-basics', title: '☸️ Kubernetes Basics', tasks: ['Listez les Pods', 'Affichez les nœuds', 'Listez les services'] },
  { id: 'sysadmin', title: '🔧 Administration Système', tasks: ['Vérifiez la mémoire', 'Affichez les processus', 'Vérifiez les interfaces réseau', 'Consultez le statut de nginx'] },
];

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export default function TerminalLabPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: '╔══════════════════════════════════════════════════════════════╗' },
    { type: 'system', content: '║  🖥️  DevOps Expert - Terminal Interactif                     ║' },
    { type: 'system', content: '║  Tapez "help" pour voir les commandes disponibles            ║' },
    { type: 'system', content: '╚══════════════════════════════════════════════════════════════╝' },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [state, setState] = useState({ cwd: '/home/devops', history: [] as string[] });
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const newState = { ...state, history: [...state.history, cmd] };
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    // Add input line
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: `${state.cwd === '/home/devops' ? '~' : state.cwd}$ ${cmd}` },
    ];

    if (command === 'clear') {
      setLines([]);
      setState(newState);
      setInput('');
      return;
    }

    const handler = commandResponses[command];
    if (handler) {
      const result = handler(args, newState);
      if (result) {
        newLines.push({ type: 'output', content: result });
      }
    } else {
      newLines.push({ type: 'error', content: `bash: ${command}: commande introuvable. Tapez 'help' pour la liste des commandes.` });
    }

    setLines(newLines);
    setState(newState);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const hist = state.history;
      if (hist.length > 0) setInput(hist[hist.length - 1]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const cmds = Object.keys(commandResponses);
      const match = cmds.filter(c => c.startsWith(input));
      if (match.length === 1) setInput(match[0] + ' ');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="section-badge">
            <TerminalIcon size={16} className="text-green-400" />
            Lab Interactif
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Terminal <span className="gradient-text">Linux</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Pratiquez les commandes Linux, Docker et Kubernetes dans un environnement simulé interactif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Exercises */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-primary-400" /> Exercices Guidés
              </h3>
              <div className="space-y-2">
                {labExercises.map(lab => (
                  <button
                    key={lab.id}
                    onClick={() => setSelectedLab(selectedLab === lab.id ? null : lab.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${
                      selectedLab === lab.id ? 'bg-primary-500/20 border border-primary-500/30 text-primary-400' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {lab.title}
                  </button>
                ))}
              </div>
            </div>

            {selectedLab && (
              <div className="card border-primary-500/20">
                <h4 className="font-bold text-white text-xs mb-2">Tâches à réaliser :</h4>
                <ul className="space-y-1.5">
                  {labExercises.find(l => l.id === selectedLab)?.tasks.map((task, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                      <ChevronRight size={12} className="text-primary-400 flex-shrink-0 mt-0.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* External Labs */}
            <div className="card">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <Monitor size={16} className="text-secondary-400" /> Labs Live (Externes)
              </h3>
              <div className="space-y-2">
                <a href="https://labs.play-with-docker.com/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 hover:bg-blue-500/20 transition-all">
                  <span>🐳 Play with Docker</span>
                  <ExternalLink size={12} />
                </a>
                <a href="https://killercoda.com/playgrounds/scenario/kubernetes" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 hover:bg-purple-500/20 transition-all">
                  <span>☸️ Killercoda K8s</span>
                  <ExternalLink size={12} />
                </a>
                <a href="https://shell.cloud.google.com/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400 hover:bg-green-500/20 transition-all">
                  <span>☁️ Google Cloud Shell</span>
                  <ExternalLink size={12} />
                </a>
                <a href="https://killercoda.com/playgrounds/scenario/ubuntu" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400 hover:bg-orange-500/20 transition-all">
                  <span>🐧 Ubuntu Playground</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Local Setup Guide */}
            <div className="card">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <Download size={16} className="text-accent-400" /> Lab en Local
              </h3>
              <p className="text-xs text-gray-500 mb-2">Lancez votre propre lab :</p>
              <div className="space-y-1.5 text-xs">
                <code className="block p-2 rounded bg-gray-900 text-green-400 font-mono">docker run -it ubuntu bash</code>
                <code className="block p-2 rounded bg-gray-900 text-green-400 font-mono">multipass launch --name lab</code>
                <code className="block p-2 rounded bg-gray-900 text-green-400 font-mono">vagrant init ubuntu/jammy64</code>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-gray-700 overflow-hidden shadow-2xl shadow-black/20">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2 font-mono">devops@lab-devops-expert: {state.cwd === '/home/devops' ? '~' : state.cwd}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLines([])} className="p-1 hover:bg-gray-700 rounded" title="Clear">
                    <RotateCcw size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div
                ref={terminalRef}
                className="bg-gray-950 p-4 h-[500px] overflow-y-auto font-mono text-sm cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap mb-0.5 ${
                    line.type === 'input' ? 'text-white' :
                    line.type === 'error' ? 'text-red-400' :
                    line.type === 'system' ? 'text-cyan-400' :
                    'text-gray-300'
                  }`}>
                    {line.type === 'input' && <span className="text-green-400">devops@lab</span>}
                    {line.type === 'input' && <span className="text-white">:</span>}
                    {line.type === 'input' && <span className="text-blue-400">{line.content.split('$')[0]}$</span>}
                    {line.type === 'input' && <span className="text-white">{line.content.split('$').slice(1).join('$')}</span>}
                    {line.type !== 'input' && line.content}
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center">
                  <span className="text-green-400">devops@lab</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">{state.cwd === '/home/devops' ? '~' : state.cwd}$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white ml-1 font-mono text-sm"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 card border-green-500/20 bg-green-500/5 !p-4">
              <p className="text-xs text-green-400 flex items-center gap-2">
                <Play size={12} /> <strong>Astuces :</strong> Flèche ↑ = historique • Tab = auto-complétion • Tapez <code className="px-1 bg-gray-800 rounded">help</code> pour la liste des commandes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
