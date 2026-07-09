const { getDb } = require('./connection');
require('dotenv').config();

/**
 * Generates detailed educational content in French based on lesson context.
 * Maps keywords in lesson titles to comprehensive markdown-formatted text.
 */
function generateContent(lessonTitle, chapterTitle, courseTitle) {
  const title = lessonTitle.toLowerCase();
  const chapter = chapterTitle.toLowerCase();
  const course = courseTitle.toLowerCase();

  // Docker content
  if (course.includes('docker')) {
    if (title.includes('histoire') && title.includes('conteneur')) {
      return getDockerHistoryContent();
    }
    if (title.includes('vm') && title.includes('conteneur')) {
      return getVMvsContainersContent();
    }
    if (title.includes('architecture docker') || title.includes('daemon')) {
      return getDockerArchitectureContent();
    }
    if (title.includes('installation')) {
      return getDockerInstallationContent();
    }
    if (title.includes('premier conteneur') || title.includes('lancer votre premier')) {
      return getFirstContainerContent();
    }
    if (title.includes('dockerfile') && !title.includes('best practice')) {
      return getDockerfileContent();
    }
    if (title.includes('multi-stage')) {
      return getMultiStageContent();
    }
    if (title.includes('optimisation')) {
      return getDockerOptimizationContent();
    }
    if (title.includes('docker hub') || title.includes('registr')) {
      return getDockerHubContent();
    }
    if (title.includes('volume') || title.includes('types de volumes')) {
      return getDockerVolumesContent();
    }
    if (title.includes('réseau') || title.includes('types de réseaux') || title.includes('bridge')) {
      return getDockerNetworkContent();
    }
    if (title.includes('compose') && (title.includes('syntaxe') || title.includes('yaml'))) {
      return getDockerComposeContent();
    }
    if (title.includes('sécurité') && title.includes('docker') || title.includes('bonnes pratiques de sécurité docker')) {
      return getDockerSecurityContent();
    }
  }


  // Kubernetes content
  if (course.includes('kubernetes')) {
    if (title.includes('architecture') && title.includes('kubernetes')) {
      return getK8sArchitectureContent();
    }
    if (title.includes('control plane') || title.includes('cerveau')) {
      return getK8sControlPlaneContent();
    }
    if (title.includes('définition') && title.includes('pod') || title.includes('anatomie')) {
      return getK8sPodsContent();
    }
    if (title.includes('deployment') && title.includes('déclaratif')) {
      return getK8sDeploymentsContent();
    }
    if (title.includes('clusterip') || (title.includes('service') && title.includes('interne'))) {
      return getK8sServicesContent();
    }
    if (title.includes('ingress') && title.includes('routing')) {
      return getK8sIngressContent();
    }
    if (title.includes('configmaps') || title.includes('configuration externalisée')) {
      return getK8sConfigMapsContent();
    }
    if (title.includes('secrets') && title.includes('données sensibles')) {
      return getK8sSecretsContent();
    }
    if (title.includes('rbac') || title.includes('serviceaccounts') || title.includes('roles et permissions')) {
      return getK8sRBACContent();
    }
    if (title.includes('helm') && title.includes('introduction')) {
      return getK8sHelmContent();
    }
  }


  // Networking content
  if (course.includes('réseau') || course.includes('network')) {
    if (title.includes('modèle osi') || title.includes('7 couches')) {
      return getOSIModelContent();
    }
    if (title.includes('tcp/ip') || title.includes('architecture internet')) {
      return getTCPIPContent();
    }
    if (title.includes('dns') && (title.includes('architecture') || title.includes('hiérarchie'))) {
      return getDNSContent();
    }
    if (title.includes('http') && (title.includes('méthodes') || title.includes('headers'))) {
      return getHTTPContent();
    }
    if (title.includes('subnetting') || title.includes('cidr')) {
      return getSubnettingContent();
    }
    if (title.includes('iptables') || title.includes('chaînes')) {
      return getFirewallContent();
    }
    if (title.includes('load balancing') || title.includes('l4 vs l7')) {
      return getLoadBalancingContent();
    }
  }

  // Linux content
  if (course.includes('linux') || course.includes('système')) {
    if (title.includes('shell') || title.includes('bash') && title.includes('introduction')) {
      return getShellBashContent();
    }
    if (title.includes('permissions') && (title.includes('rwx') || title.includes('octale'))) {
      return getPermissionsContent();
    }
    if (title.includes('processus') && (title.includes('ps') || title.includes('top'))) {
      return getProcessContent();
    }
    if (title.includes('hiérarchie') || title.includes('fhs')) {
      return getFilesystemContent();
    }
    if (title.includes('systemd') && title.includes('architecture')) {
      return getSystemdContent();
    }
  }


  // Terraform content
  if (course.includes('terraform')) {
    if (title.includes('blocs') && title.includes('hcl') || title.includes('structure du code')) {
      return getTerraformHCLContent();
    }
    if (title.includes('state') && title.includes('local') || title.includes('comprendre le state')) {
      return getTerraformStateContent();
    }
    if (title.includes('module') && title.includes('création')) {
      return getTerraformModulesContent();
    }
  }

  // CI/CD content
  if (course.includes('ci/cd') || course.includes('github actions')) {
    if (title.includes('triggers') || title.includes('events')) {
      return getGitHubActionsContent();
    }
    if (title.includes('concepts de pipeline') || title.includes('stages')) {
      return getPipelineDesignContent();
    }
  }

  // Monitoring content
  if (course.includes('monitoring') || course.includes('prometheus')) {
    if (title.includes('architecture prometheus') || title.includes('pull model')) {
      return getPrometheusContent();
    }
    if (title.includes('datasources') || title.includes('création de dashboards')) {
      return getGrafanaContent();
    }
  }

  // Security content
  if (course.includes('devsecops') || course.includes('sécurité')) {
    if (title.includes('sast') || title.includes('analyse statique')) {
      return getSASTDASTContent();
    }
    if (title.includes('image scanning') || title.includes('trivy')) {
      return getContainerScanningContent();
    }
    if (title.includes('vault') && title.includes('architecture')) {
      return getSecretsManagementContent();
    }
  }

  // SRE content
  if (course.includes('sre') || course.includes('fiabilité')) {
    if (title.includes('slo') || title.includes('sli') && title.includes('indicateurs')) {
      return getSLOSLIContent();
    }
    if (title.includes('incident') && (title.includes('processus') || title.includes('management'))) {
      return getIncidentManagementContent();
    }
  }

  // Generic fallback based on broader context
  return generateGenericContent(lessonTitle, chapterTitle, courseTitle);
}



// ============================================================
// DOCKER CONTENT FUNCTIONS
// ============================================================

function getDockerHistoryContent() {
  return `# Histoire des conteneurs et évolution

## Les origines : chroot (1979)

L'histoire de la conteneurisation commence avec \`chroot\` sous Unix en 1979. Cette commande permet d'isoler le système de fichiers d'un processus en changeant son répertoire racine. Bien que limitée (pas d'isolation réseau ni de contrôle des ressources), elle pose les bases de l'isolation applicative.

\`\`\`bash
# Exemple historique de chroot
chroot /nouvelle/racine /bin/bash
\`\`\`

## FreeBSD Jails (2000)

FreeBSD introduit les **Jails** en 2000, offrant une isolation plus complète : système de fichiers, réseau et processus. C'est le premier véritable système de conteneurisation complet.

## Linux Containers - LXC (2008)

**LXC** combine les namespaces Linux et les cgroups pour fournir un environnement de conteneurisation léger. Il utilise :
- **Namespaces** : isolation des processus (PID), réseau, montages, utilisateurs
- **Cgroups** : limitation des ressources CPU, mémoire, I/O

## La révolution Docker (2013)

Docker, créé par Solomon Hykes chez dotCloud, révolutionne la conteneurisation en apportant :
- **Portabilité** : "Build once, run anywhere"
- **Images en couches** : système de layers avec copy-on-write
- **Dockerfile** : format déclaratif pour construire des images
- **Docker Hub** : registry centralisé pour partager les images
- **Simplicité** : API et CLI intuitives

## Le standard OCI (2015)

L'**Open Container Initiative** (OCI) standardise les formats de conteneurs et runtimes :
- **runtime-spec** : comment exécuter un conteneur
- **image-spec** : format des images de conteneur
- **distribution-spec** : comment distribuer les images

Aujourd'hui, Docker reste l'outil le plus populaire, mais des alternatives compatibles OCI existent : **Podman**, **containerd**, **CRI-O**.`;
}


function getVMvsContainersContent() {
  return `# VM vs Conteneurs : comprendre les différences

## Architecture des machines virtuelles

Une **machine virtuelle** (VM) repose sur un **hyperviseur** (Type 1 : bare-metal ou Type 2 : hosted) qui émule un matériel complet :

- **Hyperviseur Type 1** : VMware ESXi, Hyper-V, KVM — directement sur le matériel
- **Hyperviseur Type 2** : VirtualBox, VMware Workstation — sur un OS hôte

Chaque VM embarque :
- Un OS complet (noyau + espace utilisateur)
- Des drivers virtualisés
- Une allocation dédiée de CPU, RAM, stockage

## Architecture des conteneurs

Un **conteneur** partage le noyau Linux de l'hôte et utilise :
- **Namespaces** : isolation logique (PID, NET, MNT, UTS, IPC, USER)
- **Cgroups** : limitation et comptabilité des ressources
- **Union filesystem** : superposition de couches en lecture seule + une couche R/W

\`\`\`
┌─── Machine Virtuelle ───┐    ┌──── Conteneur ─────────┐
│  ┌─────┐ ┌─────┐       │    │  ┌─────┐ ┌─────┐      │
│  │App 1│ │App 2│       │    │  │App 1│ │App 2│      │
│  ├─────┤ ├─────┤       │    │  ├─────┤ ├─────┤      │
│  │Bins │ │Bins │       │    │  │Bins │ │Bins │      │
│  │Libs │ │Libs │       │    │  │Libs │ │Libs │      │
│  ├─────┴─┴─────┤       │    │  └──┬──┘ └──┬──┘      │
│  │  Guest OS   │       │    │     │        │         │
│  │  (complet)  │       │    │  ┌──▼────────▼──┐      │
│  └─────────────┘       │    │  │Container Runt│      │
│  ┌─────────────────┐   │    │  │  (Docker)    │      │
│  │   Hypervisor    │   │    │  └──────────────┘      │
│  └─────────────────┘   │    │  ┌──────────────────┐  │
│  ┌─────────────────┐   │    │  │   Host OS Kernel │  │
│  │    Host OS      │   │    │  └──────────────────┘  │
│  └─────────────────┘   │    │  ┌──────────────────┐  │
│  ┌─────────────────┐   │    │  │    Hardware      │  │
│  │    Hardware     │   │    │  └──────────────────┘  │
└─────────────────────────┘    └────────────────────────┘
   ~1-50 GB par VM                ~10-500 MB par conteneur
   Démarrage: 30s-2min           Démarrage: < 1 seconde
\`\`\`

## Comparaison détaillée

| Critère | VM | Conteneur |
|---------|-----|-----------|
| Démarrage | 30s à 2min | < 1 seconde |
| Taille | 1-50 GB | 10-500 MB |
| Isolation | Forte (hyperviseur) | Modérée (noyau partagé) |
| Performance | Overhead ~5-10% | Quasi-native |
| Densité | 10-20 par hôte | 100-1000 par hôte |
| Portabilité | Limitée | Excellente |

## Quand utiliser quoi ?

**VMs** : isolation forte requise, OS différents, workloads legacy, conformité stricte.

**Conteneurs** : microservices, CI/CD, scaling rapide, environnements de dev, applications cloud-native.

\`\`\`bash
# Un conteneur démarre en millisecondes
time docker run --rm alpine echo "Hello"
# real 0m0.432s
\`\`\`

En pratique, les deux coexistent souvent : des conteneurs tournent dans des VMs pour combiner isolation et agilité.`;
}


function getDockerArchitectureContent() {
  return `# Architecture Docker : daemon, client, registry

## Vue d'ensemble

Docker utilise une architecture **client-serveur** composée de trois éléments principaux :

\\\`\\\`\\\`
┌──────────────────────────────────────────────────┐
│                  Docker Client                    │
│              (docker CLI / API)                   │
└──────────────────────┬───────────────────────────┘
                       │ REST API
┌──────────────────────▼───────────────────────────┐
│                Docker Daemon (dockerd)             │
│  ┌─────────┐  ┌──────────┐  ┌────────────────┐  │
│  │ Images  │  │Containers│  │   Networks     │  │
│  └─────────┘  └──────────┘  └────────────────┘  │
│  ┌─────────┐  ┌──────────┐  ┌────────────────┐  │
│  │Volumes  │  │  Builder │  │   Plugins      │  │
│  └─────────┘  └──────────┘  └────────────────┘  │
└──────────────────────┬───────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────┐
│              Docker Registry                      │
│         (Docker Hub / Private Registry)           │
└──────────────────────────────────────────────────┘
\\\`\\\`\\\`

## 1. Docker Daemon (dockerd)

Le **daemon Docker** est le processus serveur qui gère les objets Docker :
- Écoute sur un socket Unix (\`/var/run/docker.sock\`) ou TCP
- Gère le cycle de vie des conteneurs, images, volumes et réseaux
- Communique avec d'autres daemons pour les services Swarm

\`\`\`bash
# Vérifier le status du daemon
sudo systemctl status docker
# Le daemon écoute par défaut sur
# unix:///var/run/docker.sock
\`\`\`

## 2. Docker Client (docker CLI)

Le **client** est l'interface utilisateur qui envoie des commandes au daemon via l'API REST :

\`\`\`bash
# Le client communique avec le daemon
docker info          # Informations système
docker version       # Version client/serveur
DOCKER_HOST=tcp://remote:2375 docker ps  # Client distant
\`\`\`

## 3. Docker Registry

Le **registry** stocke et distribue les images Docker :
- **Docker Hub** : registry public par défaut
- **Registries privés** : Harbor, GitLab CR, AWS ECR, GCR
- Les images sont identifiées par \`registry/namespace/image:tag\`

## Objets Docker

- **Images** : templates en lecture seule, composées de couches (layers)
- **Conteneurs** : instances exécutables d'une image
- **Volumes** : persistance des données
- **Réseaux** : communication entre conteneurs

## Flux d'exécution

1. L'utilisateur tape \`docker run nginx\`
2. Le client envoie la requête au daemon
3. Le daemon vérifie si l'image existe localement
4. Si non, il la télécharge depuis le registry
5. Le daemon crée et démarre le conteneur
6. Le conteneur s'exécute avec son processus principal`;
}


function getDockerInstallationContent() {
  return `# Installation de Docker sur Linux/Mac/Windows

## Installation sur Linux (Ubuntu/Debian)

\`\`\`bash
# 1. Supprimer les anciennes versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. Installer les prérequis
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

# 3. Ajouter la clé GPG officielle Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 4. Ajouter le dépôt Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list

# 5. Installer Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 6. Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER
\`\`\`

## Installation sur macOS

Téléchargez **Docker Desktop** depuis docker.com. Il inclut :
- Docker Engine dans une VM Linux légère (HyperKit ou Apple Virtualization)
- Docker CLI et Docker Compose
- Interface graphique de gestion

## Installation sur Windows

**Docker Desktop** pour Windows utilise WSL2 (Windows Subsystem for Linux) :
1. Activez WSL2 et la virtualisation dans le BIOS
2. Installez Docker Desktop
3. Configurez l'intégration WSL2

## Vérification de l'installation

\`\`\`bash
# Vérifier la version
docker --version
docker compose version

# Tester avec un conteneur
docker run hello-world

# Informations système complètes
docker info
\`\`\`

## Post-installation Linux

\`\`\`bash
# Démarrage automatique au boot
sudo systemctl enable docker
# Vérifier que le daemon fonctionne
sudo systemctl status docker
\`\`\``;
}


function getFirstContainerContent() {
  return `# Lancer votre premier conteneur

## docker run : la commande fondamentale

La commande \`docker run\` crée et démarre un conteneur à partir d'une image :

\`\`\`bash
# Syntaxe de base
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

# Premier conteneur - affiche un message et s'arrête
docker run hello-world

# Conteneur interactif avec un shell
docker run -it ubuntu bash

# Conteneur en arrière-plan (détaché)
docker run -d --name mon-nginx -p 8080:80 nginx
\`\`\`

## Options essentielles de docker run

| Option | Description |
|--------|-------------|
| \`-d\` | Mode détaché (arrière-plan) |
| \`-it\` | Mode interactif avec terminal |
| \`--name\` | Nom personnalisé du conteneur |
| \`-p host:container\` | Mapping de ports |
| \`-v host:container\` | Montage de volume |
| \`-e VAR=value\` | Variable d'environnement |
| \`--rm\` | Supprime le conteneur à l'arrêt |

## Gestion des conteneurs

\`\`\`bash
# Lister les conteneurs actifs
docker ps

# Lister tous les conteneurs (actifs + arrêtés)
docker ps -a

# Arrêter un conteneur (signal SIGTERM puis SIGKILL)
docker stop mon-nginx

# Démarrer un conteneur arrêté
docker start mon-nginx

# Supprimer un conteneur arrêté
docker rm mon-nginx

# Forcer la suppression (même en cours d'exécution)
docker rm -f mon-nginx

# Voir les logs d'un conteneur
docker logs -f mon-nginx

# Exécuter une commande dans un conteneur actif
docker exec -it mon-nginx bash
\`\`\`

## Exemple pratique complet

\`\`\`bash
# Lancer un serveur web Nginx
docker run -d --name web -p 8080:80 nginx

# Vérifier qu'il fonctionne
curl http://localhost:8080

# Voir les processus dans le conteneur
docker top web

# Inspecter la configuration complète
docker inspect web

# Nettoyer
docker stop web && docker rm web
\`\`\``;
}


function getDockerfileContent() {
  return `# Comprendre le Dockerfile

## Qu'est-ce qu'un Dockerfile ?

Un **Dockerfile** est un fichier texte contenant une série d'instructions pour construire une image Docker. Chaque instruction crée une **couche** (layer) dans l'image finale.

## Instructions principales

### FROM — Image de base
\`\`\`dockerfile
FROM node:18-alpine
# Toujours commencer par FROM
# Utiliser des tags spécifiques, jamais :latest en production
\`\`\`

### RUN — Exécuter des commandes
\`\`\`dockerfile
RUN apt-get update && apt-get install -y \\
    curl \\
    git \\
    && rm -rf /var/lib/apt/lists/*
# Combiner les commandes pour réduire le nombre de layers
\`\`\`

### COPY et ADD — Copier des fichiers
\`\`\`dockerfile
COPY package*.json ./
COPY . .
# ADD peut extraire des archives et télécharger des URLs
ADD archive.tar.gz /app/
\`\`\`

### WORKDIR — Répertoire de travail
\`\`\`dockerfile
WORKDIR /app
# Crée le répertoire s'il n'existe pas
# Toutes les instructions suivantes s'exécutent ici
\`\`\`

### EXPOSE — Déclarer un port
\`\`\`dockerfile
EXPOSE 3000
# Documentatif uniquement, ne publie pas le port
# Utiliser -p au docker run pour publier
\`\`\`

### CMD vs ENTRYPOINT
\`\`\`dockerfile
# CMD : commande par défaut (peut être surchargée)
CMD ["node", "server.js"]

# ENTRYPOINT : point d'entrée fixe
ENTRYPOINT ["node"]
CMD ["server.js"]  # Arguments par défaut
\`\`\`

### ENV — Variables d'environnement
\`\`\`dockerfile
ENV NODE_ENV=production
ENV PORT=3000
\`\`\`

## Exemple complet : Application Node.js

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]
\`\`\`

## Construire et tester

\`\`\`bash
docker build -t mon-app:1.0 .
docker run -p 3000:3000 mon-app:1.0
\`\`\``;
}


