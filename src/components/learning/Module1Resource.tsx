import { BookOpen, ChevronRight, Volume2, VolumeX, Pause, Play, Mic, Save, X, MessageCircle, Send, Sparkles, FileText, Lightbulb, BookMarked, Share2, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Note {
  id: string;
  highlightedText: string;
  noteText: string;
  timestamp: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const Module1Resource = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Note-taking state
  const [selectedText, setSelectedText] = useState("");
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [currentNote, setCurrentNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  
  // AI Reading Assistant state
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAIThinking, setIsAIThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Share menu state
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);

  // Article text content for speech synthesis
  const articleText = `
    Adapt or disappear. In Economy 4.0, the advantage belongs to organizations that operate with intelligence in real-time and orchestrate ecosystems rather than manage hierarchies.
    
    Foreword. Over the past three decades, digital technologies have reshaped industries, accelerated globalization, and transformed customer interaction. Yet much of this transformation has focused on digitizing existing processes rather than redesigning the economic logic that governs markets. Today, that logic is changing. Economy 4.0 represents a structural evolution in how value is created, exchanged, and sustained.
    
    Executive Summary. We are entering a pivotal era where digital intelligence is no longer just a tool but a transformative force reshaping how businesses operate, compete, and deliver value. Economy 4.0 represents a structural shift in how value is created, exchanged, and sustained.
    
    The Structural Shift to Economy 4.0. Economic systems evolve when the underlying logic of production, coordination, and value creation changes. Economy 4.0 builds upon digital connectivity but introduces a deeper shift. It embeds intelligence directly into economic systems.
    
    Digital Cognitive Organizations. If Economy 4.0 reshapes markets as adaptive, data-driven systems, then organizations must be structured to operate within that reality. The Digital Cognitive Organization represents that shift. A DCO is an enterprise intentionally designed to integrate human and machine intelligence, operate through unified digital infrastructures, and continuously learn from data.
    
    Business Model Innovation in Economy 4.0. In Economy 4.0, competitive advantage is determined less by what an organization produces and more by how it creates, delivers, and captures value within interconnected ecosystems.
    
    Strategic Imperatives in Economy 4.0. Economy 4.0 does not merely introduce new technologies or business models; it reshapes the strategic logic of the enterprise.
    
    Conclusion. Economy 4.0 represents more than technological acceleration. It signals a structural reconfiguration of how value is created, coordinated, and sustained. The choice is structural: remain optimized for a previous economy, or redesign for a cognitive one.
  `;

  const handlePlayPause = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isPlaying) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    } else if (isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Start new
      const utterance = new SpeechSynthesisUtterance(articleText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Initialize Speech Recognition for note dictation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCurrentNote(prev => prev + (prev ? ' ' : '') + transcript);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, []);

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      setSelectedText(text);
      
      // Get selection position
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect) {
        setPopupPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setShowNotePopup(true);
      }
    } else {
      setShowNotePopup(false);
    }
  };

  // Save note
  const handleSaveNote = () => {
    if (currentNote.trim() && selectedText) {
      const newNote: Note = {
        id: Date.now().toString(),
        highlightedText: selectedText,
        noteText: currentNote,
        timestamp: Date.now()
      };
      
      setNotes(prev => [...prev, newNote]);
      setCurrentNote("");
      setShowNotePopup(false);
      setSelectedText("");
      
      // Clear selection
      window.getSelection()?.removeAllRanges();
    }
  };

  // Toggle voice dictation for notes
  const toggleNoteDictation = () => {
    if (!recognition) {
      alert('Voice input is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Share note to social media
  const handleShareNote = (note: Note, platform: string) => {
    const noteContent = `"${note.highlightedText}"\n\n${note.noteText}\n\n#DigitalTransformation #DTMA #Learning`;
    const encodedContent = encodeURIComponent(noteContent);
    const encodedText = encodeURIComponent(note.noteText);
    const encodedQuote = encodeURIComponent(note.highlightedText);
    
    let shareUrl = '';
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedContent}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodedContent}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedContent}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedContent}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(noteContent);
        alert('Note copied to clipboard!');
        setShareMenuOpen(null);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShareMenuOpen(null);
    }
  };

  // AI Assistant functions
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.share-menu-container')) {
          setShareMenuOpen(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareMenuOpen]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Summarization requests
    if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
      if (lowerMessage.includes('foreword')) {
        return "The Foreword explains that digital transformation over the past 30 years has focused on digitizing processes rather than redesigning economic logic. Economy 4.0 represents a structural evolution in value creation through intelligence, real-time orchestration, and ecosystem-driven competitiveness. This shift requires fundamental organizational redesign from hierarchies optimized for efficiency to organizations built for cognition, adaptability, and continuous learning.";
      } else if (lowerMessage.includes('dco') || lowerMessage.includes('digital cognitive')) {
        return "Digital Cognitive Organizations (DCOs) are enterprises designed to integrate human and machine intelligence, operate through unified digital platforms, and continuously learn from data. Key characteristics include: Perfect Life Transactions, Unified Digital Business Platform, Man-Machine Collaboration, Architectural Data Utilization, Continuous Improvement, Advanced Technology Adoption, and Transformation Leadership.";
      } else if (lowerMessage.includes('business model')) {
        return "In Economy 4.0, competitive advantage depends on how organizations create, deliver, and capture value within interconnected ecosystems. The John Deere case study illustrates this: they evolved from equipment manufacturer to precision agriculture platform provider by embedding digital intelligence into machinery and connecting farmers through data-driven ecosystems. The product is now an integrated decision-support ecosystem, not just tractors.";
      } else {
        return "This article discusses Economy 4.0, which represents a structural shift where digital intelligence becomes a transformative force. Key topics include: the transition from Digital Economy to Economy 4.0, the emergence of Digital Cognitive Organizations (DCOs), business model innovation through ecosystem orchestration, and strategic imperatives for enterprises. The main message: organizations must redesign for cognition and adaptability, not just efficiency.";
      }
    }
    
    // Explanation requests
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('what are')) {
      if (lowerMessage.includes('economy 4.0')) {
        return "Economy 4.0 is the fourth phase of economic evolution, following Agricultural, Industrial, and Digital economies. It's characterized by embedding intelligence directly into economic systems through AI, analytics, and smart technologies. Unlike the Digital Economy which focused on connectivity, Economy 4.0 emphasizes intelligent responsiveness at scale, where data becomes a strategic asset for guiding real-time action.";
      } else if (lowerMessage.includes('dco')) {
        return "A Digital Cognitive Organization (DCO) is an enterprise intentionally designed to thrive in Economy 4.0. It integrates human judgment with machine intelligence, operates through unified digital infrastructures, and continuously learns from data. DCOs aim to deliver seamless, personalized transactions while maintaining alignment between operations, strategy, and technological capabilities.";
      } else if (lowerMessage.includes('perfect life transaction')) {
        return "Perfect Life Transactions refer to seamless, error-free, and highly personalized interactions that enhance customer experiences across all touchpoints. It's about delivering flawless service that anticipates needs and removes friction from every transaction.";
      } else if (lowerMessage.includes('ecosystem')) {
        return "In Economy 4.0, ecosystems are interconnected networks of organizations, platforms, and stakeholders that create and exchange value together. Rather than competing in isolated industries, organizations must define their role within these ecosystems as orchestrators, integrators, or specialized participants.";
      }
    }
    
    // Clarification requests
    if (lowerMessage.includes('difference between') || lowerMessage.includes('vs')) {
      return "The key difference between the Digital Economy and Economy 4.0 is that the Digital Economy digitized transactions and expanded connectivity, while Economy 4.0 intensifies competition through real-time intelligence, ecosystem orchestration, and hyper-personalized engagement. Economy 4.0 embeds intelligence directly into economic systems, making data a strategic asset for guiding action, not just reporting.";
    }
    
    // Key points requests
    if (lowerMessage.includes('key point') || lowerMessage.includes('important') || lowerMessage.includes('takeaway')) {
      return "Key takeaways from this article:\n\n1. Economy 4.0 represents a structural shift in how value is created and sustained\n2. Organizations must evolve from hierarchies to Digital Cognitive Organizations (DCOs)\n3. Competitive advantage comes from intelligent responsiveness and ecosystem positioning\n4. Business models must shift from linear value chains to platform-centric coordination\n5. Strategic imperatives: architectural coherence, adaptive capacity, and ecosystem positioning\n6. The choice is clear: redesign for cognition or risk obsolescence";
    }
    
    // Default helpful response
    return "I'm here to help you understand this article better! You can ask me to:\n\n• Summarize any section (e.g., 'Summarize the Foreword')\n• Explain concepts (e.g., 'What is a DCO?')\n• Clarify differences (e.g., 'Difference between Digital Economy and Economy 4.0')\n• Identify key points\n• Generate notes for you\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: Date.now()
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setCurrentMessage("");
    setIsAIThinking(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(currentMessage);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      };
      
      setChatMessages(prev => [...prev, aiMsg]);
      setIsAIThinking(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    
    switch(action) {
      case 'summarize':
        message = "Please summarize the main points of this article";
        break;
      case 'explain':
        message = "Explain the concept of Digital Cognitive Organizations";
        break;
      case 'notes':
        message = "Generate key notes from this article that I should remember";
        break;
      case 'references':
        message = "What are the key references and important quotes I should capture?";
        break;
    }
    
    setCurrentMessage(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="space-y-6">
      {/* Header - Sticky */}
      <Card className="sticky top-0 z-30 p-6 bg-gradient-to-br from-[#1e2348]/10 to-[#1e2348]/20 border-2 border-[#1e2348]/30 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#1e2348] text-[20px] leading-[28px] font-bold">
              Module 1 Resource: Digital Cognitive Organizations
            </h3>
            <p className="text-[#4B5563] text-[14px] leading-[20px]">
              VOLUME 1 | Digital Economy 4.0 : WP#1 (DE & DCOs)
            </p>
          </div>
          
          {/* Audio Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="flex items-center gap-2 bg-[#ff6b4d] hover:bg-[#e66045] text-white px-4 py-2 rounded-lg font-semibold text-[14px] transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Tutor</span>
            </button>
            
            <button
              onClick={() => setShowNotesPanel(!showNotesPanel)}
              className="flex items-center gap-2 bg-[#1e2348] hover:bg-[#2a3058] text-white px-4 py-2 rounded-lg font-semibold text-[14px] transition-colors shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>My Notes ({notes.length})</span>
            </button>
            
            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 bg-[#1e2348] hover:bg-[#2a3058] text-white px-4 py-2 rounded-lg font-semibold text-[14px] transition-colors shadow-md"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{isPaused ? 'Resume' : 'Listen'}</span>
                </>
              )}
            </button>
            {(isPlaying || isPaused) && (
              <button
                onClick={handleStop}
                className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                title="Stop"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Article Content */}
      <Card className="p-8 md:p-12">
        <div 
          className="prose prose-lg max-w-none"
          onMouseUp={handleTextSelection}
          onTouchEnd={handleTextSelection}
        >
          {/* Opening Quote */}
          <div className="bg-gradient-to-r from-[#1e2348]/10 to-[#1e2348]/5 border-l-4 border-[#1e2348] p-6 mb-8 rounded-r-lg">
            <p className="text-[#1e2348] text-[18px] leading-[28px] italic font-medium mb-0">
              Adapt or disappear. In Economy 4.0, the advantage belongs to organizations that operate with intelligence in real-time and orchestrate ecosystems rather than manage hierarchies. Those built for stability are misaligned with markets shaped by volatility and hyper-personalized demand. A clear divide is emerging: enterprises designed for coordination versus enterprises designed for cognition.
            </p>
          </div>

          {/* Foreword */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Foreword
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Over the past three decades, digital technologies have reshaped industries, accelerated globalization, and transformed customer interaction. Yet much of this transformation has focused on digitizing existing processes rather than redesigning the economic logic that governs markets. Today, that logic is changing. Economy 4.0 represents a structural evolution in how value is created, exchanged, and sustained. It is defined not merely by connectivity, but by intelligence, real-time orchestration, and ecosystem-driven competitiveness.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              This shift demands more than technological adoption. It requires a fundamental redesign of the organization itself. Traditional hierarchies, optimized for efficiency, struggle in environments characterized by volatility, hyper-personalization, and network effects. In their place, a new organizational form is emerging — one built for cognition, adaptability, and continuous learning.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px]">
              As the opening whitepaper in Volume 1 of the DTMB series, this paper establishes the conceptual foundation for understanding Economy 4.0. It clarifies the structural transition from the Digital Economy, introduces the rise of Digital Cognitive Organizations, and outlines the business and operating model implications of this shift. The objective is not to describe trends, but to define the new competitive architecture shaping markets.
            </p>
          </section>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Executive Summary
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              We are entering a pivotal era where digital intelligence is no longer just a tool but a transformative force reshaping how businesses operate, compete, and deliver value. Economy 4.0 represents a structural shift in how value is created, exchanged, and sustained. While the Digital Economy digitized transactions and expanded connectivity, Economy 4.0 intensifies competition through real-time intelligence, ecosystem orchestration, and hyper-personalized engagement.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              This shift is best understood through Systems Theory, which frames organizations as open systems in dynamic interaction with their environments. As complexity rises and feedback loops accelerate, organizational viability depends on continuously recalibrating structures, information flows, and decision mechanisms to remain aligned with external conditions.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px]">
              Under these conditions, Digital Cognitive Organizations (DCOs) emerge as a necessary organizational response: enterprises designed to fuse human judgment with machine intelligence, operate through unified platforms, and learn continuously through data-driven feedback.
            </p>
          </section>

          {/* The Structural Shift */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              The Structural Shift to Economy 4.0
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Economic systems evolve when the underlying logic of production, coordination, and value creation changes. Over time, markets have transitioned through distinct structural phases, each defined not only by technology but by how work is organized and how value is exchanged.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              This progression is captured in the 4 Economy Model, which illustrates the structural transition from the Agricultural Economy to the Industrial Economy, then to the Digital Economy, and now to Economy 4.0. Each stage reflects a transformation in economic coordination.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Economy 4.0 builds upon digital connectivity but introduces a deeper shift. It embeds intelligence directly into economic systems. Artificial intelligence, advanced analytics, cloud infrastructures, and smart technologies no longer simply support operations; they increasingly shape how decisions are made, how markets adjust, and how value is created in real time.
            </p>
            <div className="bg-[#1e2348]/10 border-l-4 border-[#1e2348] p-6 my-6 rounded-r-lg">
              <p className="text-[#1e2348] text-[15px] leading-[24px] font-semibold mb-2">
                Key Insight:
              </p>
              <p className="text-[#4B5563] text-[15px] leading-[24px] mb-0">
                The defining characteristic of Economy 4.0 is not digitalization alone but intelligent responsiveness at scale. Data becomes a strategic asset not merely for reporting but for guiding action.
              </p>
            </div>
          </section>

          {/* Digital Cognitive Organizations */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Digital Cognitive Organizations (DCOs)
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              If Economy 4.0 reshapes markets as adaptive, data-driven systems, then organizations must be structured to operate within that reality. Traditional hierarchies — optimized for stability, efficiency, and functional separation — struggle in environments defined by rapid feedback, ecosystem interdependence, and continuous technological change.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-6">
              The Digital Cognitive Organization (DCO) represents that shift. A DCO is an enterprise intentionally designed to integrate human and machine intelligence, operate through unified digital infrastructures, and continuously learn from data.
            </p>

            <h3 className="text-[#1e2348] text-[22px] leading-[30px] font-bold mb-4 mt-8">
              Key Characteristics of DCOs
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Perfect Life Transactions",
                  desc: "DCOs aim to deliver seamless, error-free, and highly personalized transactions, enhancing customer experiences across all interactions."
                },
                {
                  title: "Unified Digital Business Platform (DBP)",
                  desc: "The entire organization operates on a unified digital platform that integrates processes, data, and applications, enabling frictionless operations and real-time decision-making."
                },
                {
                  title: "Man-Machine Collaboration",
                  desc: "DCOs leverage AI-powered digital workers alongside human workers to accelerate tasks, improve quality, and drive innovation."
                },
                {
                  title: "Architectural Data Utilization",
                  desc: "DCOs systematically collect and analyze architectural data to drive continuous improvement and strategic alignment."
                },
                {
                  title: "Continuous Improvement and Alignment",
                  desc: "Through ongoing analysis and feedback loops, DCOs ensure that their operations and strategies remain aligned with their goals, market dynamics, and technological advancements."
                },
                {
                  title: "Advanced Technology Adoption",
                  desc: "DCOs strategically adopt and integrate advanced technologies such as AI, IoT, machine learning, and blockchain to enhance capabilities and maintain a competitive advantage."
                },
                {
                  title: "Transformation Leadership",
                  desc: "Leadership in DCOs focuses on fostering a culture of digital agility, innovation, and empowerment."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-[#1e2348] rounded-full flex items-center justify-center shrink-0 mt-1">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[#1e2348] text-[16px] leading-[24px] font-semibold">
                      {item.title}
                    </p>
                    <p className="text-[#4B5563] text-[15px] leading-[23px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Business Model Innovation */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Business Model Innovation in Economy 4.0
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              In Economy 4.0, competitive advantage is determined less by what an organization produces and more by how it creates, delivers, and captures value within interconnected ecosystems. Traditional business models — built around linear value chains and asset ownership — struggle to keep pace with markets defined by real-time data flows, platform coordination, and continuously shifting customer expectations.
            </p>

            <h3 className="text-[#1e2348] text-[22px] leading-[30px] font-bold mb-4 mt-8">
              Case Study: Precision Agriculture Ecosystems
            </h3>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              A compelling illustration of this logic is John Deere's transformation into a precision agriculture platform provider. Historically known for manufacturing agricultural equipment, John Deere has evolved its business model by embedding digital intelligence into machinery and connecting farmers through data-driven ecosystems.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Modern John Deere equipment integrates sensors, GPS systems, and connectivity infrastructure that collect real-time field data. This data feeds into digital platforms such as the John Deere Operations Center, where farmers monitor crop performance, optimize planting density, manage fertilizer application, and coordinate operational decisions.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-lg">
              <p className="text-[#1e2348] text-[15px] leading-[24px] font-semibold mb-2">
                Key Takeaway:
              </p>
              <p className="text-[#4B5563] text-[15px] leading-[24px] mb-0">
                The product is no longer solely the tractor or harvester; it is an integrated decision-support ecosystem demonstrating platform-centric coordination, data-driven decision systems, and human-machine collaboration.
              </p>
            </div>
          </section>

          {/* Strategic Imperatives */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Strategic Imperatives in Economy 4.0
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-6">
              Economy 4.0 does not merely introduce new technologies or business models; it reshapes the strategic logic of the enterprise. Three strategic imperatives emerge from this shift:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#1e2348]/10 to-white p-6 rounded-lg border border-[#1e2348]/30">
                <h4 className="text-[#1e2348] text-[18px] leading-[26px] font-bold mb-2">
                  1. From Digital Projects to Architectural Coherence
                </h4>
                <p className="text-[#4B5563] text-[15px] leading-[23px]">
                  Strategic advantage depends on designing systems that allow intelligence to move seamlessly across the organization. Digital investments must reinforce a coherent architecture rather than proliferate disconnected tools.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#1e2348]/10 to-white p-6 rounded-lg border border-[#1e2348]/30">
                <h4 className="text-[#1e2348] text-[18px] leading-[26px] font-bold mb-2">
                  2. From Efficiency Optimization to Adaptive Capacity
                </h4>
                <p className="text-[#4B5563] text-[15px] leading-[23px]">
                  While efficiency remains necessary, it is no longer sufficient. Leaders must prioritize adaptability — the capacity to reconfigure processes, partnerships, and offerings in response to emerging signals.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#1e2348]/10 to-white p-6 rounded-lg border border-[#1e2348]/30">
                <h4 className="text-[#1e2348] text-[18px] leading-[26px] font-bold mb-2">
                  3. From Industry Boundaries to Ecosystem Positioning
                </h4>
                <p className="text-[#4B5563] text-[15px] leading-[23px]">
                  Strategic positioning extends beyond market share within an industry. Organizations must define their role within ecosystems: orchestrator, integrator, or specialized participant.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Conclusion
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Economy 4.0 represents more than technological acceleration. It signals a structural reconfiguration of how value is created, coordinated, and sustained. Markets increasingly function as interconnected, data-driven ecosystems in which intelligence flows continuously and competitive advantage depends on adaptive capacity rather than static scale.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              The Digital Cognitive Organization emerges as the structural response to this economic shift. By integrating human judgment with machine intelligence, embedding learning into digital platforms, and aligning front-end engagement with core operations and enabling infrastructure, the DCO transforms cognition into an operating principle.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px]">
              The choice is structural: remain optimized for a previous economy, or redesign for a cognitive one.
            </p>
          </section>

          {/* Closing Quote */}
          <div className="bg-gradient-to-r from-[#1e2348]/10 to-[#1e2348]/5 border-l-4 border-[#1e2348] p-6 rounded-r-lg">
            <p className="text-[#1e2348] text-[18px] leading-[28px] italic font-medium mb-2">
              "We are entering an era where only cognitive organizations will thrive. Those that fail to transform risk obsolescence."
            </p>
            <p className="text-[#4B5563] text-[14px] leading-[20px] font-semibold">
              — Dr. Stephane Niango
            </p>
          </div>
        </div>
      </Card>

      {/* Text Selection Note Popup */}
      {showNotePopup && (
        <div
          className="fixed z-50"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border-2 border-[#1e2348] p-4 w-80">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[#1e2348] text-[14px] font-bold">Add Note</h4>
              <button
                onClick={() => {
                  setShowNotePopup(false);
                  setCurrentNote("");
                  setSelectedText("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-[#1e2348]/5 p-2 rounded mb-3 max-h-20 overflow-y-auto">
              <p className="text-[#4B5563] text-[12px] italic">"{selectedText}"</p>
            </div>

            <div className="relative">
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Type your note or use voice..."
                className="w-full p-2 border border-gray-300 rounded text-[14px] resize-none focus:border-[#ff6b4d] focus:outline-none"
                rows={3}
              />
              {recognition && (
                <button
                  onClick={toggleNoteDictation}
                  className={`absolute bottom-2 right-2 p-1.5 rounded ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={isListening ? 'Stop dictation' : 'Start dictation'}
                >
                  <Mic className="w-3 h-3" />
                </button>
              )}
            </div>

            <Button
              onClick={handleSaveNote}
              disabled={!currentNote.trim()}
              className="w-full mt-3 bg-[#ff6b4d] hover:bg-[#e66045] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          </div>
        </div>
      )}

      {/* Notes Panel */}
      {showNotesPanel && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-40 overflow-y-auto border-l-2 border-[#1e2348]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#1e2348] text-[20px] font-bold">My Notes</h3>
              <button
                onClick={() => setShowNotesPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-[14px]">
                  No notes yet. Highlight text in the article to add notes.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-[#1e2348]/5 rounded-lg p-4 border border-[#1e2348]/20"
                  >
                    <div className="bg-white p-2 rounded mb-2 border-l-4 border-[#ff6b4d]">
                      <p className="text-[#4B5563] text-[12px] italic">
                        "{note.highlightedText}"
                      </p>
                    </div>
                    <p className="text-[#1e2348] text-[14px] mb-2">{note.noteText}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-[11px]">
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Share Button with Dropdown */}
                        <div className="relative share-menu-container">
                          <button
                            onClick={() => setShareMenuOpen(shareMenuOpen === note.id ? null : note.id)}
                            className="flex items-center gap-1 text-[#1e2348] hover:text-[#ff6b4d] text-[12px] transition-colors"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                          </button>
                          
                          {/* Share Dropdown Menu */}
                          {shareMenuOpen === note.id && (
                            <div className="absolute right-0 bottom-full mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                              <button
                                onClick={() => handleShareNote(note, 'twitter')}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2"
                              >
                                <span className="text-[#1DA1F2]">𝕏</span>
                                <span>Twitter</span>
                              </button>
                              <button
                                onClick={() => handleShareNote(note, 'facebook')}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2"
                              >
                                <span className="text-[#1877F2]">f</span>
                                <span>Facebook</span>
                              </button>
                              <button
                                onClick={() => handleShareNote(note, 'linkedin')}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2"
                              >
                                <span className="text-[#0A66C2]">in</span>
                                <span>LinkedIn</span>
                              </button>
                              <button
                                onClick={() => handleShareNote(note, 'whatsapp')}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2"
                              >
                                <span className="text-[#25D366]">📱</span>
                                <span>WhatsApp</span>
                              </button>
                              <button
                                onClick={() => handleShareNote(note, 'copy')}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
                              >
                                <span>📋</span>
                                <span>Copy</span>
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-500 hover:text-red-700 text-[12px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Reading Assistant */}
      {showAIAssistant && (
        <div className="fixed right-0 top-16 bottom-0 w-[380px] sm:w-[420px] bg-white shadow-2xl z-40 border-l-2 border-[#ff6b4d] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] p-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white text-[16px] font-bold">AI Reading Tutor</h3>
                <p className="text-white/80 text-[11px]">Ask me anything about this article</p>
              </div>
            </div>
            <button
              onClick={() => setShowAIAssistant(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 bg-[#ff6b4d]/5 border-b border-[#ff6b4d]/20 flex-shrink-0">
            <p className="text-[#4B5563] text-[11px] font-medium mb-2">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickAction('summarize')}
                className="flex items-center gap-2 bg-white hover:bg-[#ff6b4d]/10 border border-[#ff6b4d]/30 text-[#1e2348] px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
              >
                <FileText className="w-3 h-3" />
                <span>Summarize</span>
              </button>
              <button
                onClick={() => handleQuickAction('explain')}
                className="flex items-center gap-2 bg-white hover:bg-[#ff6b4d]/10 border border-[#ff6b4d]/30 text-[#1e2348] px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
              >
                <Lightbulb className="w-3 h-3" />
                <span>Explain DCO</span>
              </button>
              <button
                onClick={() => handleQuickAction('notes')}
                className="flex items-center gap-2 bg-white hover:bg-[#ff6b4d]/10 border border-[#ff6b4d]/30 text-[#1e2348] px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
              >
                <BookMarked className="w-3 h-3" />
                <span>Generate Notes</span>
              </button>
              <button
                onClick={() => handleQuickAction('references')}
                className="flex items-center gap-2 bg-white hover:bg-[#ff6b4d]/10 border border-[#ff6b4d]/30 text-[#1e2348] px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                <span>Key References</span>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
            {chatMessages.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-[#ff6b4d]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-[#ff6b4d]" />
                </div>
                <h4 className="text-[#1e2348] text-[14px] font-bold mb-2">
                  Welcome! I'm your AI Reading Tutor
                </h4>
                <p className="text-[#4B5563] text-[12px] mb-2">
                  I can help you understand this article better by:
                </p>
                <ul className="text-left text-[#4B5563] text-[11px] space-y-1 max-w-xs mx-auto">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b4d] mt-0.5">•</span>
                    <span>Summarizing sections or the entire article</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b4d] mt-0.5">•</span>
                    <span>Explaining complex concepts and terminology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b4d] mt-0.5">•</span>
                    <span>Generating notes and key takeaways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b4d] mt-0.5">•</span>
                    <span>Identifying important references and quotes</span>
                  </li>
                </ul>
                <p className="text-[#4B5563] text-[11px] mt-2">
                  Try the quick actions above or ask me anything!
                </p>
              </div>
            ) : (
              <>
                {chatMessages.map((msg) => (
                  <div key={msg.id}>
                    <div className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-full flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-[#ff6b4d] to-[#e66045] text-white'
                            : 'bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] text-gray-800 border border-[#ffd1c8]'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        </div>
                        <span className={`text-[10px] mt-1 block ${
                          msg.role === 'user' ? 'text-right text-gray-500' : 'text-left text-gray-500'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isAIThinking && (
                  <div className="flex justify-start">
                    <div className="bg-[#ff6b4d]/10 border border-[#ff6b4d]/20 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#ff6b4d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-[#ff6b4d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-[#ff6b4d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-[#4B5563] text-[12px]">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about this article..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:border-[#ff6b4d] focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isAIThinking}
                className="bg-[#ff6b4d] hover:bg-[#e66045] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
