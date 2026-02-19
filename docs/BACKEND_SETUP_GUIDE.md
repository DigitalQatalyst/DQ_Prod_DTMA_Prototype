# Backend Setup Guide - Instructor Registration

## Quick Start

This guide helps backend developers implement the instructor registration API endpoints.

## Prerequisites

- Node.js 16+ or Python 3.8+
- PostgreSQL 12+
- Stripe account (for payment processing)
- Email service (SendGrid, Mailgun, etc.)

## Database Setup

### 1. Create Providers Table

```sql
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  headline VARCHAR(255),
  bio TEXT,
  website VARCHAR(255),
  linkedin VARCHAR(255),
  provider_type VARCHAR(50) NOT NULL CHECK (provider_type IN ('individual', 'institution')),
  verification_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_providers_email ON providers(email);
CREATE INDEX idx_providers_verification_status ON providers(verification_status);
```

### 2. Create Payout Information Table

```sql
CREATE TABLE provider_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  account_holder_name VARCHAR(255) NOT NULL,
  account_number_encrypted VARCHAR(255) NOT NULL,
  routing_number_encrypted VARCHAR(255) NOT NULL,
  stripe_account_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider_id)
);

CREATE INDEX idx_provider_payouts_provider_id ON provider_payouts(provider_id);
```

### 3. Create Email Verification Table

```sql
CREATE TABLE email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  verification_code VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email_verifications_provider_id ON email_verifications(provider_id);
CREATE INDEX idx_email_verifications_code ON email_verifications(verification_code);
```

## API Implementation

### Node.js/Express Example

```javascript
// routes/providers.js
const express = require('express');
const router = express.Router();
const { registerProvider, updateProfile, addPayoutInfo } = require('../controllers/providers');
const { validateRegistration, validateProfile } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Public endpoints
router.post('/register', validateRegistration, registerProvider);
router.post('/:providerId/verify-email', verifyEmail);

// Protected endpoints
router.patch('/:providerId/profile', authenticate, validateProfile, updateProfile);
router.post('/:providerId/payouts', authenticate, addPayoutInfo);
router.get('/:providerId', authenticate, getProviderProfile);
router.post('/:providerId/submit-verification', authenticate, submitForVerification);

module.exports = router;
```

### Controller Implementation

