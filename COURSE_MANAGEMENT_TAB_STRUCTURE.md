# Course Management Tab - Structure Documentation

## Overview

The Course Management tab in the DTMA Admin Dashboard provides comprehensive tools for creating, editing, publishing, and analyzing courses. This document outlines its complete structure.

---

## Tab Location

**Path:** Admin Dashboard → Course Management  
**Component:** `CourseManagementTab` in `src/pages/dashboard/AdminDashboard.tsx`  
**Access Level:** Admin only

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Course & Content Management                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  SECTION 1: Course Authoring & Publishing                  │ │
│  │                                                             │ │
│  │  [Create New Course Button]                                 │ │
│  │                                                             │ │
│  │  Summary Pills:                                             │ │
│  │  [7 Total] [4 Published] [2 Draft] [1 Pending Review]      │ │
│  │                                                             │ │
│  │  Filters:                                                   │ │
│  │  [Search...] [All Statuses ▼] [All Categories ▼]          │ │
│  │                                                             │ │
│  │  Courses Table:                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │Course│Instructor│Category│Level│Status│Enroll│Updated│  │ │
│  │  ├──────────────────────────────────────────────────────┤  │ │
│  │  │Digital Trans...│Dr. Aisha│Digital│Beginner│✓│342│...│  │ │
│  │  │AI & Automation│James O.│AI & Tech│Inter│✓│219│...│    │ │
│  │  │Data-Driven...│Priya N.│Analytics│Inter│Draft│0│...│   │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  SECTION 2: Course Performance Analytics                   │ │
│  │                                                             │ │
│  │  KPI Cards:                                                 │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      │ │
│  │  │  7   │ │ 68%  │ │ 4.7★ │ │ 748  │                      │ │
│  │  │Total │ │Compl.│ │Rating│ │Enroll│                      │ │
│  │  └──────┘ └──────┘ └──────┘ └──────┘                      │ │
│  │                                                             │ │
│  │  ┌──────────────────────┐  ┌────────────────────────────┐ │ │
│  │  │ Top Performing       │  │ Engagement Snapshot        │ │ │
│  │  │ Courses Table        │  │ • Avg Session: 38 min      │ │ │
│  │  │ (By Enrollments)     │  │ • Lessons: 1,284           │ │ │
│  │  │                      │  │ • New Enrollments: 203     │ │ │
│  │  │ 1. Digital Trans...  │  │ • Completion: 68%          │ │ │
│  │  │ 2. AI & Automation   │  │ • Rating: 4.7★             │ │ │
│  │  │ 3. Data-Driven...    │  │ • Revenue: $22,550         │ │ │
│  │  └──────────────────────┘  └────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Course Authoring & Publishing

### Header
- **Title:** "Course Authoring & Publishing"
- **Subtitle:** "Create, edit, and publish courses with approval workflows."
- **Action Button:** "Create New Course" (links to `/course-builder`)

### Summary Statistics Pills

Four colored pills showing course counts:

