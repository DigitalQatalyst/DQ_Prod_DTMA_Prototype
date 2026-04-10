# Course Builder - Complete Specification

## Overview

The Course Builder is the primary interface for creating and editing courses in the DTMA platform. It provides a structured, step-by-step workflow for instructors and admins to build comprehensive courses.

**Route:** `/course-builder` or `/courses/:courseId/builder`  
**Access:** Admin and Instructor roles  
**Current Status:** Implemented in `src/pages/CourseBuilder.tsx`

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  SIDEBAR (Fixed Left)          │  MAIN CONTENT AREA             │
│                                 │                                │
│  [DTMA Logo]                    │  ┌──────────────────────────┐ │
│                                 │  │ HEADER                    │ │
│  [Role Switcher]                │  │ ← Back | Course Title     │ │
│                                 │  │ Last saved: 2:30 PM       │ │
│  Course Builder Steps:          │  │ [Preview] [Save]          │ │
│  ✓ Course Basics                │  │                           │ │
│  ○ Curriculum                   │  │ Progress: 2 of 7          │ │
│  ○ Course Media                 │  │ ▓▓▓▓░░░░░░░░░░░░░░░░░░░░ │ │
│  ○ Final Assessment             │  └──────────────────────────┘ │
│  ○ Eligibility & Certification  │                                │
│  ○ Pricing & Settings           │  ┌──────────────────────────┐ │
│  ○ Submit for Review            │  │ STEP CONTENT              │ │
│                                 │  │                           │ │
│  [User Profile]                 │  │ [Dynamic content based    │ │
│  [Sign Out]                     │  │  on selected step]        │ │
│                                 │  │                           │ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7-Step Workflow

### Step 1: Course Basics ✅
**Status:** Read-only (completed during course creation)

**Content:**
- Course Title (display only)
- Category (display only)
- Level (display only)
- Description (display only)
- Price (display only)
- Completion badge

**Purpose:** Shows the basic information entered during initial course creation. This step is automatically marked complete.

---

### Step 2: Curriculum 📚
**Status:** Editable - Core content structure

**Components:**
1. **Section Management**
   - Add Section button
   - Section title (editable inline)
   - Drag & drop reordering (GripVertical icon)
   - Delete section button
   - Expand/collapse sections
   - Lesson count display

2. **Lesson Management** (within sections)
   - Add Lesson button
   - Lesson title (editable inline)
   - Drag & drop reordering
   - Delete lesson button
   - Resource management

3. **Resource Types** (per lesson)
   - **Video:** Upload video files
   - **PDF:** Upload PDF documents
   - **Downloadable:** Upload any file type
   - Resource name and size display
   - Delete resource button

4. **Lesson Quiz** (optional per lesson)
   - Enable/Disable quiz toggle
   - Quiz settings:
     - Passing score (percentage)
     - Required (yes/no)
   - Question management:
     - Add question button
     - Question text
     - Question type (MCQ)
     - 4 answer options
     - Correct answer selection
     - Points per question
     - Delete question button

**Validation:**
- At least 1 section required
- At least 1 lesson per section required
- Lesson titles must not be empty

**Data Structure:**
```typescript
interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

interface Lesson {
  id: string;
  title: string;
  resources: Resource[];
  quiz?: Quiz;
  order: number;
}

interface Resource {
  id: string;
  type: 'video' | 'pdf' | 'download';
  name: string;
  url: string;
  size: number;
  file: File;
}

interface Quiz {
  enabled: boolean;
  questions: Question[];
  passingScore: number;
  required: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'mcq';
  options: string[];
  correctAnswer: number;
  points: number;
}
```

---

### Step 3: Course Media 🎨
**Status:** Editable - Visual assets

**Components:**
1. **Course Thumbnail**
   - Upload image button
   - Image preview
   - Recommended size: 1200x675px
   - Accepted formats: JPG, PNG
   - Max file size: 5MB

2. **Course Trailer** (optional)
   - Upload video button
   - Video preview
   - Recommended length: 1-2 minutes
   - Accepted formats: MP4, MOV
   - Max file size: 100MB

