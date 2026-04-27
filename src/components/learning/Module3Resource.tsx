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

export const Module3Resource = () => {
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
    Success Metrics of Economy 4.0
    
    In the age of intelligent economies, the true measure of success isn't profit alone—it's the ability to adapt, 
    innovate, and deliver value in real time.
    
    Executive Summary. Imagine a world where success is no longer measured by traditional financial outcomes alone 
    but by an organization's capacity to anticipate change, foster real-time innovation, and deliver hyper-personalized 
    customer experiences. Welcome to Economy 4.0.
    
    Introduction to Success Metrics. Economy 4.0 marks a significant evolution, transitioning from digital enablement 
    to cognitive capability. Traditional success measures focused primarily on financial results are no longer sufficient.
    
    Key Metrics for Business Outcomes. To accurately reflect success in Economy 4.0, businesses must track metrics that 
    extend beyond traditional financial indicators including Revenue Growth Rate, Market Share, ROI, Innovation Index, 
    and Customer Lifetime Value.
    
    Customer-Centric Metrics. Customer value and experience are core drivers in Economy 4.0. Key metrics include Net 
    Promoter Score, Customer Satisfaction Score, Customer Retention Rate, Customer Effort Score, and Churn Rate.
    
    Operational Metrics. Efficiency and productivity define organizational success in Economy 4.0. Crucial metrics include 
    Operational Cost Ratio, Asset Utilization Rate, Employee Productivity, Process Efficiency, and First Pass Yield.
    
    Conclusion. Success in Economy 4.0 goes beyond financial performance—it is measured by an organization's ability to 
    innovate, adapt, and create sustainable value through the Triple Bottom Line framework.
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
      if (lowerMessage.includes('introduction')) {
        return "The Introduction explains that Economy 4.0 requires a shift from traditional financial-only metrics to a holistic approach integrating financial performance with customer value, sustainability, and workforce intelligence. The Triple Bottom Line (People, Planet, Profit) and Human Capital Theory are foundational frameworks. Success depends on real-time insights, agility, and continuous adaptation.";
      } else if (lowerMessage.includes('business outcome') || lowerMessage.includes('business metric')) {
        return "Business outcome metrics in Economy 4.0 include: Revenue Growth Rate (market responsiveness), Market Share (competitive positioning), ROI (digital transformation effectiveness), Innovation Index (continuous innovation capacity), and Customer Lifetime Value (long-term relationship value). Companies like Amazon and Tesla use these metrics to maintain market dominance and industry leadership.";
      } else if (lowerMessage.includes('customer')) {
        return "Customer-centric metrics are core drivers in Economy 4.0: Net Promoter Score (NPS) for loyalty, Customer Satisfaction Score (CSAT) for immediate satisfaction, Customer Retention Rate for long-term relationships, Customer Effort Score (CES) for interaction ease, and Churn Rate for customer turnover. As Jeff Bezos says: 'Obsess over customers, not competitors.'";
      } else if (lowerMessage.includes('operational')) {
        return "Operational metrics define efficiency in Economy 4.0: Operational Cost Ratio (cost management efficiency), Asset Utilization Rate (resource productivity), Employee Productivity (workforce effectiveness), Process Efficiency/Cycle Time (workflow optimization), and First Pass Yield (quality without rework). Real-time monitoring and automation form the foundation of operational excellence.";
      } else {
        return "This whitepaper discusses Success Metrics for Economy 4.0, covering three vital dimensions: business outcomes, customer-centricity, and operational efficiency. It introduces the Triple Bottom Line framework (People, Planet, Profit) and emphasizes that success requires measuring innovation, adaptability, and sustainable value creation—not just financial performance.";
      }
    }
    
    // Explanation requests
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('what are')) {
      if (lowerMessage.includes('triple bottom line') || lowerMessage.includes('tbl')) {
        return "The Triple Bottom Line (TBL) framework emphasizes that organizations must balance three dimensions: People (social responsibility and human capital), Planet (environmental sustainability), and Profit (financial performance). In Economy 4.0, this ensures long-term resilience by tracking not just revenue but also impact on workforce development, ethical governance, and environmental responsibility.";
      } else if (lowerMessage.includes('innovation index')) {
        return "The Innovation Index reflects an organization's capacity for continuous innovation. It tracks the introduction of new digital services, AI-driven experiences, technological advancements, and R&D effectiveness. Companies like Amazon and Tesla use this metric to measure their ability to push technological boundaries and maintain competitive advantage.";
      } else if (lowerMessage.includes('customer lifetime value') || lowerMessage.includes('clv')) {
        return "Customer Lifetime Value (CLV) quantifies the total financial impact of a customer relationship over its entire duration. It highlights long-term value generation rather than short-term transactions, helping organizations understand which customer segments are most valuable and where to invest in retention and growth strategies.";
      } else if (lowerMessage.includes('nps') || lowerMessage.includes('net promoter')) {
        return "Net Promoter Score (NPS) captures customer loyalty and willingness to advocate for an organization's products or services. It's calculated by asking customers how likely they are to recommend the company (0-10 scale). NPS is a leading indicator of growth, as loyal customers drive word-of-mouth marketing and repeat business.";
      }
    }
    
    // Key points requests
    if (lowerMessage.includes('key point') || lowerMessage.includes('important') || lowerMessage.includes('takeaway')) {
      return "Key takeaways from this whitepaper:\n\n1. Success in Economy 4.0 requires multidimensional metrics beyond financial performance\n2. Triple Bottom Line framework balances People, Planet, and Profit\n3. Business metrics: Revenue Growth, Market Share, ROI, Innovation Index, CLV\n4. Customer metrics: NPS, CSAT, Retention Rate, CES, Churn Rate\n5. Operational metrics: Cost Ratio, Asset Utilization, Productivity, Cycle Time, FPY\n6. Real-time insights and data-driven decision-making are essential for competitive advantage";
    }
    
    // Default helpful response
    return "I'm here to help you understand Success Metrics in Economy 4.0! You can ask me to:\n\n• Summarize any section (e.g., 'Summarize customer metrics')\n• Explain concepts (e.g., 'What is Triple Bottom Line?')\n• Clarify specific metrics (e.g., 'Explain Innovation Index')\n• Identify key points and takeaways\n• Generate notes for you\n\nWhat would you like to know?";
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
              Module 3 Resource: Success Metrics of Economy 4.0
            </h3>
            <p className="text-[#4B5563] text-[14px] leading-[20px]">
              VOLUME 1 | Digital Economy 4.0 : WP#10 (DE & Success Metrics)
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
              In the age of intelligent economies, the true measure of success isn't profit alone—it's the ability to adapt, 
              innovate, and deliver value in real time.
            </p>
          </div>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Executive Summary
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Imagine a world where success is no longer measured by traditional financial outcomes alone but by an organization's 
              capacity to anticipate change, foster real-time innovation, and deliver hyper-personalized customer experiences. 
              Welcome to Economy 4.0—a transformative era characterized by digital intelligence, seamless connectivity, and the 
              integration of cognitive technologies.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              A modern approach to success metrics is essential for navigating this landscape, focusing on three vital dimensions: 
              business outcomes, customer-centricity, and operational efficiency. The Triple Bottom Line Framework, emphasizing 
              sustainability through people, planet, and profit, serves as a critical lens for evaluating long-term impact.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px]">
              By identifying and leveraging these advanced metrics, business leaders can unlock actionable insights and ensure their 
              organizations remain competitive in an increasingly fast-paced digital economy. Are you ready to measure what truly 
              matters and redefine success for your organization in the age of Economy 4.0?
            </p>
          </section>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Executive Summary
            </h2>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Imagine a world where success is no longer measured by traditional financial outcomes alone but by an organization's 
              capacity to anticipate change, foster real-time innovation, and deliver hyper-personalized customer experiences. 
              Welcome to Economy 4.0—a transformative era characterized by digital intelligence, seamless connectivity, and the 
              integration of cognitive technologies.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              A modern approach to success metrics is essential for navigating this landscape, focusing on three vital dimensions: 
              business outcomes, customer-centricity, and operational efficiency. The Triple Bottom Line Framework, emphasizing 
              sustainability through people, planet, and profit, serves as a critical lens for evaluating long-term impact.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px]">
              By identifying and leveraging these advanced metrics, business leaders can unlock actionable insights and ensure their 
              organizations remain competitive in an increasingly fast-paced digital economy. Are you ready to measure what truly 
              matters and redefine success for your organization in the age of Economy 4.0?
            </p>
          </section>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-[#1e2348] text-[28px] leading-[36px] font-bold mb-4 pb-2 border-b-2 border-[#1e2348]/30">
              Introduction to Success Metrics in Economy 4.0
            </h2>
            <div className="bg-[#1e2348]/10 border-l-4 border-[#1e2348] p-6 my-6 rounded-r-lg">
              <p className="text-[#1e2348] text-[15px] leading-[24px] italic mb-0">
                "You can't manage what you can't measure."
              </p>
              <p className="text-[#4B5563] text-[13px] mt-1">— W. Edwards Deming, Quality Management Expert</p>
            </div>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              Economy 4.0 marks a significant evolution, transitioning from digital enablement to cognitive capability. Organizations 
              today must operate in ecosystems characterized by intelligent technologies, hyper-connected environments, and data-driven 
              decision-making. Traditional success measures focused primarily on financial results are no longer sufficient in capturing 
              the multidimensional nature of modern business.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px] mb-4">
              The Triple Bottom Line (TBL) Theory, which emphasizes People, Planet, and Profit, provides a crucial foundation for 
              redefining success in this digital era. Economy 4.0 demands that organizations move beyond profit-centric performance 
              metrics to include social responsibility and environmental sustainability.
            </p>
            <p className="text-[#4B5563] text-[16px] leading-[26px]">
              Success in Economy 4.0 depends on real-time insights, agility, and continuous adaptation to changing environments. 
              Metrics must align closely with strategic goals, offering clear visibility into business performance to support rapid 
              decision-making.
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
