import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { now } from '../../data/now.js';
import { profile } from '../../data/profile.js';
import Button from '../ui/Button.jsx';

// One current item per strand, read straight from /now so the hero cannot drift
// out of date independently of the page that owns that information.
const snapshot = now.sections
  .filter((section) => section.id !== 'exploring')
  .map((section) => ({ label: section.label, item: section.items[0] }));

export default function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 grid-field" aria-hidden="true" />

      <div className="shell relative grid gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-14 lg:pb-24 lg:pt-36">
        <div className="animate-reveal-up">
          <p className="label">
            <span className="border-2 border-hard bg-surface px-2 py-1 text-ink">
              {profile.name}
            </span>
            <span className="ml-2 inline-block py-1">/ {profile.location}</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-display-xl font-extrabold uppercase tracking-tight text-ink"
          >
            AI &amp; Data Science
            <br />
            <span className="mt-1 inline-block border-2 border-hard bg-accent px-3 text-accent-ink shadow-nb">
              Engineer
            </span>
          </h1>

          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted sm:text-sm">
            Builder <span className="text-accent-text">/</span> Educator{' '}
            <span className="text-accent-text">/</span> Experimenter
          </p>

          <p className="prose-body mt-6 max-w-prose text-base sm:text-lg">
            I build software, experiment with emerging technology, and teach what I learn —
            across AI and data systems, product engineering and automation.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/work" size="lg">
              Explore work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/learn" size="lg" variant="secondary">
              Explore courses
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t-2 border-hard pt-5">
            {profile.roles
              .filter((role) => role.current)
              .map((role) => (
                <li
                  key={role.org}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint"
                >
                  <span className="font-bold text-ink">{role.role}</span> · {role.org}
                </li>
              ))}
            <li className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
              <span className="font-bold text-ink">Past</span> · COO, Fraylon Technologies
            </li>
          </ul>
        </div>

        {/* Status panel. Small, factual, and links to the page that owns it. */}
        <aside
          className="card animate-reveal-up shadow-nb lg:mt-2"
          style={{ animationDelay: '120ms' }}
        >
          <div className="flex items-center justify-between gap-4 border-b-2 border-hard bg-ink px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-bg">
            <span>[ Currently ]</span>
            {/* Plain markup rather than <StatusBadge>: this bar inverts to a
                solid light block, where the badge's green would not clear
                contrast. The square is decorative; the word carries it. */}
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-blink bg-bg" aria-hidden="true" />
              Active
            </span>
          </div>

          <dl className="flex flex-col divide-y-2 divide-line">
            {snapshot.map(({ label, item }) => (
              <div key={label} className="px-4 py-4">
                <dt className="label">{label}</dt>
                <dd className="mt-1.5 text-sm font-bold leading-snug text-ink">{item.title}</dd>
              </div>
            ))}
          </dl>

          <div className="border-t-2 border-hard p-4">
            <Link
              to="/now"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink"
            >
              <span className="border-b-2 border-accent pb-0.5">What I&rsquo;m doing now</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
