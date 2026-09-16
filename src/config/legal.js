// Business and legal identity.
//
// Single source of truth for every legal page, the site footer and the contact
// page. Rules for this file:
//
//  - Nothing here may be guessed. A value the business has not confirmed stays
//    as a `{{TOKEN}}` string and is rendered by <LegalValue> as a visible
//    "to be confirmed" marker — never as raw braces on a live page.
//  - Kept free of `import.meta.env`, the DOM and JSX, so that Node scripts
//    (scripts/generate-seo.mjs, scripts/check-placeholders.mjs) can import it
//    directly — the same constraint src/seo/routes.js carries.
//  - Every unresolved token is listed in docs/OPEN_ITEMS.md, and
//    `npm run check:legal` prints the ones still outstanding.
//
// Confirmed facts, on the owner's instruction (2026-09-17):
//  - Courses are sold by Lumora Space, not by Yuvaraj Dudukuru personally.
//  - Lumora Space is GST-registered.
//  - Fraylon Technologies is a past role and is never a contracting party.

/** A value that has not been confirmed yet. */
export const PLACEHOLDER_PATTERN = /^\{\{[A-Z0-9_]+\}\}$/;

/**
 * @param {unknown} value
 * @returns {boolean} true when the value is an unconfirmed `{{TOKEN}}`.
 */
export function isPlaceholder(value) {
  return typeof value === 'string' && PLACEHOLDER_PATTERN.test(value);
}

/**
 * @param {unknown} value
 * @returns {string} a human label for a token, e.g. "{{GSTIN}}" → "GSTIN".
 */
export function placeholderLabel(value) {
  return isPlaceholder(value)
    ? String(value).slice(2, -2).toLowerCase().replace(/_/g, ' ')
    : '';
}

export const legal = {
  /**
   * The entity that contracts with course participants. `tradingName` is
   * confirmed; everything else is pending the incorporation paperwork.
   */
  entity: {
    tradingName: 'Lumora Space',
    legalName: '{{LEGAL_ENTITY_NAME}}',
    type: '{{ENTITY_TYPE}}',
    registrationNumber: '{{ENTITY_REG_NO}}',
    registeredAddress: '{{REGISTERED_ADDRESS}}',
  },

  /**
   * Registration is confirmed. Whether the published prices already include GST
   * is not, so `pricesIncludeGst` stays null and the price components must say
   * so rather than pick a side. Resolved in Phase 3.
   */
  gst: {
    registered: true,
    gstin: '{{GSTIN}}',
    /** @type {boolean | null} */
    pricesIncludeGst: null,
    /** @type {number | null} */
    ratePercent: null,
  },

  /**
   * No business mailbox exists yet. Until one does, every published email
   * affordance routes to /contact — the form still reaches the owner through
   * EmailJS without publishing a personal address. See <EmailLink>.
   */
  contact: {
    businessEmail: '{{BUSINESS_EMAIL}}',
    /** @type {string | null} Optional under the E-Commerce Rules; omitted when null. */
    phone: null,
    /**
     * Split into parts so the full number is not a single greppable string, and
     * only ever assembled client-side by <WhatsAppLink>. It is a personal
     * mobile, so it must not appear in a prerendered document.
     */
    whatsapp: { countryCode: '91', national: '6305017247' },
    fallbackPath: '/contact',
  },

  /** Required by DPDP s.13 and the Consumer Protection (E-Commerce) Rules 2020. */
  grievanceOfficer: {
    name: '{{GRIEVANCE_OFFICER_NAME}}',
    email: '{{GRIEVANCE_EMAIL}}',
    /** Working days to acknowledge a grievance. */
    acknowledgeDays: '{{GRIEVANCE_ACK_DAYS}}',
    /** Days to resolve. */
    resolveDays: '{{GRIEVANCE_RESOLVE_DAYS}}',
  },

  /** Days to respond to a data-principal rights request (access/correction/erasure). */
  rightsResponseDays: '{{RIGHTS_RESPONSE_DAYS}}',

  jurisdiction: {
    country: 'India',
    city: '{{JURISDICTION_CITY}}',
  },

  refund: {
    windowDays: '{{REFUND_WINDOW_DAYS}}',
    processingDays: '{{REFUND_PROCESSING_DAYS}}',
  },

  privacy: {
    /** How long an enquiry sent through the contact form is kept. */
    contactRetentionMonths: '{{CONTACT_RETENTION_MONTHS}}',
    /**
     * Processors that receive personal data. Derived from the Phase 0 audit —
     * add nothing here that is not actually wired up in the code.
     */
    processors: [
      {
        name: 'EmailJS',
        purpose: 'Delivers the contact form to the course team as email.',
        data: 'Name, email address, topic, message, plus the IP address and browser user agent of the request.',
        location: 'United States',
        url: 'https://www.emailjs.com/legal/privacy-policy/',
      },
      {
        name: 'Vercel',
        purpose: 'Hosts and serves this website.',
        data: 'IP address and browser user agent, in standard server request logs.',
        location: 'United States',
        url: 'https://vercel.com/legal/privacy-policy',
      },
      {
        name: 'Google Fonts',
        purpose:
          'Serves the two typefaces this site uses. Being migrated to self-hosted files, after which no request reaches Google at all.',
        data: 'IP address and browser user agent, received when the font files are requested.',
        location: 'United States and other countries',
        url: 'https://policies.google.com/privacy',
      },
    ],
  },

  /**
   * Policy versions. Bump `version` and `lastUpdated` together whenever the
   * substance of a page changes — the date is printed on the page, and the
   * version is what a stored consent record would be pinned to.
   */
  policies: {
    privacy: { version: '0.1.0', lastUpdated: '2026-09-17' },
    terms: { version: '0.1.0', lastUpdated: '2026-09-17' },
    refund: { version: '0.1.0', lastUpdated: '2026-09-17' },
    cookies: { version: '0.1.0', lastUpdated: '2026-09-17' },
  },
};

/** Every token in this module, for the placeholder checker and OPEN_ITEMS.md. */
export function unresolvedPlaceholders(node = legal, path = 'legal') {
  /** @type {{ path: string, token: string }[]} */
  const found = [];
  if (isPlaceholder(node)) return [{ path, token: node }];
  if (Array.isArray(node)) {
    node.forEach((item, i) => found.push(...unresolvedPlaceholders(item, `${path}[${i}]`)));
    return found;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      found.push(...unresolvedPlaceholders(value, `${path}.${key}`));
    }
  }
  return found;
}

export default legal;
