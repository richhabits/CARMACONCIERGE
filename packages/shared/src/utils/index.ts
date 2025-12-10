// Utility functions shared across apps

export const formatCurrency = (amount: number, currency = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB').format(d);
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const validateRegistration = (registration: string): boolean => {
  // UK vehicle registration validation (simplified)
  const pattern = /^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$/i;
  return pattern.test(registration.replace(/\s/g, ''));
};

export const generateId = (): string => {
  return crypto.randomUUID();
};
