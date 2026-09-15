import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { navLinks } from '../data/navigation.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

export default function NotFound() {
  return (
    <>
      <Seo
        title={pageMeta.notFound.title}
        description={pageMeta.notFound.description}
        path="/404"
        noindex
      />

      <div className="shell flex min-h-[70vh] flex-col justify-center py-28">
        <p className="label">Error 404</p>
        <h1 className="mt-5 max-w-2xl text-display-lg font-extrabold uppercase tracking-tight text-ink">
          That page does not exist
        </h1>
        <p className="prose-body mt-5 max-w-prose">
          Either the link is wrong, or something moved when this site was rebuilt. Everything is one
          of these:
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.to}
                className="inline-flex h-10 items-center rounded border-2 border-hard px-3.5 text-sm text-muted transition-colors hover:border-hard hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" size="lg">
            Back home
          </Button>
          <Button to="/contact" size="lg" variant="secondary">
            Report a broken link
          </Button>
        </div>
      </div>
    </>
  );
}
