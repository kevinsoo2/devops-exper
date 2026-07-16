'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, X, ChevronRight } from 'lucide-react';

const tips = [
  { tip: 'Utilisez `docker system prune -a` pour nettoyer toutes les images et conteneurs inutilisés et libérer de l\'espace disque.', category: 'Docker' },
  { tip: 'Dans Kubernetes, préférez les `Deployments` aux `Pods` nus pour bénéficier du rolling update et du self-healing.', category: 'Kubernetes' },
  { tip: 'Utilisez `terraform plan -out=plan.tfplan` pour sauvegarder le plan et l\'appliquer ensuite avec `terraform apply plan.tfplan`.', category: 'Terraform' },
  { tip: 'Activez la compression gzip dans Nginx avec `gzip on;` pour réduire la bande passante de 60-70%.', category: 'Nginx' },
  { tip: 'Utilisez `git stash` pour sauvegarder temporairement vos modifications non committées avant de changer de branche.', category: 'Git' },
  { tip: 'Dans PostgreSQL, `EXPLAIN (ANALYZE, BUFFERS)` donne plus d\'infos que `EXPLAIN ANALYZE` seul pour le tuning.', category: 'PostgreSQL' },
  { tip: 'Ajoutez `-o yaml --dry-run=client` à vos commandes kubectl pour générer des manifestes YAML sans les appliquer.', category: 'Kubernetes' },
  { tip: 'Utilisez les multi-stage builds Docker pour réduire la taille de vos images de plus de 80%.', category: 'Docker' },
  { tip: 'Redis `SCAN` est préférable à `KEYS *` en production car il ne bloque pas le serveur.', category: 'Redis' },
  { tip: 'En CI/CD, cachez vos dépendances (node_modules, .m2, pip cache) pour accélérer vos pipelines de 50%+.', category: 'CI/CD' },
  { tip: 'Utilisez `ansible-lint` pour vérifier vos playbooks Ansible avant de les exécuter en production.', category: 'Ansible' },
  { tip: 'Préférez `COPY` à `ADD` dans vos Dockerfiles — ADD a des comportements implicites (extraction tar, URLs).', category: 'Docker' },
  { tip: 'En monitoring, suivez la méthode RED (Rate, Errors, Duration) pour les services et USE (Utilization, Saturation, Errors) pour les ressources.', category: 'Monitoring' },
  { tip: 'Utilisez des labels Kubernetes cohérents : `app.kubernetes.io/name`, `app.kubernetes.io/version`, etc.', category: 'Kubernetes' },
  { tip: 'Avec MySQL, l\'index le plus sélectif doit être en première position dans un index composite.', category: 'MySQL' },
  { tip: '`curl -I` affiche uniquement les headers HTTP — parfait pour vérifier les redirections et le caching.', category: 'Linux' },
  { tip: 'Utilisez `set -euo pipefail` en haut de vos scripts Bash pour échouer proprement sur les erreurs.', category: 'Linux' },
  { tip: 'En Terraform, utilisez `terraform state list` pour voir toutes les ressources gérées et `terraform state show` pour les détails.', category: 'Terraform' },
  { tip: 'Les `NetworkPolicies` Kubernetes sont deny-by-default uniquement si vous en créez une — sinon tout le trafic est autorisé.', category: 'Kubernetes' },
  { tip: 'Utilisez `pg_stat_statements` dans PostgreSQL pour identifier les requêtes les plus coûteuses en temps et en I/O.', category: 'PostgreSQL' },
  { tip: 'Un health check dans Docker (HEALTHCHECK CMD) permet au daemon de redémarrer automatiquement les conteneurs unhealthy.', category: 'Docker' },
];

export function TipOfTheDay() {
  const [tip, setTip] = useState<typeof tips[0] | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setTip(tips[dayOfYear % tips.length]);
    
    // Check if already dismissed today
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      const lastDismissed = localStorage.getItem('tip-dismissed-date');
      if (lastDismissed === today) setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('tip-dismissed-date', today);
    }
  };

  if (!tip || dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-500/5 via-transparent to-secondary-500/5 p-5 my-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb size={20} className="text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-primary-400">Astuce du jour</span>
            <span className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-500">{tip.category}</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{tip.tip}</p>
        </div>
        <button onClick={handleDismiss} className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">
          <X size={14} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
