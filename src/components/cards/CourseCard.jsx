import { ArrowRight, Clock, Layers, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';
import StatusBadge from '../ui/StatusBadge.jsx';

/**
 * Courses are a product, not a portfolio item, so this card carries what a
 * buying decision needs: level, length, format, price and one clear action.
 * A planned course shows no price and no enrolment path.
 */
export default function CourseCard({ course }) {
  const isPlanned = course.status === 'planned';

  return (
    <article
      className={cn(
        'card-interactive group flex h-full flex-col',
        // A heavier frame rather than a coloured shadow: a yellow hard shadow
        // all but disappears against the light theme's white background.
        course.featured && 'border-4',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-3 border-b-2 border-hard px-5 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em]',
          isPlanned ? 'bg-surface text-faint' : 'bg-accent text-accent-ink',
        )}
      >
        <span>[ {course.code} ]</span>
        <span>{course.duration}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {course.featured ? (
          <StatusBadge tone="accent">Most popular</StatusBadge>
        ) : isPlanned ? (
          <StatusBadge tone="muted">In development</StatusBadge>
        ) : (
          <StatusBadge tone="positive">Enrolling</StatusBadge>
        )}

        <h3 className="mt-4 text-display-sm font-extrabold uppercase leading-tight tracking-tight text-ink">
          <Link to={`/learn/${course.slug}`} className="stretched">
            {course.title}
          </Link>
        </h3>
        <p className="prose-body mt-3 flex-1 text-[0.9375rem]">{course.tagline}</p>

        <ul className="mt-6 flex flex-col gap-2.5 text-sm font-medium text-muted">
          <li className="flex items-center gap-2.5">
            <Signal className="h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
            {course.levelDetail}
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
            {course.format}
          </li>
          {course.modules.length ? (
            <li className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
              {course.modules.length} modules · {course.projects.length || 1} project
            </li>
          ) : null}
        </ul>

        <div className="mt-7 flex items-end justify-between gap-4 border-t-2 border-hard pt-5">
          <div>
            {course.price ? (
              <>
                <p className="label">{course.price.note}</p>
                <p className="tabular mt-1.5 text-2xl font-extrabold text-ink">
                  {course.price.display}
                </p>
              </>
            ) : (
              <p className="label">Pricing not yet set</p>
            )}
          </div>
          <span
            className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink"
            aria-hidden="true"
          >
            {isPlanned ? 'Details' : 'View course'}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
