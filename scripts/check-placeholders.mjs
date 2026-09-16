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

import { legal, unresolvedPlaceholders } from '../src/config/legal.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/**
 * Addresses that must never appear in a built document. Kept split so this
 * file is not itself a harvestable copy of the thing it is guarding.
 */
const FORBIDDEN_IN_OUTPUT = [['dudukuruyuvaraj55', 'gmail.com'].join('@')];

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
  for await (const file of htmlFiles(dist)) {
    const html = await readFile(file, 'utf8');
    const where = relative(root, file);

    const leakedToken = html.match(/\{\{[A-Z0-9_]+\}\}/);
    if (leakedToken) failures.push(`${where}: raw placeholder ${leakedToken[0]} in output`);

    for (const forbidden of FORBIDDEN_IN_OUTPUT) {
      if (html.includes(forbidden)) failures.push(`${where}: personal address published in output`);
    }
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
