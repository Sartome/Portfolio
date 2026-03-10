/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './frontend/src/**/*.{js,jsx,ts,tsx}',
    './frontend/index.html',
    './app/views/**/*.php',
    './public/**/*.php',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-up':   'slideUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':   'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                                         '100%': { opacity: '1' } },
        slideUp:   { '0%': { transform: 'translateY(24px)', opacity: '0' },           '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { '0%': { transform: 'translateY(-12px)', opacity: '0' },          '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn:   { '0%': { transform: 'scale(0.92)', opacity: '0' },                '100%': { transform: 'scale(1)', opacity: '1' } },
        blink:     { '0%, 100%': { opacity: '1' },                                    '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};
