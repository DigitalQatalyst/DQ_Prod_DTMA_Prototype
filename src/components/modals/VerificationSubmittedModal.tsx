import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Clock } from "lucide-react";

interface VerificationSubmittedModalProps {
  isOpen: boolean;
  onContinue: () => void;
  providerName?: string;
}

const VerificationSubmittedModal = ({
  isOpen,
  onContinue,
  providerName = "Provider",
}: VerificationSubmittedModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-8 shadow-lg">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-foreground text-center mb-2">
          Verification Submitted
        </h2>

        {/* Subtitle */}
        <p className="text-center text-muted-foreground mb-6">
          Thank you for completing your registration, {providerName}!
        </p>

        {/* Timeline */}
        <div className="space-y-4 mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                ✓
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">
                Application Submitted
              </h4>
              <p className="text-xs text-muted-foreground">
                Your documents have been received
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">
                Under Review
              </h4>
              <p className="text-xs text-muted-foreground">
                2-5 business days typically
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">
                Verification Complete
              </h4>
              <p className="text-xs text-muted-foreground">
                You'll get an email when approved
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex gap-2">
            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-blue-900 font-medium mb-1">
                Check your email
              </p>
              <p className="text-xs text-blue-800">
                We'll send you updates at your registered email address
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="hero"
          size="lg"
          onClick={onContinue}
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VerificationSubmittedModal;
