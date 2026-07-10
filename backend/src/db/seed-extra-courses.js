/**
 * Seed chapters and lessons for extra courses (13-18)
 * Network and System courses content
 */

async function seedExtraCourses(db) {
  console.log('\n📚 Insertion des chapitres et leçons pour les cours 13-18...');

  // Helper function to insert a chapter and return its ID
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

  // Helper function to insert lessons for a chapter
  async function insertLessons(chapterId, lessons) {
    for (const lesson of lessons) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO lessons (chapter_id, title, content_type, duration_minutes, order_index, is_free, xp_reward) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [chapterId, lesson[0], lesson[1], lesson[2], lesson[3], lesson[4], lesson[5]]
      });
    }
  }

  // Get course IDs for courses 13-18
  const course13Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'securite-reseau-firewalling'`, args: []
  });
  const course13Id = course13Result.rows[0].id;

  const course14Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'protocoles-services-reseau-avances'`, args: []
  });
  const course14Id = course14Result.rows[0].id;

  const course15Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'troubleshooting-reseau-devops'`, args: []
  });
  const course15Id = course15Result.rows[0].id;

  const course16Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'scripting-bash-automatisation'`, args: []
  });
  const course16Id = course16Result.rows[0].id;

  const course17Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'securite-hardening-linux'`, args: []
  });
  const course17Id = course17Result.rows[0].id;

  const course18Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'performance-optimisation-systeme'`, args: []
  });
  const course18Id = course18Result.rows[0].id;



  // ============================================================
  // COURSE 13: Sécurité Réseau et Firewalling (8 chapitres)
  // ============================================================

  // Ch1: Fondamentaux de la sécurité réseau
  let chId = await insertChapter(course13Id, 'Fondamentaux de la sécurité réseau', 'Comprenez les principes de base de la sécurité réseau et les modèles de protection.', 1, 60);
  await insertLessons(chId, [
    ['Modèle de menaces réseau', 'video', 12, 1, 1, 10],
    ['Surface d\'attaque', 'video', 12, 2, 0, 10],
    ['Zero Trust architecture', 'video', 14, 3, 0, 15],
    ['Defense in depth', 'video', 12, 4, 0, 12],
    ['Segmentation réseau', 'video', 10, 5, 0, 12]
  ]);

  // Ch2: Firewalls et filtrage
  chId = await insertChapter(course13Id, 'Firewalls et filtrage', 'Maîtrisez les différents types de firewalls et leur configuration.', 2, 65);
  await insertLessons(chId, [
    ['Types de firewalls', 'video', 12, 1, 0, 10],
    ['iptables/nftables avancé', 'video', 14, 2, 0, 15],
    ['pf/pfSense', 'video', 12, 3, 0, 12],
    ['Cloud firewalls (Security Groups/NACLs)', 'video', 13, 4, 0, 12],
    ['WAF - Web Application Firewall', 'video', 14, 5, 0, 15]
  ]);

  // Ch3: IDS/IPS
  chId = await insertChapter(course13Id, 'IDS/IPS', 'Déployez des systèmes de détection et prévention d\'intrusion.', 3, 50);
  await insertLessons(chId, [
    ['Concepts IDS vs IPS', 'video', 12, 1, 0, 10],
    ['Snort/Suricata', 'video', 14, 2, 0, 15],
    ['Wazuh - détection d\'intrusion', 'video', 12, 3, 0, 12],
    ['Exercice : détecter une attaque', 'exercise', 12, 4, 0, 15]
  ]);


  // Ch4: VPN et chiffrement
  chId = await insertChapter(course13Id, 'VPN et chiffrement', 'Mettez en place des VPN sécurisés et le chiffrement des communications.', 4, 65);
  await insertLessons(chId, [
    ['IPSec : architecture et tunnels', 'video', 14, 1, 0, 12],
    ['WireGuard avancé', 'video', 12, 2, 0, 12],
    ['OpenVPN en entreprise', 'video', 12, 3, 0, 12],
    ['mTLS et certificats', 'video', 13, 4, 0, 15],
    ['Exercice : VPN site-to-site', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch5: Proxy et reverse proxy
  chId = await insertChapter(course13Id, 'Proxy et reverse proxy', 'Configurez des proxies pour sécuriser et optimiser le trafic.', 5, 50);
  await insertLessons(chId, [
    ['Proxy forward et SOCKS', 'video', 12, 1, 0, 10],
    ['Nginx reverse proxy avancé', 'video', 14, 2, 0, 15],
    ['HAProxy : load balancing sécurisé', 'video', 12, 3, 0, 12],
    ['Exercice : reverse proxy avec TLS', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch6: Sécurité DNS
  chId = await insertChapter(course13Id, 'Sécurité DNS', 'Protégez votre infrastructure DNS contre les attaques.', 6, 50);
  await insertLessons(chId, [
    ['DNSSEC : signature et validation', 'video', 14, 1, 0, 12],
    ['DNS over HTTPS/TLS', 'video', 12, 2, 0, 12],
    ['Protections anti-DDoS DNS', 'video', 12, 3, 0, 12],
    ['Exercice : configurer DNSSEC', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch7: Monitoring réseau sécurité
  chId = await insertChapter(course13Id, 'Monitoring réseau sécurité', 'Surveillez votre réseau pour détecter les menaces en temps réel.', 7, 52);
  await insertLessons(chId, [
    ['Netflow et analyse de trafic', 'video', 13, 1, 0, 12],
    ['Zeek (Bro) : analyse réseau', 'video', 13, 2, 0, 12],
    ['SIEM et corrélation d\'événements', 'video', 14, 3, 0, 15],
    ['Exercice : tableau de bord sécurité', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch8: Audit et conformité
  chId = await insertChapter(course13Id, 'Audit et conformité', 'Auditez la sécurité réseau et assurez la conformité.', 8, 55);
  await insertLessons(chId, [
    ['Scan de vulnérabilités Nessus/OpenVAS', 'video', 14, 1, 0, 12],
    ['Pentest réseau : méthodologie', 'video', 13, 2, 0, 12],
    ['CIS Benchmarks réseau', 'video', 12, 3, 0, 12],
    ['Projet : audit sécurité complet', 'exercise', 16, 4, 0, 15]
  ]);

  console.log('  ✅ Cours 13 (Sécurité Réseau et Firewalling) : chapitres et leçons insérés');



  // ============================================================
  // COURSE 14: Protocoles et Services Réseau Avancés (8 chapitres)
  // ============================================================

  // Ch1: Routage dynamique
  chId = await insertChapter(course14Id, 'Routage dynamique', 'Maîtrisez les protocoles de routage dynamique pour les réseaux d\'entreprise.', 1, 65);
  await insertLessons(chId, [
    ['OSPF : Open Shortest Path First', 'video', 14, 1, 1, 10],
    ['BGP : Border Gateway Protocol', 'video', 14, 2, 0, 15],
    ['Route redistribution', 'video', 12, 3, 0, 12],
    ['VRRP/HSRP : haute disponibilité', 'video', 12, 4, 0, 12],
    ['Exercice : configuration OSPF', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch2: MPLS et VPN opérateur
  chId = await insertChapter(course14Id, 'MPLS et VPN opérateur', 'Comprenez les technologies MPLS et les VPN opérateur.', 2, 52);
  await insertLessons(chId, [
    ['MPLS : labels et LSP', 'video', 14, 1, 0, 12],
    ['L3VPN et L2VPN', 'video', 13, 2, 0, 12],
    ['SD-WAN : concepts et solutions', 'video', 13, 3, 0, 12],
    ['Exercice : architecture MPLS', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch3: QoS - Quality of Service
  chId = await insertChapter(course14Id, 'QoS - Quality of Service', 'Implémentez la qualité de service pour prioriser le trafic critique.', 3, 50);
  await insertLessons(chId, [
    ['Classification et marquage', 'video', 12, 1, 0, 12],
    ['Policing et shaping', 'video', 13, 2, 0, 12],
    ['Mécanismes de file d\'attente', 'video', 13, 3, 0, 12],
    ['Exercice : politique QoS', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch4: SDN - Software Defined Networking
  chId = await insertChapter(course14Id, 'SDN - Software Defined Networking', 'Découvrez l\'architecture SDN et ses implémentations modernes.', 4, 65);
  await insertLessons(chId, [
    ['Architecture SDN : plan de contrôle/données', 'video', 13, 1, 0, 12],
    ['OpenFlow et contrôleurs', 'video', 13, 2, 0, 12],
    ['NSX et ACI', 'video', 12, 3, 0, 12],
    ['Kubernetes networking (CNI)', 'video', 14, 4, 0, 15],
    ['Exercice : réseau SDN', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch5: Service Mesh
  chId = await insertChapter(course14Id, 'Service Mesh', 'Implémentez un service mesh pour la communication inter-services.', 5, 65);
  await insertLessons(chId, [
    ['Concepts du service mesh', 'video', 12, 1, 0, 10],
    ['Istio : architecture et installation', 'video', 14, 2, 0, 15],
    ['Envoy proxy', 'video', 13, 3, 0, 12],
    ['Linkerd : léger et simple', 'video', 12, 4, 0, 12],
    ['Exercice : mTLS avec Istio', 'exercise', 14, 5, 0, 15]
  ]);


  // Ch6: IPv6 en production
  chId = await insertChapter(course14Id, 'IPv6 en production', 'Déployez IPv6 dans vos environnements de production.', 6, 48);
  await insertLessons(chId, [
    ['Plan d\'adressage IPv6', 'video', 12, 1, 0, 12],
    ['Dual-stack et transition', 'video', 12, 2, 0, 12],
    ['IPv6 dans Kubernetes', 'video', 12, 3, 0, 12],
    ['Exercice : migration IPv6', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch7: Protocoles applicatifs
  chId = await insertChapter(course14Id, 'Protocoles applicatifs', 'Maîtrisez les protocoles applicatifs modernes.', 7, 50);
  await insertLessons(chId, [
    ['gRPC et Protocol Buffers', 'video', 14, 1, 0, 15],
    ['WebSocket et Server-Sent Events', 'video', 12, 2, 0, 12],
    ['MQTT pour l\'IoT', 'video', 12, 3, 0, 12],
    ['Exercice : API gRPC', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch8: Architectures réseau cloud
  chId = await insertChapter(course14Id, 'Architectures réseau cloud', 'Concevez des architectures réseau cloud et hybrides.', 8, 68);
  await insertLessons(chId, [
    ['VPC peering et Transit Gateway', 'video', 14, 1, 0, 12],
    ['PrivateLink et endpoints', 'video', 12, 2, 0, 12],
    ['CDN et Edge computing', 'video', 13, 3, 0, 12],
    ['Multi-cloud networking', 'video', 13, 4, 0, 12],
    ['Projet : architecture réseau hybride', 'exercise', 16, 5, 0, 15]
  ]);

  console.log('  ✅ Cours 14 (Protocoles et Services Réseau Avancés) : chapitres et leçons insérés');



  // ============================================================
  // COURSE 15: Troubleshooting Réseau pour DevOps (7 chapitres)
  // ============================================================

  // Ch1: Méthodologie de diagnostic
  chId = await insertChapter(course15Id, 'Méthodologie de diagnostic', 'Apprenez une approche systématique pour diagnostiquer les problèmes réseau.', 1, 48);
  await insertLessons(chId, [
    ['Approche systématique couche par couche', 'video', 12, 1, 1, 10],
    ['Documenter et reproduire le problème', 'video', 12, 2, 0, 12],
    ['Isolation de la cause racine', 'video', 12, 3, 0, 12],
    ['Checklist de diagnostic rapide', 'video', 12, 4, 0, 12]
  ]);

  // Ch2: Outils de diagnostic L1-L3
  chId = await insertChapter(course15Id, 'Outils de diagnostic L1-L3', 'Maîtrisez les outils de diagnostic des couches basses du réseau.', 2, 65);
  await insertLessons(chId, [
    ['ping, traceroute, mtr', 'video', 12, 1, 0, 10],
    ['ip/ifconfig', 'video', 10, 2, 0, 10],
    ['Wireshark : capture et analyse', 'video', 15, 3, 0, 15],
    ['tcpdump : filtres avancés', 'video', 14, 4, 0, 15],
    ['arp, arping et résolution MAC', 'video', 10, 5, 0, 10],
    ['Exercice : localiser une panne réseau', 'exercise', 14, 6, 0, 15]
  ]);

  // Ch3: Diagnostic DNS
  chId = await insertChapter(course15Id, 'Diagnostic DNS', 'Diagnostiquez et résolvez les problèmes de résolution DNS.', 3, 48);
  await insertLessons(chId, [
    ['dig, nslookup, host en profondeur', 'video', 13, 1, 0, 12],
    ['Problèmes de résolution courants', 'video', 12, 2, 0, 12],
    ['Cache DNS et propagation', 'video', 11, 3, 0, 12],
    ['Exercice : réparer un DNS cassé', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch4: Diagnostic HTTP/HTTPS
  chId = await insertChapter(course15Id, 'Diagnostic HTTP/HTTPS', 'Debuggez les problèmes liés aux protocoles HTTP et HTTPS.', 4, 60);
  await insertLessons(chId, [
    ['curl : options avancées de diagnostic', 'video', 13, 1, 0, 12],
    ['Problèmes de certificats TLS', 'video', 12, 2, 0, 12],
    ['Timeouts et connexions refusées', 'video', 12, 3, 0, 12],
    ['CORS et erreurs navigateur', 'video', 11, 4, 0, 12],
    ['Exercice : debugger une API', 'exercise', 12, 5, 0, 15]
  ]);


  // Ch5: Diagnostic Kubernetes réseau
  chId = await insertChapter(course15Id, 'Diagnostic Kubernetes réseau', 'Troubleshootez les problèmes réseau spécifiques à Kubernetes.', 5, 62);
  await insertLessons(chId, [
    ['Pod networking et CNI', 'video', 13, 1, 0, 12],
    ['Services non accessibles', 'video', 12, 2, 0, 12],
    ['Ingress et routing errors', 'video', 12, 3, 0, 12],
    ['Network Policies bloquantes', 'video', 12, 4, 0, 12],
    ['Exercice : troubleshoot réseau K8s', 'exercise', 13, 5, 0, 15]
  ]);

  // Ch6: Performance réseau
  chId = await insertChapter(course15Id, 'Performance réseau', 'Analysez et optimisez les performances réseau.', 6, 48);
  await insertLessons(chId, [
    ['Bandwidth et latence : iperf3', 'video', 12, 1, 0, 12],
    ['Problèmes de MTU et fragmentation', 'video', 12, 2, 0, 12],
    ['TCP tuning pour la performance', 'video', 12, 3, 0, 12],
    ['Exercice : optimiser un transfert', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch7: Scénarios réels
  chId = await insertChapter(course15Id, 'Scénarios réels', 'Résolvez des cas pratiques de troubleshooting réseau en production.', 7, 52);
  await insertLessons(chId, [
    ['Cas 1 : Service intermittent', 'exercise', 13, 1, 0, 12],
    ['Cas 2 : Latence inexpliquée', 'exercise', 13, 2, 0, 12],
    ['Cas 3 : Perte de paquets en production', 'exercise', 13, 3, 0, 12],
    ['Cas 4 : Migration réseau ratée', 'exercise', 13, 4, 0, 15]
  ]);

  console.log('  ✅ Cours 15 (Troubleshooting Réseau pour DevOps) : chapitres et leçons insérés');



  // ============================================================
  // COURSE 16: Scripting Bash et Automatisation (8 chapitres)
  // ============================================================

  // Ch1: Fondamentaux du scripting
  chId = await insertChapter(course16Id, 'Fondamentaux du scripting', 'Maîtrisez les bases du scripting Bash.', 1, 55);
  await insertLessons(chId, [
    ['Structure d\'un script Bash', 'video', 10, 1, 1, 10],
    ['Variables et types de données', 'video', 12, 2, 0, 12],
    ['Entrées/sorties et arguments', 'video', 11, 3, 0, 12],
    ['Codes de retour et exit status', 'video', 10, 4, 0, 10],
    ['Exercice : premier script utile', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch2: Structures de contrôle
  chId = await insertChapter(course16Id, 'Structures de contrôle', 'Maîtrisez les structures de contrôle et les fonctions Bash.', 2, 58);
  await insertLessons(chId, [
    ['Conditions if/elif/else', 'video', 12, 1, 0, 12],
    ['Boucles for/while/until', 'video', 12, 2, 0, 12],
    ['Case et select', 'video', 10, 3, 0, 10],
    ['Fonctions et portée des variables', 'video', 12, 4, 0, 12],
    ['Exercice : script de déploiement', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch3: Manipulation de texte
  chId = await insertChapter(course16Id, 'Manipulation de texte', 'Transformez et analysez du texte avec les outils Unix.', 3, 62);
  await insertLessons(chId, [
    ['grep, sed, awk en profondeur', 'video', 15, 1, 0, 15],
    ['Expressions régulières avancées', 'video', 13, 2, 0, 12],
    ['cut, sort, uniq, tr', 'video', 12, 3, 0, 12],
    ['jq : manipulation de JSON', 'video', 12, 4, 0, 12],
    ['Exercice : parser des logs', 'exercise', 10, 5, 0, 15]
  ]);

  // Ch4: Gestion de fichiers et processus
  chId = await insertChapter(course16Id, 'Gestion de fichiers et processus', 'Gérez fichiers et processus de manière avancée.', 4, 48);
  await insertLessons(chId, [
    ['Opérations sur les fichiers/répertoires', 'video', 12, 1, 0, 10],
    ['Redirection et pipes avancés', 'video', 12, 2, 0, 12],
    ['Gestion des processus en arrière-plan', 'video', 12, 3, 0, 12],
    ['Exercice : script de sauvegarde', 'exercise', 12, 4, 0, 15]
  ]);


  // Ch5: Scripts d'administration
  chId = await insertChapter(course16Id, 'Scripts d\'administration', 'Automatisez les tâches d\'administration système courantes.', 5, 60);
  await insertLessons(chId, [
    ['Monitoring système automatisé', 'video', 12, 1, 0, 12],
    ['Gestion des utilisateurs et permissions', 'video', 12, 2, 0, 12],
    ['Log rotation et archivage', 'video', 12, 3, 0, 12],
    ['Cron jobs et planification', 'video', 12, 4, 0, 12],
    ['Exercice : script de health-check', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch6: Scripting réseau
  chId = await insertChapter(course16Id, 'Scripting réseau', 'Automatisez les tâches réseau avec des scripts.', 6, 48);
  await insertLessons(chId, [
    ['Tests de connectivité automatisés', 'video', 12, 1, 0, 12],
    ['Scan de ports et discovery', 'video', 12, 2, 0, 12],
    ['Automatisation SSH avec expect/sshpass', 'video', 12, 3, 0, 12],
    ['Exercice : inventaire réseau automatique', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch7: Bonnes pratiques
  chId = await insertChapter(course16Id, 'Bonnes pratiques', 'Écrivez du code shell professionnel et maintenable.', 7, 46);
  await insertLessons(chId, [
    ['set -euo pipefail et mode strict', 'video', 12, 1, 0, 12],
    ['Logging et debugging (set -x, trap)', 'video', 12, 2, 0, 12],
    ['Shellcheck et qualité de code', 'video', 10, 3, 0, 12],
    ['Portabilité POSIX vs Bash', 'video', 12, 4, 0, 12]
  ]);

  // Ch8: Projets complets
  chId = await insertChapter(course16Id, 'Projets complets', 'Mettez en pratique toutes vos compétences avec des projets réels.', 8, 60);
  await insertLessons(chId, [
    ['Projet 1 : Outil de déploiement', 'exercise', 15, 1, 0, 15],
    ['Projet 2 : Monitoring serveur complet', 'exercise', 15, 2, 0, 15],
    ['Projet 3 : Gestionnaire de certificats', 'exercise', 15, 3, 0, 15],
    ['Projet 4 : Pipeline de backup automatisé', 'exercise', 15, 4, 0, 15]
  ]);

  console.log('  ✅ Cours 16 (Scripting Bash et Automatisation) : chapitres et leçons insérés');



  // ============================================================
  // COURSE 17: Sécurité et Hardening Linux (8 chapitres)
  // ============================================================

  // Ch1: Principes de sécurité Linux
  chId = await insertChapter(course17Id, 'Principes de sécurité Linux', 'Comprenez les principes fondamentaux de la sécurité serveur Linux.', 1, 58);
  await insertLessons(chId, [
    ['Surface d\'attaque d\'un serveur Linux', 'video', 12, 1, 1, 10],
    ['Principe du moindre privilège', 'video', 11, 2, 0, 12],
    ['CIS Benchmarks : introduction', 'video', 12, 3, 0, 12],
    ['Threat model pour serveurs', 'video', 11, 4, 0, 12],
    ['Exercice : évaluation de sécurité', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch2: Gestion des accès
  chId = await insertChapter(course17Id, 'Gestion des accès', 'Sécurisez les accès à vos serveurs Linux.', 2, 60);
  await insertLessons(chId, [
    ['PAM : configuration avancée', 'video', 13, 1, 0, 12],
    ['sudo : règles granulaires', 'video', 12, 2, 0, 12],
    ['SSH hardening : clés, 2FA, restrictions', 'video', 13, 3, 0, 15],
    ['Fail2ban et protection brute-force', 'video', 10, 4, 0, 10],
    ['Exercice : hardening SSH complet', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch3: SELinux et AppArmor
  chId = await insertChapter(course17Id, 'SELinux et AppArmor', 'Implémentez le contrôle d\'accès obligatoire sur Linux.', 3, 62);
  await insertLessons(chId, [
    ['SELinux : modes et politiques', 'video', 13, 1, 0, 12],
    ['SELinux : contextes et booleans', 'video', 13, 2, 0, 12],
    ['AppArmor : profils et modes', 'video', 12, 3, 0, 12],
    ['Choix entre SELinux et AppArmor', 'video', 10, 4, 0, 10],
    ['Exercice : confiner un service', 'exercise', 14, 5, 0, 15]
  ]);

  // Ch4: Chiffrement et certificats
  chId = await insertChapter(course17Id, 'Chiffrement et certificats', 'Chiffrez vos données et gérez les certificats.', 4, 50);
  await insertLessons(chId, [
    ['LUKS : chiffrement de disque', 'video', 13, 1, 0, 12],
    ['GPG : chiffrement de fichiers', 'video', 12, 2, 0, 12],
    ['PKI interne : gestion de certificats', 'video', 13, 3, 0, 15],
    ['Exercice : déployer une PKI', 'exercise', 12, 4, 0, 15]
  ]);


  // Ch5: Audit et journalisation
  chId = await insertChapter(course17Id, 'Audit et journalisation', 'Mettez en place un système d\'audit et de journalisation complet.', 5, 62);
  await insertLessons(chId, [
    ['auditd : configuration et règles', 'video', 13, 1, 0, 12],
    ['Journald et syslog avancés', 'video', 12, 2, 0, 12],
    ['Centralisation des logs (rsyslog/ELK)', 'video', 13, 3, 0, 15],
    ['AIDE : détection d\'intégrité', 'video', 12, 4, 0, 12],
    ['Exercice : système d\'audit complet', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch6: Sécurité réseau Linux
  chId = await insertChapter(course17Id, 'Sécurité réseau Linux', 'Sécurisez la couche réseau de vos serveurs Linux.', 6, 48);
  await insertLessons(chId, [
    ['nftables : règles avancées', 'video', 13, 1, 0, 12],
    ['TCP Wrappers et xinetd', 'video', 11, 2, 0, 10],
    ['Isolation avec namespaces', 'video', 12, 3, 0, 12],
    ['Exercice : micro-segmentation', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch7: Conteneurs et sécurité
  chId = await insertChapter(course17Id, 'Conteneurs et sécurité', 'Sécurisez vos environnements conteneurisés au niveau système.', 7, 50);
  await insertLessons(chId, [
    ['Sécurité du runtime (gVisor, Kata)', 'video', 13, 1, 0, 12],
    ['Rootless containers', 'video', 12, 2, 0, 12],
    ['Seccomp et capabilities', 'video', 13, 3, 0, 15],
    ['Exercice : conteneur durci', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch8: Conformité et automatisation
  chId = await insertChapter(course17Id, 'Conformité et automatisation', 'Automatisez le hardening et la conformité de vos serveurs.', 8, 55);
  await insertLessons(chId, [
    ['OpenSCAP : scan de conformité', 'video', 13, 1, 0, 12],
    ['Ansible Hardening : automatiser le CIS', 'video', 14, 2, 0, 15],
    ['Lynis : audit de sécurité', 'video', 12, 3, 0, 12],
    ['Projet : hardening automatisé complet', 'exercise', 16, 4, 0, 15]
  ]);

  console.log('  ✅ Cours 17 (Sécurité et Hardening Linux) : chapitres et leçons insérés');



  // ============================================================
  // COURSE 18: Performance et Optimisation Système (7 chapitres)
  // ============================================================

  // Ch1: Méthodologie d'analyse
  chId = await insertChapter(course18Id, 'Méthodologie d\'analyse', 'Apprenez les méthodologies d\'analyse de performance système.', 1, 48);
  await insertLessons(chId, [
    ['USE Method (Utilization/Saturation/Errors)', 'video', 13, 1, 1, 10],
    ['RED Method pour les services', 'video', 11, 2, 0, 12],
    ['Outils de profilage : perf, strace', 'video', 12, 3, 0, 12],
    ['Exercice : identifier un goulot', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch2: CPU et processus
  chId = await insertChapter(course18Id, 'CPU et processus', 'Analysez et optimisez l\'utilisation CPU de vos serveurs.', 2, 62);
  await insertLessons(chId, [
    ['Architecture CPU et scheduling Linux', 'video', 14, 1, 0, 12],
    ['Analyse avec top/htop/pidstat', 'video', 12, 2, 0, 12],
    ['Nice/renice et cgroups v2', 'video', 12, 3, 0, 12],
    ['NUMA awareness et CPU pinning', 'video', 12, 4, 0, 12],
    ['Exercice : optimiser un processus CPU-bound', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch3: Mémoire
  chId = await insertChapter(course18Id, 'Mémoire', 'Diagnostiquez et optimisez l\'utilisation mémoire.', 3, 60);
  await insertLessons(chId, [
    ['Mémoire virtuelle et swap', 'video', 13, 1, 0, 12],
    ['OOM Killer et memory pressure', 'video', 12, 2, 0, 12],
    ['Huge Pages et THP', 'video', 12, 3, 0, 12],
    ['Analyse avec vmstat/free/smem', 'video', 11, 4, 0, 12],
    ['Exercice : diagnostic fuite mémoire', 'exercise', 12, 5, 0, 15]
  ]);

  // Ch4: Stockage et I/O
  chId = await insertChapter(course18Id, 'Stockage et I/O', 'Optimisez les performances de stockage et d\'entrées/sorties.', 4, 64);
  await insertLessons(chId, [
    ['Schedulers I/O (mq-deadline, BFQ, none)', 'video', 13, 1, 0, 12],
    ['Analyse avec iostat/iotop', 'video', 12, 2, 0, 12],
    ['Filesystem tuning (ext4, XFS, ZFS)', 'video', 14, 3, 0, 15],
    ['RAID et LVM optimisation', 'video', 12, 4, 0, 12],
    ['Exercice : benchmark I/O', 'exercise', 13, 5, 0, 15]
  ]);


  // Ch5: Réseau
  chId = await insertChapter(course18Id, 'Réseau', 'Optimisez les performances réseau de vos serveurs.', 5, 48);
  await insertLessons(chId, [
    ['TCP tuning : buffers et congestion', 'video', 13, 1, 0, 12],
    ['Network stack : RSS/RPS/XPS', 'video', 12, 2, 0, 12],
    ['Interrupts et NAPI', 'video', 11, 3, 0, 12],
    ['Exercice : optimiser un serveur haute charge', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch6: Kernel tuning
  chId = await insertChapter(course18Id, 'Kernel tuning', 'Ajustez les paramètres du kernel Linux pour la performance.', 6, 48);
  await insertLessons(chId, [
    ['sysctl : paramètres essentiels', 'video', 13, 1, 0, 12],
    ['Limites système (ulimit, /proc/sys)', 'video', 12, 2, 0, 12],
    ['Kernel compilation personnalisée', 'video', 11, 3, 0, 12],
    ['Exercice : tuning pour production', 'exercise', 12, 4, 0, 15]
  ]);

  // Ch7: Applications et services
  chId = await insertChapter(course18Id, 'Applications et services', 'Optimisez les performances de vos applications et services.', 7, 52);
  await insertLessons(chId, [
    ['Profilage d\'applications (flamegraphs)', 'video', 14, 1, 0, 12],
    ['Connection pooling et caching', 'video', 12, 2, 0, 12],
    ['Load testing avec k6/wrk/hey', 'video', 12, 3, 0, 12],
    ['Projet : optimisation bout en bout', 'exercise', 14, 4, 0, 15]
  ]);

  console.log('  ✅ Cours 18 (Performance et Optimisation Système) : chapitres et leçons insérés');
  console.log('\n📚 Tous les chapitres et leçons des cours 13-18 ont été insérés avec succès !');
}

module.exports = { seedExtraCourses };

// Standalone runner
if (require.main === module) {
  const { getDb } = require('./connection');
  require('dotenv').config();

  async function run() {
    const db = getDb();
    await seedExtraCourses(db);
  }

  run().catch((err) => {
    console.error('❌ Erreur lors du seeding des cours supplémentaires:', err);
    process.exit(1);
  });
}
