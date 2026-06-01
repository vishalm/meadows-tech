// All user-visible strings live here so they can be translated or edited
// without touching component code.

export const brand = {
  name: 'Meadows',
  suffix: 'Tech',
  tagline: 'Learn. Think. Lead.',
};

export const nav = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Courses', href: '#courses' },
    { label: 'AI Tutor', href: '#ai-tutor' },
    { label: 'Stories', href: '#testimonials' },
  ],
  ctaLabel: 'Try AI Tutor',
};

export const hero = {
  tag: 'AI-Powered Learning Platform',
  titleStart: 'Where Students',
  titleEm: 'Thrive',
  titleEnd: 'with Intelligent Support',
  sub: 'Meadows Tech blends world-class curriculum with AI tutors, smart study tools, and real-time feedback, so every student learns at their best pace.',
  ctaPrimary: 'Talk to AI Tutor',
  ctaSecondary: 'Explore Courses',
  badgeTitle: 'AI Tutor Online',
  badgeSub: 'Ask anything, anytime',
};

export const stats = [
  { num: '12K+', label: 'Active Students' },
  { num: '98%', label: 'Satisfaction Rate' },
  { num: '350+', label: 'Courses Available' },
  { num: '24/7', label: 'AI Support' },
];

export const features = {
  tag: 'Smart Systems',
  title: 'AI Tools Built for Modern Students',
  sub: 'Our intelligent systems adapt to how you learn, catch where you struggle, and guide you to mastery faster than traditional methods.',
  items: [
    {
      icon: 'brain' as const,
      title: 'Adaptive Learning Engine',
      desc: 'AI analyzes your performance in real time and adjusts difficulty, pacing, and content, creating a fully personalized learning path just for you.',
    },
    {
      icon: 'chat' as const,
      title: '24/7 AI Tutor',
      desc: 'Ask questions in plain English and get clear, step-by-step explanations. Our AI tutor is powered by the latest language models and never gets tired.',
    },
    {
      icon: 'edit' as const,
      title: 'Instant Essay Feedback',
      desc: 'Submit your writing and receive detailed AI feedback on structure, argument, grammar, and style within seconds, with specific improvement suggestions.',
    },
    {
      icon: 'chart' as const,
      title: 'Progress Analytics',
      desc: 'Visual dashboards show your strengths, weaknesses, study streaks, and predicted exam scores, so you always know exactly where to focus next.',
    },
    {
      icon: 'target' as const,
      title: 'Smart Quiz Generator',
      desc: 'AI generates custom quizzes from any topic or uploaded notes, focusing on areas where you need the most practice to maximize retention.',
    },
    {
      icon: 'search' as const,
      title: 'Research Assistant',
      desc: 'Find credible sources, summarize articles, and build bibliography entries automatically. Academic research made smarter and significantly faster.',
    },
  ],
};

export const courses = {
  tag: 'Popular Courses',
  title: 'Explore Our Curriculum',
  sub: 'From STEM to the humanities, every course is enhanced with AI-powered quizzes, adaptive assessments, and personalized study plans.',
  items: [
    {
      img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
      alt: 'Mathematics',
      tag: 'Mathematics',
      title: 'Advanced Calculus and Linear Algebra',
      desc: 'Master derivatives, integrals, matrices, and vector spaces with AI-powered step-by-step problem solving.',
      hours: '48 hrs',
      rating: '4.9',
      students: '3.2K students',
    },
    {
      img: 'https://images.unsplash.com/photo-1532094349884-543559be6f14?w=600&q=80',
      alt: 'Science laboratory',
      tag: 'Science',
      title: 'Biology and Chemistry Foundations',
      desc: 'From cell biology to organic chemistry, interactive simulations and AI quizzes bring concepts to life.',
      hours: '52 hrs',
      rating: '4.8',
      students: '2.8K students',
    },
    {
      img: 'https://images.unsplash.com/photo-1587620962725-abab19836100?w=600&q=80',
      alt: 'Coding on a laptop',
      tag: 'Computer Science',
      title: 'Python Programming and Data Science',
      desc: 'Learn Python from zero to data analysis with AI code review, debugging hints, and real project challenges.',
      hours: '60 hrs',
      rating: '4.9',
      students: '5.1K students',
    },
  ],
};

