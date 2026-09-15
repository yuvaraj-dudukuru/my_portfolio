// JSON-LD builders.
//
// Only claims that are true elsewhere on the site go in here. In particular:
//  - Projects are described as SoftwareSourceCode, not SoftwareApplication.
//    They are repositories with demos, not distributed applications, and
//    SoftwareApplication invites aggregateRating/offer markup that would be
//    fabricated.
//  - No `review`, `aggregateRating` or `interactionStatistic` anywhere. There
//    are no reviews and no measured usage.
//  - A planned course emits no `offers`, because nothing is for sale yet.

import { site, absoluteUrl } from '../data/site.js';
import { profile } from '../data/profile.js';

const PERSON_ID = `${site.url}/#person`;

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    url: site.url,
    image: absoluteUrl(site.ogImage),
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressCountry: 'IN',
    },
    sameAs: [profile.socials.github, profile.socials.linkedin],
    knowsAbout: [
      'Artificial Intelligence',
      'Data Science',
      'Machine Learning',
      'Python',
      'Full-Stack Web Development',
      'Technical Education',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Lumora Space',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

export function projectSchema(item, path) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: item.title,
    description: item.oneLiner ?? item.summary,
    url: absoluteUrl(path),
    author: { '@id': PERSON_ID },
    programmingLanguage: item.stack ?? item.tech ?? [],
  };
  const repo = item.links?.github || item.links?.source;
  if (repo) schema.codeRepository = repo;
  const demo = item.links?.live || item.links?.demo;
  if (demo) schema.targetProduct = { '@type': 'WebApplication', url: demo, name: item.title };
  return schema;
}

export function courseSchema(course, path) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary || course.tagline,
    url: absoluteUrl(path),
    provider: { '@id': PERSON_ID },
    inLanguage: 'en',
    educationalLevel: course.levelDetail,
  };

  if (course.status === 'open') {
    schema.hasCourseInstance = {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: course.duration,
      instructor: { '@id': PERSON_ID },
    };
    if (course.price) {
      schema.offers = {
        '@type': 'Offer',
        price: String(course.price.amount),
        priceCurrency: course.price.currency,
        availability: 'https://schema.org/InStock',
        url: absoluteUrl(path),
        category: 'Starting price',
      };
    }
  }

  return schema;
}

export function articleSchema(article, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: absoluteUrl(path),
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en',
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.to),
    })),
  };
}

export default personSchema;
