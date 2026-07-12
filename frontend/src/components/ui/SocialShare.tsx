'use client';

import { Share2, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

interface ShareProps {
  title: string;
  description?: string;
  type?: 'achievement' | 'course' | 'certification';
}

export function SocialShare({ title, description, type = 'achievement' }: ShareProps) {
  const [showMenu, setShowMenu] = useState(false);

  const messages = {
    achievement: `🏆 J'ai débloqué le succès "${title}" sur DevOps Expert Academy ! #DevOps #Learning`,
    course: `🎓 J'ai terminé la formation "${title}" sur DevOps Expert Academy ! #DevOps #Cloud #Formation`,
    certification: `🏅 Je prépare la certification "${title}" sur DevOps Expert Academy ! #Certification #DevOps`,
  };

  const text = messages[type];
  const url = typeof window !== 'undefined' ? window.location.origin : 'https://devops-exper.vercel.app';

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-primary-400 hover:bg-primary-500/10 transition"
      >
        <Share2 size={14} /> Partager
      </button>

      {showMenu && (
        <div className="absolute bottom-full right-0 mb-2 bg-dark-card border border-gray-700/50 rounded-xl p-2 shadow-xl animate-scale-in min-w-[160px] z-50">
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition"
            onClick={() => setShowMenu(false)}
          >
            <Linkedin size={14} /> LinkedIn
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-secondary-500/10 hover:text-secondary-400 transition"
            onClick={() => setShowMenu(false)}
          >
            <Twitter size={14} /> Twitter / X
          </a>
        </div>
      )}
    </div>
  );
}