export const aiTutor = {
  tag: 'Live AI Tutor',
  title: 'Your Personal Study Companion',
  sub: 'Ask anything about your school subjects right now. Our AI tutor explains clearly, adapts to your level, and never judges a "dumb" question.',
  features: [
    {
      icon: 'bolt' as const,
      title: 'Instant, clear answers',
      desc: 'Get step-by-step explanations for any subject, math, science, history, English, and more.',
    },
    {
      icon: 'grad' as const,
      title: 'Adapts to your grade level',
      desc: 'Tell it your grade and it adjusts explanations to be perfectly pitched, not too easy, not too complex.',
    },
    {
      icon: 'refresh' as const,
      title: 'Follow-up questions welcome',
      desc: 'It remembers your conversation so you can dig deeper, ask for examples, or request a simpler version.',
    },
  ],
  tutorName: 'Meadow, AI Tutor',
  tutorPoweredBy: 'Powered by Claude AI',
  greeting:
    "Hi! I'm Meadow, your AI study assistant. Ask me anything about school, homework help, concept explanations, essay feedback, or exam prep. What subject are you working on today?",
  quickPrompts: [
    { icon: 'leaf' as const, label: 'Photosynthesis', prompt: 'Explain photosynthesis simply' },
    { icon: 'compass' as const, label: 'Quadratic equations', prompt: 'How do I solve a quadratic equation?' },
    { icon: 'book' as const, label: 'WW1 causes', prompt: 'What caused World War 1?' },
    { icon: 'pencil' as const, label: 'Essay help', prompt: 'Help me write a thesis statement' },
  ],
  inputPlaceholder: 'Ask a school question...',
  errorMessage: "Sorry, I couldn't reach the tutor right now. Try again in a moment.",
};

export const testimonials = {
  tag: 'Student Stories',
  title: 'What Our Students Say',
  sub: 'Real results from real students who used Meadows Tech to transform their academic performance.',
  items: [
    {
      quote:
        '"The AI tutor explained calculus derivatives better than any teacher I\'ve had. I went from failing to top of my class in one semester."',
      avatar:
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
      avatarAlt: 'Student portrait',
      name: 'Amara K.',
      role: 'Grade 11, Math and Science',
    },
    {
      quote:
        '"Having 24/7 access to an AI that actually understands my questions changed everything. No more waiting until class to get help when I\'m stuck at midnight."',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      avatarAlt: 'Student portrait',
      name: 'Marcus T.',
      role: 'Grade 10, All Subjects',
    },
    {
      quote:
        '"The essay feedback tool is incredible. It caught things I never would have noticed and taught me how to structure arguments properly. My English grades improved dramatically."',
      avatar:
        'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=100&q=80',
      avatarAlt: 'Student portrait',
      name: 'Sofia R.',
      role: 'Grade 12, English and History',
    },
  ],
};

export const footer = {
  blurb:
    'Empowering the next generation of learners with AI-powered tools that make education smarter, more personal, and genuinely effective.',
  columns: [
    {
      heading: 'Platform',
      links: [
        { label: 'AI Tutor', href: '#ai-tutor' },
        { label: 'Course Library', href: '#courses' },
        { label: 'Study Tools', href: '#features' },
        { label: 'Progress Tracking', href: '#features' },
      ],
    },
    {
      heading: 'Subjects',
      links: [
        { label: 'Mathematics', href: '#courses' },
        { label: 'Sciences', href: '#courses' },
        { label: 'English', href: '#courses' },
        { label: 'History', href: '#courses' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'For Teachers', href: '#' },
        { label: 'For Parents', href: '#' },
        { label: 'Contact Us', href: '#' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Meadows Tech. All rights reserved.`,
  legal: 'Privacy Policy  ·  Terms of Service',
};
