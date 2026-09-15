import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import MetaList from '../components/ui/MetaList.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Tag from '../components/ui/Tag.jsx';
import { getLab, labStatuses } from '../data/labs.js';
import Seo from '../seo/Seo.jsx';
import { labMeta } from '../seo/routes.js';
import { breadcrumbSchema, projectSchema } from '../seo/schema.js';

export default function LabDetail() {
  const { slug } = useParams();
  const item = getLab(slug);

  if (!item) return <Navigate to="/404" replace />;

  const meta = labMeta(item);
  const status = labStatuses[item.status] ?? labStatuses.planned;
  const hasRepo = Boolean(item.links.source);

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        type="article"
        schema={[
          ...(hasRepo ? [projectSchema(item, meta.path)] : []),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Labs', to: '/labs' },
            { label: item.title, to: meta.path },
          ]),
        ]}
      />

      <div className="shell pb-12 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { label: 'Labs', to: '/labs' },
            { label: `Lab ${item.index}`, to: meta.path },
          ]}
        />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="label">Lab {item.index}</p>
          <StatusBadge tone={status.tone} pulse={item.status === 'active'}>
            {status.label}
          </StatusBadge>
        </div>

        <h1 className="mt-5 max-w-3xl text-display-lg font-extrabold uppercase tracking-tight text-ink">{item.title}</h1>
        <p className="prose-body mt-5 max-w-prose text-base sm:text-lg">{item.summary}</p>

        {item.links.demo || item.links.source ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {item.links.demo ? (
              <a
                href={item.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded border border-accent bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/90"
              >
                Open demo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            {item.links.source ? (
              <a
                href={item.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded border-2 border-hard px-5 text-sm text-ink transition-colors hover:bg-surface-hover"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Source
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <article className="shell grid gap-12 pb-10 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <Reveal className="max-w-prose border-t-2 border-hard pt-8">
          <div className="prose-body">
            {item.body.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <MetaList
            items={[
              { label: 'Status', value: status.label },
              { label: 'Started', value: item.date || 'Not started' },
              {
                label: 'Tech',
                value: item.tech.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {item.tech.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'Not decided yet'
                ),
              },
            ]}
          />
        </aside>
      </article>

      <nav className="shell border-t-2 border-hard py-10">
        <Link
          to="/labs"
          className="group inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All experiments
        </Link>
      </nav>
    </>
  );
}
