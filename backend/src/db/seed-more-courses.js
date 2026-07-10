/**
 * Seed chapters and lessons for the 8 new courses:
 * - Windows Server Administration
 * - Python pour le DevOps
 * - VMware vSphere Administration
 * - Base de Données pour DevOps
 * - Git Avancé et Workflows
 * - Nginx et Reverse Proxy
 * - Azure DevOps et Cloud
 * - Chaos Engineering et Résilience
 */

async function seedMoreCourses(db) {
  console.log('\n📚 Insertion des chapitres et leçons pour les 8 nouveaux cours...');

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


  // Get course IDs by slug
  const slugs = [
    'windows-server-administration',
    'python-devops',
    'vmware-vsphere-administration',
    'bases-donnees-devops',
    'git-avance-workflows',
    'nginx-reverse-proxy',
    'azure-devops-cloud',
    'chaos-engineering-resilience'
  ];

  const courseIds = {};
  for (const slug of slugs) {
    const result = await db.execute({
      sql: `SELECT id FROM courses WHERE slug = ?`, args: [slug]
    });
    if (result.rows.length === 0) {
      console.log(`  ⚠️ Cours ${slug} non trouvé, skip`);
      return;
    }
    courseIds[slug] = result.rows[0].id;
  }


  // ============================================================
  // COURSE: Windows Server Administration (10 chapitres)
  // ============================================================
  const winId = courseIds['windows-server-administration'];

  // Ch1: Installation et configuration
  let chId = await insertChapter(winId, 'Installation et configuration', 'Installez et configurez Windows Server dans différents modes.', 1, 60);
  await insertLessons(chId, [
    ['Editions et licences', 'video', 12, 1, 1, 10],
    ['Installation Server Core vs GUI', 'video', 14, 2, 0, 12],
    ['Configuration réseau et hostname', 'video', 12, 3, 0, 12],
    ['Windows Admin Center', 'video', 12, 4, 0, 12],
    ['Exercice: installer Windows Server', 'exercise', 15, 5, 0, 15]
  ]);

  // Ch2: Active Directory
  chId = await insertChapter(winId, 'Active Directory', 'Déployez et administrez Active Directory Domain Services.', 2, 75);
  await insertLessons(chId, [
    ['Architecture AD DS', 'video', 14, 1, 0, 12],
    ['Installation du premier DC', 'video', 14, 2, 0, 12],
    ['Utilisateurs/Groupes/OU', 'video', 13, 3, 0, 12],
    ['Réplication et sites AD', 'video', 14, 4, 0, 15],
    ['Trust entre domaines', 'video', 12, 5, 0, 12],
    ['Exercice: déployer une forêt AD', 'exercise', 15, 6, 0, 15]
  ]);


  // Ch3: DNS Windows
  chId = await insertChapter(winId, 'DNS Windows', 'Configurez et gérez le DNS intégré à Active Directory.', 3, 55);
  await insertLessons(chId, [
    ['Zones et enregistrements', 'video', 12, 1, 0, 12],
    ['Intégration AD', 'video', 12, 2, 0, 12],
    ['Transferts de zone', 'video', 11, 3, 0, 10],
    ['Conditional forwarders', 'video', 11, 4, 0, 10],
    ['Exercice: configurer DNS AD-intégré', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch4: DHCP
  chId = await insertChapter(winId, 'DHCP', 'Déployez et gérez le service DHCP avec haute disponibilité.', 4, 48);
  await insertLessons(chId, [
    ['Scopes et options', 'video', 12, 1, 0, 12],
    ['Réservations et exclusions', 'video', 11, 2, 0, 10],
    ['Failover DHCP', 'video', 12, 3, 0, 12],
    ['Exercice: haute dispo DHCP', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch5: Group Policy Objects
  chId = await insertChapter(winId, 'Group Policy Objects', 'Maîtrisez les GPO pour gérer la configuration du domaine.', 5, 72);
  await insertLessons(chId, [
    ['Architecture GPO', 'video', 13, 1, 0, 12],
    ['Création et liaison', 'video', 12, 2, 0, 12],
    ['Préférences vs Policies', 'video', 12, 3, 0, 12],
    ['Filtrage WMI et sécurité', 'video', 12, 4, 0, 12],
    ['Troubleshooting (gpresult, rsop)', 'video', 13, 5, 0, 12],
    ['Exercice: GPO de sécurité', 'exercise', 14, 6, 0, 15]
  ]);


  // Ch6: Hyper-V
  chId = await insertChapter(winId, 'Hyper-V', 'Déployez et gérez la virtualisation avec Hyper-V.', 6, 62);
  await insertLessons(chId, [
    ['Architecture virtualisation', 'video', 13, 1, 0, 12],
    ['VMs et vSwitches', 'video', 12, 2, 0, 12],
    ['Live Migration', 'video', 13, 3, 0, 12],
    ['Réplica et snapshots', 'video', 12, 4, 0, 12],
    ['Exercice: cluster Hyper-V', 'exercise', 15, 5, 0, 15]
  ]);

  // Ch7: PowerShell
  chId = await insertChapter(winId, 'PowerShell', 'Automatisez l\'administration Windows avec PowerShell.', 7, 72);
  await insertLessons(chId, [
    ['Cmdlets et pipeline', 'video', 12, 1, 0, 12],
    ['Scripts et fonctions', 'video', 12, 2, 0, 12],
    ['Remoting et sessions', 'video', 12, 3, 0, 12],
    ['DSC (Desired State Configuration)', 'video', 14, 4, 0, 15],
    ['Modules et packaging', 'video', 12, 5, 0, 12],
    ['Exercice: automatisation AD avec PowerShell', 'exercise', 15, 6, 0, 15]
  ]);

  // Ch8: Stockage et DFS
  chId = await insertChapter(winId, 'Stockage et DFS', 'Gérez le stockage et la réplication DFS.', 8, 50);
  await insertLessons(chId, [
    ['Storage Spaces', 'video', 13, 1, 0, 12],
    ['DFS Namespaces et Réplication', 'video', 13, 2, 0, 12],
    ['Deduplication', 'video', 11, 3, 0, 10],
    ['Exercice: DFS avec réplication', 'exercise', 14, 4, 0, 15]
  ]);


  // Ch9: Sécurité Windows Server
  chId = await insertChapter(winId, 'Sécurité Windows Server', 'Sécurisez et durcissez votre environnement Windows Server.', 9, 60);
  await insertLessons(chId, [
    ['Windows Firewall avancé', 'video', 12, 1, 0, 12],
    ['BitLocker et EFS', 'video', 12, 2, 0, 12],
    ['Audit et journaux', 'video', 12, 3, 0, 12],
    ['LAPS et PAW', 'video', 12, 4, 0, 12],
    ['Exercice: hardening Windows Server', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch10: Monitoring et maintenance
  chId = await insertChapter(winId, 'Monitoring et maintenance', 'Surveillez et maintenez votre infrastructure Windows Server.', 10, 50);
  await insertLessons(chId, [
    ['Performance Monitor et Event Viewer', 'video', 13, 1, 0, 12],
    ['Windows Server Backup', 'video', 12, 2, 0, 12],
    ['WSUS et patching', 'video', 12, 3, 0, 12],
    ['Exercice: plan de maintenance', 'exercise', 14, 4, 0, 15]
  ]);

  console.log('  ✅ Cours Windows Server Administration (10 chapitres) inséré');


  // ============================================================
  // COURSE: Python pour le DevOps (8 chapitres)
  // ============================================================
  const pyId = courseIds['python-devops'];

  // Ch1: Fondamentaux Python
  chId = await insertChapter(pyId, 'Fondamentaux Python', 'Maîtrisez les bases de Python pour le scripting DevOps.', 1, 58);
  await insertLessons(chId, [
    ['Installation et environnements virtuels', 'video', 12, 1, 1, 10],
    ['Types de données et structures', 'video', 12, 2, 0, 12],
    ['Fonctions et modules', 'video', 12, 3, 0, 12],
    ['Gestion des erreurs et exceptions', 'video', 11, 4, 0, 10],
    ['Exercice: script Python de base', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch2: Manipulation de fichiers et données
  chId = await insertChapter(pyId, 'Manipulation de fichiers et données', 'Lisez, écrivez et transformez des données en Python.', 2, 55);
  await insertLessons(chId, [
    ['Lecture/écriture de fichiers', 'video', 11, 1, 0, 10],
    ['JSON et YAML en Python', 'video', 12, 2, 0, 12],
    ['CSV et données tabulaires', 'video', 11, 3, 0, 10],
    ['Expressions régulières', 'video', 12, 4, 0, 12],
    ['Exercice: parser des fichiers de config', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch3: Automatisation système
  chId = await insertChapter(pyId, 'Automatisation système', 'Automatisez les tâches système avec Python.', 3, 58);
  await insertLessons(chId, [
    ['os et pathlib', 'video', 12, 1, 0, 12],
    ['subprocess : exécuter des commandes', 'video', 12, 2, 0, 12],
    ['shutil : opérations fichiers avancées', 'video', 11, 3, 0, 10],
    ['paramiko : SSH en Python', 'video', 13, 4, 0, 12],
    ['Exercice: automatiser un déploiement', 'exercise', 13, 5, 0, 15]
  ]);


  // Ch4: API REST avec requests
  chId = await insertChapter(pyId, 'API REST avec requests', 'Interagissez avec les API REST en Python.', 4, 58);
  await insertLessons(chId, [
    ['GET/POST et méthodes HTTP', 'video', 12, 1, 0, 12],
    ['Authentification (tokens, OAuth)', 'video', 12, 2, 0, 12],
    ['Pagination et rate limiting', 'video', 11, 3, 0, 10],
    ['Error handling et retries', 'video', 12, 4, 0, 12],
    ['Exercice: client API complet', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch5: SDK Cloud
  chId = await insertChapter(pyId, 'SDK Cloud', 'Utilisez les SDK cloud pour automatiser l\'infrastructure.', 5, 60);
  await insertLessons(chId, [
    ['boto3 : AWS SDK Python', 'video', 13, 1, 0, 12],
    ['azure-sdk : Azure en Python', 'video', 13, 2, 0, 12],
    ['google-cloud : GCP SDK', 'video', 12, 3, 0, 12],
    ['python-terraform : wrapper Terraform', 'video', 11, 4, 0, 10],
    ['Exercice: provisionner de l\'infra avec Python', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch6: Outils DevOps en Python
  chId = await insertChapter(pyId, 'Outils DevOps en Python', 'Créez des outils DevOps professionnels en Python.', 6, 58);
  await insertLessons(chId, [
    ['Click : créer des CLI', 'video', 12, 1, 0, 12],
    ['Jinja2 : templates de configuration', 'video', 12, 2, 0, 12],
    ['YAML/JSON parsing avancé', 'video', 11, 3, 0, 10],
    ['Logging professionnel', 'video', 11, 4, 0, 10],
    ['Exercice: outil CLI DevOps', 'exercise', 14, 5, 0, 15]
  ]);


  // Ch7: Testing et qualité
  chId = await insertChapter(pyId, 'Testing et qualité', 'Testez et assurez la qualité de vos outils Python.', 7, 48);
  await insertLessons(chId, [
    ['pytest : tests unitaires et fonctionnels', 'video', 13, 1, 0, 12],
    ['Mocking et fixtures', 'video', 12, 2, 0, 12],
    ['Coverage et qualité de code', 'video', 11, 3, 0, 10],
    ['Intégration CI (GitHub Actions, GitLab CI)', 'video', 12, 4, 0, 12]
  ]);

  // Ch8: Projets complets
  chId = await insertChapter(pyId, 'Projets complets', 'Mettez en pratique toutes vos compétences Python DevOps.', 8, 52);
  await insertLessons(chId, [
    ['Projet: outil d\'inventaire cloud', 'exercise', 14, 1, 0, 15],
    ['Projet: pipeline de déploiement', 'exercise', 14, 2, 0, 15],
    ['Projet: monitoring custom', 'exercise', 13, 3, 0, 15],
    ['Projet: chatops bot', 'exercise', 13, 4, 0, 15]
  ]);

  console.log('  ✅ Cours Python pour le DevOps (8 chapitres) inséré');


  // ============================================================
  // COURSE: VMware vSphere Administration (9 chapitres)
  // ============================================================
  const vmId = courseIds['vmware-vsphere-administration'];

  // Ch1: Architecture vSphere
  chId = await insertChapter(vmId, 'Architecture vSphere', 'Comprenez l\'architecture de la plateforme VMware vSphere.', 1, 58);
  await insertLessons(chId, [
    ['Écosystème VMware et licences', 'video', 12, 1, 1, 10],
    ['Architecture ESXi', 'video', 12, 2, 0, 12],
    ['Architecture vCenter Server', 'video', 12, 3, 0, 12],
    ['VCSA vs Windows vCenter', 'video', 11, 4, 0, 10],
    ['Exercice: planifier une architecture vSphere', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch2: ESXi installation et config
  chId = await insertChapter(vmId, 'ESXi installation et configuration', 'Installez et configurez les hôtes ESXi.', 2, 60);
  await insertLessons(chId, [
    ['Installation ESXi', 'video', 13, 1, 0, 12],
    ['Configuration réseau ESXi', 'video', 12, 2, 0, 12],
    ['Configuration stockage ESXi', 'video', 12, 3, 0, 12],
    ['Sécurité et accès ESXi', 'video', 12, 4, 0, 12],
    ['Exercice: déployer un hôte ESXi', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch3: vCenter Server
  chId = await insertChapter(vmId, 'vCenter Server', 'Déployez et administrez vCenter Server.', 3, 58);
  await insertLessons(chId, [
    ['Déploiement VCSA', 'video', 13, 1, 0, 12],
    ['Datacenter et clusters', 'video', 12, 2, 0, 12],
    ['Permissions et rôles', 'video', 12, 3, 0, 12],
    ['Alarmes et événements', 'video', 11, 4, 0, 10],
    ['Exercice: configurer vCenter', 'exercise', 13, 5, 0, 15]
  ]);


  // Ch4: Machines Virtuelles
  chId = await insertChapter(vmId, 'Machines Virtuelles', 'Créez et gérez des machines virtuelles vSphere.', 4, 58);
  await insertLessons(chId, [
    ['Création et configuration de VMs', 'video', 12, 1, 0, 12],
    ['Templates et clones', 'video', 12, 2, 0, 12],
    ['VMware Tools et personnalisation', 'video', 12, 3, 0, 12],
    ['Content Library', 'video', 11, 4, 0, 10],
    ['Exercice: déployer des VMs depuis un template', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch5: Réseau virtuel
  chId = await insertChapter(vmId, 'Réseau virtuel', 'Configurez le réseau virtuel dans vSphere.', 5, 62);
  await insertLessons(chId, [
    ['vSwitch standard', 'video', 13, 1, 0, 12],
    ['Distributed Switch (vDS)', 'video', 14, 2, 0, 15],
    ['NSX-T basics', 'video', 13, 3, 0, 12],
    ['VLANs et port groups', 'video', 12, 4, 0, 12],
    ['Exercice: configurer le réseau distribué', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch6: Stockage
  chId = await insertChapter(vmId, 'Stockage', 'Gérez le stockage dans vSphere.', 6, 62);
  await insertLessons(chId, [
    ['VMFS et datastores', 'video', 13, 1, 0, 12],
    ['NFS datastores', 'video', 12, 2, 0, 12],
    ['vSAN configuration', 'video', 14, 3, 0, 15],
    ['Storage Policies (SPBM)', 'video', 12, 4, 0, 12],
    ['Exercice: configurer vSAN', 'exercise', 14, 5, 0, 15]
  ]);


  // Ch7: Haute disponibilité
  chId = await insertChapter(vmId, 'Haute disponibilité', 'Implémentez la haute disponibilité avec vSphere.', 7, 62);
  await insertLessons(chId, [
    ['vMotion et Storage vMotion', 'video', 13, 1, 0, 12],
    ['vSphere HA', 'video', 14, 2, 0, 15],
    ['DRS et resource pools', 'video', 13, 3, 0, 12],
    ['Fault Tolerance', 'video', 12, 4, 0, 12],
    ['Exercice: cluster HA/DRS', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch8: Backup et DR
  chId = await insertChapter(vmId, 'Backup et Disaster Recovery', 'Sauvegardez et restaurez vos machines virtuelles.', 8, 52);
  await insertLessons(chId, [
    ['Snapshots : bonnes pratiques', 'video', 12, 1, 0, 12],
    ['VADP (vStorage API for Data Protection)', 'video', 13, 2, 0, 12],
    ['Veeam/Nakivo : backup VMs', 'video', 14, 3, 0, 15],
    ['Exercice: plan de backup', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch9: Monitoring vROps
  chId = await insertChapter(vmId, 'Monitoring avec vROps', 'Surveillez votre infrastructure avec vRealize Operations.', 9, 48);
  await insertLessons(chId, [
    ['Installation et configuration vROps', 'video', 13, 1, 0, 12],
    ['Dashboards et alertes', 'video', 12, 2, 0, 12],
    ['Capacity planning', 'video', 12, 3, 0, 12],
    ['Exercice: dashboard de monitoring', 'exercise', 13, 4, 0, 15]
  ]);

  console.log('  ✅ Cours VMware vSphere Administration (9 chapitres) inséré');


  // ============================================================
  // COURSE: Base de Données pour DevOps (8 chapitres)
  // ============================================================
  const dbId = courseIds['bases-donnees-devops'];

  // Ch1: Fondamentaux BDD
  chId = await insertChapter(dbId, 'Fondamentaux BDD', 'Comprenez les fondamentaux des bases de données pour le DevOps.', 1, 45);
  await insertLessons(chId, [
    ['SQL vs NoSQL : quand choisir quoi', 'video', 12, 1, 1, 10],
    ['ACID et CAP theorem', 'video', 12, 2, 0, 12],
    ['Modélisation relationnelle', 'video', 12, 3, 0, 12],
    ['Exercice: concevoir un schéma', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch2: PostgreSQL administration
  chId = await insertChapter(dbId, 'PostgreSQL administration', 'Administrez PostgreSQL en production.', 2, 72);
  await insertLessons(chId, [
    ['Installation et configuration', 'video', 12, 1, 0, 12],
    ['Configuration avancée (postgresql.conf)', 'video', 13, 2, 0, 12],
    ['Utilisateurs et rôles', 'video', 12, 3, 0, 12],
    ['Backup et restore (pg_dump, pg_basebackup)', 'video', 14, 4, 0, 15],
    ['Réplication streaming', 'video', 13, 5, 0, 12],
    ['Exercice: cluster PostgreSQL HA', 'exercise', 14, 6, 0, 15]
  ]);

  // Ch3: MySQL/MariaDB
  chId = await insertChapter(dbId, 'MySQL/MariaDB', 'Administrez MySQL et MariaDB en production.', 3, 58);
  await insertLessons(chId, [
    ['Installation et configuration', 'video', 12, 1, 0, 12],
    ['InnoDB et storage engines', 'video', 12, 2, 0, 12],
    ['Réplication Master-Slave', 'video', 13, 3, 0, 12],
    ['Group Replication et InnoDB Cluster', 'video', 13, 4, 0, 15],
    ['Exercice: MySQL haute disponibilité', 'exercise', 13, 5, 0, 15]
  ]);


  // Ch4: MongoDB
  chId = await insertChapter(dbId, 'MongoDB', 'Administrez MongoDB pour les environnements DevOps.', 4, 58);
  await insertLessons(chId, [
    ['Architecture et concepts', 'video', 12, 1, 0, 12],
    ['Replica Sets', 'video', 13, 2, 0, 12],
    ['Sharding', 'video', 13, 3, 0, 15],
    ['Backup et monitoring', 'video', 12, 4, 0, 12],
    ['Exercice: déployer un cluster MongoDB', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch5: Redis et caching
  chId = await insertChapter(dbId, 'Redis et caching', 'Utilisez Redis pour le caching et les structures de données.', 5, 48);
  await insertLessons(chId, [
    ['Redis : types de données et commandes', 'video', 12, 1, 0, 12],
    ['Persistence et haute disponibilité', 'video', 12, 2, 0, 12],
    ['Redis Cluster', 'video', 12, 3, 0, 12],
    ['Exercice: caching applicatif avec Redis', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch6: Migrations et schéma
  chId = await insertChapter(dbId, 'Migrations et schéma', 'Gérez les migrations de schéma de manière automatisée.', 6, 58);
  await insertLessons(chId, [
    ['Flyway : migrations Java/SQL', 'video', 12, 1, 0, 12],
    ['Liquibase : changelog XML/YAML', 'video', 12, 2, 0, 12],
    ['Alembic : migrations Python', 'video', 12, 3, 0, 12],
    ['Versioning et rollback', 'video', 11, 4, 0, 10],
    ['Exercice: pipeline de migration', 'exercise', 13, 5, 0, 15]
  ]);


  // Ch7: Performance et optimisation
  chId = await insertChapter(dbId, 'Performance et optimisation', 'Optimisez les performances de vos bases de données.', 7, 60);
  await insertLessons(chId, [
    ['Indexation : types et stratégies', 'video', 13, 1, 0, 12],
    ['EXPLAIN et analyse de requêtes', 'video', 13, 2, 0, 12],
    ['Connection pooling (PgBouncer, ProxySQL)', 'video', 12, 3, 0, 12],
    ['Monitoring (pg_stat, PMM)', 'video', 12, 4, 0, 12],
    ['Exercice: optimiser des requêtes lentes', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch8: Haute disponibilité
  chId = await insertChapter(dbId, 'Haute disponibilité', 'Mettez en place la haute disponibilité pour vos bases de données.', 8, 60);
  await insertLessons(chId, [
    ['Réplication synchrone vs asynchrone', 'video', 13, 1, 0, 12],
    ['Failover automatique (Patroni, Orchestrator)', 'video', 13, 2, 0, 15],
    ['Clustering (Galera, Citus)', 'video', 13, 3, 0, 12],
    ['Cloud managed databases (RDS, Cloud SQL)', 'video', 12, 4, 0, 12],
    ['Exercice: failover automatique PostgreSQL', 'exercise', 13, 5, 0, 15]
  ]);

  console.log('  ✅ Cours Base de Données pour DevOps (8 chapitres) inséré');


  // ============================================================
  // COURSE: Git Avancé et Workflows (7 chapitres)
  // ============================================================
  const gitId = courseIds['git-avance-workflows'];

  // Ch1: Git internals
  chId = await insertChapter(gitId, 'Git internals', 'Comprenez le fonctionnement interne de Git.', 1, 48);
  await insertLessons(chId, [
    ['Objets Git (blob, tree, commit, tag)', 'video', 13, 1, 1, 12],
    ['Index et staging area', 'video', 12, 2, 0, 12],
    ['Refs, HEAD et branches', 'video', 12, 3, 0, 12],
    ['Reflog : filet de sécurité', 'video', 11, 4, 0, 10]
  ]);

  // Ch2: Rebase et historique
  chId = await insertChapter(gitId, 'Rebase et historique', 'Maîtrisez la réécriture de l\'historique Git.', 2, 58);
  await insertLessons(chId, [
    ['Rebase interactif', 'video', 13, 1, 0, 12],
    ['Cherry-pick', 'video', 12, 2, 0, 12],
    ['Git bisect : trouver un bug', 'video', 12, 3, 0, 12],
    ['Squash et fixup', 'video', 11, 4, 0, 10],
    ['Exercice: nettoyer un historique', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch3: Hooks et automation
  chId = await insertChapter(gitId, 'Hooks et automation', 'Automatisez vos workflows avec les hooks Git.', 3, 48);
  await insertLessons(chId, [
    ['pre-commit hooks', 'video', 12, 1, 0, 12],
    ['commit-msg validation', 'video', 11, 2, 0, 10],
    ['pre-push hooks', 'video', 11, 3, 0, 10],
    ['Husky et lint-staged', 'video', 12, 4, 0, 12]
  ]);


  // Ch4: Workflows
  chId = await insertChapter(gitId, 'Workflows', 'Implémentez les workflows Git les plus populaires.', 4, 58);
  await insertLessons(chId, [
    ['GitFlow : branches et releases', 'video', 13, 1, 0, 12],
    ['GitHub Flow : simplicité', 'video', 12, 2, 0, 12],
    ['Trunk-based development', 'video', 12, 3, 0, 12],
    ['Workflows monorepo', 'video', 12, 4, 0, 12],
    ['Exercice: implémenter un workflow', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch5: Submodules et subtrees
  chId = await insertChapter(gitId, 'Submodules et subtrees', 'Gérez des dépendances avec submodules et subtrees.', 5, 46);
  await insertLessons(chId, [
    ['Git submodules', 'video', 12, 1, 0, 12],
    ['Git subtrees', 'video', 12, 2, 0, 12],
    ['Submodules vs subtrees : quand choisir', 'video', 11, 3, 0, 10],
    ['Exercice: projet multi-repo', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch6: Résolution de conflits
  chId = await insertChapter(gitId, 'Résolution de conflits', 'Résolvez les conflits Git complexes efficacement.', 6, 48);
  await insertLessons(chId, [
    ['Merge strategies (recursive, ort)', 'video', 12, 1, 0, 12],
    ['rerere : réutiliser les résolutions', 'video', 11, 2, 0, 10],
    ['ours/theirs et stratégies avancées', 'video', 12, 3, 0, 12],
    ['Exercice: résoudre des conflits complexes', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch7: Monorepos
  chId = await insertChapter(gitId, 'Monorepos', 'Gérez des monorepos à grande échelle.', 7, 48);
  await insertLessons(chId, [
    ['Nx : monorepo intelligent', 'video', 13, 1, 0, 12],
    ['Turborepo : builds rapides', 'video', 12, 2, 0, 12],
    ['Lerna : gestion de packages', 'video', 11, 3, 0, 10],
    ['Exercice: configurer un monorepo', 'exercise', 13, 4, 0, 15]
  ]);

  console.log('  ✅ Cours Git Avancé et Workflows (7 chapitres) inséré');


  // ============================================================
  // COURSE: Nginx et Reverse Proxy (7 chapitres)
  // ============================================================
  const ngxId = courseIds['nginx-reverse-proxy'];

  // Ch1: Fondamentaux Nginx
  chId = await insertChapter(ngxId, 'Fondamentaux Nginx', 'Comprenez l\'architecture et les bases de Nginx.', 1, 58);
  await insertLessons(chId, [
    ['Architecture Nginx (event-driven)', 'video', 12, 1, 1, 10],
    ['Installation et compilation', 'video', 12, 2, 0, 12],
    ['Directives principales', 'video', 12, 3, 0, 12],
    ['Contexts (http, server, location)', 'video', 12, 4, 0, 12],
    ['Exercice: serveur web basique', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch2: Reverse proxy
  chId = await insertChapter(ngxId, 'Reverse proxy', 'Configurez Nginx comme reverse proxy.', 2, 58);
  await insertLessons(chId, [
    ['proxy_pass et backends', 'video', 12, 1, 0, 12],
    ['Headers et forwarding', 'video', 12, 2, 0, 12],
    ['Buffering et timeouts', 'video', 12, 3, 0, 12],
    ['WebSocket proxying', 'video', 12, 4, 0, 12],
    ['Exercice: reverse proxy multi-backend', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch3: Load balancing
  chId = await insertChapter(ngxId, 'Load balancing', 'Implémentez le load balancing avec Nginx.', 3, 58);
  await insertLessons(chId, [
    ['Upstream blocks', 'video', 12, 1, 0, 12],
    ['Algorithmes (round-robin, least_conn, ip_hash)', 'video', 13, 2, 0, 12],
    ['Health checks', 'video', 12, 3, 0, 12],
    ['Sticky sessions', 'video', 11, 4, 0, 10],
    ['Exercice: load balancer HA', 'exercise', 13, 5, 0, 15]
  ]);


  // Ch4: SSL/TLS
  chId = await insertChapter(ngxId, 'SSL/TLS', 'Gérez les certificats et le chiffrement TLS.', 4, 58);
  await insertLessons(chId, [
    ['Certificats et chaînes de confiance', 'video', 12, 1, 0, 12],
    ['Let\'s Encrypt et Certbot', 'video', 13, 2, 0, 12],
    ['OCSP stapling', 'video', 11, 3, 0, 10],
    ['mTLS (mutual TLS)', 'video', 12, 4, 0, 12],
    ['Exercice: HTTPS avec renouvellement auto', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch5: Caching et performance
  chId = await insertChapter(ngxId, 'Caching et performance', 'Optimisez les performances avec le caching Nginx.', 5, 48);
  await insertLessons(chId, [
    ['proxy_cache configuration', 'video', 12, 1, 0, 12],
    ['Microcaching pour APIs', 'video', 12, 2, 0, 12],
    ['Compression gzip/brotli', 'video', 11, 3, 0, 10],
    ['Exercice: optimiser un site web', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch6: Sécurité
  chId = await insertChapter(ngxId, 'Sécurité', 'Sécurisez vos applications avec Nginx.', 6, 60);
  await insertLessons(chId, [
    ['Rate limiting (limit_req)', 'video', 12, 1, 0, 12],
    ['WAF avec ModSecurity', 'video', 14, 2, 0, 15],
    ['Geo-blocking et ACLs', 'video', 11, 3, 0, 10],
    ['Protection DDoS', 'video', 12, 4, 0, 12],
    ['Exercice: sécuriser un reverse proxy', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch7: Cas pratiques
  chId = await insertChapter(ngxId, 'Cas pratiques', 'Implémentez des cas d\'usage avancés.', 7, 52);
  await insertLessons(chId, [
    ['API Gateway avec Nginx', 'video', 13, 1, 0, 12],
    ['CDN maison', 'video', 13, 2, 0, 12],
    ['Canary deployments', 'video', 13, 3, 0, 12],
    ['Exercice: architecture complète', 'exercise', 14, 4, 0, 15]
  ]);

  console.log('  ✅ Cours Nginx et Reverse Proxy (7 chapitres) inséré');


  // ============================================================
  // COURSE: Azure DevOps et Cloud (9 chapitres)
  // ============================================================
  const azId = courseIds['azure-devops-cloud'];

  // Ch1: Introduction Azure
  chId = await insertChapter(azId, 'Introduction Azure', 'Découvrez la plateforme Microsoft Azure.', 1, 55);
  await insertLessons(chId, [
    ['Écosystème Azure et services', 'video', 12, 1, 1, 10],
    ['Portail, CLI et PowerShell', 'video', 12, 2, 0, 12],
    ['Subscriptions et Resource Groups', 'video', 11, 3, 0, 10],
    ['Régions et zones de disponibilité', 'video', 11, 4, 0, 10],
    ['Exercice: premiers pas Azure', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch2: Azure DevOps Services
  chId = await insertChapter(azId, 'Azure DevOps Services', 'Maîtrisez les services Azure DevOps.', 2, 60);
  await insertLessons(chId, [
    ['Azure Repos (Git)', 'video', 12, 1, 0, 12],
    ['Azure Boards (gestion de projet)', 'video', 12, 2, 0, 12],
    ['Azure Pipelines (CI/CD)', 'video', 13, 3, 0, 12],
    ['Azure Artifacts (packages)', 'video', 11, 4, 0, 10],
    ['Azure Test Plans', 'video', 11, 5, 0, 10]
  ]);

  // Ch3: Azure Pipelines CI/CD
  chId = await insertChapter(azId, 'Azure Pipelines CI/CD', 'Construisez des pipelines CI/CD avec Azure Pipelines.', 3, 72);
  await insertLessons(chId, [
    ['YAML Pipelines : syntaxe et structure', 'video', 13, 1, 0, 12],
    ['Stages, Jobs et Steps', 'video', 12, 2, 0, 12],
    ['Templates et réutilisation', 'video', 13, 3, 0, 12],
    ['Environments et approvals', 'video', 12, 4, 0, 12],
    ['Service connections et secrets', 'video', 12, 5, 0, 12],
    ['Exercice: pipeline multi-stage', 'exercise', 14, 6, 0, 15]
  ]);


  // Ch4: AKS - Azure Kubernetes
  chId = await insertChapter(azId, 'AKS - Azure Kubernetes', 'Déployez et gérez des clusters Kubernetes sur Azure.', 4, 60);
  await insertLessons(chId, [
    ['Déploiement d\'un cluster AKS', 'video', 13, 1, 0, 12],
    ['Networking AKS (kubenet, Azure CNI)', 'video', 13, 2, 0, 12],
    ['Storage et persistent volumes', 'video', 12, 3, 0, 12],
    ['Monitoring avec Container Insights', 'video', 12, 4, 0, 12],
    ['Exercice: déployer une app sur AKS', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch5: Azure Functions et Serverless
  chId = await insertChapter(azId, 'Azure Functions et Serverless', 'Développez des applications serverless sur Azure.', 5, 48);
  await insertLessons(chId, [
    ['Azure Functions : triggers et bindings', 'video', 13, 1, 0, 12],
    ['Durable Functions', 'video', 12, 2, 0, 12],
    ['Logic Apps et Event Grid', 'video', 12, 3, 0, 12],
    ['Exercice: API serverless', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch6: Infrastructure as Code Azure
  chId = await insertChapter(azId, 'Infrastructure as Code Azure', 'Provisionnez l\'infrastructure Azure avec du code.', 6, 60);
  await insertLessons(chId, [
    ['ARM Templates', 'video', 13, 1, 0, 12],
    ['Bicep : syntaxe moderne', 'video', 14, 2, 0, 15],
    ['Terraform pour Azure', 'video', 13, 3, 0, 12],
    ['Modules et bonnes pratiques', 'video', 11, 4, 0, 10],
    ['Exercice: infra complète en Bicep', 'exercise', 14, 5, 0, 15]
  ]);


  // Ch7: Networking Azure
  chId = await insertChapter(azId, 'Networking Azure', 'Configurez le réseau sur Azure.', 7, 58);
  await insertLessons(chId, [
    ['VNet et subnets', 'video', 12, 1, 0, 12],
    ['NSG (Network Security Groups)', 'video', 12, 2, 0, 12],
    ['Azure Firewall', 'video', 12, 3, 0, 12],
    ['Azure Front Door et CDN', 'video', 12, 4, 0, 12],
    ['Exercice: architecture réseau Azure', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch8: Monitoring
  chId = await insertChapter(azId, 'Monitoring', 'Surveillez vos applications et infrastructure Azure.', 8, 50);
  await insertLessons(chId, [
    ['Azure Monitor', 'video', 12, 1, 0, 12],
    ['Log Analytics workspace', 'video', 13, 2, 0, 12],
    ['Application Insights', 'video', 13, 3, 0, 12],
    ['Exercice: dashboard de monitoring', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch9: Sécurité Azure
  chId = await insertChapter(azId, 'Sécurité Azure', 'Sécurisez vos workloads Azure.', 9, 50);
  await insertLessons(chId, [
    ['Azure AD et RBAC', 'video', 13, 1, 0, 12],
    ['Azure Key Vault', 'video', 12, 2, 0, 12],
    ['Microsoft Defender for Cloud', 'video', 12, 3, 0, 12],
    ['Exercice: sécuriser un environnement Azure', 'exercise', 14, 4, 0, 15]
  ]);

  console.log('  ✅ Cours Azure DevOps et Cloud (9 chapitres) inséré');


  // ============================================================
  // COURSE: Chaos Engineering et Résilience (7 chapitres)
  // ============================================================
  const chaosId = courseIds['chaos-engineering-resilience'];

  // Ch1: Principes du Chaos Engineering
  chId = await insertChapter(chaosId, 'Principes du Chaos Engineering', 'Comprenez les fondements du Chaos Engineering.', 1, 48);
  await insertLessons(chId, [
    ['Origine Netflix et Chaos Monkey', 'video', 12, 1, 1, 10],
    ['Principes fondamentaux', 'video', 12, 2, 0, 12],
    ['Formuler des hypothèses', 'video', 12, 3, 0, 12],
    ['Steady state et métriques', 'video', 12, 4, 0, 12]
  ]);

  // Ch2: Outils de chaos
  chId = await insertChapter(chaosId, 'Outils de chaos', 'Découvrez les outils de Chaos Engineering.', 2, 58);
  await insertLessons(chId, [
    ['Chaos Monkey et Simian Army', 'video', 12, 1, 0, 12],
    ['Litmus Chaos', 'video', 13, 2, 0, 12],
    ['Gremlin (SaaS)', 'video', 12, 3, 0, 12],
    ['Chaos Mesh pour Kubernetes', 'video', 12, 4, 0, 12],
    ['Exercice: premier test de chaos', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch3: Chaos sur Kubernetes
  chId = await insertChapter(chaosId, 'Chaos sur Kubernetes', 'Appliquez le Chaos Engineering sur Kubernetes.', 3, 60);
  await insertLessons(chId, [
    ['Pod kill et pod failure', 'video', 12, 1, 0, 12],
    ['Network chaos (latence, partition)', 'video', 13, 2, 0, 12],
    ['Stress testing (CPU, mémoire)', 'video', 12, 3, 0, 12],
    ['IO chaos (disk fill, slow I/O)', 'video', 12, 4, 0, 12],
    ['Exercice: chaos complet sur un microservice', 'exercise', 14, 5, 0, 15]
  ]);


  // Ch4: Chaos réseau
  chId = await insertChapter(chaosId, 'Chaos réseau', 'Testez la résilience réseau de vos systèmes.', 4, 48);
  await insertLessons(chId, [
    ['Injection de latence', 'video', 12, 1, 0, 12],
    ['Packet loss et corruption', 'video', 12, 2, 0, 12],
    ['DNS failures', 'video', 11, 3, 0, 10],
    ['Exercice: chaos réseau en production', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch5: Game Days
  chId = await insertChapter(chaosId, 'Game Days', 'Planifiez et exécutez des Game Days.', 5, 50);
  await insertLessons(chId, [
    ['Planification d\'un Game Day', 'video', 13, 1, 0, 12],
    ['Exécution et coordination', 'video', 12, 2, 0, 12],
    ['Observation et métriques', 'video', 12, 3, 0, 12],
    ['Post-mortem et amélioration', 'video', 13, 4, 0, 12]
  ]);

  // Ch6: Chaos et observabilité
  chId = await insertChapter(chaosId, 'Chaos et observabilité', 'Mesurez l\'impact du chaos avec l\'observabilité.', 6, 50);
  await insertLessons(chId, [
    ['Métriques pendant le chaos', 'video', 12, 1, 0, 12],
    ['Validation des SLOs', 'video', 13, 2, 0, 12],
    ['Dashboards de résilience', 'video', 12, 3, 0, 12],
    ['Exercice: dashboard chaos', 'exercise', 13, 4, 0, 15]
  ]);

  // Ch7: Chaos en production
  chId = await insertChapter(chaosId, 'Chaos en production', 'Appliquez le Chaos Engineering en production de manière sûre.', 7, 50);
  await insertLessons(chId, [
    ['Progressive rollout du chaos', 'video', 13, 1, 0, 12],
    ['Blast radius et guard rails', 'video', 12, 2, 0, 12],
    ['Automated chaos (CI/CD integration)', 'video', 13, 3, 0, 12],
    ['Exercice: chaos automatisé en pipeline', 'exercise', 14, 4, 0, 15]
  ]);

  console.log('  ✅ Cours Chaos Engineering et Résilience (7 chapitres) inséré');


  console.log('\n📚 Tous les chapitres et leçons des 8 nouveaux cours ont été insérés avec succès !');
}

module.exports = { seedMoreCourses };

// Standalone runner
if (require.main === module) {
  const { getDb } = require('./connection');
  require('dotenv').config();

  async function run() {
    const db = getDb();
    await seedMoreCourses(db);
  }

  run().catch((err) => {
    console.error('❌ Erreur lors du seeding des nouveaux cours:', err);
    process.exit(1);
  });
}
