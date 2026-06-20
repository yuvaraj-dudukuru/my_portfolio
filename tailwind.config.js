/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FFFBF0',
          subtle: '#F0EAD6',
          raised: '#FFFFFF',
          border: '#0A0A0A',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#333333',
          subtle: '#777777',
        },
        accent: {
          DEFAULT: '#FFE500',
          strong: '#F5D000',
          soft: 'rgba(255, 229, 0, 0.2)',
          glow: 'rgba(255, 229, 0, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        neo: '4px 4px 0px #0A0A0A',
        'neo-sm': '3px 3px 0px #0A0A0A',
        'neo-lg': '6px 6px 0px #0A0A0A',
        glow: '4px 4px 0px #0A0A0A',
        card: '4px 4px 0px #0A0A0A',
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
