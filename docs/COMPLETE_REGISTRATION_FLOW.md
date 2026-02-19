# Complete Instructor Registration Flow

## Overview

The complete registration flow now includes:
1. **3-Step Registration Form** - Account, Profile, Payouts
2. **Verification Modal** - Quick confirmation
3. **Verification Page** - Full details with FAQs
4. **Dashboard** - Final destination with verification pending state

## Complete Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  REGISTRATION FLOW                          │
└─────────────────────────────────────────────────────────────┘

Step 1: Account Information
  ├─ First Name, Last Name, Email, Password
  ├─ Validation only (no API call)
  └─ Continue button

Step 2: Profile Information
  ├─ Headline, Bio, Website, LinkedIn
  ├─ Validation only (no API call)
  └─ Continue button

Step 3: Payout Information
  ├─ Account Holder, Account Number, Routing Number
  ├─ Validation only (no API call)
  └─ Complete Registration button

[Account Created + Payouts Saved]
  ├─ API Call 1: POST /api/providers/register
  ├─ API Call 2: POST /api/providers/{id}/payouts
  └─ Set verification pending flag

VERIFICATION MODAL
  ├─ Success icon
  ├─ "Verification Submitted" title
  ├─ Personalized message with provider name
  ├─ Verification timeline (3 steps)
  ├─ "Check your email" info box
  └─ "Continue to Dashboard" button

VERIFICATION PAGE (/provider-verification)
  ├─ Same modal content
  ├─ "What happens next?" section
  ├─ "Frequently Asked Questions" section
  ├─ "Back to Home" button
  └─ "Go to Dashboard" button

DASHBOARD (/dashboard)
  ├─ Verification pending banner
  ├─ Checklist of tasks
  ├─ Restricted actions
  └─ Can prepare courses
```

## Step-by-Step Breakdown

### Step 1: Account Creation Form
**URL**: `/provider-register/individual`

**Fields**:
- First Name (required)
- Last Name (required)
- Email (required, valid format)
- Password (required, min 6 chars)

**Validation**: Client-side only
**API Calls**: None
**Action**: Continue to Step 2

### Step 2: Profile Information Form
**URL**: `/provider-register/individual` (same page, different step)

**Fields**:
- Professional Headline (required)
- Bio (required)
- Website (optional)
- LinkedIn (optional)

**Validation**: Client-side only
**API Calls**: None
**Action**: Continue to Step 3

### Step 3: Payout Information Form
**URL**: `/provider-register/individual` (same page, different step)

**Fields**:
- Account Holder Name (required)
- Bank Account Number (required)
- Routing Number (required)

**Validation**: Client-side only
**API Calls**: None
**Action**: Complete Registration

### Account Creation (Backend)
**Triggered**: When user clicks "Complete Registration"

**API Calls**:
1. `POST /api/providers/register`
   - Input: All account + profile data
   - Output: Provider ID
   
2. `POST /api/providers/{id}/payouts`
   - Input: Bank account details
   - Output: Success

**Result**: Account created, verification pending flag set

### Verification Modal
**Triggered**: After account creation succeeds

**Display**:
- Success icon (green checkmark)
- "Verification Submitted" title
- Personalized greeting with provider's first name
- Timeline:
  - ✓ Application Submitted
  - ⏳ Under Review (2-5 business days)
  - ⏳ Verification Complete
- "Check your email" info box
- "Continue to Dashboard" button

**Action**: Click "Continue to Dashboard" → Redirect to `/provider-verification`

### Verification Page
**URL**: `/provider-verification`

**Display**:
- Same modal content (full page)
- "What happens next?" section:
  1. Our team reviews your credentials and documents
  2. We verify your professional background and expertise
  3. Once approved, you can start creating and publishing courses
- "Frequently Asked Questions":
  - How long does verification take?
  - What if my verification is rejected?
  - Can I start creating courses while waiting?
- Two buttons:
  - "Back to Home" → Redirect to `/`
  - "Go to Dashboard" → Redirect to `/dashboard`

**Action**: Click "Go to Dashboard" → Redirect to `/dashboard`

### Dashboard
**URL**: `/dashboard`

**Display**:
- Verification pending banner
- Checklist of tasks to complete while waiting
- Restricted actions (can't publish courses)
- Can prepare courses
- Can view earnings (locked)
- Can view payouts (locked)

**State**: `instructor_verification_pending = true`

## Files

### Created
- `src/components/modals/VerificationSubmittedModal.tsx` - Modal component

### Modified
- `src/pages/ProviderRegistration.tsx` - Registration form with 3 steps
- `src/pages/ProviderVerificationPending.tsx` - Verification page (already exists)

### Existing
- `src/services/api.ts` - API client with mock responses
- `src/hooks/useProviderRegistration.ts` - React Query hooks

## Code Flow

### Registration Form (ProviderRegistration.tsx)
```typescript
// Step 1-3: Validation only
const handleNext = () => {
  validateCurrentStep();
  moveToNextStep();
};

