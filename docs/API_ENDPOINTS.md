# BROWZ Academy API Endpoints

## Provider Registration Endpoints

### 1. Register Provider
**POST** `/api/providers/register`

Creates a new provider account with basic information.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "headline": "string (optional)",
  "bio": "string (optional)",
  "website": "string (optional)",
  "linkedin": "string (optional)",
  "providerType": "individual" | "institution"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "provider-uuid",
    "email": "string",
    "full_name": "string",
    "headline": "string",
    "bio": "string",
    "website": "string",
    "linkedin": "string",
    "provider_type": "individual" | "institution",
    "verification_status": "pending",
    "created_at": "ISO-8601 timestamp"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "error": "Email already registered" | "Validation error message"
}
```

---

### 2. Update Provider Profile
**PATCH** `/api/providers/{providerId}/profile`

Updates provider profile information.

**Request Body:**
```json
{
  "headline": "string (optional)",
  "bio": "string (optional)",
  "website": "string (optional)",
  "linkedin": "string (optional)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "provider-uuid",
    "email": "string",
    "full_name": "string",
    "headline": "string",
    "bio": "string",
    "website": "string",
    "linkedin": "string",
    "provider_type": "individual" | "institution",
    "verification_status": "pending",
    "created_at": "ISO-8601 timestamp"
  }
}
```

---

### 3. Add Payout Information
**POST** `/api/providers/{providerId}/payouts`

Adds or updates payout information for the provider.

**Request Body:**
```json
{
  "bankAccountHolder": "string",
  "bankAccountNumber": "string",
  "bankRoutingNumber": "string"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

**Security Note:** Bank information should be encrypted in transit (HTTPS) and at rest. Consider using Stripe's tokenization for PCI compliance.

---

### 4. Get Provider Profile
**GET** `/api/providers/{providerId}`

Retrieves provider profile information.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "provider-uuid",
    "email": "string",
    "full_name": "string",
    "headline": "string",
    "bio": "string",
    "website": "string",
    "linkedin": "string",
    "provider_type": "individual" | "institution",
    "verification_status": "pending" | "approved" | "rejected",
    "created_at": "ISO-8601 timestamp"
  }
}
```

---

### 5. Verify Provider Email
**POST** `/api/providers/{providerId}/verify-email`

Verifies provider email address using a verification code.

**Request Body:**
```json
{
  "verificationCode": "string"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

---

### 6. Submit Provider for Verification
**POST** `/api/providers/{providerId}/submit-verification`

Submits provider profile for admin verification.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "provider-uuid",
    "email": "string",
    "full_name": "string",
    "provider_type": "individual" | "institution",
    "verification_status": "pending",
    "created_at": "ISO-8601 timestamp"
  }
}
```

---

## Implementation Notes

### Frontend Integration
- All endpoints are called through `src/services/api.ts`
- Hooks in `src/hooks/useProviderRegistration.ts` handle mutations
- Error handling and toast notifications are managed by the component

### Backend Requirements
1. **Authentication**: Implement JWT or session-based auth
2. **Validation**: Validate all input fields on backend
3. **Email Verification**: Send verification email on registration
4. **PCI Compliance**: Use Stripe or similar for payment info
5. **Rate Limiting**: Implement rate limiting on registration endpoint
6. **CORS**: Configure CORS for frontend domain

### Database Schema
```sql
-- Providers table
CREATE TABLE providers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  headline VARCHAR(255),
  bio TEXT,
  website VARCHAR(255),
  linkedin VARCHAR(255),
  provider_type ENUM('individual', 'institution'),
  verification_status ENUM('pending', 'approved', 'rejected'),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payout information table
CREATE TABLE provider_payouts (
  id UUID PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES providers(id),
  account_holder_name VARCHAR(255) NOT NULL,
  account_number_encrypted VARCHAR(255) NOT NULL,
  routing_number_encrypted VARCHAR(255) NOT NULL,
  stripe_account_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
STRIPE_PUBLIC_KEY=pk_test_...
```
