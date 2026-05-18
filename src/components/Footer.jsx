import { Github, Linkedin, Mail } from 'lucide-react';
import { personal } from '../config/personal.js';
import { navLinks } from '../data/navigation.js';

export default function Footer() {
  return (
    <footer className="border-t border-bg-border bg-bg-subtle/40">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-bg-border bg-bg-raised heading-display text-sm font-bold gradient-text">
              {personal.monogram}
            </span>
            <span className="text-sm font-semibold">{personal.name}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-muted">
            {personal.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Navigate
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={l.to}
                  className="text-ink-muted hover:text-ink focus-ring rounded"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Connect
          </p>
          <div className="mt-4 flex items-center gap-2">
            <SocialIcon
              href={`mailto:${personal.email}`}
              label="Email"
              icon={<Mail className="h-4 w-4" />}
            />
            <SocialIcon
              href={personal.socials.github}
              label="GitHub"
              icon={<Github className="h-4 w-4" />}
            />
            <SocialIcon
              href={personal.socials.linkedin}
              label="LinkedIn"
              icon={<Linkedin className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-bg-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
          <span className="font-mono">Built with React, Vite & Tailwind.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, icon }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-bg-border bg-bg-raised text-ink-muted transition-colors hover:text-ink hover:border-accent/40 focus-ring"
    >
      {icon}
    </a>
  );
}
