# Implementation Plan: Instructor Dashboard

## Overview

This implementation plan covers the development of the Instructor Dashboard feature for the DTMA platform. The implementation follows a bottom-up approach, starting with foundational components and data models, then building up to the main dashboard interface, and finally integrating with existing systems. Each task builds incrementally to ensure continuous validation and early detection of issues.

## Tasks

- [ ] 1. Update data models and database schema
  - [ ] 1.1 Extend Course model with instructor ownership fields
    - Add `instructorId`, `instructorName`, `instructorAvatar` fields to Course interface
    - Extend `status` type to include 'draft', 'pending_review', 'published', 'archived'
    - Add review workflow fields: `submittedForReviewAt`, `reviewFeedback`, `reviewedBy`, `reviewedAt`
    - Update `src/types/course.ts` or equivalent type definition file
    - _Requirements: 10.1, 7.1, 7.5_

  - [ ]* 1.2 Write property test for course ownership assignment
    - **Property 2: Course Creation Ownership Assignment**
    - **Validates: Requirements 7.1, 10.1**

  - [ ] 1.3 Create InstructorProfile, CourseReview, and Notification type definitions
    - Define InstructorProfile interface with profile info, verification status, and stats
    - Define CourseReview interface for review workflow tracking
    - Define Notification interface for instructor notifications
    - Create `src/types/instructor.ts` file
    - _Requirements: 5.6, 7.5_

  - [ ]* 1.4 Write property test for ownership invariance across status changes
    - **Property 7: Ownership Invariance Across Status Changes**
    - **Validates: Requirements 10.7**

- [ ] 2. Implement foundational UI components
  - [ ] 2.1 Create CourseStatusBadge component
    - Implement status badge with color coding (draft=amber, pending=blue, published=emerald, archived=gray)
    - Add status icons (pencil, clock, check, archive)
    - Support size variants (sm, md, lg)
    - Create `src/components/instructor/CourseStatusBadge.tsx`
    - _Requirements: 13.7, 5.4_

  - [ ]* 2.2 Write unit tests for CourseStatusBadge
    - Test all status variants render correctly
    - Test size variants
    - Test icon and color mapping
    - _Requirements: 13.7_

  - [ ] 2.3 Create CourseQuickActions component
    - Implement action buttons: Edit, Submit for Review, View Analytics, Preview
    - Implement action availability matrix based on course status
    - Add tooltips for disabled actions
    - Handle permission checks
    - Create `src/components/instructor/CourseQuickActions.tsx`
    - _Requirements: 5.5, 13.1, 13.2_

  - [ ]* 2.4 Write property test for status-based action availability
    - **Property 10: Status-Based Action Availability**
    - **Validates: Requirements 5.5**

- [ ] 3. Checkpoint - Verify foundational components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement course management components
  - [ ] 4.1 Create MyCourses component structure
    - Set up component with instructorId prop
    - Implement course fetching with ownership filtering
    - Create empty state UI for each status group
    - Add "Create New Course" CTA button
    - Create `src/components/instructor/MyCourses.tsx`
    - _Requirements: 5.1, 5.2, 12.1_

  - [ ]* 4.2 Write property test for course ownership filtering
    - **Property 1: Course Ownership Filtering**
    - **Validates: Requirements 5.1, 12.1, 12.4**

  - [ ] 4.3 Implement course status grouping and display
    - Group courses by status (draft, pending_review, published)
    - Render course cards with CourseStatusBadge
    - Implement search and filter controls
    - Add visual distinction between status groups
    - _Requirements: 5.4, 13.7_

  - [ ]* 4.4 Write property test for status-based course grouping
    - **Property 8: Status-Based Course Grouping and Visual Distinction**
    - **Validates: Requirements 5.4, 13.7**

  - [ ] 4.5 Integrate CourseQuickActions into course cards
    - Add quick action buttons to each course card
    - Wire up action handlers (edit, submit, view analytics, preview)
    - Implement course submission workflow
    - _Requirements: 5.5, 7.2_

  - [ ]* 4.6 Write property test for status transition on submit
    - **Property 3: Status Transition - Submit for Review**
    - **Validates: Requirements 7.2**

