import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  X, 
  Play,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: string;
  type: 'system' | 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  isRead?: boolean;
  options?: string[];
  correctAnswer?: number;
}

interface WhatsAppLearningProps {
  courseTitle: string;
  lessonTitle: string;
}

export function WhatsAppLearning({ courseTitle, lessonTitle }: WhatsAppLearningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: `📘 Concept of the Day: ${lessonTitle}\n\nWelcome to WhatsApp Learning! You'll receive daily micro-lessons and can ask questions anytime.`,
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
    {
      id: '2',
      type: 'system',
      content: `💡 Key Concept:\n\n${lessonTitle} is a fundamental concept in ${courseTitle}. Understanding this will help you master the core principles.`,
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Great question! Let me help you understand that better.\n\nBased on your question about "${inputMessage}", here's a concise explanation:\n\nThis concept relates to the core principles we're covering in ${lessonTitle}. Would you like me to elaborate on any specific aspect?`,
        timestamp: new Date(),
        isRead: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        const voiceMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: "Voice message: Can you explain this concept in simpler terms?",
          timestamp: new Date(),
          isVoice: true,
          isRead: false,
        };
        setMessages(prev => [...prev, voiceMessage]);
        setIsRecording(false);

        // AI voice response
        setTimeout(() => {
          const aiVoiceResponse: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: "🎧 Voice Response Available\n\nHere's a summary: This concept can be broken down into three simple parts...\n\n[Tap to play audio summary]",
            timestamp: new Date(),
            isVoice: true,
            isRead: false,
          };
          setMessages(prev => [...prev, aiVoiceResponse]);
        }, 2000);
      }, 2000);
    }
  };

  const sendPracticeQuestion = () => {
    const practiceQuestion: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `🧠 Practice Question\n\nWhat is the primary goal of ${lessonTitle}?\n\nSelect your answer:`,
      timestamp: new Date(),
      isRead: false,
      options: [
        "A. Documentation",
        "B. Deliver working increments",
        "C. Meetings",
        "D. Hiring"
      ],
      correctAnswer: 1,
    };
    setMessages(prev => [...prev, practiceQuestion]);
  };

  const handleAnswerSelect = (messageId: string, selectedIndex: number, correctIndex?: number) => {
    const isCorrect = selectedIndex === correctIndex;
    
    const feedbackMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'system',
      content: isCorrect 
        ? `✅ Correct!\n\nGreat job! You've understood the concept well. The correct answer demonstrates your grasp of the key principles.`
        : `❌ Not quite right.\n\nThe correct answer is option ${String.fromCharCode(65 + (correctIndex || 0))}. Let me explain why:\n\nThis option best represents the core objective because...`,
      timestamp: new Date(),
      isRead: false,
    };
    
    setMessages(prev => [...prev, feedbackMessage]);
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#25D366] text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">WhatsApp Learning</h3>
              <p className="text-xs text-white/80">Always active</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-[#E5DDD5]" ref={scrollRef}>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-[#DCF8C6]'
                      : message.type === 'system'
                      ? 'bg-white'
                      : 'bg-white'
                  }`}
                >
                  {message.isVoice && message.type === 'user' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                        <Mic className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 h-1 bg-[#25D366]/30 rounded-full">
                        <div className="h-full w-3/4 bg-[#25D366] rounded-full" />
                      </div>
                      <span className="text-xs text-gray-600">0:03</span>
                    </div>
                  )}
                  
                  {message.isVoice && message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <button className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#20BA5A] transition-colors">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </button>
                      <div className="flex-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-xs text-gray-600">0:15</span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</p>
                  
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(message.id, index, message.correctAnswer)}
                          className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.type === 'user' && (
                      message.isRead ? (
                        <CheckCheck className="w-3 h-3 text-[#25D366]" />
                      ) : (
                        <CheckCheck className="w-3 h-3 text-gray-400" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <button
            onClick={sendPracticeQuestion}
            className="w-full text-xs text-[#25D366] hover:text-[#20BA5A] font-medium transition-colors"
          >
            📝 Send me a practice question
          </button>
        </div>

        {/* Input */}
        <div className="p-4 bg-white rounded-b-2xl border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 border-gray-300"
            />
            <button
              onClick={handleVoiceMessage}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="w-10 h-10 bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-full relative bg-green-50 hover:bg-green-100 rounded-xl p-4 text-left transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-green-900 font-medium text-sm">WhatsApp Learning</h4>
                <p className="text-green-700 text-xs">Daily lessons & Q&A</p>
              </div>
            </div>
            <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
          </div>
        </button>
      ) : (
        createPortal(modalContent, document.body)
      )}
    </>
  );
}
