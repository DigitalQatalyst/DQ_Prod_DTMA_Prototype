# Design Document: Instructor Dashboard

## Overview

The Instructor Dashboard is a dedicated interface for instructors to create, manage, and monitor their courses on the DTMA platform. This design focuses on providing instructors with an intuitive, role-specific dashboard that enables efficient course authoring, submission workflows, and performance analytics while maintaining clear separation from Super Admin and Learner interfaces.

### Purpose

The Instructor Dashboard serves as the primary workspace for instructors to:
- Create and manage their own courses
- Submit courses for review and track approval status
- View analytics for their published courses
- Access the Course Builder for content creation
- Manage their instructor profile

### Key Design Principles

1. **Role-Based Access**: Strict enforcement of instructor permissions - instructors can only access and modify their own courses
2. **Workflow Clarity**: Clear visual indicators for course status (draft, pending review, published) and available actions
3. **Consistency**: Follows existing DTMA design patterns from AdminDashboard and LearnerDashboard for familiarity
4. **Efficiency**: Quick actions and streamlined navigation to common tasks
5. **Feedback Visibility**: Prominent display of review status changes and admin feedback

## Architecture

### Component Hierarchy

```
InstructorDashboard (Main Container)
├── Header Section
│   ├── Welcome Message
│   ├── Role Badge
│   └── Profile Quick Access
├── Navigation
│   ├── My Courses Tab
│   ├── Analytics Tab
│   └── Profile Tab
├── My Courses Section
│   ├── Create Course CTA
│   ├── Course Status Filters
│   ├── Course Cards/List
│   │   ├── Draft Courses
│   │   ├── Pending Review Courses
│   │   └── Published Courses
│   └── Quick Actions per Course
│       ├── Edit (draft/pending only)
│       ├── Submit for Review (draft only)
│       ├── View Analytics (published only)
│       └── Preview
├── Course Analytics Section
│   ├── Overview Stats
│   │   ├── Total Courses
│   │   ├── Total Enrollments
│   │   ├── Avg Completion Rate
│   │   └── Total Revenue
│   ├── Per-Course Analytics
│   │   ├── Enrollment Trends
│   │   ├── Completion Rates
│   │   ├── Learner Ratings
│   │   └── Revenue Breakdown
│   └── Performance Insights
├── Notifications Panel
│   ├── Review Status Updates
│   ├── Admin Feedback
│   └── System Notifications
└── CreateCourseModal Integration
    └── Launches Course Builder
```

### Route Structure

```
/dashboard (role-based routing)
  → Instructors: InstructorDashboard
  → Learners: LearnerDashboard
  → Super Admins: AdminDashboard

/auth/instructor
  → Instructor login page

/courses/:courseId/builder
  → Course Builder (with ownership verification)
```

### State Management

The Instructor Dashboard manages the following state:

1. **User State** (from AuthContext)
   - Current user ID
   - User role (instructor)
   - Profile information

2. **Course State**
   - List of instructor's courses
   - Course status (draft, pending_review, published, archived)
   - Course ownership mapping

3. **Analytics State**
   - Enrollment data per course
   - Completion rates
   - Revenue metrics
   - Learner ratings

4. **Notification State**
   - Unread notifications count
   - Review status changes
   - Admin feedback messages

5. **UI State**
   - Active tab (courses, analytics, profile)
   - Status filter selection
   - Modal visibility (CreateCourseModal)
   - Loading states

## Components and Interfaces

### 1. InstructorDashboard Component

**File**: `src/pages/dashboard/InstructorDashboard.tsx`

**Props**: None (uses AuthContext)

**Responsibilities**:
- Main container for instructor interface
- Route protection and role verification
- Tab navigation management
- Integration with CreateCourseModal

**Key Features**:
- Responsive layout matching AdminDashboard structure
- Tab-based navigation (My Courses, Analytics, Profile)
- Real-time notification updates
- Role badge display

### 2. MyCourses Component

**File**: `src/components/instructor/MyCourses.tsx`

**Props**:
```typescript
interface MyCoursesProps {
  instructorId: string;
}
```

**Responsibilities**:
- Display instructor's courses grouped by status
- Provide filtering and search functionality
- Render quick action buttons per course
- Handle course submission workflow

