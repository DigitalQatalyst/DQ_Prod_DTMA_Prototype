import { useState } from "react";
import {
  MessageSquare,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart2,
  Send,
  Eye,
  MessageCircle,
} from "lucide-react";

// Mock data - replace with actual API
const MOCK_ANALYTICS = {
  totalLearners: 1247,
  optedInLearners: 892,
  optInRate: 71.5,
  messagesSent: 3456,
  messagesDelivered: 3398,
  deliveryRate: 98.3,
  messagesRead: 2987,
  readRate: 87.9,
  responsesReceived: 1234,
  responseRate: 41.3,
  avgResponseTime: "2.4 hours",
  activeCoursesWithWhatsApp: 12,
  totalCourses: 18,
};

const MOCK_COURSE_STATS = [
  { id: "1", courseName: "Digital Transformation Strategy", optedIn: 234, total: 342, optInRate: 68.4, messagesSent: 1245, engagement: 89 },
  { id: "2", courseName: "AI & Automation in the Workplace", optedIn: 187, total: 219, optInRate: 85.4, messagesSent: 892, engagement: 92 },
  { id: "3", courseName: "Data-Driven Decision Making", optedIn: 142, total: 187, optInRate: 75.9, messagesSent: 678, engagement: 85 },
  { id: "4", courseName: "Agile Project Management", optedIn: 98, total: 154, optInRate: 63.6, messagesSent: 456, engagement: 78 },
  { id: "5", courseName: "Cybersecurity Essentials", optedIn: 231, total: 345, optInRate: 67.0, messagesSent: 185, engagement: 71 },
];

const MOCK_TRENDS = [
  { month: "Jan", optIns: 645, messages: 2340, engagement: 82 },
  { month: "Feb", optIns: 712, messages: 2678, engagement: 85 },
  { month: "Mar", optIns: 789, messages: 2945, engagement: 87 },
  { month: "Apr", optIns: 892, messages: 3456, engagement: 88 },
];

const MOCK_MESSAGE_TYPES = [
  { type: "Daily Micro-Learning", count: 1876, percentage: 54.3 },
  { type: "Practice Questions", count: 892, percentage: 25.8 },
  { type: "Course Updates", count: 456, percentage: 13.2 },
  { type: "Reminders", count: 232, percentage: 6.7 },
];

export const WhatsAppAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] leading-[28px] font-semibold text-foreground">WhatsApp Learning Analytics</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">Platform-wide WhatsApp engagement and performance metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_ANALYTICS.optedInLearners.toLocaleString()}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">WhatsApp Opted In</div>
          <div className="text-[11px] text-green-600 font-medium mt-1">
            {MOCK_ANALYTICS.optInRate}% opt-in rate
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <Send className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_ANALYTICS.messagesSent.toLocaleString()}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Messages Sent</div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">
            {MOCK_ANALYTICS.deliveryRate}% delivered
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_ANALYTICS.readRate}%</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Read Rate</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">
            {MOCK_ANALYTICS.messagesRead.toLocaleString()} opened
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
            <MessageCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_ANALYTICS.responseRate}%</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Response Rate</div>
          <div className="text-[11px] text-purple-600 font-medium mt-1">
            Avg: {MOCK_ANALYTICS.avgResponseTime}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Performance */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-[16px] font-semibold text-foreground">WhatsApp Performance by Course</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Opt-in rates and engagement metrics</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Course</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Opted In</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Opt-In Rate</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Messages</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COURSE_STATS.map((course, idx) => (
                  <tr key={course.id} className={`border-t border-border hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-medium text-foreground max-w-[200px] truncate" title={course.courseName}>
                        {course.courseName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {course.optedIn} / {course.total}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-green-500" style={{ width: `${course.optInRate}%` }} />
                        </div>
                        <span className="text-[12px] text-muted-foreground">{course.optInRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-foreground">
                      {course.messagesSent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${course.engagement >= 85 ? 'bg-green-500' : course.engagement >= 70 ? 'bg-amber-400' : 'bg-red-400'}`} 
                            style={{ width: `${course.engagement}%` }} 
                          />
                        </div>
                        <span className="text-[12px] text-muted-foreground">{course.engagement}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Types & Trends */}
        <div className="space-y-6">
          {/* Message Types */}
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">Message Types</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Distribution by category</p>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_MESSAGE_TYPES.map((type) => (
                <div key={type.type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-foreground">{type.type}</span>
                    <span className="text-[12px] font-medium text-muted-foreground">{type.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all" 
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{type.count.toLocaleString()} messages</div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Trend */}
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">Growth Trend</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Last 4 months</p>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_TRENDS.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-[13px] text-muted-foreground">{trend.month}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-foreground">{trend.optIns}</div>
                    <div className="text-[11px] text-muted-foreground">{trend.messages} msgs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
        <h3 className="text-[16px] font-semibold text-foreground mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-medium text-green-900">WhatsApp API Connected</div>
              <div className="text-[11px] text-green-700">All systems operational</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-medium text-blue-900">Avg Delivery Time</div>
              <div className="text-[11px] text-blue-700">1.2 seconds</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-medium text-amber-900">Rate Limit Status</div>
              <div className="text-[11px] text-amber-700">78% capacity used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
