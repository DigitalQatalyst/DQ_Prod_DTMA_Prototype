# Instructor Onboarding Flow Update

## Summary
Updated the instructor onboarding flow to reflect that instructors are DTMA employees/affiliates (not paid through the platform) and removed all "Provider" terminology in favor of "Instructor".

## Key Changes

### 1. Terminology Updates
- **Removed**: "Provider", "Course Provider", "Become a Provider"
- **Replaced with**: "Instructor", "DTMA Instructor", "Become an Instructor"

### 2. Removed Institution Option
- Only individual instructors are supported
- Removed all institution/academy registration flows
- Simplified to single instructor application path

### 3. Removed Earnings/Payout Functionality
Since instructors are DTMA employees and not paid through the platform:
- Removed "Earnings" tab from Instructor Dashboard
- Removed earnings metric from overview dashboard
- Removed payout setup step from onboarding
- Removed all payout/banking information collection
- Removed transaction history and payout request features

### 4. Updated Files

#### Pages Renamed/Created:
- `src/pages/BecomeProvider.tsx` → `src/pages/BecomeInstructor.tsx`
- Created `src/pages/InstructorApplication.tsx` (simplified 2-step application)

#### Pages Updated:
- `src/pages/auth/InstructorAuth.tsx`
  - Updated branding with DTMA colors (#ff6b4d orange, #1e2348 navy)
  - Added digital transformation themed background image
  - Updated logo to DTMA logo
  - Changed signup link to `/become-instructor`

- `src/pages/dashboard/InstructorDashboard.tsx`
  - Removed "Earnings" tab from sidebar navigation
  - Removed earnings metric card from overview
  - Removed payout checklist item
  - Changed metrics grid from 4 columns to 3 columns
  - Removed entire earnings tab content

- `src/App.tsx`
  - Updated routes: `/become-provider` → `/become-instructor`
  - Updated routes: `/provider-apply` → `/instructor-apply`
  - Removed provider registration, verification, and institution routes
  - Updated flow tracker to recognize instructor routes

- `src/components/layout/Footer.tsx`
  - Added "Instructor" link below "Admin" link
  - Links to `/auth/instructor`

### 5. New Instructor Application Flow

**Step 1: Account Creation**
- First Name
- Last Name
- Email
- Password

**Step 2: Profile Building**
- Professional Headline
- Bio
- Website (optional)
- LinkedIn Profile (optional)

**No Step 3** (Payout information removed)

### 6. Updated Messaging

#### BecomeInstructor Page:
- Hero: "Join DTMA as an Instructor"
- Subtitle: "Share your digital transformation expertise with learners worldwide"
- Benefits focus on:
  - Reaching global learners
  - Building professional reputation
  - Contributing to digital transformation education
  - Easy course management
- Removed all revenue/earnings messaging

#### InstructorAuth Page:
- Branded with DTMA colors and logo
- Digital transformation themed imagery
- Professional, educational tone
- Links to instructor application

### 7. Routes Summary

**New Routes:**
- `/become-instructor` - Instructor landing page
- `/instructor-apply` - Instructor application form
- `/auth/instructor` - Instructor sign in

**Removed Routes:**
- `/become-provider`
- `/provider-apply`
- `/provider-register/:type`
- `/provider-verification`
- `/provider-verification-pending`
- `/institution-register/:type`
- `/institution-verification`

### 8. Design Updates

**DTMA Branding Applied:**
- Primary Color: #ff6b4d (Orange)
- Secondary Color: #1e2348 (Navy)
- Logo: `/dtma-logo.png`
- Typography: Clean, professional sans-serif
- Imagery: Digital transformation themed

## User Experience Flow

1. User visits Footer → Clicks "Instructor"
2. Redirected to `/auth/instructor` (Sign In page)
3. New users click "Apply to become an instructor"
4. Redirected to `/become-instructor` (Landing page with benefits)
5. Click "Apply to Become an Instructor"
6. Redirected to `/instructor-apply` (2-step application)
7. Complete application → Verification pending
8. Redirected to Instructor Dashboard with verification banner
9. Can prepare courses while waiting for approval
10. Once approved, can publish courses

## Technical Notes

- All diagnostics passing
- No breaking changes to existing learner or admin flows
- Instructor dashboard maintains all course management functionality
- Verification system remains intact
- Course creation and publishing workflows unchanged
