'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface FocusModeContextType {
  isFocused: boolean;
  toggleFocus: () => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
  isFocused: false,
  toggleFocus: () => {},
});

export function useFocusMode() {
  return useContext(FocusModeContext);
}

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  }, [isFocused]);

  const toggleFocus = () => setIsFocused(prev => !prev);

  return (
    <FocusModeContext.Provider value={{ isFocused, toggleFocus }}>
      {children}
    </FocusModeContext.Provider>
  );
}

// Focus mode toggle button (for lesson pages)
export function FocusModeToggle() {
  const { isFocused, toggleFocus } = useFocusMode();

  return (
    <button
      onClick={toggleFocus}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-primary-400 hover:bg-primary-500/10 transition"
      title={isFocused ? 'Quitter le mode focus' : 'Mode focus (masquer la navigation)'}
    >
      {isFocused ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      {isFocused ? 'Quitter focus' : 'Mode focus'}
    </button>
  );
}
