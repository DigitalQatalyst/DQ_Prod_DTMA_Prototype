import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  X, 
  Send, 
  GraduationCap,
  BookOpen,
  HelpCircle,
  Lightbulb,
  FileText,
  Mic,
  Volume2,
  Minimize2,
  CheckCircle,
  Award,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'tutor';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  resources?: { title: string; type: string }[];
}

interface CourseTutorAIProps {
  courseTitle: string;
  moduleTitle?: string;
  lessonTitle?: string;
  lessonContent?: string;
  isQuiz?: boolean;
  isAssignment?: boolean;
  currentProgress?: number;
  onClose?: () => void;
}

const quickActions = [
  { icon: HelpCircle, text: 'Explain this', action: 'explain', color: 'text-blue-600' },
  { icon: Lightbulb, text: 'Key concepts', action: 'concepts', color: 'text-amber-600' },
  { icon: FileText, text: 'Summary', action: 'summary', color: 'text-green-600' },
  { icon: Award, text: 'Quiz help', action: 'quiz', color: 'text-purple-600' },
];

export const CourseTutorAI = ({ 
  courseTitle,
  moduleTitle = '',
  lessonTitle = '',
  lessonContent = '',
  isQuiz = false,
  isAssignment = false,
  currentProgress = 0,
  onClose
}: CourseTutorAIProps) => {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  useEffect(() => {
    // Initialize with context-aware greeting
    const greeting = getContextualGreeting();
    setMessages([{
      id: '1',
      type: 'tutor',
      content: greeting.message,
      timestamp: new Date(),
      suggestions: greeting.suggestions,
      resources: greeting.resources
    }]);
  }, [lessonTitle, isQuiz, isAssignment]);

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

  const getContextualGreeting = () => {
    let message = `Hi ${firstName}! 👋 I'm your AI tutor for this lesson.\n\n`;
    const resources: { title: string; type: string }[] = [];

    if (isQuiz) {
      message += `📝 I see you're working on a quiz. I can help you:\n\n`;
      message += `• Understand the questions better\n`;
      message += `• Review key concepts\n`;
      message += `• Explain answer choices\n`;
      message += `• Provide study tips\n\n`;
      message += `Remember: I'm here to help you learn, not give you the answers directly!`;
      
      return {
        message,
        suggestions: ['Explain this question', 'Review key concepts', 'Study tips', 'What should I focus on?'],
        resources
      };
    }

    if (isAssignment) {
      message += `📋 Working on your assignment? I can assist with:\n\n`;
      message += `• Understanding the requirements\n`;
      message += `• Breaking down the task\n`;
      message += `• Suggesting approaches\n`;
      message += `• Reviewing your work\n\n`;
      message += `Let me know how I can help!`;
      
      return {
        message,
        suggestions: ['Explain requirements', 'How to approach this?', 'Best practices', 'Review checklist'],
        resources
      };
    }

    if (lessonTitle) {
      message += `📚 You're learning about "${lessonTitle}".\n\n`;
      message += `I'm here to:\n`;
      message += `• Answer your questions\n`;
      message += `• Explain difficult concepts\n`;
      message += `• Provide examples\n`;
      message += `• Summarize key points\n\n`;
      message += `What would you like to know?`;

      return {
        message,
        suggestions: ['Explain this lesson', 'Key takeaways', 'Give me examples', 'Test my understanding'],
        resources
      };
    }

    message += `I'm your subject matter expert for "${courseTitle}".\n\n`;
    message += `Ask me anything about the course content, and I'll help you understand it better!`;

    return {
      message,
      suggestions: ['What will I learn?', 'Explain a concept', 'Quiz me', 'Study tips'],
      resources: []
    };
  };

  const getTutorResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Lesson explanation
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('tell me about')) {
      let message = `Let me break down "${lessonTitle}" for you:\n\n`;
      
      if (lessonContent) {
        message += `📖 Core Concept:\n`;
        message += `This lesson covers fundamental aspects of ${lessonTitle.toLowerCase()}. `;
        message += `The key is to understand how these concepts apply in real-world scenarios.\n\n`;
      }

      message += `💡 Key Points to Remember:\n`;
      message += `• Focus on understanding the "why" behind each concept\n`;
      message += `• Connect new information to what you already know\n`;
      message += `• Think about practical applications\n`;
      message += `• Take notes on important terms and definitions\n\n`;
      message += `Would you like me to explain any specific part in more detail?`;

      return {
        message,
        suggestions: ['Give examples', 'Simplify this', 'Real-world applications', 'Common mistakes'],
        resources: [
          { title: 'Lesson Notes', type: 'pdf' },
          { title: 'Practice Exercises', type: 'interactive' }
        ]
      };
    }

    // Key concepts and takeaways
    if (lowerMessage.includes('key') || lowerMessage.includes('important') || lowerMessage.includes('takeaway') || lowerMessage.includes('summary')) {
      const message = `📌 Key Takeaways from "${lessonTitle}":\n\n` +
        `1️⃣ Foundation Concepts\n` +
        `Understanding the core principles is essential for building advanced knowledge.\n\n` +
        `2️⃣ Practical Application\n` +
        `These concepts directly apply to real-world digital transformation scenarios.\n\n` +
        `3️⃣ Integration with 6XD\n` +
        `This lesson connects to the broader 6XD framework, particularly in ${moduleTitle || 'your learning path'}.\n\n` +
        `4️⃣ Next Steps\n` +
        `Build on this foundation in upcoming lessons to develop comprehensive expertise.\n\n` +
        `💡 Pro Tip: Review these key points before moving to the next lesson!`;

      return {
        message,
        suggestions: ['Quiz me on this', 'How does this apply?', 'What\'s next?', 'Create flashcards'],
        resources: [
          { title: 'Lesson Summary PDF', type: 'pdf' },
          { title: 'Mind Map', type: 'image' }
        ]
      };
    }

    // Examples and applications
    if (lowerMessage.includes('example') || lowerMessage.includes('application') || lowerMessage.includes('real world') || lowerMessage.includes('use case')) {
      const message = `🌟 Real-World Examples:\n\n` +
        `Example 1: Digital Economy Transformation\n` +
        `Companies like Amazon and Alibaba demonstrate these principles by creating platform ecosystems that connect buyers and sellers globally.\n\n` +
        `Example 2: Enterprise Implementation\n` +
        `Traditional businesses applying these concepts see 30-40% efficiency improvements through digital process optimization.\n\n` +
        `Example 3: UAE Context\n` +
        `Dubai's Smart City initiatives showcase how these digital transformation principles drive innovation and economic growth.\n\n` +
        `💼 Your Turn:\n` +
        `Think about how you could apply these concepts in your organization or career. What specific challenges could you solve?`;

      return {
        message,
        suggestions: ['More examples', 'Case studies', 'How to implement?', 'Common challenges'],
        resources: [
          { title: 'Case Study Collection', type: 'pdf' },
          { title: 'Implementation Guide', type: 'document' }
        ]
      };
    }

    // Quiz and assessment help
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('assessment') || lowerMessage.includes('question')) {
      if (isQuiz) {
        const message = `📝 Quiz Strategy Tips:\n\n` +
          `1. Read Carefully\n` +
          `Take your time to understand what each question is really asking.\n\n` +
          `2. Eliminate Wrong Answers\n` +
          `Cross out options you know are incorrect to narrow your choices.\n\n` +
          `3. Look for Keywords\n` +
          `Pay attention to words like "always," "never," "most," "least" - they're important!\n\n` +
          `4. Trust Your Knowledge\n` +
          `You've learned this material. Trust your understanding.\n\n` +
          `5. Review Before Submitting\n` +
          `Double-check your answers if time permits.\n\n` +
          `Need help understanding a specific question? Just ask!`;

        return {
          message,
          suggestions: ['Explain this question', 'Review concepts', 'What to focus on?', 'Time management tips'],
          resources: []
        };
      } else {
        const message = `🎯 Let me quiz you on "${lessonTitle}":\n\n` +
          `Question 1: What is the main objective of this lesson?\n` +
          `Think about the core concept we're trying to understand.\n\n` +
          `Question 2: How does this connect to digital transformation?\n` +
          `Consider the practical applications in business contexts.\n\n` +
          `Question 3: Can you explain this concept in your own words?\n` +
          `Teaching is the best way to learn!\n\n` +
          `Take your time and answer when you're ready. I'll provide feedback!`;

        return {
          message,
          suggestions: ['I\'m ready to answer', 'Give me hints', 'Explain the answer', 'More practice questions'],
          resources: [
            { title: 'Practice Quiz Bank', type: 'interactive' },
            { title: 'Study Guide', type: 'pdf' }
          ]
        };
      }
    }

    // Study tips and learning strategies
    if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('remember') || lowerMessage.includes('tip')) {
      const message = `📚 Effective Learning Strategies for This Lesson:\n\n` +
        `🎯 Active Learning:\n` +
        `• Pause the video and summarize what you learned\n` +
        `• Create your own examples\n` +
        `• Teach the concept to someone else\n\n` +
        `🧠 Memory Techniques:\n` +
        `• Use the Feynman Technique: Explain it simply\n` +
        `• Create acronyms for key points\n` +
        `• Draw diagrams or mind maps\n\n` +
        `⏰ Spaced Repetition:\n` +
        `• Review this lesson tomorrow\n` +
        `• Review again in 3 days\n` +
        `• Final review in 1 week\n\n` +
        `✍️ Note-Taking:\n` +
        `• Use the Cornell method\n` +
        `• Highlight key terms\n` +
        `• Write questions in margins`;

      return {
        message,
        suggestions: ['Create flashcards', 'Generate notes', 'Practice exercises', 'Review schedule'],
        resources: [
          { title: 'Note-Taking Template', type: 'document' },
          { title: 'Flashcard Set', type: 'interactive' }
        ]
      };
    }

    // Assignment help
    if (lowerMessage.includes('assignment') || lowerMessage.includes('project') || lowerMessage.includes('submit')) {
      const message = `📋 Assignment Guidance:\n\n` +
        `✅ Understanding Requirements:\n` +
        `Make sure you clearly understand what's being asked. Break down the assignment into smaller tasks.\n\n` +
        `📝 Planning Your Approach:\n` +
        `1. Research and gather information\n` +
        `2. Create an outline\n` +
        `3. Draft your work\n` +
        `4. Review and refine\n` +
        `5. Check against requirements\n\n` +
        `💡 Quality Tips:\n` +
        `• Use specific examples from the course\n` +
        `• Show your understanding, not just facts\n` +
        `• Proofread before submitting\n` +
        `• Follow formatting guidelines\n\n` +
        `Need help with a specific part? Let me know!`;

      return {
        message,
        suggestions: ['Review requirements', 'Outline structure', 'Best practices', 'Common mistakes to avoid'],
        resources: [
          { title: 'Assignment Rubric', type: 'pdf' },
          { title: 'Sample Submissions', type: 'document' }
        ]
      };
    }

    // Note-taking assistance
    if (lowerMessage.includes('note') || lowerMessage.includes('write down') || lowerMessage.includes('capture')) {
      const message = `📝 I can help you organize your notes for "${lessonTitle}":\n\n` +
        `Key Terms:\n` +
        `• [Term 1]: Definition and significance\n` +
        `• [Term 2]: How it applies in practice\n` +
        `• [Term 3]: Connection to other concepts\n\n` +
        `Main Ideas:\n` +
        `1. Core principle of the lesson\n` +
        `2. Practical applications\n` +
        `3. Integration with broader framework\n\n` +
        `Questions to Explore:\n` +
        `• How does this apply to my work?\n` +
        `• What are the limitations?\n` +
        `• How does this connect to previous lessons?\n\n` +
        `💡 I can generate structured notes for you. Just say "generate notes"!`;

      return {
        message,
        suggestions: ['Generate notes', 'Create summary', 'Key terms list', 'Save to my notes'],
        resources: [
          { title: 'Auto-Generated Notes', type: 'document' },
          { title: 'Lesson Transcript', type: 'pdf' }
        ]
      };
    }

    // Progress and next steps
    if (lowerMessage.includes('next') || lowerMessage.includes('progress') || lowerMessage.includes('what now')) {
      const message = `🎯 Your Learning Progress:\n\n` +
        `Current Lesson: ${lessonTitle}\n` +
        `Module: ${moduleTitle}\n` +
        `Course Progress: ${currentProgress}%\n\n` +
        `✅ What You've Accomplished:\n` +
        `You're building a strong foundation in digital transformation concepts.\n\n` +
        `🚀 Next Steps:\n` +
        `1. Complete any practice exercises\n` +
        `2. Review your notes\n` +
        `3. Move to the next lesson when ready\n` +
        `4. Apply concepts to real scenarios\n\n` +
        `💪 Keep up the great work! You're ${currentProgress}% through the course.`;

      return {
        message,
        suggestions: ['What\'s in next lesson?', 'Review this lesson', 'Practice exercises', 'Check my understanding'],
        resources: []
      };
    }

    // Default helpful response
    return {
      message: `I'm your AI tutor for "${courseTitle}", ${firstName}! 🎓\n\n` +
        `I can help you with:\n\n` +
        `📖 Lesson Content\n` +
        `• Explain concepts in simple terms\n` +
        `• Provide examples and applications\n` +
        `• Answer your questions\n\n` +
        `📝 Assessments\n` +
        `• Quiz preparation and strategies\n` +
        `• Assignment guidance\n` +
        `• Practice questions\n\n` +
        `🧠 Learning Support\n` +
        `• Study tips and techniques\n` +
        `• Note-taking assistance\n` +
        `• Progress tracking\n\n` +
        `What would you like help with?`,
      suggestions: ['Explain this lesson', 'Quiz me', 'Study tips', 'Key concepts'],
      resources: []
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
      const response = getTutorResponse(inputValue);
      const tutorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'tutor',
        content: response.message,
        timestamp: new Date(),
        suggestions: response.suggestions,
        resources: response.resources
      };
      setMessages(prev => [...prev, tutorMessage]);
    }, 600);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      explain: 'Explain this lesson to me',
      concepts: 'What are the key concepts?',
      summary: 'Give me a summary',
      quiz: 'Help me with the quiz'
    };
    setInputValue(actionMessages[action] || action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input would be implemented with Web Speech API
    alert('Voice input feature coming soon!');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] text-white rounded-full shadow-2xl hover:shadow-[#ff6b4d]/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <GraduationCap className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6b4d] rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 relative flex flex-col ${
        isMinimized ? 'h-16' : 'h-[calc(100vh-120px)]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6b4d] to-[#e66045] p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-10 h-10 ring-2 ring-white flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-[#ff6b4d] to-[#e66045] text-white">
                <GraduationCap className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-sm">Course Tutor</h3>
              <p className="text-xs text-white/80">AI Subject Expert</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label="Minimize"
            >
              <Minimize2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => {
                if (onClose) {
                  onClose();
                } else {
                  setIsOpen(false);
                }
              }}
              className="p-2 bg-white/40 hover:bg-white/60 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="p-4 bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] border-b">
              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-md border border-transparent hover:border-[#ffd1c8] transition-all text-sm"
                >
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                  <span className="text-gray-700">{action.text}</span>
                </button>
              ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'tutor' && (
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-[#ff6b4d] to-[#e66045] text-white">
                            <GraduationCap className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-[#ff6b4d] to-[#e66045] text-white'
                            : 'bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] text-gray-800 border border-[#ffd1c8]'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        {message.resources && message.resources.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.resources.map((resource, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs bg-white border border-[#ffd1c8] rounded-lg p-2">
                                <FileText className="w-3 h-3 text-[#ff6b4d]" />
                                <span className="text-gray-700">{resource.title}</span>
                                <span className="ml-auto text-gray-500">{resource.type}</span>
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
                                className="text-xs px-3 py-1 bg-white border border-[#ffd1c8] text-[#ff6b4d] rounded-full hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d] transition-colors"
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
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-[#fff0ed] text-[#ff6b4d] hover:bg-[#ffe9e4]'
                  }`}
                >
                  {isListening ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your tutor..."
                  className="flex-1 px-4 py-2 border border-[#ffd1c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-[#ff6b4d] to-[#e66045] hover:from-[#e66045] hover:to-[#cc563e] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI Course Tutor • Lesson-specific help
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