**Key Features**:
- Status-based grouping (Draft, Pending Review, Published)
- Search and filter controls
- Course cards with status badges
- Quick actions: Edit, Submit for Review, View Analytics, Preview
- Empty states for each status group

**Course Card Structure**:
```typescript
interface CourseCard {
  id: string;
  title: string;
  category: string;
  level: string;
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  thumbnail: string;
  lastUpdated: string;
  enrollments: number; // 0 for draft/pending
  rating: number; // 0 for draft/pending
  reviewFeedback?: string; // if rejected
}
```

### 3. CourseAnalytics Component

**File**: `src/components/instructor/CourseAnalytics.tsx`

**Props**:
```typescript
interface CourseAnalyticsProps {
  instructorId: string;
}
```

**Responsibilities**:
- Display aggregated analytics for instructor's published courses
- Show per-course performance metrics
- Render enrollment trends and completion rates
- Display revenue data

**Key Features**:
- Overview stat cards (Total Courses, Enrollments, Avg Completion, Revenue)
- Per-course analytics table
- Visual charts for trends (enrollment over time, completion rates)
- Filtering by date range and course

**Analytics Data Structure**:
```typescript
interface InstructorAnalytics {
  totalCourses: number;
  publishedCourses: number;
  totalEnrollments: number;
  avgCompletionRate: number;
  totalRevenue: number;
  courseBreakdown: CourseMetrics[];
}

interface CourseMetrics {
  courseId: string;
  courseTitle: string;
  enrollments: number;
  completionRate: number;
  avgRating: number;
  revenue: number;
  enrollmentTrend: DataPoint[];
}

interface DataPoint {
  date: string;
  value: number;
}
```

### 4. NotificationsPanel Component

**File**: `src/components/instructor/NotificationsPanel.tsx`

**Props**:
```typescript
interface NotificationsPanelProps {
  instructorId: string;
  onNotificationClick: (notificationId: string) => void;
}
```

**Responsibilities**:
- Display review status notifications
- Show admin feedback for rejected courses
- Mark notifications as read
- Provide quick links to relevant courses

**Notification Types**:
```typescript
interface Notification {
  id: string;
  type: 'review_approved' | 'review_rejected' | 'course_published' | 'system';
  courseId?: string;
  courseTitle?: string;
  message: string;
  feedback?: string; // for rejections
  timestamp: string;
  read: boolean;
}
```

### 5. CourseStatusBadge Component

**File**: `src/components/instructor/CourseStatusBadge.tsx`

**Props**:
```typescript
interface CourseStatusBadgeProps {
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  size?: 'sm' | 'md' | 'lg';
}
```

**Responsibilities**:
- Render status badge with appropriate styling
- Display status icon and label

**Status Styling**:
- Draft: Amber background, amber text, pencil icon
- Pending Review: Blue background, blue text, clock icon
- Published: Emerald background, emerald text, check icon
- Archived: Gray background, gray text, archive icon

### 6. CourseQuickActions Component

**File**: `src/components/instructor/CourseQuickActions.tsx`

**Props**:
```typescript
interface CourseQuickActionsProps {
  course: CourseCard;
  onEdit: (courseId: string) => void;
  onSubmit: (courseId: string) => void;
  onViewAnalytics: (courseId: string) => void;
  onPreview: (courseId: string) => void;
}
```

**Responsibilities**:
- Render action buttons based on course status
- Handle permission checks
- Provide tooltips for disabled actions

**Action Availability Matrix**:
| Action | Draft | Pending Review | Published | Archived |
|--------|-------|----------------|-----------|----------|
| Edit | ✓ | ✗ | ✗ | ✗ |
| Submit for Review | ✓ | ✗ | ✗ | ✗ |
| View Analytics | ✗ | ✗ | ✓ | ✓ |
| Preview | ✓ | ✓ | ✓ | ✓ |

### 7. Footer Navigation Update

**File**: `src/components/layout/Footer.tsx`

**Changes Required**:
- Add "Instructor" link below "Admin" link in "Get to Know Us" section
- Link to `/auth/instructor` for instructor login

**Updated Footer Links**:
```typescript
getToKnowUs: [
  // ... existing links
  { label: "Admin", href: "/admin" },
  { label: "Instructor", href: "/auth/instructor" }, // NEW
]
```

## Data Models

