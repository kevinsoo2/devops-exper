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

        {/* Header with visual banner */}
        <div className="relative mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${
            course.category === 'conteneurisation' ? 'from-blue-600 to-cyan-700' :
            course.category === 'orchestration' ? 'from-blue-500 to-indigo-700' :
            course.category === 'cicd' ? 'from-green-600 to-emerald-700' :
            course.category === 'cloud' ? 'from-orange-500 to-amber-700' :
            course.category === 'iac' ? 'from-purple-600 to-violet-700' :
            course.category === 'monitoring' ? 'from-yellow-600 to-orange-700' :
            course.category === 'securite' ? 'from-red-600 to-pink-700' :
            course.category === 'donnees' ? 'from-teal-600 to-green-700' :
            course.category === 'network' ? 'from-sky-600 to-blue-700' :
            course.category === 'systeme' ? 'from-slate-600 to-gray-700' :
            'from-primary-600 to-secondary-700'
          } overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/20">
                    {course.category}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-white/20 ${
                    course.level === 'debutant' ? 'bg-green-500/20 text-green-200' :
                    course.level === 'intermediaire' ? 'bg-yellow-500/20 text-yellow-200' : 
                    'bg-red-500/20 text-red-200'
                  }`}>{course.level === 'debutant' ? 'Débutant' : course.level === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white px-4 max-w-3xl text-balance">{course.title}</h1>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
          </div>
        </div>

        {/* Course info bar */}
        <div className="card !p-4 mb-6 flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-primary-400" />
            <span className="text-gray-300 font-medium">{course.duration_hours || 0}h</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-secondary-400" />
            <span className="text-gray-300 font-medium">{(course.enrollment_count || 0).toLocaleString()} inscrits</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star size={16} className="text-accent-400 fill-accent-400" />
            <span className="text-gray-300 font-medium">{course.rating || '4.8'}/5</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen size={16} className="text-success-400" />
            <span className="text-gray-300 font-medium">{chapters.length} chap. • {chapters.reduce((acc: number, ch: any) => acc + (ch.lessons?.length || 0), 0)} leçons</span>
          </div>
          <div className="ml-auto text-sm text-gray-500">par <span className="text-white font-medium">{course.instructor || 'DevOps Expert'}</span></div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-400 leading-relaxed">{course.description}</p>
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
