import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Send,
  MessageSquare,
  Bell,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Eye,
  Trash2,
  Edit,
  MoreVertical,
  X,
  Plus,
  Download,
  TrendingUp,
  MessageCircle,
  Headphones,
  Star,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

// Mock data
const MOCK_ANNOUNCEMENTS = [
  { id: '1', title: 'New Course Launch: AI Fundamentals', message: 'We are excited to announce...', audience: 'All Learners', status: 'sent', sentDate: '2026-04-10', recipients: 1247, opens: 892, clicks: 234 },
  { id: '2', title: 'System Maintenance Notice', message: 'Scheduled maintenance on...', audience: 'All Users', status: 'scheduled', sentDate: '2026-04-15', recipients: 2500, opens: 0, clicks: 0 },
  { id: '3', title: 'Faculty Training Session', message: 'Join us for a training...', audience: 'Faculty', status: 'draft', sentDate: null, recipients: 0, opens: 0, clicks: 0 },
];

const MOCK_TICKETS = [
  { id: 't1', subject: 'Cannot access course materials', learner: 'Amara Osei', email: 'amara@example.com', status: 'open', priority: 'high', created: '2026-04-12 09:30', lastUpdate: '2026-04-12 14:20', assignedTo: 'Support Team', category: 'Technical' },
  { id: 't2', subject: 'Certificate not generated', learner: 'James Kariuki', email: 'james@example.com', status: 'in-progress', priority: 'medium', created: '2026-04-11 16:45', lastUpdate: '2026-04-12 10:15', assignedTo: 'Admin Team', category: 'Certification' },
  { id: 't3', subject: 'Payment issue', learner: 'Fatou Diallo', email: 'fatou@example.com', status: 'resolved', priority: 'high', created: '2026-04-10 11:20', lastUpdate: '2026-04-11 09:00', assignedTo: 'Finance Team', category: 'Billing' },
  { id: 't4', subject: 'Course recommendation request', learner: 'Kofi Mensah', email: 'kofi@example.com', status: 'open', priority: 'low', created: '2026-04-12 08:15', lastUpdate: '2026-04-12 08:15', assignedTo: 'Unassigned', category: 'General' },
];

const MOCK_WHATSAPP_MESSAGES = [
  { id: 'w1', from: '+234 801 234 5678', name: 'Amara Osei', message: 'How do I reset my password?', timestamp: '2026-04-12 15:30', status: 'unread', type: 'support' },
  { id: 'w2', from: '+254 712 345 678', name: 'James Kariuki', message: 'When is the next cohort starting?', timestamp: '2026-04-12 14:45', status: 'replied', type: 'inquiry' },
  { id: 'w3', from: '+221 77 123 4567', name: 'Fatou Diallo', message: 'Thank you for the course materials!', timestamp: '2026-04-12 13:20', status: 'read', type: 'feedback' },
];

