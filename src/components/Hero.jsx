import { motion } from 'framer-motion';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { personal } from '../config/personal.js';
import Button from './ui/Button.jsx';

const base = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-20 pt-32 sm:pt-36 md:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">

          {/* Left: text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 border-2 border-ink bg-accent px-3 py-1.5 text-xs font-bold text-ink shadow-neo-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Open to internships · Available for tutoring
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="heading-display mt-6 max-w-2xl text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.75rem]"
            >
              <span className="block">I build systems.</span>
              <span className="block gradient-text">I teach what I know.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              CS student specializing in AI &amp; Data Science. Currently building real
              projects, running training programs, and looking for internships where I
              can ship code that matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button as="a" href="#projects" size="lg">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as="a" href="#training" size="lg" variant="secondary">
                Explore Training Programs
              </Button>
              <Button
                as="a"
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="ghost"
                className="hidden sm:inline-flex"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center gap-3 font-mono text-sm text-ink-muted"
              aria-live="polite"
            >
              <span className="inline-block h-2 w-2 animate-pulse border border-ink bg-accent" />
              <span className="text-ink-subtle">currently:</span>
              <RotatingTitle titles={personal.rotatingTitles} />
            </motion.div>
          </div>

          {/* Right: Profile photo with neo-brutalism framing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="relative h-72 w-60 overflow-hidden border-2 border-ink shadow-neo-lg lg:h-80 lg:w-64">
                <img
                  src={`${base}images/profile.jpg`}
                  alt="Yuvaraj Dudukuru"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Yellow offset block — the neo-brutalism "frame" */}
              <div
                className="absolute -z-10 left-3 top-3 h-full w-full border-2 border-ink bg-accent"
                aria-hidden="true"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function RotatingTitle({ titles }) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const current = titles[index % titles.length];
    let timer;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
      } else {
        timer = setTimeout(() => setPhase('deleting'), 1500);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
      } else {
        setPhase('typing');
        setIndex((i) => i + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, index, titles]);

  return (
    <span className="inline-flex items-center font-bold text-ink">
      {text}
      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent" aria-hidden="true" />
    </span>
  );
}
