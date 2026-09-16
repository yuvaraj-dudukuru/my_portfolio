/**
 * Post-build SEO pass.
 *
 * A client-rendered SPA hands crawlers one <head> for every URL. Rather than
 * move the whole site to a framework with SSR, this walks the same route table
 * the app uses and writes a static copy of dist/index.html per route with the
 * correct title, description, canonical, Open Graph tags and JSON-LD baked in.
 * The React bundle still hydrates and takes over navigation; the difference is
 * that the first byte of every URL is already correct.
 *
 * Vercel checks the filesystem before applying the SPA rewrite, so dist/work/
 * index.html is served for /work and the rewrite only catches genuinely unknown
 * paths.
 *
 * Also emits sitemap.xml from the same source, so the sitemap cannot drift from
 * what the site actually renders.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, absoluteUrl } from '../src/data/site.js';
import { work } from '../src/data/work.js';
import { labs } from '../src/data/labs.js';
import { courses } from '../src/data/courses.js';
import { articles } from '../src/data/writing.js';
import {
  articleMeta,
  courseMeta,
  formatTitle,
  labMeta,
  pageMeta,
  workMeta,
} from '../src/seo/routes.js';
import {
  articleSchema,
  breadcrumbSchema,
  courseSchema,
  personSchema,
  projectSchema,
  websiteSchema,
} from '../src/seo/schema.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const crumbs = (label, indexPath, title, path) =>
  breadcrumbSchema([
    { label: 'Home', to: '/' },
    { label, to: indexPath },
    { label: title, to: path },
  ]);

function buildEntries() {
  return [
    { meta: pageMeta.home, schema: [personSchema(), websiteSchema()] },
    { meta: pageMeta.work, schema: [] },
    { meta: pageMeta.labs, schema: [] },
    { meta: pageMeta.learn, schema: [] },
    { meta: pageMeta.writing, schema: [] },
    { meta: pageMeta.now, schema: [] },
    { meta: pageMeta.about, schema: [personSchema()] },
    { meta: pageMeta.contact, schema: [] },

    { meta: pageMeta.privacy, schema: [] },
    { meta: pageMeta.terms, schema: [] },
    { meta: pageMeta.refundPolicy, schema: [] },
    { meta: pageMeta.cookies, schema: [] },

    ...work.map((item) => {
      const meta = workMeta(item);
      return {
        meta,
        type: 'article',
        schema: [projectSchema(item, meta.path), crumbs('Work', '/work', item.title, meta.path)],
      };
    }),

    ...labs.map((item) => {
      const meta = labMeta(item);
      return {
        meta,
        type: 'article',
        schema: [
          ...(item.links.source ? [projectSchema(item, meta.path)] : []),
          crumbs('Labs', '/labs', item.title, meta.path),
        ],
      };
    }),

    ...courses.map((item) => {
      const meta = courseMeta(item);
      return {
        meta,
        schema: [courseSchema(item, meta.path), crumbs('Learn', '/learn', item.title, meta.path)],
      };
    }),

    ...articles.map((item) => {
      const meta = articleMeta(item);
      return {
        meta,
        type: 'article',
        schema: [
          articleSchema(item, meta.path),
          crumbs('Writing', '/writing', item.title, meta.path),
        ],
      };
    }),
  ];
}

function renderHead(template, entry) {
  const { meta, schema = [], type = 'website' } = entry;
  const title = escapeAttr(formatTitle(meta));
  const description = escapeAttr(meta.description);
  const canonical = escapeAttr(absoluteUrl(meta.path));

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<link rel="canonical"[^>]*\/>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(/<meta property="og:type"[^>]*\/>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(
      /<meta property="og:title"[^>]*\/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta name="twitter:title"[^>]*\/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );

  if (entry.noindex) {
    html = html.replace(
      '</head>',
      `    <meta name="robots" content="noindex, follow" />\n  </head>`,
    );
  }

  if (schema.length) {
    // data-seo-managed matches what <Seo> looks for, so the client replaces
    // these blocks on navigation instead of duplicating them.
    const blocks = schema
      .map(
        (block) =>
          `    <script type="application/ld+json" data-seo-managed>${JSON.stringify(block)}</script>`,
      )
      .join('\n');
    html = html.replace('</head>', `${blocks}\n  </head>`);
  }

  return html;
}

function renderSitemap(entries) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = entries
    .map(({ meta }) => {
      const priority = (meta.priority ?? 0.5).toFixed(1);
      return [
        '  <url>',
        `    <loc>${absoluteUrl(meta.path)}</loc>`,
        `    <lastmod>${meta.lastmod ?? today}</lastmod>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const template = await readFile(join(dist, 'index.html'), 'utf8');
  const entries = buildEntries();

  for (const entry of entries) {
    const html = renderHead(template, entry);
    const target =
      entry.meta.path === '/'
        ? join(dist, 'index.html')
        : join(dist, entry.meta.path.replace(/^\//, ''), 'index.html');

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
  }

  // A static 404 document, so hosts that serve one (GitHub Pages) show the real
  // page rather than their default. Vercel uses the SPA rewrite and ignores it.
  await writeFile(
    join(dist, '404.html'),
    renderHead(template, { meta: pageMeta.notFound, noindex: true, schema: [] }),
    'utf8',
  );

  await writeFile(join(dist, 'sitemap.xml'), renderSitemap(entries), 'utf8');

  console.log(
    `[seo] wrote ${entries.length} prerendered documents and sitemap.xml for ${site.url}`,
  );
}

main().catch((error) => {
  console.error('[seo] failed:', error);
  process.exit(1);
});
