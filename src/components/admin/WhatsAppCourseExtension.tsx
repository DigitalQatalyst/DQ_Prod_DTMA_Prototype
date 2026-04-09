import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Send, Smile } from 'lucide-react';

interface WhatsAppCourseExtensionProps {
  courseId: string;
  onSave?: (data: WhatsAppCourseData) => void;
}

export interface WhatsAppCourseData {
  microLearningContent: string;
  deliverViaWhatsApp: boolean;
  associatedWith: {
    courseId: string;
    moduleId?: string;
    lessonId?: string;
  };
}

export const WhatsAppCourseExtension = ({ courseId, onSave }: WhatsAppCourseExtensionProps) => {
  const [microContent, setMicroContent] = useState('');
  const [deliverViaWhatsApp, setDeliverViaWhatsApp] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const characterCount = microContent.length;
  const maxCharacters = 280;

  const handleSave = () => {
    const data: WhatsAppCourseData = {
      microLearningContent: microContent,
      deliverViaWhatsApp,
      associatedWith: {
        courseId,
      },
    };
    onSave?.(data);
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] leading-[24px] font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            WhatsApp Learning Extension
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            Create micro-learning content for WhatsApp delivery
          </p>
        </div>
        <Badge variant="outline" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
          REQ-ADM-01
        </Badge>
      </div>

      {/* Micro-Learning Content */}
      <div className="space-y-3">
        <label className="text-[14px] font-medium text-foreground">
          Micro-Learning Content
        </label>
        <div className="relative">
          <textarea
            value={microContent}
            onChange={(e) => setMicroContent(e.target.value.slice(0, maxCharacters))}
            placeholder="Enter short, tweet-length learning content (max 280 characters)..."
            className="w-full min-h-[120px] p-4 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40 resize-none"
            maxLength={maxCharacters}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Add emoji"
            >
              <Smile className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className={`text-[12px] font-medium ${characterCount > maxCharacters * 0.9 ? 'text-amber-600' : 'text-muted-foreground'}`}>
              {characterCount}/{maxCharacters}
            </span>
          </div>
        </div>
        <p className="text-[12px] text-muted-foreground">
          💡 Tip: Keep it concise and actionable. Use emojis to make it engaging.
        </p>
      </div>

      {/* Deliver via WhatsApp Toggle */}
      <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Send className="w-4 h-4 text-[#25D366]" />
            <label className="text-[14px] font-medium text-foreground">
              Deliver via WhatsApp
            </label>
          </div>
          <p className="text-[12px] text-muted-foreground">
            Enable WhatsApp delivery for this lesson or module
          </p>
        </div>
        <Switch
          checked={deliverViaWhatsApp}
          onCheckedChange={setDeliverViaWhatsApp}
        />
      </div>

      {/* Association Info */}
      {deliverViaWhatsApp && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-[13px] text-blue-900">
            <strong>Associated with:</strong> Course ID: {courseId}
          </p>
          <p className="text-[12px] text-blue-700 mt-1">
            This content will be delivered to learners who have opted in to WhatsApp learning.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="outline" className="border-border">
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
          disabled={!microContent.trim()}
        >
          Save WhatsApp Content
        </Button>
      </div>
    </div>
  );
};
