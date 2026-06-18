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
  Trophy,
} from 'lucide-react';
import {
  learnerBadge,
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerItemTitle,
  learnerPanel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export const AssignmentsCredentials = () => {
  const assignments = [
    {
      id: '1',
      title: 'Digital Transformation Strategy Document',
      course: 'Introduction to Digital Economy & Economy 4.0',
      dueDate: '2024-03-30',
      status: 'pending',
      description: 'Create a comprehensive digital transformation strategy for a traditional retail business.',
      points: 100,
    },
    {
      id: '2',
      title: 'AI Implementation Case Study',
      course: 'AI-Powered Business Transformation',
      dueDate: '2024-04-05',
      status: 'submitted',
      description: 'Analyze a real-world AI implementation and its business impact.',
      points: 80,
      grade: 85,
    },
    {
      id: '3',
      title: 'Leadership Reflection Essay',
      course: 'Digital Leadership & Change Management',
      dueDate: '2024-03-25',
      status: 'graded',
      description: 'Reflect on your leadership style and how it applies to digital transformation.',
      points: 50,
      grade: 92,
      feedback: 'Excellent analysis of leadership principles. Great real-world examples.',
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

  const getDueLabel = (dueDate: string, status: string) => {
    if (status !== 'pending') return null;
    const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue';
    if (days <= 3) return `${days} day${days === 1 ? '' : 's'} left`;
    return null;
  };

  return (
    <div className="space-y-3">
      {assignments.map((assignment) => {
        const dueLabel = getDueLabel(assignment.dueDate, assignment.status);

        return (
          <Card key={assignment.id} className={cn(learnerPanel, 'p-4')}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-dq-orange" />
                <div className="min-w-0">
                  <h3 className={learnerItemTitle}>{assignment.title}</h3>
                  <p className={learnerBodyMuted}>{assignment.course}</p>
                </div>
              </div>
              <Badge className={cn(getStatusColor(assignment.status), learnerBadge, 'shrink-0')}>
                {assignment.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                {assignment.status === 'submitted' && <CheckCircle className="mr-1 h-3 w-3" />}
                {assignment.status === 'graded' && <Award className="mr-1 h-3 w-3" />}
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Badge>
            </div>

            <p className={cn(learnerBody, 'mb-3 line-clamp-2')}>{assignment.description}</p>

            <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Due {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5" />
                {assignment.points} pts
              </span>
              {assignment.grade != null && (
                <span className="inline-flex items-center gap-1 font-medium text-dq-orange">
                  <Award className="h-3.5 w-3.5" />
                  {assignment.grade}%
                </span>
              )}
              {dueLabel && (
                <Badge
                  variant={dueLabel === 'Overdue' ? 'destructive' : 'secondary'}
                  className={cn('text-[10px]', learnerBadge)}
                >
                  {dueLabel}
                </Badge>
              )}
            </div>

            {assignment.feedback && (
              <div className="mb-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                <p className="text-xs text-green-800">
                  <strong>Feedback:</strong> {assignment.feedback}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {assignment.status === 'pending' && (
                <>
                  <Button className={cn(learnerBtnPrimary, 'h-8 px-3 text-xs')}>
                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                    Submit
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    View Details
                  </Button>
                </>
              )}
              {assignment.status === 'submitted' && (
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  View Submission
                </Button>
              )}
              {assignment.status === 'graded' && (
                <>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    View Feedback
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