```javascript
// controllers/providers.js
const crypto = require('crypto');
const db = require('../db');
const { sendVerificationEmail } = require('../services/email');
const { encryptData, decryptData } = require('../services/encryption');

exports.registerProvider = async (req, res) => {
  try {
    const { firstName, lastName, email, password, providerType } = req.body;

    // Check if email exists
    const existing = await db.query(
      'SELECT id FROM providers WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create provider
    const result = await db.query(
      `INSERT INTO providers (email, full_name, provider_type)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name, provider_type, verification_status, created_at`,
      [email.toLowerCase(), `${firstName} ${lastName}`, providerType]
    );

    const provider = result.rows[0];

    // Create verification code
    const verificationCode = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.query(
      `INSERT INTO email_verifications (provider_id, verification_code, expires_at)
       VALUES ($1, $2, $3)`,
      [provider.id, verificationCode, expiresAt]
    );

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    // Create JWT token
    const token = createToken(provider.id);

    res.status(201).json({
      success: true,
      data: {
        id: provider.id,
        email: provider.email,
        full_name: provider.full_name,
        provider_type: provider.provider_type,
        verification_status: provider.verification_status,
        created_at: provider.created_at
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { headline, bio, website, linkedin } = req.body;

    const result = await db.query(
      `UPDATE providers
       SET headline = $1, bio = $2, website = $3, linkedin = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING id, email, full_name, headline, bio, website, linkedin, provider_type, verification_status, created_at`,
      [headline, bio, website, linkedin, providerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
};

exports.addPayoutInfo = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { bankAccountHolder, bankAccountNumber, bankRoutingNumber } = req.body;

    // Encrypt sensitive data
    const encryptedAccountNumber = encryptData(bankAccountNumber);
    const encryptedRoutingNumber = encryptData(bankRoutingNumber);

    // Check if payout info exists
    const existing = await db.query(
      'SELECT id FROM provider_payouts WHERE provider_id = $1',
      [providerId]
    );

    if (existing.rows.length > 0) {
      // Update existing
      await db.query(
        `UPDATE provider_payouts
         SET account_holder_name = $1, account_number_encrypted = $2, routing_number_encrypted = $3, updated_at = NOW()
         WHERE provider_id = $4`,
        [bankAccountHolder, encryptedAccountNumber, encryptedRoutingNumber, providerId]
      );
    } else {
      // Create new
      await db.query(
        `INSERT INTO provider_payouts (provider_id, account_holder_name, account_number_encrypted, routing_number_encrypted)
         VALUES ($1, $2, $3, $4)`,
        [providerId, bankAccountHolder, encryptedAccountNumber, encryptedRoutingNumber]
      );
    }

    res.json({
      success: true,
      data: { success: true }
    });
  } catch (error) {
    console.error('Add payout info error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add payout information'
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { verificationCode } = req.body;

    const result = await db.query(
      `SELECT id, expires_at FROM email_verifications
       WHERE provider_id = $1 AND verification_code = $2 AND verified_at IS NULL`,
      [providerId, verificationCode]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification code'
      });
    }

    const verification = result.rows[0];

    if (new Date() > verification.expires_at) {
      return res.status(400).json({
        success: false,
        error: 'Verification code expired'
      });
    }

    // Mark as verified
    await db.query(
      `UPDATE email_verifications SET verified_at = NOW() WHERE id = $1`,
      [verification.id]
    );

    // Update provider
    await db.query(
      `UPDATE providers SET email_verified = TRUE WHERE id = $1`,
      [providerId]
    );

    res.json({
      success: true,
      data: { success: true }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed'
    });
  }
};

exports.submitForVerification = async (req, res) => {
  try {
    const { providerId } = req.params;

    // Check if provider has completed profile
    const provider = await db.query(
      'SELECT * FROM providers WHERE id = $1',
      [providerId]
    );

    if (provider.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      });
    }

    const p = provider.rows[0];

    if (!p.headline || !p.bio || !p.email_verified) {
      return res.status(400).json({
        success: false,
        error: 'Please complete your profile and verify your email'
      });
    }

    // Update status to pending review
    const result = await db.query(
      `UPDATE providers SET verification_status = 'pending', updated_at = NOW()
       WHERE id = $1
       RETURNING id, email, full_name, provider_type, verification_status, created_at`,
      [providerId]
    );

    // Send notification to admin
    await notifyAdminNewProvider(result.rows[0]);

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Submit for verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit for verification'
    });
  }
};
```

## Validation Middleware

```javascript
// middleware/validation.js
exports.validateRegistration = (req, res, next) => {
  const { firstName, lastName, email, password, providerType } = req.body;

  const errors = [];

  if (!firstName || firstName.trim().length === 0) {
    errors.push('First name is required');
  }

  if (!lastName || lastName.trim().length === 0) {
    errors.push('Last name is required');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!providerType || !['individual', 'institution'].includes(providerType)) {
    errors.push('Valid provider type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  next();
};

exports.validateProfile = (req, res, next) => {
  const { headline, bio } = req.body;

  const errors = [];

  if (headline && headline.trim().length === 0) {
    errors.push('Headline cannot be empty');
  }

  if (bio && bio.trim().length === 0) {
    errors.push('Bio cannot be empty');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  next();
};
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/browz_academy

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=7d

# Email Service
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@browz.academy

# Encryption
ENCRYPTION_KEY=your-32-character-encryption-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

# API
API_PORT=3000
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

## Testing

### Test Registration Endpoint

```bash
curl -X POST http://localhost:3000/api/providers/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "providerType": "individual"
  }'
```

### Test Profile Update

```bash
curl -X PATCH http://localhost:3000/api/providers/provider-123/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{
    "headline": "Senior Beauty Educator",
    "bio": "10+ years of experience in beauty education"
  }'
```

## Security Checklist

- [ ] All inputs validated on backend
- [ ] Passwords hashed with bcrypt or similar
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced in production
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS protection headers set
- [ ] CSRF tokens implemented
- [ ] Audit logging enabled
- [ ] Secrets not in version control
- [ ] Database backups configured

## Deployment

1. Run migrations
2. Set environment variables
3. Start API server
4. Verify endpoints are accessible
5. Test with frontend

## Support

For questions or issues, refer to:
- API_ENDPOINTS.md for endpoint details
- INSTRUCTOR_REGISTRATION_IMPLEMENTATION.md for frontend integration
