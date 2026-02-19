# Quick Reference - Instructor Registration

## Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/services/api.ts` | API client | 150 |
| `src/hooks/useProviderRegistration.ts` | React Query hooks | 80 |
| `src/pages/ProviderRegistration.tsx` | Registration form | 400+ |

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/providers/register` | Create provider account |
| PATCH | `/api/providers/{id}/profile` | Update profile |
| POST | `/api/providers/{id}/payouts` | Add payout info |
| GET | `/api/providers/{id}` | Get profile |
| POST | `/api/providers/{id}/verify-email` | Verify email |
| POST | `/api/providers/{id}/submit-verification` | Submit for review |

## Form Validation Rules

### Account Step
- First name: Required, non-empty
- Last name: Required, non-empty
- Email: Required, valid format
- Password: Required, min 6 characters

### Profile Step
- Headline: Required, non-empty
- Bio: Required, non-empty
- Website: Optional
- LinkedIn: Optional

### Payout Step
- Account holder: Required, non-empty
- Account number: Required, non-empty
- Routing number: Required, non-empty

## Environment Variables

```env
# Frontend
VITE_API_URL=http://localhost:3000/api

# Backend
DATABASE_URL=postgresql://user:pass@localhost/db
JWT_SECRET=your-secret
STRIPE_SECRET_KEY=sk_test_...
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=...
```

## Database Tables

```sql
-- Providers
CREATE TABLE providers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  headline VARCHAR(255),
  bio TEXT,
  website VARCHAR(255),
  linkedin VARCHAR(255),
  provider_type VARCHAR(50),
  verification_status VARCHAR(50),
  email_verified BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Payouts
CREATE TABLE provider_payouts (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES providers(id),
  account_holder_name VARCHAR(255),
  account_number_encrypted VARCHAR(255),
  routing_number_encrypted VARCHAR(255),
  stripe_account_id VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Email Verification
CREATE TABLE email_verifications (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES providers(id),
  verification_code VARCHAR(255) UNIQUE,
  expires_at TIMESTAMP,
  verified_at TIMESTAMP,
  created_at TIMESTAMP
);
```

## API Response Format

### Success (201/200)
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error (400/409/500)
```json
{
  "success": false,
  "error": "Error message"
}
```

## React Hooks Usage

```typescript
// Register provider
const registerProvider = useRegisterProvider();
await registerProvider.mutateAsync({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  password: "password123",
  providerType: "individual"
});

// Update profile
const updateProfile = useUpdateProviderProfile();
await updateProfile.mutateAsync({
  providerId: "provider-123",
  data: { headline: "...", bio: "..." }
});

// Add payout info
const addPayoutInfo = useAddPayoutInfo();
await addPayoutInfo.mutateAsync({
  providerId: "provider-123",
  data: { bankAccountHolder: "...", ... }
});
```

## Error Handling

```typescript
try {
  await registerProvider.mutateAsync(data);
} catch (error) {
  toast({
    title: "Registration failed",
    description: error.message,
    variant: "destructive"
  });
}
```

## Testing Commands

```bash
# Test registration
curl -X POST http://localhost:3000/api/providers/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com","password":"password123","providerType":"individual"}'

# Test profile update
curl -X PATCH http://localhost:3000/api/providers/provider-123/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"headline":"...","bio":"..."}'

# Test payout info
curl -X POST http://localhost:3000/api/providers/provider-123/payouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"bankAccountHolder":"...","bankAccountNumber":"...","bankRoutingNumber":"..."}'
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CORS error | Check backend CORS headers |
| 404 error | Verify API endpoint URL |
| 409 error | Email already registered |
| Validation error | Check field requirements |
| Network timeout | Check backend is running |

## File Locations

```
src/
├── services/
│   └── api.ts                          # API client
├── hooks/
│   └── useProviderRegistration.ts      # React Query hooks
└── pages/
    └── ProviderRegistration.tsx        # Registration form

docs/
├── API_ENDPOINTS.md                    # Endpoint documentation
├── INSTRUCTOR_REGISTRATION_IMPLEMENTATION.md
├── BACKEND_SETUP_GUIDE.md
└── QUICK_REFERENCE.md                  # This file
```

## Key Concepts

### Provider Types
- `individual` - Single instructor
- `institution` - School/academy

### Verification Status
- `pending` - Awaiting admin review
- `approved` - Verified and approved
- `rejected` - Rejected, can reapply

### Email Verification
- Sent on registration
- 24-hour expiration
- Required before publishing

### Payout Information
- Encrypted at rest
- Required for paid courses
- Stripe integration recommended

## Performance Targets

| Metric | Target |
|--------|--------|
| Form validation | < 100ms |
| API request | < 500ms |
| Page load | < 2s |
| Mobile load | < 3s |

## Security Checklist

- [ ] HTTPS enforced
- [ ] Passwords hashed
- [ ] Bank data encrypted
- [ ] Input validated
- [ ] SQL injection prevented
- [ ] XSS protection enabled
- [ ] CSRF tokens used
- [ ] Rate limiting enabled
- [ ] Audit logging enabled
- [ ] Secrets not in code

## Useful Links

- [API Endpoints Documentation](./API_ENDPOINTS.md)
- [Implementation Guide](./INSTRUCTOR_REGISTRATION_IMPLEMENTATION.md)
- [Backend Setup Guide](./BACKEND_SETUP_GUIDE.md)
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md)

## Contact & Support

For questions or issues:
1. Check the documentation files
2. Review error messages in browser console
3. Check backend logs
4. Verify environment variables
5. Test with curl commands

---

**Last Updated**: February 13, 2026
**Version**: 1.0.0
