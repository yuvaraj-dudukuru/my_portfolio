import LabCard from '../components/cards/LabCard.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { labs } from '../data/labs.js';

const TONES = ['cyan', 'accent', 'plain'];
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';

export default function Labs() {
  const shipped = labs.filter((lab) => lab.status === 'shipped').length;

  return (
    <>
      <Seo
        title={pageMeta.labs.title}
        description={pageMeta.labs.description}
        path={pageMeta.labs.path}
      />

      <PageHeader
        label="Labs"
        title="Experiments, in the open"
        lede="Smaller builds where the point is to find out whether an idea works. Work has to be finished to appear here; a lab does not — the status on each one tells you which it is."
        meta={
          <>
            <span className="font-mono text-[0.6875rem] text-faint">
              {labs.length} experiments
            </span>
            <span className="font-mono text-[0.6875rem] text-faint">{shipped} shipped</span>
          </>
        }
      />

      <div className="shell pb-10">
        {/* Cards carry h3 headings; this stops the outline skipping h2. */}
        <h2 className="sr-only">Experiments</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab, i) => (
            <Reveal key={lab.slug} delay={i * 50} className="h-full">
              <LabCard item={lab} tone={TONES[i % TONES.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
