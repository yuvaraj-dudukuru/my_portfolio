import { cn } from '../../utils/cn.js';

const TONES = {
  positive: { dot: 'bg-positive', text: 'text-positive' },
  accent: { dot: 'bg-accent', text: 'text-accent-text' },
  cyan: { dot: 'bg-cyan', text: 'text-cyan-text' },
  muted: { dot: 'bg-faint', text: 'text-faint' },
};

/**
 * Status indicator. The square is decorative — the label carries the meaning,
 * so status is never communicated by colour alone.
 */
export default function StatusBadge({ tone = 'muted', children, pulse = false, className = '' }) {
  const styles = TONES[tone] ?? TONES.muted;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em]',
        styles.text,
        className,
      )}
    >
      <span
        className={cn('h-2 w-2 shrink-0', styles.dot, pulse && 'animate-blink')}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
