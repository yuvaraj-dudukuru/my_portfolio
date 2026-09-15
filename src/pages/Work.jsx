import { useMemo, useState } from 'react';
import WorkCard from '../components/cards/WorkCard.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { work, workDomains } from '../data/work.js';

const TONES = ['accent', 'cyan', 'plain'];
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

export default function Work() {
  const [domain, setDomain] = useState('All');

  const filtered = useMemo(
    () => (domain === 'All' ? work : work.filter((item) => item.domains.includes(domain))),
    [domain],
  );

  return (
    <>
      <Seo
        title={pageMeta.work.title}
        description={pageMeta.work.description}
        path={pageMeta.work.path}
      />

      <PageHeader
        label="Work"
        title="Projects, written up properly"
        lede="Each of these has a case study behind it: the problem as it actually was, the architecture, the decisions that turned out to matter, and what is genuinely finished versus what is not."
      />

      <div className="shell">
        {/* Filters are a single-select group, so they are radios in behaviour. */}
        <div
          role="group"
          aria-label="Filter work by domain"
          className="flex flex-wrap items-center gap-3 border-b-2 border-hard pb-8"
        >
          {workDomains.map((item) => {
            const isActive = domain === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setDomain(item)}
                aria-pressed={isActive}
                className={`nb-press h-10 cursor-pointer border-2 border-hard px-3.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.1em] shadow-nb-sm ${
                  isActive ? 'bg-accent text-accent-ink' : 'bg-surface text-ink'
                }`}
              >
                {item}
              </button>
            );
          })}
          <p className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* The cards carry h3 headings; this keeps the document outline from
            jumping straight from the page h1 to h3. */}
        <h2 className="sr-only">Projects</h2>

        <div className="grid gap-6 pb-10">
          {filtered.length ? (
            filtered.map((item, i) => (
              <Reveal key={item.slug} delay={i * 60}>
                <WorkCard item={item} tone={TONES[i % TONES.length]} />
              </Reveal>
            ))
          ) : (
            <EmptyState
              className="mt-10"
              label="No results"
              title={`Nothing in ${domain} yet`}
              description="That filter has no projects behind it at the moment. Try another, or view everything."
            />
          )}
        </div>
      </div>
    </>
  );
}
