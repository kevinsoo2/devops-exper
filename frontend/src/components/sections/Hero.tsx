'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Users, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Learners', value: '15K+', icon: Users },
  { label: 'Courses', value: '120+', icon: BookOpen },
  { label: 'Labs Completed', value: '50K+', icon: Zap },
  { label: 'Certifications', value: '25+', icon: Award },
];

const techIcons = [
  { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-blue-400' },
  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'text-orange-400' },
  { name: 'Linux', icon: 'fa-brands fa-linux', color: 'text-yellow-400' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: 'text-gray-300' },
  { name: 'Python', icon: 'fa-brands fa-python', color: 'text-green-400' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-emerald-400' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-dark to-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* XP Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge">
              <Zap size={16} className="text-accent-400" />
              Earn XP & Level Up Your Career
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black dark:text-white leading-tight"
          >
            Master{' '}
            <span className="gradient-text">DevOps</span>
            <br />
            Like a Pro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            The complete platform for DevOps mastery. Learn CI/CD, Kubernetes, Cloud,
            Infrastructure as Code and more with hands-on labs, certifications, and a
            gamified learning experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/courses" className="btn-primary flex items-center gap-2">
              Start Learning <ArrowRight size={18} />
            </Link>
            <Link href="/roadmap" className="btn-outline">
              View Roadmap
            </Link>
          </motion.div>

          {/* Tech Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-6 flex-wrap"
          >
            {techIcons.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
              >
                <i className={`${tech.icon} text-2xl ${tech.color}`}></i>
                <span className="text-xs text-gray-500">{tech.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="card text-center">
                  <Icon size={24} className="mx-auto text-primary-400 mb-2" />
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
