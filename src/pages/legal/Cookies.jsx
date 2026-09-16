import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';
import {
  categoryTitle,
  cookieCategories,
  requiresConsentBanner,
  storageRegister,
} from '../../config/cookies.js';
import { legal } from '../../config/legal.js';
import Seo from '../../seo/Seo.jsx';
import { pageMeta } from '../../seo/routes.js';

// The table below is generated from src/config/cookies.js — the same module the
// consent banner and preference panel read. There is no second list to keep in
// step, so this page cannot drift from what the site actually stores.

function StorageTable() {
  return (
    <div
      role="region"
      aria-labelledby="storage-table-caption"
      tabIndex={0}
      className="mt-6 overflow-x-auto border-2 border-hard focus-visible:outline-offset-0"
    >
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <caption id="storage-table-caption" className="sr-only">
          Everything this website stores in your browser
        </caption>
        <thead>
          <tr className="border-b-2 border-hard bg-bg-subtle">
            {['Name', 'Type', 'Set by', 'Purpose', 'Category', 'Duration'].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {storageRegister.map((entry) => (
            <tr key={entry.name} className="border-b-2 border-line last:border-b-0 align-top">
              <th scope="row" className="px-4 py-4 font-mono text-[0.8125rem] font-medium text-ink">
                {entry.name}
              </th>
              <td className="px-4 py-4 text-muted">{entry.type}</td>
              <td className="px-4 py-4 text-muted">{entry.provider}</td>
              <td className="px-4 py-4 text-muted">{entry.purpose}</td>
              <td className="px-4 py-4 text-muted">{categoryTitle(entry.category)}</td>
              <td className="px-4 py-4 text-muted">{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Cookies() {
  const sections = [
    {
      id: 'short-version',
      title: 'The short version',
      body: (
        <>
          <div className="legal-note">
            <p>
              <strong>This website sets no cookies.</strong> None at all — no analytics, no
              advertising, no tracking, first-party or third-party. It stores{' '}
              {storageRegister.length} small values in your own browser to remember choices you
              made, and those never leave your device.
            </p>
          </div>
          <p>
            That is not a technicality dressed up as a virtue. There is genuinely no analytics tool,
            no tag manager, no pixel and no session recorder on this site, so there is nothing here
            that needs your permission and nothing to opt out of.
          </p>
        </>
      ),
    },
    {
      id: 'what-is-stored',
      title: 'What is actually stored',
      body: (
        <>
          <p>
            Both entries use your browser&rsquo;s own storage rather than cookies, which means they
            are never attached to a network request and are never transmitted to us or to anyone
            else.
          </p>
          <StorageTable />
          <p>
            You can delete both at any time by clearing site data for this site in your browser
            settings. Nothing breaks: the site simply forgets your theme and shows the opening
            screen again.
          </p>
        </>
      ),
    },
    {
      id: 'categories',
      title: 'The categories we use',
      body: (
        <>
          <p>
            These are the categories the site is built around. Only the first two are in use today;
            the other two are listed so that the moment anything falls into them, you can see it
            here and choose.
          </p>
          <dl>
            {cookieCategories.map((category) => (
              <div key={category.id}>
                <dt>
                  {category.title}
                  {category.alwaysOn ? (
                    <span className="ml-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-faint">
                      always on
                    </span>
                  ) : null}
                </dt>
                <dd>{category.description}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
    {
      id: 'no-banner',
      title: 'Why you have not seen a cookie banner',
      body: (
        <>
          <p>
            Because you should not be asked for permission that is not needed. Consent is required
            before storing anything that is not necessary for a service you asked for — analytics
            and advertising, typically. Remembering that you pressed the dark-mode button is not
            that.
          </p>
          <p>
            Throwing up a banner anyway would train you to dismiss banners, which makes the ones
            that matter worse. So we did the opposite: the consent machinery is built and wired to
            the same register above, and it{' '}
            {requiresConsentBanner ? (
              <>is active, because something on this site now needs your consent.</>
            ) : (
              <>
                stays out of your way until something on this site genuinely needs your consent. The
                moment a non-essential cookie or script is added, the banner appears by itself —
                with <strong>Accept all</strong> and <strong>Reject all</strong> as equal choices,
                and everything non-essential off until you say otherwise.
              </>
            )}
          </p>
        </>
      ),
    },
    {
      id: 'your-choices',
      title: 'Your choices',
      body: (
        <>
          <p>
            <strong>Cookie settings.</strong> There is a link in the footer of every page. Today it
            brings you here, because there is nothing yet to switch. When there is, it opens the
            preference panel, and withdrawing a permission there will always be exactly as easy as
            granting it — same place, same number of clicks.
          </p>
          <p>
            <strong>Your browser.</strong> Every browser can block or clear cookies and site storage
            for a site, and honour &ldquo;Do Not Track&rdquo; and Global Privacy Control signals.
            Because this site does no tracking, those settings change nothing here — but they are
            worth having on everywhere else.
          </p>
        </>
      ),
    },
    {
      id: 'third-parties',
      title: 'Third parties',
      body: (
        <>
          <p>
            No third party sets a cookie through this site. There are no embeds, no iframes, no
            social widgets and no comment system.
          </p>
          <p>
            Two services do see a request from your browser, and neither sets a cookie: our host,
            and the font provider — which is in the process of being replaced by self-hosted font
            files so that even that request stops leaving our own domain. Both are listed, with what
            they receive, in the{' '}
            <Link to="/privacy" className="link-underline text-ink">
              privacy policy
            </Link>
            .
          </p>
          <p>
            Links out to GitHub, LinkedIn and WhatsApp are ordinary links. Those sites will know you
            arrived once you click through, as they would from anywhere.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: (
        <p>
          This page is generated from the site&rsquo;s own storage register, so it updates when the
          site does. Version {legal.policies.cookies.version} is current. Questions go to the
          Grievance Officer named in the{' '}
          <Link to="/privacy" className="link-underline text-ink">
            privacy policy
          </Link>
          .
        </p>
      ),
    },
  ];

  return (
    <>
      <Seo
        title={pageMeta.cookies.title}
        description={pageMeta.cookies.description}
        path={pageMeta.cookies.path}
      />
      <LegalLayout
        title="Cookie Policy"
        lede="A complete list of what this site stores in your browser. It is a short list."
        policy={legal.policies.cookies}
        sections={sections}
      />
    </>
  );
}
