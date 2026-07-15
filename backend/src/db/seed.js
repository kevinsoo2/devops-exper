const { getDb } = require('./connection');
const bcrypt = require('bcryptjs');
const { seedCoursesContent } = require('./seed-courses-content');
const { seedLessonContent } = require('./seed-lesson-content');
const { seedExtraCourses } = require('./seed-extra-courses');
const { seedCitrixCourse } = require('./seed-citrix');
const { seedRedHatCourse } = require('./seed-redhat');
const { seedMoreCourses } = require('./seed-more-courses');
const { seedBatch2Courses } = require('./seed-batch2-courses');
const { seedDatabaseCourses } = require('./seed-database-courses');
require('dotenv').config();

async function seed() {
  const db = getDb();
  console.log('🌱 Démarrage du seeding...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Users
  await db.execute({
    sql: `INSERT OR IGNORE INTO users (email, password, username, full_name, role, bio, xp_points, level, streak_days, github_url, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['admin@devops-expert.fr', hashedPassword, 'admin_devops', 'Pierre Martin', 'admin', 'Administrateur de la plateforme DevOps Expert Academy', 5000, 10, 45, 'https://github.com/pierremartin', 'https://linkedin.com/in/pierremartin']
  });


  await db.execute({
    sql: `INSERT OR IGNORE INTO users (email, password, username, full_name, role, bio, xp_points, level, streak_days, github_url, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['marie@devops-expert.fr', hashedPassword, 'marie_kube', 'Marie Dupont', 'mentor', 'Experte Kubernetes et architecte cloud certifiée', 3500, 8, 30, 'https://github.com/mariedupont', 'https://linkedin.com/in/mariedupont']
  });

  await db.execute({
    sql: `INSERT OR IGNORE INTO users (email, password, username, full_name, role, bio, xp_points, level, streak_days, github_url, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['lucas@devops-expert.fr', hashedPassword, 'lucas_terraform', 'Lucas Bernard', 'mentor', 'Spécialiste Infrastructure as Code et DevSecOps', 4200, 9, 60, 'https://github.com/lucasbernard', 'https://linkedin.com/in/lucasbernard']
  });

  console.log('✅ Utilisateurs créés');


  // Courses
  const courses = [
    ['Maîtriser Docker de A à Z', 'maitriser-docker', 'Formation complète sur Docker : conteneurs, images, Docker Compose, réseaux et orchestration.', 'conteneurisation', 'debutant', 20, 'Pierre Martin', 'Aucun', '["Créer des images Docker optimisées","Gérer des conteneurs en production","Utiliser Docker Compose","Comprendre les réseaux Docker"]', 1],
    ['Kubernetes en Production', 'kubernetes-production', 'Déployez et gérez des applications à grande échelle avec Kubernetes.', 'orchestration', 'intermediaire', 35, 'Marie Dupont', 'Docker basics', '["Déployer des applications sur K8s","Gérer le scaling automatique","Configurer Ingress et Services","Monitorer un cluster"]', 1],
    ['Terraform Infrastructure as Code', 'terraform-iac', 'Automatisez votre infrastructure avec Terraform et les bonnes pratiques IaC.', 'iac', 'intermediaire', 28, 'Lucas Bernard', 'Cloud basics', '["Écrire des modules Terraform","Gérer le state","Multi-cloud deployment","Terraform Cloud et workflows"]', 1],
    ['CI/CD avec GitHub Actions', 'cicd-github-actions', 'Construisez des pipelines CI/CD robustes avec GitHub Actions.', 'cicd', 'debutant', 15, 'Pierre Martin', 'Git basics', '["Créer des workflows CI/CD","Tests automatisés","Déploiement continu","Secrets et sécurité"]', 1],
    ['Monitoring avec Prometheus & Grafana', 'monitoring-prometheus-grafana', 'Mettez en place une stack de monitoring complète pour vos applications.', 'monitoring', 'intermediaire', 22, 'Marie Dupont', 'Linux basics', '["Configurer Prometheus","Créer des dashboards Grafana","Alerting","Monitoring Kubernetes"]', 0],
    ['DevSecOps - Sécurité Continue', 'devsecops-securite', 'Intégrez la sécurité dans votre pipeline DevOps dès le début.', 'securite', 'avance', 30, 'Lucas Bernard', 'CI/CD basics', '["Scan de vulnérabilités","SAST et DAST","Container security","Compliance as Code"]', 0],
    ['GitOps avec ArgoCD', 'gitops-argocd', 'Implémentez le GitOps avec ArgoCD pour des déploiements déclaratifs.', 'gitops', 'avance', 18, 'Marie Dupont', 'Kubernetes, Git', '["Principes GitOps","ArgoCD configuration","App of Apps pattern","Rollbacks automatiques"]', 0],
    ['Cloud AWS pour DevOps', 'cloud-aws-devops', 'Maîtrisez les services AWS essentiels pour le DevOps.', 'cloud', 'intermediaire', 40, 'Pierre Martin', 'Linux basics', '["EC2, ECS, EKS","AWS CDK","CodePipeline","CloudFormation"]', 1],
    ['Sécurité Réseau et Firewalling', 'securite-reseau-firewalling', 'Maîtrisez la sécurité réseau : firewalls, IDS/IPS, segmentation, VPN et bonnes pratiques de hardening.', 'network', 'intermediaire', 25, 'Marie Dupont', 'Réseaux fondamentaux', '["Configurer des firewalls","Déployer IDS/IPS","Mettre en place des VPN","Sécuriser les services DNS","Auditer la sécurité réseau"]', 0],
    ['Protocoles et Services Réseau Avancés', 'protocoles-services-reseau-avances', 'Approfondissez BGP, OSPF, MPLS, QoS, SDN et les architectures réseau modernes pour le cloud.', 'network', 'avance', 28, 'Lucas Bernard', 'Réseaux intermédiaire', '["Configurer OSPF et BGP","Comprendre MPLS et SD-WAN","Implémenter QoS","Déployer un service mesh","Architecturer des réseaux cloud"]', 0],
    ['Troubleshooting Réseau pour DevOps', 'troubleshooting-reseau-devops', 'Diagnostiquez et résolvez les problèmes réseau en production : outils, méthodologie et cas pratiques.', 'network', 'intermediaire', 20, 'Pierre Martin', 'Réseaux fondamentaux', '["Diagnostiquer couche par couche","Utiliser Wireshark et tcpdump","Résoudre les problèmes DNS","Troubleshooter Kubernetes réseau","Optimiser les performances réseau"]', 0],
    ['Scripting Bash et Automatisation', 'scripting-bash-automatisation', 'Automatisez toutes vos tâches d\'administration système avec le scripting Bash avancé et les outils CLI.', 'systeme', 'debutant', 22, 'Pierre Martin', 'Aucun', '["Écrire des scripts Bash professionnels","Manipuler du texte avec grep/sed/awk","Automatiser l\'administration système","Créer des outils de monitoring","Respecter les bonnes pratiques shell"]', 0],
    ['Sécurité et Hardening Linux', 'securite-hardening-linux', 'Durcissez vos serveurs Linux : CIS Benchmarks, SELinux, audit, chiffrement et conformité.', 'systeme', 'avance', 30, 'Lucas Bernard', 'Administration Linux', '["Appliquer les CIS Benchmarks","Configurer SELinux et AppArmor","Mettre en place l\'audit système","Chiffrer disques et communications","Automatiser le hardening"]', 0],
    ['Performance et Optimisation Système', 'performance-optimisation-systeme', 'Analysez et optimisez les performances de vos serveurs : CPU, mémoire, I/O, réseau et tuning kernel.', 'systeme', 'avance', 26, 'Marie Dupont', 'Administration Linux', '["Utiliser la méthode USE","Analyser CPU et processus","Diagnostiquer les problèmes mémoire","Optimiser le stockage et I/O","Tuner le kernel Linux"]', 0],
    ['Citrix Virtual Apps and Desktops - Administration Complète', 'citrix-virtual-apps-desktops', 'Formation complète sur Citrix : architecture, déploiement, gestion des applications et bureaux virtuels, NetScaler, StoreFront, policies et troubleshooting.', 'virtualisation', 'intermediaire', 45, 'Lucas Bernard', 'Windows Server, Réseaux', '["Déployer Citrix Virtual Apps and Desktops","Configurer NetScaler/ADC","Administrer StoreFront et Workspace","Gérer les policies et profils","Optimiser les performances","Troubleshooter les connexions","Sécuriser l environnement Citrix","Planifier la haute disponibilité"]', 1],
    ['Windows Server Administration', 'windows-server-administration', 'Administration complète de Windows Server : Active Directory, DNS, DHCP, GPO, Hyper-V et PowerShell.', 'systeme', 'intermediaire', 35, 'Lucas Bernard', 'Bases informatique', '["Déployer Active Directory","Configurer DNS et DHCP","Créer des GPO","Gérer Hyper-V","Automatiser avec PowerShell"]', 0],
    ['Python pour le DevOps', 'python-devops', 'Apprenez Python pour automatiser vos tâches DevOps : scripts, API, SDK cloud, parsing et testing.', 'automatisation', 'debutant', 28, 'Pierre Martin', 'Aucun', '["Écrire des scripts Python professionnels","Interagir avec les API REST","Utiliser les SDK cloud (boto3, azure-sdk)","Parser JSON/YAML/CSV","Tester et packager vos outils"]', 0],
    ['VMware vSphere Administration', 'vmware-vsphere-administration', 'Maîtrisez VMware vSphere : ESXi, vCenter, vMotion, HA, DRS, stockage et réseau virtuel.', 'virtualisation', 'intermediaire', 38, 'Marie Dupont', 'Réseaux, Stockage', '["Installer et configurer ESXi","Administrer vCenter Server","Configurer vMotion et Storage vMotion","Implémenter HA et DRS","Gérer le réseau distribué","Monitorer avec vROps"]', 0],
    ['Base de Données pour DevOps', 'bases-donnees-devops', 'Gérez les bases de données en production : PostgreSQL, MySQL, MongoDB, migrations, backup et performance.', 'donnees', 'intermediaire', 30, 'Lucas Bernard', 'Linux basics, SQL', '["Administrer PostgreSQL et MySQL","Gérer MongoDB et Redis","Automatiser les migrations","Mettre en place les backups","Optimiser les performances","Configurer la réplication"]', 0],
    ['Git Avancé et Workflows', 'git-avance-workflows', 'Maîtrisez Git au-delà des bases : rebase, cherry-pick, hooks, submodules, workflows et monorepos.', 'cicd', 'intermediaire', 18, 'Pierre Martin', 'Git basics', '["Maîtriser rebase et cherry-pick","Configurer les hooks Git","Gérer submodules et monorepos","Implémenter GitFlow et Trunk-based","Résoudre les conflits complexes"]', 0],
    ['Nginx et Reverse Proxy', 'nginx-reverse-proxy', 'Configuration complète de Nginx : reverse proxy, load balancing, SSL/TLS, caching, rate limiting et sécurité.', 'network', 'intermediaire', 22, 'Marie Dupont', 'Linux, HTTP', '["Configurer Nginx comme reverse proxy","Implémenter le load balancing","Gérer les certificats TLS","Configurer le caching","Mettre en place le rate limiting","Sécuriser avec ModSecurity"]', 0],
    ['Azure DevOps et Cloud', 'azure-devops-cloud', 'Maîtrisez Azure pour le DevOps : Azure DevOps, AKS, Azure Functions, ARM/Bicep et monitoring.', 'cloud', 'intermediaire', 35, 'Lucas Bernard', 'Cloud basics', '["Utiliser Azure DevOps (Repos, Pipelines, Boards)","Déployer sur AKS","Créer des Azure Functions","Écrire des templates ARM/Bicep","Monitorer avec Azure Monitor"]', 0],
    ['Chaos Engineering et Résilience', 'chaos-engineering-resilience', 'Testez la résilience de vos systèmes : Chaos Monkey, Litmus, Gremlin, game days et pratiques SRE.', 'sre', 'avance', 20, 'Pierre Martin', 'Kubernetes, Monitoring', '["Comprendre les principes du Chaos Engineering","Utiliser Litmus Chaos sur Kubernetes","Planifier des Game Days","Mesurer la résilience avec des SLOs","Automatiser les tests de chaos"]', 0],
    ['Red Hat System Administration - RHCSA & RHCE', 'redhat-rhcsa-rhce', 'Formation complète Red Hat : administration système RHEL, préparation RHCSA (EX200) et RHCE (EX294) avec Ansible.', 'systeme', 'intermediaire', 60, 'Lucas Bernard', 'Bases Linux', '["Administrer Red Hat Enterprise Linux","Gérer le stockage et LVM","Configurer le réseau et firewalld","Gérer les utilisateurs et SELinux","Automatiser avec Ansible","Préparer l examen RHCSA EX200","Préparer l examen RHCE EX294","Maîtriser systemd et les services"]', 1],
    ['Google Cloud Platform pour DevOps', 'gcp-devops', 'Maîtrisez GCP pour le DevOps : GKE, Cloud Run, Cloud Build, Terraform sur GCP et monitoring.', 'cloud', 'intermediaire', 32, 'Marie Dupont', 'Cloud basics', '["Déployer sur GKE","Utiliser Cloud Run et Cloud Functions","Configurer Cloud Build CI/CD","Gérer l infrastructure avec Terraform","Monitorer avec Cloud Operations"]', 0],
    ['ElasticSearch et ELK Stack', 'elasticsearch-elk-stack', 'Maîtrisez la stack ELK : Elasticsearch, Logstash, Kibana pour le logging centralisé et l analyse.', 'monitoring', 'intermediaire', 25, 'Lucas Bernard', 'Linux basics', '["Déployer un cluster Elasticsearch","Configurer Logstash pipelines","Créer des dashboards Kibana","Gérer les index et ILM","Sécuriser la stack ELK"]', 0],
    ['Jenkins Pipeline et Administration', 'jenkins-pipeline-administration', 'Administration complète de Jenkins : pipelines déclaratifs, shared libraries, agents et sécurité.', 'cicd', 'intermediaire', 24, 'Pierre Martin', 'CI/CD basics', '["Écrire des Jenkinsfiles déclaratifs","Créer des shared libraries","Gérer les agents et executors","Sécuriser Jenkins","Intégrer avec Docker et K8s"]', 0],
    ['Kafka et Event Streaming', 'kafka-event-streaming', 'Apprenez Apache Kafka : messaging distribué, streams processing, Connect et administration.', 'donnees', 'avance', 28, 'Lucas Bernard', 'Java/Linux basics', '["Déployer un cluster Kafka","Produire et consommer des messages","Kafka Streams et ksqlDB","Kafka Connect et intégrations","Monitorer et optimiser Kafka"]', 0],
    ['Pulumi Infrastructure as Code', 'pulumi-iac', 'Infrastructure as Code avec des vrais langages : Python, TypeScript, Go pour provisionner le cloud.', 'iac', 'intermediaire', 20, 'Marie Dupont', 'Un langage de programmation', '["Écrire de l IaC en Python/TypeScript","Gérer le state Pulumi","Créer des composants réutilisables","Intégrer avec CI/CD","Comparer avec Terraform"]', 0],
    ['Podman et Containers sans Docker', 'podman-containers', 'Maîtrisez Podman, Buildah et Skopeo : conteneurisation sans daemon, rootless et compatible OCI.', 'conteneurisation', 'intermediaire', 18, 'Pierre Martin', 'Docker basics', '["Utiliser Podman sans daemon","Créer des images avec Buildah","Gérer les registries avec Skopeo","Conteneurs rootless","Pods Podman et systemd"]', 0],
    ['Service Mesh avec Istio', 'service-mesh-istio', 'Implémentez un service mesh complet avec Istio : traffic management, security, observability.', 'orchestration', 'avance', 30, 'Marie Dupont', 'Kubernetes avancé', '["Installer et configurer Istio","Gérer le trafic (routing, canary, fault injection)","Implémenter mTLS automatique","Configurer l observabilité (Kiali, Jaeger)","Politiques d autorisation"]', 0],
    ['Hashicorp Stack Complète', 'hashicorp-stack', 'Maîtrisez l écosystème HashiCorp : Vault, Consul, Nomad et Packer en complément de Terraform.', 'iac', 'avance', 35, 'Lucas Bernard', 'Terraform basics', '["Gérer les secrets avec Vault","Service discovery avec Consul","Orchestration avec Nomad","Créer des images avec Packer","Intégrer la stack complète"]', 0],
    ['Kubernetes Operators et CRDs', 'kubernetes-operators-crds', 'Développez des Operators Kubernetes avec le SDK et créez des Custom Resource Definitions.', 'orchestration', 'avance', 22, 'Pierre Martin', 'Kubernetes avancé, Go/Python', '["Comprendre le pattern Operator","Créer des CRDs","Utiliser Operator SDK (Go/Ansible/Helm)","Implémenter la réconciliation","Publier sur OperatorHub"]', 0],
    ['FinOps et Optimisation Cloud', 'finops-optimisation-cloud', 'Optimisez vos coûts cloud : tagging, right-sizing, reserved instances, spot et gouvernance.', 'cloud', 'intermediaire', 20, 'Marie Dupont', 'Cloud basics', '["Comprendre le modèle de coûts cloud","Implémenter le tagging et la gouvernance","Right-sizing des ressources","Utiliser Spot/Preemptible instances","Créer des dashboards FinOps"]', 0],
    ['Observabilité avec OpenTelemetry', 'observabilite-opentelemetry', 'Implémentez l observabilité unifiée avec OpenTelemetry : traces, métriques et logs correlés.', 'monitoring', 'avance', 24, 'Lucas Bernard', 'Monitoring basics', '["Comprendre les signaux d observabilité","Instrumenter avec OpenTelemetry SDK","Collecter avec le Collector OTel","Exporter vers Jaeger, Prometheus, Loki","Corréler traces, métriques et logs"]', 0],
    ['GitLab CI/CD et DevOps', 'gitlab-cicd-devops', 'Maîtrisez GitLab CI/CD : pipelines, runners, registries, environments et Auto DevOps.', 'cicd', 'intermediaire', 22, 'Pierre Martin', 'Git basics', '["Écrire des .gitlab-ci.yml avancés","Gérer les runners et executors","Utiliser le Container Registry GitLab","Configurer les environments et review apps","Implémenter Auto DevOps"]', 0]
  ];

  for (const c of courses) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: c
    });
  }
  console.log('✅ Cours créés');


  // Labs
  const labs = [
    // Docker
    ['Créer votre premier conteneur Docker', 'premier-conteneur-docker', 'Apprenez à créer, exécuter et gérer des conteneurs Docker.', 'conteneurisation', 'facile', 30, 'docker', 'Créez une image, lancez un conteneur, exposez un port et consultez les logs.', 15],
    ['Docker Compose : App multi-services', 'docker-compose-multi-services', 'Déployez une application complète avec frontend, backend, base de données et Redis.', 'conteneurisation', 'moyen', 45, 'docker', 'Écrivez un docker-compose.yml complet avec health checks et volumes.', 25],
    ['Optimiser une image Docker', 'optimiser-image-docker', 'Réduisez la taille d\'une image de 1.2GB à moins de 50MB avec les multi-stage builds.', 'conteneurisation', 'moyen', 35, 'docker', 'Utilisez multi-stage, .dockerignore et alpine pour optimiser.', 20],
    ['Docker Registry privé avec Harbor', 'docker-registry-harbor', 'Déployez et configurez un registry Docker privé avec Harbor.', 'conteneurisation', 'difficile', 60, 'docker', 'Installez Harbor, configurez le scanning et poussez des images.', 35],
    // Kubernetes
    ['Déployer une app sur Kubernetes', 'deployer-app-kubernetes', 'Déployez une application multi-conteneur sur un cluster K8s.', 'orchestration', 'moyen', 60, 'kubernetes', 'Créez des Deployments, Services et Ingress.', 30],
    ['Kubernetes : Scaling et HPA', 'kubernetes-scaling-hpa', 'Configurez l\'autoscaling horizontal et testez la montée en charge.', 'orchestration', 'moyen', 45, 'kubernetes', 'Déployez metrics-server, créez un HPA et générez de la charge.', 25],
    ['Helm : Packager une application', 'helm-packager-app', 'Créez un Helm chart complet pour déployer votre application.', 'orchestration', 'moyen', 50, 'kubernetes', 'Créez un chart avec templates, values et helpers.', 30],
    ['Kubernetes : Network Policies', 'kubernetes-network-policies', 'Isolez vos pods avec des Network Policies et testez la connectivité.', 'orchestration', 'difficile', 45, 'kubernetes', 'Créez des policies deny-all puis autorisez sélectivement.', 30],
    ['Kubernetes : Rolling Update et Rollback', 'kubernetes-rolling-update', 'Mettez à jour une application sans downtime et faites un rollback.', 'orchestration', 'facile', 30, 'kubernetes', 'Déployez v1, mettez à jour vers v2, puis rollback vers v1.', 20],
    ['Sécuriser un cluster Kubernetes', 'securiser-cluster-k8s', 'Appliquez les bonnes pratiques de sécurité sur K8s.', 'securite', 'difficile', 90, 'kubernetes', 'RBAC, Network Policies, Pod Security Standards, Trivy.', 50],
    // CI/CD
    ['Pipeline CI/CD complet', 'pipeline-cicd-complet', 'Construisez un pipeline CI/CD de bout en bout avec GitHub Actions.', 'cicd', 'moyen', 45, 'docker', 'Build, test, scan, et deploy automatisé.', 25],
    ['GitLab CI : Pipeline multi-stage', 'gitlab-ci-pipeline', 'Créez un pipeline GitLab CI avec stages, artifacts et environments.', 'cicd', 'moyen', 50, 'docker', 'Écrivez un .gitlab-ci.yml avec build, test, staging et production.', 30],
    ['Jenkins : Pipeline déclaratif', 'jenkins-pipeline-declaratif', 'Créez un Jenkinsfile déclaratif avec stages et parallélisme.', 'cicd', 'moyen', 45, 'docker', 'Écrivez un pipeline Jenkins complet avec shared library.', 25],
    ['ArgoCD : Déploiement GitOps', 'argocd-deploiement-gitops', 'Implémentez un workflow GitOps complet avec ArgoCD.', 'gitops', 'difficile', 60, 'kubernetes', 'Installez ArgoCD, créez une Application et configurez la sync auto.', 45],
    // Infrastructure as Code
    ['Infrastructure Terraform : VPC AWS', 'infrastructure-terraform-vpc', 'Provisionnez un VPC complet sur AWS avec Terraform.', 'iac', 'moyen', 50, 'terraform', 'Créez VPC, subnets, route tables, NAT Gateway et security groups.', 30],
    ['Terraform : Modules réutilisables', 'terraform-modules-reutilisables', 'Créez et publiez des modules Terraform professionnels.', 'iac', 'difficile', 60, 'terraform', 'Structurez un module, gérez les inputs/outputs et versionnez.', 40],
    ['Ansible Playbooks', 'ansible-playbooks', 'Automatisez la configuration de serveurs avec Ansible.', 'iac', 'facile', 35, 'ansible', 'Écrivez des playbooks pour installer et configurer des services.', 20],
    ['Ansible : Rôles et Galaxy', 'ansible-roles-galaxy', 'Créez des rôles Ansible réutilisables et publiez sur Galaxy.', 'iac', 'moyen', 45, 'ansible', 'Structurez un rôle, gérez les defaults et publiez.', 25],
    ['Pulumi : Infra en Python', 'pulumi-infra-python', 'Provisionnez de l\'infrastructure cloud avec Python et Pulumi.', 'iac', 'moyen', 45, 'mixed', 'Créez des ressources AWS avec du code Python pur.', 25],
    // Monitoring
    ['Monitoring Stack Prometheus + Grafana', 'monitoring-stack', 'Mettez en place une stack de monitoring complète.', 'monitoring', 'difficile', 75, 'docker', 'Déployez Prometheus, Grafana, node-exporter et alertmanager.', 40],
    ['ELK Stack : Logging centralisé', 'elk-stack-logging', 'Déployez Elasticsearch, Logstash et Kibana pour centraliser les logs.', 'monitoring', 'difficile', 90, 'docker', 'Configurez Filebeat, Logstash pipelines et dashboards Kibana.', 50],
    ['Alerting : PagerDuty + Slack', 'alerting-pagerduty-slack', 'Configurez l\'alerting avec Alertmanager, PagerDuty et Slack.', 'monitoring', 'moyen', 40, 'docker', 'Créez des alertes Prometheus et configurez les notifications.', 25],
    ['OpenTelemetry : Tracing distribué', 'opentelemetry-tracing', 'Instrumentez une application avec OpenTelemetry et visualisez dans Jaeger.', 'monitoring', 'difficile', 60, 'docker', 'Ajoutez le SDK OTel, configurez le collector et Jaeger.', 35],
    // Sécurité
    ['Scan de vulnérabilités avec Trivy', 'scan-vulnerabilites-trivy', 'Scannez vos images Docker et manifestes K8s avec Trivy.', 'securite', 'facile', 25, 'docker', 'Installez Trivy, scannez des images et interprétez les résultats.', 15],
    ['HashiCorp Vault : Gestion des secrets', 'vault-gestion-secrets', 'Déployez Vault et gérez des secrets dynamiques.', 'securite', 'moyen', 50, 'docker', 'Installez Vault, créez des secrets et configurez l\'auth Kubernetes.', 30],
    ['SAST Pipeline : Semgrep + SonarQube', 'sast-pipeline-semgrep', 'Intégrez l\'analyse statique de code dans votre pipeline CI/CD.', 'securite', 'moyen', 40, 'docker', 'Configurez Semgrep et SonarQube dans GitHub Actions.', 25],
    ['Hardening Linux : CIS Benchmark', 'hardening-linux-cis', 'Appliquez le CIS Benchmark sur un serveur Linux.', 'securite', 'difficile', 60, 'ansible', 'Utilisez OpenSCAP et Ansible pour automatiser le hardening.', 40],
    // Réseau
    ['Configurer un reverse proxy Nginx', 'configurer-reverse-proxy-nginx', 'Configurez Nginx comme reverse proxy avec TLS et load balancing.', 'network', 'facile', 30, 'docker', 'Installez Nginx, configurez le proxy_pass et Let\'s Encrypt.', 20],
    ['Troubleshooting réseau : diagnostic complet', 'troubleshooting-reseau-complet', 'Diagnostiquez un problème réseau de A à Z avec les bons outils.', 'network', 'moyen', 45, 'mixed', 'Utilisez ping, traceroute, dig, curl, tcpdump pour isoler un problème.', 25],
    ['VPN WireGuard : Tunnel sécurisé', 'vpn-wireguard-tunnel', 'Mettez en place un tunnel VPN avec WireGuard entre deux sites.', 'network', 'moyen', 40, 'mixed', 'Installez WireGuard, générez les clés et testez la connectivité.', 25],
    ['Load Balancer HAProxy', 'load-balancer-haproxy', 'Configurez HAProxy pour distribuer le trafic entre vos backends.', 'network', 'moyen', 40, 'docker', 'Configurez round-robin, health checks et sticky sessions.', 25],
    // Système
    ['Administration Linux : Script de monitoring', 'admin-linux-script-monitoring', 'Créez un script Bash complet de monitoring système.', 'systeme', 'facile', 30, 'mixed', 'Écrivez un script qui vérifie CPU, RAM, disque et envoie des alertes.', 15],
    ['Systemd : Créer un service', 'systemd-creer-service', 'Créez un service systemd personnalisé pour votre application.', 'systeme', 'facile', 25, 'mixed', 'Écrivez un unit file, configurez le restart et les dépendances.', 15],
    ['LVM : Gestion de volumes logiques', 'lvm-gestion-volumes', 'Gérez l\'espace disque avec LVM : créer, étendre et snapshot.', 'systeme', 'moyen', 35, 'mixed', 'Créez des PV, VG, LV et étendez un filesystem à chaud.', 20],
    ['PowerShell : Automatiser Active Directory', 'powershell-active-directory', 'Automatisez la gestion AD avec des scripts PowerShell.', 'systeme', 'moyen', 45, 'mixed', 'Créez des utilisateurs, groupes et GPO en PowerShell.', 25],
    // Cloud
    ['AWS : Déployer un EKS', 'aws-deployer-eks', 'Déployez un cluster EKS complet avec eksctl et Terraform.', 'cloud', 'difficile', 75, 'mixed', 'Créez un cluster, configurez kubectl et déployez une app.', 45],
    ['AWS : Lambda et API Gateway', 'aws-lambda-api-gateway', 'Créez une API serverless avec Lambda et API Gateway.', 'cloud', 'moyen', 45, 'mixed', 'Écrivez une Lambda, configurez l\'API Gateway et testez.', 25],
    ['Azure : AKS et Azure DevOps', 'azure-aks-devops', 'Déployez une app sur AKS via un pipeline Azure DevOps.', 'cloud', 'difficile', 60, 'mixed', 'Créez un cluster AKS et un pipeline YAML Azure Pipelines.', 35],
    ['GCP : Cloud Run et Cloud Build', 'gcp-cloud-run-build', 'Déployez une application containerisée sur Cloud Run avec CI/CD.', 'cloud', 'moyen', 40, 'docker', 'Configurez Cloud Build pour construire et déployer sur Cloud Run.', 25],
    // GitOps
    ['GitOps Workflow complet', 'gitops-workflow', 'Implémentez un workflow GitOps complet avec ArgoCD.', 'gitops', 'difficile', 60, 'kubernetes', 'Déployez via Git avec ArgoCD et Kustomize.', 45],
    ['Flux CD : GitOps alternatif', 'flux-cd-gitops', 'Configurez Flux CD pour le GitOps sur Kubernetes.', 'gitops', 'moyen', 45, 'kubernetes', 'Installez Flux, configurez les sources et les kustomizations.', 30],
    // Données
    ['PostgreSQL : Réplication et failover', 'postgresql-replication-failover', 'Configurez la réplication streaming PostgreSQL et le failover automatique.', 'donnees', 'difficile', 60, 'docker', 'Configurez un primary/standby avec Patroni et testez le failover.', 40],
    ['Redis : Cluster et sentinelle', 'redis-cluster-sentinelle', 'Déployez un cluster Redis avec Sentinel pour la haute disponibilité.', 'donnees', 'moyen', 45, 'docker', 'Configurez Redis Sentinel, testez le failover et le sharding.', 25],
    // Chaos Engineering
    ['Chaos Engineering : Litmus sur K8s', 'chaos-litmus-kubernetes', 'Injectez du chaos dans votre cluster Kubernetes avec Litmus.', 'sre', 'difficile', 60, 'kubernetes', 'Installez Litmus, créez des expériences et analysez les résultats.', 40],
    // Virtualisation
    ['VMware : Créer un cluster HA', 'vmware-cluster-ha', 'Créez un cluster VMware vSphere avec HA et DRS.', 'virtualisation', 'difficile', 75, 'mixed', 'Configurez vCenter, ajoutez des hôtes et activez HA/DRS.', 45],
    // Nouveaux labs supplémentaires
    // Docker avancé
    ['Docker : Multi-stage build optimisé', 'docker-multistage-build', 'Réduisez une image de 1.2GB à 50MB avec les multi-stage builds.', 'conteneurisation', 'moyen', 35, 'docker', 'Écrivez un Dockerfile multi-stage pour une app Go et une app React.', 20],
    ['Docker : Réseau et DNS interne', 'docker-reseau-dns', 'Configurez des réseaux Docker personnalisés et testez le DNS interne.', 'conteneurisation', 'moyen', 30, 'docker', 'Créez des bridges, connectez des conteneurs et testez la résolution DNS.', 20],
    ['Docker : Volumes et persistance', 'docker-volumes-persistance', 'Gérez la persistance des données avec les volumes Docker.', 'conteneurisation', 'facile', 25, 'docker', 'Créez des volumes nommés, bind mounts et tmpfs. Backup et restore.', 15],
    ['Docker : Debugging et troubleshooting', 'docker-debugging', 'Diagnostiquez et résolvez les problèmes courants Docker.', 'conteneurisation', 'moyen', 40, 'docker', 'Utilisez docker logs, exec, inspect, stats pour diagnostiquer.', 25],
    // Kubernetes avancé
    ['Kubernetes : StatefulSet et bases de données', 'k8s-statefulset-db', 'Déployez PostgreSQL avec un StatefulSet et du stockage persistant.', 'orchestration', 'difficile', 60, 'kubernetes', 'Créez un StatefulSet, PVC, headless service pour PostgreSQL.', 35],
    ['Kubernetes : ConfigMaps et Secrets', 'k8s-configmaps-secrets', 'Gérez la configuration et les secrets dans Kubernetes.', 'orchestration', 'facile', 30, 'kubernetes', 'Créez des ConfigMaps, Secrets et injectez-les dans les pods.', 20],
    ['Kubernetes : RBAC complet', 'k8s-rbac-complet', 'Configurez RBAC avec ServiceAccounts, Roles et ClusterRoles.', 'orchestration', 'difficile', 55, 'kubernetes', 'Créez des SA, Roles, RoleBindings et testez les permissions.', 35],
    ['Kubernetes : Ingress avec TLS', 'k8s-ingress-tls', 'Configurez un Ingress Controller avec cert-manager et Let\'s Encrypt.', 'orchestration', 'moyen', 45, 'kubernetes', 'Déployez nginx-ingress, cert-manager et un Ingress avec TLS.', 30],
    ['Kubernetes : Jobs et CronJobs', 'k8s-jobs-cronjobs', 'Exécutez des tâches planifiées et ponctuelles sur K8s.', 'orchestration', 'facile', 25, 'kubernetes', 'Créez des Jobs pour des tâches batch et des CronJobs pour la planification.', 15],
    ['Kubernetes : Resource Quotas et LimitRanges', 'k8s-resource-quotas', 'Limitez les ressources consommées par namespace.', 'orchestration', 'moyen', 35, 'kubernetes', 'Configurez ResourceQuota et LimitRange, testez les limites.', 20],
    // CI/CD supplémentaires
    ['GitHub Actions : Matrix et cache', 'github-actions-matrix', 'Utilisez les matrices de test et le cache de dépendances.', 'cicd', 'moyen', 35, 'docker', 'Créez un workflow avec matrice Node.js 18/20/22 et cache npm.', 20],
    ['GitHub Actions : Deploy to Kubernetes', 'github-actions-deploy-k8s', 'Déployez automatiquement sur Kubernetes depuis GitHub Actions.', 'cicd', 'difficile', 55, 'kubernetes', 'Build Docker, push ECR, deploy K8s avec kubectl dans un workflow.', 35],
    ['GitHub Actions : Reusable workflows', 'github-actions-reusable', 'Créez des workflows réutilisables et des composite actions.', 'cicd', 'moyen', 40, 'docker', 'Créez une shared workflow et une composite action.', 25],
    // IaC supplémentaires
    ['Terraform : State remote sur S3', 'terraform-state-s3', 'Configurez un backend S3 avec locking DynamoDB pour Terraform.', 'iac', 'moyen', 40, 'terraform', 'Créez le bucket S3, la table DynamoDB et configurez le backend.', 25],
    ['Terraform : Import de ressources existantes', 'terraform-import', 'Importez des ressources cloud existantes dans le state Terraform.', 'iac', 'moyen', 35, 'terraform', 'Utilisez terraform import pour intégrer une infra existante.', 20],
    ['Ansible : Rôle Docker complet', 'ansible-role-docker', 'Créez un rôle Ansible pour installer et configurer Docker.', 'iac', 'moyen', 45, 'ansible', 'Écrivez un rôle avec tasks, handlers, defaults et molecule tests.', 25],
    ['Ansible : Déploiement multi-serveurs', 'ansible-deploy-multi', 'Déployez une application sur un cluster de serveurs avec Ansible.', 'iac', 'difficile', 55, 'ansible', 'Utilisez inventory dynamique, rolling deploy et handlers.', 35],
    // Monitoring supplémentaires
    ['Grafana : Dashboards as Code', 'grafana-dashboards-code', 'Gérez vos dashboards Grafana en tant que code avec provisioning.', 'monitoring', 'moyen', 40, 'docker', 'Créez des dashboards JSON, configurez le provisioning automatique.', 25],
    ['Loki : Logging centralisé', 'loki-logging-centralise', 'Déployez Loki + Promtail pour centraliser vos logs.', 'monitoring', 'moyen', 45, 'docker', 'Installez Loki, configurez Promtail et créez des requêtes LogQL.', 25],
    ['Prometheus : Alertmanager avancé', 'prometheus-alertmanager', 'Configurez des alertes complexes avec routing et silences.', 'monitoring', 'difficile', 50, 'docker', 'Créez des alertes, configurez le routing Slack/PagerDuty.', 30],
    // Sécurité supplémentaires
    ['OPA Gatekeeper : Policy as Code', 'opa-gatekeeper-policies', 'Implémentez des policies Kubernetes avec OPA Gatekeeper.', 'securite', 'difficile', 55, 'kubernetes', 'Installez Gatekeeper, créez des ConstraintTemplates et Constraints.', 35],
    ['Secrets : External Secrets Operator', 'external-secrets-operator', 'Synchronisez des secrets depuis Vault/AWS SM vers Kubernetes.', 'securite', 'moyen', 45, 'kubernetes', 'Installez ESO, configurez un SecretStore et créez des ExternalSecrets.', 30],
    ['Container signing avec Cosign', 'container-signing-cosign', 'Signez vos images Docker pour la supply chain security.', 'securite', 'moyen', 35, 'docker', 'Générez des clés, signez des images et vérifiez les signatures.', 20],
    ['Falco : Runtime security', 'falco-runtime-security', 'Détectez les comportements suspects au runtime avec Falco.', 'securite', 'difficile', 50, 'kubernetes', 'Déployez Falco, créez des règles custom et configurez les alertes.', 35],
    // Réseau supplémentaires
    ['Nginx : API Gateway', 'nginx-api-gateway', 'Configurez Nginx comme API Gateway avec rate limiting et auth.', 'network', 'moyen', 40, 'docker', 'Configurez proxy_pass, rate limiting, JWT validation.', 25],
    ['Traefik : Reverse proxy Kubernetes', 'traefik-reverse-proxy-k8s', 'Déployez Traefik comme Ingress Controller sur Kubernetes.', 'network', 'moyen', 45, 'kubernetes', 'Installez Traefik, configurez IngressRoutes et middlewares.', 25],
    ['DNS : Configurer CoreDNS', 'dns-coredns-config', 'Personnalisez CoreDNS dans Kubernetes pour vos besoins.', 'network', 'moyen', 35, 'kubernetes', 'Modifiez le ConfigMap CoreDNS, ajoutez des stubs et rewrites.', 20],
    // Système supplémentaires
    ['Linux : Hardening avec Lynis', 'linux-hardening-lynis', 'Auditez et durcissez un serveur Linux avec Lynis.', 'systeme', 'moyen', 40, 'mixed', 'Exécutez un audit Lynis, analysez les résultats et corrigez.', 25],
    ['Bash : Script de backup automatisé', 'bash-script-backup', 'Créez un script de backup complet avec rotation et notification.', 'systeme', 'facile', 30, 'mixed', 'Écrivez un script avec rsync, compression, rotation et cron.', 15],
    ['Linux : Configurer fail2ban', 'linux-fail2ban', 'Protégez votre serveur contre les attaques brute-force.', 'systeme', 'facile', 25, 'mixed', 'Installez fail2ban, configurez les jails SSH et custom.', 15],
    ['Systemd : Timer et automation', 'systemd-timer-automation', 'Remplacez cron par des timers systemd pour plus de contrôle.', 'systeme', 'moyen', 30, 'mixed', 'Créez des .timer et .service pour des tâches planifiées.', 20],
    // Cloud supplémentaires
    ['AWS : S3 et CloudFront CDN', 'aws-s3-cloudfront', 'Déployez un site statique avec S3 et CloudFront.', 'cloud', 'facile', 30, 'mixed', 'Créez un bucket S3, configurez CloudFront et un domaine custom.', 20],
    ['AWS : RDS PostgreSQL et backup', 'aws-rds-postgresql', 'Déployez une base RDS PostgreSQL avec réplication et backup.', 'cloud', 'moyen', 45, 'mixed', 'Créez une instance RDS, configurez Multi-AZ et les snapshots.', 25],
    ['GCP : Deploy sur Cloud Run', 'gcp-deploy-cloud-run', 'Déployez une application containerisée sur Cloud Run.', 'cloud', 'facile', 30, 'docker', 'Buildez avec Cloud Build et déployez sur Cloud Run.', 20],
    ['Azure : Azure Functions', 'azure-functions-lab', 'Créez et déployez des fonctions serverless sur Azure.', 'cloud', 'moyen', 40, 'mixed', 'Écrivez une Azure Function, configurez les triggers et déployez.', 25],
    // Données
    ['MongoDB : Replica Set', 'mongodb-replica-set', 'Configurez un Replica Set MongoDB pour la haute disponibilité.', 'donnees', 'moyen', 45, 'docker', 'Déployez 3 nœuds MongoDB, initialisez le RS et testez le failover.', 25],
    ['Kafka : Producteur et consommateur', 'kafka-producteur-consommateur', 'Créez un producteur et consommateur Kafka en ligne de commande.', 'donnees', 'moyen', 40, 'docker', 'Lancez Kafka, créez un topic, produisez et consommez des messages.', 25],
    ['Migration de base de données avec Flyway', 'migration-flyway', 'Automatisez les migrations de schéma avec Flyway.', 'donnees', 'moyen', 35, 'docker', 'Configurez Flyway, créez des migrations SQL et exécutez-les.', 20],
    // GitOps supplémentaires
    ['ArgoCD : App of Apps pattern', 'argocd-app-of-apps', 'Implémentez le pattern App of Apps pour gérer plusieurs applications.', 'gitops', 'difficile', 55, 'kubernetes', 'Créez une Application parent qui déploie les Applications enfants.', 35],
    ['ArgoCD : Canary deployment avec Argo Rollouts', 'argocd-canary-rollouts', 'Déployez en mode canary avec Argo Rollouts.', 'gitops', 'difficile', 60, 'kubernetes', 'Installez Argo Rollouts, créez un Rollout canary avec analyse.', 40],
    // SRE
    ['SRE : Définir des SLOs', 'sre-definir-slos', 'Définissez des SLOs, SLIs et error budgets pour un service.', 'sre', 'moyen', 40, 'mixed', 'Calculez les SLIs, définissez les SLOs et créez des alertes burn rate.', 25],
    ['Chaos : Network partition sur K8s', 'chaos-network-partition', 'Simulez une partition réseau entre des pods Kubernetes.', 'sre', 'difficile', 50, 'kubernetes', 'Utilisez Chaos Mesh pour injecter une network partition et observez.', 35]
  ];

  for (const l of labs) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO labs (title, slug, description, category, difficulty, duration_minutes, environment_type, instructions, xp_reward) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: l
    });
  }
  console.log('✅ Labs créés');


  // Tools
  const tools = [
    ['Docker', 'docker', 'Plateforme de conteneurisation pour créer, déployer et exécuter des applications.', 'Conteneurisation et gestion d\'images', 'conteneurisation', 'https://docs.docker.com', 'https://github.com/docker', 'Podman, containerd', 'Microservices, CI/CD, Dev local', 1],
    ['Kubernetes', 'kubernetes', 'Orchestrateur de conteneurs pour le déploiement à grande échelle.', 'Orchestration de conteneurs en production', 'orchestration', 'https://kubernetes.io/docs', 'https://github.com/kubernetes/kubernetes', 'Docker Swarm, Nomad', 'Production workloads, Scaling', 1],
    ['Terraform', 'terraform', 'Outil d\'Infrastructure as Code multi-cloud.', 'Provisionnement d\'infrastructure déclaratif', 'iac', 'https://developer.hashicorp.com/terraform', 'https://github.com/hashicorp/terraform', 'Pulumi, CloudFormation, Crossplane', 'Multi-cloud, Infrastructure provisioning', 1],
    ['Ansible', 'ansible', 'Outil d\'automatisation de configuration et déploiement.', 'Automatisation de configuration serveur', 'iac', 'https://docs.ansible.com', 'https://github.com/ansible/ansible', 'Chef, Puppet, Salt', 'Configuration management, Provisioning', 1],
    ['Prometheus', 'prometheus', 'Système de monitoring et d\'alerting open source.', 'Collecte de métriques et alerting', 'monitoring', 'https://prometheus.io/docs', 'https://github.com/prometheus/prometheus', 'Datadog, InfluxDB, Victoria Metrics', 'Monitoring, Alerting, Metrics', 1],
    ['Grafana', 'grafana', 'Plateforme de visualisation et d\'analyse de données.', 'Dashboards et visualisation de métriques', 'monitoring', 'https://grafana.com/docs', 'https://github.com/grafana/grafana', 'Kibana, Chronograf', 'Dashboards, Data visualization', 1],
    ['ArgoCD', 'argocd', 'Outil de déploiement continu GitOps pour Kubernetes.', 'GitOps et déploiement déclaratif', 'gitops', 'https://argo-cd.readthedocs.io', 'https://github.com/argoproj/argo-cd', 'Flux CD, Jenkins X', 'GitOps, Continuous deployment', 1],
    ['GitHub Actions', 'github-actions', 'Plateforme CI/CD intégrée à GitHub.', 'Automatisation de workflows CI/CD', 'cicd', 'https://docs.github.com/actions', 'https://github.com/features/actions', 'GitLab CI, Jenkins, CircleCI', 'CI/CD, Automation, Testing', 1],
    ['Helm', 'helm', 'Gestionnaire de packages pour Kubernetes.', 'Packaging d\'applications Kubernetes', 'orchestration', 'https://helm.sh/docs', 'https://github.com/helm/helm', 'Kustomize, Carvel', 'K8s packaging, Templating', 0],
    ['Jenkins', 'jenkins', 'Serveur d\'automatisation open source.', 'Pipelines CI/CD extensibles', 'cicd', 'https://www.jenkins.io/doc', 'https://github.com/jenkinsci/jenkins', 'GitHub Actions, GitLab CI, CircleCI', 'CI/CD, Build automation', 0],
    ['Vault', 'vault', 'Gestion de secrets et protection de données sensibles.', 'Gestion centralisée de secrets', 'securite', 'https://developer.hashicorp.com/vault', 'https://github.com/hashicorp/vault', 'AWS Secrets Manager, Azure Key Vault', 'Secrets management, Encryption', 0],
    ['Istio', 'istio', 'Service mesh pour Kubernetes.', 'Gestion du trafic et observabilité', 'orchestration', 'https://istio.io/docs', 'https://github.com/istio/istio', 'Linkerd, Consul Connect', 'Service mesh, Traffic management', 0],
    ['Trivy', 'trivy', 'Scanner de vulnérabilités pour conteneurs et IaC.', 'Scan de sécurité complet', 'securite', 'https://aquasecurity.github.io/trivy', 'https://github.com/aquasecurity/trivy', 'Snyk, Grype, Clair', 'Container scanning, IaC scanning', 0],
    ['Fluentd', 'fluentd', 'Collecteur de logs unifié open source.', 'Agrégation et routage de logs', 'monitoring', 'https://docs.fluentd.org', 'https://github.com/fluent/fluentd', 'Logstash, Vector, Filebeat', 'Log aggregation, Data pipeline', 0],
    ['Crossplane', 'crossplane', 'Contrôle plan cloud natif pour l\'infrastructure.', 'Infrastructure as Code Kubernetes-native', 'iac', 'https://docs.crossplane.io', 'https://github.com/crossplane/crossplane', 'Terraform, Pulumi', 'Cloud infrastructure, K8s-native IaC', 0]
  ];

  for (const t of tools) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO tools (name, slug, description, short_description, category, docs_url, github_url, alternatives, use_cases, is_popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: t
    });
  }
  console.log('✅ Outils créés');


  // Certifications
  const certifications = [
    ['Certified Kubernetes Administrator (CKA)', 'cka', 'Certification officielle d\'administration Kubernetes par la CNCF.', 'CNCF/Linux Foundation', 'orchestration', 'avance', 3, 395, 2, 'Expérience Kubernetes', '["Architecture du cluster","Workloads","Networking","Storage","Troubleshooting"]', '["Documentation officielle K8s","Killer.sh","KodeKloud"]', 1],
    ['Certified Kubernetes Application Developer (CKAD)', 'ckad', 'Certification pour les développeurs d\'applications sur Kubernetes.', 'CNCF/Linux Foundation', 'orchestration', 'intermediaire', 2, 395, 2, 'Bases Kubernetes', '["Design de pods","Configuration","Observabilité","Services & Networking"]', '["K8s docs","CKAD exercises","KodeKloud"]', 1],
    ['Certified Kubernetes Security Specialist (CKS)', 'cks', 'Certification avancée en sécurité Kubernetes.', 'CNCF/Linux Foundation', 'securite', 'expert', 2, 395, 2, 'CKA requis', '["Cluster Security","System Hardening","Supply Chain Security","Runtime Security"]', '["K8s security docs","Killer.sh CKS"]', 0],
    ['HashiCorp Terraform Associate', 'terraform-associate', 'Certification officielle Terraform par HashiCorp.', 'HashiCorp', 'iac', 'intermediaire', 3, 70, 2, 'Bases cloud', '["IaC concepts","Terraform workflow","Modules","State management","Cloud agnostic"]', '["Terraform docs","HashiCorp Learn","Study guide"]', 1],
    ['AWS Certified DevOps Engineer Professional', 'aws-devops-pro', 'Certification AWS avancée pour les ingénieurs DevOps.', 'Amazon Web Services', 'cloud', 'expert', 2, 300, 3, 'AWS Associate level', '["SDLC automation","Configuration management","Monitoring & Logging","Policies & Standards","HA & Fault tolerance"]', '["AWS docs","A Cloud Guru","Tutorials Dojo"]', 1],
    ['Linux Foundation Certified System Administrator (LFCS)', 'lfcs', 'Certification d\'administration système Linux.', 'Linux Foundation', 'systeme', 'intermediaire', 2, 395, 2, 'Bases Linux', '["Commandes essentielles","Filesystem","Networking","Service management","Security"]', '["Linux man pages","The Linux Foundation training"]', 0],
    ['Red Hat Certified System Administrator (RHCSA - EX200)', 'rhcsa-ex200', 'Certification officielle Red Hat validant les compétences d\'administration système RHEL.', 'Red Hat', 'systeme', 'intermediaire', 3, 400, 3, 'Bases Linux', '["Gestion utilisateurs et permissions","Stockage LVM","SELinux","Réseau et firewalld","Conteneurs Podman","Services systemd","Troubleshooting boot"]', '["RH124 + RH134","Cours DevOps Expert Red Hat","Documentation Red Hat"]', 1],
    ['Red Hat Certified Engineer (RHCE - EX294)', 'rhce-ex294', 'Certification avancée Red Hat validant les compétences Ansible sur RHEL.', 'Red Hat', 'iac', 'avance', 2, 400, 3, 'RHCSA requis', '["Ansible playbooks et modules","Rôles et collections","Variables et templates Jinja2","Ansible Vault","Gestion erreurs et parallélisme","RHEL System Roles"]', '["RH294","Cours DevOps Expert Red Hat","Documentation Ansible"]', 1]
  ];

  for (const cert of certifications) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO certifications (name, slug, description, provider, category, difficulty, mock_exam_count, cost_usd, validity_years, prerequisites, topics, resources, is_popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: cert
    });
  }
  console.log('✅ Certifications créées');


  // Blog Posts
  const posts = [
    ['Les 10 commandes Docker essentielles', 'docker-commandes-essentielles', 'Découvrez les commandes Docker que tout développeur doit connaître pour être efficace au quotidien.', 'Guide pratique des commandes Docker les plus utilisées.', 'conteneurisation', '["docker","débutant","commandes"]', 1, 1],
    ['Kubernetes vs Docker Swarm en 2024', 'kubernetes-vs-docker-swarm-2024', 'Comparaison détaillée entre Kubernetes et Docker Swarm pour vous aider à choisir.', 'Quel orchestrateur choisir pour votre projet ?', 'orchestration', '["kubernetes","docker swarm","comparaison"]', 1, 1],
    ['GitOps : Le guide complet', 'gitops-guide-complet', 'Tout ce que vous devez savoir sur le GitOps, ses principes et son implémentation.', 'Comprendre et implémenter le GitOps dans votre organisation.', 'gitops', '["gitops","argocd","flux"]', 0, 1],
    ['Sécuriser vos conteneurs Docker', 'securiser-conteneurs-docker', 'Les meilleures pratiques pour sécuriser vos conteneurs Docker en production.', 'Bonnes pratiques de sécurité pour Docker.', 'securite', '["sécurité","docker","production"]', 1, 2],
    ['Terraform : Modules et bonnes pratiques', 'terraform-modules-bonnes-pratiques', 'Apprenez à structurer vos projets Terraform avec des modules réutilisables.', 'Structurez votre code Terraform comme un pro.', 'iac', '["terraform","modules","iac"]', 0, 3],
    ['Monitoring avec Prometheus : Guide débutant', 'monitoring-prometheus-guide', 'Introduction complète à Prometheus pour monitorer vos applications et infrastructure.', 'Démarrez avec Prometheus en quelques minutes.', 'monitoring', '["prometheus","monitoring","métriques"]', 0, 2]
  ];

  for (const p of posts) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO posts (title, slug, content, excerpt, category, tags, is_featured, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: p
    });
  }
  console.log('✅ Articles de blog créés');


  // Roadmap Items
  const roadmapItems = [
    ['Fondamentaux Linux', 'Maîtrisez les bases de Linux : ligne de commande, permissions, processus, réseau.', 'fondamentaux', 'debutant', 1, '["Linux Journey","The Linux Command Line book"]', '["Configurer un serveur web","Script d\'automatisation"]', '["bash","vim","ssh"]', 4],
    ['Conteneurisation avec Docker', 'Apprenez à conteneuriser vos applications avec Docker et Docker Compose.', 'conteneurisation', 'debutant', 2, '["Docker docs","Play with Docker"]', '["Conteneuriser une app Node.js","Multi-stage builds"]', '["docker","docker-compose"]', 3],
    ['CI/CD Pipelines', 'Construisez des pipelines d\'intégration et déploiement continus.', 'cicd', 'debutant', 3, '["GitHub Actions docs","GitLab CI docs"]', '["Pipeline pour app web","Tests automatisés"]', '["github-actions","gitlab-ci","jenkins"]', 3],
    ['Orchestration Kubernetes', 'Déployez et gérez des applications avec Kubernetes.', 'orchestration', 'intermediaire', 4, '["Kubernetes docs","Kelsey Hightower tutorial"]', '["Déployer microservices","Configurer autoscaling"]', '["kubernetes","helm","kubectl"]', 6],
    ['Infrastructure as Code', 'Provisionnez votre infrastructure de manière déclarative.', 'iac', 'intermediaire', 5, '["Terraform Learn","Ansible Galaxy"]', '["Infra AWS avec Terraform","Configuration Ansible"]', '["terraform","ansible","pulumi"]', 5],
    ['Monitoring & Observabilité', 'Mettez en place une stack d\'observabilité complète.', 'monitoring', 'intermediaire', 6, '["Prometheus docs","Grafana tutorials"]', '["Stack Prometheus/Grafana","Alerting pipeline"]', '["prometheus","grafana","loki"]', 4],
    ['Sécurité DevOps', 'Intégrez la sécurité dans votre pipeline DevOps.', 'securite', 'avance', 7, '["OWASP DevSecOps","Snyk Learn"]', '["Scanner de vulnérabilités","Policy as Code"]', '["trivy","vault","opa"]', 4],
    ['GitOps & Déploiement Avancé', 'Implémentez le GitOps et les stratégies de déploiement avancées.', 'gitops', 'avance', 8, '["ArgoCD docs","Flux docs"]', '["GitOps workflow","Canary deployments"]', '["argocd","fluxcd","kustomize"]', 5]
  ];

  for (const r of roadmapItems) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO roadmap_items (title, description, category, level, order_index, resources, projects, tools, duration_weeks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: r
    });
  }
  console.log('✅ Roadmap items créés');


  // Quizzes
  const quizzes = [
    ['Quiz Docker Fondamentaux', 'quiz-docker-fondamentaux', 'Testez vos connaissances sur les bases de Docker.', 'conteneurisation', 'facile', 70, 10, 15, 5],
    ['Quiz Kubernetes Essentials', 'quiz-kubernetes-essentials', 'Vérifiez votre compréhension de Kubernetes.', 'orchestration', 'moyen', 75, 15, 20, 3],
    ['Quiz Terraform Basics', 'quiz-terraform-basics', 'Évaluez vos connaissances Terraform.', 'iac', 'moyen', 70, 12, 15, 3],
    ['Quiz CI/CD Pipelines', 'quiz-cicd-pipelines', 'Testez vos connaissances en intégration continue.', 'cicd', 'facile', 70, 10, 15, 3],
    ['Quiz DevSecOps', 'quiz-devsecops', 'Évaluez vos connaissances en sécurité DevOps.', 'securite', 'difficile', 80, 20, 25, 0]
  ];

  for (const q of quizzes) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO quizzes (title, slug, description, category, difficulty, pass_score, time_limit_minutes, xp_reward, question_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: q
    });
  }
  console.log('✅ Quizzes créés');


  // Quiz Questions
  const questions = [
    // Docker Quiz (quiz_id = 1)
    [1, 'Quelle commande permet de lister les conteneurs en cours d\'exécution ?', 'multiple_choice', '["docker ps","docker list","docker containers","docker running"]', 'docker ps', 'La commande docker ps affiche les conteneurs actifs. Ajoutez -a pour voir tous les conteneurs.', 1],
    [1, 'Quel fichier décrit les étapes de construction d\'une image Docker ?', 'multiple_choice', '["Dockerfile","docker-compose.yml","Dockerimage","container.conf"]', 'Dockerfile', 'Le Dockerfile contient les instructions pour construire une image Docker.', 2],
    [1, 'Docker utilise la virtualisation complète pour isoler les conteneurs.', 'true_false', '["Vrai","Faux"]', 'Faux', 'Docker utilise les namespaces et cgroups Linux, pas la virtualisation complète.', 3],
    [1, 'Quelle commande permet de construire une image à partir d\'un Dockerfile ?', 'multiple_choice', '["docker build","docker create","docker make","docker compile"]', 'docker build', 'docker build construit une image à partir du Dockerfile dans le contexte spécifié.', 4],
    [1, 'Quel flag permet de mapper un port avec docker run ?', 'multiple_choice', '["-p","-m","-v","-e"]', '-p', 'Le flag -p ou --publish mappe un port du conteneur vers l\'hôte.', 5],
    // Kubernetes Quiz (quiz_id = 2)
    [2, 'Quel est le plus petit objet déployable dans Kubernetes ?', 'multiple_choice', '["Pod","Container","Deployment","ReplicaSet"]', 'Pod', 'Le Pod est l\'unité de base dans Kubernetes, pouvant contenir un ou plusieurs conteneurs.', 1],
    [2, 'Quelle commande permet d\'appliquer un fichier de configuration ?', 'multiple_choice', '["kubectl apply -f","kubectl create","kubectl deploy","kubectl run -f"]', 'kubectl apply -f', 'kubectl apply -f applique une configuration de manière déclarative.', 2],
    [2, 'Un Service de type ClusterIP est accessible depuis l\'extérieur du cluster.', 'true_false', '["Vrai","Faux"]', 'Faux', 'ClusterIP n\'est accessible qu\'à l\'intérieur du cluster. Utilisez NodePort ou LoadBalancer pour l\'accès externe.', 3],
    // Terraform Quiz (quiz_id = 3)
    [3, 'Quelle commande initialise un projet Terraform ?', 'multiple_choice', '["terraform init","terraform start","terraform setup","terraform begin"]', 'terraform init', 'terraform init télécharge les providers et initialise le backend.', 1],
    [3, 'Le state Terraform peut être stocké à distance.', 'true_false', '["Vrai","Faux"]', 'Vrai', 'Le state peut être stocké dans S3, Azure Blob, Terraform Cloud, etc.', 2],
    [3, 'Quel bloc définit une ressource dans Terraform ?', 'multiple_choice', '["resource","module","provider","data"]', 'resource', 'Le bloc resource déclare une infrastructure à créer ou gérer.', 3],
    // CI/CD Quiz (quiz_id = 4)
    [4, 'Que signifie CI dans CI/CD ?', 'multiple_choice', '["Continuous Integration","Continuous Implementation","Code Integration","Container Integration"]', 'Continuous Integration', 'CI = Continuous Integration, l\'intégration continue du code.', 1],
    [4, 'GitHub Actions utilise des fichiers YAML pour définir les workflows.', 'true_false', '["Vrai","Faux"]', 'Vrai', 'Les workflows GitHub Actions sont définis dans des fichiers .yml dans .github/workflows/.', 2],
    [4, 'Quelle section définit les déclencheurs d\'un workflow GitHub Actions ?', 'multiple_choice', '["on","trigger","when","events"]', 'on', 'La clé "on" définit les événements qui déclenchent le workflow.', 3]
  ];

  for (const q of questions) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO quiz_questions (quiz_id, question, question_type, options, correct_answer, explanation, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: q
    });
  }
  console.log('✅ Questions de quiz créées');


  // Achievements
  const achievements = [
    ['Premier Pas', 'Complétez votre première leçon', '🎯', 'apprentissage', 'common', 10, 'lessons_completed', 1],
    ['Étudiant Assidu', 'Complétez 10 leçons', '📚', 'apprentissage', 'common', 25, 'lessons_completed', 10],
    ['Maître des Cours', 'Terminez 5 cours complets', '🎓', 'apprentissage', 'rare', 50, 'courses_completed', 5],
    ['Laborantin', 'Complétez votre premier lab', '🔬', 'pratique', 'common', 15, 'labs_completed', 1],
    ['Expert Pratique', 'Complétez 10 labs', '⚗️', 'pratique', 'rare', 40, 'labs_completed', 10],
    ['Cerveau en Feu', 'Réussissez 5 quizzes', '🧠', 'quiz', 'common', 20, 'quizzes_passed', 5],
    ['Incollable', 'Obtenez 100% à un quiz', '💯', 'quiz', 'epic', 50, 'perfect_quiz', 1],
    ['Communautaire', 'Créez 5 threads dans le forum', '💬', 'communaute', 'common', 15, 'threads_created', 5],
    ['Mentor Étoile', 'Recevez une note de 5/5 en mentorat', '⭐', 'mentorat', 'epic', 40, 'mentor_rating_5', 1],
    ['Streak Master', 'Maintenez une série de 7 jours', '🔥', 'engagement', 'common', 20, 'streak_days', 7],
    ['Streak Légendaire', 'Maintenez une série de 30 jours', '🌟', 'engagement', 'legendary', 100, 'streak_days', 30],
    ['Certifié', 'Obtenez votre première certification', '🏅', 'certification', 'rare', 60, 'certs_passed', 1],
    ['Multi-Certifié', 'Obtenez 3 certifications', '🏆', 'certification', 'legendary', 150, 'certs_passed', 3],
    ['Explorateur', 'Visitez toutes les sections de la plateforme', '🗺️', 'exploration', 'common', 10, 'sections_visited', 8],
    ['Top Contributeur', 'Atteignez le top 10 du leaderboard', '👑', 'competition', 'legendary', 200, 'leaderboard_rank', 10]
  ];

  for (const a of achievements) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO achievements (name, description, icon, category, rarity, xp_reward, condition_type, condition_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: a
    });
  }
  console.log('✅ Achievements créés');


  // Forum Threads
  const threads = [
    [2, 'Comment débuter avec Kubernetes ?', 'Bonjour à tous ! Je suis débutant et je voudrais savoir par où commencer avec Kubernetes. Quels sont les prérequis et les ressources recommandées ?', 'orchestration'],
    [3, 'Terraform vs Pulumi : votre avis ?', 'J\'hésite entre Terraform et Pulumi pour mon projet. Quels sont les avantages et inconvénients de chacun selon votre expérience ?', 'iac'],
    [1, 'Bonnes pratiques Docker en production', 'Partageons nos bonnes pratiques pour utiliser Docker en production. Sécurité, performance, monitoring... Quels sont vos conseils ?', 'conteneurisation'],
    [2, 'Préparation CKA - Retour d\'expérience', 'J\'ai passé le CKA la semaine dernière. Voici mon retour d\'expérience et mes conseils pour ceux qui préparent l\'examen.', 'certification'],
    [3, 'GitOps avec ArgoCD : problème de sync', 'J\'ai un problème de synchronisation avec ArgoCD. Mon application ne se met pas à jour malgré les commits. Quelqu\'un a une idée ?', 'gitops']
  ];

  for (const t of threads) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO forum_threads (user_id, title, content, category) VALUES (?, ?, ?, ?)`,
      args: t
    });
  }
  console.log('✅ Forum threads créés');

  // Cheat Sheets (Fiches)
  const cheatsheets = [
    ['Docker : Commandes essentielles', 'docker-commandes', 'Toutes les commandes Docker indispensables au quotidien.', 'conteneurisation', '# Docker Cheat Sheet\n\n## Images\n```bash\ndocker build -t app:v1 .\ndocker images\ndocker rmi image_id\ndocker pull nginx:alpine\ndocker push user/app:v1\n```\n\n## Conteneurs\n```bash\ndocker run -d --name web -p 8080:80 nginx\ndocker ps -a\ndocker stop web\ndocker rm web\ndocker logs -f web\ndocker exec -it web bash\n```\n\n## Volumes & Réseaux\n```bash\ndocker volume create data\ndocker network create mynet\ndocker run -v data:/app -network mynet app\n```\n\n## Nettoyage\n```bash\ndocker system prune -a\ndocker volume prune\ndocker image prune\n```\n\n## Docker Compose\n```bash\ndocker compose up -d\ndocker compose down\ndocker compose logs -f\ndocker compose build --no-cache\n```', '🐳', 'debutant', '["docker","conteneurs","images"]'],
    ['Kubernetes : kubectl', 'kubernetes-kubectl', 'Les commandes kubectl les plus utilisées pour gérer un cluster.', 'orchestration', '# kubectl Cheat Sheet\n\n## Contexte\n```bash\nkubectl config get-contexts\nkubectl config use-context prod\nkubectl cluster-info\n```\n\n## Pods\n```bash\nkubectl get pods -A\nkubectl describe pod <name>\nkubectl logs -f <pod>\nkubectl exec -it <pod> -- bash\nkubectl delete pod <name>\n```\n\n## Deployments\n```bash\nkubectl apply -f deploy.yaml\nkubectl get deploy\nkubectl scale deploy app --replicas=5\nkubectl rollout status deploy/app\nkubectl rollout undo deploy/app\n```\n\n## Services\n```bash\nkubectl get svc\nkubectl expose deploy app --port=80 --type=LoadBalancer\nkubectl port-forward svc/app 8080:80\n```\n\n## Debug\n```bash\nkubectl get events --sort-by=.lastTimestamp\nkubectl top pods\nkubectl debug pod/<name> -it --image=busybox\n```', '☸️', 'debutant', '["kubernetes","kubectl","pods"]'],
    ['Terraform : Workflow', 'terraform-workflow', 'Le workflow Terraform et les commandes clés.', 'iac', '# Terraform Cheat Sheet\n\n## Workflow\n```bash\nterraform init        # Initialiser\nterraform plan        # Prévisualiser\nterraform apply       # Appliquer\nterraform destroy     # Détruire\n```\n\n## State\n```bash\nterraform state list\nterraform state show aws_instance.web\nterraform state mv old new\nterraform state rm resource\nterraform import aws_instance.web i-123\n```\n\n## Variables\n```hcl\nvariable \"env\" {\n  type    = string\n  default = \"dev\"\n}\n\noutput \"ip\" {\n  value = aws_instance.web.public_ip\n}\n```\n\n## Modules\n```hcl\nmodule \"vpc\" {\n  source  = \"./modules/vpc\"\n  version = \"~> 2.0\"\n  cidr    = \"10.0.0.0/16\"\n}\n```\n\n## Format & Validate\n```bash\nterraform fmt -recursive\nterraform validate\nterraform graph | dot -Tpng > graph.png\n```', '🏗️', 'debutant', '["terraform","iac","hcl"]'],
    ['Git : Commandes avancées', 'git-avance', 'Les commandes Git pour les situations complexes.', 'cicd', '# Git Avancé Cheat Sheet\n\n## Rebase\n```bash\ngit rebase -i HEAD~3      # Rebase interactif\ngit rebase main           # Rebase sur main\ngit rebase --abort        # Annuler\n```\n\n## Cherry-pick\n```bash\ngit cherry-pick abc123\ngit cherry-pick --no-commit abc123\n```\n\n## Stash\n```bash\ngit stash\ngit stash pop\ngit stash list\ngit stash drop stash@{0}\n```\n\n## Historique\n```bash\ngit log --oneline --graph --all\ngit reflog\ngit bisect start\ngit bisect bad\ngit bisect good v1.0\n```\n\n## Undo\n```bash\ngit reset --soft HEAD~1   # Annuler commit, garder changes\ngit reset --hard HEAD~1   # Tout effacer\ngit revert abc123         # Créer un commit inverse\ngit restore file.txt      # Restaurer un fichier\n```\n\n## Tags\n```bash\ngit tag v1.0.0\ngit tag -a v1.0.0 -m \"Release 1.0\"\ngit push --tags\n```', '📝', 'intermediaire', '["git","rebase","cherry-pick"]'],
    ['Linux : Administration système', 'linux-admin', 'Les commandes Linux essentielles pour l\'administration.', 'systeme', '# Linux Admin Cheat Sheet\n\n## Fichiers & Navigation\n```bash\nfind / -name \"*.log\" -mtime -1\ndu -sh /var/*\ndf -h\nln -s /target /link\nchmod 755 script.sh\nchown user:group file\n```\n\n## Processus\n```bash\nps aux | grep nginx\ntop -bn1 | head -20\nkill -9 PID\nsystemctl status nginx\njournalctl -u nginx -f\n```\n\n## Réseau\n```bash\nss -tlnp\nip addr show\ndig example.com\ncurl -I https://api.example.com\ntcpdump -i eth0 port 80\n```\n\n## Utilisateurs\n```bash\nuseradd -m -s /bin/bash user\nusermod -aG sudo user\npasswd user\nwho\nlast\n```\n\n## Disques\n```bash\nlsblk\nfdisk -l\nmount /dev/sdb1 /mnt\ndf -h\nfree -h\n```', '🐧', 'debutant', '["linux","commandes","admin"]'],
    ['Prometheus : PromQL', 'prometheus-promql', 'Les requêtes PromQL essentielles pour le monitoring.', 'monitoring', '# PromQL Cheat Sheet\n\n## Sélecteurs\n```promql\nhttp_requests_total\nhttp_requests_total{method=\"GET\"}\nhttp_requests_total{status=~\"5..\"}\n```\n\n## Fonctions de taux\n```promql\nrate(http_requests_total[5m])\nirate(http_requests_total[1m])\nincrease(http_requests_total[1h])\n```\n\n## Agrégation\n```promql\nsum(rate(http_requests_total[5m])) by (service)\navg(node_memory_MemAvailable_bytes) by (instance)\ntopk(5, rate(http_requests_total[5m]))\n```\n\n## Percentiles\n```promql\nhistogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))\nhistogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))\n```\n\n## Alertes\n```promql\n# Taux d erreur > 5%\nrate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m]) > 0.05\n\n# CPU > 80%\n100 - (avg by(instance)(rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100) > 80\n```', '📊', 'intermediaire', '["prometheus","promql","monitoring"]'],
    ['Nginx : Configuration', 'nginx-configuration', 'Templates de configuration Nginx pour les cas courants.', 'network', '# Nginx Cheat Sheet\n\n## Reverse Proxy\n```nginx\nserver {\n    listen 80;\n    server_name api.example.com;\n    location / {\n        proxy_pass http://backend:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}\n```\n\n## HTTPS + Redirect\n```nginx\nserver {\n    listen 443 ssl;\n    ssl_certificate /etc/ssl/cert.pem;\n    ssl_certificate_key /etc/ssl/key.pem;\n}\nserver {\n    listen 80;\n    return 301 https://$host$request_uri;\n}\n```\n\n## Load Balancing\n```nginx\nupstream backend {\n    least_conn;\n    server 10.0.1.1:3000;\n    server 10.0.1.2:3000;\n}\n```\n\n## Rate Limiting\n```nginx\nlimit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\nlocation /api/ {\n    limit_req zone=api burst=20 nodelay;\n}\n```', '🌐', 'intermediaire', '["nginx","reverse-proxy","ssl"]'],
    ['Ansible : Playbooks', 'ansible-playbooks-fiche', 'Structure et syntaxe des playbooks Ansible.', 'iac', '# Ansible Cheat Sheet\n\n## Commandes\n```bash\nansible-playbook site.yml -i inventory\nansible all -m ping\nansible all -m shell -a \"uptime\"\nansible-vault encrypt secrets.yml\n```\n\n## Playbook\n```yaml\n- hosts: webservers\n  become: yes\n  vars:\n    app_port: 3000\n  tasks:\n    - name: Install packages\n      apt:\n        name: [\"nginx\", \"nodejs\"]\n        state: present\n    - name: Copy config\n      template:\n        src: nginx.conf.j2\n        dest: /etc/nginx/nginx.conf\n      notify: restart nginx\n  handlers:\n    - name: restart nginx\n      service:\n        name: nginx\n        state: restarted\n```\n\n## Inventory\n```ini\n[webservers]\nweb1 ansible_host=10.0.1.1\nweb2 ansible_host=10.0.1.2\n\n[webservers:vars]\nansible_user=deploy\n```\n\n## Rôles\n```bash\nansible-galaxy init mon-role\nansible-galaxy install geerlingguy.docker\n```', '⚙️', 'debutant', '["ansible","playbooks","automatisation"]'],
    ['Bash : Scripting', 'bash-scripting', 'Les patterns et syntaxes Bash les plus utiles.', 'systeme', '# Bash Scripting Cheat Sheet\n\n## Structure\n```bash\n#!/bin/bash\nset -euo pipefail\n\n# Variables\nNAME=\"DevOps\"\necho \"Hello $NAME\"\n```\n\n## Conditions\n```bash\nif [ -f \"$FILE\" ]; then\n  echo \"File exists\"\nelif [ -d \"$DIR\" ]; then\n  echo \"Directory exists\"\nfi\n\n[[ \"$VAR\" == \"value\" ]] && echo \"match\"\n```\n\n## Boucles\n```bash\nfor file in *.log; do\n  gzip \"$file\"\ndone\n\nwhile read -r line; do\n  echo \"$line\"\ndone < input.txt\n```\n\n## Fonctions\n```bash\nlog() {\n  echo \"[$(date +%H:%M:%S)] $*\"\n}\nlog \"Démarrage du script\"\n```\n\n## Manipulation de texte\n```bash\ngrep -r \"error\" /var/log/\nsed -i \"s/old/new/g\" file.txt\nawk -F: \"{print $1}\" /etc/passwd\ncat file.json | jq \".name\"\n```\n\n## Astuces\n```bash\n# Parallélisme\ncommand1 & command2 & wait\n# Timeout\ntimeout 30 long_command\n# Trap\ntrap cleanup EXIT\n```', '💻', 'debutant', '["bash","scripting","linux"]'],
    ['YAML : Syntaxe', 'yaml-syntaxe', 'La syntaxe YAML pour Kubernetes, Docker Compose, CI/CD.', 'iac', '# YAML Cheat Sheet\n\n## Types de base\n```yaml\nstring: \"hello\"\nnumber: 42\nfloat: 3.14\nbool: true\nnull_value: null\ndate: 2024-01-01\n```\n\n## Listes\n```yaml\nfruits:\n  - apple\n  - banana\n# Inline\nfruits: [apple, banana]\n```\n\n## Objets\n```yaml\nperson:\n  name: \"John\"\n  age: 30\n  address:\n    city: Paris\n```\n\n## Multi-ligne\n```yaml\n# Bloc (conserve newlines)\ndescription: |\n  Première ligne\n  Deuxième ligne\n\n# Fold (une seule ligne)\ndescription: >\n  Tout sur\n  une seule ligne\n```\n\n## Ancres & Alias\n```yaml\ndefaults: &defaults\n  timeout: 30\n  retries: 3\n\nproduction:\n  <<: *defaults\n  timeout: 60\n```\n\n## Variables d environnement\n```yaml\n# Docker Compose\nservices:\n  app:\n    image: app:${VERSION:-latest}\n```', '📋', 'debutant', '["yaml","syntaxe","kubernetes"]'],
    ['Réseau : Ports courants', 'reseau-ports', 'Les ports réseau les plus utilisés en DevOps.', 'network', '# Ports Réseau Cheat Sheet\n\n## Ports standards\n| Port | Service | Usage |\n|------|---------|-------|\n| 22 | SSH | Accès distant sécurisé |\n| 80 | HTTP | Web non chiffré |\n| 443 | HTTPS | Web chiffré |\n| 53 | DNS | Résolution de noms |\n| 25/587 | SMTP | Email |\n\n## Bases de données\n| Port | Service |\n|------|---------|\n| 3306 | MySQL/MariaDB |\n| 5432 | PostgreSQL |\n| 27017 | MongoDB |\n| 6379 | Redis |\n| 9200 | Elasticsearch |\n\n## DevOps Tools\n| Port | Service |\n|------|---------|\n| 8080 | Jenkins |\n| 9090 | Prometheus |\n| 3000 | Grafana |\n| 8443 | Kubernetes API |\n| 6443 | K8s API (alt) |\n| 2379 | etcd |\n| 10250 | kubelet |\n\n## Messaging\n| Port | Service |\n|------|---------|\n| 9092 | Kafka |\n| 5672 | RabbitMQ |\n| 4222 | NATS |\n\n## Cloud\n| Port | Service |\n|------|---------|\n| 8200 | Vault |\n| 8500 | Consul |\n| 4646 | Nomad |', '🔌', 'debutant', '["réseau","ports","firewall"]'],
    ['AWS : Services principaux', 'aws-services', 'Les services AWS essentiels et leur équivalent.', 'cloud', '# AWS Services Cheat Sheet\n\n## Compute\n| Service | Usage |\n|---------|-------|\n| EC2 | Machines virtuelles |\n| Lambda | Serverless functions |\n| ECS/Fargate | Conteneurs managés |\n| EKS | Kubernetes managé |\n\n## Storage\n| Service | Usage |\n|---------|-------|\n| S3 | Stockage objet |\n| EBS | Disques pour EC2 |\n| EFS | Filesystem partagé |\n| Glacier | Archivage |\n\n## Database\n| Service | Usage |\n|---------|-------|\n| RDS | SQL managé (Postgres, MySQL) |\n| DynamoDB | NoSQL serverless |\n| ElastiCache | Redis/Memcached managé |\n| Aurora | MySQL/Postgres optimisé |\n\n## Networking\n| Service | Usage |\n|---------|-------|\n| VPC | Réseau virtuel |\n| ALB/NLB | Load balancers |\n| Route 53 | DNS |\n| CloudFront | CDN |\n\n## CI/CD\n| Service | Usage |\n|---------|-------|\n| CodeBuild | Build |\n| CodeDeploy | Déploiement |\n| CodePipeline | Pipeline |\n| ECR | Registry Docker |\n\n## Monitoring\n| Service | Usage |\n|---------|-------|\n| CloudWatch | Métriques et logs |\n| X-Ray | Tracing distribué |\n| CloudTrail | Audit |\n| Config | Conformité |', '☁️', 'intermediaire', '["aws","cloud","services"]'],
    ['Sécurité : Checklist DevSecOps', 'securite-checklist', 'Checklist de sécurité pour vos pipelines et infrastructures.', 'securite', '# DevSecOps Checklist\n\n## Code\n- [ ] SAST activé (Semgrep/SonarQube)\n- [ ] Secrets detection (gitleaks/truffleHog)\n- [ ] Dependency scanning (Dependabot/Snyk)\n- [ ] Code review obligatoire\n\n## Images\n- [ ] Base image minimale (alpine/distroless)\n- [ ] Scan vulnérabilités (Trivy)\n- [ ] Utilisateur non-root\n- [ ] Pas de secrets dans l image\n- [ ] Images signées (Cosign)\n\n## Pipeline\n- [ ] OIDC au lieu de secrets statiques\n- [ ] Permissions minimales\n- [ ] Artefacts signés (SLSA)\n- [ ] Supply chain vérifié\n\n## Kubernetes\n- [ ] RBAC configuré\n- [ ] Network Policies\n- [ ] Pod Security Standards\n- [ ] Secrets chiffrés (Sealed Secrets/ESO)\n- [ ] Resource limits\n\n## Infrastructure\n- [ ] Chiffrement au repos et en transit\n- [ ] Logs centralisés\n- [ ] Backup et DR testés\n- [ ] Rotation des credentials\n- [ ] MFA activé partout\n\n## Monitoring\n- [ ] Alertes sécurité configurées\n- [ ] Audit trail activé\n- [ ] Incident response plan documenté\n- [ ] Scan périodique (Nessus/OpenVAS)', '🔒', 'intermediaire', '["sécurité","devsecops","checklist"]'],
    ['GitHub Actions : Syntaxe', 'github-actions-syntaxe', 'La syntaxe des workflows GitHub Actions.', 'cicd', '# GitHub Actions Cheat Sheet\n\n## Structure\n```yaml\nname: CI/CD\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n```\n\n## Variables\n```yaml\nenv:\n  NODE_ENV: production\nsteps:\n  - run: echo ${{ secrets.API_KEY }}\n  - run: echo ${{ github.sha }}\n  - run: echo ${{ github.ref_name }}\n```\n\n## Matrix\n```yaml\nstrategy:\n  matrix:\n    node: [18, 20, 22]\n    os: [ubuntu-latest, macos-latest]\n```\n\n## Conditions\n```yaml\n- if: github.ref == refs/heads/main\n  run: deploy.sh\n- if: contains(github.event.head_commit.message, [skip ci])\n  run: echo \"Skipped\"\n```\n\n## Docker\n```yaml\n- uses: docker/build-push-action@v5\n  with:\n    push: true\n    tags: user/app:${{ github.sha }}\n```\n\n## Cache\n```yaml\n- uses: actions/cache@v3\n  with:\n    path: node_modules\n    key: ${{ runner.os }}-node-${{ hashFiles(package-lock.json) }}\n```', '🔄', 'debutant', '["github-actions","ci-cd","yaml"]'],
    ['Helm : Charts', 'helm-charts', 'Les commandes Helm et la structure d\'un chart.', 'orchestration', '# Helm Cheat Sheet\n\n## Commandes\n```bash\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\nhelm search repo nginx\nhelm install myapp bitnami/nginx -f values.yaml\nhelm upgrade myapp bitnami/nginx\nhelm rollback myapp 1\nhelm uninstall myapp\nhelm list\n```\n\n## Structure d un chart\n```\nmychart/\n├── Chart.yaml\n├── values.yaml\n├── templates/\n│   ├── deployment.yaml\n│   ├── service.yaml\n│   ├── ingress.yaml\n│   ├── _helpers.tpl\n│   └── NOTES.txt\n└── charts/\n```\n\n## Templates\n```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ .Release.Name }}\nspec:\n  replicas: {{ .Values.replicaCount }}\n  template:\n    spec:\n      containers:\n        - name: {{ .Chart.Name }}\n          image: \"{{ .Values.image.repository }}:{{ .Values.image.tag }}\"\n```\n\n## Values\n```yaml\nreplicaCount: 3\nimage:\n  repository: nginx\n  tag: \"1.25\"\nservice:\n  type: ClusterIP\n  port: 80\n```', '⎈', 'intermediaire', '["helm","kubernetes","charts"]']
  ];

  for (const cs of cheatsheets) {
    await db.execute({
      sql: 'INSERT OR IGNORE INTO cheatsheets (title, slug, description, category, content, icon, difficulty, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      args: cs
    });
  }
  console.log('✅ Cheat Sheets créées (' + cheatsheets.length + ' fiches)');

  // Seed chapters and lessons for all courses
  await seedCoursesContent(db);

  // Seed chapters and lessons for extra courses (13-18)
  await seedExtraCourses(db);

  // Seed Citrix course content
  await seedCitrixCourse(db);

  // Seed Red Hat RHCSA/RHCE course content
  await seedRedHatCourse(db);

  // Seed more courses content (Windows Server, Python DevOps, VMware, etc.)
  await seedMoreCourses(db);

  // Seed batch 2 courses content (GCP, ELK, Jenkins, Kafka, Pulumi, Podman, Istio, HashiCorp, K8s Operators, FinOps, OpenTelemetry, GitLab)
  await seedBatch2Courses(db);

  // Seed database courses (Oracle, MySQL, PostgreSQL, DB-Server interactions)
  await seedDatabaseCourses(db);

  // Seed lesson content (educational text)
  await seedLessonContent();

  console.log('\n🎉 Seeding terminé avec succès !');
}

seed().catch((err) => {
  console.error('❌ Erreur lors du seeding:', err);
  process.exit(1);
});
