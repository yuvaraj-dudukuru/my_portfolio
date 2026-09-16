import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';
import LegalValue from '../../components/legal/LegalValue.jsx';
import EmailLink from '../../components/ui/EmailLink.jsx';
import { legal } from '../../config/legal.js';
import Seo from '../../seo/Seo.jsx';
import { pageMeta } from '../../seo/routes.js';

// Describes only what this site and this business actually do today: an
// enquiry-led teaching business with no checkout, no accounts and no
// subscriptions. Nothing here anticipates a platform that has not been built.

export default function Terms() {
  const sections = [
    {
      id: 'agreement',
      title: 'Agreeing to these terms',
      body: (
        <>
          <p>
            These terms apply when you use <strong>yuvarajdevs.tech</strong> and when you take part
            in a course, mentoring session or other service offered through it. By using the site
            you accept them. If you do not accept them, please do not use the site.
          </p>
          <p>
            Two other documents form part of this agreement and are worth reading alongside it: the{' '}
            <Link to="/privacy" className="link-underline text-ink">
              privacy policy
            </Link>{' '}
            and the{' '}
            <Link to="/refund-policy" className="link-underline text-ink">
              refund and cancellation policy
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: 'who-you-contract-with',
      title: 'Who you are contracting with',
      body: (
        <>
          <p>
            Courses, learning paths and mentoring are sold and delivered by{' '}
            <strong>{legal.entity.tradingName}</strong> (
            <LegalValue value={legal.entity.legalName} label="legal entity name" />), a{' '}
            <LegalValue value={legal.entity.type} label="entity type" /> registered in India under{' '}
            <LegalValue value={legal.entity.registrationNumber} label="registration number" />, with
            its registered office at{' '}
            <LegalValue value={legal.entity.registeredAddress} label="registered address" />.
          </p>
          <p>
            &ldquo;We&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; in these terms mean{' '}
            {legal.entity.tradingName}. &ldquo;You&rdquo; means the person using the site or taking
            part in a session.
          </p>
          <div className="legal-note">
            <p>
              This site also serves as the personal portfolio of Yuvaraj Dudukuru, who teaches the
              courses. Work described under{' '}
              <Link to="/work" className="link-underline text-ink">
                Work
              </Link>{' '}
              and{' '}
              <Link to="/labs" className="link-underline text-ink">
                Labs
              </Link>{' '}
              may have been carried out in other capacities and for other organisations, past and
              present. Those organisations are not party to this agreement, and nothing on those
              pages is an offer from them.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'what-we-offer',
      title: 'What we offer',
      body: (
        <>
          <p>
            We run <strong>live, online, project-based courses</strong> and{' '}
            <strong>one-to-one mentoring</strong> in programming, AI and data science, and web
            development. What each course covers, how long it runs, what you need to know
            beforehand and what you finish with is set out on its own page under{' '}
            <Link to="/learn" className="link-underline text-ink">
              Learn
            </Link>
            .
          </p>
          <p>
            Courses marked <strong>&ldquo;In development&rdquo;</strong> are not on sale. They have
            no price and no enrolment path, and asking about one only puts you on a list to be told
            when it opens.
          </p>
          <p>
            We also take enquiries about engineering work and collaboration. Any such work is agreed
            separately in writing and is not governed by these terms.
          </p>
        </>
      ),
    },
    {
      id: 'enrolment',
      title: 'Enquiries and enrolment',
      body: (
        <>
          <p>
            <strong>Nothing is sold through this website.</strong> There is no cart, no checkout and
            no account to create. The buttons on a course page open an enquiry, and an enquiry
            commits you to nothing.
          </p>
          <p>Enrolment happens after that, in this order:</p>
          <ol>
            <li>You send an enquiry through the contact form or another listed channel.</li>
            <li>
              We reply with the next cohort dates, the fee and what it includes, what you need to
              install, and how payment works.
            </li>
            <li>
              You decide. A place is confirmed only once you have accepted those details and the fee
              has been paid.
            </li>
          </ol>
          <p>
            Prices and dates quoted in that reply are the ones that apply to you. We may decline or
            withdraw an enrolment — for example where a course is full, where the prerequisites are
            clearly not met, or where a cohort does not reach the numbers needed to run. If we do,
            any fee you have paid is refunded in full.
          </p>
        </>
      ),
    },
    {
      id: 'fees',
      title: 'Fees, payment and taxes',
      body: (
        <>
          <p>
            The fee for each course is shown on its page under{' '}
            <Link to="/learn" className="link-underline text-ink">
              Learn
            </Link>
            . {legal.entity.tradingName} is registered for GST in India under GSTIN{' '}
            <LegalValue value={legal.gst.gstin} label="GSTIN" />, and the tax treatment of a fee is
            stated alongside the price it belongs to.
          </p>
          <p>
            We do not add charges at a later stage that were not shown to you when you decided. If a
            fee changes, the change applies to new enrolments only — never to a place that has
            already been confirmed.
          </p>
          <p>
            Payment is arranged directly with us. This website never collects card, UPI or bank
            details, and you should be suspicious of any page claiming to take payment on its
            behalf.
          </p>
          <p>
            Cancellations and refunds are governed by the{' '}
            <Link to="/refund-policy" className="link-underline text-ink">
              refund and cancellation policy
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: 'course-material',
      title: 'Course material and intellectual property',
      body: (
        <>
          <p>
            Course material — slides, notebooks, exercises, starter repositories, recordings and
            written notes — belongs to {legal.entity.tradingName} or to whoever licensed it to us.
          </p>
          <p>
            When you enrol we give you a <strong>personal, non-transferable licence</strong> to use
            that material for your own learning, for as long as you like. What that licence does not
            allow:
          </p>
          <ul>
            <li>Sharing, reselling, republishing or uploading the material anywhere.</li>
            <li>Teaching from it commercially, or using it to build a competing course.</li>
            <li>Recording a live session without our written permission.</li>
          </ul>

          <h3>Your work stays yours</h3>
          <p>
            Anything <strong>you</strong> write during a course — your exercises, your capstone
            project, your repository — is <strong>yours</strong>. You own it, you can license it how
            you like, you can put it in your portfolio, and you can show it to an employer. We claim
            nothing in it. If we would like to feature your project as an example, we will ask you
            first and take no for an answer.
          </p>

          <h3>This website</h3>
          <p>
            The text, design, code and images on this site belong to their respective owners and may
            not be copied wholesale. Quoting a passage with attribution and a link is fine and
            welcome.
          </p>
        </>
      ),
    },
    {
      id: 'conduct',
      title: 'Acceptable use',
      body: (
        <>
          <p>In sessions and in correspondence, please do not:</p>
          <ul>
            <li>
              Harass, abuse, threaten or discriminate against anyone — other participants or us.
            </li>
            <li>Share another participant&rsquo;s work or personal details without their consent.</li>
            <li>Pass your place to someone else, or let someone else attend in your name.</li>
            <li>Disrupt sessions so that other people cannot learn.</li>
          </ul>
          <p>
            And when using the site itself, please do not attempt to break it, scrape it at volume,
            probe it for vulnerabilities without asking, or use it to distribute malware.
          </p>
          <p>
            We may remove someone from a course for a serious or repeated breach of this section.
            Where we do, we will say why, and the{' '}
            <Link to="/refund-policy" className="link-underline text-ink">
              refund policy
            </Link>{' '}
            says what happens to the fee.
          </p>
          <p>
            Found a security problem instead? Please report it rather than exploiting it — we will
            not pursue anyone who reports in good faith and gives us a reasonable chance to fix it.
          </p>
        </>
      ),
    },
    {
      id: 'disclaimers',
      title: 'What we do not promise',
      body: (
        <>
          <p>This section matters, so it is in plain language.</p>
          <ul>
            <li>
              <strong>We do not guarantee a job, an internship, a placement, a salary or an
              interview.</strong> We do not offer placement assistance and we make no claim about
              what you will earn. Anyone in this industry who guarantees you a job is selling you
              something.
            </li>
            <li>
              <strong>We do not guarantee a particular result.</strong> What you get out of a course
              depends on the work you put into it. We commit to teaching it properly and reviewing
              your code honestly.
            </li>
            <li>
              <strong>We do not issue accredited qualifications.</strong> Our courses are not
              affiliated with any university or examination board, and finishing one is not a
              degree, a diploma or a recognised certification.
            </li>
            <li>
              <strong>The site is provided as it is.</strong> We try to keep it accurate and
              available, but we do not promise it will be uninterrupted, error-free, or right about
              everything. Technical articles and case studies are opinion and experience, not
              professional advice.
            </li>
            <li>
              <strong>We are not responsible for other people&rsquo;s sites.</strong> Where we link
              out, we do not control what is on the other end.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      body: (
        <>
          <p>
            To the extent Indian law allows, our total liability to you for anything arising out of
            a course, a mentoring session or your use of this site is limited to{' '}
            <strong>the amount you actually paid us</strong> for the service the claim relates to.
          </p>
          <p>
            We are not liable for indirect or consequential loss — lost profits, lost opportunities,
            lost data or lost time.
          </p>
          <p>
            Nothing in these terms limits liability that cannot be limited by law, including
            liability for fraud, for death or personal injury caused by negligence, or your rights
            as a consumer under the <strong>Consumer Protection Act, 2019</strong>. Those rights sit
            above this agreement and are not affected by it.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes',
      body: (
        <>
          <p>
            <strong>To a course:</strong> curricula are revised when something stops working, and a
            session may occasionally be rescheduled. If we make a material change to a course you
            have already paid for, we will tell you and you may withdraw for a full refund of the
            part not yet delivered.
          </p>
          <p>
            <strong>To these terms:</strong> when they change we update the version and date at the
            top of this page. The version in force when you enrolled is the one that governs that
            enrolment. Continuing to use the site after a change means you accept the new version
            for future use.
          </p>
        </>
      ),
    },
    {
      id: 'governing-law',
      title: 'Governing law and jurisdiction',
      body: (
        <>
          <p>
            These terms are governed by the laws of <strong>India</strong>. The courts at{' '}
            <LegalValue value={legal.jurisdiction.city} label="jurisdiction city" />, India have
            exclusive jurisdiction over any dispute arising from them.
          </p>
          <p>
            Before going to court, please raise it with us — most things are a misunderstanding and
            are resolved in an email. Consumer complaints can also be taken to the appropriate
            consumer forum, and complaints about personal data to our Grievance Officer, named in
            the{' '}
            <Link to="/privacy" className="link-underline text-ink">
              privacy policy
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      body: (
        <>
          <dl>
            <dt>{legal.entity.tradingName}</dt>
            <dd>
              <LegalValue value={legal.entity.legalName} label="legal entity name" />
            </dd>
            <dt>Registered address</dt>
            <dd>
              <LegalValue value={legal.entity.registeredAddress} label="registered address" />
            </dd>
            <dt>Email</dt>
            <dd>
              <EmailLink className="link-underline text-ink" />
            </dd>
            <dt>Grievance Officer</dt>
            <dd>
              <LegalValue value={legal.grievanceOfficer.name} label="grievance officer name" /> —{' '}
              <LegalValue value={legal.grievanceOfficer.email} label="grievance email" />
            </dd>
          </dl>
          <p>
            Or use the{' '}
            <Link to="/contact" className="link-underline text-ink">
              contact form
            </Link>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Seo
        title={pageMeta.terms.title}
        description={pageMeta.terms.description}
        path={pageMeta.terms.path}
      />
      <LegalLayout
        title="Terms of Service"
        lede="The agreement between you and Lumora Space when you use this site or take a course. Written to be read, not to be skipped."
        policy={legal.policies.terms}
        sections={sections}
      />
    </>
  );
}