function getMultiStageContent() {
  return `# Multi-stage builds pour des images légères

## Le problème des images volumineuses

Sans multi-stage, une image Node.js avec les outils de build peut peser **1 Go** ou plus. L'image finale contient des dépendances de développement, des fichiers sources et des outils de compilation inutiles en production.

## Le concept du multi-stage build

Le multi-stage build utilise plusieurs instructions \`FROM\` dans un seul Dockerfile. Seule la dernière étape produit l'image finale — les étapes intermédiaires sont des **étapes de construction** jetables.

## Exemple concret : Application Go

\`\`\`dockerfile
# Étape 1 : BUILD (image lourde avec compilateur)
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Étape 2 : PRODUCTION (image minimale)
FROM alpine:3.18
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
\`\`\`

**Résultat** : Image passant de ~800 MB (golang) à ~15 MB (alpine + binaire).

## Exemple : Application React

\`\`\`dockerfile
# Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production - servir avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
\`\`\`

**Résultat** : De ~1 GB (node_modules + code) à ~25 MB (nginx + fichiers statiques).

## Bonnes pratiques multi-stage

- Nommer les étapes avec \`AS nom\` pour la lisibilité
- Copier uniquement les artefacts nécessaires avec \`COPY --from=\`
- Utiliser des images minimales pour l'étape finale (\`alpine\`, \`distroless\`, \`scratch\`)
- Séparer les dépendances du code source pour exploiter le cache

## Copier depuis une image externe

\`\`\`dockerfile
# Copier depuis une image existante
COPY --from=nginx:alpine /etc/nginx/nginx.conf /etc/nginx/
\`\`\``;
}


function getDockerOptimizationContent() {
  return `# Optimisation de la taille des images

## Pourquoi optimiser ?

Des images plus petites signifient :
- **Déploiements plus rapides** : moins de données à transférer
- **Moins de surface d'attaque** : moins de paquets = moins de vulnérabilités
- **Économies de stockage** : registries moins coûteux
- **Meilleur cache** : layers plus ciblées

## Stratégie 1 : Choisir la bonne image de base

\`\`\`dockerfile
# ❌ Image complète (900+ MB)
FROM node:18

# ✅ Alpine (50 MB)
FROM node:18-alpine

# ✅ Slim (200 MB)
FROM node:18-slim

# ✅ Distroless (< 20 MB) - pas de shell
FROM gcr.io/distroless/nodejs18
\`\`\`

## Stratégie 2 : Exploiter le cache des layers

\`\`\`dockerfile
# ❌ Mauvais : tout est recoupié à chaque changement de code
COPY . .
RUN npm install

# ✅ Bon : les dépendances sont cachées séparément
COPY package*.json ./
RUN npm ci --only=production
COPY . .
\`\`\`

## Stratégie 3 : Fichier .dockerignore

\`\`\`
node_modules
.git
.env
*.md
tests/
.github/
coverage/
\`\`\`

## Stratégie 4 : Combiner les commandes RUN

\`\`\`dockerfile
# ❌ Chaque RUN crée une layer
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# ✅ Une seule layer, nettoyage inclus
RUN apt-get update && apt-get install -y curl \\
    && rm -rf /var/lib/apt/lists/*
\`\`\`

## Stratégie 5 : Multi-stage builds

Voir la leçon dédiée — permet de réduire drastiquement la taille (souvent -90%).

## Vérifier la taille

\`\`\`bash
# Taille des images
docker images
# Analyser les layers
docker history mon-image:latest
# Outil d'analyse avancé
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock wagoodman/dive mon-image:latest
\`\`\``;
}


function getDockerHubContent() {
  return `# Docker Hub et registries privés

## Docker Hub : le registry public

**Docker Hub** est le registry par défaut de Docker, hébergeant des millions d'images :
- **Images officielles** : maintenues par Docker (nginx, node, postgres)
- **Images vérifiées** : d'éditeurs certifiés (bitnami, hashicorp)
- **Images communautaires** : créées par les utilisateurs

## Pousser une image sur Docker Hub

\`\`\`bash
# 1. Se connecter à Docker Hub
docker login

# 2. Tagger l'image avec votre namespace
docker tag mon-app:1.0 username/mon-app:1.0

# 3. Pousser l'image
docker push username/mon-app:1.0

# 4. Pousser avec plusieurs tags
docker tag mon-app:1.0 username/mon-app:latest
docker push username/mon-app:latest
\`\`\`

## Télécharger une image

\`\`\`bash
# Pull explicite
docker pull nginx:1.25-alpine

# Pull implicite (lors du run)
docker run nginx:1.25-alpine
\`\`\`

## Gestion des tags

Les **tags** identifient les versions d'une image :
- \`image:latest\` — tag par défaut (déconseillé en production)
- \`image:1.0.0\` — version sémantique (recommandé)
- \`image:sha-abc123\` — basé sur le commit Git

## Registries privés

Pour les projets d'entreprise, utilisez un registry privé :

| Registry | Avantages |
|----------|-----------|
| **Harbor** | Open source, scanning, RBAC, réplication |
| **AWS ECR** | Intégré à l'écosystème AWS, scanning natif |
| **GCR/Artifact Registry** | Intégré à GCP |
| **GitLab Container Registry** | Intégré au CI/CD GitLab |
| **Azure ACR** | Intégré à Azure, geo-réplication |

## Authentification aux registries

\`\`\`bash
# Registry personnalisé
docker login registry.example.com

# AWS ECR
aws ecr get-login-password | docker login --username AWS --password-stdin 123456.dkr.ecr.eu-west-1.amazonaws.com

# Utiliser un credential helper
# ~/.docker/config.json
\`\`\``;
}


function getDockerVolumesContent() {
  return `# Types de volumes Docker

## Le problème de la persistance

Par défaut, les données écrites dans un conteneur sont perdues à sa destruction. Les **volumes** permettent de persister les données au-delà du cycle de vie du conteneur.

## Les 3 types de montage

### 1. Volumes nommés (Named Volumes)

Gérés par Docker, stockés dans \`/var/lib/docker/volumes/\`. **Recommandé pour la production**.

\`\`\`bash
# Créer un volume
docker volume create mes-donnees

# Utiliser un volume nommé
docker run -d --name db -v mes-donnees:/var/lib/postgresql/data postgres:15

# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect mes-donnees
\`\`\`

### 2. Bind Mounts (montages liés)

Montent un répertoire de l'hôte dans le conteneur. **Idéal pour le développement**.

\`\`\`bash
# Monter le code source pour le hot-reload
docker run -d -v $(pwd)/src:/app/src -p 3000:3000 node-app

# Syntaxe longue (plus lisible)
docker run -d --mount type=bind,source=$(pwd)/src,target=/app/src node-app
\`\`\`

### 3. tmpfs mounts

Stockage en mémoire (RAM), jamais écrit sur disque. Pour les données sensibles temporaires.

\`\`\`bash
docker run -d --tmpfs /app/temp:rw,size=100m mon-app
\`\`\`

## Cas d'usage

| Type | Cas d'usage |
|------|-------------|
| Named volume | Base de données, fichiers uploadés |
| Bind mount | Code source en dev, configuration |
| tmpfs | Secrets temporaires, cache éphémère |

## Stratégies de backup

\`\`\`bash
# Backup d'un volume dans une archive
docker run --rm -v mes-donnees:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# Restauration
docker run --rm -v mes-donnees:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data
\`\`\`

## Volumes en lecture seule

\`\`\`bash
# Monter en lecture seule pour la sécurité
docker run -d -v config:/app/config:ro nginx
\`\`\``;
}


function getDockerNetworkContent() {
  return `# Types de réseaux Docker

## Vue d'ensemble

Docker fournit plusieurs drivers réseau pour différents cas d'usage. Chaque conteneur peut être connecté à un ou plusieurs réseaux.

\`\`\`
┌──────────── Docker Host ──────────────────────────┐
│                                                    │
│  ┌─── bridge: mon-reseau ─────────────────────┐  │
│  │                                             │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │  nginx   │  │   api    │  │  redis   │ │  │
│  │  │172.18.0.2│  │172.18.0.3│  │172.18.0.4│ │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘ │  │
│  │       │              │              │       │  │
│  │  ─────┴──────────────┴──────────────┴─────  │  │
│  │           172.18.0.0/16 (DNS interne)       │  │
│  └─────────────────────┬───────────────────────┘  │
│                         │                          │
│  ┌─────────────────────▼──────────────────────┐   │
│  │              docker0 (bridge)               │   │
│  └─────────────────────┬──────────────────────┘   │
│                         │ NAT                      │
│  ┌─────────────────────▼──────────────────────┐   │
│  │              eth0 (host)                    │   │
│  │           192.168.1.100                     │   │
│  └────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
          │ port mapping -p 8080:80
          ▼
    Client: http://192.168.1.100:8080
\`\`\`

## 1. Bridge (par défaut)

Le réseau **bridge** crée un réseau privé interne sur l'hôte. Les conteneurs sur le même bridge peuvent communiquer entre eux.

\`\`\`bash
# Créer un réseau bridge personnalisé
docker network create mon-reseau

# Lancer des conteneurs sur ce réseau
docker run -d --name api --network mon-reseau node-app
docker run -d --name db --network mon-reseau postgres

# Les conteneurs se trouvent par nom DNS
# api peut accéder à db via "db:5432"
\`\`\`

**Avantage du bridge personnalisé** vs bridge par défaut : résolution DNS automatique par nom de conteneur.

## 2. Host

Le conteneur partage directement la stack réseau de l'hôte. Pas d'isolation réseau.

\`\`\`bash
docker run -d --network host nginx
# Nginx écoute directement sur le port 80 de l'hôte
# Pas besoin de -p pour le mapping de ports
\`\`\`

**Cas d'usage** : performance maximale, pas d'overhead NAT.

## 3. Overlay

Pour la communication entre conteneurs sur **différents hôtes** (Docker Swarm, multi-host).

\`\`\`bash
docker network create --driver overlay mon-overlay
\`\`\`

## 4. None

Aucune connectivité réseau. Isolation totale.

\`\`\`bash
docker run --network none alpine
\`\`\`

## DNS interne Docker

Sur les réseaux personnalisés, Docker fournit un serveur DNS intégré (127.0.0.11) :
- Résolution par nom de conteneur
- Résolution par alias réseau
- Round-robin DNS pour le load balancing basique

\`\`\`bash
# Connecter un conteneur à plusieurs réseaux
docker network connect backend-net mon-conteneur

# Inspecter les réseaux d'un conteneur
docker inspect mon-conteneur | jq '.[].NetworkSettings.Networks'

# Déconnecter
docker network disconnect frontend-net mon-conteneur
\`\`\``;
}


function getDockerComposeContent() {
  return `# Docker Compose : syntaxe YAML et structure

## Qu'est-ce que Docker Compose ?

**Docker Compose** permet de définir et gérer des applications multi-conteneurs à l'aide d'un fichier YAML déclaratif. Un seul \`docker compose up\` lance toute la stack.

\`\`\`
┌─────────── docker-compose.yml ───────────────────┐
│                                                   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   │
│  │ frontend │    │  backend │    │    db    │   │
│  │  :8080   │───►│  :3000   │───►│  :5432   │   │
│  │ (nginx)  │    │ (node)   │    │(postgres)│   │
│  └──────────┘    └──────────┘    └──────────┘   │
│       │                               │          │
│       │          ┌──────────┐         │          │
│       └─────────►│  redis   │◄────────┘          │
│                  │  :6379   │                    │
│                  └──────────┘                    │
│                                                   │
│  Networks:  frontend-net ←→ backend-net          │
│  Volumes:   db-data (persistent)                 │
└───────────────────────────────────────────────────┘
\`\`\`

## Structure du fichier docker-compose.yml

\`\`\`yaml
# Version (optionnel depuis Compose V2)
services:
  # Service backend
  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app
    depends_on:
      db:
        condition: service_healthy
    networks:
      - backend

  # Service frontend
  web:
    build: ./frontend
    ports:
      - "8080:80"
    depends_on:
      - api
    networks:
      - frontend
      - backend

  # Service base de données
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend

volumes:
  db-data:

networks:
  frontend:
  backend:
\`\`\`

## Commandes essentielles

\`\`\`bash
# Démarrer tous les services
docker compose up -d

# Voir les logs de tous les services
docker compose logs -f

# Arrêter et supprimer
docker compose down

# Reconstruire les images
docker compose build

# Scaler un service
docker compose up -d --scale api=3
\`\`\`

## Fichier .env et variables

\`\`\`bash
# .env (chargé automatiquement)
POSTGRES_VERSION=15
APP_PORT=3000
\`\`\`

\`\`\`yaml
# Utilisation dans docker-compose.yml
services:
  db:
    image: postgres:\${POSTGRES_VERSION}
\`\`\`

## Profiles pour environnements

\`\`\`yaml
services:
  debug-tools:
    image: busybox
    profiles: ["debug"]
# Activé seulement avec : docker compose --profile debug up
\`\`\``;
}


function getDockerSecurityContent() {
  return `# Sécurité Docker : bonnes pratiques

## 1. Exécution en utilisateur non-root

Par défaut, les processus dans un conteneur tournent en **root**. C'est un risque majeur en cas d'évasion de conteneur.

\`\`\`dockerfile
# Créer et utiliser un utilisateur non-root
FROM node:18-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --chown=appuser:appgroup . .
USER appuser
CMD ["node", "server.js"]
\`\`\`

## 2. Images en lecture seule

\`\`\`bash
# Système de fichiers en lecture seule
docker run --read-only --tmpfs /tmp nginx
\`\`\`

## 3. Scanning d'images

\`\`\`bash
# Scanner avec Trivy
trivy image mon-app:latest

# Scanner avec Docker Scout
docker scout cves mon-app:latest

# Intégration CI : échouer si vulnérabilités critiques
trivy image --exit-code 1 --severity CRITICAL mon-app:latest
\`\`\`

## 4. Gestion des secrets

\`\`\`bash
# ❌ JAMAIS de secrets dans les variables d'environnement du Dockerfile
ENV DB_PASSWORD=secret123

# ✅ Docker Secrets (Swarm) ou montage de fichiers
docker secret create db_pass ./password.txt

# ✅ Utiliser des fichiers montés
docker run -v ./secrets:/run/secrets:ro mon-app
\`\`\`

## 5. Docker Content Trust

\`\`\`bash
# Activer la vérification de signature
export DOCKER_CONTENT_TRUST=1
docker pull nginx  # Vérifie la signature
\`\`\`

## 6. Capabilities Linux

\`\`\`bash
# Supprimer toutes les capabilities, ajouter seulement celles nécessaires
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx
\`\`\`

## 7. Limiter les ressources

\`\`\`bash
# Limiter CPU et mémoire
docker run --memory=512m --cpus=1.0 mon-app
\`\`\`

## Checklist sécurité Docker

- ✅ Utilisateur non-root
- ✅ Images minimales (alpine, distroless)
- ✅ Scan de vulnérabilités en CI/CD
- ✅ Pas de secrets en clair
- ✅ Capabilities minimales
- ✅ Réseau isolé
- ✅ Mise à jour régulière des images de base`;
}



// ============================================================
// KUBERNETES CONTENT FUNCTIONS
// ============================================================

function getK8sArchitectureContent() {
  return `# Architecture globale de Kubernetes

## Vue d'ensemble

Kubernetes (K8s) est un orchestrateur de conteneurs qui automatise le déploiement, le scaling et la gestion d'applications conteneurisées. Son architecture se divise en deux parties : le **Control Plane** et les **Worker Nodes**.

\\\`\\\`\\\`
┌─────────────────── CONTROL PLANE ───────────────────┐
│                                                      │
│  ┌────────────┐  ┌──────┐  ┌──────────────────┐    │
│  │ API Server │  │ etcd │  │   Scheduler      │    │
│  └─────┬──────┘  └──────┘  └──────────────────┘    │
│        │                                             │
│  ┌─────▼──────────────────────────────────────┐     │
│  │         Controller Manager                  │     │
│  │  (Deployment, ReplicaSet, Node, Job)       │     │
│  └────────────────────────────────────────────┘     │
└─────────────────────────┬────────────────────────────┘
                          │ kubelet API
┌─────────────────────────▼────────────────────────────┐
│                    WORKER NODE 1                       │
│  ┌──────────┐  ┌────────────┐  ┌──────────────┐     │
│  │ kubelet  │  │ kube-proxy │  │  containerd  │     │
│  └──────────┘  └────────────┘  └──────────────┘     │
│  ┌─────────────────────────────────────────────┐     │
│  │  Pod      Pod      Pod      Pod             │     │
│  │  [app]   [api]   [redis]  [worker]         │     │
│  └─────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
\\\`\\\`\\\`

## Control Plane (Master)

Le Control Plane prend les décisions globales sur le cluster :

- **kube-apiserver** : Point d'entrée unique (API REST). Toute communication passe par lui.
- **etcd** : Base de données clé-valeur distribuée stockant l'état du cluster.
- **kube-scheduler** : Assigne les Pods aux nœuds selon les ressources disponibles, affinités et contraintes.
- **kube-controller-manager** : Exécute les boucles de contrôle (ReplicaSet, Node, Job controllers).
- **cloud-controller-manager** : Interface avec le cloud provider (LoadBalancer, Nodes, Routes).

## Worker Nodes

Les nœuds exécutent les workloads :

- **kubelet** : Agent sur chaque nœud, gère le cycle de vie des Pods.
- **kube-proxy** : Gère les règles réseau (iptables/IPVS) pour le routage des Services.
- **Container Runtime** : Exécute les conteneurs (containerd, CRI-O).

## Communication

\`\`\`
[kubectl] → [API Server] → [etcd]
                ↓
         [Scheduler] → assigne Pod à un Node
                ↓
         [kubelet] → démarre le conteneur
\`\`\`

## Principes fondamentaux

- **Déclaratif** : on décrit l'état désiré, K8s converge vers cet état
- **Réconciliation** : les controllers comparent en permanence état actuel vs état désiré
- **Auto-healing** : redémarrage automatique des Pods en échec
- **Extensible** : CRDs, Admission Controllers, Operators`;
}

function getK8sControlPlaneContent() {
  return `# Le Control Plane : cerveau du cluster

## kube-apiserver

Le serveur API est le **composant central** de Kubernetes. Il :
- Expose l'API REST Kubernetes (port 6443)
- Valide et persiste les objets dans etcd
- Sert de hub de communication entre tous les composants
- Gère l'authentification, l'autorisation (RBAC) et l'admission

\`\`\`bash
# Toute interaction passe par l'API server
kubectl get pods  # → requête GET à /api/v1/namespaces/default/pods
\`\`\`

## etcd

Base de données **clé-valeur distribuée** qui stocke l'intégralité de l'état du cluster :
- Algorithme de consensus Raft pour la cohérence
- Stocke les objets (Pods, Services, Secrets, ConfigMaps)
- Critique : sa perte = perte du cluster entier
- Recommandation : cluster de 3 ou 5 nœuds etcd

\`\`\`bash
# Backup etcd (critique en production)
etcdctl snapshot save /backup/etcd-snapshot.db
\`\`\`

## kube-scheduler

Le scheduler décide **où** placer chaque Pod :
1. **Filtrage** : exclut les nœuds inadaptés (ressources insuffisantes, taints)
2. **Scoring** : classe les nœuds restants par pertinence
3. **Binding** : assigne le Pod au meilleur nœud

Critères : CPU/mémoire disponibles, affinités, anti-affinités, taints/tolerations, topology spread.

## kube-controller-manager

Exécute les **boucles de contrôle** (reconciliation loops) :
- **ReplicaSet controller** : maintient le nombre de réplicas
- **Deployment controller** : gère les rolling updates
- **Node controller** : surveille la santé des nœuds
- **Job controller** : gère les tâches terminables
- **Endpoint controller** : peuple les endpoints des Services

Chaque controller surveille un type d'objet et agit pour atteindre l'état désiré.`;
}


