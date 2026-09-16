import { ArrowRight, GraduationCap, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/profile.js';
import EmailLink from '../ui/EmailLink.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import WhatsAppLink from '../ui/WhatsAppLink.jsx';

// Two audiences, two destinations, one section. Recruiters and collaborators go
// left; students go right. Neither path is buried behind the other.
const routes = [
  {
    to: '/contact',
    icon: Mail,
    label: 'Work together',
    description:
      'Engineering work, collaboration, internships, or a question about something on this site.',
    action: 'Start a conversation',
  },
  {
    to: '/learn',
    icon: GraduationCap,
    label: 'Learn with me',
    description:
      'Live cohorts in Python, AI and data science, and web development, plus 1:1 mentoring.',
    action: 'See courses',
  },
];

export default function ContactCta() {
  return (
    <section className="section shell" aria-labelledby="contact-cta">
      <SectionHeader
        id="contact-cta"
        index="08"
        label="Contact"
        title="Two ways in"
        description={`Based in ${profile.location}. I read everything that arrives and reply to what I can.`}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {routes.map((route, i) => (
          <Reveal key={route.to} delay={i * 70} className="h-full">
            <Link to={route.to} className="card-interactive group flex h-full flex-col p-7 sm:p-8">
              <route.icon className="h-5 w-5 text-faint" aria-hidden="true" />
              <h3 className="mt-6 text-display-sm font-extrabold uppercase tracking-tight text-ink">
                {route.label}
              </h3>
              <p className="prose-body mt-3 flex-1 text-[0.9375rem]">{route.description}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-accent-text">
                {route.action}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
        <EmailLink
          className="link-underline rounded font-mono text-xs text-muted transition-colors hover:text-ink"
          fallbackLabel="Email"
        />
        <WhatsAppLink
          className="link-underline rounded font-mono text-xs text-muted transition-colors hover:text-ink"
          showNumber
        />
      </Reveal>
    </section>
  );
}
