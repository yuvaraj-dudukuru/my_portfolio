import { cn } from '../../utils/cn.js';

const TONES = {
  default: 'bg-bg-raised text-ink-muted border-bg-border',
  accent: 'bg-accent-soft text-accent border-accent/30',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30',
  outline: 'bg-transparent text-ink-muted border-bg-border',
};

export default function Badge({ tone = 'default', className = '', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