function getK8sPodsContent() {
  return `# Définition et anatomie d'un Pod

## Qu'est-ce qu'un Pod ?

Le **Pod** est la plus petite unité déployable dans Kubernetes. Il représente un ou plusieurs conteneurs qui :
- Partagent le même espace réseau (IP, ports)
- Partagent les mêmes volumes de stockage
- Sont co-schedulés sur le même nœud

## Manifeste d'un Pod

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: mon-pod
  labels:
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:1.25
      ports:
        - containerPort: 80
      resources:
        requests:
          cpu: "100m"
          memory: "128Mi"
        limits:
          cpu: "500m"
          memory: "256Mi"
      livenessProbe:
        httpGet:
          path: /healthz
          port: 80
        initialDelaySeconds: 5
        periodSeconds: 10
      readinessProbe:
        httpGet:
          path: /ready
          port: 80
\`\`\`

## Cycle de vie d'un Pod

1. **Pending** : Pod accepté mais pas encore schedulé
2. **Running** : au moins un conteneur tourne
3. **Succeeded** : tous les conteneurs ont terminé avec succès
4. **Failed** : au moins un conteneur a échoué
5. **Unknown** : état indéterminé (perte de contact avec le nœud)

## Resource Requests et Limits

- **Requests** : minimum garanti (utilisé par le scheduler)
- **Limits** : maximum autorisé (enforced par les cgroups)

\`\`\`yaml
resources:
  requests:
    cpu: "250m"      # 0.25 CPU
    memory: "64Mi"   # 64 MiB
  limits:
    cpu: "500m"      # 0.5 CPU
    memory: "128Mi"  # 128 MiB
\`\`\`

## Pods multi-conteneurs

Patterns courants :
- **Sidecar** : conteneur auxiliaire (log collector, proxy)
- **Ambassador** : proxy vers un service externe
- **Adapter** : transforme les données de sortie`;
}

function getK8sDeploymentsContent() {
  return `# Deployments : déploiement déclaratif

## Pourquoi les Deployments ?

Un **Deployment** gère un ReplicaSet qui gère les Pods. Il fournit :
- Mise à jour progressive (rolling update)
- Rollback automatique en cas d'erreur
- Scaling horizontal
- Historique des révisions

## Manifeste d'un Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 1 pod en plus pendant la mise à jour
      maxUnavailable: 0  # Aucun pod indisponible
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: mon-api:v2.0.0
          ports:
            - containerPort: 3000
\`\`\`

## Stratégies de mise à jour

**RollingUpdate** (par défaut) : remplace progressivement les anciens Pods par les nouveaux.

**Recreate** : détruit tous les Pods avant de créer les nouveaux (downtime).

## Commandes essentielles

\`\`\`bash
# Appliquer un Deployment
kubectl apply -f deployment.yaml

# Mettre à jour l'image
kubectl set image deployment/api-deployment api=mon-api:v3.0.0

# Vérifier le status du rollout
kubectl rollout status deployment/api-deployment

# Historique des révisions
kubectl rollout history deployment/api-deployment

# Rollback à la version précédente
kubectl rollout undo deployment/api-deployment

# Rollback à une révision spécifique
kubectl rollout undo deployment/api-deployment --to-revision=2

# Scaler
kubectl scale deployment/api-deployment --replicas=5
\`\`\`

## Bonnes pratiques

- Toujours utiliser des tags d'image spécifiques (jamais \`latest\`)
- Configurer les probes (liveness, readiness, startup)
- Définir les resources requests/limits
- Utiliser les PodDisruptionBudgets pour la haute disponibilité`;
}


function getK8sServicesContent() {
  return `# Services Kubernetes : communication réseau

## Pourquoi les Services ?

Les Pods ont des IPs éphémères qui changent à chaque recréation. Un **Service** fournit une adresse stable (IP virtuelle + DNS) pour accéder à un groupe de Pods.

\\\`\\\`\\\`
         ┌─────── CLUSTER ───────┐
         │                       │
         │   ┌─── ClusterIP ──┐  │
Client ──┼──►│  10.96.0.1:80  │  │
(interne)│   │       │         │  │
         │   │   ┌───▼───┐    │  │
         │   │   │Pod 1  │    │  │
         │   │   │Pod 2  │    │  │
         │   │   │Pod 3  │    │  │
         │   │   └───────┘    │  │
         │   └────────────────┘  │
         └───────────────────────┘

         ┌─────── CLUSTER ───────┐
Client ──┼──► NodePort:30080     │
(externe)│        │               │
         │   ┌────▼─────┐        │
         │   │ Service   │        │
         │   │ ClusterIP │        │
         │   └────┬──────┘        │
         │   ┌────▼──┐           │
         │   │ Pods   │           │
         │   └────────┘           │
         └────────────────────────┘

Cloud LB ──► LoadBalancer Service ──► Pods
(externe)    (provisionné auto)
\\\`\\\`\\\`

## ClusterIP (par défaut)

Accessible uniquement depuis l'intérieur du cluster.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - port: 80          # Port du Service
      targetPort: 3000  # Port du conteneur
\`\`\`

\`\`\`bash
# Accessible via DNS interne
curl http://api-service.default.svc.cluster.local:80
# Ou simplement (même namespace)
curl http://api-service:80
\`\`\`

## NodePort

Expose le service sur un port fixe (30000-32767) de chaque nœud.

\`\`\`yaml
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080  # Accessible sur <NodeIP>:30080
\`\`\`

## LoadBalancer

Provisionne un load balancer cloud externe (AWS ELB, GCP LB, Azure LB).

\`\`\`yaml
spec:
  type: LoadBalancer
  ports:
    - port: 443
      targetPort: 8443
\`\`\`

## ExternalName

Alias DNS vers un service externe.

\`\`\`yaml
spec:
  type: ExternalName
  externalName: database.cloud-provider.com
\`\`\`

## EndpointSlices

Kubernetes maintient des **EndpointSlices** qui listent les IPs des Pods correspondant au selector du Service. kube-proxy utilise ces informations pour configurer les règles iptables/IPVS de routage.

## Headless Service

\`\`\`yaml
spec:
  clusterIP: None  # Pas de VIP, DNS retourne les IPs des Pods
\`\`\`

Utile pour les StatefulSets et la découverte directe des Pods.`;
}

function getK8sIngressContent() {
  return `# Ingress Controllers et routing HTTP

## Qu'est-ce qu'un Ingress ?

Un **Ingress** expose les services HTTP/HTTPS à l'extérieur du cluster avec :
- Routage basé sur le hostname et le path
- Terminaison TLS
- Load balancing L7
- Réécriture d'URL

## Ingress Controller

L'Ingress est juste une **spécification**. Il faut un controller pour l'implémenter :
- **nginx-ingress** : le plus populaire
- **Traefik** : auto-discovery, Let's Encrypt natif
- **HAProxy Ingress** : hautes performances
- **AWS ALB Ingress** : intégration native AWS

\`\`\`
                    Internet
                       │
              ┌────────▼────────┐
              │  Load Balancer  │
              │  (cloud / bare) │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ Ingress Controller│
              │    (nginx)       │
              └─┬──────────────┬─┘
                │              │
    ┌───────────▼──┐    ┌─────▼──────────┐
    │ /api/*       │    │ /*             │
    │              │    │                │
    │ api-service  │    │ frontend-svc   │
    │ :80          │    │ :80            │
    │ ┌──┐┌──┐┌──┐│    │ ┌──┐┌──┐┌──┐  │
    │ │P1││P2││P3││    │ │P1││P2││P3│  │
    │ └──┘└──┘└──┘│    │ └──┘└──┘└──┘  │
    └──────────────┘    └───────────────┘
\`\`\`

## Exemple d'Ingress

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.example.com
      secretName: app-tls-secret
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
\`\`\`

## Terminaison TLS

\`\`\`bash
# Créer un secret TLS
kubectl create secret tls app-tls-secret \\
  --cert=tls.crt --key=tls.key

# Ou utiliser cert-manager pour Let's Encrypt automatique
\`\`\`

## Path-based vs Host-based routing

- **Path-based** : \`/api\` → backend, \`/\` → frontend
- **Host-based** : \`api.example.com\` → backend, \`www.example.com\` → frontend`;
}


function getK8sConfigMapsContent() {
  return `# ConfigMaps : configuration externalisée

## Pourquoi externaliser la configuration ?

Le principe des **12-factor apps** recommande de séparer la configuration du code. Les **ConfigMaps** stockent des données de configuration non-sensibles sous forme de paires clé-valeur.

## Création d'un ConfigMap

\`\`\`bash
# Depuis des valeurs littérales
kubectl create configmap app-config \\
  --from-literal=DB_HOST=postgres \\
  --from-literal=DB_PORT=5432

# Depuis un fichier
kubectl create configmap nginx-conf --from-file=nginx.conf

# Depuis un fichier .env
kubectl create configmap env-config --from-env-file=.env
\`\`\`

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "postgres-service"
  DB_PORT: "5432"
  LOG_LEVEL: "info"
  config.yaml: |
    server:
      port: 8080
      timeout: 30s
\`\`\`

## Utilisation dans un Pod

### Variables d'environnement

\`\`\`yaml
spec:
  containers:
    - name: app
      envFrom:
        - configMapRef:
            name: app-config
      # Ou une clé spécifique
      env:
        - name: DATABASE_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DB_HOST
\`\`\`

### Montage en volume

\`\`\`yaml
spec:
  volumes:
    - name: config-volume
      configMap:
        name: app-config
  containers:
    - name: app
      volumeMounts:
        - name: config-volume
          mountPath: /etc/config
\`\`\`

## ConfigMaps immutables

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config-v2
immutable: true  # Protège contre les modifications accidentelles
data:
  key: value
\`\`\`

Les ConfigMaps immutables améliorent les performances (le kubelet ne les surveille plus) et évitent les changements non-intentionnels.`;
}

function getK8sSecretsContent() {
  return `# Secrets Kubernetes : données sensibles

## Secrets vs ConfigMaps

Les **Secrets** stockent des données sensibles (mots de passe, tokens, clés TLS). Ils sont encodés en base64 (pas chiffrés par défaut !) et ont un accès RBAC restreint.

## Création de Secrets

\`\`\`bash
# Secret générique
kubectl create secret generic db-credentials \\
  --from-literal=username=admin \\
  --from-literal=password=S3cr3t!

# Secret TLS
kubectl create secret tls app-tls \\
  --cert=cert.pem --key=key.pem

# Secret pour registry Docker
kubectl create secret docker-registry regcred \\
  --docker-server=registry.example.com \\
  --docker-username=user \\
  --docker-password=pass
\`\`\`

\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=      # echo -n "admin" | base64
  password: UzNjcjN0IQ==  # echo -n "S3cr3t!" | base64
\`\`\`

## Injection dans les Pods

\`\`\`yaml
spec:
  containers:
    - name: app
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
      volumeMounts:
        - name: secrets
          mountPath: /etc/secrets
          readOnly: true
  volumes:
    - name: secrets
      secret:
        secretName: db-credentials
\`\`\`

## Sécurisation des Secrets

- **Encryption at rest** : activer le chiffrement dans etcd
- **RBAC strict** : limiter qui peut lire les Secrets
- **External Secrets Operator** : synchroniser depuis Vault, AWS SM
- **Sealed Secrets** : chiffrés pour le stockage en Git
- **Ne jamais committer** les Secrets en clair dans Git`;
}


function getK8sRBACContent() {
  return `# RBAC : contrôle d'accès basé sur les rôles

## Qu'est-ce que RBAC ?

**Role-Based Access Control** (RBAC) dans Kubernetes contrôle qui peut faire quoi sur quelles ressources. Il utilise quatre objets :

## ServiceAccounts

Identité pour les processus dans les Pods :

\`\`\`yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: api-service-account
  namespace: production
\`\`\`

## Roles (namespace-scoped)

Définit les permissions dans un namespace :

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list"]
\`\`\`

## ClusterRoles (cluster-wide)

Permissions sur l'ensemble du cluster :

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: secret-reader
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list"]
\`\`\`

## RoleBindings et ClusterRoleBindings

Lient un rôle à un utilisateur, groupe ou ServiceAccount :

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: api-service-account
    namespace: production
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
\`\`\`

## Principe du moindre privilège

\`\`\`bash
# Vérifier les permissions
kubectl auth can-i create pods --as=system:serviceaccount:prod:api-sa
kubectl auth can-i --list --as=user@example.com
\`\`\`

- Donner uniquement les permissions nécessaires
- Utiliser des Roles (pas ClusterRoles) quand possible
- Auditer régulièrement les bindings`;
}

function getK8sHelmContent() {
  return `# Introduction à Helm et concepts

## Qu'est-ce que Helm ?

**Helm** est le gestionnaire de packages de Kubernetes. Il permet de :
- Packager des applications K8s en **Charts** réutilisables
- Gérer les versions et les rollbacks
- Personnaliser les déploiements avec des **values**
- Partager des Charts via des repositories

## Concepts clés

- **Chart** : package contenant les manifestes K8s templatisés
- **Release** : instance d'un Chart déployée sur un cluster
- **Repository** : lieu de stockage et partage des Charts
- **Values** : fichier de configuration pour personnaliser un Chart

## Structure d'un Chart

\`\`\`
mon-chart/
├── Chart.yaml          # Métadonnées du chart
├── values.yaml         # Valeurs par défaut
├── templates/          # Manifestes templatisés
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── _helpers.tpl    # Templates réutilisables
│   └── NOTES.txt       # Message post-installation
├── charts/             # Dépendances
└── .helmignore
\`\`\`

## Commandes essentielles

\`\`\`bash
# Ajouter un repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Chercher un chart
helm search repo nginx

# Installer un chart
helm install mon-release bitnami/nginx -f values.yaml

# Lister les releases
helm list

# Mise à jour
helm upgrade mon-release bitnami/nginx -f new-values.yaml

# Rollback
helm rollback mon-release 1

# Désinstaller
helm uninstall mon-release
\`\`\`

## Templates Go

\`\`\`yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
\`\`\`

## Personnalisation avec values

\`\`\`yaml
# values.yaml
replicaCount: 3
image:
  repository: mon-app
  tag: "2.0.0"
\`\`\``;
}



// ============================================================
// NETWORKING CONTENT FUNCTIONS
// ============================================================

function getOSIModelContent() {
  return `# Le modèle OSI : 7 couches expliquées

## Introduction

Le modèle **OSI** (Open Systems Interconnection) est un modèle de référence en 7 couches qui décrit comment les données transitent dans un réseau. Chaque couche a un rôle spécifique et communique avec les couches adjacentes.

## Les 7 couches

\\\`\\\`\\\`
┌─────────────────────────────────────────┐
│  7. Application  │ HTTP, DNS, SSH, FTP  │
├─────────────────────────────────────────┤
│  6. Présentation │ TLS/SSL, JPEG, JSON  │
├─────────────────────────────────────────┤
│  5. Session      │ Gestion sessions     │
├─────────────────────────────────────────┤
│  4. Transport    │ TCP, UDP (ports)     │
├─────────────────────────────────────────┤
│  3. Réseau       │ IP, ICMP, routage    │
├─────────────────────────────────────────┤
│  2. Liaison      │ Ethernet, MAC, ARP   │
├─────────────────────────────────────────┤
│  1. Physique     │ Câbles, signaux      │
└─────────────────────────────────────────┘
\\\`\\\`\\\`

### Couche 7 — Application
- **Rôle** : Interface avec l'utilisateur et les applications
- **Protocoles** : HTTP, HTTPS, FTP, SMTP, DNS, SSH
- **PDU** : Données
- **DevOps** : APIs, reverse proxy, load balancing L7

### Couche 6 — Présentation
- **Rôle** : Formatage, chiffrement, compression des données
- **Protocoles** : TLS/SSL, JPEG, ASCII, JSON
- **DevOps** : Certificats TLS, terminaison SSL

### Couche 5 — Session
- **Rôle** : Gestion des sessions de communication
- **Protocoles** : NetBIOS, RPC
- **DevOps** : Sessions TCP persistantes, WebSockets

### Couche 4 — Transport
- **Rôle** : Livraison fiable (TCP) ou rapide (UDP) des segments
- **Protocoles** : TCP, UDP
- **PDU** : Segment/Datagramme
- **DevOps** : Load balancing L4, ports, health checks

### Couche 3 — Réseau
- **Rôle** : Routage et adressage logique
- **Protocoles** : IP, ICMP, OSPF, BGP
- **PDU** : Paquet
- **DevOps** : Subnetting, VPC, routing tables, NAT

### Couche 2 — Liaison de données
- **Rôle** : Transmission fiable entre nœuds adjacents
- **Protocoles** : Ethernet, Wi-Fi (802.11), ARP
- **PDU** : Trame (Frame)
- **DevOps** : VLANs, MAC addresses

### Couche 1 — Physique
- **Rôle** : Transmission des bits sur le média physique
- **Supports** : Câble cuivre, fibre optique, ondes radio
- **PDU** : Bits
- **DevOps** : Datacenter, câblage, bande passante

## Pertinence pour le DevOps

En pratique, les ingénieurs DevOps travaillent principalement sur les couches 3 à 7 :
- **L3** : Configuration réseau, VPC, subnetting
- **L4** : Firewalls, load balancers TCP
- **L7** : Reverse proxy, Ingress, certificats TLS`;
}

function getTCPIPContent() {
  return `# Le modèle TCP/IP : architecture Internet

## Le modèle en 4 couches

Le modèle **TCP/IP** (aussi appelé modèle Internet) est le modèle pratique utilisé sur Internet. Il simplifie le modèle OSI en 4 couches :

| Couche TCP/IP | Couches OSI équivalentes | Protocoles |
|---------------|--------------------------|------------|
| Application | 5, 6, 7 | HTTP, DNS, SMTP, SSH, FTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Accès réseau | 1, 2 | Ethernet, Wi-Fi |

## TCP vs UDP

### TCP (Transmission Control Protocol)
- **Orienté connexion** : handshake à 3 voies (SYN, SYN-ACK, ACK)
- **Fiable** : accusés de réception, retransmission
- **Ordonné** : les paquets arrivent dans l'ordre
- **Cas d'usage** : HTTP, bases de données, fichiers

### UDP (User Datagram Protocol)
- **Sans connexion** : envoie et oublie
- **Rapide** : pas d'overhead de fiabilité
- **Non ordonné** : les paquets peuvent arriver dans le désordre
- **Cas d'usage** : DNS, streaming, jeux en ligne, VoIP

## Encapsulation des données

\`\`\`
┌─────────────────────────────────────────────────────────┐
│ Application    │         DONNÉES                        │
├────────────────┼────────────────────────────────────────┤
│ Transport      │ TCP Header │      DONNÉES              │
├────────────────┼────────────┼───────────────────────────┤
│ Internet       │ IP Header  │ TCP Header │   DONNÉES    │
├────────────────┼────────────┼────────────┼──────────────┤
│ Accès réseau   │ ETH Header │ IP │ TCP │ DONNÉES │ FCS │
└────────────────┴────────────┴────┴─────┴─────────┴─────┘
              ◄──── Encapsulation (ajout de headers) ────►
\`\`\`

\`\`\`
[Application] → Données
[Transport]   → Segment TCP (+ port source/destination)
[Internet]    → Paquet IP (+ IP source/destination)
[Accès réseau] → Trame Ethernet (+ MAC source/destination)
\`\`\`

## Ports importants pour DevOps

| Port | Service |
|------|---------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 5432 | PostgreSQL |
| 6443 | Kubernetes API |
| 9090 | Prometheus |
| 3000 | Grafana |

## Outils de diagnostic

\`\`\`bash
# Voir les connexions actives
ss -tlnp

# Capturer le trafic
tcpdump -i eth0 port 80

# Tester la connectivité TCP
nc -zv host 443
\`\`\``;
}


function getDNSContent() {
  return `# DNS : architecture et résolution

## Qu'est-ce que le DNS ?

Le **Domain Name System** (DNS) traduit les noms de domaine (google.com) en adresses IP (142.250.74.46). C'est le « répertoire téléphonique » d'Internet.

## Processus de résolution DNS

1. Le client interroge le **resolver local** (cache)
2. Si pas en cache → interroge le **serveur récursif** (ISP ou 8.8.8.8)
3. Le récursif interroge un **serveur racine** (.)
4. Le racine redirige vers le serveur **TLD** (.com, .fr)
5. Le TLD redirige vers le **serveur autoritaire** du domaine
6. Le serveur autoritaire retourne l'IP

## Types d'enregistrements DNS

| Type | Description | Exemple |
|------|-------------|---------|
| **A** | IPv4 | example.com → 93.184.216.34 |
| **AAAA** | IPv6 | example.com → 2606:2800:220:1:... |
| **CNAME** | Alias vers un autre nom | www → example.com |
| **MX** | Serveur mail (+ priorité) | mail.example.com (prio 10) |
| **TXT** | Texte libre (SPF, DKIM, vérification) | v=spf1 include:... |
| **SRV** | Service (port + poids) | _sip._tcp.example.com |
| **NS** | Serveurs de noms autoritaires | ns1.example.com |
| **PTR** | Résolution inverse (IP → nom) | |

## TTL et caching

Le **Time To Live** (TTL) définit combien de temps un enregistrement est mis en cache :
- TTL court (60s) : changements fréquents, failover rapide
- TTL long (86400s) : stabilité, moins de requêtes DNS

## DNS pour DevOps

\`\`\`bash
# Résolution DNS
dig example.com A
dig +short example.com AAAA
nslookup example.com

# Vérifier la propagation
dig @8.8.8.8 example.com
dig @1.1.1.1 example.com

# Résolution inverse
dig -x 93.184.216.34

# Voir tous les enregistrements
dig example.com ANY
\`\`\`

## DNS interne (Kubernetes)

Dans K8s, CoreDNS résout : \`service.namespace.svc.cluster.local\``;
}

