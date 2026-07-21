'use client';

import { useState } from 'react';
import { Timer, CheckCircle, XCircle, AlertTriangle, Trophy, RotateCcw, Zap } from 'lucide-react';

const examQuestions = [
  // Docker
  { id: 1, question: "Quelle commande permet de voir les logs en temps réel d'un conteneur nommé 'web' ?", options: ["docker logs web", "docker logs -f web", "docker inspect web", "docker attach web"], answer: 1, explanation: "L'option -f (follow) permet de suivre les logs en temps réel, similaire à tail -f." },
  { id: 2, question: "Quel Dockerfile instruction est exécutée au moment du BUILD uniquement ?", options: ["CMD", "ENTRYPOINT", "RUN", "EXPOSE"], answer: 2, explanation: "RUN est exécutée pendant le build de l'image. CMD et ENTRYPOINT sont exécutées au runtime du conteneur." },
  { id: 3, question: "Comment limiter un conteneur à 512MB de RAM ?", options: ["docker run --ram=512m", "docker run --memory=512m", "docker run --mem-limit=512m", "docker run -m 512"], answer: 1, explanation: "--memory ou -m permet de limiter la mémoire. La syntaxe correcte est --memory=512m." },
  // Kubernetes
  { id: 4, question: "Quel composant du Control Plane stocke l'état du cluster ?", options: ["kube-apiserver", "kube-scheduler", "etcd", "kube-controller-manager"], answer: 2, explanation: "etcd est la base de données clé-valeur distribuée qui stocke tout l'état du cluster Kubernetes." },
  { id: 5, question: "Quelle commande affiche les événements récents d'un Pod ?", options: ["kubectl logs pod-name", "kubectl describe pod pod-name", "kubectl get events", "kubectl status pod-name"], answer: 1, explanation: "kubectl describe pod affiche les détails complets incluant les Events en bas de la sortie." },
  { id: 6, question: "Quel type de Service K8s est accessible uniquement dans le cluster ?", options: ["NodePort", "LoadBalancer", "ClusterIP", "ExternalName"], answer: 2, explanation: "ClusterIP est le type par défaut, accessible uniquement depuis l'intérieur du cluster via l'IP du service." },
  // Linux
  { id: 7, question: "Quelle commande affiche les ports TCP en écoute avec le PID ?", options: ["netstat -an", "ss -tlnp", "lsof -i", "ifconfig -a"], answer: 1, explanation: "ss -tlnp : -t=TCP, -l=listening, -n=numérique, -p=PID du processus." },
  { id: 8, question: "Comment rendre un script exécutable ?", options: ["chmod 644 script.sh", "chmod +x script.sh", "chown +x script.sh", "exec script.sh"], answer: 1, explanation: "chmod +x ajoute le droit d'exécution pour tous. Équivalent à chmod a+x." },
  { id: 9, question: "Quel fichier configure les montages persistants au boot ?", options: ["/etc/mount.conf", "/etc/fstab", "/etc/mtab", "/etc/mounts"], answer: 1, explanation: "/etc/fstab (file systems table) définit les montages automatiques au démarrage du système." },
  // Terraform
  { id: 10, question: "Quelle commande Terraform permet d'importer une ressource existante ?", options: ["terraform get", "terraform import", "terraform fetch", "terraform add"], answer: 1, explanation: "terraform import permet d'amener une ressource existante sous la gestion de Terraform." },
  { id: 11, question: "Quel est le rôle du fichier terraform.tfstate ?", options: ["Configuration des providers", "Stockage de l'état réel de l'infra", "Définition des variables", "Logs d'exécution"], answer: 1, explanation: "Le state file mappe les ressources Terraform aux ressources réelles dans le cloud." },
  // CI/CD
  { id: 12, question: "Dans GitHub Actions, quel mot-clé déclenche un workflow sur push ?", options: ["trigger: push", "on: push", "when: push", "event: push"], answer: 1, explanation: "La syntaxe GitHub Actions utilise 'on:' pour définir les événements déclencheurs." },
  { id: 13, question: "Qu'est-ce qu'un déploiement Canary ?", options: ["Déployer sur tous les serveurs d'un coup", "Déployer progressivement sur un petit % d'utilisateurs", "Déployer uniquement en staging", "Rollback automatique"], answer: 1, explanation: "Le Canary deployment envoie un petit pourcentage du trafic vers la nouvelle version pour valider avant le rollout complet." },
  // Monitoring
  { id: 14, question: "Quel langage de requête utilise Prometheus ?", options: ["SQL", "LogQL", "PromQL", "GraphQL"], answer: 2, explanation: "PromQL (Prometheus Query Language) est le langage natif de Prometheus pour interroger les métriques." },
  { id: 15, question: "Quels sont les 3 piliers de l'observabilité ?", options: ["CPU, RAM, Disk", "Logs, Métriques, Traces", "Alertes, Dashboards, SLOs", "Uptime, Latence, Erreurs"], answer: 1, explanation: "Les 3 piliers sont : Logs (événements), Métriques (valeurs numériques dans le temps), Traces (suivi distribué des requêtes)." },
  // Sécurité
  { id: 16, question: "Que signifie le principe Zero Trust ?", options: ["Pas de firewall", "Ne jamais faire confiance, toujours vérifier", "Tout est public", "Uniquement SSH"], answer: 1, explanation: "Zero Trust = Never Trust, Always Verify. Chaque accès est vérifié (identité, device, contexte) sans confiance implicite." },
  { id: 17, question: "Quel outil HashiCorp gère les secrets dynamiques ?", options: ["Terraform", "Consul", "Vault", "Nomad"], answer: 2, explanation: "HashiCorp Vault gère les secrets : stockage sécurisé, rotation automatique, secrets dynamiques (credentials éphémères)." },
  // Réseau
  { id: 18, question: "Quel protocole de la couche 4 est orienté connexion ?", options: ["UDP", "ICMP", "TCP", "ARP"], answer: 2, explanation: "TCP (Transmission Control Protocol) est orienté connexion avec le 3-way handshake (SYN, SYN-ACK, ACK)." },
  { id: 19, question: "Quelle commande Linux trace le chemin réseau vers une destination ?", options: ["ping", "traceroute", "nslookup", "arp"], answer: 1, explanation: "traceroute (ou tracert sur Windows) affiche chaque routeur traversé pour atteindre la destination." },
  // Base de données
  { id: 20, question: "Quelle commande PostgreSQL affiche le plan d'exécution d'une requête ?", options: ["SHOW PLAN", "EXPLAIN ANALYZE", "DESCRIBE QUERY", "PROFILE"], answer: 1, explanation: "EXPLAIN ANALYZE exécute la requête et montre le plan d'exécution réel avec les temps et buffers utilisés." },
];

