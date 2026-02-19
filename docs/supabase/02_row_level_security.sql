-- ============================================================================
-- BROWZ Academy - Row Level Security (RLS) Policies
-- ============================================================================
-- This file sets up security policies to ensure users can only access their own data
-- Run this AFTER 01_create_tables.sql
-- ============================================================================

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE language_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- COURSES TABLE POLICIES
-- ============================================================================
-- Anyone can view published courses
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (status = 'published');

-- Instructors can view their own courses
CREATE POLICY "Instructors can view their own courses"
  ON courses FOR SELECT
  USING (auth.uid() = instructor_id);

-- Instructors can insert courses
CREATE POLICY "Instructors can insert courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() = instructor_id);

-- Instructors can update their own courses
CREATE POLICY "Instructors can update their own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = instructor_id)
  WITH CHECK (auth.uid() = instructor_id);

-- ============================================================================
-- MODULES TABLE POLICIES
-- ============================================================================
-- Users can view modules of published courses
CREATE POLICY "Users can view modules of published courses"
  ON modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id
      AND courses.status = 'published'
    )
  );

-- ============================================================================
-- LESSONS TABLE POLICIES
-- ============================================================================
-- Users can view preview lessons
CREATE POLICY "Users can view preview lessons"
  ON lessons FOR SELECT
  USING (is_preview = TRUE);

-- Enrolled users can view all lessons
CREATE POLICY "Enrolled users can view all lessons"
  ON lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN courses ON courses.id = modules.course_id
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE modules.id = lessons.module_id
      AND enrollments.user_id = auth.uid()
      AND enrollments.status = 'active'
    )
  );

-- ============================================================================
-- ENROLLMENTS TABLE POLICIES
-- ============================================================================
-- Users can view their own enrollments
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own enrollments
CREATE POLICY "Users can insert their own enrollments"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollments
CREATE POLICY "Users can update their own enrollments"
  ON enrollments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- LESSON PROGRESS TABLE POLICIES
-- ============================================================================
-- Users can view their own progress
CREATE POLICY "Users can view their own lesson progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own lesson progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own lesson progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- ELIGIBILITY REQUIREMENTS TABLE POLICIES
-- ============================================================================
-- Anyone can view requirements for published courses
CREATE POLICY "Anyone can view eligibility requirements for published courses"
  ON eligibility_requirements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = eligibility_requirements.course_id
      AND courses.status = 'published'
    )
  );

-- ============================================================================
-- ELIGIBILITY CHECKS TABLE POLICIES
-- ============================================================================
-- Users can view their own eligibility checks
CREATE POLICY "Users can view their own eligibility checks"
  ON eligibility_checks FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own eligibility checks
CREATE POLICY "Users can insert their own eligibility checks"
  ON eligibility_checks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own eligibility checks
CREATE POLICY "Users can update their own eligibility checks"
  ON eligibility_checks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- DOCUMENT UPLOADS TABLE POLICIES
-- ============================================================================
-- Users can view their own document uploads
CREATE POLICY "Users can view their own document uploads"
  ON document_uploads FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own document uploads
CREATE POLICY "Users can insert their own document uploads"
  ON document_uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own document uploads (status updates)
CREATE POLICY "Users can update their own document uploads"
  ON document_uploads FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- LANGUAGE CONFIRMATIONS TABLE POLICIES
-- ============================================================================
-- Users can view their own language confirmations
CREATE POLICY "Users can view their own language confirmations"
  ON language_confirmations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own language confirmations
CREATE POLICY "Users can insert their own language confirmations"
  ON language_confirmations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own language confirmations
CREATE POLICY "Users can update their own language confirmations"
  ON language_confirmations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- COURSE REVIEWS TABLE POLICIES
-- ============================================================================
-- Anyone can view reviews for published courses
CREATE POLICY "Anyone can view course reviews"
  ON course_reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_reviews.course_id
      AND courses.status = 'published'
    )
  );

-- Users can insert their own reviews
CREATE POLICY "Users can insert their own course reviews"
  ON course_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own course reviews"
  ON course_reviews FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- RLS SETUP COMPLETE
-- ============================================================================
-- All security policies have been applied!
-- Next: Run 03_sample_data.sql to populate sample data (optional)
-- ============================================================================
