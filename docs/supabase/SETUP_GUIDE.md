# BROWZ Academy - Supabase Setup Guide

This guide walks you through setting up the Supabase backend for BROWZ Academy.

## Prerequisites

- A Supabase account (free tier is fine)
- A Supabase project created
- Access to your Supabase dashboard

## Step-by-Step Setup

### Step 1: Access Your Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in with your account
3. Select your project from the list
4. You should see the project dashboard

### Step 2: Open the SQL Editor

1. In the left sidebar, click **SQL Editor**
2. Click **New Query** button
3. You'll see a blank SQL editor

### Step 3: Create Tables

1. Copy the entire contents of `01_create_tables.sql`
2. Paste it into the SQL editor
3. Click **Run** button (or press Ctrl+Enter)
4. Wait for the query to complete (you should see "Success" message)

**What this does:**
- Creates all 10 tables needed for the application
- Sets up indexes for faster queries
- Creates triggers for automatic `updated_at` timestamps

### Step 4: Set Up Row Level Security (RLS)

1. Create a new query in the SQL Editor
2. Copy the entire contents of `02_row_level_security.sql`
3. Paste it into the SQL editor
4. Click **Run**
5. Wait for completion

**What this does:**
- Enables RLS on all tables
- Creates security policies so users can only access their own data
- Ensures published courses are visible to everyone
- Protects sensitive user data

### Step 5: Insert Sample Data (Optional)

1. Create a new query in the SQL Editor
2. Copy the entire contents of `03_sample_data.sql`
3. Paste it into the SQL editor
4. Click **Run**
5. Wait for completion

**What this does:**
- Adds 4 sample courses
- Adds sample modules and lessons
- Adds eligibility requirements for testing

## Step 6: Verify Setup

### Check Tables

1. In the left sidebar, click **Table Editor**
2. You should see all these tables:
   - `courses`
   - `modules`
   - `lessons`
   - `enrollments`
   - `lesson_progress`
   - `eligibility_requirements`
   - `eligibility_checks`
   - `document_uploads`
   - `language_confirmations`
   - `course_reviews`

### Check Sample Data

1. Click on the `courses` table
2. You should see 4 sample courses listed
3. Click on `eligibility_requirements` table
4. You should see 5 eligibility requirements

## Step 7: Get Your Connection Details

You'll need these to connect your React app to Supabase:

1. In the left sidebar, click **Settings** (gear icon)
2. Click **API** in the submenu
3. You'll see:
   - **Project URL** - Copy this
   - **Anon Key** - Copy this (this is safe to use in frontend code)

### Example:
```
Project URL: https://your-project-id.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 8: Update Your React App

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 7.

## Step 9: Create Supabase Client

Create a new file `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 10: Update Hooks to Use Supabase

The hooks in `src/hooks/` will be updated to use Supabase instead of localStorage.

## Troubleshooting

### Error: "Permission denied"
- Make sure RLS policies were applied correctly
- Check that you're logged in with a valid user

### Error: "Table does not exist"
- Make sure you ran `01_create_tables.sql` successfully
- Check the Table Editor to verify tables exist

### Error: "Invalid API key"
- Double-check your Anon Key is correct
- Make sure you copied the full key without extra spaces

### Sample data not showing
- Make sure you ran `03_sample_data.sql`
- Check the Table Editor to see if data is there

## Database Schema Overview

### Courses
- Stores course information
- Supports prerequisites (array of course IDs)
- Tracks status (draft, published, etc.)

### Enrollments
- Links users to courses
- Tracks progress and completion status
- One enrollment per user per course

### Eligibility Requirements
- Defines what's needed to enroll in a course
- Types: language, document, prerequisite
- Flexible `details` field for requirement-specific data

### Eligibility Checks
- Tracks eligibility status per user per course
- Stores which requirements are met
- Marks when eligibility was verified

### Document Uploads
- Stores uploaded documents for verification
- Tracks file type, size, and status
- Supports approval/rejection workflow

### Language Confirmations
- Tracks English proficiency confirmation
- One record per user per course

## Next Steps

1. Update the hooks in `src/hooks/` to use Supabase
2. Test the enrollment flow
3. Set up Supabase Storage for document uploads
4. Configure email notifications (optional)

## Support

For Supabase documentation, visit: https://supabase.com/docs

For BROWZ Academy specific questions, check the code comments in the hooks and components.
