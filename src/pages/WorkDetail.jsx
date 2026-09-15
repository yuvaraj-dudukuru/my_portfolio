import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import MetaList from '../components/ui/MetaList.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Tag from '../components/ui/Tag.jsx';
import { getWork, work } from '../data/work.js';
import Seo from '../seo/Seo.jsx';
import { workMeta } from '../seo/routes.js';
import { breadcrumbSchema, projectSchema } from '../seo/schema.js';

function Section({ title, children }) {
  return (
    <Reveal as="section" className="border-t-2 border-hard pt-8">
      <h2 className="label">{title}</h2>
      <div className="mt-5 max-w-prose">{children}</div>
    </Reveal>
  );
}

export default function WorkDetail() {
  const { slug } = useParams();
  const item = getWork(slug);

  if (!item) return <Navigate to="/404" replace />;

  const meta = workMeta(item);
  const position = work.findIndex((entry) => entry.slug === item.slug);
  const next = work[(position + 1) % work.length];
  const repo = item.links.github;
  const live = item.links.live;

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        type="article"
        schema={[
          projectSchema(item, meta.path),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Work', to: '/work' },
            { label: item.title, to: meta.path },
          ]),
        ]}
      />

      <div className="shell pb-10 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { label: 'Work', to: '/work' },
            { label: item.title, to: meta.path },
          ]}
        />

        <p className="label">
          <span className="text-accent-text">{item.index}</span>
          <span className="px-2 text-line-strong">/</span>
          {item.year}
        </p>

        <h1 className="mt-5 max-w-3xl text-display-lg font-extrabold uppercase tracking-tight text-ink">{item.title}</h1>
        <p className="prose-body mt-5 max-w-prose text-base sm:text-lg">{item.oneLiner}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {live ? (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded border border-accent bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/90"
            >
              Live demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded border-2 border-hard px-5 text-sm text-ink transition-colors hover:bg-surface-hover"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Source
            </a>
          ) : null}
          {!live ? (
            <span className="font-mono text-[0.6875rem] text-faint">
              No public demo — the source is the artefact
            </span>
          ) : null}
        </div>
      </div>

      <article className="shell grid gap-12 pb-10 lg:grid-cols-[1fr_17rem] lg:gap-16">
        <div className="flex flex-col gap-10">
          {item.caseStudyStatus === 'in-progress' ? (
            <Reveal className="rounded border border-dashed border-line bg-bg-subtle p-5">
              <StatusBadge tone="accent">Case study in progress</StatusBadge>
              <p className="prose-body mt-3 text-[0.9375rem]">
                The project is real and deployed; the written breakdown below is still short. It
                will be expanded rather than padded.
              </p>
            </Reveal>
          ) : null}

          <Section title="Problem">
            <p className="prose-body">{item.problem}</p>
          </Section>

          {item.approach.length ? (
            <Section title="Approach">
              <ul className="flex flex-col gap-4">
                {item.approach.map((point) => (
                  <li key={point.slice(0, 32)} className="prose-body flex gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-hard" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {item.architecture.length ? (
            <Section title="Architecture">
              <dl className="overflow-hidden rounded border-2 border-hard">
                {item.architecture.map((row, i) => (
                  <div
                    key={row.layer}
                    className={`grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4 ${
                      i ? 'border-t-2 border-hard' : ''
                    }`}
                  >
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-text">
                      {row.layer}
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          ) : null}

          {item.decisions.length ? (
            <Section title="Decisions that mattered">
              <div className="flex flex-col gap-8">
                {item.decisions.map((decision) => (
                  <div key={decision.title}>
                    <h3 className="text-base font-semibold text-ink">{decision.title}</h3>
                    <p className="prose-body mt-2">{decision.body}</p>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {item.challenges.length ? (
            <Section title="Challenges">
              <ul className="flex flex-col gap-4">
                {item.challenges.map((challenge) => (
                  <li key={challenge.slice(0, 32)} className="prose-body flex gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-hard" aria-hidden="true" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {item.results.length ? (
            <Section title="Where it stands">
              <ul className="flex flex-col gap-4">
                {item.results.map((result) => (
                  <li key={result.slice(0, 32)} className="prose-body flex gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {/* Screenshots render automatically once real ones exist in the data;
              placeholder frames would say less than the write-up already does. */}
          {item.screenshots?.length ? (
            <Section title="Screens">
              <div className="grid gap-4 sm:grid-cols-2">
                {item.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded border-2 border-hard"
                    />
                    {shot.caption ? (
                      <figcaption className="mt-2 font-mono text-[0.6875rem] text-faint">
                        {shot.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </Section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <MetaList
            items={[
              { label: 'Role', value: item.role },
              { label: 'Status', value: item.status },
              { label: 'Context', value: item.context },
              {
                label: 'Stack',
                value: (
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                label: 'Domains',
                value: item.domains.join(' · '),
              },
            ]}
          />
        </aside>
      </article>

      <nav className="shell flex flex-col gap-4 border-t-2 border-hard py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/work"
          className="group inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All work
        </Link>
        <Link
          to={`/work/${next.slug}`}
          className="group inline-flex items-center gap-2 rounded text-sm text-ink transition-colors hover:text-accent-text"
        >
          <span className="label">Next</span>
          {next.title}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </nav>
    </>
  );
}
