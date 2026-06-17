import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Send,
  ThumbsUp,
  MessageCircle,
  Users,
  Search,
  Pin,
  CheckCheck,
} from 'lucide-react';
import {
  btnPrimary,
  learnerBadge,
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerItemTitle,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export const CollaborationTools = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  const qnaThreads = [
    {
      id: '1',
      author: 'Sarah Ahmed',
      avatar: null,
      question: 'How do I apply the 6XD framework to a small business?',
      timestamp: '2 hours ago',
      replies: 5,
      likes: 12,
      isPinned: true,
      hasAnswer: true,
    },
    {
      id: '2',
      author: 'Mohammed Ali',
      avatar: null,
      question: 'What are the key differences between digital transformation and digitalization?',
      timestamp: '5 hours ago',
      replies: 3,
      likes: 8,
      isPinned: false,
      hasAnswer: true,
    },
    {
      id: '3',
      author: 'Fatima Hassan',
      avatar: null,
      question: 'Can someone explain the role of AI in digital cognitive organizations?',
      timestamp: '1 day ago',
      replies: 7,
      likes: 15,
      isPinned: false,
      hasAnswer: false,
    },
  ];

  const forumTopics = [
    {
      id: '1',
      title: 'Best practices for digital transformation in healthcare',
      author: 'Dr. Ahmed Khan',
      category: 'Industry Applications',
      replies: 24,
      views: 156,
      lastActivity: '30 min ago',
    },
    {
      id: '2',
      title: 'AI implementation challenges and solutions',
      author: 'Layla Ibrahim',
      category: 'Technology',
      replies: 18,
      views: 203,
      lastActivity: '2 hours ago',
    },
    {
      id: '3',
      title: 'Digital leadership skills for the modern workplace',
      author: 'Omar Rashid',
      category: 'Leadership',
      replies: 31,
      views: 287,
      lastActivity: '4 hours ago',
    },
  ];

  const chatMessages = [
    {
      id: '1',
      sender: 'Instructor',
      message: 'Welcome everyone! Feel free to ask questions during the session.',
      timestamp: '10:00 AM',
      isInstructor: true,
    },
    {
      id: '2',
      sender: 'Ahmed',
      message: 'Thank you! Excited to learn about digital transformation.',
      timestamp: '10:02 AM',
      isInstructor: false,
    },
    {
      id: '3',
      sender: 'Fatima',
      message: 'Could you explain more about the Digital Economy dimension?',
      timestamp: '10:15 AM',
      isInstructor: false,
    },
  ];

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <Tabs defaultValue="qna" className="space-y-6">
      <TabsList>
        <TabsTrigger value="qna" className="text-sm">Q&A</TabsTrigger>
        <TabsTrigger value="forums" className="text-sm">Discussion Forums</TabsTrigger>
        <TabsTrigger value="chat" className="text-sm">Class Chat</TabsTrigger>
      </TabsList>

      <TabsContent value="qna" className="space-y-4">
        <Card className={cn(learnerPanel, 'p-6')}>
          <h3 className={cn(learnerSectionHeading, 'mb-4')}>Ask a Question</h3>
          <Textarea
            placeholder="What would you like to know?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="mb-4 text-sm"
          />
          <Button className={cn(btnPrimary, 'h-9 px-4 py-2 text-sm')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Post Question
          </Button>
        </Card>

        <div className="space-y-4">
          {qnaThreads.map((thread) => (
            <Card key={thread.id} className={cn(learnerPanel, 'p-6 transition-shadow hover:shadow-md')}>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={thread.avatar || undefined} />
                  <AvatarFallback className="bg-gray-100 text-dq-navy">
                    {getInitials(thread.author)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-dq-navy">{thread.author}</span>
                        <span className={learnerBodyMuted}>{thread.timestamp}</span>
                        {thread.isPinned && (
                          <Badge className={cn('bg-dq-orange text-white', learnerBadge)}>
                            <Pin className="mr-1 h-3 w-3" />
                            Pinned
                          </Badge>
                        )}
                      </div>
                      <h4 className={learnerItemTitle}>{thread.question}</h4>
                    </div>
                    {thread.hasAnswer && (
                      <Badge className={cn('border-green-200 bg-green-100 text-green-800', learnerBadge)}>
                        <CheckCheck className="mr-1 h-3 w-3" />
                        Answered
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-6">
                    <button type="button" className={cn(learnerBodyMuted, 'flex items-center gap-2 hover:text-dq-orange')}>
                      <ThumbsUp className="h-4 w-4" />
                      {thread.likes}
                    </button>
                    <button type="button" className={cn(learnerBodyMuted, 'flex items-center gap-2 hover:text-dq-orange')}>
                      <MessageCircle className="h-4 w-4" />
                      {thread.replies} replies
                    </button>
                    <Button variant="ghost" size="sm" className="text-sm hover:text-dq-orange">
                      View Thread
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="forums" className="space-y-4">
        <Card className={cn(learnerPanel, 'p-6')}>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search discussions..." className="pl-10 text-sm" />
            </div>
            <Button className={cn(btnPrimary, 'h-9 px-4 py-2 text-sm')}>New Topic</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All Topics', 'Technology', 'Leadership', 'Industry Applications', 'Best Practices'].map(
              (label, index) => (
                <Badge key={label} variant={index === 0 ? 'secondary' : 'outline'} className={learnerBadge}>
                  {label}
                </Badge>
              )
            )}
          </div>
        </Card>

        <div className="space-y-3">
          {forumTopics.map((topic) => (
            <Card key={topic.id} className={cn(learnerPanel, 'cursor-pointer p-5 transition-shadow hover:shadow-md')}>
              <Badge variant="secondary" className={cn('mb-2', learnerBadge)}>
                {topic.category}
              </Badge>
              <h4 className={cn(learnerItemTitle, 'mb-2 hover:text-dq-orange')}>{topic.title}</h4>
              <div className={cn(learnerBodyMuted, 'flex flex-wrap items-center gap-4')}>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {topic.author}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {topic.replies} replies
                </span>
                <span>{topic.views} views</span>
                <span>Last activity: {topic.lastActivity}</span>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="chat">
        <Card className={cn(learnerPanel, 'flex h-[600px] flex-col')}>
          <div className="border-b border-gray-200 p-4">
            <h3 className={learnerCardTitle}>Digital Transformation Cohort - March 2024</h3>
            <p className={learnerBodyMuted}>45 participants online</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className={msg.isInstructor ? 'bg-dq-orange text-white' : 'bg-gray-100 text-dq-navy'}
                    >
                      {getInitials(msg.sender)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-dq-navy">{msg.sender}</span>
                      {msg.isInstructor && (
                        <Badge className={cn('bg-dq-orange text-white', learnerBadge)}>Instructor</Badge>
                      )}
                      <span className={learnerCaption}>{msg.timestamp}</span>
                    </div>
                    <p className={cn(learnerBody, 'rounded-lg border border-gray-200 bg-white p-3 text-dq-navy')}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') setChatMessage('');
                }}
                className="text-sm"
              />
              <Button className={cn(btnPrimary, 'h-9 w-9 shrink-0 p-0')}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
