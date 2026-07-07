'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, BookOpen, Trophy, Zap, Clock, TrendingUp, Target } from 'lucide-react';
import { stats as statsApi, progress as progressApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';


const fallbackStats = {
  xp_points: 2450,
  level: 5,
  courses_enrolled: 4,
  courses_completed: 2,
  labs_completed: 12,
  quizzes_passed: 8,
  streak_days: 7,
  achievements_earned: 6,
  total_learning_hours: 45,
};

const recentActivity = [
  { type: 'lesson', title: 'Completed: Docker Networking', xp: 50, time: '2 hours ago' },
  { type: 'quiz', title: 'Passed: CI/CD Fundamentals Quiz', xp: 100, time: '5 hours ago' },
  { type: 'lab', title: 'Completed: K8s Cluster Setup Lab', xp: 300, time: '1 day ago' },
  { type: 'achievement', title: 'Earned: Lab Rat Achievement', xp: 200, time: '1 day ago' },
  { type: 'lesson', title: 'Completed: Terraform Modules', xp: 50, time: '2 days ago' },
];

const enrolledCourses = [
  { title: 'Kubernetes Complete Guide', progress: 65, slug: 'kubernetes-complete' },
  { title: 'Terraform Infrastructure as Code', progress: 30, slug: 'terraform-iac' },
  { title: 'GitHub Actions CI/CD', progress: 100, slug: 'github-actions-cicd' },
  { title: 'Docker Mastery', progress: 100, slug: 'docker-mastery' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [userStats, setUserStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    statsApi.get()
      .then((data) => { if (data) setUserStats(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  if (authLoading) {
    return <div className="min-h-screen pt-24 pb-16 dark:bg-dark flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>;
  }

  const stats = [
    { label: 'XP Points', value: userStats.xp_points.toLocaleString(), icon: Zap, color: 'text-accent-400' },
    { label: 'Level', value: userStats.level, icon: TrendingUp, color: 'text-primary-400' },
    { label: 'Courses', value: `${userStats.courses_completed}/${userStats.courses_enrolled}`, icon: BookOpen, color: 'text-secondary-400' },
    { label: 'Labs Done', value: userStats.labs_completed, icon: Target, color: 'text-success-400' },
    { label: 'Day Streak', value: userStats.streak_days, icon: Clock, color: 'text-danger-400' },
    { label: 'Achievements', value: userStats.achievements_earned, icon: Trophy, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Welcome back, <span className="gradient-text">{user?.username || 'Learner'}</span>
          </h1>
          <p className="text-gray-500 mt-1">Here&apos;s your learning progress overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card text-center">
                <Icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-xl font-bold dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrolled Courses */}
          <div className="card">
            <h2 className="font-bold dark:text-white mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-primary-400" /> My Courses
            </h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Link key={course.slug} href={`/courses/${course.slug}`} className="block group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300 group-hover:text-primary-400 transition-colors">{course.title}</span>
                    <span className="text-xs text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${course.progress === 100 ? 'bg-success-500' : 'bg-primary-500'}`}
                      style={{ width: `${course.progress}%` }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="font-bold dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-secondary-400" /> Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm dark:text-gray-300">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className="text-xs text-accent-400 font-medium">+{activity.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
