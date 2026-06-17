import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Award,
  BookOpen,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import {
  btnPrimary,
  learnerBadge,
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerIconWell,
  learnerItemTitle,
  learnerPanel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export const LiveClassesNotifications = () => {
  const upcomingClasses = [
    {
      id: '1',
      title: 'Digital Transformation Strategy Workshop',
      instructor: 'Dr. Ahmed Al-Mansoori',
      date: '2024-03-25',
      time: '14:00 - 16:00 GST',
      participants: 45,
      maxParticipants: 50,
    },
    {
      id: '2',
      title: 'AI Implementation Best Practices',
      instructor: 'Sarah Johnson',
      date: '2024-03-27',
      time: '10:00 - 12:00 GST',
      participants: 38,
      maxParticipants: 40,
    },
    {
      id: '3',
      title: 'Leadership in Digital Age',
      instructor: 'Mohammed Hassan',
      date: '2024-03-28',
      time: '15:00 - 17:00 GST',
      participants: 52,
      maxParticipants: 60,
    },
  ];

  const pastClasses = [
    {
      id: '1',
      title: 'Introduction to Digital Economy',
      instructor: 'Dr. Fatima Al-Zaabi',
      date: '2024-03-20',
      time: '14:00 - 16:00 GST',
      attended: true,
    },
    {
      id: '2',
      title: 'Data Analytics Fundamentals',
      instructor: 'Omar Khalid',
      date: '2024-03-18',
      time: '10:00 - 12:00 GST',
      attended: false,
    },
  ];

  const notifications = [
    { id: '1', icon: Video, title: 'Live class starting in 30 minutes', message: 'Digital Transformation Strategy Workshop', timestamp: '30 min', read: false, color: 'text-dq-orange' },
    { id: '2', icon: Award, title: 'New badge earned!', message: 'You earned the "Fast Learner" badge', timestamp: '2 hours ago', read: false, color: 'text-amber-500' },
    { id: '3', icon: AlertCircle, title: 'Assignment due soon', message: 'Digital Transformation Strategy Document due in 2 days', timestamp: '3 hours ago', read: false, color: 'text-red-500' },
    { id: '4', icon: BookOpen, title: 'New lesson available', message: 'Lesson 5: AI in Business Operations is now available', timestamp: '5 hours ago', read: true, color: 'text-dq-navy' },
    { id: '5', icon: MessageSquare, title: 'New reply to your question', message: 'Someone replied to your question in the Q&A forum', timestamp: '1 day ago', read: true, color: 'text-blue-500' },
    { id: '6', icon: Info, title: 'Course update', message: 'New resources added to Digital Economy Fundamentals', timestamp: '2 days ago', read: true, color: 'text-gray-500' },
  ];

  const getDaysUntil = (dateString: string) => {
    const classDate = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((classDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming" className="text-sm">Upcoming Classes</TabsTrigger>
            <TabsTrigger value="past" className="text-sm">Past Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {upcomingClasses.map((classItem) => (
              <Card key={classItem.id} className={cn(learnerPanel, 'p-6')}>
                <div className="flex items-start gap-4">
                  <div className={cn(learnerIconWell, 'h-12 w-12 rounded-xl bg-orange-50 text-dq-orange')}>
                    <Video className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className={cn(learnerCardTitle, 'mb-1')}>{classItem.title}</h3>
                        <p className={learnerBodyMuted}>with {classItem.instructor}</p>
                      </div>
                      <Badge className={cn('border border-gray-200 bg-gray-100 text-dq-navy', learnerBadge)}>
                        {getDaysUntil(classItem.date)}
                      </Badge>
                    </div>

                    <div className={cn(learnerBodyMuted, 'mb-4 grid gap-4 md:grid-cols-3')}>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(classItem.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {classItem.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {classItem.participants}/{classItem.maxParticipants} enrolled
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button className={cn(btnPrimary, 'h-9 px-4 py-2 text-sm')}>
                        <Video className="mr-2 h-4 w-4" />
                        Join Class
                      </Button>
                      <Button variant="outline" className="text-sm hover:border-dq-orange hover:text-dq-orange">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-4">
            {pastClasses.map((classItem) => (
              <Card key={classItem.id} className={cn(learnerPanel, 'p-6')}>
                <div className="flex items-start gap-4">
                  <div className={cn(learnerIconWell, 'h-12 w-12 rounded-xl bg-gray-100 text-gray-500')}>
                    <Video className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className={cn(learnerCardTitle, 'mb-1')}>{classItem.title}</h3>
                        <p className={learnerBodyMuted}>with {classItem.instructor}</p>
                      </div>
                      {classItem.attended ? (
                        <Badge className={cn('border-green-200 bg-green-100 text-green-800', learnerBadge)}>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Attended
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className={learnerBadge}>Missed</Badge>
                      )}
                    </div>

                    <div className={cn(learnerBodyMuted, 'mb-4 flex flex-wrap items-center gap-4')}>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(classItem.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {classItem.time}
                      </span>
                    </div>

                    <Button variant="outline" className="text-sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch Recording
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <Card className={cn(learnerPanel, 'p-4')}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className={cn(learnerItemTitle, 'flex items-center gap-2')}>
              <Bell className="h-5 w-5 text-dq-orange" />
              Notifications
            </h3>
            <Button variant="ghost" size="sm" className="text-sm">
              Mark all read
            </Button>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'cursor-pointer rounded-lg border-l-4 bg-white p-3 transition-colors',
                      notification.read ? 'border-gray-300' : 'border-dq-orange shadow-sm'
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn('mt-1', notification.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-dq-navy">{notification.title}</h4>
                          {!notification.read && (
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-dq-orange" />
                          )}
                        </div>
                        <p className={cn(learnerBodyMuted, 'line-clamp-2')}>{notification.message}</p>
                        <p className={cn(learnerCaption, 'mt-1')}>{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};
