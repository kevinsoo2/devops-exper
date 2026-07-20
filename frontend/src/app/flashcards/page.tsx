'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, BookOpen, Check, X } from 'lucide-react';

const decks = [
  {
    id: 'docker',
    title: 'Docker',
    icon: '🐳',
    color: 'from-blue-500 to-cyan-500',
    cards: [
      { q: 'Quelle est la différence entre CMD et ENTRYPOINT ?', a: 'CMD définit la commande par défaut (remplaçable). ENTRYPOINT définit le processus principal (non remplaçable, CMD devient ses arguments).' },
      { q: 'Que fait docker system prune ?', a: 'Supprime tous les conteneurs arrêtés, réseaux inutilisés, images dangling et le build cache.' },
      { q: 'Qu\'est-ce qu\'un multi-stage build ?', a: 'Un Dockerfile avec plusieurs FROM. On copie uniquement les artefacts du stage de build vers le stage final (image plus petite).' },
      { q: 'Quelle est la différence entre COPY et ADD ?', a: 'COPY copie simplement des fichiers. ADD peut aussi extraire des archives .tar et télécharger des URLs (comportement implicite à éviter).' },
      { q: 'Comment limiter les ressources d\'un conteneur ?', a: 'docker run --memory=512m --cpus=0.5 ou via les resources limits dans Docker Compose / K8s.' },
      { q: 'Que sont les Docker layers ?', a: 'Chaque instruction du Dockerfile crée une couche (layer) en lecture seule. Les layers sont mises en cache et partagées entre images.' },
    ],
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    icon: '☸️',
    color: 'from-blue-400 to-indigo-500',
    cards: [
      { q: 'Qu\'est-ce qu\'un Pod ?', a: 'La plus petite unité déployable dans K8s. Contient 1+ conteneurs partageant le même réseau (localhost) et les mêmes volumes.' },
      { q: 'Différence entre Deployment et StatefulSet ?', a: 'Deployment = apps stateless (Pods interchangeables). StatefulSet = apps stateful (identité stable, stockage persistant, déploiement ordonné).' },
      { q: 'Qu\'est-ce qu\'un Service ClusterIP ?', a: 'Un Service accessible uniquement depuis l\'intérieur du cluster. Il distribue le trafic vers les Pods via un sélecteur de labels.' },
      { q: 'Comment fonctionne le HPA ?', a: 'Le Horizontal Pod Autoscaler ajuste le nombre de répliques d\'un Deployment basé sur les métriques (CPU, mémoire, métriques custom).' },
      { q: 'Qu\'est-ce qu\'un ConfigMap vs un Secret ?', a: 'ConfigMap = configuration non-sensible en clair. Secret = données sensibles encodées en base64 (pas chiffrées par défaut !).' },
      { q: 'Rôle de etcd dans K8s ?', a: 'Base de données clé-valeur distribuée qui stocke tout l\'état du cluster (Pods, Services, ConfigMaps, etc.).' },
      { q: 'Qu\'est-ce qu\'un Ingress ?', a: 'Ressource qui gère l\'accès HTTP/HTTPS externe vers les Services. Permet le routing par host/path et la terminaison TLS.' },
    ],
  },
  {
    id: 'terraform',
    title: 'Terraform',
    icon: '🏗️',
    color: 'from-purple-500 to-violet-500',
    cards: [
      { q: 'Qu\'est-ce que le Terraform State ?', a: 'Fichier JSON qui mappe les ressources Terraform aux ressources réelles dans le cloud. Source de vérité pour les changements.' },
      { q: 'Différence entre terraform plan et apply ?', a: 'plan = preview des changements (lecture seule). apply = exécution des changements. Toujours faire plan avant apply.' },
      { q: 'Comment gérer le state en équipe ?', a: 'Remote backend (S3 + DynamoDB, GCS, Azure Blob) avec state locking pour éviter les conflits concurrents.' },
      { q: 'Qu\'est-ce que for_each vs count ?', a: 'count = nombre d\'instances (index numérique). for_each = itération sur une map/set (clé nommée, plus flexible).' },
      { q: 'Comment importer une ressource existante ?', a: 'terraform import <resource_type>.<name> <cloud_id> puis écrire le code HCL correspondant.' },
      { q: 'Qu\'est-ce qu\'un module Terraform ?', a: 'Un répertoire contenant du code .tf réutilisable. Accepte des variables en entrée et expose des outputs.' },
    ],
  },
  {
    id: 'linux',
    title: 'Linux',
    icon: '🐧',
    color: 'from-yellow-500 to-orange-500',
    cards: [
      { q: 'Que fait chmod 755 ?', a: 'rwxr-xr-x : le propriétaire peut tout faire, le groupe et les autres peuvent lire et exécuter.' },
      { q: 'Différence entre un lien dur et symbolique ?', a: 'Lien dur = même inode (pas cross-filesystem). Lien symbolique = pointe vers le chemin (peut être cassé si la cible est supprimée).' },
      { q: 'Que fait la commande find / -perm -4000 ?', a: 'Trouve tous les fichiers avec le bit SUID activé (s\'exécutent avec les droits du propriétaire).' },
      { q: 'Comment voir les ports en écoute ?', a: 'ss -tlnp ou netstat -tlnp : affiche les ports TCP en écoute avec le processus associé.' },
      { q: 'Qu\'est-ce que systemctl enable ?', a: 'Configure un service pour démarrer automatiquement au boot (crée un lien symbolique dans le target).' },
      { q: 'Que contient /etc/fstab ?', a: 'Les montages persistants : filesystems à monter au boot avec leurs options (device, mount point, type, options, dump, pass).' },
    ],
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    icon: '🔄',
    color: 'from-green-500 to-emerald-500',
    cards: [
      { q: 'Différence CI vs CD vs Continuous Deployment ?', a: 'CI = build+test auto. Continuous Delivery = toujours déployable (approbation manuelle). Continuous Deployment = déploiement auto en prod.' },
      { q: 'Qu\'est-ce qu\'un artifact dans un pipeline ?', a: 'Le résultat d\'un build : binaire, image Docker, package npm/jar. Stocké dans un registry pour le déploiement.' },
      { q: 'Blue/Green Deployment ?', a: 'Deux environnements identiques. On switch le trafic de Blue (actuel) vers Green (nouveau). Rollback instantané.' },
      { q: 'Canary Deployment ?', a: 'Déploiement progressif : la nouvelle version reçoit un petit % du trafic (ex: 5%), puis on augmente si tout va bien.' },
      { q: 'Pourquoi cacher les dépendances ?', a: 'Accélère le pipeline de 50%+ en évitant de re-télécharger node_modules, .m2, pip cache à chaque run.' },
    ],
  },
  {
    id: 'security',
    title: 'Sécurité',
    icon: '🔒',
    color: 'from-red-500 to-pink-500',
    cards: [
      { q: 'Qu\'est-ce que le Zero Trust ?', a: 'Modèle de sécurité : ne jamais faire confiance implicitement. Vérifier systématiquement chaque accès (identité, device, contexte).' },
      { q: 'Différence SAST vs DAST ?', a: 'SAST = analyse statique du code source (sans exécution). DAST = tests dynamiques sur l\'app en cours d\'exécution.' },
      { q: 'Qu\'est-ce que mTLS ?', a: 'Mutual TLS : authentification bidirectionnelle. Le client ET le serveur présentent un certificat. Utilisé dans les Service Mesh.' },
      { q: 'Que fait HashiCorp Vault ?', a: 'Gestion centralisée des secrets : stockage sécurisé, rotation automatique, secrets dynamiques (credentials DB éphémères).' },
      { q: 'Qu\'est-ce qu\'un SBOM ?', a: 'Software Bill of Materials : inventaire complet des composants/dépendances d\'un logiciel. Requis pour la supply chain security.' },
    ],
  },
];

