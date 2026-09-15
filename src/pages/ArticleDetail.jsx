import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { formatArticleDate } from '../components/cards/ArticleCard.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Tag from '../components/ui/Tag.jsx';
import { getArticle } from '../data/writing.js';
import Seo from '../seo/Seo.jsx';
import { articleMeta } from '../seo/routes.js';
import { articleSchema, breadcrumbSchema } from '../seo/schema.js';

// Blocks are a small, closed set rather than raw HTML: articles are data, and
// data should not be able to inject markup into the page.
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-12 text-display-sm font-bold tracking-tight text-ink">{block.text}</h2>;
    case 'h3':
      return <h3 className="mt-8 text-lg font-semibold text-ink">{block.text}</h3>;
    case 'ul':
      return (
        <ul className="mt-5 flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item.slice(0, 28)} className="flex gap-3 text-muted">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-hard" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <pre className="mt-6 overflow-x-auto rounded border-2 border-hard bg-bg-subtle p-4">
          <code className="font-mono text-[0.8125rem] leading-relaxed text-ink">{block.text}</code>
        </pre>
      );
    case 'quote':
      return (
        <blockquote className="mt-6 border-l-2 border-accent pl-5 text-ink">{block.text}</blockquote>
      );
    default:
      return <p className="mt-5 leading-[1.8] text-muted">{block.text}</p>;
  }
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) return <Navigate to="/404" replace />;

  const meta = articleMeta(article);

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        type="article"
        schema={[
          articleSchema(article, meta.path),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Writing', to: '/writing' },
            { label: article.title, to: meta.path },
          ]),
        ]}
      />

      <article className="shell pb-10 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { label: 'Writing', to: '/writing' },
            { label: article.title, to: meta.path },
          ]}
        />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <time dateTime={article.publishedAt} className="label">
            {formatArticleDate(article.publishedAt)}
          </time>
          <Tag>{article.category}</Tag>
          {article.readingMinutes ? (
            <span className="font-mono text-[0.6875rem] text-faint">
              {article.readingMinutes} min read
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 max-w-3xl text-display-lg font-extrabold tracking-tight text-ink">{article.title}</h1>
        <p className="prose-body mt-5 max-w-prose text-base sm:text-lg">{article.description}</p>

        <Reveal className="mt-12 max-w-prose border-t-2 border-hard pt-8 text-[0.9375rem] sm:text-base">
          {article.body.map((block, i) => (
            <Block key={`${block.type}-${i}`} block={block} />
          ))}
        </Reveal>
      </article>

      <nav className="shell border-t-2 border-hard py-10">
        <Link
          to="/writing"
          className="group inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All writing
        </Link>
      </nav>
    </>
  );
}
