# DTMA AI Agents - Quick Reference Guide

## Visual Identity

```
┌──────────────────────────────────────────────────────────────┐
│                    BUTLER AI                                 │
│              (Public Concierge)                              │
├──────────────────────────────────────────────────────────────┤
│  Icon: ✨ Sparkles                                           │
│  Color: Navy Blue → Dark Navy                                │
│  Accent: Orange (#ff6b4d)                                    │
│  Location: Public pages (Index, Courses)                     │
│  Trigger: Pre-login visitors                                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  TRANSACT AI                                 │
│              (Personal Mentor)                               │
├──────────────────────────────────────────────────────────────┤
│  Icon: 🧠 Brain                                              │
│  Color: Purple → Indigo                                      │
│  Accent: Green pulse                                         │
│  Location: Learner Dashboard                                 │
│  Trigger: Post-login, enrolled learners                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                COURSE TUTOR AI                               │
│              (SME Tutor)                                     │
├──────────────────────────────────────────────────────────────┤
│  Icon: 🎓 Graduation Cap                                     │
│  Color: Emerald → Teal                                       │
│  Accent: Blue pulse                                          │
│  Location: Inside course lessons                             │
│  Trigger: Active learning session                            │
└──────────────────────────────────────────────────────────────┘
```

## When Each Agent Appears

### Butler AI 🏢
**"Hello! Welcome to DTMA. How can I help you explore?"**

- Homepage browsing
- Course catalog viewing
- About/Faculty pages
- Before user logs in
- General information seeking

### Transact AI 🎯
**"Hi [Name]! Let's review your progress and plan your next steps."**

- After login
- Dashboard overview
- My Courses section
- Certificates page
- Profile management
- Any dashboard tab

### Course Tutor AI 📚
**"Hi [Name]! I'm your tutor for this lesson. What would you like to know?"**

- Inside a specific lesson
- During video playback
- Taking a quiz
- Working on assignment
- Reviewing lesson content

## Quick Action Buttons

### Butler AI
```
┌─────────────────┬─────────────────┐
│ Explore Courses │  What is 6XD?   │
├─────────────────┼─────────────────┤
│  Meet Faculty   │   Get Started   │
└─────────────────┴─────────────────┘
```

### Transact AI
```
┌─────────────────┬─────────────────┐
│ Progress Check  │   Set Goals     │
├─────────────────┼─────────────────┤
│  Get Advice     │   Next Steps    │
└─────────────────┴─────────────────┘
```

### Course Tutor AI
```
┌─────────────────┬─────────────────┐
│  Explain this   │  Key concepts   │
├─────────────────┼─────────────────┤
│    Summary      │   Quiz help     │
└─────────────────┴─────────────────┘
```

## Common Questions & Responses

### Butler AI Examples

**Q: "What is DTMA?"**
> DTMA (Digital Transformation Management Academy) is the UAE's premier institution for digital transformation education, offering KHDA-attested credentials...

**Q: "Tell me about 6XD"**
> The 6XD Framework is our comprehensive approach to digital transformation mastery, covering six key dimensions...

**Q: "How do I enroll?"**
> Great question! Here's how to get started: 1. Browse our courses, 2. Create an account...

---

### Transact AI Examples

**Q: "Review my progress"**
> Let me analyze your learning journey: 📚 Active Courses: 3, ✅ Completed: 1, 📊 Average Progress: 65%...

**Q: "What should I learn next?"**
> Based on your profile and progress, here are my recommendations: 🎯 Start with fundamentals...

**Q: "Motivate me!"**
> You're doing amazing! Every lesson completed is a step toward your goals. Digital transformation leaders are made through consistent effort...

---

### Course Tutor AI Examples

**Q: "Explain this lesson"**
> Let me break down "Digital Economy Fundamentals" for you: 📖 Core Concept: This lesson covers...

**Q: "Give me examples"**
> 🌟 Real-World Examples: Companies like Amazon and Alibaba demonstrate these principles...

