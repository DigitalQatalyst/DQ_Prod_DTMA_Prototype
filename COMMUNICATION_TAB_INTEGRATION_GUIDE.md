# Communication & Support Tab - Integration Guide

## ✅ Integration Complete!

The new Communication & Support tab has been successfully integrated into the AdminDashboard.

## What Was Changed

### 1. **Import Added** (Line 9)
```typescript
import { CommunicationSupportTab } from '@/components/admin/CommunicationSupportTab';
```

### 2. **Component Replaced** (Around line 1506)
```typescript
{/* Communication Tab */}
{activeTab === 'communication' && <CommunicationSupportTab />}
```

The old basic placeholder content was replaced with the full-featured component.

## How to Access

1. **Login as Admin**
   - Navigate to `/dashboard` (admin role required)

2. **Click "Communication" in the sidebar**
   - Located in the left navigation menu
   - Icon: MessageSquare/Communication icon

3. **You'll see three main sections:**
   - **Announcements** - Create and manage announcements
   - **Support Tickets** - Handle learner support requests
   - **WhatsApp** - Manage WhatsApp conversations

## Features Available

### Announcements Tab
- ✅ View all announcements with status badges
- ✅ Click "Create Announcement" button
- ✅ Fill in title, message, and select audience
- ✅ Toggle WhatsApp integration
- ✅ Schedule for later option
- ✅ Track metrics (recipients, opens, clicks)

### Support Tickets Tab
- ✅ View all support tickets in a table
- ✅ Search tickets by subject or learner
- ✅ Filter by status (Open, In Progress, Resolved)
- ✅ Click eye icon to view ticket details
- ✅ Update ticket status and add responses
- ✅ Priority and category badges

### WhatsApp Tab
- ✅ View unread messages in sidebar
- ✅ Click message to view conversation
- ✅ See full conversation history
- ✅ Use quick reply templates
- ✅ Type and send responses
- ✅ View performance metrics
- ✅ Call or email options

## Testing the Component

### Test Announcements
1. Click "Create Announcement" button
2. Fill in the form:
   - Title: "Test Announcement"
   - Message: "This is a test message"
   - Audience: "All Learners"
   - Check "Also send via WhatsApp"
3. Click "Send Announcement"

### Test Support Tickets
1. Click on any ticket's eye icon
2. Modal opens with ticket details
3. Update status dropdown
4. Add a response in the textarea
5. Click "Update Ticket"

### Test WhatsApp
1. Click on any message in the sidebar
2. View conversation on the right
3. Try quick reply buttons
4. Type a message in the reply box
5. Click send button

## Mock Data Currently Showing

### Announcements (3 items)
- "New Course Launch: AI Fundamentals" (Sent)
- "System Maintenance Notice" (Scheduled)
- "Faculty Training Session" (Draft)

### Support Tickets (4 items)
- "Cannot access course materials" (Open, High Priority)
- "Certificate not generated" (In Progress, Medium)
- "Payment issue" (Resolved, High)
- "Course recommendation request" (Open, Low)

### WhatsApp Messages (3 items)
- Amara Osei - "How do I reset my password?" (Unread)
- James Kariuki - "When is the next cohort starting?" (Replied)
- Fatou Diallo - "Thank you for the course materials!" (Read)

## Next Steps for Production

### 1. Connect to Backend API
Replace mock data with real API calls:

```typescript
// In CommunicationSupportTab.tsx
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetch announcements
const { data: announcements } = useQuery({
  queryKey: ['announcements'],
  queryFn: () => fetch('/api/admin/announcements').then(r => r.json())
});

// Create announcement
const createAnnouncement = useMutation({
  mutationFn: (data) => fetch('/api/admin/announcements', {
    method: 'POST',
    body: JSON.stringify(data)
  })
});
```

### 2. Add Real-time Updates
Implement WebSocket for live ticket and message updates:

```typescript
useEffect(() => {
  const ws = new WebSocket('wss://your-api.com/admin/realtime');
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    // Update state with new messages/tickets
  };
  return () => ws.close();
}, []);
```

### 3. Add WhatsApp Business API Integration
Connect to WhatsApp Business API for real messaging:

```typescript
// Send WhatsApp message
const sendWhatsAppMessage = async (to: string, message: string) => {
  await fetch('/api/whatsapp/send', {
    method: 'POST',
    body: JSON.stringify({ to, message })
  });
};
```

### 4. Add Email Integration
For support tickets, integrate email sending:

```typescript
const sendEmail = async (to: string, subject: string, body: string) => {
  await fetch('/api/email/send', {
    method: 'POST',
    body: JSON.stringify({ to, subject, body })
  });
};
```

### 5. Add Analytics Tracking
Track communication metrics:

```typescript
// Track announcement opens
const trackOpen = (announcementId: string) => {
  fetch(`/api/admin/announcements/${announcementId}/track-open`, {
    method: 'POST'
  });
};

// Track response times
const trackResponseTime = (ticketId: string, responseTime: number) => {
  fetch(`/api/admin/tickets/${ticketId}/track-response`, {
    method: 'POST',
    body: JSON.stringify({ responseTime })
  });
};
```

## Troubleshooting

### Component Not Showing
- Check that you're logged in as admin
- Verify the import path is correct
- Check browser console for errors

### Modals Not Opening
- Ensure state management is working
- Check for z-index conflicts
- Verify button onClick handlers

### Styling Issues
- Confirm Tailwind CSS is configured
- Check that all UI components are imported
- Verify DTMA color variables are defined

## File Locations

- **Component**: `src/components/admin/CommunicationSupportTab.tsx`
- **Integration**: `src/pages/dashboard/AdminDashboard.tsx`
- **Documentation**: `COMMUNICATION_SUPPORT_IMPLEMENTATION.md`
- **This Guide**: `COMMUNICATION_TAB_INTEGRATION_GUIDE.md`

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all imports are correct
3. Ensure UI components (Button, Badge, Card) are available
4. Check that Lucide React icons are installed

## Summary

✅ Import added to AdminDashboard
✅ Component integrated into communication tab
✅ All features functional with mock data
✅ Ready for backend API integration
✅ Typography follows DTMA standards
✅ Responsive design implemented
✅ WhatsApp integration included

The Communication & Support tab is now fully functional and ready to use!
