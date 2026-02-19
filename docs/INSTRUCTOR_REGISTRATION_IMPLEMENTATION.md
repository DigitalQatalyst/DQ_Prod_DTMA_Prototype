# Instructor Account Creation - Backend Integration Implementation

## Overview
This document describes the backend integration implementation for instructor account creation in BROWZ Academy.

## Files Created/Modified

### New Files Created

1. **`src/services/api.ts`**
   - Central API client for all backend communication
   - Handles HTTP requests with error handling
   - Provides methods for:
     - Provider registration
     - Profile updates
     - Payout information
     - Email verification
     - Verification submission

2. **`src/hooks/useProviderRegistration.ts`**
   - React Query mutations for provider operations
   - Hooks:
     - `useRegisterProvider()` - Creates provider account
     - `useUpdateProviderProfile()` - Updates profile info
     - `useAddPayoutInfo()` - Saves payout details
     - `useSubmitProviderForVerification()` - Submits for review
     - `useVerifyProviderEmail()` - Verifies email

3. **`docs/API_ENDPOINTS.md`**
   - Complete API endpoint documentation
   - Request/response schemas
   - Database schema recommendations
   - Implementation notes

### Modified Files

1. **`src/pages/ProviderRegistration.tsx`**
   - Added form validation for all steps
   - Integrated backend API calls
   - Added error handling and display
   - Added loading states
   - Implemented step-by-step registration flow:
     - Step 1: Account creation (email, password, name)
     - Step 2: Profile building (headline, bio, links)
     - Step 3: Payout setup (bank details)

## Registration Flow

### Step 1: Account Creation
```
User Input → Validation → API Call: registerProvider()
  ↓
Creates user account + provider profile
Sets provider_id for next steps
```

**Validation:**
- First name required
- Last name required
- Valid email format
- Password minimum 6 characters

### Step 2: Profile Building
```
User Input → Validation → API Call: updateProviderProfile()
  ↓
Updates headline and bio
Saves optional website/LinkedIn
```

**Validation:**
- Professional headline required
- Bio required

### Step 3: Payout Setup
```
User Input → Validation → API Call: addPayoutInfo()
  ↓
Saves encrypted bank details
Sets up payout method
Redirects to verification pending
```

**Validation:**
- Account holder name required
- Account number required
- Routing number required

## Key Features

### Error Handling
- Field-level validation with error messages
- API error responses displayed to user
- Toast notifications for success/failure
- Prevents submission with validation errors

### Loading States
- Disabled buttons during API calls
- Loading spinners on buttons
- Prevents double submission

### Security
- Passwords sent over HTTPS only
- Bank details encrypted in transit and at rest
- No sensitive data logged
- CSRF protection recommended

### User Experience
- Multi-step form prevents overwhelming users
- Progress indicator shows completion status
- Clear error messages guide users
- Auto-clear errors when user starts typing
- Responsive design for mobile

## Backend Requirements

### Authentication
- Implement JWT or session-based auth
- Return auth token on successful registration
- Validate token on subsequent requests

### Email Verification
- Send verification email on registration
- Implement email verification endpoint
- Block course publishing until verified

### Validation
- Validate all inputs on backend
- Check email uniqueness
- Verify password strength
- Sanitize all inputs

### Database
- Create providers table with all fields
- Create provider_payouts table for sensitive data
- Add indexes on email for fast lookups
- Implement soft deletes for GDPR compliance

### Payment Integration
- Integrate with Stripe for payout processing
- Tokenize bank information
- Never store raw bank details
- Implement PCI compliance

## Environment Setup

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
EMAIL_SERVICE=sendgrid|mailgun|etc
```

## Testing Checklist

- [ ] Account creation with valid data
- [ ] Account creation with invalid email
- [ ] Account creation with duplicate email
- [ ] Account creation with weak password
- [ ] Profile update with missing fields
- [ ] Payout info with invalid bank details
- [ ] Error messages display correctly
- [ ] Loading states work properly
- [ ] Form validation prevents submission
- [ ] Successful registration redirects to verification
- [ ] localStorage flag set correctly
- [ ] Mobile responsive design

## Future Enhancements

1. **Email Verification**
   - Send verification email on registration
   - Require email verification before publishing

2. **Two-Factor Authentication**
   - Optional 2FA for security
   - SMS or authenticator app

3. **Social Login**
   - Google OAuth integration
   - LinkedIn OAuth integration

4. **Profile Picture Upload**
   - Avatar upload on profile step
   - Image optimization and CDN storage

5. **Institutional Registration**
   - Different flow for institutions
   - Multiple instructor management
   - Bulk user import

6. **Verification Dashboard**
   - Admin panel for reviewing providers
   - Document upload for credentials
   - Approval/rejection workflow

## API Response Examples

### Successful Registration
```json
{
  "success": true,
  "data": {
    "id": "provider-123",
    "email": "instructor@example.com",
    "full_name": "Jane Doe",
    "provider_type": "individual",
    "verification_status": "pending",
    "created_at": "2024-02-13T10:30:00Z"
  }
}
```

### Validation Error
```json
{
  "success": false,
  "error": "Email already registered"
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS headers are set
   - Check API_URL environment variable

2. **Network Errors**
   - Check backend is running
   - Verify API endpoint URLs
   - Check network tab in DevTools

3. **Validation Errors**
   - Check field requirements
   - Verify email format
   - Check password length

4. **Database Errors**
   - Verify database connection
   - Check table schemas
   - Review migration status

## Support

For issues or questions:
1. Check API_ENDPOINTS.md for endpoint details
2. Review error messages in browser console
3. Check backend logs for server errors
4. Verify environment variables are set correctly
