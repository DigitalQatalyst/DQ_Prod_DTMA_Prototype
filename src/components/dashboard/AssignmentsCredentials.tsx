import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Download, 
  Award, 
  FileText, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Trophy,
  Share2,
  ExternalLink
} from 'lucide-react';

export const AssignmentsCredentials = () => {
  const [assignmentText, setAssignmentText] = useState('');

  const assignments = [
    {
      id: '1',
      title: 'Digital Transformation Strategy Document',
      course: 'Introduction to Digital Economy & Economy 4.0',
      dueDate: '2024-03-30',
      status: 'pending',
      description: 'Create a comprehensive digital transformation strategy for a traditional retail business.',
      points: 100
    },
    {
      id: '2',
      title: 'AI Implementation Case Study',
      course: 'AI-Powered Business Transformation',
      dueDate: '2024-04-05',
      status: 'submitted',
      description: 'Analyze a real-world AI implementation and its business impact.',
      points: 80,
      submittedDate: '2024-03-28',
      grade: 85
    },
    {
      id: '3',
      title: 'Leadership Reflection Essay',
      course: 'Digital Leadership & Change Management',
      dueDate: '2024-03-25',
      status: 'graded',
      description: 'Reflect on your leadership style and how it applies to digital transformation.',
      points: 50,
      submittedDate: '2024-03-24',
      grade: 92,
      feedback: 'Excellent analysis of leadership principles. Great real-world examples.'
    },
  ];

  const certificates = [
    {
      id: '1',
      title: 'Introduction to Digital Economy & Economy 4.0',
      issueDate: '2024-03-15',
      certificateNumber: 'DTMA-2024-001234',
      credentialUrl: 'https://credentials.dtma.ae/cert/001234'
    },
    {
      id: '2',
      title: 'Platform Economics & Network Effects',
      issueDate: '2024-02-28',
      certificateNumber: 'DTMA-2024-001189',
      credentialUrl: 'https://credentials.dtma.ae/cert/001189'
    },
  ];

  const badges = [
    { id: '1', name: 'Fast Learner', icon: '⚡', description: 'Completed 5 courses in 30 days' },
    { id: '2', name: 'Perfect Score', icon: '💯', description: 'Achieved 100% on 3 quizzes' },
    { id: '3', name: 'Consistent', icon: '🔥', description: '30-day learning streak' },
    { id: '4', name: 'Collaborator', icon: '🤝', description: 'Helped 10 peers in forums' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Tabs defaultValue="assignments" className="space-y-6">
      <TabsList>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="certificates">Certificates</TabsTrigger>
        <TabsTrigger value="badges">Badges</TabsTrigger>
      </TabsList>

      {/* Assignments Tab */}
      <TabsContent value="assignments" className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <FileText className="w-5 h-5 text-[#ff6b4d] mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-8">{assignment.description}</p>
              </div>
              
              <Badge className={getStatusColor(assignment.status)}>
                {assignment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                {assignment.status === 'submitted' && <CheckCircle className="w-3 h-3 mr-1" />}
                {assignment.status === 'graded' && <Award className="w-3 h-3 mr-1" />}
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4 ml-8">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                {assignment.status === 'pending' && getDaysUntilDue(assignment.dueDate) <= 3 && (
                  <Badge variant="destructive" className="ml-2">
                    {getDaysUntilDue(assignment.dueDate)} days left
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <span>Points: {assignment.points}</span>
              </div>
              {assignment.grade && (
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-[#ff6b4d]">Grade: {assignment.grade}%</span>
                </div>
              )}
            </div>

            {assignment.feedback && (
              <div className="ml-8 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <p className="text-sm text-green-800">
                  <strong>Feedback:</strong> {assignment.feedback}
                </p>
              </div>
            )}

            <div className="ml-8 flex gap-3">
              {assignment.status === 'pending' && (
                <>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                  <Button variant="outline">View Details</Button>
                </>
              )}
              {assignment.status === 'submitted' && (
                <Button variant="outline">View Submission</Button>
              )}
              {assignment.status === 'graded' && (
                <>
                  <Button variant="outline">View Feedback</Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </TabsContent>

      {/* Certificates Tab */}
      <TabsContent value="certificates" className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-[#1e2348] to-[#2a3058] p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">KHDA-Attested Certificate</p>
                    <h3 className="font-semibold text-lg">{cert.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                    <p className="font-medium">{new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                    <p className="font-medium font-mono text-sm">{cert.certificateNumber}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045] text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Badges Tab */}
      <TabsContent value="badges">
        <div className="grid md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <Card key={badge.id} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">{badge.icon}</div>
              <h3 className="font-semibold mb-2">{badge.name}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-6">
          <h3 className="font-semibold mb-4">Badge Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-medium">Goal Crusher</p>
                  <p className="text-sm text-muted-foreground">Complete 10 courses</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">6/10</p>
                <div className="w-24 h-2 bg-accent rounded-full mt-1">
                  <div className="w-3/5 h-full bg-[#ff6b4d] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📚</div>
                <div>
                  <p className="font-medium">Knowledge Seeker</p>
                  <p className="text-sm text-muted-foreground">Complete 50 lessons</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">24/50</p>
                <div className="w-24 h-2 bg-accent rounded-full mt-1">
                  <div className="w-1/2 h-full bg-[#ff6b4d] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