export default function FlashcardsPage() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);

  const deck = decks.find(d => d.id === selectedDeck);
  const card = deck?.cards[cardIndex];
  const total = deck?.cards.length || 0;

  const nextCard = (isKnown: boolean) => {
    if (isKnown) setKnown(k => k + 1);
    else setUnknown(u => u + 1);
    setFlipped(false);
    setTimeout(() => {
      if (cardIndex < total - 1) setCardIndex(i => i + 1);
      else setCardIndex(0);
    }, 200);
  };

  const resetDeck = () => {
    setCardIndex(0);
    setFlipped(false);
    setKnown(0);
    setUnknown(0);
  };

  if (!selectedDeck) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge"><RotateCcw size={16} className="text-primary-400" /> Révision</span>
            <h1 className="text-4xl font-bold dark:text-white mt-4">
              <span className="gradient-text">Flashcards</span> DevOps
            </h1>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Révisez les concepts clés avec des cartes mémoire interactives. Cliquez pour retourner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map(d => (
              <button key={d.id} onClick={() => { setSelectedDeck(d.id); resetDeck(); }}
                className="card-hover text-left group">
                <div className={`h-2 absolute top-0 left-0 right-0 rounded-t-2xl bg-gradient-to-r ${d.color}`} />
                <div className="pt-3 flex items-center gap-3">
                  <span className="text-3xl">{d.icon}</span>
                  <div>
                    <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition">{d.title}</h3>
                    <p className="text-xs text-gray-500">{d.cards.length} cartes</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setSelectedDeck(null)} className="text-sm text-gray-500 hover:text-primary-400">← Retour aux decks</button>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-green-400">✓ {known}</span>
            <span className="text-red-400">✗ {unknown}</span>
            <span className="text-gray-500">{cardIndex + 1}/{total}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all" style={{ width: `${((cardIndex + 1) / total) * 100}%` }} />
        </div>

        {/* Card */}
        {card && (
          <div className="perspective-1000 mb-8" onClick={() => setFlipped(!flipped)}>
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-72 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div className={`absolute inset-0 card flex items-center justify-center p-8 text-center ${flipped ? 'invisible' : ''}`}
                style={{ backfaceVisibility: 'hidden' }}>
                <div>
                  <BookOpen size={24} className="mx-auto text-primary-400 mb-4" />
                  <p className="text-lg text-white font-medium">{card.q}</p>
                  <p className="text-xs text-gray-600 mt-4">Cliquez pour voir la réponse</p>
                </div>
              </div>
              {/* Back */}
              <div className={`absolute inset-0 card flex items-center justify-center p-8 text-center border-primary-500/30 bg-primary-500/5 ${!flipped ? 'invisible' : ''}`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <div>
                  <p className="text-sm text-gray-200 leading-relaxed">{card.a}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => nextCard(false)} className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all">
            <X size={24} />
          </button>
          <button onClick={() => setFlipped(!flipped)} className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 transition-all">
            <RotateCcw size={24} />
          </button>
          <button onClick={() => nextCard(true)} className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all">
            <Check size={24} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
          <span>Je ne sais pas</span>
          <span>Retourner</span>
          <span>Je sais</span>
        </div>

        {/* Shuffle / Reset */}
        <div className="flex justify-center gap-3 mt-8">
          <button onClick={resetDeck} className="btn-ghost text-xs"><RotateCcw size={14} /> Recommencer</button>
        </div>
      </div>
    </div>
  );
}
