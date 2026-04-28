import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, BookOpen, Award, Phone } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const ButlerWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { icon: BookOpen, label: 'Explore Courses', action: 'courses' },
    { icon: Award, label: 'View Certifications', action: 'certifications' },
    { icon: Phone, label: 'Talk to an Advisor', action: 'advisor' },
  ];

  const conversationStarters = [
    'What is DTMA?',
    'Which course should I take?',
    'Explain the 6XD framework',
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('what is dtma') || input.includes('about dtma')) {
      return 'DTMA (Digital Transformation Maturity Assessment) is a comprehensive learning platform designed to help organizations and professionals navigate digital transformation. We offer courses across 6 key dimensions of digital maturity.';
    }
    
    if (input.includes('course') || input.includes('learn')) {
      return 'We offer courses across 6 dimensions: Digital Economy, Digital Cognitive Organisation, Digital Business Platform, Digital Transformation, Digital Worker Workspace, and Digital Accelerators. What area interests you most?';
    }
    
    if (input.includes('6xd') || input.includes('framework')) {
      return 'The 6XD Framework represents the 6 dimensions of digital maturity: Digital Economy (DE), Digital Cognitive Organisation (DCO), Digital Business Platform (DBP), Digital Transformation (DT), Digital Worker Workspace (DWW), and Digital Accelerators (DA). Each dimension addresses critical aspects of organizational digital transformation.';
    }
    
    return 'Thank you for your question! I\'m here to help you explore DTMA\'s courses, certifications, and digital transformation resources. How can I assist you today?';
  };

  const handleQuickReply = (action: string) => {
    let message = '';
    switch (action) {
      case 'courses':
        message = 'Show me available courses';
        break;
      case 'certifications':
        message = 'Tell me about certifications';
        break;
      case 'advisor':
        message = 'I want to speak with an advisor';
        break;
    }
    handleSendMessage(message);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#ff6b4d] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Open Butler AI Chat"
        >
          <Bot className="w-8 h-8 text-white" />
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1e2348] rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e2348] to-[#2a3058] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-[16px] leading-[24px]">Butler AI</h3>
                <p className="text-white/70 text-[12px] leading-[16px]">Your Digital Transformation Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#1e2348] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[280px]">
                    <p className="text-[14px] leading-[20px] text-gray-800">
                      Hello! I'm Butler AI, your digital transformation concierge. How can I help you today?
                    </p>
                  </div>
                </div>

                {/* Conversation Starters */}
                <div className="pl-11 space-y-2">
                  <p className="text-[12px] text-gray-500 mb-2">Quick questions:</p>
                  {conversationStarters.map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(starter)}
                      className="block w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] text-gray-700 hover:border-[#ff6b4d] hover:text-[#ff6b4d] transition-colors"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 bg-[#1e2348] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col gap-1 max-w-[280px]">
                  <div
                    className={`rounded-2xl p-4 shadow-sm ${
                      message.type === 'ai'
                        ? 'bg-white rounded-tl-none'
                        : 'bg-[#1e2348] text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-[14px] leading-[20px]">{message.content}</p>
                  </div>
                  <span className={`text-[11px] text-gray-400 px-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#1e2348] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Buttons */}
          {messages.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-2 overflow-x-auto">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply.action)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-[12px] text-gray-700 hover:border-[#ff6b4d] hover:text-[#ff6b4d] transition-colors whitespace-nowrap"
                  >
                    <reply.icon className="w-3.5 h-3.5" />
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-[#ff6b4d] hover:bg-[#e56045] disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
