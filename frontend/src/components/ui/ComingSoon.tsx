'use client';

import { Construction } from 'lucide-react';

interface ComingSoonProps {
  feature: string;
  description?: string;
}

export function ComingSoon({ feature, description }: ComingSoonProps) {
  return (
    <div className="card border-accent-500/20 bg-accent-500/5 text-center py-8">
      <Construction size={32} className="mx-auto text-accent-400 mb-3" />
      <h3 className="font-bold text-white text-sm mb-1">{feature}</h3>
      <p className="text-xs text-gray-500">
        {description || 'Cette fonctionnalité arrive bientôt. Restez à l\'écoute !'}
      </p>
      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-[10px] text-accent-400 font-medium">
        🚧 En développement
      </span>
    </div>
  );
}
