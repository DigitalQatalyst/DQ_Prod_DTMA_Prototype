# Feature: Extend DTMA Admin Dashboard for WhatsApp & AI Learning

## Purpose
Extend the existing DTMA Admin Dashboard to support WhatsApp-based conversational learning and AI-assisted learning.

This must be implemented by enhancing existing LMS modules, not by creating new standalone modules.

---

## IMPORTANT

- Do NOT create new admin sections for WhatsApp or AI
- Do NOT duplicate existing modules
- Extend only the current DTMA Admin Dashboard features
- WhatsApp is a delivery channel, not a separate system
- AI capabilities must reuse existing AI infrastructure

---

## REQ-ADM-01: Course Authoring / Content CMS Extension

Within:
Course Authoring / Content CMS

Add:

- Field: "Micro-Learning Content"
  - Short text (tweet-length)
  - Optional emoji support

- Toggle: "Deliver via WhatsApp"
  - Applies to lesson or module

- Ability to associate micro-learning with:
  - Course
  - Module
  - Lesson

---

## REQ-ADM-02: Enrollment Flow Extension

Within:
Student Management / Enrollment Flow

Add:

- WhatsApp Opt-In prompt during enrollment:
  "Would you like to continue learning via WhatsApp?"

- If enabled:
  - Capture phone number
  - Store opt-in status (true/false)

- Allow admin visibility of:
  - WhatsApp opt-in status per learner

---

## REQ-ADM-03: AI Tools Integration

Within:
Existing AI Tools / Learning Features

Ensure support for:

- AI Q&A on course content
- AI-generated lesson summaries
- Voice-based responses (UI only)

WhatsApp must reuse these AI capabilities as a delivery channel.

---

## REQ-ADM-04: Quiz Management Extension

Within:
Quiz Management / Assessments

Add:

- Option: "Send via WhatsApp"

- When enabled:
  - Question is delivered as a chat message
  - Include answer options
  - Provide feedback and explanation after response

---

## REQ-ADM-05: Notification Templates Extension

Within:
Announcement Manager / Notification Templates

Add:

- WhatsApp as a delivery channel

Create templates for:
- Daily micro-learning messages
- Lesson reminders
- Practice questions
- Course updates

---

## REQ-ADM-06: Course Performance / Analytics Extension

Within:
Course Performance / Usability

Track:

- WhatsApp opt-in rate
- Message engagement (sent, opened, interacted)
- Practice question responses
- Impact on course completion

---

## REQ-ADM-07: System Settings / Feature Flags

Within:
System Settings / Feature Flags

Add:

- Toggle: Enable/Disable WhatsApp Learning
- Configure:
  - Delivery frequency (daily / weekly)
  - Quiet hours (no messages during specific times)

---

## Constraints

- All features must integrate into existing admin workflows
- No standalone WhatsApp dashboard should be created
- Maintain consistency with current DTMA UI patterns
- Ensure scalability across LMS and TxM implementations

---

## Acceptance Criteria

- WhatsApp learning is configurable within existing modules
- Admin can manage micro-learning, opt-in, and delivery settings
- AI features are reusable across LMS and WhatsApp
- No new standalone admin sections are introduced
- System remains consistent with DTMA architecture