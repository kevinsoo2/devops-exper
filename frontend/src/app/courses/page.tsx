'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Clock, Users, Star, Filter } from 'lucide-react';
import { courses as coursesApi } from '@/lib/api';

const categories = ['All', 'Containerization', 'CI/CD', 'Cloud', 'IaC', 'Orchestration', 'Monitoring', 'Foundations', 'Security'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const fallbackCourses = [
  { id: '1', title: 'Docker Mastery', slug: 'docker-mastery', description: 'Complete Docker from zero to production deployments.', category: 'Containerization', level: 'Beginner', duration_hours: 12, enrolled_count: 3420, rating: 4.8, instructor: 'Alex DevOps' },
  { id: '2', title: 'Kubernetes Complete Guide', slug: 'kubernetes-complete', description: 'Master Kubernetes from pods to production clusters.', category: 'Orchestration', level: 'Intermediate', duration_hours: 24, enrolled_count: 2150, rating: 4.9, instructor: 'Sarah Cloud' },
  { id: '3', title: 'Terraform Infrastructure as Code', slug: 'terraform-iac', description: 'Build cloud infrastructure with Terraform across multi-cloud.', category: 'IaC', level: 'Intermediate', duration_hours: 16, enrolled_count: 1890, rating: 4.7, instructor: 'Mike Terraform' },
  { id: '4', title: 'GitHub Actions CI/CD', slug: 'github-actions-cicd', description: 'Build production-grade CI/CD pipelines with GitHub Actions.', category: 'CI/CD', level: 'Beginner', duration_hours: 8, enrolled_count: 4200, rating: 4.6, instructor: 'Chris Pipeline' },
  { id: '5', title: 'AWS Solutions Architect', slug: 'aws-solutions-architect', description: 'Complete AWS certification prep with hands-on labs.', category: 'Cloud', level: 'Advanced', duration_hours: 40, enrolled_count: 1650, rating: 4.9, instructor: 'Lisa AWS' },
  { id: '6', title: 'Linux Administration', slug: 'linux-admin', description: 'From basics to advanced system administration.', category: 'Foundations', level: 'Beginner', duration_hours: 20, enrolled_count: 5100, rating: 4.7, instructor: 'Tom Linux' },
  { id: '7', title: 'Prometheus & Grafana', slug: 'prometheus-grafana', description: 'Complete observability stack with metrics and dashboards.', category: 'Monitoring', level: 'Intermediate', duration_hours: 10, enrolled_count: 1200, rating: 4.5, instructor: 'Dave Monitor' },
  { id: '8', title: 'GitLab CI/CD Pipeline', slug: 'gitlab-cicd', description: 'End-to-end CI/CD with GitLab from test to deploy.', category: 'CI/CD', level: 'Intermediate', duration_hours: 14, enrolled_count: 980, rating: 4.6, instructor: 'Nina DevOps' },
  { id: '9', title: 'Kubernetes Security', slug: 'k8s-security', description: 'Secure your Kubernetes clusters with best practices.', category: 'Security', level: 'Advanced', duration_hours: 18, enrolled_count: 750, rating: 4.8, instructor: 'Sam Security' },
];

export default function CoursesPage() {
  const [courseList, setCourseList] = useState(fallbackCourses);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');

  useEffect(() => {
    coursesApi
      .list()
      .then((data) => { if (data && data.length > 0) setCourseList(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = courseList.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || course.category === category;
    const matchesLevel = level === 'All' || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            All <span className="gradient-text">Courses</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore our library of DevOps courses, from foundations to expert-level content.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
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
                {cat}
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
                {lvl}
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
            <p className="text-sm text-gray-500 mb-6">{filtered.length} courses found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="card-hover group">
                  <div className="h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl mb-4 flex items-center justify-center">
                    <BookOpen size={36} className="text-primary-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="skill-tag text-xs">{course.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      course.level === 'Beginner' ? 'difficulty-beginner' :
                      course.level === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'
                    }`}>{course.level}</span>
                  </div>
                  <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={14} /> {course.duration_hours}h</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {course.enrolled_count.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star size={14} className="text-accent-400" /> {course.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
