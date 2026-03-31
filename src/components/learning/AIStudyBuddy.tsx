import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, Paperclip, MoreVertical, ArrowLeft, Volume2, Play, Pause, Download, FileText, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  messageType?: 'text' | 'audio' | 'attachment';
  audioUrl?: string;
  audioDuration?: number;
  attachmentName?: string;
  attachmentType?: string;
  isRead?: boolean;
}

interface AIAction {
  icon: any;
  label: string;
  action: string;
}

export const AIStudyBuddy = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your DTMA AI Study Buddy. I\'m here to help you learn, practice, and track your progress. How can I assist you today?',
      timestamp: new Date(),
      isRead: true,
    };
    setMessages([welcomeMessage]);
  }, []);

  const aiActions: AIAction[] = [
    { icon: FileText, label: 'Summarize Lesson', action: 'summarize' },
    { icon: Bot, label: 'Generate Practice Questions', action: 'practice' },
    { icon: Volume2, label: 'Explain This Concept', action: 'explain' },
    { icon: CheckCheck, label: 'Show My Progress', action: 'progress' },
  ];

  const handleSendMessage = async (content: string, type: 'text' | 'audio' = 'text') => {
    if (!content.trim() && type === 'text') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      messageType: type,
      isRead: true,
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
        isRead: true,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('summarize') || input.includes('summary')) {
      return 'Here\'s a summary of your current lesson:\n\nDigital Transformation Fundamentals covers the core principles of organizational change in the digital age. Key topics include: change management, digital strategy, and stakeholder engagement.\n\nWould you like me to create practice questions on this topic?';
    }
    
    if (input.includes('practice') || input.includes('question')) {
      return 'Great! Here are 3 practice questions:\n\n1. What are the 4 key pillars of digital transformation?\n2. How does change management support digital initiatives?\n3. Describe the role of stakeholder engagement in transformation success.\n\nWould you like me to check your answers?';
    }
    
    if (input.includes('explain') || input.includes('concept')) {
      return 'I\'d be happy to explain! Which specific concept would you like me to clarify? For example:\n\n• Digital maturity assessment\n• Change management frameworks\n• Digital strategy development\n• Stakeholder mapping';
    }
    
    if (input.includes('progress')) {
      return 'Here\'s your learning progress:\n\n📊 Overall Progress: 68%\n✅ Completed Lessons: 12/18\n⭐ Average Quiz Score: 85%\n🎯 Current Streak: 5 days\n\nYou\'re doing great! Keep up the momentum!';
    }
    
    return 'I understand. Let me help you with that. Could you provide more details about what you\'d like to learn or practice?';
  };

  const handleAIAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'summarize':
        message = 'Can you summarize my current lesson?';
        break;
      case 'practice':
        message = 'Generate practice questions for me';
        break;
      case 'explain':
        message = 'Explain this concept to me';
        break;
      case 'progress':
        message = 'Show me my progress';
        break;
    }
    handleSendMessage(message);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage('Voice message: Can you help me understand digital transformation?', 'audio');
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const toggleAudioPlayback = (messageId: string) => {
    setPlayingAudio(playingAudio === messageId ? null : messageId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1e2348] px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-[#ff6b4d] rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-[16px] leading-[24px]">DTMA AI Tutor</h3>
            <p className="text-white/70 text-[12px] leading-[16px] flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
        <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[75%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-[#ff6b4d] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${
                    message.type === 'ai'
                      ? 'bg-white text-gray-800 rounded-tl-none'
                      : 'bg-[#1e2348] text-white rounded-tr-none'
                  }`}
                >
                  {message.messageType === 'audio' ? (
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <button
                        onClick={() => toggleAudioPlayback(message.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'ai' ? 'bg-[#ff6b4d]' : 'bg-white/20'
                        }`}
                      >
                        {playingAudio === message.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 h-6">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-full ${
                                message.type === 'ai' ? 'bg-[#ff6b4d]' : 'bg-white/60'
                              }`}
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] opacity-70">0:15</span>
                    </div>
                  ) : (
                    <p className="text-[14px] leading-[20px] whitespace-pre-line">{message.content}</p>
                  )}
                </div>
                <div className={`flex items-center gap-1 px-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
                  <span className="text-[11px] text-gray-500">{formatTime(message.timestamp)}</span>
                  {message.type === 'user' && message.isRead && (
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* AI Actions */}
        {messages.length > 1 && !isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[75%]">
              <div className="w-8 h-8 bg-[#ff6b4d] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm">
                <p className="text-[12px] text-gray-600 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {aiActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAIAction(action.action)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-[#ff6b4d]/10 border border-gray-200 hover:border-[#ff6b4d] rounded-lg text-[12px] text-gray-700 hover:text-[#ff6b4d] transition-colors"
                    >
                      <action.icon className="w-3.5 h-3.5" />
                      <span className="whitespace-nowrap">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-[#ff6b4d] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-[#ff6b4d] p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:bg-white transition-colors"
            />
          </div>

          {inputValue.trim() ? (
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="w-12 h-12 bg-[#ff6b4d] hover:bg-[#e56045] rounded-full flex items-center justify-center transition-colors shadow-md"
              aria-label="Send message"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-[#ff6b4d] hover:bg-[#e56045]'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
            >
              <Mic className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
        
        {isRecording && (
          <div className="mt-2 flex items-center justify-center gap-2 text-red-500 text-[12px]">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Recording...
          </div>
        )}
      </div>
    </div>
  );
};
