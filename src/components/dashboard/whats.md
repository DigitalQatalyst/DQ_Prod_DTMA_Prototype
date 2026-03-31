# Feature: WhatsApp-Based Conversational Learning

## Purpose
Enable learners to continue their learning through WhatsApp using:
- Daily micro-learning concepts
- Voice-based Q&A
- Practice questions for assessments

This feature is separate from:
- Butler AI concierge
- Landing page WhatsApp contact button

It is part of the learner learning experience after enrollment.

---

## REQ-WA-01: Learner Opt-In

Add a prompt in the learner dashboard:

"Would you like to continue learning via WhatsApp?"

Provide two buttons:
- Yes, send lessons to WhatsApp
- No, continue learning in the platform

If learner selects Yes:
- Ask for or confirm their WhatsApp number
- Save preference as WhatsApp Opt-In = True

---

## REQ-WA-02: Daily Micro-Learning Delivery

System must simulate sending one concept per day to WhatsApp.

Each micro-learning message should:
- Be short (similar to a tweet length)
- Contain:
  - Concept title
  - One key explanation
  - Optional emoji for engagement

Example:
"📘 Concept of the Day: Agile Sprint  
A sprint is a short, time-boxed period where a team works to complete a set amount of work."

Display these messages in a WhatsApp-style chat thread inside the prototype.

---

## REQ-WA-03: Conversational Learning with Voice

Allow learner to:
- Send text or simulated voice messages

When learner sends a voice question:
Display:
- Voice message bubble
- AI response as:
  - Text summary
  - Audio summary (play button UI only)

Simulate AI response:
"Here is a summary of your question..."

No real voice processing is required.

---

## REQ-WA-04: Practice Questions via WhatsApp

After certain lessons, simulate sending practice questions in WhatsApp.

Example:
"🧠 Practice Question  
What is the primary goal of a sprint?

A. Documentation  
B. Deliver working increments  
C. Meetings  
D. Hiring"

Allow learner to select an answer and display:
- Correct/incorrect feedback
- Short explanation

---

## REQ-WA-05: WhatsApp Chat Interface

All micro-learning, voice Q&A, and practice questions must appear in a WhatsApp-style chat interface within the learner dashboard.

Do not reuse Butler AI chat components.

---

## User Flow

1. Learner logs into dashboard
2. Learner opts into WhatsApp learning
3. System displays daily lessons in chat thread
4. Learner can ask questions via text or voice
5. System delivers practice questions and feedback

---

## Acceptance Criteria

This feature is complete when:
- Learner can opt in to WhatsApp learning
- Daily micro-learning messages appear in chat
- Voice message UI is visible
- Practice questions are delivered in chat format