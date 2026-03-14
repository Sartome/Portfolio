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
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
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
        neon: {
          cyan: '#00f3ff',
          pink: '#ff00aa',
          violet: '#8a2be2',
        }
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':   'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'blink':      'blink 1s step-end infinite',
        'blob':       'blob 7s infinite',
        'glow-pulse': 'glowPulse 3s infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                                         '100%': { opacity: '1' } },
        slideUp:   { '0%': { transform: 'translateY(30px)', opacity: '0' },           '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { '0%': { transform: 'translateY(-20px)', opacity: '0' },          '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn:   { '0%': { transform: 'scale(0.85)', opacity: '0' },                '100%': { transform: 'scale(1)', opacity: '1' } },
        blink:     { '0%, 100%': { opacity: '1' },                                    '50%': { opacity: '0' } },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(138, 43, 226, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(138, 43, 226, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
    },
  },
  plugins: [],
};
