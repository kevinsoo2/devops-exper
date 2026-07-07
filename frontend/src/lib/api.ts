const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const auth = {
  register: (data: { username: string; email: string; password: string }) =>
    fetchApi<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    fetchApi<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: () => fetchApi<{ user: any }>('/auth/me'),
  updateProfile: (data: any) =>
    fetchApi<{ user: any }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const courses = {
  list: (params?: { category?: string; level?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/courses${query ? `?${query}` : ''}`);
  },
  get: (slug: string) => fetchApi<any>(`/courses/${slug}`),
  enroll: (courseId: string) =>
    fetchApi<any>(`/courses/${courseId}/enroll`, { method: 'POST' }),
  review: (courseId: string, data: { rating: number; comment: string }) =>
    fetchApi<any>(`/courses/${courseId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const labs = {
  list: (params?: { difficulty?: string; category?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/labs${query ? `?${query}` : ''}`);
  },
  get: (slug: string) => fetchApi<any>(`/labs/${slug}`),
  start: (labId: string) =>
    fetchApi<any>(`/labs/${labId}/start`, { method: 'POST' }),
  complete: (labId: string, data: { solution?: string }) =>
    fetchApi<any>(`/labs/${labId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const tools = {
  list: (params?: { category?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/tools${query ? `?${query}` : ''}`);
  },
  get: (slug: string) => fetchApi<any>(`/tools/${slug}`),
};

export const certifications = {
  list: () => fetchApi<any[]>('/certifications'),
  get: (slug: string) => fetchApi<any>(`/certifications/${slug}`),
  start: (certId: string) =>
    fetchApi<any>(`/certifications/${certId}/start`, { method: 'POST' }),
};

export const blog = {
  list: (params?: { tag?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/blog${query ? `?${query}` : ''}`);
  },
  get: (slug: string) => fetchApi<any>(`/blog/${slug}`),
  subscribe: (email: string) =>
    fetchApi<any>('/blog/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

export const stats = {
  get: () => fetchApi<any>('/stats'),
  roadmap: () => fetchApi<any[]>('/stats/roadmap'),
};

export const progress = {
  get: () => fetchApi<any>('/progress'),
  completeLesson: (lessonId: string) =>
    fetchApi<any>(`/progress/lessons/${lessonId}/complete`, { method: 'POST' }),
};

export const quizzes = {
  list: (params?: { category?: string; difficulty?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/quizzes${query ? `?${query}` : ''}`);
  },
  get: (quizId: string) => fetchApi<any>(`/quizzes/${quizId}`),
  submit: (quizId: string, answers: any) =>
    fetchApi<any>(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
};

export const community = {
  threads: (params?: { category?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/community/threads${query ? `?${query}` : ''}`);
  },
  thread: (threadId: string) => fetchApi<any>(`/community/threads/${threadId}`),
  createThread: (data: { title: string; content: string; category: string }) =>
    fetchApi<any>('/community/threads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  reply: (threadId: string, content: string) =>
    fetchApi<any>(`/community/threads/${threadId}/replies`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
};

export const achievements = {
  list: () => fetchApi<any[]>('/achievements'),
  mine: () => fetchApi<any[]>('/achievements/mine'),
};

export const mentoring = {
  mentors: () => fetchApi<any[]>('/mentoring/mentors'),
  sessions: () => fetchApi<any[]>('/mentoring/sessions'),
  bookSession: (data: { mentorId: string; date: string; topic: string }) =>
    fetchApi<any>('/mentoring/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  rateSession: (sessionId: string, data: { rating: number; feedback: string }) =>
    fetchApi<any>(`/mentoring/sessions/${sessionId}/rate`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const leaderboard = {
  get: (params?: { period?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi<any[]>(`/leaderboard${query ? `?${query}` : ''}`);
  },
};

export const notifications = {
  get: () => fetchApi<any[]>('/notifications'),
  readAll: () => fetchApi<any>('/notifications/read-all', { method: 'POST' }),
};
