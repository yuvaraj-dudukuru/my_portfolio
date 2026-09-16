// Cookie and browser-storage register.
//
// One source of truth with two consumers: the table on /cookies, and (from
// Phase 2) the consent banner and preference panel. If something is not listed
// here it must not be set — and if it is listed with a category other than
// `necessary` or `preferences`, the banner stops being dormant and starts
// asking, because that is the point at which consent is actually required.
//
// Kept free of `import.meta.env`, the DOM and JSX so Node scripts can import it.
//
// Audited state (2026-09-17): this site sets **no cookies at all**. The only
// client-side storage is two functional keys, both written in response to a
// deliberate user action, both exempt from prior consent.

/**
 * @typedef {'necessary' | 'preferences' | 'analytics' | 'marketing'} CookieCategory
 */

/**
 * Category definitions, in the order they are shown to a visitor.
 * `alwaysOn` marks the category a visitor cannot switch off; every other
 * category defaults to off and must be switched on explicitly.
 */
export const cookieCategories = [
  {
    id: /** @type {CookieCategory} */ ('necessary'),
    title: 'Strictly necessary',
    alwaysOn: true,
    description:
      'Needed for the site to work at all — serving pages and keeping them secure. These cannot be switched off, and nothing here is used to profile you.',
  },
  {
    id: /** @type {CookieCategory} */ ('preferences'),
    title: 'Preferences',
    alwaysOn: false,
    description:
      'Remembers choices you have made, such as the light or dark theme. Stored only in your own browser and never sent anywhere.',
  },
  {
    id: /** @type {CookieCategory} */ ('analytics'),
    title: 'Analytics',
    alwaysOn: false,
    description:
      'Would measure how the site is used, to improve it. This site currently runs no analytics of any kind.',
  },
  {
    id: /** @type {CookieCategory} */ ('marketing'),
    title: 'Marketing',
    alwaysOn: false,
    description:
      'Would be used for advertising or cross-site tracking. This site currently runs none, and there is no intention to.',
  },
];

/**
 * @typedef {object} StorageEntry
 * @property {string}         name      Key as it appears in the browser.
 * @property {'cookie' | 'localStorage' | 'sessionStorage'} type
 * @property {string}         provider  Who sets it.
 * @property {string}         purpose   Why it exists.
 * @property {CookieCategory} category
 * @property {string}         duration  How long it survives.
 * @property {string}         [source]  Where in this repo it is written.
 */

/** @type {StorageEntry[]} */
export const storageRegister = [
  {
    name: 'yd-theme',
    type: 'localStorage',
    provider: 'Lumora Space (this site)',
    purpose:
      'Remembers whether you chose the light or the dark theme, so the site does not flip back on your next visit. Written only when you press the theme toggle.',
    category: 'preferences',
    duration: 'Until you clear your browser storage',
    source: 'src/context/ThemeContext.jsx',
  },
  {
    name: 'yuvarajdevs_intro_seen',
    type: 'sessionStorage',
    provider: 'Lumora Space (this site)',
    purpose:
      'Records that you have already seen the opening screen, so it is not shown again while this browser tab is open.',
    category: 'preferences',
    duration: 'Until you close the tab',
    source: 'src/components/IntroCurtain.jsx',
  },
];

/**
 * Bumping this invalidates stored consent and re-asks. Bump it whenever a new
 * entry appears in `storageRegister` or an existing one changes category.
 */
export const consentVersion = 1;

/** Where a consent decision is recorded. First-party, no cookie involved. */
export const consentStorageKey = 'yd-consent';

/** Categories that are on regardless of what the visitor chooses. */
export const alwaysOnCategories = cookieCategories
  .filter((category) => category.alwaysOn)
  .map((category) => category.id);

/**
 * True while every registered entry is either strictly necessary or a
 * functional preference — i.e. while nothing on the site legally requires prior
 * consent. The Phase 2 banner reads this and stays out of the way until it
 * flips, so a visitor is never asked to approve something that does not exist.
 */
export const requiresConsentBanner = storageRegister.some(
  (entry) => entry.category === 'analytics' || entry.category === 'marketing',
);

/** @param {CookieCategory} id */
export function categoryTitle(id) {
  return cookieCategories.find((category) => category.id === id)?.title ?? id;
}

export default storageRegister;
