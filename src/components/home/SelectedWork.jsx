import { featuredWork } from '../../data/work.js';

// Header-block colours rotate so a stack of cards has rhythm rather than
// three identical yellow bars.
const TONES = ['accent', 'cyan', 'plain'];
import WorkCard from '../cards/WorkCard.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';

export default function SelectedWork() {
  return (
    <section className="section shell" aria-labelledby="selected-work">
      <SectionHeader
        id="selected-work"
        index="01"
        label="Selected work"
        title="Systems built end to end"
        description="Three projects, written up as case studies: what the problem actually was, how it was put together, and which decisions turned out to matter."
        action={{ label: 'All work', to: '/work' }}
      />

      <div className="mt-12 grid gap-6">
        {featuredWork.map((item, i) => (
          <Reveal key={item.slug} delay={i * 60}>
            <WorkCard item={item} tone={TONES[i % TONES.length]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
