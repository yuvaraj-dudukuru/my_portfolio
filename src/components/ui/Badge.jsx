import { cn } from '../../utils/cn.js';

const TONES = {
  default: 'bg-bg-subtle text-ink border-4 border-ink',
  accent: 'bg-accent text-ink border-4 border-ink',
  success: 'bg-bg-subtle text-ink border-4 border-ink',
  outline: 'bg-bg-raised text-ink border-4 border-ink',
};

export default function Badge({ tone = 'default', className = '', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-xs font-bold tracking-wide shadow-neo',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
