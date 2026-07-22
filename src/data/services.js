// Cards for the "How I Can Help You" section.
// Icon names map to lucide-react components.
// `cta.subject` must match an option in the Contact form dropdown so the
// prefilled subject lands on a real <select> value (see src/components/Contact.jsx).

export const services = [
  {
    id: 'python',
    icon: 'Code2',
    title: 'Python Training',
    description:
      'Beginner to intermediate, project-based. Loops, OOP, file handling and APIs — you leave with real code, not just notes.',
    cta: { label: 'Get Started', subject: 'Python Training Inquiry' },
  },
  {
    id: 'ai-ml',
    icon: 'Brain',
    title: 'AI & ML Training',
    description:
      'Hands-on model building and deployment. Data preprocessing, training, evaluation and shipping a working model with Python.',
    cta: { label: 'Get Started', subject: 'AI & ML Training Inquiry' },
  },
  {
    id: 'web',
    icon: 'Globe',
    title: 'Web Development Training',
    description:
      'HTML to React, build real apps. Responsive layouts, JavaScript and modern React — from first page to a deployed project.',
    cta: { label: 'Get Started', subject: 'Web Development Training Inquiry' },
  },
  {
    id: 'mentoring',
    icon: 'MessageSquare',
    title: '1:1 Mentoring',
    description:
      'Personalized sessions for your specific goals. Concept help, project reviews, or interview prep in Python, AI/ML or Web Dev.',
    cta: { label: 'Get Started', subject: '1:1 Mentoring Session' },
  },
];

export default services;
