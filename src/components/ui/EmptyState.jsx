import { cn } from '../../utils/cn.js';

/**
 * Empty states are a designed state here, not an accident. They say what is
 * missing and what to do instead — never "nothing found" on its own.
 */
export default function EmptyState({ label, title, description, children, className = '' }) {
  return (
    <div
      className={cn(
        'border-2 border-dashed border-hard bg-bg-subtle px-6 py-12 text-center sm:px-10 sm:py-16',
        className,
      )}
    >
      {label ? <p className="label">[ {label} ]</p> : null}
      <p className="mt-4 text-display-sm font-extrabold uppercase tracking-tight text-ink">
        {title}
      </p>
      {description ? (
        <p className="prose-body mx-auto mt-3 max-w-prose text-balance">{description}</p>
      ) : null}
      {children ? <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}
