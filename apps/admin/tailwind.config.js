/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // UK Automotive Industry Standard Colors
        'uk-blue': {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',  // Main brand blue
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        'uk-orange': {
          50: '#fff5e6',
          100: '#ffebcc',
          200: '#ffd699',
          300: '#ffc266',
          400: '#ffad33',
          500: '#ff9900',  // Main accent orange
          600: '#cc7a00',
          700: '#995c00',
          800: '#663d00',
          900: '#331f00',
        },
        'uk-trust-green': {
          500: '#00b67a',  // Trustpilot green
          600: '#009960',
        },
        'uk-red': '#d32f2f',
        'uk-dark': '#1a1a1a',
        'uk-light': '#f5f7fa',
        // Legacy support
        'brand-red': '#d32f2f',
        'brand-black': '#1a1a1a',
        'brand-blue': '#0066ff',
        'brand-orange': '#ff9900',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'uk-hero': 'linear-gradient(135deg, #0066ff 0%, #003d99 100%)',
        'uk-accent': 'linear-gradient(135deg, #ff9900 0%, #cc7a00 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'uk': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'uk-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'uk-xl': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};