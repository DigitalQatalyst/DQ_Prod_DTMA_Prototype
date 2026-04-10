import { Badge } from '@/components/ui/Badge';
import { MessageSquare, TrendingUp, Users, CheckCircle, Eye, MessageCircle, Award } from 'lucide-react';

export const WhatsAppAnalytics = () => {
  // Mock data - in production, this would come from API
  const metrics = {
    optInRate: 68,
    totalOptIns: 1247,
    messagesSent: 8934,
    messagesOpened: 7456,
    messagesInteracted: 5234,
    practiceResponses: 3421,
    avgCompletionImpact: 23,
  };

  const engagementData = [
    { course: 'Digital Transformation Fundamentals', optIns: 342, engagement: 87, completion: 72, completionIncrease: 18 },
    { course: 'AI & Automation in the Workplace', optIns: 219, engagement: 82, completion: 65, completionIncrease: 15 },
    { course: 'Data-Driven Decision Making', optIns: 187, engagement: 79, completion: 58, completionIncrease: 22 },
    { course: 'Leadership in the Digital Age', optIns: 154, engagement: 91, completion: 81, completionIncrease: 28 },
    { course: 'Agile Project Management', optIns: 203, engagement: 75, completion: 54, completionIncrease: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#25D366]" />
            WhatsApp Learning Analytics
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            Track engagement and impact of WhatsApp-based learning
          </p>
        </div>
        <Badge variant="outline" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
          REQ-ADM-06
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 rounded-xl border border-[#25D366]/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-[#25D366]" />
            <Badge className="bg-[#25D366] text-white text-[11px]">
              +12% this month
            </Badge>
          </div>
          <div className="text-[28px] font-bold text-foreground">{metrics.optInRate}%</div>
          <div className="text-[13px] text-muted-foreground">WhatsApp Opt-In Rate</div>
          <div className="text-[12px] text-muted-foreground mt-1">
            {metrics.totalOptIns.toLocaleString()} total opt-ins
          </div>
        </div>

        <div className="p-5 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <Badge variant="outline" className="text-[11px]">
              Last 30 days
            </Badge>
          </div>
          <div className="text-[28px] font-bold text-foreground">
            {metrics.messagesSent.toLocaleString()}
          </div>
          <div className="text-[13px] text-muted-foreground">Messages Sent</div>
          <div className="text-[12px] text-green-600 mt-1">
            ↑ {((metrics.messagesOpened / metrics.messagesSent) * 100).toFixed(1)}% opened
          </div>
        </div>

        <div className="p-5 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between mb-3">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <Badge variant="outline" className="text-[11px]">
              Engagement
            </Badge>
          </div>
          <div className="text-[28px] font-bold text-foreground">
            {metrics.messagesInteracted.toLocaleString()}
          </div>
          <div className="text-[13px] text-muted-foreground">Interactions</div>
          <div className="text-[12px] text-muted-foreground mt-1">
            {((metrics.messagesInteracted / metrics.messagesSent) * 100).toFixed(1)}% interaction rate
          </div>
        </div>

        <div className="p-5 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-amber-600" />
            <Badge variant="outline" className="text-[11px]">
              Impact
            </Badge>
          </div>
          <div className="text-[28px] font-bold text-foreground">+{metrics.avgCompletionImpact}%</div>
          <div className="text-[13px] text-muted-foreground">Completion Boost</div>
          <div className="text-[12px] text-green-600 mt-1">
            vs. non-WhatsApp learners
          </div>
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div className="p-6 bg-card rounded-2xl border border-border">
        <h4 className="text-[16px] font-semibold text-foreground mb-4">
          Message Engagement Funnel
        </h4>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-muted-foreground">Messages Sent</span>
              <span className="text-[14px] font-semibold">{metrics.messagesSent.toLocaleString()}</span>
            </div>
            <div className="h-3 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-[#25D366]" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-muted-foreground">Messages Opened</span>
              <span className="text-[14px] font-semibold">
                {metrics.messagesOpened.toLocaleString()} ({((metrics.messagesOpened / metrics.messagesSent) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-3 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${(metrics.messagesOpened / metrics.messagesSent) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-muted-foreground">Messages Interacted</span>
              <span className="text-[14px] font-semibold">
                {metrics.messagesInteracted.toLocaleString()} ({((metrics.messagesInteracted / metrics.messagesSent) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-3 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-purple-600" style={{ width: `${(metrics.messagesInteracted / metrics.messagesSent) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-muted-foreground">Practice Responses</span>
              <span className="text-[14px] font-semibold">
                {metrics.practiceResponses.toLocaleString()} ({((metrics.practiceResponses / metrics.messagesSent) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-3 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-amber-600" style={{ width: `${(metrics.practiceResponses / metrics.messagesSent) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Course-Level Performance */}
      <div className="p-6 bg-card rounded-2xl border border-border">
        <h4 className="text-[16px] font-semibold text-foreground mb-4">
          WhatsApp Impact by Course
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-[13px] font-semibold text-muted-foreground">Course</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-muted-foreground">Opt-Ins</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-muted-foreground">Engagement</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-muted-foreground">Completion</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-muted-foreground">Impact</th>
              </tr>
            </thead>
            <tbody>
              {engagementData.map((course, index) => (
                <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="py-3 px-4 text-[14px] text-foreground">{course.course}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="outline" className="text-[12px]">
                      {course.optIns}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-[#25D366]" style={{ width: `${course.engagement}%` }} />
                      </div>
                      <span className="text-[13px] font-medium">{course.engagement}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-[14px] font-medium">{course.completion}%</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className="bg-green-100 text-green-700 text-[12px]">
                      +{course.completionIncrease}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-[14px] font-semibold text-green-900 mb-1">Key Insight</h5>
              <p className="text-[13px] text-green-700">
                Courses with WhatsApp learning show an average 23% increase in completion rates compared to traditional delivery only.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-[14px] font-semibold text-blue-900 mb-1">Recommendation</h5>
              <p className="text-[13px] text-blue-700">
                Peak engagement occurs between 7-9 PM. Consider scheduling micro-learning messages during these hours for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
