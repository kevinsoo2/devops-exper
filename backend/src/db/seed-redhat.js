/**
 * Seed chapters and lessons for the Red Hat RHCSA & RHCE course
 * Covers: RH124 + RH134 → RHCSA (EX200) + RH294 → RHCE (EX294)
 */

async function seedRedHatCourse(db) {
  console.log('\n📚 Insertion des chapitres et leçons du cours Red Hat RHCSA/RHCE...');

  async function insertChapter(courseId, title, description, orderIndex, durationMinutes) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO chapters (course_id, title, description, order_index, duration_minutes) VALUES (?, ?, ?, ?, ?)`,
      args: [courseId, title, description, orderIndex, durationMinutes]
    });
    const result = await db.execute({
      sql: `SELECT id FROM chapters WHERE course_id = ? AND order_index = ?`,
      args: [courseId, orderIndex]
    });
    return result.rows[0].id;
  }

  async function insertLessons(chapterId, lessons) {
    for (const lesson of lessons) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO lessons (chapter_id, title, content_type, duration_minutes, order_index, is_free, xp_reward) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [chapterId, lesson[0], lesson[1], lesson[2], lesson[3], lesson[4], lesson[5]]
      });
    }
  }

  const courseResult = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'redhat-rhcsa-rhce'`, args: []
  });
  if (courseResult.rows.length === 0) {
    console.log('  ⚠️ Cours Red Hat non trouvé, skip');
    return;
  }
  const courseId = courseResult.rows[0].id;

  // ============================================================
  // PARTIE 1 : RH124 - Red Hat System Administration I
  // ============================================================

  // Ch1: Introduction à Red Hat Enterprise Linux
  let chId = await insertChapter(courseId, 'Introduction à Red Hat Enterprise Linux', 'Découvrez RHEL, son écosystème, les souscriptions et le cycle de vie.', 1, 60);
  await insertLessons(chId, [
    ['Écosystème Red Hat : RHEL, CentOS Stream, Fedora, Rocky', 'video', 12, 1, 1, 10],
    ['Versions RHEL et cycle de vie (10 ans)', 'video', 10, 2, 0, 10],
    ['Souscriptions et Red Hat Subscription Manager', 'video', 12, 3, 0, 12],
    ['Installation de RHEL 9 (Anaconda installer)', 'video', 15, 4, 0, 12],
    ['Cockpit : interface web d\'administration', 'video', 10, 5, 0, 10],
    ['Exercice : installer et enregistrer RHEL', 'exercise', 15, 6, 0, 15],
  ]);

  // Ch2: Accès en ligne de commande
  chId = await insertChapter(courseId, 'Accès en ligne de commande', 'Maîtrisez le shell Bash, la navigation et les commandes essentielles.', 2, 65);
  await insertLessons(chId, [
    ['Shell Bash : syntaxe, variables, historique', 'video', 12, 1, 0, 10],
    ['Navigation dans le filesystem (cd, ls, pwd, tree)', 'video', 10, 2, 0, 10],
    ['Manipulation de fichiers (cp, mv, rm, mkdir, touch)', 'video', 12, 3, 0, 10],
    ['Liens hard et symboliques (ln, ln -s)', 'video', 10, 4, 0, 10],
    ['Globbing et expansion (*, ?, {}, ~)', 'video', 10, 5, 0, 10],
    ['man, info, --help : trouver de l\'aide', 'video', 8, 6, 0, 10],
    ['Exercice : navigation et manipulation fichiers', 'exercise', 13, 7, 0, 15],
  ]);

  // Ch3: Gestion des utilisateurs et groupes
  chId = await insertChapter(courseId, 'Gestion des utilisateurs et groupes', 'Créez et gérez les utilisateurs, groupes et politiques de mots de passe.', 3, 65);
  await insertLessons(chId, [
    ['Utilisateurs locaux : /etc/passwd, /etc/shadow', 'video', 12, 1, 0, 12],
    ['useradd, usermod, userdel : gestion des comptes', 'video', 12, 2, 0, 12],
    ['Groupes : /etc/group, groupadd, gpasswd', 'video', 10, 3, 0, 10],
    ['Politique de mots de passe (chage, pam_pwquality)', 'video', 12, 4, 0, 12],
    ['sudo : configuration et bonnes pratiques', 'video', 12, 5, 0, 12],
    ['Exercice : créer des utilisateurs avec politiques', 'exercise', 14, 6, 0, 15],
  ]);

  // Ch4: Permissions et ACLs
  chId = await insertChapter(courseId, 'Permissions fichiers et ACLs', 'Maîtrisez les permissions Unix, SUID/SGID, sticky bit et les ACLs POSIX.', 4, 70);
  await insertLessons(chId, [
    ['Permissions rwx : notation symbolique et octale', 'video', 12, 1, 0, 12],
    ['chmod, chown, chgrp : modifier les permissions', 'video', 12, 2, 0, 12],
    ['Permissions spéciales : SUID, SGID, Sticky Bit', 'video', 14, 3, 0, 15],
    ['umask : permissions par défaut', 'video', 10, 4, 0, 10],
    ['ACLs POSIX : getfacl, setfacl', 'video', 14, 5, 0, 15],
    ['Exercice : configurer permissions et ACLs', 'exercise', 15, 6, 0, 15],
  ]);

  // Ch5: SELinux
  chId = await insertChapter(courseId, 'SELinux : Security-Enhanced Linux', 'Comprenez et configurez SELinux pour sécuriser RHEL.', 5, 75);
  await insertLessons(chId, [
    ['SELinux : concepts et modes (Enforcing, Permissive, Disabled)', 'video', 14, 1, 0, 12],
    ['Contextes SELinux : utilisateur, rôle, type, niveau', 'video', 14, 2, 0, 15],
    ['Commandes : getenforce, setenforce, sestatus', 'video', 10, 3, 0, 10],
    ['Labels et transitions : chcon, restorecon', 'video', 13, 4, 0, 12],
    ['Booléens SELinux : getsebool, setsebool', 'video', 12, 5, 0, 12],
    ['Troubleshooting SELinux : audit2allow, sealert', 'video', 14, 6, 0, 15],
    ['Exercice : résoudre des problèmes SELinux', 'exercise', 15, 7, 0, 15],
  ]);

  // Ch6: Gestion des processus et services
  chId = await insertChapter(courseId, 'Processus et services avec systemd', 'Gérez les processus, services et targets systemd.', 6, 65);
  await insertLessons(chId, [
    ['Processus : ps, top, kill, nice, renice', 'video', 12, 1, 0, 10],
    ['Jobs : fg, bg, nohup, &', 'video', 10, 2, 0, 10],
    ['systemd : architecture, units, targets', 'video', 14, 3, 0, 15],
    ['systemctl : start, stop, enable, disable, status', 'video', 12, 4, 0, 12],
    ['Journald : journalctl, filtrage, persistance', 'video', 13, 5, 0, 12],
    ['Exercice : gérer les services et analyser les logs', 'exercise', 14, 6, 0, 15],
  ]);

  // ============================================================
  // PARTIE 2 : RH134 - Red Hat System Administration II
  // ============================================================

  // Ch7: Stockage et systèmes de fichiers
  chId = await insertChapter(courseId, 'Stockage : partitions, LVM et systèmes de fichiers', 'Gérez le stockage avec fdisk, LVM, XFS et ext4.', 7, 80);
  await insertLessons(chId, [
    ['Disques et partitions : lsblk, fdisk, gdisk', 'video', 13, 1, 0, 12],
    ['Systèmes de fichiers : mkfs.xfs, mkfs.ext4, mount', 'video', 12, 2, 0, 12],
    ['/etc/fstab : montage persistant', 'video', 12, 3, 0, 12],
    ['LVM : Physical Volumes, Volume Groups, Logical Volumes', 'video', 16, 4, 0, 15],
    ['LVM : créer, étendre, réduire des volumes', 'video', 14, 5, 0, 15],
    ['Swap : création et gestion', 'video', 10, 6, 0, 10],
    ['Stratis et VDO (stockage avancé RHEL)', 'video', 12, 7, 0, 12],
    ['Exercice : LVM complet avec extension à chaud', 'exercise', 16, 8, 0, 15],
  ]);

  // Ch8: Réseau
  chId = await insertChapter(courseId, 'Configuration réseau avec NetworkManager', 'Configurez le réseau avec nmcli, nmtui et les fichiers de configuration.', 8, 70);
  await insertLessons(chId, [
    ['NetworkManager : concepts et profils de connexion', 'video', 12, 1, 0, 12],
    ['nmcli : configurer IP statique et DHCP', 'video', 14, 2, 0, 15],
    ['nmtui : interface texte pour le réseau', 'video', 10, 3, 0, 10],
    ['Résolution DNS : /etc/resolv.conf, nmcli', 'video', 10, 4, 0, 10],
    ['Hostname : hostnamectl', 'video', 8, 5, 0, 10],
    ['Firewalld : zones, services, ports, rich rules', 'video', 15, 6, 0, 15],
    ['Exercice : configurer réseau et firewall', 'exercise', 15, 7, 0, 15],
  ]);

  // Ch9: NFS, Autofs et montages réseau
  chId = await insertChapter(courseId, 'NFS, Autofs et montages réseau', 'Configurez les partages NFS et les montages automatiques.', 9, 55);
  await insertLessons(chId, [
    ['NFS : serveur et client, exports', 'video', 13, 1, 0, 12],
    ['Monter un partage NFS (temporaire et persistant)', 'video', 12, 2, 0, 12],
    ['Autofs : montage automatique à la demande', 'video', 14, 3, 0, 15],
    ['Autofs : maps directes et indirectes', 'video', 12, 4, 0, 12],
    ['Exercice : configurer NFS et Autofs', 'exercise', 14, 5, 0, 15],
  ]);

  // Ch10: Planification de tâches
  chId = await insertChapter(courseId, 'Planification de tâches : cron et at', 'Planifiez des tâches récurrentes et ponctuelles.', 10, 45);
  await insertLessons(chId, [
    ['cron : syntaxe crontab, /etc/cron.d', 'video', 12, 1, 0, 12],
    ['cron : utilisateur vs système, cron.daily/weekly/monthly', 'video', 10, 2, 0, 10],
    ['at : tâches ponctuelles différées', 'video', 10, 3, 0, 10],
    ['systemd timers : alternative moderne à cron', 'video', 12, 4, 0, 12],
    ['Exercice : planifier des tâches avec cron et systemd', 'exercise', 12, 5, 0, 15],
  ]);

  // Ch11: Tuning et troubleshooting
  chId = await insertChapter(courseId, 'Tuning, boot et troubleshooting', 'Diagnostiquez les problèmes de démarrage et optimisez les performances.', 11, 65);
  await insertLessons(chId, [
    ['Processus de boot RHEL : BIOS/UEFI → GRUB2 → systemd', 'video', 14, 1, 0, 12],
    ['GRUB2 : éditer au boot, réinitialiser le mot de passe root', 'video', 14, 2, 0, 15],
    ['rescue.target et emergency.target', 'video', 12, 3, 0, 12],
    ['Tuned : profils de performance système', 'video', 12, 4, 0, 12],
    ['Troubleshooting : méthodologie et outils (sosreport)', 'video', 12, 5, 0, 12],
    ['Exercice : récupérer un système qui ne boot plus', 'exercise', 15, 6, 0, 15],
  ]);

  // Ch12: Conteneurs avec Podman
  chId = await insertChapter(courseId, 'Conteneurs avec Podman (RHEL 9)', 'Gérez les conteneurs avec Podman, Buildah et Skopeo sur RHEL.', 12, 55);
  await insertLessons(chId, [
    ['Podman vs Docker : rootless, daemonless', 'video', 12, 1, 0, 12],
    ['podman run, ps, stop, rm : gestion des conteneurs', 'video', 12, 2, 0, 12],
    ['Registries : podman login, pull, push', 'video', 10, 3, 0, 10],
    ['Conteneurs en tant que services systemd (podman generate)', 'video', 14, 4, 0, 15],
    ['Exercice : déployer un service conteneurisé avec Podman', 'exercise', 14, 5, 0, 15],
  ]);

  // ============================================================
  // PARTIE 3 : Préparation RHCSA (EX200)
  // ============================================================

  // Ch13: Préparation examen RHCSA EX200
  chId = await insertChapter(courseId, 'Préparation examen RHCSA (EX200)', 'Stratégie, conseils et exercices pour réussir le RHCSA.', 13, 80);
  await insertLessons(chId, [
    ['Format de l\'examen RHCSA : durée, environnement, scoring', 'video', 12, 1, 0, 10],
    ['Objectifs officiels EX200 détaillés', 'video', 14, 2, 0, 12],
    ['Stratégie : gestion du temps et priorités', 'video', 12, 3, 0, 12],
    ['Lab pratique RHCSA #1 : utilisateurs, permissions, SELinux', 'exercise', 18, 4, 0, 15],
    ['Lab pratique RHCSA #2 : LVM, stockage, fstab', 'exercise', 18, 5, 0, 15],
    ['Lab pratique RHCSA #3 : réseau, firewall, NFS', 'exercise', 18, 6, 0, 15],
    ['Lab pratique RHCSA #4 : services, cron, boot recovery', 'exercise', 18, 7, 0, 15],
    ['Lab pratique RHCSA #5 : conteneurs Podman', 'exercise', 15, 8, 0, 15],
    ['Examen blanc RHCSA complet (2h30)', 'exercise', 20, 9, 0, 20],
  ]);

  // ============================================================
  // PARTIE 4 : RH294 - Ansible Automation (RHCE)
  // ============================================================

  // Ch14: Ansible sur RHEL
  chId = await insertChapter(courseId, 'Ansible sur Red Hat : fondamentaux', 'Installez et configurez Ansible sur RHEL pour l\'automatisation.', 14, 65);
  await insertLessons(chId, [
    ['Ansible sur RHEL : installation et configuration', 'video', 12, 1, 0, 12],
    ['Inventory : fichiers statiques et dynamiques', 'video', 12, 2, 0, 12],
    ['ansible.cfg : configuration et précédence', 'video', 10, 3, 0, 10],
    ['Modules Ad-hoc : ping, command, copy, yum', 'video', 12, 4, 0, 12],
    ['Connexion SSH : clés, become, privilege escalation', 'video', 12, 5, 0, 12],
    ['Exercice : configurer Ansible et exécuter des commandes ad-hoc', 'exercise', 14, 6, 0, 15],
  ]);

  // Ch15: Playbooks Ansible
  chId = await insertChapter(courseId, 'Playbooks Ansible', 'Écrivez des playbooks pour automatiser la configuration.', 15, 75);
  await insertLessons(chId, [
    ['Structure d\'un playbook YAML', 'video', 12, 1, 0, 12],
    ['Modules essentiels : package, service, file, template, user', 'video', 14, 2, 0, 15],
    ['Variables : vars, vars_files, host_vars, group_vars', 'video', 14, 3, 0, 15],
    ['Facts et variables magiques', 'video', 12, 4, 0, 12],
    ['Conditions (when) et boucles (loop)', 'video', 13, 5, 0, 12],
    ['Handlers et notifications', 'video', 10, 6, 0, 10],
    ['Exercice : playbook de configuration serveur web', 'exercise', 15, 7, 0, 15],
  ]);

  // Ch16: Rôles et Ansible Galaxy
  chId = await insertChapter(courseId, 'Rôles Ansible et Galaxy', 'Structurez votre code avec des rôles et utilisez Galaxy.', 16, 60);
  await insertLessons(chId, [
    ['Structure d\'un rôle Ansible', 'video', 12, 1, 0, 12],
    ['Créer un rôle : ansible-galaxy init', 'video', 12, 2, 0, 12],
    ['Rôles Red Hat : rhel-system-roles', 'video', 13, 3, 0, 12],
    ['Collections Ansible : installation et utilisation', 'video', 12, 4, 0, 12],
    ['Ansible Vault : chiffrement de données sensibles', 'video', 13, 5, 0, 15],
    ['Exercice : créer et utiliser un rôle avec Vault', 'exercise', 14, 6, 0, 15],
  ]);

  // Ch17: Ansible avancé pour RHCE
  chId = await insertChapter(courseId, 'Ansible avancé pour RHCE', 'Techniques avancées requises pour l\'examen RHCE EX294.', 17, 70);
  await insertLessons(chId, [
    ['Jinja2 templates avancés', 'video', 13, 1, 0, 12],
    ['Gestion des erreurs : block, rescue, always', 'video', 12, 2, 0, 12],
    ['Parallélisme : forks, serial, throttle', 'video', 11, 3, 0, 10],
    ['Delegation et local_action', 'video', 11, 4, 0, 10],
    ['ansible-navigator et Execution Environments', 'video', 12, 5, 0, 12],
    ['Exercice : playbook avancé multi-tier', 'exercise', 15, 6, 0, 15],
  ]);

  // Ch18: Préparation examen RHCE EX294
  chId = await insertChapter(courseId, 'Préparation examen RHCE (EX294)', 'Stratégie et labs pratiques pour le RHCE.', 18, 80);
  await insertLessons(chId, [
    ['Format de l\'examen RHCE EX294', 'video', 12, 1, 0, 10],
    ['Objectifs officiels EX294 détaillés', 'video', 14, 2, 0, 12],
    ['Lab pratique RHCE #1 : inventory et configuration', 'exercise', 18, 3, 0, 15],
    ['Lab pratique RHCE #2 : playbooks et variables', 'exercise', 18, 4, 0, 15],
    ['Lab pratique RHCE #3 : rôles et collections', 'exercise', 18, 5, 0, 15],
    ['Lab pratique RHCE #4 : templates et gestion erreurs', 'exercise', 18, 6, 0, 15],
    ['Lab pratique RHCE #5 : Vault et sécurité', 'exercise', 15, 7, 0, 15],
    ['Examen blanc RHCE complet (4h)', 'exercise', 20, 8, 0, 20],
  ]);

  console.log('  ✅ Cours Red Hat RHCSA/RHCE (18 chapitres, 114 leçons) inséré avec succès !');
}

module.exports = { seedRedHatCourse };

if (require.main === module) {
  const { getDb } = require('./connection');
  require('dotenv').config();
  seedRedHatCourse(getDb()).catch(console.error);
}
