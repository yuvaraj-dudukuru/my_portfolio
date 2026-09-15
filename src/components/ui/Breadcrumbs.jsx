import { Link } from 'react-router-dom';

/**
 * Breadcrumb trail for detail routes. The current page is plain text with
 * aria-current, not a link to itself.
 *
 * @param {{label: string, to: string}[]} trail
 */
export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.to} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className="transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-accent-text">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
