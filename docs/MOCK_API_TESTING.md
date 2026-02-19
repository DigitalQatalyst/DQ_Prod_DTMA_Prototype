# Mock API Testing Guide

## Overview

The API service now includes mock responses for testing the frontend flow without a backend server. This allows you to test the complete instructor registration flow.

## How It Works

### Mock API Configuration

In `src/services/api.ts`:
```typescript
const USE_MOCK_API = true; // Set to false when backend is ready
```

When `USE_MOCK_API` is `true`:
- All API calls return mock data
- Network requests are simulated with 500ms delay
- No actual backend server needed

### Switching Between Mock and Real API

**To use mock API (testing):**
```typescript
const USE_MOCK_API = true;
```

**To use real API (production):**
```typescript
const USE_MOCK_API = false;
```

## Testing the Registration Flow

### Step 1: Account Creation
1. Navigate to `http://localhost:5173/provider-register/individual`
2. Fill in account information:
   - First Name: `Jane`
   - Last Name: `Doe`
   - Email: `jane@example.com`
   - Password: `password123`
3. Click "Continue"
4. ✅ No API call made, just validation

### Step 2: Profile Building
1. Fill in profile information:
   - Headline: `Senior Beauty Educator`
   - Bio: `10+ years of experience in beauty education`
   - Website: `https://example.com` (optional)
   - LinkedIn: `https://linkedin.com/in/jane` (optional)
2. Click "Continue"
3. ✅ No API call made, just validation

### Step 3: Payout Setup
1. Fill in payout information:
   - Account Holder: `Jane Doe`
   - Account Number: `1234567890`
   - Routing Number: `0987654321`
2. Click "Complete Registration"
3. ✅ Mock API calls made:
   - `POST /api/providers/register` → Returns mock provider
   - `POST /api/providers/{id}/payouts` → Returns success
4. ✅ Redirected to `/dashboard`
5. ✅ Verification pending banner shows

## Mock API Responses

### POST /api/providers/register
**Mock Response (500ms delay):**
```json
{
  "success": true,
  "data": {
    "id": "provider-abc123def",
    "email": "jane@example.com",
    "full_name": "Jane Doe",
    "headline": "Senior Beauty Educator",
    "bio": "10+ years of experience",
    "website": "https://example.com",
    "linkedin": "https://linkedin.com/in/jane",
    "provider_type": "individual",
    "verification_status": "pending",
    "created_at": "2024-02-13T10:30:00Z"
  }
}
```

### POST /api/providers/{id}/payouts
**Mock Response (500ms delay):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

### Other Endpoints
All other endpoints return appropriate mock responses with 500ms delay.

## Testing Scenarios

### Scenario 1: Successful Registration
1. Fill all fields with valid data
2. Click through all steps
3. Complete registration
4. ✅ Should redirect to dashboard with verification pending

### Scenario 2: Validation Errors
1. Try to proceed without filling required fields
2. ✅ Should show field-level error messages
3. ✅ Should prevent moving to next step

### Scenario 3: Go Back and Edit
1. Fill Step 1 and proceed to Step 2
2. Click "Back"
3. ✅ Should return to Step 1 with data preserved
4. Edit and proceed again

### Scenario 4: Error Recovery
1. Fill all steps
2. Complete registration
3. If error occurs, should show error message
4. ✅ Can go back and retry

## Browser Console Testing

Open browser DevTools (F12) and check:

1. **Network Tab**: No actual network requests (mock only)
2. **Console Tab**: No errors
3. **Application Tab**: localStorage has `instructor_verification_pending` flag

## Debugging Mock API

### Enable Logging
Add this to `src/services/api.ts` in the `mockRequest` method:

```typescript
private async mockRequest<T>(
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> {
  console.log(`[MOCK API] ${endpoint}`, data);
  // ... rest of code
  console.log(`[MOCK API RESPONSE]`, response);
  return response;
}
```

### Check Mock Data
The mock API generates:
- Random provider IDs: `provider-abc123def`
- Current timestamp for `created_at`
- All fields from registration form

## Switching to Real Backend

When backend is ready:

1. **Update `src/services/api.ts`:**
   ```typescript
   const USE_MOCK_API = false; // Switch to real API
   ```

2. **Set API URL in `.env`:**
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Test with real backend:**
   - Same registration flow
   - Real API calls made
   - Real data persisted

## Mock API Limitations

⚠️ **Important**: Mock API is for testing only. It:
- Does NOT persist data
- Does NOT validate email uniqueness
- Does NOT hash passwords
- Does NOT send emails
- Does NOT integrate with payment systems
- Does NOT create real database records

## Troubleshooting

### Issue: API calls still failing
**Solution**: Check that `USE_MOCK_API = true` in `src/services/api.ts`

### Issue: No 500ms delay
**Solution**: Delay is intentional to simulate network. Can be adjusted in `mockRequest` method.

### Issue: Data not persisting after refresh
**Solution**: Mock API doesn't persist. This is expected. Real backend will persist.

### Issue: Verification pending flag not showing
**Solution**: Check localStorage in DevTools → Application → localStorage

## Testing Checklist

- [ ] Step 1: Validation works
- [ ] Step 2: Validation works
- [ ] Step 3: Validation works
- [ ] Complete registration works
- [ ] Redirects to dashboard
- [ ] Verification banner shows
- [ ] localStorage flag set
- [ ] Can go back and edit
- [ ] Error messages display
- [ ] Loading states show

## Next Steps

1. **Test the complete flow** using this guide
2. **Verify all validations** work correctly
3. **Check UI/UX** is smooth
4. **Prepare backend** implementation
5. **Switch to real API** when backend is ready

## Support

For issues:
1. Check browser console for errors
2. Check Network tab (should be empty for mock)
3. Check localStorage for flags
4. Review mock responses in `src/services/api.ts`

---

**Status**: ✅ Mock API Ready for Testing
**Last Updated**: February 13, 2026
**Version**: 1.0.0
