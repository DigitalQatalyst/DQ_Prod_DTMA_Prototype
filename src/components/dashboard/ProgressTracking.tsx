import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Calendar,
  BookOpen,
  CheckCircle,
  BarChart3
} from 'lucide-react';

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
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      lessonTitle: 'Platform Economics & Network Effects',
      content: 'Platform business models create value through network effects and data leverage.',
      timestamp: '1 day ago'
    },
  ];

  const maxHours = Math.max(...weeklyProgress.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#1e2348]/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#1e2348]" />
            </div>
          </div>
          <div className="font-bold" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}>
            12.5h
          </div>
          <div className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            This Week
          </div>
        </Card>

        <Card className="p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#ff6b4d]" />
            </div>
          </div>
          <div className="font-bold" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}>
            85%
          </div>
          <div className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            Avg. Score
          </div>
        </Card>

        <Card className="p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="font-bold" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}>
            24
          </div>
          <div className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            Lessons Done
          </div>
        </Card>

        <Card className="p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="font-bold" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}>
            7
          </div>
          <div className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            Day Streak
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
              <BarChart3 className="w-5 h-5 text-[#ff6b4d]" />
              Weekly Activity
            </h3>
            <Badge variant="secondary" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
              Last 7 days
            </Badge>
          </div>
          
          <div className="space-y-4">
            {weeklyProgress.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="font-medium w-12" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  {day.day}
                </span>
                <div className="flex-1">
                  <div className="h-8 bg-accent rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1e2348] to-[#ff6b4d] rounded-lg transition-all"
                      style={{ width: `${(day.hours / maxHours) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-muted-foreground w-12 text-right" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {day.hours}h
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Course Progress */}
        <Card className="p-6 border border-border">
          <h3 className="font-semibold mb-6 flex items-center gap-2" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
            <BookOpen className="w-5 h-5 text-[#ff6b4d]" />
            Course Progress
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  Introduction to Digital Economy & Economy 4.0
                </span>
                <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  75%
                </span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-muted-foreground mt-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                15 of 20 lessons completed
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  AI-Powered Business Transformation
                </span>
                <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  45%
                </span>
              </div>
              <Progress value={45} className="h-2" />
              <p className="text-muted-foreground mt-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                9 of 20 lessons completed
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  Digital Leadership & Change Management
                </span>
                <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  20%
                </span>
              </div>
              <Progress value={20} className="h-2" />
              <p className="text-muted-foreground mt-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                4 of 20 lessons completed
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notes & Insights */}
      <Card className="p-6 border border-border">
        <Tabs defaultValue="notes">
          <TabsList className="mb-6">
            <TabsTrigger value="notes">My Notes</TabsTrigger>
            <TabsTrigger value="insights">Learning Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 bg-white rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                    {note.lessonTitle}
                  </h4>
                  <span className="text-muted-foreground" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                    {note.timestamp}
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {note.content}
                </p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                    Strong Performance
                  </h4>
                  <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    You're in the top 20% of learners
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                    Consistent Learner
                  </h4>
                  <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    7-day learning streak! Keep it up
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
