import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';
import Reveal from './Reveal.jsx';

/**
 * The single heading pattern used by every home-page section: a bracketed mono
 * index, a heavy display heading, an optional lede, and an optional link to the
 * full index. Consistency here is what stops the page reading like a template.
 */
export default function SectionHeader({
  index,
  label,
  title,
  description,
  action,
  id,
  className = '',
}) {
  return (
    <Reveal
      className={cn('flex flex-col gap-5 md:flex-row md:items-end md:justify-between', className)}
    >
      <div className="max-w-prose">
        <p className="label">
          [ {index ? <span className="text-accent-text">{index}</span> : null}
          {index ? ' / ' : null}
          {label} ]
        </p>
        <h2
          id={id}
          className="mt-4 text-display-md font-extrabold uppercase tracking-tight text-ink"
        >
          {title}
        </h2>
        {description ? <p className="prose-body mt-4">{description}</p> : null}
      </div>

      {action ? (
        <Link
          to={action.to}
          className="nb-press group inline-flex h-11 shrink-0 items-center gap-2 self-start border-2 border-hard bg-surface px-4 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-ink shadow-nb md:self-auto"
        >
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </Reveal>
  );
}
