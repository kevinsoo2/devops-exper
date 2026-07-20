/**
 * Seed additional cheatsheets
 */
async function seedMoreCheatsheets(db) {
  console.log('\n📋 Insertion de fiches récap supplémentaires...');

  const sheets = [

    // Docker Compose
    ['Docker Compose - Référence Complète', 'docker-compose-reference', 'Toutes les directives docker-compose.yml : services, networks, volumes, healthchecks, deploy et exemples.', 'conteneurisation', `# Docker Compose - Référence Complète

## Structure de base

\`\`\`yaml
version: "3.9"
services:
  app:
    image: node:18-alpine
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
    env_file:
      - .env
    volumes:
      - ./app:/app
      - node_modules:/app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - backend

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    networks:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - app
    networks:
      - frontend
      - backend

volumes:
  pgdata:
  node_modules:

networks:
  frontend:
  backend:
\`\`\`

## Commandes Docker Compose

\`\`\`bash
docker compose up -d              # Démarrer en arrière-plan
docker compose up -d --build      # Rebuild + démarrer
docker compose down               # Arrêter et supprimer
docker compose down -v            # + supprimer les volumes
docker compose logs -f app        # Logs en temps réel
docker compose ps                 # État des services
docker compose exec app sh        # Shell dans un service
docker compose pull               # Mettre à jour les images
docker compose restart app        # Redémarrer un service
docker compose scale app=3        # Scaler un service
\`\`\`

## Healthchecks

\`\`\`yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
\`\`\`

## Deploy (Swarm mode)

\`\`\`yaml
deploy:
  replicas: 3
  update_config:
    parallelism: 1
    delay: 10s
  restart_policy:
    condition: on-failure
  resources:
    limits:
      cpus: "0.5"
      memory: 512M
\`\`\``, '🐳', 'intermediaire', 'docker,compose,yaml,services,volumes,networks'],


    // PostgreSQL
    ['PostgreSQL - Commandes Essentielles', 'postgresql-commandes-essentielles', 'Administration PostgreSQL : connexion, requêtes, backup, réplication, performance et maintenance.', 'donnees', `# PostgreSQL - Commandes Essentielles

## Connexion et Navigation

\`\`\`bash
psql -U postgres -h localhost -d mydb    # Connexion
psql -U user -d db -c "SELECT 1"         # Exécuter une requête
\\l                                       # Lister les bases
\\c mydb                                  # Changer de base
\\dt                                      # Lister les tables
\\d+ table_name                           # Décrire une table
\\du                                      # Lister les rôles
\\q                                       # Quitter
\`\`\`

## Administration

\`\`\`sql
-- Créer une base et un utilisateur
CREATE DATABASE myapp;
CREATE USER appuser WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE myapp TO appuser;
ALTER USER appuser CREATEDB;

-- Voir les connexions actives
SELECT pid, usename, datname, state, query
FROM pg_stat_activity WHERE state = 'active';

-- Tuer une requête
SELECT pg_cancel_backend(pid);    -- Annuler
SELECT pg_terminate_backend(pid); -- Forcer
\`\`\`

## Performance

\`\`\`sql
-- Requêtes les plus lentes
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;

-- Plan d'exécution
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) SELECT ...;

-- Taille des tables
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC;

-- Index non utilisés
SELECT indexrelname, idx_scan FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexrelname NOT LIKE '%_pkey';
\`\`\`

## Backup & Restore

\`\`\`bash
# Backup
pg_dump -U postgres mydb > backup.sql
pg_dump -Fc -U postgres mydb > backup.dump     # Format custom
pg_dumpall -U postgres > all_databases.sql      # Toutes les bases

# Restore
psql -U postgres mydb < backup.sql
pg_restore -U postgres -d mydb backup.dump

# Backup avec compression
pg_dump -Fc -Z9 -U postgres mydb > backup.dump.gz
\`\`\`

## Réplication

\`\`\`bash
# Vérifier le statut de réplication
SELECT * FROM pg_stat_replication;
SELECT * FROM pg_stat_wal_receiver;  -- Sur le replica

# Lag de réplication
SELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;
\`\`\`

## Maintenance

\`\`\`sql
VACUUM ANALYZE table_name;        -- Nettoyer + stats
VACUUM FULL table_name;           -- Réclamer l'espace (lock!)
REINDEX INDEX index_name;         -- Reconstruire un index
ANALYZE table_name;               -- Mettre à jour les stats
\`\`\``, '🐘', 'intermediaire', 'postgresql,postgres,sql,backup,performance,replication'],


    // Kubernetes Troubleshooting
    ['Kubernetes - Troubleshooting Guide', 'kubernetes-troubleshooting', 'Diagnostiquer et résoudre les problèmes Kubernetes : Pods en erreur, CrashLoopBackOff, OOM, networking et storage.', 'orchestration', `# Kubernetes - Troubleshooting Guide

## Pod ne démarre pas

\`\`\`bash
kubectl describe pod <name>           # Voir les events
kubectl logs <pod> --previous         # Logs du crash précédent
kubectl get events --sort-by='.lastTimestamp'
\`\`\`

### CrashLoopBackOff
- Vérifier les logs : \`kubectl logs <pod>\`
- Vérifier la commande/entrypoint
- Vérifier les variables d'environnement
- Vérifier les liveness probes (trop agressives ?)

### ImagePullBackOff
- Image existe ? Tag correct ?
- Registry accessible ? Credentials (imagePullSecrets) ?
- \`kubectl describe pod\` → section Events

### Pending
- Resources suffisantes ? \`kubectl describe node\`
- Taints/tolerations ? NodeSelector ?
- PVC pending ? StorageClass existe ?

## Debugging réseau

\`\`\`bash
# Tester la connectivité depuis un Pod
kubectl exec -it <pod> -- curl http://service:port
kubectl exec -it <pod> -- nslookup service.namespace.svc.cluster.local
kubectl exec -it <pod> -- wget -qO- http://service:port

# Pod de debug réseau
kubectl run debug --image=nicolaka/netshoot -it --rm -- bash

# Vérifier les endpoints
kubectl get endpoints <service>
kubectl describe svc <service>
\`\`\`

## Out of Memory (OOMKilled)

\`\`\`bash
# Vérifier la consommation
kubectl top pods
kubectl describe pod <name> | grep -A5 "Last State"

# Solution : augmenter les limits
resources:
  requests:
    memory: "256Mi"
  limits:
    memory: "512Mi"
\`\`\`

## Commandes de diagnostic rapide

\`\`\`bash
# Vue d'ensemble
kubectl get pods -A | grep -v Running
kubectl get nodes -o wide
kubectl top nodes

# Logs agrégés
kubectl logs -l app=myapp --all-containers
kubectl logs <pod> -c <container>     # Multi-container

# Events récents
kubectl get events -A --sort-by='.lastTimestamp' | tail -20

# Ressources du cluster
kubectl describe nodes | grep -A5 "Allocated resources"
\`\`\`

## Storage

\`\`\`bash
kubectl get pv,pvc -A
kubectl describe pvc <name>
# PVC Pending → vérifier StorageClass et provisioner
\`\`\``, '☸️', 'avance', 'kubernetes,troubleshooting,debug,crashloop,oom,network'],


    // MySQL
    ['MySQL - Administration et Performance', 'mysql-administration-performance', 'Commandes MySQL essentielles : administration, utilisateurs, backup, réplication, performance tuning et monitoring.', 'donnees', `# MySQL - Administration et Performance

## Connexion et Infos

\`\`\`bash
mysql -u root -p                       # Connexion
mysql -u user -p -h host -P 3306 db   # Connexion distante
\`\`\`

\`\`\`sql
SHOW DATABASES;
USE mydb;
SHOW TABLES;
DESCRIBE table_name;
SHOW PROCESSLIST;                      -- Requêtes en cours
SHOW GLOBAL STATUS;
SHOW VARIABLES LIKE '%buffer%';
\`\`\`

## Utilisateurs et Privilèges

\`\`\`sql
CREATE USER 'appuser'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mydb.* TO 'appuser'@'%';
GRANT SELECT, INSERT ON mydb.* TO 'readonly'@'192.168.%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'appuser'@'%';
DROP USER 'olduser'@'%';
\`\`\`

## Performance

\`\`\`sql
-- Plan d'exécution
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';
EXPLAIN ANALYZE SELECT ...;  -- MySQL 8.0+

-- Requêtes lentes
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Index
SHOW INDEX FROM table_name;
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_composite ON orders(user_id, created_at);

-- Status InnoDB
SHOW ENGINE INNODB STATUS\\G
\`\`\`

## Backup et Restore

\`\`\`bash
# mysqldump
mysqldump -u root -p mydb > backup.sql
mysqldump -u root -p --all-databases > full_backup.sql
mysqldump -u root -p --single-transaction mydb > backup.sql

# Restore
mysql -u root -p mydb < backup.sql

# XtraBackup (backup physique)
xtrabackup --backup --target-dir=/backup/
xtrabackup --prepare --target-dir=/backup/
xtrabackup --copy-back --target-dir=/backup/
\`\`\`

## Réplication

\`\`\`sql
-- Sur le Primary
SHOW MASTER STATUS;
SHOW BINARY LOGS;

-- Sur le Replica  
SHOW SLAVE STATUS\\G
START SLAVE;
STOP SLAVE;

-- GTID
SHOW GLOBAL VARIABLES LIKE 'gtid_executed';
\`\`\`

## Tuning InnoDB

\`\`\`ini
# my.cnf
innodb_buffer_pool_size = 4G     # 70-80% de la RAM
innodb_log_file_size = 1G
innodb_flush_log_at_trx_commit = 2
innodb_io_capacity = 2000
max_connections = 500
\`\`\``, '🐬', 'intermediaire', 'mysql,mariadb,sql,backup,replication,innodb,performance'],


    // Terraform
    ['Terraform - Commandes et Patterns', 'terraform-commandes-patterns', 'Référence Terraform complète : commandes CLI, blocs HCL, fonctions, state management et patterns courants.', 'iac', `# Terraform - Commandes et Patterns

## Workflow de base

\`\`\`bash
terraform init              # Initialiser (télécharger providers)
terraform plan              # Prévisualiser les changements
terraform apply             # Appliquer
terraform destroy           # Détruire toute l'infra
terraform validate          # Valider la syntaxe
terraform fmt               # Formater le code
terraform output            # Voir les outputs
\`\`\`

## State Management

\`\`\`bash
terraform state list                    # Lister les ressources
terraform state show aws_instance.web   # Détails d'une ressource
terraform state mv old_name new_name    # Renommer
terraform state rm aws_instance.web     # Retirer du state
terraform import aws_instance.web i-123 # Importer une ressource existante
terraform refresh                       # Synchroniser avec le réel
\`\`\`

## Backend S3

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
\`\`\`

## Variables et Outputs

\`\`\`hcl
variable "instance_type" {
  type        = string
  default     = "t3.micro"
  description = "Type d'instance EC2"
  validation {
    condition     = contains(["t3.micro", "t3.small"], var.instance_type)
    error_message = "Type non autorisé."
  }
}

output "public_ip" {
  value       = aws_instance.web.public_ip
  description = "IP publique du serveur"
}

locals {
  common_tags = {
    Environment = var.env
    ManagedBy   = "terraform"
  }
}
\`\`\`

## Fonctions utiles

\`\`\`hcl
# Strings
format("Hello, %s!", var.name)
join(", ", var.list)
split(",", var.string)
replace(var.text, "old", "new")

# Collections  
length(var.list)
lookup(var.map, "key", "default")
merge(var.map1, var.map2)
concat(var.list1, var.list2)
flatten([var.list1, var.list2])

# Conditions
var.env == "prod" ? 3 : 1
coalesce(var.custom_name, "default")

# Fichiers
file("PATH_MODULE/script.sh")
templatefile("PATH_MODULE/init.tpl", { port = 8080 })
\`\`\`

## Patterns courants

\`\`\`hcl
# for_each avec map
resource "aws_instance" "servers" {
  for_each      = var.servers
  instance_type = each.value.type
  tags          = { Name = each.key }
}

# count conditionnel
resource "aws_instance" "bastion" {
  count         = var.env == "prod" ? 1 : 0
  instance_type = "t3.micro"
}

# Dynamic blocks
dynamic "ingress" {
  for_each = var.ports
  content {
    from_port = ingress.value
    to_port   = ingress.value
    protocol  = "tcp"
  }
}
\`\`\``, '🏗️', 'intermediaire', 'terraform,hcl,iac,state,modules,aws,patterns'],

  ];

  for (const s of sheets) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO cheatsheets (title, slug, description, category, content, icon, difficulty, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: s
    });
  }
  console.log('✅ ' + sheets.length + ' fiches récap ajoutées');
}

module.exports = { seedMoreCheatsheets };