function getHTTPContent() {
  return `# HTTP/1.1 et HTTP/2 : méthodes et headers

## Méthodes HTTP

| Méthode | Usage | Idempotent |
|---------|-------|------------|
| **GET** | Récupérer une ressource | Oui |
| **POST** | Créer une ressource | Non |
| **PUT** | Remplacer une ressource | Oui |
| **PATCH** | Modifier partiellement | Non |
| **DELETE** | Supprimer | Oui |
| **HEAD** | GET sans body (vérification) | Oui |
| **OPTIONS** | Capacités du serveur (CORS) | Oui |

## Codes de statut HTTP

- **2xx** : Succès (200 OK, 201 Created, 204 No Content)
- **3xx** : Redirections (301 Moved, 302 Found, 304 Not Modified)
- **4xx** : Erreur client (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
- **5xx** : Erreur serveur (500 Internal Error, 502 Bad Gateway, 503 Service Unavailable)

## Headers importants

\`\`\`
# Requête
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1...
Content-Type: application/json
Accept: application/json
X-Request-ID: uuid-unique

# Réponse
Content-Type: application/json
Cache-Control: max-age=3600
X-RateLimit-Remaining: 95
\`\`\`

## HTTPS et TLS Handshake

Le **TLS handshake** établit une connexion chiffrée :
1. **Client Hello** : versions TLS supportées, cipher suites
2. **Server Hello** : version choisie, certificat serveur
3. **Vérification** : le client vérifie le certificat (chaîne de confiance)
4. **Échange de clés** : génération d'une clé de session symétrique
5. **Communication chiffrée** : données chiffrées avec AES

## Certificats TLS

- **Let's Encrypt** : certificats gratuits, renouvelés automatiquement (90 jours)
- **cert-manager** : automatisation des certificats dans Kubernetes
- **mTLS** : authentification mutuelle client-serveur (service mesh)

\`\`\`bash
# Vérifier un certificat
openssl s_client -connect example.com:443
curl -vI https://example.com 2>&1 | grep -i "expire\\|issuer"
\`\`\``;
}


function getSubnettingContent() {
  return `# Adressage IPv4 et notation CIDR

## Notation CIDR

La notation **CIDR** (Classless Inter-Domain Routing) exprime un réseau sous la forme \`IP/préfixe\` où le préfixe indique le nombre de bits pour le réseau.

\`\`\`
192.168.1.0/24
├── 192.168.1 = partie réseau (24 bits)
└── .0 = partie hôte (8 bits)
\`\`\`

## Calcul de subnets

| CIDR | Masque | Hôtes disponibles |
|------|--------|-------------------|
| /32 | 255.255.255.255 | 1 (un seul hôte) |
| /28 | 255.255.255.240 | 14 |
| /24 | 255.255.255.0 | 254 |
| /16 | 255.255.0.0 | 65 534 |
| /8 | 255.0.0.0 | 16 777 214 |

**Formule** : Nombre d'hôtes = 2^(32 - préfixe) - 2

## Plages d'adresses privées (RFC 1918)

| Plage | CIDR | Usage courant |
|-------|------|---------------|
| 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 | Cloud VPC, grands réseaux |
| 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 | Docker (par défaut) |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | Réseaux domestiques |

## Exemple de subnetting

Découper \`10.0.0.0/16\` en 4 sous-réseaux :

\`\`\`
10.0.0.0/18   → 10.0.0.1 – 10.0.63.254   (16382 hôtes)
10.0.64.0/18  → 10.0.64.1 – 10.0.127.254 (16382 hôtes)
10.0.128.0/18 → 10.0.128.1 – 10.0.191.254 (16382 hôtes)
10.0.192.0/18 → 10.0.192.1 – 10.0.255.254 (16382 hôtes)
\`\`\`

\`\`\`
         10.0.0.0/16 (65534 hôtes)
         ┌────────────────────────────────────────┐
         │                                        │
    /18  │  10.0.0.0/18     10.0.64.0/18         │
         │  ┌──────────┐    ┌──────────┐         │
         │  │ 16382    │    │ 16382    │         │
         │  │ hôtes    │    │ hôtes    │         │
         │  └──────────┘    └──────────┘         │
         │  10.0.128.0/18   10.0.192.0/18        │
         │  ┌──────────┐    ┌──────────┐         │
         │  │ 16382    │    │ 16382    │         │
         │  │ hôtes    │    │ hôtes    │         │
         │  └──────────┘    └──────────┘         │
         └────────────────────────────────────────┘

    Exemple VPC AWS :
    ┌─────────────── VPC 10.0.0.0/16 ──────────────┐
    │                                               │
    │  ┌─── AZ-a ───┐     ┌─── AZ-b ───┐         │
    │  │Public       │     │Public       │         │
    │  │10.0.1.0/24  │     │10.0.2.0/24  │         │
    │  │(254 IPs)    │     │(254 IPs)    │         │
    │  ├─────────────┤     ├─────────────┤         │
    │  │Private      │     │Private      │         │
    │  │10.0.10.0/24 │     │10.0.20.0/24 │         │
    │  │(254 IPs)    │     │(254 IPs)    │         │
    │  └─────────────┘     └─────────────┘         │
    └───────────────────────────────────────────────┘
\`\`\`

## Application DevOps : VPC AWS

\`\`\`hcl
# Terraform - VPC avec subnets
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}
resource "aws_subnet" "public" {
  cidr_block = "10.0.1.0/24"  # 254 IPs
}
resource "aws_subnet" "private" {
  cidr_block = "10.0.10.0/24" # 254 IPs
}
\`\`\`

## Outils de calcul

\`\`\`bash
# ipcalc pour calculer les subnets
ipcalc 192.168.1.0/24
# Tester si une IP est dans un subnet
python3 -c "import ipaddress; print(ipaddress.ip_address('10.0.1.5') in ipaddress.ip_network('10.0.1.0/24'))"
\`\`\``;
}

function getFirewallContent() {
  return `# iptables : chaînes, tables, règles

## Architecture iptables

**iptables** est le firewall par défaut de Linux. Il organise les règles en **tables** et **chaînes** :

### Tables principales
- **filter** (par défaut) : filtrage des paquets (accepter, refuser)
- **nat** : traduction d'adresses (SNAT, DNAT, masquerade)
- **mangle** : modification des paquets (TTL, TOS)

### Chaînes de la table filter
- **INPUT** : paquets destinés à la machine locale
- **OUTPUT** : paquets émis par la machine locale
- **FORWARD** : paquets routés à travers la machine

## Syntaxe des règles

\`\`\`bash
iptables -A <CHAÎNE> -p <protocole> --dport <port> -s <source> -j <ACTION>
\`\`\`

Actions : **ACCEPT**, **DROP** (silencieux), **REJECT** (avec réponse), **LOG**

## Exemples de règles courantes

\`\`\`bash
# Autoriser SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Autoriser HTTP et HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Autoriser les connexions établies
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Bloquer tout le reste
iptables -A INPUT -j DROP

# NAT : masquerade pour le routage
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Port forwarding
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 10.0.1.5:80
\`\`\`

## Persistance des règles

\`\`\`bash
# Sauvegarder
iptables-save > /etc/iptables/rules.v4

# Restaurer
iptables-restore < /etc/iptables/rules.v4
\`\`\`

## nftables : le successeur

\`\`\`bash
# nftables - syntaxe moderne
nft add rule inet filter input tcp dport 22 accept
nft add rule inet filter input tcp dport {80, 443} accept
nft add rule inet filter input drop
\`\`\`

nftables offre une syntaxe unifiée, de meilleures performances et remplace progressivement iptables.`;
}


function getLoadBalancingContent() {
  return `# Load Balancing : concepts L4 vs L7

## Pourquoi le load balancing ?

Le **load balancing** distribue le trafic entre plusieurs serveurs pour :
- **Haute disponibilité** : si un serveur tombe, les autres prennent le relais
- **Scalabilité** : ajouter des serveurs pour absorber la charge
- **Performance** : répartir intelligemment les requêtes

## Layer 4 (Transport) vs Layer 7 (Application)

### Load Balancing L4
- Opère au niveau TCP/UDP
- Décision basée sur : IP source/destination, port
- **Rapide** : pas d'inspection du contenu
- Cas d'usage : bases de données, services non-HTTP

### Load Balancing L7
- Opère au niveau HTTP/HTTPS
- Décision basée sur : URL, headers, cookies, body
- **Intelligent** : routing basé sur le contenu
- Cas d'usage : APIs, applications web, microservices

## Algorithmes de distribution

| Algorithme | Description | Cas d'usage |
|------------|-------------|-------------|
| **Round Robin** | Rotation séquentielle | Serveurs identiques |
| **Weighted Round Robin** | Rotation pondérée | Serveurs hétérogènes |
| **Least Connections** | Vers le serveur le moins chargé | Requêtes longues variables |
| **IP Hash** | Hash de l'IP client | Sticky sessions |
| **Random** | Choix aléatoire | Simple, distribué |

## Exemple Nginx (L7)

\`\`\`nginx
upstream backend {
    least_conn;
    server 10.0.1.1:3000 weight=3;
    server 10.0.1.2:3000 weight=2;
    server 10.0.1.3:3000 weight=1;
}

server {
    listen 80;
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

## Health Checks

\`\`\`nginx
upstream backend {
    server 10.0.1.1:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.2:3000 max_fails=3 fail_timeout=30s;
}
\`\`\`

## Cloud Load Balancers

- **AWS ALB** (L7) : routing HTTP avancé, WAF, cognito
- **AWS NLB** (L4) : haute performance, IP statiques
- **GCP GLB** (L7) : global, anycast
- **Azure LB** (L4/L7) : zones de disponibilité`;
}



// ============================================================
// LINUX CONTENT FUNCTIONS
// ============================================================

function getShellBashContent() {
  return `# Introduction au shell Bash

## Qu'est-ce que le shell ?

Le **shell** est l'interface en ligne de commande entre l'utilisateur et le système d'exploitation. **Bash** (Bourne Again Shell) est le shell par défaut sur la plupart des distributions Linux.

## Commandes de base

\`\`\`bash
# Navigation
pwd          # Afficher le répertoire courant
ls -la       # Lister avec détails et fichiers cachés
cd /etc      # Changer de répertoire
cd ~         # Aller au home
cd -         # Retour au répertoire précédent

# Manipulation de fichiers
touch file.txt       # Créer un fichier vide
mkdir -p dir/sub     # Créer des répertoires imbriqués
cp -r source/ dest/  # Copier récursivement
mv old.txt new.txt   # Renommer/déplacer
rm -rf directory/    # Supprimer récursivement (ATTENTION)
\`\`\`

## Pipes et redirections

Les **pipes** (\`|\`) connectent la sortie d'une commande à l'entrée de la suivante :

\`\`\`bash
# Pipe : chaîner des commandes
cat /var/log/syslog | grep "error" | wc -l

# Redirections
command > file.txt    # Sortie vers fichier (écrase)
command >> file.txt   # Sortie vers fichier (ajoute)
command 2> error.log  # Erreurs vers fichier
command &> all.log    # Tout vers fichier
command < input.txt   # Entrée depuis fichier
\`\`\`

## Variables et scripts basiques

\`\`\`bash
# Variables
NAME="DevOps"
echo "Hello $NAME"
echo "Home: $HOME, User: $USER"

# Script minimal
#!/bin/bash
set -euo pipefail  # Mode strict recommandé

for file in *.log; do
  echo "Processing: $file"
  gzip "$file"
done
\`\`\`

## Commandes essentielles DevOps

\`\`\`bash
# Recherche
find / -name "*.conf" -type f
grep -r "pattern" /etc/
which docker

# Réseau
curl -s https://api.example.com | jq .
wget -O output.zip https://example.com/file.zip

# Système
df -h         # Espace disque
free -h       # Mémoire
uptime        # Charge système
\`\`\``;
}

function getPermissionsContent() {
  return `# Permissions rwx et notation octale

## Système de permissions Unix

Chaque fichier/répertoire a trois ensembles de permissions pour :
- **Owner (u)** : propriétaire du fichier
- **Group (g)** : groupe associé
- **Others (o)** : tous les autres utilisateurs

## Permissions de base

| Symbole | Valeur | Fichier | Répertoire |
|---------|--------|---------|------------|
| **r** (read) | 4 | Lire le contenu | Lister le contenu |
| **w** (write) | 2 | Modifier | Créer/supprimer des fichiers |
| **x** (execute) | 1 | Exécuter | Traverser (cd) |

## Notation symbolique vs octale

\`\`\`bash
# Lecture de permissions
ls -la
# -rwxr-xr-- 1 user group 1234 Jan 1 file.sh
#  |||
#  ||+-- others: r-- (4) = lecture seule
#  |+--- group:  r-x (5) = lecture + exécution
#  +---- owner:  rwx (7) = tous les droits

# Notation octale : 754
\`\`\`

## chmod : modifier les permissions

\`\`\`bash
# Notation octale
chmod 755 script.sh    # rwxr-xr-x
chmod 644 config.txt   # rw-r--r--
chmod 600 secret.key   # rw-------

# Notation symbolique
chmod u+x script.sh    # Ajouter exécution au propriétaire
chmod g-w file.txt     # Retirer écriture au groupe
chmod o= file.txt      # Aucune permission pour others
chmod a+r file.txt     # Lecture pour tous (a=all)
\`\`\`

## Permissions spéciales

### SUID (4000) - Set User ID
\`\`\`bash
chmod u+s /usr/bin/passwd  # S'exécute avec les droits du propriétaire
ls -la /usr/bin/passwd     # -rwsr-xr-x
\`\`\`

### SGID (2000) - Set Group ID
\`\`\`bash
chmod g+s /shared/        # Nouveaux fichiers héritent du groupe
\`\`\`

### Sticky Bit (1000)
\`\`\`bash
chmod +t /tmp/            # Seul le propriétaire peut supprimer ses fichiers
ls -la /tmp               # drwxrwxrwt
\`\`\`

## chown : changer le propriétaire

\`\`\`bash
chown user:group file.txt
chown -R www-data:www-data /var/www/
\`\`\``;
}


function getProcessContent() {
  return `# Processus : ps, top, htop

## Qu'est-ce qu'un processus ?

Un **processus** est une instance d'un programme en cours d'exécution. Chaque processus a :
- Un **PID** (Process ID) unique
- Un **PPID** (Parent Process ID)
- Un état (running, sleeping, stopped, zombie)
- Des ressources allouées (CPU, mémoire)

## Commandes de surveillance

\`\`\`bash
# Lister les processus
ps aux                    # Tous les processus (format BSD)
ps -ef                    # Tous les processus (format POSIX)
ps aux --sort=-%mem       # Triés par mémoire
ps -u www-data            # Processus d'un utilisateur

# Surveillance en temps réel
top                       # Vue dynamique
htop                      # Vue améliorée (interactif)
\`\`\`

## Signaux et gestion

\`\`\`bash
# Envoyer des signaux
kill PID                  # SIGTERM (15) - arrêt propre
kill -9 PID              # SIGKILL (9) - arrêt forcé
kill -HUP PID            # SIGHUP (1) - rechargement config
killall nginx            # Tuer par nom de processus
pkill -f "python app"    # Tuer par pattern

# Signaux importants
# SIGTERM (15) : arrêt propre, le processus peut cleanup
# SIGKILL (9) : arrêt immédiat, pas de cleanup
# SIGHUP (1) : hangup, souvent utilisé pour recharger
# SIGINT (2) : interruption (Ctrl+C)
# SIGSTOP/SIGCONT : pause/reprise
\`\`\`

## Priorités et nice

\`\`\`bash
# Lancer avec une priorité réduite (-20 à 19, défaut 0)
nice -n 10 ./backup.sh

# Modifier la priorité d'un processus existant
renice -n 5 -p PID
\`\`\`

## Cgroups (Control Groups)

Les **cgroups** limitent les ressources des processus :
\`\`\`bash
# Vérifier les cgroups d'un processus
cat /proc/PID/cgroup

# Docker utilise les cgroups pour limiter les conteneurs
# memory.max, cpu.max, io.max
\`\`\`

## Systemd et daemons

\`\`\`bash
# Gérer les services (daemons)
systemctl start nginx
systemctl status nginx
systemctl enable nginx   # Démarrage au boot
journalctl -u nginx -f   # Logs du service
\`\`\``;
}

function getFilesystemContent() {
  return `# Hiérarchie FHS : /etc, /var, /usr, /home

## Le Filesystem Hierarchy Standard (FHS)

Le **FHS** définit la structure des répertoires sur les systèmes Linux :

| Répertoire | Contenu |
|------------|---------|
| \`/\` | Racine du système |
| \`/bin\` | Binaires essentiels (ls, cp, cat) |
| \`/sbin\` | Binaires système (fdisk, iptables) |
| \`/etc\` | Fichiers de configuration |
| \`/home\` | Répertoires personnels des utilisateurs |
| \`/root\` | Home de l'utilisateur root |
| \`/var\` | Données variables (logs, cache, mail) |
| \`/tmp\` | Fichiers temporaires (vidé au reboot) |
| \`/usr\` | Programmes installés, bibliothèques |
| \`/opt\` | Logiciels tiers optionnels |
| \`/proc\` | Système de fichiers virtuel (info noyau) |
| \`/dev\` | Fichiers de périphériques |
| \`/mnt\`, \`/media\` | Points de montage |

## Inodes

Un **inode** stocke les métadonnées d'un fichier (permissions, propriétaire, timestamps, pointeurs vers les blocs de données) — tout sauf le nom du fichier.

\`\`\`bash
# Voir l'inode d'un fichier
ls -i file.txt
stat file.txt
# Voir l'utilisation des inodes
df -i
\`\`\`

## Liens symboliques et durs

\`\`\`bash
# Lien dur : même inode, même données
ln fichier lien_dur

# Lien symbolique : pointe vers un chemin
ln -s /etc/nginx/nginx.conf ./nginx.conf

# Différences clés :
# - Lien dur : même partition, pas de répertoires
# - Lien symbolique : cross-partition, peut pointer vers des répertoires
\`\`\`

## Montage et gestion

\`\`\`bash
# Monter un système de fichiers
mount /dev/sdb1 /mnt/data
mount -t nfs server:/share /mnt/nfs

# Voir les montages
df -h         # Espace disque
du -sh /var/  # Taille d'un répertoire
lsblk         # Blocs de stockage
findmnt       # Arbre de montage

# /etc/fstab - montages automatiques au boot
/dev/sdb1  /data  ext4  defaults  0  2
\`\`\``;
}


