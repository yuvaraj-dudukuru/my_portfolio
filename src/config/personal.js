// Single source of truth for all personal contact info and social links.
// Update this file to change details across the entire site.

export const personal = {
  name: 'Yuvaraj Dudukuru',
  shortName: 'Yuvaraj',
  monogram: 'YD',
  role: 'AI Engineer · Full Stack Developer · COO',
  tagline:
    'I build AI-powered products, scalable web applications, and digital experiences that solve real-world problems.',
  location: 'India',

  email: 'yuvarajdudukuru55@gmail.com',
  whatsappNumber: '916305017247',
  whatsappUrl: 'https://wa.me/916305017247',

  socials: {
    github: 'https://github.com/yuvaraj-dudukuru',
    linkedin: 'https://www.linkedin.com/in/yuvaraj-dudukuru',
    twitter: '', // optional
  },

  // TODO: replace with the actual hosted PDF (e.g. /resume.pdf in /public).
  resumeUrl: '/resume.pdf',

  // Hero typing rotator
  rotatingTitles: [
    'Python Developer',
    'AI/ML Enthusiast',
    'Full-Stack Builder',
    'Python Trainer',
  ],

  // Stats bar — update numbers as they grow.
  stats: [
    { label: 'Projects Built', value: 3, suffix: '+' },
    { label: 'Students Tutored', value: 10, suffix: '+' }, // TODO: confirm real number
    { label: 'Startup in Progress', value: 1, suffix: '' },
  ],
};

export default personal;
