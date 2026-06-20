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
        'relative border-2 border-ink bg-bg-raised p-6 shadow-neo transition-all duration-150',
        hoverable && 'cursor-pointer hover:shadow-none hover:translate-x-1 hover:translate-y-1',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
