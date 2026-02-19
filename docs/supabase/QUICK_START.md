# BROWZ Academy - Supabase Quick Start

## TL;DR - 5 Minute Setup

### 1. Run SQL Files in Order

Go to your Supabase project → SQL Editor → New Query

**Query 1:** Copy & paste `01_create_tables.sql` → Run
**Query 2:** Copy & paste `02_row_level_security.sql` → Run
**Query 3:** Copy & paste `03_sample_data.sql` → Run

### 2. Get Your Credentials

Settings → API → Copy:
- Project URL
- Anon Key

### 3. Create `.env.local`

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Create `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### 5. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Database Tables

| Table | Purpose |
|-------|---------|
| `courses` | Course information |
| `modules` | Course modules |
| `lessons` | Course lessons |
| `enrollments` | User enrollments |
| `lesson_progress` | User progress tracking |
| `eligibility_requirements` | Course requirements |
| `eligibility_checks` | User eligibility status |
| `document_uploads` | Uploaded documents |
| `language_confirmations` | Language proficiency |
| `course_reviews` | Course reviews |

## Sample Data

4 courses are pre-loaded:
1. **Introduction to Facial Aesthetics** (Beginner)
2. **Advanced Facial Aesthetics** (Advanced) - Requires #1
3. **Body Contouring Fundamentals** (Intermediate)
4. **Advanced Body Contouring** (Advanced) - Requires #3

## Key Features

✅ Row Level Security (RLS) - Users can only access their data
✅ Automatic timestamps - `created_at` and `updated_at` auto-managed
✅ Indexes - Optimized queries
✅ Triggers - Automatic `updated_at` updates
✅ Sample data - Ready to test

## Common Tasks

### View All Courses
```sql
SELECT * FROM courses WHERE status = 'published';
```

### View User Enrollments
```sql
SELECT * FROM enrollments WHERE user_id = 'user-id';
```

### Check Eligibility Status
```sql
SELECT * FROM eligibility_checks WHERE user_id = 'user-id' AND course_id = 'course-id';
```

### View Document Uploads
```sql
SELECT * FROM document_uploads WHERE user_id = 'user-id';
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tables not showing | Run `01_create_tables.sql` again |
| Permission denied | Check RLS policies in `02_row_level_security.sql` |
| No sample data | Run `03_sample_data.sql` |
| Invalid API key | Copy full key from Settings → API |

## Next: Update Hooks

The hooks in `src/hooks/` need to be updated to use Supabase instead of localStorage.

See `SETUP_GUIDE.md` for detailed instructions.
