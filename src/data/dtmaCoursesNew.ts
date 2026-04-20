// New DTMA Course Structure: 6 Courses → Modules → Lessons

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "15 min"
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  videoUrl?: string; // URL to video file
  quizId?: string; // ID linking to quiz data
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
  badge?: 'New' | 'Bestseller' | 'Popular' | 'Coming Soon' | null;
  comingSoon?: boolean; // Flag to indicate if course is not yet available
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
    duration: '1 hour',
    totalLessons: 6,
    rating: 4.8,
    reviews: 320,
    price: 149,
    originalPrice: 199,
    badge: 'Bestseller',
    modules: [
      {
        id: 'economy-module-1',
        title: 'Module 1: The Rise of Economy 4.0: How Digital Cognitive Organizations Are Reshaping Markets',
        description: 'Understand the evolution and key drivers of Economy 4.0',
        duration: '32 min',
        lessons: [
          {
            id: 'economy-m1-l1',
            title: 'Understanding features of Economy 4.0',
            duration: '6 min',
            type: 'video',
            videoUrl: '/Understanding features of Economy 4.0.mp4',
          },
          {
            id: 'economy-m1-l2',
            title: 'Unveiling the Digital Cognitive Organization',
            duration: '6 min',
            type: 'video',
            videoUrl: '/Unveiling the Digital Cognitive Organization.mp4',
          },
          {
            id: 'economy-m1-l3',
            title: 'Significance of Cognitive organization theory',
            duration: '7 min',
            type: 'video',
            videoUrl: '/Significance of Cognitive organization theory.mp4',
          },
          {
            id: 'economy-m1-l4',
            title: 'Core Features of Digital Cognitive Organizations',
            duration: '6 min',
            type: 'video',
            videoUrl: '/Core Features of Digital Cognitve Organizations.mp4',
          },
          {
            id: 'economy-m1-l5',
            title: 'Understanding Business Model Innovation',
            duration: '7 min',
            type: 'video',
            videoUrl: '/Understanding Business Model Innovation.mp4',
          },
          {
            id: 'economy-m1-l6',
            title: 'Module 1 Assessment',
            duration: '30 min',
            type: 'quiz',
            quizId: 'economy-module-1-quiz', // Links to the quiz data
          },
          {
            id: 'economy-m1-resource',
            title: 'Module 1 Resource: Digital Cognitive Organizations',
            duration: '5 min',
            type: 'reading',
            videoUrl: 'https://preview.shorthand.com/txIVdYFVuIZmVbdJ',
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
            title: 'The Blueprint of Perfect Life\'s Transactions',
            duration: '25 min',
            type: 'video',
            videoUrl: '/The_Blueprint_of_Perfect_Life_s_Transactions.mp4',
          },
          {
            id: 'economy-m2-l2',
            title: 'Learning the key pillars of a perfect transaction',
            duration: '30 min',
            type: 'video',
            videoUrl: '/Learning_the_key_pillars_of_a_perfect_transaction.mp4',
          },
          {
            id: 'economy-m2-l3',
            title: 'Examining the Strategic Enablers of Perfect Life\'s Transactions',
            duration: '35 min',
            type: 'video',
            videoUrl: '/Examining_the_Strategic_Enablers_of_Perfect_Life_s_Transactions.mp4',
          },
          {
            id: 'economy-m2-l4',
            title: 'Examining implementation requirements: Organization readiness',
            duration: '30 min',
            type: 'video',
            videoUrl: '/Examining_implementation_requirements__Organization_readiness.mp4',
          },
          {
            id: 'economy-m2-l5',
            title: 'Decoding the Growth Hack Model 1',
            duration: '25 min',
            type: 'video',
            videoUrl: '/Decoding_the_Growth_Hack_Model 1.mp4',
          },
          {
            id: 'economy-m2-l6',
            title: 'Module 2 Assessment',
            duration: '40 min',
            type: 'quiz',
            quizId: 'economy-module-2-quiz', // Links to the quiz data
          },
        ],
      },
      {
        id: 'economy-module-3',
        title: 'Module 3: Success Metrics of Economy 4.0',
        description: 'Measure and optimize performance in the digital economy',
        duration: '32 min',
        lessons: [
          {
            id: 'economy-m3-l1',
            title: 'Understanding features of Economy 4.0',
            duration: '6 min',
            type: 'video',
            videoUrl: '/Understanding features of Economy 4.0.mp4',
          },
          {
            id: 'economy-m3-l2',
            title: 'Unveiling the Digital Cognitive Organization',
            duration: '6 min',
            type: 'video',
            videoUrl: '/Unveiling the Digital Cognitive Organization.mp4',
          },
          {
            id: 'economy-m3-l3',
            title: 'Significance of Cognitive organization theory',
            duration: '7 min',
            type: 'video',
            videoUrl: '/Significance of Cognitive organization theory.mp4',
          },
          {
            id: 'economy-m3-l4',
            title: 'Core Features of Digital Cognitive Organizations',
            duration: '6 min',
            type: 'video',
            videoUrl: '/Core Features of Digital Cognitve Organizations.mp4',
          },
          {
            id: 'economy-m3-l5',
            title: 'Understanding Business Model Innovation',
            duration: '7 min',
            type: 'video',
            videoUrl: '/Understanding Business Model Innovation.mp4',
          },
          {
            id: 'economy-m3-l6',
            title: 'Module 3 Assessment',
            duration: '30 min',
            type: 'quiz',
            quizId: 'economy-module-3-quiz',
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
    totalLessons: 0,
    rating: 4.9,
    reviews: 245,
    price: 149,
    originalPrice: 199,
    badge: 'Coming Soon',
    comingSoon: true,
    modules: [],
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
    totalLessons: 0,
    rating: 4.7,
    reviews: 289,
    price: 149,
    originalPrice: 199,
    badge: 'Coming Soon',
    comingSoon: true,
    modules: [],
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
    totalLessons: 0,
    rating: 4.8,
    reviews: 312,
    price: 149,
    originalPrice: 199,
    badge: 'Coming Soon',
    comingSoon: true,
    modules: [],
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
    totalLessons: 0,
    rating: 4.6,
    reviews: 234,
    price: 149,
    originalPrice: 199,
    badge: 'Coming Soon',
    comingSoon: true,
    modules: [],
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
    totalLessons: 0,
    rating: 4.9,
    reviews: 345,
    price: 149,
    originalPrice: 199,
    badge: 'Coming Soon',
    comingSoon: true,
    modules: [],
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
