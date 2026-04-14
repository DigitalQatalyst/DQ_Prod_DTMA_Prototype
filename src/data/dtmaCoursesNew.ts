// New DTMA Course Structure: 6 Courses → Modules → Lessons

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "15 min"
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: string; // Total module duration
}

export interface Course {
  id: string;
  title: string;
  shortTitle: string; // For navigation
  description: string;
  instructor: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // Total course duration
  modules: Module[];
  totalLessons: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  badge?: 'New' | 'Bestseller' | 'Popular' | null;
}

export const dtmaCoursesNew: Course[] = [
  // Course 1: Mastering Economy 4.0
  {
    id: 'course-economy-40',
    title: 'Mastering Economy 4.0',
    shortTitle: 'Economy 4.0',
    description: 'Master the fundamentals of the digital economy and understand how Economy 4.0 is reshaping industries, business models, and competitive dynamics.',
    instructor: 'DTMA Faculty',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    category: 'digital-economy',
    level: 'Beginner',
    duration: '12 hours',
    totalLessons: 30,
    rating: 4.8,
    reviews: 320,
    price: 299,
    originalPrice: 399,
    badge: 'Bestseller',
    modules: [
      {
        id: 'economy-module-1',
        title: 'Module 1: The Rise of Economy 4.0',
        description: 'Understand the evolution and key drivers of Economy 4.0',
        duration: '4 hours',
        lessons: [
          {
            id: 'economy-m1-l1',
            title: 'Introduction to Economy 4.0',
            duration: '20 min',
            type: 'video',
          },
          {
            id: 'economy-m1-l2',
            title: 'Historical Evolution: From Economy 1.0 to 4.0',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'economy-m1-l3',
            title: 'Key Drivers of Digital Economy',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'economy-m1-l4',
            title: 'Platform Economics and Network Effects',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'economy-m1-l5',
            title: 'Case Study: Digital Economy Leaders',
            duration: '40 min',
            type: 'reading',
          },
          {
            id: 'economy-m1-l6',
            title: 'Module 1 Assessment',
            duration: '30 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'economy-module-2',
        title: 'Module 2: Perfect Life Transactions - The Cornerstone of Economy 4.0',
        description: 'Learn how seamless digital transactions are transforming customer experiences',
        duration: '4 hours',
        lessons: [
          {
            id: 'economy-m2-l1',
            title: 'What are Perfect Life Transactions?',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'economy-m2-l2',
            title: 'Customer Experience in Digital Economy',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'economy-m2-l3',
            title: 'Frictionless Commerce and Payments',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'economy-m2-l4',
            title: 'Personalization at Scale',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'economy-m2-l5',
            title: 'Building Trust in Digital Transactions',
            duration: '25 min',
            type: 'reading',
          },
          {
            id: 'economy-m2-l6',
            title: 'Case Study: Amazon and Alibaba',
            duration: '35 min',
            type: 'reading',
          },
          {
            id: 'economy-m2-l7',
            title: 'Module 2 Assessment',
            duration: '40 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'economy-module-3',
        title: 'Module 3: Success Metrics of Economy 4.0',
        description: 'Measure and optimize performance in the digital economy',
        duration: '4 hours',
        lessons: [
          {
            id: 'economy-m3-l1',
            title: 'Traditional vs Digital Economy Metrics',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'economy-m3-l2',
            title: 'Customer Lifetime Value (CLV)',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'economy-m3-l3',
            title: 'Network Effects and Viral Growth',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'economy-m3-l4',
            title: 'Data-Driven Decision Making',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'economy-m3-l5',
            title: 'KPIs for Digital Business Models',
            duration: '35 min',
            type: 'reading',
          },
          {
            id: 'economy-m3-l6',
            title: 'Analytics and Reporting Tools',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'economy-m3-l7',
            title: 'Final Course Project',
            duration: '60 min',
            type: 'assignment',
          },
        ],
      },
    ],
  },

  // Course 2: Decoding Digital Cognitive Organisations
  {
    id: 'course-cognitive-org',
    title: 'Decoding Digital Cognitive Organisations',
    shortTitle: 'Cognitive Organisations',
    description: 'Transform your organization into an intelligent, learning entity that adapts and thrives in the digital age through AI-driven decision making and continuous learning.',
    instructor: 'DTMA Faculty',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    category: 'digital-cognitive-organisation',
    level: 'Intermediate',
    duration: '15 hours',
    totalLessons: 35,
    rating: 4.9,
    reviews: 245,
    price: 349,
    originalPrice: 449,
    badge: 'Popular',
    modules: [
      {
        id: 'cognitive-module-1',
        title: 'Module 1: Foundations of Cognitive Organizations',
        description: 'Understanding the principles of organizational intelligence',
        duration: '5 hours',
        lessons: [
          {
            id: 'cognitive-m1-l1',
            title: 'What is a Cognitive Organization?',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'cognitive-m1-l2',
            title: 'Organizational Learning Theory',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'cognitive-m1-l3',
            title: 'Knowledge Management Systems',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'cognitive-m1-l4',
            title: 'Building Learning Culture',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'cognitive-m1-l5',
            title: 'Module 1 Assessment',
            duration: '30 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'cognitive-module-2',
        title: 'Module 2: AI-Driven Decision Making',
        description: 'Leverage artificial intelligence for organizational intelligence',
        duration: '5 hours',
        lessons: [
          {
            id: 'cognitive-m2-l1',
            title: 'AI in Business Decision Making',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'cognitive-m2-l2',
            title: 'Machine Learning for Predictions',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'cognitive-m2-l3',
            title: 'Natural Language Processing Applications',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'cognitive-m2-l4',
            title: 'Ethical AI and Governance',
            duration: '30 min',
            type: 'reading',
          },
          {
            id: 'cognitive-m2-l5',
            title: 'Module 2 Assessment',
            duration: '45 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'cognitive-module-3',
        title: 'Module 3: Continuous Learning & Adaptive Systems',
        description: 'Create systems that learn and adapt continuously',
        duration: '5 hours',
        lessons: [
          {
            id: 'cognitive-m3-l1',
            title: 'Adaptive Systems Architecture',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'cognitive-m3-l2',
            title: 'Feedback Loops and Iteration',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'cognitive-m3-l3',
            title: 'Organizational Agility',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'cognitive-m3-l4',
            title: 'Change Management for Learning Organizations',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'cognitive-m3-l5',
            title: 'Final Project: Design a Cognitive Organization',
            duration: '90 min',
            type: 'assignment',
          },
        ],
      },
    ],
  },

  // Course 3: Building Powerful Digital Business Platforms
  {
    id: 'course-business-platforms',
    title: 'Building Powerful Digital Business Platforms',
    shortTitle: 'Business Platforms',
    description: 'Master the architecture, design, and implementation of scalable digital business platforms that drive innovation and competitive advantage.',
    instructor: 'DTMA Faculty',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    category: 'digital-business-platform',
    level: 'Intermediate',
    duration: '18 hours',
    totalLessons: 40,
    rating: 4.7,
    reviews: 289,
    price: 399,
    originalPrice: 499,
    badge: 'New',
    modules: [
      {
        id: 'platform-module-1',
        title: 'Module 1: Platform Fundamentals',
        description: 'Core concepts of digital business platforms',
        duration: '6 hours',
        lessons: [
          {
            id: 'platform-m1-l1',
            title: 'Introduction to Digital Platforms',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'platform-m1-l2',
            title: 'Platform Business Models',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'platform-m1-l3',
            title: 'Platform Architecture Patterns',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'platform-m1-l4',
            title: 'API-First Design',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'platform-m1-l5',
            title: 'Module 1 Assessment',
            duration: '30 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'platform-module-2',
        title: 'Module 2: Cloud Infrastructure & Scalability',
        description: 'Build scalable cloud-native platforms',
        duration: '6 hours',
        lessons: [
          {
            id: 'platform-m2-l1',
            title: 'Cloud Computing Fundamentals',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'platform-m2-l2',
            title: 'Microservices Architecture',
            duration: '45 min',
            type: 'video',
          },
          {
            id: 'platform-m2-l3',
            title: 'Containerization and Kubernetes',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'platform-m2-l4',
            title: 'Scalability Patterns',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'platform-m2-l5',
            title: 'Module 2 Assessment',
            duration: '40 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'platform-module-3',
        title: 'Module 3: Security & Compliance',
        description: 'Secure your digital platforms',
        duration: '6 hours',
        lessons: [
          {
            id: 'platform-m3-l1',
            title: 'Platform Security Fundamentals',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'platform-m3-l2',
            title: 'Authentication and Authorization',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'platform-m3-l3',
            title: 'Data Privacy and GDPR',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'platform-m3-l4',
            title: 'Security Best Practices',
            duration: '30 min',
            type: 'reading',
          },
          {
            id: 'platform-m3-l5',
            title: 'Final Project: Platform Architecture Design',
            duration: '120 min',
            type: 'assignment',
          },
        ],
      },
    ],
  },

  // Course 4: Navigating Digital Transformation 2.0
  {
    id: 'course-transformation',
    title: 'Navigating Digital Transformation 2.0',
    shortTitle: 'Digital Transformation',
    description: 'Lead successful digital transformation initiatives with proven strategies, change management techniques, and agile methodologies.',
    instructor: 'DTMA Faculty',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    category: 'digital-transformation',
    level: 'Advanced',
    duration: '16 hours',
    totalLessons: 38,
    rating: 4.8,
    reviews: 312,
    price: 379,
    originalPrice: 479,
    badge: 'Bestseller',
    modules: [
      {
        id: 'transform-module-1',
        title: 'Module 1: Transformation Strategy',
        description: 'Develop comprehensive digital transformation strategies',
        duration: '5 hours',
        lessons: [
          {
            id: 'transform-m1-l1',
            title: 'Digital Transformation Fundamentals',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'transform-m1-l2',
            title: 'Assessing Digital Maturity',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'transform-m1-l3',
            title: 'Creating a Transformation Roadmap',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'transform-m1-l4',
            title: 'Stakeholder Management',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'transform-m1-l5',
            title: 'Module 1 Assessment',
            duration: '35 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'transform-module-2',
        title: 'Module 2: Change Management',
        description: 'Navigate organizational change effectively',
        duration: '6 hours',
        lessons: [
          {
            id: 'transform-m2-l1',
            title: 'Change Management Principles',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'transform-m2-l2',
            title: 'Overcoming Resistance to Change',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'transform-m2-l3',
            title: 'Communication Strategies',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'transform-m2-l4',
            title: 'Building Change Champions',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'transform-m2-l5',
            title: 'Module 2 Assessment',
            duration: '45 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'transform-module-3',
        title: 'Module 3: Measuring Success',
        description: 'Track and optimize transformation outcomes',
        duration: '5 hours',
        lessons: [
          {
            id: 'transform-m3-l1',
            title: 'Transformation KPIs',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'transform-m3-l2',
            title: 'ROI of Digital Transformation',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'transform-m3-l3',
            title: 'Continuous Improvement',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'transform-m3-l4',
            title: 'Case Studies: Successful Transformations',
            duration: '40 min',
            type: 'reading',
          },
          {
            id: 'transform-m3-l5',
            title: 'Final Project: Transformation Plan',
            duration: '90 min',
            type: 'assignment',
          },
        ],
      },
    ],
  },

  // Course 5: Optimizing Digital Workers and Workspaces
  {
    id: 'course-digital-workers',
    title: 'Optimizing Digital Workers and Workspaces',
    shortTitle: 'Digital Workers',
    description: 'Master the tools, practices, and mindset needed to thrive as a digital worker in modern, distributed work environments.',
    instructor: 'DTMA Faculty',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    category: 'digital-worker-workspace',
    level: 'Beginner',
    duration: '10 hours',
    totalLessons: 28,
    rating: 4.6,
    reviews: 234,
    price: 249,
    originalPrice: 329,
    badge: 'Popular',
    modules: [
      {
        id: 'worker-module-1',
        title: 'Module 1: Digital Worker Essentials',
        description: 'Core skills for the modern digital workplace',
        duration: '3 hours',
        lessons: [
          {
            id: 'worker-m1-l1',
            title: 'The Digital Worker Mindset',
            duration: '20 min',
            type: 'video',
          },
          {
            id: 'worker-m1-l2',
            title: 'Essential Digital Tools',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'worker-m1-l3',
            title: 'Digital Communication Skills',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'worker-m1-l4',
            title: 'Time Management in Digital Age',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'worker-m1-l5',
            title: 'Module 1 Assessment',
            duration: '25 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'worker-module-2',
        title: 'Module 2: Remote Work & Collaboration',
        description: 'Excel in distributed work environments',
        duration: '4 hours',
        lessons: [
          {
            id: 'worker-m2-l1',
            title: 'Remote Work Best Practices',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'worker-m2-l2',
            title: 'Virtual Collaboration Tools',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'worker-m2-l3',
            title: 'Building Remote Team Culture',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'worker-m2-l4',
            title: 'Asynchronous Communication',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'worker-m2-l5',
            title: 'Module 2 Assessment',
            duration: '30 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'worker-module-3',
        title: 'Module 3: Digital Wellness & Work-Life Balance',
        description: 'Maintain health and balance in digital work',
        duration: '3 hours',
        lessons: [
          {
            id: 'worker-m3-l1',
            title: 'Digital Wellness Fundamentals',
            duration: '20 min',
            type: 'video',
          },
          {
            id: 'worker-m3-l2',
            title: 'Managing Digital Overload',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'worker-m3-l3',
            title: 'Work-Life Integration',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'worker-m3-l4',
            title: 'Cybersecurity for Digital Workers',
            duration: '25 min',
            type: 'video',
          },
          {
            id: 'worker-m3-l5',
            title: 'Final Project: Personal Productivity Plan',
            duration: '60 min',
            type: 'assignment',
          },
        ],
      },
    ],
  },

  // Course 6: Leveraging Digital Accelerators for Growth
  {
    id: 'course-digital-accelerators',
    title: 'Leveraging Digital Accelerators for Growth',
    shortTitle: 'Digital Accelerators',
    description: 'Harness emerging technologies like AI, blockchain, IoT, and automation to accelerate business growth and innovation.',
    instructor: 'DTMA Faculty',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    category: 'digital-accelerators',
    level: 'Advanced',
    duration: '20 hours',
    totalLessons: 45,
    rating: 4.9,
    reviews: 345,
    price: 449,
    originalPrice: 549,
    badge: 'New',
    modules: [
      {
        id: 'accelerator-module-1',
        title: 'Module 1: AI & Machine Learning',
        description: 'Leverage artificial intelligence for business advantage',
        duration: '7 hours',
        lessons: [
          {
            id: 'accelerator-m1-l1',
            title: 'AI Fundamentals for Business',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'accelerator-m1-l2',
            title: 'Machine Learning Applications',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'accelerator-m1-l3',
            title: 'Natural Language Processing',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'accelerator-m1-l4',
            title: 'Computer Vision Applications',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'accelerator-m1-l5',
            title: 'AI Ethics and Governance',
            duration: '25 min',
            type: 'reading',
          },
          {
            id: 'accelerator-m1-l6',
            title: 'Module 1 Assessment',
            duration: '40 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'accelerator-module-2',
        title: 'Module 2: Blockchain & Emerging Technologies',
        description: 'Understand and apply blockchain technology',
        duration: '6 hours',
        lessons: [
          {
            id: 'accelerator-m2-l1',
            title: 'Blockchain Fundamentals',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'accelerator-m2-l2',
            title: 'Smart Contracts',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'accelerator-m2-l3',
            title: 'Cryptocurrency and DeFi',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'accelerator-m2-l4',
            title: 'Enterprise Blockchain Applications',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'accelerator-m2-l5',
            title: 'Module 2 Assessment',
            duration: '40 min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'accelerator-module-3',
        title: 'Module 3: IoT & Automation',
        description: 'Connect devices and automate processes',
        duration: '7 hours',
        lessons: [
          {
            id: 'accelerator-m3-l1',
            title: 'Internet of Things Fundamentals',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'accelerator-m3-l2',
            title: 'IoT Architecture and Protocols',
            duration: '40 min',
            type: 'video',
          },
          {
            id: 'accelerator-m3-l3',
            title: 'Robotic Process Automation (RPA)',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'accelerator-m3-l4',
            title: 'Industrial IoT Applications',
            duration: '30 min',
            type: 'video',
          },
          {
            id: 'accelerator-m3-l5',
            title: 'AR/VR and Immersive Technologies',
            duration: '35 min',
            type: 'video',
          },
          {
            id: 'accelerator-m3-l6',
            title: 'Final Project: Technology Implementation Plan',
            duration: '120 min',
            type: 'assignment',
          },
        ],
      },
    ],
  },
];

// Helper function to get course by ID
export const getCourseById = (id: string): Course | undefined => {
  return dtmaCoursesNew.find(course => course.id === id);
};

// Helper function to get all modules for a course
export const getModulesByCourseId = (courseId: string): Module[] => {
  const course = getCourseById(courseId);
  return course?.modules || [];
};

// Helper function to get a specific module
export const getModuleById = (courseId: string, moduleId: string): Module | undefined => {
  const course = getCourseById(courseId);
  return course?.modules.find(module => module.id === moduleId);
};

// Helper function to get all lessons for a module
export const getLessonsByModuleId = (courseId: string, moduleId: string): Lesson[] => {
  const module = getModuleById(courseId, moduleId);
  return module?.lessons || [];
};
