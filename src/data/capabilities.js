// "What I build" — the four things this site is actually about.
// Tool lists name things used in shipped work, not everything ever touched.

export const capabilities = [
  {
    id: 'ai-systems',
    index: '01',
    title: 'AI & data systems',
    description:
      'Pipelines that take real data through to a model you can call, with the evaluation step treated as seriously as the training step. I keep the decisions that need to be reproducible out of the model and leave it the parts that need language.',
    tools: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Gemini API'],
  },
  {
    id: 'product-engineering',
    index: '02',
    title: 'Product engineering',
    description:
      'Full-stack applications with a typed boundary between the client and the data model, so a schema change breaks the build instead of production. Front end through to database and deploy.',
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
  },
  {
    id: 'automation',
    index: '03',
    title: 'Automation & tooling',
    description:
      'Work that should run without someone watching it: queues instead of loops, retries instead of hope, and enough visibility to tell what actually happened after the fact.',
    tools: ['BullMQ', 'Redis', 'Docker', 'REST APIs', 'Firebase', 'Cloud Functions'],
  },
  {
    id: 'teaching',
    index: '04',
    title: 'Teaching & curriculum',
    description:
      'Structured, project-based programmes built the way I would have wanted to learn: short, sequenced, and ending in something that runs. Live delivery, line-by-line code review, and a curriculum that changes when it stops working.',
    tools: ['Curriculum design', 'Live cohorts', '1:1 mentoring', 'Code review'],
  },
];

export default capabilities;
