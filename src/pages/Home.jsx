import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import Hero from '../components/Hero.jsx';
import Projects from '../components/Projects.jsx';
import Services from '../components/Services.jsx';
import Skills from '../components/Skills.jsx';
import Testimonials from '../components/Testimonials.jsx';
import TrainingPrograms from '../components/TrainingPrograms.jsx';

export default function Home() {
  const { hash } = useLocation();

  // When the route lands with a hash (e.g. /#projects), scroll to that section
  // once the page has mounted.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    // Defer one frame so the section refs exist.
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Hero />
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
