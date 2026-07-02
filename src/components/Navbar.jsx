import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { personal } from '../config/personal.js';
import { useTheme } from '../context/ThemeContext.jsx';
import { navLinks } from '../data/navigation.js';
import Button from './ui/Button.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goAnchor = (e, anchor) => {
    e.preventDefault();
    const id = anchor.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToId(id), 100);
    } else {
      scrollToId(id);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-bg transition-all duration-200 ${
        scrolled ? 'border-b-4 border-ink' : 'border-b-4 border-transparent'
      }`}
    >
      <nav
        className="container-x flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={(e) => goAnchor(e, '#home')}
          className="flex items-center gap-2.5 focus-ring"
          aria-label={`${personal.name} — Home`}
        >
          <span className="flex h-9 w-9 items-center justify-center border-4 border-ink bg-accent heading-display text-sm font-bold text-ink shadow-neo">
            {personal.monogram}
          </span>
          <span className="hidden text-sm font-bold tracking-tight sm:inline-block">
            {personal.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={l.to}
                onClick={(e) => goAnchor(e, l.to)}
                className="border-4 border-transparent px-3 py-2 text-sm font-bold text-ink transition-colors hover:text-ink hover:border-ink hover:bg-bg-subtle focus-ring"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="neo-pressable hidden h-10 w-10 items-center justify-center bg-bg-raised text-ink focus-ring sm:inline-flex"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button
            as="a"
            href="#contact"
            onClick={(e) => goAnchor(e, '#contact')}
            size="sm"
            className="hidden md:inline-flex"
          >
            Work With Me
          </Button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="neo-pressable inline-flex h-10 w-10 items-center justify-center bg-bg-raised text-ink focus-ring md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="border-b-4 border-ink bg-bg-subtle md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.to}
                    onClick={(e) => goAnchor(e, l.to)}
                    className="block border-4 border-transparent px-3 py-2.5 text-sm font-bold text-ink hover:border-ink hover:bg-bg-raised hover:text-ink focus-ring"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-2">
                <Button
                  as="a"
                  href="#contact"
                  onClick={(e) => goAnchor(e, '#contact')}
                  size="sm"
                  className="flex-1"
                >
                  Work With Me
                </Button>
                <button
                  onClick={toggle}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  className="neo-pressable inline-flex h-10 w-10 items-center justify-center bg-bg-raised text-ink focus-ring"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
