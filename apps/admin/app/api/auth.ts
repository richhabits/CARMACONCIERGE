// Client-side auth utilities for admin dashboard

export const loginWithGoogle = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
};

export const loginWithMicrosoft = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/microsoft`;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('authToken');
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
};
