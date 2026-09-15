// The /now page: what is actually true this month.
//
// This file is meant to be edited often. Update `updatedAt` whenever you change
// anything below — the page prints it, and a stale "now" page is worse than no
// now page at all.

export const now = {
  updatedAt: '2026-09-16',
  location: 'Hyderabad, India',
  intro:
    'A snapshot of what has my attention right now. Everything below is current as of the date above — if it looks stale, it is.',
  sections: [
    {
      id: 'building',
      label: 'Building',
      items: [
        {
          title: 'Lumora Space LMS',
          detail:
            'The platform my courses run on. Currently working on how cohorts, sessions and project reviews are modelled.',
          href: '/work/lumora-lms',
        },
        {
          title: 'Tamper-evident certificates',
          detail:
            'HMAC-signed certificates with a public verification endpoint. Signing and QR generation are done; the verify page and API are in progress.',
          href: '/labs/verifiable-certificates',
        },
        {
          title: 'This site',
          detail:
            'Rebuilt as a platform rather than a portfolio page — work, labs, courses and writing under one roof.',
          href: '',
        },
      ],
    },
    {
      id: 'learning',
      label: 'Learning',
      items: [
        {
          title: 'Quantum computing fundamentals',
          detail:
            'Qubits, gates, and the specific problems where quantum has an actual advantage. Early — reading and exercises, nothing built yet.',
          href: '/labs/quantum-computing',
        },
        {
          title: 'LLM engineering in production',
          detail:
            'Retrieval, evaluation and cost control. The engineering around a model rather than the model itself, which is also what the next course will cover.',
          href: '/learn/llm-engineering',
        },
      ],
    },
    {
      id: 'teaching',
      label: 'Teaching',
      items: [
        {
          title: 'Python, AI/ML and web development cohorts',
          detail:
            'Three live programmes running online, each ending in a project rather than a test.',
          href: '/learn',
        },
        {
          title: '1:1 mentoring',
          detail:
            'Concept help, code review and final-year project support, scheduled around whatever you are stuck on.',
          href: '/learn',
        },
      ],
    },
    {
      id: 'exploring',
      label: 'Exploring',
      items: [
        {
          title: 'Browser-native 3D',
          detail:
            'Three.js experiments — a dieline-to-3D folding preview and a real-time product configurator. Both shipped, both still interesting.',
          href: '/labs',
        },
        {
          title: 'Writing more, in public',
          detail:
            'Turning the decisions behind these builds into articles. Nothing published yet; the first pieces are drafted.',
          href: '/writing',
        },
      ],
    },
  ],
};

export default now;
