/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '0',
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FFFFFF',
          subtle: '#00FFFF',
          raised: '#FFFFFF',
          border: '#000000',
        },
        ink: {
          DEFAULT: '#000000',
          muted: '#000000',
          subtle: '#000000',
        },
        accent: {
          DEFAULT: '#FFE500',
          strong: '#FFD700',
          soft: '#FFE500',
          glow: '#FFE500',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontWeight: {
        normal: '600',
        medium: '600',
        semibold: '700',
        bold: '700',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        neo: '10px 10px 0px #000000',
        'neo-hover': '12px 12px 0px #000000',
        'neo-active': '2px 2px 0px #000000',
        'neo-sm': '10px 10px 0px #000000',
        'neo-lg': '10px 10px 0px #000000',
        glow: '10px 10px 0px #000000',
        card: '10px 10px 0px #000000',
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
