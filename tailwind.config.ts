import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#FF6B6B',
          50: '#FFF0F0',
          100: '#FFE1E1',
          200: '#FFC3C3',
          300: '#FFA5A5',
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FF4747',
          700: '#FF2323',
          800: '#EF0000',
          900: '#CB0000',
        },
        purple: {
          soft: '#6C5CE7',
          50: '#F0EEFC',
          100: '#E1DDF9',
          200: '#C3BBF3',
          300: '#A599ED',
          400: '#8777E7',
          500: '#6C5CE7',
          600: '#4834DF',
          700: '#2F21B1',
          800: '#221883',
          900: '#150F55',
        },
        cream: {
          DEFAULT: '#FFF9F5',
          50: '#FFFCFA',
          100: '#FFF9F5',
          200: '#FFEFE5',
          300: '#FFE5D5',
          400: '#FFDBC5',
          500: '#FFD1B5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(255, 107, 107, 0.15)',
        'soft-lg': '0 10px 40px rgba(255, 107, 107, 0.2)',
        'glow': '0 0 30px rgba(108, 92, 231, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
