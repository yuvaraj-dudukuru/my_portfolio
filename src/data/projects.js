// All project entries used by the Projects section.
// Add new entries by following the same shape — `tags` controls the filter pills.

const base = import.meta.env.BASE_URL;

export const projectTags = ['All', 'AI/ML', 'Web', 'Automation'];

export const projects = [
  {
    id: 'career-copilot',
    title: 'Career Co-Pilot',
    tagline: 'AI career advisor with personalized 4-week roadmaps',
    description:
      "AI-powered career advisor that generates personalized 4-week learning roadmaps based on your skills, interests, and goals. Combines Google Gemini with deterministic skill matching for transparent, fair recommendations.",
    image: `${base}images/career-copilot.png`,
    tags: ['AI/ML'],
    stack: ['Python', 'Google Gemini', 'Streamlit', 'Pandas'],
    links: {
      github: 'https://github.com/yuvaraj-dudukuru/career_co-pilot',
      // TODO: add live demo URL when deployed
      live: '',
    },
    featured: true,
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    tagline: 'Enterprise bulk messaging & AI-driven campaigns',
    description:
      'Enterprise-ready bulk messaging and campaign management platform with AI-powered conversational interactions. Handles scheduling, templates, and analytics out of the box.',
    image: `${base}images/whatsapp-automation.png`,
    tags: ['Automation', 'Web'],
    stack: ['Full-Stack', 'WhatsApp API', 'AI', 'Automation'],
    links: {
      github: 'https://github.com/yuvaraj-dudukuru/WhatsApp_Automation',
      live: '',
    },
    featured: true,
  },
  {
    id: 'realtime-chat',
    title: 'Real-time Chat App',
    tagline: 'Bidirectional WebSocket chat with full-stack integration',
    description:
      'Full-stack real-time chat application using the WebSocket protocol for true bidirectional communication. Includes rooms, presence, and persistent message history.',
    image: `${base}images/realtime-chat.jfif`,
    tags: ['Web'],
    stack: ['Node.js', 'WebSockets', 'JavaScript', 'Full-Stack'],
    links: {
      // TODO: confirm actual repo URL
      github: 'https://github.com/yuvaraj-dudukuru',
      live: '',
    },
  },
  // TODO: Add 2-3 more projects as they ship.
  // {
  //   id: 'next-project',
  //   title: '',
  //   tagline: '',
  //   description: '',
  //   image: `${base}images/next-project.png`,
  //   tags: ['AI/ML'],
  //   stack: [],
  //   links: { github: '', live: '' },
  // },
];

export default projects;
