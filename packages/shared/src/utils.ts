/**
 * Format a vehicle registration number
 */
export function formatRegistration(registration: string): string {
  return registration.toUpperCase().replace(/\s/g, '');
}

/**
 * Validate UK vehicle registration format
 */
export function isValidRegistration(registration: string): boolean {
  const formatted = formatRegistration(registration);
  // Basic UK registration pattern (simplified)
  const pattern = /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/;
  return pattern.test(formatted);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
}
