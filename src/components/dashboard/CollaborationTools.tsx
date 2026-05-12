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
  CheckCheck
} from 'lucide-react';

export const CollaborationTools = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newReply, setNewReply] = useState('');
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
      hasAnswer: true
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
      hasAnswer: true
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
      hasAnswer: false
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
      lastActivity: '30 min ago'
    },
    {
      id: '2',
      title: 'AI implementation challenges and solutions',
      author: 'Layla Ibrahim',
      category: 'Technology',
      replies: 18,
      views: 203,
      lastActivity: '2 hours ago'
    },
    {
      id: '3',
      title: 'Digital leadership skills for the modern workplace',
      author: 'Omar Rashid',
      category: 'Leadership',
      replies: 31,
      views: 287,
      lastActivity: '4 hours ago'
    },
  ];

  const chatMessages = [
    {
      id: '1',
      sender: 'Instructor',
      message: 'Welcome everyone! Feel free to ask questions during the session.',
      timestamp: '10:00 AM',
      isInstructor: true
    },
    {
      id: '2',
      sender: 'Ahmed',
      message: 'Thank you! Excited to learn about digital transformation.',
      timestamp: '10:02 AM',
      isInstructor: false
    },
    {
      id: '3',
      sender: 'Fatima',
      message: 'Could you explain more about the Digital Economy dimension?',
      timestamp: '10:15 AM',
      isInstructor: false
    },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Tabs defaultValue="qna" className="space-y-6">
      <TabsList>
        <TabsTrigger value="qna">Q&A</TabsTrigger>
        <TabsTrigger value="forums">Discussion Forums</TabsTrigger>
        <TabsTrigger value="chat">Class Chat</TabsTrigger>
      </TabsList>

      {/* Q&A Tab */}
      <TabsContent value="qna" className="space-y-4">
        <Card className="p-6 border border-border">
          <h3 className="font-semibold mb-4 !text-[#1e2348]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
            Ask a Question
          </h3>
          <Textarea
            placeholder="What would you like to know?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="mb-4"
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
          />
          <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Post Question
          </Button>
        </Card>

        <div className="space-y-4">
          {qnaThreads.map((thread) => (
            <Card key={thread.id} className="p-6 hover:shadow-lg transition-shadow border border-border">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={thread.avatar || undefined} />
                  <AvatarFallback className="bg-[#1e2348] text-white">
                    {getInitials(thread.author)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                          {thread.author}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                          {thread.timestamp}
                        </span>
                        {thread.isPinned && (
                          <Badge className="bg-[#ff6b4d] text-white" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                            <Pin className="w-3 h-3 mr-1" />
                            Pinned
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium !text-[#1e2348]" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                        {thread.question}
                      </h4>
                    </div>
                    {thread.hasAnswer && (
                      <Badge className="bg-green-100 text-green-800 border-green-200" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        <CheckCheck className="w-3 h-3 mr-1" />
                        Answered
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <ThumbsUp className="w-4 h-4" />
                      {thread.likes}
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <MessageCircle className="w-4 h-4" />
                      {thread.replies} replies
                    </button>
                    <Button variant="ghost" size="sm" className="hover:bg-[#FFE9E4] hover:text-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      View Thread
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Forums Tab */}
      <TabsContent value="forums" className="space-y-4">
        <Card className="p-6 border border-border">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }} />
            </div>
            <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
              New Topic
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>All Topics</Badge>
            <Badge variant="outline" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Technology</Badge>
            <Badge variant="outline" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Leadership</Badge>
            <Badge variant="outline" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Industry Applications</Badge>
            <Badge variant="outline" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Best Practices</Badge>
          </div>
        </Card>

        <div className="space-y-3">
          {forumTopics.map((topic) => (
            <Card key={topic.id} className="p-5 hover:shadow-lg transition-shadow cursor-pointer border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                      {topic.category}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2 hover:text-[#ff6b4d] !text-[#1e2348]" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                    {topic.title}
                  </h4>
                  <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {topic.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {topic.replies} replies
                    </span>
                    <span>{topic.views} views</span>
                    <span>Last activity: {topic.lastActivity}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Chat Tab */}
      <TabsContent value="chat">
        <Card className="h-[600px] flex flex-col border border-border">
          <div className="p-4 border-b">
            <h3 className="font-semibold !text-[#1e2348]" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
              Digital Transformation Cohort - March 2024
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
              45 participants online
            </p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={msg.isInstructor ? 'bg-[#ff6b4d] text-white' : 'bg-[#1e2348] text-white'}>
                      {getInitials(msg.sender)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                        {msg.sender}
                      </span>
                      {msg.isInstructor && (
                        <Badge className="bg-[#ff6b4d] text-white" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                          Instructor
                        </Badge>
                      )}
                      <span className="text-muted-foreground" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="bg-white border border-gray-200 p-3 rounded-lg text-[#1e2348]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setChatMessage('');
                  }
                }}
                style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
              />
              <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
