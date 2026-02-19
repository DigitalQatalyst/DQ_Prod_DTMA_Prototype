# BROWZ Academy - Supabase Backend Setup

This directory contains all the SQL scripts and documentation needed to set up the Supabase backend for BROWZ Academy.

## Files in This Directory

### SQL Scripts (Run in Order)

1. **`01_create_tables.sql`** - Creates all database tables
   - 10 tables with proper relationships
   - Indexes for performance
   - Automatic timestamp triggers
   - UUID primary keys

2. **`02_row_level_security.sql`** - Sets up security policies
   - Enables RLS on all tables
   - User data isolation
   - Published course visibility
   - Admin/instructor permissions

3. **`03_sample_data.sql`** - Populates sample data
   - 4 sample courses
   - 2 modules with 3 lessons
   - 5 eligibility requirements
   - Ready for testing

### Documentation

- **`QUICK_START.md`** - 5-minute setup guide
- **`SETUP_GUIDE.md`** - Detailed step-by-step instructions
- **`README.md`** - This file

## Quick Start

1. Copy `01_create_tables.sql` → Paste in Supabase SQL Editor → Run
2. Copy `02_row_level_security.sql` → Paste in Supabase SQL Editor → Run
3. Copy `03_sample_data.sql` → Paste in Supabase SQL Editor → Run
4. Get your Project URL and Anon Key from Settings → API
5. Create `.env.local` with your credentials
6. Done! ✅

See `QUICK_START.md` for more details.

## Database Schema

### Core Tables

**courses**
- Stores course information
- Supports prerequisites
- Tracks status and featured status

**modules**
- Organizes course content
- Linked to courses

**lessons**
- Individual lesson content
- Video URLs and duration
- Preview flag for free content

**enrollments**
- User course enrollments
- Progress tracking
- Completion status

### Eligibility Tables

**eligibility_requirements**
- Defines course requirements
- Types: language, document, prerequisite
- Flexible details field

**eligibility_checks**
- Tracks user eligibility status
- Stores requirement status
- Verification timestamp

**document_uploads**
- Stores uploaded documents
- File metadata
- Approval status

**language_confirmations**
- Tracks English proficiency confirmation
- Per user per course

### Supporting Tables

**lesson_progress**
- Tracks individual lesson completion
- Video progress (seconds watched)

**course_reviews**
- User reviews and ratings
- One review per user per course

## Security

All tables have Row Level Security (RLS) enabled:

- ✅ Users can only see their own data
- ✅ Published courses visible to everyone
- ✅ Instructors can manage their courses
- ✅ Automatic user isolation

## Sample Data

The sample data includes:

**Courses:**
1. Introduction to Facial Aesthetics (Beginner, $149)
2. Advanced Facial Aesthetics (Advanced, $249) - Requires course 1
3. Body Contouring Fundamentals (Intermediate, $199)
4. Advanced Body Contouring (Advanced, $299) - Requires course 3

**Eligibility Requirements:**
- Language proficiency confirmation
- Document uploads (certificates)
- Course prerequisites

## Next Steps

After running the SQL scripts:

1. **Update React Hooks** - Modify `src/hooks/` to use Supabase
2. **Set Up Storage** - Configure Supabase Storage for documents
3. **Test Enrollment** - Test the full enrollment flow
4. **Configure Email** - Set up email notifications (optional)

## Troubleshooting

### Tables not created?
- Check for SQL errors in the editor
- Make sure you ran `01_create_tables.sql` first

### Permission denied errors?
- Verify RLS policies were applied
- Check that you're authenticated

### Sample data not showing?
- Run `03_sample_data.sql`
- Check Table Editor to verify

## Support

- Supabase Docs: https://supabase.com/docs
- SQL Reference: https://supabase.com/docs/guides/database/overview
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security

## Notes

- All UUIDs are generated automatically
- Timestamps are managed by triggers
- Foreign keys ensure data integrity
- Indexes optimize query performance
- RLS policies ensure security

---

**Ready to set up?** Start with `QUICK_START.md` or `SETUP_GUIDE.md`
