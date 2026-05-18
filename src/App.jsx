import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { ToastViewport } from './context/ToastContext.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (booting) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <Navbar />
      <main>
        <Suspense fallback={<LoadingScreen subtle />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <ToastViewport />
    </div>
  );
}
