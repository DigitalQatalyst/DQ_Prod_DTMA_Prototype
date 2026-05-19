import { useState } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCreationFlowProps {
  onClose: () => void;
}

const CourseCreationFlow = ({ onClose }: CourseCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-[var(--dq-surface-border-default)]">
          <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-text-primary)]">
            Create New Course
          </h2>
          <button onClick={onClose} className="text-[var(--dq-text-disabled)] hover:text-[var(--dq-text-secondary)]">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center">
            <p className="text-[16px] text-[var(--dq-text-secondary)]">Course Creation Wizard - Step {currentStep} of 6</p>
            <p className="text-[14px] text-[var(--dq-text-tertiary)] mt-2">Full implementation coming soon</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[var(--dq-surface-border-default)]">
          <Button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={() => setCurrentStep(Math.min(6, currentStep + 1))} disabled={currentStep === 6} className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)]">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationFlow;

