/**
 * Seed additional courses - batch 2
 */
async function seedNewCourses2(db) {
  console.log('\n📚 Insertion de nouveaux cours (batch 2)...');

  const newCourses = [
    // Conteneurisation
    ['Container Security et Hardening', 'container-security-hardening', 'Sécurisez vos conteneurs : rootless, seccomp, AppArmor, image minimale, scanning CVE et runtime protection avec Falco.', 'conteneurisation', 'avance', 24, 'Lucas Bernard', 'Docker, Linux', '["Exécuter des conteneurs rootless","Configurer seccomp et AppArmor","Créer des images distroless","Scanner avec Trivy et Grype","Runtime security avec Falco","Pod Security Standards K8s"]', 0],
    // CI/CD
    ['Tekton Pipelines - CI/CD Cloud-Native', 'tekton-pipelines-cicd', 'Construisez des pipelines CI/CD Kubernetes-natifs avec Tekton : Tasks, Pipelines, Triggers et intégration GitOps.', 'cicd', 'intermediaire', 22, 'Pierre Martin', 'Kubernetes basics', '["Architecture Tekton (Tasks, Pipelines, Runs)","Créer des Tasks personnalisées","Triggers et EventListeners","Intégration avec GitHub webhooks","Tekton Catalog et réutilisabilité","Tekton Dashboard et CLI"]', 0],
    ['Dagger - CI/CD Portable en Code', 'dagger-cicd-portable', 'Écrivez vos pipelines CI/CD en Go, Python ou TypeScript avec Dagger pour une portabilité totale entre plateformes.', 'cicd', 'intermediaire', 18, 'Marie Dupont', 'Docker, Un langage de prog', '["Comprendre l architecture Dagger","Écrire des pipelines en Python/Go/TS","Modules Dagger réutilisables","Tester localement avant le CI","Intégrer avec GitHub Actions/GitLab","Caching intelligent des étapes"]', 0],
    // Cloud
    ['Serverless Framework et AWS Lambda', 'serverless-framework-aws-lambda', 'Développez des applications serverless complètes : API Gateway, Lambda, DynamoDB, SQS, EventBridge et Step Functions.', 'cloud', 'intermediaire', 30, 'Lucas Bernard', 'AWS basics, Node.js ou Python', '["Architecture event-driven serverless","Développer avec Serverless Framework","Lambda layers et cold starts","API Gateway REST et WebSocket","Step Functions pour l orchestration","Monitoring avec X-Ray et CloudWatch"]', 1],
    ['Kubernetes sur Bare Metal avec k3s', 'kubernetes-bare-metal-k3s', 'Déployez Kubernetes en local ou sur bare metal avec k3s : homelab, edge computing et clusters légers.', 'cloud', 'debutant', 18, 'Pierre Martin', 'Linux basics', '["Installer k3s en 30 secondes","Cluster multi-nœuds avec k3sup","MetalLB pour le load balancing","Longhorn pour le stockage","Traefik Ingress intégré","Rancher pour la gestion UI"]', 0],
    // Orchestration
    ['Kubernetes Autoscaling Complet', 'kubernetes-autoscaling-complet', 'Maîtrisez tous les types d\'autoscaling K8s : HPA, VPA, Cluster Autoscaler, Karpenter et KEDA pour l\'event-driven.', 'orchestration', 'avance', 22, 'Marie Dupont', 'Kubernetes intermédiaire', '["HPA avec métriques custom et externes","VPA pour le right-sizing automatique","Cluster Autoscaler configuration","Karpenter pour le provisioning intelligent","KEDA pour le scaling event-driven","Scaling à zéro avec Knative"]', 0],
    // Monitoring
    ['Alerting et On-Call Engineering', 'alerting-oncall-engineering', 'Concevez un système d\'alerting efficace : réduction du bruit, escalation, runbooks et rotation on-call.', 'monitoring', 'intermediaire', 20, 'Lucas Bernard', 'Prometheus ou Datadog', '["Principes d un bon alerting","Alertmanager configuration avancée","PagerDuty et Opsgenie intégration","Réduire l alert fatigue","Runbooks automatisés","Rotation on-call et escalation"]', 0],
    // IaC
    ['Crossplane - Infrastructure Kubernetes-Native', 'crossplane-infrastructure-k8s', 'Provisionnez l\'infrastructure cloud directement depuis Kubernetes avec Crossplane : providers, compositions et claims.', 'iac', 'avance', 24, 'Pierre Martin', 'Kubernetes, Cloud basics', '["Architecture Crossplane et providers","Managed Resources (AWS, Azure, GCP)","Compositions et CompositeResourceDefinitions","Claims pour le self-service","GitOps avec Crossplane et ArgoCD","Platform Engineering avec Crossplane"]', 0],
    ['Packer - Images Machine Automatisées', 'packer-images-machine', 'Automatisez la création d\'images machine (AMI, VM) avec Packer : builders, provisioners, post-processors et pipelines.', 'iac', 'intermediaire', 16, 'Marie Dupont', 'Linux, Un cloud provider', '["Architecture Packer (templates HCL)","Builders AWS, Azure, GCP, Docker","Provisioners Shell et Ansible","Post-processors et artifacts","Images golden et hardened","Intégrer Packer dans les pipelines CI"]', 0],
    // Réseau
    ['Traefik - Reverse Proxy Cloud-Native', 'traefik-reverse-proxy', 'Configurez Traefik comme reverse proxy et Ingress Controller : routing, middleware, Let\'s Encrypt et observabilité.', 'network', 'intermediaire', 20, 'Lucas Bernard', 'Docker ou Kubernetes', '["Architecture Traefik et providers","Configuration dynamique (Docker, K8s, fichiers)","Routing par host, path, headers","Middleware (auth, rate limit, redirect)","Let s Encrypt automatique","Dashboards et métriques Prometheus"]', 0],
    ['Envoy Proxy et xDS', 'envoy-proxy-xds', 'Comprenez Envoy Proxy en profondeur : listeners, clusters, routes, filtres et le protocole xDS pour la configuration dynamique.', 'network', 'avance', 22, 'Marie Dupont', 'Réseau TCP/IP, HTTP', '["Architecture Envoy (listeners, clusters, routes)","Filtres HTTP et réseau","Load balancing algorithms","Circuit breaking et retry","xDS API et control plane","Envoy comme sidecar (Istio)"]', 0],
    // Système
    ['Systemd Avancé et Unit Files', 'systemd-avance-unit-files', 'Maîtrisez systemd en profondeur : unit files personnalisés, timers, socket activation, cgroups et troubleshooting.', 'systeme', 'intermediaire', 18, 'Pierre Martin', 'Linux Administration', '["Écrire des unit files personnalisés","Timers systemd (remplacement de cron)","Socket activation et on-demand services","Cgroups v2 et resource control","Journald configuration avancée","Troubleshooting avec systemd-analyze"]', 0],
    ['Proxmox VE - Virtualisation Open-Source', 'proxmox-ve-virtualisation', 'Administrez Proxmox VE : VMs KVM, conteneurs LXC, clustering, HA, Ceph storage et backup avec PBS.', 'virtualisation', 'intermediaire', 28, 'Lucas Bernard', 'Linux, Réseau', '["Installer et configurer Proxmox VE","Créer des VMs KVM et conteneurs LXC","Cluster Proxmox et HA","Stockage Ceph intégré","Proxmox Backup Server (PBS)","Templates et Cloud-Init"]', 1],
    // Automatisation
    ['Terraform Modules et Patterns Avancés', 'terraform-modules-patterns', 'Architecturez vos projets Terraform : modules composables, workspaces, testing, CI/CD et patterns enterprise.', 'iac', 'avance', 26, 'Marie Dupont', 'Terraform intermédiaire', '["Modules composables et réutilisables","Workspaces et multi-environnement","Testing avec Terratest et terraform test","CI/CD pour Terraform (Atlantis, Spacelift)","State management avancé","Patterns : hub-spoke, landing zone"]', 0],
    ['Vagrant - Environnements de Développement', 'vagrant-environnements-dev', 'Créez des environnements de développement reproductibles avec Vagrant : boxes, provisioners et multi-machine.', 'iac', 'debutant', 14, 'Pierre Martin', 'Linux basics', '["Installer Vagrant et VirtualBox","Vagrantfile et configuration","Boxes et provisioning (Shell, Ansible)","Réseaux privés et port forwarding","Environnements multi-machine","Vagrant avec Docker provider"]', 0],
    // SRE
    ['Platform Engineering et Internal Developer Platforms', 'platform-engineering-idp', 'Construisez une plateforme développeur interne (IDP) : self-service, golden paths, Backstage et portails développeurs.', 'sre', 'avance', 28, 'Lucas Bernard', 'Kubernetes, CI/CD', '["Principes du Platform Engineering","Backstage.io : portail développeur","Golden Paths et templates","Self-service infrastructure","Score et Port : plateforme abstractions","Mesurer le succès d une plateforme"]', 0],
    // GitOps
    ['FluxCD - GitOps Kubernetes', 'fluxcd-gitops-kubernetes', 'Implémentez le GitOps avec Flux v2 : source controllers, kustomizations, Helm releases et notifications.', 'gitops', 'intermediaire', 22, 'Marie Dupont', 'Kubernetes, Git', '["Architecture Flux v2 (controllers)","GitRepository et OCIRepository sources","Kustomizations et HelmReleases","Image automation (scanning, update)","Notifications (Slack, Teams, webhooks)","Multi-tenancy avec Flux"]', 0],
    // Automatisation
    ['Ansible Avancé - Rôles, Collections et AWX', 'ansible-avance-roles-awx', 'Maîtrisez Ansible à grande échelle : rôles, collections Galaxy, Ansible Vault, AWX/Tower et molecule testing.', 'automatisation', 'avance', 28, 'Pierre Martin', 'Ansible basics', '["Rôles Ansible et bonnes pratiques","Collections Ansible Galaxy","Ansible Vault et gestion des secrets","AWX/Automation Controller","Testing avec Molecule et Testinfra","Inventaires dynamiques (AWS, Azure)"]', 0],
  ];

  for (const c of newCourses) {
    await db.execute({
      sql: 'INSERT OR IGNORE INTO courses (title, slug, description, category, level, duration_hours, instructor, prerequisites, learning_outcomes, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: c
    });
  }
  console.log('✅ ' + newCourses.length + ' nouveaux cours insérés');
}

module.exports = { seedNewCourses2 };
