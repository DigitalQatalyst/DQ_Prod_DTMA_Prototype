# Feature: Integrate WhatsApp Learning & AI Settings into Course Builder

## Context
This extends the existing Course Builder flow.

DO NOT change:
- Step order
- Navigation
- Validation logic
- UI structure

ONLY extend existing steps with WhatsApp Learning and AI capabilities.

---

## IMPORTANT

- Do NOT add new steps to the flow
- Do NOT redesign existing UI
- Integrate into:
  - Curriculum Step
  - Assessments Step
  - Pricing & Settings Step
- WhatsApp = delivery channel
- AI = enhancement layer

---

## REQ-CB-01: WhatsApp Micro-Learning (Curriculum Step)

Within:
Curriculum Step (Sections & Lessons)

Add at Lesson Level:

### New Field:
- Label: "Micro-Learning (WhatsApp)"
- Type: Short text (max 280 characters)
- Placeholder: "Enter a short concept for WhatsApp delivery"

### New Toggle:
- Label: "Deliver via WhatsApp"
- Default: OFF

### Behavior:
- If enabled:
  - Micro-learning content becomes required
  - Content is linked to lesson
  - Included in WhatsApp delivery flow

### UI Placement:
- Inside each Lesson Card
- Below lesson content/resources

---

## REQ-CB-02: AI Learning Support (Curriculum Step)

Within:
Lesson Configuration

Add:

### Toggle:
- Label: "Enable AI Tutor for this lesson"
- Default: ON

### Behavior:
- Enables:
  - AI Q&A
  - AI summaries
  - Voice responses

NOTE:
No complex UI required — toggle only

---

## REQ-CB-03: WhatsApp Practice Questions (Assessments Step)

Within:
Assessments Step

Extend Quiz Configuration:

### New Option:
- Checkbox: "Deliver practice questions via WhatsApp"

### Behavior:
- If enabled:
  - Questions are eligible for WhatsApp delivery
  - Feedback is included after answer

---

## REQ-CB-04: AI Assessment Support (Assessments Step)

Add:

### Toggle:
- Label: "Enable AI Assessment Assistance"
- Default: ON

### Behavior:
- AI helps:
  - Explain answers
  - Provide feedback
  - Support learner understanding

---

## REQ-CB-05: WhatsApp Learning Settings (Pricing & Settings Step)

Within:
Pricing & Settings Step

Add new section:

### Section Title:
"WhatsApp Learning Settings"

---

### Fields:

#### 1. Enable WhatsApp Learning
- Toggle (ON/OFF)

#### 2. Delivery Type
- Options:
  - Daily Micro-Learning
  - Practice Questions
  - Both

#### 3. Frequency
- Options:
  - Daily
  - Weekly

#### 4. Quiet Hours
- Time range selector

---

### Behavior:
- Controls how WhatsApp content is delivered
- Applies to entire course

---

## REQ-CB-06: AI Course Settings (Pricing & Settings Step)

Add:

### Section Title:
"AI Learning Settings"

---

### Fields:

#### 1. Enable AI Tutor (Course Level)
- Toggle

#### 2. AI Tone
- Options:
  - Friendly
  - Professional
  - Encouraging

#### 3. Response Style
- Options:
  - Short
  - Detailed

---

### Behavior:
- Applies to all lessons unless overridden

---

## REQ-CB-07: Validation Updates (Submit for Review Step)

Extend validation checklist:

Add:

- WhatsApp settings configured (if enabled)
- AI settings enabled

---

## REQ-CB-08: Auto-Save Integration

Ensure:

- WhatsApp fields saved in localStorage
- AI settings saved in localStorage

Key:
course_${courseId}

---

## Constraints

- Maintain DTMA design system:
  - Navy (#1e2348)
  - Orange (#ff6b4d)
- Use existing card layouts and spacing
- No new navigation items
- No structural changes

---

## Acceptance Criteria

- Admin can configure WhatsApp learning at lesson and course level
- Admin can enable AI learning features
- All settings persist via localStorage
- No disruption to existing course builder flow
- UI remains consistent with DTMA patterns