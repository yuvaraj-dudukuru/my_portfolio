// Site-wide constants. Kept free of `import.meta.env` so that the build-time SEO
// script (scripts/generate-seo.mjs) can import this module directly in Node.

export const site = {
  url: 'https://yuvarajdevs.tech',
  name: 'Yuvaraj Dudukuru',
  shortName: 'YuvarajDevs',
  // Appended to page titles; the home page uses `defaultTitle` instead.
  titleSuffix: 'Yuvaraj Dudukuru',
  defaultTitle: 'Yuvaraj Dudukuru — AI & Data Science Engineer',
  description:
    'I build software, explore emerging technology, and teach what I learn. Engineering work, experiments, and courses in AI, data science and full-stack development.',
  locale: 'en_IN',
  // TODO: replace with a purpose-made 1200x630 share image. Until one exists we
  // point at the real portrait and declare a `summary` card, not a large one.
  ogImage: '/images/profile.jpg',
  ogImageWidth: 512,
  ogImageHeight: 512,
  ogImageAlt: 'Portrait of Yuvaraj Dudukuru',
};

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export default site;
