const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth
export const api = {
  auth: {
    register: (data: { email: string; password: string; name: string }) =>
      fetchApi<{ token: string; user: any }>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      fetchApi<{ token: string; user: any }>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    me: (token: string) =>
      fetchApi<{ user: any }>('/api/auth/me', { token }),
  },

  // Courses
  courses: {
    list: (params?: { category?: string; level?: string; search?: string }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return fetchApi<{ courses: any[] }>(`/api/courses${query}`);
    },
    get: (slug: string) =>
      fetchApi<{ course: any; chapters: any[] }>(`/api/courses/${slug}`),
    enroll: (slug: string, token: string) =>
      fetchApi<{ message: string }>(`/api/courses/${slug}/enroll`, { method: 'POST', token }),
  },

  // Labs
  labs: {
    list: (params?: { difficulty?: string }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return fetchApi<{ labs: any[] }>(`/api/labs${query}`);
    },
    get: (slug: string) =>
      fetchApi<{ lab: any }>(`/api/labs/${slug}`),
    start: (slug: string, token: string) =>
      fetchApi<{ message: string }>(`/api/labs/${slug}/start`, { method: 'POST', token }),
    complete: (slug: string, token: string, score?: number) =>
      fetchApi<{ message: string }>(`/api/labs/${slug}/complete`, { method: 'POST', token, body: JSON.stringify({ score }) }),
  },

  // Tools
  tools: {
    list: (category?: string) => {
      const query = category && category !== 'all' ? `?category=${category}` : '';
      return fetchApi<{ tools: any[] }>(`/api/tools${query}`);
    },
  },

  // Certifications
  certifications: {
    list: () => fetchApi<{ certifications: any[] }>('/api/certifications'),
    get: (slug: string) => fetchApi<{ certification: any }>(`/api/certifications/${slug}`),
    start: (slug: string, token: string) =>
      fetchApi<{ message: string }>(`/api/certifications/${slug}/start`, { method: 'POST', token }),
  },

  // Blog
  blog: {
    list: (params?: { category?: string; featured?: string }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return fetchApi<{ posts: any[] }>(`/api/blog${query}`);
    },
    get: (slug: string) => fetchApi<{ post: any }>(`/api/blog/${slug}`),
    subscribe: (email: string) =>
      fetchApi<{ message: string }>('/api/blog/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
  },

  // Stats & Roadmap
  stats: {
    get: () => fetchApi<{ stats: any }>('/api/stats'),
    roadmap: (level?: string) => {
      const query = level && level !== 'all' ? `?level=${level}` : '';
      return fetchApi<{ roadmap: any[] }>(`/api/stats/roadmap${query}`);
    },
  },

  // Progress
  progress: {
    get: (token: string) => fetchApi<any>('/api/progress', { token }),
    completeLesson: (lessonId: number, token: string) =>
      fetchApi<{ message: string }>(`/api/progress/lesson/${lessonId}`, { method: 'PUT', token }),
  },
};
