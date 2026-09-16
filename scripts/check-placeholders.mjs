/**
 * Placeholder and leak check.
 *
 * Two jobs, both cheap enough to run on every build:
 *
 *  1. List the values in src/config/legal.js the business has not confirmed
 *     yet. These are rendered as visible "to be confirmed" markers rather than
 *     raw braces, so they are not a build failure — but they must never be
 *     invisible either, and docs/OPEN_ITEMS.md is supposed to match this list.
 *
 *  2. Fail the build if a raw `{{TOKEN}}` or a personal address has leaked into
 *     the generated HTML. The whole point of <EmailLink> is that no address
 *     reaches a static document; this is the check that keeps it true rather
 *     than hoping nobody reintroduces a `mailto:` by hand.
 *
 * Run standalone with: npm run check:legal
 */

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isPlaceholder, legal, unresolvedPlaceholders } from '../src/config/legal.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/**
 * Values that must be real before the site is deployed. A legal page carrying
 * "[ registered address — to be confirmed ]" in production is worse than no
 * legal page: it is a published document that visibly does not know who wrote
 * it. These block a production build; everything else only warns.
 */
const REQUIRED_FOR_PRODUCTION = [
  ['Legal entity name', legal.entity.legalName],
  ['Entity registration number (CIN/LLPIN)', legal.entity.registrationNumber],
  ['Registered address', legal.entity.registeredAddress],
  ['GSTIN', legal.gst.gstin],
  ['Grievance Officer name', legal.grievanceOfficer.name],
  ['Grievance Officer email', legal.grievanceOfficer.email],
  ['Business email', legal.contact.businessEmail],
];

/**
 * "Production" means a build that can actually reach visitors: Vercel, CI, an
 * explicit NODE_ENV=production, or `--strict` for testing this path locally.
 * A developer running `npm run build` on their own machine gets the warning
 * instead, so the site stays buildable while the values are being chased.
 */
function isProductionBuild() {
  return Boolean(
    process.argv.includes('--strict') ||
      process.env.VERCEL ||
      process.env.CI ||
      process.env.NODE_ENV === 'production',
  );
}

/**
 * Addresses that must never appear in a built document. Kept split so this
 * file is not itself a harvestable copy of the thing it is guarding.
 */
const FORBIDDEN_IN_OUTPUT = (() => {
  const cc = '9' + '1';
  const n = '63050' + '17247';
  return [
    { what: 'personal email address', value: ['dudukuruyuvaraj55', 'gmail.com'].join('@') },
    { what: 'personal email address', value: ['dudukuruyuvaraj', 'gmail.com'].join('@') },
    // The personal mobile, in every shape it could be written: wa.me link,
    // international, spaced, and bare national.
    { what: 'personal phone number (wa.me link)', value: `wa.me/${cc}${n}` },
    { what: 'personal phone number', value: `+${cc}${n}` },
    { what: 'personal phone number', value: `+${cc} ${n.slice(0, 5)} ${n.slice(5)}` },
    { what: 'personal phone number', value: n },
  ];
})();

/**
 * Free-mail domains that should not appear in a published asset. Used for a
 * warning rather than a failure: a personal address inside public/resume.pdf is
 * a real exposure, but it is the owner's document to change, and blocking every
 * build until they do would be the wrong lever.
 */
const FREEMAIL = /@(gmail|yahoo|hotmail|outlook|proton(mail)?|rediffmail)\.(com|in|co\.in)/i;

const SCANNED_ASSETS = ['resume.pdf'];

async function warnAboutAssets() {
  for (const name of SCANNED_ASSETS) {
    let raw;
    try {
      raw = await readFile(join(dist, name), 'latin1');
    } catch {
      continue;
    }
    if (FREEMAIL.test(raw)) {
      console.warn(
        `[legal] WARNING: dist/${name} contains a personal free-mail address and is publicly downloadable.\n` +
          '          The HTML no longer publishes one; this file still does. See docs/OPEN_ITEMS.md.',
      );
    }
  }
}

async function* htmlFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // no dist/ yet — nothing built, nothing to leak
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

async function main() {
  const pending = unresolvedPlaceholders();

  if (pending.length) {
    console.log(`\n[legal] ${pending.length} value(s) still to be confirmed:`);
    for (const { path, token } of pending) {
      console.log(`  ${token.padEnd(32)} ${path}`);
    }
    console.log('  → tracked in docs/OPEN_ITEMS.md');
  } else {
    console.log('[legal] every value in src/config/legal.js is confirmed.');
  }

  if (legal.gst.registered && legal.gst.pricesIncludeGst === null) {
    console.log(
      '[legal] gst.pricesIncludeGst is still undecided — course prices cannot state their tax treatment until it is set.',
    );
  }

  await warnAboutAssets();

  const failures = [];

  const blocking = REQUIRED_FOR_PRODUCTION.filter(([, value]) => isPlaceholder(value));
  if (blocking.length) {
    const production = isProductionBuild();
    const lines = blocking.map(([label, value]) => `  ${label}: ${value}`).join('\n');
    if (production) {
      failures.push(
        `${blocking.length} value(s) required before deployment are still placeholders:\n${lines}\n` +
          '  Legal pages must not ship to production showing "to be confirmed".',
      );
    } else {
      console.warn(
        `[legal] WARNING: ${blocking.length} value(s) required for deployment are still placeholders:\n${lines}\n` +
          '          This build is allowed because it is not a production build.\n' +
          '          A production build (CI, Vercel, NODE_ENV=production, or --strict) will FAIL until they are set.',
      );
    }
  }
  for await (const file of htmlFiles(dist)) {
    const html = await readFile(file, 'utf8');
    const where = relative(root, file);

    const leakedToken = html.match(/\{\{[A-Z0-9_]+\}\}/);
    if (leakedToken) failures.push(`${where}: raw placeholder ${leakedToken[0]} in output`);

    const leaked = new Set(
      FORBIDDEN_IN_OUTPUT.filter(({ value }) => html.includes(value)).map(({ what }) => what),
    );
    for (const what of leaked) failures.push(`${where}: ${what} published in output`);
  }

  if (failures.length) {
    console.error('\n[legal] FAILED:');
    failures.forEach((failure) => console.error(`  ${failure}`));
    process.exit(1);
  }

  console.log('[legal] no placeholders or personal addresses leaked into dist/.');
}

main().catch((error) => {
  console.error('[legal] check failed:', error);
  process.exit(1);
});
