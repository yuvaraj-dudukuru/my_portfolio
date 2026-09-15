import { publishedArticles, plannedTopics } from '../../data/writing.js';
import ArticleCard from '../cards/ArticleCard.jsx';
import Button from '../ui/Button.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Tag from '../ui/Tag.jsx';

export default function WritingPreview() {
  const hasArticles = publishedArticles.length > 0;

  return (
    <section className="section shell" aria-labelledby="writing-preview">
      <SectionHeader
        id="writing-preview"
        index="05"
        label="Writing"
        title="Notes from inside the work"
        description="Decisions are more useful written down than remembered. These are the ones worth explaining."
        action={hasArticles ? { label: 'All writing', to: '/writing' } : undefined}
      />

      <div className="mt-12">
        {hasArticles ? (
          publishedArticles.slice(0, 3).map((article, i) => (
            <Reveal key={article.slug} delay={i * 60}>
              <ArticleCard article={article} />
            </Reveal>
          ))
        ) : (
          <Reveal>
            <EmptyState
              label="No posts yet"
              title="The first articles are in progress"
              description="Rather than publish filler, here is what is actually being written."
            >
              <ul className="flex w-full flex-col gap-3 text-left">
                {plannedTopics.map((topic) => (
                  <li
                    key={topic.title}
                    className="flex flex-col gap-2 border-t-2 border-hard pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-sm font-medium text-ink">{topic.title}</span>
                    <Tag tone="muted">{topic.category}</Tag>
                  </li>
                ))}
              </ul>
              <Button to="/writing" variant="secondary" size="md">
                Writing
              </Button>
            </EmptyState>
          </Reveal>
        )}
      </div>
    </section>
  );
}
