'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mehdi B.',
    role: 'Ingénieur DevOps @ OVHcloud',
    avatar: 'MB',
    content: 'Grâce à DevOps Expert Academy, j\'ai pu décrocher mon poste d\'ingénieur DevOps en seulement 4 mois. Les labs pratiques avec Docker et Kubernetes m\'ont donné une vraie longueur d\'avance en entretien.',
    rating: 5,
    course: 'Kubernetes Avancé',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Sarah L.',
    role: 'SRE @ Datadog',
    avatar: 'SL',
    content: 'Le parcours de certification Red Hat m\'a permis de passer ma RHCSA du premier coup. Le contenu est extrêmement bien structuré et les exercices sont très proches de l\'examen réel.',
    rating: 5,
    course: 'Red Hat RHCSA',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 3,
    name: 'Thomas D.',
    role: 'Lead DevOps @ Société Générale',
    avatar: 'TD',
    content: 'La section Terraform + AWS est incroyable. J\'ai pu automatiser toute notre infrastructure en production. La qualité du contenu en français est rare et précieuse.',
    rating: 5,
    course: 'Terraform Expert',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    name: 'Aminata K.',
    role: 'DevSecOps @ Thales',
    avatar: 'AK',
    content: 'Le cours DevSecOps m\'a ouvert les yeux sur l\'intégration de la sécurité dans le pipeline CI/CD. Les labs sur Vault et la gestion des secrets sont exceptionnels.',
    rating: 5,
    course: 'DevSecOps',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    name: 'Lucas M.',
    role: 'Cloud Architect @ Capgemini',
    avatar: 'LM',
    content: 'J\'ai suivi le parcours complet de A à Z. La progression est logique, chaque module s\'appuie sur le précédent. Le système de XP et les badges maintiennent la motivation au top !',
    rating: 5,
    course: 'Parcours Complet',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 6,
    name: 'Julie R.',
    role: 'Administratrice Système @ Orange',
    avatar: 'JR',
    content: 'En tant que sysadmin souhaitant évoluer vers le DevOps, cette plateforme est parfaite. Les cours sur Linux, Ansible et le monitoring m\'ont permis de moderniser nos processus.',
    rating: 5,
    course: 'Linux & Ansible',
    color: 'from-teal-500 to-cyan-500',
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent dark:via-primary-950/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">
            <Star size={16} className="text-yellow-400" />
            Témoignages
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold dark:text-white">
            Ce que disent nos{' '}
            <span className="gradient-text">apprenants</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Découvrez les retours d&apos;expérience de ceux qui ont transformé leur carrière grâce à DevOps Expert Academy.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="card p-8 md:p-12 relative overflow-hidden"
            >
              {/* Quote icon */}
              <Quote size={60} className="absolute top-6 right-6 text-primary-500/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-bold`}>
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-bold dark:text-white">{testimonials[current].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[current].role}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium border border-primary-500/20">
                    {testimonials[current].course}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-500/10 hover:text-primary-400 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrent(index); setAutoPlay(false); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'w-8 bg-primary-500'
                      : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary-500/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-500/10 hover:text-primary-400 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini testimonials grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={t.id}
              className={`card p-4 cursor-pointer transition-all ${
                i === current % 3 ? 'border-primary-500/50 shadow-lg shadow-primary-500/5' : ''
              }`}
              onClick={() => { setCurrent(i); setAutoPlay(false); }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">&ldquo;{t.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
