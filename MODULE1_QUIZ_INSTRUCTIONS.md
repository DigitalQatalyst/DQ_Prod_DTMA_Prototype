# Module 1 Quiz Setup - Instructions

## ✅ What's Been Done

I've set up a clean, organized structure for your Module 1 quiz with 20 questions:

1. **Created Quiz Data File**: `src/data/quizzes/module1Quiz.ts`
   - Contains template for 20 questions
   - Organized by the 5 lessons in Module 1
   - Includes TypeScript interfaces for type safety

2. **Updated Course Structure**: `src/data/dtmaCoursesNew.ts`
   - Added `quizId` field to Lesson interface
   - Linked Module 1 Assessment to the quiz data

3. **Updated Course Player**: `src/pages/CourseLearning.tsx`
   - Automatically loads quiz questions from the data file
   - Uses 70% passing score (configurable)
   - 30-minute time limit (configurable)

## 📝 How to Add Your 20 Questions

Open the file: `src/data/quizzes/module1Quiz.ts`

### Question Structure

Each question follows this format:

```typescript
{
  id: 'q1',                    // Unique ID (q1, q2, q3, etc.)
  question: 'Your question text here?',
  options: [
    'Option A',                // First option (index 0)
    'Option B',                // Second option (index 1)
    'Option C',                // Third option (index 2)
    'Option D'                 // Fourth option (index 3)
  ],
  correctAnswer: 0,            // Index of correct answer (0-3)
  hint: 'Optional hint text',  // 💡 NEW: Helpful clue without revealing answer
  explanation: 'Optional explanation',  // Shown after answering
  lessonReference: 'Lesson name'        // Which lesson this relates to
}
```

### Question Distribution (Recommended)

The template is organized by lesson:
- **Questions 1-4**: Understanding features of Economy 4.0
- **Questions 5-8**: Unveiling the Digital Cognitive Organization
- **Questions 9-12**: Significance of Cognitive organization theory
- **Questions 13-16**: Core Features of Digital Cognitive Organizations
- **Questions 17-20**: Understanding Business Model Innovation

### Steps to Update

1. Open `src/data/quizzes/module1Quiz.ts`
2. Replace each placeholder question with your actual question
3. Update the 4 options for each question
4. Set the `correctAnswer` to the correct option index (0, 1, 2, or 3)
5. Optionally add an `explanation` for each question
6. Save the file

### Example of a Completed Question

```typescript
{
  id: 'q1',
  question: 'What is the primary characteristic of Economy 4.0?',
  options: [
    'Manual labor-intensive processes',
    'Digital transformation and automation',
    'Traditional manufacturing methods',
    'Paper-based documentation'
  ],
  correctAnswer: 1,  // "Digital transformation and automation"
  hint: 'Think about how modern technology is changing business operations.',
  explanation: 'Economy 4.0 is characterized by digital transformation, automation, and the integration of advanced technologies.',
  lessonReference: 'Understanding features of Economy 4.0'
}
```

## ⚙️ Configuration Options

You can adjust these settings in the `module1Quiz` object:

```typescript
export const module1Quiz: Quiz = {
  id: 'economy-module-1-quiz',
  moduleId: 'economy-module-1',
  title: 'Module 1 Assessment',
  description: 'Test your understanding of Economy 4.0 and Digital Cognitive Organizations',
  passingScore: 70,        // Change passing percentage (e.g., 80 for 80%)
  timeLimit: 30,           // Change time limit in minutes (or remove for no limit)
  questions: [
    // Your 20 questions here
  ]
};
```

## 🎯 Quiz Features

Once you add your questions, learners will experience:

- **20 questions** covering all 5 lessons
- **💡 Hint button** for each question (optional, learner can click to reveal)
- **Progress indicator** showing current question number
- **Navigation** between questions (Previous/Next buttons)
- **Answer selection** with visual feedback
- **Submit button** appears on the last question
- **Passing score** of 70% required
- **Certificate** awarded upon passing
- **Retry option** if they don't pass

## 📊 Question Tips

1. **Clear and Concise**: Keep questions focused and easy to understand
2. **Avoid Ambiguity**: Make sure there's only one clearly correct answer
3. **Balanced Difficulty**: Mix easy, medium, and hard questions
4. **Relevant Content**: Ensure questions relate to the video lessons
5. **Distractors**: Make incorrect options plausible but clearly wrong
6. **💡 Helpful Hints**: Write hints that guide thinking without giving away the answer
   - Good hint: "Think about the key characteristics discussed in the first video"
   - Bad hint: "The answer is Option B"

## 🔄 Future Expansion

This structure makes it easy to add more quizzes:
- Create `module2Quiz.ts`, `module3Quiz.ts`, etc.
- Follow the same structure
- Update the `getQuizByModuleId` function to include new quizzes

## ✅ Testing Your Quiz

After adding your questions:
1. Save the file
2. Enroll in the course
3. Complete the 5 video lessons
4. Click on "Module 1 Assessment"
5. Your 20 questions will appear!

## 📁 File Locations

- **Quiz Data**: `src/data/quizzes/module1Quiz.ts` ← Edit this file
- **Course Structure**: `src/data/dtmaCoursesNew.ts`
- **Quiz Player**: `src/pages/CourseLearning.tsx`

---

**Ready to add your questions?** Open `src/data/quizzes/module1Quiz.ts` and start replacing the placeholders!
