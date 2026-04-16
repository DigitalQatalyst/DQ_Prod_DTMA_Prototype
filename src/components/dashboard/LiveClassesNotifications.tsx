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
  ExternalLink
} from 'lucide-react';

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
      status: 'upcoming',
      meetingLink: 'https://meet.dtma.ae/workshop-123'
    },
    {
      id: '2',
      title: 'AI Implementation Best Practices',
      instructor: 'Sarah Johnson',
      date: '2024-03-27',
      time: '10:00 - 12:00 GST',
      participants: 38,
      maxParticipants: 40,
      status: 'upcoming',
      meetingLink: 'https://meet.dtma.ae/ai-session-456'
    },
    {
      id: '3',
      title: 'Leadership in Digital Age',
      instructor: 'Mohammed Hassan',
      date: '2024-03-28',
      time: '15:00 - 17:00 GST',
      participants: 52,
      maxParticipants: 60,
      status: 'upcoming',
      meetingLink: 'https://meet.dtma.ae/leadership-789'
    },
  ];

  const pastClasses = [
    {
      id: '1',
      title: 'Introduction to Digital Economy',
      instructor: 'Dr. Fatima Al-Zaabi',
      date: '2024-03-20',
      time: '14:00 - 16:00 GST',
      recording: 'https://recordings.dtma.ae/class-001',
      attended: true
    },
    {
      id: '2',
      title: 'Data Analytics Fundamentals',
      instructor: 'Omar Khalid',
      date: '2024-03-18',
      time: '10:00 - 12:00 GST',
      recording: 'https://recordings.dtma.ae/class-002',
      attended: false
    },
  ];

  const notifications = [
    {
      id: '1',
      type: 'class',
      icon: Video,
      title: 'Live class starting in 30 minutes',
      message: 'Digital Transformation Strategy Workshop',
      timestamp: '30 min',
      read: false,
      color: 'text-[#ff6b4d]'
    },
    {
      id: '2',
      type: 'achievement',
      icon: Award,
      title: 'New badge earned!',
      message: 'You earned the "Fast Learner" badge',
      timestamp: '2 hours ago',
      read: false,
      color: 'text-amber-500'
    },
    {
      id: '3',
      type: 'assignment',
      icon: AlertCircle,
      title: 'Assignment due soon',
      message: 'Digital Transformation Strategy Document due in 2 days',
      timestamp: '3 hours ago',
      read: false,
      color: 'text-red-500'
    },
    {
      id: '4',
      type: 'course',
      icon: BookOpen,
      title: 'New lesson available',
      message: 'Lesson 5: AI in Business Operations is now available',
      timestamp: '5 hours ago',
      read: true,
      color: 'text-[#1e2348]'
    },
    {
      id: '5',
      type: 'discussion',
      icon: MessageSquare,
      title: 'New reply to your question',
      message: 'Someone replied to your question in the Q&A forum',
      timestamp: '1 day ago',
      read: true,
      color: 'text-blue-500'
    },
    {
      id: '6',
      type: 'info',
      icon: Info,
      title: 'Course update',
      message: 'New resources added to Digital Economy Fundamentals',
      timestamp: '2 days ago',
      read: true,
      color: 'text-gray-500'
    },
  ];

  const getDaysUntil = (dateString: string) => {
    const classDate = new Date(dateString);
    const today = new Date();
    const diffTime = classDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
            <TabsTrigger value="past">Past Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingClasses.map((classItem) => (
              <Card key={classItem.id} className="p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-[#ff6b4d]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                          {classItem.title}
                        </h3>
                        <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                          with {classItem.instructor}
                        </p>
                      </div>
                      <Badge className="bg-[#1e2348] text-white" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        {getDaysUntil(classItem.date)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(classItem.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{classItem.participants}/{classItem.maxParticipants} enrolled</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        <Video className="w-4 h-4 mr-2" />
                        Join Class
                      </Button>
                      <Button variant="outline" className="hover:bg-[#FFE9E4] hover:text-[#ff6b4d] hover:border-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastClasses.map((classItem) => (
              <Card key={classItem.id} className="p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-gray-500" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                          {classItem.title}
                        </h3>
                        <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                          with {classItem.instructor}
                        </p>
                      </div>
                      {classItem.attended ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Attended
                        </Badge>
                      ) : (
                        <Badge variant="secondary" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                          Missed
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-muted-foreground mb-4" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(classItem.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {classItem.time}
                      </span>
                    </div>

                    <Button variant="outline" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch Recording
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Notifications Sidebar */}
      <div>
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
              <Bell className="w-5 h-5 text-[#ff6b4d]" />
              Notifications
            </h3>
            <Button variant="ghost" size="sm" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
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
                    className={`p-3 rounded-lg cursor-pointer transition-colors border-l-4 ${
                      notification.read 
                        ? 'bg-white border-gray-300' 
                        : 'bg-white border-[#ff6b4d] shadow-sm'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`mt-1 ${notification.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-medium text-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#ff6b4d] rounded-full shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-muted-foreground line-clamp-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                          {notification.message}
                        </p>
                        <p className="text-muted-foreground mt-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                          {notification.timestamp}
                        </p>
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
