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
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c7d7c7',
          300: '#a1bca1',
          400: '#789c78',
          500: '#5a815a',
          600: '#466846',
          700: '#3a5439',
          800: '#30442f',
          900: '#1b3a2a',
          950: '#0f1f16',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d3',
          200: '#f4dea5',
          300: '#edc76d',
          400: '#e6ae3e',
          500: '#d4952a',
          600: '#b87520',
          700: '#99571d',
          800: '#7d451f',
          900: '#673a1d',
          950: '#3a1d0c',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ef',
          200: '#b6c5d9',
          300: '#8aa2be',
          400: '#647d9f',
          500: '#4a6384',
          600: '#3b4f6b',
          700: '#324058',
          800: '#2c3748',
          900: '#1b2638',
          950: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'count-up': 'countUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
