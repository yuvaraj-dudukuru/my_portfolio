import { personal } from '../config/personal.js';

// Thin scrolling marquee of credentials, shown between the hero and the rest of
// the page for instant social proof. Items are duplicated so the loop is
// seamless; the animation pauses on hover and is disabled for reduced motion.
export default function CredibilityStrip() {
  const items = personal.credentials ?? [];
  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <section
      aria-label="Credentials"
      className="overflow-hidden border-y-4 border-ink bg-accent py-3"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-5 inline-flex items-center gap-2.5 text-sm font-bold text-ink"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 border-2 border-ink bg-bg-raised"
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
