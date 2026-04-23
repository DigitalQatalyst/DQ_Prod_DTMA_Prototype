// Module 3 Quiz: Success Metrics of Economy 4.0
// Reusing Module 1 quiz for prototype demonstration purposes

import { module1Quiz } from './module1Quiz';
import type { Quiz } from './module1Quiz';

// Create Module 3 quiz by reusing Module 1 quiz structure
export const module3Quiz: Quiz = {
  ...module1Quiz,
  id: 'economy-module-3-quiz',
  moduleId: 'economy-module-3',
  title: 'Module 3 Assessment',
  description: 'Test your understanding of Success Metrics in Economy 4.0',
};
