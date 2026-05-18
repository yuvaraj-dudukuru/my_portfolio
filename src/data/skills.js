// Skills grouped by category. Order within each group is intentional —
// keep the most-relevant items first.

export const skills = [
  {
    id: 'ai',
    label: 'Python & AI/ML',
    items: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Google Gemini API',
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    items: ['React', 'JavaScript', 'HTML / CSS', 'REST APIs', 'WebSockets'],
  },
  {
    id: 'tools',
    label: 'Data & Tools',
    items: ['Jupyter', 'SQL', 'Matplotlib', 'Plotly', 'Docker', 'Git / GitHub'],
  },
  {
    id: 'learning',
    label: 'Currently Learning',
    // TODO: fill in real items — placeholders so the card is not empty.
    items: ['LangChain', 'MLOps basics', 'System design'],
  },
];

export default skills;
