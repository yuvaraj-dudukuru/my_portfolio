import { AlertTriangle } from 'lucide-react';
import PageHeader from '../ui/PageHeader.jsx';

/**
 * Shared shell for /privacy, /terms, /refund-policy and /cookies.
 *
 * What it guarantees, so no individual policy page has to think about it:
 *  - One readable measure (`max-w-prose`, ~70ch) for the body, regardless of how
 *    wide the viewport gets.
 *  - A numbered table of contents with real anchor links, sticky on desktop.
 *  - The policy's version and last-updated date, printed where a reader can see
 *    which revision they agreed to.
 *  - A "Draft — pending legal review" banner **in development builds only**, so
 *    the warning is impossible to miss while working and impossible to ship.
 *  - Print output that drops the chrome and keeps the document (see `@media
 *    print` in src/index.css, keyed off `.legal-doc`).
 *
 * @param {object} props
 * @param {string} props.label                  Eyebrow label, e.g. "Legal".
 * @param {string} props.title
 * @param {string} props.lede
 * @param {{version: string, lastUpdated: string}} props.policy
 * @param {{id: string, title: string, body: React.ReactNode}[]} props.sections
 * @param {React.ReactNode} [props.children]    Rendered after the last section.
 */
export default function LegalLayout({ label = 'Legal', title, lede, policy, sections, children }) {
  return (
    <div className="legal-doc">
      {import.meta.env.DEV ? (
        <div
          role="note"
          className="border-b-2 border-hard bg-critical/10 print:hidden"
          data-draft-banner
        >
          <p className="shell flex items-start gap-3 py-3 text-sm font-semibold text-critical">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Draft — pending legal review. This page has not been reviewed by a lawyer and
              contains unconfirmed values. Development builds only.
            </span>
          </p>
        </div>
      ) : null}

      <PageHeader
        label={label}
        title={title}
        lede={lede}
        meta={
          <>
            <span className="font-mono text-[0.6875rem] text-faint">
              Last updated{' '}
              <time dateTime={policy.lastUpdated} className="text-ink">
                {formatDate(policy.lastUpdated)}
              </time>
            </span>
            <span className="font-mono text-[0.6875rem] text-faint">
              Version <span className="text-ink">{policy.version}</span>
            </span>
          </>
        }
      />

      <div className="shell grid gap-10 pb-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <nav
          aria-labelledby="legal-toc-title"
          className="legal-toc border-t-2 border-hard pt-5 lg:sticky lg:top-24 lg:self-start print:hidden"
        >
          <h2 id="legal-toc-title" className="label">
            On this page
          </h2>
          <ol className="mt-5 flex flex-col gap-2.5">
            {sections.map((section, i) => (
              <li key={section.id} className="flex gap-3 text-sm">
                <span className="font-mono text-[0.6875rem] leading-5 text-faint" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <a
                  href={`#${section.id}`}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-body max-w-prose">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-t-2 border-hard pt-8 first:border-t-0 first:pt-0 [&+section]:mt-12">
              <h2 className="flex gap-4 text-display-sm font-extrabold uppercase tracking-tight text-ink">
                <span className="font-mono text-[0.6875rem] font-medium leading-[1.9] text-faint" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <div className="legal-prose mt-5">{section.body}</div>
            </section>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
}

/** "2026-09-17" → "17 September 2026". Fixed locale: the date must not shift. */
function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
