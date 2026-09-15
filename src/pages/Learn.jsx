import { ArrowRight, Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/cards/CourseCard.jsx';
import Button from '../components/ui/Button.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { courseFaq, courses, getCourse, mentoring, paths } from '../data/courses.js';
import { profile } from '../data/profile.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

const principles = [
  {
    title: 'Live, not pre-recorded',
    body: 'Sessions are online and interactive. You write code during them and ask questions while you are stuck, not three days later in a comment thread.',
  },
  {
    title: 'Built around a project',
    body: 'Every programme ends in something that runs, chosen with you. That is the deliverable — the curriculum exists to get you there.',
  },
  {
    title: 'Reviewed line by line',
    body: 'Your code gets read properly. Most of the useful learning happens in that review, not in the lecture.',
  },
];

export default function Learn() {
  return (
    <>
      <Seo
        title={pageMeta.learn.title}
        description={pageMeta.learn.description}
        path={pageMeta.learn.path}
      />

      <PageHeader
        label="Learn"
        title="Learn to build the things on the rest of this site"
        lede="Live, online, project-based programmes in Python, AI and data science, and web development — taught by someone who is still shipping production code, not reciting a syllabus."
        actions={
          <>
            <Button href="#courses" size="lg">
              Browse courses
            </Button>
            <Button to="/contact" size="lg" variant="secondary">
              Ask a question
            </Button>
          </>
        }
      />

      <section id="courses" className="shell scroll-mt-24 pb-4 pt-6" aria-labelledby="courses-title">
        <h2 id="courses-title" className="sr-only">
          Courses
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map((course, i) => (
            <Reveal key={course.slug} delay={i * 50} className="h-full">
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="paths-title">
        <SectionHeader
          id="paths-title"
          index="01"
          label="Learning paths"
          title="Sequences, not a catalogue"
          description="A path is the order I would actually teach these in. Stages that do not exist yet are marked — a path with gaps is more useful than a path that pretends it has none."
        />

        <div className="mt-12 flex flex-col gap-12">
          {paths.map((path) => (
            <Reveal key={path.slug} id={path.slug} as="article" className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-hard pb-5">
                <h3 className="text-display-sm font-extrabold uppercase tracking-tight text-ink">
                  {path.title}
                </h3>
                <p className="font-mono text-[0.6875rem] text-faint">
                  {path.steps.filter((step) => step.course).length} of {path.steps.length} stages
                  available
                </p>
              </div>
              <p className="prose-body mt-5 max-w-prose">{path.summary}</p>

              <ol className="mt-8 grid gap-0.5 overflow-hidden border-2 border-hard bg-hard sm:grid-cols-2 lg:grid-cols-3">
                {path.steps.map((step, i) => {
                  const course = step.course ? getCourse(step.course) : null;
                  const available = Boolean(course);
                  return (
                    <li key={`${path.slug}-${step.title}`} className="bg-bg p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[0.6875rem] text-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {available ? (
                          <Check className="h-3.5 w-3.5 text-positive" aria-hidden="true" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
                        )}
                      </div>
                      <p className="mt-3 text-sm font-medium text-ink">{step.title}</p>
                      {available ? (
                        <Link
                          to={`/learn/${course.slug}`}
                          className="mt-2 inline-flex items-center gap-1.5 rounded font-mono text-[0.6875rem] text-muted transition-colors hover:text-accent-text"
                        >
                          {course.code}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      ) : (
                        <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed text-faint">
                          {step.note ?? 'Planned'}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section border-y-2 border-hard bg-bg-subtle" aria-labelledby="how-title">
        <div className="shell">
          <SectionHeader
            id="how-title"
            index="02"
            label="How it works"
            title="Three things that do not change"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 60} className="border-t-2 border-hard pt-5">
                <h3 className="text-base font-semibold text-ink">{principle.title}</h3>
                <p className="prose-body mt-3 text-[0.9375rem]">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="mentoring-title">
        <SectionHeader
          id="mentoring-title"
          index="03"
          label="1:1"
          title={mentoring.title}
          description={mentoring.tagline}
        />

        <Reveal className="card mt-12 flex flex-col gap-8 p-7 md:flex-row md:items-center md:justify-between sm:p-8">
          <ul className="flex flex-col gap-3">
            {mentoring.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 flex-col gap-3">
            <StatusBadge tone="positive">Taking enquiries</StatusBadge>
            <Button to={`/contact?subject=${encodeURIComponent(mentoring.enrollSubject)}`}>
              Enquire about mentoring
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="section shell" aria-labelledby="faq-title">
        <SectionHeader id="faq-title" index="04" label="FAQ" title="Before you ask" />

        <Reveal className="mt-12 max-w-3xl overflow-hidden rounded border-2 border-hard">
          {courseFaq.map((entry, i) => (
            <details
              key={entry.q}
              className={`group bg-bg ${i ? 'border-t-2 border-hard' : ''}`}
            >
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
        </Reveal>

        <Reveal className="mt-8">
          <p className="prose-body text-[0.9375rem]">
            Still unsure which programme fits?{' '}
            <Link to="/contact" className="link-underline text-ink">
              Tell me what you want to build
            </Link>{' '}
            and I will point you at the right one — or tell you that none of them are, which happens.
          </p>
          <p className="label mt-6">
            Taught by {profile.name} · {profile.location}
          </p>
        </Reveal>
      </section>
    </>
  );
}
