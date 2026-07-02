import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const VARIANTS = {
  primary: 'bg-accent text-ink font-bold neo-pressable',
  secondary: 'bg-bg-raised text-ink font-bold neo-pressable',
  ghost: 'border-4 border-transparent text-ink font-bold hover:bg-bg-subtle hover:border-ink',
  outline: 'bg-bg-raised text-ink font-bold neo-pressable hover:bg-accent',
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
        'inline-flex items-center justify-center gap-2 font-bold transition-all duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none',
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
