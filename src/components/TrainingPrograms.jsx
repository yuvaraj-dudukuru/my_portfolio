import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Monitor, Tag, Trophy } from 'lucide-react';
import { useState } from 'react';
import { programs } from '../data/programs.js';
import Badge from './ui/Badge.jsx';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function TrainingPrograms() {
  const [openId, setOpenId] = useState(programs.find((p) => p.badge)?.id ?? programs[0]?.id);

  const handleJoin = (program) => {
    const subject = `Training Inquiry — ${program.title}`;
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(
        new CustomEvent('contact-prefill', { detail: { subject } }),
      );
    }
  };

  return (
    <section id="training" className="section bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          eyebrow="Training Programs"
          title="Structured curricula, built from real-world experience"
          description="Each program ends with a real project — not a quiz. The goal is portfolio pieces you can talk about."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {programs.map((p, i) => {
            const isOpen = openId === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Card
                  className={`flex h-full flex-col ${
                    p.badge ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="heading-display text-xl font-semibold text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-ink-subtle">{p.level}</p>
                    </div>
                    {p.badge && <Badge tone="accent">{p.badge}</Badge>}
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{p.duration}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-accent" />
                      <span>{p.mode}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-accent" />
                      <span>{p.price}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="font-medium text-ink">{p.outcome}</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setOpenId(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    aria-controls={`curriculum-${p.id}`}
                    className="neo-pressable mt-5 flex w-full items-center justify-between bg-bg-raised px-4 py-2.5 text-sm font-bold text-ink focus-ring"
                  >
                    <span>Curriculum</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`curriculum-${p.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <ol className="mt-4 space-y-4 border-l-4 border-ink pl-4">
                          {p.curriculum.map((c) => (
                            <li key={c.week} className="text-sm">
                              <p className="text-xs font-mono uppercase tracking-wider text-accent">
                                {c.week}
                              </p>
                              <p className="mt-0.5 font-semibold text-ink">{c.title}</p>
                              <ul className="mt-1.5 space-y-1 text-ink-muted">
                                {c.topics.map((t) => (
                                  <li key={t} className="flex gap-2">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 border-2 border-ink bg-accent" />
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ol>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={() => handleJoin(p)}
                    variant={p.badge ? 'primary' : 'secondary'}
                    className="mt-6"
                  >
                    Join Program
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
