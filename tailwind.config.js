/** @type {import('tailwindcss').Config} */

// Colors are driven by CSS custom properties declared in src/index.css so that
// light/dark theming is a single class swap on <html> — no duplicated utilities.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // Neo-brutalism has no soft edges. Every radius resolves to 0 so that
    // `rounded*` utilities already in the codebase become no-ops rather than
    // needing to be stripped out of 60-odd files.
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
        bg: token('--c-bg'),
        'bg-subtle': token('--c-bg-subtle'),
        surface: token('--c-surface'),
        'surface-hover': token('--c-surface-hover'),
        // `line` is a low-emphasis 1px divider, so it carries its own alpha
        // rather than supporting the `/opacity` modifier — a full-strength
        // white rule would fight the 2px structural borders everywhere it is
        // used. `hard` is that structural border: always full strength.
        line: 'rgb(var(--c-line) / var(--line-alpha))',
        'line-strong': token('--c-line-strong'),
        hard: token('--c-hard'),
        ink: token('--c-text'),
        muted: token('--c-muted'),
        faint: token('--c-faint'),
        // `accent`/`cyan` are fills. `accent-text`/`cyan-text` are the
        // readable-on-background variants — the raw yellow fails contrast as
        // text in light mode, so it is never used that way.
        accent: token('--c-accent'),
        'accent-ink': token('--c-accent-ink'),
        'accent-text': token('--c-accent-text'),
        cyan: token('--c-cyan'),
        'cyan-ink': token('--c-cyan-ink'),
        'cyan-text': token('--c-cyan-text'),
        positive: token('--c-positive'),
        critical: token('--c-critical'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Loud, tight display scale. Line-heights tuned per step, not global.
        'display-xl': [
          'clamp(2.75rem, 1.7rem + 4.4vw, 5rem)',
          { lineHeight: '0.94', letterSpacing: '-0.035em' },
        ],
        'display-lg': [
          'clamp(2.25rem, 1.6rem + 2.9vw, 3.5rem)',
          { lineHeight: '1', letterSpacing: '-0.03em' },
        ],
        'display-md': [
          'clamp(1.875rem, 1.4rem + 2.1vw, 2.75rem)',
          { lineHeight: '1.05', letterSpacing: '-0.025em' },
        ],
        'display-sm': [
          'clamp(1.375rem, 1.15rem + 1vw, 1.75rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em' },
        ],
        label: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        // ~1184px: wide enough for the grid, narrow enough that prose never
        // runs past a comfortable measure.
        content: '74rem',
        prose: '38rem',
      },
      spacing: {
        section: 'clamp(4rem, 3rem + 5vw, 7.5rem)',
      },
      boxShadow: {
        // Hard offsets only. No blur, no spread, no alpha.
        nb: '6px 6px 0 0 rgb(var(--c-shadow))',
        'nb-lg': '8px 8px 0 0 rgb(var(--c-shadow))',
        'nb-sm': '2px 2px 0 0 rgb(var(--c-shadow))',
        'nb-accent': '6px 6px 0 0 rgb(var(--c-accent))',
        'nb-accent-lg': '8px 8px 0 0 rgb(var(--c-accent))',
        'nb-cyan': '6px 6px 0 0 rgb(var(--c-cyan))',
        'nb-cyan-lg': '8px 8px 0 0 rgb(var(--c-cyan))',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        hard: 'cubic-bezier(0.8, 0, 0.2, 1)',
      },
      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        'sheet-in': {
          from: { opacity: '0', transform: 'translate3d(0, -8px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-in': 'sheet-in 0.16s cubic-bezier(0.8, 0, 0.2, 1) both',
        blink: 'blink 1.4s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
};
