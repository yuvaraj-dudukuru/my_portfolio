import { motion } from 'framer-motion';
import { personal } from '../config/personal.js';

export default function LoadingScreen({ subtle = false }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-bg ${
        subtle ? 'bg-opacity-80' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex h-14 w-14 items-center justify-center border-2 border-ink bg-accent shadow-neo">
          <span className="heading-display text-sm font-bold text-ink">
            {personal.monogram}
          </span>
        </div>
        <div className="h-2 w-32 overflow-hidden border border-ink bg-bg-subtle">
          <motion.div
            className="h-full w-1/3 bg-ink"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
