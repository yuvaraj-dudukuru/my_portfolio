import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { labStatuses } from '../../data/labs.js';
import { cn } from '../../utils/cn.js';
import StatusBadge from '../ui/StatusBadge.jsx';
import Tag from '../ui/Tag.jsx';

const TONES = {
  cyan: 'bg-cyan text-cyan-ink',
  accent: 'bg-accent text-accent-ink',
  plain: 'bg-ink text-bg',
};

function formatDate(value) {
  if (!value) return '—';
  const [year, month] = value.split('-');
  const name = new Date(Number(year), Number(month) - 1, 1).toLocaleString('en', {
    month: 'short',
  });
  return `${name} ${year}`;
}

/** Labs are the experimental surface, so the header block rotates colour. */
export default function LabCard({ item, tone = 'cyan' }) {
  const status = labStatuses[item.status] ?? labStatuses.planned;
  const isPlanned = item.status === 'planned';

  return (
    <article className="card-interactive group flex h-full flex-col">
      <div
        className={cn(
          'flex items-center justify-between gap-3 border-b-2 border-hard px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em]',
          isPlanned ? 'bg-surface text-faint' : (TONES[tone] ?? TONES.cyan),
        )}
      >
        <span>[ Lab / {item.index} ]</span>
        <span>{isPlanned ? 'Not started' : formatDate(item.date)}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <StatusBadge tone={status.tone} pulse={item.status === 'active'}>
          {status.label}
        </StatusBadge>

        <h3 className="mt-4 text-lg font-extrabold uppercase leading-tight tracking-tight text-ink">
          <Link to={`/labs/${item.slug}`} className="stretched">
            {item.title}
          </Link>
        </h3>

        <p className="prose-body mt-3 flex-1 text-[0.9375rem]">{item.summary}</p>

        {item.tech.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.tech.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        {item.links.source || item.links.demo ? (
          // Raised above the stretched link so these stay independently clickable.
          <div className="relative z-10 mt-6 flex items-center gap-2 border-t-2 border-hard pt-4">
            {item.links.demo ? (
              <a
                href={item.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-press inline-flex h-9 items-center gap-1.5 border-2 border-hard bg-surface px-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink shadow-nb-sm"
              >
                Demo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
            {item.links.source ? (
              <a
                href={item.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} source on GitHub`}
                className="nb-press inline-flex h-9 w-9 items-center justify-center border-2 border-hard bg-surface text-ink shadow-nb-sm"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
