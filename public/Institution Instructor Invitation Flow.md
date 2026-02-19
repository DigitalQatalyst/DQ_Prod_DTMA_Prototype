# Institution Instructor Invitation Flow

## Overview
This document describes the complete flow when an institution invites an instructor to join their teaching staff.

---

## Flow Steps

### 1. Institution Initiates Invitation

**Trigger**: Institution admin clicks "Invite Instructor" button

**What Happens**:
- Modal opens with invitation form
- Form fields:
  - Full Name (required)
  - Email Address (required, validated)
  - Role (dropdown: Instructor, Lead Instructor, Admin)
- Blue info box explains invitation email will be sent

---

### 2. Form Validation

**Client-Side Validation**:
- Full Name: Cannot be empty
- Email: Must be valid format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Role: Pre-selected as "Instructor"

**Error Handling**:
- Red error alert appears at top of modal
- Invalid fields get red border
- Errors clear when user starts typing

---

### 3. Send Invitation (Backend Process)

**When "Send Invitation" is clicked**:

```javascript
// API Call (to be implemented)
POST /api/institutions/{institutionId}/invite-instructor
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "instructor",
  "institutionId": "inst-123",
  "institutionName": "Brooklyn Spa and Salon"
}
```

**Backend Actions**:
1. Create pending instructor record in database:
   ```sql
   INSERT INTO instructors (
     id,
     full_name,
     email,
     institution_id,
     status,
     role,
     invited_at,
     invitation_token
   ) VALUES (
     'instr-456',
     'John Doe',
     'john@example.com',
     'inst-123',
     'pending',
     'instructor',
     NOW(),
     'unique-token-abc123'
   )
   ```

2. Generate unique invitation token (expires in 7 days)

3. Send invitation email:
   ```
   To: john@example.com
   Subject: You've been invited to join Brooklyn Spa and Salon
   
   Hi John Doe,
   
   Brooklyn Spa and Salon has invited you to join their team as an Instructor.
   
   Click the link below to accept the invitation and create your account:
   https://browz.academy/accept-invitation?token=unique-token-abc123
   
   This invitation expires in 7 days.
   
   Best regards,
   BROWZ Academy Team
   ```

4. Return success response

---

### 4. Success Confirmation

**Frontend Actions**:
- Show success toast: "Invitation sent! An invitation has been sent to john@example.com"
- Close modal
- Reset form fields
- Refresh instructor list (new instructor appears with "Pending" status)

**Instructor List Update**:
```javascript
{
  id: "instr-456",
  name: "John Doe",
  email: "john@example.com",
  joinedDate: "Mar 15, 2024",
  status: "pending", // Yellow badge
  courses: 0,
  students: 0,
  revenue: 0,
  rating: 0
}
```

---

### 5. Instructor Receives Email

**Email Content**:
- Personalized greeting with their name
- Institution name that invited them
- Clear CTA button: "Accept Invitation"
- Expiration notice (7 days)
- BROWZ Academy branding

---

### 6. Instructor Accepts Invitation

**When instructor clicks invitation link**:

1. **Validation**:
   - Check if token is valid
   - Check if token hasn't expired
   - Check if invitation hasn't been used

2. **Redirect to Registration**:
   ```
   /instructor-accept-invitation?token=unique-token-abc123
   ```

3. **Pre-filled Registration Form**:
   - Email: john@example.com (read-only, from token)
   - Full Name: John Doe (pre-filled, editable)
   - Institution: Brooklyn Spa and Salon (read-only)
   - Password: (user creates)
   - Confirm Password: (user creates)

4. **Account Creation**:
   ```javascript
   POST /api/instructors/accept-invitation
   {
     "token": "unique-token-abc123",
     "password": "securePassword123",
     "acceptedTerms": true
   }
   ```

5. **Backend Updates**:
   ```sql
   UPDATE instructors
   SET 
     status = 'active',
     password_hash = 'hashed-password',
     accepted_at = NOW(),
     invitation_token = NULL
   WHERE invitation_token = 'unique-token-abc123'
   ```

6. **Auto-Login**:
   - Create session for new instructor
   - Redirect to instructor dashboard
   - Show welcome message

---

### 7. Institution Sees Updated Status

**Instructor List Updates**:
- Status changes from "Pending" (yellow) to "Active" (green)
- Instructor can now log in and create courses
- Institution can now assign permissions

---

## Edge Cases & Error Handling

### Duplicate Email
**Scenario**: Email already exists in system

**Handling**:
- Check before sending invitation
- Show error: "This email is already registered. Please use a different email."

### Expired Token
**Scenario**: Instructor clicks link after 7 days

**Handling**:
- Show error page: "This invitation has expired. Please contact the institution for a new invitation."
- Institution can resend invitation

### Already Accepted
**Scenario**: Instructor clicks link twice

**Handling**:
- Redirect to login page
- Show message: "This invitation has already been accepted. Please log in."

### Invalid Token
**Scenario**: Token is tampered with or doesn't exist

**Handling**:
- Show error page: "Invalid invitation link. Please contact the institution."

---

## Database Schema

