// Learn — courses and learning paths.
//
// Pricing, duration, format and curriculum are the real published offering.
// Anything not yet decided (cohort dates, recording policy) is absent rather
// than guessed at, and unbuilt courses are marked `status: 'planned'` so the UI
// can show "Planned" instead of a fake enrolment button.

export const courseLevels = ['All', 'Beginner', 'Intermediate'];

export const courses = [
  {
    slug: 'python-mastery',
    code: 'PY-101',
    title: 'Python Mastery',
    tagline: 'From first line of code to a project you can actually show someone.',
    status: 'open',
    level: 'Beginner',
    levelDetail: 'Beginner → Intermediate',
    duration: '4 weeks',
    effort: 'Live sessions + project work',
    format: 'Online · Live sessions',
    price: { amount: 4999, currency: 'INR', display: '₹4,999', note: 'Starting price' },
    enrollSubject: 'Python Training Inquiry',
    summary:
      'Most people learning Python stall at the same place: they can follow a tutorial but cannot start from an empty file. This programme is built around that gap. Every week ends with something that runs, and the last week is a project of your own that you take away.',
    outcomes: [
      'Read and write Python confidently — data types, control flow, functions, modules.',
      'Structure a program with classes instead of one long script.',
      'Handle files, errors and external data without guessing.',
      'Work with Pandas, NumPy and Matplotlib on a real dataset.',
      'Finish with a working automation or data-analysis project you built yourself.',
    ],
    prerequisites: [
      'No prior programming experience needed.',
      'A computer you can install Python on, and time to write code between sessions.',
    ],
    modules: [
      {
        n: '01',
        title: 'Python basics',
        duration: 'Week 1',
        topics: ['Variables and data types', 'Loops and conditionals', 'Functions'],
      },
      {
        n: '02',
        title: 'Structure and OOP',
        duration: 'Week 2',
        topics: ['Classes and objects', 'File handling', 'Errors, exceptions and modules'],
      },
      {
        n: '03',
        title: 'Working with data',
        duration: 'Week 3',
        topics: ['Pandas', 'NumPy', 'Matplotlib — manipulation and visualisation'],
      },
      {
        n: '04',
        title: 'Capstone',
        duration: 'Week 4',
        topics: ['Build a real automation or data-analysis project', 'Code review and polish'],
      },
    ],
    projects: [
      'A capstone automation or data-analysis project, chosen with you and reviewed line by line.',
    ],
  },
  {
    slug: 'ai-data-science-foundations',
    code: 'AI-201',
    title: 'AI & Data Science Foundations',
    tagline: 'Train a model, evaluate it honestly, and deploy it somewhere real.',
    status: 'open',
    featured: true,
    level: 'Intermediate',
    levelDetail: 'Intermediate',
    duration: '6 weeks',
    effort: 'Live sessions + project work',
    format: 'Online · Live sessions',
    price: { amount: 6999, currency: 'INR', display: '₹6,999', note: 'Starting price' },
    enrollSubject: 'AI & ML Training Inquiry',
    summary:
      'A model that scores well in a notebook and a model that works are different things. This programme runs the full pipeline — data in, trained model out, deployed and callable — with the evaluation step treated as seriously as the training step.',
    outcomes: [
      'Explore and clean a real dataset before modelling it.',
      'Train models with scikit-learn and understand what each one assumes.',
      'Evaluate and tune honestly — the difference between a good score and a good model.',
      'Understand neural network fundamentals and build one in TensorFlow or PyTorch.',
      'Deploy a trained model and demo it end to end.',
    ],
    prerequisites: [
      'Comfortable writing Python — functions, loops, working with libraries.',
      'Python Mastery, or equivalent experience, is a good starting point.',
      'Basic familiarity with school-level statistics helps but is taught where needed.',
    ],
    modules: [
      {
        n: '01',
        title: 'Python for data science',
        duration: 'Weeks 1–2',
        topics: ['Pandas and NumPy', 'Exploratory data analysis', 'Visualisation'],
      },
      {
        n: '02',
        title: 'Machine learning',
        duration: 'Weeks 3–4',
        topics: ['scikit-learn', 'Model training', 'Evaluation and tuning'],
      },
      {
        n: '03',
        title: 'Deep learning introduction',
        duration: 'Week 5',
        topics: ['Neural network fundamentals', 'TensorFlow / PyTorch basics'],
      },
      {
        n: '04',
        title: 'Capstone',
        duration: 'Week 6',
        topics: ['End-to-end ML project', 'Model deployment and demo'],
      },
    ],
    projects: ['An end-to-end machine learning project, trained, evaluated and deployed.'],
  },
  {
    slug: 'web-development',
    code: 'WEB-101',
    title: 'Web Development',
    tagline: 'Build a real web application and put it on the internet.',
    status: 'open',
    level: 'Beginner',
    levelDetail: 'Beginner → Job-ready',
    duration: '5 weeks',
    effort: 'Live sessions + project work',
    format: 'Online · Live sessions',
    price: { amount: 5499, currency: 'INR', display: '₹5,499', note: 'Starting price' },
    enrollSubject: 'Web Development Training Inquiry',
    summary:
      'Front-end teaching usually stops at the point where things get real: routing, forms, API calls and deployment. This programme goes from semantic HTML through to a React application you have deployed and can send someone a link to.',
    outcomes: [
      'Write semantic, responsive HTML and modern CSS layouts.',
      'Use JavaScript properly — the DOM, events, fetch, async/await, ES6+.',
      'Build with React: components, state, props and hooks.',
      'Wire up routing, forms, validation and API integration.',
      'Deploy a real application and understand what happens when you do.',
    ],
    prerequisites: [
      'No prior web development experience needed.',
      'Comfortable using a computer and willing to type rather than copy.',
    ],
    modules: [
      {
        n: '01',
        title: 'HTML & CSS',
        duration: 'Week 1',
        topics: ['Semantic HTML', 'Responsive design', 'Modern CSS layout'],
      },
      {
        n: '02',
        title: 'JavaScript',
        duration: 'Week 2',
        topics: ['DOM and events', 'fetch and async/await', 'ES6+ patterns'],
      },
      {
        n: '03',
        title: 'React',
        duration: 'Week 3',
        topics: ['Components', 'State and props', 'Hooks'],
      },
      {
        n: '04',
        title: 'A full application',
        duration: 'Week 4',
        topics: ['Routing', 'Forms and validation', 'API integration'],
      },
      {
        n: '05',
        title: 'Ship it',
        duration: 'Week 5',
        topics: ['Deploy a real application', 'Polish and hand-off'],
      },
    ],
    projects: ['A deployed web application — your portfolio or a product idea of your own.'],
  },
  {
    slug: 'llm-engineering',
    code: 'AI-301',
    title: 'LLM Engineering',
    tagline: 'Building reliable products on top of unreliable models.',
    status: 'planned',
    level: 'Intermediate',
    levelDetail: 'Advanced',
    duration: 'TBC',
    effort: 'TBC',
    format: 'Online · Live sessions',
    price: null,
    enrollSubject: 'LLM Engineering — notify me',
    summary:
      'Retrieval, evaluation, tool use, cost and latency — the engineering around a model rather than the model itself. Curriculum is being written; dates and pricing are not set.',
    outcomes: [],
    prerequisites: [],
    modules: [],
    projects: [],
  },
];

