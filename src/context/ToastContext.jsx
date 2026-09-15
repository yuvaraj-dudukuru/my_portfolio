import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext({ push: () => {}, dismiss: () => {} });

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

// The icon and the wording carry the meaning; colour only reinforces it.
const TONE = {
  success: 'text-positive',
  error: 'text-critical',
  info: 'text-accent-text',
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    ({ title, description, tone = 'info', duration = 6000 }) => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, title, description, tone }]);
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  // Clear any pending timers if the provider unmounts mid-flight.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => clearTimeout(timer));
      pending.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <Viewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// Rendering lives with the provider so toasts survive route changes. This export
// stays as a no-op because <App> mounts it for layout clarity.
export function ToastViewport() {
  return null;
}

function Viewport({ toasts, dismiss }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.tone] ?? Info;
        return (
          <div
            key={toast.id}
            role={toast.tone === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex w-full max-w-sm animate-reveal-up items-start gap-3 border-2 border-hard bg-surface p-4 shadow-nb"
          >
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${TONE[toast.tone]}`} aria-hidden="true" />
            <div className="flex-1 text-sm">
              {toast.title ? <p className="font-medium text-ink">{toast.title}</p> : null}
              {toast.description ? (
                <p className="mt-1 leading-relaxed text-muted">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="-m-1 cursor-pointer rounded p-1 text-faint transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
