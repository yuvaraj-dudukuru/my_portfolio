import { motion } from 'framer-motion';
import { cn } from '../utils/cn.js';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'mb-14 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="heading-display text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.65rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