### Course Model (Extended)

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  price: number;
  originalPrice: number;
  
  // Ownership
  instructorId: string; // NEW - links to user.id
  instructorName: string;
  instructorAvatar?: string;
  
  // Status and workflow
  status: 'draft' | 'pending_review' | 'published' | 'archived'; // EXTENDED
  submittedForReviewAt?: string; // NEW
  publishedAt?: string;
  lastUpdatedAt: string;
  
  // Review feedback
  reviewFeedback?: string; // NEW - admin feedback on rejection
  reviewedBy?: string; // NEW - admin user ID
  reviewedAt?: string; // NEW
  
  // Content
  curriculum: Module[];
  
  // Analytics (only for published courses)
  enrollments: number;
  rating: number;
  reviews: number;
  completionRate: number;
  revenue: number;
}
```

### InstructorProfile Model

```typescript
interface InstructorProfile {
  userId: string;
  role: 'instructor';
  
  // Profile info
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  expertise: string[];
  
  // Verification
  verified: boolean;
  verifiedAt?: string;
  
  // Stats
  totalCourses: number;
  publishedCourses: number;
  totalEnrollments: number;
  avgRating: number;
  
  // Settings
  notificationPreferences: {
    reviewStatusUpdates: boolean;
    enrollmentMilestones: boolean;
    learnerQuestions: boolean;
  };
}
```

### CourseReview Model

```typescript
interface CourseReview {
  id: string;
  courseId: string;
  instructorId: string;
  
  // Review details
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string; // admin user ID
  
  // Feedback
  feedback?: string; // admin comments
  
  // Checklist (optional - for structured review)
  checklist?: {
    contentQuality: boolean;
    accurateDescription: boolean;
    appropriateLevel: boolean;
    completeModules: boolean;
    assessmentsIncluded: boolean;
  };
}
```

### Notification Model

```typescript
interface Notification {
  id: string;
  userId: string; // instructor ID
  
  // Notification details
  type: 'review_approved' | 'review_rejected' | 'course_published' | 'enrollment_milestone' | 'system';
  title: string;
  message: string;
  
  // Related entities
  courseId?: string;
  courseTitle?: string;
  
  // Review-specific
  feedback?: string; // for rejections
  reviewedBy?: string;
  
  // Metadata
  timestamp: string;
  read: boolean;
  readAt?: string;
  
  // Actions
  actionUrl?: string; // link to course or relevant page
  actionLabel?: string; // e.g., "View Course", "Edit Course"
}
```

### Analytics Data Model

```typescript
interface InstructorAnalytics {
  instructorId: string;
  periodStart: string;
  periodEnd: string;
  
  // Aggregate metrics
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  pendingCourses: number;
  
  totalEnrollments: number;
  newEnrollments: number; // in period
  
  avgCompletionRate: number;
  avgRating: number;
  
  totalRevenue: number;
  periodRevenue: number;
  
  // Per-course breakdown
  courseMetrics: CourseMetrics[];
}

interface CourseMetrics {
  courseId: string;
  courseTitle: string;
  status: string;
  
  enrollments: number;
  newEnrollments: number;
  
  completionRate: number;
  avgTimeToComplete: number; // in hours
  
  rating: number;
  reviewCount: number;
  
  revenue: number;
  
  // Trends
  enrollmentTrend: DataPoint[];
  completionTrend: DataPoint[];
}

