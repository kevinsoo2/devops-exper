'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'fade-in' | 'scale-in' | 'bounce-in';
  delay?: number;
  className?: string;
  once?: boolean;
}

export function AnimateOnScroll({ 
  children, 
  animation = 'slide-up', 
  delay = 0, 
  className = '',
  once = true 
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollReveal({ once });

  const animationClasses: Record<string, string> = {
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'fade-in': 'animate-fade-in',
    'scale-in': 'animate-scale-in',
    'bounce-in': 'animate-bounce-in',
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClasses[animation] : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
