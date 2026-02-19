import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  BookOpen, 
  ClipboardCheck, 
  CreditCard, 
  Rocket,
  Loader2,
  ArrowRight,
  AlertTriangle,
  Lock,
  FileUp,
} from "lucide-react";
import { useEnrollInCourse, usePrerequisitesStatus } from "@/hooks/useCourses";
import { useEligibilityTest, useEligibilityStatus } from "@/hooks/useEligibilityTest";
import { useCheckEligibility, useEligibilityRequirements } from "@/hooks/useEligibilityCheck";
import { EligibilityTestModal } from "./EligibilityTestModal";
import { EligibilityCheckModal } from "./EligibilityCheckModal";
import { useToast } from "@/hooks/use-toast";

interface CourseInfo {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
}

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CourseInfo;
  onEnrollmentComplete: () => void;
}

type EnrollmentStep = 'overview' | 'eligibility' | 'payment' | 'complete';

export function EnrollmentModal({
  open,
  onOpenChange,
  course,
  onEnrollmentComplete,
}: EnrollmentModalProps) {
  const { toast } = useToast();
  const enrollMutation = useEnrollInCourse();
  const { data: eligibilityTest, isLoading: testLoading } = useEligibilityTest(course.id);
  const { data: eligibilityStatus, isLoading: statusLoading } = useEligibilityStatus(course.id);
  const { data: prerequisitesStatus, isLoading: prereqLoading } = usePrerequisitesStatus(course.id);
  const { data: eligibilityCheck, isLoading: checkLoading } = useCheckEligibility(course.id);
  const { data: eligibilityRequirements } = useEligibilityRequirements(course.id);
  
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>('overview');
  const [showEligibilityTest, setShowEligibilityTest] = useState(false);
  const [showEligibilityCheck, setShowEligibilityCheck] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    exp: '',
    cvc: '',
  });

  const hasEligibilityTest = !!eligibilityTest && eligibilityTest.is_required;
  const hasPassed = eligibilityStatus?.hasPassed ?? false;
  const isFree = course.price === 0;
  const hasPrerequisites = prerequisitesStatus?.prerequisites && prerequisitesStatus.prerequisites.length > 0;
  const prerequisitesMet = prerequisitesStatus?.met ?? true;
  const eligibilityCheckPassed = eligibilityCheck?.passed ?? false;
  const hasEligibilityRequirements = (eligibilityRequirements?.requirements?.length ?? 0) > 0;

  const steps = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'eligibility', label: 'Eligibility', icon: ClipboardCheck },
    ...(!isFree ? [{ id: 'payment', label: 'Payment', icon: CreditCard }] : []),
    { id: 'complete', label: 'Complete', icon: Rocket },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const simulatePayment = async () => {
    setPaymentError(null);
    if (!paymentDetails.name || !paymentDetails.cardNumber || !paymentDetails.exp || !paymentDetails.cvc) {
      setPaymentError("Please complete payment details.");
      throw new Error("Payment details incomplete");
    }

    setPaymentProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setPaymentProcessing(false);
  };

  const handleProceed = async () => {
    if (currentStep === 'overview') {
      if (!prerequisitesMet) {
        toast({
          title: "Prerequisites Not Met",
          description: "You must complete the required prerequisite courses first.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('eligibility');
    } else if (currentStep === 'eligibility') {
      if (!isFree) {
        setCurrentStep('payment');
      } else {
        await handleEnroll();
      }
    } else if (currentStep === 'payment') {
      try {
        await simulatePayment();
        await handleEnroll();
      } catch (err) {
        // paymentError state already set
      }
    }
  };

  const handleEnroll = async () => {
    try {
      await enrollMutation.mutateAsync(course.id);
      setCurrentStep('complete');
    } catch (error: any) {
      toast({
        title: "Enrollment failed",
        description: error.message || "Unable to enroll. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEligibilityTestComplete = (passed: boolean) => {
    setShowEligibilityTest(false);
    if (passed) {
      if (!isFree) {
        setCurrentStep('payment');
      } else {
        handleEnroll();
      }
    }
  };

  const handleComplete = () => {
    onOpenChange(false);
    onEnrollmentComplete();
  };

  const handleClose = () => {
    if (currentStep === 'complete') {
      onEnrollmentComplete();
    }
    setCurrentStep('overview');
    onOpenChange(false);
  };

  const isLoading = testLoading || statusLoading || prereqLoading || checkLoading;

  return (
    <>
      <Dialog open={open && !showEligibilityTest} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = index < currentStepIndex || currentStep === 'complete';
                
                return (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted 
                        ? 'bg-primary text-primary-foreground' 
                        : isActive 
                          ? 'bg-primary/20 text-primary border-2 border-primary' 
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          {currentStep === 'overview' && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Enroll in Course</DialogTitle>
                <DialogDescription>
                  You're about to enroll in "{course.title}"
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                {course.imageUrl && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted opacity-60">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="bg-muted/30 rounded-xl p-4 opacity-70">
                  <h4 className="font-semibold mb-3 text-sm text-muted-foreground">Enrollment Summary</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    {hasPrerequisites && (
                      <div className="flex items-center justify-between">
                        <span>Prerequisites</span>
                        <span className={prerequisitesMet ? 'text-green-600' : 'text-amber-600'}>
                          {prerequisitesMet ? '✓ Met' : `${prerequisitesStatus?.missing?.length} Missing`}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span>Course Price</span>
                      <div className="text-right">
                        {isFree ? (
                          <span className="font-semibold text-green-600">Free</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {course.originalPrice && course.originalPrice > course.price && (
                              <span className="text-muted-foreground line-through text-xs">
                                ${course.originalPrice}
                              </span>
                            )}
                            <span className="font-semibold">${course.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!prerequisitesMet && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 opacity-70">
                    <div className="flex gap-2">
                      <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1 text-xs">
                          Prerequisites Required
                        </h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                          Complete these courses first:
                        </p>
                        <ul className="space-y-1">
                          {prerequisitesStatus?.missing?.map((prereq) => (
                            <li key={prereq.id} className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-amber-600" />
                              {prereq.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleProceed}
                  disabled={isLoading || !prerequisitesMet}
                  title={!prerequisitesMet ? "Complete prerequisite courses first" : ""}
                >
                  {!prerequisitesMet ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Prerequisites Required
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {currentStep === 'eligibility' && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Eligibility Check</DialogTitle>
                <DialogDescription>
                  Before enrolling, please complete the following requirements.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Please complete the eligibility requirements below to continue.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* English Proficiency - Always shown */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            English Proficiency
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Confirm your English language ability
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        ✓ Met
                      </span>
                    </div>
                  </div>

                  {/* Document Upload - Always shown */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Document Upload
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Upload a supporting document
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                        Pending
                      </span>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Accepted formats: PDF, JPG, PNG (Max 5MB)
                        </p>
                        <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <FileUp className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Click to upload document
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Additional requirements if they exist */}
                  {eligibilityCheck?.requirements && eligibilityCheck.requirements.length > 0 && (
                    <>
                      {eligibilityCheck.requirements.map((req) => (
                        <div key={req.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              {req.met ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                              )}
                              <div>
                                <h4 className="font-semibold text-foreground">
                                  {req.type === "language" && "English Proficiency"}
                                  {req.type === "document" && "Document Upload"}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {req.reason || "Requirement met"}
                                </p>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              req.met
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                            }`}>
                              {req.met ? "✓ Met" : "Pending"}
                            </span>
                          </div>

                          {!req.met && (
                            <div className="pt-2 border-t">
                              {req.type === "language" && (
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300"
                                  />
                                  <span className="text-sm text-foreground">
                                    I confirm that I can understand and communicate in English
                                  </span>
                                </label>
                              )}

                              {req.type === "document" && (
                                <div className="space-y-2">
                                  <p className="text-sm text-muted-foreground">
                                    Accepted formats: PDF, JPG, PNG (Max 5MB)
                                  </p>
                                  <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                    <FileUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Click to upload document
                                    </span>
                                    <input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setCurrentStep('overview')}>
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleProceed}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}

          {currentStep === 'payment' && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Complete Payment</DialogTitle>
                <DialogDescription>
                  Review your order and complete the payment.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <span className="font-medium">{course.title}</span>
                    <span className="font-semibold">${course.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${course.price}</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Demo Mode:</strong> Payment integration coming soon. 
                    Click "Complete Enrollment" to enroll for free during testing.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground">Name on card</label>
                      <input
                        className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder="Jane Doe"
                        value={paymentDetails.name}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground">Card number</label>
                      <input
                        className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder="4242 4242 4242 4242"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Expiry</label>
                      <input
                        className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder="MM/YY"
                        value={paymentDetails.exp}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, exp: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">CVC</label>
                      <input
                        className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder="123"
                        value={paymentDetails.cvc}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                      />
                    </div>
                  </div>
                  {paymentError && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                      <AlertTriangle className="w-4 h-4" />
                      {paymentError}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(hasEligibilityRequirements ? 'eligibility' : 'overview')}
                >
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleProceed}
                  disabled={enrollMutation.isPending || paymentProcessing}
                >
                  {enrollMutation.isPending || paymentProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Complete Enrollment'
                  )}
                </Button>
              </div>
            </>
          )}

          {currentStep === 'complete' && (
            <>
              <DialogHeader className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <DialogTitle className="text-2xl font-display">
                  You're Enrolled!
                </DialogTitle>
                <DialogDescription className="text-base">
                  Congratulations! You now have access to "{course.title}".
                </DialogDescription>
              </DialogHeader>

              <div className="py-6">
                <div className="bg-muted/50 rounded-xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Start your learning journey now and unlock your potential!
                  </p>
                  <Button variant="hero" size="lg" onClick={handleComplete}>
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Eligibility Test Modal */}
      {eligibilityTest && (
        <EligibilityTestModal
          open={showEligibilityTest}
          onOpenChange={setShowEligibilityTest}
          test={eligibilityTest}
          courseId={course.id}
          onTestComplete={handleEligibilityTestComplete}
        />
      )}

      {/* Eligibility Check Modal */}
      {hasEligibilityRequirements && (
        <EligibilityCheckModal
          open={showEligibilityCheck}
          onOpenChange={setShowEligibilityCheck}
          courseId={course.id}
          courseName={course.title}
          onEligibilityVerified={() => {
            setShowEligibilityCheck(false);
            if (!isFree) {
              setCurrentStep('payment');
            } else {
              handleEnroll();
            }
          }}
        />
      )}
    </>
  );
}
