import { capabilities } from '../../data/capabilities.js';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Tag from '../ui/Tag.jsx';

export default function WhatIBuild() {
  return (
    <section className="section shell" aria-labelledby="what-i-build">
      <SectionHeader
        id="what-i-build"
        index="02"
        label="What I build"
        title="Four things, one practice"
        description="These overlap on purpose. The teaching is better because of the building, and the building is clearer because it has to be explained."
      />

      <div className="mt-12 grid gap-0.5 overflow-hidden border-2 border-hard bg-hard sm:grid-cols-2">
        {capabilities.map((capability, i) => (
          <Reveal key={capability.id} delay={i * 60} className="bg-bg p-6 sm:p-8">
            <p className="label">[ {capability.index} ]</p>
            <h3 className="mt-4 text-lg font-extrabold uppercase tracking-tight text-ink">
              {capability.title}
            </h3>
            <p className="prose-body mt-3 text-[0.9375rem]">{capability.description}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {capability.tools.map((tool) => (
                <li key={tool}>
                  <Tag>{tool}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
