import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  CheckCircle,
  Lock,
  FileText,
  Video,
  Headphones,
  BookOpen
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'audio' | 'reading' | 'quiz';
  completed: boolean;
  locked: boolean;
}

interface LearningPlayerProps {
  courseTitle: string;
  lessons: Lesson[];
  currentLessonIndex: number;
  onLessonChange: (index: number) => void;
}

export const LearningPlayer = ({ 
  courseTitle, 
  lessons, 
  currentLessonIndex,
  onLessonChange 
}: LearningPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('10:00');
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentLesson = lessons[currentLessonIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      onLessonChange(currentLessonIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1 && !lessons[currentLessonIndex + 1].locked) {
      onLessonChange(currentLessonIndex + 1);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'reading':
        return <BookOpen className="w-4 h-4" />;
      case 'quiz':
        return <FileText className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      if (isPlaying && progress < 100) {
        setProgress(prev => Math.min(prev + 0.5, 100));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Player */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="overflow-hidden">
          {/* Video/Content Area */}
          <div className="relative bg-black aspect-video flex items-center justify-center">
            {currentLesson.type === 'video' ? (
              <div className="w-full h-full bg-gradient-to-br from-[#1e2348] to-[#2a3058] flex items-center justify-center">
                <Play className="w-20 h-20 text-white/50" />
              </div>
            ) : currentLesson.type === 'audio' ? (
              <div className="w-full h-full bg-gradient-to-br from-[#ff6b4d] to-[#e56045] flex items-center justify-center">
                <Headphones className="w-20 h-20 text-white" />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-white/50" />
              </div>
            )}
            
            <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-lg flex items-center justify-center text-white hover:bg-black/70">
              <Maximize className="w-5 h-5" />
            </button>
          </div>

          {/* Controls */}
          <div className="p-4 bg-card">
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={currentLessonIndex === 0}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                
                <Button
                  size="icon"
                  onClick={togglePlay}
                  className="w-12 h-12 bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentLessonIndex === lessons.length - 1 || lessons[currentLessonIndex + 1]?.locked}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Lesson Info */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{currentLesson.title}</h2>
          <p className="text-muted-foreground mb-4">
            Lesson {currentLessonIndex + 1} of {lessons.length} • {currentLesson.duration}
          </p>
          <div className="prose max-w-none">
            <p>
              This lesson covers essential concepts in digital transformation. 
              Take notes as you progress through the material and complete the quiz at the end.
            </p>
          </div>
        </Card>
      </div>

      {/* Course Outline */}
      <div>
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Course Content</h3>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => !lesson.locked && onLessonChange(index)}
                  disabled={lesson.locked}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentLessonIndex
                      ? 'bg-[#1e2348] text-white'
                      : lesson.completed
                      ? 'bg-green-50 hover:bg-green-100'
                      : lesson.locked
                      ? 'bg-gray-50 cursor-not-allowed opacity-50'
                      : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {lesson.locked ? (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      ) : lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        getLessonIcon(lesson.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lesson.duration} • {lesson.type}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};
