import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { now } from '../data/now.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

const updated = new Date(now.updatedAt).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function Now() {
  return (
    <>
      <Seo
        title={pageMeta.now.title}
        description={pageMeta.now.description}
        path={pageMeta.now.path}
      />

      <PageHeader
        label="Now"
        title="What I am doing at the moment"
        lede={now.intro}
        meta={
          <>
            <span className="font-mono text-[0.6875rem] text-faint">
              Updated{' '}
              <time dateTime={now.updatedAt} className="text-muted">
                {updated}
              </time>
            </span>
            <span className="font-mono text-[0.6875rem] text-faint">{now.location}</span>
          </>
        }
      />

      <div className="shell flex flex-col gap-12 pb-10">
        {now.sections.map((section, sectionIndex) => (
          <Reveal key={section.id} as="section" delay={sectionIndex * 60}>
            <h2 className="label border-b-2 border-hard pb-4">{section.label}</h2>

            <ul className="mt-6 flex flex-col gap-6">
              {section.items.map((item) => (
                <li key={item.title} className="grid gap-2 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <h3 className="text-sm font-medium leading-snug text-ink">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="group inline-flex items-start gap-1.5 rounded transition-colors hover:text-accent-text"
                      >
                        {item.title}
                        <ArrowUpRight
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="prose-body max-w-prose text-[0.9375rem]">{item.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="border-t-2 border-hard pt-6">
          <p className="prose-body max-w-prose text-[0.9375rem]">
            This is a{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink"
            >
              now page
            </a>
            . It describes what has my attention at this point in time, not a permanent list of
            interests.
          </p>
        </Reveal>
      </div>
    </>
  );
}
