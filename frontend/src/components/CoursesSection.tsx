'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Clock, Star, Video, FlaskConical, FolderKanban } from 'lucide-react';

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  duration_hours: number;
  video_count: number;
  lab_count: number;
  project_count: number;
  price: number;
  original_price: number;
  badge: string | null;
  rating: number;
}

export function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.courses.list()
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const badgeStyles: Record<string, string> = {
    bestseller: 'bg-amber-500 text-black',
    new: 'bg-emerald-500 text-white',
    popular: 'bg-primary text-white',
  };

  const levelColors: Record<string, string> = {
    debutant: 'text-emerald-400',
    intermediaire: 'text-cyan-400',
    avance: 'text-amber-400',
    expert: 'text-red-400',
  };

  return (
    <section className="py-24 px-6 bg-dark-card/30" id="courses">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-badge mb-4">
            <i className="fas fa-graduation-cap"></i> Formations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Formations <span className="gradient-text">Premium</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Des formations complètes, de la théorie à la pratique, avec projets réels et mentorat
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link href={`/courses/${course.slug}`} key={course.id} className="card card-hover group">
                {/* Icon & Badge */}
                <div className="relative h-36 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/5 mb-4">
                  <i className={`${course.icon} text-4xl text-primary`}></i>
                  {course.badge && (
                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${badgeStyles[course.badge] || ''}`}>
                      {course.badge === 'bestseller' ? 'Bestseller' : course.badge === 'new' ? 'Nouveau' : 'Populaire'}
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className={levelColors[course.level] || ''}>
                    <i className="fas fa-signal mr-1"></i>{course.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration_hours}h
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-current" /> {course.rating}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary-light transition line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{course.description}</p>

                {/* Features */}
                <div className="flex gap-4 text-[11px] text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Video className="w-3 h-3" /> {course.video_count}</span>
                  <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> {course.lab_count} labs</span>
                  <span className="flex items-center gap-1"><FolderKanban className="w-3 h-3" /> {course.project_count} projets</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div>
                    <span className="text-xs text-slate-500 line-through mr-2">{course.original_price}€</span>
                    <span className="text-lg font-bold text-emerald-400">{course.price}€</span>
                  </div>
                  <span className="text-xs text-primary-light font-medium opacity-0 group-hover:opacity-100 transition">
                    Voir le cours →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
