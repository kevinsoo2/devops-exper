/**
 * Seed database courses:
 * - Oracle Database Administration
 * - MySQL Administration et Optimisation
 * - PostgreSQL Avancé
 * - Bases de Données et Serveurs Applicatifs (interactions)
 */

async function seedDatabaseCourses(db) {
  console.log('\n📚 Insertion des cours Base de Données (Oracle, MySQL, PostgreSQL, Interactions)...');

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


  // Insert the 4 new courses
  const newCourses = [
    ['Oracle Database Administration Complète', 'oracle-database-administration', 'Formation complète Oracle : architecture, installation, administration, SQL avancé, PL/SQL, RAC, Data Guard, RMAN, performance tuning et haute disponibilité.', 'donnees', 'intermediaire', 50, 'Lucas Bernard', 'SQL basics, Linux', '["Comprendre l architecture Oracle","Installer Oracle Database","Administrer les tablespaces et users","Écrire du PL/SQL avancé","Configurer RMAN et les backups","Mettre en place Data Guard","Optimiser les performances","Configurer Oracle RAC"]', 1],
    ['MySQL Administration et Optimisation', 'mysql-administration-optimisation', 'Maîtrisez MySQL/MariaDB : installation, administration, réplication, clustering, optimisation des requêtes, InnoDB tuning et haute disponibilité.', 'donnees', 'intermediaire', 40, 'Pierre Martin', 'SQL basics, Linux', '["Installer et configurer MySQL","Gérer les utilisateurs et privileges","Optimiser les requêtes et index","Configurer la réplication","Déployer MySQL InnoDB Cluster","Mettre en place ProxySQL","Automatiser les backups","Monitorer avec PMM"]', 1],
    ['PostgreSQL Avancé - Administration et Performance', 'postgresql-avance-administration', 'PostgreSQL de A à Z : architecture, administration avancée, extensions, réplication, partitionnement, JSONB, performance tuning et PgBouncer.', 'donnees', 'intermediaire', 45, 'Marie Dupont', 'SQL basics, Linux', '["Comprendre l architecture PostgreSQL","Configurer la réplication streaming","Implémenter le partitionnement","Utiliser JSONB et extensions","Optimiser avec EXPLAIN ANALYZE","Configurer PgBouncer et pooling","Gérer les vacuum et autovacuum","Mettre en place Patroni HA"]', 1],
    ['Bases de Données et Serveurs Applicatifs - Architecture et Interactions', 'databases-serveurs-applicatifs', 'Comprenez comment les bases de données interagissent avec les serveurs applicatifs : connection pooling, ORM, caching, patterns d architecture, microservices et data.', 'donnees', 'intermediaire', 35, 'Lucas Bernard', 'SQL basics, Un langage backend', '["Comprendre les patterns de connexion","Configurer le connection pooling","Utiliser les ORM efficacement","Implémenter le caching avec Redis","Architecturer data pour microservices","Gérer les transactions distribuées","Optimiser les requêtes N+1","Implémenter CQRS et Event Sourcing"]', 1]
  ];

  for (const c of newCourses) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: c
    });
  }
  console.log('✅ 4 cours de base de données insérés');


  // Get course IDs
  const slugs = ['oracle-database-administration', 'mysql-administration-optimisation', 'postgresql-avance-administration', 'databases-serveurs-applicatifs'];
  const courseIds = {};
  for (const slug of slugs) {
    const result = await db.execute({ sql: `SELECT id FROM courses WHERE slug = ?`, args: [slug] });
    if (result.rows.length > 0) courseIds[slug] = result.rows[0].id;
  }

  // ============================================================
  // ORACLE DATABASE ADMINISTRATION
  // ============================================================
  if (courseIds['oracle-database-administration']) {
    const cid = courseIds['oracle-database-administration'];

    const ch1 = await insertChapter(cid, 'Architecture Oracle Database', 'Comprenez l\'architecture interne d\'Oracle : SGA, PGA, processus, fichiers et instances.', 1, 90);
    await insertLessons(ch1, [
      ['Introduction à Oracle Database', 'text', 20, 1, 1, 15],
      ['Architecture SGA : Shared Pool, Buffer Cache, Redo Log Buffer', 'text', 25, 2, 1, 20],
      ['PGA et processus serveur', 'text', 20, 3, 0, 15],
      ['Fichiers Oracle : Datafiles, Redo Logs, Control Files', 'text', 20, 4, 0, 15],
      ['Instance vs Base de données', 'text', 15, 5, 0, 10],
      ['Architecture multitenant : CDB et PDB', 'text', 25, 6, 0, 20],
    ]);

    const ch2 = await insertChapter(cid, 'Installation et Configuration', 'Installez Oracle Database sur Linux, configurez le listener et créez une base.', 2, 80);
    await insertLessons(ch2, [
      ['Prérequis système pour Oracle', 'text', 15, 1, 1, 10],
      ['Installation Oracle sur Oracle Linux/RHEL', 'text', 25, 2, 0, 20],
      ['Configuration du Listener et TNS', 'text', 20, 3, 0, 15],
      ['Création de base avec DBCA', 'text', 20, 4, 0, 15],
      ['Oracle Enterprise Manager Database Express', 'text', 15, 5, 0, 10],
      ['Paramètres d\'initialisation essentiels', 'text', 20, 6, 0, 15],
    ]);


    const ch3 = await insertChapter(cid, 'Administration des Tablespaces et Stockage', 'Gérez les tablespaces, datafiles, segments, extents et l\'espace disque Oracle.', 3, 75);
    await insertLessons(ch3, [
      ['Tablespaces : SYSTEM, SYSAUX, USERS, TEMP, UNDO', 'text', 20, 1, 1, 15],
      ['Créer et gérer des tablespaces', 'text', 20, 2, 0, 15],
      ['Segments, extents et blocs Oracle', 'text', 15, 3, 0, 10],
      ['Automatic Storage Management (ASM)', 'text', 25, 4, 0, 20],
      ['Gestion de l\'espace et autoextend', 'text', 15, 5, 0, 10],
      ['Oracle Managed Files (OMF)', 'text', 15, 6, 0, 10],
    ]);

    const ch4 = await insertChapter(cid, 'Gestion des Utilisateurs et Sécurité', 'Créez des utilisateurs, rôles, profils et gérez les privilèges Oracle.', 4, 70);
    await insertLessons(ch4, [
      ['Création d\'utilisateurs et authentication', 'text', 20, 1, 1, 15],
      ['Privilèges système et objet', 'text', 20, 2, 0, 15],
      ['Rôles prédéfinis et personnalisés', 'text', 15, 3, 0, 10],
      ['Profils et gestion des mots de passe', 'text', 15, 4, 0, 10],
      ['Oracle Audit : Unified Auditing', 'text', 20, 5, 0, 15],
      ['Transparent Data Encryption (TDE)', 'text', 20, 6, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'SQL Avancé et PL/SQL', 'Maîtrisez le SQL analytique Oracle et la programmation PL/SQL.', 5, 100);
    await insertLessons(ch5, [
      ['Fonctions analytiques : ROW_NUMBER, RANK, LEAD/LAG', 'text', 20, 1, 1, 15],
      ['Requêtes hiérarchiques : CONNECT BY et CTE récursives', 'text', 20, 2, 0, 15],
      ['Pivoting et UNPIVOT', 'text', 15, 3, 0, 10],
      ['PL/SQL : Blocs, curseurs et exceptions', 'text', 25, 4, 0, 20],
      ['Packages, procédures et fonctions', 'text', 25, 5, 0, 20],
      ['Triggers et événements système', 'text', 20, 6, 0, 15],
      ['Collections et types objet', 'text', 20, 7, 0, 15],
    ]);


    const ch6 = await insertChapter(cid, 'Backup et Recovery avec RMAN', 'Maîtrisez RMAN pour les sauvegardes complètes, incrémentales et la restauration.', 6, 85);
    await insertLessons(ch6, [
      ['Introduction à RMAN et concepts de backup', 'text', 20, 1, 1, 15],
      ['Backups complets et incrémentaux', 'text', 25, 2, 0, 20],
      ['Catalogue RMAN et gestion de la rétention', 'text', 20, 3, 0, 15],
      ['Restauration complète et Point-in-Time Recovery', 'text', 25, 4, 0, 20],
      ['Flashback : Database, Table, Query', 'text', 20, 5, 0, 15],
      ['Stratégies de backup en production', 'text', 20, 6, 0, 15],
    ]);

    const ch7 = await insertChapter(cid, 'Haute Disponibilité : Data Guard et RAC', 'Configurez Oracle Data Guard et Real Application Clusters pour la HA.', 7, 95);
    await insertLessons(ch7, [
      ['Oracle Data Guard : concepts et architecture', 'text', 20, 1, 0, 15],
      ['Configurer un standby physique', 'text', 25, 2, 0, 20],
      ['Switchover et Failover', 'text', 20, 3, 0, 15],
      ['Active Data Guard et Far Sync', 'text', 20, 4, 0, 15],
      ['Oracle RAC : architecture et Grid Infrastructure', 'text', 25, 5, 0, 20],
      ['Configuration d\'un cluster RAC', 'text', 25, 6, 0, 20],
      ['Services et load balancing RAC', 'text', 20, 7, 0, 15],
    ]);

    const ch8 = await insertChapter(cid, 'Performance Tuning Oracle', 'Optimisez les performances : AWR, ASH, SQL Tuning Advisor et paramétrage.', 8, 90);
    await insertLessons(ch8, [
      ['AWR, ADDM et ASH : outils de diagnostic', 'text', 25, 1, 0, 20],
      ['Analyse des plans d\'exécution', 'text', 25, 2, 0, 20],
      ['SQL Tuning Advisor et SQL Profiles', 'text', 20, 3, 0, 15],
      ['Index : B-Tree, Bitmap, Function-Based', 'text', 20, 4, 0, 15],
      ['Statistiques et optimizer', 'text', 20, 5, 0, 15],
      ['Memory tuning : SGA et PGA', 'text', 20, 6, 0, 15],
      ['I/O tuning et tablespace optimization', 'text', 20, 7, 0, 15],
    ]);
  }


  // ============================================================
  // MYSQL ADMINISTRATION ET OPTIMISATION
  // ============================================================
  if (courseIds['mysql-administration-optimisation']) {
    const cid = courseIds['mysql-administration-optimisation'];

    const ch1 = await insertChapter(cid, 'Architecture MySQL et Installation', 'Architecture interne MySQL/MariaDB, moteurs de stockage et installation.', 1, 80);
    await insertLessons(ch1, [
      ['Architecture MySQL : connexions, threads, caches', 'text', 20, 1, 1, 15],
      ['Moteurs de stockage : InnoDB vs MyISAM vs Memory', 'text', 20, 2, 1, 15],
      ['Installation MySQL sur Linux (apt, yum, source)', 'text', 20, 3, 0, 15],
      ['Configuration initiale : my.cnf et bonnes pratiques', 'text', 20, 4, 0, 15],
      ['MySQL Shell et outils CLI', 'text', 15, 5, 0, 10],
      ['Différences MySQL vs MariaDB', 'text', 15, 6, 0, 10],
    ]);

    const ch2 = await insertChapter(cid, 'Administration et Sécurité', 'Gérez les utilisateurs, les droits et sécurisez MySQL.', 2, 75);
    await insertLessons(ch2, [
      ['Gestion des utilisateurs et authentification', 'text', 20, 1, 1, 15],
      ['Système de privilèges : GRANT, REVOKE', 'text', 20, 2, 0, 15],
      ['Rôles MySQL 8.0+', 'text', 15, 3, 0, 10],
      ['SSL/TLS pour les connexions client', 'text', 20, 4, 0, 15],
      ['Audit Plugin et logs de sécurité', 'text', 15, 5, 0, 10],
      ['mysql_secure_installation et hardening', 'text', 15, 6, 0, 10],
    ]);

    const ch3 = await insertChapter(cid, 'InnoDB en Profondeur', 'Comprenez InnoDB : buffer pool, redo log, undo, MVCC et tuning.', 3, 85);
    await insertLessons(ch3, [
      ['Buffer Pool : architecture et configuration', 'text', 25, 1, 0, 20],
      ['Redo Log et Double Write Buffer', 'text', 20, 2, 0, 15],
      ['MVCC et niveaux d\'isolation', 'text', 20, 3, 0, 15],
      ['Undo tablespace et purge', 'text', 15, 4, 0, 10],
      ['InnoDB Cluster vs NDB Cluster', 'text', 20, 5, 0, 15],
      ['Configuration optimale de innodb_buffer_pool_size', 'text', 20, 6, 0, 15],
    ]);


    const ch4 = await insertChapter(cid, 'Optimisation des Requêtes', 'Analysez et optimisez les requêtes SQL avec EXPLAIN, index et query rewriting.', 4, 90);
    await insertLessons(ch4, [
      ['EXPLAIN et EXPLAIN ANALYZE', 'text', 25, 1, 1, 20],
      ['Types d\'index : B-Tree, Hash, Full-Text, Spatial', 'text', 20, 2, 0, 15],
      ['Index composites et covering index', 'text', 20, 3, 0, 15],
      ['Optimiser les JOINs et sous-requêtes', 'text', 25, 4, 0, 20],
      ['Query Cache vs Buffer Pool (MySQL 8.0)', 'text', 15, 5, 0, 10],
      ['Slow Query Log et Performance Schema', 'text', 20, 6, 0, 15],
      ['pt-query-digest et outils Percona', 'text', 15, 7, 0, 10],
    ]);

    const ch5 = await insertChapter(cid, 'Réplication MySQL', 'Configurez la réplication : async, semi-sync, GTID et Group Replication.', 5, 85);
    await insertLessons(ch5, [
      ['Réplication asynchrone : concepts et configuration', 'text', 25, 1, 0, 20],
      ['GTID-based replication', 'text', 20, 2, 0, 15],
      ['Réplication semi-synchrone', 'text', 20, 3, 0, 15],
      ['MySQL Group Replication (MGR)', 'text', 25, 4, 0, 20],
      ['ProxySQL : load balancing et read/write split', 'text', 25, 5, 0, 20],
      ['Dépannage de la réplication', 'text', 20, 6, 0, 15],
    ]);

    const ch6 = await insertChapter(cid, 'Backup, Recovery et Haute Disponibilité', 'Stratégies de backup et solutions HA pour MySQL.', 6, 80);
    await insertLessons(ch6, [
      ['mysqldump et mydumper : backups logiques', 'text', 20, 1, 0, 15],
      ['Percona XtraBackup : backups physiques', 'text', 25, 2, 0, 20],
      ['Point-in-Time Recovery avec binlogs', 'text', 20, 3, 0, 15],
      ['MySQL InnoDB Cluster + MySQL Router', 'text', 25, 4, 0, 20],
      ['Orchestrator pour le failover automatique', 'text', 20, 5, 0, 15],
      ['MySQL en conteneur Docker et Kubernetes', 'text', 20, 6, 0, 15],
    ]);

    const ch7 = await insertChapter(cid, 'Monitoring et Maintenance', 'Surveillez MySQL avec PMM, maintenez les tables et analysez les performances.', 7, 70);
    await insertLessons(ch7, [
      ['Percona Monitoring and Management (PMM)', 'text', 25, 1, 0, 20],
      ['Performance Schema en détail', 'text', 20, 2, 0, 15],
      ['Information Schema et sys schema', 'text', 15, 3, 0, 10],
      ['Maintenance : OPTIMIZE, ANALYZE, CHECK TABLE', 'text', 15, 4, 0, 10],
      ['Alerting et seuils de monitoring', 'text', 15, 5, 0, 10],
      ['Capacity planning et sizing', 'text', 15, 6, 0, 10],
    ]);
  }


  // ============================================================
  // POSTGRESQL AVANCÉ
  // ============================================================
  if (courseIds['postgresql-avance-administration']) {
    const cid = courseIds['postgresql-avance-administration'];

    const ch1 = await insertChapter(cid, 'Architecture PostgreSQL en Profondeur', 'Processus, mémoire partagée, WAL, MVCC et fichiers système PostgreSQL.', 1, 90);
    await insertLessons(ch1, [
      ['Architecture multi-processus de PostgreSQL', 'text', 20, 1, 1, 15],
      ['Shared Buffers, WAL Buffers et Work Mem', 'text', 25, 2, 1, 20],
      ['Write-Ahead Logging (WAL) en détail', 'text', 25, 3, 0, 20],
      ['MVCC : Multi-Version Concurrency Control', 'text', 20, 4, 0, 15],
      ['Catalogue système : pg_catalog et information_schema', 'text', 15, 5, 0, 10],
      ['Fichiers de configuration : postgresql.conf, pg_hba.conf', 'text', 20, 6, 0, 15],
    ]);

    const ch2 = await insertChapter(cid, 'Administration Avancée', 'Tablespaces, rôles, schemas, extensions et maintenance PostgreSQL.', 2, 80);
    await insertLessons(ch2, [
      ['Rôles, utilisateurs et héritages', 'text', 20, 1, 1, 15],
      ['Schemas et search_path', 'text', 15, 2, 0, 10],
      ['Tablespaces et gestion du stockage', 'text', 15, 3, 0, 10],
      ['Extensions PostgreSQL : PostGIS, pg_stat_statements, etc.', 'text', 25, 4, 0, 20],
      ['VACUUM, ANALYZE et Autovacuum', 'text', 25, 5, 0, 20],
      ['pg_stat_activity et monitoring des connexions', 'text', 15, 6, 0, 10],
      ['Gestion des locks et deadlocks', 'text', 20, 7, 0, 15],
    ]);

    const ch3 = await insertChapter(cid, 'Types Avancés et JSONB', 'Types personnalisés, JSONB, arrays, hstore et full-text search.', 3, 75);
    await insertLessons(ch3, [
      ['JSONB : stockage, requêtes et indexation', 'text', 25, 1, 1, 20],
      ['Arrays et opérateurs de tableau', 'text', 15, 2, 0, 10],
      ['hstore et types composites', 'text', 15, 3, 0, 10],
      ['Full-Text Search avec tsvector et tsquery', 'text', 25, 4, 0, 20],
      ['Types ENUM et domaines', 'text', 15, 5, 0, 10],
      ['Fonctions et opérateurs JSON path', 'text', 20, 6, 0, 15],
    ]);


    const ch4 = await insertChapter(cid, 'Réplication et Haute Disponibilité', 'Streaming replication, logical replication, Patroni et PgBouncer.', 4, 95);
    await insertLessons(ch4, [
      ['Streaming Replication : synchrone et asynchrone', 'text', 25, 1, 0, 20],
      ['Réplication logique et publication/subscription', 'text', 25, 2, 0, 20],
      ['Patroni : HA automatisée pour PostgreSQL', 'text', 25, 3, 0, 20],
      ['PgBouncer : connection pooling', 'text', 20, 4, 0, 15],
      ['Pgpool-II : load balancing et watchdog', 'text', 20, 5, 0, 15],
      ['Failover et switchover avec pg_rewind', 'text', 20, 6, 0, 15],
      ['Citus : PostgreSQL distribué', 'text', 20, 7, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Performance et Optimisation', 'EXPLAIN ANALYZE, index avancés, partitionnement et tuning.', 5, 95);
    await insertLessons(ch5, [
      ['EXPLAIN ANALYZE et lecture des plans d\'exécution', 'text', 25, 1, 1, 20],
      ['Index : B-Tree, GIN, GiST, BRIN, Hash', 'text', 25, 2, 0, 20],
      ['Index partiels et covering indexes (INCLUDE)', 'text', 20, 3, 0, 15],
      ['Partitionnement : range, list, hash', 'text', 25, 4, 0, 20],
      ['Parallel Query et JIT compilation', 'text', 20, 5, 0, 15],
      ['Tuning postgresql.conf pour la performance', 'text', 20, 6, 0, 15],
      ['pg_stat_statements et pgBadger', 'text', 15, 7, 0, 10],
    ]);

    const ch6 = await insertChapter(cid, 'Backup et Point-in-Time Recovery', 'pg_dump, pg_basebackup, WAL archiving, pgBackRest et PITR.', 6, 75);
    await insertLessons(ch6, [
      ['pg_dump et pg_dumpall : backups logiques', 'text', 20, 1, 0, 15],
      ['pg_basebackup : backups physiques', 'text', 20, 2, 0, 15],
      ['WAL archiving et continuous archiving', 'text', 25, 3, 0, 20],
      ['Point-in-Time Recovery (PITR)', 'text', 25, 4, 0, 20],
      ['pgBackRest : solution de backup entreprise', 'text', 25, 5, 0, 20],
      ['Barman comme alternative de backup', 'text', 15, 6, 0, 10],
    ]);

    const ch7 = await insertChapter(cid, 'PostgreSQL en Production', 'Déploiement conteneurisé, monitoring, upgrades et bonnes pratiques.', 7, 80);
    await insertLessons(ch7, [
      ['PostgreSQL sur Docker et Kubernetes', 'text', 25, 1, 0, 20],
      ['Operators Kubernetes : CloudNativePG, Zalando', 'text', 20, 2, 0, 15],
      ['Monitoring avec pg_exporter et Grafana', 'text', 20, 3, 0, 15],
      ['Major version upgrade strategies', 'text', 20, 4, 0, 15],
      ['Connection pooling en production', 'text', 15, 5, 0, 10],
      ['Sécurité : Row-Level Security et pg_hba.conf', 'text', 20, 6, 0, 15],
    ]);
  }


  // ============================================================
  // BASES DE DONNÉES ET SERVEURS APPLICATIFS
  // ============================================================
  if (courseIds['databases-serveurs-applicatifs']) {
    const cid = courseIds['databases-serveurs-applicatifs'];

    const ch1 = await insertChapter(cid, 'Architecture Client-Serveur des Bases de Données', 'Comprenez comment les applications communiquent avec les bases de données.', 1, 80);
    await insertLessons(ch1, [
      ['Modèle client-serveur : protocoles et flux de données', 'text', 20, 1, 1, 15],
      ['Protocoles de communication : TCP/IP, sockets, named pipes', 'text', 20, 2, 1, 15],
      ['Drivers et connecteurs : JDBC, ODBC, ADO.NET, libpq', 'text', 25, 3, 0, 20],
      ['Handshake et authentification : SSL, SCRAM, Kerberos', 'text', 20, 4, 0, 15],
      ['Sérialisation des données : binaire vs texte', 'text', 15, 5, 0, 10],
      ['Latence réseau et impact sur les performances', 'text', 15, 6, 0, 10],
    ]);

    const ch2 = await insertChapter(cid, 'Connection Pooling', 'Maîtrisez le pooling de connexions pour optimiser les performances.', 2, 85);
    await insertLessons(ch2, [
      ['Pourquoi le connection pooling est essentiel', 'text', 15, 1, 1, 10],
      ['Types de pooling : session, transaction, statement', 'text', 20, 2, 0, 15],
      ['PgBouncer : configuration et modes', 'text', 25, 3, 0, 20],
      ['ProxySQL : pooling pour MySQL', 'text', 25, 4, 0, 20],
      ['HikariCP et pools applicatifs (Java, .NET, Node.js)', 'text', 25, 5, 0, 20],
      ['Dimensionner son pool : formule et monitoring', 'text', 20, 6, 0, 15],
      ['Connection pooling dans Kubernetes (sidecar pattern)', 'text', 20, 7, 0, 15],
    ]);

    const ch3 = await insertChapter(cid, 'ORM et Abstraction de Données', 'Utilisez les ORM efficacement sans sacrifier les performances.', 3, 80);
    await insertLessons(ch3, [
      ['ORM : avantages, inconvénients et quand les utiliser', 'text', 20, 1, 1, 15],
      ['Hibernate/JPA (Java) : entities, relations, lazy loading', 'text', 25, 2, 0, 20],
      ['SQLAlchemy (Python) : Core vs ORM', 'text', 20, 3, 0, 15],
      ['Prisma et TypeORM (Node.js/TypeScript)', 'text', 25, 4, 0, 20],
      ['Entity Framework (.NET)', 'text', 20, 5, 0, 15],
      ['Le problème N+1 et comment le résoudre', 'text', 20, 6, 0, 15],
      ['Migrations de schéma : Flyway, Liquibase, Alembic', 'text', 20, 7, 0, 15],
    ]);


    const ch4 = await insertChapter(cid, 'Caching et Performances', 'Implémentez des stratégies de cache entre application et base de données.', 4, 85);
    await insertLessons(ch4, [
      ['Stratégies de caching : Cache-Aside, Read-Through, Write-Behind', 'text', 25, 1, 1, 20],
      ['Redis comme cache : patterns et configuration', 'text', 25, 2, 0, 20],
      ['Memcached vs Redis : quand utiliser quoi', 'text', 15, 3, 0, 10],
      ['Cache invalidation : le problème le plus dur', 'text', 20, 4, 0, 15],
      ['Query caching au niveau applicatif', 'text', 15, 5, 0, 10],
      ['CDN et caching des données API', 'text', 15, 6, 0, 10],
      ['Materialized Views comme cache côté DB', 'text', 20, 7, 0, 15],
    ]);

    const ch5 = await insertChapter(cid, 'Patterns d\'Architecture Data', 'CQRS, Event Sourcing, Saga, données dans les microservices.', 5, 95);
    await insertLessons(ch5, [
      ['Database per Service dans les microservices', 'text', 25, 1, 0, 20],
      ['Shared Database : quand c\'est acceptable', 'text', 15, 2, 0, 10],
      ['CQRS : Command Query Responsibility Segregation', 'text', 25, 3, 0, 20],
      ['Event Sourcing : principes et implémentation', 'text', 25, 4, 0, 20],
      ['Saga Pattern : orchestration vs chorégraphie', 'text', 25, 5, 0, 20],
      ['Outbox Pattern et reliable messaging', 'text', 20, 6, 0, 15],
      ['Change Data Capture (CDC) avec Debezium', 'text', 25, 7, 0, 20],
    ]);

    const ch6 = await insertChapter(cid, 'Transactions Distribuées', 'Gérez la cohérence des données dans les systèmes distribués.', 6, 80);
    await insertLessons(ch6, [
      ['Théorème CAP et ses implications pratiques', 'text', 20, 1, 1, 15],
      ['Niveaux d\'isolation : Read Committed, Serializable, etc.', 'text', 25, 2, 0, 20],
      ['Two-Phase Commit (2PC) et ses limites', 'text', 20, 3, 0, 15],
      ['Eventual Consistency et compensation', 'text', 20, 4, 0, 15],
      ['Distributed locks : Redis, ZooKeeper, etcd', 'text', 25, 5, 0, 20],
      ['Idempotence et exactly-once processing', 'text', 20, 6, 0, 15],
    ]);


    const ch7 = await insertChapter(cid, 'Serveurs Applicatifs et Middleware', 'Configurez les serveurs d\'application et leur connexion aux bases.', 7, 85);
    await insertLessons(ch7, [
      ['Tomcat, WildFly, WebSphere : configuration des datasources', 'text', 25, 1, 0, 20],
      ['Node.js et bases de données : pg, mysql2, mongoose', 'text', 25, 2, 0, 20],
      ['Spring Boot : DataSource, JPA et transactions', 'text', 25, 3, 0, 20],
      ['Django et bases de données : settings et multi-db', 'text', 20, 4, 0, 15],
      ['API Gateway et accès aux données : GraphQL, REST', 'text', 20, 5, 0, 15],
      ['gRPC et Protocol Buffers pour les données', 'text', 20, 6, 0, 15],
    ]);

    const ch8 = await insertChapter(cid, 'Bases de Données en Production DevOps', 'Déployez et gérez les bases de données dans un environnement DevOps/Cloud.', 8, 90);
    await insertLessons(ch8, [
      ['Database as Code : migrations automatisées en CI/CD', 'text', 25, 1, 0, 20],
      ['Blue/Green et Canary deployments pour la DB', 'text', 25, 2, 0, 20],
      ['Bases de données managées : RDS, Cloud SQL, Azure DB', 'text', 20, 3, 0, 15],
      ['Kubernetes StatefulSets et Operators pour les DB', 'text', 25, 4, 0, 20],
      ['Observabilité des bases : métriques, logs, traces', 'text', 20, 5, 0, 15],
      ['Disaster Recovery et RPO/RTO', 'text', 20, 6, 0, 15],
      ['Data Masking et RGPD en production', 'text', 20, 7, 0, 15],
    ]);
  }

  console.log('✅ Chapitres et leçons des cours BDD insérés');
}

module.exports = { seedDatabaseCourses };
