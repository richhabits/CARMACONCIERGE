import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

// Auth API
export const authAPI = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

// Users API
export const usersAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
};

// Vehicles API
export const vehiclesAPI = {
  getVehicles: () => api.get('/vehicles'),
  getVehicle: (id: string) => api.get(`/vehicles/${id}`),
  updateVehicle: (id: string, data: any) => api.put(`/vehicles/${id}`, data),
  deleteVehicle: (id: string) => api.delete(`/vehicles/${id}`),
};

// Jobs API
export const jobsAPI = {
  getJobs: () => api.get('/jobs'),
  getJob: (id: string) => api.get(`/jobs/${id}`),
  updateJob: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  deleteJob: (id: string) => api.delete(`/jobs/${id}`),
};

// Quotes API
export const quotesAPI = {
  getQuotes: () => api.get('/quotes'),
  getQuote: (id: string) => api.get(`/quotes/${id}`),
  updateQuote: (id: string, data: any) => api.put(`/quotes/${id}`, data),
};

// Suppliers API
export const suppliersAPI = {
  getSuppliers: () => api.get('/suppliers'),
  getSupplier: (id: string) => api.get(`/suppliers/${id}`),
  createSupplier: (data: any) => api.post('/suppliers', data),
  updateSupplier: (id: string, data: any) => api.put(`/suppliers/${id}`, data),
  deleteSupplier: (id: string) => api.delete(`/suppliers/${id}`),
};

// Messages API
export const messagesAPI = {
  getMessages: () => api.get('/messages'),
  getMessage: (id: string) => api.get(`/messages/${id}`),
};

// Payments API
export const paymentsAPI = {
  getPayments: () => api.get('/payments'),
  getPayment: (id: string) => api.get(`/payments/${id}`),
  updatePayment: (id: string, data: any) => api.put(`/payments/${id}`, data),
};

export default api;
