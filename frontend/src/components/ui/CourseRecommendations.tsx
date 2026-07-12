'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';

export function CourseRecommendations() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's visited categories from localStorage
    let interests: string[] = [];
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('devops-visited-categories');
      interests = visited ? JSON.parse(visited) : ['conteneurisation', 'orchestration', 'cicd'];
    }

    // Fetch courses and recommend based on interests
    fetch(`${API_URL}/courses`)
      .then(r => r.json())
      .then(data => {
        const allCourses = data.courses || [];
        // Prioritize courses in user's interest categories they haven't seen
        const scored = allCourses.map((c: any) => ({
          ...c,
          score: interests.includes(c.category) ? 2 : 1 + Math.random(),
        }));
        scored.sort((a: any, b: any) => b.score - a.score);
        setCourses(scored.slice(0, 4));
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || courses.length === 0) return null;

  return (
    <div className="card mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-accent-400" />
        <h3 className="font-bold dark:text-white">Recommandé pour vous</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {courses.map((course: any) => (
          <Link
            key={course.id || course.slug}
            href={`/courses/${course.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
              <span className="text-lg">{course.icon || '📖'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 group-hover:text-primary-400 transition truncate">
                {course.title}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><Clock size={10} /> {course.duration_hours}h</span>
                <span className="skill-tag !px-1.5 !py-0 !text-[9px]">{course.category}</span>
              </div>
            </div>
            <ArrowRight size={14} className="text-gray-600 group-hover:text-primary-400 transition shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
