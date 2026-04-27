// Module 1 Quiz: The Rise of Economy 4.0
// 10 Questions - Full Assessment

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
  timeLimit: 15, // 15 minutes
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
    {
      id: 'q6',
      question: 'Why are Digital Cognitive Organizations better positioned to compete in Economy 4.0 than traditionally structured organizations?',
      options: [
        'They rely only on manual decision-making to preserve institutional memory',
        'They combine data, automation, AI, and adaptive processes to respond quickly to change',
        'They eliminate the need for customer feedback in strategic planning',
        'They focus exclusively on physical infrastructure and legacy systems'
      ],
      correctAnswer: 1,
      hint: 'Think about the capabilities that help organizations sense, decide, and act faster.',
      explanation: 'Digital Cognitive Organizations are better positioned because they use data, automation, AI, and adaptive processes to sense change, make better decisions, and respond quickly in dynamic markets.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
    {
      id: 'q7',
      question: 'Which capability best reflects an organization becoming "cognitive" in the digital economy?',
      options: [
        'Using connected data and intelligent systems to learn and improve decisions over time',
        'Maintaining separate departmental systems to preserve local control',
        'Reducing digital interaction so customers depend on branch visits',
        'Standardizing every customer journey without personalization'
      ],
      correctAnswer: 0,
      hint: 'A cognitive organization does more than digitize existing work; it learns from information.',
      explanation: 'A cognitive organization uses connected data and intelligent systems to learn from activity, improve decisions, and continuously adapt how work and customer experiences are delivered.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
    {
      id: 'q8',
      question: 'What is the strongest reason platform-centric models are important in Economy 4.0?',
      options: [
        'They make it unnecessary to collaborate with partners or customers',
        'They allow value to be created through connected ecosystems, data flows, and scalable services',
        'They are useful only for social media companies',
        'They prevent organizations from using automation or AI'
      ],
      correctAnswer: 1,
      hint: 'Consider how platforms connect participants and enable value beyond a single product.',
      explanation: 'Platform-centric models are important because they connect ecosystems of users, partners, services, and data, allowing organizations to scale value creation beyond traditional product boundaries.',
      lessonReference: 'Understanding features of Economy 4.0'
    },
    {
      id: 'q9',
      question: 'How does sustainability by design differ from treating sustainability as a separate compliance activity?',
      options: [
        'It embeds sustainability into products, processes, and decisions from the start',
        'It delays sustainability decisions until after products are launched',
        'It focuses only on publishing annual reports',
        'It removes sustainability from business strategy'
      ],
      correctAnswer: 0,
      hint: 'Think about whether sustainability is added later or built into how the organization works.',
      explanation: 'Sustainability by design means environmental and social considerations are embedded into products, processes, operating models, and decisions from the beginning rather than handled as an afterthought.',
      lessonReference: 'Understanding features of Economy 4.0'
    },
    {
      id: 'q10',
      question: 'What should leaders prioritize when moving from basic digital adoption toward a Digital Cognitive Organization?',
      options: [
        'Buying isolated tools without changing processes or governance',
        'Connecting strategy, people, processes, data, and technology into one operating model',
        'Keeping transformation limited to the IT department',
        'Measuring progress only by the number of software licenses purchased'
      ],
      correctAnswer: 1,
      hint: 'Digital transformation requires alignment across the full organization, not just technology purchases.',
      explanation: 'Leaders should prioritize an integrated operating model that connects strategy, people, processes, data, and technology, because technology alone does not create a Digital Cognitive Organization.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
  ]
};
