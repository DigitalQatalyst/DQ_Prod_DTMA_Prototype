import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  Clock,
  BookOpen,
  Award,
  Users,
  Globe,
  CheckCircle,
  PlayCircle,
  FileText,
  ExternalLink,
  Edit,
} from 'lucide-react';

interface CoursePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    instructor: string;
    category: string;
    level: string;
    status: string;
    enrollments: number;
    lastUpdated: string;
    rating: number;
    completion: number;
    revenue: number;
  };
  onEdit?: (courseId: string) => void;
}

export const CoursePreviewModal = ({ isOpen, onClose, course, onEdit }: CoursePreviewModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed course data
  const courseDetails = {
    description: `This comprehensive course provides an in-depth exploration of ${course.category}. 
    Designed for ${course.level.toLowerCase()} learners, you'll gain practical skills and theoretical knowledge 
    to excel in the digital transformation landscape.`,
    duration: '12 hours',
    language: 'English',
    certificate: true,
    modules: [
      {
        id: 1,
        title: 'Introduction & Fundamentals',
        duration: '2 hours',
        lessons: [
          { id: 1, title: 'Course Overview', type: 'video', duration: '15 min' },
          { id: 2, title: 'Key Concepts', type: 'video', duration: '30 min' },
          { id: 3, title: 'Reading Materials', type: 'document', duration: '20 min' },
          { id: 4, title: 'Quiz: Fundamentals', type: 'quiz', duration: '15 min' },
        ],
      },
      {
        id: 2,
        title: 'Core Principles',
        duration: '3 hours',
        lessons: [
          { id: 1, title: 'Framework Overview', type: 'video', duration: '25 min' },
          { id: 2, title: 'Case Studies', type: 'video', duration: '40 min' },
          { id: 3, title: 'Practical Applications', type: 'document', duration: '30 min' },
        ],
      },
      {
        id: 3,
        title: 'Advanced Topics',
        duration: '4 hours',
        lessons: [
          { id: 1, title: 'Deep Dive Analysis', type: 'video', duration: '45 min' },
          { id: 2, title: 'Industry Examples', type: 'video', duration: '35 min' },
          { id: 3, title: 'Final Assessment', type: 'quiz', duration: '30 min' },
        ],
      },
    ],
    learningOutcomes: [
      'Understand core concepts and frameworks',
      'Apply principles to real-world scenarios',
      'Analyze case studies and best practices',
      'Develop strategic thinking skills',
      'Earn a professional certificate',
    ],
    requirements: [
      'Basic understanding of digital concepts',
      'Access to a computer and internet',
      'Willingness to engage with course materials',
    ],
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'quiz':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {course.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrollments.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {course.rating > 0 ? course.rating : 'No ratings yet'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {courseDetails.duration}
                </span>
                <Badge className={`${
                  course.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                  course.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {course.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  onClick={() => onEdit(course.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-[#ff6b4d] text-white border-[#ff6b4d] hover:bg-[#e56045]"
                >
                  <Edit className="w-4 h-4" />
                  {course.status === 'draft' ? 'Continue Building' : 'Edit'}
                </Button>
              )}
              <Button
                onClick={() => window.open(`/courses/${course.id}`, '_blank')}
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]"
              >
                <ExternalLink className="w-4 h-4" />
                Open Full Page
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-140px)]">
          <div className="px-6 py-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Course Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Course Information</h3>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="font-medium capitalize">{course.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{course.lastUpdated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Language</p>
                      <p className="font-medium flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {courseDetails.language}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate</p>
                      <p className="font-medium flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {courseDetails.certificate ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {courseDetails.description}
                  </p>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                  <div className="grid gap-2">
                    {courseDetails.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {courseDetails.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Course Curriculum</h3>
                  <p className="text-sm text-muted-foreground">
                    {courseDetails.modules.length} modules • {courseDetails.duration}
                  </p>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {courseDetails.modules.map((module) => (
                    <AccordionItem
                      key={module.id}
                      value={`module-${module.id}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#ff6b4d]/10 text-[#ff6b4d] flex items-center justify-center font-semibold text-sm">
                              {module.id}
                            </div>
                            <div className="text-left">
                              <p className="font-medium">{module.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {module.lessons.length} lessons • {module.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-muted-foreground">
                                  {getLessonIcon(lesson.type)}
                                </div>
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Course Analytics</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Total Enrollments</p>
                    <p className="text-2xl font-bold">{course.enrollments.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Avg Completion Rate</p>
                    <p className="text-2xl font-bold">{course.completion}%</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Course Rating</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      {course.rating > 0 ? course.rating : 'N/A'}
                      {course.rating > 0 && <Star className="w-5 h-5 text-amber-500 fill-amber-500" />}
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Revenue Generated</p>
                    <p className="text-2xl font-bold">${course.revenue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    This course has been {course.status} and has attracted {course.enrollments} learners. 
                    {course.completion > 0 && ` The average completion rate of ${course.completion}% indicates strong learner engagement.`}
                    {course.rating > 0 && ` With a rating of ${course.rating} stars, learners are finding value in the content.`}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
