require('dotenv').config();
const { getDb } = require('./connection');
const bcrypt = require('bcryptjs');

async function seed() {
  const db = getDb();
  console.log('🌱 Seeding database...');

  // Seed admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  await db.execute({
    sql: `INSERT OR IGNORE INTO users (email, password_hash, name, role, plan) VALUES (?, ?, ?, ?, ?)`,
    args: ['admin@devops-expert.com', passwordHash, 'Admin DevOps', 'admin', 'enterprise']
  });

  // Seed courses
  const courses = [
    {
      slug: 'docker-masterclass',
      title: 'Docker & Containerisation Masterclass',
      description: 'De zéro à expert Docker: images, réseaux, volumes, Compose, sécurité et production.',
      short_description: 'Maîtrisez Docker de A à Z',
      icon: 'fab fa-docker',
      level: 'intermediaire',
      duration_hours: 40,
      video_count: 120,
      lab_count: 25,
      project_count: 5,
      price: 49,
      original_price: 199,
      category: 'containers',
      badge: 'bestseller',
      rating: 4.9
    },
    {
      slug: 'kubernetes-production',
      title: 'Kubernetes: Administration & Production',
      description: 'Déployez, gérez et scalez vos applications sur Kubernetes en environnement de production.',
      short_description: 'Kubernetes en production',
      icon: 'fas fa-dharmachakra',
      level: 'avance',
      duration_hours: 60,
      video_count: 180,
      lab_count: 35,
      project_count: 8,
      price: 79,
      original_price: 299,
      category: 'containers',
      badge: 'new',
      rating: 4.8
    },
    {
      slug: 'terraform-iac',
      title: 'Terraform: Infrastructure as Code',
      description: 'Automatisez votre infrastructure cloud avec Terraform: modules, state, workspaces et CI/CD.',
      short_description: 'IaC avec Terraform',
      icon: 'fas fa-cubes',
      level: 'avance',
      duration_hours: 35,
      video_count: 95,
      lab_count: 20,
      project_count: 4,
      price: 59,
      original_price: 249,
      category: 'iac',
      badge: null,
      rating: 4.9
    },
    {
      slug: 'observabilite-monitoring',
      title: 'Observabilité: Prometheus, Grafana & ELK',
      description: 'Monitoring, alerting, dashboards et logging centralisé pour vos infrastructures.',
      short_description: 'Monitoring complet',
      icon: 'fas fa-chart-line',
      level: 'avance',
      duration_hours: 30,
      video_count: 85,
      lab_count: 18,
      project_count: 3,
      price: 49,
      original_price: 199,
      category: 'monitoring',
      badge: null,
      rating: 4.7
    },
    {
      slug: 'cicd-pipelines',
      title: 'CI/CD: Du Commit au Déploiement',
      description: 'Jenkins, GitHub Actions, GitLab CI, ArgoCD: construisez des pipelines robustes et scalables.',
      short_description: 'Pipelines CI/CD',
      icon: 'fas fa-sync-alt',
      level: 'intermediaire',
      duration_hours: 45,
      video_count: 130,
      lab_count: 30,
      project_count: 6,
      price: 69,
      original_price: 249,
      category: 'cicd',
      badge: 'popular',
      rating: 4.8
    },
    {
      slug: 'devsecops',
      title: 'DevSecOps: Sécurité dans le Pipeline',
      description: 'SAST, DAST, container security, supply chain, secrets management et compliance automatisée.',
      short_description: 'Sécurité DevOps',
      icon: 'fas fa-shield-alt',
      level: 'expert',
      duration_hours: 35,
      video_count: 100,
      lab_count: 22,
      project_count: 5,
      price: 79,
      original_price: 299,
      category: 'security',
      badge: 'new',
      rating: 4.9
    }
  ];

  for (const course of courses) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO courses (slug, title, description, short_description, icon, level, duration_hours, video_count, lab_count, project_count, price, original_price, category, badge, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [course.slug, course.title, course.description, course.short_description, course.icon, course.level, course.duration_hours, course.video_count, course.lab_count, course.project_count, course.price, course.original_price, course.category, course.badge, course.rating]
    });
  }

  // Seed labs
  const labs = [
    { slug: 'premier-conteneur', title: 'Créer votre premier conteneur', description: 'Apprenez à construire et exécuter un conteneur Docker avec une application Node.js.', icon: 'fab fa-docker', difficulty: 'facile', duration_minutes: 30, technologies: 'Docker,Node.js,Dockerfile', completion_count: 3240 },
    { slug: 'deployer-kubernetes', title: 'Déployer sur Kubernetes', description: 'Déployez une application multi-services sur un cluster Kubernetes avec Helm.', icon: 'fas fa-dharmachakra', difficulty: 'moyen', duration_minutes: 45, technologies: 'Kubernetes,Helm,YAML', completion_count: 2180 },
    { slug: 'pipeline-cicd', title: 'Pipeline CI/CD complet', description: 'Construisez un pipeline CI/CD avec GitHub Actions: build, test, deploy automatisé.', icon: 'fas fa-sync-alt', difficulty: 'moyen', duration_minutes: 60, technologies: 'GitHub Actions,Docker,AWS', completion_count: 1890 },
    { slug: 'infra-multicloud', title: 'Infrastructure Multi-Cloud', description: 'Créez une infrastructure multi-cloud avec Terraform: VPC, EKS, monitoring et alerting.', icon: 'fas fa-cubes', difficulty: 'difficile', duration_minutes: 90, technologies: 'Terraform,AWS,Prometheus', completion_count: 945 },
    { slug: 'audit-securite-k8s', title: 'Audit de sécurité K8s', description: 'Identifiez et corrigez les vulnérabilités d\'un cluster Kubernetes en production.', icon: 'fas fa-shield-alt', difficulty: 'difficile', duration_minutes: 120, technologies: 'Kubernetes,Trivy,OPA', completion_count: 620 },
    { slug: 'chaos-engineering', title: 'Chaos Engineering', description: 'Injectez du chaos dans votre infrastructure et validez la résilience de vos services.', icon: 'fas fa-fire', difficulty: 'expert', duration_minutes: 180, technologies: 'Litmus,Kubernetes,Grafana', completion_count: 380 }
  ];

  for (const lab of labs) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO labs (slug, title, description, icon, difficulty, duration_minutes, technologies, completion_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [lab.slug, lab.title, lab.description, lab.icon, lab.difficulty, lab.duration_minutes, lab.technologies, lab.completion_count]
    });
  }

  // Seed tools
  const tools = [
    { name: 'Docker', slug: 'docker', description: 'Plateforme de conteneurisation', icon: 'fab fa-docker', category: 'containers', popularity: 95 },
    { name: 'Kubernetes', slug: 'kubernetes', description: 'Orchestration de containers', icon: 'fas fa-dharmachakra', category: 'containers', popularity: 88 },
    { name: 'Jenkins', slug: 'jenkins', description: 'Serveur d\'automatisation', icon: 'fab fa-jenkins', category: 'cicd', popularity: 75 },
    { name: 'GitHub Actions', slug: 'github-actions', description: 'CI/CD intégré à GitHub', icon: 'fab fa-github', category: 'cicd', popularity: 82 },
    { name: 'Terraform', slug: 'terraform', description: 'Infrastructure as Code', icon: 'fas fa-cubes', category: 'iac', popularity: 85 },
    { name: 'Ansible', slug: 'ansible', description: 'Automatisation & Configuration', icon: 'fas fa-cogs', category: 'iac', popularity: 78 },
    { name: 'Prometheus', slug: 'prometheus', description: 'Monitoring & Alerting', icon: 'fas fa-fire', category: 'monitoring', popularity: 80 },
    { name: 'Grafana', slug: 'grafana', description: 'Visualisation & Dashboards', icon: 'fas fa-chart-area', category: 'monitoring', popularity: 83 },
    { name: 'AWS', slug: 'aws', description: 'Amazon Web Services', icon: 'fab fa-aws', category: 'cloud', popularity: 90 },
    { name: 'Azure', slug: 'azure', description: 'Microsoft Cloud', icon: 'fab fa-microsoft', category: 'cloud', popularity: 65 },
    { name: 'HashiCorp Vault', slug: 'vault', description: 'Gestion des secrets', icon: 'fas fa-key', category: 'security', popularity: 70 },
    { name: 'Trivy', slug: 'trivy', description: 'Scanner de vulnérabilités', icon: 'fas fa-shield-virus', category: 'security', popularity: 62 }
  ];

  for (const tool of tools) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO tools (name, slug, description, icon, category, popularity) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [tool.name, tool.slug, tool.description, tool.icon, tool.category, tool.popularity]
    });
  }

  // Seed certifications
  const certs = [
    { slug: 'cka', title: 'CKA - Certified Kubernetes Administrator', description: 'Administration de clusters Kubernetes en production', icon: 'fas fa-dharmachakra', provider: 'CNCF', prep_hours: 40, exercise_count: 150, success_rate: 96 },
    { slug: 'ckad', title: 'CKAD - Certified Kubernetes Application Developer', description: 'Développement et déploiement d\'applications sur Kubernetes', icon: 'fas fa-dharmachakra', provider: 'CNCF', prep_hours: 35, exercise_count: 120, success_rate: 94 },
    { slug: 'terraform-associate', title: 'HashiCorp Terraform Associate', description: 'Infrastructure as Code avec Terraform', icon: 'fas fa-cubes', provider: 'HashiCorp', prep_hours: 25, exercise_count: 200, success_rate: 97 },
    { slug: 'aws-devops-pro', title: 'AWS DevOps Engineer Professional', description: 'DevOps sur l\'écosystème Amazon Web Services', icon: 'fab fa-aws', provider: 'AWS', prep_hours: 50, exercise_count: 300, success_rate: 92 },
    { slug: 'lfcs', title: 'LFCS - Linux Foundation Certified Sysadmin', description: 'Administration système Linux avancée', icon: 'fab fa-linux', provider: 'Linux Foundation', prep_hours: 30, exercise_count: 100, success_rate: 95 },
    { slug: 'cks', title: 'CKS - Certified Kubernetes Security Specialist', description: 'Sécurité avancée sur Kubernetes', icon: 'fas fa-shield-alt', provider: 'CNCF', prep_hours: 45, exercise_count: 130, success_rate: 91 }
  ];

  for (const cert of certs) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO certifications (slug, title, description, icon, provider, prep_hours, exercise_count, success_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [cert.slug, cert.title, cert.description, cert.icon, cert.provider, cert.prep_hours, cert.exercise_count, cert.success_rate]
    });
  }

  // Seed blog posts
  const posts = [
    { slug: 'kubernetes-1-31-nouveautes', title: 'Kubernetes 1.31: Les nouveautés qui changent la donne', excerpt: 'Découvrez les nouvelles fonctionnalités de Kubernetes 1.31: sidecar containers natifs, améliorations de l\'autoscaling et nouvelles API.', category: 'Kubernetes', image_icon: 'fas fa-dharmachakra', read_time_minutes: 12, is_featured: 1 },
    { slug: 'aiops-ia-devops-2026', title: 'AIOps: L\'IA au service du DevOps en 2026', excerpt: 'Comment l\'intelligence artificielle transforme les pratiques DevOps: de l\'incident management au capacity planning.', category: 'AI/DevOps', image_icon: 'fas fa-robot', read_time_minutes: 8, is_featured: 0 },
    { slug: 'supply-chain-security', title: 'Supply Chain Security: Protégez votre pipeline', excerpt: 'SBOM, signatures d\'images, attestations: les pratiques essentielles pour sécuriser votre supply chain logicielle.', category: 'Sécurité', image_icon: 'fas fa-shield-alt', read_time_minutes: 10, is_featured: 0 },
    { slug: 'green-devops', title: 'Green DevOps: Réduire l\'empreinte carbone', excerpt: 'Optimisez vos pipelines et infrastructures pour réduire leur impact environnemental sans sacrifier la performance.', category: 'Green IT', image_icon: 'fas fa-leaf', read_time_minutes: 7, is_featured: 0 }
  ];

  for (const post of posts) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO posts (slug, title, excerpt, category, image_icon, read_time_minutes, is_featured, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      args: [post.slug, post.title, post.excerpt, post.category, post.image_icon, post.read_time_minutes, post.is_featured]
    });
  }

  // Seed roadmap
  const roadmapItems = [
    { order_index: 1, title: 'Linux & Scripting', description: 'Maîtrisez les bases de Linux, le shell scripting (Bash), les commandes essentielles et l\'administration système.', level: 'fondamentaux', duration_weeks: 4, skills: 'Linux,Bash,SSH,Networking,Permissions', progress_default: 100 },
    { order_index: 2, title: 'Git & Versioning', description: 'Comprenez le versioning, les workflows Git (GitFlow, Trunk-based), les Pull Requests et la collaboration.', level: 'fondamentaux', duration_weeks: 3, skills: 'Git,GitHub,GitLab,Branching,Merge', progress_default: 85 },
    { order_index: 3, title: 'Containers & Docker', description: 'Apprenez la conteneurisation, Docker, Docker Compose, les registries et les bonnes pratiques de build.', level: 'intermediaire', duration_weeks: 5, skills: 'Docker,Dockerfile,Compose,Registry,Multi-stage', progress_default: 70 },
    { order_index: 4, title: 'CI/CD Pipelines', description: 'Construisez des pipelines automatisés avec Jenkins, GitHub Actions, GitLab CI et ArgoCD.', level: 'intermediaire', duration_weeks: 6, skills: 'Jenkins,GitHub Actions,GitLab CI,ArgoCD,Webhooks', progress_default: 55 },
    { order_index: 5, title: 'Kubernetes & Orchestration', description: 'Maîtrisez Kubernetes, Helm, les opérateurs, le service mesh (Istio) et la gestion multi-clusters.', level: 'avance', duration_weeks: 8, skills: 'Kubernetes,Helm,Istio,Operators,HPA', progress_default: 40 },
    { order_index: 6, title: 'Infrastructure as Code', description: 'Automatisez votre infrastructure avec Terraform, Ansible, Pulumi et les pratiques GitOps.', level: 'avance', duration_weeks: 6, skills: 'Terraform,Ansible,Pulumi,CloudFormation,GitOps', progress_default: 30 },
    { order_index: 7, title: 'Observabilité & SRE', description: 'Implémentez le monitoring, le logging, le tracing distribué et les pratiques SRE (SLO, SLI, Error Budgets).', level: 'expert', duration_weeks: 8, skills: 'Prometheus,Grafana,ELK,Jaeger,SRE', progress_default: 15 },
    { order_index: 8, title: 'Sécurité & DevSecOps', description: 'Intégrez la sécurité dans le pipeline: SAST, DAST, supply chain security, secrets management et compliance.', level: 'expert', duration_weeks: 6, skills: 'Vault,Trivy,SAST/DAST,OPA,SBOM', progress_default: 10 }
  ];

  for (const item of roadmapItems) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO roadmap_items (order_index, title, description, level, duration_weeks, skills, progress_default) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [item.order_index, item.title, item.description, item.level, item.duration_weeks, item.skills, item.progress_default]
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('   - 1 admin user');
  console.log(`   - ${courses.length} courses`);
  console.log(`   - ${labs.length} labs`);
  console.log(`   - ${tools.length} tools`);
  console.log(`   - ${certs.length} certifications`);
  console.log(`   - ${posts.length} blog posts`);
  console.log(`   - ${roadmapItems.length} roadmap items`);
}

seed().catch(console.error);