function getSystemdContent() {
  return `# Architecture systemd : units, targets, dependencies

## Qu'est-ce que systemd ?

**systemd** est le système d'initialisation (PID 1) de la plupart des distributions Linux modernes. Il gère :
- Le démarrage du système et des services
- Les dépendances entre services
- La journalisation (journald)
- Les timers (alternative à cron)

## Types d'unités (Units)

| Type | Extension | Description |
|------|-----------|-------------|
| Service | \`.service\` | Processus daemon |
| Socket | \`.socket\` | Activation par socket |
| Timer | \`.timer\` | Planification de tâches |
| Mount | \`.mount\` | Points de montage |
| Target | \`.target\` | Groupes d'unités |
| Path | \`.path\` | Surveillance de fichiers |

## Créer un service personnalisé

\`\`\`ini
# /etc/systemd/system/mon-app.service
[Unit]
Description=Mon Application Node.js
After=network.target
Wants=postgresql.service

[Service]
Type=simple
User=appuser
Group=appgroup
WorkingDirectory=/opt/mon-app
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
\`\`\`

## Commandes de gestion

\`\`\`bash
# Recharger la configuration après modification
systemctl daemon-reload

# Gestion des services
systemctl start mon-app
systemctl stop mon-app
systemctl restart mon-app
systemctl status mon-app
systemctl enable mon-app   # Démarrage au boot
systemctl disable mon-app

# Voir les logs avec journald
journalctl -u mon-app -f         # Suivre en temps réel
journalctl -u mon-app --since "1 hour ago"
journalctl -u mon-app -p err     # Seulement les erreurs
\`\`\`

## Targets (équivalent des runlevels)

- \`multi-user.target\` : mode multi-utilisateur (sans GUI)
- \`graphical.target\` : mode graphique
- \`rescue.target\` : mode maintenance

## Timers systemd

\`\`\`ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Backup quotidien

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
\`\`\``;
}



// ============================================================
// TERRAFORM CONTENT FUNCTIONS
// ============================================================

function getTerraformHCLContent() {
  return `# Blocs et structure du code HCL

## Le langage HCL

**HCL** (HashiCorp Configuration Language) est le langage déclaratif de Terraform. Il est conçu pour être lisible par les humains tout en étant analysable par les machines.

## Variables d'entrée

\`\`\`hcl
# variables.tf
variable "environment" {
  description = "Environnement de déploiement"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "L'environnement doit être dev, staging ou prod."
  }
}

variable "instance_count" {
  type    = number
  default = 2
}

variable "tags" {
  type = map(string)
  default = {
    Team    = "devops"
    Project = "infrastructure"
  }
}
\`\`\`

## Outputs

\`\`\`hcl
# outputs.tf
output "instance_ip" {
  description = "IP publique de l'instance"
  value       = aws_instance.main.public_ip
  sensitive   = false
}

output "database_url" {
  value     = "postgres://\${aws_db_instance.main.endpoint}/app"
  sensitive = true
}
\`\`\`

## Locals

\`\`\`hcl
locals {
  name_prefix = "\${var.environment}-\${var.project}"
  common_tags = merge(var.tags, {
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}
\`\`\`

## Types de données

| Type | Exemple |
|------|---------|
| \`string\` | \`"hello"\` |
| \`number\` | \`42\`, \`3.14\` |
| \`bool\` | \`true\`, \`false\` |
| \`list(type)\` | \`["a", "b", "c"]\` |
| \`map(type)\` | \`{key = "value"}\` |
| \`object({...})\` | Structure typée |
| \`tuple([...])\` | Liste de types mixtes |

## Fonctions built-in

\`\`\`hcl
# Manipulation de chaînes
name = upper(var.environment)         # "DEV"
path = join("/", ["usr", "local"])     # "usr/local"
id   = format("sg-%s-%s", var.env, var.app)

# Collections
first = element(var.subnets, 0)
keys  = keys(var.tags)
merged = merge(local.common_tags, { Name = "custom" })

# Filesystem
config = file("./config.json")
tpl    = templatefile("./user-data.sh", { name = var.name })
\`\`\``;
}

function getTerraformStateContent() {
  return `# Comprendre le state Terraform

## Qu'est-ce que le state ?

Le **state** est un fichier JSON (\`terraform.tfstate\`) qui mappe les ressources déclarées dans le code aux ressources réelles dans l'infrastructure. Il sert à :
- Savoir quelles ressources existent
- Détecter les drifts (différences état réel vs code)
- Calculer le plan d'exécution (create, update, destroy)
- Stocker les métadonnées (dépendances, IDs)

## State local vs remote

### State local (par défaut)
\`\`\`bash
# Fichier terraform.tfstate dans le répertoire courant
# ⚠️ Problèmes :
# - Pas de collaboration (conflits)
# - Pas de locking
# - Risque de perte de données
# - Secrets en clair dans le fichier
\`\`\`

### Remote backend (recommandé)
\`\`\`hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "mon-terraform-state"
    key            = "prod/infrastructure/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"  # Locking !
  }
}
\`\`\`

## State locking

Le **locking** empêche les modifications concurrentes :
- S3 + DynamoDB pour AWS
- Azure Blob avec lease
- GCS avec locking natif
- Terraform Cloud intégré

## Manipulation du state

\`\`\`bash
# Lister les ressources dans le state
terraform state list

# Voir les détails d'une ressource
terraform state show aws_instance.main

# Déplacer une ressource (renommage)
terraform state mv aws_instance.old aws_instance.new

# Supprimer du state (sans détruire la ressource)
terraform state rm aws_instance.orphan

# Importer une ressource existante dans le state
terraform import aws_instance.main i-1234567890abcdef0
\`\`\`

## Bonnes pratiques

- **Toujours** utiliser un remote backend en équipe
- Activer le chiffrement du state
- Ne jamais modifier le state manuellement
- Utiliser \`terraform refresh\` pour synchroniser
- Sauvegarder régulièrement le state`;
}


function getTerraformModulesContent() {
  return `# Création d'un module Terraform

## Qu'est-ce qu'un module ?

Un **module** Terraform est un ensemble de fichiers \`.tf\` dans un répertoire. Il encapsule des ressources réutilisables avec des inputs/outputs bien définis.

## Structure d'un module

\`\`\`
modules/
└── vpc/
    ├── main.tf          # Ressources
    ├── variables.tf     # Inputs du module
    ├── outputs.tf       # Outputs du module
    ├── versions.tf      # Contraintes de version
    └── README.md        # Documentation
\`\`\`

## Exemple de module VPC

\`\`\`hcl
# modules/vpc/variables.tf
variable "vpc_cidr" {
  description = "CIDR block du VPC"
  type        = string
}
variable "environment" {
  type = string
}
variable "public_subnets" {
  type = list(string)
}

# modules/vpc/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  tags = { Name = "\${var.environment}-vpc" }
}

resource "aws_subnet" "public" {
  count             = length(var.public_subnets)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnets[count.index]
  map_public_ip_on_launch = true
}

# modules/vpc/outputs.tf
output "vpc_id" {
  value = aws_vpc.main.id
}
output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}
\`\`\`

## Utiliser le module

\`\`\`hcl
# main.tf (racine)
module "vpc_prod" {
  source = "./modules/vpc"

  vpc_cidr       = "10.0.0.0/16"
  environment    = "production"
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Référencer les outputs
resource "aws_instance" "app" {
  subnet_id = module.vpc_prod.public_subnet_ids[0]
}
\`\`\`

## Terraform Registry

\`\`\`hcl
# Utiliser un module du registry public
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"
}
\`\`\`

## Versioning

\`\`\`hcl
module "app" {
  source = "git::https://github.com/org/modules.git//vpc?ref=v2.1.0"
}
\`\`\``;
}



// ============================================================
// CI/CD CONTENT FUNCTIONS
// ============================================================

function getGitHubActionsContent() {
  return `# Triggers et Events dans GitHub Actions

## Structure d'un workflow

Les workflows GitHub Actions sont définis dans \`.github/workflows/*.yml\` :

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
    paths:
      - 'src/**'
      - 'package.json'
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'  # Chaque lundi à 6h
  workflow_dispatch:        # Déclenchement manuel
    inputs:
      environment:
        description: 'Environnement cible'
        required: true
        type: choice
        options: [dev, staging, prod]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
\`\`\`

## Types de triggers

| Trigger | Description |
|---------|-------------|
| \`push\` | Push sur une branche |
| \`pull_request\` | Ouverture/mise à jour de PR |
| \`schedule\` | Cron planifié |
| \`workflow_dispatch\` | Manuel depuis l'UI |
| \`repository_dispatch\` | API externe |
| \`release\` | Publication d'une release |

## Jobs et parallélisme

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - run: node --version

  deploy:
    needs: test  # Dépendance séquentielle
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: echo "Deploying..."
\`\`\`

## Secrets et variables

\`\`\`yaml
steps:
  - name: Deploy
    env:
      API_KEY: \${{ secrets.API_KEY }}
      ENV: \${{ vars.ENVIRONMENT }}
    run: ./deploy.sh
\`\`\`

## Conditions

\`\`\`yaml
- name: Deploy to prod
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  run: ./deploy-prod.sh
\`\`\``;
}

function getPipelineDesignContent() {
  return `# Concepts de pipeline : stages, jobs, steps

## Architecture d'un pipeline CI/CD

Un pipeline CI/CD est composé de **stages** (étapes) séquentiels, chacun contenant des **jobs** (tâches) qui s'exécutent sur des **runners**. Chaque job contient des **steps** (commandes).

## Stages typiques

\`\`\`
┌────────┐   ┌────────┐   ┌────────┐   ┌─────────┐   ┌────────┐
│  CODE  │──►│ BUILD  │──►│  TEST  │──►│ STAGING │──►│  PROD  │
│        │   │        │   │        │   │         │   │        │
│ commit │   │ docker │   │ unit   │   │ deploy  │   │ deploy │
│ push   │   │ build  │   │ integ  │   │ smoke   │   │ canary │
│ PR     │   │ lint   │   │ e2e    │   │ tests   │   │ rollout│
└────────┘   └────────┘   └────────┘   └─────────┘   └────────┘
                                             │              │
                                        [Auto Gate]   [Manual Gate]
                                        (tests pass)  (approval)
\`\`\`

### 1. Build
- Compilation du code source
- Construction des artefacts (binaires, images Docker)
- Résolution des dépendances

### 2. Test
- Tests unitaires
- Tests d'intégration
- Tests end-to-end
- Couverture de code

### 3. Security Scan
- SAST (analyse statique)
- Scan de dépendances
- Scan d'images conteneur

### 4. Deploy
- Déploiement vers l'environnement cible
- Migrations de base de données
- Smoke tests post-déploiement

### 5. Verify
- Tests de fumée en production
- Vérification des métriques
- Rollback automatique si échec

## Gates et approvals

Les **gates** sont des contrôles entre les stages :
- **Automatic gates** : tests passent, pas de CVE critiques
- **Manual gates** : approbation humaine pour la production

## Artefacts

Les artefacts sont les résultats d'un stage transmis au suivant :
- Images Docker taguées
- Binaires compilés
- Rapports de tests
- Manifestes de déploiement

## Principes de design

- **Fail fast** : les tests rapides d'abord
- **Paralléliser** : tests indépendants en parallèle
- **Idempotent** : chaque stage peut être rejoué
- **Immutable** : un artefact buildé ne change plus
- **Observable** : logs et métriques à chaque étape`;
}



// ============================================================
// MONITORING CONTENT FUNCTIONS
// ============================================================

function getPrometheusContent() {
  return `# Architecture Prometheus : pull model

## Vue d'ensemble

**Prometheus** est un système de monitoring open source conçu pour la collecte de métriques time-series. Il utilise un modèle **pull** : Prometheus va chercher les métriques auprès des cibles (scraping).

## Architecture

\`\`\`
┌─── Targets ──────────────┐
│ ┌────────┐ ┌────────┐   │       ┌───────────────────┐
│ │node-exp│ │app:9090│   │  pull │                   │
│ │:9100   │ │/metrics│   │◄──────│    Prometheus     │
│ └────────┘ └────────┘   │       │    Server         │
│ ┌────────┐ ┌────────┐   │       │  ┌─────────────┐ │
│ │cadvisor│ │blackbox│   │       │  │   TSDB      │ │
│ │:8080   │ │:9115   │   │       │  │ (stockage)  │ │
│ └────────┘ └────────┘   │       │  └─────────────┘ │
└──────────────────────────┘       │  ┌─────────────┐ │
                                   │  │ Rule Engine │ │
┌──────────────┐                   │  └──────┬──────┘ │
│   Grafana    │◄── PromQL query──│          │        │
│ (dashboards) │                   └──────────┼────────┘
└──────────────┘                              │
                                   ┌──────────▼────────┐
                                   │   Alertmanager    │
                                   │  ┌──────────────┐ │
                                   │  │Slack│PagerDuty│ │
                                   │  └──────────────┘ │
                                   └───────────────────┘
\`\`\`

## Composants

- **Prometheus Server** : scrape, stocke et évalue les règles
- **Exporters** : exposent les métriques au format Prometheus (node_exporter, cadvisor)
- **Pushgateway** : pour les jobs éphémères (batch jobs)
- **Alertmanager** : gestion et routage des alertes
- **Client libraries** : instrumentation d'applications (Go, Python, Java, Node.js)

## Configuration (prometheus.yml)

\`\`\`yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'api'
    static_configs:
      - targets: ['api:3000']
    metrics_path: /metrics

  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
\`\`\`

## Types de métriques

| Type | Description | Exemple |
|------|-------------|---------|
| **Counter** | Valeur croissante uniquement | http_requests_total |
| **Gauge** | Valeur variable (monte et descend) | temperature_celsius |
| **Histogram** | Distribution de valeurs | http_request_duration_seconds |
| **Summary** | Quantiles côté client | rpc_duration_seconds |

## PromQL basique

\`\`\`promql
# Taux de requêtes par seconde (5 min)
rate(http_requests_total[5m])

# 95ème percentile de latence
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Mémoire utilisée
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
\`\`\``;
}

function getGrafanaContent() {
  return `# Grafana : datasources et dashboards

## Introduction à Grafana

**Grafana** est la plateforme de visualisation de référence pour les métriques, logs et traces. Elle supporte de nombreuses sources de données et permet de créer des dashboards interactifs.

## Datasources supportées

- **Prometheus** : métriques time-series
- **Loki** : logs agrégés
- **Tempo/Jaeger** : traces distribuées
- **InfluxDB** : time-series database
- **Elasticsearch** : logs et recherche
- **PostgreSQL/MySQL** : bases relationnelles
- **CloudWatch** : métriques AWS

## Création de dashboards

Un dashboard est composé de **panels** (panneaux) organisés en lignes :

### Types de panels

| Panel | Usage |
|-------|-------|
| **Time series** | Évolution dans le temps |
| **Stat** | Valeur unique (compteur) |
| **Gauge** | Jauge avec seuils |
| **Table** | Données tabulaires |
| **Heatmap** | Distribution (latence) |
| **Logs** | Affichage de logs |

### Exemple de requête Prometheus dans Grafana

\`\`\`promql
# Panel : Taux de requêtes HTTP
sum(rate(http_requests_total{job="api"}[5m])) by (status_code)

# Panel : Latence P99
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
\`\`\`

## Variables de dashboard

Les variables rendent les dashboards dynamiques :
\`\`\`
# Variable $namespace (dropdown)
label_values(kube_pod_info, namespace)

# Utilisation dans les requêtes
rate(http_requests_total{namespace="$namespace"}[5m])
\`\`\`

## Alerting Grafana

\`\`\`yaml
# Règle d'alerte
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Taux d'erreur élevé"
\`\`\`

## Provisioning as Code

\`\`\`yaml
# /etc/grafana/provisioning/datasources/prometheus.yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
\`\`\``;
}



// ============================================================
// SECURITY CONTENT FUNCTIONS
// ============================================================

function getSASTDASTContent() {
  return `# SAST : analyse statique du code

## SAST vs DAST

| Critère | SAST (Static) | DAST (Dynamic) |
|---------|---------------|----------------|
| Quand | Pendant le développement | Application en exécution |
| Comment | Analyse du code source | Tests boîte noire |
| Avantages | Détection précoce, couvre tout le code | Trouve les vulnérabilités runtime |
| Limites | Faux positifs, pas de contexte runtime | Couverture partielle |

## SAST : Analyse statique

L'analyse statique examine le code **sans l'exécuter** pour détecter :
- Injections SQL, XSS, SSRF
- Utilisation de fonctions dangereuses
- Secrets hardcodés
- Problèmes de validation d'entrée

### Outils SAST populaires

\`\`\`bash
# SonarQube - analyse multi-langage
sonar-scanner -Dsonar.projectKey=mon-projet

# Semgrep - règles personnalisables
semgrep --config=auto ./src/

# CodeQL (GitHub) - intégré à GitHub Advanced Security
# Configuré via .github/workflows/codeql.yml

# Bandit (Python)
bandit -r ./app/

# ESLint security plugin (JavaScript)
npx eslint --ext .js,.ts ./src/
\`\`\`

## DAST : Analyse dynamique

Le DAST teste l'application en cours d'exécution :

\`\`\`bash
# OWASP ZAP - scanner de vulnérabilités web
docker run -t owasp/zap2docker-stable zap-full-scan.py \\
  -t https://staging.example.com

# Nuclei - scanner de vulnérabilités
nuclei -u https://staging.example.com -t cves/
\`\`\`

## Intégration en pipeline CI/CD

\`\`\`yaml
# .github/workflows/security.yml
jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/owasp-top-ten

  dast:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - name: ZAP Scan
        uses: zaproxy/action-full-scan@v0.9.0
        with:
          target: 'https://staging.example.com'
\`\`\`

## Bonnes pratiques

- SAST à chaque commit/PR (shift-left)
- DAST sur l'environnement de staging
- Triage régulier des résultats pour réduire les faux positifs
- Établir des gates de sécurité (bloquer sur critiques/hautes)`;
}

function getContainerScanningContent() {
  return `# Image scanning avec Trivy

## Pourquoi scanner les images ?

Les images Docker contiennent un OS et des paquets qui peuvent avoir des **vulnérabilités connues** (CVE). Le scanning identifie ces risques avant le déploiement.

## Trivy : scanner polyvalent

**Trivy** (par Aqua Security) scanne :
- Images Docker (vulnérabilités OS et dépendances)
- Fichiers IaC (Terraform, Kubernetes manifests)
- Systèmes de fichiers
- Repositories Git

\`\`\`bash
# Scanner une image Docker
trivy image nginx:latest

# Scanner avec seuil de sévérité
trivy image --severity HIGH,CRITICAL mon-app:v1.0

# Échouer en CI si vulnérabilités critiques
trivy image --exit-code 1 --severity CRITICAL mon-app:v1.0

# Scanner un Dockerfile
trivy config ./Dockerfile

# Scanner des manifestes Kubernetes
trivy config ./k8s/

# Générer un rapport JSON
trivy image --format json --output report.json mon-app:v1.0
\`\`\`

## Choix de l'image de base

| Image | Vulnérabilités typiques | Recommandation |
|-------|-------------------------|----------------|
| ubuntu:latest | 50-200 | Dev/staging |
| alpine:3.18 | 0-5 | Production |
| distroless | 0-2 | Production (sécurité max) |
| scratch | 0 | Binaires Go/Rust |

## SBOM (Software Bill of Materials)

\`\`\`bash
# Générer un SBOM avec Syft
syft mon-app:v1.0 -o spdx-json > sbom.json

# Scanner un SBOM avec Grype
grype sbom:./sbom.json
\`\`\`

## Intégration CI/CD

\`\`\`yaml
# GitHub Actions
- name: Build image
  run: docker build -t mon-app:\${{ github.sha }} .

- name: Scan image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'mon-app:\${{ github.sha }}'
    format: 'sarif'
    output: 'trivy-results.sarif'
    severity: 'CRITICAL,HIGH'
    exit-code: '1'
\`\`\`

## Bonnes pratiques

- Scanner en CI à chaque build
- Mettre à jour régulièrement les images de base
- Utiliser des images minimales (alpine, distroless)
- Maintenir un registre d'exceptions documentées
- Automatiser les rebuilds quand de nouvelles CVE sont publiées`;
}


