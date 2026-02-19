-- ============================================================================
-- BROWZ Academy - Sample Data
-- ============================================================================
-- This file populates sample courses and data for testing
-- Run this AFTER 01_create_tables.sql and 02_row_level_security.sql
-- ============================================================================

-- ============================================================================
-- SAMPLE COURSES
-- ============================================================================
INSERT INTO courses (
  id, instructor_id, title, slug, description, short_description,
  image_url, category, level, price, original_price, duration_hours,
  status, is_featured, badge, prerequisites, published_at
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '550e8400-e29b-41d4-a716-446655440099'::uuid,
  'Introduction to Facial Aesthetics & Rejuvenation',
  'intro-facial',
  'Learn the fundamentals of facial aesthetics, anatomy, and non-surgical rejuvenation techniques.',
  'Master facial aesthetics basics',
  '/e1.png',
  'Facial Aesthetics',
  'Beginner',
  149.00,
  199.00,
  6,
  'published',
  TRUE,
  'bestseller',
  '{}',
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  '550e8400-e29b-41d4-a716-446655440099'::uuid,
  'Advanced Facial Aesthetics & Injectables',
  'advanced-facial',
  'Advanced techniques in facial aesthetics, injectables, and anti-aging treatments.',
  'Master advanced facial techniques',
  '/e2.png',
  'Facial Aesthetics',
  'Advanced',
  249.00,
  299.00,
  8,
  'published',
  TRUE,
  'popular',
  ARRAY['550e8400-e29b-41d4-a716-446655440001'::uuid],
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  '550e8400-e29b-41d4-a716-446655440099'::uuid,
  'Body Contouring Fundamentals',
  'body-1',
  'Learn body contouring techniques, safety protocols, and client consultation.',
  'Master body contouring basics',
  '/e3.png',
  'Body Aesthetics',
  'Intermediate',
  199.00,
  249.00,
  6,
  'published',
  FALSE,
  'new',
  '{}',
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  '550e8400-e29b-41d4-a716-446655440099'::uuid,
  'Advanced Body Contouring',
  'body-2',
  'Advanced body contouring techniques and specialized treatments.',
  'Master advanced body techniques',
  '/e1.png',
  'Body Aesthetics',
  'Advanced',
  299.00,
  349.00,
  8,
  'published',
  FALSE,
  NULL,
  ARRAY['550e8400-e29b-41d4-a716-446655440003'::uuid],
  NOW()
);

-- ============================================================================
-- SAMPLE MODULES
-- ============================================================================
INSERT INTO modules (id, course_id, title, description, sort_order) VALUES
(
  '550e8400-e29b-41d4-a716-446655440101'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'Module 1: Facial Anatomy Basics',
  'Understanding facial structure and anatomy',
  1
),
(
  '550e8400-e29b-41d4-a716-446655440102'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'Module 2: Non-Surgical Rejuvenation',
  'Techniques for non-surgical facial rejuvenation',
  2
);

-- ============================================================================
-- SAMPLE LESSONS
-- ============================================================================
INSERT INTO lessons (id, module_id, title, description, video_url, duration_minutes, sort_order, is_preview) VALUES
(
  '550e8400-e29b-41d4-a716-446655440201'::uuid,
  '550e8400-e29b-41d4-a716-446655440101'::uuid,
  'Lesson 1: Facial Structure Overview',
  'Introduction to facial anatomy and structure',
  'https://example.com/video1.mp4',
  15,
  1,
  TRUE
),
(
  '550e8400-e29b-41d4-a716-446655440202'::uuid,
  '550e8400-e29b-41d4-a716-446655440101'::uuid,
  'Lesson 2: Skin Layers and Properties',
  'Deep dive into skin anatomy',
  'https://example.com/video2.mp4',
  20,
  2,
  FALSE
),
(
  '550e8400-e29b-41d4-a716-446655440203'::uuid,
  '550e8400-e29b-41d4-a716-446655440102'::uuid,
  'Lesson 3: Rejuvenation Techniques',
  'Learn various rejuvenation methods',
  'https://example.com/video3.mp4',
  25,
  1,
  FALSE
);

-- ============================================================================
-- SAMPLE ELIGIBILITY REQUIREMENTS
-- ============================================================================
INSERT INTO eligibility_requirements (id, course_id, type, required, description, details, sort_order) VALUES
(
  '550e8400-e29b-41d4-a716-446655440301'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'language',
  TRUE,
  'English Proficiency',
  '{"minLevel": "intermediate"}',
  1
),
(
  '550e8400-e29b-41d4-a716-446655440302'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'document',
  TRUE,
  'Professional Credentials or Certification',
  '{"acceptedTypes": ["pdf", "jpg", "png"], "maxSize": 5242880}',
  2
),
(
  '550e8400-e29b-41d4-a716-446655440304'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'language',
  TRUE,
  'English Proficiency',
  '{"minLevel": "intermediate"}',
  1
),
(
  '550e8400-e29b-41d4-a716-446655440305'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'document',
  TRUE,
  'Professional Credentials or Certification',
  '{"acceptedTypes": ["pdf", "jpg", "png"], "maxSize": 5242880}',
  2
);

-- ============================================================================
-- SAMPLE DATA COMPLETE
-- ============================================================================
-- Sample data has been inserted successfully!
-- You can now test the application with this data
-- ============================================================================
