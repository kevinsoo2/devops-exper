/**
 * Seed chapters and lessons for batch 2 courses:
 * - Google Cloud Platform pour DevOps
 * - ElasticSearch et ELK Stack
 * - Jenkins Pipeline et Administration
 * - Kafka et Event Streaming
 * - Pulumi Infrastructure as Code
 * - Podman et Containers sans Docker
 * - Service Mesh avec Istio
 * - Hashicorp Stack Complète
 * - Kubernetes Operators et CRDs
 * - FinOps et Optimisation Cloud
 * - Observabilité avec OpenTelemetry
 * - GitLab CI/CD et DevOps
 */

async function seedBatch2Courses(db) {
  console.log('\n📚 Insertion des chapitres et leçons pour les 12 cours batch 2...');

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
    'gcp-devops',
    'elasticsearch-elk-stack',
    'jenkins-pipeline-administration',
    'kafka-event-streaming',
    'pulumi-iac',
    'podman-containers',
    'service-mesh-istio',
    'hashicorp-stack',
    'kubernetes-operators-crds',
    'finops-optimisation-cloud',
    'observabilite-opentelemetry',
    'gitlab-cicd-devops'
  ];


  const courseIds = {};
  for (const slug of slugs) {
    const result = await db.execute({
      sql: `SELECT id FROM courses WHERE slug = ?`, args: [slug]
    });
    if (result.rows.length === 0) {
      console.log(`  ⚠️ Cours ${slug} non trouvé, skip`);
      continue;
    }
    courseIds[slug] = result.rows[0].id;
  }

  // ============================================================
  // COURSE: Google Cloud Platform pour DevOps (8 chapitres)
  // ============================================================
  const gcpId = courseIds['gcp-devops'];
  if (gcpId) {
    // Ch1: Fondamentaux GCP
    let chId = await insertChapter(gcpId, 'Fondamentaux GCP', 'Découvrez les fondamentaux de Google Cloud Platform.', 1, 60);
    await insertLessons(chId, [
      ['Écosystème GCP et services', 'video', 12, 1, 1, 10],
      ['Console, gcloud CLI et Cloud Shell', 'video', 12, 2, 0, 12],
      ['Projets, IAM et organisation', 'video', 13, 3, 0, 12],
      ['Régions, zones et réseau global', 'video', 12, 4, 0, 12],
      ['Exercice: configurer un projet GCP', 'exercise', 14, 5, 0, 15]
    ]);


    // Ch2: Compute - GKE et Cloud Run
    chId = await insertChapter(gcpId, 'Compute - GKE et Cloud Run', 'Déployez sur GKE et Cloud Run.', 2, 70);
    await insertLessons(chId, [
      ['Google Kubernetes Engine (GKE)', 'video', 14, 1, 0, 15],
      ['GKE Autopilot vs Standard', 'video', 12, 2, 0, 12],
      ['Cloud Run : conteneurs serverless', 'video', 13, 3, 0, 12],
      ['Cloud Functions', 'video', 12, 4, 0, 12],
      ['Exercice: déployer sur GKE et Cloud Run', 'exercise', 15, 5, 0, 15]
    ]);

    // Ch3: CI/CD avec Cloud Build
    chId = await insertChapter(gcpId, 'CI/CD avec Cloud Build', 'Configurez des pipelines CI/CD avec Cloud Build.', 3, 62);
    await insertLessons(chId, [
      ['Cloud Build : concepts et triggers', 'video', 13, 1, 0, 12],
      ['cloudbuild.yaml : steps et substitutions', 'video', 13, 2, 0, 12],
      ['Artifact Registry et Container Registry', 'video', 12, 3, 0, 12],
      ['Cloud Deploy pour le CD', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline CI/CD complet', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch4: Networking GCP
    chId = await insertChapter(gcpId, 'Networking GCP', 'Configurez le réseau sur Google Cloud.', 4, 58);
    await insertLessons(chId, [
      ['VPC et subnets', 'video', 12, 1, 0, 12],
      ['Cloud Load Balancing', 'video', 13, 2, 0, 12],
      ['Cloud CDN et Cloud Armor', 'video', 12, 3, 0, 12],
      ['Cloud DNS et Private Google Access', 'video', 12, 4, 0, 12],
      ['Exercice: architecture réseau GCP', 'exercise', 13, 5, 0, 15]
    ]);


    // Ch5: Storage et Databases
    chId = await insertChapter(gcpId, 'Storage et Databases', 'Gérez le stockage et les bases de données GCP.', 5, 58);
    await insertLessons(chId, [
      ['Cloud Storage (buckets et classes)', 'video', 12, 1, 0, 12],
      ['Cloud SQL et AlloyDB', 'video', 13, 2, 0, 12],
      ['Cloud Spanner et Firestore', 'video', 12, 3, 0, 12],
      ['BigQuery pour l analytics', 'video', 12, 4, 0, 12],
      ['Exercice: architecture data GCP', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch6: IaC - Terraform sur GCP
    chId = await insertChapter(gcpId, 'IaC - Terraform sur GCP', 'Gérez l infrastructure GCP avec Terraform.', 6, 62);
    await insertLessons(chId, [
      ['Provider Google et authentification', 'video', 12, 1, 0, 12],
      ['Modules Terraform pour GCP', 'video', 13, 2, 0, 12],
      ['State dans Cloud Storage', 'video', 12, 3, 0, 12],
      ['Deployment Manager vs Terraform', 'video', 11, 4, 0, 10],
      ['Exercice: infra GCP complète en Terraform', 'exercise', 15, 5, 0, 15]
    ]);

    // Ch7: Monitoring - Cloud Operations
    chId = await insertChapter(gcpId, 'Monitoring - Cloud Operations', 'Surveillez vos workloads avec Cloud Operations.', 7, 58);
    await insertLessons(chId, [
      ['Cloud Monitoring (métriques et alertes)', 'video', 13, 1, 0, 12],
      ['Cloud Logging (logs et filtres)', 'video', 12, 2, 0, 12],
      ['Cloud Trace et Profiler', 'video', 12, 3, 0, 12],
      ['Error Reporting et dashboards', 'video', 12, 4, 0, 12],
      ['Exercice: observabilité complète GCP', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch8: Projet GCP
    chId = await insertChapter(gcpId, 'Projet complet GCP', 'Mettez en pratique toutes vos compétences GCP.', 8, 65);
    await insertLessons(chId, [
      ['Architecture du projet', 'video', 12, 1, 0, 12],
      ['Déploiement multi-service sur GKE', 'exercise', 15, 2, 0, 15],
      ['Pipeline CI/CD avec Cloud Build', 'exercise', 14, 3, 0, 15],
      ['Monitoring et alerting', 'exercise', 13, 4, 0, 15],
      ['Exercice final: plateforme complète', 'exercise', 15, 5, 0, 20]
    ]);

    console.log('  ✅ Cours GCP DevOps (8 chapitres) inséré');
  }


  // ============================================================
  // COURSE: ElasticSearch et ELK Stack (7 chapitres)
  // ============================================================
  const elkId = courseIds['elasticsearch-elk-stack'];
  if (elkId) {
    // Ch1: Fondamentaux ELK
    let chId = await insertChapter(elkId, 'Fondamentaux ELK', 'Découvrez la stack ELK et ses composants.', 1, 55);
    await insertLessons(chId, [
      ['Architecture de la stack ELK', 'video', 12, 1, 1, 10],
      ['Cas d usage : logging, SIEM, APM', 'video', 12, 2, 0, 12],
      ['Installation avec Docker Compose', 'video', 13, 3, 0, 12],
      ['Elastic Cloud vs self-hosted', 'video', 11, 4, 0, 10],
      ['Exercice: déployer la stack ELK', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch2: Elasticsearch
    chId = await insertChapter(elkId, 'Elasticsearch', 'Maîtrisez Elasticsearch : cluster, indexing et mapping.', 2, 68);
    await insertLessons(chId, [
      ['Architecture du cluster (nodes, shards)', 'video', 14, 1, 0, 15],
      ['Indexing et document API', 'video', 13, 2, 0, 12],
      ['Mappings et analyseurs', 'video', 13, 3, 0, 12],
      ['Requêtes DSL (query, filter, aggregation)', 'video', 14, 4, 0, 15],
      ['Exercice: cluster Elasticsearch multi-nœuds', 'exercise', 15, 5, 0, 15]
    ]);

    // Ch3: Logstash
    chId = await insertChapter(elkId, 'Logstash', 'Configurez Logstash pour le traitement de données.', 3, 62);
    await insertLessons(chId, [
      ['Architecture pipeline (input, filter, output)', 'video', 13, 1, 0, 12],
      ['Inputs : file, beats, kafka, syslog', 'video', 12, 2, 0, 12],
      ['Filters : grok, mutate, date, geoip', 'video', 14, 3, 0, 15],
      ['Outputs : elasticsearch, file, kafka', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline Logstash multi-source', 'exercise', 14, 5, 0, 15]
    ]);


    // Ch4: Kibana
    chId = await insertChapter(elkId, 'Kibana', 'Créez des dashboards et visualisations avec Kibana.', 4, 58);
    await insertLessons(chId, [
      ['Discover et data views', 'video', 12, 1, 0, 12],
      ['Visualisations (Lens, TSVB, Vega)', 'video', 13, 2, 0, 12],
      ['Dashboards et filtres', 'video', 12, 3, 0, 12],
      ['Alerting et reporting', 'video', 12, 4, 0, 12],
      ['Exercice: dashboard de monitoring applicatif', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch5: Filebeat et agents
    chId = await insertChapter(elkId, 'Filebeat et agents', 'Collectez les logs avec Filebeat et Elastic Agent.', 5, 52);
    await insertLessons(chId, [
      ['Filebeat : installation et modules', 'video', 12, 1, 0, 12],
      ['Metricbeat et Heartbeat', 'video', 12, 2, 0, 12],
      ['Elastic Agent et Fleet', 'video', 13, 3, 0, 12],
      ['Exercice: collecte multi-agents', 'exercise', 14, 4, 0, 15]
    ]);

    // Ch6: Sécurité et performance
    chId = await insertChapter(elkId, 'Sécurité et performance', 'Sécurisez et optimisez votre stack ELK.', 6, 58);
    await insertLessons(chId, [
      ['Authentification et RBAC', 'video', 12, 1, 0, 12],
      ['TLS et chiffrement', 'video', 12, 2, 0, 12],
      ['ILM (Index Lifecycle Management)', 'video', 13, 3, 0, 12],
      ['Tuning et sizing', 'video', 12, 4, 0, 12],
      ['Exercice: sécuriser et optimiser ELK', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch7: Projet ELK
    chId = await insertChapter(elkId, 'Projet ELK complet', 'Mettez en place une solution de logging centralisé.', 7, 60);
    await insertLessons(chId, [
      ['Architecture du projet logging', 'video', 12, 1, 0, 12],
      ['Collecte multi-sources', 'exercise', 14, 2, 0, 15],
      ['Dashboards et alertes', 'exercise', 13, 3, 0, 15],
      ['Exercice final: plateforme d observabilité', 'exercise', 15, 4, 0, 20]
    ]);

    console.log('  ✅ Cours ELK Stack (7 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Jenkins Pipeline et Administration (7 chapitres)
  // ============================================================
  const jenkinsId = courseIds['jenkins-pipeline-administration'];
  if (jenkinsId) {
    // Ch1: Architecture Jenkins
    let chId = await insertChapter(jenkinsId, 'Architecture Jenkins', 'Comprenez l architecture de Jenkins.', 1, 52);
    await insertLessons(chId, [
      ['Architecture master/agent', 'video', 12, 1, 1, 10],
      ['Jenkins vs alternatives (GitHub Actions, GitLab CI)', 'video', 12, 2, 0, 12],
      ['Plugins essentiels', 'video', 11, 3, 0, 10],
      ['Exercice: cartographier une architecture Jenkins', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch2: Installation et configuration
    chId = await insertChapter(jenkinsId, 'Installation et configuration', 'Installez et configurez Jenkins.', 2, 58);
    await insertLessons(chId, [
      ['Installation (Docker, package, WAR)', 'video', 13, 1, 0, 12],
      ['Configuration système', 'video', 12, 2, 0, 12],
      ['Gestion des credentials', 'video', 12, 3, 0, 12],
      ['Configuration as Code (JCasC)', 'video', 13, 4, 0, 12],
      ['Exercice: Jenkins avec JCasC', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: Pipelines déclaratifs
    chId = await insertChapter(jenkinsId, 'Pipelines déclaratifs', 'Écrivez des Jenkinsfiles déclaratifs.', 3, 68);
    await insertLessons(chId, [
      ['Syntaxe déclarative vs scripted', 'video', 13, 1, 0, 12],
      ['Stages, steps et post actions', 'video', 13, 2, 0, 12],
      ['Parallélisme et matrices', 'video', 12, 3, 0, 12],
      ['Conditions (when) et expressions', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline multi-branch', 'exercise', 15, 5, 0, 15]
    ]);


    // Ch4: Shared Libraries
    chId = await insertChapter(jenkinsId, 'Shared Libraries', 'Créez des shared libraries réutilisables.', 4, 58);
    await insertLessons(chId, [
      ['Structure d une shared library', 'video', 13, 1, 0, 12],
      ['Global vars et steps custom', 'video', 12, 2, 0, 12],
      ['Classes Groovy et resources', 'video', 13, 3, 0, 12],
      ['Versioning et testing', 'video', 12, 4, 0, 12],
      ['Exercice: créer une shared library', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch5: Agents et scaling
    chId = await insertChapter(jenkinsId, 'Agents et scaling', 'Gérez les agents et le scaling Jenkins.', 5, 55);
    await insertLessons(chId, [
      ['Agents SSH et JNLP', 'video', 12, 1, 0, 12],
      ['Agents Docker dynamiques', 'video', 13, 2, 0, 12],
      ['Kubernetes plugin (pods agents)', 'video', 14, 3, 0, 15],
      ['Exercice: agents Kubernetes dynamiques', 'exercise', 14, 4, 0, 15]
    ]);

    // Ch6: Sécurité Jenkins
    chId = await insertChapter(jenkinsId, 'Sécurité Jenkins', 'Sécurisez votre installation Jenkins.', 6, 52);
    await insertLessons(chId, [
      ['Authentification (LDAP, SAML, OIDC)', 'video', 12, 1, 0, 12],
      ['Autorisation (Matrix, Role-based)', 'video', 12, 2, 0, 12],
      ['Audit et compliance', 'video', 12, 3, 0, 12],
      ['Sandbox Groovy et script approval', 'video', 11, 4, 0, 10],
      ['Exercice: sécuriser Jenkins', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch7: Intégration Docker et K8s
    chId = await insertChapter(jenkinsId, 'Intégration Docker et Kubernetes', 'Intégrez Jenkins avec Docker et Kubernetes.', 7, 60);
    await insertLessons(chId, [
      ['Build d images Docker dans Jenkins', 'video', 13, 1, 0, 12],
      ['Docker-in-Docker vs kaniko', 'video', 12, 2, 0, 12],
      ['Déploiement Kubernetes depuis Jenkins', 'video', 13, 3, 0, 12],
      ['Helm et ArgoCD intégration', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline Docker + K8s', 'exercise', 14, 5, 0, 15]
    ]);

    console.log('  ✅ Cours Jenkins Pipeline (7 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Kafka et Event Streaming (8 chapitres)
  // ============================================================
  const kafkaId = courseIds['kafka-event-streaming'];
  if (kafkaId) {
    // Ch1: Fondamentaux messaging
    let chId = await insertChapter(kafkaId, 'Fondamentaux messaging', 'Comprenez les fondamentaux du messaging distribué.', 1, 52);
    await insertLessons(chId, [
      ['Patterns messaging (pub/sub, queues)', 'video', 12, 1, 1, 10],
      ['Kafka vs RabbitMQ vs autres', 'video', 12, 2, 0, 12],
      ['Cas d usage event streaming', 'video', 12, 3, 0, 12],
      ['Exercice: identifier les patterns', 'exercise', 12, 4, 0, 15]
    ]);

    // Ch2: Architecture Kafka
    chId = await insertChapter(kafkaId, 'Architecture Kafka', 'Maîtrisez l architecture interne de Kafka.', 2, 65);
    await insertLessons(chId, [
      ['Brokers, topics et partitions', 'video', 14, 1, 0, 15],
      ['Réplication et leaders', 'video', 13, 2, 0, 12],
      ['ZooKeeper vs KRaft', 'video', 12, 3, 0, 12],
      ['Storage et rétention', 'video', 12, 4, 0, 12],
      ['Exercice: déployer un cluster Kafka', 'exercise', 15, 5, 0, 15]
    ]);

    // Ch3: Producers et Consumers
    chId = await insertChapter(kafkaId, 'Producers et Consumers', 'Produisez et consommez des messages Kafka.', 3, 62);
    await insertLessons(chId, [
      ['Producer API et configuration', 'video', 13, 1, 0, 12],
      ['Sérialisation (Avro, Protobuf, JSON)', 'video', 13, 2, 0, 12],
      ['Consumer API et consumer groups', 'video', 14, 3, 0, 15],
      ['Offsets et commit strategies', 'video', 12, 4, 0, 12],
      ['Exercice: producer/consumer en Java', 'exercise', 14, 5, 0, 15]
    ]);


    // Ch4: Kafka Streams
    chId = await insertChapter(kafkaId, 'Kafka Streams', 'Traitez les données en temps réel avec Kafka Streams.', 4, 60);
    await insertLessons(chId, [
      ['Kafka Streams API et topologie', 'video', 14, 1, 0, 15],
      ['Stateless transformations', 'video', 12, 2, 0, 12],
      ['Stateful processing (joins, aggregations)', 'video', 14, 3, 0, 15],
      ['ksqlDB : SQL sur Kafka', 'video', 12, 4, 0, 12],
      ['Exercice: application Kafka Streams', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch5: Kafka Connect
    chId = await insertChapter(kafkaId, 'Kafka Connect', 'Intégrez Kafka avec d autres systèmes.', 5, 55);
    await insertLessons(chId, [
      ['Architecture Kafka Connect', 'video', 12, 1, 0, 12],
      ['Source connectors (JDBC, Debezium)', 'video', 13, 2, 0, 12],
      ['Sink connectors (Elasticsearch, S3)', 'video', 13, 3, 0, 12],
      ['Transformations (SMT)', 'video', 11, 4, 0, 10],
      ['Exercice: CDC avec Debezium', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch6: Administration cluster
    chId = await insertChapter(kafkaId, 'Administration cluster', 'Administrez un cluster Kafka en production.', 6, 55);
    await insertLessons(chId, [
      ['Configuration broker avancée', 'video', 13, 1, 0, 12],
      ['Réplication et reassignment', 'video', 12, 2, 0, 12],
      ['ACLs et sécurité (SASL, SSL)', 'video', 13, 3, 0, 12],
      ['Schema Registry', 'video', 12, 4, 0, 12],
      ['Exercice: administrer un cluster sécurisé', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch7: Monitoring Kafka
    chId = await insertChapter(kafkaId, 'Monitoring Kafka', 'Surveillez et diagnostiquez votre cluster Kafka.', 7, 50);
    await insertLessons(chId, [
      ['Métriques JMX essentielles', 'video', 12, 1, 0, 12],
      ['Prometheus + Grafana pour Kafka', 'video', 13, 2, 0, 12],
      ['Consumer lag monitoring', 'video', 12, 3, 0, 12],
      ['Exercice: dashboard Kafka', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch8: Projet Kafka
    chId = await insertChapter(kafkaId, 'Projet event streaming', 'Mettez en pratique avec un projet complet.', 8, 58);
    await insertLessons(chId, [
      ['Architecture événementielle', 'video', 12, 1, 0, 12],
      ['Pipeline de données temps réel', 'exercise', 14, 2, 0, 15],
      ['Stream processing avec ksqlDB', 'exercise', 14, 3, 0, 15],
      ['Exercice final: plateforme event-driven', 'exercise', 15, 4, 0, 20]
    ]);

    console.log('  ✅ Cours Kafka Event Streaming (8 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Pulumi Infrastructure as Code (6 chapitres)
  // ============================================================
  const pulumiId = courseIds['pulumi-iac'];
  if (pulumiId) {
    // Ch1: Introduction IaC moderne
    let chId = await insertChapter(pulumiId, 'Introduction IaC moderne', 'Découvrez Pulumi et l IaC avec de vrais langages.', 1, 50);
    await insertLessons(chId, [
      ['Pourquoi Pulumi (vs Terraform, CDK)', 'video', 12, 1, 1, 10],
      ['Architecture Pulumi (engine, providers)', 'video', 12, 2, 0, 12],
      ['Installation et premiers pas', 'video', 12, 3, 0, 12],
      ['Pulumi Cloud vs self-managed', 'video', 11, 4, 0, 10],
      ['Exercice: premier projet Pulumi', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch2: Pulumi avec Python
    chId = await insertChapter(pulumiId, 'Pulumi avec Python', 'Écrivez de l IaC en Python avec Pulumi.', 2, 62);
    await insertLessons(chId, [
      ['Setup Python et virtualenv', 'video', 11, 1, 0, 10],
      ['Ressources et providers', 'video', 13, 2, 0, 12],
      ['Inputs, outputs et interpolation', 'video', 13, 3, 0, 12],
      ['Stack references et configuration', 'video', 12, 4, 0, 12],
      ['Exercice: infrastructure AWS en Python', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: Pulumi avec TypeScript
    chId = await insertChapter(pulumiId, 'Pulumi avec TypeScript', 'Écrivez de l IaC en TypeScript avec Pulumi.', 3, 60);
    await insertLessons(chId, [
      ['Setup Node.js et TypeScript', 'video', 11, 1, 0, 10],
      ['Typing et autocompletion', 'video', 12, 2, 0, 12],
      ['Async/await avec Pulumi', 'video', 13, 3, 0, 12],
      ['Dynamic providers', 'video', 12, 4, 0, 12],
      ['Exercice: infrastructure GCP en TypeScript', 'exercise', 14, 5, 0, 15]
    ]);


    // Ch4: State et backends
    chId = await insertChapter(pulumiId, 'State et backends', 'Gérez le state Pulumi et les backends.', 4, 48);
    await insertLessons(chId, [
      ['State management et backends', 'video', 12, 1, 0, 12],
      ['Pulumi Cloud backend', 'video', 12, 2, 0, 12],
      ['S3/Azure Blob/GCS backends', 'video', 12, 3, 0, 12],
      ['Import et state manipulation', 'video', 12, 4, 0, 12]
    ]);

    // Ch5: Components et packaging
    chId = await insertChapter(pulumiId, 'Components et packaging', 'Créez des composants réutilisables Pulumi.', 5, 55);
    await insertLessons(chId, [
      ['ComponentResource pattern', 'video', 13, 1, 0, 12],
      ['Multi-language components', 'video', 13, 2, 0, 12],
      ['Packaging et distribution', 'video', 12, 3, 0, 12],
      ['Testing (unit et integration)', 'video', 12, 4, 0, 12],
      ['Exercice: composant réutilisable', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch6: CI/CD integration
    chId = await insertChapter(pulumiId, 'CI/CD integration', 'Intégrez Pulumi dans vos pipelines CI/CD.', 6, 52);
    await insertLessons(chId, [
      ['Pulumi dans GitHub Actions', 'video', 12, 1, 0, 12],
      ['Pulumi dans GitLab CI', 'video', 12, 2, 0, 12],
      ['Review stacks et previews', 'video', 12, 3, 0, 12],
      ['Policy as Code (CrossGuard)', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline IaC complet', 'exercise', 14, 5, 0, 15]
    ]);

    console.log('  ✅ Cours Pulumi IaC (6 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Podman et Containers sans Docker (6 chapitres)
  // ============================================================
  const podmanId = courseIds['podman-containers'];
  if (podmanId) {
    // Ch1: Introduction Podman
    let chId = await insertChapter(podmanId, 'Introduction Podman', 'Découvrez Podman et l écosystème OCI.', 1, 50);
    await insertLessons(chId, [
      ['Podman vs Docker : différences clés', 'video', 12, 1, 1, 10],
      ['Architecture daemonless', 'video', 12, 2, 0, 12],
      ['Installation et configuration', 'video', 11, 3, 0, 10],
      ['Compatibilité Docker CLI', 'video', 11, 4, 0, 10],
      ['Exercice: premiers pas Podman', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch2: Conteneurs sans daemon
    chId = await insertChapter(podmanId, 'Conteneurs sans daemon', 'Gérez des conteneurs sans daemon.', 2, 58);
    await insertLessons(chId, [
      ['Lancer et gérer des conteneurs', 'video', 12, 1, 0, 12],
      ['Volumes et networking', 'video', 12, 2, 0, 12],
      ['Podman Compose', 'video', 13, 3, 0, 12],
      ['Rootless containers', 'video', 13, 4, 0, 12],
      ['Exercice: application multi-conteneur rootless', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: Buildah
    chId = await insertChapter(podmanId, 'Buildah - Construction d images', 'Créez des images OCI avec Buildah.', 3, 55);
    await insertLessons(chId, [
      ['Buildah vs docker build', 'video', 12, 1, 0, 12],
      ['Construction scriptée (sans Dockerfile)', 'video', 13, 2, 0, 12],
      ['Multi-stage builds', 'video', 12, 3, 0, 12],
      ['Images minimales et scratch', 'video', 12, 4, 0, 12],
      ['Exercice: image optimisée avec Buildah', 'exercise', 13, 5, 0, 15]
    ]);


    // Ch4: Skopeo
    chId = await insertChapter(podmanId, 'Skopeo - Gestion des registries', 'Gérez les images et registries avec Skopeo.', 4, 45);
    await insertLessons(chId, [
      ['Copier des images entre registries', 'video', 12, 1, 0, 12],
      ['Inspecter les images sans pull', 'video', 11, 2, 0, 10],
      ['Signing et vérification', 'video', 12, 3, 0, 12],
      ['Exercice: migration entre registries', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch5: Pods et systemd
    chId = await insertChapter(podmanId, 'Pods et systemd', 'Gérez des pods Podman avec systemd.', 5, 55);
    await insertLessons(chId, [
      ['Pods Podman (multi-conteneur)', 'video', 13, 1, 0, 12],
      ['Générer des fichiers systemd', 'video', 12, 2, 0, 12],
      ['Quadlet (conteneurs déclaratifs)', 'video', 13, 3, 0, 12],
      ['Auto-update et rollback', 'video', 11, 4, 0, 10],
      ['Exercice: service avec Quadlet', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch6: Migration depuis Docker
    chId = await insertChapter(podmanId, 'Migration depuis Docker', 'Migrez de Docker vers Podman.', 6, 48);
    await insertLessons(chId, [
      ['Stratégie de migration', 'video', 12, 1, 0, 12],
      ['Adapter les Dockerfiles', 'video', 12, 2, 0, 12],
      ['Docker Compose vers Podman', 'video', 12, 3, 0, 12],
      ['CI/CD avec Podman', 'video', 12, 4, 0, 12]
    ]);

    console.log('  ✅ Cours Podman (6 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Service Mesh avec Istio (7 chapitres)
  // ============================================================
  const istioId = courseIds['service-mesh-istio'];
  if (istioId) {
    // Ch1: Architecture service mesh
    let chId = await insertChapter(istioId, 'Architecture service mesh', 'Comprenez les principes d un service mesh.', 1, 55);
    await insertLessons(chId, [
      ['Pourquoi un service mesh', 'video', 12, 1, 1, 10],
      ['Architecture sidecar proxy', 'video', 13, 2, 0, 12],
      ['Istio vs Linkerd vs Consul Connect', 'video', 12, 3, 0, 12],
      ['Data plane et control plane', 'video', 12, 4, 0, 12],
      ['Exercice: analyser une architecture mesh', 'exercise', 12, 5, 0, 15]
    ]);

    // Ch2: Installation Istio
    chId = await insertChapter(istioId, 'Installation Istio', 'Installez et configurez Istio sur Kubernetes.', 2, 60);
    await insertLessons(chId, [
      ['Installation avec istioctl', 'video', 13, 1, 0, 12],
      ['Profils d installation', 'video', 12, 2, 0, 12],
      ['Injection de sidecars', 'video', 13, 3, 0, 12],
      ['Istio Operator', 'video', 11, 4, 0, 10],
      ['Exercice: installer Istio sur un cluster', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: Traffic Management
    chId = await insertChapter(istioId, 'Traffic Management', 'Gérez le trafic avec Istio.', 3, 68);
    await insertLessons(chId, [
      ['VirtualService et DestinationRule', 'video', 14, 1, 0, 15],
      ['Routing basé sur les headers', 'video', 12, 2, 0, 12],
      ['Canary deployments', 'video', 13, 3, 0, 12],
      ['Traffic mirroring', 'video', 12, 4, 0, 12],
      ['Fault injection (delay, abort)', 'video', 12, 5, 0, 12],
      ['Exercice: canary deployment progressif', 'exercise', 15, 6, 0, 15]
    ]);


    // Ch4: Security (mTLS, AuthZ)
    chId = await insertChapter(istioId, 'Security - mTLS et Authorization', 'Sécurisez les communications avec Istio.', 4, 60);
    await insertLessons(chId, [
      ['mTLS automatique (PeerAuthentication)', 'video', 13, 1, 0, 12],
      ['RequestAuthentication (JWT)', 'video', 13, 2, 0, 12],
      ['AuthorizationPolicy', 'video', 14, 3, 0, 15],
      ['Certificats et rotation', 'video', 12, 4, 0, 12],
      ['Exercice: zero-trust avec Istio', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch5: Observabilité
    chId = await insertChapter(istioId, 'Observabilité', 'Observez votre mesh avec Kiali, Jaeger et Prometheus.', 5, 58);
    await insertLessons(chId, [
      ['Kiali : visualisation du mesh', 'video', 13, 1, 0, 12],
      ['Jaeger : tracing distribué', 'video', 13, 2, 0, 12],
      ['Prometheus et Grafana pour Istio', 'video', 12, 3, 0, 12],
      ['Access logging', 'video', 11, 4, 0, 10],
      ['Exercice: observabilité complète', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch6: Resilience
    chId = await insertChapter(istioId, 'Resilience', 'Implémentez la résilience avec Istio.', 6, 52);
    await insertLessons(chId, [
      ['Circuit breaker (outlierDetection)', 'video', 13, 1, 0, 12],
      ['Retries et timeouts', 'video', 12, 2, 0, 12],
      ['Rate limiting', 'video', 12, 3, 0, 12],
      ['Load balancing avancé', 'video', 11, 4, 0, 10],
      ['Exercice: application résiliente', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch7: Projet Istio
    chId = await insertChapter(istioId, 'Projet service mesh complet', 'Mettez en place un service mesh complet.', 7, 62);
    await insertLessons(chId, [
      ['Architecture microservices avec mesh', 'video', 12, 1, 0, 12],
      ['Déploiement progressif avec Flagger', 'exercise', 14, 2, 0, 15],
      ['Sécurité zero-trust', 'exercise', 14, 3, 0, 15],
      ['Observabilité end-to-end', 'exercise', 13, 4, 0, 15],
      ['Exercice final: mesh production-ready', 'exercise', 15, 5, 0, 20]
    ]);

    console.log('  ✅ Cours Service Mesh Istio (7 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Hashicorp Stack Complète (8 chapitres)
  // ============================================================
  const hashiId = courseIds['hashicorp-stack'];
  if (hashiId) {
    // Ch1: Vault avancé
    let chId = await insertChapter(hashiId, 'Vault avancé', 'Maîtrisez Vault : secrets dynamiques, PKI et transit.', 1, 68);
    await insertLessons(chId, [
      ['Architecture Vault (seal, unseal, HA)', 'video', 14, 1, 1, 12],
      ['Secrets engines (KV, databases, AWS)', 'video', 14, 2, 0, 15],
      ['Dynamic secrets et leases', 'video', 13, 3, 0, 12],
      ['PKI secrets engine', 'video', 13, 4, 0, 12],
      ['Transit engine (encryption as a service)', 'video', 12, 5, 0, 12],
      ['Exercice: Vault avec secrets dynamiques', 'exercise', 15, 6, 0, 15]
    ]);

    // Ch2: Consul
    chId = await insertChapter(hashiId, 'Consul', 'Service discovery et service mesh avec Consul.', 2, 65);
    await insertLessons(chId, [
      ['Architecture Consul (agents, datacenter)', 'video', 13, 1, 0, 12],
      ['Service discovery et health checks', 'video', 13, 2, 0, 12],
      ['KV store et watches', 'video', 12, 3, 0, 12],
      ['Consul Connect (service mesh)', 'video', 14, 4, 0, 15],
      ['Exercice: cluster Consul multi-DC', 'exercise', 15, 5, 0, 15]
    ]);

    // Ch3: Nomad
    chId = await insertChapter(hashiId, 'Nomad', 'Orchestration de workloads avec Nomad.', 3, 62);
    await insertLessons(chId, [
      ['Architecture Nomad (servers, clients)', 'video', 13, 1, 0, 12],
      ['Job specifications (service, batch, system)', 'video', 14, 2, 0, 15],
      ['Task drivers (Docker, exec, Java)', 'video', 12, 3, 0, 12],
      ['Scheduling et constraints', 'video', 12, 4, 0, 12],
      ['Exercice: déployer des services sur Nomad', 'exercise', 14, 5, 0, 15]
    ]);


    // Ch4: Packer
    chId = await insertChapter(hashiId, 'Packer', 'Créez des images machine avec Packer.', 4, 50);
    await insertLessons(chId, [
      ['Templates HCL2 et builders', 'video', 12, 1, 0, 12],
      ['Provisioners (shell, Ansible, Chef)', 'video', 13, 2, 0, 12],
      ['Multi-cloud images', 'video', 12, 3, 0, 12],
      ['Exercice: image AMI avec Packer', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch5: Intégration Vault + Consul
    chId = await insertChapter(hashiId, 'Intégration Vault + Consul', 'Intégrez Vault avec Consul pour le backend et le service mesh.', 5, 55);
    await insertLessons(chId, [
      ['Vault storage backend Consul', 'video', 13, 1, 0, 12],
      ['Auto-unseal avec Consul', 'video', 12, 2, 0, 12],
      ['Consul Connect + Vault CA', 'video', 13, 3, 0, 12],
      ['Consul Template pour Vault secrets', 'video', 12, 4, 0, 12],
      ['Exercice: Vault + Consul intégrés', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch6: Intégration Nomad + Consul
    chId = await insertChapter(hashiId, 'Intégration Nomad + Consul', 'Intégrez Nomad avec Consul pour le service discovery.', 6, 52);
    await insertLessons(chId, [
      ['Nomad service registration dans Consul', 'video', 12, 1, 0, 12],
      ['Consul Connect sidecar avec Nomad', 'video', 13, 2, 0, 12],
      ['Vault integration dans Nomad jobs', 'video', 13, 3, 0, 12],
      ['Exercice: stack Nomad + Consul + Vault', 'exercise', 14, 4, 0, 15]
    ]);

    // Ch7: Sentinel - Policy as Code
    chId = await insertChapter(hashiId, 'Sentinel - Policy as Code', 'Implémentez des policies avec Sentinel.', 7, 48);
    await insertLessons(chId, [
      ['Sentinel framework et langage', 'video', 13, 1, 0, 12],
      ['Policies pour Terraform', 'video', 12, 2, 0, 12],
      ['Policies pour Vault', 'video', 12, 3, 0, 12],
      ['Policies pour Consul et Nomad', 'video', 11, 4, 0, 10],
      ['Exercice: governance avec Sentinel', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch8: Projet intégration complète
    chId = await insertChapter(hashiId, 'Projet intégration complète', 'Mettez en place la stack HashiCorp complète.', 8, 65);
    await insertLessons(chId, [
      ['Architecture de référence', 'video', 12, 1, 0, 12],
      ['Déploiement de la stack', 'exercise', 15, 2, 0, 15],
      ['Application déployée sur Nomad', 'exercise', 14, 3, 0, 15],
      ['Secrets et service mesh', 'exercise', 14, 4, 0, 15],
      ['Exercice final: production-ready stack', 'exercise', 15, 5, 0, 20]
    ]);

    console.log('  ✅ Cours HashiCorp Stack (8 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Kubernetes Operators et CRDs (7 chapitres)
  // ============================================================
  const opsId = courseIds['kubernetes-operators-crds'];
  if (opsId) {
    // Ch1: Pattern Operator
    let chId = await insertChapter(opsId, 'Pattern Operator', 'Comprenez le pattern Operator dans Kubernetes.', 1, 52);
    await insertLessons(chId, [
      ['Controller pattern et boucle de réconciliation', 'video', 13, 1, 1, 12],
      ['Pourquoi des Operators', 'video', 12, 2, 0, 12],
      ['Operators existants (Prometheus, Strimzi)', 'video', 12, 3, 0, 12],
      ['Exercice: analyser un Operator existant', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch2: CRDs et controllers
    chId = await insertChapter(opsId, 'CRDs et controllers', 'Créez des Custom Resource Definitions.', 2, 62);
    await insertLessons(chId, [
      ['Définir un CRD (schema, validation)', 'video', 14, 1, 0, 15],
      ['Versions et conversion webhooks', 'video', 13, 2, 0, 12],
      ['Status et conditions', 'video', 12, 3, 0, 12],
      ['Finalizers et owner references', 'video', 12, 4, 0, 12],
      ['Exercice: CRD avec validation', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: Operator SDK Go
    chId = await insertChapter(opsId, 'Operator SDK Go', 'Développez des Operators en Go.', 3, 68);
    await insertLessons(chId, [
      ['Setup du projet avec operator-sdk', 'video', 13, 1, 0, 12],
      ['API et types Go', 'video', 14, 2, 0, 15],
      ['Controller et réconciliation', 'video', 14, 3, 0, 15],
      ['Webhooks (validation, mutation)', 'video', 13, 4, 0, 12],
      ['Exercice: Operator Go complet', 'exercise', 15, 5, 0, 15]
    ]);


    // Ch4: Operator SDK Ansible
    chId = await insertChapter(opsId, 'Operator SDK Ansible', 'Créez des Operators avec Ansible.', 4, 52);
    await insertLessons(chId, [
      ['Ansible Operator : concepts', 'video', 12, 1, 0, 12],
      ['Watches et rôles Ansible', 'video', 13, 2, 0, 12],
      ['Variables et status', 'video', 12, 3, 0, 12],
      ['Exercice: Operator Ansible', 'exercise', 14, 4, 0, 15]
    ]);

    // Ch5: Operator SDK Helm
    chId = await insertChapter(opsId, 'Operator SDK Helm', 'Créez des Operators basés sur Helm.', 5, 48);
    await insertLessons(chId, [
      ['Helm Operator : concepts', 'video', 12, 1, 0, 12],
      ['Chart vers Operator', 'video', 12, 2, 0, 12],
      ['Overrides et customization', 'video', 12, 3, 0, 12],
      ['Exercice: Helm-based Operator', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch6: Testing et CI/CD
    chId = await insertChapter(opsId, 'Testing et CI/CD', 'Testez et déployez vos Operators.', 6, 55);
    await insertLessons(chId, [
      ['Unit tests pour controllers', 'video', 13, 1, 0, 12],
      ['Integration tests avec envtest', 'video', 13, 2, 0, 12],
      ['E2E tests avec kind/minikube', 'video', 12, 3, 0, 12],
      ['CI/CD pour Operators', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline de test Operator', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch7: Publication OperatorHub
    chId = await insertChapter(opsId, 'Publication OperatorHub', 'Publiez vos Operators sur OperatorHub.', 7, 50);
    await insertLessons(chId, [
      ['OLM (Operator Lifecycle Manager)', 'video', 13, 1, 0, 12],
      ['Bundle format et metadata', 'video', 12, 2, 0, 12],
      ['ClusterServiceVersion (CSV)', 'video', 12, 3, 0, 12],
      ['Soumission à OperatorHub.io', 'video', 12, 4, 0, 12],
      ['Exercice: publier un Operator', 'exercise', 13, 5, 0, 15]
    ]);

    console.log('  ✅ Cours K8s Operators et CRDs (7 chapitres) inséré');
  }


  // ============================================================
  // COURSE: FinOps et Optimisation Cloud (6 chapitres)
  // ============================================================
  const finopsId = courseIds['finops-optimisation-cloud'];
  if (finopsId) {
    // Ch1: Principes FinOps
    let chId = await insertChapter(finopsId, 'Principes FinOps', 'Comprenez les principes fondamentaux du FinOps.', 1, 50);
    await insertLessons(chId, [
      ['Qu est-ce que le FinOps', 'video', 12, 1, 1, 10],
      ['Framework FinOps Foundation', 'video', 12, 2, 0, 12],
      ['Rôles et responsabilités', 'video', 11, 3, 0, 10],
      ['Maturité FinOps (crawl, walk, run)', 'video', 12, 4, 0, 12],
      ['Exercice: évaluer la maturité FinOps', 'exercise', 12, 5, 0, 15]
    ]);

    // Ch2: Modèles de coûts cloud
    chId = await insertChapter(finopsId, 'Modèles de coûts cloud', 'Comprenez les modèles de tarification cloud.', 2, 55);
    await insertLessons(chId, [
      ['AWS pricing (EC2, S3, Lambda)', 'video', 13, 1, 0, 12],
      ['Azure pricing (VMs, Storage, Functions)', 'video', 12, 2, 0, 12],
      ['GCP pricing (Compute, Storage, BigQuery)', 'video', 12, 3, 0, 12],
      ['Comparer les clouds', 'video', 11, 4, 0, 10],
      ['Exercice: estimer des coûts multi-cloud', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch3: Tagging et gouvernance
    chId = await insertChapter(finopsId, 'Tagging et gouvernance', 'Implémentez le tagging et la gouvernance des coûts.', 3, 52);
    await insertLessons(chId, [
      ['Stratégie de tagging', 'video', 12, 1, 0, 12],
      ['Tag enforcement (AWS Config, Azure Policy)', 'video', 13, 2, 0, 12],
      ['Budgets et alertes', 'video', 12, 3, 0, 12],
      ['Chargeback et showback', 'video', 11, 4, 0, 10],
      ['Exercice: implémenter le tagging', 'exercise', 13, 5, 0, 15]
    ]);


    // Ch4: Optimisation
    chId = await insertChapter(finopsId, 'Optimisation', 'Optimisez vos ressources cloud.', 4, 60);
    await insertLessons(chId, [
      ['Right-sizing des instances', 'video', 13, 1, 0, 12],
      ['Reserved Instances et Savings Plans', 'video', 13, 2, 0, 12],
      ['Spot/Preemptible instances', 'video', 12, 3, 0, 12],
      ['Storage tiering et cleanup', 'video', 12, 4, 0, 12],
      ['Exercice: plan d optimisation', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch5: Outils FinOps
    chId = await insertChapter(finopsId, 'Outils FinOps', 'Utilisez les outils FinOps pour le cloud et Kubernetes.', 5, 55);
    await insertLessons(chId, [
      ['Kubecost pour Kubernetes', 'video', 13, 1, 0, 12],
      ['Infracost pour Terraform', 'video', 12, 2, 0, 12],
      ['Cloud native tools (Cost Explorer, Cost Management)', 'video', 12, 3, 0, 12],
      ['OpenCost et FOCUS', 'video', 12, 4, 0, 12],
      ['Exercice: déployer Kubecost', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch6: Dashboards et reporting
    chId = await insertChapter(finopsId, 'Dashboards et reporting', 'Créez des dashboards FinOps et des reports.', 6, 50);
    await insertLessons(chId, [
      ['KPIs FinOps essentiels', 'video', 12, 1, 0, 12],
      ['Dashboards Grafana pour les coûts', 'video', 13, 2, 0, 12],
      ['Reporting automatisé', 'video', 12, 3, 0, 12],
      ['Anomaly detection', 'video', 11, 4, 0, 10],
      ['Exercice: dashboard FinOps complet', 'exercise', 14, 5, 0, 15]
    ]);

    console.log('  ✅ Cours FinOps (6 chapitres) inséré');
  }


  // ============================================================
  // COURSE: Observabilité avec OpenTelemetry (7 chapitres)
  // ============================================================
  const otelId = courseIds['observabilite-opentelemetry'];
  if (otelId) {
    // Ch1: Concepts observabilité
    let chId = await insertChapter(otelId, 'Concepts observabilité', 'Comprenez les piliers de l observabilité moderne.', 1, 52);
    await insertLessons(chId, [
      ['Monitoring vs Observabilité', 'video', 12, 1, 1, 10],
      ['Les trois piliers (traces, métriques, logs)', 'video', 13, 2, 0, 12],
      ['OpenTelemetry : le standard', 'video', 12, 3, 0, 12],
      ['Écosystème et CNCF', 'video', 11, 4, 0, 10],
      ['Exercice: cartographie d observabilité', 'exercise', 12, 5, 0, 15]
    ]);

    // Ch2: OpenTelemetry SDK - Traces
    chId = await insertChapter(otelId, 'OpenTelemetry SDK - Traces', 'Instrumentez vos applications avec des traces.', 2, 62);
    await insertLessons(chId, [
      ['Spans, traces et context propagation', 'video', 14, 1, 0, 15],
      ['Auto-instrumentation', 'video', 12, 2, 0, 12],
      ['Manual instrumentation', 'video', 13, 3, 0, 12],
      ['Sampling strategies', 'video', 12, 4, 0, 12],
      ['Exercice: tracer une application', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: OpenTelemetry SDK - Métriques
    chId = await insertChapter(otelId, 'OpenTelemetry SDK - Métriques', 'Collectez des métriques avec OpenTelemetry.', 3, 58);
    await insertLessons(chId, [
      ['Types de métriques (counter, histogram, gauge)', 'video', 13, 1, 0, 12],
      ['Instruments et views', 'video', 12, 2, 0, 12],
      ['Exemplars (lier métriques et traces)', 'video', 12, 3, 0, 12],
      ['Export vers Prometheus', 'video', 12, 4, 0, 12],
      ['Exercice: métriques custom', 'exercise', 13, 5, 0, 15]
    ]);


    // Ch4: OpenTelemetry SDK - Logs
    chId = await insertChapter(otelId, 'OpenTelemetry SDK - Logs', 'Intégrez les logs dans OpenTelemetry.', 4, 50);
    await insertLessons(chId, [
      ['Log bridge API', 'video', 12, 1, 0, 12],
      ['Corrélation logs-traces', 'video', 13, 2, 0, 12],
      ['Structured logging', 'video', 12, 3, 0, 12],
      ['Exercice: logs correlés aux traces', 'exercise', 13, 4, 0, 15]
    ]);

    // Ch5: Collector architecture
    chId = await insertChapter(otelId, 'Collector architecture', 'Déployez et configurez le Collector OpenTelemetry.', 5, 62);
    await insertLessons(chId, [
      ['Architecture du Collector (receivers, processors, exporters)', 'video', 14, 1, 0, 15],
      ['Déploiement (agent, gateway, sidecar)', 'video', 13, 2, 0, 12],
      ['Processors (batch, filter, transform)', 'video', 13, 3, 0, 12],
      ['Scaling et haute disponibilité', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline Collector', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch6: Backends
    chId = await insertChapter(otelId, 'Backends - Jaeger, Prometheus, Loki', 'Exportez vers les backends d observabilité.', 6, 58);
    await insertLessons(chId, [
      ['Jaeger pour le tracing', 'video', 13, 1, 0, 12],
      ['Prometheus pour les métriques', 'video', 12, 2, 0, 12],
      ['Loki pour les logs', 'video', 12, 3, 0, 12],
      ['Tempo et Grafana (stack complète)', 'video', 13, 4, 0, 12],
      ['Exercice: stack observabilité complète', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch7: Projet observabilité complète
    chId = await insertChapter(otelId, 'Projet observabilité complète', 'Mettez en place l observabilité unifiée.', 7, 62);
    await insertLessons(chId, [
      ['Architecture du projet', 'video', 12, 1, 0, 12],
      ['Instrumentation multi-services', 'exercise', 14, 2, 0, 15],
      ['Collector et pipelines', 'exercise', 13, 3, 0, 15],
      ['Dashboards correlés', 'exercise', 13, 4, 0, 15],
      ['Exercice final: observabilité production', 'exercise', 15, 5, 0, 20]
    ]);

    console.log('  ✅ Cours OpenTelemetry (7 chapitres) inséré');
  }


  // ============================================================
  // COURSE: GitLab CI/CD et DevOps (7 chapitres)
  // ============================================================
  const gitlabId = courseIds['gitlab-cicd-devops'];
  if (gitlabId) {
    // Ch1: Fondamentaux GitLab
    let chId = await insertChapter(gitlabId, 'Fondamentaux GitLab', 'Découvrez la plateforme GitLab DevOps.', 1, 50);
    await insertLessons(chId, [
      ['GitLab vs GitHub vs Bitbucket', 'video', 12, 1, 1, 10],
      ['Architecture GitLab (SaaS vs self-managed)', 'video', 12, 2, 0, 12],
      ['Groupes, projets et permissions', 'video', 12, 3, 0, 12],
      ['Merge requests et code review', 'video', 11, 4, 0, 10],
      ['Exercice: configurer un projet GitLab', 'exercise', 12, 5, 0, 15]
    ]);

    // Ch2: .gitlab-ci.yml syntaxe
    chId = await insertChapter(gitlabId, '.gitlab-ci.yml syntaxe', 'Maîtrisez la syntaxe des pipelines GitLab CI.', 2, 62);
    await insertLessons(chId, [
      ['Structure du fichier .gitlab-ci.yml', 'video', 13, 1, 0, 12],
      ['Stages et jobs', 'video', 12, 2, 0, 12],
      ['Variables et secrets', 'video', 12, 3, 0, 12],
      ['Cache et artifacts', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline multi-stage', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch3: Jobs avancés
    chId = await insertChapter(gitlabId, 'Jobs avancés', 'Écrivez des jobs CI avancés avec rules, needs et artifacts.', 3, 60);
    await insertLessons(chId, [
      ['Rules et conditions', 'video', 13, 1, 0, 12],
      ['needs (DAG pipelines)', 'video', 12, 2, 0, 12],
      ['Parallel et matrix', 'video', 12, 3, 0, 12],
      ['Includes et extends', 'video', 12, 4, 0, 12],
      ['Exercice: pipeline DAG optimisé', 'exercise', 14, 5, 0, 15]
    ]);


    // Ch4: Runners et executors
    chId = await insertChapter(gitlabId, 'Runners et executors', 'Gérez les runners GitLab CI.', 4, 55);
    await insertLessons(chId, [
      ['Types de runners (shared, group, project)', 'video', 12, 1, 0, 12],
      ['Docker executor', 'video', 13, 2, 0, 12],
      ['Kubernetes executor', 'video', 13, 3, 0, 12],
      ['Auto-scaling avec Docker Machine', 'video', 12, 4, 0, 12],
      ['Exercice: runner Kubernetes auto-scalé', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch5: Container Registry et packages
    chId = await insertChapter(gitlabId, 'Container Registry et packages', 'Utilisez le registry et les packages GitLab.', 5, 50);
    await insertLessons(chId, [
      ['Container Registry GitLab', 'video', 12, 1, 0, 12],
      ['Build et push d images en CI', 'video', 13, 2, 0, 12],
      ['Package Registry (npm, Maven, PyPI)', 'video', 12, 3, 0, 12],
      ['Dependency proxy', 'video', 11, 4, 0, 10],
      ['Exercice: pipeline avec registry', 'exercise', 13, 5, 0, 15]
    ]);

    // Ch6: Environments et review apps
    chId = await insertChapter(gitlabId, 'Environments et review apps', 'Configurez les environments et review apps.', 6, 55);
    await insertLessons(chId, [
      ['Environments et deployments', 'video', 12, 1, 0, 12],
      ['Review apps dynamiques', 'video', 13, 2, 0, 12],
      ['Protected environments et approvals', 'video', 12, 3, 0, 12],
      ['Rollback et stop environments', 'video', 12, 4, 0, 12],
      ['Exercice: review apps sur Kubernetes', 'exercise', 14, 5, 0, 15]
    ]);

    // Ch7: Auto DevOps et templates
    chId = await insertChapter(gitlabId, 'Auto DevOps et templates', 'Utilisez Auto DevOps et les templates CI.', 7, 52);
    await insertLessons(chId, [
      ['Auto DevOps : concept et activation', 'video', 12, 1, 0, 12],
      ['Stages Auto DevOps (build, test, deploy)', 'video', 13, 2, 0, 12],
      ['CI/CD templates et composants', 'video', 12, 3, 0, 12],
      ['Customiser Auto DevOps', 'video', 12, 4, 0, 12],
      ['Exercice: Auto DevOps personnalisé', 'exercise', 13, 5, 0, 15]
    ]);

    console.log('  ✅ Cours GitLab CI/CD (7 chapitres) inséré');
  }


  console.log('\n📚 Tous les chapitres et leçons des 12 cours batch 2 ont été insérés avec succès !');
}

module.exports = { seedBatch2Courses };

// Standalone runner
if (require.main === module) {
  const { getDb } = require('./connection');
  require('dotenv').config();

  async function run() {
    const db = getDb();
    await seedBatch2Courses(db);
  }

  run().catch((err) => {
    console.error('❌ Erreur lors du seeding batch 2:', err);
    process.exit(1);
  });
}
