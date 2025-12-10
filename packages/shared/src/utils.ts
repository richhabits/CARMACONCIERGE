/**
 * Format a vehicle registration number
 */
export function formatRegistration(registration: string): string {
  return registration.toUpperCase().replace(/\s/g, '');
}

/**
 * Validate UK vehicle registration format
 * Note: This currently validates the post-2001 format (e.g., AB12 CDE).
 * Historical formats like pre-2001 (e.g., A123 ABC) or prefix formats
 * are not covered and should be added based on business requirements.
 */
export function isValidRegistration(registration: string): boolean {
  const formatted = formatRegistration(registration);
  // UK registration pattern for post-2001 format
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
