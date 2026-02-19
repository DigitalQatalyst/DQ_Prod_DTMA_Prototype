import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useEligibilityQuestions, useSubmitEligibilityTest, EligibilityTest } from "@/hooks/useEligibilityTest";

interface EligibilityTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  test: EligibilityTest;
  courseId: string;
  onTestComplete: (passed: boolean) => void;
}

export function EligibilityTestModal({
  open,
  onOpenChange,
  test,
  courseId,
  onTestComplete,
}: EligibilityTestModalProps) {
  const { data: questions, isLoading: questionsLoading } = useEligibilityQuestions(test?.id);
  const submitTest = useSubmitEligibilityTest();
  
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [result, setResult] = useState<{ passed: boolean; score: number; correctCount: number; totalQuestions: number } | null>(null);

  // Timer effect
  useEffect(() => {
    if (currentStep !== 'test' || !test?.time_limit_minutes) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          // Auto-submit when time runs out
          if (prev === 0) handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, test?.time_limit_minutes]);

  const handleStartTest = () => {
    setCurrentStep('test');
    setCurrentQuestionIndex(0);
    setAnswers({});
    if (test?.time_limit_minutes) {
      setTimeRemaining(test.time_limit_minutes * 60);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = async () => {
    try {
      const response = await submitTest.mutateAsync({
        testId: test.id,
        courseId,
        answers,
      });
      
      setResult({
        passed: response.passed,
        score: response.score,
        correctCount: response.correctCount,
        totalQuestions: response.totalQuestions,
      });
      setCurrentStep('result');
    } catch (error) {
      console.error('Failed to submit test:', error);
    }
  };

  const handleClose = () => {
    if (result) {
      onTestComplete(result.passed);
    }
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setTimeRemaining(null);
    onOpenChange(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions?.length 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;
  const allAnswered = questions?.every(q => answers[q.id] !== undefined);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {currentStep === 'intro' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-display">{test.title}</DialogTitle>
              <DialogDescription className="text-base">
                {test.description || 'Complete this eligibility test to enroll in the course.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold">Test Details</h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <span>Passing score: <strong>{test.passing_score}%</strong></span>
                  </div>
                  {test.time_limit_minutes && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Time limit: <strong>{test.time_limit_minutes} minutes</strong></span>
                    </div>
                  )}
                  {questionsLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading questions...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Questions: <strong>{questions?.length || 0}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Important:</strong> This test is required to verify your eligibility for this course. 
                  Please ensure you have a stable internet connection before starting.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                variant="hero" 
                onClick={handleStartTest}
                disabled={questionsLoading || !questions?.length}
              >
                Start Test
              </Button>
            </div>
          </>
        )}

        {currentStep === 'test' && currentQuestion && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-display">
                  Question {currentQuestionIndex + 1} of {questions?.length}
                </DialogTitle>
                {timeRemaining !== null && (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    timeRemaining < 60 ? 'bg-destructive/10 text-destructive' : 'bg-muted'
                  }`}>
                    <Clock className="w-4 h-4" />
                    {formatTime(timeRemaining)}
                  </div>
                )}
              </div>
              <Progress value={progress} className="h-2" />
            </DialogHeader>

            <div className="py-6">
              <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>
              
              <RadioGroup
                value={answers[currentQuestion.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      answers[currentQuestion.id] === index
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {currentQuestionIndex < (questions?.length || 0) - 1 ? (
                <Button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  disabled={answers[currentQuestion.id] === undefined}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={!allAnswered || submitTest.isPending}
                >
                  {submitTest.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Test'
                  )}
                </Button>
              )}
            </div>
          </>
        )}

        {currentStep === 'result' && result && (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4">
                {result.passed ? (
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-destructive" />
                  </div>
                )}
              </div>
              <DialogTitle className="text-2xl font-display">
                {result.passed ? 'Congratulations!' : 'Test Not Passed'}
              </DialogTitle>
              <DialogDescription className="text-base">
                {result.passed 
                  ? 'You have successfully passed the eligibility test.'
                  : `You need ${test.passing_score}% to pass. You can try again.`
                }
              </DialogDescription>
            </DialogHeader>

            <div className="py-6">
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{result.score}%</div>
                <p className="text-sm text-muted-foreground">
                  {result.correctCount} out of {result.totalQuestions} correct
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {result.passed ? (
                <Button variant="hero" onClick={handleClose}>
                  Continue to Enrollment
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="hero" onClick={handleStartTest}>
                    Try Again
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
