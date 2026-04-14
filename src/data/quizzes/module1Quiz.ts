// Module 1 Quiz: The Rise of Economy 4.0
// 5 Questions for prototype demonstration

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  hint?: string; // Optional hint to help learners (shown before answering)
  explanation?: string; // Optional explanation shown after answering
  lessonReference?: string; // Which lesson this question relates to
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  passingScore: number; // Percentage needed to pass (e.g., 70)
  timeLimit?: number; // Time limit in minutes (optional)
  questions: QuizQuestion[];
}

export const module1Quiz: Quiz = {
  id: 'economy-module-1-quiz',
  moduleId: 'economy-module-1',
  title: 'Module 1 Assessment',
  description: 'Test your understanding of Economy 4.0 and Digital Cognitive Organizations',
  passingScore: 70,
  timeLimit: 10, // 10 minutes
  questions: [
    {
      id: 'q1',
      question: 'Which feature of Economy 4.0 involves using real-time data and AI to tailor products and services to individual customer preferences?',
      options: [
        'Hyper-Personalization',
        'Sustainability by Design',
        'Platform-Centric Models',
        'Automation at Scale'
      ],
      correctAnswer: 0,
      hint: 'Think about a term that describes a very high level of individual customization.',
      explanation: 'Hyper-Personalization uses real-time data and AI to tailor products and services to individual customer preferences, creating highly customized experiences.',
      lessonReference: 'Understanding features of Economy 4.0'
    },
    {
      id: 'q2',
      question: 'In the context of Digital Cognitive Organizations (DCOs), what does "Man-Machine Collaboration" represent?',
      options: [
        'Replacing human workers entirely with AI to reduce costs',
        'Humans supervising robots on a traditional assembly line',
        'Limiting technology to administrative tasks only',
        'Integrating human creativity with AI-driven digital workers'
      ],
      correctAnswer: 3,
      hint: 'Consider the idea of a hybrid workforce where different strengths are combined.',
      explanation: 'Man-Machine Collaboration in DCOs represents the integration of human creativity and judgment with AI-driven digital workers, creating a hybrid workforce that leverages the strengths of both.',
      lessonReference: 'Understanding features of Economy 4.0'
    },
    {
      id: 'q3',
      question: 'According to the source material, what is a common mistake organizations make when trying to navigate Economy 4.0?',
      options: [
        'Focusing too heavily on real-time data',
        'Ignoring traditional efficiency metrics entirely',
        'Assuming that digital infrastructure alone is enough to thrive',
        'Adopting platform-based business models too early'
      ],
      correctAnswer: 2,
      hint: 'Reflect on whether having the right tools is the same as having the right organizational structure.',
      explanation: 'A common mistake is assuming that digital infrastructure alone is enough to thrive in Economy 4.0. Organizations also need the right organizational structure, culture, and capabilities to succeed.',
      lessonReference: 'Understanding features of Economy 4.0'
    },
    {
      id: 'q4',
      question: 'Which business model shifts the focus from selling a physical product to delivering measurable results, such as "Equipment-as-a-Service"?',
      options: [
        'Platform-Based Ecosystems',
        'Outcome-Oriented Value Propositions',
        'Static Resource Management',
        'Diversified Revenue Streams'
      ],
      correctAnswer: 1,
      hint: 'Think about a model where the customer pays for the final result rather than the physical object.',
      explanation: 'Outcome-Oriented Value Propositions shift the focus from selling physical products to delivering measurable results and outcomes, such as Equipment-as-a-Service models.',
      lessonReference: 'Understanding features of Economy 4.0'
    },
    {
      id: 'q5',
      question: 'What is the primary role of a Unified Digital Business Platform (DBP) within a Digital Cognitive Organization?',
      options: [
        'To store archival data for legal compliance purposes',
        'To replace the need for leadership and management',
        'To serve as a social media network for employees',
        'To integrate processes, data, and applications for frictionless operations'
      ],
      correctAnswer: 3,
      hint: 'Consider how a single digital foundation might affect how different parts of a company work together.',
      explanation: 'The primary role of a Unified Digital Business Platform is to integrate processes, data, and applications across the organization, enabling frictionless operations and seamless collaboration.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
  ]
};
