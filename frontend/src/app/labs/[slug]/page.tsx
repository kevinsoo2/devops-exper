'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FlaskConical, Clock, Zap, ArrowLeft, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { labs as labsApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';



// Generate lab instructions
function getLabInstructions(slug: string, category: string) {
  const s = (slug || "").toLowerCase();
  if (s.includes("docker-compose") || s.includes("multi-services")) return [
    { title: "Créer docker-compose.yml", description: "Créez le fichier de configuration.", command: "mkdir mon-app \u0026\u0026 cd mon-app\ntouch docker-compose.yml" },
    { title: "Configurer les services", description: "Ajoutez frontend, backend, database.", command: "# services:\n#   frontend:\n#     image: nginx:alpine\n#     ports: [\"8080:80\"]\n#   backend:\n#     image: node:18-alpine\n#   database:\n#     image: postgres:15" },
    { title: "Lancer la stack", description: "Démarrez les services.", command: "docker compose up -d\ndocker compose ps" },
    { title: "Vérifier la connectivité", description: "Testez que tout fonctionne.", command: "curl http://localhost:8080\ndocker compose logs" },
    { title: "Nettoyer", description: "Arrêtez et supprimez.", command: "docker compose down -v" },
  ];
  if (s.includes("kubernetes") || s.includes("deployer")) return [
    { title: "Créer un Deployment", description: "Écrivez le manifeste YAML.", command: "kubectl create deployment web --image=nginx:alpine --replicas=3" },
    { title: "Exposer avec un Service", description: "Créez un Service.", command: "kubectl expose deployment web --port=80 --type=ClusterIP" },
    { title: "Vérifier les pods", description: "Tous doivent être Running.", command: "kubectl get pods -l app=web\nkubectl get svc web" },
    { title: "Tester", description: "Accédez à lapplication.", command: "kubectl port-forward svc/web 8080:80\ncurl http://localhost:8080" },
  ];
  if (s.includes("terraform") || s.includes("infrastructure")) return [
    { title: "Initialiser Terraform", description: "Créez main.tf et initialisez.", command: "terraform init" },
    { title: "Définir les ressources", description: "Ajoutez VPC et subnets.", command: "# resource \"aws_vpc\" \"main\" {\n#   cidr_block = \"10.0.0.0/16\"\n# }" },
    { title: "Plan", description: "Prévisualisez les changements.", command: "terraform plan" },
    { title: "Apply", description: "Créez linfrastructure.", command: "terraform apply -auto-approve" },
    { title: "Destroy", description: "Nettoyez.", command: "terraform destroy -auto-approve" },
  ];
  if (s.includes("prometheus") || s.includes("monitoring") || s.includes("elk")) return [
    { title: "Déployer la stack", description: "Lancez les composants de monitoring.", command: "docker compose -f monitoring-stack.yml up -d" },
    { title: "Configurer le scraping", description: "Ajoutez vos targets.", command: "# prometheus.yml\nscrape_configs:\n  - job_name: app\n    targets: [\"app:3000\"]" },
    { title: "Créer des dashboards", description: "Configurez Grafana.", command: "# Accédez à http://localhost:3000\n# Import dashboard ID: 1860" },
    { title: "Configurer les alertes", description: "Ajoutez des règles dalerte.", command: "# alert: HighCPU\n# expr: cpu_usage > 80\n# for: 5m" },
  ];
  if (s.includes("securite") || s.includes("trivy") || s.includes("vault") || s.includes("hardening") || s.includes("sast")) return [
    { title: "Scanner une image", description: "Analysez les vulnérabilités.", command: "trivy image nginx:latest\ntrivy image --severity CRITICAL mon-app:v1" },
    { title: "Scanner le code", description: "Analyse statique.", command: "semgrep --config=auto ./src/" },
    { title: "Corriger", description: "Mettez à jour les dépendances.", command: "# Mettre à jour les packages vulnérables\nnpm audit fix" },
    { title: "Valider", description: "Re-scannez.", command: "trivy image --exit-code 1 --severity CRITICAL mon-app:v2" },
  ];
  return [
    { title: "Préparer lenvironnement", description: "Vérifiez les prérequis.", command: "# Vérifiez les outils nécessaires" },
    { title: "Implémenter", description: "Suivez les objectifs du lab.", command: "# Appliquez les configurations étape par étape" },
    { title: "Tester", description: "Vérifiez le fonctionnement.", command: "# Exécutez les tests de validation" },
    { title: "Valider", description: "Confirmez la complétion.", command: "echo \"Lab terminé !\"" },
  ];
}

