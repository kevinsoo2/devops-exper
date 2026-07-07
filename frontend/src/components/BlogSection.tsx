'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image_icon: string;
  read_time_minutes: number;
  is_featured: number;
  published_at: string;
}

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.blog.list()
      .then((data) => setPosts(data.posts))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-6 bg-dark-card/30" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-badge mb-4">
            <i className="fas fa-newspaper"></i> Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Articles <span className="gradient-text">Récents</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Restez à jour avec les dernières tendances DevOps
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse h-48" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className={`card card-hover group ${
                  post.is_featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
                }`}
              >
                <div className="h-40 md:h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/5 relative mb-4 md:mb-0">
                  <i className={`${post.image_icon} text-4xl text-primary/60`}></i>
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-primary text-white rounded-full text-[10px] font-bold">
                    {post.category}
                  </span>
                </div>
                <div className={post.is_featured ? 'p-2 md:p-4' : ''}>
                  <div className="flex gap-4 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.read_time_minutes} min
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary-light transition leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light group-hover:gap-3 transition-all">
                    Lire l&apos;article <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
