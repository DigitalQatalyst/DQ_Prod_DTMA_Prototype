import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award,
  FileText,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
  Calendar,
  Trophy,
  PlayCircle
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizTaker = ({ onBack }: { onBack: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the primary driver of digital transformation in organizations?',
      options: [
        'Technology adoption',
        'Customer expectations and market demands',
        'Cost reduction',
        'Regulatory compliance'
      ],
      correctAnswer: 1,
      explanation: 'While technology is important, customer expectations and market demands are the primary drivers that push organizations to transform digitally.'
    },
    {
      id: '2',
      question: 'Which of the following is NOT a dimension of the 6XD framework?',
      options: [
        'Digital Economy',
        'Digital Marketing',
        'Digital Cognitive Organisation',
        'Digital Business Platform'
      ],
      correctAnswer: 1,
      explanation: 'Digital Marketing is not one of the six dimensions. The 6XD framework focuses on broader transformation areas.'
    },
    {
      id: '3',
      question: 'What role does AI play in digital transformation?',
      options: [
        'Replaces all human workers',
        'Augments human capabilities and automates routine tasks',
        'Only useful for large enterprises',
        'Limited to customer service applications'
      ],
      correctAnswer: 1,
      explanation: 'AI is designed to augment human capabilities, automate routine tasks, and enable better decision-making across all organization sizes.'
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  const finalScore = Math.round((score / questions.length) * 100);

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assessments
        </Button>
      
        <Card className="p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            finalScore >= 70 ? 'bg-green-100' : 'bg-amber-100'
          }`}>
            {finalScore >= 70 ? (
              <Award className="w-10 h-10 text-green-600" />
            ) : (
              <AlertCircle className="w-10 h-10 text-amber-600" />
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-muted-foreground mb-6">
            You scored {score} out of {questions.length} questions correctly
          </p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-[#ff6b4d] mb-2">{finalScore}%</div>
            <Progress value={finalScore} className="h-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-[#1e2348]">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-[#ff6b4d]">{finalScore}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>

          {finalScore >= 70 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
              <p className="text-green-800 font-medium">
                Congratulations! You've passed the quiz. You can now proceed to the next lesson.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
              <p className="text-amber-800 font-medium">
                You need 70% to pass. Review the material and try again.
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRetakeQuiz} variant="outline">
              Retake Quiz
            </Button>
            <Button onClick={onBack} className={finalScore >= 70 ? "bg-[#ff6b4d] hover:bg-[#e56045] text-white" : "bg-[#1e2348] hover:bg-[#2a3058] text-white"}>
              Continue to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Assessments
      </Button>

      {/* Quiz Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Digital Transformation Quiz</h2>
            <p className="text-muted-foreground">Test your knowledge</p>
          </div>
          <Badge className="bg-[#1e2348] text-white">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
      </Card>

      {/* Question Card */}
      <Card className="p-8">
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-[#ff6b4d] text-white rounded-full flex items-center justify-center font-bold shrink-0">
              {currentQuestion + 1}
            </div>
            <h3 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h3>
          </div>
        </div>

        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  showExplanation
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50'
                      : 'border-border'
                    : selectedAnswer === index
                    ? 'border-[#ff6b4d] bg-[#ff6b4d]/5'
                    : 'border-border hover:border-[#ff6b4d]/50'
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {showExplanation && index === questions[currentQuestion].correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showExplanation && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </RadioGroup>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
                <p className="text-blue-800 text-sm">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button variant="outline" disabled={currentQuestion === 0}>
            Previous
          </Button>
          
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-[#1e2348] hover:bg-[#2a3058] text-white"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </Card>

      {/* Quiz Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#ff6b4d]" />
            <div>
              <div className="font-semibold">Time Remaining</div>
              <div className="text-sm text-muted-foreground">No limit</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-semibold">Current Score</div>
              <div className="text-sm text-muted-foreground">{score} correct</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-600" />
            <div>
              <div className="font-semibold">Pass Mark</div>
              <div className="text-sm text-muted-foreground">70%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const AssessmentsQuizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const assessments = [
    {
      id: '1',
      title: 'Digital Transformation Quiz',
      course: 'Introduction to Digital Economy & Economy 4.0',
      type: 'Quiz',
      dueDate: '2024-03-30',
      status: 'pending',
      questions: 3,
      timeLimit: 'No limit',
    },
    {
      id: '2',
      title: 'AI Fundamentals Assessment',
      course: 'AI-Powered Business Transformation',
      type: 'Assessment',
      dueDate: '2024-04-05',
      status: 'completed',
      questions: 15,
      timeLimit: '30 mins',
      score: 92,
      completedDate: '2024-03-25'
    },
    {
      id: '3',
      title: 'Leadership in Tech Quiz',
      course: 'Digital Leadership & Change Management',
      type: 'Quiz',
      dueDate: '2024-03-20',
      status: 'failed',
      questions: 8,
      timeLimit: '15 mins',
      score: 65,
      completedDate: '2024-03-18'
    },
  ];

  if (selectedQuiz) {
    return <QuizTaker onBack={() => setSelectedQuiz(null)} />;
  }

  const completedQuizzes = assessments.filter(a => a.status === 'completed' || a.status === 'failed');
  const avgScore = completedQuizzes.length > 0 
    ? Math.round(completedQuizzes.reduce((acc, curr) => acc + (curr.score || 0), 0) / completedQuizzes.length)
    : 0;
  const pendingCount = assessments.filter(a => a.status === 'pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
          Assessments & Quizzes
        </h2>
        <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>
          Track your quiz scores, attempt pending assessments, and review your performance history.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-border flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Completed</p>
            <h3 className="text-2xl font-bold">{completedQuizzes.length}</h3>
          </div>
        </Card>
        <Card className="p-6 border border-border flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Pending</p>
            <h3 className="text-2xl font-bold">{pendingCount}</h3>
          </div>
        </Card>
        <Card className="p-6 border border-border flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ff6b4d]/10 text-[#ff6b4d] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Average Score</p>
            <h3 className="text-2xl font-bold">{avgScore}%</h3>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-[#1e2348]">Assessment History</h3>
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="p-6 border border-border hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <FileText className="w-5 h-5 text-[#ff6b4d] mt-1" />
                  <div>
                    <h4 className="font-semibold" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                      {assessment.title}
                    </h4>
                    <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      {assessment.course}
                    </p>
                  </div>
                </div>
                
                <div className="ml-8 grid md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{assessment.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Time: {assessment.timeLimit}</span>
                  </div>
                  {assessment.completedDate && (
                    <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Taken: {new Date(assessment.completedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {assessment.status === 'pending' && (
                    <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                <Badge className={getStatusColor(assessment.status)} style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                </Badge>
                
                {assessment.score !== undefined && (
                  <div className="flex items-center gap-2">
                    <Trophy className={`w-5 h-5 ${assessment.score >= 70 ? 'text-amber-500' : 'text-gray-400'}`} />
                    <span className={`font-bold ${assessment.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>
                      {assessment.score}%
                    </span>
                  </div>
                )}

                <div className="mt-2">
                  {assessment.status === 'pending' && (
                    <Button 
                      onClick={() => setSelectedQuiz(assessment.id)}
                      className="bg-[#ff6b4d] hover:bg-[#e56045] text-white w-full md:w-auto"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  )}
                  {assessment.status === 'failed' && (
                    <Button 
                      onClick={() => setSelectedQuiz(assessment.id)}
                      variant="outline"
                      className="w-full md:w-auto text-[#ff6b4d] border-[#ff6b4d] hover:bg-[#ff6b4d]/10"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                  )}
                  {assessment.status === 'completed' && (
                    <Button variant="outline" className="w-full md:w-auto">
                      Review Answers
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