3. **Additional Images** (optional)
   - Gallery of course images
   - Add image button
   - Delete image button
   - Drag to reorder

**Validation:**
- Thumbnail is required
- Trailer is optional

---

### Step 4: Final Assessment 📝
**Status:** Editable - Course-level assessment

**Components:**
1. **Assessment Type**
   - Quiz (multiple choice)
   - Assignment (file submission)
   - Project (detailed submission)
   - None (no final assessment)

2. **Quiz Configuration** (if Quiz selected)
   - Assessment title
   - Time limit (minutes)
   - Passing score (percentage)
   - Number of attempts allowed
   - Question bank:
     - Add question button
     - Question text
     - 4 answer options
     - Correct answer
     - Points per question
     - Explanation (optional)

3. **Assignment Configuration** (if Assignment selected)
   - Assignment title
   - Instructions (rich text)
   - Submission format (file types accepted)
   - Due date (optional)
   - Grading rubric (optional)

4. **Project Configuration** (if Project selected)
   - Project title
   - Project brief (rich text)
   - Deliverables checklist
   - Submission guidelines
   - Evaluation criteria

**Validation:**
- If assessment enabled, at least 1 question/requirement must be added

---

### Step 5: Eligibility & Certification 🎓
**Status:** Editable - Prerequisites and credentials

**Components:**
1. **Prerequisites**
   - Required courses (select from existing)
   - Required skills (free text tags)
   - Minimum experience level
   - Technical requirements

2. **Certification Settings**
   - Issue certificate (yes/no)
   - Certificate template selection
   - Completion criteria:
     - Complete all lessons (yes/no)
     - Pass final assessment (yes/no)
     - Minimum attendance (percentage)
     - Minimum score (percentage)

3. **KHDA Attestation** (if applicable)
   - KHDA attested (yes/no)
   - Attestation number
   - Attestation date
   - Certificate validity period

**Validation:**
- If certificate enabled, completion criteria must be defined

---

### Step 6: Pricing & Settings 💰
**Status:** Editable - Commercial and access settings

**Components:**
1. **Pricing**
   - Course price (USD)
   - Original price (for discount display)
   - Currency selection
   - Pricing model:
     - One-time purchase
     - Subscription (monthly/annual)
     - Free

2. **Enrollment Settings**
   - Enrollment capacity (unlimited or number)
   - Enrollment start date
   - Enrollment end date
   - Auto-enrollment (yes/no)

3. **Access Settings**
   - Course duration (days after enrollment)
   - Lifetime access (yes/no)
   - Drip content (release lessons over time)
   - Download permissions (yes/no)

4. **Visibility Settings**
   - Public (visible to all)
   - Private (invite only)
   - Unlisted (accessible via link)
   - Featured (show on homepage)

**Validation:**
- Price must be >= 0
- If enrollment capacity set, must be > 0

---

### Step 7: Submit for Review 🚀
**Status:** Final submission

**Components:**
1. **Completion Checklist**
   - ✓ Course basics completed
   - ✓ Curriculum added (sections & lessons)
   - ✓ Course media uploaded
   - ✓ Assessment configured
   - ✓ Eligibility set
   - ✓ Pricing configured

2. **Review Summary**
   - Course title
   - Total sections
   - Total lessons
   - Total duration (calculated)
   - Price
   - Status: Draft

3. **Submission Options**
   - Save as Draft (continue later)
   - Submit for Review (send to admin)
   - Publish Immediately (admin only)

4. **Submission Notes**
   - Text area for notes to reviewer
   - Special instructions
   - Questions for admin

**Actions:**
- **Save as Draft:** Saves progress, stays in builder
- **Submit for Review:** Changes status to "Pending", notifies admin, redirects to dashboard
- **Publish:** (Admin only) Changes status to "Published", makes course live

---

## Sidebar Navigation

### Structure
```
┌─────────────────────┐
│ [DTMA Logo]         │
├─────────────────────┤
│ [Role Switcher]     │
├─────────────────────┤
│ Course Builder      │
│                     │
│ ✓ Course Basics     │ ← Completed (green checkmark)
│ ○ Curriculum        │ ← Incomplete (empty circle)
│ ○ Course Media      │
│ ○ Final Assessment  │
│ ○ Eligibility       │
│ ○ Pricing           │
│ ○ Submit            │
├─────────────────────┤
│ [User Profile]      │
│ [Sign Out]          │
└─────────────────────┘
```

