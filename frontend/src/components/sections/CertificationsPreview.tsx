'use client';

import Link from 'next/link';
import { Award, Clock, BookOpen, ChevronRight, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'DevOps Foundations',
    level: 'Beginner',
    duration: '4 weeks',
    modules: 8,
    description: 'Core DevOps principles, culture, and practices.',
    skills: ['CI/CD Basics', 'Version Control', 'Agile & DevOps Culture', 'Monitoring Intro'],
    badge_color: 'from-green-400 to-emerald-500',
  },
  {
    title: 'Cloud Native Engineer',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: 12,
    description: 'Design and deploy cloud-native applications at scale.',
    skills: ['Kubernetes', 'Microservices', 'Service Mesh', 'Cloud Design Patterns'],
    badge_color: 'from-primary-400 to-primary-600',
  },
  {
    title: 'Platform Engineering Expert',
    level: 'Advanced',
    duration: '12 weeks',
    modules: 16,
    description: 'Build internal developer platforms and drive organizational transformation.',
    skills: ['Platform Design', 'Developer Experience', 'GitOps', 'SRE Practices'],
    badge_color: 'from-purple-400 to-purple-600',
  },
];

export function CertificationsPreview() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Award size={16} />
            Certifications
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Earn Industry <span className="gradient-text">Recognized Credentials</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Validate your skills with comprehensive certifications backed by practical assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div key={cert.title} className="card-hover relative overflow-hidden">
              {/* Badge */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.badge_color} flex items-center justify-center mb-6 shadow-lg`}>
                <Award size={32} className="text-white" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  cert.level === 'Beginner' ? 'difficulty-beginner' :
                  cert.level === 'Intermediate' ? 'difficulty-intermediate' :
                  'difficulty-advanced'
                }`}>
                  {cert.level}
                </span>
              </div>

              <h3 className="text-xl font-bold dark:text-white mb-2">{cert.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{cert.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {cert.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={14} /> {cert.modules} modules
                </span>
              </div>

              <div className="space-y-2">
                {cert.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-success-400" />
                    <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/certifications"
                className="mt-6 inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 font-medium"
              >
                Learn More <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/certifications" className="btn-outline inline-flex items-center gap-2">
            View All Certifications <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
