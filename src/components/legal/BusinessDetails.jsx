import EmailLink from '../ui/EmailLink.jsx';
import LegalValue from './LegalValue.jsx';
import { legal } from '../../config/legal.js';

/**
 * The seller's identity, as the Consumer Protection (E-Commerce) Rules 2020
 * require it to be displayed: legal name, registration, registered address, GST
 * registration, a contact route and the grievance officer.
 *
 * Rendered site-wide in the footer and again in full on /contact. Every value
 * comes from src/config/legal.js — there is no second copy of these details
 * anywhere in the codebase.
 *
 * `headingId` is opt-in because /contact renders this twice — once in the page
 * and once in the footer — and two elements may not share an id.
 *
 * @param {{ variant?: 'compact' | 'full', className?: string, headingId?: string }} props
 */
export default function BusinessDetails({ variant = 'compact', className = '', headingId }) {
  const rows = [
    { label: 'Legal entity', value: <LegalValue value={legal.entity.legalName} label="legal entity name" /> },
    { label: 'Entity type', value: <LegalValue value={legal.entity.type} label="entity type" /> },
    {
      label: 'Registration no.',
      value: <LegalValue value={legal.entity.registrationNumber} label="registration number" />,
    },
    {
      label: 'GSTIN',
      value: legal.gst.registered ? (
        <LegalValue value={legal.gst.gstin} label="GSTIN" />
      ) : (
        'Not registered'
      ),
    },
    {
      label: 'Registered address',
      value: <LegalValue value={legal.entity.registeredAddress} label="registered address" />,
    },
    { label: 'Email', value: <EmailLink className="link-underline text-ink" /> },
    ...(legal.contact.phone ? [{ label: 'Phone', value: legal.contact.phone }] : []),
    {
      label: 'Grievance Officer',
      value: (
        <>
          <LegalValue value={legal.grievanceOfficer.name} label="grievance officer name" />
          <span className="block">
            <LegalValue value={legal.grievanceOfficer.email} label="grievance email" />
          </span>
        </>
      ),
    },
  ];

  const visible = variant === 'compact' ? rows.filter((row) => row.label !== 'Entity type') : rows;

  return (
    <div className={className}>
      <h2 id={headingId} className="label">
        Business details
      </h2>
      <p className="prose-body mt-4 max-w-prose text-[0.9375rem]">
        Courses and mentoring on this site are sold by{' '}
        <strong className="font-semibold text-ink">{legal.entity.tradingName}</strong>.
      </p>
      <dl
        className={
          variant === 'full'
            ? 'mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2'
            : 'mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {visible.map((row) => (
          <div key={row.label} className="border-t-2 border-hard pt-3">
            <dt className="label">{row.label}</dt>
            <dd className="mt-1.5 text-sm text-muted">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
