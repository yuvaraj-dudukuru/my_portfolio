import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import Skills from '../components/Skills.jsx';

// Standalone /about route — reuses the same section blocks so deep-links and
// shares to a focused about page still feel cohesive.
export default function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <Skills />
      <Contact />
    </div>
  );
}
