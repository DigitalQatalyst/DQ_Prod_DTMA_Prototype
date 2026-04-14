// Module 1 Quiz: The Rise of Economy 4.0
// 20 Questions covering the 5 lessons in Module 1

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
  timeLimit: 30, // 30 minutes
  questions: [
    // LESSON 1: Understanding features of Economy 4.0
    {
      id: 'q1',
      question: 'Which feature of Economy 4.0 involves using real-time data and AI to tailor products and services to individual customer preferences?',
      options: [
        'Hyper-Personalization',
        'Sustainability by Design',
        'Platform-Centric Models',
        'Automation at Scale'
      ],
      correctAnswer: 0, // Hyper-Personalization
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
      correctAnswer: 3, // Integrating human creativity with AI-driven digital workers
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
      correctAnswer: 2, // Assuming that digital infrastructure alone is enough to thrive
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
      correctAnswer: 1, // Outcome-Oriented Value Propositions
      hint: 'Think about a model where the customer pays for the final result rather than the physical object.',
      explanation: 'Outcome-Oriented Value Propositions shift the focus from selling physical products to delivering measurable results and outcomes, such as Equipment-as-a-Service models.',
      lessonReference: 'Understanding features of Economy 4.0'
    },

    // LESSON 2: Unveiling the Digital Cognitive Organization
    {
      id: 'q5',
      question: 'What is the primary role of a Unified Digital Business Platform (DBP) within a Digital Cognitive Organization?',
      options: [
        'To store archival data for legal compliance purposes',
        'To replace the need for leadership and management',
        'To serve as a social media network for employees',
        'To integrate processes, data, and applications for frictionless operations'
      ],
      correctAnswer: 3, // To integrate processes, data, and applications for frictionless operations
      hint: 'Consider how a single digital foundation might affect how different parts of a company work together.',
      explanation: 'The primary role of a Unified Digital Business Platform is to integrate processes, data, and applications across the organization, enabling frictionless operations and seamless collaboration.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
    {
      id: 'q6',
      question: 'In Economy 4.0, how is "Sustainability by Design" typically implemented?',
      options: [
        'By using technology to optimize resources and promote circular models',
        'By adding environmental slogans to marketing materials',
        'By manual monitoring of supply chain waste once per year',
        'By focusing solely on profitability and ignoring environmental impact'
      ],
      correctAnswer: 0, // By using technology to optimize resources and promote circular models
      hint: 'Focus on the use of advanced tools to create more efficient and resource-friendly systems.',
      explanation: 'Sustainability by Design in Economy 4.0 is implemented by using technology to optimize resources, reduce waste, and promote circular economy models from the ground up.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
    {
      id: 'q7',
      question: 'Which characteristic of a DCO refers to the systematic collection and analysis of data regarding organizational structure and assets?',
      options: [
        'Perfect Life Transactions',
        'Architectural Data Utilization',
        'Transformation Leadership',
        'Advanced Technology Adoption'
      ],
      correctAnswer: 1, // Architectural Data Utilization
      hint: 'Look for a term that suggests looking at the \'blueprint\' or design of the company.',
      explanation: 'Architectural Data Utilization refers to the systematic collection and analysis of data about organizational structure, assets, and processes to optimize the digital architecture of the organization.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },
    {
      id: 'q8',
      question: 'What is the ultimate goal of "Perfect Life Transactions" in a Digital Cognitive Organization?',
      options: [
        'To track customer location at all times for marketing',
        'To automate all customer service interactions so humans never have to intervene',
        'To deliver seamless, error-free, and highly personalized customer experiences',
        'To ensure every transaction is processed at the lowest possible cost'
      ],
      correctAnswer: 2, // To deliver seamless, error-free, and highly personalized customer experiences
      hint: 'Think about the best possible outcome for a customer during a digital interaction.',
      explanation: 'Perfect Life Transactions aim to deliver seamless, error-free, and highly personalized customer experiences that anticipate needs and remove friction from every interaction.',
      lessonReference: 'Unveiling the Digital Cognitive Organization'
    },

    // LESSON 3: Significance of Cognitive organization theory
    {
      id: 'q9',
      question: 'Which type of leadership is emphasized as necessary for navigating the complex digital landscape of a DCO?',
      options: [
        'Technical Support Management',
        'Transformation Leadership',
        'Passive Stakeholder Management',
        'Top-Down Authoritarian Leadership'
      ],
      correctAnswer: 1, // Transformation Leadership
      hint: 'Consider a term that implies actively changing and evolving the organization.',
      explanation: 'Transformation Leadership is essential for DCOs as it focuses on actively guiding organizational change, fostering innovation, and navigating the complexities of digital transformation.',
      lessonReference: 'Significance of Cognitive organization theory'
    },
    {
      id: 'q10',
      question: 'According to Dr. Stephane Niango, what happens to organizations that fail to transform into cognitive organizations?',
      options: [
        'They will achieve steady, long-term growth',
        'They will be protected by market fluctuations',
        'They risk obsolescence in the new era',
        'They will continue to operate with traditional efficiency'
      ],
      correctAnswer: 2, // They risk obsolescence in the new era
      hint: 'Focus on the negative consequence of remaining stuck in old business models.',
      explanation: 'According to Dr. Stephane Niango, organizations that fail to transform into cognitive organizations risk becoming obsolete as they cannot compete effectively in the digital economy.',
      lessonReference: 'Significance of Cognitive organization theory'
    },
    {
      id: 'q11',
      question: 'What is a defining characteristic of hyper-personalization in the context of Economy 4.0?',
      options: [
        'Using historical purchase data to send monthly email newsletters with generic discounts',
        'Tailoring interactions and products to individual preferences using real-time AI insights',
        'Increasing the speed of mass production to ensure all products are delivered faster',
        'Segmenting customers based on broad demographic data such as age or location'
      ],
      correctAnswer: 1, // Tailoring interactions and products to individual preferences using real-time AI insights
      hint: 'Consider how real-time data and artificial intelligence differ from static, group-based data.',
      explanation: 'Hyper-personalization in Economy 4.0 is characterized by tailoring interactions and products to individual preferences using real-time AI insights, going beyond traditional segmentation to create truly individualized experiences.',
      lessonReference: 'Significance of Cognitive organization theory'
    },
    {
      id: 'q12',
      question: 'According to the source material, why is automation in Economy 4.0 considered different from traditional automation?',
      options: [
        'It enables innovation, new product launches, and the ability to scale businesses rapidly',
        'It focuses solely on reducing operational costs by speeding up repetitive assembly lines',
        'It requires less initial capital investment than traditional digital infrastructure',
        'It is primarily used to replace the need for any human intervention in the workforce'
      ],
      correctAnswer: 0, // It enables innovation, new product launches, and the ability to scale businesses rapidly
      hint: 'Look beyond simple efficiency and cost-cutting to find the strategic value of modern technology.',
      explanation: 'Automation in Economy 4.0 is different because it enables innovation, new product launches, and the ability to scale businesses rapidly, going beyond traditional cost-cutting to create strategic value and competitive advantage.',
      lessonReference: 'Significance of Cognitive organization theory'
    },

    // LESSON 4: Core Features of Digital Cognitive Organizations
    {
      id: 'q13',
      question: 'What is a common mistake organizations make when trying to adapt to Economy 4.0?',
      options: [
        'Believing that having a strong digital infrastructure is sufficient for long-term success',
        'Integrating sustainability too early into the product development cycle',
        'Focusing too heavily on employee empowerment and organizational culture',
        'Attempting to create platform-based models before mastering traditional sales funnels'
      ],
      correctAnswer: 0, // Believing that having a strong digital infrastructure is sufficient for long-term success
      hint: 'Think about the difference between having the right \'tools\' versus having the right \'organizational structure\'.',
      explanation: 'A common mistake is believing that having a strong digital infrastructure alone is sufficient for long-term success. Organizations also need the right organizational structure, culture, and capabilities to truly thrive in Economy 4.0.',
      lessonReference: 'Core Features of Digital Cognitive Organizations'
    },
    {
      id: 'q14',
      question: 'What defines a \'Digital Cognitive Organization\' (DCO) according to Cognitive Organizational Theory?',
      options: [
        'A structure designed to maximize efficiency through rigid hierarchical control',
        'An entity that utilizes technology and human-machine collaboration to continuously learn and evolve',
        'An organization that prioritizes human decision-making over algorithmic data',
        'A company that limits its operations to digital-only products to avoid physical supply chain issues'
      ],
      correctAnswer: 1, // An entity that utilizes technology and human-machine collaboration to continuously learn and evolve
      hint: 'Reflect on how an organization might \'think\' or \'learn\' like a person while using digital tools.',
      explanation: 'A Digital Cognitive Organization (DCO) is defined as an entity that utilizes technology and human-machine collaboration to continuously learn, adapt, and evolve, much like a cognitive system that processes information and improves over time.',
      lessonReference: 'Core Features of Digital Cognitive Organizations'
    },
    {
      id: 'q15',
      question: 'In a DCO, what is the primary purpose of \'Architectural Data Utilization\'?',
      options: [
        'To secure intellectual property through blockchain-based storage systems',
        'To manage real-time traffic data for logistics and delivery optimization',
        'To design physical office spaces that promote employee well-being',
        'To track and analyze data regarding organizational structure, processes, and assets for strategic alignment'
      ],
      correctAnswer: 3, // To track and analyze data regarding organizational structure, processes, and assets for strategic alignment
      hint: 'Consider how data about the \'skeleton\' or \'blueprint\' of a company could be used for improvement.',
      explanation: 'Architectural Data Utilization in a DCO involves tracking and analyzing data about organizational structure, processes, and assets to ensure strategic alignment and optimize the digital architecture of the organization.',
      lessonReference: 'Core Features of Digital Cognitive Organizations'
    },
    {
      id: 'q16',
      question: 'Which business model shift involves moving from selling a physical product to providing measurable operational success for the customer?',
      options: [
        'Hyper-Personalization Strategy',
        'Platform-Based Ecosystems',
        'Outcome-Oriented Value Propositions',
        'Diversified Revenue Streams'
      ],
      correctAnswer: 2, // Outcome-Oriented Value Propositions
      hint: 'This concept focuses on the \'result\' for the buyer rather than the \'ownership\' of the item.',
      explanation: 'Outcome-Oriented Value Propositions involve shifting from selling physical products to providing measurable operational success and results for customers, focusing on outcomes rather than ownership.',
      lessonReference: 'Core Features of Digital Cognitive Organizations'
    },

    // LESSON 5: Understanding Business Model Innovation
    {
      id: 'q17',
      question: 'What is the role of a \'Unified Digital Business Platform\' (DBP) within a DCO?',
      options: [
        'It is a cloud storage solution meant to replace traditional physical filing systems',
        'It acts as a standalone database used only by the IT department for troubleshooting',
        'It integrates processes, data, and applications to enable frictionless operations and real-time decisions',
        'It serves as a public-facing website for customer feedback and reviews'
      ],
      correctAnswer: 2, // It integrates processes, data, and applications to enable frictionless operations and real-time decisions
      hint: 'Think about a central system that connects every \'limb\' and \'organ\' of the business for seamless movement.',
      explanation: 'A Unified Digital Business Platform (DBP) integrates processes, data, and applications across the organization to enable frictionless operations and real-time decision-making, serving as the central nervous system of a DCO.',
      lessonReference: 'Understanding Business Model Innovation'
    },
    {
      id: 'q18',
      question: 'According to Dr. Stephane Niango, what is the primary risk for organizations that fail to become cognitive?',
      options: [
        'Failure to attract top-tier university graduates',
        'Decreased brand recognition in international markets',
        'Obsolescence in the new era of Economy 4.0',
        'Increased regulatory scrutiny from government bodies'
      ],
      correctAnswer: 2, // Obsolescence in the new era of Economy 4.0
      hint: 'The quote focuses on whether a company will remain relevant or disappear entirely.',
      explanation: 'According to Dr. Stephane Niango, the primary risk for organizations that fail to become cognitive is obsolescence in the new era of Economy 4.0, as they will be unable to compete effectively in the digital economy.',
      lessonReference: 'Understanding Business Model Innovation'
    },
    {
      id: 'q19',
      question: 'How do platform-centric models create value, as seen in companies like Uber or Airbnb?',
      options: [
        'By focusing on one single stakeholder group to maximize niche market dominance',
        'By facilitating efficient interactions and scaling through network effects within digital ecosystems',
        'By using traditional mass marketing to reach a wide audience through television ads',
        'By owning the majority of the physical assets used in their service delivery'
      ],
      correctAnswer: 1, // By facilitating efficient interactions and scaling through network effects within digital ecosystems
      hint: 'Think about how a bridge creates value compared to a warehouse.',
      explanation: 'Platform-centric models like Uber and Airbnb create value by facilitating efficient interactions between multiple stakeholders and scaling through network effects within digital ecosystems, rather than owning physical assets.',
      lessonReference: 'Understanding Business Model Innovation'
    },
    {
      id: 'q20',
      question: 'True or False: In Economy 4.0, sustainability is considered a separate initiative to be addressed after profitability is secured.',
      options: [
        'True',
        'False'
      ],
      correctAnswer: 1, // False
      hint: 'Consider whether Economy 4.0 views environmental impact as an \'add-on\' or a \'cornerstone\' of the model.',
      explanation: 'False. In Economy 4.0, sustainability is not a separate initiative but rather a cornerstone integrated into the business model from the start through "Sustainability by Design," making it fundamental to operations rather than an afterthought.',
      lessonReference: 'Understanding Business Model Innovation'
    },
  ]
};

// Helper function to get quiz by module ID
export const getQuizByModuleId = (moduleId: string): Quiz | undefined => {
  if (moduleId === 'economy-module-1') {
    return module1Quiz;
  }
  return undefined;
};
