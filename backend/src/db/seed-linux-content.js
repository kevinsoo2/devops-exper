/**
 * Seed rich lesson content with real commands for Linux/System courses.
 * Updates existing lessons with comprehensive command content.
 */
async function seedLinuxContent(db) {
  console.log('\n📖 Mise à jour du contenu des cours Linux avec commandes complètes...');

  // Get all lessons from system courses that need content
  const courses = await db.execute({
    sql: `SELECT c.id, c.slug, c.title FROM courses c WHERE c.category IN ('systeme', 'network') AND c.is_published = 1`,
    args: []
  });

  let updatedCount = 0;

  for (const course of courses.rows) {
    const chapters = await db.execute({
      sql: `SELECT id, title, order_index FROM chapters WHERE course_id = ? ORDER BY order_index`,
      args: [course.id]
    });

    for (const chapter of chapters.rows) {
      const lessons = await db.execute({
        sql: `SELECT id, title, order_index FROM lessons WHERE chapter_id = ? ORDER BY order_index`,
        args: [chapter.id]
      });

      for (const lesson of lessons.rows) {
        const content = generateLinuxLessonContent(course.slug, chapter.title, lesson.title, lesson.order_index);
        if (content) {
          await db.execute({
            sql: `UPDATE lessons SET content = ? WHERE id = ?`,
            args: [content, lesson.id]
          });
          updatedCount++;
        }
      }
    }
  }

  console.log(`  ✅ ${updatedCount} leçons mises à jour avec du contenu commandes`);
}