function getSecretsManagementContent() {
  return `# HashiCorp Vault : architecture et usage

## Pourquoi un gestionnaire de secrets ?

Les secrets (mots de passe, tokens API, clés de chiffrement) ne doivent **jamais** être stockés :
- En dur dans le code
- Dans des variables d'environnement non-chiffrées
- Dans des fichiers de configuration en clair dans Git

## Architecture de Vault

\`\`\`
[Applications] → [Vault API] → [Storage Backend]
                     ├── Auth Methods (OIDC, K8s, AppRole)
                     ├── Secrets Engines (KV, PKI, DB)
                     └── Policies (RBAC)
\`\`\`

### Composants clés
- **Seal/Unseal** : Vault démarre scellé, nécessite des clés de déverrouillage
- **Auth Methods** : authentification des clients (Kubernetes, OIDC, AppRole, Token)
- **Secrets Engines** : backends de stockage (KV v2, bases de données, PKI)
- **Policies** : contrôle d'accès granulaire

## Utilisation basique

\`\`\`bash
# Écrire un secret
vault kv put secret/api-config api_key="sk-abc123" db_pass="S3cr3t!"

# Lire un secret
vault kv get secret/api-config
vault kv get -field=api_key secret/api-config

# Secrets dynamiques (base de données)
vault read database/creds/readonly
# → Génère un user/password temporaire avec TTL
\`\`\`

## External Secrets Operator (Kubernetes)

\`\`\`yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-secrets
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: api-secrets  # Secret K8s généré
  data:
    - secretKey: db-password
      remoteRef:
        key: secret/data/api-config
        property: db_pass
\`\`\`

## Rotation automatique

Vault peut **rotater automatiquement** les secrets :
- Credentials de base de données (durée de vie limitée)
- Certificats TLS (renouvellement avant expiration)
- Clés API (rotation planifiée)

## Bonnes pratiques

- Durée de vie (TTL) courte pour les secrets dynamiques
- Audit logging de tous les accès
- Principe du moindre privilège via les policies
- Backup régulier du storage backend
- High Availability avec Raft ou Consul`;
}



// ============================================================
// SRE CONTENT FUNCTIONS
// ============================================================

function getSLOSLIContent() {
  return `# SLO, SLI et SLA : définir la fiabilité

## Définitions

### SLA (Service Level Agreement)
**Contrat** entre le fournisseur et le client définissant les engagements de disponibilité. Conséquences financières en cas de non-respect (crédits, pénalités).

Exemple : « Le service sera disponible 99.9% du temps par mois. »

### SLO (Service Level Objective)
**Objectif interne** de fiabilité, plus strict que le SLA (marge de sécurité). Sert à déclencher des actions correctives avant de violer le SLA.

Exemple : « Objectif interne de 99.95% de disponibilité. »

### SLI (Service Level Indicator)
**Métrique mesurable** qui alimente les SLO. C'est la donnée brute mesurée.

Exemple : \`requêtes réussies / total requêtes\`

## Exemples de SLIs par type de service

| Service | SLI | Mesure |
|---------|-----|--------|
| API | Disponibilité | % requêtes HTTP 2xx/3xx |
| API | Latence | % requêtes < 200ms |
| Pipeline | Fraîcheur | Âge des dernières données |
| Storage | Durabilité | % objets non-perdus |
| Batch | Correctness | % résultats corrects |

## Error Budget

L'**error budget** = 1 - SLO. C'est le « budget d'erreur » autorisé.

\`\`\`
SLO = 99.9%
Error budget = 0.1%
Sur 30 jours = 43.2 minutes d'indisponibilité autorisées
\`\`\`

## Calcul et implémentation

\`\`\`promql
# SLI de disponibilité (Prometheus)
sum(rate(http_requests_total{code=~"2.."}[30d]))
/
sum(rate(http_requests_total[30d]))

# SLI de latence (< 300ms)
sum(rate(http_request_duration_seconds_bucket{le="0.3"}[30d]))
/
sum(rate(http_request_duration_seconds_count[30d]))
\`\`\`

## Alerting basé sur le burn rate

Plutôt qu'alerter sur chaque erreur, on alerte quand le **burn rate** (vitesse de consommation du budget) est trop élevé :

\`\`\`promql
# Alerte si on brûle le budget 14x plus vite que prévu (page en 2h)
(1 - sli_ratio:5m) > (14 * (1 - 0.999))
\`\`\`

## Bonnes pratiques

- Commencer avec peu de SLOs (2-4 par service)
- Mesurer ce qui compte pour l'utilisateur
- Revoir les SLOs trimestriellement
- Documenter les décisions d'error budget`;
}

function getIncidentManagementContent() {
  return `# Processus d'incident management

## Qu'est-ce qu'un incident ?

Un **incident** est un événement non planifié qui dégrade ou interrompt un service au-delà des seuils acceptables (violation de SLO).

## Niveaux de sévérité

| Sévérité | Impact | Réponse | Exemple |
|----------|--------|---------|---------|
| **SEV1** | Service indisponible | Immediate, all-hands | Site down |
| **SEV2** | Dégradation majeure | 15min, équipe on-call | Latence 10x |
| **SEV3** | Impact limité | 1h, équipe responsable | Feature cassée |
| **SEV4** | Impact minimal | Prochain sprint | Bug cosmétique |

## Processus de gestion

### 1. Détection
- Alertes automatiques (Prometheus, PagerDuty)
- Rapports utilisateurs
- Monitoring synthétique

### 2. Triage
- Évaluer la sévérité
- Identifier le service impacté
- Mobiliser les bonnes personnes

### 3. Rôles

| Rôle | Responsabilité |
|------|----------------|
| **Incident Commander (IC)** | Coordonne la réponse |
| **Communication Lead** | Informe stakeholders et clients |
| **Tech Lead** | Diagnostic et résolution technique |
| **Scribe** | Documente la timeline |

### 4. Communication

\`\`\`
# Template de communication
Incident: [Titre court]
Sévérité: SEV2
Impact: [Description de l'impact utilisateur]
Status: [Investigating/Identified/Monitoring/Resolved]
Prochaine update: [Heure]
\`\`\`

### 5. Résolution et post-mortem

## On-call et escalation

\`\`\`yaml
# Rotation on-call (PagerDuty/OpsGenie)
schedule:
  - primary: rotation weekly
  - secondary: backup on-call
  - escalation: manager after 15min
\`\`\`

## Post-mortem blameless

Après chaque incident SEV1/SEV2 :
- Timeline factuelle des événements
- Analyse des causes racines (5 Whys)
- Action items avec responsables et deadlines
- Partage avec toute l'organisation
- Focus sur les **systèmes**, pas les personnes`;
}



// ============================================================
// GENERIC FALLBACK CONTENT — SMART GENERATION
// ============================================================

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateGenericContent(lessonTitle, chapterTitle, courseTitle) {
  const title = lessonTitle.toLowerCase();
  const chapter = chapterTitle.toLowerCase();
  const course = courseTitle.toLowerCase();

  let sections = [];

  sections.push(`# ${lessonTitle}\n`);
  sections.push(`> **Chapitre** : ${chapterTitle} | **Cours** : ${courseTitle}\n`);

  // Context section based on course
  sections.push(generateContextSection(lessonTitle, course));

  // Objectives
  sections.push(`## Objectifs de cette leçon\n\nÀ l'issue de cette leçon, vous serez capable de :\n`);
  const objectives = generateObjectives(title, chapter, course);
  sections.push(objectives.map(o => `- ${o}`).join('\n') + '\n');

  // Main content with code examples
  sections.push(`## Concepts clés\n`);
  sections.push(generateMainContent(title, chapter, course));

  // Practical section
  sections.push(`\n## Mise en pratique\n`);
  sections.push(generatePracticalContent(title, chapter, course));

  // Key takeaways
  sections.push(`\n## Points à retenir\n`);
  sections.push(generateKeyTakeaways(title, chapter, course));

  return sections.join('\n');
}



// ============================================================
// HELPER FUNCTIONS FOR GENERIC CONTENT
// ============================================================

function generateContextSection(lessonTitle, course) {
  if (course.includes('docker')) {
    return `## Contexte\n\nDans l'écosystème Docker et de la conteneurisation, ${lessonTitle.toLowerCase()} est un concept fondamental que tout ingénieur DevOps doit maîtriser pour gérer efficacement les applications conteneurisées en production.\n`;
  } else if (course.includes('kubernetes')) {
    return `## Contexte\n\nDans l'orchestration avec Kubernetes, ${lessonTitle.toLowerCase()} joue un rôle crucial dans la gestion des workloads distribués et l'automatisation du déploiement à grande échelle.\n`;
  } else if (course.includes('terraform')) {
    return `## Contexte\n\nDans la gestion d'infrastructure as code avec Terraform, ${lessonTitle.toLowerCase()} est essentiel pour provisionner et maintenir une infrastructure reproductible et versionée.\n`;
  } else if (course.includes('réseau') || course.includes('network')) {
    return `## Contexte\n\nLa compréhension de ${lessonTitle.toLowerCase()} est indispensable pour tout ingénieur DevOps. Les réseaux sont le fondement de toute communication entre services distribués.\n`;
  } else if (course.includes('linux') || course.includes('système')) {
    return `## Contexte\n\nL'administration système Linux est la base du DevOps. La maîtrise de ${lessonTitle.toLowerCase()} vous permettra de gérer efficacement vos serveurs et environnements de production.\n`;
  } else if (course.includes('ci/cd') || course.includes('github')) {
    return `## Contexte\n\nDans un pipeline CI/CD moderne, ${lessonTitle.toLowerCase()} est un élément clé pour automatiser le cycle de vie du développement logiciel, du commit au déploiement en production.\n`;
  } else if (course.includes('monitoring') || course.includes('prometheus')) {
    return `## Contexte\n\nL'observabilité est un pilier du DevOps moderne. ${lessonTitle} permet de surveiller, alerter et diagnostiquer les problèmes de vos systèmes distribués.\n`;
  } else if (course.includes('devsecops') || course.includes('sécurité')) {
    return `## Contexte\n\nLa sécurité ne doit plus être une étape finale du développement. ${lessonTitle} s'intègre dans une approche DevSecOps pour protéger vos applications et infrastructure dès les premières étapes.\n`;
  } else if (course.includes('gitops') || course.includes('argocd')) {
    return `## Contexte\n\nLe GitOps est un paradigme de déploiement qui utilise Git comme source de vérité. ${lessonTitle} est un concept clé pour implémenter des déploiements déclaratifs et automatisés.\n`;
  } else if (course.includes('aws') || course.includes('cloud')) {
    return `## Contexte\n\nSur AWS, ${lessonTitle.toLowerCase()} fait partie des services et concepts essentiels pour architecturer des applications cloud-native résilientes et scalables.\n`;
  } else if (course.includes('ansible')) {
    return `## Contexte\n\nAvec Ansible, ${lessonTitle.toLowerCase()} est un aspect fondamental de l'automatisation de la configuration et du déploiement d'applications sur vos serveurs.\n`;
  } else if (course.includes('sre') || course.includes('fiabilité')) {
    return `## Contexte\n\nEn Site Reliability Engineering, ${lessonTitle.toLowerCase()} est une pratique essentielle pour garantir la fiabilité, la disponibilité et les performances des services en production.\n`;
  }
  return `## Contexte\n\nDans le parcours DevOps, ${lessonTitle.toLowerCase()} est une compétence importante qui contribue à votre expertise globale en ingénierie de plateforme et automatisation.\n`;
}

function generateObjectives(title, chapter, course) {
  const objectives = [];

  if (title.includes('introduction') || title.includes('concepts') || title.includes('fondament')) {
    objectives.push("Comprendre les principes fondamentaux et l'architecture");
    objectives.push("Identifier les cas d'utilisation dans un environnement professionnel");
    objectives.push("Connaître l'historique et l'évolution de la technologie");
  } else if (title.includes('installation') || title.includes('configuration') || title.includes('déploiement') || title.includes('mise en place')) {
    objectives.push("Installer et configurer l'outil dans différents environnements");
    objectives.push("Valider la configuration avec des tests appropriés");
    objectives.push("Résoudre les problèmes d'installation courants");
  } else if (title.includes('commandes') || title.includes('cli') || title.includes('utilisation')) {
    objectives.push("Maîtriser les commandes essentielles du quotidien");
    objectives.push("Automatiser les tâches récurrentes");
    objectives.push("Diagnostiquer les erreurs courantes");
  } else if (title.includes('sécurité') || title.includes('securis') || title.includes('protection')) {
    objectives.push("Identifier les vulnérabilités et vecteurs d'attaque");
    objectives.push("Implémenter les contre-mesures appropriées");
    objectives.push("Auditer la conformité aux standards de sécurité");
  } else if (title.includes('monitoring') || title.includes('surveillance') || title.includes('observ')) {
    objectives.push("Configurer la collecte de métriques pertinentes");
    objectives.push("Créer des alertes basées sur des seuils significatifs");
    objectives.push("Diagnostiquer les incidents à partir des données collectées");
  } else if (title.includes('exercice') || title.includes('pratique') || title.includes('lab') || title.includes('projet')) {
    objectives.push("Appliquer les concepts théoriques dans un environnement réel");
    objectives.push("Développer un réflexe de résolution de problèmes");
    objectives.push("Valider votre compréhension par la pratique");
  } else if (title.includes('avancé') || title.includes('optimisation') || title.includes('performance')) {
    objectives.push("Optimiser les configurations pour la production");
    objectives.push("Appliquer les bonnes pratiques d'architecture avancée");
    objectives.push("Mesurer et améliorer les performances");
  } else if (title.includes('réseau') || title.includes('network') || title.includes('dns') || title.includes('tcp')) {
    objectives.push("Comprendre les flux réseau et protocoles impliqués");
    objectives.push("Diagnostiquer les problèmes de connectivité");
    objectives.push("Configurer les règles de routage et filtrage");
  } else if (title.includes('stockage') || title.includes('volume') || title.includes('persist')) {
    objectives.push("Choisir la stratégie de stockage adaptée au besoin");
    objectives.push("Configurer la persistance des données de manière fiable");
    objectives.push("Mettre en place des sauvegardes et plans de reprise");
  } else if (title.includes('automatisation') || title.includes('pipeline') || title.includes('workflow')) {
    objectives.push("Concevoir des workflows automatisés et maintenables");
    objectives.push("Implémenter des mécanismes de retry et de rollback");
    objectives.push("Monitorer et optimiser les pipelines existants");
  } else {
    objectives.push(`Comprendre en profondeur le concept de ${title}`);
    objectives.push("Appliquer les bonnes pratiques dans un contexte de production");
    objectives.push("Intégrer ce savoir dans votre workflow DevOps quotidien");
  }

  objectives.push("Documenter vos apprentissages et partager avec l'équipe");
  return objectives;
}

function generateMainContent(title, chapter, course) {
  let content = '';
  const hash = simpleHash(title + chapter + course);
  const pattern = hash % 5;

  switch(pattern) {
    case 0:
      content += `### Principes fondamentaux\n\nLe sujet « **${capitalize(title)}** » repose sur plusieurs principes importants :\n\n`;
      content += `1. **Compréhension du contexte** : Avant d'implémenter, il est crucial de comprendre pourquoi cette approche est utilisée et quels problèmes elle résout.\n`;
      content += `2. **Architecture** : La conception et la structure sous-jacente déterminent la scalabilité et la maintenabilité.\n`;
      content += `3. **Bonnes pratiques** : Suivre les recommandations de la communauté et les standards de l'industrie.\n\n`;
      content += generateCodeExample(title, chapter, course);
      break;
    case 1:
      content += `### Architecture et fonctionnement\n\nPour bien comprendre « **${capitalize(title)}** », il faut d'abord saisir son architecture :\n\n`;
      content += `- **Composants principaux** : chaque élément a un rôle précis dans l'ensemble du système\n`;
      content += `- **Flux de données** : comprendre comment les informations circulent entre les composants\n`;
      content += `- **Points d'intégration** : savoir comment connecter avec les autres outils de l'écosystème\n\n`;
      content += generateCodeExample(title, chapter, course);
      break;
    case 2:
      content += `### Implémentation pas à pas\n\nVoici les étapes clés pour implémenter « **${capitalize(title)}** » dans votre environnement :\n\n`;
      content += `**Étape 1** : Préparer l'environnement et les prérequis\n`;
      content += `**Étape 2** : Configurer les composants de base\n`;
      content += `**Étape 3** : Tester et valider le fonctionnement\n`;
      content += `**Étape 4** : Optimiser pour la production\n\n`;
      content += generateCodeExample(title, chapter, course);
      break;
    case 3:
      content += `### Comparaison et choix\n\nDans le contexte de « **${capitalize(title)}** », plusieurs approches sont possibles :\n\n`;
      content += `| Approche | Avantages | Inconvénients |\n`;
      content += `|----------|-----------|---------------|\n`;
      content += `| Standard | Simple, bien documenté | Peut manquer de flexibilité |\n`;
      content += `| Avancé | Plus de contrôle | Complexité accrue |\n`;
      content += `| Cloud-native | Scalable, managé | Coût, vendor lock-in |\n\n`;
      content += generateCodeExample(title, chapter, course);
      break;
    case 4:
      content += `### Les erreurs à éviter\n\nLors de la mise en œuvre de « **${capitalize(title)}** », voici les pièges courants :\n\n`;
      content += `- ❌ Ne pas tester suffisamment avant la mise en production\n`;
      content += `- ❌ Ignorer la documentation et les runbooks\n`;
      content += `- ❌ Sur-complexifier la solution\n`;
      content += `- ✅ Commencer simple et itérer\n`;
      content += `- ✅ Automatiser les tâches répétitives\n`;
      content += `- ✅ Monitorer et alerter dès le début\n\n`;
      content += generateCodeExample(title, chapter, course);
      break;
  }

  return content;
}

function generateCodeExample(title, chapter, course) {
  if (course.includes('docker')) {
    return generateDockerExample(title);
  } else if (course.includes('kubernetes')) {
    return generateK8sExample(title);
  } else if (course.includes('terraform')) {
    return generateTerraformExample(title);
  } else if (course.includes('linux') || course.includes('système')) {
    return generateLinuxExample(title);
  } else if (course.includes('réseau') || course.includes('network')) {
    return generateNetworkExample(title);
  } else if (course.includes('ci/cd') || course.includes('github')) {
    return generateCICDExample(title);
  } else if (course.includes('monitoring') || course.includes('prometheus')) {
    return generateMonitoringExample(title);
  } else if (course.includes('ansible')) {
    return generateAnsibleExample(title);
  } else if (course.includes('aws') || course.includes('cloud')) {
    return generateAWSExample(title);
  } else if (course.includes('sécurité') || course.includes('devsecops')) {
    return generateSecurityExample(title);
  } else if (course.includes('gitops') || course.includes('argocd')) {
    return generateGitOpsExample(title);
  } else if (course.includes('sre') || course.includes('fiabilité')) {
    return generateSREExample(title);
  }
  return generateGenericExample(title);
}

function generateDockerExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 6;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`dockerfile\n# Dockerfile optimisé pour ${capitalize(title)}\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY src/ ./src/\nRUN npm run build\n\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nUSER node\nEXPOSE 3000\nCMD ["node", "dist/server.js"]\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`bash\n# Commandes Docker pour ${title}\ndocker build -t mon-app:latest .\ndocker tag mon-app:latest registry.example.com/mon-app:v1.2.3\ndocker push registry.example.com/mon-app:v1.2.3\n\n# Vérifier l'image\ndocker inspect mon-app:latest\ndocker history mon-app:latest\n\n# Lancer avec les bonnes options\ndocker run -d \\\\\n  --name mon-app \\\\\n  --restart=unless-stopped \\\\\n  --memory=512m --cpus=1.0 \\\\\n  -p 8080:3000 \\\\\n  mon-app:latest\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# docker-compose.yml pour ${title}\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n      - DB_HOST=postgres\n    depends_on:\n      postgres:\n        condition: service_healthy\n    deploy:\n      resources:\n        limits:\n          memory: 512M\n\n  postgres:\n    image: postgres:15-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready"]\n      interval: 5s\n\nvolumes:\n  pgdata:\n\`\`\`\n`;
    case 3:
      return `### Exemple pratique\n\n\`\`\`bash\n# Diagnostic et debugging Docker - ${title}\n# Voir les logs en temps réel\ndocker logs -f --tail 100 mon-conteneur\n\n# Inspecter le réseau\ndocker network inspect bridge\n\n# Voir l'utilisation des ressources\ndocker stats --no-stream\n\n# Exécuter un shell dans un conteneur\ndocker exec -it mon-conteneur /bin/sh\n\n# Exporter/Importer une image\ndocker save mon-app:v1 | gzip > mon-app-v1.tar.gz\ndocker load < mon-app-v1.tar.gz\n\`\`\`\n`;
    case 4:
      return `### Exemple pratique\n\n\`\`\`dockerfile\n# Dockerfile sécurisé - ${title}\nFROM alpine:3.18\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nRUN apk add --no-cache ca-certificates tzdata\nWORKDIR /app\nCOPY --chown=appuser:appgroup ./bin/app ./app\nUSER appuser\nHEALTHCHECK --interval=30s --timeout=3s \\\\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1\nENTRYPOINT ["./app"]\n\`\`\`\n`;
    default:
      return '### Exemple pratique\n\n```bash\n# Gestion des volumes et données - ' + title + '\n# Créer un volume nommé\ndocker volume create app-data\n\n# Backup d\'un volume\ndocker run --rm -v app-data:/data -v $(pwd):/backup \\\\\n  alpine tar czf /backup/data-backup.tar.gz -C /data .\n\n# Nettoyage des ressources inutilisées\ndocker system prune -af --volumes\ndocker image prune -af --filter "until=720h"\n```\n';
  }
}

