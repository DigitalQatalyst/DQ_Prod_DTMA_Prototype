import { useState } from "react";
import {
  Bot,
  TrendingUp,
  MessageSquare,
  Zap,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart2,
  Users,
} from "lucide-react";

// Mock data - replace with actual API
const MOCK_AI_ANALYTICS = {
  totalInteractions: 15678,
  activeUsers: 892,
  avgResponseTime: "1.8s",
  successRate: 97.3,
  totalCost: 234.56,
  avgCostPerInteraction: 0.015,
  coursesWithAI: 16,
  totalCourses: 18,
  aiTutorSessions: 8934,
  aiAssessmentHelp: 4123,
  aiContentGeneration: 2621,
};

const MOCK_COURSE_AI_USAGE = [
  { id: "1", courseName: "Digital Transformation Strategy", interactions: 3456, users: 234, avgTime: "1.6s", satisfaction: 96, cost: 52.34 },
  { id: "2", courseName: "AI & Automation in the Workplace", interactions: 2987, users: 187, avgTime: "1.9s", satisfaction: 98, cost: 44.81 },
  { id: "3", courseName: "Data-Driven Decision Making", interactions: 2345, users: 142, avgTime: "1.7s", satisfaction: 94, cost: 35.18 },
  { id: "4", courseName: "Agile Project Management", interactions: 1876, users: 98, avgTime: "2.1s", satisfaction: 92, cost: 28.14 },
  { id: "5", courseName: "Leadership in the Digital Age", interactions: 1543, users: 89, avgTime: "1.5s", satisfaction: 97, cost: 23.15 },
];

const MOCK_AI_FEATURES = [
  { feature: "AI Tutor Q&A", usage: 8934, percentage: 57.0, avgSatisfaction: 96 },
  { feature: "Assessment Assistance", usage: 4123, percentage: 26.3, avgSatisfaction: 94 },
  { feature: "Content Summaries", usage: 1876, percentage: 12.0, avgSatisfaction: 98 },
  { feature: "Voice Responses", usage: 745, percentage: 4.7, avgSatisfaction: 93 },
];

const MOCK_COMMON_QUERIES = [
  { query: "Explain digital transformation", count: 456, avgRating: 4.8 },
  { query: "What is agile methodology?", count: 389, avgRating: 4.7 },
  { query: "How to implement AI in business?", count: 312, avgRating: 4.9 },
  { query: "Data analytics best practices", count: 287, avgRating: 4.6 },
  { query: "Leadership skills for digital age", count: 234, avgRating: 4.8 },
];

const MOCK_USAGE_TRENDS = [
  { month: "Jan", interactions: 11234, cost: 168.51, satisfaction: 94 },
  { month: "Feb", interactions: 12876, cost: 193.14, satisfaction: 95 },
  { month: "Mar", interactions: 14123, cost: 211.85, satisfaction: 96 },
  { month: "Apr", interactions: 15678, cost: 234.56, satisfaction: 97 },
];

const MOCK_AI_MODELS = [
  { model: "GPT-4", usage: 67, cost: 156.78, avgTime: "1.6s", status: "active" },
  { model: "Claude 3", usage: 28, cost: 65.43, avgTime: "1.9s", status: "active" },
  { model: "GPT-3.5", usage: 5, cost: 12.35, avgTime: "1.2s", status: "backup" },
];

export const AIUsageMonitoringDashboard = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] leading-[28px] font-semibold text-foreground">AI Learning Analytics</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">Platform-wide AI usage, performance, and cost metrics</p>
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
          <div className="w-10 h-10 rounded-xl bg-[#ff6b4d]/10 flex items-center justify-center mb-3">
            <Bot className="w-5 h-5 text-[#ff6b4d]" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_AI_ANALYTICS.totalInteractions.toLocaleString()}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">AI Interactions</div>
          <div className="text-[11px] text-[#ff6b4d] font-medium mt-1">
            {MOCK_AI_ANALYTICS.activeUsers} active users
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_AI_ANALYTICS.successRate}%</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Success Rate</div>
          <div className="text-[11px] text-green-600 font-medium mt-1">
            Avg: {MOCK_AI_ANALYTICS.avgResponseTime}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">${MOCK_AI_ANALYTICS.totalCost.toFixed(2)}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Total Cost</div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">
            ${MOCK_AI_ANALYTICS.avgCostPerInteraction.toFixed(3)} per interaction
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-[22px] font-bold text-foreground">{MOCK_AI_ANALYTICS.coursesWithAI}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Courses with AI</div>
          <div className="text-[11px] text-purple-600 font-medium mt-1">
            {((MOCK_AI_ANALYTICS.coursesWithAI / MOCK_AI_ANALYTICS.totalCourses) * 100).toFixed(0)}% adoption
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course AI Usage */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-[16px] font-semibold text-foreground">AI Usage by Course</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Interactions, performance, and cost breakdown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Course</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Interactions</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Users</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Avg Time</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Satisfaction</th>
                  <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">Cost</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COURSE_AI_USAGE.map((course, idx) => (
                  <tr key={course.id} className={`border-t border-border hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-medium text-foreground max-w-[200px] truncate" title={course.courseName}>
                        {course.courseName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-foreground">
                      {course.interactions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground">
                      {course.users}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground">
                      {course.avgTime}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${course.satisfaction >= 95 ? 'bg-green-500' : course.satisfaction >= 90 ? 'bg-amber-400' : 'bg-red-400'}`} 
                            style={{ width: `${course.satisfaction}%` }} 
                          />
                        </div>
                        <span className="text-[12px] text-muted-foreground">{course.satisfaction}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-foreground">
                      ${course.cost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Features & Models */}
        <div className="space-y-6">
          {/* AI Features */}
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">AI Features Usage</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">By feature type</p>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_AI_FEATURES.map((feature) => (
                <div key={feature.feature}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-foreground">{feature.feature}</span>
                    <span className="text-[12px] font-medium text-muted-foreground">{feature.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#ff6b4d] rounded-full transition-all" 
                      style={{ width: `${feature.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{feature.usage.toLocaleString()} uses</span>
                    <span className="text-[11px] text-green-600 font-medium">{feature.avgSatisfaction}% satisfaction</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Models */}
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">AI Models</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Distribution & performance</p>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_AI_MODELS.map((model) => (
                <div key={model.model} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-foreground">{model.model}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        model.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {model.usage}% usage · {model.avgTime} avg
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-semibold text-foreground">${model.cost.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Queries */}
      <div className="bg-card rounded-2xl shadow-sm border border-border">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-[16px] font-semibold text-foreground">Most Common AI Queries</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">Top learner questions and satisfaction ratings</p>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {MOCK_COMMON_QUERIES.map((query, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center text-[#ff6b4d] font-bold text-[13px] flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-foreground truncate">{query.query}</div>
                    <div className="text-[11px] text-muted-foreground">{query.count} times asked</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[13px] font-semibold text-amber-500">{query.avgRating}</span>
                  <span className="text-amber-500">★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
        <h3 className="text-[16px] font-semibold text-foreground mb-4">AI System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-medium text-green-900">All AI Services Online</div>
              <div className="text-[11px] text-green-700">99.8% uptime this month</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-medium text-blue-900">Avg Response Time</div>
              <div className="text-[11px] text-blue-700">{MOCK_AI_ANALYTICS.avgResponseTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-medium text-amber-900">API Rate Limit</div>
              <div className="text-[11px] text-amber-700">65% capacity used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
