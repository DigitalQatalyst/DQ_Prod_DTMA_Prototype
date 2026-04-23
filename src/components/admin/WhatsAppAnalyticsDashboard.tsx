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
          <h2 className="text-[28px] leading-[36px] font-semibold text-[#1e2348]">WhatsApp Learning Analytics</h2>
          <p className="text-[14px] leading-[20px] text-[#4B5563] mt-1">Platform-wide WhatsApp engagement and performance metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="w-12 h-12 rounded-xl bg-[#fff0ed] flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-[#ff6b4d]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[#1e2348]">{MOCK_ANALYTICS.optedInLearners.toLocaleString()}</div>
          <div className="text-[13px] text-[#4B5563] mt-1">WhatsApp Opted In</div>
          <div className="text-[12px] text-[#ff6b4d] font-medium mt-2">
            {MOCK_ANALYTICS.optInRate}% opt-in rate
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="w-12 h-12 rounded-xl bg-[#e9e9ed] flex items-center justify-center mb-3">
            <Send className="w-6 h-6 text-[#1e2348]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[#1e2348]">{MOCK_ANALYTICS.messagesSent.toLocaleString()}</div>
          <div className="text-[13px] text-[#4B5563] mt-1">Messages Sent</div>
          <div className="text-[12px] text-[#1e2348] font-medium mt-2">
            {MOCK_ANALYTICS.deliveryRate}% delivered
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="w-12 h-12 rounded-xl bg-[#fff0ed] flex items-center justify-center mb-3">
            <Eye className="w-6 h-6 text-[#ff6b4d]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[#1e2348]">{MOCK_ANALYTICS.readRate}%</div>
          <div className="text-[13px] text-[#4B5563] mt-1">Read Rate</div>
          <div className="text-[12px] text-[#ff6b4d] font-medium mt-2">
            {MOCK_ANALYTICS.messagesRead.toLocaleString()} opened
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="w-12 h-12 rounded-xl bg-[#e9e9ed] flex items-center justify-center mb-3">
            <MessageCircle className="w-6 h-6 text-[#1e2348]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[#1e2348]">{MOCK_ANALYTICS.responseRate}%</div>
          <div className="text-[13px] text-[#4B5563] mt-1">Response Rate</div>
          <div className="text-[12px] text-[#1e2348] font-medium mt-2">
            Avg: {MOCK_ANALYTICS.avgResponseTime}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E7EB]">
            <h3 className="text-[18px] font-semibold text-[#1e2348]">WhatsApp Performance by Course</h3>
            <p className="text-[13px] text-[#4B5563] mt-1">Opt-in rates and engagement metrics</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1e2348]">
                <tr>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Course</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Opted In</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Opt-In Rate</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Messages</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COURSE_STATS.map((course, idx) => (
                  <tr key={course.id} className={`border-t border-[#E5E7EB] hover:bg-[#F5F6FA] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F6FA]'}`}>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-medium text-[#1e2348] max-w-[200px] truncate" title={course.courseName}>
                        {course.courseName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#4B5563]">
                      {course.optedIn} / {course.total}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                          <div className="h-full rounded-full bg-green-500" style={{ width: `${course.optInRate}%` }} />
                        </div>
                        <span className="text-[12px] text-[#4B5563] font-medium">{course.optInRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-[#1e2348]">
                      {course.messagesSent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${course.engagement >= 85 ? 'bg-green-500' : course.engagement >= 70 ? 'bg-amber-400' : 'bg-red-400'}`} 
                            style={{ width: `${course.engagement}%` }} 
                          />
                        </div>
                        <span className="text-[12px] text-[#4B5563] font-medium">{course.engagement}%</span>
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
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]">
            <div className="px-5 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-[18px] font-semibold text-[#1e2348]">Message Types</h3>
              <p className="text-[13px] text-[#4B5563] mt-1">Distribution by category</p>
            </div>
            <div className="p-5 space-y-4">
              {MOCK_MESSAGE_TYPES.map((type) => (
                <div key={type.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[#1e2348] font-medium">{type.type}</span>
                    <span className="text-[13px] font-semibold text-green-600">{type.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all" 
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                  <div className="text-[12px] text-[#9CA3AF] mt-1">{type.count.toLocaleString()} messages</div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]">
            <div className="px-5 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-[18px] font-semibold text-[#1e2348]">Growth Trend</h3>
              <p className="text-[13px] text-[#4B5563] mt-1">Last 4 months</p>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_TRENDS.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-[13px] text-[#4B5563] font-medium">{trend.month}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[16px] font-bold text-[#1e2348]">{trend.optIns}</div>
                    <div className="text-[11px] text-[#9CA3AF]">{trend.messages} msgs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
        <h3 className="text-[18px] font-semibold text-[#1e2348] mb-5">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-[14px] font-semibold text-green-900">WhatsApp API Connected</div>
              <div className="text-[12px] text-green-700 mt-0.5">All systems operational</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#e9e9ed] border border-[#dddee4]">
            <Clock className="w-5 h-5 text-[#1e2348] flex-shrink-0" />
            <div>
              <div className="text-[14px] font-semibold text-[#1e2348]">Avg Delivery Time</div>
              <div className="text-[12px] text-[#4B5563] mt-0.5">1.2 seconds</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <div className="text-[14px] font-semibold text-amber-900">Rate Limit Status</div>
              <div className="text-[12px] text-amber-700 mt-0.5">78% capacity used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
