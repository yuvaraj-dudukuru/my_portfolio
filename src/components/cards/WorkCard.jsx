import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';
import StatusBadge from '../ui/StatusBadge.jsx';
import Tag from '../ui/Tag.jsx';

const TONES = {
  accent: 'bg-accent text-accent-ink',
  cyan: 'bg-cyan text-cyan-ink',
  plain: 'bg-ink text-bg',
};

/**
 * Case-study card. Deliberately typographic rather than image-led: the projects
 * do not have production-quality screenshots yet, and a stretched thumbnail
 * would say less than the stack and the one-liner do.
 *
 * `tone` rotates the header block colour so a stack of cards has rhythm without
 * every card shouting the same colour.
 */
export default function WorkCard({ item, tone = 'accent' }) {
  return (
    <article className="card-interactive group flex h-full flex-col">
      <div
        className={cn(
          'flex items-center justify-between gap-4 border-b-2 border-hard px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] sm:px-6',
          TONES[tone] ?? TONES.accent,
        )}
      >
        <span>[ Work / {item.index} ]</span>
        <span>{item.year}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex flex-wrap-reverse items-start justify-between gap-x-4 gap-y-2">
          <h3 className="text-display-sm font-extrabold uppercase tracking-tight text-ink">
            <Link to={`/work/${item.slug}`} className="stretched">
              {item.title}
            </Link>
          </h3>
          <StatusBadge tone={item.status === 'Live' ? 'positive' : 'muted'}>
            {item.status}
          </StatusBadge>
        </div>

        <p className="prose-body mt-3 flex-1">{item.oneLiner}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {item.stack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {item.stack.length > 5 ? (
            <li>
              <Tag tone="muted">+{item.stack.length - 5}</Tag>
            </li>
          ) : null}
        </ul>

        <span
          className="mt-7 inline-flex items-center gap-2 self-start border-b-2 border-accent pb-1 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink"
          aria-hidden="true"
        >
          Case study
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
