// Single source of truth for all personal contact info and social links.
// Update this file to change details across the entire site.

export const personal = {
  name: 'Yuvaraj Dudukuru',
  shortName: 'Yuvaraj',
  monogram: 'YD',
  role: 'AI Engineer · Full Stack Developer · COO',
  tagline:
    'I build AI-powered products, scalable web applications, and digital experiences that solve real-world problems.',
  location: 'Hyderabad, India',

  // Hero headline + subtext (conversion-focused: leads with the training offer).
  heroHeadline: 'I Build Systems. I Teach What I Know.',
  heroSubtext:
    'AI & Data Science specialist offering training programs in Python, AI/ML, and Web Development. Based in Hyderabad.',

  // Shows the "🟢 Currently Accepting Students" urgency pill in the hero.
  acceptingStudents: true,

  email: 'dudukuruyuvaraj55@gmail.com',
  whatsappNumber: '916305017247',
  whatsappUrl: 'https://wa.me/916305017247',

  socials: {
    github: 'https://github.com/yuvaraj-dudukuru',
    linkedin: 'https://www.linkedin.com/in/yuvaraj-dudukuru',
    twitter: '', // optional
  },

  // TODO: replace with the actual hosted PDF (e.g. /resume.pdf in /public).
  resumeUrl: '/resume.pdf',

  // Hero typing rotator — cycles through the roles you want to be known for.
  rotatingTitles: [
    'COO of Fraylon Technologies',
    'Founder of Lumora Space',
    'AI/ML Developer',
    'Full-Stack Builder',
  ],

  // Credibility strip shown between the hero and the rest of the page.
  credentials: [
    'Harvard CS50 Certified',
    'HubSpot Academy',
    'Python & Data Science Certified',
    'Worked as: COO @ Fraylon Technologies',
    'Currently: Founder @ Lumora Space',
  ],

  // Stats bar — update numbers as they grow.
  stats: [
    { label: 'Production-Ready Systems', value: 5, suffix: '+' },
    { label: 'Students Tutored', value: 100, suffix: '+' },
    { label: 'Startup in Progress', value: 1, suffix: '' },
  ],
};

export default personal;
