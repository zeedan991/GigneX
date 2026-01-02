import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  register: (name: string, email: string, password: string, role: string) =>
    api.post('/users/register', { name, email, password, role }),
  
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),
  
  getMe: (token: string) =>
    api.get('/users/me', { params: { token } }),
};

export const jobsAPI = {
  getAll: (filters?: any) =>
    api.get('/jobs', { params: filters }),
  
  getById: (id: string) =>
    api.get(`/jobs/${id}`),
  
  create: (jobData: any, userId: string) =>
    api.post('/jobs', jobData, { params: { user_id: userId } }),
  
  generateDescription: (title: string) =>
    api.post('/jobs/generate-description', { title }),
};

export const coursesAPI = {
  getAll: () =>
    api.get('/courses'),
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.params = { ...config.params, token };
  }
  return config;
});

export default api;
