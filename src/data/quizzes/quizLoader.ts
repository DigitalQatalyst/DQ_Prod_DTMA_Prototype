// Quiz Loader - Centralized quiz loading to avoid circular dependencies

import { module1Quiz } from './module1Quiz';
import { module2Quiz } from './module2Quiz';
import { module3Quiz } from './module3Quiz';
import type { Quiz } from './module1Quiz';

// Helper function to get quiz by module ID
export const getQuizByModuleId = (moduleId: string): Quiz | undefined => {
  if (moduleId === 'economy-module-1') {
    return module1Quiz;
  }
  if (moduleId === 'economy-module-2') {
    return module2Quiz;
  }
  if (moduleId === 'economy-module-3') {
    return module3Quiz;
  }
  return undefined;
};
