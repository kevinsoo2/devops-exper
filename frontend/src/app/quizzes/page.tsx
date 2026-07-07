'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, Clock, Zap, Filter, Trophy } from 'lucide-react';
import { quizzes as quizzesApi } from '@/lib/api';


const categories = ['All', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud', 'Linux', 'IaC', 'Security'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const fallbackQuizzes = [
  { id: '1', title: 'Docker Fundamentals', category: 'Docker', difficulty: 'Beginner', questions: 15, duration: '10 min', xp: 100, best_score: null },
  { id: '2', title: 'Kubernetes Core Concepts', category: 'Kubernetes', difficulty: 'Intermediate', questions: 20, duration: '15 min', xp: 200, best_score: 85 },
  { id: '3', title: 'CI/CD Pipeline Design', category: 'CI/CD', difficulty: 'Intermediate', questions: 18, duration: '12 min', xp: 150, best_score: null },
  { id: '4', title: 'AWS Services Overview', category: 'Cloud', difficulty: 'Beginner', questions: 25, duration: '20 min', xp: 150, best_score: 92 },
  { id: '5', title: 'Linux Commands Mastery', category: 'Linux', difficulty: 'Beginner', questions: 30, duration: '15 min', xp: 100, best_score: 78 },
  { id: '6', title: 'Terraform Advanced Patterns', category: 'IaC', difficulty: 'Advanced', questions: 12, duration: '10 min', xp: 250, best_score: null },
  { id: '7', title: 'Container Security', category: 'Security', difficulty: 'Advanced', questions: 15, duration: '12 min', xp: 200, best_score: null },
  { id: '8', title: 'Kubernetes Networking', category: 'Kubernetes', difficulty: 'Advanced', questions: 10, duration: '8 min', xp: 200, best_score: 60 },
];

export default function QuizzesPage() {
  const [quizList, setQuizList] = useState(fallbackQuizzes);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  useEffect(() => {
    quizzesApi.list()
      .then((data) => { if (data && data.length > 0) setQuizList(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = quizList.filter((q) => {
    const matchCat = category === 'All' || q.category === category;
    const matchDiff = difficulty === 'All' || q.difficulty === difficulty;
    return matchCat && matchDiff;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            Knowledge <span className="gradient-text">Quizzes</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Test your DevOps knowledge and earn XP with timed quizzes.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === c ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{c}</button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Filter size={14} className="text-gray-400" />
            {difficulties.map((d) => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d ? 'bg-secondary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{d}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((quiz) => (
              <div key={quiz.id} className="card-hover">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    quiz.difficulty === 'Beginner' ? 'difficulty-beginner' :
                    quiz.difficulty === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'
                  }`}>{quiz.difficulty}</span>
                  <span className="text-xs text-accent-400 font-medium">+{quiz.xp} XP</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={18} className="text-primary-400" />
                  <h3 className="font-bold dark:text-white">{quiz.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="skill-tag">{quiz.category}</span>
                  <span className="flex items-center gap-1"><HelpCircle size={12} /> {quiz.questions} questions</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {quiz.duration}</span>
                </div>
                {quiz.best_score !== null && (
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy size={14} className="text-accent-400" />
                    <span className="text-gray-500">Best: <strong className="dark:text-white">{quiz.best_score}%</strong></span>
                  </div>
                )}
                <button className="mt-4 w-full btn-outline text-sm !py-2">
                  {quiz.best_score !== null ? 'Retake Quiz' : 'Start Quiz'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
