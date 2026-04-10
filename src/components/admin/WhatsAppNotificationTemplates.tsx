import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, Bell, Send, Edit, Trash2, Plus } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: 'micro-learning' | 'reminder' | 'practice' | 'update';
  content: string;
  variables: string[];
}

export const WhatsAppNotificationTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Daily Micro-Learning',
      type: 'micro-learning',
      content: '📚 Today\'s lesson: {{lesson_title}}\n\n{{micro_content}}\n\n💡 Quick tip: {{tip}}',
      variables: ['lesson_title', 'micro_content', 'tip'],
    },
    {
      id: '2',
      name: 'Lesson Reminder',
      type: 'reminder',
      content: '⏰ Reminder: Your lesson "{{lesson_title}}" is waiting!\n\nComplete it today to stay on track. 🎯',
      variables: ['lesson_title'],
    },
    {
      id: '3',
      name: 'Practice Question',
      type: 'practice',
      content: '🤔 Practice time!\n\n{{question}}\n\nReply with your answer (A, B, C, or D)',
      variables: ['question'],
    },
    {
      id: '4',
      name: 'Course Update',
      type: 'update',
      content: '🆕 New in {{course_name}}:\n\n{{update_message}}\n\nCheck it out now!',
      variables: ['course_name', 'update_message'],
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const typeColors = {
    'micro-learning': 'bg-purple-100 text-purple-700',
    'reminder': 'bg-blue-100 text-blue-700',
    'practice': 'bg-amber-100 text-amber-700',
    'update': 'bg-green-100 text-green-700',
  };

  const typeIcons = {
    'micro-learning': '📚',
    'reminder': '⏰',
    'practice': '🤔',
    'update': '🆕',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#25D366]" />
            WhatsApp Notification Templates
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            Manage templates for WhatsApp delivery
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
            REQ-ADM-05
          </Badge>
          <Button className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Templates List */}
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 bg-card rounded-xl border transition-all cursor-pointer ${
                selectedTemplate?.id === template.id
                  ? 'border-[#25D366] shadow-md'
                  : 'border-border hover:border-[#25D366]/50'
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{typeIcons[template.type]}</span>
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground">
                      {template.name}
                    </h4>
                    <Badge className={`text-[11px] mt-1 ${typeColors[template.type]}`}>
                      {template.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTemplate(template);
                      setIsEditing(true);
                    }}
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTemplates(templates.filter(t => t.id !== template.id));
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-[13px] text-muted-foreground line-clamp-2">
                {template.content}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {template.variables.map((variable) => (
                  <Badge key={variable} variant="outline" className="text-[10px]">
                    {`{{${variable}}}`}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Template Preview/Editor */}
        <div className="lg:sticky lg:top-6 h-fit">
          {selectedTemplate ? (
            <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[16px] font-semibold text-foreground">
                  {isEditing ? 'Edit Template' : 'Template Preview'}
                </h4>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-[13px] font-medium text-foreground mb-2 block">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={selectedTemplate.name}
                      className="w-full px-3 py-2 border border-border rounded-lg text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-foreground mb-2 block">
                      Content
                    </label>
                    <textarea
                      value={selectedTemplate.content}
                      className="w-full min-h-[150px] px-3 py-2 border border-border rounded-lg text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40 resize-none font-mono"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* WhatsApp Preview */}
                  <div className="p-4 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 rounded-xl border border-[#25D366]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span className="text-[12px] font-semibold text-[#25D366]">
                        WhatsApp Preview
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-[13px] whitespace-pre-wrap">
                        {selectedTemplate.content}
                      </p>
                    </div>
                  </div>

                  {/* Variables */}
                  <div>
                    <h5 className="text-[13px] font-semibold text-foreground mb-2">
                      Template Variables
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map((variable) => (
                        <Badge
                          key={variable}
                          variant="outline"
                          className="text-[11px] font-mono"
                        >
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Send Test */}
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                  >
                    <Send className="w-4 h-4" />
                    Send Test Message
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="p-12 bg-card rounded-2xl border border-dashed border-border text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-[14px] text-muted-foreground">
                Select a template to preview or edit
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Channels Info */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="text-[14px] font-semibold text-blue-900 mb-2">
          WhatsApp as Delivery Channel
        </h4>
        <ul className="space-y-1 text-[13px] text-blue-700">
          <li>• Templates are sent to learners who have opted in to WhatsApp learning</li>
          <li>• Variables are automatically populated from course and learner data</li>
          <li>• Delivery respects quiet hours and frequency settings</li>
          <li>• Track engagement metrics in the analytics dashboard</li>
        </ul>
      </div>
    </div>
  );
};
