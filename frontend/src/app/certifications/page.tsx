'use client';

import { useState, useEffect } from 'react';
import { Award, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { certifications as certsApi } from '@/lib/api';


const fallbackCerts = [
  { id: '1', title: 'DevOps Foundations', level: 'Débutant', duration: '4 semaines', modules: 8, description: 'Principes fondamentaux du DevOps, culture et pratiques.', skills: ['CI/CD Basics', 'Version Control', 'Agile & DevOps Culture', 'Monitoring Intro'], badge_color: 'from-green-400 to-emerald-500' },
  { id: '2', title: 'Cloud Native Engineer', level: 'Intermédiaire', duration: '8 semaines', modules: 12, description: 'Concevoir et déployer des applications cloud-native à grande échelle.', skills: ['Kubernetes', 'Microservices', 'Service Mesh', 'Cloud Design Patterns'], badge_color: 'from-primary-400 to-primary-600' },
  { id: '3', title: 'Platform Engineering Expert', level: 'Avancé', duration: '12 semaines', modules: 16, description: 'Construire des plateformes internes et piloter la transformation.', skills: ['Platform Design', 'Developer Experience', 'GitOps', 'SRE Practices'], badge_color: 'from-purple-400 to-purple-600' },
  { id: '4', title: 'CI/CD Specialist', level: 'Intermédiaire', duration: '6 semaines', modules: 10, description: 'Maîtriser les pipelines d\'intégration et déploiement continus.', skills: ['Pipeline Design', 'Testing Strategies', 'Deployment Patterns', 'Security Scanning'], badge_color: 'from-blue-400 to-blue-600' },
  { id: '5', title: 'Infrastructure Architect', level: 'Avancé', duration: '10 semaines', modules: 14, description: 'Concevoir des solutions d\'infrastructure scalables et résilientes.', skills: ['IaC Mastery', 'Multi-Cloud', 'Network Design', 'Cost Optimization'], badge_color: 'from-accent-400 to-accent-600' },
  { id: '6', title: 'Security Operations', level: 'Avancé', duration: '8 semaines', modules: 12, description: 'Implémenter les pratiques DevSecOps et l\'automatisation de la sécurité.', skills: ['SAST/DAST', 'Container Security', 'Compliance', 'Incident Response'], badge_color: 'from-red-400 to-red-600' },
];

export default function CertificationsPage() {
  const [certs, setCerts] = useState(fallbackCerts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certsApi.list()
      .then((data) => {
        if (data && data.length > 0) {
          // Map API data to component format
          const mapped = data.map((c: any) => ({
            id: c.id || c.slug,
            title: c.name || c.title,
            level: c.difficulty === 'intermediaire' ? 'Intermédiaire' : c.difficulty === 'avance' ? 'Avancé' : c.difficulty === 'expert' ? 'Expert' : 'Débutant',
            duration: c.prep_hours ? `${c.prep_hours}h de préparation` : c.duration || '4 semaines',
            modules: c.mock_exam_count || c.modules || 0,
            description: c.description || '',
            skills: (() => {
              try {
                if (Array.isArray(c.skills)) return c.skills;
                if (Array.isArray(c.topics)) return c.topics;
                if (typeof c.topics === 'string') return JSON.parse(c.topics);
                if (typeof c.skills === 'string') return JSON.parse(c.skills);
                return [];
              } catch { return []; }
            })(),
            badge_color: 'from-primary-400 to-primary-600',
          }));
          setCerts(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            <span className="gradient-text">Certifications</span> Professionnelles
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Validez votre expertise DevOps avec des programmes de certification complets.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert) => (
              <div key={cert.id} className="card-hover">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.badge_color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Award size={32} className="text-white" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  cert.level === 'Débutant' ? 'difficulty-beginner' :
                  cert.level === 'Intermédiaire' ? 'difficulty-intermediate' : 'difficulty-advanced'
                }`}>{cert.level}</span>
                <h3 className="text-xl font-bold dark:text-white mt-3 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{cert.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {cert.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} /> {cert.modules} modules</span>
                </div>
                <div className="space-y-2">
                  {(cert.skills || []).map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="text-success-400" />
                      <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
