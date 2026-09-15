// The canonical route table.
//
// One module, three consumers:
//   1. Pages, which read their own title/description from `pageMeta`.
//   2. scripts/generate-seo.mjs, which bakes a static <head> per route into
//      dist/ at build time so crawlers do not depend on JS execution.
//   3. The sitemap generator, which walks `allRoutes()`.
//
// Because Node imports this directly, nothing in this file (or anything it
// imports) may touch `import.meta.env`, the DOM, or JSX.

import { site } from '../data/site.js';
import { work } from '../data/work.js';
import { labs } from '../data/labs.js';
import { courses } from '../data/courses.js';
import { articles } from '../data/writing.js';

export function formatTitle(meta) {
  if (!meta?.title) return site.defaultTitle;
  return meta.rawTitle ? meta.title : `${meta.title} — ${site.titleSuffix}`;
}

export const pageMeta = {
  home: {
    path: '/',
    rawTitle: true,
    title: site.defaultTitle,
    description: site.description,
    priority: 1.0,
  },
  work: {
    path: '/work',
    title: 'Work',
    description:
      'Engineering case studies: the problem, the architecture, the decisions that mattered, and what actually shipped.',
    priority: 0.9,
  },
  labs: {
    path: '/labs',
    title: 'Labs',
    description:
      'Experiments, prototypes and small research builds — WebGL, AI, automation and developer tooling, finished or otherwise.',
    priority: 0.8,
  },
  learn: {
    path: '/learn',
    title: 'Learn',
    description:
      'Project-based courses and learning paths in Python, AI and data science, and web development. Live online cohorts and 1:1 mentoring.',
    priority: 0.9,
  },
  writing: {
    path: '/writing',
    title: 'Writing',
    description:
      'Notes on AI engineering, software design, data science and shipping things — written while building, not after.',
    priority: 0.7,
  },
  now: {
    path: '/now',
    title: 'Now',
    description:
      'What I am building, learning, teaching and exploring at the moment. Updated as things change.',
    priority: 0.6,
  },
  about: {
    path: '/about',
    title: 'About',
    description:
      'AI and data science engineer, builder and technology educator, based in Hyderabad. Background, current direction and how to reach me.',
    priority: 0.8,
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    description:
      'Get in touch about engineering work, collaboration, internships, courses or mentoring.',
    priority: 0.7,
  },
  notFound: {
    path: '/404',
    title: 'Page not found',
    description: 'That page does not exist.',
    noindex: true,
  },
};

export function workMeta(item) {
  return {
    path: `/work/${item.slug}`,
    title: `${item.title} case study`,
    description: item.oneLiner,
    priority: 0.7,
  };
}

export function labMeta(item) {
  return {
    path: `/labs/${item.slug}`,
    title: `Lab ${item.index}: ${item.title}`,
    description: item.summary,
    priority: 0.5,
  };
}

export function courseMeta(item) {
  return {
    path: `/learn/${item.slug}`,
    title: `${item.title} course`,
    description: item.tagline,
    priority: 0.8,
  };
}

export function articleMeta(item) {
  return {
    path: `/writing/${item.slug}`,
    title: item.title,
    description: item.description,
    priority: 0.6,
    lastmod: item.updatedAt || item.publishedAt,
  };
}

// Every indexable URL, used for prerendered head tags and the sitemap.
export function allRoutes() {
  const staticRoutes = Object.values(pageMeta).filter((m) => !m.noindex);
  return [
    ...staticRoutes,
    ...work.map(workMeta),
    ...labs.map(labMeta),
    ...courses.map(courseMeta),
    ...articles.map(articleMeta),
  ];
}

export default pageMeta;
