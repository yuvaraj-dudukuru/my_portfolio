import { motion } from 'framer-motion';
import { skills } from '../data/skills.js';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';
import { Atom, Code, Database, Network } from 'lucide-react';
import { FaPython, FaReact, FaHtml5, FaDocker, FaGithub } from 'react-icons/fa';
import {
  SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, SiPytorch,
  SiGooglegemini, SiJavascript, SiJupyter, SiPlotly
} from 'react-icons/si';

const iconMap = {
  'Python': <FaPython />,
  'Pandas': <SiPandas />,
  'NumPy': <SiNumpy />,
  'Scikit-learn': <SiScikitlearn />,
  'TensorFlow': <SiTensorflow />,
  'PyTorch': <SiPytorch />,
  'Google Gemini API': <SiGooglegemini />,
  'React': <FaReact />,
  'JavaScript': <SiJavascript />,
  'HTML / CSS': <FaHtml5 />,
  'REST APIs': <Network size={14} />,
  'WebSockets': <Network size={14} />,
  'Jupyter': <SiJupyter />,
  'SQL': <Database size={14} />,
  'Matplotlib': <Code size={14} />,
  'Plotly': <SiPlotly />,
  'Docker': <FaDocker />,
  'Git / GitHub': <FaGithub />,
  'Quantum Computing': <Atom size={14} />,
};

export default function Skills() {
  return (
    <section id="skills" className="section pt-0">
      <div className="container-x">
        <SectionHeading
          eyebrow="Stack"
          title="Skills & Tools"
          description="A pragmatic toolkit picked up from real projects, not bootcamp checklists."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Card hoverable className="h-full p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {group.label}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 border-4 border-ink bg-accent px-2.5 py-1 text-xs font-bold text-ink shadow-neo"
                    >
                      {iconMap[item] && (
                        <span className="flex items-center">
                          {iconMap[item]}
                        </span>
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
