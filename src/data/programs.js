// Structured training programs shown as expandable cards.
// `subject` must match an option in the Contact form dropdown so the prefilled
// "Enroll Now" subject lands on a real <select> value.
// PRICING: `price` values are live launch prices (INR). Update here to change them
// everywhere the training cards render.

export const programs = [
  {
    id: 'python-mastery',
    title: 'Python Mastery',
    level: 'Beginner → Intermediate',
    duration: '4 Weeks',
    mode: 'Online · Live Sessions',
    price: 'Starting ₹4,999',
    badge: null,
    subject: 'Python Training Inquiry',
    description:
      'From zero to building real Python projects. Covers fundamentals, OOP, libraries, and a capstone project.',
    outcome: 'Build 3 working Python projects',
    curriculum: [
      {
        week: 'Week 1',
        title: 'Python Basics',
        topics: ['Variables & data types', 'Loops & conditionals', 'Functions'],
      },
      {
        week: 'Week 2',
        title: 'OOP & Structure',
        topics: ['OOP & classes', 'File handling', 'Error handling & modules'],
      },
      {
        week: 'Week 3',
        title: 'Data Libraries',
        topics: ['Pandas', 'NumPy', 'Matplotlib — manipulation & visualization'],
      },
      {
        week: 'Week 4',
        title: 'Capstone',
        topics: ['Build a real automation or data analysis project', 'Code review & polish'],
      },
    ],
  },
  {
    id: 'ai-ds-foundations',
    title: 'AI & Data Science Foundations',
    level: 'Intermediate',
    duration: '6 Weeks',
    mode: 'Online · Live Sessions',
    price: 'Starting ₹6,999',
    badge: 'Most Popular',
    subject: 'AI & ML Training Inquiry',
    description:
      'Hands-on ML pipeline from data to deployed model. Learn to train, evaluate and ship a real model.',
    outcome: 'Deploy your first ML model',
    curriculum: [
      {
        week: 'Week 1–2',
        title: 'Python for Data Science',
        topics: ['Pandas & NumPy', 'Exploratory data analysis', 'Visualization'],
      },
      {
        week: 'Week 3–4',
        title: 'Machine Learning',
        topics: ['Scikit-learn', 'Model training', 'Model evaluation & tuning'],
      },
      {
        week: 'Week 5',
        title: 'Deep Learning Intro',
        topics: ['Neural network fundamentals', 'TensorFlow / PyTorch basics'],
      },
      {
        week: 'Week 6',
        title: 'Capstone',
        topics: ['End-to-end ML project', 'Model deployment & demo'],
      },
    ],
  },
  {
    id: 'web-dev-bootcamp',
    title: 'Web Development Bootcamp',
    level: 'Beginner → Job-ready',
    duration: '5 Weeks',
    mode: 'Online · Live Sessions',
    price: 'Starting ₹5,499',
    badge: null,
    subject: 'Web Development Training Inquiry',
    description:
      'Build and deploy real web apps from scratch. HTML and CSS through React, ending with a shipped application.',
    outcome: 'Ship a real web application',
    curriculum: [
      {
        week: 'Week 1',
        title: 'HTML & CSS',
        topics: ['Semantic HTML', 'Responsive design', 'Modern CSS layout'],
      },
      {
        week: 'Week 2',
        title: 'JavaScript',
        topics: ['DOM & events', 'fetch & async / await', 'ES6+ patterns'],
      },
      {
        week: 'Week 3',
        title: 'React',
        topics: ['Components', 'State & props', 'Hooks'],
      },
      {
        week: 'Week 4',
        title: 'Full App',
        topics: ['Routing', 'Forms & validation', 'API integration'],
      },
      {
        week: 'Week 5',
        title: 'Deploy',
        topics: ['Deploy a real portfolio or web application', 'Polish & ship'],
      },
    ],
  },
];

export default programs;