- [ ] 5. Implement analytics components
  - [ ] 5.1 Create CourseAnalytics component structure
    - Set up component with instructorId prop
    - Implement analytics data fetching with ownership filtering
    - Create overview stat cards (Total Courses, Enrollments, Avg Completion, Revenue)
    - Create `src/components/instructor/CourseAnalytics.tsx`
    - _Requirements: 5.3, 12.1, 12.7_

  - [ ]* 5.2 Write property test for analytics data completeness
    - **Property 9: Analytics Data Completeness**
    - **Validates: Requirements 5.3, 12.7**

  - [ ] 5.3 Implement per-course analytics display
    - Create analytics table with per-course metrics
    - Add enrollment trends visualization
    - Add completion rate charts
    - Implement date range filtering
    - _Requirements: 5.3, 12.7_

  - [ ]* 5.4 Write unit tests for CourseAnalytics
    - Test stat card rendering
    - Test data filtering by date range
    - Test empty state handling
    - _Requirements: 5.3_

- [ ] 6. Checkpoint - Verify course and analytics components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement notifications system
  - [ ] 7.1 Create NotificationsPanel component
    - Set up component with instructorId prop
    - Implement notification fetching and display
    - Add notification type styling (review_approved, review_rejected, etc.)
    - Implement mark as read functionality
    - Create `src/components/instructor/NotificationsPanel.tsx`
    - _Requirements: 5.6, 7.5_

  - [ ]* 7.2 Write property test for review status notifications
    - **Property 11: Review Status Notifications**
    - **Validates: Requirements 5.6, 7.5**

  - [ ] 7.3 Add notification quick links to courses
    - Implement click handlers to navigate to relevant courses
    - Add action buttons for notifications (View Course, Edit Course)
    - _Requirements: 5.6_

  - [ ]* 7.4 Write unit tests for NotificationsPanel
    - Test notification rendering
    - Test mark as read functionality
    - Test navigation to courses
    - _Requirements: 5.6_

- [-] 8. Implement main InstructorDashboard component
  - [x] 8.1 Create InstructorDashboard page structure
    - Set up main container with role verification
    - Implement header section with welcome message and role badge
    - Add tab navigation (My Courses, Analytics, Profile)
    - Create `src/pages/dashboard/InstructorDashboard.tsx`
    - _Requirements: 5.1, 5.8, 13.5_

  - [ ] 8.2 Integrate MyCourses component into dashboard
    - Add My Courses tab content
    - Wire up CreateCourseModal integration
    - Handle course creation flow
    - _Requirements: 5.1, 5.2, 5.7_

  - [ ] 8.3 Integrate CourseAnalytics component into dashboard
    - Add Analytics tab content
    - Wire up data fetching
    - _Requirements: 5.3_

  - [ ] 8.4 Integrate NotificationsPanel into dashboard
    - Add notifications to header or sidebar
    - Display unread notification count
    - _Requirements: 5.6_

  - [ ]* 8.5 Write unit tests for InstructorDashboard
    - Test tab navigation
    - Test role badge display
    - Test component integration
    - _Requirements: 5.1, 5.8_

- [ ] 9. Implement route protection and role-based routing
  - [ ] 9.1 Add instructor authentication route
    - Create InstructorAuth page at `/auth/instructor`
    - Implement instructor login form
    - Add role verification on login
    - Create `src/pages/auth/InstructorAuth.tsx` (if not exists)
    - _Requirements: 11.1, 11.2_

  - [ ] 9.2 Update dashboard routing logic
    - Modify DashboardRouter in App.tsx to route instructors to InstructorDashboard
    - Ensure role-based routing: learners → LearnerDashboard, instructors → InstructorDashboard, admins → AdminDashboard
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ]* 9.3 Write property test for role-based dashboard routing
    - **Property 13: Role-Based Dashboard Routing**
    - **Validates: Requirements 11.3**

  - [ ] 9.4 Implement route guards for instructor features
    - Add ownership verification to CourseBuilder route
    - Block access to courses not owned by instructor
    - Display access denied message for unauthorized access
    - _Requirements: 8.6, 10.2, 10.3_

  - [ ]* 9.5 Write property test for ownership verification on edits
    - **Property 6: Ownership Verification for Edits**
    - **Validates: Requirements 10.2, 10.3**

  - [ ]* 9.6 Write property test for edit restriction on pending courses
    - **Property 4: Edit Restriction - Pending Review**
    - **Validates: Requirements 7.3**

  - [ ]* 9.7 Write property test for edit restriction on published courses
    - **Property 5: Edit Restriction - Published Courses**
    - **Validates: Requirements 10.6**

