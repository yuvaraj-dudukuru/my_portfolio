import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tag from '../ui/Tag.jsx';

export function formatArticleDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Writing stays quieter than the rest of the site on purpose — an article list
 * is for reading, so it gets a left rule and a hover fill rather than a full
 * shadowed block.
 */
export default function ArticleCard({ article }) {
  return (
    <article className="group relative border-l-4 border-line py-6 pl-5 transition-colors duration-150 hover:border-accent hover:bg-surface sm:pl-7">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <time
          dateTime={article.publishedAt}
          className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint"
        >
          {formatArticleDate(article.publishedAt)}
        </time>
        <Tag>{article.category}</Tag>
        {article.readingMinutes ? (
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
            {article.readingMinutes} min read
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 max-w-2xl text-display-sm font-extrabold leading-tight tracking-tight text-ink">
        <Link to={`/writing/${article.slug}`} className="stretched">
          {article.title}
        </Link>
      </h3>
      <p className="prose-body mt-3 max-w-prose">{article.description}</p>

      <span
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-faint transition-colors group-hover:text-ink"
        aria-hidden="true"
      >
        Read
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