export default function SimulatorPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(examQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [showExplanation, setShowExplanation] = useState(false);

  const startExam = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setAnswers(new Array(examQuestions.length).fill(null));
    setShowResult(false);
    setTimeLeft(30 * 60);
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); setShowResult(true); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = answers.filter((a, i) => a === examQuestions[i].answer).length;
  const percentage = Math.round((score / examQuestions.length) * 100);
  const passed = percentage >= 70;

  if (!started) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-badge"><Trophy size={16} className="text-accent-400" /> Simulateur</span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Simulateur d&apos;Examen <span className="gradient-text">DevOps</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Testez vos connaissances avec un examen chronométré de 20 questions couvrant Docker, Kubernetes, Linux, Terraform, CI/CD, Monitoring, Sécurité et Réseau.
          </p>
          <div className="card mt-8 max-w-md mx-auto text-left">
            <h3 className="font-bold text-white mb-4">Informations de l&apos;examen</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Timer size={14} className="text-primary-400" /> Durée : 30 minutes</li>
              <li className="flex items-center gap-2"><Zap size={14} className="text-accent-400" /> 20 questions à choix multiples</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success-400" /> Score minimum : 70% pour réussir</li>
              <li className="flex items-center gap-2"><Trophy size={14} className="text-purple-400" /> +500 XP si réussi</li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-primary-500/10 border border-primary-500/20 text-xs text-primary-400">
              💡 Chaque question affiche une explication après votre réponse.
            </div>
          </div>
          <button onClick={startExam} className="btn-primary mt-8 !px-10 !py-4 text-lg">
            Commencer l&apos;examen
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${passed ? 'bg-success-500/20' : 'bg-danger-500/20'}`}>
            {passed ? <Trophy size={40} className="text-success-400" /> : <AlertTriangle size={40} className="text-danger-400" />}
          </div>
          <h1 className="text-3xl font-bold dark:text-white">
            {passed ? 'Félicitations ! 🎉' : 'Pas encore... 💪'}
          </h1>
          <p className="mt-2 text-gray-500">
            {passed ? 'Vous avez réussi l\'examen DevOps !' : 'Continuez à étudier et réessayez !'}
          </p>
          <div className="card mt-8 inline-block">
            <div className="text-5xl font-bold mb-2" style={{ color: passed ? '#34d399' : '#f87171' }}>
              {percentage}%
            </div>
            <p className="text-gray-500 text-sm">{score}/{examQuestions.length} bonnes réponses</p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={startExam} className="btn-primary flex items-center gap-2">
              <RotateCcw size={16} /> Recommencer
            </button>
            <a href="/courses" className="btn-outline">Réviser les cours</a>
          </div>
        </div>
      </div>
    );
  }

  const q = examQuestions[currentQuestion];
  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500">Question {currentQuestion + 1}/{examQuestions.length}</span>
          <span className={`text-sm font-mono font-bold ${timeLeft < 300 ? 'text-danger-400' : 'text-primary-400'}`}>
            <Timer size={14} className="inline mr-1" />{formatTime(timeLeft)}
          </span>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all" style={{ width: `${((currentQuestion + 1) / examQuestions.length) * 100}%` }} />
        </div>

        {/* Question */}
        <div className="card mb-6">
          <p className="text-lg font-medium text-white leading-relaxed">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((option, i) => {
            const isSelected = answers[currentQuestion] === i;
            const isCorrect = i === q.answer;
            const showFeedback = showExplanation && answers[currentQuestion] !== null;
            
            let btnClass = 'border-gray-700 hover:border-primary-500/50 hover:bg-primary-500/5';
            if (showFeedback) {
              if (isCorrect) btnClass = 'border-success-500 bg-success-500/10';
              else if (isSelected && !isCorrect) btnClass = 'border-danger-500 bg-danger-500/10';
              else btnClass = 'border-gray-700 opacity-50';
            } else if (isSelected) {
              btnClass = 'border-primary-500 bg-primary-500/10';
            }

            return (
              <button
                key={i}
                onClick={() => !showExplanation && selectAnswer(i)}
                disabled={showExplanation}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all ${btnClass} flex items-center gap-3`}
              >
                <span className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-gray-200">{option}</span>
                {showFeedback && isCorrect && <CheckCircle size={18} className="text-success-400 flex-shrink-0" />}
                {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="text-danger-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`card mb-6 border-l-4 ${answers[currentQuestion] === q.answer ? 'border-l-success-500 bg-success-500/5' : 'border-l-danger-500 bg-danger-500/5'}`}>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Explication :</strong> {q.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <button onClick={nextQuestion} className="btn-primary w-full">
            {currentQuestion < examQuestions.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
          </button>
        )}
      </div>
    </div>
  );
}
