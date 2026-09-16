import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import BusinessDetails from '../components/legal/BusinessDetails.jsx';
import EmailLink from '../components/ui/EmailLink.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import WhatsAppLink from '../components/ui/WhatsAppLink.jsx';
import { profile } from '../data/profile.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

// Email and WhatsApp are the odd ones out: both render through a component that
// assembles the real destination after mount, so neither a personal address nor
// a personal number appears in a prerendered document. Until then each is a
// link to the form on this page. The rest are ordinary anchors.
const channels = [
  {
    id: 'email',
    label: 'Email',
    value: 'Best for anything with detail',
    icon: Mail,
    note: 'Opens your mail app, or the form on this page',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Fastest route for a quick question',
    icon: MessageCircle,
    note: 'Opens WhatsApp, or the form on this page',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: profile.socials.linkedinHandle,
    href: profile.socials.linkedin,
    icon: Linkedin,
    note: 'Professional enquiries',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: profile.socials.githubHandle,
    href: profile.socials.github,
    icon: Github,
    note: 'Code, issues and pull requests',
  },
];

const CHANNEL_CLASS = 'card-interactive group flex items-center gap-4 p-5';

function ChannelBody({ channel }) {
  return (
    <>
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
    </>
  );
}

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
          {channels.map((channel) =>
            channel.id === 'email' ? (
              <EmailLink key={channel.id} className={CHANNEL_CLASS}>
                <ChannelBody channel={channel} />
              </EmailLink>
            ) : channel.id === 'whatsapp' ? (
              <WhatsAppLink key={channel.id} className={CHANNEL_CLASS}>
                <ChannelBody channel={channel} />
              </WhatsAppLink>
            ) : (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className={CHANNEL_CLASS}
              >
                <ChannelBody channel={channel} />
              </a>
            ),
          )}

          <p className="prose-body mt-3 text-xs">
            No newsletter, no automated sequence. Messages go straight to me.
          </p>
        </Reveal>
      </div>

      <section className="shell border-t-2 border-hard py-12" aria-labelledby="business-details">
        <BusinessDetails variant="full" headingId="business-details" />
      </section>
    </>
  );
}
