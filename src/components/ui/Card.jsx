import { cn } from '../../utils/cn.js';

export default function Card({
  as: Component = 'div',
  className = '',
  hoverable = false,
  children,
  ...rest
}) {
  return (
    <Component
      className={cn(
        'relative rounded-2xl border border-bg-border bg-bg-subtle/60 p-6 backdrop-blur-sm shadow-card transition-all duration-300',
        hoverable &&
          'hover:-translate-y-0.5 hover:border-accent/30 hover:bg-bg-raised hover:shadow-glow',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
