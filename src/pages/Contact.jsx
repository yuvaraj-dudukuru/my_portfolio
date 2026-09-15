import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { profile } from '../data/profile.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    note: 'Best for anything with detail',
  },
  {
    label: 'WhatsApp',
    value: profile.whatsappNumber,
    href: profile.whatsappUrl,
    icon: MessageCircle,
    note: 'Fastest, best for course questions',
  },
  {
    label: 'LinkedIn',
    value: profile.socials.linkedinHandle,
    href: profile.socials.linkedin,
    icon: Linkedin,
    note: 'Professional enquiries',
  },
  {
    label: 'GitHub',
    value: profile.socials.githubHandle,
    href: profile.socials.github,
    icon: Github,
    note: 'Code, issues and pull requests',
  },
];

export default function Contact() {
  return (
    <>
      <Seo
        title={pageMeta.contact.title}
        description={pageMeta.contact.description}
        path={pageMeta.contact.path}
      />

      <PageHeader
        label="Contact"
        title="Say what you need"
        lede="Engineering work, collaboration, an internship, a course question, or something you think I got wrong on this site — all of it lands in the same inbox."
        meta={
          <>
            <span className="font-mono text-[0.6875rem] text-faint">{profile.location}</span>
            <span className="font-mono text-[0.6875rem] text-faint">{profile.timezone}</span>
            <span className="font-mono text-[0.6875rem] text-faint">Replies in 1–2 days</span>
          </>
        }
      />

      <div className="shell grid gap-10 pb-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="card-interactive group flex items-center gap-4 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border-2 border-hard text-faint transition-colors group-hover:border-accent group-hover:text-accent-text">
                <channel.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label block">{channel.label}</span>
                <span className="mt-1 block truncate text-sm text-ink">{channel.value}</span>
                <span className="mt-0.5 block text-xs text-faint">{channel.note}</span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}

          <p className="prose-body mt-3 text-xs">
            No newsletter, no automated sequence. Messages go straight to me.
          </p>
        </Reveal>
      </div>
    </>
  );
}