### Step States
- **Completed:** Green checkmark icon, can navigate
- **Current:** Highlighted background (navy #1e2348)
- **Incomplete:** Empty circle icon, can navigate
- **Locked:** (Optional) Gray out if prerequisites not met

### Interactions
- Click any step to navigate
- Progress persists in localStorage
- Auto-save on step change

---

## Header Bar

### Left Section
- **Back Button:** Navigate to instructor/admin dashboard
- **Course Title:** Display course name
- **Last Saved:** Timestamp of last auto-save

### Right Section
- **Preview Button:** Opens course in new tab (learner view)
- **Save Button:** Manual save trigger

### Progress Bar
- Shows completion: "X of 7 steps"
- Visual progress bar (0-100%)
- Updates in real-time as steps complete

---

## Data Persistence

### LocalStorage Strategy
```typescript
// Key format
`course_${courseId}`

// Stored data
{
  curriculum: Section[],
  thumbnail: string,
  trailer: string,
  assessmentsConfigured: boolean,
  eligibilityConfigured: boolean,
  pricingConfigured: boolean,
  // ... other step data
}
```

### Auto-Save
- Triggers every 2 seconds
- Saves to localStorage
- Updates "Last saved" timestamp
- No server call (draft mode)

### Manual Save
- Triggered by Save button
- Saves to localStorage
- Shows toast notification
- Optional: Save to server (API call)

---

## Validation Rules

### Step Completion Criteria

| Step | Completion Requirement |
|------|----------------------|
| Course Basics | Auto-complete (from creation) |
| Curriculum | ≥1 section AND ≥1 lesson |
| Course Media | Thumbnail uploaded |
| Final Assessment | Assessment configured (or skipped) |
| Eligibility | Settings saved |
| Pricing | Price set and saved |
| Submit | All steps complete |

### Form Validation
- Required fields marked with asterisk (*)
- Inline validation on blur
- Error messages below fields
- Cannot proceed if validation fails

---

## UI Components

### Drag & Drop
- **Sections:** Reorder within curriculum
- **Lessons:** Reorder within section or move between sections
- **Visual Feedback:** Drag handle (GripVertical icon)
- **Drop Zones:** Highlight on drag over

### File Upload
- **Trigger:** Click upload button
- **File Picker:** Native browser dialog
- **Accepted Types:** Based on resource type
- **Progress:** Show upload progress bar
- **Preview:** Display uploaded file info

### Expandable Sections
- **Sections:** Click to expand/collapse
- **Lessons:** Nested within sections
- **Quizzes:** Nested within lessons
- **Icon:** ChevronLeft rotates 90° when expanded

### Inline Editing
- **Section Titles:** Click to edit
- **Lesson Titles:** Click to edit
- **Auto-save:** On blur or Enter key

---

## Color Scheme

### Primary Colors
- **Navy:** `#1e2348` - Active step, primary actions
- **Orange:** `#ff6b4d` - CTA buttons, highlights
- **Beige:** `#F5F1ED` - Sidebar background

### Status Colors
- **Completed:** Green (emerald-600)
- **In Progress:** Blue
- **Incomplete:** Gray (muted)
- **Error:** Red

### Backgrounds
- **Sidebar:** `#F5F1ED`
- **Main:** `#FFFFFF` (background)
- **Cards:** `#FFFFFF` (card)
- **Muted:** `#F5F6FA`

---

## Typography

### Headings
- **H1 (Course Title):** 24px / 32px, semibold
- **H2 (Step Title):** 20px / 28px, semibold
- **H3 (Section Title):** 16px / 24px, semibold

### Body Text
- **Regular:** 14px / 20px
- **Small:** 13px / 20px
- **Tiny:** 12px / 16px

---

## Responsive Design

### Breakpoints
- **Mobile:** < 768px - Sidebar hidden, hamburger menu
- **Tablet:** 768px - 1024px - Sidebar collapsible
- **Desktop:** > 1024px - Sidebar always visible

### Mobile Adaptations
- Sidebar becomes drawer (slide from left)
- Header buttons stack vertically
- Tables become scrollable
- Drag & drop disabled (use move buttons)

---

## Accessibility

- Keyboard navigation for all steps
- ARIA labels on icons
- Focus indicators visible
- Screen reader announcements for step changes
- Alt text for uploaded images

---

## Integration Points

### API Endpoints (Future)
```typescript
// Save draft
POST /api/courses/:id/draft
Body: { step: string, data: any }

// Submit for review
POST /api/courses/:id/submit
Body: { notes: string }

// Publish course (admin)
POST /api/courses/:id/publish

// Upload media
POST /api/courses/:id/media
Body: FormData
```

### Database Schema
```sql
-- courses table (existing)
ALTER TABLE courses ADD COLUMN curriculum JSONB;
ALTER TABLE courses ADD COLUMN thumbnail_url TEXT;
ALTER TABLE courses ADD COLUMN trailer_url TEXT;
ALTER TABLE courses ADD COLUMN assessment JSONB;
ALTER TABLE courses ADD COLUMN eligibility JSONB;
ALTER TABLE courses ADD COLUMN pricing JSONB;
ALTER TABLE courses ADD COLUMN status VARCHAR(20); -- draft, pending, published
```

---

## User Flows

### Create New Course
1. Admin clicks "Create New Course" in Course Management
2. Modal appears: Enter title, category, level, description, price
3. Course created with status "draft"
4. Redirects to Course Builder (Step 1)
5. User completes steps 1-7
6. User submits for review
7. Admin reviews and publishes

### Edit Existing Course
1. Admin clicks "Edit" icon in Course Management
2. Redirects to Course Builder with courseId
3. Loads existing course data
4. User can edit any step
5. Changes auto-save to localStorage
6. User clicks Save to persist changes
7. User can re-submit if needed

---

## Error Handling

### Upload Errors
- File too large: Show error toast
- Invalid file type: Show error message
- Upload failed: Retry button

### Validation Errors
- Missing required fields: Red border + error text
- Invalid format: Inline error message
- Cannot proceed: Disable Continue button

### Network Errors
- Auto-save failed: Show warning banner
- Manual save failed: Show error toast with retry
- Load failed: Show error page with back button

---

## Performance Considerations

- Lazy load step content (only render active step)
- Debounce auto-save (2 second delay)
- Compress uploaded images
- Chunk large video uploads
- Cache course data in memory

---

## Future Enhancements

1. **AI-Assisted Content Creation**
   - Generate course outline from title
   - Suggest lesson topics
   - Auto-generate quiz questions

2. **Bulk Operations**
   - Import curriculum from CSV
   - Duplicate sections/lessons
   - Copy from existing course

3. **Collaboration**
   - Multiple instructors
   - Comments on sections
   - Version history

4. **Analytics Preview**
   - Estimated completion time
   - Difficulty score
   - Content quality score

5. **Templates**
   - Course templates by category
   - Pre-built curriculum structures
   - Standard assessment templates

---

## Testing Checklist

### Functional Testing
- [ ] Create new course
- [ ] Edit existing course
- [ ] Add/edit/delete sections
- [ ] Add/edit/delete lessons
- [ ] Upload resources (video, PDF, files)
- [ ] Add/edit/delete quiz questions
- [ ] Drag & drop reordering
- [ ] Upload course media
- [ ] Configure assessment
- [ ] Set eligibility
- [ ] Configure pricing
- [ ] Submit for review
- [ ] Save as draft
- [ ] Preview course

### Validation Testing
- [ ] Required fields enforced
- [ ] File type validation
- [ ] File size limits
- [ ] Minimum curriculum requirements
- [ ] Price validation
- [ ] Date validation

### UI/UX Testing
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Drag & drop smooth
- [ ] Auto-save works
- [ ] Progress updates correctly

---

This specification provides a complete blueprint for the Course Builder feature, ensuring consistency with DTMA design patterns and comprehensive functionality for course creation.
