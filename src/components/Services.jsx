import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services.js';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Services() {
  return (
    <section id="services" className="section bg-accent">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="How I Can Help You"
          description="Whether you're a recruiter, a student, or a business — here's what I offer."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = Icons[s.icon] ?? Icons.Sparkles;
            const params = new URLSearchParams({ subject: s.cta.subject });
            const href = `#contact?${params.toString()}`;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Card hoverable className="group flex h-full flex-col">
                  <div className="flex h-11 w-11 items-center justify-center border-4 border-ink bg-accent text-ink shadow-neo">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="heading-display mt-5 text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {s.description}
                  </p>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('contact');
                      if (el) {
                        // Surface the subject so the form can preselect it.
                        window.history.replaceState(null, '', href);
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.dispatchEvent(
                          new CustomEvent('contact-prefill', {
                            detail: { subject: s.cta.subject },
                          }),
                        );
                      }
                    }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink underline decoration-4 underline-offset-4 decoration-accent hover:-translate-x-0.5 hover:-translate-y-0.5 focus-ring"
                  >
                    {s.cta.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
