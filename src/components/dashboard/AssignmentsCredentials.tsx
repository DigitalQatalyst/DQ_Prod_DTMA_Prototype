import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { 
  Upload, 
  Download, 
  Award, 
  FileText, 
  Calendar,
  CheckCircle,
  Clock,
  Trophy
} from 'lucide-react';

export const AssignmentsCredentials = () => {
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2 !text-[#1e2348]" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
          Assignments
        </h2>
        <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>
          Submit assignments, track your progress, and view feedback
        </p>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-6 border border-border">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <FileText className="w-5 h-5 text-[#ff6b4d] mt-1" />
                  <div>
                    <h3 className="font-semibold !text-[#1e2348]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                      {assignment.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      {assignment.course}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground ml-8" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {assignment.description}
                </p>
              </div>
              
              <Badge className={getStatusColor(assignment.status)} style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                {assignment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                {assignment.status === 'submitted' && <CheckCircle className="w-3 h-3 mr-1" />}
                {assignment.status === 'graded' && <Award className="w-3 h-3 mr-1" />}
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4 ml-8">
              <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                {assignment.status === 'pending' && getDaysUntilDue(assignment.dueDate) <= 3 && (
                  <Badge variant="destructive" className="ml-2" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                    {getDaysUntilDue(assignment.dueDate)} days left
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <span>Points: {assignment.points}</span>
              </div>
              {assignment.grade && (
                <div className="flex items-center gap-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-[#ff6b4d]">Grade: {assignment.grade}%</span>
                </div>
              )}
            </div>

            {assignment.feedback && (
              <div className="ml-8 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <p className="text-green-800" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  <strong>Feedback:</strong> {assignment.feedback}
                </p>
              </div>
            )}

            <div className="ml-8 flex gap-3">
              {assignment.status === 'pending' && (
                <>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                  <Button variant="outline" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    View Details
                  </Button>
                </>
              )}
              {assignment.status === 'submitted' && (
                <Button variant="outline" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  View Submission
                </Button>
              )}
              {assignment.status === 'graded' && (
                <>
                  <Button variant="outline" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    View Feedback
                  </Button>
                  <Button variant="outline" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
