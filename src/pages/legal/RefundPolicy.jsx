import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';
import LegalValue from '../../components/legal/LegalValue.jsx';
import EmailLink from '../../components/ui/EmailLink.jsx';
import { legal } from '../../config/legal.js';
import Seo from '../../seo/Seo.jsx';
import { pageMeta } from '../../seo/routes.js';

// Structure is the recommendation recorded in docs/OPEN_ITEMS.md; the numbers
// are deliberately left as tokens until the business confirms them. A refund
// policy with an invented window is worse than one that visibly has a gap.

const windowDays = <LegalValue value={legal.refund.windowDays} label="refund window" />;
const processingDays = (
  <LegalValue value={legal.refund.processingDays} label="refund processing time" />
);

export default function RefundPolicy() {
  const sections = [
    {
      id: 'short-version',
      title: 'The short version',
      body: (
        <>
          <div className="legal-note">
            <p>
              Change your mind more than {windowDays} days before your course starts and you get{' '}
              <strong>all of your money back</strong>. If we cancel or move a course, you get all of
              your money back whenever that happens. Once a course has started, a refund depends on
              how much of it has been delivered.
            </p>
          </div>
          <p>The rest of this page is the detail behind those three sentences.</p>
        </>
      ),
    },
    {
      id: 'before-it-starts',
      title: 'Before the course starts',
      body: (
        <>
          <ul>
            <li>
              <strong>More than {windowDays} days before the first session:</strong> a full refund,
              no questions and no reason required.
            </li>
            <li>
              <strong>Within {windowDays} days of the first session:</strong> your place has been
              held and the cohort has been sized around it, so a refund at this point is at our
              discretion. In practice we would rather move you to the next cohort — see{' '}
              <a href="#rescheduling" className="link-underline text-ink">
                rescheduling
              </a>
              .
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'after-it-starts',
      title: 'After the course starts',
      body: (
        <>
          <p>
            Once teaching has begun, a refund covers the part of the course that has not been
            delivered to you, calculated by the number of sessions remaining.
          </p>
          <p>
            If you tell us the course is not what its page described, say so and show us — we will
            look at it seriously, and if you are right you get a full refund. We would rather refund
            you than have you sit through five more weeks of something that is not what you were
            promised.
          </p>
        </>
      ),
    },
    {
      id: 'if-we-cancel',
      title: 'If we cancel or reschedule',
      body: (
        <>
          <p>
            <strong>Any fee you have paid is refunded in full</strong> if we cancel a cohort, fail
            to run it, or postpone it to dates that do not work for you. This applies at any point,
            including after the course has started, and it is not subject to any window.
          </p>
          <p>
            Occasionally a single session has to move — illness, or something breaking in a way that
            cannot wait. We reschedule it rather than drop it, and that is not a cancellation.
          </p>
        </>
      ),
    },
    {
      id: 'mentoring',
      title: 'One-to-one mentoring',
      body: (
        <>
          <p>Mentoring is booked per session, so it works differently:</p>
          <ul>
            <li>
              Cancel or move a booked session with at least{' '}
              <LegalValue
                value={legal.refund.windowDays}
                label="mentoring notice period"
              />{' '}
              days&rsquo; notice and it is refunded or rescheduled in full.
            </li>
            <li>
              Miss a session without telling us, and it counts as delivered. Tell us you cannot make
              it, however late, and we will usually just move it.
            </li>
            <li>Unused sessions in a block are refundable at the per-session rate.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'not-refundable',
      title: 'What is not refundable',
      body: (
        <>
          <ul>
            <li>
              Sessions you have already attended, and material already delivered to you, once a
              course is more than halfway through.
            </li>
            <li>
              A place withdrawn for a serious breach of the{' '}
              <Link to="/terms" className="link-underline text-ink">
                acceptable use section of the terms
              </Link>{' '}
              — harassment of other participants, or sharing course material.
            </li>
            <li>
              Third-party costs you chose to incur — cloud credits, paid APIs, a subscription you
              bought to follow along. We never require a paid service to complete a course.
            </li>
          </ul>
          <p>
            Nothing in this section affects your rights under the{' '}
            <strong>Consumer Protection Act, 2019</strong>, which sit above this policy.
          </p>
        </>
      ),
    },
    {
      id: 'how-to-ask',
      title: 'How to request a refund',
      body: (
        <>
          <p>Write to us. That is the whole process — there is no form to hunt for and no retention call.</p>
          <ol>
            <li>
              Email{' '}
              <LegalValue value={legal.grievanceOfficer.email} label="grievance email" /> or use the{' '}
              <Link to="/contact" className="link-underline text-ink">
                contact form
              </Link>
              , from the address you enrolled with.
            </li>
            <li>Tell us which course, and when you paid. A reason helps us but is not required.</li>
            <li>
              We will confirm within{' '}
              <LegalValue
                value={legal.grievanceOfficer.acknowledgeDays}
                label="acknowledgement period"
              />{' '}
              working days, and tell you the amount and the date it will reach you.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'how-you-get-it',
      title: 'How and when you get the money',
      body: (
        <>
          <p>
            Refunds go back to <strong>the same method you paid with</strong> — the same card, the
            same UPI ID, the same bank account. We do not issue credit notes or vouchers in place of
            a refund unless you ask us to.
          </p>
          <p>
            We start the refund within {processingDays} working days of agreeing it. How long it
            then takes to appear is up to your bank or payment provider, and is usually a further
            few working days.
          </p>
          <p>Where GST was charged on the fee, it is refunded along with it.</p>
        </>
      ),
    },
    {
      id: 'rescheduling',
      title: 'Rescheduling instead',
      body: (
        <>
          <p>
            If life gets in the way, moving to a later cohort is usually better for you than a
            refund, and it costs nothing. Your place carries over at the price you paid, even if the
            price has gone up since.
          </p>
          <p>
            You can defer once without needing a reason. Ask before the cohort you are booked on
            finishes.
          </p>
        </>
      ),
    },
    {
      id: 'questions',
      title: 'Questions',
      body: (
        <>
          <p>
            If something here is unclear, or you think this policy has been applied unfairly, contact{' '}
            <LegalValue value={legal.grievanceOfficer.name} label="grievance officer name" /> at{' '}
            <LegalValue value={legal.grievanceOfficer.email} label="grievance email" />, or{' '}
            <EmailLink className="link-underline text-ink">write to us</EmailLink>. Unresolved
            complaints can be taken to the appropriate consumer forum in{' '}
            <LegalValue value={legal.jurisdiction.city} label="jurisdiction city" />.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Seo
        title={pageMeta.refundPolicy.title}
        description={pageMeta.refundPolicy.description}
        path={pageMeta.refundPolicy.path}
      />
      <LegalLayout
        title="Refund & Cancellation Policy"
        lede="When you get your money back, how much, and how long it takes. No conditions buried in a footnote."
        policy={legal.policies.refund}
        sections={sections}
      />
    </>
  );
}
