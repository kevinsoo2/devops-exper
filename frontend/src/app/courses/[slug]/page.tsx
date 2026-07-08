'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Clock, Users, Star, ChevronDown, ChevronUp, PlayCircle, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import { courses as coursesApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

interface Chapter {
  id: string;
  title: string;
  lessons: { id: string; title: string; duration: string; completed?: boolean }[];
}

const fallbackCourse = {
  id: '1',
  title: 'Docker Mastery: From Zero to Production',
  slug: 'docker-mastery',
  description: 'Learn Docker from the very basics to advanced production deployments. Cover multi-stage builds, Docker Compose, security best practices, and container orchestration fundamentals.',
  category: 'Containerization',
  level: 'Beginner',
  duration_hours: 12,
  enrolled_count: 3420,
  rating: 4.8,
  instructor: 'Alex DevOps',
  instructor_bio: 'Senior DevOps Engineer with 10+ years of experience in container technologies.',
  requirements: ['Basic Linux knowledge', 'Command line familiarity', 'A computer with Docker installed'],
  what_youll_learn: ['Build and run Docker containers', 'Write optimized Dockerfiles', 'Use Docker Compose for multi-container apps', 'Implement container security best practices', 'Deploy to production with CI/CD'],
  chapters: [
    { id: 'ch1', title: 'Getting Started with Docker', lessons: [
      { id: 'l1', title: 'Introduction to Containers', duration: '8 min' },
      { id: 'l2', title: 'Installing Docker', duration: '12 min' },
      { id: 'l3', title: 'Your First Container', duration: '15 min' },
    ]},
    { id: 'ch2', title: 'Docker Images & Dockerfiles', lessons: [
      { id: 'l4', title: 'Understanding Docker Images', duration: '10 min' },
      { id: 'l5', title: 'Writing Dockerfiles', duration: '20 min' },
      { id: 'l6', title: 'Multi-Stage Builds', duration: '18 min' },
    ]},
    { id: 'ch3', title: 'Docker Compose', lessons: [
      { id: 'l7', title: 'Docker Compose Basics', duration: '12 min' },
      { id: 'l8', title: 'Multi-Container Applications', duration: '22 min' },
      { id: 'l9', title: 'Networking & Volumes', duration: '16 min' },
    ]},
    { id: 'ch4', title: 'Production Deployment', lessons: [
      { id: 'l10', title: 'Container Security', duration: '15 min' },
      { id: 'l11', title: 'CI/CD with Docker', duration: '20 min' },
      { id: 'l12', title: 'Monitoring Containers', duration: '14 min' },
    ]},
  ] as Chapter[],
  reviews: [
    { user: 'John D.', rating: 5, comment: 'Excellent course! Very practical and well-structured.', date: '2024-03-01' },
    { user: 'Maria S.', rating: 5, comment: 'Best Docker course I have taken. The labs are amazing.', date: '2024-02-28' },
    { user: 'Dev K.', rating: 4, comment: 'Great content, could use more advanced networking topics.', date: '2024-02-25' },
  ],
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    coursesApi.get(params.slug as string)
      .then((data) => {
        // API returns { course: { ...courseData, chapters, reviews, enrollment } }
        const courseData = data.course || data;
        setCourse(courseData);
      })
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const handleEnroll = async () => {
    if (!user) { router.push('/login'); return; }
    setEnrolling(true);
    try {
      await coursesApi.enroll(course.id);
      setEnrolled(true);
    } catch { setEnrolled(true); }
    setEnrolling(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
        <p className="text-gray-500">Cours non trouvé</p>
      </div>
    );
  }
  const chapters = course.chapters || [];
  const reviews = course.reviews || [];

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/courses" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-400 mb-6">
          <ArrowLeft size={16} /> Retour aux Formations
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="skill-tag">{course.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              course.level === 'debutant' ? 'difficulty-easy' :
              course.level === 'intermediaire' ? 'difficulty-medium' : 'difficulty-hard'
            }`}>{course.level === 'debutant' ? 'Débutant' : course.level === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white">{course.title}</h1>
          <p className="mt-4 text-gray-500">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Clock size={14} /> {course.duration_hours || 0}h</span>
            <span className="flex items-center gap-1"><Users size={14} /> {(course.enrollment_count || 0).toLocaleString()} inscrits</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-accent-400" /> {course.rating || 0}</span>
            <span>par {course.instructor || 'DevOps Expert'}</span>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <span className="font-medium">{chapters.length} chapitres</span> • 
            <span className="ml-1">{chapters.reduce((acc: number, ch: any) => acc + (ch.lessons?.length || 0), 0)} leçons</span>
          </div>
        </div>

        {/* Enroll Button */}
        <div className="mb-8">
          {enrolled ? (
            <div className="flex items-center gap-2 text-success-400 font-medium">
              <CheckCircle size={20} /> Inscrit ! Commencez ci-dessous.
            </div>
          ) : (
            <button onClick={handleEnroll} disabled={enrolling} className="btn-primary">
              {enrolling ? 'Inscription...' : 'S\'inscrire (Gratuit)'}
            </button>
          )}
        </div>

        {/* Chapters */}
        <div className="mb-12">
          <h2 className="text-xl font-bold dark:text-white mb-4">Contenu de la Formation</h2>
          <div className="space-y-3">
            {chapters.map((chapter: any, idx: number) => (
              <div key={chapter.id || idx} className="card">
                <button
                  onClick={() => setOpenChapter(openChapter === String(chapter.id) ? null : String(chapter.id))}
                  className="w-full flex items-center justify-between"
                >
                  <span className="font-semibold dark:text-white">
                    {idx + 1}. {chapter.title}
                  </span>
                  {openChapter === String(chapter.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openChapter === String(chapter.id) && chapter.lessons && (
                  <div className="mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {chapter.lessons.map((lesson: any, li: number) => (
                      <Link
                        key={lesson.id || li}
                        href={`/learn?lesson=${lesson.id}&course=${params.slug}&title=${encodeURIComponent(lesson.title)}&type=${lesson.content_type}&duration=${lesson.duration_minutes}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {enrolled ? (
                            <PlayCircle size={16} className="text-primary-400" />
                          ) : lesson.is_free ? (
                            <PlayCircle size={16} className="text-success-400" />
                          ) : (
                            <Lock size={16} className="text-gray-400" />
                          )}
                          <span className="text-sm dark:text-gray-300">{lesson.title}</span>
                          {lesson.content_type && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                              {lesson.content_type}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{lesson.duration_minutes || lesson.duration || ''} min</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-xl font-bold dark:text-white mb-4">Avis des Apprenants</h2>
          <div className="space-y-4">
            {reviews.map((review: any, idx: number) => (
              <div key={idx} className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium dark:text-white">{review.user}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-accent-400 fill-accent-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
