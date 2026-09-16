import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';
import LegalValue, { WhenConfirmed } from '../../components/legal/LegalValue.jsx';
import EmailLink from '../../components/ui/EmailLink.jsx';
import { legal } from '../../config/legal.js';
import { storageRegister } from '../../config/cookies.js';
import Seo from '../../seo/Seo.jsx';
import { pageMeta } from '../../seo/routes.js';

// Everything described here is derived from the Phase 0 data inventory in
// docs/AUDIT.md. If a category of data is not collected by code in this
// repository, it is not listed — a policy that claims more collection than
// actually happens is as wrong as one that claims less.

const entity = <LegalValue value={legal.entity.legalName} label="legal entity name" />;

export default function Privacy() {
  const sections = [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: (
        <>
          <p>
            This website, <strong>yuvarajdevs.tech</strong>, is operated by{' '}
            <strong>{legal.entity.tradingName}</strong> ({entity}), a{' '}
            <LegalValue value={legal.entity.type} label="entity type" /> registered in India under{' '}
            <LegalValue value={legal.entity.registrationNumber} label="registration number" />.
          </p>
          <p>
            For the purposes of the <strong>Digital Personal Data Protection Act, 2023</strong>,{' '}
            {legal.entity.tradingName} is the <strong>Data Fiduciary</strong> for the personal data
            described below. You are the Data Principal.
          </p>
          <dl>
            <dt>Registered address</dt>
            <dd>
              <LegalValue value={legal.entity.registeredAddress} label="registered address" />
            </dd>
            <dt>Contact</dt>
            <dd>
              <EmailLink className="link-underline text-ink" />
            </dd>
            <dt>Grievance Officer</dt>
            <dd>
              <LegalValue value={legal.grievanceOfficer.name} label="grievance officer name" /> —{' '}
              <LegalValue value={legal.grievanceOfficer.email} label="grievance email" />
            </dd>
          </dl>
        </>
      ),
    },
    {
      id: 'what-we-collect',
      title: 'What we collect',
      body: (
        <>
          <p>
            There is exactly one place on this site where you can give us personal data: the{' '}
            <Link to="/contact" className="link-underline text-ink">
              contact form
            </Link>
            . It asks for four things, all of which are required to reply to you:
          </p>
          <ul>
            <li>
              <strong>Your name</strong> — so a reply is addressed to a person.
            </li>
            <li>
              <strong>Your email address</strong> — the only channel we have to reply on.
            </li>
            <li>
              <strong>A topic</strong> — chosen from a fixed list, so the enquiry reaches the right
              place.
            </li>
            <li>
              <strong>Your message</strong> — whatever you want to tell us.
            </li>
          </ul>
          <p>
            The form also contains one hidden field that is invisible to you and is only ever filled
            in by automated bots. If it is filled in, the message is discarded and nothing is sent.
            It collects nothing about you.
          </p>

          <h3>Technical data</h3>
          <p>
            We do not run analytics, advertising pixels, heat maps, session recording or any other
            tracking on this site. We do not build a profile of you and we do not know who is
            reading which page.
          </p>
          <p>
            However, any request your browser makes to a server reveals your IP address and browser
            user agent to whoever operates that server. On this site that means our hosting provider
            (which keeps standard request logs) and, when you submit the contact form, the service
            that delivers it. Those providers are named in{' '}
            <a href="#who-else-sees-it" className="link-underline text-ink">
              Who else sees it
            </a>
            .
          </p>

          <h3>What we never ask for</h3>
          <p>
            There are no user accounts on this site, so we hold no passwords. There is no checkout,
            so we never see card, UPI or bank details. We do not ask for your date of birth, your
            postal address, your phone number, your employer, your income or any government
            identifier, and there is nowhere on this site to give them to us.
          </p>
        </>
      ),
    },
    {
      id: 'why-we-collect-it',
      title: 'Why we collect it, and on what basis',
      body: (
        <>
          <p>
            We use what you send through the contact form for one purpose:{' '}
            <strong>to read your message and reply to it</strong>. Depending on what you asked, that
            reply may include course dates, prices, what to install before a session, or an answer
            about engineering work.
          </p>
          <p>
            Our legal basis is your <strong>consent</strong>, under section 6 of the DPDP Act. You
            give it by choosing to fill in the form and pressing send. You are not required to use
            the form — the other contact channels listed on the{' '}
            <Link to="/contact" className="link-underline text-ink">
              contact page
            </Link>{' '}
            reach us just as well.
          </p>
          <div className="legal-note">
            <p>
              <strong>We do not send marketing email.</strong> There is no newsletter, no mailing
              list and no automated sequence. Writing to us does not subscribe you to anything, and
              your address is not added to any list, shared with anyone or sold. If that ever
              changes, it will be a separate, clearly-labelled, opt-in choice — never bundled into
              sending a message.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'how-long-we-keep-it',
      title: 'How long we keep it',
      body: (
        <>
          <p>
            An enquiry sent through the contact form arrives as an email and is kept for{' '}
            <LegalValue
              value={legal.privacy.contactRetentionMonths}
              label="contact retention period"
            />{' '}
            months, after which it is deleted. If your enquiry turns into a course enrolment, the
            correspondence is kept for as long as we are required to keep business records under
            Indian tax and company law.
          </p>
          <p>
            You can ask us to delete your enquiry before then — see{' '}
            <a href="#your-rights" className="link-underline text-ink">
              Your rights
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'who-else-sees-it',
      title: 'Who else sees it',
      body: (
        <>
          <p>
            We do not sell your data and we do not share it for anyone else&rsquo;s marketing. The
            only third parties involved are the services that make the site work. Each is a Data
            Processor acting on our instructions:
          </p>
          <dl>
            {legal.privacy.processors.map((processor) => (
              <div key={processor.name}>
                <dt>
                  {processor.name}{' '}
                  <span className="font-normal text-faint">— {processor.location}</span>
                </dt>
                <dd>
                  {processor.purpose} <strong>Receives:</strong> {processor.data}{' '}
                  <a
                    href={processor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink"
                  >
                    Their privacy policy
                  </a>
                  .
                </dd>
              </div>
            ))}
          </dl>
          <p>
            We may also disclose personal data where we are legally required to — for example in
            response to a lawful order from a court or a competent authority.
          </p>
        </>
      ),
    },
    {
      id: 'transfers',
      title: 'Transfers outside India',
      body: (
        <>
          <p>
            The providers listed above operate servers outside India, principally in the{' '}
            <strong>United States</strong>. Sending us a message therefore involves transferring
            your data outside India. The DPDP Act permits this except to territories the Central
            Government has restricted; we do not transfer personal data to any restricted
            territory.
          </p>
          <p>
            If you would rather not have your data leave India, do not use the contact form — reach
            us through one of the other channels on the{' '}
            <Link to="/contact" className="link-underline text-ink">
              contact page
            </Link>{' '}
            instead.
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies and browser storage',
      body: (
        <>
          <p>
            <strong>This site sets no cookies.</strong> Not one — not for analytics, not for
            advertising, not for anything.
          </p>
          <p>
            It stores {storageRegister.length} small values in your own browser, both of which exist
            only to remember a choice you made, and neither of which is ever sent to us or anyone
            else:
          </p>
          <ul>
            {storageRegister.map((entry) => (
              <li key={entry.name}>
                <strong>{entry.name}</strong> — {entry.purpose}
              </li>
            ))}
          </ul>
          <p>
            The full register, including how long each one lasts, is on the{' '}
            <Link to="/cookies" className="link-underline text-ink">
              cookie policy
            </Link>
            . Clearing your browser storage removes both, and the site keeps working without them.
          </p>
        </>
      ),
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: (
        <>
          <p>Under the DPDP Act you have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> — ask what personal data of yours we hold and what we have
              done with it.
            </li>
            <li>
              <strong>Correction and completion</strong> — have inaccurate or incomplete data
              corrected, completed or updated.
            </li>
            <li>
              <strong>Erasure</strong> — have your data deleted, unless we are legally required to
              keep it.
            </li>
            <li>
              <strong>Withdraw consent</strong> — as easily as you gave it. Withdrawing does not
              undo anything done before you withdrew.
            </li>
            <li>
              <strong>Grievance redressal</strong> — raise a complaint with our Grievance Officer,
              and escalate to the Data Protection Board of India if we do not resolve it.
            </li>
            <li>
              <strong>Nomination</strong> — nominate another person to exercise these rights on your
              behalf in the event of your death or incapacity.
            </li>
          </ul>
          <p>
            To exercise any of these, write to{' '}
            <LegalValue value={legal.grievanceOfficer.email} label="grievance email" /> or use the{' '}
            <Link to="/contact" className="link-underline text-ink">
              contact form
            </Link>
            . We will respond within{' '}
            <LegalValue value={legal.rightsResponseDays} label="rights response period" /> days. We
            may need to confirm that the request really comes from you before we act on it — usually
            by replying to the address the data was sent from.
          </p>
        </>
      ),
    },
    {
      id: 'children',
      title: "Children's data",
      body: (
        <>
          <p>
            This site is intended for adults. It is not directed at children, and nothing on it is
            designed to appeal to them.
          </p>
          <p>
            The DPDP Act treats anyone under 18 as a child and requires verifiable parental consent
            before their personal data is processed. <strong>This website has no sign-up, no
            account creation and no enrolment form</strong> — the only thing you can do is send a
            message. If you are under 18, please ask a parent or guardian to contact us on your
            behalf rather than using the form yourself.
          </p>
          <p>
            Where a course enrolment actually goes ahead, it is arranged directly with us after the
            enquiry, and parental consent is obtained at that point for anyone under 18.
          </p>
          <p>
            We do not carry out behavioural tracking or targeted advertising directed at anyone, and
            certainly not at children — there is no tracking on this site to direct.
          </p>
        </>
      ),
    },
    {
      id: 'security',
      title: 'How we protect it',
      body: (
        <>
          <p>The reasonable security safeguards we apply are, honestly, mostly structural:</p>
          <ul>
            <li>The whole site is served over HTTPS.</li>
            <li>
              It is a static site with no database and no server-side application code, so there is
              no store of personal data on it to breach.
            </li>
            <li>
              We hold no passwords and no payment details, because the site collects neither.
            </li>
            <li>
              Security headers (
              <span className="font-mono text-[0.85em]">X-Content-Type-Options</span>,{' '}
              <span className="font-mono text-[0.85em]">Referrer-Policy</span>,{' '}
              <span className="font-mono text-[0.85em]">X-Frame-Options</span>) are set on every
              response.
            </li>
            <li>
              Enquiries live in an email mailbox protected by a strong, unique password and
              multi-factor authentication.
            </li>
          </ul>
          <p>
            No safeguard is perfect. If we become aware of a personal data breach we will notify the
            Data Protection Board of India and every affected person, as the DPDP Act requires.
          </p>
        </>
      ),
    },
    {
      id: 'grievances',
      title: 'Grievances',
      body: (
        <>
          <p>
            If you are unhappy with how we have handled your personal data, contact our Grievance
            Officer:
          </p>
          <dl>
            <dt>Name</dt>
            <dd>
              <LegalValue value={legal.grievanceOfficer.name} label="grievance officer name" />
            </dd>
            <dt>Email</dt>
            <dd>
              <LegalValue value={legal.grievanceOfficer.email} label="grievance email" />
            </dd>
            <dt>Address</dt>
            <dd>
              <LegalValue value={legal.entity.registeredAddress} label="registered address" />
            </dd>
          </dl>
          <p>
            We will acknowledge your grievance within{' '}
            <LegalValue
              value={legal.grievanceOfficer.acknowledgeDays}
              label="grievance acknowledgement period"
            />{' '}
            working days and aim to resolve it within{' '}
            <LegalValue
              value={legal.grievanceOfficer.resolveDays}
              label="grievance resolution period"
            />{' '}
            days. If you are still not satisfied, you may complain to the{' '}
            <strong>Data Protection Board of India</strong>.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: (
        <>
          <p>
            When this policy changes materially we update the version number and the date at the top
            of the page. Version {legal.policies.privacy.version} is the current one. We do not
            apply changes retroactively to data already collected under an earlier version.
          </p>
          <WhenConfirmed value={legal.entity.legalName}>
            <p>
              Questions about this policy go to{' '}
              <EmailLink className="link-underline text-ink" />.
            </p>
          </WhenConfirmed>
        </>
      ),
    },
  ];

  return (
    <>
      <Seo
        title={pageMeta.privacy.title}
        description={pageMeta.privacy.description}
        path={pageMeta.privacy.path}
      />
      <LegalLayout
        title="Privacy Policy"
        lede="What this site collects, why, who else sees it, and what you can do about it. It is short because the site collects very little."
        policy={legal.policies.privacy}
        sections={sections}
      />
    </>
  );
}