function generateLinuxLessonContent(courseSlug, chapterTitle, lessonTitle, orderIndex) {
  const title = (chapterTitle + ' ' + lessonTitle).toLowerCase();
  
  // Generate content based on context
  let content = `# ${lessonTitle}\n\n`;

  // ===== GESTION DES FICHIERS =====
  if (title.includes('fichier') || title.includes('répertoire') || title.includes('navigation') || title.includes('manipulation')) {
    content += `## Commandes de Navigation et Fichiers

### Navigation dans le système de fichiers

\`\`\`bash
pwd                              # Afficher le répertoire courant
cd /var/log                      # Aller dans /var/log
cd ~                             # Retour au home directory
cd -                             # Retour au répertoire précédent
cd ..                            # Remonter d'un niveau
\`\`\`

### Lister les fichiers

\`\`\`bash
ls                               # Liste simple
ls -la                           # Liste détaillée (permissions, taille, date)
ls -lh                           # Taille en format humain (Ko, Mo, Go)
ls -ltr                          # Trié par date de modification (récent en bas)
ls -laR /etc                     # Récursif
ls -ld /var                      # Infos sur le dossier lui-même
ls -i                            # Afficher les inodes
\`\`\`

### Créer, copier, déplacer, supprimer

\`\`\`bash
mkdir -p /data/app/logs          # Créer l'arborescence complète
touch fichier.txt                # Créer un fichier vide
cp fichier.txt /backup/          # Copier
cp -a /source /dest              # Copie avec préservation des attributs
cp -r dossier/ /backup/          # Copie récursive
mv ancien.txt nouveau.txt        # Renommer
mv fichier.txt /tmp/             # Déplacer
rm fichier.txt                   # Supprimer
rm -rf /tmp/old/                 # Suppression récursive forcée
rmdir dossier_vide/              # Supprimer un dossier vide
\`\`\`

### Recherche de fichiers

\`\`\`bash
find / -name "*.conf"                    # Par nom
find / -name "*.log" -size +100M         # Fichiers > 100Mo
find / -user root -type f                # Fichiers de root
find / -mtime -7                         # Modifiés dans les 7 derniers jours
find / -perm -4000 -type f               # Fichiers SUID
find /var -name "*.log" -exec rm {} \\;   # Trouver et supprimer
find / -empty -type d                    # Dossiers vides
locate httpd.conf                        # Recherche rapide (base updatedb)
which python3                            # Chemin d'un exécutable
whereis nginx                            # Binaire + man + source
\`\`\`

### Liens

\`\`\`bash
ln -s /var/www/html /web         # Lien symbolique
ln /fichier /lien_dur            # Lien dur (même inode)
readlink -f /web                 # Résoudre un lien symbolique
\`\`\`

### Informations sur les fichiers

\`\`\`bash
file document.pdf                # Type de fichier
stat fichier.txt                 # Métadonnées complètes
du -sh /var/log                  # Taille d'un dossier
du -h --max-depth=1 /           # Taille de chaque sous-dossier
df -h                            # Espace disque des partitions
df -i                            # Utilisation des inodes
\`\`\`

:::tip
Utilisez \`tree -L 2 /etc\` pour visualiser l'arborescence sur 2 niveaux (installer avec \`apt install tree\` ou \`dnf install tree\`).
:::
`;
  }

  // ===== PERMISSIONS =====
  else if (title.includes('permission') || title.includes('chmod') || title.includes('propriét') || title.includes('acl')) {
    content += `## Permissions Linux - Commandes Complètes

### Comprendre les permissions

\`\`\`bash
# Format : -rwxr-xr-x  owner group  size  date  filename
# r=read(4) w=write(2) x=execute(1)
# Positions : [type][owner][group][others]
\`\`\`

### chmod - Changer les permissions

\`\`\`bash
# Notation octale
chmod 755 script.sh              # rwxr-xr-x (standard pour scripts)
chmod 644 config.txt             # rw-r--r-- (standard pour fichiers)
chmod 700 secret/                # rwx------ (privé)
chmod 777 /tmp/shared            # rwxrwxrwx (tout le monde, DANGEREUX)
chmod 600 ~/.ssh/id_rsa          # rw------- (clés SSH)
chmod 400 /etc/shadow            # r-------- (lecture seule root)

# Notation symbolique
chmod u+x script.sh              # Ajouter exécution pour owner
chmod g+rw fichier.txt           # Ajouter lecture+écriture pour group
chmod o-rwx secret.txt           # Retirer tout pour others
chmod a+r public.txt             # Ajouter lecture pour all
chmod -R 755 /var/www            # Récursif
\`\`\`

### Permissions spéciales (SUID, SGID, Sticky)

\`\`\`bash
chmod u+s /usr/bin/passwd        # SUID - s'exécute en tant que owner
chmod g+s /shared/               # SGID - hérite du groupe parent
chmod +t /tmp/                   # Sticky - seul le propriétaire supprime

# En octal
chmod 4755 /usr/bin/cmd          # SUID (4xxx)
chmod 2770 /shared/              # SGID (2xxx)
chmod 1777 /tmp/                 # Sticky (1xxx)

# Vérifier les fichiers SUID
find / -perm -4000 -type f 2>/dev/null
\`\`\`

### chown / chgrp - Propriété

\`\`\`bash
chown user:group fichier         # Changer owner et group
chown -R www-data:www-data /web  # Récursif
chown user fichier               # Changer uniquement le owner
chgrp devops /project            # Changer le groupe uniquement
\`\`\`

### ACL (Access Control Lists)

\`\`\`bash
getfacl /shared                  # Voir les ACLs
setfacl -m u:sarah:rwx /data     # ACL pour un utilisateur
setfacl -m g:devops:rx /data     # ACL pour un groupe
setfacl -m d:u:sarah:rwx /data   # ACL par défaut (héritage nouveaux fichiers)
setfacl -x u:sarah /data         # Supprimer une ACL
setfacl -b /data                 # Supprimer TOUTES les ACLs
setfacl -R -m g:team:rx /project # ACL récursive
\`\`\`

### umask

\`\`\`bash
umask                            # Afficher le umask courant
umask 022                        # Fichiers: 644, Dossiers: 755
umask 077                        # Fichiers: 600, Dossiers: 700
# Persistant : ajouter dans ~/.bashrc ou /etc/profile
\`\`\`
`;
  }

  // ===== UTILISATEURS ET GROUPES =====
  else if (title.includes('utilisat') || title.includes('user') || title.includes('groupe') || title.includes('authentif')) {
    content += `## Gestion des Utilisateurs et Groupes

### Créer et gérer des utilisateurs

\`\`\`bash
useradd -m -s /bin/bash user1          # Créer avec home et shell bash
useradd -m -u 1500 -g devops user2     # UID spécifique + groupe primaire
useradd -m -G wheel,docker user3       # Groupes secondaires
useradd -m -d /opt/app -s /sbin/nologin svc_app  # Compte de service

usermod -aG wheel user1                # Ajouter au groupe sudo
usermod -aG docker user1               # Ajouter au groupe docker
usermod -s /sbin/nologin user2         # Désactiver le login
usermod -L user1                       # Verrouiller le compte
usermod -U user1                       # Déverrouiller
usermod -d /new/home -m user1          # Changer le home (déplacer les fichiers)
usermod -l newname oldname             # Renommer un utilisateur

userdel user1                          # Supprimer (garde le home)
userdel -r user1                       # Supprimer avec home et mail

passwd user1                           # Définir/changer le mot de passe
passwd -l user1                        # Verrouiller par mot de passe
passwd -u user1                        # Déverrouiller
passwd -e user1                        # Forcer le changement au prochain login
\`\`\`

### Politique de mots de passe (chage)

\`\`\`bash
chage -l user1                         # Voir la politique
chage -M 90 user1                      # Expiration tous les 90 jours
chage -m 7 user1                       # Minimum 7 jours entre changements
chage -W 14 user1                      # Avertissement 14 jours avant
chage -I 30 user1                      # Inactif 30 jours après expiration
chage -E 2026-12-31 user1             # Date d'expiration du compte
chage -d 0 user1                       # Forcer changement immédiat
\`\`\`

### Groupes

\`\`\`bash
groupadd devops                        # Créer un groupe
groupadd -g 2000 dba                   # Avec GID spécifique
groupmod -n newname oldname            # Renommer
groupdel oldgroup                      # Supprimer
gpasswd -a user1 devops               # Ajouter au groupe
gpasswd -d user1 devops               # Retirer du groupe
gpasswd -A user1 devops               # Définir un admin de groupe
id user1                               # UID, GID, groupes
groups user1                           # Groupes d'un utilisateur
\`\`\`

### Fichiers importants

\`\`\`bash
cat /etc/passwd                        # Comptes (user:x:UID:GID:comment:home:shell)
cat /etc/shadow                        # Mots de passe hashés
cat /etc/group                         # Groupes (group:x:GID:members)
cat /etc/gshadow                       # Mots de passe de groupes
cat /etc/login.defs                    # Politique par défaut (UID_MIN, PASS_MAX_DAYS)
ls /etc/skel/                          # Squelette des nouveaux homes
\`\`\`

### Commandes d'information

\`\`\`bash
whoami                                 # Utilisateur courant
id                                     # UID, GID, groupes complets
who                                    # Utilisateurs connectés
w                                      # Utilisateurs + activité
last                                   # Historique des connexions
lastlog                                # Dernière connexion de chaque user
finger user1                           # Infos détaillées (si installé)
\`\`\`
`;
  }

  // ===== PROCESSUS =====
  else if (title.includes('process') || title.includes('signal') || title.includes('priorit')) {
    content += `## Gestion des Processus

### Visualiser les processus

\`\`\`bash
ps aux                                 # Tous les processus (format BSD)
ps -ef                                 # Tous les processus (format System V)
ps aux --sort=-%mem | head -10         # Top 10 par mémoire
ps aux --sort=-%cpu | head -10         # Top 10 par CPU
ps -eo pid,ppid,user,%cpu,%mem,comm    # Format personnalisé
ps -p 1234                             # Info d'un PID spécifique
ps -C nginx                            # Processus par nom
pstree -p                              # Arbre des processus
\`\`\`

### Monitoring temps réel

\`\`\`bash
top                                    # Monitoring interactif
htop                                   # Version améliorée (installer)
top -bn1 | head -20                    # Non-interactif (pour scripts)
# Dans top : P=trier CPU, M=trier RAM, k=kill, q=quitter
\`\`\`

### Signaux et kill

\`\`\`bash
kill PID                               # SIGTERM (15) - arrêt propre
kill -9 PID                            # SIGKILL (9) - arrêt forcé
kill -HUP PID                          # SIGHUP (1) - reload config
kill -STOP PID                         # Suspendre
kill -CONT PID                         # Reprendre
killall nginx                          # Tuer par nom de processus
pkill -f "python app.py"              # Tuer par pattern
\`\`\`

### Priorité (nice/renice)

\`\`\`bash
nice -n 10 ./backup.sh                 # Lancer avec priorité basse
nice -n -5 ./critical.sh               # Priorité haute (root requis)
renice -5 -p 1234                      # Changer la priorité d'un PID
renice 10 -u user1                     # Baisser priorité de tous les procs d'un user
# nice va de -20 (haute priorité) à +19 (basse)
\`\`\`

### Background / Foreground

\`\`\`bash
command &                              # Lancer en arrière-plan
nohup ./longscript.sh &               # Survit à la déconnexion
disown %1                              # Détacher du terminal
jobs                                   # Lister les jobs
fg %1                                  # Ramener au premier plan
bg %1                                  # Envoyer en arrière-plan
Ctrl+Z                                 # Suspendre le processus courant
\`\`\`

### Infos sur les processus

\`\`\`bash
lsof -p 1234                           # Fichiers ouverts par un PID
lsof -i :8080                          # Quel processus utilise le port 8080
strace -p 1234                         # Tracer les appels système
/proc/1234/status                      # Infos kernel d'un processus
/proc/1234/fd/                         # File descriptors ouverts
\`\`\`
`;
  }

  // ===== RÉSEAU =====
  else if (title.includes('réseau') || title.includes('network') || title.includes('interface') || title.includes('ip') || title.includes('dns') || title.includes('routage')) {
    content += `## Commandes Réseau Linux

### Configuration des interfaces

\`\`\`bash
ip addr show                           # Toutes les interfaces et IPs
ip addr show eth0                      # Interface spécifique
ip link show                           # État des interfaces
ip link set eth0 up                    # Activer une interface
ip link set eth0 down                  # Désactiver
ip addr add 192.168.1.10/24 dev eth0   # Ajouter une IP
ip addr del 192.168.1.10/24 dev eth0   # Supprimer une IP
\`\`\`

### Routage

\`\`\`bash
ip route show                          # Table de routage
ip route add default via 192.168.1.1   # Route par défaut
ip route add 10.0.0.0/8 via 192.168.1.254  # Route statique
ip route del 10.0.0.0/8               # Supprimer une route
traceroute 8.8.8.8                     # Tracer le chemin réseau
\`\`\`

### DNS

\`\`\`bash
cat /etc/resolv.conf                   # Serveurs DNS configurés
dig google.com                         # Requête DNS complète
dig +short google.com                  # IP uniquement
dig MX gmail.com                       # Enregistrements MX
nslookup google.com                    # Résolution (ancien)
host google.com                        # Résolution rapide
resolvectl status                      # Status systemd-resolved
\`\`\`

### Diagnostic réseau

\`\`\`bash
ping -c 4 8.8.8.8                      # Test connectivité (4 paquets)
ping6 ::1                              # Ping IPv6
traceroute google.com                  # Chemin réseau
mtr google.com                         # Traceroute + ping continu
\`\`\`

### Ports et connexions

\`\`\`bash
ss -tlnp                               # Ports TCP en écoute + PID
ss -ulnp                               # Ports UDP en écoute
ss -s                                  # Statistiques réseau
ss -t state established                # Connexions établies
netstat -tlnp                          # Alternative (deprecated)
lsof -i :80                            # Processus sur le port 80
lsof -i -P -n                         # Toutes les connexions
\`\`\`

### NetworkManager (nmcli)

\`\`\`bash
nmcli con show                         # Lister les connexions
nmcli con show eth0                    # Détails d'une connexion
nmcli con mod eth0 ipv4.addresses 192.168.1.10/24
nmcli con mod eth0 ipv4.gateway 192.168.1.1
nmcli con mod eth0 ipv4.dns "8.8.8.8 8.8.4.4"
nmcli con mod eth0 ipv4.method manual
nmcli con up eth0                      # Appliquer
nmcli con add type ethernet con-name office ifname eth1 ip4 10.0.0.5/24 gw4 10.0.0.1
nmcli device wifi list                 # Scanner les WiFi
nmcli device wifi connect SSID password "pass"
\`\`\`

### Firewall (firewalld)

\`\`\`bash
firewall-cmd --state                   # État du firewall
firewall-cmd --list-all                # Règles de la zone active
firewall-cmd --get-zones               # Zones disponibles
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept'
firewall-cmd --reload                  # Appliquer les changements
\`\`\`

### Transfert de fichiers

\`\`\`bash
scp file.txt user@host:/path/          # Copie sécurisée
scp -r dossier/ user@host:/path/       # Récursif
rsync -avz /data/ user@host:/backup/   # Synchronisation
rsync -avz --delete /src/ /dest/       # Sync avec suppression
curl -O https://example.com/file       # Télécharger un fichier
wget https://example.com/file          # Alternative wget
\`\`\`

### Capture de paquets

\`\`\`bash
tcpdump -i eth0                        # Capturer tout sur eth0
tcpdump -i eth0 port 80                # Uniquement port 80
tcpdump -i eth0 host 192.168.1.10      # Uniquement cette IP
tcpdump -i eth0 -w capture.pcap        # Sauvegarder dans un fichier
tcpdump -r capture.pcap                # Lire un fichier
\`\`\`
`;
  }

  // ===== SERVICES SYSTEMD =====
  else if (title.includes('service') || title.includes('systemd') || title.includes('systemctl') || title.includes('démon')) {
    content += `## Services et Systemd

### Gestion des services

\`\`\`bash
systemctl start nginx                  # Démarrer
systemctl stop nginx                   # Arrêter
systemctl restart nginx                # Redémarrer
systemctl reload nginx                 # Recharger la config (sans redémarrer)
systemctl status nginx                 # État détaillé
systemctl enable nginx                 # Activer au boot
systemctl disable nginx                # Désactiver au boot
systemctl enable --now nginx           # Activer + démarrer
systemctl is-active nginx              # Vérifier si actif
systemctl is-enabled nginx             # Vérifier si activé au boot
systemctl mask nginx                   # Empêcher tout démarrage
systemctl unmask nginx                 # Autoriser à nouveau
systemctl daemon-reload                # Relire les unit files modifiés
\`\`\`

### Targets (niveaux de démarrage)

\`\`\`bash
systemctl get-default                  # Target actuel
systemctl set-default multi-user.target     # Mode texte (sans GUI)
systemctl set-default graphical.target      # Mode graphique
systemctl isolate rescue.target             # Mode rescue (maintenance)
systemctl isolate emergency.target          # Mode urgence (minimal)
\`\`\`

### Journaux (journalctl)

\`\`\`bash
journalctl                             # Tous les logs
journalctl -u nginx                    # Logs d'un service
journalctl -u nginx -f                 # Suivre en temps réel
journalctl -u nginx --since today      # Depuis aujourd'hui
journalctl -u nginx --since "1 hour ago"
journalctl -p err                      # Uniquement les erreurs
journalctl -p warning..err             # Warning et erreurs
journalctl -b                          # Depuis le dernier boot
journalctl -b -1                       # Boot précédent
journalctl --disk-usage                # Espace utilisé par les logs
journalctl --vacuum-size=500M          # Nettoyer à 500Mo max
\`\`\`

### Créer un service personnalisé

\`\`\`bash
# /etc/systemd/system/myapp.service
[Unit]
Description=Mon Application Web
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=appuser
Group=appuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/run.sh
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
systemctl daemon-reload                # Après création/modification
systemctl enable --now myapp           # Activer + démarrer
\`\`\`

### Timers systemd (remplace cron)

\`\`\`bash
# /etc/systemd/system/backup.timer
[Unit]
Description=Backup quotidien

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
\`\`\`

\`\`\`bash
systemctl list-timers                  # Voir tous les timers
systemctl enable --now backup.timer
\`\`\`
`;
  }

  // ===== PACKAGES =====
  else if (title.includes('package') || title.includes('paquet') || title.includes('dnf') || title.includes('apt') || title.includes('install')) {
    content += `## Gestion des Packages

### DNF / YUM (Red Hat, CentOS, Fedora, Rocky, Alma)

\`\`\`bash
dnf install nginx                      # Installer
dnf install -y nginx php postgresql    # Sans confirmation, multiples
dnf remove nginx                       # Désinstaller
dnf update                             # Mettre à jour tout
dnf update nginx                       # Mettre à jour un package
dnf search "web server"                # Chercher
dnf info nginx                         # Informations détaillées
dnf list installed                     # Packages installés
dnf list available | grep python       # Disponibles filtrés
dnf provides /etc/nginx/nginx.conf     # Quel package fournit ce fichier
dnf history                            # Historique des transactions
dnf history undo 5                     # Annuler une transaction
dnf clean all                          # Nettoyer le cache
dnf makecache                          # Reconstruire le cache
\`\`\`

### APT (Debian, Ubuntu)

\`\`\`bash
apt update                             # Mettre à jour la liste des packages
apt upgrade                            # Mettre à jour les packages
apt full-upgrade                       # Upgrade avec gestion des dépendances
apt install nginx                      # Installer
apt remove nginx                       # Désinstaller (garde la config)
apt purge nginx                        # Supprimer + config
apt autoremove                         # Supprimer les dépendances orphelines
apt search nginx                       # Chercher
apt show nginx                         # Informations
apt list --installed                   # Packages installés
dpkg -l | grep nginx                   # Liste avec dpkg
dpkg -L nginx                          # Fichiers d'un package
dpkg -S /etc/nginx/nginx.conf          # Quel package possède ce fichier
apt-cache policy nginx                 # Versions disponibles
\`\`\`

### Repositories

\`\`\`bash
# Red Hat / dnf
dnf repolist                           # Repos actifs
dnf config-manager --add-repo URL
dnf config-manager --enable repo_name
# Fichier : /etc/yum.repos.d/custom.repo
[custom]
name=Custom Repo
baseurl=http://repo.example.com/el9/
enabled=1
gpgcheck=1

# Debian / apt
add-apt-repository ppa:nginx/stable   # Ajouter un PPA (Ubuntu)
# Fichier : /etc/apt/sources.list.d/custom.list
deb http://repo.example.com/ubuntu jammy main
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys KEY_ID
\`\`\`

### Groupes de packages

\`\`\`bash
dnf group list                         # Lister les groupes
dnf group install "Development Tools"  # Installer un groupe
dnf group install "Server with GUI"
\`\`\`
`;
  }

  // ===== DEFAULT: generic but with some commands =====
  else {
    content += `## ${lessonTitle}

Cette leçon couvre les concepts et commandes essentielles de cette section.

:::info
Pratiquez chaque commande dans un environnement de test avant de les utiliser en production.
:::

### Commandes utiles pour cette section

\`\`\`bash
# Vérifier la version du système
cat /etc/os-release
uname -a
hostnamectl

# Informations système
uptime
free -h
df -h
lscpu
lsblk
\`\`\`

### Bonnes pratiques

- Toujours tester les commandes dans un environnement de développement
- Documenter les changements effectués
- Utiliser des scripts pour les tâches répétitives
- Vérifier les logs après chaque modification : \`journalctl -xe\`
`;
  }

  return content;
}

module.exports = { seedLinuxContent };
