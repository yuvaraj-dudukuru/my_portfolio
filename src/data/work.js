// Engineering case studies.
//
// Content rules for this file:
//  - Every architectural and stack claim is taken from the actual repository.
//  - `results` holds outcomes that can be pointed at (a deployed URL, a shipped
//    capability). It never holds invented usage, revenue or performance numbers.
//  - `caseStudyStatus: 'in-progress'` tells the UI to say so plainly instead of
//    padding a thin case study with filler.

export const workDomains = ['All', 'AI/ML', 'Product', 'Automation'];

export const work = [
  {
    slug: 'career-co-pilot',
    index: '001',
    title: 'Career Co-Pilot',
    oneLiner:
      'An AI career advisor that turns a resume into an explainable four-week learning roadmap.',
    year: '2025',
    status: 'MVP',
    domains: ['AI/ML'],
    role: 'Solo — product, backend, frontend, prompt design',
    context: 'Built for the Google Cloud Gen AI Exchange Hackathon.',
    stack: [
      'Google Gemini API',
      'Cloud Functions (Node.js)',
      'Firestore',
      'Firebase Auth',
      'JavaScript',
    ],
    problem:
      'Career guidance is either expensive or generic. A student who wants to move into a specific role gets told to "learn Python" without a sequence, a scope, or any way of telling why that advice was given to them and not to someone else. Handing the whole decision to a language model does not fix that — it replaces vague advice with confident advice you still cannot audit.',
    approach: [
      'Extract skills from an uploaded resume and score them against a target role using a deterministic cosine-similarity match, so the gap analysis is reproducible and inspectable.',
      'Use Gemini for the parts that genuinely need language — explaining the gap, sequencing the work, and answering follow-up questions — rather than for the ranking itself.',
      'Render the result as a concrete four-week plan with weekly breakdowns instead of an open-ended list of topics.',
    ],
    architecture: [
      {
        layer: 'Client',
        detail: 'Vanilla JavaScript on Firebase Hosting; no framework runtime to ship.',
      },
      {
        layer: 'API',
        detail: 'Google Cloud Functions (Node.js) with JSON validation on every input.',
      },
      {
        layer: 'Data',
        detail: 'Firestore, with security rules scoping every document to the owning user UID.',
      },
      {
        layer: 'Model',
        detail: 'Google Gemini API, wrapped in retry and error-handling logic.',
      },
      { layer: 'Auth', detail: 'Firebase Auth with Google Sign-In.' },
    ],
    decisions: [
      {
        title: 'Deterministic matching, generative explanation',
        body: 'Skill matching runs on cosine similarity, not on the model. The same resume and the same target role always produce the same gap. The model writes the plan around that result. This keeps the recommendation auditable, and means a bad generation degrades the explanation rather than the ranking.',
      },
      {
        title: 'Personal characteristics are never inputs',
        body: 'Recommendations are computed from skills and stated goals only. That removes an obvious route to biased output rather than trying to correct for it after the fact.',
      },
      {
        title: 'Deletion as a first-class path',
        body: 'Complete user-data deletion was built alongside the write paths rather than bolted on. Resumes are sensitive documents, and the storage model has to assume people will want them gone.',
      },
    ],
    challenges: [
      'Keeping a non-deterministic model inside a product that has to feel repeatable — solved by moving the decision out of the model and leaving it the language.',
      'Validating unstructured resume input and failing cleanly, without rejecting people whose formatting happens to be unusual.',
    ],
    results: [
      'Working MVP: resume upload, skill extraction, radar-chart gap visualisation, a four-week plan, and a guidance chat.',
      'Data model and security rules built for per-user isolation and complete deletion from day one.',
    ],
    links: {
      github: 'https://github.com/yuvaraj-dudukuru/career_co-pilot',
      live: '',
    },
    caseStudyStatus: 'published',
    featured: true,
  },
  {
    slug: 'whatsapp-automation',
    index: '002',
    title: 'WhatsApp Automation Platform',
    oneLiner:
      'A queue-backed campaign platform for outbound WhatsApp messaging and AI-assisted follow-ups.',
    year: '2025',
    status: 'In development',
    domains: ['Automation', 'Product'],
    role: 'Solo — architecture, backend, frontend, infrastructure',
    context: 'Built to replace manual sales follow-up with something that could run unattended.',
    stack: [
      'TypeScript',
      'Node.js / Express',
      'PostgreSQL / Prisma',
      'BullMQ / Redis',
      'Next.js 14',
      'Docker Compose',
    ],
    problem:
      'Outbound follow-up on WhatsApp does not scale by hand, and it does not scale by brute force either. Send too fast or too uniformly and the number gets flagged. The hard part is not sending messages; it is pacing a campaign across hours, surviving restarts, and knowing what actually went out.',
    approach: [
      'Put every outbound message on a durable queue instead of sending inline, so pacing, retries and restarts become properties of the infrastructure rather than of a running script.',
      'Model contacts, campaigns and templates relationally, so a campaign can be inspected and resumed rather than replayed blindly.',
      'Add generative assistance where it saves real time — drafting messages, suggesting replies, reading sentiment — and keep it out of the delivery path.',
    ],
    architecture: [
      {
        layer: 'Web',
        detail: 'Next.js 14 (App Router) dashboard with Tailwind and shadcn/ui.',
      },
      {
        layer: 'API',
        detail: 'Express + TypeScript service with JWT multi-user authentication.',
      },
      {
        layer: 'Queue',
        detail: 'BullMQ on Redis, with per-message delay windows to pace a campaign.',
      },
      {
        layer: 'Data',
        detail: 'PostgreSQL via Prisma, with migrations checked into the repository.',
      },
      {
        layer: 'Delivery',
        detail: 'Venom-bot headless browser engine driving the WhatsApp session.',
      },
      {
        layer: 'Local infra',
        detail: 'Docker Compose for PostgreSQL and Redis, so a clone boots in one command.',
      },
    ],
    decisions: [
      {
        title: 'A queue, not a loop',
        body: 'Dispatch runs through BullMQ rather than an in-process loop. That buys retries, backoff, visibility into what is pending, and survival across process restarts — none of which a script that sleeps between sends can give you.',
      },
      {
        title: 'Deliberate, non-uniform pacing',
        body: 'Delays are applied between sends to keep traffic in a human range. Bulk messaging that ignores pacing works exactly once before the account is restricted, which makes raw throughput the wrong thing to optimise for.',
      },
      {
        title: 'One repository, one type boundary',
        body: 'API and web live in a single repository with TypeScript on both sides, so a change to the campaign model surfaces as a compile error in the dashboard instead of a runtime bug in production.',
      },
    ],
    challenges: [
      'Keeping a headless browser session alive and recoverable is the fragile part of the system; the queue exists partly so that a dropped session is a retry rather than a lost campaign.',
      'Balancing throughput against deliverability, where the correct answer is almost always "slower".',
    ],
    results: [
      'Campaign scheduling, contact tagging, templating and monitoring working end to end.',
      'Reproducible local environment: Docker Compose plus Prisma migrations.',
    ],
    links: {
      github: 'https://github.com/yuvaraj-dudukuru/WhatsApp_Automation',
      live: '',
    },
    caseStudyStatus: 'published',
    featured: true,
  },
  {
    slug: 'lumora-lms',
    index: '003',
    title: 'Lumora Space LMS',
    oneLiner:
      'The learning platform behind Lumora Space — course delivery, enrolment and progress tracking.',
    year: '2026',
    status: 'Live',
    domains: ['Product'],
    role: 'Founder — product direction and engineering',
    context: 'The delivery layer for my own teaching, rather than a product built for someone else.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Vercel'],
    problem:
      'Teaching through a mix of documents, chat threads and video links puts all of the coordination cost on the student. Course structure, progress and materials needed to live in one place I control, so the curriculum can change without rebuilding how it is delivered.',
    approach: [
      'Build on Next.js with a typed data layer, so course structure is modelled once and reused across enrolment, delivery and progress views.',
      'Keep the schema in Prisma with migrations in the repository, so the curriculum model can evolve safely as programmes change.',
      'Ship continuously to Vercel, with Docker Compose for local parity.',
    ],
    architecture: [
      {
        layer: 'App',
        detail: 'Next.js with TypeScript; server-rendered course and enrolment views.',
      },
      { layer: 'Data', detail: 'Prisma schema and migrations over PostgreSQL.' },
      { layer: 'Deploy', detail: 'Vercel, with Docker Compose for local development parity.' },
    ],
    decisions: [
      {
        title: 'Own the delivery layer',
        body: 'Renting a generic course platform means the course has to fit the platform. Owning it means the platform can follow how the programmes actually run — cohorts, live sessions and project reviews, rather than a library of pre-recorded modules.',
      },
    ],
    challenges: [],
    results: ['Deployed and running at lumora-space-lms.vercel.app.'],
    links: {
      github: 'https://github.com/yuvaraj-dudukuru/LumoraSpace_LMS',
      live: 'https://lumora-space-lms.vercel.app',
    },
    // The repo is real and deployed, but the written case study is still thin.
    // Say so, rather than padding it out.
    caseStudyStatus: 'in-progress',
    featured: true,
  },
];

export function getWork(slug) {
  return work.find((item) => item.slug === slug) ?? null;
}

export const featuredWork = work.filter((item) => item.featured);

export default work;