function generateK8sExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 6;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Deployment Kubernetes - ${capitalize(title)}\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-deployment\n  labels:\n    app: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n      - name: web\n        image: app:v2.0\n        ports:\n        - containerPort: 8080\n        resources:\n          requests:\n            cpu: "100m"\n            memory: "128Mi"\n          limits:\n            cpu: "500m"\n            memory: "256Mi"\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Service et Ingress - ${capitalize(title)}\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-service\nspec:\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 8080\n---\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: web-ingress\n  annotations:\n    cert-manager.io/cluster-issuer: letsencrypt-prod\nspec:\n  ingressClassName: nginx\n  tls:\n  - hosts:\n    - app.example.com\n    secretName: app-tls\n  rules:\n  - host: app.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-service\n            port:\n              number: 80\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`bash\n# Commandes kubectl essentielles - ${title}\n# Gestion des pods\nkubectl get pods -o wide\nkubectl describe pod mon-pod\nkubectl logs -f deployment/mon-app --all-containers\n\n# Debugging\nkubectl run debug --image=busybox -it --rm -- sh\nkubectl port-forward svc/mon-service 8080:80\n\n# Scaling et rollout\nkubectl scale deployment mon-app --replicas=5\nkubectl rollout status deployment/mon-app\nkubectl rollout undo deployment/mon-app\n\`\`\`\n`;
    case 3:
      return `### Exemple pratique\n\n\`\`\`yaml\n# HorizontalPodAutoscaler - ${capitalize(title)}\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: app-hpa\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: app-deployment\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 70\n  - type: Resource\n    resource:\n      name: memory\n      target:\n        type: Utilization\n        averageUtilization: 80\n\`\`\`\n`;
    case 4:
      return `### Exemple pratique\n\n\`\`\`yaml\n# NetworkPolicy - ${capitalize(title)}\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-network-policy\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes:\n  - Ingress\n  - Egress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - port: 3000\n  egress:\n  - to:\n    - podSelector:\n        matchLabels:\n          app: database\n    ports:\n    - port: 5432\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`yaml\n# PodDisruptionBudget et probes - ${capitalize(title)}\napiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata:\n  name: app-pdb\nspec:\n  minAvailable: 2\n  selector:\n    matchLabels:\n      app: web\n---\n# Probes de santé\nspec:\n  containers:\n  - name: app\n    livenessProbe:\n      httpGet:\n        path: /healthz\n        port: 8080\n      initialDelaySeconds: 15\n      periodSeconds: 10\n    readinessProbe:\n      httpGet:\n        path: /ready\n        port: 8080\n      initialDelaySeconds: 5\n\`\`\`\n`;
  }
}

function generateTerraformExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 5;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`hcl\n# Infrastructure Terraform - ${capitalize(title)}\nresource "aws_instance" "app" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = var.instance_type\n  subnet_id     = aws_subnet.private.id\n\n  vpc_security_group_ids = [aws_security_group.app.id]\n\n  user_data = templatefile("scripts/init.sh", {\n    environment = var.environment\n    app_version = var.app_version\n  })\n\n  tags = merge(local.common_tags, {\n    Name = "\${var.environment}-app-server"\n  })\n}\n\nresource "aws_security_group" "app" {\n  name_prefix = "\${var.environment}-app-"\n  vpc_id      = aws_vpc.main.id\n\n  ingress {\n    from_port   = 443\n    to_port     = 443\n    protocol    = "tcp"\n    cidr_blocks = [var.allowed_cidr]\n  }\n}\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`hcl\n# Module Terraform - ${capitalize(title)}\nmodule "vpc" {\n  source = "./modules/vpc"\n\n  vpc_cidr       = "10.0.0.0/16"\n  environment    = var.environment\n  azs            = ["eu-west-1a", "eu-west-1b"]\n  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]\n  private_subnets = ["10.0.10.0/24", "10.0.20.0/24"]\n}\n\nmodule "rds" {\n  source = "./modules/rds"\n\n  vpc_id          = module.vpc.vpc_id\n  subnet_ids      = module.vpc.private_subnet_ids\n  instance_class  = "db.t3.medium"\n  engine_version  = "15.4"\n  database_name   = "application"\n}\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`hcl\n# Variables et locals - ${capitalize(title)}\nvariable "environment" {\n  type        = string\n  description = "Environnement (dev/staging/prod)"\n  validation {\n    condition     = contains(["dev", "staging", "prod"], var.environment)\n    error_message = "Environnement invalide."\n  }\n}\n\nlocals {\n  name_prefix = "\${var.project}-\${var.environment}"\n  common_tags = {\n    Environment = var.environment\n    ManagedBy   = "terraform"\n    Team        = var.team\n  }\n}\n\noutput "endpoint" {\n  value       = aws_lb.main.dns_name\n  description = "URL du load balancer"\n}\n\`\`\`\n`;
    case 3:
      return `### Exemple pratique\n\n\`\`\`bash\n# Workflow Terraform - ${title}\n# Initialiser le projet\nterraform init\n\n# Valider la syntaxe\nterraform validate\n\n# Planifier les changements\nterraform plan -out=tfplan -var-file=prod.tfvars\n\n# Appliquer le plan\nterraform apply tfplan\n\n# Gérer le state\nterraform state list\nterraform state show aws_instance.app\nterraform import aws_s3_bucket.existing my-bucket\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`hcl\n# Backend et providers - ${capitalize(title)}\nterraform {\n  required_version = ">= 1.5.0"\n\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n\n  backend "s3" {\n    bucket         = "terraform-state-prod"\n    key            = "infra/terraform.tfstate"\n    region         = "eu-west-1"\n    encrypt        = true\n    dynamodb_table = "terraform-locks"\n  }\n}\n\nprovider "aws" {\n  region = var.aws_region\n  default_tags {\n    tags = local.common_tags\n  }\n}\n\`\`\`\n`;
  }
}

function generateLinuxExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 6;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`bash\n# Administration système - ${title}\n# Gestion des services\nsudo systemctl status nginx\nsudo systemctl restart nginx\njournalctl -u nginx --since "10 minutes ago"\n\n# Surveillance des ressources\nfree -h\ndf -h\niostat -x 1 5\nsar -u 1 10\n\n# Gestion des utilisateurs\nsudo useradd -m -s /bin/bash -G docker devops\nsudo passwd devops\n\`\`\`\n`;
    case 1:
      return '### Exemple pratique\n\n```bash\n# Script bash - ' + title + '\n#!/bin/bash\nset -euo pipefail\n\nLOG_DIR="/var/log/app"\nMAX_SIZE="100M"\n\n# Rotation des logs\nfind "$LOG_DIR" -name "*.log" -size +$MAX_SIZE -exec gzip {} \\;\nfind "$LOG_DIR" -name "*.gz" -mtime +30 -delete\n\n# Vérification espace disque\nUSAGE=$(df -h / | awk \'NR==2 {print $5}\' | tr -d \'%\')\nif [ "$USAGE" -gt 85 ]; then\n  echo "ALERTE: Espace disque à ${USAGE}%" | mail -s "Disk Alert" admin@example.com\nfi\n```\n';
    case 2:
      return `### Exemple pratique\n\n\`\`\`bash\n# Réseau et diagnostic - ${title}\n# Connexions actives\nss -tlnp\nnetstat -tuln\n\n# DNS et résolution\ndig example.com +short\nnslookup example.com\n\n# Diagnostic réseau\ntraceroute -n example.com\nmtr --report example.com\ncurl -v -o /dev/null https://api.example.com/health\n\n# Firewall\nsudo ufw status verbose\nsudo ufw allow from 10.0.0.0/8 to any port 22\n\`\`\`\n`;
    case 3:
      return '### Exemple pratique\n\n```bash\n# Gestion des fichiers et recherche - ' + title + '\n# Recherche avancée\nfind /var/log -name "*.log" -mtime -7 -size +10M\ngrep -rn "ERROR" /var/log/app/ --include="*.log"\n\n# Manipulation de texte\nawk \'{print $1, $4}\' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20\nsed -i \'s/old_value/new_value/g\' /etc/app/config.yml\n\n# Archivage et compression\ntar czf backup-$(date +%Y%m%d).tar.gz /opt/app/data/\n```\n';
    case 4:
      return `### Exemple pratique\n\n\`\`\`bash\n# Gestion des processus - ${title}\n# Surveillance en temps réel\ntop -bn1 | head -20\nps aux --sort=-%mem | head -10\n\n# Limiter les ressources (cgroups)\nsystemd-run --scope -p MemoryMax=512M ./mon-script.sh\n\n# Planification de tâches\n# Éditer la crontab\ncrontab -e\n# Backup quotidien à 2h du matin\n# 0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1\n\n# Surveiller un processus\nwatch -n 2 'ps aux | grep [n]ginx'\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`bash\n# Sécurité système - ${title}\n# Audit des permissions\nfind / -perm -4000 -type f 2>/dev/null  # Fichiers SUID\nfind /home -name ".ssh" -exec ls -la {} \\;\n\n# Durcissement SSH\nsudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config\nsudo sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config\nsudo systemctl restart sshd\n\n# Mise à jour de sécurité\nsudo apt update && sudo apt upgrade -y --security\n\`\`\`\n`;
  }
}

function generateNetworkExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 4;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`bash\n# Diagnostic réseau - ${title}\n# Analyse de trafic\nsudo tcpdump -i eth0 -n port 80 -c 100\nsudo tcpdump -i any -w capture.pcap host 10.0.1.5\n\n# Test de connectivité\nnc -zv 10.0.1.5 443\ncurl -sS -o /dev/null -w "%{http_code} %{time_total}s" https://api.example.com\n\n# Résolution DNS\ndig +trace example.com\ndig @8.8.8.8 example.com A +short\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`bash\n# Configuration réseau - ${title}\n# Interfaces et routes\nip addr show\nip route show\nip route add 10.10.0.0/16 via 192.168.1.1\n\n# Firewall avec nftables\nsudo nft add table inet filter\nsudo nft add chain inet filter input '{ type filter hook input priority 0; policy drop; }'\nsudo nft add rule inet filter input tcp dport { 22, 80, 443 } accept\nsudo nft add rule inet filter input ct state established,related accept\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`nginx\n# Configuration reverse proxy - ${title}\nupstream backend {\n    least_conn;\n    server 10.0.1.10:3000;\n    server 10.0.1.11:3000;\n    server 10.0.1.12:3000;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name api.example.com;\n\n    ssl_certificate /etc/ssl/certs/app.crt;\n    ssl_certificate_key /etc/ssl/private/app.key;\n\n    location / {\n        proxy_pass http://backend;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    }\n}\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`bash\n# Surveillance réseau - ${title}\n# Bande passante et latence\niperf3 -s  # Serveur\niperf3 -c 10.0.1.5 -t 30  # Client\n\n# Statistiques réseau\nss -s  # Résumé des sockets\nnstat  # Statistiques réseau\n\n# Détection de problèmes\nmtr --report-wide --report-cycles 10 example.com\nping -c 10 -i 0.2 gateway.local\n\n# ARP et voisins\nip neigh show\narp -a\n\`\`\`\n`;
  }
}

function generateCICDExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 5;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`yaml\n# GitHub Actions workflow - ${capitalize(title)}\nname: CI Pipeline\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test -- --coverage\n      - uses: actions/upload-artifact@v4\n        with:\n          name: coverage\n          path: coverage/\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Pipeline de déploiement - ${capitalize(title)}\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    needs: [test, build]\n    if: github.ref == 'refs/heads/main'\n    environment: production\n    steps:\n      - uses: actions/checkout@v4\n      - name: Configure AWS credentials\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456:role/deploy\n          aws-region: eu-west-1\n      - name: Deploy to ECS\n        run: |\n          aws ecs update-service \\\\\n            --cluster prod \\\\\n            --service api \\\\\n            --force-new-deployment\n      - name: Wait for stability\n        run: |\n          aws ecs wait services-stable \\\\\n            --cluster prod --services api\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Build et push Docker image - ${capitalize(title)}\njobs:\n  build:\n    runs-on: ubuntu-latest\n    outputs:\n      image_tag: \${{ steps.meta.outputs.tags }}\n    steps:\n      - uses: actions/checkout@v4\n      - uses: docker/setup-buildx-action@v3\n      - uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: \${{ github.actor }}\n          password: \${{ secrets.GITHUB_TOKEN }}\n      - id: meta\n        uses: docker/metadata-action@v5\n        with:\n          images: ghcr.io/\${{ github.repository }}\n          tags: |\n            type=sha\n            type=semver,pattern={{version}}\n      - uses: docker/build-push-action@v5\n        with:\n          push: true\n          tags: \${{ steps.meta.outputs.tags }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n\`\`\`\n`;
    case 3:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Tests matriciels et cache - ${capitalize(title)}\njobs:\n  test:\n    strategy:\n      matrix:\n        os: [ubuntu-latest, macos-latest]\n        node: [18, 20, 22]\n      fail-fast: false\n    runs-on: \${{ matrix.os }}\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \${{ matrix.node }}\n      - uses: actions/cache@v4\n        with:\n          path: ~/.npm\n          key: \${{ runner.os }}-node-\${{ matrix.node }}-\${{ hashFiles('package-lock.json') }}\n      - run: npm ci\n      - run: npm test\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Sécurité dans le pipeline - ${capitalize(title)}\njobs:\n  security:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Trivy vulnerability scanner\n        uses: aquasecurity/trivy-action@master\n        with:\n          scan-type: 'fs'\n          severity: 'CRITICAL,HIGH'\n          exit-code: '1'\n      - name: Run Semgrep\n        uses: returntocorp/semgrep-action@v1\n        with:\n          config: p/owasp-top-ten\n      - name: Check secrets\n        uses: trufflesecurity/trufflehog@main\n        with:\n          extra_args: --only-verified\n\`\`\`\n`;
  }
}

function generateMonitoringExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 5;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`promql\n# Requêtes PromQL - ${title}\n# Taux d'erreurs HTTP (5xx) sur 5 minutes\nsum(rate(http_requests_total{status=~"5.."}[5m])) by (service)\n  /\nsum(rate(http_requests_total[5m])) by (service)\n\n# Latence P95\nhistogram_quantile(0.95,\n  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)\n)\n\n# Utilisation CPU par pod\nsum(rate(container_cpu_usage_seconds_total[5m])) by (pod)\n  /\nsum(kube_pod_container_resource_limits{resource="cpu"}) by (pod)\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Règles d'alerte Prometheus - ${capitalize(title)}\ngroups:\n- name: application\n  rules:\n  - alert: HighErrorRate\n    expr: |\n      sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)\n        / sum(rate(http_requests_total[5m])) by (service) > 0.05\n    for: 5m\n    labels:\n      severity: critical\n    annotations:\n      summary: "Taux d'erreur > 5% pour {{ $labels.service }}"\n      description: "Le service {{ $labels.service }} a un taux d'erreur de {{ $value | humanizePercentage }}"\n\n  - alert: HighLatency\n    expr: |\n      histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)) > 2\n    for: 10m\n    labels:\n      severity: warning\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Configuration Prometheus scrape - ${capitalize(title)}\nscrape_configs:\n  - job_name: 'kubernetes-pods'\n    kubernetes_sd_configs:\n      - role: pod\n    relabel_configs:\n      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n        action: keep\n        regex: true\n      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]\n        action: replace\n        target_label: __address__\n        regex: (.+)\n        replacement: \${1}:\${2}\n\`\`\`\n`;
    case 3:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Dashboard Grafana JSON - ${capitalize(title)}\n# grafana/dashboards/overview.json (provisioning)\napiVersion: 1\nproviders:\n  - name: default\n    folder: ''\n    type: file\n    options:\n      path: /var/lib/grafana/dashboards\n\n# Datasource provisioning\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    url: http://prometheus:9090\n    isDefault: true\n  - name: Loki\n    type: loki\n    url: http://loki:3100\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`bash\n# Instrumentation et métriques - ${title}\n# Vérifier les métriques exposées\ncurl -s http://localhost:9090/metrics | grep -v '^#' | head -20\n\n# Node exporter - métriques système\ncurl -s http://localhost:9100/metrics | grep node_cpu\n\n# Blackbox exporter - probes externes\ncurl -s "http://localhost:9115/probe?target=https://example.com&module=http_2xx"\n\n# Alertmanager - vérifier les alertes actives\ncurl -s http://localhost:9093/api/v2/alerts | jq '.[].labels.alertname'\n\`\`\`\n`;
  }
}

function generateAnsibleExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 4;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Playbook Ansible - ${capitalize(title)}\n---\n- name: Configuration serveur web\n  hosts: webservers\n  become: yes\n  vars:\n    app_port: 3000\n    app_user: appuser\n\n  tasks:\n    - name: Installer les paquets nécessaires\n      apt:\n        name: "{{ item }}"\n        state: present\n        update_cache: yes\n      loop:\n        - nginx\n        - certbot\n        - python3-certbot-nginx\n\n    - name: Créer l'utilisateur applicatif\n      user:\n        name: "{{ app_user }}"\n        shell: /bin/bash\n        groups: docker\n        append: yes\n\n    - name: Déployer la configuration nginx\n      template:\n        src: templates/nginx.conf.j2\n        dest: /etc/nginx/sites-available/app\n      notify: Restart nginx\n\n  handlers:\n    - name: Restart nginx\n      systemd:\n        name: nginx\n        state: restarted\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Rôle Ansible - ${capitalize(title)}\n# roles/docker/tasks/main.yml\n---\n- name: Ajouter la clé GPG Docker\n  apt_key:\n    url: https://download.docker.com/linux/ubuntu/gpg\n    state: present\n\n- name: Ajouter le repo Docker\n  apt_repository:\n    repo: "deb https://download.docker.com/linux/ubuntu {{ ansible_distribution_release }} stable"\n    state: present\n\n- name: Installer Docker\n  apt:\n    name:\n      - docker-ce\n      - docker-ce-cli\n      - containerd.io\n    state: present\n\n- name: Démarrer et activer Docker\n  systemd:\n    name: docker\n    state: started\n    enabled: yes\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Inventaire dynamique et variables - ${capitalize(title)}\n# inventory/production.yml\nall:\n  vars:\n    ansible_user: deploy\n    ansible_ssh_private_key_file: ~/.ssh/deploy_key\n  children:\n    webservers:\n      hosts:\n        web1:\n          ansible_host: 10.0.1.10\n        web2:\n          ansible_host: 10.0.1.11\n    databases:\n      hosts:\n        db1:\n          ansible_host: 10.0.2.10\n          db_role: primary\n        db2:\n          ansible_host: 10.0.2.11\n          db_role: replica\n\`\`\`\n\n\`\`\`bash\n# Exécution\nansible-playbook -i inventory/production.yml site.yml --diff\nansible-playbook site.yml --tags "deploy" --limit webservers\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Ansible Vault et secrets - ${capitalize(title)}\n# Chiffrer un fichier de variables\n# ansible-vault encrypt vars/secrets.yml\n\n# vars/secrets.yml (chiffré)\ndb_password: "S3cur3P@ss!"\napi_token: "sk-abc123def456"\n\n# Utilisation dans un playbook\n- name: Déployer avec secrets\n  hosts: app_servers\n  vars_files:\n    - vars/secrets.yml\n  tasks:\n    - name: Configurer l'application\n      template:\n        src: app.env.j2\n        dest: /opt/app/.env\n        mode: '0600'\n        owner: appuser\n\`\`\`\n\n\`\`\`bash\n# Exécuter avec le vault password\nansible-playbook site.yml --ask-vault-pass\nansible-playbook site.yml --vault-password-file ~/.vault_pass\n\`\`\`\n`;
  }
}

function generateAWSExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 5;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`bash\n# AWS CLI - ${title}\n# Gestion des instances EC2\naws ec2 describe-instances --filters "Name=tag:Environment,Values=production" \\\\\n  --query 'Reservations[].Instances[].{ID:InstanceId,IP:PublicIpAddress,State:State.Name}'\n\n# Gestion S3\naws s3 sync ./build s3://my-app-bucket/static/ --delete\naws s3api put-bucket-policy --bucket my-app-bucket --policy file://policy.json\n\n# Logs CloudWatch\naws logs get-log-events --log-group-name /ecs/api --log-stream-name latest \\\\\n  --limit 50 --start-from-head\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`hcl\n# AWS avec Terraform - ${capitalize(title)}\nresource "aws_ecs_service" "api" {\n  name            = "api-service"\n  cluster         = aws_ecs_cluster.main.id\n  task_definition = aws_ecs_task_definition.api.arn\n  desired_count   = 3\n  launch_type     = "FARGATE"\n\n  network_configuration {\n    subnets         = module.vpc.private_subnet_ids\n    security_groups = [aws_security_group.ecs.id]\n  }\n\n  load_balancer {\n    target_group_arn = aws_lb_target_group.api.arn\n    container_name   = "api"\n    container_port   = 3000\n  }\n}\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`hcl\n# IAM et sécurité AWS - ${capitalize(title)}\nresource "aws_iam_role" "ecs_task" {\n  name = "ecs-task-role"\n  assume_role_policy = jsonencode({\n    Version = "2012-10-17"\n    Statement = [{\n      Action = "sts:AssumeRole"\n      Effect = "Allow"\n      Principal = {\n        Service = "ecs-tasks.amazonaws.com"\n      }\n    }]\n  })\n}\n\nresource "aws_iam_role_policy" "s3_access" {\n  name = "s3-read-access"\n  role = aws_iam_role.ecs_task.id\n  policy = jsonencode({\n    Version = "2012-10-17"\n    Statement = [{\n      Effect   = "Allow"\n      Action   = ["s3:GetObject", "s3:ListBucket"]\n      Resource = ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"]\n    }]\n  })\n}\n\`\`\`\n`;
    case 3:
      return `### Exemple pratique\n\n\`\`\`bash\n# AWS ECS et déploiement - ${title}\n# Mettre à jour un service ECS\naws ecs update-service \\\\\n  --cluster production \\\\\n  --service api \\\\\n  --task-definition api:42 \\\\\n  --force-new-deployment\n\n# Attendre la stabilisation\naws ecs wait services-stable --cluster production --services api\n\n# Voir les tâches en cours\naws ecs list-tasks --cluster production --service-name api\n\n# Exécuter une commande dans un conteneur ECS (ECS Exec)\naws ecs execute-command \\\\\n  --cluster production \\\\\n  --task arn:aws:ecs:eu-west-1:123456:task/abc123 \\\\\n  --container api \\\\\n  --interactive --command "/bin/sh"\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`hcl\n# ALB et Auto Scaling AWS - ${capitalize(title)}\nresource "aws_lb" "main" {\n  name               = "app-alb"\n  internal           = false\n  load_balancer_type = "application"\n  subnets            = module.vpc.public_subnet_ids\n  security_groups    = [aws_security_group.alb.id]\n}\n\nresource "aws_lb_listener" "https" {\n  load_balancer_arn = aws_lb.main.arn\n  port              = 443\n  protocol          = "HTTPS"\n  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"\n  certificate_arn   = aws_acm_certificate.main.arn\n\n  default_action {\n    type             = "forward"\n    target_group_arn = aws_lb_target_group.app.arn\n  }\n}\n\`\`\`\n`;
  }
}

function generateSecurityExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 4;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Pipeline sécurité - ${capitalize(title)}\n# .github/workflows/security.yml\njobs:\n  security-scan:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Trivy filesystem scan\n        uses: aquasecurity/trivy-action@master\n        with:\n          scan-type: fs\n          severity: CRITICAL,HIGH\n          exit-code: 1\n      - name: Gitleaks - détection de secrets\n        uses: gitleaks/gitleaks-action@v2\n      - name: OWASP Dependency Check\n        run: |\n          npm audit --audit-level=high\n          npx better-npm-audit audit\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`bash\n# Scan de vulnérabilités - ${title}\n# Scanner une image avec Trivy\ntrivy image --severity HIGH,CRITICAL mon-app:latest\n\n# Scanner le filesystem\ntrivy fs --security-checks vuln,config ./\n\n# Scanner les dépendances\ntrivy fs --scanners vuln package-lock.json\n\n# Générer un SBOM\ntrivy image --format cyclonedx -o sbom.json mon-app:latest\n\n# Vérifier les politiques OPA\nconftest test deployment.yaml -p policy/\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Politique de sécurité Kubernetes - ${capitalize(title)}\napiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 1000\n    fsGroup: 2000\n  containers:\n  - name: app\n    image: app:v1\n    securityContext:\n      allowPrivilegeEscalation: false\n      readOnlyRootFilesystem: true\n      capabilities:\n        drop:\n          - ALL\n    resources:\n      limits:\n        cpu: "500m"\n        memory: "256Mi"\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`bash\n# Gestion des secrets et chiffrement - ${title}\n# Chiffrer avec SOPS\nsops --encrypt --age age1xxx... secrets.yaml > secrets.enc.yaml\nsops --decrypt secrets.enc.yaml\n\n# Sealed Secrets pour Kubernetes\nkubeseal --format yaml < secret.yaml > sealed-secret.yaml\nkubectl apply -f sealed-secret.yaml\n\n# Rotation de secrets\nvault write -f transit/keys/app/rotate\nvault read database/creds/readonly  # Credentials dynamiques\n\`\`\`\n`;
  }
}

function generateGitOpsExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 4;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Application ArgoCD - ${capitalize(title)}\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: mon-app\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/org/k8s-manifests\n    targetRevision: main\n    path: apps/mon-app/overlays/production\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: production\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n    syncOptions:\n      - CreateNamespace=true\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Kustomize overlay - ${capitalize(title)}\n# base/kustomization.yaml\nresources:\n  - deployment.yaml\n  - service.yaml\n  - ingress.yaml\n\n# overlays/production/kustomization.yaml\nbases:\n  - ../../base\nnamePrefix: prod-\nnamespace: production\npatches:\n  - target:\n      kind: Deployment\n      name: app\n    patch: |\n      - op: replace\n        path: /spec/replicas\n        value: 5\nimages:\n  - name: app\n    newTag: v2.1.0\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Flux CD - ${capitalize(title)}\napiVersion: source.toolkit.fluxcd.io/v1\nkind: GitRepository\nmetadata:\n  name: app-manifests\n  namespace: flux-system\nspec:\n  interval: 1m\n  url: https://github.com/org/manifests\n  ref:\n    branch: main\n---\napiVersion: kustomize.toolkit.fluxcd.io/v1\nkind: Kustomization\nmetadata:\n  name: app\n  namespace: flux-system\nspec:\n  interval: 5m\n  path: ./apps/production\n  prune: true\n  sourceRef:\n    kind: GitRepository\n    name: app-manifests\n  healthChecks:\n    - kind: Deployment\n      name: app\n      namespace: production\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`bash\n# Workflow GitOps - ${title}\n# Structure du repo de manifestes\n# manifests/\n# ├── base/\n# │   ├── deployment.yaml\n# │   ├── service.yaml\n# │   └── kustomization.yaml\n# ├── overlays/\n# │   ├── dev/\n# │   ├── staging/\n# │   └── production/\n# └── apps/\n#     └── argocd-app.yaml\n\n# Promouvoir une version\ncd manifests/overlays/production\nkustomize edit set image app=registry.example.com/app:v2.1.0\ngit add . && git commit -m "release: promote app v2.1.0 to production"\ngit push origin main\n# ArgoCD détecte le changement et déploie automatiquement\n\`\`\`\n`;
  }
}

function generateSREExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 4;
  switch(variant) {
    case 0:
      return `### Exemple pratique\n\n\`\`\`promql\n# SLI et Error Budget - ${title}\n# SLI de disponibilité (fenêtre 30 jours)\nsum(rate(http_requests_total{status!~"5.."}[30d]))\n  /\nsum(rate(http_requests_total[30d]))\n\n# Burn rate (consommation du budget)\n(\n  1 - (\n    sum(rate(http_requests_total{status!~"5.."}[1h]))\n    / sum(rate(http_requests_total[1h]))\n  )\n) / (1 - 0.999)  # SLO = 99.9%\n\n# Alerte multi-window burn rate\n# Fenêtre rapide (5min) ET lente (1h)\n(\n  (1 - sli_ratio:5m) > 14.4 * (1 - 0.999)\n  AND\n  (1 - sli_ratio:1h) > 14.4 * (1 - 0.999)\n)\n\`\`\`\n`;
    case 1:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Runbook d'incident - ${capitalize(title)}\n# runbooks/high-error-rate.md structure :\n# 1. Vérification :\ndiagnostic_commands:\n  - kubectl get pods -l app=api | grep -v Running\n  - kubectl logs -l app=api --tail=50 --since=5m\n  - curl -s http://api-service/health | jq .\n\n# 2. Actions de mitigation :\nmitigation_steps:\n  - Vérifier les déploiements récents: kubectl rollout history deployment/api\n  - Rollback si nécessaire: kubectl rollout undo deployment/api\n  - Scaler si surcharge: kubectl scale deployment/api --replicas=10\n  - Activer le circuit breaker si dépendance en erreur\n\n# 3. Escalation :\nescalation:\n  - 5min sans résolution: Alerter le tech lead\n  - 15min: Incident commander\n  - 30min: Management notification\n\`\`\`\n`;
    case 2:
      return `### Exemple pratique\n\n\`\`\`bash\n# Chaos Engineering - ${title}\n# Chaos Mesh - injection de pannes\nkubectl apply -f - <<EOF\napiVersion: chaos-mesh.org/v1alpha1\nkind: PodChaos\nmetadata:\n  name: pod-kill-test\nspec:\n  action: pod-kill\n  mode: one\n  selector:\n    namespaces: [production]\n    labelSelectors:\n      app: api\n  scheduler:\n    cron: "@every 2h"\nEOF\n\n# Litmus Chaos - test de résilience réseau\n# Vérifier la tolérance aux pannes réseau\nkubectl apply -f network-delay-experiment.yaml\n\n# Vérifier que le SLO est maintenu pendant le chaos\ncurl -s http://prometheus:9090/api/v1/query?query=sli_ratio:5m\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Capacity Planning - ${capitalize(title)}\n# Requêtes de planification de capacité\n\n# Prévision de croissance (régression linéaire)\n# predict_linear(metric[duration], seconds_ahead)\npredict_linear(\n  sum(container_memory_usage_bytes{namespace=\"prod\"})[7d:1h], 30*24*3600\n)\n\n# Saturation des ressources\nsum(kube_pod_container_resource_requests{resource=\"cpu\"})\n  /\nsum(kube_node_status_allocatable{resource=\"cpu\"})\n\n# Toil budget - temps passé sur les tâches manuelles\n# Objectif: < 50% du temps de l'équipe SRE\n# Automatiser les tâches récurrentes identifiées\n# Mesurer: incidents/semaine, temps moyen de résolution\n\`\`\`\n`;
  }
}

function generateGenericExample(title) {
  const hash = simpleHash(title);
  const variant = hash % 4;
  switch(variant) {
    case 0:
      return '### Exemple pratique\n\n```bash\n# Mise en pratique - ' + title + '\n# Vérifier l\'état du système\nsystemctl status --no-pager\nfree -h && df -h\n\n# Diagnostic rapide\njournalctl --since "30 minutes ago" -p err\ndmesg | tail -20\n\n# Documentation\necho "## $(date +%Y-%m-%d) - ' + title + '" >> /opt/docs/runbook.md\necho "Procédure validée et documentée" >> /opt/docs/runbook.md\n```\n';
    case 1:
      return '### Exemple pratique\n\n```bash\n# Automatisation - ' + title + '\n#!/bin/bash\nset -euo pipefail\n\nTIMESTAMP=$(date +%Y%m%d_%H%M%S)\nLOG_FILE="/var/log/devops/task-${TIMESTAMP}.log"\n\necho "[INFO] Début de l\'opération: ' + title + '" | tee -a "$LOG_FILE"\n\n# Exécution avec retry\nfor i in {1..3}; do\n  if command_to_execute; then\n    echo "[OK] Opération réussie" | tee -a "$LOG_FILE"\n    break\n  fi\n  echo "[RETRY] Tentative $i échouée, retry dans 10s..." | tee -a "$LOG_FILE"\n  sleep 10\ndone\n```\n';
    case 2:
      return `### Exemple pratique\n\n\`\`\`yaml\n# Configuration déclarative - ${capitalize(title)}\n---\nproject:\n  name: devops-platform\n  environment: production\n  version: "2.0"\n\ncomponents:\n  - name: api\n    replicas: 3\n    resources:\n      cpu: "500m"\n      memory: "512Mi"\n    healthcheck:\n      endpoint: /health\n      interval: 10s\n\n  - name: worker\n    replicas: 2\n    resources:\n      cpu: "1000m"\n      memory: "1Gi"\n\nmonitoring:\n  enabled: true\n  alerting:\n    slack_channel: "#ops-alerts"\n\`\`\`\n`;
    default:
      return `### Exemple pratique\n\n\`\`\`bash\n# Workflow DevOps - ${title}\n# 1. Vérification pré-déploiement\necho "=== Pre-flight checks ==="\nkubectl cluster-info\nkubectl get nodes\nhelm list -A\n\n# 2. Déploiement\necho "=== Deploying ==="\nhelm upgrade --install app ./chart \\\\\n  --namespace production \\\\\n  --values values-prod.yaml \\\\\n  --wait --timeout 5m\n\n# 3. Validation post-déploiement\necho "=== Post-deploy validation ==="\nkubectl rollout status deployment/app -n production\ncurl -sf http://app.example.com/health || exit 1\necho "Deployment successful!"\n\`\`\`\n`;
  }
}

function generatePracticalContent(title, chapter, course) {
  const hash = simpleHash(title + chapter);
  const variant = hash % 5;

  switch(variant) {
    case 0:
      return `Pour mettre en pratique « **${capitalize(title)}** », suivez cet exercice :\n\n1. **Environnement** : Créez un environnement de test isolé (VM, conteneur, ou cloud sandbox)\n2. **Implémentation** : Reproduisez les exemples ci-dessus en les adaptant à votre contexte\n3. **Tests** : Validez chaque étape avec des tests automatisés\n4. **Documentation** : Documentez votre configuration dans un README ou un wiki d'équipe\n5. **Review** : Faites relire votre implémentation par un pair\n`;
    case 1:
      return `### Exercice guidé\n\nCréez un mini-projet qui implémente « **${capitalize(title)}** » :\n\n- Commencez par définir les prérequis et dépendances\n- Implémentez une version minimale fonctionnelle\n- Ajoutez les tests et la validation\n- Intégrez dans un pipeline CI/CD\n- Mesurez les résultats et itérez\n\n> **Conseil** : Versionnez tout dans Git dès le début, même les brouillons. L'historique vous aidera à comprendre votre progression.\n`;
    case 2:
      return `### Travaux pratiques\n\n**Objectif** : Implémenter ${capitalize(title)} dans un environnement réaliste.\n\n**Pré-requis** :\n- Un terminal Linux (ou WSL2 sous Windows)\n- Docker et Docker Compose installés\n- Un éditeur de code (VS Code recommandé)\n\n**Étapes** :\n1. Clonez le repository d'exercices du cours\n2. Naviguez vers le dossier de l'exercice\n3. Suivez les instructions du README.md\n4. Validez avec les tests fournis : \`make test\`\n`;
    case 3:
      return `### Atelier pratique\n\nAppliquez les concepts de « **${capitalize(title)}** » en situation réelle :\n\n| Étape | Action | Validation |\n|-------|--------|------------|\n| 1 | Setup de l'environnement | Tous les services démarrent |\n| 2 | Configuration initiale | Tests de smoke passent |\n| 3 | Ajout des fonctionnalités | Tests d'intégration OK |\n| 4 | Hardening production | Scan de sécurité clean |\n| 5 | Monitoring | Dashboards et alertes actifs |\n\n> **Challenge bonus** : Automatisez l'ensemble du processus dans un Makefile ou un script.\n`;
    default:
      return `### Mise en situation\n\nImaginez que vous devez implémenter « **${capitalize(title)}** » pour un client avec les contraintes suivantes :\n- Haute disponibilité (99.9% SLA)\n- Budget limité (utiliser des outils open-source)\n- Équipe de 3 ingénieurs DevOps\n- Deadline : 2 semaines\n\n**Votre plan d'action** :\n1. Identifier les composants critiques\n2. Prioriser par impact business\n3. Implémenter de manière itérative\n4. Automatiser les tâches récurrentes\n5. Documenter pour le handover\n`;
  }
}

function generateKeyTakeaways(title, chapter, course) {
  const hash = simpleHash(title + course);
  const variant = hash % 4;

  const topicName = capitalize(title);

  switch(variant) {
    case 0:
      return `- **${topicName}** est un élément fondamental de l'écosystème DevOps moderne\n- L'automatisation et la reproductibilité sont les clés du succès\n- Testez toujours dans un environnement isolé avant la production\n- La documentation est aussi importante que l'implémentation\n- Mesurez l'impact de chaque changement avec des métriques\n`;
    case 1:
      return `- La maîtrise de **${topicName}** vous distinguera en tant qu'ingénieur DevOps\n- Commencez simple, puis itérez vers la complexité\n- Les bonnes pratiques évoluent : restez en veille technologique\n- Partagez vos apprentissages avec votre équipe (lunch & learn, wiki)\n- L'échec en environnement de test est un apprentissage, pas une erreur\n`;
    case 2:
      return `- **${topicName}** s'intègre dans une chaîne d'outils plus large\n- La sécurité doit être intégrée dès la conception (shift-left)\n- L'observabilité (logs, métriques, traces) est indispensable en production\n- Privilégiez l'approche Infrastructure as Code pour la reproductibilité\n- Chaque décision technique doit être documentée (ADR - Architecture Decision Record)\n`;
    default:
      return `- Retenez les principes avant les commandes : les outils changent, les concepts restent\n- **${topicName}** contribue directement à la vélocité et la fiabilité de votre équipe\n- Pratiquez régulièrement : créez des labs personnels pour expérimenter\n- Collaborez avec les développeurs pour une adoption réussie\n- Mesurez le ROI de chaque amélioration pour justifier les investissements\n`;
  }
}

// ============================================================
// MAIN SEED FUNCTION
// ============================================================

async function seedLessonContent() {
  const db = getDb();
  console.log('\n📝 Mise à jour du contenu des leçons...');

  // Get all lessons with context
  const lessons = await db.execute({
    sql: `SELECT l.id, l.title, l.content_type, c.title as chapter_title, co.title as course_title 
          FROM lessons l 
          JOIN chapters c ON l.chapter_id = c.id 
          JOIN courses co ON c.course_id = co.id 
          ORDER BY co.id, c.order_index, l.order_index`,
    args: []
  });

  console.log(`  📚 ${lessons.rows.length} leçons trouvées`);

  let updated = 0;
  for (const lesson of lessons.rows) {
    const content = generateContent(lesson.title, lesson.chapter_title, lesson.course_title);
    await db.execute({
      sql: 'UPDATE lessons SET content = ? WHERE id = ?',
      args: [content, lesson.id]
    });
    updated++;
  }

  console.log(`  ✅ ${updated} leçons mises à jour avec du contenu éducatif`);
  console.log('📝 Mise à jour du contenu terminée !');
}

// Allow running directly
if (require.main === module) {
  seedLessonContent()
    .then(() => {
      console.log('\n🎉 Contenu des leçons mis à jour avec succès !');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Erreur lors de la mise à jour du contenu:', err);
      process.exit(1);
    });
}

module.exports = { seedLessonContent };
