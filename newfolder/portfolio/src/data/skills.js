export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    label: 'Languages',
    accent: 'text-blue bg-blue/10 ring-blue/25',
    dot: 'bg-blue',
    skills: [
      { name: 'Java', icon: 'Coffee' },
      { name: 'C++', icon: 'Cpu' },
      { name: 'JavaScript', icon: 'Braces' },
      { name: 'SQL', icon: 'Table2' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: 'text-violet bg-violet/10 ring-violet/25',
    dot: 'bg-violet',
    skills: [
      { name: 'Spring Boot', icon: 'Leaf' },
      { name: 'Spring Security', icon: 'ShieldCheck' },
      { name: 'Spring AI', icon: 'Bot' },
      { name: 'REST APIs', icon: 'Globe' },
      { name: 'Hibernate', icon: 'Layers' },
      { name: 'JPA', icon: 'Database' },
      { name: 'Microservices', icon: 'Boxes' },
      { name: 'JWT', icon: 'KeyRound' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    accent: 'text-gold bg-gold/10 ring-gold/25',
    dot: 'bg-gold',
    skills: [
      { name: 'React', icon: 'Atom' },
      { name: 'Tailwind CSS', icon: 'Wind' },
      { name: 'HTML', icon: 'FileCode' },
      { name: 'CSS', icon: 'Palette' },
      { name: 'Material UI', icon: 'Component' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    accent: 'text-emerald-400 bg-emerald-400/10 ring-emerald-400/25',
    dot: 'bg-emerald-400',
    skills: [
      { name: 'MySQL', icon: 'Database' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'MongoDB', icon: 'Leaf' },
      { name: 'MariaDB', icon: 'Database' },
      { name: 'H2', icon: 'Database' },
    ],
  },
  {
    id: 'ai-tools',
    label: 'AI & Tools',
    accent: 'text-fuchsia-400 bg-fuchsia-400/10 ring-fuchsia-400/25',
    dot: 'bg-fuchsia-400',
    skills: [
      { name: 'LangChain4j', icon: 'Link2' },
      { name: 'LangGraph4j', icon: 'Workflow' },
      { name: 'RAG', icon: 'Search' },
      { name: 'Vector Databases', icon: 'Boxes' },
      { name: 'Ollama', icon: 'Bot' },
      { name: 'Docker', icon: 'Container' },
      { name: 'Git', icon: 'GitBranch' },
      { name: 'GitHub', icon: 'GitHubIcon' },
      { name: 'Apache Kafka', icon: 'Waypoints' },
      { name: 'Postman', icon: 'Send' },
    ],
  },
]

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill, categoryId: category.id }))
)
