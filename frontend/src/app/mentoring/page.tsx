'use client';

import { useState, useEffect } from 'react';
import { Users, Star, Calendar, Clock, MessageSquare } from 'lucide-react';
import { mentoring as mentoringApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';


const fallbackMentors = [
  { id: '1', name: 'Alex Johnson', title: 'Senior DevOps Engineer @ Google', expertise: ['Kubernetes', 'GCP', 'SRE'], rating: 4.9, sessions_completed: 120, avatar: 'AJ', available: true },
  { id: '2', name: 'Sarah Chen', title: 'Platform Engineer @ Netflix', expertise: ['Platform Engineering', 'AWS', 'Terraform'], rating: 4.8, sessions_completed: 95, avatar: 'SC', available: true },
  { id: '3', name: 'Mike Rodriguez', title: 'Cloud Architect @ AWS', expertise: ['AWS', 'Multi-Cloud', 'Security'], rating: 4.9, sessions_completed: 150, avatar: 'MR', available: false },
  { id: '4', name: 'Lisa Park', title: 'SRE Lead @ Stripe', expertise: ['SRE', 'Monitoring', 'Incident Response'], rating: 4.7, sessions_completed: 80, avatar: 'LP', available: true },
  { id: '5', name: 'David Kim', title: 'DevSecOps Lead @ Microsoft', expertise: ['Security', 'CI/CD', 'Compliance'], rating: 4.8, sessions_completed: 65, avatar: 'DK', available: true },
  { id: '6', name: 'Emma Watson', title: 'Infrastructure Lead @ Datadog', expertise: ['IaC', 'Docker', 'Observability'], rating: 4.9, sessions_completed: 110, avatar: 'EW', available: false },
];

const fallbackSessions = [
  { id: '1', mentor: 'Alex Johnson', topic: 'Kubernetes Production Setup', date: '2024-03-20', status: 'upcoming' },
  { id: '2', mentor: 'Sarah Chen', topic: 'Terraform Module Design', date: '2024-03-10', status: 'completed' },
];

export default function MentoringPage() {
  const { user } = useAuthStore();
  const [mentors, setMentors] = useState(fallbackMentors);
  const [sessions, setSessions] = useState(fallbackSessions);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'mentors' | 'sessions'>('mentors');
  const [bookingMentor, setBookingMentor] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({ date: '', topic: '' });

  useEffect(() => {
    Promise.all([
      mentoringApi.mentors().catch(() => fallbackMentors),
      mentoringApi.sessions().catch(() => fallbackSessions),
    ]).then(([m, s]) => {
      if (m && m.length > 0) setMentors(m);
      if (s && s.length > 0) setSessions(s);
    }).finally(() => setLoading(false));
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingMentor) return;
    try {
      await mentoringApi.bookSession({ mentorId: bookingMentor, ...bookingData });
    } catch {}
    setBookingMentor(null);
    setBookingData({ date: '', topic: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            1-on-1 <span className="gradient-text">Mentoring</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Get personalized guidance from industry experts to accelerate your DevOps career.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button onClick={() => setActiveView('mentors')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeView === 'mentors' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            Browse Mentors
          </button>
          <button onClick={() => setActiveView('sessions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeView === 'sessions' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            My Sessions
          </button>
        </div>

        {activeView === 'mentors' && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-3" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="card-hover">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                        {mentor.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold dark:text-white">{mentor.name}</h3>
                        <p className="text-xs text-gray-500">{mentor.title}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.expertise.map((skill) => (
                        <span key={skill} className="skill-tag text-xs">{skill}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><Star size={14} className="text-accent-400" /> {mentor.rating}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={14} /> {mentor.sessions_completed} sessions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${mentor.available ? 'text-success-400' : 'text-gray-500'}`}>
                        {mentor.available ? 'Available' : 'Fully Booked'}
                      </span>
                      {mentor.available && (
                        <button onClick={() => setBookingMentor(mentor.id)} className="btn-primary text-xs !px-3 !py-1.5">
                          Book Session
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeView === 'sessions' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {sessions.length === 0 ? (
              <div className="card text-center py-12">
                <Calendar size={40} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No sessions booked yet.</p>
              </div>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="card flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold dark:text-white">{session.topic}</h3>
                    <p className="text-sm text-gray-500">with {session.mentor}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Calendar size={12} /> {session.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.status === 'upcoming' ? 'bg-primary-500/10 text-primary-400' : 'bg-success-500/10 text-success-400'
                  }`}>{session.status}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Booking Modal */}
        {bookingMentor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full">
              <h2 className="text-xl font-bold dark:text-white mb-4">Book a Session</h2>
              <form onSubmit={handleBook} className="space-y-4">
                <input type="date" value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="input-field" required />
                <input type="text" placeholder="Topic to discuss" value={bookingData.topic}
                  onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                  className="input-field" required />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setBookingMentor(null)} className="btn-outline flex-1">Cancel</button>
                  <button type="submit" className="btn-primary flex-1">Confirm Booking</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
