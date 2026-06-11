import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      if (window.location.pathname.startsWith('/admin') &&
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  },
)

export const projectsApi = {
  getAll:      (params?: any)          => api.get('/projects', { params }),
  getFeatured: ()                      => api.get('/projects/featured'),
  getBySlug:   (slug: string)          => api.get(`/projects/slug/${slug}`),
  getById:     (id: string)            => api.get(`/projects/${id}`),
  create:      (data: any)             => api.post('/projects', data),
  update:      (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete:      (id: string)            => api.delete(`/projects/${id}`),
  getStats:    ()                      => api.get('/projects/admin/stats'),
}

export const messagesApi = {
  send:         (data: any)             => api.post('/messages', data),
  getAll:       (params?: any)          => api.get('/messages', { params }),
  getById:      (id: string)            => api.get(`/messages/${id}`),
  updateStatus: (id: string, data: any) => api.patch(`/messages/${id}/status`, data),
  delete:       (id: string)            => api.delete(`/messages/${id}`),
  getStats:     ()                      => api.get('/messages/stats'),
}

export const aboutApi = {
  get:    ()           => api.get('/about'),
  update: (data: any)  => api.put('/about', data),
}

export const authApi = {
  login:          (data: any) => api.post('/auth/login', data),
  me:             ()          => api.get('/auth/me'),
  changePassword: (data: any) => api.post('/auth/change-password', data),
}

export const adminApi = {
  dashboard: () => api.get('/admin/dashboard'),
}
