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
  const lessonLower = lessonTitle.toLowerCase();
  
  let content = `# ${lessonTitle}\n\n`;

  // ===== STORAGE / LVM / RAID / DISKS =====
  if (title.includes('raid') || title.includes('mdadm')) {
    content += `## RAID Logiciel avec mdadm

### Créer un RAID

\`\`\`bash
# Installer mdadm
dnf install mdadm           # RHEL/CentOS
apt install mdadm           # Debian/Ubuntu

# Créer un RAID 1 (miroir)
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1

# Créer un RAID 5 (striping + parité)
mdadm --create /dev/md1 --level=5 --raid-devices=3 /dev/sdb1 /dev/sdc1 /dev/sdd1

# Créer un RAID 10 (miroir + striping)
mdadm --create /dev/md2 --level=10 --raid-devices=4 /dev/sdb1 /dev/sdc1 /dev/sdd1 /dev/sde1
\`\`\`

### Administrer le RAID

\`\`\`bash
# Vérifier l'état du RAID
cat /proc/mdstat
mdadm --detail /dev/md0

# Ajouter un disque spare
mdadm --add /dev/md0 /dev/sdd1

# Marquer un disque comme défaillant
mdadm --fail /dev/md0 /dev/sdb1

# Retirer un disque
mdadm --remove /dev/md0 /dev/sdb1

# Sauvegarder la config
mdadm --detail --scan >> /etc/mdadm.conf

# Arrêter un RAID
mdadm --stop /dev/md0

# Assembler un RAID existant
mdadm --assemble /dev/md0 /dev/sdb1 /dev/sdc1
\`\`\`

### Formater et monter

\`\`\`bash
mkfs.xfs /dev/md0
mkdir /data
mount /dev/md0 /data
# Persistant dans /etc/fstab :
/dev/md0  /data  xfs  defaults  0 0
\`\`\`

:::info
RAID 0 = Performance (pas de redondance), RAID 1 = Miroir, RAID 5 = Parité (min 3 disques), RAID 10 = Miroir + Stripe (min 4 disques).
:::
`;
  }

  // ===== LVM =====
  else if (title.includes('lvm') || title.includes('logical volume') || title.includes('volume group') || title.includes('physical volume')) {
    content += `## LVM (Logical Volume Manager)

### Créer l'infrastructure LVM

\`\`\`bash
# 1. Physical Volumes
pvcreate /dev/sdb1 /dev/sdc1
pvs                          # Résumé des PV
pvdisplay /dev/sdb1          # Détails

# 2. Volume Group
vgcreate datavg /dev/sdb1 /dev/sdc1
vgs                          # Résumé des VG
vgdisplay datavg             # Détails
vgextend datavg /dev/sdd1    # Ajouter un PV au VG

# 3. Logical Volume
lvcreate -L 10G -n datalv datavg       # Taille fixe
lvcreate -l 100%FREE -n datalv datavg  # Tout l'espace libre
lvcreate -L 5G -n swaplv datavg        # Pour swap
lvs                          # Résumé des LV
lvdisplay /dev/datavg/datalv # Détails
\`\`\`

### Étendre un volume logique

\`\`\`bash
# Étendre le LV
lvextend -L +5G /dev/datavg/datalv
lvextend -l +100%FREE /dev/datavg/datalv

# Redimensionner le filesystem
xfs_growfs /data             # Pour XFS (en ligne)
resize2fs /dev/datavg/datalv # Pour ext4

# Tout en une commande
lvextend -r -L +5G /dev/datavg/datalv  # -r = resize auto
\`\`\`

### Réduire (ext4 uniquement, PAS xfs)

\`\`\`bash
umount /data
e2fsck -f /dev/datavg/datalv
resize2fs /dev/datavg/datalv 5G
lvreduce -L 5G /dev/datavg/datalv
mount /data
\`\`\`

### Snapshots LVM

\`\`\`bash
lvcreate -s -n snap_data -L 2G /dev/datavg/datalv
lvs                          # Voir le snapshot
# Restaurer depuis un snapshot
lvconvert --merge /dev/datavg/snap_data
\`\`\`
`;
  }

  // ===== STOCKAGE / PARTITIONS / FS =====
  else if (title.includes('partition') || title.includes('disque') || title.includes('stockage') || title.includes('filesystem') || title.includes('mount') || title.includes('fstab')) {
    content += `## Gestion du Stockage et des Partitions

### Voir les disques et partitions

\`\`\`bash
lsblk                        # Vue arborescente des blocs
lsblk -f                     # Avec filesystem et UUID
fdisk -l                     # Liste détaillée (MBR)
blkid                        # UUIDs de tous les devices
\`\`\`

### Partitionner

\`\`\`bash
# MBR (disques < 2To)
fdisk /dev/sdb
# Commandes fdisk : n=new, d=delete, t=type, w=write, p=print

# GPT (disques > 2To, recommandé)
gdisk /dev/sdb
# ou
parted /dev/sdb
parted /dev/sdb mklabel gpt
parted /dev/sdb mkpart primary xfs 1MiB 100%
partprobe                    # Relire la table sans reboot
\`\`\`

### Créer un filesystem

\`\`\`bash
mkfs.xfs /dev/sdb1           # XFS (défaut RHEL)
mkfs.ext4 /dev/sdb1          # ext4 (défaut Debian)
mkfs.btrfs /dev/sdb1         # Btrfs
mkswap /dev/sdb2             # Swap
\`\`\`

### Montage

\`\`\`bash
mount /dev/sdb1 /mnt/data              # Montage temporaire
mount -t nfs server:/share /mnt/nfs    # Montage NFS
mount -o loop image.iso /mnt/iso       # Montage ISO
umount /mnt/data                       # Démonter
mount -a                               # Monter tout depuis fstab
\`\`\`

### /etc/fstab (montages persistants)

\`\`\`bash
# device          mount_point  type  options        dump  pass
/dev/sdb1         /data        xfs   defaults       0     0
UUID=abc-123      /backup      ext4  defaults,noatime 0   2
server:/share     /mnt/nfs     nfs   defaults,_netdev 0  0
/dev/datavg/swap  swap         swap  defaults       0     0
\`\`\`
`;
  }

  // ===== SELinux =====
  else if (title.includes('selinux') || title.includes('contexte') || title.includes('boolean') || title.includes('enforcing')) {
    content += `## SELinux - Commandes Complètes

### Modes SELinux

\`\`\`bash
getenforce                   # Voir le mode actuel
sestatus                     # Status détaillé
setenforce 0                 # Permissive (temporaire)
setenforce 1                 # Enforcing (temporaire)
# Persistant : /etc/selinux/config → SELINUX=enforcing
\`\`\`

### Contextes de fichiers

\`\`\`bash
ls -Z /var/www               # Voir les contextes
ps -eZ | grep httpd          # Contextes des processus

# Changer temporairement
chcon -t httpd_sys_content_t /web/index.html

# Définir la règle permanente
semanage fcontext -a -t httpd_sys_content_t "/web(/.*)?"
restorecon -Rv /web          # Appliquer

# Restaurer les contextes par défaut
restorecon -Rv /var/www
\`\`\`

### Booleans SELinux

\`\`\`bash
getsebool -a                 # Tous les booleans
getsebool httpd_can_network_connect
setsebool -P httpd_can_network_connect on   # -P = persistant
setsebool -P httpd_enable_homedirs on
\`\`\`

### Ports SELinux

\`\`\`bash
semanage port -l | grep http
semanage port -a -t http_port_t -p tcp 8888   # Ajouter
semanage port -d -t http_port_t -p tcp 8888   # Supprimer
\`\`\`

### Troubleshooting

\`\`\`bash
ausearch -m AVC -ts recent
sealert -a /var/log/audit/audit.log
journalctl -t setroubleshoot
audit2allow -a                # Générer une policy
\`\`\`
`;
  }

  // ===== CRON / PLANIFICATION =====
  else if (title.includes('cron') || title.includes('planif') || title.includes('timer') || title.includes('at ')) {
    content += `## Planification des Tâches

### crontab

\`\`\`bash
crontab -e                   # Éditer ma crontab
crontab -l                   # Lister
crontab -u user1 -e          # Éditer pour un autre user
crontab -r                   # Supprimer la crontab

# Format : MIN HEURE JOUR MOIS JOUR_SEM commande
*/5 * * * * /opt/scripts/check.sh       # Toutes les 5 min
0 2 * * * /opt/scripts/backup.sh        # Chaque jour à 2h
0 0 * * 0 /opt/scripts/weekly.sh        # Dimanche à minuit
30 8 1 * * /opt/scripts/monthly.sh      # 1er du mois à 8h30
0 */4 * * * /opt/scripts/every4h.sh     # Toutes les 4h
\`\`\`

### at (tâches ponctuelles)

\`\`\`bash
at 14:30                     # Planifier à 14h30
at now + 2 hours             # Dans 2 heures
at midnight                  # À minuit
atq                          # Lister les jobs
atrm 3                       # Supprimer le job #3
\`\`\`

### Timers systemd

\`\`\`bash
# /etc/systemd/system/backup.timer
[Unit]
Description=Backup quotidien
[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true
[Install]
WantedBy=timers.target

systemctl enable --now backup.timer
systemctl list-timers
\`\`\`
`;
  }

  // ===== NFS =====
  else if (title.includes('nfs') || title.includes('partage') || title.includes('export')) {
    content += `## NFS - Partage de Fichiers Réseau

### Serveur NFS

\`\`\`bash
dnf install nfs-utils        # RHEL
apt install nfs-kernel-server # Debian

systemctl enable --now nfs-server

# /etc/exports
/shared    192.168.1.0/24(rw,sync,no_root_squash)
/data      *(ro,sync)
/home      192.168.1.0/24(rw,sync,no_subtree_check)

exportfs -rav                # Appliquer
exportfs -v                  # Voir les exports actifs
\`\`\`

### Client NFS

\`\`\`bash
# Montage manuel
mount -t nfs server:/shared /mnt/nfs
mount server:/data /mnt/data

# Montage persistant (/etc/fstab)
server:/shared  /mnt/nfs  nfs  defaults,_netdev  0 0

# Vérifier les exports disponibles
showmount -e server
\`\`\`

### Autofs (montage automatique)

\`\`\`bash
dnf install autofs

# /etc/auto.master
/-  /etc/auto.direct
/mnt  /etc/auto.indirect

# /etc/auto.direct
/data  -rw,sync  server:/shared

# /etc/auto.indirect
docs  -rw  server:/docs
home  -rw  server:/home/&

systemctl enable --now autofs
\`\`\`
`;
  }

  // ===== SSH =====
  else if (title.includes('ssh') || title.includes('clé') || title.includes('tunnel') || title.includes('remote')) {
    content += `## SSH - Connexion Sécurisée

### Connexion et configuration

\`\`\`bash
ssh user@host                          # Connexion basique
ssh -p 2222 user@host                  # Port personnalisé
ssh -i ~/.ssh/mykey.pem user@host      # Clé spécifique
ssh -v user@host                       # Mode verbose (debug)
\`\`\`

### Gestion des clés

\`\`\`bash
ssh-keygen -t ed25519 -C "email@example.com"  # Générer (recommandé)
ssh-keygen -t rsa -b 4096                      # RSA 4096 bits
ssh-copy-id user@host                          # Copier la clé publique
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys  # Manuel
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_ed25519
\`\`\`

### Tunnels SSH

\`\`\`bash
# Port forwarding local (accéder à un service distant)
ssh -L 8080:localhost:80 user@host
# → localhost:8080 → host:80

# Port forwarding distant (exposer un service local)
ssh -R 9090:localhost:3000 user@host
# → host:9090 → localhost:3000

# SOCKS proxy
ssh -D 1080 user@host
# → Proxy SOCKS sur localhost:1080

# Jump host (bastion)
ssh -J bastion user@internal-server
\`\`\`

### Sécurisation (/etc/ssh/sshd_config)

\`\`\`bash
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers admin devops
Port 2222
\`\`\`

\`\`\`bash
systemctl restart sshd
\`\`\`
`;
  }

  // ===== SWAP =====
  else if (title.includes('swap')) {
    content += `## Gestion du Swap

\`\`\`bash
# Voir le swap actuel
swapon --show
free -h
cat /proc/swaps

# Créer un swap sur une partition
mkswap /dev/sdb2
swapon /dev/sdb2

# Créer un fichier swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# Désactiver
swapoff /dev/sdb2
swapoff /swapfile

# Persistant (/etc/fstab)
/dev/sdb2   swap  swap  defaults  0 0
/swapfile   swap  swap  defaults  0 0

# Ajuster le swappiness (0-100)
cat /proc/sys/vm/swappiness        # Voir (défaut: 60)
sysctl vm.swappiness=10            # Temporaire
echo "vm.swappiness=10" >> /etc/sysctl.conf  # Persistant
\`\`\`
`;
  }

  // ===== DEFAULT: Use lesson title to generate contextual content =====
  else {
    content += `## ${lessonTitle}

### Concepts clés

Cette section couvre **${lessonTitle}** dans le contexte de **${chapterTitle}**.

\`\`\`bash
# Commandes associées à ${lessonTitle}
man ${lessonTitle.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}   # Consulter le manuel
\`\`\`

### Mise en pratique

\`\`\`bash
# Vérifier la configuration actuelle
systemctl status ${lessonTitle.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')} 2>/dev/null || echo "Service non trouvé"

# Logs associés
journalctl --since "1 hour ago" | grep -i "${lessonTitle.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}"

# Vérifier les fichiers de config
find /etc -name "*${lessonTitle.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '').slice(0,5)}*" 2>/dev/null
\`\`\`

### Points importants

- Documentez chaque modification dans un fichier de suivi
- Testez dans un environnement non-production d'abord
- Vérifiez les logs après chaque changement : \`journalctl -xe\`
- Sauvegardez la config avant modification : \`cp fichier fichier.bak\`

:::tip
Pour approfondir ce sujet, consultez la documentation officielle avec \`man\` ou les pages info.
:::
`;
  }

  return content;
}

module.exports = { seedLinuxContent };
