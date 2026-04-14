/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a1b0a1',
          400: '#789078',
          500: '#5a755a',
          600: '#466048',
          700: '#3a4f3b',
          800: '#2f3f30',
          900: '#253226',
          950: '#131c14',
        },
        gold: {
          50: '#fdfaf3',
          100: '#faf2de',
          200: '#f3e0b3',
          300: '#eacc80',
          400: '#ddb44e',
          500: '#d4a22e',
          600: '#be8723',
          700: '#9e6a1e',
          800: '#81541f',
          900: '#6a451c',
          950: '#3c230c',
        },
        navy: {
          50: '#f2f4f7',
          100: '#e2e6ee',
          200: '#c8d0df',
          300: '#a2afc6',
          400: '#7688a8',
          500: '#566b8e',
          600: '#445577',
          700: '#394662',
          800: '#323c53',
          900: '#1e2535',
          950: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
