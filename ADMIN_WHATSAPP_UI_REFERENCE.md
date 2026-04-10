# WhatsApp Admin UI Reference

## Visual Structure & Component Hierarchy

This document provides a visual reference for the WhatsApp Learning admin interface.

---

## Main Tab Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  📱 WhatsApp Learning Management                                │
│  Manage WhatsApp-based conversational learning                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  🟢 WhatsApp as a Delivery Channel                         │ │
│  │  WhatsApp learning extends your existing LMS capabilities  │ │
│  │  📱 Mobile-First  🤖 AI-Powered  📊 Enhanced  ✅ Higher   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬─────┐ │
│  │Analytics │  Course  │Enrollment│   Quiz   │Templates │ ... │ │
│  │REQ-ADM-06│REQ-ADM-01│REQ-ADM-02│REQ-ADM-04│REQ-ADM-05│     │ │
│  └──────────┴──────────┴──────────┴──────────┴──────────┴─────┘ │
│                                                                  │
│  [Section Content Renders Here]                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Analytics & Performance (REQ-ADM-06)

```
┌─────────────────────────────────────────────────────────────────┐
│  📈 WhatsApp Learning Analytics                                 │
│  Track engagement and impact of WhatsApp-based learning         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   68%    │  │  8,934   │  │  5,234   │  │   +23%   │       │
│  │ Opt-In   │  │ Messages │  │Interacted│  │Completion│       │
│  │   Rate   │  │   Sent   │  │          │  │  Boost   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Message Engagement Funnel                                 │ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 8,934 Sent (100%)        │ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 7,456 Opened (83%)       │ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░ 5,234 Interacted (59%)   │ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░ 3,421 Responses (38%)    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  WhatsApp Impact by Course                                 │ │
│  │  ┌──────────────────┬────────┬──────────┬──────┬────────┐ │ │
│  │  │ Course           │Opt-Ins │Engagement│Compl.│ Impact │ │ │
│  │  ├──────────────────┼────────┼──────────┼──────┼────────┤ │ │
│  │  │ Digital Trans... │  342   │ ▓▓▓ 87%  │ 72%  │ +18%   │ │ │
│  │  │ AI & Automation  │  219   │ ▓▓▓ 82%  │ 65%  │ +15%   │ │ │
│  │  └──────────────────┴────────┴──────────┴──────┴────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 2: Course Content Extension (REQ-ADM-01)

```
┌─────────────────────────────────────────────────────────────────┐
│  💬 WhatsApp Learning Extension                    [REQ-ADM-01] │
│  Create micro-learning content for WhatsApp delivery            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Micro-Learning Content                                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Enter short, tweet-length learning content...              │ │
│  │                                                             │ │
│  │                                                             │ │
│  │                                                   😊 245/280│ │
│  └────────────────────────────────────────────────────────────┘ │
│  💡 Tip: Keep it concise and actionable. Use emojis.            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📤 Deliver via WhatsApp                          [ON/OFF] │ │
│  │  Enable WhatsApp delivery for this lesson or module        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  ℹ️ Associated with: Course ID: demo-course-1              │ │
│  │  This content will be delivered to opted-in learners       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [Cancel]  [Save WhatsApp Content]                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 3: Enrollment Opt-In (REQ-ADM-02)

