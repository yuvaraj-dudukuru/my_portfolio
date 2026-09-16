import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusinessDetails from '../legal/BusinessDetails.jsx';
import EmailLink from '../ui/EmailLink.jsx';
import { navLinks } from '../../data/navigation.js';
import { profile } from '../../data/profile.js';

const elsewhere = [
  { label: 'GitHub', href: profile.socials.github, icon: Github, value: profile.socials.githubHandle },
  {
    label: 'LinkedIn',
    href: profile.socials.linkedin,
    icon: Linkedin,
    value: profile.socials.linkedinHandle,
  },
];

// Every route carries these, so a policy is never more than one click away.
// "Cookie Settings" points at /cookies today and becomes the button that opens
// the preference panel once there is anything to set (Phase 2).
const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Refund Policy', to: '/refund-policy' },
  { label: 'Cookie Policy', to: '/cookies' },
  { label: 'Cookie Settings', to: '/cookies#your-choices' },
];

export default function Footer() {
  return (
    <footer className="mt-section border-t-2 border-hard bg-bg-subtle">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded border-2 border-hard font-mono text-[0.6875rem] text-ink">
              {profile.monogram}
            </span>
            <span className="text-sm font-medium text-ink">{profile.name}</span>
          </div>
          <p className="prose-body mt-5 text-[0.9375rem]">{profile.positioning}</p>
          <p className="label mt-6">
            {profile.location} · {profile.timezone}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="label">Navigate</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {[...navLinks, { id: 'contact', label: 'Contact', to: '/contact' }].map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className="rounded text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label">Elsewhere</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded text-sm text-muted transition-colors hover:text-ink"
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
            <li>
              <EmailLink
                className="group inline-flex items-center gap-2.5 rounded text-sm text-muted transition-colors hover:text-ink"
                fallbackLabel="Email"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">Email</span>
              </EmailLink>
            </li>
            <li>
              <a
                href={profile.resumeUrl}
                className="rounded text-sm text-muted transition-colors hover:text-ink"
              >
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-hard">
        <BusinessDetails className="shell py-10" />
      </div>

      <div className="border-t-2 border-hard">
        <nav aria-label="Legal" className="shell py-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="rounded font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t-2 border-hard">
        <div className="shell flex flex-col items-start justify-between gap-2 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6875rem] text-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-[0.6875rem] text-faint">React · Vite · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