### instructors table
```sql
CREATE TABLE instructors (
  id VARCHAR(50) PRIMARY KEY,
  institution_id VARCHAR(50) REFERENCES institutions(id),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  status ENUM('pending', 'active', 'suspended') DEFAULT 'pending',
  role ENUM('instructor', 'lead-instructor', 'admin') DEFAULT 'instructor',
  invited_at TIMESTAMP,
  accepted_at TIMESTAMP,
  invitation_token VARCHAR(255) UNIQUE,
  token_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### instructor_permissions table
```sql
CREATE TABLE instructor_permissions (
  id VARCHAR(50) PRIMARY KEY,
  instructor_id VARCHAR(50) REFERENCES instructors(id),
  can_create_courses BOOLEAN DEFAULT true,
  can_issue_certificates BOOLEAN DEFAULT true,
  requires_course_review BOOLEAN DEFAULT false,
  revenue_split_percentage INT DEFAULT 70,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

### 1. Send Invitation
```
POST /api/institutions/{institutionId}/invite-instructor
Authorization: Bearer {token}

Request:
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "instructor"
}

Response:
{
  "success": true,
  "message": "Invitation sent successfully",
  "instructor": {
    "id": "instr-456",
    "status": "pending",
    "invitedAt": "2024-03-15T10:30:00Z"
  }
}
```

### 2. Validate Invitation Token
```
GET /api/instructors/validate-invitation?token={token}

Response:
{
  "valid": true,
  "instructor": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "institutionName": "Brooklyn Spa and Salon"
  },
  "expiresAt": "2024-03-22T10:30:00Z"
}
```

### 3. Accept Invitation
```
POST /api/instructors/accept-invitation

Request:
{
  "token": "unique-token-abc123",
  "password": "securePassword123",
  "acceptedTerms": true
}

Response:
{
  "success": true,
  "message": "Account created successfully",
  "instructor": {
    "id": "instr-456",
    "status": "active"
  },
  "session": {
    "token": "session-token-xyz",
    "expiresAt": "2024-03-16T10:30:00Z"
  }
}
```

### 4. Resend Invitation
```
POST /api/institutions/{institutionId}/resend-invitation/{instructorId}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Invitation resent successfully"
}
```

---

## Email Template

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4A3428; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .button { 
      display: inline-block; 
      background: #4A3428; 
      color: white; 
      padding: 12px 30px; 
      text-decoration: none; 
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BROWZ Academy</h1>
    </div>
    <div class="content">
      <h2>You've been invited!</h2>
      <p>Hi {{instructorName}},</p>
      <p><strong>{{institutionName}}</strong> has invited you to join their team as an <strong>{{role}}</strong>.</p>
      <p>As an instructor, you'll be able to:</p>
      <ul>
        <li>Create and publish courses</li>
        <li>Manage your students</li>
        <li>Issue certificates</li>
        <li>Track your earnings</li>
      </ul>
      <p>Click the button below to accept the invitation and create your account:</p>
      <a href="{{invitationLink}}" class="button">Accept Invitation</a>
      <p><small>This invitation expires in 7 days.</small></p>
      <p>If you didn't expect this invitation, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 BROWZ Academy. All rights reserved.</p>
      <p>Questions? Contact us at support@browz.academy</p>
    </div>
  </div>
</body>
</html>
```

---

## Security Considerations

1. **Token Security**:
   - Use cryptographically secure random tokens (UUID v4 or similar)
   - Store hashed version in database
   - Set expiration (7 days recommended)
   - Invalidate after use

2. **Email Validation**:
   - Verify email format
   - Check for disposable email domains
   - Prevent duplicate invitations to same email

3. **Rate Limiting**:
   - Limit invitation sends per institution (e.g., 10 per hour)
   - Prevent spam/abuse

4. **Authorization**:
   - Only institution admins can send invitations
   - Verify institution ownership before sending

5. **Password Requirements**:
   - Minimum 8 characters
   - At least one uppercase, lowercase, number
   - No common passwords

---

## Testing Checklist

- [ ] Send invitation with valid data
- [ ] Validate form with empty fields
- [ ] Validate form with invalid email
- [ ] Send invitation to duplicate email
- [ ] Accept invitation with valid token
- [ ] Accept invitation with expired token
- [ ] Accept invitation with invalid token
- [ ] Accept invitation twice (already used)
- [ ] Resend invitation to pending instructor
- [ ] Check instructor appears in list with pending status
- [ ] Check instructor status updates to active after acceptance
- [ ] Verify email is sent and received
- [ ] Verify invitation link works
- [ ] Verify auto-login after acceptance

---

## Future Enhancements

1. **Bulk Invitations**: Upload CSV to invite multiple instructors
2. **Custom Messages**: Allow institution to add personal message
3. **Invitation Templates**: Pre-defined invitation templates
4. **Reminder Emails**: Auto-remind after 3 days if not accepted
5. **Invitation Analytics**: Track open rates, acceptance rates
6. **Role-Based Permissions**: Different permissions per role
7. **Onboarding Checklist**: Guide new instructors through setup
8. **Welcome Video**: Embedded video in invitation email
