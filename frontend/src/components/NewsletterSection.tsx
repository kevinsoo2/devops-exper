'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Send, Lock, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api.blog.subscribe(email);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  return (
    <section className="py-16 px-6 bg-dark-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Restez à jour avec le DevOps</h2>
            <p className="text-sm text-slate-400">
              Recevez chaque semaine les meilleures ressources et actualités DevOps.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 w-full">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary px-5 py-3 shrink-0"
              >
                {status === 'loading' && <i className="fas fa-spinner fa-spin"></i>}
                {status === 'success' && <CheckCircle className="w-4 h-4" />}
                {status === 'idle' && <Send className="w-4 h-4" />}
                {status === 'error' && '!'}
                <span className="hidden sm:inline">
                  {status === 'success' ? 'Inscrit!' : status === 'error' ? 'Erreur' : "S'abonner"}
                </span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Pas de spam. Désabonnement en 1 clic.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
