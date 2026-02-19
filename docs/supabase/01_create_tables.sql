-- ============================================================================
-- BROWZ Academy - Supabase Database Schema
-- ============================================================================
-- This file contains all the SQL to set up the database schema for BROWZ Academy
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/[YOUR_PROJECT]/sql)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. COURSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  image_url VARCHAR(500),
  category VARCHAR(100),
  level VARCHAR(50), -- 'Beginner', 'Intermediate', 'Advanced'
  price DECIMAL(10, 2) DEFAULT 0,
  original_price DECIMAL(10, 2),
  duration_hours INTEGER,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'under_review', 'published', 'archived'
  is_featured BOOLEAN DEFAULT FALSE,
  badge VARCHAR(50), -- 'bestseller', 'new', 'popular'
  prerequisites UUID[] DEFAULT '{}', -- Array of course IDs that are prerequisites
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  review_feedback TEXT
);

-- Create index on slug for faster lookups
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_category ON courses(category);

-- ============================================================================
-- 2. MODULES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_modules_course_id ON modules(course_id);

-- ============================================================================
-- 3. LESSONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  video_url VARCHAR(500),
  duration_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_lessons_module_id ON lessons(module_id);

-- ============================================================================
-- 4. ENROLLMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  progress INTEGER DEFAULT 0, -- 0-100
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- ============================================================================
-- 5. LESSON PROGRESS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  progress_percent INTEGER DEFAULT 0,
  last_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);

-- ============================================================================
-- 6. ELIGIBILITY REQUIREMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS eligibility_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'language', 'document', 'prerequisite'
  required BOOLEAN DEFAULT TRUE,
  description VARCHAR(255) NOT NULL,
  details JSONB DEFAULT '{}', -- Flexible storage for requirement-specific data
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_eligibility_requirements_course_id ON eligibility_requirements(course_id);
CREATE INDEX idx_eligibility_requirements_type ON eligibility_requirements(type);

-- ============================================================================
-- 7. ELIGIBILITY CHECKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS eligibility_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  passed BOOLEAN DEFAULT FALSE,
  requirements_status JSONB DEFAULT '{}', -- Stores status of each requirement
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_eligibility_checks_user_id ON eligibility_checks(user_id);
CREATE INDEX idx_eligibility_checks_course_id ON eligibility_checks(course_id);
CREATE INDEX idx_eligibility_checks_passed ON eligibility_checks(passed);

-- ============================================================================
-- 8. DOCUMENT UPLOADS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS document_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  requirement_id UUID NOT NULL REFERENCES eligibility_requirements(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL, -- 'pdf', 'jpg', 'png'
  file_size INTEGER NOT NULL, -- in bytes
  file_path VARCHAR(500), -- Path in Supabase Storage
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  rejection_reason TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_document_uploads_user_id ON document_uploads(user_id);
CREATE INDEX idx_document_uploads_course_id ON document_uploads(course_id);
CREATE INDEX idx_document_uploads_requirement_id ON document_uploads(requirement_id);
CREATE INDEX idx_document_uploads_status ON document_uploads(status);

-- ============================================================================
-- 9. LANGUAGE CONFIRMATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS language_confirmations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_language_confirmations_user_id ON language_confirmations(user_id);
CREATE INDEX idx_language_confirmations_course_id ON language_confirmations(course_id);

-- ============================================================================
-- 10. COURSE REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS course_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_course_reviews_course_id ON course_reviews(course_id);
CREATE INDEX idx_course_reviews_user_id ON course_reviews(user_id);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eligibility_requirements_updated_at BEFORE UPDATE ON eligibility_requirements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eligibility_checks_updated_at BEFORE UPDATE ON eligibility_checks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_document_uploads_updated_at BEFORE UPDATE ON document_uploads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_language_confirmations_updated_at BEFORE UPDATE ON language_confirmations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_reviews_updated_at BEFORE UPDATE ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SCHEMA SETUP COMPLETE
-- ============================================================================
-- All tables have been created successfully!
-- Next: Run 02_row_level_security.sql to set up RLS policies
-- ============================================================================
