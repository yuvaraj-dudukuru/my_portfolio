import { ArrowLeft, Check, Plus } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { courseFaq, getCourse } from '../data/courses.js';
import { profile } from '../data/profile.js';
import Seo from '../seo/Seo.jsx';
import { courseMeta } from '../seo/routes.js';
import { breadcrumbSchema, courseSchema } from '../seo/schema.js';

function Block({ title, children, className = '' }) {
  return (
    <Reveal as="section" className={`border-t-2 border-hard pt-8 ${className}`}>
      <h2 className="label">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourse(slug);

  if (!course) return <Navigate to="/404" replace />;

  const meta = courseMeta(course);
  const isPlanned = course.status === 'planned';
  const enrolHref = `/contact?subject=${encodeURIComponent(course.enrollSubject)}`;

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        schema={[
          courseSchema(course, meta.path),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Learn', to: '/learn' },
            { label: course.title, to: meta.path },
          ]),
        ]}
      />

      <div className="shell pb-12 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { label: 'Learn', to: '/learn' },
            { label: course.title, to: meta.path },
          ]}
        />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="label">{course.code}</p>
          {isPlanned ? (
            <StatusBadge tone="muted">In development</StatusBadge>
          ) : (
            <StatusBadge tone="positive">Enrolling</StatusBadge>
          )}
        </div>

        <h1 className="mt-5 max-w-3xl text-display-lg font-extrabold uppercase tracking-tight text-ink">{course.title}</h1>
        <p className="prose-body mt-5 max-w-prose text-base sm:text-lg">{course.tagline}</p>
      </div>

      <div className="shell grid gap-12 pb-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="flex flex-col gap-10">
          <Block title="Overview">
            <p className="prose-body max-w-prose">{course.summary}</p>
          </Block>

          {course.outcomes.length ? (
            <Block title="What you will be able to do">
              <ul className="flex max-w-prose flex-col gap-3">
                {course.outcomes.map((outcome) => (
                  <li key={outcome.slice(0, 28)} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                    <span className="text-[0.9375rem] leading-relaxed text-muted">{outcome}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {course.modules.length ? (
            <Block title="Curriculum">
              <ol className="overflow-hidden rounded border-2 border-hard">
                {course.modules.map((module, i) => (
                  <li key={module.n} className={i ? 'border-t-2 border-hard' : ''}>
                    <div className="grid gap-3 p-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
                      <span className="font-mono text-[0.6875rem] text-accent-text">{module.n}</span>
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h3 className="text-base font-semibold text-ink">{module.title}</h3>
                          <span className="font-mono text-[0.6875rem] text-faint">
                            {module.duration}
                          </span>
                        </div>
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {module.topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex items-start gap-2.5 text-sm text-muted"
                            >
                              <span
                                className="mt-2.5 h-px w-3 shrink-0 bg-hard"
                                aria-hidden="true"
                              />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
          ) : (
            <Block title="Curriculum">
              <p className="prose-body max-w-prose">
                Being written. When it is ready it will appear here in full, with the same module
                breakdown as the other courses — not a summary.
              </p>
            </Block>
          )}

          {course.projects.length ? (
            <Block title="What you build">
              <ul className="flex max-w-prose flex-col gap-3">
                {course.projects.map((project) => (
                  <li key={project.slice(0, 28)} className="prose-body flex gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {course.prerequisites.length ? (
            <Block title="Prerequisites">
              <ul className="flex max-w-prose flex-col gap-3">
                {course.prerequisites.map((item) => (
                  <li key={item.slice(0, 28)} className="prose-body flex gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-hard" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          <Block title="Instructor">
            <div className="flex max-w-prose items-start gap-5">
              <img
                src="/images/profile.jpg"
                alt={`${profile.name}, portrait`}
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
                className="h-16 w-16 shrink-0 rounded border-2 border-hard object-cover"
              />
              <div>
                <p className="text-sm font-medium text-ink">{profile.name}</p>
                <p className="label mt-1">{profile.title}</p>
                <p className="prose-body mt-3 text-[0.9375rem]">
                  I teach what I use. The programmes are built from the same work written up under{' '}
                  <Link to="/work" className="link-underline text-ink">
                    Work
                  </Link>{' '}
                  and{' '}
                  <Link to="/labs" className="link-underline text-ink">
                    Labs
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Block>

          <Block title="Questions">
            <div className="max-w-prose overflow-hidden rounded border-2 border-hard">
              {courseFaq.slice(0, 4).map((entry, i) => (
                <details key={entry.q} className={`group bg-bg ${i ? 'border-t-2 border-hard' : ''}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-medium text-ink transition-colors hover:bg-surface-hover">
                    {entry.q}
                    <Plus
                      className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="prose-body px-5 pb-5 text-[0.9375rem]">{entry.a}</p>
                </details>
              ))}
            </div>
          </Block>
        </div>

        {/* Enrolment panel. Sticky on desktop so the price and the action stay
            reachable while reading a long curriculum. */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            {course.price ? (
              <>
                <p className="label">{course.price.note}</p>
                <p className="tabular mt-2 text-display-sm font-extrabold uppercase tracking-tight text-ink">
                  {course.price.display}
                </p>
              </>
            ) : (
              <>
                <p className="label">Pricing</p>
                <p className="mt-2 text-base text-ink">Not set yet</p>
              </>
            )}

            <dl className="mt-6 flex flex-col gap-4 border-t-2 border-hard pt-5">
              {[
                { label: 'Level', value: course.levelDetail },
                { label: 'Duration', value: course.duration },
                { label: 'Format', value: course.format },
                { label: 'Commitment', value: course.effort },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4">
                  <dt className="label">{row.label}</dt>
                  <dd className="text-right text-sm text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <Button to={enrolHref} size="lg" className="mt-7 w-full">
              {isPlanned ? 'Tell me when it opens' : 'Enquire and enrol'}
            </Button>

            <p className="prose-body mt-4 text-xs">
              {isPlanned
                ? 'No payment, no waitlist theatre — just a note when the curriculum and dates are set.'
                : 'Enquiring is not committing. I confirm cohort dates, setup and payment before anything else.'}
            </p>
          </div>
        </aside>
      </div>

      <nav className="shell border-t-2 border-hard py-10">
        <Link
          to="/learn"
          className="group inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All courses
        </Link>
      </nav>
    </>
  );
}
