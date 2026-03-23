import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Minimize2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'butler';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  links?: { text: string; url: string }[];
}

const quickActions = [
  { icon: BookOpen, text: 'Explore Courses', action: 'courses' },
  { icon: Sparkles, text: 'What is 6XD?', action: '6xd' },
  { icon: Users, text: 'Meet Faculty', action: 'faculty' },
  { icon: Award, text: 'Get Started', action: 'signup' },
];

const butlerResponses: Record<string, { message: string; suggestions?: string[]; links?: { text: string; url: string }[] }> = {
  greeting: {
    message: "Hello! I'm Butler, your DTMA AI concierge. I'm here to help you navigate your digital transformation journey. How can I assist you today?",
    suggestions: ['What is DTMA?', 'Tell me about 6XD', 'Show me courses', 'How do I get started?']
  },
  dtma: {
    message: "DTMA (Digital Transformation Management Academy) is the UAE's premier institution for digital transformation education. We offer KHDA-attested courses that prepare professionals for the digital economy through our comprehensive 6XD framework.",
    suggestions: ['What is 6XD?', 'View courses', 'Meet our faculty'],
    links: [{ text: 'Learn More About DTMA', url: '/about' }]
  },
  '6xd': {
    message: "The 6XD Framework is our comprehensive approach to digital transformation, covering six critical dimensions:\n\n1. Digital Economy\n2. Digital Cognitive Organisation\n3. Digital Business Platform\n4. Digital Transformation 2.0\n5. Digital Worker & Workspace\n6. Digital Accelerators\n\nEach dimension addresses key aspects of organizational digital transformation.",
    suggestions: ['Explore 6XD in detail', 'See related courses', 'Talk to an advisor'],
    links: [{ text: 'Explore the 6XD Framework', url: '/6xd' }]
  },
  courses: {
    message: "We offer 31+ digital transformation courses across all 6XD dimensions. Our courses are designed for three personas:\n\n• Digital Workers - Frontline professionals\n• Transformation Specialists - Change agents\n• Organizational Leaders - Strategic decision-makers\n\nAll courses award KHDA-attested certificates.",
    suggestions: ['Browse all courses', 'Filter by level', 'View learning paths'],
    links: [{ text: 'Browse Course Catalog', url: '/courses' }]
  },
  faculty: {
    message: "Our faculty combines Human Intelligence and AI expertise. We have distinguished professors, industry experts, and AI-powered instructors who bring real-world experience in digital transformation, AI, and organizational change.",
    suggestions: ['Meet our faculty', 'View course instructors', 'Book a consultation'],
    links: [{ text: 'Meet Our Faculty', url: '/faculty' }]
  },
  signup: {
    message: "Getting started with DTMA is easy! Here's how:\n\n1. Create your free account\n2. Complete your learner profile\n3. Choose your learning path\n4. Enroll in courses\n5. Start learning!\n\nYou'll get access to our learning platform, certificates, and community.",
    suggestions: ['Create account now', 'View pricing', 'Talk to admissions'],
    links: [
      { text: 'Sign Up Free', url: '/auth?mode=signup' },
      { text: 'Explore Courses First', url: '/courses' }
    ]
  },
  credentials: {
    message: "All DTMA courses award KHDA-attested certificates recognized across the UAE and internationally. Upon completion, you'll receive:\n\n• Digital certificate with unique ID\n• Shareable credentials\n• LinkedIn integration\n• Transcript of learning\n\nOur certificates demonstrate your expertise in digital transformation.",
    suggestions: ['View sample certificate', 'See course requirements', 'Start learning'],
  },
  help: {
    message: "I can help you with:\n\n• Understanding DTMA and our mission\n• Exploring the 6XD framework\n• Finding the right courses\n• Meeting our faculty\n• Getting started with enrollment\n• Learning about certificates\n\nWhat would you like to know?",
    suggestions: ['What is DTMA?', 'Show me courses', 'How do I enroll?', 'Tell me about 6XD']
  }
};

export const ButlerAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'butler',
      content: butlerResponses.greeting.message,
      timestamp: new Date(),
      suggestions: butlerResponses.greeting.suggestions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const getButlerResponse = (userMessage: string): { message: string; suggestions?: string[]; links?: { text: string; url: string }[] } => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('dtma') || lowerMessage.includes('what is') || lowerMessage.includes('about')) {
      return butlerResponses.dtma;
    }
    if (lowerMessage.includes('6xd') || lowerMessage.includes('framework') || lowerMessage.includes('dimension')) {
      return butlerResponses['6xd'];
    }
    if (lowerMessage.includes('course') || lowerMessage.includes('learn') || lowerMessage.includes('class')) {
      return butlerResponses.courses;
    }
    if (lowerMessage.includes('faculty') || lowerMessage.includes('instructor') || lowerMessage.includes('teacher') || lowerMessage.includes('professor')) {
      return butlerResponses.faculty;
    }
    if (lowerMessage.includes('start') || lowerMessage.includes('enroll') || lowerMessage.includes('sign up') || lowerMessage.includes('register') || lowerMessage.includes('join')) {
      return butlerResponses.signup;
    }
    if (lowerMessage.includes('certificate') || lowerMessage.includes('credential') || lowerMessage.includes('khda')) {
      return butlerResponses.credentials;
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
      return butlerResponses.help;
    }

    return {
      message: "I'd be happy to help! I can tell you about DTMA, our 6XD framework, courses, faculty, or how to get started. What interests you most?",
      suggestions: ['What is DTMA?', 'Tell me about 6XD', 'Show me courses', 'How do I get started?']
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const response = getButlerResponse(inputValue);
      const butlerMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'butler',
        content: response.message,
        timestamp: new Date(),
        suggestions: response.suggestions,
        links: response.links
      };
      setMessages(prev => [...prev, butlerMessage]);
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      courses: 'Show me the courses',
      '6xd': 'Tell me about the 6XD framework',
      faculty: 'I want to meet the faculty',
      signup: 'How do I get started?'
    };
    setInputValue(actionMessages[action] || action);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[#1e2348] to-[#2a3058] text-white rounded-full shadow-2xl hover:shadow-[#ff6b4d]/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6b4d] rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e2348] to-[#2a3058] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-[#ff6b4d]">
              <AvatarFallback className="bg-[#ff6b4d] text-white">
                <Sparkles className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">Butler AI</h3>
              <p className="text-xs text-white/70">DTMA Concierge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Minimize2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="p-4 bg-gray-50 border-b grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-[#ff6b4d]/10 hover:border-[#ff6b4d] border border-transparent transition-all text-sm"
                >
                  <action.icon className="w-4 h-4 text-[#ff6b4d]" />
                  <span className="text-gray-700">{action.text}</span>
                </button>
              ))}
            </div>

            {/* Messages */}
            <ScrollArea className="h-[380px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'butler' && (
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarFallback className="bg-[#1e2348] text-white">
                            <Sparkles className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          message.type === 'user'
                            ? 'bg-[#ff6b4d] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        {message.links && message.links.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.links.map((link, idx) => (
                              <Link
                                key={idx}
                                to={link.url}
                                className="flex items-center gap-2 text-sm text-[#ff6b4d] hover:underline"
                                onClick={() => setIsOpen(false)}
                              >
                                <ArrowRight className="w-3 h-3" />
                                {link.text}
                              </Link>
                            ))}
                          </div>
                        )}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs px-3 py-1 bg-white border border-[#ff6b4d] text-[#ff6b4d] rounded-full hover:bg-[#ff6b4d] hover:text-white transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by DTMA AI • Always here to help
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
