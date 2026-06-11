// ─────────────────────────────────────────────────────────
//  lib/data/portfolio.ts  — Single source of truth
//  Edit this file to update all portfolio content
// ─────────────────────────────────────────────────────────

export const personal = {
  name:       'Muhammad Abdullah',
  firstName:  'Muhammad',
  lastName:   'Abdullah',
  initials:   'MA',
  title:      'Full Stack Developer & IT Student',
  rotatingTitles: [
    'Full Stack Apps',
    'AI Solutions',
    'REST APIs',
    'SaaS Products',
    'Modern UIs',
    'Backend Systems',
  ],
  bio: `I'm Muhammad Abdullah, an IT student and Full Stack Developer focused on crafting high-quality digital products. I believe great software is equal parts engineering and design.

My journey started with curiosity — taking apart websites to understand how they worked. Today I build full-stack applications, integrate AI/ML solutions, and design systems that scale.

When I'm not coding, I'm reading about emerging tech, contributing to open source, or exploring how AI can solve real human problems.`,
  shortBio: 'IT Student & Full Stack Developer passionate about building scalable web applications, AI-powered solutions, and clean digital experiences.',
  location:  'Pakistan',
  email:     'm.abdullah@email.com',
  available: true,
  tags:      ['Problem Solver', 'Clean Code', 'AI Enthusiast', 'Open Source', 'Continuous Learner'],
  stats:     { yearsLearning: 3, projectsBuilt: 15, technologiesUsed: 12 },
  socials: {
    github:   'https://github.com/muhammad-abdullah',
    linkedin: 'https://linkedin.com/in/muhammad-abdullah',
    whatsapp: 'https://wa.me/923001234567',
    twitter:  'https://twitter.com/muhammad_dev',
  },
  resumeUrl: '/resume/Muhammad_Abdullah_CV.pdf',
}

export const skillCategories = [
  {
    category: 'Frontend',
    items: [
      { name: 'React',        percentage: 85 },
      { name: 'Next.js',      percentage: 82 },
      { name: 'TypeScript',   percentage: 78 },
      { name: 'Tailwind CSS', percentage: 90 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', percentage: 80 },
      { name: 'NestJS',  percentage: 70 },
      { name: 'Python',  percentage: 75 },
      { name: 'Flask',   percentage: 68 },
    ],
  },
  {
    category: 'Database & DevOps',
    items: [
      { name: 'MongoDB',    percentage: 74 },
      { name: 'MySQL',      percentage: 72 },
      { name: 'Docker',     percentage: 60 },
      { name: 'Git/GitHub', percentage: 85 },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'AI/ML Basics',  percentage: 65 },
      { name: 'LangChain',     percentage: 55 },
      { name: 'OpenAI API',    percentage: 70 },
      { name: 'Data Analysis', percentage: 60 },
    ],
  },
]

export const services = [
  { icon: 'web',        title: 'Web Development',       description: 'Responsive, performant websites built with modern frameworks and best practices.' },
  { icon: 'code',       title: 'Full Stack Development', description: 'End-to-end applications from database architecture to polished UI.' },
  { icon: 'psychology', title: 'AI Integration',         description: 'Embedding LLMs and ML models into real products that solve actual problems.' },
  { icon: 'palette',    title: 'UI/UX Design',           description: 'Clean, accessible interfaces that convert visitors and delight users.' },
  { icon: 'storage',    title: 'Database Design',        description: 'Scalable schema design for SQL and NoSQL systems with performance in mind.' },
  { icon: 'cloud',      title: 'SaaS Development',       description: 'Building subscription-based products from scratch with auth, billing & dashboards.' },
  { icon: 'api',        title: 'API Development',        description: 'RESTful and GraphQL APIs with comprehensive documentation and versioning.' },
  { icon: 'smart_toy',  title: 'Automation',             description: 'Scripts, bots, and workflows that eliminate repetitive tasks and save time.' },
]

export const projects = [
  {
    id: '1',
    title: 'AI Chat Assistant',
    slug: 'ai-chat-assistant',
    shortDescription: 'Full-stack conversational AI with context memory and multi-model support.',
    description: 'A full-stack conversational AI application with persistent context memory, multi-model support (GPT-4, Claude), streaming responses, conversation history, and a clean chat interface built with Next.js.',
    techStack: ['Next.js', 'OpenAI API', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    features: ['Multi-model AI support', 'Persistent context memory', 'Streaming responses', 'Conversation history', 'Dark mode UI'],
    status: 'live' as const,
    category: 'AI' as const,
    featured: true,
    githubUrl: 'https://github.com/muhammad-abdullah/ai-chat',
    liveUrl: 'https://ai-chat.vercel.app',
    gradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
    icon: '🤖',
  },
  {
    id: '2',
    title: 'SaaS Analytics Dashboard',
    slug: 'saas-analytics-dashboard',
    shortDescription: 'Real-time analytics platform with customizable widgets and team roles.',
    description: 'A comprehensive analytics SaaS platform featuring real-time data visualization, customizable dashboard widgets, multi-tenant architecture, role-based access control, CSV/PDF exports, and subscription billing.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Docker', 'Chart.js'],
    features: ['Real-time charts', 'Custom widgets', 'Team roles & permissions', 'CSV/PDF export', 'Subscription billing'],
    status: 'live' as const,
    category: 'SaaS' as const,
    featured: true,
    githubUrl: 'https://github.com/muhammad-abdullah/saas-dashboard',
    liveUrl: 'https://saas-dashboard.vercel.app',
    gradient: 'from-[#0d1117] via-[#161b22] to-[#1a2332]',
    icon: '📊',
  },
  {
    id: '3',
    title: 'E-Commerce REST API',
    slug: 'ecommerce-rest-api',
    shortDescription: 'Production-grade API with JWT auth, payments, and inventory management.',
    description: 'A production-ready RESTful API built with NestJS featuring JWT authentication, Stripe payment integration, inventory management, order tracking, admin panel, and comprehensive Swagger docs.',
    techStack: ['NestJS', 'MongoDB', 'Mongoose', 'Docker', 'Swagger'],
    features: ['JWT Authentication', 'Stripe payments', 'Inventory system', 'Order tracking', 'Swagger docs'],
    status: 'live' as const,
    category: 'Full Stack' as const,
    featured: true,
    githubUrl: 'https://github.com/muhammad-abdullah/ecommerce-api',
    liveUrl: '',
    gradient: 'from-[#1a0a2e] via-[#16082e] to-[#0f0520]',
    icon: '🛒',
  },
  {
    id: '4',
    title: 'Python Automation Suite',
    slug: 'python-automation-suite',
    shortDescription: 'CLI tools that automate file management, scraping, and data pipelines.',
    description: 'A collection of Python automation tools including web scraping pipelines, file management systems, email automation, scheduled data collection, and reporting dashboards.',
    techStack: ['Python', 'Flask', 'MongoDB', 'Selenium', 'Pandas'],
    features: ['Web scraping', 'Email automation', 'Scheduled tasks', 'Data reports', 'CLI interface'],
    status: 'draft' as const,
    category: 'Tools' as const,
    featured: false,
    githubUrl: 'https://github.com/muhammad-abdullah/python-automation',
    liveUrl: '',
    gradient: 'from-[#0d1f0d] via-[#112211] to-[#0a1a0a]',
    icon: '⚙️',
  },
]

