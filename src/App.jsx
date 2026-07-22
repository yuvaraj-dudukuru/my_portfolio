import { Route, Routes } from 'react-router-dom';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import CredibilityStrip from './components/CredibilityStrip.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Services from './components/Services.jsx';
import Skills from './components/Skills.jsx';
import Testimonials from './components/Testimonials.jsx';
import TrainingPrograms from './components/TrainingPrograms.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { ToastViewport } from './context/ToastContext.jsx';

function HomeSections() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <About />
      <Skills />
      <Services />
      <TrainingPrograms />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <Navbar />
      <main className="relative z-0 min-h-screen">
        <Routes>
          <Route path="/" element={<HomeSections />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
      <ToastViewport />
    </div>
  );
}
