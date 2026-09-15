import { cn } from '../../utils/cn.js';

/**
 * Header for a top-level route. Every page opens the same way — bracketed mono
 * label, one h1, one lede — so the site reads as one document rather than eight,
 * and so "where am I" is answered above the fold on every route.
 */
export default function PageHeader({ label, title, lede, meta, actions, className = '' }) {
  return (
    <header className={cn('shell pb-10 pt-28 sm:pt-32 lg:pt-36', className)}>
      {label ? (
        <p className="label">
          <span className="border-2 border-hard bg-accent px-2 py-1 text-accent-ink">{label}</span>
        </p>
      ) : null}
      <h1 className="mt-6 max-w-4xl text-display-lg font-extrabold uppercase tracking-tight text-ink">
        {title}
      </h1>
      {lede ? <p className="prose-body mt-5 max-w-prose text-base sm:text-lg">{lede}</p> : null}

      {meta ? (
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-hard pt-5">
          {meta}
        </div>
      ) : null}
      {actions ? <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div> : null}
    </header>
  );
}
