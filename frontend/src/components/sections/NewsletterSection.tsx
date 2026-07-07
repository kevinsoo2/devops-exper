'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { blog } from '@/lib/api';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await blog.subscribe(email);
      setStatus('success');
      setMessage('Welcome aboard! Check your inbox for confirmation.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-24 dark:bg-dark/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card relative overflow-hidden p-12 text-center">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6">
              <Mail size={32} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold dark:text-white">
              Stay in the <span className="gradient-text">Loop</span>
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Get weekly DevOps tips, new course announcements, and exclusive content delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field flex-1"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary whitespace-nowrap flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Mail size={18} /> Subscribe
                  </>
                )}
              </button>
            </form>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-success-400 text-sm">
                <CheckCircle size={16} />
                {message}
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-danger-400 text-sm">
                <AlertCircle size={16} />
                {message}
              </div>
            )}

            <p className="mt-4 text-xs text-gray-500">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
