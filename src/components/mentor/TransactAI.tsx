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
  AlertTriangle,
  FileText,
  Headphones,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import type { AdminAICapabilityId } from '@/components/admin/adminAICapabilities';
import {
  ADMIN_AI_CAPABILITIES,
  ADMIN_AI_CAPABILITY_LABELS,
} from '@/components/admin/adminAICapabilities';
import { AdminAICapabilityContent, CAPABILITY_CONFIG } from '@/components/admin/AdminAICapabilityContent';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'mentor';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  insights?: { icon: any; text: string; color: string }[];
}

interface TransactAIProps {
  embedded?: boolean;
  variant?: "learner" | "instructor" | "admin";
  enrolledCourses?: number;
  completedCourses?: number;
  draftCoursesCount?: number;
  pendingReviewsCount?: number;
  averageProgress?: number;
  learningGoal?: string;
  skillLevel?: string;
  streak?: number;
  contextualHint?: boolean;
  onCapabilitySelect?: (capability: AdminAICapabilityId) => void;
  adminCapability?: AdminAICapabilityId | null;
  onClearCapability?: () => void;
}

const learnerQuickInsights = [
  { icon: TrendingUp, text: "Progress Check", action: "progress", color: "text-green-600" },
  { icon: Target, text: "Set Goals", action: "goals", color: "text-blue-600" },
  { icon: Lightbulb, text: "Get Advice", action: "advice", color: "text-amber-600" },
  { icon: BookOpen, text: "Next Steps", action: "nextsteps", color: "text-[#ff6b4d]" },
];

const instructorQuickInsights = [
  { icon: BookOpen, text: "Course outline", action: "outline", color: "text-[#ff6b4d]" },
  { icon: Target, text: "Module plan", action: "modules", color: "text-blue-600" },
  { icon: Lightbulb, text: "Outcomes", action: "outcomes", color: "text-amber-600" },
  { icon: Zap, text: "6XD mapping", action: "framework", color: "text-green-600" },
];

const adminQuickInsights: {
  icon: typeof TrendingUp;
  text: string;
  action: string;
  capability: AdminAICapabilityId;
  color: string;
}[] = [
  { icon: TrendingUp, text: "Platform summary", action: "summary", capability: "ai-assistant", color: "text-green-600" },
  { icon: AlertTriangle, text: "Cohort risks", action: "cohort", capability: "ai-cohort", color: "text-amber-600" },
  { icon: FileText, text: "Content drafting", action: "content", capability: "ai-content", color: "text-[#ff6b4d]" },
  { icon: Headphones, text: "Support triage", action: "support", capability: "ai-support", color: "text-blue-600" },
];

