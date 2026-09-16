import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { legal } from '../../config/legal.js';

/**
 * The WhatsApp equivalent of <EmailLink>, and for the same reason: a phone
 * number in a prerendered document is harvestable, and this one is a personal
 * mobile. The number and the wa.me URL are assembled after mount, so neither
 * appears in any of the static documents scripts/generate-seo.mjs writes.
 *
 * Before hydration, and without JavaScript, this is a real link to the contact
 * form — the same fallback contract <EmailLink> keeps, so the contact path
 * never depends on the deferral working.
 *
 * The digits live in src/config/legal.js as parts rather than one string, which
 * keeps a plain `grep` over the bundle from turning one up. That is a small
 * gain and not the point; the point is the static HTML.
 *
 * @param {object}   props
 * @param {string}  [props.className]
 * @param {React.ReactNode} [props.children]  Overrides the visible text.
 * @param {boolean} [props.showNumber]        Render the number itself as the text.
 * @param {string}  [props.fallbackLabel]     Text used before the number resolves.
 */
export default function WhatsAppLink({
  className = '',
  children,
  showNumber = false,
  fallbackLabel = 'WhatsApp',
}) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const { countryCode, national } = legal.contact.whatsapp ?? {};
    if (!countryCode || !national) return;
    const digits = `${countryCode}${national}`.replace(/\D/g, '');
    setContact({
      href: `https://wa.me/${digits}`,
      display: `+${countryCode} ${national.replace(/(\d{5})(\d{5})/, '$1 $2')}`,
    });
  }, []);

  if (!contact) {
    return (
      <Link to={legal.contact.fallbackPath} className={className}>
        {children ?? fallbackLabel}
      </Link>
    );
  }

  return (
    <a href={contact.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? (showNumber ? contact.display : fallbackLabel)}
    </a>
  );
}

/**
 * The formatted number as plain text, for places that cannot take a link.
 * Empty until mounted, exactly like the link.
 */
export function useWhatsAppNumber() {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const { countryCode, national } = legal.contact.whatsapp ?? {};
    if (!countryCode || !national) return;
    setDisplay(`+${countryCode} ${national.replace(/(\d{5})(\d{5})/, '$1 $2')}`);
  }, []);

  return display;
}
