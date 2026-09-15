import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../../data/navigation.js';
import { profile } from '../../data/profile.js';
import Button from '../ui/Button.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Close the sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // While the sheet is open: lock scroll, trap focus inside it, close on Escape,
  // and hand focus back to the trigger afterwards.
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector(FOCUSABLE)?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const nodes = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // The active route is a filled block, not a tinted label: "where am I" should
  // be readable at a glance and without relying on colour alone (it is also the
  // only item with a solid border).
  const linkClass = ({ isActive }) =>
    [
      'inline-flex h-9 items-center border-2 px-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] transition-colors duration-150',
      isActive
        ? 'border-hard bg-accent text-accent-ink'
        : 'border-transparent text-ink hover:border-hard hover:bg-surface',
    ].join(' ');

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-hard bg-bg">
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Primary">
        {/* Home is not in the nav list, so the wordmark carries its own active
            state — otherwise no item is marked on "/" and the header stops
            answering "where am I". */}
        <NavLink
          to="/"
          end
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — home`}
        >
          {({ isActive }) => (
            <>
              <span className="flex h-9 w-9 items-center justify-center border-2 border-hard bg-accent font-mono text-xs font-bold text-accent-ink">
                {profile.monogram}
              </span>
              <span
                className={`hidden text-sm font-bold uppercase tracking-tight text-ink sm:block ${
                  isActive ? 'border-b-2 border-accent' : 'border-b-2 border-transparent'
                }`}
              >
                {profile.name}
              </span>
            </>
          )}
        </NavLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button to="/contact" size="sm" className="hidden sm:inline-flex">
            Contact
          </Button>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="nb-press inline-flex h-11 w-11 cursor-pointer items-center justify-center border-2 border-hard bg-surface text-ink shadow-nb-sm lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation: a full sheet with large targets, not a squeezed
          desktop menu. Rendered only when open so nothing is focusable behind. */}
      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 animate-sheet-in overflow-y-auto border-t-2 border-hard bg-bg lg:hidden"
        >
          <div className="shell flex min-h-full flex-col py-6">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <li key={link.id}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        'nb-press flex items-center gap-4 border-2 border-hard px-4 py-4 text-2xl font-extrabold uppercase tracking-tight shadow-nb',
                        isActive ? 'bg-accent text-accent-ink' : 'bg-surface text-ink',
                      ].join(' ')
                    }
                  >
                    <span className="font-mono text-[0.6875rem] font-bold tracking-[0.14em] opacity-60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4">
              <Button to="/contact" size="lg" className="w-full">
                Get in touch
              </Button>
              <a
                href={`mailto:${profile.email}`}
                className="py-2 text-center font-mono text-xs uppercase tracking-[0.12em] text-faint transition-colors hover:text-ink"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
