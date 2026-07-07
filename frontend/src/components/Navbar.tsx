'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore, useThemeStore } from '@/lib/store';
import { Moon, Sun, Menu, X, Infinity } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/courses', label: 'Formations' },
  { href: '/tools', label: 'Outils' },
  { href: '/labs', label: 'Labs' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/blog', label: 'Blog' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-xl py-2.5 shadow-lg border-b border-slate-700/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold">
          <Infinity className="w-7 h-7 text-primary" />
          <span>
            DevOps<strong className="text-primary-light">Expert</strong>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/dashboard" className="text-sm text-slate-400 hover:text-primary-light transition">
                {user.name}
              </Link>
              <button onClick={logout} className="text-xs text-slate-500 hover:text-red-400 transition">
                Déconnexion
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:inline-flex btn-primary text-sm px-4 py-2">
              Commencer
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-dark-card border-t border-slate-700/50 shadow-xl animate-fade-in">
          <div className="p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="nav-link text-base py-3"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link href="/login" className="btn-primary mt-4 justify-center">
                Commencer
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