interface DataPoint {
  date: string; // ISO date
  value: number;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Course Ownership Filtering

*For any* instructor user, when they access the Instructor Dashboard or analytics page, the system should display only courses where the instructorId matches their user ID.

**Validates: Requirements 5.1, 12.1, 12.4**

### Property 2: Course Creation Ownership Assignment

*For any* instructor user, when they create a new course, the system should set the course's instructorId field to the creator's user ID and set the status to 'draft'.

**Validates: Requirements 7.1, 10.1**

### Property 3: Status Transition - Submit for Review

*For any* course in 'draft' status owned by an instructor, when the instructor submits it for review, the system should change the course status to 'pending_review' and record the submission timestamp.

**Validates: Requirements 7.2**

### Property 4: Edit Restriction - Pending Review

*For any* course in 'pending_review' status, when an instructor attempts to edit the course content, the system should block the edit action regardless of ownership.

**Validates: Requirements 7.3**

### Property 5: Edit Restriction - Published Courses

*For any* course in 'published' status, when an instructor attempts to edit the course content, the system should block the edit action and require creating a new draft version.

**Validates: Requirements 10.6**

### Property 6: Ownership Verification for Edits

*For any* course and any instructor user, when the instructor attempts to edit the course, the system should allow the edit only if the instructor's user ID matches the course's instructorId AND the course status is 'draft'.

**Validates: Requirements 10.2, 10.3**

### Property 7: Ownership Invariance Across Status Changes

*For any* course, when the course status changes from any status to any other status, the instructorId field should remain unchanged.

**Validates: Requirements 10.7**

### Property 8: Status-Based Course Grouping and Visual Distinction

*For any* list of courses displayed in the Instructor Dashboard, courses should be grouped by their status (draft, pending_review, published) and each status group should have visually distinct styling (different badge colors and icons).

**Validates: Requirements 5.4, 13.7**

### Property 9: Analytics Data Completeness

*For any* published course owned by an instructor, when the instructor views the course analytics, the system should display enrollment count, completion rate, and revenue data for that course.

**Validates: Requirements 5.3, 12.7**

### Property 10: Status-Based Action Availability

*For any* course displayed in the Instructor Dashboard, the available quick actions should match the course status: draft courses should show Edit and Submit for Review actions, pending_review courses should show only Preview, and published courses should show View Analytics and Preview actions.

**Validates: Requirements 5.5**

### Property 11: Review Status Notifications

*For any* course review status change (approval or rejection), the system should create a notification for the course owner with the new status and any admin feedback.

**Validates: Requirements 5.6, 7.5**

### Property 12: Permission-Based UI State

*For any* action button in the Instructor Dashboard, if the current user does not have permission to perform that action, the button should be disabled and display a tooltip explaining the restriction.

**Validates: Requirements 13.1**

### Property 13: Role-Based Dashboard Routing

*For any* authenticated user, when they navigate to "/dashboard", the system should display the InstructorDashboard if their role is 'instructor', LearnerDashboard if their role is 'learner', or AdminDashboard if their role is 'admin'.

**Validates: Requirements 11.3**

## Error Handling

### Permission Errors

**Scenario**: Instructor attempts to edit a course they don't own

**Handling**:
1. Verify ownership before allowing edit action
2. If ownership check fails, display error toast: "You don't have permission to edit this course. Only the course creator can make edits."
3. Log the unauthorized attempt with user ID and course ID
4. Do not navigate to Course Builder
5. Keep user on current page

**Scenario**: Instructor attempts to edit a pending_review or published course

**Handling**:
1. Check course status before allowing edit
2. If status is 'pending_review': Display message "This course is currently under review and cannot be edited. Please wait for admin feedback."
3. If status is 'published': Display message "Published courses cannot be edited directly. Contact support to request changes."
4. Disable edit button and show tooltip with explanation
5. Log the attempt for analytics

### Data Loading Errors

**Scenario**: Failed to load instructor's courses

**Handling**:
1. Display error state in My Courses section
2. Show retry button with message: "Unable to load your courses. Please try again."
3. Log error details to monitoring service
4. Preserve any cached course data if available
5. Allow user to continue using other dashboard features

**Scenario**: Failed to load analytics data

**Handling**:
1. Display error state in Analytics section
2. Show message: "Analytics data is temporarily unavailable. Please try again later."
3. Provide refresh button
4. Show last successfully loaded data if available with timestamp
5. Log error for investigation

### Validation Errors

**Scenario**: Course submission validation fails

**Handling**:
1. Validate course completeness before allowing submission
2. Check required fields: title, description, category, level, at least one module
3. If validation fails, display checklist of missing requirements
4. Highlight incomplete sections in red
5. Prevent submission until all requirements met
6. Show message: "Please complete all required fields before submitting for review."

### Network Errors

**Scenario**: Network timeout during course submission

**Handling**:
1. Show loading indicator during submission
2. Implement 30-second timeout
3. If timeout occurs, display: "Submission is taking longer than expected. Please check your connection and try again."
4. Preserve form data to prevent loss
5. Provide retry option
6. Log timeout for monitoring

### Authentication Errors

**Scenario**: Session expires while using dashboard

**Handling**:
1. Detect authentication failure on API calls
2. Display modal: "Your session has expired. Please log in again to continue."
3. Preserve current page URL
4. Redirect to login page
5. After successful login, redirect back to preserved URL
6. Restore dashboard state if possible

## Testing Strategy

### Dual Testing Approach

The Instructor Dashboard will be validated using both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** will focus on:
- Specific UI component rendering (buttons, badges, cards)
- User interaction flows (clicking buttons, submitting forms)
- Edge cases (empty course lists, missing data)
- Error state displays
- Integration between components
- Mock API responses

**Property-Based Tests** will focus on:
- Universal properties that hold across all inputs
- Course ownership filtering with randomized data
- Status transitions with various course states
- Permission checks with different user roles
- Data integrity across operations

### Property-Based Testing Configuration

**Library**: fast-check (for TypeScript/JavaScript)

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property reference
- Tag format: `Feature: role-based-access-control, Property {number}: {property_text}`

**Example Property Test Structure**:
```typescript
import fc from 'fast-check';

// Feature: role-based-access-control, Property 1: Course Ownership Filtering
test('instructor dashboard shows only owned courses', () => {
  fc.assert(
    fc.property(
      fc.array(courseArbitrary), // generate random courses
      fc.string(), // generate random instructor ID
      (courses, instructorId) => {
        // Assign some courses to instructor, others to different instructors
        const coursesWithOwnership = courses.map((course, idx) => ({
          ...course,
          instructorId: idx % 2 === 0 ? instructorId : `other-${idx}`
        }));
        
        // Filter courses as dashboard would
        const displayedCourses = filterCoursesByInstructor(coursesWithOwnership, instructorId);
        
        // Verify all displayed courses belong to instructor
        expect(displayedCourses.every(c => c.instructorId === instructorId)).toBe(true);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Component Tests**:
- Test each component in isolation with mocked dependencies
- Verify correct rendering based on props
- Test user interactions (clicks, form submissions)
- Verify state updates

**Integration Tests**:
- Test component interactions (parent-child communication)
- Test data flow from API to UI
- Test navigation between dashboard sections
- Test modal opening/closing

**Snapshot Tests**:
- Capture UI snapshots for visual regression testing
- Test different states (loading, error, success)
- Test different course statuses

**Example Unit Test**:
```typescript
describe('MyCourses Component', () => {
  it('displays create course button', () => {
    render(<MyCourses instructorId="test-instructor" />);
    expect(screen.getByText('Create New Course')).toBeInTheDocument();
  });
  
  it('groups courses by status', () => {
    const courses = [
      { id: '1', status: 'draft', title: 'Course 1' },
      { id: '2', status: 'published', title: 'Course 2' },
      { id: '3', status: 'draft', title: 'Course 3' },
    ];
    
    render(<MyCourses instructorId="test-instructor" courses={courses} />);
    
    const draftSection = screen.getByTestId('draft-courses');
    const publishedSection = screen.getByTestId('published-courses');
    
    expect(within(draftSection).getAllByRole('article')).toHaveLength(2);
    expect(within(publishedSection).getAllByRole('article')).toHaveLength(1);
  });
  
  it('disables edit button for pending courses', () => {
    const course = { id: '1', status: 'pending_review', title: 'Course 1' };
    
    render(<CourseCard course={course} />);
    
    const editButton = screen.getByLabelText('Edit course');
    expect(editButton).toBeDisabled();
  });
});
```

### Test Coverage Goals

- **Component Coverage**: 90%+ line coverage for all dashboard components
- **Property Tests**: All 13 correctness properties implemented as property-based tests
- **Integration Tests**: Cover all major user flows (create course, submit for review, view analytics)
- **Error Scenarios**: Test all error handling paths
- **Accessibility**: Test keyboard navigation and screen reader compatibility

### Testing Tools

- **Unit Testing**: Jest + React Testing Library
- **Property-Based Testing**: fast-check
- **E2E Testing**: Playwright (for critical user flows)
- **Visual Regression**: Percy or Chromatic
- **Accessibility**: jest-axe

### Continuous Integration

- Run all tests on every pull request
- Require 90%+ coverage for new code
- Run property tests with 100 iterations in CI
- Run E2E tests on staging environment before production deploy
- Generate coverage reports and track trends

