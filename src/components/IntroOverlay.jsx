import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Faithful re-creation of the legacy intro "curtain" effect:
// a full-screen overlay with staggered text + an EXPLORE button, and two
// colored panels that sweep up from below the viewport, followed by the
// overlay itself sliding up to reveal the real page underneath.
//
// Legacy used GSAP + green/purple sliders. This version uses Framer Motion
// (already a dependency) and the site's neo-brutalist palette so it blends in.
const LINES = ['Building systems.', 'Learning by doing.', 'Making impact.'];

// Custom easing that mirrors the original Expo/Power "easeInOut" curtain feel.
const SWEEP_EASE = [0.76, 0, 0.24, 1];

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const reduce = useReducedMotion();

  // Lock page scroll while the intro is on screen.
  useEffect(() => {
    if (!visible) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  const startExit = () => setExiting(true);
  const finishExit = () => {
    if (exiting) setVisible(false);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Two colored panels parked just below the viewport; they sweep up on exit.
          Skipped entirely when the user prefers reduced motion. */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-[1] bg-accent"
            initial={{ y: '100%' }}
            animate={{ y: exiting ? '-100%' : '100%' }}
            transition={{ duration: 1.1, delay: exiting ? 0.55 : 0, ease: SWEEP_EASE }}
            style={{ willChange: 'transform' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-[2] bg-bg-subtle"
            initial={{ y: '100%' }}
            animate={{ y: exiting ? '-100%' : '100%' }}
            transition={{ duration: 1.1, delay: exiting ? 0.8 : 0, ease: SWEEP_EASE }}
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* The overlay itself: holds the text + button, then slides (or fades) away. */}
      <motion.div
        className="pointer-events-auto absolute inset-0 z-[0] flex flex-col items-center justify-center bg-ink px-6 text-center"
        initial={reduce ? { opacity: 1 } : { y: 0 }}
        animate={
          reduce
            ? { opacity: exiting ? 0 : 1 }
            : { y: exiting ? '-100%' : 0 }
        }
        transition={{
          duration: reduce ? 0.5 : 1.0,
          delay: exiting && !reduce ? 1.25 : 0,
          ease: SWEEP_EASE,
        }}
        onAnimationComplete={finishExit}
        style={{ willChange: reduce ? 'opacity' : 'transform' }}
      >
        <div className="space-y-1 sm:space-y-2">
          {LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h2
                className={`heading-display text-4xl font-bold leading-tight sm:text-6xl ${
                  i === 1 ? 'text-accent' : 'text-bg'
                }`}
                initial={reduce ? { opacity: 0 } : { y: '110%' }}
                animate={
                  reduce
                    ? { opacity: exiting ? 0 : 1 }
                    : { y: exiting ? '-110%' : '0%' }
                }
                transition={{
                  duration: 0.6,
                  delay: exiting ? 0 : 0.2 + i * 0.15,
                  ease: reduce ? 'easeOut' : SWEEP_EASE,
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={startExit}
          disabled={exiting}
          className="focus-ring mt-10 border-4 border-bg bg-accent px-8 py-3 text-sm font-bold uppercase tracking-[0.3em] text-ink transition-transform duration-150 hover:-translate-y-1 disabled:cursor-default"
          style={{ boxShadow: '8px 8px 0 #FFFFFF' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: exiting ? 0 : 1,
            y: exiting ? -60 : 0,
          }}
          transition={{ duration: 0.5, delay: exiting ? 0 : 0.7, ease: 'easeOut' }}
        >
          Explore
        </motion.button>
      </motion.div>
    </div>
  );
}
