'use client';

import { useEffect } from 'react';
import { useAuthStore, useThemeStore } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const loadAuth = useAuthStore((s) => s.loadFromStorage);
  const loadTheme = useThemeStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadAuth();
    loadTheme();
  }, [loadAuth, loadTheme]);

  return <>{children}</>;
}
