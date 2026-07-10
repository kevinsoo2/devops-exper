const { getDb } = require('./connection');
const bcrypt = require('bcryptjs');
const { seedCoursesContent } = require('./seed-courses-content');
const { seedLessonContent } = require('./seed-lesson-content');
const { seedExtraCourses } = require('./seed-extra-courses');
const { seedCitrixCourse } = require('./seed-citrix');
const { seedMoreCourses } = require('./seed-more-courses');
const { seedBatch2Courses } = require('./seed-batch2-courses');
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
    ['Créer votre premier conteneur Docker', 'premier-conteneur-docker', 'Apprenez à créer, exécuter et gérer des conteneurs Docker.', 'conteneurisation', 'facile', 30, 'docker', 'Suivez les étapes pour créer une image et lancer un conteneur.', 15],
    ['Déployer une app sur Kubernetes', 'deployer-app-kubernetes', 'Déployez une application multi-conteneur sur un cluster K8s.', 'orchestration', 'moyen', 60, 'kubernetes', 'Créez des Deployments, Services et Ingress.', 30],
    ['Pipeline CI/CD complet', 'pipeline-cicd-complet', 'Construisez un pipeline CI/CD de bout en bout.', 'cicd', 'moyen', 45, 'docker', 'Build, test, et deploy automatisé.', 25],
    ['Infrastructure Terraform', 'infrastructure-terraform', 'Provisionnez une infrastructure cloud avec Terraform.', 'iac', 'moyen', 50, 'terraform', 'Créez des ressources cloud avec du code.', 30],
    ['Monitoring Stack', 'monitoring-stack', 'Mettez en place Prometheus + Grafana pour monitorer vos services.', 'monitoring', 'difficile', 75, 'docker', 'Configurez alertes et dashboards.', 40],
    ['Sécuriser un cluster Kubernetes', 'securiser-cluster-k8s', 'Appliquez les bonnes pratiques de sécurité sur K8s.', 'securite', 'difficile', 90, 'kubernetes', 'RBAC, Network Policies, Pod Security.', 50],
    ['Ansible Playbooks', 'ansible-playbooks', 'Automatisez la configuration de serveurs avec Ansible.', 'iac', 'facile', 35, 'ansible', 'Écrivez des playbooks pour configurer des serveurs.', 20],
    ['GitOps Workflow', 'gitops-workflow', 'Implémentez un workflow GitOps avec ArgoCD.', 'gitops', 'difficile', 60, 'kubernetes', 'Déployez via Git avec ArgoCD.', 45]
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
    ['Linux Foundation Certified System Administrator (LFCS)', 'lfcs', 'Certification d\'administration système Linux.', 'Linux Foundation', 'systeme', 'intermediaire', 2, 395, 2, 'Bases Linux', '["Commandes essentielles","Filesystem","Networking","Service management","Security"]', '["Linux man pages","The Linux Foundation training"]', 0]
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

  // Seed chapters and lessons for all courses
  await seedCoursesContent(db);

  // Seed chapters and lessons for extra courses (13-18)
  await seedExtraCourses(db);

  // Seed Citrix course content
  await seedCitrixCourse(db);

  // Seed more courses content (Windows Server, Python DevOps, VMware, etc.)
  await seedMoreCourses(db);

  // Seed batch 2 courses content (GCP, ELK, Jenkins, Kafka, Pulumi, Podman, Istio, HashiCorp, K8s Operators, FinOps, OpenTelemetry, GitLab)
  await seedBatch2Courses(db);

  // Seed lesson content (educational text)
  await seedLessonContent();

  console.log('\n🎉 Seeding terminé avec succès !');
}

seed().catch((err) => {
  console.error('❌ Erreur lors du seeding:', err);
  process.exit(1);
});