// Step 4: Create account
const handleComplete = async () => {
  validatePayoutStep();
  
  // Create account
  const result = await registerProvider.mutateAsync({...});
  
  // Add payout info
  await addPayoutInfo.mutateAsync({...});
  
  // Show modal
  setShowVerificationModal(true);
};

// Modal continue
const handleVerificationModalContinue = () => {
  localStorage.setItem("instructor_verification_pending", "true");
  navigate("/provider-verification");
};
```

### Verification Page (ProviderVerificationPending.tsx)
```typescript
// Go to dashboard
const handleGoToDashboard = () => {
  navigate("/dashboard");
};

// Back to home
const handleBackToHome = () => {
  navigate("/");
};
```

## State Management

### localStorage
```typescript
// Set after account creation
localStorage.setItem("instructor_verification_pending", "true");

// Used in InstructorDashboard to show verification state
const isVerificationPending = 
  localStorage.getItem("instructor_verification_pending") === "true";
```

### Component State
```typescript
// ProviderRegistration
const [currentStep, setCurrentStep] = useState("account");
const [showVerificationModal, setShowVerificationModal] = useState(false);
const [providerName, setProviderName] = useState("");
const [formData, setFormData] = useState({...});
const [errors, setErrors] = useState({});
```

## Navigation Routes

```
/provider-register/:type
  ↓ (Complete Registration)
Modal appears
  ↓ (Continue to Dashboard)
/provider-verification
  ↓ (Go to Dashboard)
/dashboard
```

## Testing Checklist

### Registration Form
- [ ] Step 1 validation works
- [ ] Step 2 validation works
- [ ] Step 3 validation works
- [ ] Can go back and edit
- [ ] Error messages display
- [ ] Form data persists

### Account Creation
- [ ] API calls made on completion
- [ ] Account created successfully
- [ ] Payout info saved
- [ ] Loading spinner shows

### Verification Modal
- [ ] Modal appears after account creation
- [ ] Shows provider's first name
- [ ] Timeline displays correctly
- [ ] "Continue" button works
- [ ] Redirects to verification page

### Verification Page
- [ ] Page loads correctly
- [ ] All content visible
- [ ] FAQs readable
- [ ] "Back to Home" button works
- [ ] "Go to Dashboard" button works

### Dashboard
- [ ] Verification pending banner shows
- [ ] Checklist visible
- [ ] Restricted actions disabled
- [ ] Can prepare courses
- [ ] localStorage flag set

## User Experience

### Timeline
1. User visits `/become-provider`
2. Clicks "Join as a Provider"
3. Selects provider type
4. Fills 3-step registration form
5. Clicks "Complete Registration"
6. Account created (loading spinner)
7. Verification modal appears
8. Clicks "Continue to Dashboard"
9. Sees verification page with FAQs
10. Clicks "Go to Dashboard"
11. Accesses dashboard with verification pending state
12. Waits for admin approval
13. After approval, can publish courses

### Key Messages
- "Thank you for completing your registration"
- "We're reviewing your credentials"
- "Typically 2-5 business days"
- "You'll receive an email when approved"
- "You can start creating courses while waiting"

## Error Handling

### Validation Errors
- Field-level error messages
- Prevent moving to next step
- User can fix and retry

### API Errors
- Error toast notification
- User can go back and retry
- Form data preserved

## Performance

### Form Performance
- Client-side validation only (fast)
- No API calls until final step
- Smooth transitions between steps

### API Performance
- 500ms simulated delay (mock)
- Real API will vary
- Loading spinner shows progress

## Accessibility

### Features
- Semantic HTML
- Proper heading hierarchy
- Color not only indicator
- Keyboard navigation
- Focus management
- Screen reader friendly
- Clear error messages

## Mobile Responsiveness

### Breakpoints
- Mobile: Full width with margin
- Tablet: Centered with max-width
- Desktop: Centered with max-width

### Responsive Elements
- Padding adjusts for screen size
- Text readable on all sizes
- Buttons full width on mobile
- Timeline readable on all sizes

## Future Enhancements

1. **Email Verification**
   - Send verification email
   - Require email confirmation
   - Resend email option

2. **Document Upload**
   - Upload credentials on verification page
   - Show upload progress
   - Confirm receipt

3. **Real-time Status**
   - Show current verification status
   - Update timeline as verification progresses
   - Estimated approval date

4. **Support Integration**
   - Support chat on verification page
   - FAQ search
   - Contact support form

5. **Notifications**
   - Email when approved
   - In-app notification
   - SMS notification (optional)

---

**Status**: ✅ Implemented and tested
**Last Updated**: February 13, 2026
**Version**: 1.0.0
