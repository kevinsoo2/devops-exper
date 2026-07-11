'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let idCounter = 0;

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now() + idCounter++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const icons = {
    success: <CheckCircle size={16} className="text-success-400" />,
    error: <AlertCircle size={16} className="text-danger-400" />,
    info: <Info size={16} className="text-primary-400" />,
  };

  const borderColors = {
    success: 'border-success-500/30',
    error: 'border-danger-500/30',
    info: 'border-primary-500/30',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-20 right-4 z-[200] space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl 
              bg-dark-card/95 backdrop-blur-xl border ${borderColors[toast.type]} 
              shadow-2xl shadow-black/20 animate-slide-left min-w-[280px] max-w-sm`}
          >
            {icons[toast.type]}
            <p className="text-sm text-gray-200 flex-1">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
