import AboutPreview from '../components/home/AboutPreview.jsx';
import ContactCta from '../components/home/ContactCta.jsx';
import CurrentFocus from '../components/home/CurrentFocus.jsx';
import Hero from '../components/home/Hero.jsx';
import LabsPreview from '../components/home/LabsPreview.jsx';
import LearnPreview from '../components/home/LearnPreview.jsx';
import SelectedWork from '../components/home/SelectedWork.jsx';
import WhatIBuild from '../components/home/WhatIBuild.jsx';
import WritingPreview from '../components/home/WritingPreview.jsx';
import Seo from '../seo/Seo.jsx';
import { pageMeta } from '../seo/routes.js';
import { personSchema, websiteSchema } from '../seo/schema.js';

export default function Home() {
  return (
    <>
      <Seo
        title={pageMeta.home.title}
        rawTitle
        description={pageMeta.home.description}
        path="/"
        schema={[personSchema(), websiteSchema()]}
      />

      <Hero />
      <SelectedWork />
      <WhatIBuild />
      <LabsPreview />
      <LearnPreview />
      <WritingPreview />
      <CurrentFocus />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
