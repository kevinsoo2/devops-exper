/**
 * Seed additional database courses:
 * - MongoDB Administration et NoSQL
 * - Redis et Caching Distribué
 * - SQL Server pour DevOps
 * - Architecture de Données Modernes (Data Mesh, Lakehouse)
 * - Migration et Interopérabilité des BDD
 */

async function seedDatabaseCourses2(db) {
  console.log('\n📚 Insertion des cours supplémentaires Base de Données...');

  async function insertChapter(courseId, title, description, orderIndex, durationMinutes) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO chapters (course_id, title, description, order_index, duration_minutes) VALUES (?, ?, ?, ?, ?)`,
      args: [courseId, title, description, orderIndex, durationMinutes]
    });
    const result = await db.execute({
      sql: `SELECT id FROM chapters WHERE course_id = ? AND order_index = ?`,
      args: [courseId, orderIndex]
    });
    return result.rows[0]?.id;
  }

  async function insertLessons(chapterId, lessons) {
    if (!chapterId) return;
    for (const lesson of lessons) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO lessons (chapter_id, title, content_type, duration_minutes, order_index, is_free, xp_reward) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [chapterId, lesson[0], lesson[1], lesson[2], lesson[3], lesson[4], lesson[5]]
      });
    }
  }

  // Insert new courses
  const newCourses = [
    ['MongoDB Administration et NoSQL', 'mongodb-administration-nosql', 'Formation complète MongoDB : modélisation documentaire, agrégation, réplication, sharding, indexation, sécurité et déploiement en production.', 'donnees', 'intermediaire', 38, 'Pierre Martin', 'Linux basics, JSON', '["Modéliser en document NoSQL","Maîtriser le framework d agrégation","Configurer la réplication (Replica Sets)","Implémenter le sharding","Optimiser avec les index","Sécuriser MongoDB","Déployer sur Kubernetes avec les Operators","Monitorer avec MongoDB Atlas et Prometheus"]', 1],
    ['Redis - Cache, Messaging et Structures de Données', 'redis-cache-messaging', 'Maîtrisez Redis : structures de données, caching, pub/sub, streams, clustering, Lua scripting et patterns avancés pour les applications haute performance.', 'donnees', 'intermediaire', 30, 'Marie Dupont', 'Un langage backend, Linux', '["Utiliser toutes les structures Redis","Implémenter des patterns de caching","Configurer Redis Cluster et Sentinel","Utiliser Redis Streams et Pub/Sub","Écrire des scripts Lua dans Redis","Intégrer Redis avec les applications","Monitorer et optimiser Redis","Gérer la persistance RDB et AOF"]', 1],
    ['SQL Server pour DevOps et Administration', 'sql-server-devops', 'Administration SQL Server complète : installation Linux/Windows, Always On, SSIS/SSRS, T-SQL avancé, performance tuning et intégration CI/CD.', 'donnees', 'intermediaire', 42, 'Lucas Bernard', 'SQL basics, Windows ou Linux', '["Installer SQL Server sur Linux et Windows","Écrire du T-SQL avancé","Configurer Always On Availability Groups","Administrer avec SSMS et Azure Data Studio","Optimiser les performances (DMVs, Query Store)","Mettre en place SSIS et les ETL","Automatiser les déploiements avec dacpac","Intégrer SQL Server dans les pipelines CI/CD"]', 1],
    ['Architecture de Données Modernes', 'architecture-donnees-modernes', 'Concevez des architectures data modernes : Data Mesh, Data Lakehouse, Event-Driven Architecture, ETL/ELT et gouvernance des données.', 'donnees', 'avance', 35, 'Marie Dupont', 'SQL, Un cloud provider', '["Concevoir un Data Lakehouse","Implémenter le Data Mesh","Architecturer un pipeline ETL/ELT","Utiliser Apache Spark et dbt","Gouvernance des données avec DataHub","Event-Driven Architecture avec Kafka","Data Quality et observabilité","Conformité RGPD et data lineage"]', 0],
    ['Migration et Interopérabilité des Bases de Données', 'migration-interoperabilite-bdd', 'Migrez entre Oracle, MySQL, PostgreSQL et SQL Server : outils, stratégies, compatibilité SQL, conversion de schémas et zero-downtime migration.', 'donnees', 'avance', 28, 'Lucas Bernard', 'Oracle ou MySQL ou PostgreSQL', '["Planifier une migration de base de données","Convertir les schémas entre SGBD","Migrer Oracle vers PostgreSQL","Migrer MySQL vers PostgreSQL","Utiliser AWS DMS et ora2pg","Gérer la compatibilité SQL","Migration zero-downtime avec CDC","Valider et tester après migration"]', 0]
  ];

  for (const c of newCourses) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: c
    });
  }
  console.log('✅ 5 cours supplémentaires de base de données insérés');

  // Get course IDs
  const slugs = ['mongodb-administration-nosql', 'redis-cache-messaging', 'sql-server-devops', 'architecture-donnees-modernes', 'migration-interoperabilite-bdd'];
  const courseIds = {};
  for (const slug of slugs) {
    const result = await db.execute({ sql: `SELECT id FROM courses WHERE slug = ?`, args: [slug] });
    if (result.rows.length > 0) courseIds[slug] = result.rows[0].id;
  }


  // ============================================================
  // MONGODB ADMINISTRATION ET NOSQL
  // ============================================================
  if (courseIds['mongodb-administration-nosql']) {
    const cid = courseIds['mongodb-administration-nosql'];

    const ch1 = await insertChapter(cid, 'Introduction au NoSQL et MongoDB', 'Comprenez les bases de données NoSQL, leurs types et quand utiliser MongoDB.', 1, 70);
    await insertLessons(ch1, [
      ['SQL vs NoSQL : quand choisir quoi', 'text', 20, 1, 1, 15],
      ['Types de bases NoSQL : Document, Clé-Valeur, Colonnes, Graphe', 'text', 20, 2, 1, 15],
      ['Architecture MongoDB : mongod, mongos, config servers', 'text', 25, 3, 0, 20],
      ['Installation MongoDB sur Linux et Docker', 'text', 20, 4, 0, 15],
      ['MongoDB Shell (mongosh) et Compass', 'text', 15, 5, 0, 10],
      ['BSON, ObjectId et types de données', 'text', 15, 6, 0, 10],
    ]);

    const ch2 = await insertChapter(cid, 'Modélisation Documentaire', 'Concevez des schémas documents efficaces : embedding, referencing et patterns.', 2, 85);
    await insertLessons(ch2, [
      ['Embedding vs Referencing : règles de décision', 'text', 25, 1, 1, 20],
      ['Design Patterns : Polymorphism, Bucket, Computed', 'text', 25, 2, 0, 20],
      ['Schema Validation avec JSON Schema', 'text', 20, 3, 0, 15],
      ['Relations One-to-One, One-to-Many, Many-to-Many', 'text', 25, 4, 0, 20],
      ['Anti-patterns à éviter', 'text', 15, 5, 0, 10],
      ['Migration de schéma et versioning', 'text', 15, 6, 0, 10],
      ['Modélisation pour les requêtes fréquentes', 'text', 20, 7, 0, 15],
    ]);

    const ch3 = await insertChapter(cid, 'CRUD et Aggregation Framework', 'Maîtrisez les opérations CRUD et le puissant framework d\'agrégation.', 3, 90);
    await insertLessons(ch3, [
      ['CRUD : insertOne, find, updateOne, deleteOne', 'text', 20, 1, 1, 15],
      ['Opérateurs de requête : $gt, $in, $regex, $elemMatch', 'text', 20, 2, 0, 15],
      ['Opérateurs de mise à jour : $set, $push, $pull, $inc', 'text', 20, 3, 0, 15],
      ['Aggregation Pipeline : $match, $group, $project', 'text', 25, 4, 0, 20],
      ['$lookup (JOINs), $unwind, $facet', 'text', 25, 5, 0, 20],
      ['$graphLookup et requêtes hiérarchiques', 'text', 20, 6, 0, 15],
      ['Aggregation avec $merge et $out', 'text', 15, 7, 0, 10],
    ]);

    const ch4 = await insertChapter(cid, 'Index et Performance', 'Optimisez MongoDB avec les index et analysez les plans de requêtes.', 4, 80);
    await insertLessons(ch4, [
      ['Types d\'index : Single, Compound, Multikey, Text', 'text', 25, 1, 0, 20],
      ['Index géospatiaux (2dsphere) et Wildcard', 'text', 20, 2, 0, 15],
      ['explain() et analyse des plans d\'exécution', 'text', 20, 3, 0, 15],
      ['Index partiels, sparse et TTL', 'text', 20, 4, 0, 15],
      ['Covered Queries et projection', 'text', 15, 5, 0, 10],
      ['Profiler MongoDB et slow queries', 'text', 15, 6, 0, 10],
      ['Stratégie d\'indexation en production', 'text', 20, 7, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Réplication et Replica Sets', 'Configurez la haute disponibilité avec les Replica Sets MongoDB.', 5, 75);
    await insertLessons(ch5, [
      ['Replica Sets : concepts et élection du primaire', 'text', 20, 1, 0, 15],
      ['Configuration d\'un Replica Set 3 nœuds', 'text', 25, 2, 0, 20],
      ['Read Preference et Write Concern', 'text', 20, 3, 0, 15],
      ['Oplog : fonctionnement et dimensionnement', 'text', 20, 4, 0, 15],
      ['Failover automatique et recovery', 'text', 20, 5, 0, 15],
      ['Arbiter et membres cachés', 'text', 15, 6, 0, 10],
    ]);

    const ch6 = await insertChapter(cid, 'Sharding et Scalabilité', 'Distribuez vos données sur plusieurs serveurs avec le sharding.', 6, 85);
    await insertLessons(ch6, [
      ['Architecture sharded cluster', 'text', 20, 1, 0, 15],
      ['Shard Key : choix et impact sur les performances', 'text', 25, 2, 0, 20],
      ['Hashed vs Ranged sharding', 'text', 20, 3, 0, 15],
      ['Zones et tag-aware sharding', 'text', 20, 4, 0, 15],
      ['Balancer et migration de chunks', 'text', 20, 5, 0, 15],
      ['Troubleshooting du sharding', 'text', 15, 6, 0, 10],
    ]);

    const ch7 = await insertChapter(cid, 'Sécurité et Administration', 'Sécurisez et administrez MongoDB en production.', 7, 75);
    await insertLessons(ch7, [
      ['Authentification SCRAM, LDAP et x.509', 'text', 20, 1, 0, 15],
      ['Autorisation RBAC : rôles et privilèges', 'text', 20, 2, 0, 15],
      ['Chiffrement at-rest et in-transit (TLS)', 'text', 20, 3, 0, 15],
      ['Audit et compliance', 'text', 15, 4, 0, 10],
      ['Backup : mongodump, filesystem snapshots, oplogs', 'text', 25, 5, 0, 20],
      ['MongoDB Atlas : DBaaS et features cloud', 'text', 20, 6, 0, 15],
    ]);

    const ch8 = await insertChapter(cid, 'MongoDB en Production DevOps', 'Déployez MongoDB avec Docker, Kubernetes et intégrez aux pipelines.', 8, 80);
    await insertLessons(ch8, [
      ['MongoDB sur Docker et Docker Compose', 'text', 20, 1, 0, 15],
      ['MongoDB Community Kubernetes Operator', 'text', 25, 2, 0, 20],
      ['Monitoring avec Prometheus et Grafana', 'text', 20, 3, 0, 15],
      ['Drivers : Node.js (Mongoose), Python (PyMongo), Java', 'text', 25, 4, 0, 20],
      ['Connection Strings et pooling applicatif', 'text', 15, 5, 0, 10],
      ['Change Streams pour le CDC', 'text', 20, 6, 0, 15],
      ['Migration de MySQL/PostgreSQL vers MongoDB', 'text', 20, 7, 0, 15],
    ]);
  }


  // ============================================================
  // REDIS - CACHE, MESSAGING ET STRUCTURES DE DONNÉES
  // ============================================================
  if (courseIds['redis-cache-messaging']) {
    const cid = courseIds['redis-cache-messaging'];

    const ch1 = await insertChapter(cid, 'Fondamentaux Redis', 'Architecture, installation et structures de données de base.', 1, 70);
    await insertLessons(ch1, [
      ['Redis : architecture single-threaded et event loop', 'text', 20, 1, 1, 15],
      ['Installation Redis (Linux, Docker, cloud)', 'text', 15, 2, 1, 10],
      ['Strings : SET, GET, INCR, EXPIRE, TTL', 'text', 20, 3, 0, 15],
      ['Lists : LPUSH, RPOP, LRANGE (files d\'attente)', 'text', 20, 4, 0, 15],
      ['Sets et Sorted Sets : classements, unions', 'text', 20, 5, 0, 15],
      ['Hashes : modéliser des objets', 'text', 15, 6, 0, 10],
      ['HyperLogLog, Bitmaps et Bitfields', 'text', 20, 7, 0, 15],
    ]);

    const ch2 = await insertChapter(cid, 'Patterns de Caching', 'Implémentez des stratégies de cache efficaces avec Redis.', 2, 80);
    await insertLessons(ch2, [
      ['Cache-Aside (Lazy Loading) pattern', 'text', 20, 1, 1, 15],
      ['Write-Through et Write-Behind patterns', 'text', 20, 2, 0, 15],
      ['TTL, LRU eviction et maxmemory policies', 'text', 20, 3, 0, 15],
      ['Cache invalidation : problèmes et solutions', 'text', 25, 4, 0, 20],
      ['Cache stampede et solutions (mutex, probabilistic)', 'text', 20, 5, 0, 15],
      ['Caching distribué vs local : quand utiliser Redis', 'text', 15, 6, 0, 10],
      ['Session storage avec Redis', 'text', 15, 7, 0, 10],
    ]);

    const ch3 = await insertChapter(cid, 'Pub/Sub et Streams', 'Messaging en temps réel avec Redis Pub/Sub et Streams.', 3, 80);
    await insertLessons(ch3, [
      ['Pub/Sub : PUBLISH, SUBSCRIBE, patterns', 'text', 20, 1, 0, 15],
      ['Redis Streams : XADD, XREAD, consumer groups', 'text', 25, 2, 0, 20],
      ['Streams vs Pub/Sub vs Kafka : comparaison', 'text', 20, 3, 0, 15],
      ['Consumer Groups et acknowledgment', 'text', 20, 4, 0, 15],
      ['Event-driven architecture avec Redis Streams', 'text', 25, 5, 0, 20],
      ['Dead letter queues et retry patterns', 'text', 15, 6, 0, 10],
    ]);

    const ch4 = await insertChapter(cid, 'Patterns Avancés et Lua', 'Rate limiting, distributed locks, Lua scripting et transactions.', 4, 85);
    await insertLessons(ch4, [
      ['Transactions : MULTI, EXEC, WATCH', 'text', 20, 1, 0, 15],
      ['Lua scripting : EVAL et EVALSHA', 'text', 25, 2, 0, 20],
      ['Distributed Locks avec Redlock', 'text', 25, 3, 0, 20],
      ['Rate Limiting : Token Bucket et Sliding Window', 'text', 25, 4, 0, 20],
      ['Leaderboards en temps réel (Sorted Sets)', 'text', 20, 5, 0, 15],
      ['Geospatial : GEOADD, GEODIST, GEOSEARCH', 'text', 20, 6, 0, 15],
      ['Bloom Filters et probabilistic data structures', 'text', 20, 7, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Redis Cluster et Haute Disponibilité', 'Configurez Redis Sentinel et Cluster pour la production.', 5, 80);
    await insertLessons(ch5, [
      ['Redis Sentinel : monitoring et failover automatique', 'text', 25, 1, 0, 20],
      ['Redis Cluster : hash slots et resharding', 'text', 25, 2, 0, 20],
      ['Configuration d\'un cluster 6 nœuds', 'text', 25, 3, 0, 20],
      ['Persistance : RDB snapshots vs AOF', 'text', 20, 4, 0, 15],
      ['Redis sur Kubernetes (Redis Operator)', 'text', 20, 5, 0, 15],
      ['Backup, restore et disaster recovery', 'text', 15, 6, 0, 10],
    ]);

    const ch6 = await insertChapter(cid, 'Redis en Production', 'Monitoring, optimisation, sécurité et intégration applicative.', 6, 75);
    await insertLessons(ch6, [
      ['Monitoring avec redis-cli INFO et redis_exporter', 'text', 20, 1, 0, 15],
      ['Memory optimization : encodings et compression', 'text', 20, 2, 0, 15],
      ['Sécurité : ACL, TLS, renommage de commandes', 'text', 20, 3, 0, 15],
      ['Client libraries : ioredis (Node), redis-py, Jedis', 'text', 20, 4, 0, 15],
      ['Redis avec Spring Boot et Django', 'text', 20, 5, 0, 15],
      ['Redis Stack : RedisJSON, RediSearch, RedisGraph', 'text', 20, 6, 0, 15],
    ]);
  }


  // ============================================================
  // SQL SERVER POUR DEVOPS ET ADMINISTRATION
  // ============================================================
  if (courseIds['sql-server-devops']) {
    const cid = courseIds['sql-server-devops'];

    const ch1 = await insertChapter(cid, 'Architecture SQL Server', 'Moteur relationnel, buffer pool, TempDB, et architecture interne.', 1, 80);
    await insertLessons(ch1, [
      ['Architecture du moteur SQL Server', 'text', 20, 1, 1, 15],
      ['Buffer Pool, Plan Cache et Memory Management', 'text', 25, 2, 1, 20],
      ['TempDB : rôle, configuration et optimisation', 'text', 20, 3, 0, 15],
      ['Transaction Log et recovery models', 'text', 20, 4, 0, 15],
      ['SQL Server sur Linux vs Windows', 'text', 15, 5, 0, 10],
      ['Editions : Express, Standard, Enterprise, Developer', 'text', 15, 6, 0, 10],
    ]);

    const ch2 = await insertChapter(cid, 'Installation et Configuration', 'Installez SQL Server sur Windows et Linux, configurez les instances.', 2, 75);
    await insertLessons(ch2, [
      ['Installation SQL Server sur Windows Server', 'text', 20, 1, 0, 15],
      ['Installation SQL Server sur Linux (Ubuntu/RHEL)', 'text', 25, 2, 1, 20],
      ['SQL Server sur Docker et Kubernetes', 'text', 25, 3, 0, 20],
      ['SSMS, Azure Data Studio et sqlcmd', 'text', 15, 4, 0, 10],
      ['Configuration post-installation : mémoire, CPU, TempDB', 'text', 20, 5, 0, 15],
      ['SQL Server Agent et jobs automatisés', 'text', 20, 6, 0, 15],
    ]);

    const ch3 = await insertChapter(cid, 'T-SQL Avancé', 'Maîtrisez le T-SQL : CTE, Window Functions, PIVOT, JSON, Dynamic SQL.', 3, 90);
    await insertLessons(ch3, [
      ['Common Table Expressions (CTE) et récursion', 'text', 20, 1, 1, 15],
      ['Window Functions : ROW_NUMBER, RANK, LAG, LEAD', 'text', 25, 2, 0, 20],
      ['PIVOT, UNPIVOT et CROSS APPLY', 'text', 20, 3, 0, 15],
      ['JSON support : FOR JSON, OPENJSON, JSON_VALUE', 'text', 20, 4, 0, 15],
      ['Temporal Tables (tables temporelles système)', 'text', 20, 5, 0, 15],
      ['Dynamic SQL et sp_executesql', 'text', 20, 6, 0, 15],
      ['Stored Procedures, Functions et Triggers', 'text', 25, 7, 0, 20],
    ]);

    const ch4 = await insertChapter(cid, 'Sécurité SQL Server', 'Authentification, autorisation, chiffrement et audit.', 4, 75);
    await insertLessons(ch4, [
      ['Authentification Windows vs Mixed Mode', 'text', 20, 1, 0, 15],
      ['Logins, Users et Schemas', 'text', 20, 2, 0, 15],
      ['Rôles serveur et rôles de base de données', 'text', 20, 3, 0, 15],
      ['Transparent Data Encryption (TDE)', 'text', 20, 4, 0, 15],
      ['Always Encrypted et Dynamic Data Masking', 'text', 20, 5, 0, 15],
      ['Row-Level Security (RLS)', 'text', 15, 6, 0, 10],
      ['SQL Server Audit et Extended Events', 'text', 20, 7, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Haute Disponibilité', 'Always On, Failover Cluster, Log Shipping et mirroring.', 5, 90);
    await insertLessons(ch5, [
      ['Always On Availability Groups : concepts', 'text', 25, 1, 0, 20],
      ['Configuration d\'un AG synchrone et asynchrone', 'text', 25, 2, 0, 20],
      ['Failover automatique et manual', 'text', 20, 3, 0, 15],
      ['Always On Failover Cluster Instance (FCI)', 'text', 25, 4, 0, 20],
      ['Log Shipping pour la DR', 'text', 20, 5, 0, 15],
      ['Distributed Availability Groups', 'text', 20, 6, 0, 15],
    ]);

    const ch6 = await insertChapter(cid, 'Performance Tuning', 'Query Store, DMVs, index tuning et diagnostics.', 6, 85);
    await insertLessons(ch6, [
      ['Query Store : capture et analyse des plans', 'text', 25, 1, 0, 20],
      ['DMVs essentielles : sys.dm_exec_*, sys.dm_os_*', 'text', 25, 2, 0, 20],
      ['Missing Index DMVs et index advisor', 'text', 20, 3, 0, 15],
      ['Statistiques et cardinalité estimator', 'text', 20, 4, 0, 15],
      ['Wait Statistics et diagnostic des bottlenecks', 'text', 25, 5, 0, 20],
      ['Intelligent Query Processing (IQP) SQL 2022', 'text', 20, 6, 0, 15],
    ]);

    const ch7 = await insertChapter(cid, 'SQL Server et DevOps', 'Database DevOps : dacpac, CI/CD, migrations et Infrastructure as Code.', 7, 85);
    await insertLessons(ch7, [
      ['SQL Server Data Tools (SSDT) et projets .sqlproj', 'text', 25, 1, 0, 20],
      ['dacpac/bacpac : deployment et portabilité', 'text', 20, 2, 0, 15],
      ['Migrations avec Flyway et DbUp', 'text', 20, 3, 0, 15],
      ['CI/CD pour SQL Server : GitHub Actions, Azure DevOps', 'text', 25, 4, 0, 20],
      ['SQL Server sur Azure (Azure SQL, Managed Instance)', 'text', 25, 5, 0, 20],
      ['Terraform pour provisionner SQL Server', 'text', 20, 6, 0, 15],
      ['Monitoring avec Grafana et telegraf', 'text', 20, 7, 0, 15],
    ]);
  }


  // ============================================================
  // ARCHITECTURE DE DONNÉES MODERNES
  // ============================================================
  if (courseIds['architecture-donnees-modernes']) {
    const cid = courseIds['architecture-donnees-modernes'];

    const ch1 = await insertChapter(cid, 'Fondamentaux des Architectures Data', 'Data Warehouse, Data Lake, Lakehouse et évolution des architectures.', 1, 80);
    await insertLessons(ch1, [
      ['Évolution : OLTP, Data Warehouse, Data Lake, Lakehouse', 'text', 25, 1, 1, 20],
      ['Architecture Lambda vs Kappa', 'text', 20, 2, 1, 15],
      ['Data Lakehouse : le meilleur des deux mondes', 'text', 25, 3, 0, 20],
      ['Apache Iceberg, Delta Lake, Apache Hudi', 'text', 25, 4, 0, 20],
      ['Star Schema, Snowflake et modélisation dimensionnelle', 'text', 20, 5, 0, 15],
      ['Batch vs Streaming vs Hybrid processing', 'text', 20, 6, 0, 15],
    ]);

    const ch2 = await insertChapter(cid, 'Data Mesh et Décentralisation', 'Principes du Data Mesh : ownership, produits data et self-service.', 2, 75);
    await insertLessons(ch2, [
      ['Les 4 principes du Data Mesh', 'text', 25, 1, 0, 20],
      ['Domain-Oriented Ownership', 'text', 20, 2, 0, 15],
      ['Data as a Product : contrats et SLA', 'text', 20, 3, 0, 15],
      ['Self-Service Data Platform', 'text', 20, 4, 0, 15],
      ['Federated Computational Governance', 'text', 20, 5, 0, 15],
      ['Implémenter le Data Mesh progressivement', 'text', 20, 6, 0, 15],
    ]);

    const ch3 = await insertChapter(cid, 'ETL/ELT et Pipelines de Données', 'Construisez des pipelines data modernes avec dbt, Airflow et Spark.', 3, 90);
    await insertLessons(ch3, [
      ['ETL vs ELT : avantages et cas d\'usage', 'text', 20, 1, 1, 15],
      ['Apache Airflow : DAGs, operators, scheduling', 'text', 25, 2, 0, 20],
      ['dbt (data build tool) : transformations SQL', 'text', 25, 3, 0, 20],
      ['Apache Spark : traitement distribué', 'text', 25, 4, 0, 20],
      ['Fivetran, Airbyte : ingestion de données', 'text', 20, 5, 0, 15],
      ['Dagster et Prefect : orchestration moderne', 'text', 20, 6, 0, 15],
      ['Testing des pipelines data', 'text', 15, 7, 0, 10],
    ]);

    const ch4 = await insertChapter(cid, 'Event-Driven Data Architecture', 'Kafka, CDC, Event Sourcing et streaming de données.', 4, 85);
    await insertLessons(ch4, [
      ['Event-Driven Architecture : principes', 'text', 20, 1, 0, 15],
      ['Kafka comme backbone de données', 'text', 25, 2, 0, 20],
      ['Change Data Capture avec Debezium', 'text', 25, 3, 0, 20],
      ['Stream Processing : Kafka Streams, Flink', 'text', 25, 4, 0, 20],
      ['Materializing event streams en vues', 'text', 20, 5, 0, 15],
      ['Event Store et temporal queries', 'text', 20, 6, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Gouvernance et Qualité des Données', 'Cataloging, lineage, qualité et conformité RGPD.', 5, 80);
    await insertLessons(ch5, [
      ['Data Catalog : DataHub, Apache Atlas, Amundsen', 'text', 25, 1, 0, 20],
      ['Data Lineage et impact analysis', 'text', 20, 2, 0, 15],
      ['Data Quality : Great Expectations, dbt tests', 'text', 25, 3, 0, 20],
      ['Data Contracts entre producteurs et consommateurs', 'text', 20, 4, 0, 15],
      ['RGPD : anonymisation, pseudonymisation, droit à l\'oubli', 'text', 25, 5, 0, 20],
      ['Classification et tagging automatique', 'text', 15, 6, 0, 10],
    ]);

    const ch6 = await insertChapter(cid, 'Data Observability', 'Surveillez la santé de vos données en production.', 6, 70);
    await insertLessons(ch6, [
      ['Les 5 piliers de la Data Observability', 'text', 20, 1, 0, 15],
      ['Freshness, Volume, Schema, Distribution, Lineage', 'text', 25, 2, 0, 20],
      ['Outils : Monte Carlo, Elementary, Soda', 'text', 20, 3, 0, 15],
      ['Alerting et incident management pour la data', 'text', 20, 4, 0, 15],
      ['SLOs pour les pipelines data', 'text', 15, 5, 0, 10],
      ['Intégration avec les outils DevOps existants', 'text', 15, 6, 0, 10],
    ]);
  }


  // ============================================================
  // MIGRATION ET INTEROPÉRABILITÉ DES BASES DE DONNÉES
  // ============================================================
  if (courseIds['migration-interoperabilite-bdd']) {
    const cid = courseIds['migration-interoperabilite-bdd'];

    const ch1 = await insertChapter(cid, 'Planification d\'une Migration de Base de Données', 'Méthodologie, évaluation et planification d\'une migration réussie.', 1, 75);
    await insertLessons(ch1, [
      ['Pourquoi migrer : coûts, performance, cloud, modernisation', 'text', 20, 1, 1, 15],
      ['Évaluation de la complexité : AWS SCT, ora2pg assessment', 'text', 25, 2, 1, 20],
      ['Types de migration : homogène vs hétérogène', 'text', 15, 3, 0, 10],
      ['Big Bang vs migration progressive', 'text', 20, 4, 0, 15],
      ['Inventaire des dépendances applicatives', 'text', 20, 5, 0, 15],
      ['Plan de test et critères de succès', 'text', 15, 6, 0, 10],
      ['Estimation des risques et plan de rollback', 'text', 20, 7, 0, 15],
    ]);

    const ch2 = await insertChapter(cid, 'Migration Oracle vers PostgreSQL', 'Convertissez Oracle vers PostgreSQL : PL/SQL, packages, types et séquences.', 2, 95);
    await insertLessons(ch2, [
      ['Différences fondamentales Oracle vs PostgreSQL', 'text', 25, 1, 1, 20],
      ['ora2pg : installation et configuration', 'text', 25, 2, 0, 20],
      ['Conversion des types de données', 'text', 20, 3, 0, 15],
      ['Migration PL/SQL vers PL/pgSQL', 'text', 25, 4, 0, 20],
      ['Packages Oracle : stratégies de conversion', 'text', 25, 5, 0, 20],
      ['Séquences, synonymes et DB links', 'text', 20, 6, 0, 15],
      ['Migration des procédures stockées et triggers', 'text', 20, 7, 0, 15],
      ['Tests de régression avec pgTAP', 'text', 15, 8, 0, 10],
    ]);

    const ch3 = await insertChapter(cid, 'Migration MySQL vers PostgreSQL', 'Migrez de MySQL/MariaDB vers PostgreSQL : schémas, données et applications.', 3, 80);
    await insertLessons(ch3, [
      ['Différences MySQL vs PostgreSQL', 'text', 20, 1, 0, 15],
      ['pgloader : migration automatisée', 'text', 25, 2, 0, 20],
      ['Conversion des types : AUTO_INCREMENT, ENUM, BLOB', 'text', 20, 3, 0, 15],
      ['Stored procedures et triggers : adaptations', 'text', 20, 4, 0, 15],
      ['Différences de comportement SQL', 'text', 20, 5, 0, 15],
      ['Migration des applications : changements de drivers', 'text', 20, 6, 0, 15],
    ]);

    const ch4 = await insertChapter(cid, 'Migration vers le Cloud', 'Migrez vers AWS RDS, Azure SQL, Google Cloud SQL avec les services managés.', 4, 85);
    await insertLessons(ch4, [
      ['AWS Database Migration Service (DMS)', 'text', 25, 1, 0, 20],
      ['Azure Database Migration Service', 'text', 25, 2, 0, 20],
      ['Google Cloud Database Migration', 'text', 20, 3, 0, 15],
      ['Migration vers Aurora (PostgreSQL/MySQL compatible)', 'text', 20, 4, 0, 15],
      ['On-premise vers Cloud : patterns de connectivité', 'text', 20, 5, 0, 15],
      ['Cutover strategies et DNS failover', 'text', 20, 6, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Migration Zero-Downtime', 'Techniques pour migrer sans interruption de service.', 5, 90);
    await insertLessons(ch5, [
      ['Dual-Write pattern et synchronisation bidirectionnelle', 'text', 25, 1, 0, 20],
      ['Change Data Capture (CDC) pour la migration continue', 'text', 25, 2, 0, 20],
      ['Shadow reads et validation en temps réel', 'text', 20, 3, 0, 15],
      ['Feature flags pour le switch de base', 'text', 20, 4, 0, 15],
      ['Strangler Fig pattern pour les applications', 'text', 25, 5, 0, 20],
      ['Monitoring de la cohérence pendant la migration', 'text', 20, 6, 0, 15],
      ['Rehearsal et dress rehearsal', 'text', 15, 7, 0, 10],
    ]);

    const ch6 = await insertChapter(cid, 'Interopérabilité Multi-SGBD', 'Faites communiquer plusieurs bases entre elles dans une architecture hybride.', 6, 80);
    await insertLessons(ch6, [
      ['Foreign Data Wrappers (FDW) PostgreSQL', 'text', 25, 1, 0, 20],
      ['Oracle Database Links et Heterogeneous Services', 'text', 20, 2, 0, 15],
      ['Linked Servers SQL Server', 'text', 20, 3, 0, 15],
      ['API Gateway comme couche d\'abstraction', 'text', 20, 4, 0, 15],
      ['Polyglot Persistence : choisir le bon SGBD par cas', 'text', 25, 5, 0, 20],
      ['Data virtualization avec Trino/Presto', 'text', 25, 6, 0, 20],
    ]);
  }

  console.log('✅ Chapitres et leçons des 5 cours BDD supplémentaires insérés');
}

module.exports = { seedDatabaseCourses2 };
