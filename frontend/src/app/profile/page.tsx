'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { auth } from '@/lib/api';
import { useAuthStore } from '@/lib/store';


export default function ProfilePage() {
  const router = useRouter();
  const { user, setAuth, isLoading: authLoading } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        github_url: user.github_url || '',
        linkedin_url: user.linkedin_url || '',
      });
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    try {
      const data = await auth.updateProfile(form);
      setAuth(data.user, localStorage.getItem('token') || '');
      setStatus('success');
      setMessage('Profil mis à jour avec succès !');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Échec de la mise à jour du profil.');
    }
    setLoading(false);
  };

  if (authLoading) {
    return <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Chargement...</div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Modifier le Profil</h1>
          <p className="text-gray-500 mt-1">Mettez à jour vos informations personnelles et liens sociaux.</p>
        </div>

        <div className="card">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <p className="font-bold dark:text-white text-lg">{user?.username}</p>
              <p className="text-sm text-gray-500">Niveau {user?.level || 1} &middot; {user?.xp_points || 0} XP</p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 text-[10px] font-medium border border-primary-500/20">🎓 Apprenant</span>
                <span className="px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 text-[10px] font-medium border border-accent-500/20">🔥 Streak {(user as any)?.streak_days || 0}j</span>
                <span className="px-2 py-0.5 rounded-full bg-success-500/10 text-success-400 text-[10px] font-medium border border-success-500/20">⚡ Niv.{user?.level || 1}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats on Profile */}
          <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-lg font-bold text-white">{user?.xp_points || 0}</p>
              <p className="text-[10px] text-gray-500">Points XP</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-lg font-bold text-white">{user?.level || 1}</p>
              <p className="text-[10px] text-gray-500">Niveau</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-lg font-bold text-white">{(user as any)?.streak_days || 0}</p>
              <p className="text-[10px] text-gray-500">Jours streak</p>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-success-500/10 border border-success-500/20 text-success-400 text-sm">
              <CheckCircle size={16} /> {message}
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm">
              <AlertCircle size={16} /> {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-1">Nom d&apos;utilisateur</label>
              <input type="text" value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-1">Email</label>
              <input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-1">Bio</label>
              <textarea value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Parlez-nous de vous..." />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-1">URL GitHub</label>
              <input type="url" value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className="input-field" placeholder="https://github.com/username" />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-1">URL LinkedIn</label>
              <input type="url" value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                className="input-field" placeholder="https://linkedin.com/in/username" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              <Save size={18} /> {loading ? 'Enregistrement...' : 'Enregistrer les Modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
