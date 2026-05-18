// Structured training programs shown as expandable cards.

export const programs = [
  {
    id: 'python-mastery',
    title: 'Python Mastery',
    level: 'Beginner → Intermediate',
    duration: '4 weeks',
    mode: 'Online · 1:1 or group',
    price: 'Contact for pricing', // TODO: replace with actual price
    badge: null,
    outcome: 'Build 3 real Python projects',
    curriculum: [
      {
        week: 'Week 1',
        title: 'Basics',
        topics: ['Variables & data types', 'Loops & conditionals', 'Functions & scope'],
      },
      {
        week: 'Week 2',
        title: 'OOP & Robustness',
        topics: ['Classes & inheritance', 'File handling', 'Error handling & logging'],
      },
      {
        week: 'Week 3',
        title: 'Libraries',
        topics: ['Pandas', 'NumPy', 'Matplotlib basics'],
      },
      {
        week: 'Week 4',
        title: 'Mini-project',
        topics: ['Pick a track: data analysis or automation script', 'Code review & polish'],
      },
    ],
  },
  {
    id: 'ai-ds-foundations',
    title: 'AI & Data Science Foundations',
    level: 'Intermediate',
    duration: '6 weeks',
    mode: 'Online',
    price: 'Contact for pricing', // TODO: replace with actual price
    badge: 'Most Popular',
    outcome: 'Deploy your first ML model',
    curriculum: [
      {
        week: 'Week 1–2',
        title: 'Python for Data Science',
        topics: ['Pandas deep-dive', 'NumPy ops & broadcasting', 'Visualization with Matplotlib & Plotly'],
      },
      {
        week: 'Week 3–4',
        title: 'Machine Learning',
        topics: ['Supervised learning', 'Model evaluation & tuning', 'Scikit-learn pipelines'],
      },
      {
        week: 'Week 5',
        title: 'Deep Learning Intro',
        topics: ['Neural network fundamentals', 'TensorFlow / PyTorch basics'],
      },
      {
        week: 'Week 6',
        title: 'Capstone',
        topics: ['End-to-end ML pipeline', 'Model deployment & demo'],
      },
    ],
  },
  {
    id: 'web-dev-bootcamp',
    title: 'Web Development Bootcamp',
    level: 'Beginner → Job-ready',
    duration: '5 weeks',
    mode: 'Online',
    price: 'Contact for pricing', // TODO: replace with actual price
    badge: 'Recommended',
    outcome: 'Ship a real web application',
    curriculum: [
      {
        week: 'Week 1',
        title: 'HTML & CSS',
        topics: ['Semantic HTML', 'Responsive design', 'Modern CSS layout (Flexbox & Grid)'],
      },
      {
        week: 'Week 2',
        title: 'JavaScript',
        topics: ['DOM & events', 'Async / await & fetch', 'ES6+ patterns'],
      },
      {
        week: 'Week 3',
        title: 'React Basics',
        topics: ['Components', 'State & props', 'Hooks'],
      },
      {
        week: 'Week 4',
        title: 'Building a Full UI',
        topics: ['Routing', 'Forms & validation', 'API integration'],
      },
      {
        week: 'Week 5',
        title: 'Deploy',
        topics: ['Build pipeline', 'Hosting (GitHub Pages / Vercel)', 'Polish & ship'],
      },
    ],
  },
];

export default programs;
