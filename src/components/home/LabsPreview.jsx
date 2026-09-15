import { labs } from '../../data/labs.js';
import LabCard from '../cards/LabCard.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';

// Planned entries belong on the Labs index, not in a three-card teaser.
const preview = labs.filter((lab) => lab.status !== 'planned').slice(0, 3);

const TONES = ['cyan', 'accent', 'plain'];

export default function LabsPreview() {
  return (
    <section className="section shell" aria-labelledby="labs-preview">
      <SectionHeader
        id="labs-preview"
        index="03"
        label="Labs"
        title="Experiments that are allowed to be unfinished"
        description="Smaller builds where the point is to find out whether something works. Some ship, some stay prototypes, and the status on each card says which."
        action={{ label: 'All experiments', to: '/labs' }}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((lab, i) => (
          <Reveal key={lab.slug} delay={i * 60} className="h-full">
            <LabCard item={lab} tone={TONES[i % TONES.length]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
