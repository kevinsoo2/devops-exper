'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Clock, Users, Star, Filter } from 'lucide-react';
import { courses as coursesApi } from '@/lib/api';

const categories = ['Tous', 'conteneurisation', 'cicd', 'cloud', 'iac', 'orchestration', 'monitoring', 'network', 'systeme', 'securite', 'virtualisation', 'gitops', 'sre', 'automatisation', 'donnees'];
const categoryLabels: Record<string, string> = {
  'Tous': 'Tous', 'conteneurisation': 'Conteneurisation', 'cicd': 'CI/CD', 'cloud': 'Cloud',
  'iac': 'IaC', 'orchestration': 'Orchestration', 'monitoring': 'Monitoring', 'network': 'Réseau',
  'systeme': 'Système', 'securite': 'Sécurité', 'virtualisation': 'Virtualisation', 'gitops': 'GitOps', 'sre': 'SRE',
  'automatisation': 'Automatisation', 'donnees': 'Données'
};
const levels = ['Tous', 'debutant', 'intermediaire', 'avance'];
const levelLabels: Record<string, string> = {
  'Tous': 'Tous', 'debutant': 'Débutant', 'intermediaire': 'Intermédiaire', 'avance': 'Avancé'
};

const fallbackCourses = [
  { id: '1', title: 'Docker Mastery', slug: 'docker-mastery', description: 'Docker complet de zéro aux déploiements en production.', category: 'Containerisation', level: 'Débutant', duration_hours: 12, enrolled_count: 3420, rating: 4.8, instructor: 'Alex DevOps' },
  { id: '2', title: 'Kubernetes Complete Guide', slug: 'kubernetes-complete', description: 'Maîtrisez Kubernetes des pods aux clusters de production.', category: 'Orchestration', level: 'Intermédiaire', duration_hours: 24, enrolled_count: 2150, rating: 4.9, instructor: 'Sarah Cloud' },
  { id: '3', title: 'Terraform Infrastructure as Code', slug: 'terraform-iac', description: 'Construisez des infrastructures cloud avec Terraform en multi-cloud.', category: 'IaC', level: 'Intermédiaire', duration_hours: 16, enrolled_count: 1890, rating: 4.7, instructor: 'Mike Terraform' },
  { id: '4', title: 'GitHub Actions CI/CD', slug: 'github-actions-cicd', description: 'Construisez des pipelines CI/CD de qualité production avec GitHub Actions.', category: 'CI/CD', level: 'Débutant', duration_hours: 8, enrolled_count: 4200, rating: 4.6, instructor: 'Chris Pipeline' },
  { id: '5', title: 'AWS Solutions Architect', slug: 'aws-solutions-architect', description: 'Préparation complète à la certification AWS avec des labs pratiques.', category: 'Cloud', level: 'Avancé', duration_hours: 40, enrolled_count: 1650, rating: 4.9, instructor: 'Lisa AWS' },
  { id: '6', title: 'Linux Administration', slug: 'linux-admin', description: 'Des bases à l\'administration système avancée.', category: 'Fondations', level: 'Débutant', duration_hours: 20, enrolled_count: 5100, rating: 4.7, instructor: 'Tom Linux' },
  { id: '7', title: 'Prometheus & Grafana', slug: 'prometheus-grafana', description: 'Stack d\'observabilité complet avec métriques et tableaux de bord.', category: 'Monitoring', level: 'Intermédiaire', duration_hours: 10, enrolled_count: 1200, rating: 4.5, instructor: 'Dave Monitor' },
  { id: '8', title: 'GitLab CI/CD Pipeline', slug: 'gitlab-cicd', description: 'CI/CD de bout en bout avec GitLab du test au déploiement.', category: 'CI/CD', level: 'Intermédiaire', duration_hours: 14, enrolled_count: 980, rating: 4.6, instructor: 'Nina DevOps' },
  { id: '9', title: 'Kubernetes Security', slug: 'k8s-security', description: 'Sécurisez vos clusters Kubernetes avec les meilleures pratiques.', category: 'Sécurité', level: 'Avancé', duration_hours: 18, enrolled_count: 750, rating: 4.8, instructor: 'Sam Security' },
];