**Q: "Help me with the quiz"**
> 📝 Quiz Strategy Tips: 1. Read Carefully, 2. Eliminate Wrong Answers, 3. Look for Keywords...

**Q: "Study tips"**
> 📚 Effective Learning Strategies: 🎯 Active Learning: Pause and summarize, 🧠 Memory Techniques...

## Feature Comparison

| Feature | Butler | Transact | Tutor |
|---------|--------|----------|-------|
| Course Info | ✅ | ❌ | ❌ |
| Enrollment Help | ✅ | ❌ | ❌ |
| Progress Tracking | ❌ | ✅ | ✅ |
| Career Guidance | ❌ | ✅ | ❌ |
| Lesson Explanations | ❌ | ❌ | ✅ |
| Quiz Strategies | ❌ | ❌ | ✅ |
| Assignment Help | ❌ | ❌ | ✅ |
| Note Generation | ❌ | ❌ | ✅ |
| Voice Input | ❌ | ❌ | ✅ |
| Resource Links | ✅ | ✅ | ✅ |
| Personalization | ❌ | ✅ | ✅ |

## Best Practices for Users

### Using Butler AI
✅ Ask about courses before enrolling  
✅ Learn about 6XD framework  
✅ Get faculty information  
✅ Understand credentials  
❌ Don't ask about personal progress (not logged in)

### Using Transact AI
✅ Check your learning progress  
✅ Get course recommendations  
✅ Set learning goals  
✅ Seek career advice  
❌ Don't ask lesson-specific questions (use Tutor)

### Using Course Tutor AI
✅ Ask lesson-specific questions  
✅ Request explanations and examples  
✅ Get quiz and assignment help  
✅ Generate notes and summaries  
❌ Don't ask about other courses (use Mentor)

## Developer Reference

### Import Statements
```typescript
// Butler AI
import { ButlerAI } from '@/components/butler/ButlerAI';

// Transact AI
import { TransactAI } from '@/components/mentor/TransactAI';

// Course Tutor AI
import { CourseTutorAI } from '@/components/mentor/CourseTutorAI';
```

### Usage Examples

#### Butler AI
```tsx
<PublicLayout>
  {/* Butler AI is included in PublicLayout */}
  <YourPageContent />
</PublicLayout>
```

#### Transact AI
```tsx
<TransactAI
  enrolledCourses={enrollments?.length || 0}
  completedCourses={completedCourses.length}
  averageProgress={totalProgress}
  learningGoal={onboardingData?.learningGoal || ''}
  skillLevel={onboardingData?.skillLevel || 'Beginner'}
  streak={0}
/>
```

#### Course Tutor AI
```tsx
<CourseTutorAI
  courseTitle={course.title}
  moduleTitle={currentModule.title}
  lessonTitle={currentLesson.title}
  lessonContent={currentLesson.content}
  isQuiz={currentLesson.isQuiz}
  isAssignment={currentLesson.isAssignment}
  currentProgress={progressPercent}
/>
```

## Troubleshooting

### Multiple AI Agents Showing
- This is normal! Different agents serve different purposes
- Butler AI: z-index 50 (highest)
- Transact AI: z-index 40
- Course Tutor AI: z-index 40
- They won't overlap due to different contexts

### AI Not Responding
- Check if input field has text
- Ensure you pressed Enter or Send button
- Wait for 600ms response delay
- Check browser console for errors

### Wrong AI Agent Appearing
- Butler AI only on public pages
- Transact AI only on dashboard
- Course Tutor AI only in lessons
- Check your current route

## Support

For issues or questions:
- Check documentation in `/docs`
- Review implementation files
- Contact development team
- Submit GitHub issue

---

**Quick Tip**: Each AI agent has a distinct color scheme and icon to help you identify which one you're talking to!

🔵 Navy/Orange = Butler (Public)  
🟣 Purple/Indigo = Transact (Dashboard)  
🟢 Emerald/Teal = Tutor (Lessons)
