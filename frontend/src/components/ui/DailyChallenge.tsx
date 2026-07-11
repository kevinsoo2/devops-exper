'use client';

import { useState, useEffect } from 'react';
import { Zap, CheckCircle, Clock, Award } from 'lucide-react';

const challenges = [
  { id: 1, question: "Quelle commande Docker affiche les conteneurs actifs ?", options: ["docker ps", "docker list", "docker show", "docker active"], answer: 0, category: "Docker", xp: 25 },
  { id: 2, question: "Quel objet K8s est la plus petite unité déployable ?", options: ["Container", "Pod", "Deployment", "Node"], answer: 1, category: "Kubernetes", xp: 25 },
  { id: 3, question: "Quelle commande Terraform prévisualise les changements ?", options: ["terraform show", "terraform plan", "terraform preview", "terraform check"], answer: 1, category: "Terraform", xp: 25 },
  { id: 4, question: "Quel port utilise SSH par défaut ?", options: ["21", "22", "23", "25"], answer: 1, category: "Réseau", xp: 20 },
  { id: 5, question: "Quel type de Service K8s est accessible uniquement dans le cluster ?", options: ["NodePort", "LoadBalancer", "ClusterIP", "ExternalName"], answer: 2, category: "Kubernetes", xp: 25 },
  { id: 6, question: "Quelle commande Git annule le dernier commit en gardant les modifications ?", options: ["git revert", "git reset --soft HEAD~1", "git undo", "git rollback"], answer: 1, category: "Git", xp: 20 },
  { id: 7, question: "Quel outil HashiCorp gère les secrets ?", options: ["Consul", "Nomad", "Vault", "Packer"], answer: 2, category: "Sécurité", xp: 25 },
  { id: 8, question: "Quel est le langage de requête de Prometheus ?", options: ["SQL", "PromQL", "GraphQL", "LogQL"], answer: 1, category: "Monitoring", xp: 20 },
  { id: 9, question: "Quel fichier définit un pipeline GitHub Actions ?", options: [".github/workflows/*.yml", "Jenkinsfile", ".gitlab-ci.yml", "pipeline.yaml"], answer: 0, category: "CI/CD", xp: 20 },
  { id: 10, question: "Quelle commande Linux affiche l'espace disque ?", options: ["du -h", "df -h", "ls -la", "free -h"], answer: 1, category: "Linux", xp: 20 },
  { id: 11, question: "Quel est le protocol de transport fiable ?", options: ["UDP", "ICMP", "TCP", "ARP"], answer: 2, category: "Réseau", xp: 20 },
  { id: 12, question: "Quel outil scanne les vulnérabilités des images Docker ?", options: ["Helm", "kubectl", "Trivy", "ArgoCD"], answer: 2, category: "Sécurité", xp: 25 },
  { id: 13, question: "Que signifie IaC ?", options: ["Internet as Code", "Infrastructure as Code", "Integration as Code", "Installation as Code"], answer: 1, category: "IaC", xp: 15 },
  { id: 14, question: "Quel composant K8s stocke l'état du cluster ?", options: ["kubelet", "kube-proxy", "etcd", "scheduler"], answer: 2, category: "Kubernetes", xp: 25 },
];

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<typeof challenges[0] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const today = new Date().toISOString().split('T')[0];
    const lastChallenge = localStorage.getItem('devops-daily-challenge');
    
    if (lastChallenge === today) {
      setAlreadyDone(true);
      return;
    }

    // Select challenge based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % challenges.length;
    setChallenge(challenges[index]);
  }, []);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('devops-daily-challenge', today);
    }
  };

  if (alreadyDone) {
    return (
      <div className="card border-success-500/20 bg-success-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
            <CheckCircle size={20} className="text-success-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Défi du jour complété !</p>
            <p className="text-xs text-gray-500">Revenez demain pour un nouveau défi</p>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="card border-accent-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-accent-400" />
        <h3 className="font-bold text-white text-sm">Défi du Jour</h3>
        <span className="ml-auto skill-tag text-[10px]">{challenge.category}</span>
        <span className="text-xs text-accent-400 font-medium">+{challenge.xp} XP</span>
      </div>

      <p className="text-sm text-gray-300 mb-4">{challenge.question}</p>

      <div className="space-y-2">
        {challenge.options.map((option, i) => {
          let btnClass = 'border-gray-700 hover:border-primary-500/50 hover:bg-primary-500/5';
          if (answered) {
            if (i === challenge.answer) btnClass = 'border-success-500 bg-success-500/10 text-success-400';
            else if (i === selected && i !== challenge.answer) btnClass = 'border-danger-500 bg-danger-500/10 text-danger-400';
            else btnClass = 'border-gray-700 opacity-50';
          }
          
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 ${btnClass}`}
            >
              <span className="text-gray-500 mr-2 font-mono text-xs">{String.fromCharCode(65 + i)}.</span>
              {option}
              {answered && i === challenge.answer && <CheckCircle size={14} className="inline ml-2 text-success-400" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`mt-4 p-3 rounded-xl text-sm ${
          selected === challenge.answer 
            ? 'bg-success-500/10 border border-success-500/20 text-success-400' 
            : 'bg-danger-500/10 border border-danger-500/20 text-danger-400'
        }`}>
          {selected === challenge.answer 
            ? `✅ Bravo ! +${challenge.xp} XP gagnés !` 
            : `❌ La bonne réponse était : ${challenge.options[challenge.answer]}`
          }
        </div>
      )}
    </div>
  );
}