```
┌─────────────────────────────────────────────────────────────────┐
│  💬 WhatsApp Learning Opt-In                       [REQ-ADM-02] │
│  Enable WhatsApp-based learning for this enrollment             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  🟢  Continue Learning via WhatsApp?                       │ │
│  │                                                             │ │
│  │  Get daily micro-lessons, practice questions, and course   │ │
│  │  reminders directly on WhatsApp. Stay engaged! 📱          │ │
│  │                                                             │ │
│  │  [ON/OFF]  Opt In to WhatsApp Learning                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📱 WhatsApp Phone Number                                  │ │
│  │                                                             │ │
│  │  [🇦🇪 +971 ▼]  [501234567____________] ✓                  │ │
│  │                                                             │ │
│  │  Enter the phone number registered with WhatsApp           │ │
│  │                                                             │ │
│  │  ✓ Complete number: +971 501234567                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ℹ️ Admin Visibility                                            │
│  • View WhatsApp opt-in status per learner                      │
│  • Track engagement metrics in analytics                        │
│                                                                  │
│  [Cancel]  [Save Opt-In Preferences]                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 4: Quiz Management (REQ-ADM-04)

```
┌─────────────────────────────────────────────────────────────────┐
│  ❓ WhatsApp Quiz Extension                        [REQ-ADM-04] │
│  Create practice questions for WhatsApp delivery                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  💬 Send via WhatsApp                             [ON/OFF] │ │
│  │  Deliver this question as a chat message                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Question                                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ What is the primary benefit of digital transformation?     │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Answer Options                                                  │
│  ┌─┬──────────────────────────────────────────────────────┬─┐  │
│  │A│ Increased efficiency and productivity               │✓│  │
│  ├─┼──────────────────────────────────────────────────────┼─┤  │
│  │B│ Lower costs                                          │✗│  │
│  ├─┼──────────────────────────────────────────────────────┼─┤  │
│  │C│ Better customer experience                           │✗│  │
│  ├─┼──────────────────────────────────────────────────────┼─┤  │
│  │D│ All of the above                                     │✗│  │
│  └─┴──────────────────────────────────────────────────────┴─┘  │
│                                                                  │
│  Correct Answer Feedback                                         │
│  [Great job! That's correct! 🎉_____________________]            │
│                                                                  │
│  Explanation                                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Digital transformation primarily focuses on...             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  💬 WhatsApp Preview                                       │ │
│  │  What is the primary benefit of digital transformation?    │ │
│  │  A) Increased efficiency and productivity                  │ │
│  │  B) Lower costs                                            │ │
│  │  C) Better customer experience                             │ │
│  │  D) All of the above                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [Cancel]  [Save Quiz Settings]                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 5: Notification Templates (REQ-ADM-05)

```
┌─────────────────────────────────────────────────────────────────┐
│  🔔 WhatsApp Notification Templates                [REQ-ADM-05] │
│  Manage templates for WhatsApp delivery                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐  ┌────────────────────────────────┐  │
│  │ Templates List       │  │ Template Preview               │  │
│  │                      │  │                                │  │
│  │ ┌──────────────────┐ │  │ Edit Template                  │  │
│  │ │📚 Daily Micro... │ │  │                                │  │
│  │ │[micro-learning]  │ │  │ Template Name                  │  │
│  │ │Today's lesson... │ │  │ [Daily Micro-Learning_______] │  │
│  │ │{{lesson_title}}  │ │  │                                │  │
│  │ └──────────────────┘ │  │ Content                        │  │
│  │                      │  │ ┌────────────────────────────┐ │  │
│  │ ┌──────────────────┐ │  │ │📚 Today's lesson:          │ │  │
│  │ │⏰ Lesson Reminder│ │  │ │{{lesson_title}}            │ │  │
│  │ │[reminder]        │ │  │ │                            │ │  │
│  │ │Reminder: Your... │ │  │ │{{micro_content}}           │ │  │
│  │ │{{lesson_title}}  │ │  │ │                            │ │  │
│  │ └──────────────────┘ │  │ │💡 Quick tip: {{tip}}       │ │  │
│  │                      │  │ └────────────────────────────┘ │  │
│  │ ┌──────────────────┐ │  │                                │  │
│  │ │🤔 Practice Quest │ │  │ [Save Changes]  [Cancel]       │  │
│  │ │[practice]        │ │  │                                │  │
│  │ │Practice time!... │ │  │ ┌────────────────────────────┐ │  │
│  │ │{{question}}      │ │  │ │💬 WhatsApp Preview         │ │  │
│  │ └──────────────────┘ │  │ │┌──────────────────────────┐│ │  │
│  │                      │  │ ││📚 Today's lesson:        ││ │  │
│  │ ┌──────────────────┐ │  │ ││Digital Transformation    ││ │  │
│  │ │🆕 Course Update  │ │  │ ││                          ││ │  │
│  │ │[update]          │ │  │ ││Learn about the 6XD...    ││ │  │
│  │ │New in {{course}} │ │  │ ││                          ││ │  │
│  │ │{{update_message}}│ │  │ ││💡 Quick tip: Start small ││ │  │
│  │ └──────────────────┘ │  │ │└──────────────────────────┘│ │  │
│  │                      │  │ └────────────────────────────┘ │  │
│  │                      │  │                                │  │
│  │                      │  │ Variables                      │  │
│  │                      │  │ [{{lesson_title}}] [{{tip}}]   │  │
│  │                      │  │                                │  │
│  │                      │  │ [📤 Send Test Message]         │  │
│  └──────────────────────┘  └────────────────────────────────┘  │
│                                                                  │
│  ℹ️ WhatsApp as Delivery Channel                                │
│  • Templates sent to opted-in learners                          │
│  • Variables auto-populated from course data                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 6: System Settings (REQ-ADM-07)

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚙️ WhatsApp System Settings                       [REQ-ADM-07] │
│  Configure WhatsApp learning features and delivery              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  🟢  WhatsApp Learning                            [ON/OFF] │ │
│  │  Enable or disable WhatsApp-based learning platform-wide   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  🔔 Delivery Settings                                      │ │
│  │                                                             │ │
│  │  Delivery Frequency                                         │ │
│  │  [  Daily  ] [  Weekly  ] [  Custom  ]                     │ │
│  │                                                             │ │
│  │  Maximum Messages Per Day                                   │ │
│  │  [3] messages per learner                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  🕐 Quiet Hours                                   [ON/OFF] │ │
│  │  Prevent messages during specific times                    │ │
│  │                                                             │ │
│  │  Start Time        End Time                                 │ │
│  │  [22:00]          [08:00]                                   │ │
│  │                                                             │ │
│  │  ℹ️ Active Quiet Hours: 22:00 - 08:00                      │ │
│  │  No messages sent during this period                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Automatic Opt-In Reminders                       [ON/OFF] │ │
│  │  Remind learners who haven't opted in                      │ │
│  │                                                             │ │
│  │  Reminder Frequency (days)                                  │ │
│  │  [7] days between reminders                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Feature Flags                                             │ │
│  │  ┌──────────────────────────────────────────────┬────────┐ │ │
│  │  │ Micro-Learning Messages                      │ [ON]   │ │ │
│  │  │ Practice Questions                            │ [ON]   │ │ │
│  │  │ Lesson Reminders                              │ [ON]   │ │ │
│  │  │ Course Updates                                │ [OFF]  │ │ │
│  │  │ AI-Powered Responses                          │ [ON]   │ │ │
│  │  └──────────────────────────────────────────────┴────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [Reset to Defaults]  [💾 Save Settings]                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Primary Colors
- **WhatsApp Green:** `#25D366` - Used for WhatsApp-specific elements
- **DTMA Orange:** `#ff6b4d` - Used for primary actions
- **Navy Blue:** `#1e2348` - Used for headers and emphasis

