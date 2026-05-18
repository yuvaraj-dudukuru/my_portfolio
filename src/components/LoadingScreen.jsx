import { motion } from 'framer-motion';
import { personal } from '../config/personal.js';

export default function LoadingScreen({ subtle = false }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-bg ${
        subtle ? 'bg-opacity-60 backdrop-blur' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-bg-border bg-bg-raised text-lg font-bold tracking-tight text-ink shadow-glow">
          <span className="heading-display gradient-text">{personal.monogram}</span>
          <span
            aria-hidden="true"
            className="absolute -inset-px rounded-xl bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-50 blur-sm"
          />
        </div>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-bg-subtle">
          <motion.div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent/40"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
