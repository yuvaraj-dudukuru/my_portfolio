import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile.js';

const STORAGE_KEY = 'yuvarajdevs_intro_seen';

// Panel slide (620ms) + its 100ms delay. Kept in step with .intro-panel in
// index.css; if that transition changes, change this.
const EXIT_MS = 760;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Has this browser session already seen the intro?
 *
 * sessionStorage, not localStorage: once per session is memorable, once per
 * device forever means the owner never sees their own front door again.
 * Storage can throw in private mode, in which case we simply do not show it —
 * failing closed is better than showing a curtain that cannot be dismissed
 * consistently.
 */
export function shouldShowIntro(pathname) {
  if (typeof window === 'undefined') return false;
  if (pathname !== '/') return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* storage blocked — the intro just shows again next navigation */
  }
}

/**
 * Full-screen opening curtain: two hard-edged panels that split apart when the
 * visitor presses ENTER.
 *
 * Constraints it has to satisfy:
 *  - It is a real <button>, so Enter and Space work for free.
 *  - Escape dismisses it, and focus is trapped while it is up, so nobody is
 *    stuck behind it.
 *  - prefers-reduced-motion removes the choreography entirely (no panels, no
 *    scale) rather than just shortening it.
 *  - It never renders on a deep link — landing on /work from a search result
 *    should not be interrupted by a front door.
 *  - It is client-only and outside the prerendered HTML, so crawlers and the
 *    no-JS fallback never see it.
 */
export default function IntroCurtain({ onExitStart, onDone }) {
  const [exiting, setExiting] = useState(false);
  const enterRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    enterRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      clearTimeout(timerRef.current);
    };
  }, []);

  const dismiss = (immediate = false) => {
    if (exiting) return;
    markSeen();
    setExiting(true);
    onExitStart?.();

    const duration = immediate || prefersReducedMotion() ? 0 : EXIT_MS;
    timerRef.current = setTimeout(() => {
      onDone?.();
      // Hand focus to the page rather than dropping it on <body>.
      document.getElementById('main')?.focus({ preventScroll: true });
    }, duration);
  };

  // Escape is the universal "let me out"; Tab is trapped between the two
  // controls so focus cannot wander behind the curtain.
  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dismiss(true);
    }
    if (event.key === 'Tab') {
      const nodes = Array.from(
        event.currentTarget.querySelectorAll('button:not([disabled])'),
      );
      if (nodes.length < 2) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100]"
    >
      {/* Two panels, each covering half the width, that slide in opposite
          directions. Split vertically so the reveal reads as one hard cut. */}
      <div
        aria-hidden="true"
        data-exiting={exiting}
        className="intro-panel intro-panel-left absolute inset-y-0 left-0 w-1/2 bg-bg"
      />
      <div
        aria-hidden="true"
        data-exiting={exiting}
        className="intro-panel intro-panel-right absolute inset-y-0 right-0 w-1/2 bg-bg"
      />

      <div
        data-exiting={exiting}
        className="intro-content absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
      >
        <p className="label">[ yuvarajdevs.tech ]</p>

        <h2
          id="intro-title"
          className="mt-6 text-display-lg font-extrabold uppercase leading-[0.95] tracking-tight text-ink"
        >
          Build.
          <br />
          Learn.
          <br />
          <span className="text-accent-text">Explore.</span>
        </h2>

        <p className="mt-6 max-w-xs text-sm font-medium text-muted sm:max-w-sm sm:text-base">
          {profile.positioning}
        </p>

        <button
          ref={enterRef}
          type="button"
          onClick={() => dismiss()}
          className="nb-press mt-10 inline-flex h-14 min-w-[13rem] cursor-pointer items-center justify-center gap-3 border-2 border-hard bg-accent px-8 text-base font-extrabold uppercase tracking-[0.14em] text-accent-ink shadow-nb"
        >
          Enter
          <span aria-hidden="true" className="animate-blink">
            _
          </span>
        </button>

        <button
          type="button"
          onClick={() => dismiss(true)}
          className="mt-5 cursor-pointer border-b-2 border-transparent pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:border-hard hover:text-ink"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
