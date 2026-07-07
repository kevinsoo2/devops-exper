'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { blog as blogApi } from '@/lib/api';


const fallbackPost = {
  title: 'GitOps in 2024: A Complete Implementation Guide',
  slug: 'gitops-2024-guide',
  content: `GitOps is a modern approach to continuous deployment that uses Git as the single source of truth for infrastructure and application configuration.

## What is GitOps?

GitOps is an operational framework that takes DevOps best practices used for application development such as version control, collaboration, compliance, and CI/CD, and applies them to infrastructure automation.

## Key Principles

1. **Declarative Configuration** - The entire system is described declaratively in Git
2. **Version Controlled** - All changes go through Git, providing a complete audit trail
3. **Automated Delivery** - Approved changes are automatically applied to the system
4. **Self-Healing** - Software agents ensure correctness and alert on divergence

## Implementation with ArgoCD

ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It follows the GitOps pattern of using Git repositories as the source of truth for defining the desired application state.

## Best Practices

- Use separate repos for application code and deployment manifests
- Implement proper RBAC and secrets management
- Set up notifications for sync status changes
- Use ApplicationSets for multi-cluster deployments
- Implement progressive delivery with Argo Rollouts`,
  author: 'Alex DevOps',
  author_bio: 'Senior DevOps Engineer with 10+ years experience in cloud-native technologies.',
  date: '2024-03-15',
  read_time: '12 min',
  tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'CI/CD'],
};

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.get(params.slug as string)
      .then((data) => setPost(data))
      .catch(() => setPost(fallbackPost))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-3xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const data = post || fallbackPost;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400 mb-6">
          <ArrowLeft size={16} /> Retour au Blog
        </Link>

        <article>
          <div className="flex flex-wrap gap-2 mb-4">
            {(data.tags || fallbackPost.tags).map((tag: string) => (
              <span key={tag} className="skill-tag text-xs">{tag}</span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white mb-4">{data.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <span className="flex items-center gap-1"><User size={14} /> {data.author || fallbackPost.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {data.date || fallbackPost.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {data.read_time || fallbackPost.read_time}</span>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {(data.content || fallbackPost.content).split('\n').map((paragraph: string, idx: number) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold dark:text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={idx} className="text-gray-600 dark:text-gray-300 ml-4">{paragraph.replace('- ', '')}</li>;
              }
              if (paragraph.match(/^\d+\./)) {
                return <li key={idx} className="text-gray-600 dark:text-gray-300 ml-4 list-decimal">{paragraph.replace(/^\d+\.\s*/, '')}</li>;
              }
              if (paragraph.trim() === '') return <br key={idx} />;
              return <p key={idx} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{paragraph}</p>;
            })}
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                {(data.author || fallbackPost.author).charAt(0)}
              </div>
              <div>
                <p className="font-semibold dark:text-white">{data.author || fallbackPost.author}</p>
                <p className="text-sm text-gray-500">{data.author_bio || fallbackPost.author_bio}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
