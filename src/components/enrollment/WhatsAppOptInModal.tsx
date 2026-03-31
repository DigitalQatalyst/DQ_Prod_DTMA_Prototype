import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, ArrowRight } from "lucide-react";

interface WhatsAppOptInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOptIn: (phoneNumber: string) => void;
  onSkip: () => void;
}

export function WhatsAppOptInModal({
  open,
  onOpenChange,
  onOptIn,
  onSkip,
}: WhatsAppOptInModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleOptIn = () => {
    // Basic phone validation
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    if (cleanedNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    
    setError("");
    onOptIn(phoneNumber);
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-[#25D366]" />
          </div>
          <DialogTitle className="text-2xl font-display text-center">
            Continue Learning via WhatsApp?
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get daily micro-lessons, practice questions, and voice-based Q&A directly on WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Benefits */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] mt-2 flex-shrink-0" />
              <p className="text-sm text-green-800 dark:text-green-200">
                Daily bite-sized concepts delivered to your phone
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] mt-2 flex-shrink-0" />
              <p className="text-sm text-green-800 dark:text-green-200">
                Ask questions anytime with text or voice messages
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] mt-2 flex-shrink-0" />
              <p className="text-sm text-green-800 dark:text-green-200">
                Practice questions to reinforce your learning
              </p>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              WhatsApp Number
            </label>
            <Input
              type="tel"
              placeholder="+971 50 123 4567"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError("");
              }}
              className="text-base"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <p className="text-xs text-muted-foreground">
              We'll send you a confirmation message to get started
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            variant="hero"
            size="lg"
            onClick={handleOptIn}
            disabled={!phoneNumber}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
          >
            Yes, send lessons to WhatsApp
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleSkip}
            className="w-full"
          >
            No, continue learning in the platform
          </Button>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-center text-muted-foreground">
          You can change your preferences anytime in your dashboard settings
        </p>
      </DialogContent>
    </Dialog>
  );
}
