'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Users, Star, ChevronRight } from 'lucide-react';
import { courses as coursesApi } from '@/lib/api';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  enrolled_count: number;
  rating: number;
  image_url?: string;
  instructor: string;
}

const fallbackCourses: Course[] = [
  {
    id: '1',
    title: 'Docker Mastery: From Zero to Production',
    slug: 'docker-mastery',
    description: 'Learn Docker from basics to advanced production deployments with multi-stage builds and orchestration.',
    category: 'Containerization',
    level: 'Beginner',
    duration_hours: 12,
    enrolled_count: 3420,
    rating: 4.8,
    instructor: 'Alex DevOps',
  },
  {
    id: '2',
    title: 'Kubernetes Complete Guide',
    slug: 'kubernetes-complete',
    description: 'Master Kubernetes from pods to production clusters. Includes Helm, Istio, and security best practices.',
    category: 'Orchestration',
    level: 'Intermediate',
    duration_hours: 24,
    enrolled_count: 2150,
    rating: 4.9,
    instructor: 'Sarah Cloud',
  },
  {
    id: '3',
    title: 'Terraform Infrastructure as Code',
    slug: 'terraform-iac',
    description: 'Build cloud infrastructure with Terraform. AWS, GCP, and Azure modules with state management.',
    category: 'IaC',
    level: 'Intermediate',
    duration_hours: 16,
    enrolled_count: 1890,
    rating: 4.7,
    instructor: 'Mike Terraform',
  },
  {
    id: '4',
    title: 'GitHub Actions CI/CD Masterclass',
    slug: 'github-actions-cicd',
    description: 'Build production-grade CI/CD pipelines with GitHub Actions. Testing, deployment, and security scanning.',
    category: 'CI/CD',
    level: 'Beginner',
    duration_hours: 8,
    enrolled_count: 4200,
    rating: 4.6,
    instructor: 'Chris Pipeline',
  },
  {
    id: '5',
    title: 'AWS Solutions Architect Prep',
    slug: 'aws-solutions-architect',
    description: 'Complete AWS certification preparation with hands-on labs and practice exams.',
    category: 'Cloud',
    level: 'Advanced',
    duration_hours: 40,
    enrolled_count: 1650,
    rating: 4.9,
    instructor: 'Lisa AWS',
  },
  {
    id: '6',
    title: 'Linux Administration Deep Dive',
    slug: 'linux-admin',
    description: 'From basics to advanced system administration. Systemd, networking, security hardening.',
    category: 'Foundations',
    level: 'Beginner',
    duration_hours: 20,
    enrolled_count: 5100,
    rating: 4.7,
    instructor: 'Tom Linux',
  },
];

export function CoursesPreview() {
  const [courseList, setCourseList] = useState<Course[]>(fallbackCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi
      .list()
      .then((data) => {
        if (data && data.length > 0) setCourseList(data.slice(0, 6));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 dark:bg-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <BookOpen size={16} />
            Formations Populaires
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Apprenez avec des <span className="gradient-text">Experts du Secteur</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Des formations structurées avec des projets pratiques, quiz et scénarios réels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="card-hover group">
              <div className="h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl mb-4 flex items-center justify-center">
                <BookOpen size={40} className="text-primary-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="skill-tag">{course.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  course.level === 'Beginner' || course.level === 'Débutant' ? 'difficulty-beginner' :
                  course.level === 'Intermediate' || course.level === 'Intermédiaire' ? 'difficulty-intermediate' :
                  'difficulty-advanced'
                }`}>
                  {course.level}
                </span>
              </div>
              <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{course.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {course.duration_hours}h
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {course.enrolled_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-accent-400" /> {course.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
            Voir toutes les Formations <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