| Pill | Value | Color | Description |
|------|-------|-------|-------------|
| Total Courses | 7 | Navy (#1e2348) | All courses in system |
| Published | 4 | Green (emerald) | Live courses |
| Draft | 2 | Amber | Unpublished courses |
| Pending Review | 1 | Blue | Awaiting approval |

**Visual Style:**
```
[7 Total Courses] [4 Published] [2 Draft] [1 Pending Review]
```

### Filter Bar

Three filter controls in a horizontal row:

#### 1. Search Input
- **Icon:** Search (magnifying glass)
- **Placeholder:** "Search courses or instructors…"
- **Functionality:** Filters by course title or instructor name
- **Width:** Flexible (flex-1, min-width: 200px)

#### 2. Status Filter
- **Icon:** Filter
- **Options:**
  - All Statuses
  - Published
  - Draft
  - Pending
- **Default:** "All Statuses"

#### 3. Category Filter
- **Icon:** BookOpen
- **Options:**
  - All Categories
  - Digital Skills
  - AI & Technology
  - Analytics
  - Leadership
  - Management
- **Default:** "All Categories"

### Courses Table

**Table Structure:**

| Column | Width | Content | Sortable |
|--------|-------|---------|----------|
| Course | ~200px | Course title (truncated) | No |
| Instructor | Auto | Instructor name | No |
| Category | Auto | Course category | No |
| Level | Auto | Beginner/Intermediate/Advanced badge | No |
| Status | Auto | Published/Draft/Pending badge | No |
| Enrollments | Auto | Number of enrolled learners | No |
| Last Updated | Auto | Date (YYYY-MM-DD) | No |
| Actions | Auto | Edit & Preview icons | No |

**Table Header:**
- Background: Navy (#1e2348)
- Text: White
- Font: 13px, medium weight

**Table Rows:**
- Alternating background (zebra striping)
- Hover effect: Light gray background
- Border: Top border between rows

**Status Badges:**
```typescript
Published: bg-emerald-100 text-emerald-700
Draft:     bg-amber-100 text-amber-700
Pending:   bg-blue-100 text-blue-700
```

**Level Badges:**
```typescript
All levels: bg-[#1e2348]/10 text-[#1e2348]
```

**Action Icons:**
- Edit (pencil icon) - Orange hover (#ff6b4d)
- Preview (eye icon) - Navy hover (#1e2348)

**Empty State:**
- Shows when no courses match filters
- Icon: BookOpen (large, faded)
- Message: "No courses match your filters."

---

## Section 2: Course Performance Analytics

### Header
- **Title:** "Course Performance Analytics"
- **Subtitle:** "Track engagement, completion rates, and learner feedback across all courses."

### KPI Cards (4 cards in grid)

#### Card 1: Total Courses
- **Icon:** BookOpen
- **Value:** 7
- **Label:** "Total Courses"
- **Color:** Orange (#ff6b4d)
- **Background:** Orange/10

#### Card 2: Avg Completion Rate
- **Icon:** TrendingUp
- **Value:** 68%
- **Label:** "Avg Completion Rate"
- **Color:** Emerald (green)
- **Background:** Emerald/100

#### Card 3: Avg Course Rating
- **Icon:** Star
- **Value:** 4.7★
- **Label:** "Avg Course Rating"
- **Color:** Amber (yellow)
- **Background:** Amber/100

#### Card 4: Total Enrollments
- **Icon:** Users
- **Value:** 748
- **Label:** "Total Enrollments"
- **Color:** Blue
- **Background:** Blue/100

**Card Layout:**
```
┌──────────────────┐
│  [Icon]          │
│                  │
│  22              │  ← Value (22px, bold)
│  Total Courses   │  ← Label (12px, muted)
└──────────────────┘
```

### Two-Column Layout

#### Left Column (2/3 width): Top Performing Courses

**Table Header:**
- Title: "Top Performing Courses"
- Subtitle: "By Enrollments"

**Table Columns:**

| Column | Content | Style |
|--------|---------|-------|
| Course | Rank badge + Title | Rank in circle, title truncated |
| Instructor | Name | 12px, muted |
| Enrolled | Count | 13px, bold |
| Completion | Progress bar + % | Visual bar + text |
| Rating | Stars | Amber color |
| Revenue | Dollar amount | 13px, bold |

**Rank Badges:**
```
[1] [2] [3] [4] [5]
```
- Circle with navy background
- White number
- 10px font, bold

**Completion Progress Bar:**
```
▓▓▓▓▓▓▓▓░░░░░░░░ 72%
```
- Width: 64px
- Height: 6px
- Fill: Emerald green
- Background: Muted gray

**Shows:** Top 5 courses by enrollment count

#### Right Column (1/3 width): Engagement Snapshot

**Header:**
- Title: "Engagement Snapshot"
- Subtitle: "Platform-wide activity this month"

**Metrics List (6 items):**

| Icon | Metric | Value | Trend |
|------|--------|-------|-------|
| Clock | Avg Session Time | 38 min | +4 min ↑ |
| CheckCircle | Lessons Completed (week) | 1,284 | +12% ↑ |
| Users | New Enrollments (month) | 203 | +8% ↑ |
| BarChart2 | Course Completion Rate | 68% | +3% ↑ |
| Star | Avg Learner Rating | 4.7★ | — |
| ArrowUpRight | Total Revenue (month) | $22,550 | +15% ↑ |

**Metric Row Layout:**
```
[Icon] Metric Name          Value
                            Trend
```

**Icon Style:**
- 32px square
- Orange background (#ff6b4d/10)
- Orange icon (#ff6b4d)
- Rounded corners

**Trend Colors:**
- Positive (↑): Green (emerald-600)
- Negative (↓): Red (red-500)
- Neutral (—): Muted gray

---

## Data Model

### Course Object Structure

```typescript
interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'published' | 'draft' | 'pending';
  enrollments: number;
  lastUpdated: string; // YYYY-MM-DD
  rating: number; // 0-5
  completion: number; // 0-100 percentage
  revenue: number; // USD
}
```

### Mock Data (7 courses)

1. **Digital Transformation Fundamentals**
   - Instructor: Dr. Aisha Mensah
   - Category: Digital Skills
   - Level: Beginner
   - Status: Published
   - Enrollments: 342
   - Rating: 4.8
   - Completion: 72%
   - Revenue: $8,550

2. **AI & Automation in the Workplace**
   - Instructor: James Okafor
   - Category: AI & Technology
   - Level: Intermediate
   - Status: Published
   - Enrollments: 219
   - Rating: 4.6
   - Completion: 65%
   - Revenue: $5,475

3. **Data-Driven Decision Making**
   - Instructor: Priya Nair
   - Category: Analytics
   - Level: Intermediate
   - Status: Draft
   - Enrollments: 0
   - Rating: 0
   - Completion: 0%
   - Revenue: $0

4. **Leadership in the Digital Age**
   - Instructor: Marcus Webb
   - Category: Leadership
   - Level: Advanced
   - Status: Pending
   - Enrollments: 0
   - Rating: 0
   - Completion: 0%
   - Revenue: $0

5. **Agile Project Management**
   - Instructor: Sofia Reyes
   - Category: Management
   - Level: Intermediate
   - Status: Published
   - Enrollments: 187
   - Rating: 4.5
   - Completion: 58%
   - Revenue: $4,675

6. **Cybersecurity Essentials**
   - Instructor: Dr. Kwame Asante
   - Category: Digital Skills
   - Level: Beginner
   - Status: Published
   - Enrollments: 154
   - Rating: 4.7
   - Completion: 81%
   - Revenue: $3,850

7. **Emotional Intelligence at Work**
   - Instructor: Lindiwe Dube
   - Category: Leadership
   - Level: Beginner
   - Status: Draft
   - Enrollments: 0
   - Rating: 0
   - Completion: 0%
   - Revenue: $0

---

## State Management

### Component State

```typescript
const [search, setSearch] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [categoryFilter, setCategoryFilter] = useState('All Categories');
```

### Filtering Logic

```typescript
const filtered = MOCK_COURSES.filter(course => {
  const matchSearch = 
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase());
  
  const matchStatus = 
    statusFilter === 'all' || 
    course.status === statusFilter;
  
  const matchCategory = 
    categoryFilter === 'All Categories' || 
    course.category === categoryFilter;
  
  return matchSearch && matchStatus && matchCategory;
});
```

### Calculated Metrics

```typescript
// Count by status
const published = MOCK_COURSES.filter(c => c.status === 'published').length;
const drafts = MOCK_COURSES.filter(c => c.status === 'draft').length;
const pending = MOCK_COURSES.filter(c => c.status === 'pending').length;

// Aggregates
const totalEnrollments = MOCK_COURSES.reduce((sum, c) => sum + c.enrollments, 0);
const avgCompletion = Math.round(
  MOCK_COURSES.filter(c => c.completion > 0)
    .reduce((sum, c) => sum + c.completion, 0) / published
) || 0;
const avgRating = (
  MOCK_COURSES.filter(c => c.rating > 0)
    .reduce((sum, c) => sum + c.rating, 0) / published
).toFixed(1);
const totalRevenue = MOCK_COURSES.reduce((sum, c) => sum + c.revenue, 0);

// Top courses
const topCourses = [...MOCK_COURSES]
  .filter(c => c.status === 'published')
  .sort((a, b) => b.enrollments - a.enrollments)
  .slice(0, 5);
```

---

## Responsive Design

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile Adaptations

1. **Summary Pills:** Stack vertically or wrap
2. **Filter Bar:** Stack vertically
3. **Courses Table:** Horizontal scroll
4. **KPI Cards:** 2 columns instead of 4
5. **Analytics Layout:** Single column (stack top courses and engagement)

---

## Color Scheme

### Primary Colors
- **Navy:** `#1e2348` - Headers, primary elements
- **Orange:** `#ff6b4d` - Actions, highlights
- **White:** `#ffffff` - Card backgrounds

### Status Colors
- **Published:** `bg-emerald-100 text-emerald-700`
- **Draft:** `bg-amber-100 text-amber-700`
- **Pending:** `bg-blue-100 text-blue-700`

### Semantic Colors
- **Success:** Emerald green
- **Warning:** Amber yellow
- **Error:** Red
- **Info:** Blue

---

## Typography

### Headings
- **H1 (Page Title):** 28px / 36px line-height, semibold
- **H2 (Section Title):** 20px / 28px line-height, semibold
- **H3 (Card Title):** 16px / 24px line-height, semibold

### Body Text
- **Regular:** 14px / 20px line-height
- **Small:** 13px / 20px line-height
- **Tiny:** 12px / 16px line-height

### Table Text
- **Header:** 13px, medium weight, white
- **Body:** 13-14px, normal weight
- **Muted:** 12-13px, muted color

---

## Interactions

### Hover States
- **Table Rows:** Light gray background
- **Action Icons:** Colored background (orange/navy)
- **Buttons:** Darker shade

### Click Actions
- **Create New Course:** Navigate to `/course-builder`
- **Edit Icon:** Open course editor
- **Preview Icon:** Open course preview
- **Course Title:** Navigate to course detail

### Focus States
- **Search Input:** Orange ring (#ff6b4d/40)
- **Select Dropdowns:** Orange ring (#ff6b4d/40)

---

## Integration Points

### Links to Other Sections
- **Create New Course** → Course Builder page
- **Edit Course** → Course Builder (edit mode)
- **Preview Course** → Course Detail page

### Data Sources
- Currently uses `MOCK_COURSES` array
- Production: API endpoints for courses, enrollments, analytics

### Future Enhancements
- Real-time data updates
- Export functionality (CSV, PDF)
- Bulk actions (publish multiple, delete multiple)
- Advanced filtering (date range, instructor, tags)
- Sorting by column headers
- Pagination for large course lists

---

## Accessibility

- All interactive elements keyboard accessible
- Proper ARIA labels on icons
- Color contrast meets WCAG AA standards
- Table headers properly associated
- Focus indicators visible

---

## Performance Considerations

- Table virtualization for large datasets
- Debounced search input
- Memoized filter calculations
- Lazy loading for course thumbnails
- Optimistic UI updates

---

This structure provides a comprehensive course management interface that balances functionality with usability, making it easy for admins to manage courses while tracking their performance.
