DTMA Course Creation Flow

Prompt:

Design a multi-step Course Creation Flow for the DTMA Admin Dashboard that extends the existing Course & Content Management interface.

The design must match the current UI style:

Deep blue sidebar navigation
Orange primary action buttons
Soft gray content cards
Clean, enterprise LMS layout
Context

This flow starts when an admin clicks “Create New Course” from the Course Authoring & Publishing panel.

The flow should be designed as a step-by-step wizard to reduce cognitive load and support structured course creation.

Step Structure
Step 1: Course Basics

Fields:

Course Title
Course Subtitle
Course Description (rich text)
Course Category (dropdown)
Course Level (Beginner, Intermediate, Advanced)
Language
Thumbnail Upload

Primary action: Continue

Step 2: Curriculum Builder

Allow admins to build the course outline.

Capabilities:

Add Modules
Add Lessons inside modules
Drag-and-drop reordering
Lesson types:
Video
Audio
Text
Quiz
Assignment

Include:

Expandable module cards
Inline lesson creation
“Add Module” and “Add Lesson” buttons
Step 3: Content Authoring

When a lesson is selected, show:

Lesson title
Lesson description
Content editor (rich text + media upload)
Resource attachments

Include AI feature:
“Generate Draft with AI” button to create lesson content.

Step 4: Assessments

Allow course creators to:

Add quizzes
Define passing score
Set attempt limits
Enable AI quiz generation

Include question types:

Multiple choice
Short answer
True/False
Step 5: Course Settings

Fields:

Course duration
Certificate eligibility toggle
Cohort vs self-paced
Visibility (Draft, Internal, Published)
Prerequisites
Step 6: Pricing & Publishing

Fields:

Pricing model (Free / Paid / Subscription)
Course price
Discount eligibility
Publish button

Include:
Preview Course option before publishing.

Layout Requirements
Maintain left sidebar navigation visible
Display wizard progress at top:
Basics → Curriculum → Content → Assessments → Settings → Publish
Use card-based sections consistent with current dashboard
AI Capabilities to Surface in UI

Include AI-assisted controls:

Generate lesson outline
Generate quiz questions
Suggest course description

These should appear as subtle secondary buttons with an AI icon.

States to Design

Include screens for:

Empty curriculum
Populated curriculum
Validation errors
Draft saved confirmation
Output Required from Kiro

Design the following screens:

Course Creation Wizard – Step 1
Curriculum Builder Interface
Lesson Content Editor
Assessment Builder
Publishing & Pricing Screen

Ensure all screens align with the DTMA admin design language and feel like a natural extension of the existing dashboard.