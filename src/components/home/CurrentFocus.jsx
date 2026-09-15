import { Link } from 'react-router-dom';
import { now } from '../../data/now.js';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';

const updated = new Date(now.updatedAt).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function CurrentFocus() {
  return (
    <section className="section shell" aria-labelledby="current-focus">
      <SectionHeader
        id="current-focus"
        index="06"
        label="Current focus"
        title="Where the time is going"
        description={`Four strands, honestly weighted. Last updated ${updated}.`}
        action={{ label: 'Full now page', to: '/now' }}
      />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {now.sections.map((section, i) => (
          <Reveal key={section.id} delay={i * 50} className="border-t-2 border-hard pt-5">
            <h3 className="label">{section.label}</h3>
            <ul className="mt-4 flex flex-col gap-4">
              {section.items.map((item) => (
                <li key={item.title}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="rounded text-sm font-medium leading-snug text-ink transition-colors hover:text-accent-text"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium leading-snug text-ink">{item.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
