import { ArrowRight, Mail } from 'lucide-react';
import { personal } from '../config/personal.js';
import Button from './ui/Button.jsx';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="container-x relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 border-4 border-ink bg-accent px-3 py-1.5 text-xs font-bold text-ink shadow-neo">
          {personal.role}
        </div>

        <h1
          id="hero-title"
          className="heading-display mt-6 text-balance text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {personal.name}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {personal.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button as="a" href="#projects" size="lg">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button as="a" href="#contact" size="lg" variant="secondary">
            Contact Me
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
