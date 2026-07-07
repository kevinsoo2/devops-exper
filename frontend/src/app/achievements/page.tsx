'use client';

import { useState, useEffect } from 'react';
import { Trophy, Lock } from 'lucide-react';
import { achievements as achievementsApi } from '@/lib/api';


const fallbackAchievements = [
  { id: '1', title: 'First Steps', description: 'Complete your first lesson', rarity: 'common', xp: 50, earned: true, icon: '🎯' },
  { id: '2', title: 'Docker Rookie', description: 'Complete the Docker basics course', rarity: 'common', xp: 100, earned: true, icon: '🐳' },
  { id: '3', title: 'Lab Rat', description: 'Complete 10 hands-on labs', rarity: 'rare', xp: 200, earned: true, icon: '🧪' },
  { id: '4', title: 'Quiz Master', description: 'Score 100% on 5 quizzes', rarity: 'rare', xp: 250, earned: false, icon: '🧠' },
  { id: '5', title: 'Kubernetes Captain', description: 'Complete all Kubernetes courses', rarity: 'epic', xp: 500, earned: false, icon: '⚓' },
  { id: '6', title: 'Community Star', description: 'Get 50 likes on forum posts', rarity: 'rare', xp: 200, earned: true, icon: '⭐' },
  { id: '7', title: 'Speed Demon', description: 'Complete a lab in under 50% of allotted time', rarity: 'epic', xp: 300, earned: false, icon: '⚡' },
  { id: '8', title: 'Certified Pro', description: 'Earn 3 certifications', rarity: 'epic', xp: 500, earned: false, icon: '🏆' },
  { id: '9', title: 'Pipeline Architect', description: 'Build 20 CI/CD pipelines in labs', rarity: 'legendary', xp: 750, earned: false, icon: '🏗️' },
  { id: '10', title: 'Cloud Sovereign', description: 'Complete all cloud provider courses', rarity: 'legendary', xp: 1000, earned: false, icon: '☁️' },
  { id: '11', title: 'Mentor Mode', description: 'Complete 10 mentoring sessions', rarity: 'legendary', xp: 800, earned: false, icon: '🎓' },
  { id: '12', title: 'Streak King', description: 'Maintain a 30-day learning streak', rarity: 'epic', xp: 400, earned: false, icon: '🔥' },
];

const rarityFilter = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];
const statusFilter = ['All', 'Earned', 'Locked'];

export default function AchievementsPage() {
  const [achievementList, setAchievementList] = useState(fallbackAchievements);
  const [loading, setLoading] = useState(true);
  const [rarity, setRarity] = useState('All');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    achievementsApi.list()
      .then((data) => { if (data && data.length > 0) setAchievementList(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = achievementList.filter((a) => {
    const matchRarity = rarity === 'All' || a.rarity.toLowerCase() === rarity.toLowerCase();
    const matchStatus = status === 'All' || (status === 'Earned' && a.earned) || (status === 'Locked' && !a.earned);
    return matchRarity && matchStatus;
  });

  const earnedCount = achievementList.filter(a => a.earned).length;

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            <span className="gradient-text">Achievements</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Unlock achievements by completing courses, labs, and challenges.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm">
            <Trophy size={16} className="text-accent-400" />
            <span className="dark:text-white font-medium">{earnedCount}/{achievementList.length} earned</span>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {rarityFilter.map((r) => (
              <button key={r} onClick={() => setRarity(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  rarity === r ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{r}</button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            {statusFilter.map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  status === s ? 'bg-secondary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{s}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse text-center">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((achievement) => (
              <div key={achievement.id} className={`card-hover text-center relative ${!achievement.earned ? 'opacity-60' : ''}`}>
                {!achievement.earned && (
                  <div className="absolute top-3 right-3"><Lock size={14} className="text-gray-500" /></div>
                )}
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-bold dark:text-white text-sm">{achievement.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border rarity-${achievement.rarity}`}>
                    {achievement.rarity}
                  </span>
                  <span className="text-xs text-accent-400">+{achievement.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
