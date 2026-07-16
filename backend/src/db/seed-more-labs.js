/**
 * Seed additional labs for databases and cloud
 */
async function seedMoreLabs(db) {
  console.log('\n🧪 Insertion de labs supplémentaires...');

  const labs = [
    // Database labs
    ['PostgreSQL : Réplication Streaming', 'postgresql-replication-streaming', 'Configurez une réplication streaming PostgreSQL avec un primary et un replica.', 'donnees', 'moyen', 60, 'postgresql', 'Configurez pg_hba.conf, créez un slot de réplication, et vérifiez la synchronisation.', 30],
    ['MySQL : Configuration InnoDB Cluster', 'mysql-innodb-cluster', 'Déployez un cluster MySQL InnoDB avec 3 nœuds et MySQL Router.', 'donnees', 'difficile', 90, 'mysql', 'Installez MySQL Group Replication, configurez MySQL Router pour le failover automatique.', 45],
    ['MongoDB : Replica Set 3 nœuds', 'mongodb-replica-set', 'Créez un Replica Set MongoDB avec failover automatique.', 'donnees', 'moyen', 45, 'mongodb', 'Initialisez le replica set, testez le failover, configurez les read preferences.', 25],
    ['Redis : Cluster et Sentinel', 'redis-cluster-sentinel', 'Configurez Redis Sentinel pour la haute disponibilité et testez le failover.', 'donnees', 'moyen', 50, 'redis', 'Déployez 3 instances Redis avec Sentinel, simulez une panne et vérifiez le failover.', 30],
    ['PostgreSQL : Optimisation avec EXPLAIN ANALYZE', 'postgresql-explain-analyze', 'Analysez et optimisez des requêtes lentes avec les plans d\'exécution.', 'donnees', 'moyen', 40, 'postgresql', 'Créez des index, analysez les plans d\'exécution, et mesurez les améliorations.', 25],
    ['Backup & Restore : pg_dump et PITR', 'postgresql-backup-pitr', 'Mettez en place une stratégie de backup et testez le Point-in-Time Recovery.', 'donnees', 'difficile', 75, 'postgresql', 'Configurez WAL archiving, faites un backup, insérez des données, puis restaurez à un point précis.', 40],
    ['Connection Pooling avec PgBouncer', 'pgbouncer-connection-pooling', 'Déployez PgBouncer devant PostgreSQL pour gérer le pooling de connexions.', 'donnees', 'moyen', 40, 'postgresql', 'Installez PgBouncer, configurez les modes (session/transaction), et mesurez les performances.', 25],
    ['Migration Oracle vers PostgreSQL avec ora2pg', 'migration-oracle-postgresql', 'Migrez un schéma Oracle vers PostgreSQL avec ora2pg.', 'donnees', 'difficile', 90, 'postgresql', 'Installez ora2pg, analysez la compatibilité, migrez le schéma et les données.', 50],
    // Cloud labs
    ['AWS : Déployer une app sur ECS Fargate', 'aws-ecs-fargate', 'Déployez une application conteneurisée sur AWS ECS avec Fargate (serverless).', 'cloud', 'moyen', 60, 'aws', 'Créez un cluster ECS, une task definition, un service avec ALB et auto-scaling.', 35],
    ['Terraform : Infrastructure Multi-Tier AWS', 'terraform-multi-tier-aws', 'Provisionnez un VPC avec subnets publics/privés, ALB, EC2 et RDS.', 'cloud', 'difficile', 90, 'terraform', 'Écrivez des modules Terraform pour VPC, ALB, ASG et RDS avec outputs.', 50],
    ['AWS : Lambda + API Gateway + DynamoDB', 'aws-lambda-api-dynamodb', 'Créez une API serverless complète avec Lambda, API Gateway et DynamoDB.', 'cloud', 'moyen', 60, 'aws', 'Écrivez une Lambda en Python, configurez API Gateway et les permissions IAM.', 30],
    ['GKE : Déployer sur Google Kubernetes Engine', 'gke-deploy-application', 'Déployez une application sur GKE avec Ingress, HPA et Cloud SQL.', 'cloud', 'moyen', 75, 'kubernetes', 'Créez un cluster GKE, déployez avec Helm, configurez l\'Ingress et le HPA.', 40],
    ['Azure : Déploiement AKS avec Terraform', 'azure-aks-terraform', 'Provisionnez un cluster AKS avec Terraform et déployez une application.', 'cloud', 'difficile', 90, 'terraform', 'Écrivez du Terraform pour AKS, configurez kubectl, et déployez avec Helm.', 45],
    // Monitoring labs
    ['Prometheus + Grafana : Stack Complète', 'prometheus-grafana-stack', 'Déployez une stack de monitoring complète avec alerting.', 'monitoring', 'moyen', 60, 'monitoring', 'Configurez Prometheus, créez des dashboards Grafana et des alertes.', 35],
    ['ELK Stack : Logging Centralisé', 'elk-logging-centralise', 'Mettez en place Elasticsearch + Logstash + Kibana pour centraliser les logs.', 'monitoring', 'difficile', 90, 'monitoring', 'Déployez la stack ELK, configurez les pipelines Logstash et les visualisations Kibana.', 45],
    ['OpenTelemetry : Traces Distribuées', 'opentelemetry-traces', 'Instrumentez une application microservices avec OpenTelemetry et Jaeger.', 'monitoring', 'difficile', 75, 'monitoring', 'Ajoutez le SDK OTel, configurez le Collector, et visualisez les traces dans Jaeger.', 40],
    // Security labs
    ['Vault : Gestion des Secrets Dynamiques', 'vault-secrets-dynamiques', 'Configurez HashiCorp Vault pour générer des credentials de base de données dynamiques.', 'securite', 'difficile', 75, 'vault', 'Activez le database secrets engine, configurez les rôles et testez la rotation.', 40],
    ['Trivy : Scanner les Vulnérabilités Docker', 'trivy-scan-vulnerabilites', 'Intégrez Trivy dans votre pipeline CI/CD pour scanner les images.', 'securite', 'facile', 30, 'docker', 'Installez Trivy, scannez des images, interprétez les résultats et fixez les CVE.', 20],
    ['OPA/Gatekeeper : Policies Kubernetes', 'opa-gatekeeper-policies', 'Implémentez des policies de sécurité Kubernetes avec OPA Gatekeeper.', 'securite', 'difficile', 60, 'kubernetes', 'Installez Gatekeeper, écrivez des ConstraintTemplates et testez le rejet de Pods.', 35],
    // IaC labs
    ['Ansible : Configuration de 5 Serveurs', 'ansible-multi-serveurs', 'Automatisez la configuration de 5 serveurs web avec Ansible.', 'iac', 'moyen', 50, 'ansible', 'Écrivez un playbook pour installer Nginx, configurer les vhosts et déployer l\'app.', 30],
    ['Pulumi : Infrastructure en Python', 'pulumi-python-aws', 'Provisionnez une infrastructure AWS avec Pulumi et Python.', 'iac', 'moyen', 60, 'pulumi', 'Créez un projet Pulumi, provisionnez un VPC, des instances EC2 et un bucket S3.', 30],
  ];

  for (const lab of labs) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO labs (title, slug, description, category, difficulty, duration_minutes, environment_type, instructions, xp_reward) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: lab
    });
  }
  console.log(`✅ ${labs.length} labs supplémentaires insérés`);
}

module.exports = { seedMoreLabs };
