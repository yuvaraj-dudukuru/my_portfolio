import { useReducedMotion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { personal } from '../config/personal.js';
import Button from './ui/Button.jsx';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="container-x relative mx-auto max-w-3xl text-center">
        {personal.acceptingStudents && (
          <div className="mb-6 inline-flex animate-soft-bounce items-center gap-2 border-4 border-ink bg-bg-raised px-3.5 py-1.5 text-xs font-bold text-ink shadow-neo">
            <span aria-hidden="true">🟢</span>
            Currently Accepting Students
          </div>
        )}

        {/* Rotating role — typing animation cycling through key titles. */}
        <p className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink sm:text-base">
          <TypingRotator words={personal.rotatingTitles} />
        </p>

        <h1
          id="hero-title"
          className="heading-display mt-5 text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {personal.heroHeadline}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {personal.heroSubtext}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button as="a" href="#training" size="lg">
            <GraduationCap className="h-4 w-4" />
            Explore Training Programs
          </Button>
          <Button as="a" href="#projects" size="lg" variant="secondary">
            View My Work
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Typewriter that types a word, holds, deletes, then advances to the next.
// Respects prefers-reduced-motion by showing a single static title.
function TypingRotator({ words }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'deleting'

  useEffect(() => {
    if (reduce) {
      setText(words[0]);
      return;
    }
    const current = words[index];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), 1400);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 40);
    } else {
      setIndex((i) => (i + 1) % words.length);
      setPhase('typing');
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words, reduce]);

  return (
    <span>
      {reduce ? words[0] : text}
      <span
        className="ml-0.5 animate-pulse text-accent motion-reduce:animate-none"
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
}
