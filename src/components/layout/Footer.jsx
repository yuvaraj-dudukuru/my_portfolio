import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, value: profile.email },
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
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
