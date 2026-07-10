/**
 * Seed chapters and lessons for the Citrix course
 */

async function seedCitrixCourse(db) {
  console.log('\n📚 Insertion des chapitres et leçons du cours Citrix...');

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

  // Get course ID
  const courseResult = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'citrix-virtual-apps-desktops'`, args: []
  });
  if (courseResult.rows.length === 0) {
    console.log('  ⚠️ Cours Citrix non trouvé, skip');
    return;
  }
  const courseId = courseResult.rows[0].id;

  // ============================================================
  // Ch1: Introduction et Architecture Citrix
  // ============================================================
  let chId = await insertChapter(courseId, 'Introduction et Architecture Citrix', 'Découvrez l\'écosystème Citrix, son histoire et l\'architecture de Virtual Apps and Desktops.', 1, 70);
  await insertLessons(chId, [
    ['Histoire de Citrix et évolution des produits', 'video', 12, 1, 1, 10],
    ['Citrix Virtual Apps vs Virtual Desktops : différences', 'video', 14, 2, 0, 12],
    ['Architecture FlexCast et modèles de livraison', 'video', 15, 3, 0, 15],
    ['Composants principaux : DDC, VDA, StoreFront, ADC', 'video', 16, 4, 0, 15],
    ['Flux de connexion utilisateur de bout en bout', 'video', 13, 5, 0, 12],
    ['Licences Citrix : types et gestion', 'video', 12, 6, 0, 10],
    ['Citrix Cloud vs On-Premises : comparaison', 'video', 14, 7, 0, 12]
  ]);

  // ============================================================
  // Ch2: Delivery Controller et Site Configuration
  // ============================================================
  chId = await insertChapter(courseId, 'Delivery Controller et Site Configuration', 'Installez et configurez le Delivery Controller, cerveau de l\'infrastructure Citrix.', 2, 75);
  await insertLessons(chId, [
    ['Prérequis et dimensionnement du Delivery Controller', 'video', 12, 1, 0, 12],
    ['Installation du DDC étape par étape', 'video', 18, 2, 0, 15],
    ['Configuration du Site Citrix', 'video', 15, 3, 0, 12],
    ['Base de données SQL : configuration et haute dispo', 'video', 14, 4, 0, 12],
    ['Citrix Studio et interface d\'administration', 'video', 12, 5, 0, 10],
    ['Citrix Director : monitoring en temps réel', 'video', 13, 6, 0, 12],
    ['Exercice : déployer un Delivery Controller', 'exercise', 16, 7, 0, 15]
  ]);

  // ============================================================
  // Ch3: Virtual Delivery Agent (VDA)
  // ============================================================
  chId = await insertChapter(courseId, 'Virtual Delivery Agent (VDA)', 'Déployez et configurez les VDA pour les postes de travail et serveurs d\'applications.', 3, 70);
  await insertLessons(chId, [
    ['VDA Windows Desktop vs Server OS', 'video', 12, 1, 0, 10],
    ['Installation du VDA : options et composants', 'video', 15, 2, 0, 12],
    ['Machine Catalogs : types (MCS, PVS, manuel)', 'video', 16, 3, 0, 15],
    ['Machine Creation Services (MCS) en détail', 'video', 15, 4, 0, 15],
    ['Provisioning Services (PVS) : architecture vDisk', 'video', 16, 5, 0, 15],
    ['Delivery Groups : création et configuration', 'video', 14, 6, 0, 12],
    ['Image management et golden image', 'video', 13, 7, 0, 12],
    ['Exercice : déployer un pool de VDA', 'exercise', 15, 8, 0, 15]
  ]);

  // ============================================================
  // Ch4: Citrix StoreFront et Workspace
  // ============================================================
  chId = await insertChapter(courseId, 'Citrix StoreFront et Workspace', 'Configurez le portail d\'accès aux applications et bureaux pour les utilisateurs.', 4, 60);
  await insertLessons(chId, [
    ['StoreFront : architecture et rôle', 'video', 12, 1, 0, 10],
    ['Installation et configuration de StoreFront', 'video', 15, 2, 0, 12],
    ['Stores, Receiver et agrégation de ressources', 'video', 14, 3, 0, 12],
    ['Citrix Workspace App : déploiement multi-plateforme', 'video', 13, 4, 0, 12],
    ['Citrix Workspace (Cloud) vs StoreFront', 'video', 12, 5, 0, 12],
    ['Personnalisation de l\'interface utilisateur', 'video', 11, 6, 0, 10],
    ['Exercice : configurer StoreFront avec HA', 'exercise', 14, 7, 0, 15]
  ]);

  // ============================================================
  // Ch5: Citrix ADC (NetScaler)
  // ============================================================
  chId = await insertChapter(courseId, 'Citrix ADC (NetScaler)', 'Maîtrisez le Citrix ADC pour le load balancing, le SSL offloading et le Gateway.', 5, 80);
  await insertLessons(chId, [
    ['Architecture Citrix ADC : VPX, MPX, SDX, CPX', 'video', 14, 1, 0, 12],
    ['Installation et configuration initiale', 'video', 15, 2, 0, 12],
    ['Load Balancing : virtual servers et services', 'video', 16, 3, 0, 15],
    ['SSL Offloading et gestion des certificats', 'video', 14, 4, 0, 12],
    ['Citrix Gateway : accès distant sécurisé', 'video', 16, 5, 0, 15],
    ['ICA Proxy et HDX Proxy', 'video', 13, 6, 0, 12],
    ['Content Switching et Responder policies', 'video', 14, 7, 0, 12],
    ['GSLB : Global Server Load Balancing', 'video', 13, 8, 0, 12],
    ['Exercice : configurer ADC pour Citrix Gateway', 'exercise', 16, 9, 0, 15]
  ]);

  // ============================================================
  // Ch6: Policies, Profils et UEM
  // ============================================================
  chId = await insertChapter(courseId, 'Policies, Profils et UEM', 'Gérez l\'expérience utilisateur avec les policies Citrix, les profils et WEM.', 6, 65);
  await insertLessons(chId, [
    ['Citrix Policies : priorité et filtres', 'video', 14, 1, 0, 12],
    ['Policies HDX : optimisation du protocole', 'video', 15, 2, 0, 15],
    ['Redirection de périphériques (USB, imprimantes, audio)', 'video', 14, 3, 0, 12],
    ['Gestion des profils utilisateurs (UPM/CPM)', 'video', 14, 4, 0, 12],
    ['Citrix Profile Management : configuration avancée', 'video', 13, 5, 0, 12],
    ['Workspace Environment Management (WEM)', 'video', 15, 6, 0, 15],
    ['Folder Redirection et fichiers offline', 'video', 12, 7, 0, 10],
    ['Exercice : configurer policies et profils', 'exercise', 14, 8, 0, 15]
  ]);

  // ============================================================
  // Ch7: HDX et Optimisation des Performances
  // ============================================================
  chId = await insertChapter(courseId, 'HDX et Optimisation des Performances', 'Optimisez le protocole HDX pour offrir la meilleure expérience utilisateur.', 7, 60);
  await insertLessons(chId, [
    ['Protocole HDX/ICA : architecture et canaux virtuels', 'video', 14, 1, 0, 12],
    ['HDX adaptive transport (EDT vs TCP)', 'video', 13, 2, 0, 12],
    ['Optimisation graphique : Thinwire, H.264, H.265', 'video', 15, 3, 0, 15],
    ['Optimisation multimédia et redirection vidéo', 'video', 13, 4, 0, 12],
    ['Optimisation réseau : compression, QoS, bandwidth', 'video', 14, 5, 0, 12],
    ['Citrix SD-WAN pour les connexions distantes', 'video', 13, 6, 0, 12],
    ['Exercice : tuning HDX pour réseau lent', 'exercise', 14, 7, 0, 15]
  ]);

  // ============================================================
  // Ch8: Sécurité Citrix
  // ============================================================
  chId = await insertChapter(courseId, 'Sécurité Citrix', 'Sécurisez votre environnement Citrix de bout en bout.', 8, 60);
  await insertLessons(chId, [
    ['Authentification : LDAP, RADIUS, SAML, OAuth', 'video', 14, 1, 0, 12],
    ['Multi-factor Authentication (MFA) avec Citrix', 'video', 13, 2, 0, 12],
    ['SmartAccess et SmartControl : accès conditionnel', 'video', 14, 3, 0, 15],
    ['App Protection : anti-keylogging et anti-screenshot', 'video', 12, 4, 0, 12],
    ['Zones et isolation des workloads', 'video', 12, 5, 0, 12],
    ['Chiffrement et TLS dans l\'environnement Citrix', 'video', 13, 6, 0, 12],
    ['Exercice : hardening d\'un environnement Citrix', 'exercise', 15, 7, 0, 15]
  ]);

  // ============================================================
  // Ch9: Haute Disponibilité et Disaster Recovery
  // ============================================================
  chId = await insertChapter(courseId, 'Haute Disponibilité et Disaster Recovery', 'Concevez une infrastructure Citrix résiliente et hautement disponible.', 9, 55);
  await insertLessons(chId, [
    ['HA du Delivery Controller : N+1 et zones', 'video', 13, 1, 0, 12],
    ['Base de données SQL : AlwaysOn et mirroring', 'video', 14, 2, 0, 12],
    ['StoreFront : groupes de serveurs et failover', 'video', 13, 3, 0, 12],
    ['ADC HA pair et clustering', 'video', 14, 4, 0, 15],
    ['Local Host Cache : fonctionnement hors connexion', 'video', 13, 5, 0, 12],
    ['DR : plan de reprise et RPO/RTO', 'video', 12, 6, 0, 12],
    ['Exercice : simuler un failover complet', 'exercise', 14, 7, 0, 15]
  ]);

  // ============================================================
  // Ch10: Monitoring et Troubleshooting
  // ============================================================
  chId = await insertChapter(courseId, 'Monitoring et Troubleshooting', 'Surveillez et diagnostiquez les problèmes de votre infrastructure Citrix.', 10, 65);
  await insertLessons(chId, [
    ['Citrix Director : tableaux de bord et alertes', 'video', 13, 1, 0, 12],
    ['Citrix Analytics : détection des anomalies', 'video', 13, 2, 0, 12],
    ['Logs et événements : DDC, VDA, StoreFront', 'video', 14, 3, 0, 12],
    ['Troubleshooting des connexions ICA/HDX', 'video', 15, 4, 0, 15],
    ['Problèmes courants : lenteur, déconnexions, black screen', 'video', 14, 5, 0, 12],
    ['CDFControl et traces réseau avancées', 'video', 13, 6, 0, 12],
    ['Scout et Health Check', 'video', 12, 7, 0, 10],
    ['Exercice : diagnostiquer un incident Citrix', 'exercise', 15, 8, 0, 15]
  ]);

  // ============================================================
  // Ch11: Citrix Cloud et Migration
  // ============================================================
  chId = await insertChapter(courseId, 'Citrix Cloud et Migration', 'Migrez vers Citrix Cloud et gérez un environnement hybride.', 11, 55);
  await insertLessons(chId, [
    ['Citrix Cloud : architecture et services', 'video', 14, 1, 0, 12],
    ['Cloud Connectors : installation et rôle', 'video', 13, 2, 0, 12],
    ['DaaS : Desktop as a Service', 'video', 13, 3, 0, 12],
    ['Migration On-Prem vers Cloud : stratégie', 'video', 15, 4, 0, 15],
    ['Environnement hybride : gestion et best practices', 'video', 13, 5, 0, 12],
    ['Citrix Autoscale : optimisation des coûts cloud', 'video', 12, 6, 0, 12],
    ['Exercice : configurer Citrix Cloud hybride', 'exercise', 14, 7, 0, 15]
  ]);

  // ============================================================
  // Ch12: Projet Final et Certification
  // ============================================================
  chId = await insertChapter(courseId, 'Projet Final et Certification', 'Mettez en pratique l\'ensemble des compétences et préparez la certification CCA-V.', 12, 60);
  await insertLessons(chId, [
    ['Projet : concevoir une architecture Citrix complète', 'exercise', 18, 1, 0, 15],
    ['Projet : déployer l\'infrastructure de A à Z', 'exercise', 18, 2, 0, 15],
    ['Projet : configurer le réseau et la sécurité', 'exercise', 16, 3, 0, 15],
    ['Projet : tests de charge et optimisation', 'exercise', 14, 4, 0, 15],
    ['Préparation certification CCA-V : conseils', 'video', 12, 5, 0, 10],
    ['QCM d\'entraînement CCA-V', 'quiz', 15, 6, 0, 15]
  ]);

  console.log('  ✅ Cours Citrix (12 chapitres, 88 leçons) inséré avec succès !');
}

module.exports = { seedCitrixCourse };

if (require.main === module) {
  const { getDb } = require('./connection');
  require('dotenv').config();
  seedCitrixCourse(getDb()).catch(console.error);
}
