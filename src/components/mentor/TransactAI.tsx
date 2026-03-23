import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  X, 
  Send, 
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  Award,
  BookOpen,
  Zap,
  Calendar,
  Minimize2,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'mentor';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  insights?: { icon: any; text: string; color: string }[];
}

interface TransactAIProps {
  enrolledCourses?: number;
  completedCourses?: number;
  averageProgress?: number;
  learningGoal?: string;
  skillLevel?: string;
  streak?: number;
}

const quickInsights = [
  { icon: TrendingUp, text: 'Progress Check', action: 'progress', color: 'text-green-600' },
  { icon: Target, text: 'Set Goals', action: 'goals', color: 'text-blue-600' },
  { icon: Lightbulb, text: 'Get Advice', action: 'advice', color: 'text-amber-600' },
  { icon: BookOpen, text: 'Next Steps', action: 'nextsteps', color: 'text-[#ff6b4d]' },
];

export const TransactAI = ({ 
  enrolledCourses = 0, 
  completedCourses = 0, 
  averageProgress = 0,
  learningGoal = '',
  skillLevel = 'Beginner',
  streak = 0
}: TransactAIProps) => {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  useEffect(() => {
    // Initialize with personalized greeting
    const greeting = getPersonalizedGreeting();
    setMessages([{
      id: '1',
      type: 'mentor',
      content: greeting.message,
      timestamp: new Date(),
      suggestions: greeting.suggestions,
      insights: greeting.insights
    }]);
  }, []);

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

  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    let message = `${timeGreeting}, ${firstName}! 👋\n\n`;
    const insights: { icon: any; text: string; color: string }[] = [];

    if (enrolledCourses === 0) {
      message += "I'm Transact, your personal AI mentor. I'm here to guide you through your digital transformation journey. Let's start by exploring some courses that match your goals!";
      return {
        message,
        suggestions: ['Recommend courses', 'Explain 6XD journey', 'Set learning goals', 'Show me around'],
        insights: []
      };
    }

    message += `I'm Transact, your AI mentor. Here's your learning snapshot:\n\n`;
    
    if (streak > 0) {
      insights.push({ icon: Zap, text: `${streak}-day learning streak!`, color: 'text-amber-600' });
      message += `🔥 Amazing! You're on a ${streak}-day streak!\n`;
    }

    if (averageProgress > 0) {
      insights.push({ icon: TrendingUp, text: `${averageProgress}% average progress`, color: 'text-green-600' });
      message += `📈 You're ${averageProgress}% through your active courses.\n`;
    }

    if (completedCourses > 0) {
      insights.push({ icon: Award, text: `${completedCourses} courses completed`, color: 'text-blue-600' });
      message += `🎓 ${completedCourses} course${completedCourses > 1 ? 's' : ''} completed!\n`;
    }

    message += `\nHow can I help you today?`;

    return {
      message,
      suggestions: ['Review my progress', 'What should I learn next?', 'Career guidance', 'Motivate me!'],
      insights
    };
  };

  const getMentorResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Progress and analytics
    if (lowerMessage.includes('progress') || lowerMessage.includes('how am i doing') || lowerMessage.includes('review')) {
      let message = `Let me analyze your learning journey, ${firstName}:\n\n`;
      
      if (enrolledCourses > 0) {
        message += `📚 Active Courses: ${enrolledCourses}\n`;
        message += `✅ Completed: ${completedCourses}\n`;
        message += `📊 Average Progress: ${averageProgress}%\n\n`;

        if (averageProgress >= 75) {
          message += `Excellent work! You're making outstanding progress. Keep this momentum going!`;
        } else if (averageProgress >= 50) {
          message += `You're doing great! You're past the halfway mark. Let's push forward to completion!`;
        } else if (averageProgress >= 25) {
          message += `Good start! You're building momentum. Try to dedicate 30 minutes daily to accelerate your progress.`;
        } else {
          message += `Let's get you back on track! I recommend setting aside specific times for learning each day.`;
        }
      } else {
        message += `You haven't enrolled in any courses yet. Let's find the perfect courses to start your digital transformation journey!`;
      }

      return {
        message,
        suggestions: ['Recommend next course', 'Set weekly goals', 'View learning plan', 'Get study tips'],
        insights: [
          { icon: Target, text: 'Stay focused on your goals', color: 'text-blue-600' },
          { icon: Calendar, text: 'Consistency is key', color: 'text-green-600' }
        ]
      };
    }

    // Course recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('next') || lowerMessage.includes('what should i learn')) {
      let message = `Based on your profile and progress, here are my recommendations:\n\n`;

      if (skillLevel === 'Beginner') {
        message += `🎯 Start with fundamentals:\n`;
        message += `• Introduction to Digital Economy & Economy 4.0\n`;
        message += `• Digital Transformation Basics\n`;
        message += `• Platform Economics & Network Effects\n\n`;
        message += `These courses will build a strong foundation for your digital transformation journey.`;
      } else if (skillLevel === 'Intermediate') {
        message += `🚀 Level up your skills:\n`;
        message += `• AI-Powered Business Transformation\n`;
        message += `• Digital Leadership & Change Management\n`;
        message += `• Data-Driven Decision Making\n\n`;
        message += `These courses will deepen your expertise and prepare you for advanced topics.`;
      } else {
        message += `💎 Advanced mastery:\n`;
        message += `• Digital Transformation Strategy\n`;
        message += `• Enterprise AI Implementation\n`;
        message += `• Leading Digital Organizations\n\n`;
        message += `These courses will position you as a digital transformation leader.`;
      }

      return {
        message,
        suggestions: ['Browse all courses', 'Explain 6XD path', 'View my learning style', 'Career roadmap'],
        insights: [
          { icon: BookOpen, text: 'Personalized for you', color: 'text-[#ff6b4d]' },
          { icon: TrendingUp, text: 'Aligned with your goals', color: 'text-green-600' }
        ]
      };
    }

    // 6XD Journey guidance
    if (lowerMessage.includes('6xd') || lowerMessage.includes('journey') || lowerMessage.includes('path')) {
      const message = `The 6XD Framework is your roadmap to digital transformation mastery:\n\n` +
        `1️⃣ Digital Economy - Understanding the digital landscape\n` +
        `2️⃣ Digital Cognitive Organisation - Smart, data-driven operations\n` +
        `3️⃣ Digital Business Platform - Technology infrastructure\n` +
        `4️⃣ Digital Transformation 2.0 - Advanced transformation strategies\n` +
        `5️⃣ Digital Worker & Workspace - Future of work\n` +
        `6️⃣ Digital Accelerators - AI, IoT, and emerging tech\n\n` +
        `I recommend progressing through these dimensions systematically for comprehensive expertise.`;

      return {
        message,
        suggestions: ['Show dimension courses', 'My current dimension', 'Create learning path', 'Explore 6XD'],
        insights: [
          { icon: Target, text: 'Structured learning path', color: 'text-blue-600' },
          { icon: Award, text: 'Complete mastery', color: 'text-amber-600' }
        ]
      };
    }

    // Career guidance
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('professional')) {
      const message = `Let's talk about your career in digital transformation:\n\n` +
        `Based on your learning, you're building skills for:\n` +
        `• Digital Transformation Specialist\n` +
        `• Change Management Leader\n` +
        `• Digital Strategy Consultant\n` +
        `• Innovation Manager\n\n` +
        `Your KHDA-attested certificates will validate your expertise to employers across the UAE and internationally.\n\n` +
        `Keep learning, and you'll be ready for exciting opportunities!`;

      return {
        message,
        suggestions: ['View career paths', 'Required skills', 'Industry trends', 'Network with alumni'],
        insights: [
          { icon: TrendingUp, text: 'High-demand skills', color: 'text-green-600' },
          { icon: Award, text: 'Recognized credentials', color: 'text-blue-600' }
        ]
      };
    }

    // Motivation and encouragement
    if (lowerMessage.includes('motivate') || lowerMessage.includes('encourage') || lowerMessage.includes('inspire')) {
      const motivationalMessages = [
        `${firstName}, you're doing amazing! Every lesson completed is a step toward your goals. Digital transformation leaders are made through consistent effort, and you're on the right path! 💪`,
        `Remember why you started, ${firstName}. Your dedication to learning digital transformation will open doors you haven't even imagined yet. Keep pushing forward! 🚀`,
        `${firstName}, the fact that you're here learning shows your commitment to growth. That's what sets successful professionals apart. You've got this! ⭐`,
        `Think about where you'll be in 6 months, ${firstName}. Every course you complete brings you closer to becoming a digital transformation expert. Stay focused! 🎯`
      ];

      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

      return {
        message,
        suggestions: ['Set a new goal', 'View my achievements', 'Continue learning', 'Share my progress'],
        insights: [
          { icon: Zap, text: 'You can do this!', color: 'text-amber-600' },
          { icon: Award, text: 'Success is near', color: 'text-green-600' }
        ]
      };
    }

    // Goals and planning
    if (lowerMessage.includes('goal') || lowerMessage.includes('plan') || lowerMessage.includes('schedule')) {
      const message = `Let's create a winning learning plan, ${firstName}:\n\n` +
        `🎯 Weekly Goals:\n` +
        `• Complete 2-3 lessons\n` +
        `• Spend 3-4 hours learning\n` +
        `• Finish 1 assessment\n\n` +
        `📅 Study Schedule:\n` +
        `• Morning: 30 min before work\n` +
        `• Evening: 1 hour after dinner\n` +
        `• Weekend: 2 hours deep learning\n\n` +
        `Consistency beats intensity. Small daily progress leads to big results!`;

      return {
        message,
        suggestions: ['Set custom goals', 'Track my time', 'Get reminders', 'Adjust schedule'],
        insights: [
          { icon: Calendar, text: 'Structured approach', color: 'text-blue-600' },
          { icon: Target, text: 'Achievable targets', color: 'text-green-600' }
        ]
      };
    }

    // Study tips and learning support
    if (lowerMessage.includes('tip') || lowerMessage.includes('help') || lowerMessage.includes('study') || lowerMessage.includes('learn better')) {
      const message = `Here are my top learning tips for you, ${firstName}:\n\n` +
        `📝 Active Learning:\n` +
        `• Take notes during lessons\n` +
        `• Summarize key concepts\n` +
        `• Apply to real scenarios\n\n` +
        `🧠 Retention Techniques:\n` +
        `• Review within 24 hours\n` +
        `• Teach concepts to others\n` +
        `• Practice with quizzes\n\n` +
        `⚡ Productivity:\n` +
        `• Use Pomodoro technique (25 min focus)\n` +
        `• Eliminate distractions\n` +
        `• Take regular breaks`;

      return {
        message,
        suggestions: ['More study tips', 'Learning resources', 'Join study group', 'Ask a question'],
        insights: [
          { icon: Brain, text: 'Smart learning strategies', color: 'text-purple-600' },
          { icon: Lightbulb, text: 'Proven techniques', color: 'text-amber-600' }
        ]
      };
    }

    // Default helpful response
    return {
      message: `I'm here to support your digital transformation journey, ${firstName}! I can help you with:\n\n` +
        `📊 Progress tracking and analytics\n` +
        `🎯 Personalized course recommendations\n` +
        `🗺️ 6XD framework guidance\n` +
        `💼 Career development advice\n` +
        `💪 Motivation and goal setting\n` +
        `📚 Study tips and learning strategies\n\n` +
        `What would you like to explore?`,
      suggestions: ['Review my progress', 'Recommend courses', 'Career guidance', 'Motivate me!'],
      insights: []
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
      const response = getMentorResponse(inputValue);
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'mentor',
        content: response.message,
        timestamp: new Date(),
        suggestions: response.suggestions,
        insights: response.insights
      };
      setMessages(prev => [...prev, mentorMessage]);
    }, 600);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleQuickInsight = (action: string) => {
    const actionMessages: Record<string, string> = {
      progress: 'Review my progress',
      goals: 'Help me set learning goals',
      advice: 'Give me some advice',
      nextsteps: 'What should I learn next?'
    };
    setInputValue(actionMessages[action] || action);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <Brain className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-white">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                <Brain className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">Transact AI</h3>
              <p className="text-xs text-white/80">Your Personal Mentor</p>
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
            {/* Quick Insights */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b grid grid-cols-2 gap-2">
              {quickInsights.map((insight) => (
                <button
                  key={insight.action}
                  onClick={() => handleQuickInsight(insight.action)}
                  className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-md border border-transparent hover:border-purple-200 transition-all text-sm"
                >
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                  <span className="text-gray-700">{insight.text}</span>
                </button>
              ))}
            </div>

            {/* Messages */}
            <ScrollArea className="h-[380px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'mentor' && (
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                            <Brain className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                            : 'bg-gradient-to-r from-purple-50 to-indigo-50 text-gray-800 border border-purple-100'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        {message.insights && message.insights.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.insights.map((insight, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <insight.icon className={`w-4 h-4 ${insight.color}`} />
                                <span className="text-gray-600">{insight.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs px-3 py-1 bg-white border border-purple-300 text-purple-700 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors"
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
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your mentor..."
                  className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Personalized AI Mentor • Here for your success
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
