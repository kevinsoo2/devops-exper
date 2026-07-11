'use client';

interface BadgeProps {
  variant?: 'new' | 'popular' | 'bestseller' | 'pro' | 'free';
  children?: React.ReactNode;
  className?: string;
}

const variants = {
  new: 'bg-success-500/15 text-success-400 border-success-500/30',
  popular: 'bg-primary-500/15 text-primary-400 border-primary-500/30',
  bestseller: 'bg-accent-500/15 text-accent-400 border-accent-500/30',
  pro: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  free: 'bg-secondary-500/15 text-secondary-400 border-secondary-500/30',
};

const labels = {
  new: '✨ Nouveau',
  popular: '🔥 Populaire',
  bestseller: '⭐ Best-seller',
  pro: '💎 Pro',
  free: '🎁 Gratuit',
};

export function Badge({ variant = 'new', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${variants[variant]} ${className}`}>
      {children || labels[variant]}
    </span>
  );
}