export const CommunicationSupportTab = () => {
  const [activeSection, setActiveSection] = useState<'announcements' | 'support' | 'whatsapp'>('announcements');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[36px] font-semibold text-[#1e2348]">Communication & Support</h1>
        <div className="flex gap-2">
          {activeSection === 'announcements' && (
            <Button onClick={() => setShowAnnouncementModal(true)} className="bg-[#ff6b4d] hover:bg-[#fff0ed] hover:text-[#ff6b4d] text-white gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Create Announcement
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#e9e9ed] rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#1e2348]" />
            </div>
            <div>
              <p className="text-[12px] leading-[16px] font-medium text-[#4B5563]">Total Announcements</p>
              <p className="text-[24px] leading-[32px] font-medium text-[#1e2348]">{MOCK_ANNOUNCEMENTS.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 bg-white border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#fff0ed] rounded-xl flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#ff6b4d]" />
            </div>
            <div>
              <p className="text-[12px] leading-[16px] font-medium text-[#4B5563]">Open Tickets</p>
              <p className="text-[24px] leading-[32px] font-medium text-[#1e2348]">{MOCK_TICKETS.filter(t => t.status === 'open').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 bg-white border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-[12px] leading-[16px] font-medium text-[#4B5563]">WhatsApp Messages</p>
              <p className="text-[24px] leading-[32px] font-medium text-[#1e2348]">{MOCK_WHATSAPP_MESSAGES.filter(m => m.status === 'unread').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 bg-white border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#e9e9ed] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#1e2348]" />
            </div>
            <div>
              <p className="text-[12px] leading-[16px] font-medium text-[#4B5563]">Avg Response Time</p>
              <p className="text-[24px] leading-[32px] font-medium text-[#1e2348]">2.4h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 bg-[#F5F6FA] p-1 rounded-xl w-fit">
        {[
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'support', label: 'Support Tickets', icon: Headphones, badge: MOCK_TICKETS.filter(t => t.status === 'open').length },
          { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, badge: MOCK_WHATSAPP_MESSAGES.filter(m => m.status === 'unread').length },
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] leading-[20px] font-normal transition-colors ${
              activeSection === section.id
                ? 'bg-white shadow-sm text-[#1e2348]'
                : 'text-[#4B5563] hover:text-[#ff6b4d] hover:bg-[#fff0ed]/50'
            }`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
            {section.badge && section.badge > 0 && (
              <Badge className="bg-[#ff6b4d] text-white text-[10px] leading-[14px] font-medium px-1.5 py-0.5 hover:bg-[#e66045]">{section.badge}</Badge>
            )}
          </button>
        ))}
      </div>

      {/* Announcements Section */}
      {activeSection === 'announcements' && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] leading-[28px] font-medium text-foreground">Announcement Manager</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px] px-3 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">All Status</SelectItem>
                    <SelectItem value="sent" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">Sent</SelectItem>
                    <SelectItem value="scheduled" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">Scheduled</SelectItem>
                    <SelectItem value="draft" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              {MOCK_ANNOUNCEMENTS.map(announcement => (
                <div key={announcement.id} className="border border-border rounded-xl p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[16px] leading-[24px] font-normal text-foreground">{announcement.title}</h3>
                        <Badge className={`text-[10px] leading-[14px] font-medium ${
                          announcement.status === 'sent' ? 'bg-green-100 text-green-700' :
                          announcement.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {announcement.status}
                        </Badge>
                      </div>
                      <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-3">{announcement.message}</p>
                      <div className="flex items-center gap-4 text-[12px] leading-[16px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {announcement.audience}
                        </span>
                        {announcement.sentDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {announcement.sentDate}
                          </span>
                        )}
                        {announcement.status === 'sent' && (
                          <>
                            <span>{announcement.recipients} recipients</span>
                            <span>{announcement.opens} opens</span>
                            <span>{announcement.clicks} clicks</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Support Tickets Section */}
      {activeSection === 'support' && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] leading-[28px] font-medium text-foreground">Support Console</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal"
                  />
                </div>
                <Select 
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[140px] px-3 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">All Status</SelectItem>
                    <SelectItem value="open" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">Open</SelectItem>
                    <SelectItem value="in-progress" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">In Progress</SelectItem>
                    <SelectItem value="resolved" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] focus:bg-[#fff0ed] focus:text-[#ff6b4d]">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--dq-navy-950)]">
                  <tr>
                    {['Ticket ID', 'Subject', 'Learner', 'Status', 'Priority', 'Category', 'Created', 'Assigned To', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[12px] leading-[16px] font-medium text-white whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TICKETS.filter(t => statusFilter === 'all' || t.status === statusFilter).map((ticket, idx) => (
                    <tr key={ticket.id} className={`border-t border-border hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                      <td className="px-4 py-3 text-[14px] leading-[20px] font-medium text-foreground">{ticket.id.toUpperCase()}</td>
                      <td className="px-4 py-3">
                        <div className="max-w-[200px]">
                          <p className="text-[14px] leading-[20px] font-normal text-foreground truncate">{ticket.subject}</p>
                          <p className="text-[12px] leading-[16px] font-medium text-muted-foreground">{ticket.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[14px] leading-[20px] font-normal text-foreground">{ticket.learner}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[10px] leading-[14px] font-medium ${
                          ticket.status === 'open' ? 'bg-orange-100 text-orange-700' :
                          ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[10px] leading-[14px] font-medium ${
                          ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                          ticket.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-[14px] leading-[20px] font-normal text-muted-foreground">{ticket.category}</td>
                      <td className="px-4 py-3 text-[12px] leading-[16px] font-medium text-muted-foreground">{ticket.created}</td>
                      <td className="px-4 py-3 text-[14px] leading-[20px] font-normal text-muted-foreground">{ticket.assignedTo}</td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowTicketModal(true);
                          }}
                          className="p-2 hover:bg-[#ff6b4d]/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-[#ff6b4d]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* WhatsApp Section */}
      {activeSection === 'whatsapp' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] leading-[24px] font-normal text-foreground">WhatsApp Messages</h2>
                <Badge className="bg-[#25D366] text-white text-[10px] leading-[14px] font-medium">
                  {MOCK_WHATSAPP_MESSAGES.filter(m => m.status === 'unread').length} New
                </Badge>
              </div>
              <div className="space-y-2">
                {MOCK_WHATSAPP_MESSAGES.map(msg => (
                  <button
                    key={msg.id}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-[14px] leading-[20px] font-medium text-foreground">{msg.name}</p>
                      {msg.status === 'unread' && (
                        <div className="w-2 h-2 bg-[#ff6b4d] rounded-full"></div>
                      )}
                    </div>
                    <p className="text-[12px] leading-[16px] font-medium text-muted-foreground mb-1">{msg.from}</p>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground line-clamp-2 mb-2">{msg.message}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-[10px] leading-[14px] font-medium ${
                        msg.type === 'support' ? 'bg-red-100 text-red-700' :
                        msg.type === 'inquiry' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {msg.type}
                      </Badge>
                      <span className="text-[10px] leading-[14px] font-medium text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Message Detail & Reply */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div>
                  <h2 className="text-[20px] leading-[28px] font-medium text-foreground">Amara Osei</h2>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">+234 801 234 5678</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>
              </div>

              {/* Conversation */}
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white text-[12px] leading-[16px] font-medium">
                    AO
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg p-3 mb-1">
                      <p className="text-[14px] leading-[20px] font-normal text-foreground">How do I reset my password?</p>
                    </div>
                    <p className="text-[10px] leading-[14px] font-medium text-muted-foreground">Today at 15:30</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="flex-1 max-w-[70%]">
                    <div className="bg-[var(--dq-orange-500)] text-white rounded-lg p-3 mb-1 ml-auto">
                      <p className="text-[14px] leading-[20px] font-normal">Hi Amara! You can reset your password by clicking on "Forgot Password" on the login page. You'll receive a reset link via email.</p>
                    </div>
                    <p className="text-[10px] leading-[14px] font-medium text-muted-foreground text-right">Today at 15:32</p>
                  </div>
                  <div className="w-8 h-8 bg-[var(--dq-navy-950)] rounded-full flex items-center justify-center text-white text-[12px] leading-[16px] font-medium">
                    AD
                  </div>
                </div>
              </div>

              {/* Quick Replies */}
              <div className="mb-4">
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground mb-2">Quick Replies:</p>
                <div className="flex flex-wrap gap-2">
                  {['Password Reset', 'Course Access', 'Technical Support', 'Billing Question'].map(reply => (
                    <button key={reply} className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-[12px] leading-[16px] font-medium text-foreground transition-colors">
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <div className="flex gap-2">
                <textarea
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-border rounded-lg text-[14px] leading-[20px] font-normal resize-none"
                  rows={3}
                />
                <Button className="bg-[#25D366] hover:bg-[#20BA5A] text-white self-end">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* WhatsApp Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Card className="p-4">
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground mb-1">Response Rate</p>
                <p className="text-[20px] leading-[28px] font-medium text-foreground">94%</p>
              </Card>
              <Card className="p-4">
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground mb-1">Avg Response Time</p>
                <p className="text-[20px] leading-[28px] font-medium text-foreground">12 min</p>
              </Card>
              <Card className="p-4">
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground mb-1">Satisfaction</p>
                <p className="text-[20px] leading-[28px] font-medium text-foreground">4.8/5</p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] leading-[32px] font-medium text-foreground">Create Announcement</h2>
              <button onClick={() => setShowAnnouncementModal(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-foreground mb-2">Title</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal" placeholder="Announcement title" />
              </div>
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-foreground mb-2">Message</label>
                <textarea className="w-full px-4 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal resize-none" rows={6} placeholder="Your message..." />
              </div>
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-foreground mb-2">Audience</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal">
                  <option>All Users</option>
                  <option>All Learners</option>
                  <option>Faculty</option>
                  <option>Organizations</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sendWhatsApp" className="w-4 h-4" />
                <label htmlFor="sendWhatsApp" className="text-[14px] leading-[20px] font-normal text-foreground">Also send via WhatsApp</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="scheduleAnnouncement" className="w-4 h-4" />
                <label htmlFor="scheduleAnnouncement" className="text-[14px] leading-[20px] font-normal text-foreground">Schedule for later</label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowAnnouncementModal(false)} variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045] text-white">Send Announcement</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[24px] leading-[32px] font-medium text-foreground">{selectedTicket.subject}</h2>
                <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">Ticket #{selectedTicket.id.toUpperCase()}</p>
              </div>
              <button onClick={() => setShowTicketModal(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground">Learner</p>
                <p className="text-[14px] leading-[20px] font-normal text-foreground">{selectedTicket.learner}</p>
              </div>
              <div>
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground">Email</p>
                <p className="text-[14px] leading-[20px] font-normal text-foreground">{selectedTicket.email}</p>
              </div>
              <div>
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground">Status</p>
                <Badge className="mt-1">{selectedTicket.status}</Badge>
              </div>
              <div>
                <p className="text-[12px] leading-[16px] font-medium text-muted-foreground">Priority</p>
                <Badge className="mt-1">{selectedTicket.priority}</Badge>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-foreground mb-2">Update Status</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal">
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-foreground mb-2">Add Response</label>
                <textarea className="w-full px-4 py-2 border border-border rounded-lg text-[14px] leading-[20px] font-normal resize-none" rows={4} placeholder="Type your response..." />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowTicketModal(false)} variant="outline" className="flex-1">Close</Button>
              <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045] text-white">Update Ticket</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
