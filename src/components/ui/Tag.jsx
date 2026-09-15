import { cn } from '../../utils/cn.js';

const TONES = {
  default: 'border-hard text-ink',
  accent: 'border-hard bg-accent text-accent-ink',
  cyan: 'border-hard bg-cyan text-cyan-ink',
  muted: 'border-line text-faint',
};

/** Small monospace metadata chip — stacks, domains, categories. */
export default function Tag({ tone = 'default', className = '', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-2 px-2 py-[3px] font-mono text-[0.6875rem] font-medium leading-none tracking-[0.02em]',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
