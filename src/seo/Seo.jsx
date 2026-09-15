import { useEffect } from 'react';
import { site, absoluteUrl } from '../data/site.js';
import { formatTitle } from './routes.js';

// Runtime <head> manager. Deliberately dependency-free — react-helmet-async is
// ~8kb gzipped to do roughly this, and the build-time prerenderer
// (scripts/generate-seo.mjs) already writes the same tags statically, so this
// only has to keep things correct during client-side navigation.

const MANAGED = 'data-seo-managed';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * @param {object}   props
 * @param {string}   props.title        Page title, without the site suffix.
 * @param {boolean} [props.rawTitle]    Use `title` verbatim (home page only).
 * @param {string}   props.description  Meta + OG description.
 * @param {string}   props.path         Canonical path, e.g. "/work/career-co-pilot".
 * @param {string}  [props.type]        OG type. Defaults to "website".
 * @param {boolean} [props.noindex]     Emit robots noindex (404 only).
 * @param {object[]}[props.schema]      JSON-LD objects to attach to this page.
 */
export default function Seo({
  title,
  rawTitle = false,
  description = site.description,
  path = '/',
  type = 'website',
  noindex = false,
  schema = [],
}) {
  const fullTitle = formatTitle({ title, rawTitle });
  const canonical = absoluteUrl(path);
  const schemaKey = JSON.stringify(schema);

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertCanonical(canonical);

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', absoluteUrl(site.ogImage));
    upsertMeta('property', 'og:image:alt', site.ogImageAlt);

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteUrl(site.ogImage));

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, follow');
    } else {
      removeMeta('name', 'robots');
    }
  }, [fullTitle, description, canonical, type, noindex]);

  useEffect(() => {
    const blocks = JSON.parse(schemaKey);
    document.head
      .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
      .forEach((node) => node.remove());

    const added = blocks.map((block) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute(MANAGED, '');
      el.textContent = JSON.stringify(block);
      document.head.appendChild(el);
      return el;
    });

    return () => added.forEach((el) => el.remove());
  }, [schemaKey]);

  return null;
}
