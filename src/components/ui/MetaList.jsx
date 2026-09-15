import { cn } from '../../utils/cn.js';

/**
 * Definition list for technical metadata (role, year, stack, status).
 * A real <dl> rather than a grid of divs, so it is navigable and announced as
 * term/description pairs.
 *
 * @param {{label: string, value: React.ReactNode}[]} items
 */
export default function MetaList({ items, columns = 1, className = '' }) {
  const visible = items.filter((item) => item && item.value);
  if (!visible.length) return null;

  return (
    <dl
      className={cn(
        'grid gap-x-8 gap-y-5',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {visible.map((item) => (
        <div key={item.label} className="border-t-2 border-hard pt-3">
          <dt className="label">{item.label}</dt>
          <dd className="mt-2 text-sm font-medium leading-relaxed text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
