/**
 * Render smoke test.
 *
 * Mounts every page through react-dom/server and fails loudly on a render
 * error. It is not a substitute for a browser — effects, layout and interaction
 * are out of scope — but it exercises every component's render body and prop
 * access, which is where a data-shape change usually breaks first.
 *
 * Pages are imported eagerly and mounted directly rather than through <App>,
 * because App code-splits its routes and renderToString would only ever produce
 * the Suspense fallback.
 *
 * Run with: npm test
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Footer from '../src/components/layout/Footer.jsx';
import Header from '../src/components/layout/Header.jsx';
import { ThemeProvider } from '../src/context/ThemeContext.jsx';
import { ToastProvider } from '../src/context/ToastContext.jsx';

import About from '../src/pages/About.jsx';
import ArticleDetail from '../src/pages/ArticleDetail.jsx';
import Contact from '../src/pages/Contact.jsx';
import CourseDetail from '../src/pages/CourseDetail.jsx';
import Home from '../src/pages/Home.jsx';
import LabDetail from '../src/pages/LabDetail.jsx';
import Labs from '../src/pages/Labs.jsx';
import Learn from '../src/pages/Learn.jsx';
import NotFound from '../src/pages/NotFound.jsx';
import Now from '../src/pages/Now.jsx';
import Work from '../src/pages/Work.jsx';
import WorkDetail from '../src/pages/WorkDetail.jsx';
import Writing from '../src/pages/Writing.jsx';

import Cookies from '../src/pages/legal/Cookies.jsx';
import Privacy from '../src/pages/legal/Privacy.jsx';
import RefundPolicy from '../src/pages/legal/RefundPolicy.jsx';
import Terms from '../src/pages/legal/Terms.jsx';

import { courses } from '../src/data/courses.js';
import { labs } from '../src/data/labs.js';
import { work } from '../src/data/work.js';

const ROUTES = [
  '/',
  '/work',
  ...work.map((item) => `/work/${item.slug}`),
  '/labs',
  ...labs.map((item) => `/labs/${item.slug}`),
  '/learn',
  ...courses.map((item) => `/learn/${item.slug}`),
  '/writing',
  '/now',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/cookies',
  '/totally-missing',
];

// Anything shorter than this is a page that rendered but produced nothing
// meaningful — a silent failure worth catching.
const MIN_CHARS = 4000;

function Tree({ route }) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider>
        <ToastProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<WorkDetail />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/labs/:slug" element={<LabDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:slug" element={<CourseDetail />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/writing/:slug" element={<ArticleDetail />} />
              <Route path="/now" element={<Now />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </ToastProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

let failures = 0;

for (const route of ROUTES) {
  try {
    const html = renderToString(<Tree route={route} />);
    if (html.length < MIN_CHARS) {
      failures += 1;
      console.log(`THIN  ${route} rendered only ${html.length} chars`);
    } else {
      console.log(`ok    ${route} (${html.length} chars)`);
    }
  } catch (error) {
    failures += 1;
    console.log(`FAIL  ${route}`);
    console.log(`      ${error.message}`);
    if (error.stack) console.log(error.stack.split('\n').slice(1, 4).join('\n'));
  }
}

console.log(
  failures
    ? `\n${failures} of ${ROUTES.length} routes failed`
    : `\nAll ${ROUTES.length} routes rendered`,
);
process.exit(failures ? 1 : 0);
