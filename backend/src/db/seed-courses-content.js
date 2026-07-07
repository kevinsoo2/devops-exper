/**
 * Seed chapters and lessons for all courses
 * This module contains comprehensive course content for the DevOps training platform
 */

async function seedCoursesContent(db) {
  console.log('\n📚 Insertion des chapitres et leçons...');

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


  // ============================================================
  // COURSE 1: Maîtriser Docker (10 chapitres)
  // ============================================================

  // Ch1: Introduction à la conteneurisation
  let chId = await insertChapter(1, 'Introduction à la conteneurisation', 'Découvrez les fondements de la conteneurisation et pourquoi Docker a révolutionné le déploiement.', 1, 55);
  await insertLessons(chId, [
    ['Histoire des conteneurs et évolution', 'video', 10, 1, 1, 10],
    ['VM vs Conteneurs : comprendre les différences', 'video', 12, 2, 0, 10],
    ['Architecture Docker : daemon, client, registry', 'video', 15, 3, 0, 15],
    ['Installation de Docker sur Linux/Mac/Windows', 'text', 8, 4, 0, 10],
    ['Lancer votre premier conteneur', 'exercise', 10, 5, 0, 15],
  ]);

  // Ch2: Images Docker
  chId = await insertChapter(1, 'Images Docker', 'Maîtrisez la création et l\'optimisation d\'images Docker.', 2, 70);
  await insertLessons(chId, [
    ['Comprendre le Dockerfile', 'video', 12, 1, 0, 10],
    ['Instructions FROM, RUN, COPY et ADD', 'video', 15, 2, 0, 15],
    ['Multi-stage builds pour des images légères', 'video', 12, 3, 0, 15],
    ['Optimisation de la taille des images', 'video', 10, 4, 0, 15],
    ['Docker Hub et registries privés', 'text', 8, 5, 0, 10],
    ['Best practices pour les Dockerfiles', 'quiz', 13, 6, 0, 20],
  ]);

  // Ch3: Gestion des conteneurs
  chId = await insertChapter(1, 'Gestion des conteneurs', 'Apprenez à gérer le cycle de vie complet des conteneurs Docker.', 3, 55);
  await insertLessons(chId, [
    ['Cycle de vie d\'un conteneur', 'video', 10, 1, 0, 10],
    ['Commandes essentielles : run, stop, rm, exec', 'video', 12, 2, 0, 15],
    ['Variables d\'environnement et configuration', 'video', 10, 3, 0, 10],
    ['Ressources et limites CPU/mémoire', 'video', 12, 4, 0, 15],
    ['Debugging : logs, inspect, attach', 'exercise', 11, 5, 0, 15],
  ]);


  // Ch4: Volumes et persistance
  chId = await insertChapter(1, 'Volumes et persistance des données', 'Gérez la persistance des données avec les volumes Docker.', 4, 45);
  await insertLessons(chId, [
    ['Types de volumes Docker', 'video', 10, 1, 0, 10],
    ['Bind mounts : montage de répertoires hôte', 'video', 12, 2, 0, 15],
    ['Volumes nommés et gestion', 'video', 10, 3, 0, 10],
    ['Backup et restauration de données', 'exercise', 13, 4, 0, 20],
  ]);

  // Ch5: Réseaux Docker
  chId = await insertChapter(1, 'Réseaux Docker', 'Comprenez et configurez les réseaux Docker pour la communication inter-conteneurs.', 5, 60);
  await insertLessons(chId, [
    ['Types de réseaux Docker', 'video', 10, 1, 0, 10],
    ['Bridge network : réseau par défaut', 'video', 12, 2, 0, 15],
    ['Host network et cas d\'usage', 'video', 10, 3, 0, 10],
    ['Overlay network pour le multi-host', 'video', 15, 4, 0, 15],
    ['DNS interne et service discovery', 'exercise', 13, 5, 0, 20],
  ]);

  // Ch6: Docker Compose
  chId = await insertChapter(1, 'Docker Compose', 'Orchestrez des applications multi-conteneurs avec Docker Compose.', 6, 75);
  await insertLessons(chId, [
    ['Syntaxe YAML et structure du fichier', 'video', 10, 1, 0, 10],
    ['Définir des services et leurs dépendances', 'video', 12, 2, 0, 15],
    ['Configuration des réseaux Compose', 'video', 12, 3, 0, 15],
    ['Gestion des volumes dans Compose', 'video', 10, 4, 0, 10],
    ['Environnements et fichiers .env', 'video', 12, 5, 0, 15],
    ['Profiles et déploiement conditionnel', 'exercise', 19, 6, 0, 20],
  ]);

  // Ch7: Sécurité Docker
  chId = await insertChapter(1, 'Sécurité Docker', 'Appliquez les bonnes pratiques de sécurité pour vos conteneurs Docker.', 7, 55);
  await insertLessons(chId, [
    ['Bonnes pratiques de sécurité Docker', 'video', 10, 1, 0, 10],
    ['Exécution en utilisateur non-root', 'video', 12, 2, 0, 15],
    ['Scanning d\'images avec Trivy et Snyk', 'video', 12, 3, 0, 15],
    ['Docker secrets et gestion des données sensibles', 'video', 10, 4, 0, 15],
    ['Docker Content Trust et signature d\'images', 'quiz', 11, 5, 0, 20],
  ]);


  // Ch8: Docker en production
  chId = await insertChapter(1, 'Docker en production', 'Préparez vos conteneurs Docker pour un environnement de production.', 8, 50);
  await insertLessons(chId, [
    ['Health checks et monitoring de conteneurs', 'video', 12, 1, 0, 15],
    ['Logging : drivers et bonnes pratiques', 'video', 12, 2, 0, 15],
    ['Monitoring des conteneurs avec cAdvisor', 'video', 13, 3, 0, 15],
    ['Introduction à l\'orchestration', 'video', 13, 4, 0, 10],
  ]);

  // Ch9: Registries privés
  chId = await insertChapter(1, 'Registries privés', 'Déployez et gérez vos propres registries Docker.', 9, 40);
  await insertLessons(chId, [
    ['Harbor : registry enterprise open source', 'video', 15, 1, 0, 15],
    ['GitLab Container Registry', 'video', 12, 2, 0, 10],
    ['AWS ECR : Elastic Container Registry', 'exercise', 13, 3, 0, 15],
  ]);

  // Ch10: Projet final Docker
  chId = await insertChapter(1, 'Projet final : Application microservices', 'Mettez en pratique toutes vos connaissances Docker dans un projet complet.', 10, 60);
  await insertLessons(chId, [
    ['Architecture microservices avec Docker', 'video', 15, 1, 0, 15],
    ['Implémentation complète multi-services', 'exercise', 25, 2, 0, 25],
    ['Déploiement et tests de l\'application', 'exercise', 20, 3, 0, 25],
  ]);

  console.log('  ✅ Cours 1 (Docker) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 2: Kubernetes en Production (12 chapitres)
  // ============================================================

  // Ch1: Fondamentaux K8s
  chId = await insertChapter(2, 'Fondamentaux Kubernetes', 'Comprenez l\'architecture et les composants fondamentaux de Kubernetes.', 1, 70);
  await insertLessons(chId, [
    ['Architecture globale de Kubernetes', 'video', 12, 1, 1, 10],
    ['Le Control Plane : cerveau du cluster', 'video', 12, 2, 0, 15],
    ['Worker Nodes et kubelet', 'video', 10, 3, 0, 10],
    ['etcd : le stockage distribué', 'video', 10, 4, 0, 15],
    ['API Server et communication', 'video', 12, 5, 0, 15],
    ['kubectl : l\'outil en ligne de commande', 'exercise', 14, 6, 0, 15],
  ]);

  // Ch2: Pods et conteneurs
  chId = await insertChapter(2, 'Pods et conteneurs', 'Maîtrisez l\'unité de base de Kubernetes : le Pod.', 2, 60);
  await insertLessons(chId, [
    ['Définition et anatomie d\'un Pod', 'video', 12, 1, 0, 10],
    ['Cycle de vie des Pods (lifecycle)', 'video', 12, 2, 0, 15],
    ['Init containers et séquence de démarrage', 'video', 10, 3, 0, 15],
    ['Sidecar containers et patterns', 'video', 12, 4, 0, 15],
    ['Pod Disruption Budgets', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch3: Workloads
  chId = await insertChapter(2, 'Workloads Kubernetes', 'Découvrez les différents types de workloads pour déployer vos applications.', 3, 75);
  await insertLessons(chId, [
    ['Deployments : déploiement déclaratif', 'video', 12, 1, 0, 15],
    ['ReplicaSets et haute disponibilité', 'video', 10, 2, 0, 10],
    ['StatefulSets pour applications stateful', 'video', 15, 3, 0, 15],
    ['DaemonSets : un pod par nœud', 'video', 10, 4, 0, 15],
    ['Jobs : tâches ponctuelles', 'video', 12, 5, 0, 10],
    ['CronJobs : tâches planifiées', 'exercise', 16, 6, 0, 20],
  ]);

  // Ch4: Services et networking
  chId = await insertChapter(2, 'Services et Networking', 'Configurez la communication réseau dans votre cluster Kubernetes.', 4, 75);
  await insertLessons(chId, [
    ['Service ClusterIP : communication interne', 'video', 12, 1, 0, 10],
    ['Service NodePort : accès externe simple', 'video', 10, 2, 0, 10],
    ['Service LoadBalancer : production ready', 'video', 12, 3, 0, 15],
    ['Headless Services et DNS', 'video', 10, 4, 0, 15],
    ['Ingress Controllers et routing HTTP', 'video', 15, 5, 0, 15],
    ['Network Policies : sécurité réseau', 'exercise', 16, 6, 0, 20],
  ]);


  // Ch5: Configuration
  chId = await insertChapter(2, 'Configuration et gestion', 'Gérez la configuration de vos applications Kubernetes.', 5, 60);
  await insertLessons(chId, [
    ['ConfigMaps : configuration externalisée', 'video', 12, 1, 0, 10],
    ['Secrets : données sensibles', 'video', 12, 2, 0, 15],
    ['Variables d\'environnement et injection', 'video', 10, 3, 0, 10],
    ['Resource Quotas par namespace', 'video', 12, 4, 0, 15],
    ['LimitRanges et contraintes de ressources', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch6: Stockage
  chId = await insertChapter(2, 'Stockage Kubernetes', 'Gérez la persistance des données dans Kubernetes.', 6, 60);
  await insertLessons(chId, [
    ['Volumes : types et utilisation', 'video', 12, 1, 0, 10],
    ['PersistentVolumes (PV)', 'video', 12, 2, 0, 15],
    ['PersistentVolumeClaims (PVC)', 'video', 12, 3, 0, 15],
    ['StorageClasses et provisionnement dynamique', 'video', 12, 4, 0, 15],
    ['CSI Drivers et intégrations cloud', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch7: RBAC et sécurité
  chId = await insertChapter(2, 'RBAC et Sécurité', 'Sécurisez votre cluster Kubernetes avec RBAC et les standards de sécurité.', 7, 75);
  await insertLessons(chId, [
    ['ServiceAccounts et identités', 'video', 12, 1, 0, 10],
    ['Roles et permissions namespace-scoped', 'video', 12, 2, 0, 15],
    ['ClusterRoles : permissions cluster-wide', 'video', 12, 3, 0, 15],
    ['RoleBindings et ClusterRoleBindings', 'video', 12, 4, 0, 15],
    ['Pod Security Standards (PSS)', 'video', 12, 5, 0, 15],
    ['OPA Gatekeeper : policies avancées', 'exercise', 15, 6, 0, 20],
  ]);

  // Ch8: Autoscaling
  chId = await insertChapter(2, 'Autoscaling', 'Configurez le scaling automatique pour vos workloads.', 8, 50);
  await insertLessons(chId, [
    ['Horizontal Pod Autoscaler (HPA)', 'video', 12, 1, 0, 15],
    ['Vertical Pod Autoscaler (VPA)', 'video', 12, 2, 0, 15],
    ['Cluster Autoscaler : scaling des nœuds', 'video', 12, 3, 0, 15],
    ['KEDA : Event-driven autoscaling', 'exercise', 14, 4, 0, 20],
  ]);


  // Ch9: Helm
  chId = await insertChapter(2, 'Helm : Package Manager', 'Gérez vos applications Kubernetes avec Helm.', 9, 60);
  await insertLessons(chId, [
    ['Introduction à Helm et concepts', 'video', 12, 1, 0, 10],
    ['Anatomie d\'un Chart Helm', 'video', 12, 2, 0, 15],
    ['Templates et fonctions Go', 'video', 15, 3, 0, 15],
    ['Values et personnalisation', 'video', 10, 4, 0, 10],
    ['Repositories Helm et publication', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch10: Observabilité K8s
  chId = await insertChapter(2, 'Observabilité Kubernetes', 'Mettez en place l\'observabilité complète de votre cluster.', 10, 60);
  await insertLessons(chId, [
    ['Métriques cluster et applications', 'video', 12, 1, 0, 10],
    ['Centralisation des logs', 'video', 12, 2, 0, 15],
    ['Tracing distribué dans K8s', 'video', 12, 3, 0, 15],
    ['Prometheus Operator et ServiceMonitor', 'video', 12, 4, 0, 15],
    ['Introduction au Service Mesh', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch11: Stratégies de déploiement
  chId = await insertChapter(2, 'Stratégies de déploiement', 'Maîtrisez les différentes stratégies de mise en production.', 11, 50);
  await insertLessons(chId, [
    ['Rolling Update : mise à jour progressive', 'video', 12, 1, 0, 15],
    ['Blue/Green Deployment', 'video', 12, 2, 0, 15],
    ['Canary Deployment : déploiement progressif', 'video', 12, 3, 0, 15],
    ['A/B Testing avec Kubernetes', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch12: Troubleshooting
  chId = await insertChapter(2, 'Troubleshooting Kubernetes', 'Diagnostiquez et résolvez les problèmes courants dans Kubernetes.', 12, 50);
  await insertLessons(chId, [
    ['Debugging des Pods : CrashLoopBackOff, ImagePullBackOff', 'video', 12, 1, 0, 15],
    ['Events Kubernetes et diagnostic', 'video', 12, 2, 0, 10],
    ['Analyse des logs avec kubectl', 'video', 12, 3, 0, 15],
    ['kubectl debug et ephemeral containers', 'exercise', 14, 4, 0, 20],
  ]);

  console.log('  ✅ Cours 2 (Kubernetes) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 3: Terraform Infrastructure as Code (10 chapitres)
  // ============================================================

  // Ch1: Introduction IaC
  chId = await insertChapter(3, 'Introduction à l\'Infrastructure as Code', 'Découvrez les principes de l\'IaC et pourquoi Terraform est devenu incontournable.', 1, 45);
  await insertLessons(chId, [
    ['Pourquoi l\'Infrastructure as Code', 'video', 10, 1, 1, 10],
    ['Terraform vs alternatives (Pulumi, CloudFormation)', 'video', 12, 2, 0, 10],
    ['Installation et configuration de Terraform', 'text', 8, 3, 0, 10],
    ['Premier déploiement avec Terraform', 'exercise', 15, 4, 0, 15],
  ]);

  // Ch2: Langage HCL
  chId = await insertChapter(3, 'Le langage HCL', 'Maîtrisez la syntaxe HashiCorp Configuration Language.', 2, 70);
  await insertLessons(chId, [
    ['Blocs et structure du code HCL', 'video', 10, 1, 0, 10],
    ['Variables : input et validation', 'video', 12, 2, 0, 15],
    ['Outputs : exposer des valeurs', 'video', 10, 3, 0, 10],
    ['Locals : valeurs calculées', 'video', 10, 4, 0, 10],
    ['Types de données : string, number, list, map', 'video', 12, 5, 0, 15],
    ['Expressions et interpolation', 'exercise', 16, 6, 0, 20],
  ]);

  // Ch3: Providers
  chId = await insertChapter(3, 'Providers Terraform', 'Configurez les providers pour interagir avec vos plateformes cloud.', 3, 50);
  await insertLessons(chId, [
    ['Configuration et versioning des providers', 'video', 12, 1, 0, 10],
    ['AWS Provider : authentification et ressources', 'video', 15, 2, 0, 15],
    ['Azure Provider : configuration', 'video', 12, 3, 0, 15],
    ['Multi-provider et alias', 'exercise', 11, 4, 0, 20],
  ]);

  // Ch4: Ressources et Data Sources
  chId = await insertChapter(3, 'Ressources et Data Sources', 'Créez et référencez des ressources d\'infrastructure.', 4, 60);
  await insertLessons(chId, [
    ['Lifecycle des ressources (create, update, destroy)', 'video', 12, 1, 0, 10],
    ['Dépendances implicites et explicites', 'video', 12, 2, 0, 15],
    ['Provisioners : exécution de scripts', 'video', 10, 3, 0, 15],
    ['Data sources : lire des ressources existantes', 'video', 12, 4, 0, 15],
    ['Import de ressources existantes', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch5: State Management
  chId = await insertChapter(3, 'State Management', 'Gérez le state Terraform de manière sécurisée et collaborative.', 5, 60);
  await insertLessons(chId, [
    ['Comprendre le state local', 'video', 10, 1, 0, 10],
    ['Remote backends : S3, Azure Blob, GCS', 'video', 12, 2, 0, 15],
    ['State locking et concurrence', 'video', 12, 3, 0, 15],
    ['Manipulation du state : mv, rm, import', 'video', 12, 4, 0, 15],
    ['Workspaces : multi-environnement', 'exercise', 14, 5, 0, 20],
  ]);


  // Ch6: Modules
  chId = await insertChapter(3, 'Modules Terraform', 'Structurez votre code avec des modules réutilisables.', 6, 60);
  await insertLessons(chId, [
    ['Création d\'un module Terraform', 'video', 12, 1, 0, 15],
    ['Structure et conventions d\'un module', 'video', 12, 2, 0, 10],
    ['Terraform Registry : modules publics', 'video', 10, 3, 0, 10],
    ['Versioning et contraintes de version', 'video', 12, 4, 0, 15],
    ['Composition de modules complexes', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch7: Terraform avancé
  chId = await insertChapter(3, 'Terraform avancé', 'Maîtrisez les fonctionnalités avancées de Terraform.', 7, 60);
  await insertLessons(chId, [
    ['Dynamic blocks et génération dynamique', 'video', 12, 1, 0, 15],
    ['for_each : itération sur des collections', 'video', 12, 2, 0, 15],
    ['count : déploiement conditionnel', 'video', 10, 3, 0, 15],
    ['Expressions conditionnelles', 'video', 12, 4, 0, 15],
    ['Fonctions built-in et manipulation de données', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch8: Testing et validation
  chId = await insertChapter(3, 'Testing et validation', 'Validez et testez votre code Terraform.', 8, 50);
  await insertLessons(chId, [
    ['terraform validate et formatage', 'video', 10, 1, 0, 10],
    ['tflint : linting avancé', 'video', 12, 2, 0, 15],
    ['Terratest : tests d\'infrastructure', 'video', 15, 3, 0, 15],
    ['Policy as Code avec Sentinel et OPA', 'exercise', 13, 4, 0, 20],
  ]);

  // Ch9: CI/CD avec Terraform
  chId = await insertChapter(3, 'CI/CD avec Terraform', 'Intégrez Terraform dans vos pipelines CI/CD.', 9, 50);
  await insertLessons(chId, [
    ['Atlantis : GitOps pour Terraform', 'video', 12, 1, 0, 15],
    ['Terraform Cloud et Terraform Enterprise', 'video', 12, 2, 0, 15],
    ['GitHub Actions pour Terraform', 'video', 12, 3, 0, 15],
    ['GitOps workflow avec Terraform', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch10: Projet multi-cloud
  chId = await insertChapter(3, 'Projet final : Infrastructure multi-cloud', 'Déployez une infrastructure complète multi-cloud avec Terraform.', 10, 55);
  await insertLessons(chId, [
    ['Architecture multi-cloud et design patterns', 'video', 12, 1, 0, 15],
    ['Déploiement infrastructure AWS complète', 'exercise', 20, 2, 0, 25],
    ['Monitoring et alerting de l\'infrastructure', 'video', 12, 3, 0, 15],
    ['State management avancé en production', 'exercise', 11, 4, 0, 20],
  ]);

  console.log('  ✅ Cours 3 (Terraform) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 4: CI/CD avec GitHub Actions (8 chapitres)
  // ============================================================

  // Ch1: Fondamentaux CI/CD
  chId = await insertChapter(4, 'Fondamentaux CI/CD', 'Comprenez les principes de l\'intégration et du déploiement continus.', 1, 55);
  await insertLessons(chId, [
    ['Principes de l\'intégration continue (CI)', 'video', 10, 1, 1, 10],
    ['Principes du déploiement continu (CD)', 'video', 10, 2, 0, 10],
    ['Concepts de pipeline : stages, jobs, steps', 'video', 12, 3, 0, 15],
    ['Introduction à GitHub Actions', 'video', 10, 4, 0, 10],
    ['Créer votre premier workflow', 'exercise', 13, 5, 0, 15],
  ]);

  // Ch2: Syntaxe workflows
  chId = await insertChapter(4, 'Syntaxe des Workflows', 'Maîtrisez la syntaxe YAML des workflows GitHub Actions.', 2, 70);
  await insertLessons(chId, [
    ['Triggers et Events (push, pull_request, schedule)', 'video', 12, 1, 0, 15],
    ['Jobs : parallélisme et dépendances', 'video', 12, 2, 0, 15],
    ['Steps : actions et commandes shell', 'video', 10, 3, 0, 10],
    ['Actions Marketplace : réutiliser la communauté', 'video', 10, 4, 0, 10],
    ['Expressions et opérateurs conditionnels', 'video', 12, 5, 0, 15],
    ['Contextes : github, env, secrets, matrix', 'exercise', 14, 6, 0, 20],
  ]);

  // Ch3: Build et tests
  chId = await insertChapter(4, 'Build et Tests automatisés', 'Automatisez la compilation et les tests de vos applications.', 3, 60);
  await insertLessons(chId, [
    ['Build multi-langage (Node, Python, Java, Go)', 'video', 12, 1, 0, 15],
    ['Tests unitaires automatisés', 'video', 12, 2, 0, 15],
    ['Tests d\'intégration et end-to-end', 'video', 12, 3, 0, 15],
    ['Coverage et rapports de qualité', 'video', 12, 4, 0, 10],
    ['Matrice de tests multi-versions', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch4: Artefacts et caching
  chId = await insertChapter(4, 'Artefacts et Caching', 'Optimisez vos workflows avec le caching et les artefacts.', 4, 45);
  await insertLessons(chId, [
    ['Upload et download d\'artifacts', 'video', 10, 1, 0, 10],
    ['Cache des dépendances (npm, pip, maven)', 'video', 12, 2, 0, 15],
    ['Docker layer caching pour builds rapides', 'video', 12, 3, 0, 15],
    ['Optimisation du temps d\'exécution', 'exercise', 11, 4, 0, 20],
  ]);

  // Ch5: Déploiement
  chId = await insertChapter(4, 'Déploiement automatisé', 'Configurez le déploiement continu vers différentes cibles.', 5, 60);
  await insertLessons(chId, [
    ['Environnements GitHub et protection rules', 'video', 12, 1, 0, 15],
    ['Approvals et gates de déploiement', 'video', 10, 2, 0, 10],
    ['Déploiement vers le cloud (AWS, GCP, Azure)', 'video', 15, 3, 0, 15],
    ['Déploiement vers Kubernetes', 'video', 12, 4, 0, 15],
    ['Stratégies de rollback automatique', 'exercise', 11, 5, 0, 20],
  ]);


  // Ch6: Sécurité CI/CD
  chId = await insertChapter(4, 'Sécurité CI/CD', 'Sécurisez vos pipelines et la supply chain logicielle.', 6, 60);
  await insertLessons(chId, [
    ['Gestion des secrets dans GitHub Actions', 'video', 12, 1, 0, 15],
    ['OIDC : authentification sans secrets long-lived', 'video', 12, 2, 0, 15],
    ['Permissions et principe du moindre privilège', 'video', 10, 3, 0, 15],
    ['Supply chain security et SLSA', 'video', 12, 4, 0, 15],
    ['Dependabot et mises à jour automatiques', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch7: Workflows avancés
  chId = await insertChapter(4, 'Workflows avancés', 'Créez des workflows complexes et réutilisables.', 7, 50);
  await insertLessons(chId, [
    ['Reusable workflows et modularité', 'video', 12, 1, 0, 15],
    ['Composite actions : créer vos propres actions', 'video', 12, 2, 0, 15],
    ['Self-hosted runners : exécution personnalisée', 'video', 12, 3, 0, 15],
    ['Matrices dynamiques et génération de jobs', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch8: Projet pipeline complet
  chId = await insertChapter(4, 'Projet final : Pipeline CI/CD complet', 'Construisez un pipeline de production de bout en bout.', 8, 50);
  await insertLessons(chId, [
    ['Architecture du pipeline complet', 'video', 12, 1, 0, 15],
    ['Implémentation full pipeline (build, test, deploy)', 'exercise', 25, 2, 0, 25],
    ['Monitoring et observabilité du pipeline', 'exercise', 13, 3, 0, 20],
  ]);

  console.log('  ✅ Cours 4 (CI/CD GitHub Actions) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 5: Monitoring avec Prometheus & Grafana (10 chapitres)
  // ============================================================

  // Ch1: Introduction observabilité
  chId = await insertChapter(5, 'Introduction à l\'observabilité', 'Comprenez les piliers de l\'observabilité et les méthodes de monitoring.', 1, 60);
  await insertLessons(chId, [
    ['Les 3 piliers de l\'observabilité', 'video', 10, 1, 1, 10],
    ['Métriques, Logs et Traces : différences', 'video', 12, 2, 0, 15],
    ['SLO, SLI et SLA : définir la fiabilité', 'video', 12, 3, 0, 15],
    ['Golden Signals de Google', 'video', 12, 4, 0, 15],
    ['Méthodes RED et USE', 'quiz', 14, 5, 0, 20],
  ]);

  // Ch2: Prometheus fondamentaux
  chId = await insertChapter(5, 'Prometheus : Fondamentaux', 'Installez et configurez Prometheus pour la collecte de métriques.', 2, 70);
  await insertLessons(chId, [
    ['Architecture Prometheus : pull model', 'video', 12, 1, 0, 10],
    ['Installation et démarrage rapide', 'text', 8, 2, 0, 10],
    ['Configuration : prometheus.yml', 'video', 12, 3, 0, 15],
    ['Types de métriques : counter, gauge, histogram, summary', 'video', 15, 4, 0, 15],
    ['PromQL basics : requêtes simples', 'video', 12, 5, 0, 15],
    ['Targets et service discovery', 'exercise', 11, 6, 0, 20],
  ]);

  // Ch3: PromQL avancé
  chId = await insertChapter(5, 'PromQL avancé', 'Maîtrisez le langage de requête de Prometheus.', 3, 60);
  await insertLessons(chId, [
    ['Fonctions PromQL : rate, increase, histogram_quantile', 'video', 12, 1, 0, 15],
    ['Agrégations : sum, avg, max, min, count', 'video', 12, 2, 0, 15],
    ['Sous-requêtes et requêtes imbriquées', 'video', 12, 3, 0, 15],
    ['Recording rules : pré-calcul de métriques', 'video', 12, 4, 0, 15],
    ['Best practices et pièges courants', 'quiz', 12, 5, 0, 20],
  ]);

  // Ch4: Alerting
  chId = await insertChapter(5, 'Alerting avec Alertmanager', 'Configurez un système d\'alerting efficace.', 4, 60);
  await insertLessons(chId, [
    ['Alertmanager : architecture et concepts', 'video', 12, 1, 0, 10],
    ['Écriture de règles d\'alerte', 'video', 12, 2, 0, 15],
    ['Routing et groupement des alertes', 'video', 12, 3, 0, 15],
    ['Silences et inhibitions', 'video', 12, 4, 0, 15],
    ['Intégrations : PagerDuty, Slack, OpsGenie', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch5: Grafana
  chId = await insertChapter(5, 'Grafana : Visualisation', 'Créez des dashboards professionnels avec Grafana.', 5, 70);
  await insertLessons(chId, [
    ['Installation et configuration initiale', 'text', 8, 1, 0, 10],
    ['Datasources : Prometheus, Loki, InfluxDB', 'video', 12, 2, 0, 15],
    ['Création de dashboards interactifs', 'video', 15, 3, 0, 15],
    ['Panels : types et configuration', 'video', 12, 4, 0, 15],
    ['Variables et dashboards dynamiques', 'video', 12, 5, 0, 15],
    ['Provisioning as Code', 'exercise', 11, 6, 0, 20],
  ]);


  // Ch6: Logging
  chId = await insertChapter(5, 'Logging centralisé', 'Mettez en place une solution de logging centralisée.', 6, 60);
  await insertLessons(chId, [
    ['Loki : architecture et concepts', 'video', 12, 1, 0, 15],
    ['Promtail : collecte de logs', 'video', 12, 2, 0, 15],
    ['LogQL : requêter les logs', 'video', 12, 3, 0, 15],
    ['Fluentd et Fluent Bit : alternatives', 'video', 12, 4, 0, 10],
    ['ELK Stack : Elasticsearch, Logstash, Kibana', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch7: Tracing distribué
  chId = await insertChapter(5, 'Tracing distribué', 'Implémentez le tracing distribué dans vos microservices.', 7, 50);
  await insertLessons(chId, [
    ['OpenTelemetry : standard d\'observabilité', 'video', 12, 1, 0, 15],
    ['Jaeger : interface de tracing', 'video', 12, 2, 0, 15],
    ['Tempo : backend de traces Grafana', 'video', 12, 3, 0, 15],
    ['Instrumentation automatique et manuelle', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch8: Monitoring Kubernetes
  chId = await insertChapter(5, 'Monitoring Kubernetes', 'Surveillez votre cluster Kubernetes avec Prometheus.', 8, 60);
  await insertLessons(chId, [
    ['kube-state-metrics : état des objets K8s', 'video', 12, 1, 0, 15],
    ['node-exporter : métriques système', 'video', 10, 2, 0, 10],
    ['cAdvisor : métriques conteneurs', 'video', 10, 3, 0, 10],
    ['Prometheus Operator et CRDs', 'video', 15, 4, 0, 15],
    ['Thanos : Prometheus haute disponibilité', 'exercise', 13, 5, 0, 20],
  ]);

  // Ch9: Dashboards avancés
  chId = await insertChapter(5, 'Dashboards avancés', 'Créez des dashboards métier et de capacity planning.', 9, 50);
  await insertLessons(chId, [
    ['SLO Dashboards : visualiser la fiabilité', 'video', 12, 1, 0, 15],
    ['Capacity planning et prédiction', 'video', 12, 2, 0, 15],
    ['Cost monitoring et FinOps dashboards', 'video', 12, 3, 0, 15],
    ['Business metrics et KPIs techniques', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch10: Projet monitoring
  chId = await insertChapter(5, 'Projet final : Stack monitoring complète', 'Déployez une stack d\'observabilité complète en production.', 10, 50);
  await insertLessons(chId, [
    ['Déploiement de la stack complète', 'exercise', 20, 1, 0, 25],
    ['Configuration du pipeline d\'alerting', 'exercise', 15, 2, 0, 20],
    ['Documentation et runbooks opérationnels', 'text', 15, 3, 0, 15],
  ]);

  console.log('  ✅ Cours 5 (Monitoring) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 6: DevSecOps - Sécurité Continue (10 chapitres)
  // ============================================================

  // Ch1: Introduction DevSecOps
  chId = await insertChapter(6, 'Introduction au DevSecOps', 'Comprenez la philosophie DevSecOps et l\'intégration de la sécurité dans le cycle DevOps.', 1, 60);
  await insertLessons(chId, [
    ['Shift-left security : sécurité dès le début', 'video', 12, 1, 1, 10],
    ['Threat modeling : modélisation des menaces', 'video', 12, 2, 0, 15],
    ['OWASP Top 10 : vulnérabilités critiques', 'video', 15, 3, 0, 15],
    ['Culture de sécurité dans les équipes', 'video', 10, 4, 0, 10],
    ['Compliance et réglementations (RGPD, SOC2)', 'quiz', 11, 5, 0, 20],
  ]);

  // Ch2: Sécurité du code
  chId = await insertChapter(6, 'Sécurité du code source', 'Détectez les vulnérabilités dans votre code source.', 2, 60);
  await insertLessons(chId, [
    ['SAST : analyse statique du code', 'video', 12, 1, 0, 15],
    ['SonarQube : qualité et sécurité du code', 'video', 12, 2, 0, 15],
    ['Semgrep : règles personnalisées de détection', 'video', 12, 3, 0, 15],
    ['Code review orientée sécurité', 'video', 10, 4, 0, 10],
    ['Détection de secrets dans le code (GitLeaks, TruffleHog)', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch3: Sécurité des dépendances
  chId = await insertChapter(6, 'Sécurité des dépendances', 'Gérez les vulnérabilités dans vos dépendances.', 3, 45);
  await insertLessons(chId, [
    ['SCA : Software Composition Analysis', 'video', 12, 1, 0, 10],
    ['Dependabot et mises à jour automatiques', 'video', 10, 2, 0, 15],
    ['Snyk : scan de vulnérabilités', 'video', 12, 3, 0, 15],
    ['SBOM : Software Bill of Materials', 'exercise', 11, 4, 0, 20],
  ]);

  // Ch4: Sécurité des conteneurs
  chId = await insertChapter(6, 'Sécurité des conteneurs', 'Sécurisez vos images et conteneurs Docker.', 4, 75);
  await insertLessons(chId, [
    ['Image scanning avec Trivy', 'video', 12, 1, 0, 15],
    ['Runtime security avec Falco', 'video', 12, 2, 0, 15],
    ['Conteneurs rootless et sécurité', 'video', 12, 3, 0, 15],
    ['Images distroless et minimales', 'video', 10, 4, 0, 15],
    ['Signature d\'images avec Cosign', 'video', 12, 5, 0, 15],
    ['Admission controllers et validation', 'exercise', 17, 6, 0, 20],
  ]);

  // Ch5: Sécurité Kubernetes
  chId = await insertChapter(6, 'Sécurité Kubernetes', 'Hardening et sécurisation de clusters Kubernetes.', 5, 60);
  await insertLessons(chId, [
    ['Pod Security Standards en profondeur', 'video', 12, 1, 0, 15],
    ['Network Policies : microsegmentation', 'video', 12, 2, 0, 15],
    ['RBAC avancé et principle of least privilege', 'video', 12, 3, 0, 15],
    ['Encryption des Secrets at rest', 'video', 12, 4, 0, 15],
    ['Audit logging Kubernetes', 'exercise', 12, 5, 0, 20],
  ]);


  // Ch6: Infrastructure security
  chId = await insertChapter(6, 'Sécurité de l\'infrastructure', 'Sécurisez votre infrastructure cloud et on-premise.', 6, 60);
  await insertLessons(chId, [
    ['CIS Benchmarks et conformité', 'video', 12, 1, 0, 15],
    ['Terraform security avec tfsec et Checkov', 'video', 12, 2, 0, 15],
    ['Cloud Security Posture Management (CSPM)', 'video', 12, 3, 0, 15],
    ['WAF : Web Application Firewall', 'video', 12, 4, 0, 15],
    ['Protection DDoS et rate limiting', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch7: Pipeline security
  chId = await insertChapter(6, 'Sécurité des pipelines', 'Protégez votre supply chain CI/CD.', 7, 60);
  await insertLessons(chId, [
    ['Supply chain security et framework SLSA', 'video', 12, 1, 0, 15],
    ['Signed commits et vérification GPG', 'video', 10, 2, 0, 15],
    ['Pipeline hardening et isolation', 'video', 12, 3, 0, 15],
    ['OIDC et authentification sans secrets', 'video', 12, 4, 0, 15],
    ['Principe du moindre privilège CI/CD', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch8: Gestion des secrets
  chId = await insertChapter(6, 'Gestion des secrets', 'Centralisez et sécurisez la gestion des secrets.', 8, 50);
  await insertLessons(chId, [
    ['HashiCorp Vault : architecture et usage', 'video', 15, 1, 0, 15],
    ['External Secrets Operator pour Kubernetes', 'video', 12, 2, 0, 15],
    ['SOPS : encryption de fichiers', 'video', 10, 3, 0, 15],
    ['Sealed Secrets pour GitOps', 'exercise', 13, 4, 0, 20],
  ]);

  // Ch9: Compliance as Code
  chId = await insertChapter(6, 'Compliance as Code', 'Automatisez la conformité avec des policies codifiées.', 9, 50);
  await insertLessons(chId, [
    ['OPA et Rego : écriture de policies', 'video', 15, 1, 0, 15],
    ['Kyverno : policies Kubernetes natives', 'video', 12, 2, 0, 15],
    ['Policy engines et gouvernance', 'video', 10, 3, 0, 15],
    ['Audit trails et traçabilité', 'exercise', 13, 4, 0, 20],
  ]);

  // Ch10: Incident Response
  chId = await insertChapter(6, 'Réponse aux incidents', 'Préparez et gérez les incidents de sécurité.', 10, 50);
  await insertLessons(chId, [
    ['Playbooks de réponse aux incidents', 'video', 12, 1, 0, 15],
    ['Forensics : analyse post-compromission', 'video', 12, 2, 0, 15],
    ['Post-mortem et amélioration continue', 'video', 12, 3, 0, 15],
    ['Chaos Engineering orienté sécurité', 'exercise', 14, 4, 0, 20],
  ]);

  console.log('  ✅ Cours 6 (DevSecOps) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 7: GitOps avec ArgoCD (8 chapitres)
  // ============================================================

  // Ch1: Principes GitOps
  chId = await insertChapter(7, 'Principes GitOps', 'Comprenez la philosophie GitOps et ses avantages.', 1, 45);
  await insertLessons(chId, [
    ['Déclaratif vs Impératif : paradigme GitOps', 'video', 10, 1, 1, 10],
    ['Git comme source de vérité unique', 'video', 12, 2, 0, 15],
    ['Réconciliation automatique et drift detection', 'video', 12, 3, 0, 15],
    ['Pull vs Push : modèles de déploiement', 'quiz', 11, 4, 0, 20],
  ]);

  // Ch2: ArgoCD fondamentaux
  chId = await insertChapter(7, 'ArgoCD : Fondamentaux', 'Installez et configurez ArgoCD pour le déploiement GitOps.', 2, 60);
  await insertLessons(chId, [
    ['Architecture ArgoCD : composants et flux', 'video', 12, 1, 0, 10],
    ['Installation sur Kubernetes (Helm et manifests)', 'text', 10, 2, 0, 10],
    ['Applications ArgoCD : définition et gestion', 'video', 12, 3, 0, 15],
    ['Sync policies : automatique vs manuelle', 'video', 12, 4, 0, 15],
    ['Interface web et CLI argocd', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch3: Configuration avancée
  chId = await insertChapter(7, 'Configuration avancée', 'Configurez ArgoCD pour des scénarios d\'entreprise.', 3, 60);
  await insertLessons(chId, [
    ['App of Apps pattern : gestion hiérarchique', 'video', 12, 1, 0, 15],
    ['ApplicationSets : génération dynamique', 'video', 12, 2, 0, 15],
    ['Projets ArgoCD et isolation', 'video', 12, 3, 0, 15],
    ['RBAC ArgoCD : contrôle d\'accès', 'video', 12, 4, 0, 15],
    ['SSO et intégration LDAP/OIDC', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch4: Stratégies de déploiement
  chId = await insertChapter(7, 'Stratégies de déploiement GitOps', 'Implémentez des stratégies de déploiement avancées avec ArgoCD.', 4, 60);
  await insertLessons(chId, [
    ['Sync waves et ordre de déploiement', 'video', 12, 1, 0, 15],
    ['Hooks : pre-sync, sync, post-sync', 'video', 12, 2, 0, 15],
    ['Argo Rollouts : progressive delivery', 'video', 12, 3, 0, 15],
    ['Canary deployments avec métriques', 'video', 12, 4, 0, 15],
    ['Blue/Green avec ArgoCD', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch5: Multi-environnement
  chId = await insertChapter(7, 'Gestion multi-environnement', 'Gérez dev, staging et production avec GitOps.', 5, 50);
  await insertLessons(chId, [
    ['Kustomize overlays par environnement', 'video', 12, 1, 0, 15],
    ['Helm values : configuration par env', 'video', 12, 2, 0, 15],
    ['Promotion entre environnements', 'video', 12, 3, 0, 15],
    ['Branch strategy pour GitOps', 'exercise', 14, 4, 0, 20],
  ]);


  // Ch6: Multi-cluster
  chId = await insertChapter(7, 'GitOps Multi-cluster', 'Gérez plusieurs clusters Kubernetes avec ArgoCD.', 6, 50);
  await insertLessons(chId, [
    ['Architecture Hub-Spoke', 'video', 12, 1, 0, 15],
    ['Fleet management et ApplicationSets', 'video', 12, 2, 0, 15],
    ['Secrets multi-cluster (Sealed Secrets, ESO)', 'video', 12, 3, 0, 15],
    ['Disaster recovery et failover', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch7: Observabilité GitOps
  chId = await insertChapter(7, 'Observabilité GitOps', 'Surveillez et auditez vos déploiements GitOps.', 7, 35);
  await insertLessons(chId, [
    ['Notifications ArgoCD (Slack, Teams, email)', 'video', 12, 1, 0, 15],
    ['Métriques Prometheus pour ArgoCD', 'video', 10, 2, 0, 15],
    ['Audit trail et traçabilité des déploiements', 'exercise', 13, 3, 0, 20],
  ]);

  // Ch8: Projet GitOps complet
  chId = await insertChapter(7, 'Projet final : GitOps en production', 'Implémentez un workflow GitOps complet en production.', 8, 50);
  await insertLessons(chId, [
    ['Architecture GitOps de production', 'video', 12, 1, 0, 15],
    ['Implémentation complète multi-env', 'exercise', 25, 2, 0, 25],
    ['Production readiness et checklist', 'exercise', 13, 3, 0, 20],
  ]);

  console.log('  ✅ Cours 7 (GitOps ArgoCD) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 8: Cloud AWS pour DevOps (12 chapitres)
  // ============================================================

  // Ch1: Fondamentaux AWS
  chId = await insertChapter(8, 'Fondamentaux AWS', 'Découvrez les services AWS essentiels pour le DevOps.', 1, 70);
  await insertLessons(chId, [
    ['IAM : Identity and Access Management', 'video', 12, 1, 1, 15],
    ['VPC : Virtual Private Cloud basics', 'video', 12, 2, 0, 15],
    ['EC2 : Instances et compute', 'video', 12, 3, 0, 10],
    ['S3 : Stockage objet', 'video', 10, 4, 0, 10],
    ['RDS : Bases de données managées', 'video', 12, 5, 0, 15],
    ['CloudWatch : monitoring de base', 'exercise', 12, 6, 0, 15],
  ]);

  // Ch2: Networking AWS
  chId = await insertChapter(8, 'Networking AWS', 'Maîtrisez le réseau AWS pour des architectures sécurisées.', 2, 60);
  await insertLessons(chId, [
    ['VPC avancé : design et architecture', 'video', 12, 1, 0, 15],
    ['Subnets publics et privés', 'video', 12, 2, 0, 15],
    ['Route tables et Internet Gateway', 'video', 12, 3, 0, 10],
    ['NAT Gateway et accès sortant', 'video', 10, 4, 0, 10],
    ['VPN et Direct Connect : connectivité hybride', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch3: Compute
  chId = await insertChapter(8, 'Compute AWS', 'Explorez les options de compute sur AWS.', 3, 60);
  await insertLessons(chId, [
    ['EC2 Auto Scaling Groups', 'video', 12, 1, 0, 15],
    ['ECS : Elastic Container Service', 'video', 12, 2, 0, 15],
    ['EKS : Elastic Kubernetes Service', 'video', 15, 3, 0, 15],
    ['Lambda : compute serverless', 'video', 12, 4, 0, 15],
    ['Fargate : conteneurs sans serveur', 'exercise', 9, 5, 0, 20],
  ]);

  // Ch4: Stockage et bases de données
  chId = await insertChapter(8, 'Stockage et Bases de données', 'Choisissez et configurez les services de stockage AWS.', 4, 60);
  await insertLessons(chId, [
    ['EBS : Elastic Block Store', 'video', 10, 1, 0, 10],
    ['EFS : Elastic File System', 'video', 10, 2, 0, 10],
    ['S3 avancé : lifecycle, versioning, replication', 'video', 15, 3, 0, 15],
    ['DynamoDB : NoSQL serverless', 'video', 12, 4, 0, 15],
    ['Aurora : MySQL/PostgreSQL managé', 'exercise', 13, 5, 0, 20],
  ]);

  // Ch5: CI/CD AWS
  chId = await insertChapter(8, 'CI/CD natif AWS', 'Utilisez les services CI/CD natifs d\'AWS.', 5, 60);
  await insertLessons(chId, [
    ['CodeCommit : repository Git AWS', 'video', 10, 1, 0, 10],
    ['CodeBuild : build et tests', 'video', 12, 2, 0, 15],
    ['CodeDeploy : déploiement automatisé', 'video', 12, 3, 0, 15],
    ['CodePipeline : orchestration CI/CD', 'video', 12, 4, 0, 15],
    ['CDK Pipelines : CI/CD as Code', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch6: Infrastructure as Code AWS
  chId = await insertChapter(8, 'Infrastructure as Code AWS', 'Provisionnez votre infrastructure AWS de manière déclarative.', 6, 60);
  await insertLessons(chId, [
    ['CloudFormation : templates et stacks', 'video', 12, 1, 0, 15],
    ['AWS CDK : infrastructure en TypeScript/Python', 'video', 15, 2, 0, 15],
    ['SAM : Serverless Application Model', 'video', 12, 3, 0, 15],
    ['Service Catalog : gouvernance', 'video', 10, 4, 0, 10],
    ['Control Tower : multi-account', 'exercise', 11, 5, 0, 20],
  ]);


  // Ch7: Containers sur AWS
  chId = await insertChapter(8, 'Containers sur AWS', 'Déployez et gérez des conteneurs sur AWS.', 7, 60);
  await insertLessons(chId, [
    ['ECR : Elastic Container Registry', 'video', 10, 1, 0, 10],
    ['ECS Services : load balancing et auto scaling', 'video', 12, 2, 0, 15],
    ['EKS Cluster : configuration et gestion', 'video', 15, 3, 0, 15],
    ['App Mesh : service mesh AWS', 'video', 12, 4, 0, 15],
    ['Cloud Map : service discovery', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch8: Serverless
  chId = await insertChapter(8, 'Serverless AWS', 'Construisez des applications serverless sur AWS.', 8, 60);
  await insertLessons(chId, [
    ['Lambda avancé : layers, extensions, concurrency', 'video', 12, 1, 0, 15],
    ['API Gateway : REST et WebSocket', 'video', 12, 2, 0, 15],
    ['Step Functions : orchestration de workflows', 'video', 12, 3, 0, 15],
    ['EventBridge : événements serverless', 'video', 12, 4, 0, 15],
    ['SQS et SNS : messaging asynchrone', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch9: Monitoring AWS
  chId = await insertChapter(8, 'Monitoring et Observabilité AWS', 'Surveillez vos workloads AWS avec les outils natifs.', 9, 60);
  await insertLessons(chId, [
    ['CloudWatch avancé : métriques custom, Insights', 'video', 12, 1, 0, 15],
    ['X-Ray : tracing distribué AWS', 'video', 12, 2, 0, 15],
    ['CloudTrail : audit des appels API', 'video', 12, 3, 0, 15],
    ['AWS Config : conformité continue', 'video', 12, 4, 0, 15],
    ['GuardDuty : détection de menaces', 'exercise', 12, 5, 0, 20],
  ]);

  // Ch10: Sécurité AWS
  chId = await insertChapter(8, 'Sécurité AWS', 'Sécurisez vos workloads et données sur AWS.', 10, 60);
  await insertLessons(chId, [
    ['IAM avancé : policies, boundaries, federation', 'video', 15, 1, 0, 15],
    ['KMS : gestion des clés de chiffrement', 'video', 12, 2, 0, 15],
    ['Secrets Manager : rotation automatique', 'video', 12, 3, 0, 15],
    ['Security Hub : vue centralisée', 'video', 10, 4, 0, 15],
    ['WAF : protection des applications web', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch11: Haute disponibilité
  chId = await insertChapter(8, 'Haute disponibilité AWS', 'Concevez des architectures hautement disponibles.', 11, 50);
  await insertLessons(chId, [
    ['Multi-AZ : résilience régionale', 'video', 12, 1, 0, 15],
    ['Multi-region : résilience globale', 'video', 12, 2, 0, 15],
    ['Route 53 : DNS et health checks', 'video', 12, 3, 0, 15],
    ['Global Accelerator : performance globale', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch12: Optimisation et FinOps
  chId = await insertChapter(8, 'Optimisation et FinOps', 'Optimisez les coûts et performances de votre infrastructure AWS.', 12, 50);
  await insertLessons(chId, [
    ['Cost Explorer et analyse des coûts', 'video', 12, 1, 0, 15],
    ['Savings Plans et Reserved Instances', 'video', 12, 2, 0, 15],
    ['Right-sizing : optimisation des ressources', 'video', 12, 3, 0, 15],
    ['Tagging strategy et chargeback', 'exercise', 14, 4, 0, 20],
  ]);

  console.log('  ✅ Cours 8 (Cloud AWS DevOps) : chapitres et leçons insérés');


  // ============================================================
  // NEW COURSES 9-12: Insert into courses table first
  // ============================================================

  // Course 9: Administration Système Linux
  await db.execute({
    sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['Administration Système Linux', 'administration-systeme-linux', 'Maîtrisez l\'administration système Linux, du shell aux services en production.', 'systeme', 'debutant', 30, 'Pierre Martin', 'Aucun', '["Maîtriser le shell Linux","Gérer utilisateurs et permissions","Configurer les services systemd","Administrer le réseau et le stockage","Écrire des scripts Bash avancés","Hardening et sécurisation"]', 1]
  });

  // Course 10: Réseaux pour DevOps
  await db.execute({
    sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['Réseaux pour DevOps', 'reseaux-pour-devops', 'Comprenez les fondamentaux réseau indispensables pour tout ingénieur DevOps.', 'network', 'debutant', 22, 'Lucas Bernard', 'Bases Linux', '["Comprendre le modèle OSI et TCP/IP","Maîtriser l\'adressage IP et le subnetting","Configurer DNS et HTTPS","Mettre en place du load balancing","Configurer firewalls et iptables","Diagnostiquer les problèmes réseau"]', 1]
  });

  // Course 11: Ansible Automation
  await db.execute({
    sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['Ansible Automation', 'ansible-automation', 'Automatisez la gestion de configuration et le déploiement avec Ansible.', 'iac', 'intermediaire', 25, 'Marie Dupont', 'Linux basics, SSH', '["Écrire des playbooks Ansible","Gérer l\'inventaire dynamique","Créer des rôles réutilisables","Ansible Vault pour les secrets","Ansible avec Docker et Kubernetes","CI/CD avec Ansible"]', 0]
  });

  // Course 12: SRE et Fiabilité
  await db.execute({
    sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['SRE et Fiabilité', 'sre-et-fiabilite', 'Appliquez les principes du Site Reliability Engineering pour garantir la fiabilité de vos services.', 'sre', 'avance', 28, 'Lucas Bernard', 'Monitoring, Linux, Kubernetes', '["Comprendre les principes SRE","Définir et mesurer SLO/SLI/SLA","Gérer les error budgets","Conduire des post-mortems blameless","Planifier la capacité","Implémenter le Chaos Engineering"]', 0]
  });

  console.log('  ✅ Cours 9-12 créés');

  // Get the IDs of the new courses
  const course9Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'administration-systeme-linux'`,
    args: []
  });
  const course9Id = course9Result.rows[0].id;

  const course10Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'reseaux-pour-devops'`,
    args: []
  });
  const course10Id = course10Result.rows[0].id;

  const course11Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'ansible-automation'`,
    args: []
  });
  const course11Id = course11Result.rows[0].id;

  const course12Result = await db.execute({
    sql: `SELECT id FROM courses WHERE slug = 'sre-et-fiabilite'`,
    args: []
  });
  const course12Id = course12Result.rows[0].id;


  // ============================================================
  // COURSE 9: Administration Système Linux (10 chapitres)
  // ============================================================

  // Ch1: Shell et ligne de commande
  chId = await insertChapter(course9Id, 'Shell et ligne de commande', 'Maîtrisez le shell Linux et les commandes essentielles.', 1, 65);
  await insertLessons(chId, [
    ['Introduction au shell Bash', 'video', 10, 1, 1, 10],
    ['Navigation dans le système de fichiers', 'video', 10, 2, 0, 10],
    ['Manipulation de fichiers : cp, mv, rm, find', 'video', 12, 3, 0, 15],
    ['Redirections et pipes', 'video', 12, 4, 0, 15],
    ['Commandes de traitement de texte : grep, sed, awk', 'video', 12, 5, 0, 15],
    ['Exercice : administration en ligne de commande', 'exercise', 9, 6, 0, 20],
  ]);

  // Ch2: Système de fichiers
  chId = await insertChapter(course9Id, 'Système de fichiers Linux', 'Comprenez la structure et la gestion du filesystem Linux.', 2, 55);
  await insertLessons(chId, [
    ['Hiérarchie FHS : /etc, /var, /usr, /home', 'video', 10, 1, 0, 10],
    ['Types de systèmes de fichiers : ext4, XFS, Btrfs', 'video', 12, 2, 0, 15],
    ['Montage et fstab', 'video', 12, 3, 0, 15],
    ['Inodes, liens symboliques et durs', 'video', 10, 4, 0, 15],
    ['Quotas disque et surveillance de l\'espace', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch3: Utilisateurs et permissions
  chId = await insertChapter(course9Id, 'Utilisateurs et permissions', 'Gérez les utilisateurs, groupes et permissions sur Linux.', 3, 55);
  await insertLessons(chId, [
    ['Gestion des utilisateurs : useradd, usermod, userdel', 'video', 10, 1, 0, 10],
    ['Groupes et appartenance', 'video', 10, 2, 0, 10],
    ['Permissions rwx et notation octale', 'video', 12, 3, 0, 15],
    ['Permissions spéciales : SUID, SGID, sticky bit', 'video', 12, 4, 0, 15],
    ['ACL : Access Control Lists', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch4: Processus et mémoire
  chId = await insertChapter(course9Id, 'Processus et gestion mémoire', 'Surveillez et gérez les processus et la mémoire système.', 4, 50);
  await insertLessons(chId, [
    ['Processus : ps, top, htop', 'video', 10, 1, 0, 10],
    ['Signaux et gestion des processus (kill, nice)', 'video', 12, 2, 0, 15],
    ['Jobs en arrière-plan et nohup', 'video', 10, 3, 0, 10],
    ['Gestion de la mémoire : RAM, swap, OOM killer', 'video', 8, 4, 0, 15],
    ['Exercice : diagnostic de performance', 'exercise', 10, 5, 0, 20],
  ]);

  // Ch5: Systemd et services
  chId = await insertChapter(course9Id, 'Systemd et services', 'Maîtrisez systemd pour la gestion des services Linux.', 5, 55);
  await insertLessons(chId, [
    ['Architecture systemd : units, targets, dependencies', 'video', 12, 1, 0, 15],
    ['Gestion des services : start, stop, enable, status', 'video', 10, 2, 0, 10],
    ['Création d\'un service systemd personnalisé', 'video', 12, 3, 0, 15],
    ['Journald : logs centralisés', 'video', 10, 4, 0, 15],
    ['Timers systemd : alternative à cron', 'exercise', 11, 5, 0, 20],
  ]);


  // Ch6: Gestion des paquets
  chId = await insertChapter(course9Id, 'Gestion des paquets', 'Installez et gérez les logiciels sur différentes distributions.', 6, 45);
  await insertLessons(chId, [
    ['APT : gestion de paquets Debian/Ubuntu', 'video', 10, 1, 0, 10],
    ['YUM/DNF : gestion de paquets RHEL/CentOS', 'video', 10, 2, 0, 10],
    ['Compilation depuis les sources', 'video', 12, 3, 0, 15],
    ['Snap, Flatpak et AppImage', 'quiz', 13, 4, 0, 15],
  ]);

  // Ch7: Réseau Linux
  chId = await insertChapter(course9Id, 'Networking Linux', 'Configurez et diagnostiquez le réseau sur Linux.', 7, 60);
  await insertLessons(chId, [
    ['Configuration réseau : ip, nmcli, netplan', 'video', 12, 1, 0, 15],
    ['DNS : /etc/resolv.conf, systemd-resolved', 'video', 10, 2, 0, 10],
    ['Firewall avec iptables et nftables', 'video', 15, 3, 0, 15],
    ['SSH : configuration avancée et tunneling', 'video', 12, 4, 0, 15],
    ['Diagnostic réseau : tcpdump, ss, netstat', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch8: Stockage et LVM
  chId = await insertChapter(course9Id, 'Stockage avancé et LVM', 'Gérez le stockage avancé avec LVM et RAID.', 8, 50);
  await insertLessons(chId, [
    ['LVM : Physical Volumes, Volume Groups, Logical Volumes', 'video', 15, 1, 0, 15],
    ['Extension et réduction de volumes', 'video', 12, 2, 0, 15],
    ['RAID logiciel avec mdadm', 'video', 12, 3, 0, 15],
    ['Snapshots LVM et backup', 'exercise', 11, 4, 0, 20],
  ]);

  // Ch9: Scripting Bash avancé
  chId = await insertChapter(course9Id, 'Scripting Bash avancé', 'Écrivez des scripts Bash professionnels pour l\'automatisation.', 9, 65);
  await insertLessons(chId, [
    ['Variables, tableaux et structures de contrôle', 'video', 12, 1, 0, 15],
    ['Fonctions et gestion des erreurs (set -e, trap)', 'video', 12, 2, 0, 15],
    ['Expressions régulières et traitement de données', 'video', 12, 3, 0, 15],
    ['Interaction avec les APIs et parsing JSON (jq)', 'video', 12, 4, 0, 15],
    ['Projet : script d\'automatisation complet', 'exercise', 17, 5, 0, 25],
  ]);

  // Ch10: Hardening Linux
  chId = await insertChapter(course9Id, 'Hardening et sécurisation', 'Sécurisez vos serveurs Linux selon les bonnes pratiques.', 10, 55);
  await insertLessons(chId, [
    ['Bonnes pratiques de sécurité Linux', 'video', 10, 1, 0, 15],
    ['SSH hardening : clés, fail2ban, port knocking', 'video', 12, 2, 0, 15],
    ['SELinux et AppArmor', 'video', 12, 3, 0, 15],
    ['Audit et surveillance : auditd, AIDE', 'video', 10, 4, 0, 15],
    ['Automatisation du hardening avec Ansible', 'exercise', 11, 5, 0, 20],
  ]);

  console.log('  ✅ Cours 9 (Administration Linux) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 10: Réseaux pour DevOps (8 chapitres)
  // ============================================================

  // Ch1: Modèle OSI et TCP/IP
  chId = await insertChapter(course10Id, 'Modèle OSI et TCP/IP', 'Comprenez les modèles de communication réseau fondamentaux.', 1, 60);
  await insertLessons(chId, [
    ['Le modèle OSI : 7 couches expliquées', 'video', 12, 1, 1, 10],
    ['Le modèle TCP/IP : architecture Internet', 'video', 12, 2, 0, 15],
    ['Protocoles par couche : Ethernet, IP, TCP, UDP', 'video', 15, 3, 0, 15],
    ['Encapsulation et désencapsulation', 'video', 10, 4, 0, 10],
    ['Analyse de paquets avec Wireshark', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch2: Adressage IP et subnetting
  chId = await insertChapter(course10Id, 'Adressage IP et Subnetting', 'Maîtrisez l\'adressage IPv4/IPv6 et le subnetting.', 2, 55);
  await insertLessons(chId, [
    ['Adressage IPv4 : classes et notation CIDR', 'video', 12, 1, 0, 15],
    ['Subnetting : calcul et conception', 'video', 15, 2, 0, 15],
    ['Adresses privées et NAT', 'video', 10, 3, 0, 10],
    ['IPv6 : concepts et transition', 'video', 8, 4, 0, 10],
    ['Exercice : design d\'un plan d\'adressage', 'exercise', 10, 5, 0, 20],
  ]);

  // Ch3: DNS
  chId = await insertChapter(course10Id, 'DNS : Domain Name System', 'Comprenez et configurez le DNS pour vos applications.', 3, 55);
  await insertLessons(chId, [
    ['Architecture DNS : hiérarchie et résolution', 'video', 12, 1, 0, 10],
    ['Types d\'enregistrements : A, AAAA, CNAME, MX, TXT, SRV', 'video', 12, 2, 0, 15],
    ['DNS interne et service discovery', 'video', 12, 3, 0, 15],
    ['CoreDNS dans Kubernetes', 'video', 10, 4, 0, 15],
    ['Troubleshooting DNS : dig, nslookup, host', 'exercise', 9, 5, 0, 20],
  ]);

  // Ch4: HTTP, HTTPS et TLS
  chId = await insertChapter(course10Id, 'HTTP, HTTPS et TLS', 'Maîtrisez les protocoles web et la sécurité TLS.', 4, 55);
  await insertLessons(chId, [
    ['HTTP/1.1 et HTTP/2 : méthodes et headers', 'video', 12, 1, 0, 15],
    ['HTTPS et certificats TLS', 'video', 12, 2, 0, 15],
    ['Let\'s Encrypt et cert-manager', 'video', 12, 3, 0, 15],
    ['HTTP/3 et QUIC', 'video', 8, 4, 0, 10],
    ['Exercice : configurer TLS et diagnostiquer', 'exercise', 11, 5, 0, 20],
  ]);

  // Ch5: Load Balancing
  chId = await insertChapter(course10Id, 'Load Balancing', 'Implémentez le load balancing pour la haute disponibilité.', 5, 55);
  await insertLessons(chId, [
    ['Concepts de load balancing : L4 vs L7', 'video', 12, 1, 0, 15],
    ['Algorithmes : round-robin, least connections, IP hash', 'video', 12, 2, 0, 15],
    ['Nginx comme reverse proxy et load balancer', 'video', 12, 3, 0, 15],
    ['HAProxy : configuration avancée', 'video', 10, 4, 0, 15],
    ['Cloud load balancers : ALB, NLB, GLB', 'exercise', 9, 5, 0, 20],
  ]);


  // Ch6: Firewalls et iptables
  chId = await insertChapter(course10Id, 'Firewalls et iptables', 'Configurez les firewalls pour sécuriser vos infrastructures.', 6, 55);
  await insertLessons(chId, [
    ['Concepts de firewalling : stateful vs stateless', 'video', 10, 1, 0, 10],
    ['iptables : chaînes, tables, règles', 'video', 15, 2, 0, 15],
    ['nftables : successeur d\'iptables', 'video', 12, 3, 0, 15],
    ['Security Groups et NACLs (cloud)', 'video', 10, 4, 0, 15],
    ['Exercice : configuration firewall complète', 'exercise', 8, 5, 0, 20],
  ]);

  // Ch7: VPN et tunneling
  chId = await insertChapter(course10Id, 'VPN et Tunneling', 'Mettez en place des connexions sécurisées entre réseaux.', 7, 50);
  await insertLessons(chId, [
    ['Types de VPN : site-to-site, client-to-site', 'video', 10, 1, 0, 10],
    ['WireGuard : VPN moderne et performant', 'video', 12, 2, 0, 15],
    ['OpenVPN : configuration et déploiement', 'video', 12, 3, 0, 15],
    ['SSH tunneling et port forwarding', 'video', 8, 4, 0, 15],
    ['Exercice : mise en place d\'un VPN WireGuard', 'exercise', 8, 5, 0, 20],
  ]);

  // Ch8: Troubleshooting réseau
  chId = await insertChapter(course10Id, 'Troubleshooting réseau', 'Diagnostiquez et résolvez les problèmes réseau courants.', 8, 50);
  await insertLessons(chId, [
    ['Méthodologie de diagnostic réseau', 'video', 10, 1, 0, 10],
    ['Outils : ping, traceroute, mtr, curl', 'video', 12, 2, 0, 15],
    ['tcpdump et analyse de trafic', 'video', 12, 3, 0, 15],
    ['Problèmes courants DevOps : DNS, timeout, MTU', 'video', 8, 4, 0, 15],
    ['Exercice : scénarios de troubleshooting', 'exercise', 8, 5, 0, 25],
  ]);

  console.log('  ✅ Cours 10 (Réseaux pour DevOps) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 11: Ansible Automation (8 chapitres)
  // ============================================================

  // Ch1: Introduction à Ansible
  chId = await insertChapter(course11Id, 'Introduction à Ansible', 'Découvrez Ansible et ses concepts fondamentaux.', 1, 55);
  await insertLessons(chId, [
    ['Pourquoi Ansible : agentless et simplicité', 'video', 10, 1, 1, 10],
    ['Architecture : control node, managed nodes', 'video', 10, 2, 0, 10],
    ['Installation et configuration initiale', 'text', 8, 3, 0, 10],
    ['Inventaire : définir vos hôtes', 'video', 12, 4, 0, 15],
    ['Première commande ad-hoc et premier playbook', 'exercise', 15, 5, 0, 15],
  ]);

  // Ch2: Playbooks fondamentaux
  chId = await insertChapter(course11Id, 'Playbooks fondamentaux', 'Écrivez des playbooks Ansible efficaces.', 2, 65);
  await insertLessons(chId, [
    ['Structure d\'un playbook YAML', 'video', 10, 1, 0, 10],
    ['Modules essentiels : apt, yum, copy, template, service', 'video', 15, 2, 0, 15],
    ['Variables et facts', 'video', 12, 3, 0, 15],
    ['Conditionals et loops', 'video', 12, 4, 0, 15],
    ['Handlers et notifications', 'video', 8, 5, 0, 10],
    ['Exercice : playbook de configuration serveur', 'exercise', 8, 6, 0, 20],
  ]);

  // Ch3: Inventaire avancé
  chId = await insertChapter(course11Id, 'Inventaire avancé', 'Gérez des inventaires dynamiques et complexes.', 3, 50);
  await insertLessons(chId, [
    ['Inventaire statique avancé : groupes et variables', 'video', 10, 1, 0, 10],
    ['Inventaire dynamique : scripts et plugins', 'video', 12, 2, 0, 15],
    ['AWS EC2 dynamic inventory', 'video', 12, 3, 0, 15],
    ['Patterns et limitation d\'hôtes', 'video', 8, 4, 0, 10],
    ['Exercice : inventaire multi-environnement', 'exercise', 8, 5, 0, 20],
  ]);

  // Ch4: Rôles Ansible
  chId = await insertChapter(course11Id, 'Rôles Ansible', 'Structurez votre code avec des rôles réutilisables.', 4, 55);
  await insertLessons(chId, [
    ['Structure d\'un rôle : tasks, handlers, templates, vars', 'video', 12, 1, 0, 15],
    ['Créer un rôle avec ansible-galaxy init', 'video', 10, 2, 0, 10],
    ['Ansible Galaxy : rôles communautaires', 'video', 10, 3, 0, 10],
    ['Dépendances entre rôles', 'video', 10, 4, 0, 15],
    ['Exercice : créer un rôle complet (Nginx + app)', 'exercise', 13, 5, 0, 25],
  ]);

  // Ch5: Templates et Jinja2
  chId = await insertChapter(course11Id, 'Templates et Jinja2', 'Créez des fichiers de configuration dynamiques avec Jinja2.', 5, 50);
  await insertLessons(chId, [
    ['Syntaxe Jinja2 : variables, filtres, tests', 'video', 12, 1, 0, 15],
    ['Structures de contrôle : if, for, macro', 'video', 12, 2, 0, 15],
    ['Filtres Ansible avancés', 'video', 10, 3, 0, 15],
    ['Best practices pour les templates', 'quiz', 8, 4, 0, 15],
    ['Exercice : templates de configuration complexes', 'exercise', 8, 5, 0, 20],
  ]);


  // Ch6: Ansible Vault et sécurité
  chId = await insertChapter(course11Id, 'Ansible Vault et sécurité', 'Gérez les secrets et sécurisez vos playbooks.', 6, 45);
  await insertLessons(chId, [
    ['Ansible Vault : chiffrement de fichiers et variables', 'video', 12, 1, 0, 15],
    ['Vault multi-password et vault-id', 'video', 10, 2, 0, 15],
    ['Intégration avec HashiCorp Vault', 'video', 12, 3, 0, 15],
    ['Best practices de sécurité Ansible', 'exercise', 11, 4, 0, 20],
  ]);

  // Ch7: Ansible avancé
  chId = await insertChapter(course11Id, 'Ansible avancé', 'Maîtrisez les fonctionnalités avancées d\'Ansible.', 7, 60);
  await insertLessons(chId, [
    ['Ansible avec Docker : docker_container, docker_image', 'video', 12, 1, 0, 15],
    ['Ansible pour Kubernetes : k8s module', 'video', 12, 2, 0, 15],
    ['Ansible Collections et custom modules', 'video', 12, 3, 0, 15],
    ['Callback plugins et stratégies d\'exécution', 'video', 10, 4, 0, 15],
    ['Testing avec Molecule', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch8: CI/CD avec Ansible
  chId = await insertChapter(course11Id, 'CI/CD avec Ansible', 'Intégrez Ansible dans vos pipelines d\'automatisation.', 8, 50);
  await insertLessons(chId, [
    ['Ansible dans GitHub Actions / GitLab CI', 'video', 12, 1, 0, 15],
    ['AWX / Ansible Tower : interface web', 'video', 12, 2, 0, 15],
    ['Ansible et Terraform : complémentarité', 'video', 10, 3, 0, 15],
    ['Projet final : déploiement automatisé complet', 'exercise', 16, 4, 0, 25],
  ]);

  console.log('  ✅ Cours 11 (Ansible Automation) : chapitres et leçons insérés');


  // ============================================================
  // COURSE 12: SRE et Fiabilité (8 chapitres)
  // ============================================================

  // Ch1: Principes SRE
  chId = await insertChapter(course12Id, 'Principes du Site Reliability Engineering', 'Comprenez la philosophie et les principes fondamentaux du SRE.', 1, 60);
  await insertLessons(chId, [
    ['Qu\'est-ce que le SRE : origines Google', 'video', 10, 1, 1, 10],
    ['SRE vs DevOps : complémentarité', 'video', 10, 2, 0, 10],
    ['Les principes fondamentaux du SRE', 'video', 12, 3, 0, 15],
    ['Rôle et responsabilités d\'un SRE', 'video', 12, 4, 0, 15],
    ['Culture d\'ingénierie et fiabilité', 'quiz', 16, 5, 0, 20],
  ]);

  // Ch2: SLO, SLI et SLA
  chId = await insertChapter(course12Id, 'SLO, SLI et SLA', 'Définissez et mesurez la fiabilité de vos services.', 2, 60);
  await insertLessons(chId, [
    ['SLA : engagements contractuels', 'video', 10, 1, 0, 10],
    ['SLO : objectifs de fiabilité internes', 'video', 12, 2, 0, 15],
    ['SLI : indicateurs mesurables', 'video', 12, 3, 0, 15],
    ['Choisir les bons SLIs pour chaque service', 'video', 12, 4, 0, 15],
    ['Implémentation de SLO avec Prometheus', 'exercise', 14, 5, 0, 20],
  ]);

  // Ch3: Error Budgets
  chId = await insertChapter(course12Id, 'Error Budgets', 'Utilisez les error budgets pour équilibrer fiabilité et innovation.', 3, 50);
  await insertLessons(chId, [
    ['Concept d\'error budget et calcul', 'video', 12, 1, 0, 15],
    ['Policies d\'error budget : que faire quand c\'est épuisé', 'video', 12, 2, 0, 15],
    ['Burn rate et alerting basé sur le budget', 'video', 12, 3, 0, 15],
    ['Dashboard error budget et reporting', 'exercise', 14, 4, 0, 20],
  ]);

  // Ch4: Gestion des incidents
  chId = await insertChapter(course12Id, 'Gestion des incidents', 'Mettez en place un processus de gestion des incidents efficace.', 4, 60);
  await insertLessons(chId, [
    ['Processus d\'incident management', 'video', 12, 1, 0, 15],
    ['Rôles : Incident Commander, Communication Lead', 'video', 10, 2, 0, 10],
    ['Severity levels et escalation', 'video', 10, 3, 0, 15],
    ['Outils : PagerDuty, OpsGenie, Incident.io', 'video', 12, 4, 0, 15],
    ['Exercice : simulation d\'incident', 'exercise', 16, 5, 0, 25],
  ]);

  // Ch5: Post-mortem blameless
  chId = await insertChapter(course12Id, 'Post-mortem blameless', 'Conduisez des post-mortems constructifs et blameless.', 5, 50);
  await insertLessons(chId, [
    ['Culture blameless et psychological safety', 'video', 10, 1, 0, 10],
    ['Structure d\'un post-mortem efficace', 'video', 12, 2, 0, 15],
    ['Root Cause Analysis : 5 Whys, Ishikawa', 'video', 12, 3, 0, 15],
    ['Action items et suivi', 'video', 8, 4, 0, 10],
    ['Exercice : rédiger un post-mortem complet', 'exercise', 8, 5, 0, 20],
  ]);


  // Ch6: Capacity Planning
  chId = await insertChapter(course12Id, 'Capacity Planning', 'Planifiez la capacité de vos systèmes pour anticiper la croissance.', 6, 50);
  await insertLessons(chId, [
    ['Méthodologie de capacity planning', 'video', 10, 1, 0, 10],
    ['Modélisation de la charge et prédiction', 'video', 12, 2, 0, 15],
    ['Load testing : outils et méthodologie (k6, Locust)', 'video', 12, 3, 0, 15],
    ['Scaling vertical vs horizontal', 'video', 8, 4, 0, 10],
    ['Exercice : plan de capacité pour un service', 'exercise', 8, 5, 0, 20],
  ]);

  // Ch7: Chaos Engineering
  chId = await insertChapter(course12Id, 'Chaos Engineering', 'Améliorez la résilience de vos systèmes avec le Chaos Engineering.', 7, 55);
  await insertLessons(chId, [
    ['Principes du Chaos Engineering', 'video', 10, 1, 0, 10],
    ['Chaos Monkey et la suite Simian Army', 'video', 10, 2, 0, 15],
    ['Litmus Chaos pour Kubernetes', 'video', 12, 3, 0, 15],
    ['Game Days : exercices de résilience', 'video', 10, 4, 0, 15],
    ['Exercice : expérience de chaos contrôlée', 'exercise', 13, 5, 0, 25],
  ]);

  // Ch8: Toil Reduction
  chId = await insertChapter(course12Id, 'Réduction du Toil', 'Identifiez et éliminez le travail répétitif et non-stratégique.', 8, 50);
  await insertLessons(chId, [
    ['Définition du Toil et son impact', 'video', 10, 1, 0, 10],
    ['Identifier et mesurer le Toil', 'video', 10, 2, 0, 15],
    ['Automatisation et self-service', 'video', 12, 3, 0, 15],
    ['Budget de Toil et engineering time', 'video', 8, 4, 0, 15],
    ['Projet final : plan de réduction du Toil', 'exercise', 10, 5, 0, 25],
  ]);

  console.log('  ✅ Cours 12 (SRE et Fiabilité) : chapitres et leçons insérés');
  console.log('\n📚 Tous les chapitres et leçons ont été insérés avec succès !');
}

module.exports = { seedCoursesContent };
