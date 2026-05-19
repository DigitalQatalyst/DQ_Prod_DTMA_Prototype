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
          <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-text-primary)]">AI Learning Analytics</h2>
          <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)] mt-1">Platform-wide AI usage, performance, and cost metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--dq-surface-border-default)]">
          <div className="w-12 h-12 rounded-xl bg-[var(--dq-orange-50)] flex items-center justify-center mb-3">
            <Bot className="w-6 h-6 text-[var(--dq-orange-500)]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-text-primary)]">{MOCK_AI_ANALYTICS.totalInteractions.toLocaleString()}</div>
          <div className="text-[13px] text-[var(--dq-text-secondary)] mt-1">AI Interactions</div>
          <div className="text-[12px] text-[var(--dq-orange-500)] font-medium mt-2">
            {MOCK_AI_ANALYTICS.activeUsers} active users
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--dq-surface-border-default)]">
          <div className="w-12 h-12 rounded-xl bg-[var(--dq-success-surface)] flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-[var(--dq-success)]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-text-primary)]">{MOCK_AI_ANALYTICS.successRate}%</div>
          <div className="text-[13px] text-[var(--dq-text-secondary)] mt-1">Success Rate</div>
          <div className="text-[12px] text-[var(--dq-success)] font-medium mt-2">
            Avg: {MOCK_AI_ANALYTICS.avgResponseTime}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--dq-surface-border-default)]">
          <div className="w-12 h-12 rounded-xl bg-[var(--dq-gray-100)] flex items-center justify-center mb-3">
            <DollarSign className="w-6 h-6 text-[var(--dq-text-primary)]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-text-primary)]">${MOCK_AI_ANALYTICS.totalCost.toFixed(2)}</div>
          <div className="text-[13px] text-[var(--dq-text-secondary)] mt-1">Total Cost</div>
          <div className="text-[12px] text-[var(--dq-text-primary)] font-medium mt-2">
            ${MOCK_AI_ANALYTICS.avgCostPerInteraction.toFixed(3)} per interaction
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--dq-surface-border-default)]">
          <div className="w-12 h-12 rounded-xl bg-[var(--dq-orange-50)] flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-[var(--dq-orange-500)]" />
          </div>
          <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-text-primary)]">{MOCK_AI_ANALYTICS.coursesWithAI}</div>
          <div className="text-[13px] text-[var(--dq-text-secondary)] mt-1">Courses with AI</div>
          <div className="text-[12px] text-[var(--dq-orange-500)] font-medium mt-2">
            {((MOCK_AI_ANALYTICS.coursesWithAI / MOCK_AI_ANALYTICS.totalCourses) * 100).toFixed(0)}% adoption
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course AI Usage */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[var(--dq-surface-border-default)] overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--dq-surface-border-default)]">
            <h3 className="text-[18px] font-semibold text-[var(--dq-text-primary)]">AI Usage by Course</h3>
            <p className="text-[13px] text-[var(--dq-text-secondary)] mt-1">Interactions, performance, and cost breakdown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--dq-navy-950)]">
                <tr>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Course</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Interactions</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Users</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Avg Time</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Satisfaction</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Cost</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COURSE_AI_USAGE.map((course, idx) => (
                  <tr key={course.id} className={`border-t border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[var(--dq-gray-50)]'}`}>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-medium text-[var(--dq-text-primary)] max-w-[200px] truncate" title={course.courseName}>
                        {course.courseName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-[var(--dq-text-primary)]">
                      {course.interactions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)]">
                      {course.users}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)]">
                      {course.avgTime}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-[var(--dq-surface-border-default)] overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${course.satisfaction >= 95 ? 'bg-[var(--dq-success)]' : course.satisfaction >= 90 ? 'bg-[var(--dq-warning)]' : 'bg-[var(--dq-error)]'}`} 
                            style={{ width: `${course.satisfaction}%` }} 
                          />
                        </div>
                        <span className="text-[12px] text-[var(--dq-text-secondary)] font-medium">{course.satisfaction}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-[var(--dq-text-primary)]">
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
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--dq-surface-border-default)]">
            <div className="px-5 py-4 border-b border-[var(--dq-surface-border-default)]">
              <h3 className="text-[18px] font-semibold text-[var(--dq-text-primary)]">AI Features Usage</h3>
              <p className="text-[13px] text-[var(--dq-text-secondary)] mt-1">By feature type</p>
            </div>
            <div className="p-5 space-y-4">
              {MOCK_AI_FEATURES.map((feature) => (
                <div key={feature.feature}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[var(--dq-text-primary)] font-medium">{feature.feature}</span>
                    <span className="text-[13px] font-semibold text-[var(--dq-orange-500)]">{feature.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--dq-surface-border-default)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--dq-orange-500)] rounded-full transition-all" 
                      style={{ width: `${feature.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[12px] text-[var(--dq-text-disabled)]">{feature.usage.toLocaleString()} uses</span>
                    <span className="text-[12px] text-[var(--dq-success)] font-medium">{feature.avgSatisfaction}% satisfaction</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Models */}
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--dq-surface-border-default)]">
            <div className="px-5 py-4 border-b border-[var(--dq-surface-border-default)]">
              <h3 className="text-[18px] font-semibold text-[var(--dq-text-primary)]">AI Models</h3>
              <p className="text-[13px] text-[var(--dq-text-secondary)] mt-1">Distribution & performance</p>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_AI_MODELS.map((model) => (
                <div key={model.model} className="flex items-center justify-between p-3 rounded-lg bg-[var(--dq-gray-50)] border border-[var(--dq-surface-border-default)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-[var(--dq-text-primary)]">{model.model}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        model.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' : 'bg-[var(--dq-gray-100)] text-[var(--dq-text-secondary)]'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--dq-text-disabled)] mt-0.5">
                      {model.usage}% usage · {model.avgTime} avg
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-semibold text-[var(--dq-text-primary)]">${model.cost.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Queries */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--dq-surface-border-default)]">
        <div className="px-6 py-5 border-b border-[var(--dq-surface-border-default)]">
          <h3 className="text-[18px] font-semibold text-[var(--dq-text-primary)]">Most Common AI Queries</h3>
          <p className="text-[13px] text-[var(--dq-text-secondary)] mt-1">Top learner questions and satisfaction ratings</p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {MOCK_COMMON_QUERIES.map((query, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--dq-gray-50)] transition-colors border border-[var(--dq-surface-border-default)]">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-9 h-9 rounded-full bg-[var(--dq-orange-50)] flex items-center justify-center text-[var(--dq-orange-500)] font-bold text-[14px] flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-[var(--dq-text-primary)] truncate">{query.query}</div>
                    <div className="text-[12px] text-[var(--dq-text-disabled)]">{query.count} times asked</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[14px] font-semibold text-[var(--dq-warning)]">{query.avgRating}</span>
                  <span className="text-[var(--dq-warning)]">★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--dq-surface-border-default)]">
        <h3 className="text-[18px] font-semibold text-[var(--dq-text-primary)] mb-5">AI System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--dq-success-surface)] border border-[var(--dq-success)]">
            <CheckCircle className="w-5 h-5 text-[var(--dq-success)] flex-shrink-0" />
            <div>
              <div className="text-[14px] font-semibold text-[var(--dq-success-text)]">All AI Services Online</div>
              <div className="text-[12px] text-[var(--dq-success-text)] mt-0.5">99.8% uptime this month</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--dq-gray-100)] border border-[var(--dq-surface-border-default)]">
            <Clock className="w-5 h-5 text-[var(--dq-text-primary)] flex-shrink-0" />
            <div>
              <div className="text-[14px] font-semibold text-[var(--dq-text-primary)]">Avg Response Time</div>
              <div className="text-[12px] text-[var(--dq-text-secondary)] mt-0.5">{MOCK_AI_ANALYTICS.avgResponseTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--dq-warning-surface)] border border-[var(--dq-warning)]">
            <AlertTriangle className="w-5 h-5 text-[var(--dq-warning)] flex-shrink-0" />
            <div>
              <div className="text-[14px] font-semibold text-[var(--dq-warning-text)]">API Rate Limit</div>
              <div className="text-[12px] text-[var(--dq-warning-text)] mt-0.5">65% capacity used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
