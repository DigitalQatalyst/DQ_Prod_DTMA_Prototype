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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-8 shadow-xl">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-[32px] leading-[40px] font-semibold text-[#1e2348] text-center mb-3">
          Application Submitted
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[14px] leading-[20px] font-normal text-gray-600 mb-8">
          Thank you for completing your registration, {providerName}!
        </p>

        {/* Timeline */}
        <div className="space-y-4 mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#ff6b4d] text-white flex items-center justify-center text-[14px] leading-[20px] font-semibold">
                ✓
              </div>
            </div>
            <div>
              <h4 className="text-[14px] leading-[20px] font-medium text-[#1e2348]">
                Application Submitted
              </h4>
              <p className="text-[12px] leading-[16px] font-normal text-gray-600">
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
              <h4 className="text-[14px] leading-[20px] font-medium text-[#1e2348]">
                Under Review
              </h4>
              <p className="text-[12px] leading-[16px] font-normal text-gray-600">
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
              <h4 className="text-[14px] leading-[20px] font-medium text-[#1e2348]">
                Verification Complete
              </h4>
              <p className="text-[12px] leading-[16px] font-normal text-gray-600">
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
              <p className="text-[12px] leading-[16px] font-medium text-blue-900 mb-1">
                Check your email
              </p>
              <p className="text-[12px] leading-[16px] font-normal text-blue-800">
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
          className="w-full h-12 bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium transition-colors"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VerificationSubmittedModal;
