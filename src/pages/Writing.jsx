import { useMemo, useState } from 'react';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Tag from '../components/ui/Tag.jsx';
import { plannedTopics, publishedArticles, writingCategories } from '../data/writing.js';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

export default function Writing() {
  const [category, setCategory] = useState('All');
  const hasArticles = publishedArticles.length > 0;

  const filtered = useMemo(
    () =>
      category === 'All'
        ? publishedArticles
        : publishedArticles.filter((article) => article.category === category),
    [category],
  );

  return (
    <>
      <Seo
        title={pageMeta.writing.title}
        description={pageMeta.writing.description}
        path={pageMeta.writing.path}
      />

      <PageHeader
        label="Writing"
        title="Working notes, not content"
        lede="Explanations of decisions taken while building the things under Work and Labs. Written when there is something worth saying, which is why there is nothing here yet."
      />

      <div className="shell pb-10">
        {hasArticles ? (
          <>
            <div
              role="group"
              aria-label="Filter writing by category"
              className="flex flex-wrap items-center gap-3 border-b-2 border-hard pb-8"
            >
              {writingCategories.map((item) => {
                const isActive = category === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={isActive}
                    className={`nb-press h-10 cursor-pointer border-2 border-hard px-3.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.1em] shadow-nb-sm ${
                      isActive ? 'bg-accent text-accent-ink' : 'bg-surface text-ink'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Cards carry h3 headings; keeps the outline from skipping h2. */}
            <h2 className="sr-only">Articles</h2>

            <div>
              {filtered.map((article, i) => (
                <Reveal key={article.slug} delay={i * 50}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal>
            <EmptyState
              label="Archive empty"
              title="Nothing published yet"
              description="These are the pieces actually being drafted. When one is finished it will appear here, and not before."
            >
              <ul className="flex w-full flex-col gap-4 text-left">
                {plannedTopics.map((topic) => (
                  <li key={topic.title} className="border-t-2 border-hard pt-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="text-sm font-medium text-ink">{topic.title}</h2>
                      <Tag tone="muted">{topic.category}</Tag>
                    </div>
                    <p className="prose-body mt-2 text-[0.9375rem]">{topic.note}</p>
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="secondary">
                Tell me what to write about
              </Button>
            </EmptyState>
          </Reveal>
        )}
      </div>
    </>
  );
}
