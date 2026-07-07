'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const communityStats = [
  { label: 'Membres', value: '15 000+' },
  { label: 'Posts Forum', value: '42 000+' },
  { label: 'Questions Résolues', value: '38 500+' },
  { label: 'Sessions de Mentorat', value: '2 400+' },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'DevOps Engineer @ Stripe',
    avatar: 'SM',
    content: 'DevOps Expert Academy completely transformed my career. The hands-on labs and mentoring helped me land my dream job.',
    rating: 5,
  },
  {
    name: 'Alex Chen',
    role: 'SRE @ Google',
    avatar: 'AC',
    content: 'The structured roadmap and certifications gave me confidence to tackle complex infrastructure challenges.',
    rating: 5,
  },
  {
    name: 'Maria Rodriguez',
    role: 'Platform Engineer @ Netflix',
    avatar: 'MR',
    content: 'Best DevOps learning platform out there. The community is incredibly supportive and the content is always up-to-date.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Cloud Architect @ AWS',
    avatar: 'JW',
    content: 'From Docker basics to Kubernetes at scale - this platform covered my entire learning journey. Highly recommended!',
    rating: 5,
  },
];

export function CommunityPreview() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Users size={16} />
            Communauté
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Rejoignez une <span className="gradient-text">Communauté</span> Dynamique
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Apprenez ensemble, progressez ensemble. Notre communauté est là pour accompagner votre parcours DevOps.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {communityStats.map((stat) => (
            <div key={stat.label} className="card text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="w-full flex-shrink-0 px-4">
                  <div className="card text-center">
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-accent-400 fill-accent-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold dark:text-white text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-primary-500 w-6' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/community" className="btn-primary inline-flex items-center gap-2">
            <MessageSquare size={18} /> Rejoindre la Communauté
          </Link>
        </div>
      </div>
    </section>
  );
}
