import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext({ push: () => {} });

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

// Green success / red error use standard conversion semantics while keeping the
// neo-brutalist frame (thick border + hard shadow).
const TONE = {
  success: 'border-4 border-ink bg-green-400 text-black',
  error: 'border-4 border-ink bg-red-500 text-white',
  info: 'border-4 border-ink bg-bg-raised text-ink',
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((cur) => cur.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    ({ title, description, tone = 'success', duration = 4500 }) => {
      const id = ++idCounter;
      setToasts((cur) => [...cur, { id, title, description, tone }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      {/* Render the viewport here too, so toasts work even outside <App> tree */}
      <ToastViewportInternal toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// Public no-op viewport — actual rendering happens via the internal one.
// Kept exported so App.jsx can include it in JSX without breaking layout APIs.
export function ToastViewport() {
  return null;
}

function ToastViewportInternal({ toasts, dismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.tone] ?? Info;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              role="status"
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 border px-4 py-3 shadow-neo ${TONE[t.tone]}`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div className="flex-1 text-sm">
                {t.title && <p className="font-semibold">{t.title}</p>}
                {t.description && (
                  <p className="mt-0.5 opacity-80">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="font-bold text-ink hover:underline focus-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