export const experience = [
  {
    role: 'IT Student',
    company: 'University / College',
    period: '2022 – Present',
    description: 'Pursuing a degree in Information Technology, studying software engineering, databases, networking, and AI fundamentals.',
    type: 'education',
  },
  {
    role: 'Open Source Contributor',
    company: 'GitHub',
    period: '2024 – Present',
    description: 'Contributing bug fixes, features, and documentation to open-source projects in the JavaScript/TypeScript ecosystem.',
    type: 'achievement',
  },
  {
    role: 'AI/ML Explorer',
    company: 'Personal Projects',
    period: '2024 – Present',
    description: 'Building AI-powered applications using OpenAI APIs, LangChain, and custom ML models integrated into full-stack products.',
    type: 'project',
  },
  {
    role: 'Full Stack Developer (Freelance)',
    company: 'Independent',
    period: '2023 – Present',
    description: 'Delivering full-stack web applications for clients — from requirements gathering and system design to deployment and maintenance.',
    type: 'work',
  },
  {
    role: 'Self-Taught Developer',
    company: 'Online Platforms',
    period: '2021 – 2023',
    description: 'Completed 1000+ hours of structured learning across React, Node.js, Python, databases, and system design fundamentals.',
    type: 'learning',
  },
]

export const techStack = [
  { name: 'React',       color: '#61DAFB' },
  { name: 'Next.js',     color: '#FFFFFF' },
  { name: 'TypeScript',  color: '#3178C6' },
  { name: 'Node.js',     color: '#339933' },
  { name: 'NestJS',      color: '#E0234E' },
  { name: 'Python',      color: '#3776AB' },
  { name: 'Flask',       color: '#FFFFFF' },
  { name: 'MongoDB',     color: '#47A248' },
  { name: 'MySQL',       color: '#4479A1' },
  { name: 'Tailwind',    color: '#06B6D4' },
  { name: 'Docker',      color: '#2496ED' },
  { name: 'GitHub',      color: '#FFFFFF' },
  { name: 'VS Code',     color: '#007ACC' },
  { name: 'Postman',     color: '#FF6C37' },
  { name: 'Figma',       color: '#F24E1E' },
]

export const certifications = [
  { name: 'The Complete Web Developer Bootcamp', organization: 'Udemy',    date: '2023', abbr: 'UD', verifyUrl: '#' },
  { name: 'React — The Complete Guide 2023',     organization: 'Udemy',    date: '2023', abbr: 'UD', verifyUrl: '#' },
  { name: 'Node.js Developer Course',            organization: 'Udemy',    date: '2023', abbr: 'UD', verifyUrl: '#' },
  { name: 'Python for Everybody Specialization', organization: 'Coursera', date: '2024', abbr: 'CO', verifyUrl: '#' },
  { name: 'Machine Learning Foundations',        organization: 'Coursera', date: '2024', abbr: 'CO', verifyUrl: '#' },
  { name: 'Docker & Kubernetes Mastery',         organization: 'Udemy',    date: '2024', abbr: 'UD', verifyUrl: '#' },
]

export const testimonials = [
  {
    quote: 'Abdullah delivered a production-ready full-stack application that exceeded our expectations. His attention to clean code and scalable architecture is exceptional for his level.',
    author: 'Sarah Chen',
    role:   'CTO, TechStart Labs',
    initials: 'SC',
  },
  {
    quote: 'Working with Abdullah was a pleasure. He understood the requirements perfectly and shipped a beautiful, fast API with excellent documentation. Will definitely hire again.',
    author: 'Marcus Rivera',
    role:   'Founder, DataFlow',
    initials: 'MR',
  },
  {
    quote: 'His ability to integrate AI solutions into existing systems is impressive. The chatbot he built handles 500+ daily users flawlessly. Highly recommended.',
    author: 'Aisha Malik',
    role:   'Product Manager, NovaSaaS',
    initials: 'AM',
  },
]
