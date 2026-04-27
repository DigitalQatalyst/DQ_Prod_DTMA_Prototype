// Module 3 Quiz: Success Metrics of Economy 4.0
// 10 Questions - Full Assessment

import { QuizQuestion, Quiz } from './module1Quiz';

export const module3Quiz: Quiz = {
  id: 'economy-module-3-quiz',
  moduleId: 'economy-module-3',
  title: 'Module 3 Assessment',
  description: 'Test your understanding of Success Metrics in Economy 4.0',
  passingScore: 70,
  timeLimit: 15, // 15 minutes
  questions: [
    {
      id: 'q1',
      question: 'In the context of Economy 4.0, which three dimensions define the modern approach to measuring success?',
      options: [
        'Employee count, physical assets, and annual budget growth',
        'Business outcomes, customer-centricity, and operational efficiency',
        'Market dominance, production volume, and cost reduction',
        'Revenue, stock price, and quarterly dividends'
      ],
      correctAnswer: 1,
      hint: 'Consider the categories that look at how a business performs, how it treats its users, and how well it runs internally.',
      explanation: 'The modern approach to measuring success in Economy 4.0 is defined by three dimensions: business outcomes (how the business performs), customer-centricity (how it treats its users), and operational efficiency (how well it runs internally).',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q2',
      question: 'The Triple Bottom Line framework evaluates long-term impact through which three specific lenses?',
      options: [
        'Privacy, policy, and precision',
        'Product, placement, and promotion',
        'People, planet, and profit',
        'Performance, productivity, and price'
      ],
      correctAnswer: 2,
      hint: 'Think about the balance between human welfare, environmental health, and financial success.',
      explanation: 'The Triple Bottom Line framework evaluates long-term impact through three lenses: People (human welfare and social impact), Planet (environmental sustainability), and Profit (financial success).',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q3',
      question: 'According to Human Capital Theory in Economy 4.0, what is considered an organization\'s most valuable asset?',
      options: [
        'Human talent, expertise, and continuous learning',
        'Proprietary hardware and physical infrastructure',
        'Available cash reserves and liquid capital',
        'Historical data archives and legacy software'
      ],
      correctAnswer: 0,
      hint: 'Focus on the intellectual and developmental qualities of the workforce.',
      explanation: 'According to Human Capital Theory in Economy 4.0, an organization\'s most valuable asset is human talent, expertise, and continuous learning, emphasizing the intellectual and developmental qualities of the workforce.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q4',
      question: 'What does the Innovation Index specifically track within an organization?',
      options: [
        'The speed at which employees complete mandatory training',
        'How well an organization is pushing the boundaries of technology',
        'The percentage of the budget allocated to IT departments',
        'The total number of patents filed in a fiscal year'
      ],
      correctAnswer: 1,
      hint: 'Think about a metric that measures the active advancement of technological relevance.',
      explanation: 'The Innovation Index specifically tracks how well an organization is pushing the boundaries of technology, measuring the active advancement and adoption of new technological capabilities.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q5',
      question: 'Which metric would a company use to measure the financial value generated from a customer relationship over the entire duration of that relationship?',
      options: [
        'Net Promoter Score (NPS)',
        'Churn Rate',
        'Customer Satisfaction Score (CSAT)',
        'Customer Lifetime Value (CLV)'
      ],
      correctAnswer: 3,
      hint: 'Identify the metric that looks at the \'lifetime\' economic contribution of a user.',
      explanation: 'Customer Lifetime Value (CLV) measures the financial value generated from a customer relationship over the entire duration of that relationship, representing the total economic contribution a customer makes to the business.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q6',
      question: 'Why is the Customer Effort Score (CES) considered an essential metric for modern organizations?',
      options: [
        'It measures how much effort marketing teams put into customer acquisition',
        'It tracks the physical energy required to use a hardware device',
        'It calculates the total hours a customer spends using a product',
        'It identifies friction points by measuring how easy it is to interact with a service'
      ],
      correctAnswer: 3,
      hint: 'Think about the \'friction\' or \'seamlessness\' of a user\'s experience.',
      explanation: 'Customer Effort Score (CES) is essential because it identifies friction points by measuring how easy it is to interact with a service, helping organizations understand and improve the seamlessness of customer experiences.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q7',
      question: 'If an organization has a high Churn Rate, what does this signal about its business health?',
      options: [
        'The organization is successfully acquiring new market segments',
        'The cost of production is higher than the revenue generated per unit',
        'A significant percentage of customers are stopping their business with the organization',
        'Employees are leaving the company at an unsustainable rate'
      ],
      correctAnswer: 2,
      hint: 'Consider what happens when a customer decides to stop using a service.',
      explanation: 'A high Churn Rate signals that a significant percentage of customers are stopping their business with the organization, indicating potential problems with customer satisfaction, product value, or service quality.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q8',
      question: 'How does Amazon maintain its market dominance according to the examples provided in the source material?',
      options: [
        'By using traditional intuition-based decision making',
        'By focusing exclusively on short-term profit margins',
        'By tracking its Innovation Index through AI-driven experiences and automation',
        'By maintaining the lowest physical retail footprint in the industry'
      ],
      correctAnswer: 2,
      hint: 'Look for the specific role of technology and automation in their strategy.',
      explanation: 'Amazon maintains its market dominance by tracking its Innovation Index through AI-driven experiences and automation, continuously pushing technological boundaries to enhance customer experience and operational efficiency.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q9',
      question: 'What is the primary purpose of operational metrics in Economy 4.0?',
      options: [
        'To replace all human workers with automated machinery',
        'To maximize the amount of physical inventory stored in warehouses',
        'To strictly monitor the arrival and departure times of all employees',
        'To ensure organizations are nimble and able to pivot as the digital landscape shifts'
      ],
      correctAnswer: 3,
      hint: 'Consider the need for speed, flexibility, and constant improvement.',
      explanation: 'The primary purpose of operational metrics in Economy 4.0 is to ensure organizations are nimble and able to pivot as the digital landscape shifts, enabling speed, flexibility, and continuous improvement in a rapidly changing environment.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
    {
      id: 'q10',
      question: 'In Economy 4.0, why can businesses no longer rely solely on intuition or past experiences for decision-making?',
      options: [
        'Intuition has been proven to be completely irrelevant in business',
        'Cognitive technologies prevent humans from making intuitive choices',
        'Past experiences are deleted from digital databases every five years',
        'Real-time data and analytics provide more accurate insights for a dynamic market'
      ],
      correctAnswer: 3,
      hint: 'Think about the role of \'real-time\' information compared to \'past\' events.',
      explanation: 'In Economy 4.0, businesses can no longer rely solely on intuition or past experiences because real-time data and analytics provide more accurate insights for a dynamic market, enabling data-driven decisions that respond to current conditions rather than historical patterns.',
      lessonReference: 'Success Metrics of Economy 4.0'
    },
  ]
};
