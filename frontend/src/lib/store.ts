import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar?: string;
  xp_points: number;
  level: number;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  created_at?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ user, token, isLoading: false });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ user: null, token: null, isLoading: false });
  },
  loadFromStorage: () => {
    if (typeof window === 'undefined') {
      set({ isLoading: false });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({ user, token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,
  toggle: () =>
    set((state) => {
      const newDark = !state.isDark;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDark);
      }
      return { isDark: newDark };
    }),
  loadFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const theme = localStorage.getItem('theme');
      const isDark = theme !== 'light';
      document.documentElement.classList.toggle('dark', isDark);
      set({ isDark });
    } catch {
      set({ isDark: true });
    }
  },
}));
