import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

// Every variant carries a hard border and a hard offset shadow, so the press
// model (hover lifts, active presses in) reads the same everywhere. The shadow
// is the affordance: if it has one, it does something.
const VARIANTS = {
  primary: 'bg-accent text-accent-ink border-2 border-hard shadow-nb nb-press',
  secondary: 'bg-surface text-ink border-2 border-hard shadow-nb nb-press',
  cyan: 'bg-cyan text-cyan-ink border-2 border-hard shadow-nb nb-press',
  // Ghost is the one exception: no shadow, because it is not a primary action.
  // It still gets a border on hover so the hit area stays legible.
  ghost: 'border-2 border-transparent text-muted hover:text-ink hover:border-hard',
};

// Heights are >= 44px from `md` up so primary actions clear the minimum touch
// target. `sm` (40px) is only for dense desktop controls such as filter chips.
const SIZES = {
  sm: 'h-10 px-3.5 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7 sm:text-base',
};

const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className = '', children, ...rest },
  ref,
) {
  const Component = as ?? (to ? Link : href ? 'a' : 'button');
  const linkProps = to ? { to } : href ? { href } : { type: rest.type ?? 'button' };

  return (
    <Component
      ref={ref}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2',
        'font-bold uppercase tracking-[0.04em]',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...linkProps}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Button;
