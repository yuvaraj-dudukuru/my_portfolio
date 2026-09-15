import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { capabilities } from '../data/capabilities.js';
import { profile } from '../data/profile.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';
import { personSchema } from '../seo/schema.js';

const links = [
  { label: 'GitHub', value: profile.socials.githubHandle, href: profile.socials.github, icon: Github },
  {
    label: 'LinkedIn',
    value: profile.socials.linkedinHandle,
    href: profile.socials.linkedin,
    icon: Linkedin,
  },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Résumé', value: 'PDF', href: profile.resumeUrl, icon: FileText },
];

export default function About() {
  return (
    <>
      <Seo
        title={pageMeta.about.title}
        description={pageMeta.about.description}
        path={pageMeta.about.path}
        schema={[personSchema()]}
      />

      <PageHeader
        label="About"
        title="Engineer, builder, and the person teaching the course"
        lede={profile.positioning}
      />

      <div className="shell grid gap-12 pb-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div className="flex flex-col gap-10">
          <Reveal className="max-w-prose border-t-2 border-hard pt-8">
            <div className="prose-body text-base">
              {profile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p>
                The three strands feed each other. Building gives the teaching something real to
                point at; teaching exposes the parts of a system I only thought I understood; and
                the experiments under{' '}
                <Link to="/labs" className="link-underline text-ink">
                  Labs
                </Link>{' '}
                are where ideas go before they are good enough to be either.
              </p>
            </div>
          </Reveal>

          <Reveal as="section" className="border-t-2 border-hard pt-8">
            <h2 className="label">Roles</h2>
            <ul className="mt-6 flex flex-col gap-5">
              {profile.roles.map((role) => (
                <li
                  key={`${role.role}-${role.org}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-hard pb-4"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{role.org}</p>
                    <p className="mt-1 text-sm text-muted">{role.role}</p>
                  </div>
                  <span className="font-mono text-[0.6875rem] text-faint">{role.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="border-t-2 border-hard pt-8">
            <h2 className="label">What I work on</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <li key={capability.id}>
                  <p className="font-mono text-[0.6875rem] text-accent-text">{capability.index}</p>
                  <h3 className="mt-2 text-base font-semibold text-ink">{capability.title}</h3>
                  <p className="prose-body mt-2 text-[0.9375rem]">{capability.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="border-t-2 border-hard pt-8">
            <h2 className="label">Certifications</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {profile.credentials.map((credential) => (
                <li
                  key={credential.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                >
                  <span className="text-sm text-ink">{credential.label}</span>
                  <span className="font-mono text-[0.6875rem] text-faint">{credential.issuer}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="border-t-2 border-hard pt-8">
            <h2 className="label">Current direction</h2>
            <p className="prose-body mt-5 max-w-prose">
              Deeper into AI engineering — the part that is retrieval, evaluation and cost rather
              than model architecture — while building out the teaching platform so the courses can
              run at more than one-to-one.{' '}
              <Link to="/now" className="link-underline text-ink">
                The now page
              </Link>{' '}
              has the current detail.
            </p>
          </Reveal>
        </div>

        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <img
            src="/images/profile.jpg"
            alt={`${profile.name}, portrait`}
            width="512"
            height="512"
            loading="lazy"
            decoding="async"
            className="w-40 rounded border-2 border-hard object-cover"
          />

          <dl className="flex flex-col gap-5">
            <div className="border-t-2 border-hard pt-3">
              <dt className="label">Based in</dt>
              <dd className="mt-1.5 text-sm text-ink">{profile.location}</dd>
            </div>
            <div className="border-t-2 border-hard pt-3">
              <dt className="label">Timezone</dt>
              <dd className="mt-1.5 text-sm text-ink">{profile.timezone}</dd>
            </div>
          </dl>

          <ul className="flex flex-col gap-3 border-t-2 border-hard pt-5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-3 rounded text-sm text-muted transition-colors hover:text-ink"
                >
                  <link.icon className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{link.value}</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
