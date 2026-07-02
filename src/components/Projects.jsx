import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects, projectTags } from '../data/projects.js';
import Badge from './ui/Badge.jsx';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((p) => p.tags.includes(active));
  }, [active]);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="What I've Built"
          description="A mix of AI/ML, full-stack, and automation work — each one ships, each one solves a real problem."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {projectTags.map((tag) => {
            const isActive = active === tag;
            return (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                aria-pressed={isActive}
                className={`neo-pressable border-4 px-3.5 py-1.5 text-xs font-bold focus-ring ${
                  isActive
                    ? 'bg-accent text-ink'
                    : 'bg-bg-raised text-ink hover:bg-bg-subtle'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card hoverable className="group flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-[16/10] overflow-hidden border-b-4 border-ink bg-bg-subtle">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-ink-subtle">
                        {/* TODO: Add project image */}
                        Project preview
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/80 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} tone="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="heading-display mt-3 text-lg font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-ink-subtle">{p.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {p.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <li
                          key={s}
                          className="border-4 border-ink bg-bg-subtle px-2 py-0.5 font-mono text-[11px] font-bold text-ink shadow-neo"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center gap-2">
                      {p.links.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} on GitHub`}
                          className="neo-pressable inline-flex h-9 w-9 items-center justify-center bg-bg-raised text-ink focus-ring"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {p.links.live && (
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-pressable inline-flex items-center gap-1.5 bg-bg-raised px-3 py-2 text-xs font-bold text-ink focus-ring"
                        >
                          Live Demo
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
