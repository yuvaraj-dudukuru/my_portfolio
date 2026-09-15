import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn.js';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll-triggered fade-and-rise, replacing the animation library the site used
 * to ship. One shared IntersectionObserver-per-instance, no layout reads, and it
 * degrades to "just show the content" when motion is reduced or IO is missing.
 *
 * Motion here is only ever used to signal that new content has entered — never
 * as decoration.
 */
export default function Reveal({
  as: Component = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setRevealed(true);
          observer.disconnect();
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn('reveal', className)}
      data-revealed={revealed ? 'true' : 'false'}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
