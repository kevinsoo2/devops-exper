'use client';

import { useState, useEffect } from 'react';
import { Award, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { certifications as certsApi } from '@/lib/api';


const fallbackCerts = [
  { id: '1', title: 'DevOps Foundations', level: 'Beginner', duration: '4 weeks', modules: 8, description: 'Core DevOps principles, culture, and practices.', skills: ['CI/CD Basics', 'Version Control', 'Agile & DevOps Culture', 'Monitoring Intro'], badge_color: 'from-green-400 to-emerald-500' },
  { id: '2', title: 'Cloud Native Engineer', level: 'Intermediate', duration: '8 weeks', modules: 12, description: 'Design and deploy cloud-native applications at scale.', skills: ['Kubernetes', 'Microservices', 'Service Mesh', 'Cloud Design Patterns'], badge_color: 'from-primary-400 to-primary-600' },
  { id: '3', title: 'Platform Engineering Expert', level: 'Advanced', duration: '12 weeks', modules: 16, description: 'Build internal developer platforms and drive transformation.', skills: ['Platform Design', 'Developer Experience', 'GitOps', 'SRE Practices'], badge_color: 'from-purple-400 to-purple-600' },
  { id: '4', title: 'CI/CD Specialist', level: 'Intermediate', duration: '6 weeks', modules: 10, description: 'Master continuous integration and deployment pipelines.', skills: ['Pipeline Design', 'Testing Strategies', 'Deployment Patterns', 'Security Scanning'], badge_color: 'from-blue-400 to-blue-600' },
  { id: '5', title: 'Infrastructure Architect', level: 'Advanced', duration: '10 weeks', modules: 14, description: 'Design scalable and resilient infrastructure solutions.', skills: ['IaC Mastery', 'Multi-Cloud', 'Network Design', 'Cost Optimization'], badge_color: 'from-accent-400 to-accent-600' },
  { id: '6', title: 'Security Operations', level: 'Advanced', duration: '8 weeks', modules: 12, description: 'Implement DevSecOps practices and security automation.', skills: ['SAST/DAST', 'Container Security', 'Compliance', 'Incident Response'], badge_color: 'from-red-400 to-red-600' },
];

export default function CertificationsPage() {
  const [certs, setCerts] = useState(fallbackCerts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certsApi.list()
      .then((data) => { if (data && data.length > 0) setCerts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            Professional <span className="gradient-text">Certifications</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Validate your DevOps expertise with comprehensive certification programs.
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
                  cert.level === 'Beginner' ? 'difficulty-beginner' :
                  cert.level === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'
                }`}>{cert.level}</span>
                <h3 className="text-xl font-bold dark:text-white mt-3 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{cert.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {cert.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} /> {cert.modules} modules</span>
                </div>
                <div className="space-y-2">
                  {cert.skills.map((skill) => (
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
