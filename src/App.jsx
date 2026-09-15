import { Suspense, lazy, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import IntroCurtain, { shouldShowIntro } from './components/IntroCurtain.jsx';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import RouteManager from './components/layout/RouteManager.jsx';
import { ToastViewport } from './context/ToastContext.jsx';
import Home from './pages/Home.jsx';

// Home ships in the main bundle because it is the landing page. Everything else
// is split per route, so a visitor reading a case study never downloads the
// course pages or the contact form's dependencies.
const About = lazy(() => import('./pages/About.jsx'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const LabDetail = lazy(() => import('./pages/LabDetail.jsx'));
const Labs = lazy(() => import('./pages/Labs.jsx'));
const Learn = lazy(() => import('./pages/Learn.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Now = lazy(() => import('./pages/Now.jsx'));
const Work = lazy(() => import('./pages/Work.jsx'));
const WorkDetail = lazy(() => import('./pages/WorkDetail.jsx'));
const Writing = lazy(() => import('./pages/Writing.jsx'));

// Reserves the header offset and page height so a chunk load does not collapse
// the layout and shift what is already painted.
function RouteFallback() {
  return (
    <div className="shell min-h-[70vh] pt-32" aria-busy="true">
      <span className="sr-only">Loading page</span>
      <div className="h-6 w-28 border-2 border-hard bg-surface" />
      <div className="mt-6 h-12 w-2/3 max-w-xl border-2 border-hard bg-surface" />
      <div className="mt-4 h-5 w-1/2 max-w-md border-2 border-hard bg-surface" />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();

  // 'active' → curtain up | 'exiting' → panels sliding, page settling into
  // place | 'done' → normal page. Decided once on mount so that navigating to
  // "/" later in the session never re-triggers it.
  const [introState, setIntroState] = useState(() =>
    shouldShowIntro(pathname) ? 'active' : 'done',
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:inline-flex focus:h-11 focus:items-center focus:border-2 focus:border-hard focus:bg-accent focus:px-4 focus:text-sm focus:font-bold focus:uppercase focus:text-accent-ink"
      >
        Skip to content
      </a>

      <RouteManager />

      {introState !== 'done' ? (
        <IntroCurtain
          onExitStart={() => setIntroState('exiting')}
          onDone={() => setIntroState('done')}
        />
      ) : null}

      <Header />

      {/* The scale-in lives on this wrapper rather than on the whole app, so the
          fixed header is never inside a transformed ancestor. */}
      <div className="app-shell" data-intro={introState}>
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Suspense fallback={<RouteFallback />}>
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

              {/* Legacy single-page anchors kept alive so old links do not 404. */}
              <Route path="/projects" element={<Navigate to="/work" replace />} />
              <Route path="/training" element={<Navigate to="/learn" replace />} />
              <Route path="/services" element={<Navigate to="/learn" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>

      <ToastViewport />
    </>
  );
}
