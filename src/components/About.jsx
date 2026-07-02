import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { personal } from '../config/personal.js';
import AnimatedCounter from './ui/AnimatedCounter.jsx';
import Button from './ui/Button.jsx';
import SectionHeading from './SectionHeading.jsx';

const base = import.meta.env.BASE_URL;

export default function About() {
  return (
    <section id="about" className="section bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="A builder who teaches the path he walks"
        />

        <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            <p>
              I&apos;m a Computer Science undergraduate focused on{' '}
              <span className="font-bold text-ink">AI &amp; Data Science</span>. My work
              sits at the intersection of building real software and
              understanding the math behind it — I&apos;d rather ship a small
              system that works than write another notebook that never leaves
              my laptop.
            </p>
            <p>
              Outside of coursework I build projects (an AI career advisor, a
              full-stack chat app, an enterprise WhatsApp automation platform),
              run a startup-in-progress, and{' '}
              <span className="font-bold text-ink">tutor students</span> in Python, AI/ML
              and Web Development through structured training programs and 1:1
              sessions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                as="a"
                href={personal.resumeUrl.startsWith('/') ? `${base}${personal.resumeUrl.replace(/^\//, '')}` : personal.resumeUrl}
                download
                size="md"
                variant="secondary"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
              <Button as="a" href="#contact" size="md" variant="ghost">
                <FileText className="h-4 w-4" />
                Get in touch
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1"
          >
            {personal.stats.map((s) => (
              <div
                key={s.label}
                className="border-4 border-ink bg-accent p-5 shadow-neo neo-hover"
              >
                <p className="heading-display text-3xl font-bold text-ink">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-ink-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
