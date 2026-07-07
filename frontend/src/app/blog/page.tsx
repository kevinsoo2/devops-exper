'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenTool, Search, Calendar, Clock, User } from 'lucide-react';
import { blog as blogApi } from '@/lib/api';

const tags = ['All', 'GitOps', 'IaC', 'Security', 'Platform', 'Kubernetes', 'CI/CD', 'Cloud'];


const fallbackPosts = [
  { id: '1', title: 'GitOps in 2024: A Complete Implementation Guide', slug: 'gitops-2024-guide', excerpt: 'Learn how to implement GitOps workflows using ArgoCD and Flux.', author: 'Alex DevOps', date: '2024-03-15', read_time: '12 min', tag: 'GitOps' },
  { id: '2', title: 'Terraform vs Pulumi: Which IaC Tool to Choose?', slug: 'terraform-vs-pulumi', excerpt: 'A comprehensive comparison of the two leading IaC tools.', author: 'Sarah Cloud', date: '2024-03-10', read_time: '8 min', tag: 'IaC' },
  { id: '3', title: 'Securing Kubernetes Clusters: Best Practices', slug: 'k8s-security-best-practices', excerpt: 'Essential security practices for production K8s deployments.', author: 'Mike Security', date: '2024-03-08', read_time: '15 min', tag: 'Security' },
  { id: '4', title: 'Building Internal Developer Platforms', slug: 'internal-developer-platforms', excerpt: 'Design an IDP that developers actually want to use.', author: 'Lisa Platform', date: '2024-03-05', read_time: '10 min', tag: 'Platform' },
  { id: '5', title: 'Kubernetes Networking Deep Dive', slug: 'k8s-networking-deep-dive', excerpt: 'Understanding pod networking, services, and ingress.', author: 'Tom Network', date: '2024-03-01', read_time: '14 min', tag: 'Kubernetes' },
  { id: '6', title: 'GitHub Actions Advanced Workflows', slug: 'github-actions-advanced', excerpt: 'Matrix builds, reusable workflows, and custom actions.', author: 'Chris Pipeline', date: '2024-02-28', read_time: '11 min', tag: 'CI/CD' },
  { id: '7', title: 'Multi-Cloud Strategy with Terraform', slug: 'multi-cloud-terraform', excerpt: 'Managing infrastructure across AWS, GCP, and Azure.', author: 'Dave Cloud', date: '2024-02-25', read_time: '13 min', tag: 'Cloud' },
  { id: '8', title: 'Container Security Scanning with Trivy', slug: 'trivy-container-scanning', excerpt: 'Integrate vulnerability scanning into your CI pipeline.', author: 'Nina Security', date: '2024-02-20', read_time: '9 min', tag: 'Security' },
];

export default function BlogPage() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    blogApi.list()
      .then((data) => { if (data && data.length > 0) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((post) => {
    const matchTag = tag === 'All' || post.tag === tag;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            DevOps <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Tutorials, best practices, and insights from the DevOps community.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tags.map((t) => (
              <button key={t} onClick={() => setTag(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tag === t ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{t}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card-hover group">
                <div className="h-32 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl mb-4 flex items-center justify-center">
                  <PenTool size={32} className="text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="skill-tag text-xs">{post.tag}</span>
                <h3 className="font-bold dark:text-white mt-2 group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