// Mentoring is an offering, not a course — different shape, different commitment.
export const mentoring = {
  title: '1:1 Mentoring',
  tagline: 'Your problem, your codebase, your timeline.',
  format: 'Online · Scheduled sessions',
  enrollSubject: '1:1 Mentoring Session',
  points: [
    'Concept help in Python, AI/ML or web development.',
    'Project and code review — line by line, not a summary.',
    'Interview and final-year project preparation.',
  ],
};

// Learning paths sequence courses into a route to a role. Steps without a
// `course` are honestly marked as not yet built.
export const paths = [
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    summary:
      'The route from writing your first Python script to shipping a model that other people depend on. Four of the seven stages exist today; the rest are being built in order.',
    steps: [
      { title: 'Python', course: 'python-mastery' },
      { title: 'Mathematics', course: null, note: 'Linear algebra, probability and statistics for ML' },
      { title: 'Data analysis', course: 'ai-data-science-foundations' },
      { title: 'Machine learning', course: 'ai-data-science-foundations' },
      { title: 'Deep learning', course: 'ai-data-science-foundations' },
      { title: 'LLM engineering', course: 'llm-engineering' },
      { title: 'Production AI', course: null, note: 'Serving, monitoring, cost and evaluation in production' },
    ],
  },
  {
    slug: 'full-stack-engineering',
    title: 'Full-Stack Engineering',
    summary:
      'From markup to a deployed application. The front-end half runs today; back-end and data stages are next.',
    steps: [
      { title: 'HTML & CSS', course: 'web-development' },
      { title: 'JavaScript', course: 'web-development' },
      { title: 'React', course: 'web-development' },
      { title: 'APIs & databases', course: null, note: 'REST, data modelling and persistence' },
      { title: 'Deployment & operations', course: null, note: 'CI, environments and monitoring' },
    ],
  },
];

// Answers here are either published facts or an honest "ask me". No invented
// refund, recording or guarantee policies.
export const courseFaq = [
  {
    q: 'How are sessions delivered?',
    a: 'Online, as live sessions. They are interactive — you write code during them, not after.',
  },
  {
    q: 'Do I need prior experience?',
    a: 'It depends on the course. Each one lists its prerequisites on its page; the beginner programmes assume none.',
  },
  {
    q: 'What do I finish with?',
    a: 'A project you built and can explain, reviewed with you. Not a certificate of attendance.',
  },
  {
    q: 'How do I enrol?',
    a: 'Send an enquiry from the course page or message me on WhatsApp. I will confirm the next cohort dates, what to install, and how payment works before you commit to anything.',
  },
  {
    q: 'Can the curriculum be adapted?',
    a: 'For 1:1 mentoring, yes — that is the point of it. Cohort courses follow the published curriculum.',
  },
  {
    q: 'Something else?',
    a: 'Ask. If the answer is not on this page it is because it has not been decided yet, and I would rather tell you that directly than publish a policy I have not thought through.',
  },
];

export function getCourse(slug) {
  return courses.find((item) => item.slug === slug) ?? null;
}

export const openCourses = courses.filter((c) => c.status === 'open');

export default courses;
