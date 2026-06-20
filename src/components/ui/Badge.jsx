import { cn } from '../../utils/cn.js';

const TONES = {
  default: 'bg-bg-subtle text-ink border-2 border-ink',
  accent:  'bg-accent text-ink border-2 border-ink',
  success: 'bg-emerald-400 text-ink border-2 border-ink',
  outline: 'bg-transparent text-ink border-2 border-ink',
};

export default function Badge({ tone = 'default', className = '', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-0.5 text-xs font-bold tracking-wide',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