### Status Colors
- **Success:** Green (`#10b981`)
- **Warning:** Amber (`#f59e0b`)
- **Error:** Red (`#ef4444`)
- **Info:** Blue (`#3b82f6`)

### Neutral Colors
- **Background:** `#F5F6FA`
- **Card:** White (`#ffffff`)
- **Border:** `#E5E7EB`
- **Text:** `#0B0C19` (primary), `#4B5563` (secondary), `#9CA3AF` (muted)

---

## Typography

### Headings
- **H1:** 28px / 36px line-height, semibold
- **H2:** 20px / 28px line-height, semibold
- **H3:** 18px / 24px line-height, semibold
- **H4:** 16px / 24px line-height, semibold

### Body Text
- **Large:** 16px / 24px line-height, normal
- **Regular:** 14px / 20px line-height, normal
- **Small:** 13px / 20px line-height, normal
- **Tiny:** 12px / 16px line-height, normal

---

## Icons

All icons from `lucide-react`:
- **MessageSquare** - WhatsApp/messaging
- **Bell** - Notifications
- **Settings** - Configuration
- **TrendingUp** - Analytics
- **Users** - Learners/opt-ins
- **Clock** - Quiet hours/timing
- **Send** - Message delivery
- **HelpCircle** - Quizzes
- **CheckCircle** - Success states
- **XCircle** - Error states

---

## Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

All components are fully responsive and adapt to different screen sizes.

---

## Accessibility

- All interactive elements have proper focus states
- Color contrast meets WCAG AA standards
- Form inputs have associated labels
- Icons have descriptive titles/aria-labels
- Keyboard navigation supported throughout

---

## Component States

### Buttons
- **Default:** Outlined or filled
- **Hover:** Slight color change
- **Active:** Pressed state
- **Disabled:** Reduced opacity, no interaction

### Switches
- **Off:** Gray background
- **On:** WhatsApp green background
- **Disabled:** Reduced opacity

### Inputs
- **Default:** Border with subtle background
- **Focus:** Ring effect with primary color
- **Error:** Red border
- **Success:** Green checkmark icon

---

This UI reference provides a complete visual guide for the WhatsApp Learning admin interface. All components follow DTMA design patterns and integrate seamlessly with the existing admin dashboard.
