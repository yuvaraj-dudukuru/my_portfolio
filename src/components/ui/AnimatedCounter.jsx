import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Counts up from 0 -> value once the element scrolls into view.
export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 1400,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Ease-out cubic for a natural settle.
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
