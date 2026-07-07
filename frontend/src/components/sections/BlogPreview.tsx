'use client';

import Link from 'next/link';
import { PenTool, Calendar, Clock, ChevronRight, User } from 'lucide-react';

const posts = [
  {
    title: 'GitOps in 2024: A Complete Implementation Guide',
    slug: 'gitops-2024-guide',
    excerpt: 'Learn how to implement GitOps workflows using ArgoCD and Flux for production Kubernetes clusters.',
    author: 'Alex DevOps',
    date: '2024-03-15',
    read_time: '12 min',
    tag: 'GitOps',
    featured: true,
  },
  {
    title: 'Terraform vs Pulumi: Which IaC Tool to Choose?',
    slug: 'terraform-vs-pulumi',
    excerpt: 'A comprehensive comparison of the two leading Infrastructure as Code tools.',
    author: 'Sarah Cloud',
    date: '2024-03-10',
    read_time: '8 min',
    tag: 'IaC',
    featured: false,
  },
  {
    title: 'Securing Your Kubernetes Clusters: Best Practices',
    slug: 'k8s-security-best-practices',
    excerpt: 'Essential security practices for production Kubernetes deployments.',
    author: 'Mike Security',
    date: '2024-03-08',
    read_time: '15 min',
    tag: 'Security',
    featured: false,
  },
  {
    title: 'Building Internal Developer Platforms',
    slug: 'internal-developer-platforms',
    excerpt: 'How to design and build an IDP that developers actually want to use.',
    author: 'Lisa Platform',
    date: '2024-03-05',
    read_time: '10 min',
    tag: 'Platform',
    featured: false,
  },
];

export function BlogPreview() {
  const featured = posts.find((p) => p.featured);
  const grid = posts.filter((p) => !p.featured);

  return (
    <section className="py-24 dark:bg-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <PenTool size={16} />
            Blog & Articles
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Latest from Our <span className="gradient-text">Blog</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Stay up-to-date with the latest DevOps trends, tutorials, and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="card-hover group lg:row-span-2">
              <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl mb-4 flex items-center justify-center">
                <PenTool size={48} className="text-primary-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="skill-tag mb-3 inline-block">{featured.tag}</span>
              <h3 className="text-2xl font-bold dark:text-white group-hover:text-primary-400 transition-colors">
                {featured.title}
              </h3>
              <p className="text-gray-500 mt-2">{featured.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User size={14} /> {featured.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {featured.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {featured.read_time}
                </span>
              </div>
            </Link>
          )}

          {/* Grid Posts */}
          <div className="space-y-4">
            {grid.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-hover group flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PenTool size={24} className="text-primary-400" />
                </div>
                <div>
                  <span className="skill-tag text-xs">{post.tag}</span>
                  <h3 className="font-semibold dark:text-white group-hover:text-primary-400 transition-colors mt-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.read_time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-outline inline-flex items-center gap-2">
            Read All Articles <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
