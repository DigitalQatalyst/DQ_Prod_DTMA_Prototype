import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { WhatsAppCourseExtension } from './WhatsAppCourseExtension';
import { WhatsAppEnrollmentExtension } from './WhatsAppEnrollmentExtension';
import { WhatsAppQuizExtension } from './WhatsAppQuizExtension';
import { WhatsAppNotificationTemplates } from './WhatsAppNotificationTemplates';
import { WhatsAppAnalytics } from './WhatsAppAnalytics';
import { WhatsAppSystemSettings } from './WhatsAppSystemSettings';

type WhatsAppSection = 'course' | 'enrollment' | 'quiz' | 'templates' | 'analytics' | 'settings';

export const WhatsAppAdminTab = () => {
  const [activeSection, setActiveSection] = useState<WhatsAppSection>('analytics');

  const sections = [
    { id: 'analytics' as WhatsAppSection, label: 'Analytics & Performance', req: 'REQ-ADM-06' },
    { id: 'course' as WhatsAppSection, label: 'Course Content', req: 'REQ-ADM-01' },
    { id: 'enrollment' as WhatsAppSection, label: 'Enrollment Opt-In', req: 'REQ-ADM-02' },
    { id: 'quiz' as WhatsAppSection, label: 'Quiz Management', req: 'REQ-ADM-04' },
    { id: 'templates' as WhatsAppSection, label: 'Notification Templates', req: 'REQ-ADM-05' },
    { id: 'settings' as WhatsAppSection, label: 'System Settings', req: 'REQ-ADM-07' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[28px] leading-[36px] font-semibold text-foreground flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-[#25D366]" />
          WhatsApp Learning Management
        </h1>
        <p className="text-[14px] text-muted-foreground mt-2">
          Manage WhatsApp-based conversational learning integrated across your LMS
        </p>
      </div>

      {/* Info Banner */}
      <div className="p-5 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 rounded-2xl border border-[#25D366]/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-foreground mb-2">
              WhatsApp as a Delivery Channel
            </h3>
            <p className="text-[14px] text-muted-foreground mb-3">
              WhatsApp learning extends your existing LMS capabilities by delivering micro-learning content, 
              practice questions, and reminders directly to learners' phones. All features integrate seamlessly 
              with your current course authoring, enrollment, and assessment workflows.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-[12px] font-medium text-[#25D366]">
                📱 Mobile-First Learning
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-[12px] font-medium text-[#25D366]">
                🤖 AI-Powered Responses
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-[12px] font-medium text-[#25D366]">
                📊 Enhanced Engagement
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-[12px] font-medium text-[#25D366]">
                ✅ Higher Completion Rates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 p-2 bg-accent/50 rounded-xl">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg text-[14px] font-medium transition-all ${
              activeSection === section.id
                ? 'bg-[#25D366] text-white shadow-md'
                : 'bg-transparent text-muted-foreground hover:bg-white/50'
            }`}
          >
            <div>{section.label}</div>
            <div className="text-[10px] opacity-70 mt-0.5">{section.req}</div>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="min-h-[400px]">
        {activeSection === 'analytics' && <WhatsAppAnalytics />}
        {activeSection === 'course' && <WhatsAppCourseExtension courseId="demo-course-1" />}
        {activeSection === 'enrollment' && <WhatsAppEnrollmentExtension />}
        {activeSection === 'quiz' && <WhatsAppQuizExtension />}
        {activeSection === 'templates' && <WhatsAppNotificationTemplates />}
        {activeSection === 'settings' && <WhatsAppSystemSettings />}
      </div>

      {/* Architecture Note */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="text-[14px] font-semibold text-blue-900 mb-2">
          🏗️ Architecture & Integration
        </h4>
        <ul className="space-y-1 text-[13px] text-blue-700">
          <li>• <strong>No standalone modules:</strong> All features extend existing admin workflows</li>
          <li>• <strong>Reuses AI infrastructure:</strong> Course Tutor AI, Butler AI, and Transact AI work via WhatsApp</li>
          <li>• <strong>Unified data model:</strong> WhatsApp data integrates with existing course, enrollment, and analytics tables</li>
          <li>• <strong>Scalable design:</strong> Works across LMS and TxM implementations</li>
        </ul>
      </div>
    </div>
  );
};
