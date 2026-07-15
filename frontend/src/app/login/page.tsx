'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, UserPlus, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { auth } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  // Handle OAuth callback - check for token in URL params
  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      const errorMessages: Record<string, string> = {
        'google_auth_failed': 'Échec de la connexion Google. Veuillez réessayer.',
        'github_auth_failed': 'Échec de la connexion GitHub. Veuillez réessayer.',
        'no_code': 'Code d\'autorisation manquant.',
        'token_exchange_failed': 'Erreur lors de l\'échange du token. Vérifiez la configuration.',
        'backend_auth_failed': 'Erreur du serveur d\'authentification.',
        'no_email': 'Impossible de récupérer l\'email depuis GitHub. Vérifiez que votre email est public.',
        'server_error': 'Erreur serveur. Veuillez réessayer.',
      };
      setError(errorMessages[errorParam] || 'Erreur d\'authentification.');
      // Clean URL
      window.history.replaceState({}, '', '/login');
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(userParam);
        setAuth(user, token);
        router.push('/dashboard');
      } catch {
        setError('Erreur lors de la récupération des données utilisateur.');
      }
      // Clean URL
      window.history.replaceState({}, '', '/login');
    }
  }, [searchParams, setAuth, router]);

  const handleOAuth = (provider: 'google' | 'github') => {
    // OAuth configuration
    const config = {
      google: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        redirect_uri: `${typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/callback/google`,
        scope: 'openid email profile',
        response_type: 'code',
      },
      github: {
        url: 'https://github.com/login/oauth/authorize',
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
        redirect_uri: `${typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/callback/github`,
        scope: 'read:user user:email',
      },
    };

    const { url, client_id, redirect_uri, scope, ...rest } = config[provider];
    
    if (!client_id) {
      // Demo mode: simulate OAuth login
      setError('');
      setLoading(true);
      setTimeout(async () => {
        try {
          // Create account with OAuth-style data
          const oauthEmail = provider === 'google' ? 'user@gmail.com' : 'user@github.com';
          const oauthUsername = provider === 'google' ? 'google_user' : 'github_user';
          
          // Try to register/login with a demo OAuth account
          try {
            const data = await auth.register({ 
              username: `${oauthUsername}_${Date.now().toString(36)}`, 
              email: `${provider}_${Date.now()}@devops-expert.fr`, 
              password: `oauth_${provider}_${Date.now()}` 
            });
            setAuth(data.user, data.token);
            router.push('/dashboard');
          } catch {
            setError(`Pour activer la connexion ${provider === 'google' ? 'Google' : 'GitHub'}, configurez les variables NEXT_PUBLIC_${provider.toUpperCase()}_CLIENT_ID dans Vercel.`);
          }
        } catch {
          setError('Erreur lors de la connexion OAuth');
        }
        setLoading(false);
      }, 1000);
      return;
    }

    // Real OAuth flow
    const params = new URLSearchParams({
      client_id,
      redirect_uri,
      scope,
      response_type: (rest as any).response_type || 'code',
      state: Math.random().toString(36).substring(7),
    });
    
    window.location.href = `${url}?${params.toString()}`;
  };

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

          {/* OAuth Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-dark-card text-xs text-gray-500">ou continuer avec</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/60 hover:border-gray-600 transition-all text-sm font-medium text-gray-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuer avec Google
            </button>

            <button
              onClick={() => handleOAuth('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/60 hover:border-gray-600 transition-all text-sm font-medium text-gray-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continuer avec GitHub
            </button>
          </div>

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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>}>
      <LoginContent />
    </Suspense>
  );
}
