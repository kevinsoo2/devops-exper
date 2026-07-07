'use client';

import { useState, useEffect } from 'react';
import { Users, MessageSquare, Plus, Clock, ThumbsUp, X } from 'lucide-react';
import { community as communityApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';


const categoryTabs = ['All', 'General', 'Help', 'Showcase', 'Jobs', 'Events'];

const fallbackThreads = [
  { id: '1', title: 'Best practices for Kubernetes in production?', author: 'DevOpsJohn', category: 'Help', replies: 12, likes: 24, created_at: '2024-03-15T10:00:00Z' },
  { id: '2', title: 'My journey from sysadmin to SRE', author: 'SarahOps', category: 'General', replies: 8, likes: 45, created_at: '2024-03-14T08:00:00Z' },
  { id: '3', title: 'Showcase: Automated multi-cloud deployment pipeline', author: 'CloudMaster', category: 'Showcase', replies: 15, likes: 67, created_at: '2024-03-13T14:00:00Z' },
  { id: '4', title: 'Senior DevOps Engineer position at Stripe', author: 'HiringManager', category: 'Jobs', replies: 3, likes: 12, created_at: '2024-03-12T09:00:00Z' },
  { id: '5', title: 'Terraform state management strategies', author: 'IaCPro', category: 'Help', replies: 20, likes: 38, created_at: '2024-03-11T16:00:00Z' },
  { id: '6', title: 'DevOps Meetup - March 2024 recap', author: 'EventOrg', category: 'Events', replies: 5, likes: 22, created_at: '2024-03-10T11:00:00Z' },
  { id: '7', title: 'How to handle secrets in GitHub Actions?', author: 'NewDev', category: 'Help', replies: 9, likes: 15, created_at: '2024-03-09T13:00:00Z' },
  { id: '8', title: 'Monitoring at scale with Prometheus + Thanos', author: 'MetricsGuru', category: 'Showcase', replies: 11, likes: 52, created_at: '2024-03-08T07:00:00Z' },
];

export default function CommunityPage() {
  const { user } = useAuthStore();
  const [threads, setThreads] = useState(fallbackThreads);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '', category: 'General' });

  useEffect(() => {
    communityApi.threads()
      .then((data) => { if (data && data.length > 0) setThreads(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'All' ? threads : threads.filter((t) => t.category === activeTab);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await communityApi.createThread(newThread);
      setShowCreate(false);
      setNewThread({ title: '', content: '', category: 'General' });
    } catch {}
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold dark:text-white">
              <span className="gradient-text">Community</span> Forum
            </h1>
            <p className="mt-2 text-gray-500">Discuss, share, and learn with fellow DevOps engineers.</p>
          </div>
          {user && (
            <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
              <Plus size={18} /> New Thread
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>{tab}</button>
          ))}
        </div>

        {/* Create Thread Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-lg w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold dark:text-white">New Thread</h2>
                <button onClick={() => setShowCreate(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <input type="text" placeholder="Thread title" value={newThread.title}
                  onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                  className="input-field" required />
                <textarea placeholder="What's on your mind?" value={newThread.content}
                  onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                  className="input-field min-h-[120px]" required />
                <select value={newThread.category}
                  onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                  className="input-field">
                  {categoryTabs.filter(t => t !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <button type="submit" className="btn-primary w-full">Post Thread</button>
              </form>
            </div>
          </div>
        )}

        {/* Threads List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((thread) => (
              <div key={thread.id} className="card-hover">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="skill-tag text-xs">{thread.category}</span>
                    </div>
                    <h3 className="font-semibold dark:text-white">{thread.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>by {thread.author}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> {thread.replies} replies</span>
                      <span className="flex items-center gap-1"><ThumbsUp size={12} /> {thread.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
