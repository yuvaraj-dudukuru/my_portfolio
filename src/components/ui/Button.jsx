import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const VARIANTS = {
  primary:
    'bg-accent-strong text-white hover:bg-accent shadow-glow hover:translate-y-[-1px]',
  secondary:
    'bg-bg-raised text-ink border border-bg-border hover:border-accent/40 hover:bg-bg-subtle',
  ghost: 'text-ink-muted hover:text-ink hover:bg-bg-subtle',
  outline:
    'border border-accent/40 text-ink hover:bg-accent-soft hover:border-accent',
};

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Button;
