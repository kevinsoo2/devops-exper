'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { auth } from '@/lib/api';
import { useAuthStore } from '@/lib/store';


export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const data = await auth.login({ email: form.email, password: form.password });
        setAuth(data.user, data.token);
      } else {
        const data = await auth.register({ username: form.username, email: form.email, password: form.password });
        setAuth(data.user, data.token);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Échec de l\'authentification. Veuillez réessayer.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
              {isLogin ? <LogIn size={28} className="text-white" /> : <UserPlus size={28} className="text-white" />}
            </div>
            <h1 className="text-2xl font-bold dark:text-white">
              {isLogin ? 'Bon Retour' : 'Créer un Compte'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin ? 'Connectez-vous pour continuer votre parcours.' : 'Commencez votre apprentissage DevOps dès aujourd\'hui.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Nom d'utilisateur" value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="input-field pl-10" required={!isLogin} />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Adresse email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field pl-10" required />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" placeholder="Mot de passe" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-10" required minLength={6} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Traitement...' : isLogin ? 'Se connecter' : 'Créer le compte'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">
              {isLogin ? "Pas encore de compte ?" : 'Vous avez déjà un compte ?'}
            </span>
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="ml-2 text-primary-400 hover:text-primary-300 font-medium">
              {isLogin ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
