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
        'relative border-4 border-ink bg-bg-raised p-6 text-ink shadow-neo',
        hoverable && 'cursor-pointer neo-hover',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