- [ ] 10. Checkpoint - Verify routing and permissions
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Update Footer navigation
  - [x] 11.1 Add Instructor link to Footer component
    - Add "Instructor" link below "Admin" link in "Get to Know Us" section
    - Link to `/auth/instructor`
    - Update `src/components/layout/Footer.tsx`
    - _Requirements: 14.3_

  - [ ]* 11.2 Write unit test for Footer instructor link
    - Test link presence and href
    - _Requirements: 14.3_

- [ ] 12. Integrate with existing CourseBuilder
  - [ ] 12.1 Update CourseBuilder to support instructor ownership
    - Add instructorId assignment on course creation
    - Verify ownership before allowing edits
    - Update course status handling (draft, pending_review, published)
    - _Requirements: 3.5, 10.1, 10.2_

  - [ ] 12.2 Add submit for review functionality to CourseBuilder
    - Add "Submit for Review" button in CourseBuilder
    - Implement submission workflow (draft → pending_review)
    - Record submission timestamp
    - _Requirements: 7.2_

  - [ ] 12.3 Implement edit restrictions in CourseBuilder
    - Block edits for pending_review courses
    - Block edits for published courses
    - Display appropriate error messages
    - _Requirements: 7.3, 10.6_

  - [ ]* 12.4 Write unit tests for CourseBuilder ownership integration
    - Test ownership assignment on creation
    - Test edit restrictions
    - Test submit for review flow
    - _Requirements: 3.5, 7.2, 7.3_

- [ ] 13. Implement permission-based UI states
  - [ ] 13.1 Add permission checking utility function
    - Create permission matrix mapping roles to actions
    - Implement permission check function
    - Create `src/utils/permissions.ts` or add to existing utilities
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 13.2 Write property test for permission-based UI state
    - **Property 12: Permission-Based UI State**
    - **Validates: Requirements 13.1**

  - [ ] 13.3 Apply permission checks to all action buttons
    - Disable buttons for unauthorized actions
    - Add tooltips explaining restrictions
    - Apply to Edit, Submit, Delete, and other action buttons
    - _Requirements: 13.1, 13.2, 13.3_

  - [ ]* 13.4 Write unit tests for permission-based UI
    - Test button disabled states
    - Test tooltip messages
    - _Requirements: 13.1, 13.2_

- [ ] 14. Final integration and testing
  - [ ] 14.1 Test complete instructor workflow end-to-end
    - Test instructor login → dashboard → create course → submit for review
    - Test viewing analytics for published courses
    - Test receiving notifications
    - _Requirements: 5.1, 5.2, 5.3, 5.6, 7.2_

  - [ ] 14.2 Test permission boundaries
    - Test instructor cannot access admin dashboard
    - Test instructor cannot edit other instructors' courses
    - Test instructor cannot edit pending/published courses
    - _Requirements: 3.9, 3.8, 7.3, 10.6_

  - [ ] 14.3 Test role-based routing
    - Test learner redirected to LearnerDashboard
    - Test instructor redirected to InstructorDashboard
    - Test admin redirected to AdminDashboard
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ]* 14.4 Run all property-based tests
    - Execute all 13 property tests with 100+ iterations
    - Verify all properties hold
    - _Requirements: All_

- [ ] 15. Final checkpoint - Complete implementation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Implementation uses TypeScript and React following existing DTMA patterns
- All components follow the design patterns established in AdminDashboard and LearnerDashboard
