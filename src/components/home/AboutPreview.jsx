import { profile } from '../../data/profile.js';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';

export default function AboutPreview() {
  return (
    <section className="section shell" aria-labelledby="about-preview">
      <SectionHeader
        id="about-preview"
        index="07"
        label="About"
        title="Builder first, teacher because of it"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <Reveal>
          <div className="prose-body max-w-prose text-base">
            {profile.summary.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/about" variant="secondary">
              More about me
            </Button>
            <Button href={profile.resumeUrl} variant="ghost">
              Résumé (PDF)
            </Button>
          </div>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-8">
          <img
            src="/images/profile.jpg"
            alt={`${profile.name}, portrait`}
            width="512"
            height="512"
            loading="lazy"
            decoding="async"
            className="w-40 rounded border-2 border-hard object-cover sm:w-48"
          />

          <dl className="flex flex-col gap-5">
            {profile.signals.map((signal) => (
              <div key={signal.label} className="border-t-2 border-hard pt-3">
                <dt className="label">{signal.label}</dt>
                <dd className="tabular mt-1.5 text-2xl font-semibold text-ink">
                  {signal.value}
                  <span className="mt-1 block text-xs font-normal text-faint">{signal.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
