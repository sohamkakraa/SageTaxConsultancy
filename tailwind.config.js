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
          50: '#f6f8f2',
          100: '#e7edde',
          200: '#d0d9bf',
          300: '#b3c19a',
          400: '#9bae7a',
          500: '#8A9A5B',
          600: '#6e8349',
          700: '#586a39',
          800: '#45542b',
          900: '#323e1e',
          950: '#1c2310',
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
          50: '#f2f7f5',
          100: '#dfeae4',
          200: '#c1d6cb',
          300: '#96b8a6',
          400: '#6b9a82',
          500: '#4a7d65',
          600: '#386350',
          700: '#2d5041',
          800: '#1a3328',
          900: '#142a21',
          950: '#0c1a14',
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
