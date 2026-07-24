'use client';

import Link from 'next/link';
import { Heart, ArrowUp, Mail, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  Plateforme: [
    { label: 'Formations', href: '/courses' },
    { label: 'Labs Pratiques', href: '/labs' },
    { label: 'Outils DevOps', href: '/tools' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Parcours', href: '/roadmap' },
    { label: 'Fiches Récap', href: '/cheatsheets' },
  ],
  Communauté: [
    { label: 'Forum', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Succès & Badges', href: '/achievements' },
    { label: 'Classement', href: '/achievements' },
    { label: 'Projets Portfolio', href: '/projects' },
    { label: 'Contribuer', href: '#' },
  ],
  Ressources: [
    { label: 'Glossaire DevOps', href: '/glossary' },
    { label: 'Commandes Linux', href: '/commands' },
    { label: 'Prép. Entretiens', href: '/interview' },
    { label: 'Comparateur Outils', href: '/tools/compare' },
    { label: 'Mode Étude', href: '/study' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Entreprise: [
    { label: 'À propos', href: '/about' },
    { label: 'Carrières DevOps', href: '/career' },
    { label: 'Salaires', href: '/salaries' },
    { label: 'Mentions légales', href: '#' },
    { label: 'RGPD', href: '#' },
    { label: 'CGU', href: '#' },
  ],
};

const socials = [
  { icon: 'fa-brands fa-github', href: 'https://github.com/kevinsoo2', label: 'GitHub' },
  { icon: 'fa-brands fa-twitter', href: '#', label: 'Twitter' },
  { icon: 'fa-brands fa-discord', href: '#', label: 'Discord' },
  { icon: 'fa-brands fa-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube', href: '#', label: 'YouTube' },
];

const techStack = [
  { name: 'Next.js', color: 'text-white' },
  { name: 'Vercel', color: 'text-white' },
  { name: 'Render', color: 'text-green-400' },
  { name: 'Turso', color: 'text-cyan-400' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-dark border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA Banner */}
        <div className="py-10 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold dark:text-white">
                Prêt à devenir Expert DevOps ?
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Rejoignez des milliers d&apos;apprenants et commencez votre transformation.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/courses" className="btn-primary text-sm !px-6">
                Commencer maintenant
              </Link>
              <Link href="/about" className="btn-outline text-sm !px-6">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-sm">DE</span>
              </div>
              <div>
                <span className="font-bold text-lg dark:text-white">DevOps Expert</span>
                <span className="block text-xs text-gray-500">Academy</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs leading-relaxed">
              La plateforme francophone de référence pour maîtriser les technologies DevOps, 
              du débutant à l&apos;expert. Formations complètes, labs pratiques et certifications.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-primary-400" />
                <span>contact@devops-expert.fr</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe size={14} className="text-primary-400" />
                <span>devops-exper.vercel.app</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-primary-400" />
                <span>France & Francophonie</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white hover:scale-110 transition-all text-gray-600 dark:text-gray-400 hover:shadow-lg hover:shadow-primary-500/20"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm dark:text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary-500 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              &copy; {new Date().getFullYear()} DevOps Expert Academy. Fait avec{' '}
              <Heart size={14} className="text-danger-400 fill-danger-400 inline" /> en France
            </p>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span>Propulsé par</span>
              {techStack.map((tech, i) => (
                <span key={tech.name}>
                  <span className={`font-medium ${tech.color}`}>{tech.name}</span>
                  {i < techStack.length - 1 && <span className="mx-1">·</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
              Confidentialité
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
              CGU
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
              Cookies
            </Link>
            <button
              onClick={scrollToTop}
              className="ml-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all"
              aria-label="Retour en haut"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
