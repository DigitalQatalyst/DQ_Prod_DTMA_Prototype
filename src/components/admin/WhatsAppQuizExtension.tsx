import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

interface WhatsAppQuizExtensionProps {
  quizId?: string;
  onSave?: (data: WhatsAppQuizData) => void;
}

export interface WhatsAppQuizData {
  sendViaWhatsApp: boolean;
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
  explanation: string;
}

export const WhatsAppQuizExtension = ({ quizId, onSave }: WhatsAppQuizExtensionProps) => {
  const [sendViaWhatsApp, setSendViaWhatsApp] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    const data: WhatsAppQuizData = {
      sendViaWhatsApp,
      question,
      options: options.filter(opt => opt.trim()),
      correctAnswer,
      feedback,
      explanation,
    };
    onSave?.(data);
  };

  const isValid = question.trim() && options.filter(opt => opt.trim()).length >= 2;

  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] leading-[24px] font-semibold text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#25D366]" />
            WhatsApp Quiz Extension
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            Create practice questions for WhatsApp delivery
          </p>
        </div>
        <Badge variant="outline" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
          REQ-ADM-04
        </Badge>
      </div>

      {/* Send via WhatsApp Toggle */}
      <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <label className="text-[14px] font-medium text-foreground">
              Send via WhatsApp
            </label>
          </div>
          <p className="text-[12px] text-muted-foreground">
            Deliver this question as a chat message to opted-in learners
          </p>
        </div>
        <Switch
          checked={sendViaWhatsApp}
          onCheckedChange={setSendViaWhatsApp}
        />
      </div>

      {sendViaWhatsApp && (
        <>
          {/* Question */}
          <div className="space-y-3">
            <label className="text-[14px] font-medium text-foreground">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your practice question..."
              className="w-full min-h-[100px] p-4 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40 resize-none"
            />
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            <label className="text-[14px] font-medium text-foreground">
              Answer Options
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[13px] font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="flex-1 px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                  />
                  <button
                    onClick={() => setCorrectAnswer(index)}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      correctAnswer === index
                        ? 'bg-green-100 text-green-700'
                        : 'bg-accent text-muted-foreground hover:bg-accent/80'
                    }`}
                    title="Mark as correct answer"
                  >
                    {correctAnswer === index ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-muted-foreground">
              Click the checkmark to indicate the correct answer
            </p>
          </div>

          {/* Feedback */}
          <div className="space-y-3">
            <label className="text-[14px] font-medium text-foreground">
              Correct Answer Feedback
            </label>
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g., Great job! That's correct! 🎉"
              className="w-full px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
            />
          </div>

          {/* Explanation */}
          <div className="space-y-3">
            <label className="text-[14px] font-medium text-foreground">
              Explanation
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Provide a brief explanation of the correct answer..."
              className="w-full min-h-[80px] p-4 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40 resize-none"
            />
            <p className="text-[12px] text-muted-foreground">
              This explanation will be shown after the learner responds
            </p>
          </div>

          {/* Preview */}
          <div className="p-5 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 rounded-xl border border-[#25D366]/20">
            <h4 className="text-[13px] font-semibold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              WhatsApp Preview
            </h4>
            <div className="space-y-2 text-[13px]">
              <p className="font-medium">{question || 'Your question will appear here...'}</p>
              {options.filter(opt => opt.trim()).map((opt, idx) => (
                <p key={idx} className="text-muted-foreground">
                  {String.fromCharCode(65 + idx)}) {opt}
                </p>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="outline" className="border-border">
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
          disabled={sendViaWhatsApp && !isValid}
        >
          Save Quiz Settings
        </Button>
      </div>
    </div>
  );
};
