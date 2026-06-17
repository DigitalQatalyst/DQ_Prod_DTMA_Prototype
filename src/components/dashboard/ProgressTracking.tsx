import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Clock,
  Target,
  Calendar,
  BookOpen,
  CheckCircle,
  BarChart3,
} from 'lucide-react';
import {
  learnerBadge,
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerIconWell,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface Note {
  id: string;
  lessonTitle: string;
  content: string;
  timestamp: string;
}

export const ProgressTracking = () => {
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 2 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 2.5 },
  ];

  const notes: Note[] = [
    {
      id: '1',
      lessonTitle: 'Introduction to Digital Economy & Economy 4.0',
      content: 'Key takeaway: Digital transformation requires both technological and cultural change.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      lessonTitle: 'Platform Economics & Network Effects',
      content: 'Platform business models create value through network effects and data leverage.',
      timestamp: '1 day ago',
    },
  ];

  const maxHours = Math.max(...weeklyProgress.map((d) => d.hours));

  const kpiCards = [
    { icon: Clock, iconClass: 'bg-blue-50 text-blue-600', value: '12.5h', label: 'This Week' },
    { icon: TrendingUp, iconClass: 'bg-orange-50 text-dq-orange', value: '85%', label: 'Avg. Score' },
    { icon: CheckCircle, iconClass: 'bg-green-50 text-green-600', value: '24', label: 'Lessons Done' },
    { icon: Target, iconClass: 'bg-amber-50 text-amber-600', value: '7', label: 'Day Streak' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {kpiCards.map(({ icon: Icon, iconClass, value, label }) => (
          <Card key={label} className={learnerKpiCard}>
            <div className={cn(learnerIconWell, 'mb-3 rounded-xl', iconClass)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className={learnerKpiValue}>{value}</div>
            <div className={learnerKpiLabel}>{label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className={cn(learnerPanel, 'p-6')}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className={cn(learnerSectionHeading, 'flex items-center gap-2')}>
              <BarChart3 className="h-5 w-5 text-dq-orange" />
              Weekly Activity
            </h3>
            <Badge variant="secondary" className={learnerBadge}>
              Last 7 days
            </Badge>
          </div>

          <div className="space-y-4">
            {weeklyProgress.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="w-12 text-sm font-medium text-dq-navy">{day.day}</span>
                <div className="flex-1">
                  <div className="h-8 overflow-hidden rounded-lg bg-gray-100">
                    <div
                      className="h-full rounded-lg bg-gradient-to-r from-dq-orange/80 to-dq-orange transition-all"
                      style={{ width: `${(day.hours / maxHours) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={cn(learnerBodyMuted, 'w-12 text-right')}>{day.hours}h</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className={cn(learnerPanel, 'p-6')}>
          <h3 className={cn(learnerSectionHeading, 'mb-6 flex items-center gap-2')}>
            <BookOpen className="h-5 w-5 text-dq-orange" />
            Course Progress
          </h3>

          <div className="space-y-6">
            {[
              { title: 'Introduction to Digital Economy & Economy 4.0', progress: 75, detail: '15 of 20 lessons completed' },
              { title: 'AI-Powered Business Transformation', progress: 45, detail: '9 of 20 lessons completed' },
              { title: 'Digital Leadership & Change Management', progress: 20, detail: '4 of 20 lessons completed' },
            ].map((course) => (
              <div key={course.title}>
                <div className="mb-2 flex justify-between gap-4">
                  <span className="text-sm font-medium text-dq-navy">{course.title}</span>
                  <span className={learnerBodyMuted}>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className={cn(learnerCaption, 'mt-1')}>{course.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className={cn(learnerPanel, 'p-6')}>
        <Tabs defaultValue="notes">
          <TabsList className="mb-6">
            <TabsTrigger value="notes" className="text-sm">
              My Notes
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-sm">
              Learning Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <h4 className="text-sm font-medium text-dq-navy">{note.lessonTitle}</h4>
                  <span className={learnerCaption}>{note.timestamp}</span>
                </div>
                <p className={learnerBody}>{note.content}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            {[
              { icon: TrendingUp, iconClass: 'bg-orange-50 text-dq-orange', title: 'Strong Performance', body: "You're in the top 20% of learners" },
              { icon: Calendar, iconClass: 'bg-amber-50 text-amber-600', title: 'Consistent Learner', body: '7-day learning streak! Keep it up' },
            ].map((insight) => (
              <div key={insight.title} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className={cn(learnerIconWell, insight.iconClass)}>
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className={learnerItemTitle}>{insight.title}</h4>
                    <p className={learnerBodyMuted}>{insight.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
