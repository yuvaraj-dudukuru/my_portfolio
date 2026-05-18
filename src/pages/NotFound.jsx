import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-24">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative max-w-xl text-center">
        <p className="heading-display text-7xl font-semibold gradient-text">404</p>
        <h1 className="heading-display mt-4 text-2xl font-semibold text-ink sm:text-3xl">
          That page wandered off.
        </h1>
        <p className="mt-3 text-base text-ink-muted">
          The link you followed might be broken, or the page may have moved.
          Let&apos;s get you back to something useful.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button as={Link} to="/" size="md">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Button>
          <Button as={Link} to="/#projects" size="md" variant="secondary">
            See projects
          </Button>
        </div>
      </div>
    </section>
  );
}
