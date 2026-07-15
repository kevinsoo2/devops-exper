'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Users, BookOpen, Award, Play, Shield, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Apprenants Actifs', value: 15000, display: '15K+', icon: Users },
  { label: 'Formations', value: 40, display: '40+', icon: BookOpen },
  { label: 'Labs Complétés', value: 50000, display: '50K+', icon: Zap },
  { label: 'Certifications', value: 8, display: '8', icon: Award },
];

const techIcons = [
  { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-blue-400' },
  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'text-orange-400' },
  { name: 'Linux', icon: 'fa-brands fa-linux', color: 'text-yellow-400' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: 'text-gray-300' },
  { name: 'Python', icon: 'fa-brands fa-python', color: 'text-green-400' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-emerald-400' },
  { name: 'Kubernetes', icon: 'fa-solid fa-dharmachakra', color: 'text-blue-300' },
  { name: 'Terraform', icon: 'fa-solid fa-cubes', color: 'text-purple-400' },
];

const typingWords = ['DevOps', 'Kubernetes', 'CI/CD', 'Cloud', 'Terraform', 'Docker', 'SRE'];

function useTypingEffect(words: string[], typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById(`counter-${value}`);
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatNumber = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
    return n.toString();
  };

  return (
    <span id={`counter-${value}`}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

export function Hero() {
  const typedText = useTypingEffect(typingWords);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-dark to-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* XP Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge">
              <Zap size={16} className="text-accent-400 animate-pulse" />
              Plateforme 100% gratuite &bull; 100% français
            </span>
          </motion.div>

          {/* Main Title with Typing Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black dark:text-white leading-tight"
          >
            Maîtrisez{' '}
            <span className="gradient-text relative">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-[3px] h-[1em] bg-primary-400 ml-1 align-middle"
              />
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">comme un Expert</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            La plateforme francophone complète pour maîtriser le DevOps. 
            <span className="text-gray-300 font-medium"> 40+ formations</span>, 
            <span className="text-gray-300 font-medium"> 87 labs pratiques</span>, 
            <span className="text-gray-300 font-medium"> certifications</span> et une
            expérience d&apos;apprentissage gamifiée avec XP et badges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/courses" className="btn-primary flex items-center gap-2 !px-8 !py-4 text-lg">
              <Play size={20} className="fill-white" />
              Commencer gratuitement
            </Link>
            <Link href="/roadmap" className="btn-outline flex items-center gap-2 !px-8 !py-4">
              <Terminal size={18} />
              Voir le Parcours
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500"
          >
            <span className="flex items-center gap-1">
              <Shield size={14} className="text-green-400" />
              Gratuit & sans engagement
            </span>
            <span className="flex items-center gap-1">
              <Zap size={14} className="text-yellow-400" />
              Accès immédiat
            </span>
            <span className="flex items-center gap-1">
              <Award size={14} className="text-blue-400" />
              Certificats inclus
            </span>
          </motion.div>

          {/* Tech Icons - Enhanced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 flex items-center justify-center gap-5 flex-wrap"
          >
            {techIcons.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.2, y: -5 }}
                className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary-500/30 hover:bg-primary-500/5 transition-all">
                  <i className={`${tech.icon} text-xl ${tech.color}`}></i>
                </div>
                <span className="text-xs text-gray-500">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card text-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all duration-500" />
                  <div className="relative">
                    <Icon size={24} className="mx-auto text-primary-400 mb-2" />
                    <p className="text-2xl md:text-3xl font-bold dark:text-white">
                      <AnimatedCounter value={stat.value} suffix="+" />
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-primary-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
