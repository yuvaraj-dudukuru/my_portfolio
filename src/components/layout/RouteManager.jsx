import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Client-side routing loses three things a real page load gives you for free:
 * scroll position, focus position, and an announcement for screen readers.
 * This restores all three, and renders the live region that does the announcing.
 */
export default function RouteManager() {
  const { pathname, hash } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    if (hash) {
      // Let the target section own the scroll; do not fight it or steal focus.
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return undefined;
      }
    }

    // 'auto', not 'smooth': a route change should land at the top immediately,
    // even though html{scroll-behavior:smooth} is set for in-page anchors.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Move focus to the start of the main region so keyboard users continue from
    // the new page rather than from wherever the old link happened to be.
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });

    // The title is set by <Seo> inside the (possibly lazily loaded) page, so
    // read it a tick later rather than announcing the previous page's name.
    const timer = setTimeout(() => setAnnouncement(document.title), 120);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
