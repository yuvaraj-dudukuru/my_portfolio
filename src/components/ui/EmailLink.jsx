import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isPlaceholder, legal } from '../../config/legal.js';

/**
 * The only place an email address is allowed to reach the page.
 *
 * The address is assembled after mount, never during the server render, so it
 * does not appear in any of the static documents scripts/generate-seo.mjs
 * writes — which is where a harvester actually looks. Before hydration, and for
 * anyone without JavaScript, this is a real link to the contact form rather
 * than a dead span, so the contact path never depends on the trick working.
 *
 * It deliberately stops there. Encoding the address inside the JS bundle as
 * well would be theatre: anything that runs the bundle can read it either way.
 * What this buys is that the 19 prerendered HTML files contain no address.
 *
 * While `legal.contact.businessEmail` is still an unconfirmed placeholder —
 * i.e. until a business mailbox exists — every instance renders the contact-form
 * link, and no personal address is published anywhere.
 *
 * @param {object}   props
 * @param {string}  [props.className]
 * @param {React.ReactNode} [props.children]  Overrides the visible text.
 * @param {string}  [props.fallbackLabel]     Text used when no address is set.
 */
export default function EmailLink({ className = '', children, fallbackLabel = 'Contact form' }) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const configured = legal.contact.businessEmail;
    if (isPlaceholder(configured) || !configured.includes('@')) return;
    const [user, domain] = configured.split('@');
    setAddress(`${user}@${domain}`);
  }, []);

  if (!address) {
    return (
      <Link to={legal.contact.fallbackPath} className={className}>
        {children ?? fallbackLabel}
      </Link>
    );
  }

  return (
    <a href={`mailto:${address}`} className={className}>
      {children ?? address}
    </a>
  );
}

/**
 * The address as plain text for places that cannot take a link (a toast, a
 * label). Same deferral: empty until mounted, empty while unconfirmed.
 */
export function useBusinessEmail() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const configured = legal.contact.businessEmail;
    if (isPlaceholder(configured) || !configured.includes('@')) return;
    setAddress(configured);
  }, []);

  return address;
}
