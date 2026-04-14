// Module 2 Quiz: Perfect Life Transactions - The Cornerstone of Economy 4.0
// 5 Questions for prototype demonstration

import { QuizQuestion, Quiz } from './module1Quiz';

export const module2Quiz: Quiz = {
  id: 'economy-module-2-quiz',
  moduleId: 'economy-module-2',
  title: 'Module 2 Assessment',
  description: 'Test your understanding of Perfect Life Transactions and their role in Economy 4.0',
  passingScore: 70,
  timeLimit: 10, // 10 minutes
  questions: [
    {
      id: 'q1',
      question: 'What is the primary objective of a \'Perfect Life Transaction\' as described by Digital Qatalyst?',
      options: [
        'To maximize the volume of transactions regardless of customer feedback.',
        'To provide a seamless, intuitive, and hyper-personalized customer experience.',
        'To replace all human interaction with automated static response systems.',
        'To focus exclusively on the lowest possible operational cost per interaction.'
      ],
      correctAnswer: 1,
      hint: 'Consider the difference between a simple exchange of goods and a high-quality \'experience\' mentioned in Script 7.',
      explanation: 'The primary objective of a Perfect Life Transaction is to provide a seamless, intuitive, and hyper-personalized customer experience that goes beyond simple transactions to create meaningful value.',
      lessonReference: 'The Blueprint of Perfect Life\'s Transactions'
    },
    {
      id: 'q2',
      question: 'How does behavioral economics contribute to the design of Perfect Life Transactions?',
      options: [
        'It focuses on creating ease, trust, and predictability in digital interactions.',
        'It suggests that customers always make perfectly rational financial decisions.',
        'It is used primarily to calculate the physical logistics of shipping goods.',
        'It dictates that transactions should be as complex as possible to ensure security.'
      ],
      correctAnswer: 0,
      hint: 'Think about the psychological factors that make a user feel comfortable and confident during a purchase.',
      explanation: 'Behavioral economics contributes to Perfect Life Transactions by focusing on creating ease, trust, and predictability in digital interactions, understanding that human behavior is influenced by psychological factors beyond pure rationality.',
      lessonReference: 'The Blueprint of Perfect Life\'s Transactions'
    },
    {
      id: 'q3',
      question: 'Which of the five pillars of a Perfect Transaction focuses on the elimination of human and system errors?',
      options: [
        'Accuracy',
        'Transparency',
        'Efficiency',
        'Security'
      ],
      correctAnswer: 0,
      hint: 'This pillar ensures the right information is delivered at the right time without mistakes.',
      explanation: 'Accuracy is the pillar that focuses on eliminating human and system errors, ensuring that the right information is delivered at the right time without mistakes.',
      lessonReference: 'The Blueprint of Perfect Life\'s Transactions'
    },
    {
      id: 'q4',
      question: 'According to the philosophy of Jeff Bezos, how should a company view its relationship with customers?',
      options: [
        'As a strict gatekeeper of digital resources.',
        'As a purely mathematical data-gathering exercise.',
        'As a series of one-time sales events.',
        'As a host inviting guests to a party.'
      ],
      correctAnswer: 3,
      hint: 'Think of a social role where the primary objective is to ensure everyone present has a better experience each time.',
      explanation: 'According to Jeff Bezos\' philosophy, a company should view its relationship with customers as a host inviting guests to a party, focusing on creating welcoming, memorable experiences that encourage customers to return.',
      lessonReference: 'The Blueprint of Perfect Life\'s Transactions'
    },
    {
      id: 'q5',
      question: 'What happens when automation is applied to an inefficient operation, according to Bill Gates?',
      options: [
        'The inefficiency is magnified.',
        'The operation automatically becomes efficient.',
        'Human staff are immediately required to override the system.',
        'The operation becomes self-healing through AI.'
      ],
      correctAnswer: 0,
      hint: 'Think about whether technology acts as a \'fix\' or an \'amplifier\' for the underlying process.',
      explanation: 'According to Bill Gates, when automation is applied to an inefficient operation, the inefficiency is magnified. Automation amplifies existing processes, so it\'s crucial to optimize operations before automating them.',
      lessonReference: 'Learning the key pillars of a perfect transaction'
    },
  ]
};