function getValidationCommand(category: string) {
  if (category === "conteneurisation") return "docker compose ps  # Tous running";
  if (category === "orchestration") return "kubectl get pods  # Tous Running";
  if (category === "iac") return "terraform state list  # Ressources présentes";
  if (category === "monitoring") return "curl localhost:9090/targets  # Tous up";
  if (category === "securite") return "trivy image --exit-code 0 app:latest";
  return "echo \"Validation OK\"";
}

const fallbackLab = {
  id: '1',
  title: 'Deploy Multi-Container App with Docker Compose',
  slug: 'docker-compose-deploy',
  difficulty: 'Beginner',
  duration: '30 min',
  xp: 150,
  category: 'Containers',
  description: 'In this lab you will learn to orchestrate multiple containers using Docker Compose. You will create a web application with a frontend, backend API, and database, all connected through Docker networking.',
  objectives: [
    'Create a docker-compose.yml file',
    'Configure multi-container networking',
    'Set up environment variables',
    'Implement health checks',
    'Use volumes for data persistence',
  ],
  prerequisites: ['Basic Docker knowledge', 'Command line familiarity'],
  tools: ['Docker', 'Docker Compose', 'VS Code'],
};

export default function LabDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    labsApi.get(params.slug as string)
      .then((data) => setLab(data))
      .catch(() => setLab(fallbackLab))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const handleStart = async () => {
    if (!user) { router.push('/login'); return; }
    setStarting(true);
    try {
      await labsApi.start(lab.id);
      setStarted(true);
    } catch { setStarted(true); }
    setStarting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );
  }

  const data = lab || fallbackLab;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/labs" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400 mb-6">
          <ArrowLeft size={16} /> Retour aux Labs
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${
            data.difficulty === 'Beginner' ? 'difficulty-beginner' :
            data.difficulty === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'
          }`}>{data.difficulty}</span>
          <span className="text-xs text-accent-400 font-medium">+{data.xp} XP</span>
          <span className="skill-tag text-xs">{data.category}</span>
        </div>

        <h1 className="text-3xl font-bold dark:text-white mb-4">{data.title}</h1>
        <p className="text-gray-500 mb-6">{data.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-1"><Clock size={14} /> {data.duration}</span>
          <span className="flex items-center gap-1"><Zap size={14} /> {data.xp} XP récompense</span>
        </div>

        {started ? (
          <div className="space-y-6 mb-8">
            <div className="card border-success-500/50">
              <div className="flex items-center gap-2 text-success-400 mb-2">
                <CheckCircle size={20} /> Environnement du Lab Prêt
              </div>
              <p className="text-sm text-gray-500">Suivez les instructions ci-dessous étape par étape.</p>
            </div>

            {/* Instructions du Lab */}
            <div className="card">
              <h2 className="text-xl font-bold dark:text-white mb-6">📋 Instructions du Lab</h2>
              
              {data.instructions ? (
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{data.instructions}</div>
              ) : (
                <div className="space-y-6">
                  {getLabInstructions(data.slug || data.title, data.category).map((step: any, i: number) => (
                    <div key={i} className="border-l-2 border-primary-500/50 pl-4">
                      <h3 className="font-semibold text-white mb-2">Étape {i + 1}: {step.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                      {step.command && (
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-xs text-green-400 overflow-x-auto">
                          <pre>{step.command}</pre>
                        </div>
                      )}
                      {step.expected && (
                        <p className="text-xs text-gray-500 mt-2 italic">✓ Résultat attendu : {step.expected}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Validation */}
            <div className="card border-primary-500/30">
              <h2 className="font-bold dark:text-white mb-3">✅ Validation</h2>
              <p className="text-sm text-gray-400 mb-4">Une fois toutes les étapes complétées, vérifiez que tout fonctionne :</p>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-xs text-green-400 mb-4">
                <pre>{getValidationCommand(data.category)}</pre>
              </div>
              <button className="btn-primary" onClick={() => alert('Lab complété ! +' + ((data as any).xp_reward || (data as any).xp || 25) + ' XP')}>
                <CheckCircle size={16} /> Marquer comme complété
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleStart} disabled={starting} className="btn-primary mb-8 flex items-center gap-2">
            <Play size={18} /> {starting ? 'Démarrage...' : 'Lancer le Lab'}
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="font-bold dark:text-white mb-4">Objectifs</h2>
            <ul className="space-y-2">
              {(data.objectives || fallbackLab.objectives).map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h2 className="font-bold dark:text-white mb-4">Prérequis</h2>
              <ul className="space-y-2">
                {(data.prerequisites || fallbackLab.prerequisites).map((p: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <AlertCircle size={14} className="text-accent-400" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="font-bold dark:text-white mb-4">Outils Utilisés</h2>
              <div className="flex flex-wrap gap-2">
                {(data.tools || fallbackLab.tools).map((t: string) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
