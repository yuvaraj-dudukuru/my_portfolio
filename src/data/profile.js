// Single source of truth for identity, contact details and verifiable claims.
// Everything here must be factual — if something cannot be evidenced, it does
// not belong in this file.

export const profile = {
  name: 'Yuvaraj Dudukuru',
  shortName: 'Yuvaraj',
  monogram: 'YD',
  title: 'AI & Data Science Engineer',
  positioning: 'I build software, explore emerging technology, and teach what I learn.',
  location: 'Hyderabad, India',
  timezone: 'IST (UTC+5:30)',

  // No email address lives in this file. A published address belongs in
  // src/config/legal.js and reaches the page only through <EmailLink>, which
  // assembles it after mount so it never ships inside the prerendered HTML.
  whatsappNumber: '+91 63050 17247',
  whatsappUrl: 'https://wa.me/916305017247',
  resumeUrl: '/resume.pdf',

  socials: {
    github: 'https://github.com/yuvaraj-dudukuru',
    githubHandle: 'yuvaraj-dudukuru',
    linkedin: 'https://www.linkedin.com/in/yuvaraj-dudukuru',
    linkedinHandle: 'yuvaraj-dudukuru',
  },

  // Short, checkable answer to "what does he actually do".
  summary: [
    'I work across AI and data science engineering, full-stack product development, and technical education. Most of what I build starts as a problem I have run into myself, and ends as something other people can use.',
    'Alongside building, I teach. I run structured, project-based programmes in Python, AI/ML and web development, because explaining a system is the fastest way to find out whether you actually understand it.',
  ],

  roles: [
    { role: 'Co-Founder', org: 'Lumora Space', period: 'Current', current: true },
    { role: 'Founder', org: 'Progressis 2', period: 'Current', current: true },
    { role: 'COO', org: 'Fraylon Technologies', period: 'Past', current: false },
  ],

  credentials: [
    { label: 'CS50: Introduction to Computer Science', issuer: 'Harvard University' },
    { label: 'Inbound Marketing', issuer: 'HubSpot Academy' },
    { label: 'Python & Data Science', issuer: 'Certified' },
  ],

  // Figures the owner can stand behind. Deliberately approximate, never precise
  // numbers that imply tracking that does not exist.
  signals: [
    { value: '100+', label: 'Students taught', note: 'Across 1:1 and cohort sessions' },
    { value: '5+', label: 'Systems shipped', note: 'Deployed and in use or demoable' },
    { value: '3', label: 'Disciplines', note: 'AI/DS, product engineering, teaching' },
  ],
};

export default profile;
