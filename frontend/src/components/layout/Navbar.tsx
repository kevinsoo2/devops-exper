'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore, useThemeStore } from '@/lib/store';
import {
  Menu,
  X,
  Sun,
  Moon,
  BookOpen,
  FlaskConical,
  Wrench,
  Award,
  Map,
  Users,
  PenTool,
  Trophy,
  FileText,
  Info,
} from 'lucide-react';

const navLinks = [
  { href: '/courses', label: 'Formations', icon: BookOpen },
  { href: '/labs', label: 'Labs', icon: FlaskConical },
  { href: '/tools', label: 'Outils', icon: Wrench },
  { href: '/certifications', label: 'Certifs', icon: Award },
  { href: '/roadmap', label: 'Parcours', icon: Map },
  { href: '/community', label: 'Communauté', icon: Users },
  { href: '/blog', label: 'Blog', icon: PenTool },
  { href: '/achievements', label: 'Succès', icon: Trophy },
  { href: '/cheatsheets', label: 'Fiches', icon: FileText },
  { href: '/about', label: 'À propos', icon: Info },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-2xl border-b border-gray-200 dark:border-white/5 shadow-2xl shadow-black/10 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DE</span>
            </div>
            <span className="font-bold text-lg hidden sm:block dark:text-white">
              DevOps Expert
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link px-3 py-2">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Changer le thème"
            >
              {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/dashboard" className="btn-ghost text-sm">
                  Tableau de bord
                </Link>
                <Link href="/profile" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium dark:text-white">{user.username}</p>
                    <p className="text-xs text-gray-500">Niveau {user.level}</p>
                  </div>
                </Link>
                <button onClick={logout} className="btn-ghost text-sm text-danger-400">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="btn-ghost text-sm">
                  Connexion
                </Link>
                <Link href="/login" className="btn-primary text-sm !px-4 !py-2">
                  S&apos;inscrire
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-slide-up">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {!user && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                <Link href="/login" className="btn-outline flex-1 text-center text-sm !py-2">
                  Connexion
                </Link>
                <Link href="/login" className="btn-primary flex-1 text-center text-sm !py-2">
                  S&apos;inscrire
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
