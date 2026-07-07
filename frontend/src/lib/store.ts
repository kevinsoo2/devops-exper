import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  plan: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devops-token', token);
      localStorage.setItem('devops-user', JSON.stringify(user));
    }
    set({ user, token, isLoading: false });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('devops-token');
      localStorage.removeItem('devops-user');
    }
    set({ user: null, token: null, isLoading: false });
  },

  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('devops-token');
      const userStr = localStorage.getItem('devops-user');
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ user, token, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      } else {
        set({ isLoading: false });
      }
    }
  },
}));

// Theme store
interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  loadFromStorage: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: true,

  toggle: () => {
    const newValue = !get().isDark;
    if (typeof window !== 'undefined') {
      localStorage.setItem('devops-theme', newValue ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newValue);
    }
    set({ isDark: newValue });
  },

  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devops-theme');
      const isDark = saved !== 'light';
      document.documentElement.classList.toggle('dark', isDark);
      set({ isDark });
    }
  },
}));
