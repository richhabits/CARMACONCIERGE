import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

// Users API
export const usersAPI = {
  getUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
};

// Vehicles API
export const vehiclesAPI = {
  getVehicles: () => api.get('/vehicles'),
  getVehicle: (id: string) => api.get(`/vehicles/${id}`),
  createVehicle: (data: any) => api.post('/vehicles', data),
  updateVehicle: (id: string, data: any) => api.put(`/vehicles/${id}`, data),
  deleteVehicle: (id: string) => api.delete(`/vehicles/${id}`),
};

// Jobs API
export const jobsAPI = {
  getJobs: () => api.get('/jobs'),
  getJob: (id: string) => api.get(`/jobs/${id}`),
  createJob: (data: any) => api.post('/jobs', data),
  updateJob: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  deleteJob: (id: string) => api.delete(`/jobs/${id}`),
};

// Quotes API
export const quotesAPI = {
  getQuotesByJob: (jobId: string) => api.get(`/quotes/job/${jobId}`),
  getQuote: (id: string) => api.get(`/quotes/${id}`),
  updateQuote: (id: string, data: any) => api.put(`/quotes/${id}`, data),
};

// Suppliers API
export const suppliersAPI = {
  getSuppliers: (service?: string) => api.get('/suppliers', { params: { service } }),
  getSupplier: (id: string) => api.get(`/suppliers/${id}`),
};

// Messages API
export const messagesAPI = {
  getMessages: () => api.get('/messages'),
  getMessage: (id: string) => api.get(`/messages/${id}`),
  sendMessage: (data: any) => api.post('/messages', data),
  markAsRead: (id: string) => api.put(`/messages/${id}/read`),
};

// Payments API
export const paymentsAPI = {
  getPayments: () => api.get('/payments'),
  getPayment: (id: string) => api.get(`/payments/${id}`),
  createPayment: (data: any) => api.post('/payments', data),
};

export default api;
