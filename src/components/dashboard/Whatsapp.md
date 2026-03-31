# Feature: WhatsApp Conversational Learning Interface

## Purpose
Design and implement a WhatsApp-style chat interface that allows learners to interact with AI tutors through a conversational learning experience.

This feature is separate from Butler AI and must be implemented as a new UI module.

Existing AI concierge or Butler chat components must NOT be reused.

---

## Feature Requirements

### REQ-WA-01: New Navigation Entry
Add a new learner dashboard menu item:

Label: **WhatsApp Learning**

Selecting this item must open a new screen and not reuse Butler AI panels.

---

### REQ-WA-02: Full-Screen WhatsApp Chat Layout

The chat screen must include:

- Top contact header
- Scrollable message thread
- Bottom message input bar

Layout structure:

Header  
Chat Messages  
Message Input

---

### REQ-WA-03: Contact Header

Header must display:

- AI Tutor avatar
- Contact name: **DTMA AI Tutor**
- Status text: **Online**

Include:
- Back arrow
- Optional call/video icons (disabled)

---

### REQ-WA-04: Message Bubble Design

Implement two message types:

**Learner Messages**
- Right-aligned
- Dark blue background
- White text

**AI Messages**
- Left-aligned
- Light gray background
- Dark text

Each message must include:
- Timestamp
- Delivery indicators (✓, ✓✓)

---

### REQ-WA-05: Message Input Bar

The input bar must contain:

- Text input field
- Attachment icon
- Microphone icon
- Send button

The send button becomes active when text is present.

---

### REQ-WA-06: Simulated WhatsApp Features

The prototype must simulate:

- Typing indicator ("AI Tutor is typing…")
- Message delivery states
- Scrollable chat history
- Voice note UI (visual only)

No real WhatsApp API integration is required.

---

## Visual Design Constraints

The interface must match the existing dashboard design system:

Use:
- Primary color: deep blue
- Neutral backgrounds
- Rounded message bubbles
- Same font family as dashboard

Do not use WhatsApp’s exact green branding.

---

## Component Naming

Create new components using the prefix:

- wa-chat-screen
- wa-message-bubble
- wa-chat-header
- wa-input-bar

Do not reuse or extend Butler components.

---

## User Flow

1. Learner logs into dashboard
2. Learner selects **WhatsApp Learning**
3. Chat interface opens
4. Learner sends message
5. AI tutor responds with simulated typing and message bubbles

---

## Acceptance Criteria

This feature is considered complete only when:

- A new dashboard route exists
- A WhatsApp-style UI is visible
- Messages appear in chat bubbles
- Butler AI components are not used anywhere in this flow