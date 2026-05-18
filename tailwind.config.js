/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          subtle: '#111118',
          raised: '#15151d',
          border: '#1f1f2a',
        },
        ink: {
          DEFAULT: '#ededf3',
          muted: '#a1a1aa',
          subtle: '#71717a',
        },
        accent: {
          DEFAULT: '#818cf8',
          strong: '#6366f1',
          soft: 'rgba(129, 140, 248, 0.12)',
          glow: 'rgba(99, 102, 241, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(129, 140, 248, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(129, 140, 248, 0.07) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(60% 60% at 50% 0%, rgba(99, 102, 241, 0.18) 0%, rgba(10, 10, 15, 0) 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(129, 140, 248, 0.25), 0 20px 60px -20px rgba(99, 102, 241, 0.45)',
        card: '0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 24px 48px -24px rgba(0, 0, 0, 0.6)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