export const TransactAI = ({ 
  embedded = false,
  variant = "learner",
  enrolledCourses = 0, 
  completedCourses = 0,
  draftCoursesCount = 0,
  pendingReviewsCount = 0,
  averageProgress = 0,
  learningGoal = '',
  skillLevel = 'Beginner',
  streak = 0,
  onCapabilitySelect,
  adminCapability = null,
  onClearCapability,
  contextualHint = false,
}: TransactAIProps) => {
  const isAdmin = variant === "admin";
  const isInstructor = variant === "instructor";
  const activeCapabilityMeta = isAdmin && adminCapability
    ? ADMIN_AI_CAPABILITIES.find((item) => item.id === adminCapability)
    : null;
  const ActiveCapabilityIcon = activeCapabilityMeta?.icon;
  const capabilityQuickInsights = adminCapability
    ? CAPABILITY_CONFIG[adminCapability].tools.slice(0, 4).map((tool, index) => ({
        icon: [TrendingUp, Target, Lightbulb, BookOpen][index] ?? Lightbulb,
        text: tool.action,
        action: tool.action,
        color: index % 2 === 0 ? "text-[#ff6b4d]" : "text-blue-600",
      }))
    : [];
  const quickInsights = isAdmin
    ? adminCapability
      ? capabilityQuickInsights
      : adminQuickInsights
    : isInstructor
      ? instructorQuickInsights
      : learnerQuickInsights;
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(embedded);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  useEffect(() => {
    if (isAdmin && adminCapability) {
      setMessages([]);
      return;
    }

    const greeting = isAdmin
      ? getAdminGreeting()
      : isInstructor
        ? getInstructorGreeting()
        : getPersonalizedGreeting();
    setMessages([{
      id: '1',
      type: 'mentor',
      content: greeting.message,
      timestamp: new Date(),
      suggestions: greeting.suggestions,
      insights: greeting.insights
    }]);
  }, [isInstructor, isAdmin, adminCapability, draftCoursesCount, enrolledCourses, pendingReviewsCount]);

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

  useEffect(() => {
    const handleOpenMentor = (event: Event) => {
      const detail = (event as CustomEvent<{ prompt?: string }>).detail;
      setIsOpen(true);
      setIsMinimized(false);
      if (detail?.prompt) {
        setInputValue(detail.prompt);
      }
    };

    window.addEventListener('dtma:open-ai-mentor', handleOpenMentor);
    return () => window.removeEventListener('dtma:open-ai-mentor', handleOpenMentor);
  }, []);

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

  const getInstructorGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    let message = `${timeGreeting}, ${firstName}!\n\n`;
    message += "I'm your AI Cockpit assistant for course authoring. I help you draft outlines, modules, learning outcomes, and marketplace-ready course structures.\n\n";

    if (draftCoursesCount > 0) {
      message += `You have ${draftCoursesCount} draft course${draftCoursesCount > 1 ? 's' : ''} in progress. I can help you refine any of them or start a new one.`;
    } else {
      message += "You don't have any draft courses yet. Tell me your topic and 6XD dimension, and I'll help you build a first draft outline.";
    }

    return {
      message,
      suggestions: [
        'Outline a new course',
        'Draft module structure',
        'Write learning outcomes',
        'Map to 6XD framework',
      ],
      insights: [],
    };
  };

  const getAdminGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    let message = `${timeGreeting}, ${firstName}!\n\n`;
    message +=
      "I'm your AI Cockpit for platform operations. I can help with summaries, cohort intelligence, content authoring, support triage, and every other AI capability from one place.\n\n";

    if (pendingReviewsCount > 0) {
      message += `You have ${pendingReviewsCount} course${pendingReviewsCount > 1 ? 's' : ''} awaiting review. I can help prioritize next actions.`;
    } else {
      message += 'Pick a capability on the right or ask me where to start.';
    }

    const insights: { icon: typeof Clock; text: string; color: string }[] = [];
    if (pendingReviewsCount > 0) {
      insights.push({
        icon: Clock,
        text: `${pendingReviewsCount} pending review${pendingReviewsCount > 1 ? 's' : ''}`,
        color: 'text-amber-600',
      });
    }

    return {
      message,
      suggestions: [
        'Platform activity summary',
        'Review cohort risks',
        'Open content authoring',
        'Triage support requests',
      ],
      insights,
    };
  };

  const getAdminResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('summary') ||
      lowerMessage.includes('report') ||
      lowerMessage.includes('activity')
    ) {
      onCapabilitySelect?.('ai-assistant');
      return {
        message:
          'I can open the Operations Assistant workspace for platform summaries and operational reports. Use the capability panel to generate a summary or draft a report.',
        suggestions: ['Open faculty support', 'Review cohort risks', 'Analyze feedback'],
        insights: [{ icon: TrendingUp, text: 'Operations Assistant', color: 'text-green-600' }],
      };
    }

    if (
      lowerMessage.includes('cohort') ||
      lowerMessage.includes('risk') ||
      lowerMessage.includes('at-risk')
    ) {
      onCapabilitySelect?.('ai-cohort');
      return {
        message:
          'Cohort Intelligence highlights at-risk learners, disengagement patterns, and training needs. I have opened that workspace for you.',
        suggestions: ['Early intervention ideas', 'Training needs analysis', 'Open support triage'],
        insights: [{ icon: AlertTriangle, text: 'Cohort intelligence', color: 'text-amber-600' }],
      };
    }

    if (
      lowerMessage.includes('content') ||
      lowerMessage.includes('outline') ||
      lowerMessage.includes('author')
    ) {
      onCapabilitySelect?.('ai-content');
      return {
        message:
          'Content Authoring helps you draft lesson outlines, exercises, and learning objectives while keeping humans in control.',
        suggestions: ['Generate quiz ideas', 'Open assessment tools', 'Localization help'],
        insights: [{ icon: FileText, text: 'Content authoring', color: 'text-[#ff6b4d]' }],
      };
    }

    if (
      lowerMessage.includes('support') ||
      lowerMessage.includes('triage') ||
      lowerMessage.includes('ticket')
    ) {
      onCapabilitySelect?.('ai-support');
      return {
        message:
          'Support Triage classifies requests, drafts replies, and routes issues to the right team. I have opened that workspace.',
        suggestions: ['Moderation queue', 'Faculty support mode', 'Feedback analysis'],
        insights: [{ icon: Headphones, text: 'Support triage', color: 'text-blue-600' }],
      };
    }

    if (lowerMessage.includes('faculty') || lowerMessage.includes('mentor')) {
      onCapabilitySelect?.('ai-faculty');
      return {
        message:
          'Faculty Support mode provides learner progress summaries, mentoring suggestions, and intervention recommendations.',
        suggestions: ['Open assessment tools', 'Cohort risks', 'Platform summary'],
        insights: [],
      };
    }

    if (lowerMessage.includes('assessment') || lowerMessage.includes('quiz') || lowerMessage.includes('grading')) {
      onCapabilitySelect?.('ai-assessment');
      return {
        message:
          'Assessment Tools cover quiz generation, grading helpers, and rubric matching for open-ended responses.',
        suggestions: ['Draft course content', 'Analyze feedback', 'Localization'],
        insights: [],
      };
    }

    if (lowerMessage.includes('feedback') || lowerMessage.includes('sentiment')) {
      onCapabilitySelect?.('ai-feedback');
      return {
        message:
          'Feedback Analysis tracks sentiment trends, recurring complaints, and improvement opportunities across courses.',
        suggestions: ['Discussion moderation', 'Support triage', 'Cohort intelligence'],
        insights: [],
      };
    }

    if (lowerMessage.includes('moderation') || lowerMessage.includes('forum')) {
      onCapabilitySelect?.('ai-moderation');
      return {
        message:
          'Discussion Moderation flags inappropriate content and surfaces a moderator review queue with suggested responses.',
        suggestions: ['Support triage', 'Feedback analysis', 'Platform summary'],
        insights: [],
      };
    }

    if (lowerMessage.includes('local') || lowerMessage.includes('translat')) {
      onCapabilitySelect?.('ai-localization');
      return {
        message:
          'Localization assists with content translation, cultural adaptation, and consistency across multilingual program delivery.',
        suggestions: ['Content authoring', 'Assessment tools', 'Faculty support'],
        insights: [],
      };
    }

    return {
      message:
        'I can route you to any platform AI capability:\n\n' +
        '• Operations summaries and reports\n' +
        '• Faculty support and mentoring insights\n' +
        '• Content authoring and assessments\n' +
        '• Cohort risk and feedback analysis\n' +
        '• Moderation, support triage, and localization\n\n' +
        'Tell me what you need or pick a capability on the right.',
      suggestions: [
        'Platform activity summary',
        'Review cohort risks',
        'Open content authoring',
        'Triage support requests',
      ],
      insights: [],
    };
  };

  const getAdminCapabilityResponse = (
    userMessage: string,
    capability: AdminAICapabilityId
  ) => {
    const config = CAPABILITY_CONFIG[capability];
    const label = ADMIN_AI_CAPABILITY_LABELS[capability];

    return {
      message:
        `You're in ${label}.\n\n${config.heroDescription}\n\n` +
        `You asked: "${userMessage.trim()}"\n\n` +
        'Use the workspace actions above or tell me which deliverable you want to generate next.',
      suggestions: config.tools.map((tool) => tool.action).slice(0, 4),
      insights: [{ icon: Lightbulb, text: label, color: 'text-[#ff6b4d]' }],
    };
  };

  const getInstructorResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('outline') ||
      lowerMessage.includes('new course') ||
      lowerMessage.includes('draft')
    ) {
      return {
        message:
          `Here is a starter draft outline you can use:\n\n` +
          `Course title: [Working title]\n` +
          `6XD dimension: [Pick one dimension]\n` +
          `Audience: [Role and experience level]\n\n` +
          `Module 1: Foundations\n` +
          `• Lesson: Context and business problem\n` +
          `• Lesson: Key concepts and terminology\n` +
          `• Activity: Diagnostic checklist\n\n` +
          `Module 2: Application\n` +
          `• Lesson: Framework walkthrough\n` +
          `• Lesson: Worked example\n` +
          `• Assignment: Apply to a real scenario\n\n` +
          `Module 3: Handover\n` +
          `• Lesson: Implementation playbook\n` +
          `• Assessment: Knowledge check\n` +
          `• Resource pack: Templates and references\n\n` +
          `Tell me your topic and I will tailor this into a full draft.`,
        suggestions: ['Add assessments', 'Suggest pricing tier', 'Write lesson titles', 'Create module 2 detail'],
        insights: [{ icon: BookOpen, text: 'Draft-ready structure', color: 'text-[#ff6b4d]' }],
      };
    }

    if (lowerMessage.includes('module') || lowerMessage.includes('structure') || lowerMessage.includes('curriculum')) {
      return {
        message:
          `Recommended module structure for a DTMA draft course:\n\n` +
          `1. Context and outcomes (why this matters)\n` +
          `2. Core methods and models (what to do)\n` +
          `3. Guided application (how to apply)\n` +
          `4. Assessment and handover (prove competence)\n\n` +
          `Aim for 3 to 5 modules with 3 to 6 lessons each. Keep lesson titles action-oriented and map each lesson to one measurable outcome.`,
        suggestions: ['Generate lesson list', 'Add quiz ideas', 'Suggest duration', 'Review my draft'],
        insights: [{ icon: Target, text: 'Marketplace-ready pacing', color: 'text-blue-600' }],
      };
    }

    if (lowerMessage.includes('outcome') || lowerMessage.includes('objective')) {
      return {
        message:
          `Sample learning outcomes for your draft:\n\n` +
          `• Explain the business drivers for the chosen transformation theme\n` +
          `• Apply the core framework to a realistic organisational scenario\n` +
          `• Evaluate options and recommend a practical next-step roadmap\n` +
          `• Produce a handover artefact suitable for stakeholder review\n\n` +
          `Share your course topic and I will rewrite these outcomes in your voice.`,
        suggestions: ['Rewrite for executives', 'Rewrite for practitioners', 'Add assessment rubric', 'Shorten for catalog copy'],
        insights: [{ icon: Lightbulb, text: 'Outcome-led drafting', color: 'text-amber-600' }],
      };
    }

    if (lowerMessage.includes('6xd') || lowerMessage.includes('framework') || lowerMessage.includes('dimension')) {
      return {
        message:
          `Map your draft course to one primary 6XD dimension:\n\n` +
          `• Digital Economy\n` +
          `• Digital Cognitive Organisation\n` +
          `• Digital Business Platform\n` +
          `• Digital Transformation 2.0\n` +
          `• Digital Worker and Workspace\n` +
          `• Digital Accelerators\n\n` +
          `Pick the dimension that best matches the transformation outcome, then align module titles and assessments to that dimension's language.`,
        suggestions: ['Pick dimension for my topic', 'Suggest course title', 'Align modules to DE', 'Write catalog description'],
        insights: [{ icon: Zap, text: '6XD-aligned catalog copy', color: 'text-green-600' }],
      };
    }

    if (lowerMessage.includes('assessment') || lowerMessage.includes('quiz')) {
      return {
        message:
          `Assessment ideas for your draft course:\n\n` +
          `• Module checkpoint quizzes (5 to 8 questions each)\n` +
          `• Scenario-based assignment with rubric\n` +
          `• Final knowledge check tied to learning outcomes\n` +
          `• Optional reflection prompt for workplace application\n\n` +
          `Keep assessments aligned to outcomes, not trivia.`,
        suggestions: ['Draft quiz questions', 'Create assignment brief', 'Add rubric', 'Estimate completion time'],
        insights: [],
      };
    }

    if (lowerMessage.includes('pricing') || lowerMessage.includes('duration') || lowerMessage.includes('marketplace')) {
      return {
        message:
          `Marketplace draft checklist:\n\n` +
          `• Short description with outcome-led copy (no duration in the hero line)\n` +
          `• Level, category, and 6XD dimension tags\n` +
          `• Realistic duration based on lesson count\n` +
          `• Pricing aligned to depth (assess and design courses differ from deploy bundles)\n` +
          `• Thumbnail and instructor profile complete before submit for review`,
        suggestions: ['Write short description', 'Suggest price range', 'Estimate course length', 'Pre-submission checklist'],
        insights: [],
      };
    }

    return {
      message:
        `I can help you draft courses for the marketplace. Ask me to:\n\n` +
        `• Build a course outline\n` +
        `• Structure modules and lessons\n` +
        `• Write learning outcomes\n` +
        `• Map content to the 6XD framework\n` +
        `• Plan assessments and marketplace copy\n\n` +
        `What would you like to draft first?`,
      suggestions: ['Outline a new course', 'Draft module structure', 'Write learning outcomes', 'Map to 6XD framework'],
      insights: [],
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
          { icon: Brain, text: 'Smart learning strategies', color: 'text-[#ff6b4d]' },
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
      const response = isAdmin && adminCapability
        ? getAdminCapabilityResponse(inputValue, adminCapability)
        : isAdmin
          ? getAdminResponse(inputValue)
          : isInstructor
            ? getInstructorResponse(inputValue)
            : getMentorResponse(inputValue);
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
    if (isAdmin && adminCapability) {
      setInputValue(`Help me with: ${action}`);
      setTimeout(() => handleSendMessage(), 100);
      return;
    }

    if (isAdmin) {
      const insight = adminQuickInsights.find((item) => item.action === action);
      if (insight) {
        onCapabilitySelect?.(insight.capability);
        return;
      }
    }

    const actionMessages: Record<string, string> = isInstructor
      ? {
          outline: "Help me outline a new draft course",
          modules: "Draft a module structure for my course",
          outcomes: "Write learning outcomes for my course",
          framework: "Map my course idea to the 6XD framework",
        }
      : {
          progress: "Review my progress",
          goals: "Help me set learning goals",
          advice: "Give me some advice",
          nextsteps: "What should I learn next?",
        };
    setInputValue(actionMessages[action] || action);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!embedded && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-dq-orange to-[#e56045] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-orange-500/20 group',
          contextualHint && 'ring-4 ring-dq-orange/25 ring-offset-2 animate-pulse',
        )}
      >
        <Brain className="h-7 w-7 transition-transform group-hover:scale-110" />
        <span className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-green-500" />
      </button>
    );
  }

  const chatPanel = (
    <div
      className={`flex flex-col overflow-hidden border border-gray-200 bg-white ${
        embedded
          ? "h-[calc(100vh-14rem)] min-h-[480px] rounded-xl shadow-sm"
          : `rounded-2xl shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-[calc(100vh-120px)]"}`
      }`}
    >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-dq-orange to-[#e56045] p-4">
          <div className="flex min-w-0 items-center gap-3">
            {embedded && isAdmin && adminCapability && onClearCapability ? (
              <button
                type="button"
                onClick={onClearCapability}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label="Back to cockpit hub"
              >
                <ArrowLeft className="h-4 w-4 text-white" />
              </button>
            ) : null}
            <Avatar className="h-10 w-10 shrink-0 ring-2 ring-white">
              <AvatarFallback className="bg-gradient-to-br from-dq-orange to-[#e56045] text-white">
                {ActiveCapabilityIcon ? (
                  <ActiveCapabilityIcon className="h-5 w-5" />
                ) : (
                  <Brain className="h-5 w-5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-white">
                {isAdmin && adminCapability
                  ? ADMIN_AI_CAPABILITY_LABELS[adminCapability]
                  : embedded
                    ? "AI Cockpit"
                    : isInstructor || isAdmin
                      ? "AI Cockpit"
                      : "Transact AI"}
              </h3>
              <p className="truncate text-xs text-white/80">
                {isAdmin && activeCapabilityMeta
                  ? activeCapabilityMeta.description
                  : isAdmin
                    ? "Platform AI operations hub"
                    : isInstructor
                      ? "Draft courses with AI assistance"
                      : "Your personal learning mentor"}
              </p>
            </div>
          </div>
          {!embedded && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
            >
              <Minimize2 className="h-4 w-4 text-white" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
          )}
        </div>

        {(embedded || !isMinimized) && (
          <>
            {/* Quick Insights */}
            <div className="grid grid-cols-2 gap-2 border-b bg-gradient-to-r from-orange-50 to-red-50 p-3">
              {quickInsights.map((insight) => (
                <button
                  key={insight.action}
                  onClick={() => handleQuickInsight(insight.action)}
                  className="flex items-center gap-2 rounded-lg border border-transparent bg-white p-2.5 text-left text-sm leading-snug text-gray-700 transition-all hover:border-orange-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange"
                >
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                  <span className="text-gray-700">{insight.text}</span>
                </button>
              ))}
            </div>

            {/* Messages / capability workspace */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              {isAdmin && adminCapability ? (
                <div className="space-y-4">
                  <AdminAICapabilityContent capability={adminCapability} />
                  {messages.length > 0 ? (
                    <div className="space-y-4 border-t border-gray-100 pt-4">
                      {messages.map((message) => (
                        <div key={message.id}>
                          <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.type === 'mentor' && (
                              <Avatar className="w-8 h-8 shrink-0">
                                <AvatarFallback className="bg-gradient-to-br from-[#ff6b4d] to-[#e56045] text-white">
                                  <Brain className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                              <div className={`rounded-2xl p-3 ${
                                message.type === 'user'
                                  ? 'bg-gradient-to-r from-[#ff6b4d] to-[#e56045] text-white'
                                  : 'bg-gradient-to-r from-orange-50 to-red-50 text-gray-800 border border-orange-100'
                              }`}>
                                <p className="text-[14px] leading-[20px] whitespace-pre-line">{message.content}</p>
                              </div>
                              {message.suggestions && message.suggestions.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {message.suggestions.map((suggestion, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleSuggestionClick(suggestion)}
                                      className="text-[12px] leading-[16px] px-3 py-1 bg-white border border-orange-300 text-[#ff6b4d] rounded-full hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d] transition-colors"
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
                  ) : null}
                </div>
              ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'mentor' && (
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-[#ff6b4d] to-[#e56045] text-white">
                            <Brain className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-[#ff6b4d] to-[#e56045] text-white'
                            : 'bg-gradient-to-r from-orange-50 to-red-50 text-gray-800 border border-orange-100'
                        }`}>
                          <p className="text-[14px] leading-[20px]">{message.content}</p>
                        </div>
                        {message.insights && message.insights.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.insights.map((insight, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[12px] leading-[16px]">
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
                                className="text-[12px] leading-[16px] px-3 py-1 bg-white border border-orange-300 text-[#ff6b4d] rounded-full hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d] transition-colors"
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
              )}
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
                  placeholder={
                    isAdmin && adminCapability
                      ? `Ask about ${ADMIN_AI_CAPABILITY_LABELS[adminCapability].toLowerCase()}...`
                      : isAdmin
                        ? "Ask about platform operations..."
                        : isInstructor
                          ? "Describe your course idea..."
                          : "Ask your mentor..."
                  }
                  className="flex-1 px-4 py-2 border border-orange-200 rounded-lg text-[14px] leading-[20px] focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-[#ff6b4d] to-[#e56045] hover:from-[#e56045] hover:to-[#d55540] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[12px] leading-[16px] text-gray-500 mt-2 text-center">
                {isAdmin && adminCapability
                  ? `AI Cockpit • ${ADMIN_AI_CAPABILITY_LABELS[adminCapability]}`
                  : isAdmin
                    ? "AI Cockpit • Platform operations"
                    : isInstructor
                      ? "AI Cockpit • Draft marketplace courses"
                      : "Personalized AI Mentor • Here for your success"}
              </p>
            </div>
          </>
        )}
    </div>
  );

  if (embedded) {
    return chatPanel;
  }

  return (
    <div className={`fixed bottom-6 right-6 z-40 w-96 transition-all duration-300 ${isMinimized ? "w-80" : ""}`}>
      {chatPanel}
    </div>
  );
};
