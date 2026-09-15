// Writing.
//
// `articles` is intentionally empty — there is nothing published yet, and the
// Writing page says so rather than shipping filler posts. Adding a real article
// is a matter of pushing an object into this array; the index page, the article
// route, the sitemap and the Article structured data all read from here.
//
// Shape:
// {
//   slug: 'why-deterministic-matching',
//   title: '...',
//   description: 'One or two sentences. Used for the card and the meta description.',
//   category: 'AI',            // must exist in `writingCategories`
//   publishedAt: '2026-10-02', // ISO date
//   updatedAt: '',             // optional ISO date
//   readingMinutes: 7,
//   body: [                    // array of blocks, rendered by ArticleBody
//     { type: 'p', text: '...' },
//     { type: 'h2', text: '...' },
//     { type: 'ul', items: ['...', '...'] },
//     { type: 'code', lang: 'python', text: '...' },
//     { type: 'quote', text: '...' },
//   ],
// }

export const writingCategories = [
  'All',
  'AI',
  'Software Engineering',
  'Data Science',
  'Deployment',
  'Learning',
  'Emerging Technology',
];

export const articles = [];

// Shown on the Writing page while the archive is empty, so the section reads as
// deliberate rather than unfinished. These are topics, not promises of dates.
export const plannedTopics = [
  {
    title: 'Why the ranking should not live in the model',
    category: 'AI',
    note: 'What deterministic matching bought Career Co-Pilot, and what it cost.',
  },
  {
    title: 'A queue is not an optimisation',
    category: 'Software Engineering',
    note: 'Where in-process loops break, and why pacing beats throughput.',
  },
  {
    title: 'Teaching a thing is how you find out you do not understand it',
    category: 'Learning',
    note: 'What a hundred hours of live teaching changed about how I write code.',
  },
];

export function getArticle(slug) {
  return articles.find((item) => item.slug === slug) ?? null;
}

export const publishedArticles = [...articles].sort((a, b) =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
);

export default articles;