export default function CoursesPage() {
  const [courseList, setCourseList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  const [level, setLevel] = useState('Tous');

  useEffect(() => {
    coursesApi
      .list()
      .then((data) => { setCourseList(data || []); })
      .catch((err) => { console.error('API Error:', err); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = courseList.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || (course.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Tous' || course.category === category;
    const matchesLevel = level === 'Tous' || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            Toutes les <span className="gradient-text">Formations</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explorez notre bibliothèque de formations DevOps, des fondamentaux au niveau expert.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des formations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Filter size={14} className="text-gray-400" />
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  level === lvl ? 'bg-secondary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {levelLabels[lvl] || lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            <p className="text-sm text-gray-500 mb-6">{filtered.length} formations trouvées</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => {
                const gradients: Record<string, string> = {
                  'conteneurisation': 'from-blue-600/80 to-cyan-600/80',
                  'orchestration': 'from-blue-500/80 to-indigo-600/80',
                  'cicd': 'from-green-600/80 to-emerald-600/80',
                  'cloud': 'from-orange-500/80 to-amber-600/80',
                  'iac': 'from-purple-600/80 to-violet-600/80',
                  'monitoring': 'from-yellow-600/80 to-orange-600/80',
                  'securite': 'from-red-600/80 to-pink-600/80',
                  'donnees': 'from-teal-600/80 to-green-600/80',
                  'network': 'from-sky-600/80 to-blue-600/80',
                  'systeme': 'from-slate-600/80 to-gray-600/80',
                  'gitops': 'from-orange-500/80 to-red-500/80',
                  'sre': 'from-indigo-600/80 to-purple-600/80',
                  'automatisation': 'from-emerald-600/80 to-teal-600/80',
                  'virtualisation': 'from-violet-600/80 to-fuchsia-600/80',
                };
                const icons: Record<string, string> = {
                  'conteneurisation': 'fa-brands fa-docker',
                  'orchestration': 'fa-solid fa-dharmachakra',
                  'cicd': 'fa-solid fa-code-branch',
                  'cloud': 'fa-solid fa-cloud',
                  'iac': 'fa-solid fa-cubes',
                  'monitoring': 'fa-solid fa-chart-line',
                  'securite': 'fa-solid fa-shield-halved',
                  'donnees': 'fa-solid fa-database',
                  'network': 'fa-solid fa-network-wired',
                  'systeme': 'fa-solid fa-server',
                  'gitops': 'fa-brands fa-git-alt',
                  'sre': 'fa-solid fa-heartbeat',
                  'automatisation': 'fa-solid fa-robot',
                  'virtualisation': 'fa-solid fa-layer-group',
                };
                const gradient = gradients[course.category] || 'from-primary-600/80 to-secondary-600/80';
                const icon = icons[course.category] || 'fa-solid fa-book';
                
                return (
                <Link key={course.id} href={`/courses/${course.slug}`} className="card-hover group relative overflow-hidden !p-0">
                  {/* Visual header with gradient + icon + pattern */}
                  <div className={`relative h-32 bg-gradient-to-br ${gradient} overflow-hidden`}>
                    {/* SVG Pattern overlay */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                    {/* Large icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className={`${icon} text-5xl text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-300`}></i>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-[10px] text-white font-medium">
                        {categoryLabels[course.category] || course.category}
                      </span>
                    </div>
                    {/* Level badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-medium backdrop-blur-sm ${
                        course.level === 'debutant' ? 'bg-green-500/30 text-green-200' :
                        course.level === 'intermediaire' ? 'bg-yellow-500/30 text-yellow-200' : 
                        'bg-red-500/30 text-red-200'
                      }`}>{levelLabels[course.level] || course.level}</span>
                    </div>
                    {/* Featured star */}
                    {course.is_featured ? (
                      <div className="absolute bottom-3 right-3">
                        <Star size={16} className="text-yellow-300 fill-yellow-300" />
                      </div>
                    ) : null}
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition-colors line-clamp-2 text-sm">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{course.description}</p>
                    <div className="mt-3 pt-3 border-t border-gray-800/50 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration_hours || 0}h</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {((course as any).enrollment_count || course.enrolled_count || 0).toLocaleString()}</span>
                      {course.instructor && <span className="text-gray-600 truncate max-w-[80px]">{course.instructor}</span>}
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
