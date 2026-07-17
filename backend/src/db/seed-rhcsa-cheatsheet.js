/**
 * Seed RHCSA EX200 Commands Cheatsheet
 */
async function seedRhcsaCheatsheet(db) {
  console.log('\n📋 Insertion de la fiche RHCSA EX200...');

  const content = `# Commandes RHCSA EX200 - Fiche Complète

## 1. Gestion des Fichiers et Répertoires

### Navigation et manipulation
\`\`\`bash
pwd                          # Afficher le répertoire courant
cd /etc                      # Changer de répertoire
ls -la                       # Liste détaillée (permissions, propriétaire)
ls -lhR /var                 # Liste récursive avec tailles lisibles
\`\`\`

### Copie, déplacement, suppression
\`\`\`bash
cp -a /src /dest             # Copie avec préservation des attributs
cp -r dossier/ /backup/      # Copie récursive
mv fichier.txt /tmp/         # Déplacer/renommer
rm -rf /tmp/old/             # Suppression récursive forcée
mkdir -p /data/app/logs      # Créer l'arborescence complète
\`\`\`

### Recherche de fichiers
\`\`\`bash
find / -name "*.conf"              # Chercher par nom
find / -user root -type f          # Fichiers appartenant à root
find / -size +100M                 # Fichiers > 100 Mo
find / -mtime -7                   # Modifiés dans les 7 derniers jours
find / -perm -4000                 # Fichiers SUID
locate httpd.conf                  # Recherche rapide (updatedb)
which python3                      # Chemin d'un exécutable
\`\`\`

### Liens
\`\`\`bash
ln -s /target /link          # Lien symbolique (soft link)
ln /target /link             # Lien dur (hard link)
readlink -f /link            # Résoudre un lien symbolique
\`\`\`

---

## 2. Permissions et Propriété

### Permissions de base
\`\`\`bash
chmod 755 script.sh          # rwxr-xr-x
chmod 644 config.txt         # rw-r--r--
chmod u+x,g+r,o-w file      # Notation symbolique
chmod -R 750 /data/          # Récursif
\`\`\`

### Permissions spéciales
\`\`\`bash
chmod u+s /usr/bin/cmd       # SUID (exécuter en tant que propriétaire)
chmod g+s /shared/           # SGID (hériter du groupe)
chmod +t /tmp/               # Sticky Bit (seul le propriétaire supprime)
chmod 4755 /usr/bin/cmd      # SUID en octal
chmod 2770 /shared/          # SGID en octal
chmod 1777 /tmp/             # Sticky en octal
\`\`\`

### Propriété
\`\`\`bash
chown user:group file        # Changer propriétaire et groupe
chown -R apache:apache /web  # Récursif
chgrp devops /project        # Changer uniquement le groupe
\`\`\`

### ACL (Access Control Lists)
\`\`\`bash
getfacl /shared              # Voir les ACLs
setfacl -m u:sarah:rwx /data # Ajouter ACL pour un user
setfacl -m g:devops:rx /data # Ajouter ACL pour un groupe
setfacl -m d:u:sarah:rwx /d  # ACL par défaut (héritage)
setfacl -x u:sarah /data     # Supprimer une ACL
setfacl -b /data             # Supprimer toutes les ACLs
\`\`\`

---

## 3. Gestion des Utilisateurs et Groupes

### Utilisateurs
\`\`\`bash
useradd -m -s /bin/bash user1      # Créer avec home et shell
useradd -u 1500 -g devops user2    # UID et groupe primaire
useradd -G wheel,docker user3      # Groupes supplémentaires
usermod -aG wheel user1            # Ajouter au groupe wheel (sudo)
usermod -L user1                   # Verrouiller le compte
usermod -U user1                   # Déverrouiller le compte
usermod -s /sbin/nologin user1     # Désactiver le login
userdel -r user1                   # Supprimer avec home
passwd user1                       # Définir le mot de passe
chage -l user1                     # Voir la politique de mot de passe
chage -M 90 user1                  # Expiration dans 90 jours
chage -E 2026-12-31 user1          # Date d'expiration du compte
\`\`\`

### Groupes
\`\`\`bash
groupadd devops                    # Créer un groupe
groupadd -g 2000 dba               # Avec GID spécifique
groupmod -n newname oldname        # Renommer
groupdel oldgroup                  # Supprimer
gpasswd -a user1 devops            # Ajouter au groupe
gpasswd -d user1 devops            # Retirer du groupe
id user1                           # Voir UID, GID, groupes
\`\`\`

### Fichiers importants
\`\`\`bash
/etc/passwd                  # Comptes utilisateurs
/etc/shadow                  # Mots de passe hashés
/etc/group                   # Définitions des groupes
/etc/login.defs              # Politiques par défaut
/etc/skel/                   # Squelette du home directory
\`\`\`

---

## 4. Gestion du Stockage (LVM, Partitions, FS)

### Partitionnement
\`\`\`bash
lsblk                        # Voir les disques et partitions
fdisk /dev/sdb               # Partitionner (MBR)
gdisk /dev/sdb               # Partitionner (GPT)
parted /dev/sdb print        # Voir la table de partitions
partprobe                    # Relire la table sans reboot
\`\`\`

### LVM (Logical Volume Manager)
\`\`\`bash
# Créer l'infrastructure LVM
pvcreate /dev/sdb1 /dev/sdc1          # Physical Volumes
vgcreate datavg /dev/sdb1 /dev/sdc1   # Volume Group
lvcreate -L 10G -n datalv datavg      # Logical Volume (taille fixe)
lvcreate -l 100%FREE -n datalv datavg # Utiliser tout l'espace

# Étendre un LV
lvextend -L +5G /dev/datavg/datalv    # Ajouter 5G
lvextend -l +100%FREE /dev/datavg/datalv
xfs_growfs /mount/point               # Étendre XFS (en ligne)
resize2fs /dev/datavg/datalv          # Étendre ext4

# Diagnostics
pvs                          # Résumé Physical Volumes
vgs                          # Résumé Volume Groups
lvs                          # Résumé Logical Volumes
pvdisplay                    # Détails PV
vgdisplay                    # Détails VG
lvdisplay                    # Détails LV
\`\`\`

### Systèmes de fichiers
\`\`\`bash
mkfs.xfs /dev/datavg/datalv           # Créer FS XFS
mkfs.ext4 /dev/datavg/datalv          # Créer FS ext4
mkswap /dev/sdb2                      # Créer swap
swapon /dev/sdb2                      # Activer swap

# Montage
mount /dev/datavg/datalv /data        # Monter
umount /data                          # Démonter
mount -a                              # Monter tout depuis fstab

# Montage persistant (/etc/fstab)
/dev/datavg/datalv  /data  xfs  defaults  0 0
UUID=xxx            /data  ext4 defaults  0 2
\`\`\`

### Swap
\`\`\`bash
mkswap /dev/sdb2              # Formater en swap
swapon /dev/sdb2              # Activer
swapon --show                 # Voir les swaps actifs
# Dans /etc/fstab :
/dev/sdb2  swap  swap  defaults  0 0
\`\`\`

---

## 5. Réseau

### Configuration réseau
\`\`\`bash
ip addr show                         # Voir les interfaces
ip route show                        # Table de routage
nmcli con show                       # Connexions NetworkManager
nmcli con mod eth0 ipv4.addresses 192.168.1.10/24
nmcli con mod eth0 ipv4.gateway 192.168.1.1
nmcli con mod eth0 ipv4.dns "8.8.8.8 8.8.4.4"
nmcli con mod eth0 ipv4.method manual
nmcli con up eth0                    # Appliquer
nmcli con add type ethernet con-name new ifname eth1 ip4 10.0.0.5/24
\`\`\`

### Hostname
\`\`\`bash
hostnamectl set-hostname server1.lab.example.com
hostnamectl status
/etc/hostname                # Fichier hostname
\`\`\`

### DNS
\`\`\`bash
/etc/resolv.conf             # Configuration DNS
nmcli con mod eth0 ipv4.dns "8.8.8.8"
dig +short google.com        # Test DNS
nslookup google.com          # Résolution
\`\`\`

---

## 6. Firewall (firewalld)

\`\`\`bash
# État et zones
systemctl status firewalld
firewall-cmd --state
firewall-cmd --get-default-zone
firewall-cmd --get-active-zones
firewall-cmd --list-all

# Ajouter des services (permanent)
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-service=ssh

# Ajouter des ports
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --permanent --add-port=3000-3100/tcp

# Supprimer
firewall-cmd --permanent --remove-service=ftp
firewall-cmd --permanent --remove-port=8080/tcp

# Rich rules
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="http" accept'

# Appliquer les changements
firewall-cmd --reload

# Port forwarding
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080
\`\`\`

---

## 7. SELinux

\`\`\`bash
# Modes
getenforce                   # Voir le mode (Enforcing/Permissive/Disabled)
setenforce 0                 # Passer en Permissive (temporaire)
setenforce 1                 # Passer en Enforcing (temporaire)
# Persistant : /etc/selinux/config → SELINUX=enforcing

# Contextes
ls -Z /var/www               # Voir le contexte SELinux des fichiers
ps -eZ | grep httpd          # Contexte des processus
chcon -t httpd_sys_content_t /web/index.html  # Changer le type
restorecon -Rv /var/www      # Restaurer le contexte par défaut
semanage fcontext -a -t httpd_sys_content_t "/web(/.*)?"
restorecon -Rv /web          # Appliquer après semanage

# Booleans
getsebool -a                 # Voir tous les booleans
getsebool httpd_can_network_connect
setsebool -P httpd_can_network_connect on   # -P = persistant

# Ports
semanage port -l | grep http   # Ports autorisés pour httpd
semanage port -a -t http_port_t -p tcp 8888  # Ajouter port

# Troubleshooting
ausearch -m AVC -ts recent                 # Voir les denials
sealert -a /var/log/audit/audit.log        # Analyse détaillée
journalctl -t setroubleshoot               # Messages setroubleshoot
\`\`\`

---

## 8. Services avec systemd

\`\`\`bash
# Gestion des services
systemctl start httpd        # Démarrer
systemctl stop httpd         # Arrêter
systemctl restart httpd      # Redémarrer
systemctl reload httpd       # Recharger la config
systemctl status httpd       # État détaillé
systemctl enable httpd       # Activer au boot
systemctl disable httpd      # Désactiver au boot
systemctl enable --now httpd # Activer + démarrer
systemctl is-active httpd    # Vérifie si actif
systemctl is-enabled httpd   # Vérifie si activé au boot
systemctl mask httpd         # Bloquer complètement
systemctl unmask httpd       # Débloquer

# Cibles (targets)
systemctl get-default                # Target par défaut
systemctl set-default multi-user.target   # Mode texte
systemctl set-default graphical.target    # Mode graphique
systemctl isolate rescue.target           # Mode rescue

# Journaux
journalctl -u httpd          # Logs d'un service
journalctl -u httpd -f       # En temps réel
journalctl --since today     # Depuis aujourd'hui
journalctl -p err            # Uniquement les erreurs
journalctl -b                # Depuis le dernier boot
\`\`\`

---

## 9. Planification des Tâches (cron & at)

### cron
\`\`\`bash
crontab -e                   # Éditer la crontab
crontab -l                   # Lister
crontab -u user1 -e          # Éditer pour un autre user

# Format : MIN HEURE JOUR MOIS JOUR_SEMAINE commande
*/5 * * * * /script.sh       # Toutes les 5 minutes
0 2 * * * /backup.sh         # Tous les jours à 2h
0 0 * * 0 /weekly.sh         # Chaque dimanche à minuit
30 8 1 * * /monthly.sh       # Le 1er de chaque mois à 8h30

# Fichiers système
/etc/crontab                 # Crontab système
/etc/cron.d/                 # Jobs supplémentaires
/etc/cron.daily/             # Scripts quotidiens
/etc/cron.hourly/            # Scripts horaires
\`\`\`

### at (tâches ponctuelles)
\`\`\`bash
at 14:30                     # Planifier à 14h30
at now + 2 hours             # Dans 2 heures
atq                          # Lister les jobs planifiés
atrm 3                       # Supprimer le job #3
\`\`\`

---

## 10. Gestion des Packages (dnf/yum)

\`\`\`bash
# Installation et mise à jour
dnf install httpd            # Installer un package
dnf install -y nginx         # Sans confirmation
dnf remove httpd             # Désinstaller
dnf update                   # Mettre à jour tout
dnf upgrade                  # Mise à jour (equivalent)

# Recherche et info
dnf search "web server"      # Chercher
dnf info httpd               # Informations détaillées
dnf list installed           # Packages installés
dnf list available           # Packages disponibles
dnf provides /etc/httpd.conf # Quel package fournit ce fichier

# Groupes
dnf group list               # Lister les groupes
dnf group install "Development Tools"
dnf group remove "Development Tools"

# Historique
dnf history                  # Historique des transactions
dnf history undo 5           # Annuler transaction #5

# Repositories
dnf repolist                 # Voir les repos actifs
dnf config-manager --add-repo URL
dnf config-manager --enable repo_name
dnf config-manager --disable repo_name

# Fichier de repo (/etc/yum.repos.d/custom.repo)
[custom-repo]
name=Custom Repository
baseurl=http://repo.example.com/rhel9/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-custom
\`\`\`

---

## 11. Gestion des Processus et Boot

### Processus
\`\`\`bash
ps aux                       # Tous les processus
ps -ef | grep httpd          # Filtrer
top                          # Monitoring interactif
kill PID                     # Terminer (SIGTERM)
kill -9 PID                  # Forcer (SIGKILL)
killall httpd                # Tuer par nom
nice -n 10 ./script.sh       # Priorité basse
renice -5 PID                # Changer la priorité
\`\`\`

### Boot et Recovery
\`\`\`bash
# Réinitialiser le mot de passe root (GRUB)
# 1. Au boot, appuyer sur 'e' dans GRUB
# 2. Ajouter rd.break à la ligne linux
# 3. Ctrl+X pour booter
mount -o remount,rw /sysroot
chroot /sysroot
passwd root
touch /.autorelabel
exit && reboot

# Changer la target de boot
systemctl set-default multi-user.target
\`\`\`

---

## 12. Conteneurs avec Podman

\`\`\`bash
podman search nginx                        # Chercher une image
podman pull registry.access.redhat.com/ubi9/ubi
podman images                              # Lister les images
podman run -d --name web -p 8080:80 nginx  # Lancer un conteneur
podman ps                                  # Conteneurs actifs
podman ps -a                               # Tous les conteneurs
podman logs web                            # Logs
podman exec -it web /bin/bash              # Shell dans le conteneur
podman stop web                            # Arrêter
podman rm web                              # Supprimer
podman rmi nginx                           # Supprimer l'image

# Conteneur en tant que service systemd
podman generate systemd --name web --files --new
cp container-web.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now container-web.service
loginctl enable-linger username            # Persistance après logout
\`\`\`

---

## 13. Archivage et Compression

\`\`\`bash
tar -czf archive.tar.gz /data      # Créer tar.gz
tar -cjf archive.tar.bz2 /data     # Créer tar.bz2
tar -xzf archive.tar.gz            # Extraire tar.gz
tar -xzf archive.tar.gz -C /dest   # Extraire vers destination
tar -tzf archive.tar.gz            # Lister le contenu
gzip file.txt                      # Compresser (.gz)
gunzip file.txt.gz                 # Décompresser
\`\`\`

---

## 14. Tuning et Logging

### Logging
\`\`\`bash
journalctl                         # Tous les logs
journalctl -p err                  # Erreurs uniquement
journalctl --since "2026-01-01" --until "2026-01-31"
journalctl -u sshd -f              # Temps réel
/var/log/messages                  # Logs système (rsyslog)
/var/log/secure                    # Authentification
/var/log/boot.log                  # Boot
\`\`\`

### Persistance des journaux
\`\`\`bash
mkdir -p /var/log/journal
systemctl restart systemd-journald
# Ou dans /etc/systemd/journald.conf :
Storage=persistent
\`\`\`

---

## 15. NFS et Autofs

### Serveur NFS
\`\`\`bash
dnf install nfs-utils
systemctl enable --now nfs-server
# /etc/exports
/shared  192.168.1.0/24(rw,sync,no_root_squash)
exportfs -rav                      # Appliquer
firewall-cmd --permanent --add-service=nfs
firewall-cmd --reload
\`\`\`

### Client NFS
\`\`\`bash
mount server:/shared /mnt/nfs
# /etc/fstab persistant :
server:/shared  /mnt/nfs  nfs  defaults  0 0
\`\`\`

### Autofs (montage automatique)
\`\`\`bash
dnf install autofs
# /etc/auto.master
/- /etc/auto.direct
/mnt /etc/auto.indirect

# /etc/auto.direct
/data  -rw,sync  server:/shared

# /etc/auto.indirect
docs  -rw  server:/docs

systemctl enable --now autofs
\`\`\`

---

## 16. Configuration du Temps (chrony)

\`\`\`bash
dnf install chrony
systemctl enable --now chronyd
timedatectl                        # Voir l'heure et timezone
timedatectl set-timezone Europe/Paris
timedatectl set-ntp true           # Activer NTP
chronyc sources -v                 # Voir les sources NTP
# /etc/chrony.conf
server ntp.example.com iburst
\`\`\`

---

## 17. Résumé des Fichiers Clés RHCSA

| Fichier | Description |
|---------|-------------|
| /etc/fstab | Montages persistants |
| /etc/passwd | Comptes utilisateurs |
| /etc/shadow | Mots de passe |
| /etc/group | Groupes |
| /etc/selinux/config | Mode SELinux |
| /etc/hostname | Nom d'hôte |
| /etc/resolv.conf | DNS |
| /etc/chrony.conf | Serveur NTP |
| /etc/yum.repos.d/ | Repositories |
| /etc/exports | Partages NFS |
| /etc/auto.master | Autofs config |
| /etc/systemd/journald.conf | Journalisation |
| /etc/crontab | Tâches planifiées |
| /etc/login.defs | Politique mots de passe |`;

  await db.execute({
    sql: `INSERT OR REPLACE INTO cheatsheets (title, slug, description, category, content, icon, difficulty, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      'RHCSA EX200 - Toutes les Commandes',
      'rhcsa-ex200-commandes',
      'Fiche complète de toutes les commandes Red Hat à maîtriser pour la certification RHCSA EX200 : fichiers, permissions, LVM, SELinux, firewalld, systemd, conteneurs Podman, NFS, et plus.',
      'systeme',
      content,
      '🎓',
      'intermediaire',
      'rhcsa,redhat,ex200,certification,linux,selinux,lvm,firewalld,podman,systemd,nfs'
    ]
  });

  console.log('✅ Fiche RHCSA EX200 insérée');
}

module.exports = { seedRhcsaCheatsheet };
