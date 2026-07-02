import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials.js';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';

// TODO: Replace placeholder testimonials in src/data/testimonials.js with real ones.

export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section bg-accent">
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Students Say"
          description="Feedback from learners I've worked with — placeholders for now, real quotes coming soon."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card hoverable className="flex h-full flex-col">
                <Quote
                  className="h-6 w-6 text-accent/60"
                  aria-hidden="true"
                />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-4 border-ink bg-accent text-sm font-bold text-ink shadow-neo">
                      {initials(t.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-subtle">{t.role}</p>
                    </div>
                  </div>
                  <div
                    aria-label={`Rated ${t.rating} out of 5`}
                    className="flex items-center gap-0.5 text-accent"
                  >
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-accent" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
