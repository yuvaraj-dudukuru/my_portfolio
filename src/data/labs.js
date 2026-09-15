// Labs — experiments, prototypes and small research builds.
//
// Labs are deliberately lower-ceremony than Work: an experiment is allowed to be
// unfinished, and the entry says so. `status` drives the badge in the UI.
//   shipped   — running somewhere you can click
//   active    — being worked on now
//   planned   — intent only. No links, no claims. Shown as "Planned".
//   archived  — done with, kept for the record

export const labStatuses = {
  shipped: { label: 'Shipped', tone: 'positive' },
  active: { label: 'In progress', tone: 'accent' },
  planned: { label: 'Planned', tone: 'muted' },
  archived: { label: 'Archived', tone: 'muted' },
};

export const labs = [
  {
    slug: 'dieline-to-3d',
    index: '001',
    title: 'Dieline to 3D fold preview',
    status: 'shipped',
    date: '2026-07',
    summary:
      'Parses a 2D packaging dieline PDF, reconstructs the box geometry, and animates it folding into 3D in the browser.',
    body: [
      'Packaging artwork is designed flat. Whether it folds into the intended box is something people usually find out from a physical sample. This prototype reads the dieline directly: it extracts crease and cut geometry from an uploaded PDF, reconstructs the panel net, and plays the fold as a scrubbable animation.',
      'The interesting part is not the rendering — it is deciding which lines are creases, which are cuts, and how the resulting panels hinge relative to one another. Everything runs client-side; the PDF never leaves the browser.',
    ],
    tech: ['Three.js', 'Vite', 'Node.js', 'PDF parsing'],
    links: {
      demo: 'https://sivi-quant-labs-build-challenge.vercel.app',
      source: 'https://github.com/yuvaraj-dudukuru/SiviQuantLabs_Build_Challenge',
    },
  },
  {
    slug: '3d-sofa-configurator',
    index: '002',
    title: '3D sofa configurator',
    status: 'shipped',
    date: '2026-08',
    summary:
      'Real-time WebGL product configurator: assemble a modular sofa from components and swap materials on the fly.',
    body: [
      'A modular furniture configurator built to work out how far a browser can be pushed on real-time product visualisation. Components — backs, seats, arms — snap together with expansion indicators showing where a piece can extend, and materials are grouped so a leather or metal swap applies consistently across every part that should change.',
      'Most of the work sits in the asset pipeline rather than the renderer: naming conventions on the 3D models drive which material group a surface belongs to, which keeps adding a new component a data change instead of a code change.',
    ],
    tech: ['Three.js', 'WebGL', 'JavaScript'],
    links: {
      demo: 'https://3-d-sofa-configurator-omega.vercel.app',
      source: 'https://github.com/yuvaraj-dudukuru/3D-sofa-configurator',
    },
  },
  {
    slug: 'verifiable-certificates',
    index: '003',
    title: 'Tamper-evident certificates',
    status: 'active',
    date: '2026-07',
    summary:
      'HMAC-signed training certificates with QR codes that resolve to a public verification endpoint.',
    body: [
      'A certificate is only worth anything if a third party can check it. This build signs each certificate number with an HMAC and encodes it into a QR code that resolves to a public verify page, which answers with one of four states: valid, revoked, tampered, or not found.',
      'The original spec round-tripped through several services to render a PDF. The implementation collapses that: the app posts directly to the render service with a bearer token and gets the PDF back. Fewer hops, fewer places for a signature to be re-derived incorrectly.',
      'Phase one (signing, QR generation, certificate-number parsing) is done. The public verification page and API are in progress; the render service and admin panel are not started.',
    ],
    tech: ['Next.js 14', 'Supabase / Postgres RLS', 'Upstash Redis', 'HMAC', 'Vitest'],
    links: {
      demo: '',
      source: 'https://github.com/yuvaraj-dudukuru/qr_certificate_auto_NGO',
    },
  },
  {
    slug: 'quantum-computing',
    index: '004',
    title: 'Quantum computing fundamentals',
    status: 'planned',
    date: '',
    summary:
      'Working through the fundamentals — qubits, gates, and the small set of algorithms where quantum actually wins.',
    body: [
      'Currently reading and working through exercises rather than building. When there is something worth showing — a simulated circuit, a worked comparison against the classical equivalent — it will appear here.',
      'No demo yet, and nothing to claim expertise about.',
    ],
    tech: [],
    links: { demo: '', source: '' },
  },
];

export function getLab(slug) {
  return labs.find((item) => item.slug === slug) ?? null;
}

export default labs;
