import { motion } from 'framer-motion';
import { skills } from '../data/skills.js';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';

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
              viewport={{ once: true, margin: '-10%' }}
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
                      className="border-4 border-ink bg-accent px-2.5 py-1 text-xs font-bold text-ink shadow-neo"
                    >
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
