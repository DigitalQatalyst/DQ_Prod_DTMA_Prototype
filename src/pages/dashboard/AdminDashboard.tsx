import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminAnalytics, usePendingCourses, useAdminUsers, useReviewCourse, useUpdateUserRole } from '@/hooks/useAdmin';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';
import { InviteManagement } from '@/components/admin/InviteManagement';
import AnalyticsPerformanceInsightsPanel from '@/components/admin/stage4/AnalyticsPerformanceInsightsPanel';
import FinanceBillingGovernancePanel from '@/components/admin/stage4/FinanceBillingGovernancePanel';
import OperationsSupportPanel from '@/components/admin/stage4/OperationsSupportPanel';
import PartnerAccreditationReportingPanel from '@/components/admin/stage4/PartnerAccreditationReportingPanel';
import AccreditationPanel from '@/components/admin/stage4/AccreditationPanel';
import RecordsCertificationGovernancePanel from '@/components/admin/stage4/RecordsCertificationGovernancePanel';
import { CreateCourseModal } from '@/components/admin/CreateCourseModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronRight,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  UserPlus,
  Sparkles,
  Bot,
  Brain,
  FileText,
  AlertTriangle,
  MessageSquare,
  Shield,
  Headphones,
  Globe,
  Send,
  Calendar,
  Target,
  Bell,
  Building2,
  Search,
  Star,
  BarChart2,
  Edit,
  PlusCircle,
  ArrowUpRight,
  Filter,
  Video,
  MapPin,
  Link as LinkIcon,
  Users2,
  FileText as FileTextIcon,
  Upload,
  Mail,
  UserPlus as UserPlusIcon,
  Download,
  Phone,
  Briefcase,
  Award as AwardIcon,
  Image,
  Lock,
  Building,
  Shield as ShieldIcon,
  CheckCircle2,
  XCircle as XCircleIcon,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
} from 'lucide-react';

type AdminTab = 'overview' | 'users' | 'courses' | 'pending' | 'invites' | 'assessments' | 'scheduling' | 'enrollment' | 'faculty' | 'resources' | 'system' | 'communication' | 'governance' | 'finance' | 'partner-reporting' | 'accreditation' | 'analytics-performance' | 'operations-support' | 'records-certification' | 'ai-assistant' | 'ai-faculty' | 'ai-content' | 'ai-assessment' | 'ai-cohort' | 'ai-feedback' | 'ai-moderation' | 'ai-support' | 'ai-localization';

// ─── Mock data ───────────────────────────────────────────────────────────────
const MOCK_COURSES = [
  { id: '1', title: 'Digital Transformation Fundamentals', instructor: 'Dr. Aisha Mensah', category: 'Digital Skills', level: 'Beginner', status: 'published', enrollments: 342, lastUpdated: '2026-03-20', rating: 4.8, completion: 72, revenue: 8550 },
  { id: '2', title: 'AI & Automation in the Workplace', instructor: 'James Okafor', category: 'AI & Technology', level: 'Intermediate', status: 'published', enrollments: 219, lastUpdated: '2026-03-18', rating: 4.6, completion: 65, revenue: 5475 },
  { id: '3', title: 'Data-Driven Decision Making', instructor: 'Priya Nair', category: 'Analytics', level: 'Intermediate', status: 'draft', enrollments: 0, lastUpdated: '2026-03-25', rating: 0, completion: 0, revenue: 0 },
  { id: '4', title: 'Leadership in the Digital Age', instructor: 'Marcus Webb', category: 'Leadership', level: 'Advanced', status: 'pending', enrollments: 0, lastUpdated: '2026-03-22', rating: 0, completion: 0, revenue: 0 },
  { id: '5', title: 'Agile Project Management', instructor: 'Sofia Reyes', category: 'Management', level: 'Intermediate', status: 'published', enrollments: 187, lastUpdated: '2026-03-15', rating: 4.5, completion: 58, revenue: 4675 },
  { id: '6', title: 'Cybersecurity Essentials', instructor: 'Dr. Kwame Asante', category: 'Digital Skills', level: 'Beginner', status: 'published', enrollments: 154, lastUpdated: '2026-03-10', rating: 4.7, completion: 81, revenue: 3850 },
  { id: '7', title: 'Emotional Intelligence at Work', instructor: 'Lindiwe Dube', category: 'Leadership', level: 'Beginner', status: 'draft', enrollments: 0, lastUpdated: '2026-03-26', rating: 0, completion: 0, revenue: 0 },
];

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft:     'bg-amber-100 text-amber-700',
  pending:   'bg-blue-100 text-blue-700',
};

const CATEGORIES = ['All Categories', 'Digital Skills', 'AI & Technology', 'Analytics', 'Leadership', 'Management'];

// ─── CourseManagementTab ──────────────────────────────────────────────────────
const CourseManagementTab = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  const filtered = MOCK_COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchCat = categoryFilter === 'All Categories' || c.category === categoryFilter;
    return matchSearch && matchStatus && matchCat;
  });

  const published = MOCK_COURSES.filter(c => c.status === 'published').length;
  const drafts    = MOCK_COURSES.filter(c => c.status === 'draft').length;
  const pending   = MOCK_COURSES.filter(c => c.status === 'pending').length;
  const totalEnrollments = MOCK_COURSES.reduce((s, c) => s + c.enrollments, 0);
  const avgCompletion = Math.round(MOCK_COURSES.filter(c => c.completion > 0).reduce((s, c) => s + c.completion, 0) / published) || 0;
  const avgRating = (MOCK_COURSES.filter(c => c.rating > 0).reduce((s, c) => s + c.rating, 0) / published).toFixed(1);
  const totalRevenue = MOCK_COURSES.reduce((s, c) => s + c.revenue, 0);

  const topCourses = [...MOCK_COURSES]
    .filter(c => c.status === 'published')
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-[28px] leading-[36px] font-semibold text-foreground">Course &amp; Content Management</h1>

      {/* ── Section 1: Authoring & Publishing ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[20px] leading-[28px] font-semibold text-foreground">Course Authoring &amp; Publishing</h2>
            <p className="text-[13px] text-muted-foreground mt-0.5">Create, edit, and publish courses with approval workflows.</p>
          </div>
          <Button 
            onClick={() => setShowCreateCourseModal(true)}
            className="bg-[#ff6b4d] hover:bg-[#e56045] text-white gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Course
          </Button>
        </div>

        {/* Summary stat pills */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: 'Total Courses', value: MOCK_COURSES.length, color: 'bg-[#1e2348]/5 text-[#1e2348]' },
            { label: 'Published',     value: published,            color: 'bg-emerald-50 text-emerald-700' },
            { label: 'Draft',         value: drafts,               color: 'bg-amber-50 text-amber-700' },
            { label: 'Pending Review',value: pending,              color: 'bg-blue-50 text-blue-700' },
          ].map(pill => (
            <div key={pill.label} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium ${pill.color}`}>
              <span className="font-bold text-[15px]">{pill.value}</span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses or instructors…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-border rounded-xl text-[14px] bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-border rounded-xl text-[14px] bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
            >
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Courses table */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1e2348]">
                <tr>
                  {['Course', 'Instructor', 'Category', 'Level', 'Status', 'Enrollments', 'Last Updated', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[14px] text-muted-foreground">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No courses match your filters.
                    </td>
                  </tr>
                ) : filtered.map((course, idx) => (
                  <tr key={course.id} className={`border-t border-border transition-colors hover:bg-muted/30 ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[14px] text-foreground max-w-[200px] truncate" title={course.title}>{course.title}</div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground whitespace-nowrap">{course.instructor}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground whitespace-nowrap">{course.category}</td>
                    <td className="px-4 py-3">
                      <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#1e2348]/10 text-[#1e2348] font-medium capitalize">{course.level}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[course.status]}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[14px] font-medium text-foreground">{course.enrollments.toLocaleString()}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground whitespace-nowrap">{course.lastUpdated}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#ff6b4d]/10 text-[#ff6b4d] transition-colors" title="Edit course">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#1e2348]/10 text-[#1e2348] transition-colors" title="Preview course">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 2: Course Performance Analytics ── */}
      <section>
        <div className="mb-4">
          <h2 className="text-[20px] leading-[28px] font-semibold text-foreground">Course Performance Analytics</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">Track engagement, completion rates, and learner feedback across all courses.</p>
        </div>

        {/* KPI stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: BookOpen,   label: 'Total Courses',      value: MOCK_COURSES.length,               suffix: '',   color: 'text-[#ff6b4d]', bg: 'bg-[#ff6b4d]/10' },
            { icon: TrendingUp, label: 'Avg Completion Rate', value: avgCompletion,                     suffix: '%',  color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: Star,       label: 'Avg Course Rating',   value: avgRating,                         suffix: '★', color: 'text-amber-500',  bg: 'bg-amber-100' },
            { icon: Users,      label: 'Total Enrollments',   value: totalEnrollments.toLocaleString(), suffix: '',   color: 'text-blue-600',   bg: 'bg-blue-100' },
          ].map(card => (
            <div key={card.label} className="bg-card rounded-2xl p-5 shadow-sm border border-border">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-[22px] font-bold text-foreground">{card.value}{card.suffix}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top performing courses table */}
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">Top Performing Courses</h3>
              <span className="text-[12px] text-muted-foreground">By Enrollments</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/40">
                  <tr>
                    {['Course', 'Instructor', 'Enrolled', 'Completion', 'Rating', 'Revenue'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topCourses.map((c, i) => (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#1e2348]/10 text-[#1e2348] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          <span className="text-[13px] font-medium text-foreground max-w-[150px] truncate" title={c.title}>{c.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-muted-foreground whitespace-nowrap">{c.instructor}</td>
                      <td className="px-4 py-3 text-[13px] font-semibold text-foreground">{c.enrollments.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${c.completion}%` }} />
                          </div>
                          <span className="text-[12px] text-muted-foreground">{c.completion}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[13px] text-amber-500 font-medium">{c.rating > 0 ? `${c.rating}★` : '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] font-semibold text-foreground">
                        ${c.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Engagement panel */}
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">Engagement Snapshot</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Platform-wide activity this month</p>
            </div>
            <div className="p-5 space-y-4">
              {[
                { icon: Clock,       label: 'Avg Session Time',        value: '38 min',  trend: '+4 min',   up: true },
                { icon: CheckCircle, label: 'Lessons Completed (week)', value: '1,284',   trend: '+12%',     up: true },
                { icon: Users,       label: 'New Enrollments (month)',  value: '203',     trend: '+8%',      up: true },
                { icon: BarChart2,   label: 'Course Completion Rate',   value: `${avgCompletion}%`, trend: '+3%', up: true },
                { icon: Star,        label: 'Avg Learner Rating',        value: `${avgRating}★`,    trend: '—',   up: null },
                { icon: ArrowUpRight,label: 'Total Revenue (month)',     value: `$${totalRevenue.toLocaleString()}`, trend: '+15%', up: true },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#ff6b4d]/10 flex items-center justify-center">
                      <row.icon className="w-4 h-4 text-[#ff6b4d]" />
                    </div>
                    <span className="text-[13px] text-muted-foreground">{row.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-foreground">{row.value}</div>
                    <div className={`text-[11px] font-medium ${
                      row.up === true ? 'text-emerald-600' : row.up === false ? 'text-red-500' : 'text-muted-foreground'
                    }`}>{row.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Create Course Modal */}
      <CreateCourseModal 
        open={showCreateCourseModal}
        onClose={() => setShowCreateCourseModal(false)}
      />
    </div>
  );
};

// ─── Mock assessments data ────────────────────────────────────────────────────
const MOCK_QUIZZES = [
  { id: 'q1', title: 'Module 1: Digital Fundamentals Check', course: 'Digital Transformation Fundamentals', type: 'Quiz',       questions: 15, submissions: 287, avgScore: 78, passRate: 84, status: 'active'   },
  { id: 'q2', title: 'AI Concepts Mid-Course Assessment',    course: 'AI & Automation in the Workplace',  type: 'Quiz',       questions: 20, submissions: 174, avgScore: 71, passRate: 76, status: 'active'   },
  { id: 'q3', title: 'Capstone Project Submission',          course: 'Data-Driven Decision Making',       type: 'Assignment', questions: 5,  submissions: 52,  avgScore: 82, passRate: 90, status: 'active'   },
  { id: 'q4', title: 'Leadership Style Reflection',          course: 'Leadership in the Digital Age',     type: 'Assignment', questions: 3,  submissions: 0,   avgScore: 0,  passRate: 0,  status: 'draft'    },
  { id: 'q5', title: 'Agile Sprint Planning Quiz',           course: 'Agile Project Management',         type: 'Quiz',       questions: 12, submissions: 143, avgScore: 74, passRate: 79, status: 'active'   },
  { id: 'q6', title: 'Security Threat Identification',       course: 'Cybersecurity Essentials',         type: 'Quiz',       questions: 18, submissions: 121, avgScore: 69, passRate: 71, status: 'active'   },
];

const MOCK_SUBMISSIONS = [
  { id: 's1', learner: 'Amara Osei',    assessment: 'Capstone Project Submission',       course: 'Data-Driven Decision Making',      submitted: '2026-03-26', score: null, maxScore: 100 },
  { id: 's2', learner: 'James Kariuki', assessment: 'Leadership Style Reflection',       course: 'Leadership in the Digital Age',    submitted: '2026-03-25', score: null, maxScore: 100 },
  { id: 's3', learner: 'Fatou Diallo',  assessment: 'Capstone Project Submission',       course: 'Data-Driven Decision Making',      submitted: '2026-03-25', score: null, maxScore: 100 },
  { id: 's4', learner: 'Kofi Mensah',   assessment: 'Leadership Style Reflection',       course: 'Leadership in the Digital Age',    submitted: '2026-03-24', score: null, maxScore: 100 },
];

const SCORE_DISTRIBUTION = [
  { range: '90–100', count: 48,  color: 'bg-emerald-500' },
  { range: '80–89',  count: 112, color: 'bg-blue-500'    },
  { range: '70–79',  count: 134, color: 'bg-amber-400'   },
  { range: '60–69',  count: 67,  color: 'bg-orange-400'  },
  { range: 'Below 60', count: 31, color: 'bg-red-400'    },
];
const DIST_MAX = Math.max(...SCORE_DISTRIBUTION.map(d => d.count));

const QUIZ_TYPE_STYLE: Record<string, string> = {
  Quiz:       'bg-blue-100 text-blue-700',
  Assignment: 'bg-purple-100 text-purple-700',
};

// ─── AssessmentsTab ───────────────────────────────────────────────────────────
const AssessmentsTab = () => {
  const [quizSearch, setQuizSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'quizzes' | 'submissions' | 'analytics'>('quizzes');
  const [scores, setScores] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, boolean>>({});

  const filteredQuizzes = MOCK_QUIZZES.filter(q =>
    q.title.toLowerCase().includes(quizSearch.toLowerCase()) ||
    q.course.toLowerCase().includes(quizSearch.toLowerCase())
  );

  const totalSubmissions = MOCK_QUIZZES.reduce((s, q) => s + q.submissions, 0);
  const activeQuizzes    = MOCK_QUIZZES.filter(q => q.status === 'active');
  const avgScore         = Math.round(activeQuizzes.reduce((s, q) => s + q.avgScore, 0) / activeQuizzes.length);
  const avgPassRate      = Math.round(activeQuizzes.reduce((s, q) => s + q.passRate, 0) / activeQuizzes.length);

  const sections = [
    { id: 'quizzes',     label: 'Quiz Management' },
    { id: 'submissions', label: `Pending Grading (${MOCK_SUBMISSIONS.filter(s => !graded[s.id]).length})` },
    { id: 'analytics',   label: 'Performance Analytics' },
  ] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-[28px] leading-[36px] font-semibold text-foreground">Assessments &amp; Evaluation</h1>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total Assessments',  value: MOCK_QUIZZES.length,                                    color: 'bg-[#1e2348]/5 text-[#1e2348]'    },
          { label: 'Total Submissions',  value: totalSubmissions.toLocaleString(),                       color: 'bg-blue-50 text-blue-700'          },
          { label: 'Avg Score',          value: `${avgScore}%`,                                          color: 'bg-amber-50 text-amber-700'        },
          { label: 'Avg Pass Rate',      value: `${avgPassRate}%`,                                       color: 'bg-emerald-50 text-emerald-700'    },
          { label: 'Pending Grading',    value: MOCK_SUBMISSIONS.filter(s => !graded[s.id]).length,      color: 'bg-red-50 text-red-700'            },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium ${p.color}`}>
            <span className="font-bold text-[15px]">{p.value}</span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-xl w-fit">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              activeSection === s.id
                ? 'bg-white shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Section: Quiz Management ── */}
      {activeSection === 'quizzes' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assessments or courses…"
                value={quizSearch}
                onChange={e => setQuizSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
              />
            </div>
            <button className="px-4 py-2 rounded-xl bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[13px] font-medium flex items-center gap-1.5 transition-colors">
              <PlusCircle className="w-4 h-4" /> Create Assessment
            </button>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e2348]">
                  <tr>
                    {['Assessment', 'Course', 'Type', 'Questions', 'Submissions', 'Avg Score', 'Pass Rate', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[12px] font-medium text-white whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredQuizzes.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-10 text-[14px] text-muted-foreground">
                        No assessments match your search.
                      </td>
                    </tr>
                  ) : filteredQuizzes.map((q, idx) => (
                    <tr key={q.id} className={`border-t border-border hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[13px] text-foreground max-w-[180px] truncate" title={q.title}>{q.title}</div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-muted-foreground max-w-[160px] truncate" title={q.course}>{q.course}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${QUIZ_TYPE_STYLE[q.type]}`}>{q.type}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-center text-foreground">{q.questions}</td>
                      <td className="px-4 py-3 text-[13px] text-center font-medium text-foreground">{q.submissions.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        {q.avgScore > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-14 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className={`h-full rounded-full ${q.avgScore >= 75 ? 'bg-emerald-500' : q.avgScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${q.avgScore}%` }} />
                            </div>
                            <span className="text-[12px] text-muted-foreground">{q.avgScore}%</span>
                          </div>
                        ) : <span className="text-[12px] text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-center font-medium text-foreground">{q.passRate > 0 ? `${q.passRate}%` : '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold capitalize ${q.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-[#ff6b4d]/10 text-[#ff6b4d] transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-[#1e2348]/10 text-[#1e2348] transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Section: Pending Grading ── */}
      {activeSection === 'submissions' && (
        <div className="space-y-4">
          <p className="text-[13px] text-muted-foreground">Review and grade open-ended learner submissions. Scores are out of 100.</p>
          {MOCK_SUBMISSIONS.map(sub => (
            <div key={sub.id} className={`bg-card rounded-2xl border shadow-sm overflow-hidden transition-all ${graded[sub.id] ? 'border-emerald-200 opacity-70' : 'border-border'}`}>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center text-[#ff6b4d] font-bold text-[13px]">
                      {sub.learner.charAt(0)}
                    </div>
                    <span className="font-semibold text-[14px] text-foreground">{sub.learner}</span>
                    {graded[sub.id] && <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Graded</span>}
                  </div>
                  <p className="text-[13px] font-medium text-foreground">{sub.assessment}</p>
                  <p className="text-[12px] text-muted-foreground">{sub.course}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Submitted: {sub.submitted}</p>
                </div>
                <button className="px-3 py-1.5 border border-border rounded-lg text-[12px] text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  <Eye className="w-3.5 h-3.5" /> View Submission
                </button>
              </div>
              {!graded[sub.id] && (
                <div className="px-5 pb-5 flex flex-wrap gap-4 items-start">
                  <div>
                    <label className="text-[12px] font-medium text-foreground block mb-1">Score (out of {sub.maxScore})</label>
                    <input
                      type="number"
                      min={0}
                      max={sub.maxScore}
                      placeholder="0–100"
                      value={scores[sub.id] || ''}
                      onChange={e => setScores(prev => ({ ...prev, [sub.id]: e.target.value }))}
                      className="w-24 px-3 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-[12px] font-medium text-foreground block mb-1">Instructor Feedback</label>
                    <textarea
                      placeholder="Write feedback for the learner…"
                      rows={2}
                      value={feedbacks[sub.id] || ''}
                      onChange={e => setFeedbacks(prev => ({ ...prev, [sub.id]: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-xl text-[13px] bg-background resize-none focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => scores[sub.id] && setGraded(prev => ({ ...prev, [sub.id]: true }))}
                      disabled={!scores[sub.id]}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-medium transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Submit Grade
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {MOCK_SUBMISSIONS.every(s => graded[s.id]) && (
            <div className="bg-card rounded-2xl p-10 text-center border border-border">
              <CheckCircle className="w-10 h-10 text-[#ff6b4d] mx-auto mb-2" />
              <h3 className="font-semibold text-[16px]">All submissions graded!</h3>
              <p className="text-[13px] text-muted-foreground">No pending submissions.</p>
            </div>
          )}
        </div>
      )}

      {/* ── Section: Performance Analytics ── */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Score distribution */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <h3 className="text-[16px] font-semibold text-foreground mb-4">Score Distribution (All Assessments)</h3>
              <div className="space-y-3">
                {SCORE_DISTRIBUTION.map(d => (
                  <div key={d.range} className="flex items-center gap-3">
                    <span className="text-[12px] text-muted-foreground w-14 text-right flex-shrink-0">{d.range}</span>
                    <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${d.color} flex items-center justify-end pr-2 transition-all`}
                        style={{ width: `${(d.count / DIST_MAX) * 100}%` }}
                      >
                        <span className="text-[10px] text-white font-bold">{d.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top & bottom performers */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <h3 className="text-[16px] font-semibold text-foreground mb-4">Assessment Performance Rankings</h3>
              <div className="space-y-3">
                <p className="text-[12px] font-semibold text-emerald-600 uppercase tracking-wide">Highest Scoring</p>
                {[...MOCK_QUIZZES].filter(q => q.avgScore > 0).sort((a, b) => b.avgScore - a.avgScore).slice(0, 3).map((q, i) => (
                  <div key={q.id} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="text-[13px] text-foreground truncate max-w-[200px]">{q.title}</span>
                    </div>
                    <span className="text-[13px] font-semibold text-emerald-600">{q.avgScore}%</span>
                  </div>
                ))}
                <p className="text-[12px] font-semibold text-red-500 uppercase tracking-wide mt-3">Needs Attention</p>
                {[...MOCK_QUIZZES].filter(q => q.avgScore > 0).sort((a, b) => a.avgScore - b.avgScore).slice(0, 2).map((q, i) => (
                  <div key={q.id} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="text-[13px] text-foreground truncate max-w-[200px]">{q.title}</span>
                    </div>
                    <span className="text-[13px] font-semibold text-red-500">{q.avgScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award,      label: 'Highest Avg Score',  value: `${Math.max(...activeQuizzes.map(q => q.avgScore))}%`, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { icon: TrendingUp, label: 'Highest Pass Rate',  value: `${Math.max(...activeQuizzes.map(q => q.passRate))}%`, color: 'text-blue-600',    bg: 'bg-blue-100'    },
              { icon: Target,     label: 'Avg Pass Rate',      value: `${avgPassRate}%`,                                     color: 'text-amber-600',   bg: 'bg-amber-100'   },
              { icon: Users,      label: 'Total Submissions',  value: totalSubmissions.toLocaleString(),                     color: 'text-[#ff6b4d]',   bg: 'bg-[#ff6b4d]/10'},
            ].map(card => (
              <div key={card.label} className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${card.bg}`}>
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div className="text-[20px] font-bold text-foreground">{card.value}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Mock pending review data ─────────────────────────────────────────────────
const MOCK_PENDING = [
  {
    id: 'p1',
    title: 'Data-Driven Decision Making',
    instructor: 'Priya Nair',
    email: 'p.nair@dtma.com',
    category: 'Analytics',
    level: 'Intermediate',
    price: 149,
    duration: '6h 30m',
    lessons: 18,
    submittedDate: '2026-03-25',
    description: 'A comprehensive course on using data analytics to drive strategic business decisions. Learners will master dashboards, KPIs, and data storytelling using real-world datasets.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  },
  {
    id: 'p2',
    title: 'Leadership in the Digital Age',
    instructor: 'Marcus Webb',
    email: 'm.webb@dtma.com',
    category: 'Leadership',
    level: 'Advanced',
    price: 199,
    duration: '8h 15m',
    lessons: 24,
    submittedDate: '2026-03-22',
    description: 'Equip leaders with the mindset and tools to thrive in rapidly evolving digital environments. Covers agile leadership, remote team management, and digital culture transformation.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  },
  {
    id: 'p3',
    title: 'Emotional Intelligence at Work',
    instructor: 'Lindiwe Dube',
    email: 'l.dube@dtma.com',
    category: 'Leadership',
    level: 'Beginner',
    price: 99,
    duration: '4h 45m',
    lessons: 14,
    submittedDate: '2026-03-26',
    description: 'Develop self-awareness, empathy, and interpersonal skills to foster a more collaborative and productive workplace. Includes practical exercises and reflective assignments.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
];

const RECENT_ACTIVITY = [
  { action: 'approved',           course: 'Digital Transformation Fundamentals', reviewer: 'Admin', time: '2 hours ago', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { action: 'rejected',           course: 'Python for Beginners v2',             reviewer: 'Admin', time: '5 hours ago', color: 'text-red-600',     bg: 'bg-red-100'     },
  { action: 'approved',           course: 'Agile Project Management',            reviewer: 'Admin', time: 'Yesterday',   color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { action: 'changes requested',  course: 'Cloud Architecture Basics',           reviewer: 'Admin', time: 'Yesterday',   color: 'text-amber-600',   bg: 'bg-amber-100'   },
  { action: 'approved',           course: 'AI & Automation in the Workplace',    reviewer: 'Admin', time: '2 days ago',  color: 'text-emerald-600', bg: 'bg-emerald-100' },
];

const PENDING_CATEGORIES = ['All Categories', 'Analytics', 'Leadership', 'Digital Skills', 'Management'];

// ─── PendingApprovalsTab ──────────────────────────────────────────────────────
const PendingApprovalsTab = () => {
  const [pendingSearch, setPendingSearch] = useState('');
  const [pendingCategory, setPendingCategory] = useState('All Categories');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const filtered = MOCK_PENDING.filter(c => {
    const matchSearch =
      c.title.toLowerCase().includes(pendingSearch.toLowerCase()) ||
      c.instructor.toLowerCase().includes(pendingSearch.toLowerCase());
    const matchCat = pendingCategory === 'All Categories' || c.category === pendingCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-[28px] leading-[36px] font-semibold text-foreground">Pending Course Approvals</h1>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Awaiting Review',     value: MOCK_PENDING.length, color: 'bg-blue-50 text-blue-700'       },
          { label: 'Approved This Month', value: 12,                  color: 'bg-emerald-50 text-emerald-700'  },
          { label: 'Rejected This Month', value: 2,                   color: 'bg-red-50 text-red-700'          },
          { label: 'Changes Requested',   value: 1,                   color: 'bg-amber-50 text-amber-700'      },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium ${p.color}`}>
            <span className="font-bold text-[15px]">{p.value}</span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by course or instructor…"
            value={pendingSearch}
            onChange={e => setPendingSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
          />
        </div>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={pendingCategory}
            onChange={e => setPendingCategory(e.target.value)}
            className="pl-9 pr-8 py-2 border border-border rounded-xl text-[14px] bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
          >
            {PENDING_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Review cards */}
        <div className="lg:col-span-2 space-y-5">
          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 text-center border border-border">
              <CheckCircle className="w-12 h-12 text-[#ff6b4d] mx-auto mb-3" />
              <h3 className="text-[18px] font-semibold mb-1">All caught up!</h3>
              <p className="text-[14px] text-muted-foreground">No courses match your filters.</p>
            </div>
          ) : filtered.map(course => (
            <div key={course.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex gap-4 p-5">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-semibold text-foreground leading-tight">{course.title}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold whitespace-nowrap flex-shrink-0">
                      Pending Review
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground mt-1">
                    by <span className="font-medium text-foreground">{course.instructor}</span> · {course.email}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#1e2348]/10 text-[#1e2348] font-medium">{course.category}</span>
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{course.level}</span>
                    <span className="text-[12px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="text-[12px] text-muted-foreground">{course.lessons} lessons</span>
                    <span className="text-[13px] font-semibold text-[#ff6b4d]">${course.price}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-4">
                <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{course.description}</p>
                <p className="text-[12px] text-muted-foreground mt-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Submitted: {course.submittedDate}
                </p>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-t border-border">
                {confirmingId === course.id ? (
                  <>
                    <span className="text-[13px] text-muted-foreground flex-1">Confirm approval?</span>
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="px-3 py-1.5 rounded-lg border border-border text-[13px] hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Confirm Approve
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setConfirmingId(course.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="px-4 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-[13px] font-medium border border-amber-200 transition-colors flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> Request Changes
                    </button>
                    <button className="px-4 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-medium border border-red-200 transition-colors flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button className="ml-auto px-3 py-1.5 rounded-lg border border-border text-[13px] text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity sidebar */}
        <div className="bg-card rounded-2xl border border-border shadow-sm h-fit">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-[16px] font-semibold text-foreground">Recent Review Activity</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Last 5 review decisions</p>
          </div>
          <div className="p-5 space-y-4">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                  {item.action === 'approved'          && <CheckCircle   className={`w-3.5 h-3.5 ${item.color}`} />}
                  {item.action === 'rejected'          && <XCircle       className={`w-3.5 h-3.5 ${item.color}`} />}
                  {item.action === 'changes requested' && <MessageSquare className={`w-3.5 h-3.5 ${item.color}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground truncate">{item.course}</p>
                  <p className="text-[12px] text-muted-foreground">
                    <span className={`font-medium capitalize ${item.color}`}>{item.action}</span> by {item.reviewer}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <button className="w-full py-2 text-[13px] text-[#ff6b4d] font-medium border border-[#ff6b4d]/30 rounded-xl hover:bg-[#ff6b4d]/5 transition-colors">
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { profile, signOut, role } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBulkEnrollModal, setShowBulkEnrollModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showReviewContentModal, setShowReviewContentModal] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    targetAudience: [] as string[],
    scheduledDate: '',
    expiryDate: '',
    channels: [] as string[],
  });
  const [scheduleForm, setScheduleForm] = useState({
    course: '',
    sessionType: 'live' as 'live' | 'hybrid' | 'recorded',
    title: '',
    instructor: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'UTC',
    location: '',
    meetingLink: '',
    capacity: '',
    cohortName: '',
    description: '',
    materials: [] as string[],
  });
  const [bulkEnrollForm, setBulkEnrollForm] = useState({
    course: '',
    enrollmentMethod: 'manual' as 'manual' | 'csv' | 'email',
    emails: '',
    csvFile: null as File | null,
    emailDomains: '',
    sendWelcomeEmail: true,
    enrollmentType: 'standard' as 'standard' | 'trial' | 'sponsored',
    accessDuration: '90',
    notifyInstructors: true,
  });
  const [facultyForm, setFacultyForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    department: '',
    specialization: [] as string[],
    bio: '',
    qualifications: '',
    experience: '',
    linkedIn: '',
    website: '',
    profilePhoto: null as File | null,
    courses: [] as string[],
    availability: 'full-time' as 'full-time' | 'part-time' | 'contract',
    startDate: '',
  });
  const [createUserForm, setCreateUserForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner' as 'learner' | 'instructor' | 'admin',
    organization: '',
    department: '',
    phone: '',
    sendWelcomeEmail: true,
    requirePasswordChange: true,
    status: 'active' as 'active' | 'pending' | 'suspended',
  });
  const [reviewContentForm, setReviewContentForm] = useState({
    contentType: 'course' as 'course' | 'lesson' | 'assessment' | 'resource',
    contentId: '',
    reviewType: 'quality' as 'quality' | 'compliance' | 'accessibility' | 'plagiarism',
    reviewStatus: 'pending' as 'pending' | 'approved' | 'rejected' | 'needs-revision',
    reviewNotes: '',
    qualityScore: 0,
    complianceChecks: [] as string[],
    accessibilityIssues: [] as string[],
    recommendations: '',
    reviewerComments: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: analytics, isLoading: analyticsLoading } = useAdminAnalytics();
  const { data: pendingCourses, isLoading: pendingLoading } = usePendingCourses();
  const { data: users, isLoading: usersLoading } = useAdminUsers();
  const reviewCourse = useReviewCourse();
  const updateRole = useUpdateUserRole();

  const handleReviewCourse = async (courseId: string, action: 'approve' | 'reject') => {
    try {
      await reviewCourse.mutateAsync({ courseId, action });
      toast({
        title: action === 'approve' ? 'Course Published' : 'Course Rejected',
        description: action === 'approve' 
          ? 'The course is now live on the platform.' 
          : 'The course has been sent back to draft.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update course status.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateRole = async (userId: string, newRole: 'learner' | 'instructor' | 'admin') => {
    try {
      await updateRole.mutateAsync({ userId, role: newRole });
      toast({
        title: 'Role Updated',
        description: `User role has been changed to ${newRole}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user role.',
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { id: 'overview' as AdminTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'courses' as AdminTab, label: 'Course Management', icon: BookOpen },
    { id: 'pending' as AdminTab, label: 'Pending Approval', icon: Clock, badge: pendingCourses?.length },
    { id: 'assessments' as AdminTab, label: 'Assessments', icon: Award },
    { id: 'scheduling' as AdminTab, label: 'Training Delivery', icon: GraduationCap },
    { id: 'enrollment' as AdminTab, label: 'Enrollment', icon: Users },
    { id: 'faculty' as AdminTab, label: 'Faculty Operations', icon: Users },
    { id: 'users' as AdminTab, label: 'User Management', icon: Users },
    { id: 'invites' as AdminTab, label: 'Invites', icon: UserPlus },
    { id: 'communication' as AdminTab, label: 'Communication', icon: Settings },
    { id: 'governance' as AdminTab, label: 'Content Governance', icon: Settings },
    { id: 'finance' as AdminTab, label: 'Finance & Billing', icon: BarChart2 },
    { id: 'partner-reporting' as AdminTab, label: 'Partner & Reporting', icon: Globe },
    { id: 'accreditation' as AdminTab, label: 'Accreditation', icon: ShieldCheck },
    { id: 'analytics-performance' as AdminTab, label: 'Analytics & Performance', icon: TrendingUp },
    { id: 'operations-support' as AdminTab, label: 'Operations & Support', icon: Headphones },
    { id: 'records-certification' as AdminTab, label: 'Records & Certification', icon: FileTextIcon },
    { id: 'system' as AdminTab, label: 'System Settings', icon: Settings },
    // AI Features Section
    { id: 'ai-assistant' as AdminTab, label: 'AI Operations Assistant', icon: Bot, section: 'ai' },
    { id: 'ai-faculty' as AdminTab, label: 'AI Faculty Support', icon: Sparkles, section: 'ai' },
    { id: 'ai-content' as AdminTab, label: 'AI Content Authoring', icon: FileText, section: 'ai' },
    { id: 'ai-assessment' as AdminTab, label: 'AI Assessment Tools', icon: Brain, section: 'ai' },
    { id: 'ai-cohort' as AdminTab, label: 'AI Cohort Intelligence', icon: AlertTriangle, section: 'ai' },
    { id: 'ai-feedback' as AdminTab, label: 'AI Feedback Analysis', icon: MessageSquare, section: 'ai' },
    { id: 'ai-moderation' as AdminTab, label: 'AI Discussion Moderation', icon: Shield, section: 'ai' },
    { id: 'ai-support' as AdminTab, label: 'AI Support Triage', icon: Headphones, section: 'ai' },
    { id: 'ai-localization' as AdminTab, label: 'AI Localization', icon: Globe, section: 'ai' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1e2348] to-[#2a3058] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/dtma-logo.png"
                alt="DTMA"
                className="h-[40px] w-auto brightness-0 invert"
              />
            </Link>
          </div>

          <RoleSwitcher currentRole="admin" />

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.filter(item => !item.section).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-[16px] leading-[24px] font-normal ${
                  activeTab === item.id
                    ? 'bg-[#ff6b4d] text-white shadow-lg shadow-[#ff6b4d]/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="bg-[#ff6b4d] text-white">{item.badge}</Badge>
                )}
              </button>
            ))}
            
            {/* AI Features Section */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="px-4 py-2 text-[12px] leading-[16px] font-medium text-white/50 uppercase tracking-wide">
                AI Capabilities
              </div>
              {navItems.filter(item => item.section === 'ai').map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-[16px] leading-[24px] font-normal ${
                    activeTab === item.id
                      ? 'bg-[#ff6b4d] text-white shadow-lg shadow-[#ff6b4d]/20'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[#ff6b4d] flex items-center justify-center text-[14px] leading-[20px] font-medium">
                {profile?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] leading-[20px] font-medium truncate">{profile?.full_name || 'Admin'}</div>
                <div className="text-[12px] leading-[16px] font-normal text-white/60">Administrator</div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-background border-b border-border p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-accent rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold">Admin Dashboard</span>
          <div className="w-10" />
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <button className="absolute top-4 right-4 p-2 bg-background rounded-full" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <main className="p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">Platform Overview</h1>
              
              {analyticsLoading ? (
                <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">Loading analytics...</p>
              ) : (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#ff6b4d]" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.totalUsers || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Total Users</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-[#ff6b4d]" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.publishedCourses || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Published Courses</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-[#ff6b4d]" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.totalEnrollments || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Enrollments</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-[#ff6b4d]" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.certificatesIssued || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Certificates</div>
                    </div>
                  </div>

                  {/* Role Distribution */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <h3 className="text-[20px] leading-[28px] font-medium mb-4">Users by Role</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">Learners</span>
                          <span className="text-[16px] leading-[24px] font-medium">{analytics?.usersByRole.learner || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">Instructors</span>
                          <span className="text-[16px] leading-[24px] font-medium">{analytics?.usersByRole.instructor || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">Admins</span>
                          <span className="text-[16px] leading-[24px] font-medium">{analytics?.usersByRole.admin || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <h3 className="text-[20px] leading-[28px] font-medium mb-4">Quick Stats</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">Completion Rate</span>
                          <span className="text-[16px] leading-[24px] font-medium">{analytics?.completionRate || 0}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">Pending Reviews</span>
                          <span className="text-[16px] leading-[24px] font-medium text-amber-600">{analytics?.pendingReviews || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">Total Courses</span>
                          <span className="text-[16px] leading-[24px] font-medium">{analytics?.totalCourses || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-[28px] leading-[36px] font-semibold">User Management</h1>
                <Button 
                  onClick={() => setShowCreateUserModal(true)}
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </div>
              
              {usersLoading ? (
                <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">Loading users...</p>
              ) : (
                <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full" role="table" aria-label="User management table">
                      <thead className="bg-[#1e2348]">
                        <tr>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-white">User</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-white">Email</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-white">Role</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-white">Joined</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user.id} className="border-t border-border">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center text-[14px] leading-[20px] font-medium text-[#ff6b4d]" aria-hidden="true">
                                  {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-[16px] leading-[24px] font-normal">{user.full_name || 'No name'}</span>
                              </div>
                            </td>
                            <td className="p-4 text-[14px] leading-[20px] font-normal text-muted-foreground">{user.email}</td>
                            <td className="p-4">
                              <Select
                                value={user.role}
                                onValueChange={(value) => handleUpdateRole(user.id, value as 'learner' | 'instructor' | 'admin')}
                              >
                                <SelectTrigger className="w-32" aria-label={`Change role for ${user.full_name || user.email}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="learner">Learner</SelectItem>
                                  <SelectItem value="instructor">Instructor</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-4 text-[14px] leading-[20px] font-normal text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm" aria-label={`View details for ${user.full_name || user.email}`}>
                                <Eye className="w-4 h-4" aria-hidden="true" />
                                <span className="sr-only">View user details</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {(!users || users.length === 0) && (
                    <div className="p-8 text-center text-[14px] leading-[20px] font-normal text-muted-foreground">
                      No users found.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Pending Courses Tab */}
          {activeTab === 'pending' && (
            <PendingApprovalsTab />
          )}

          {/* Invites Tab */}
          {activeTab === 'invites' && (
            <InviteManagement />
          )}

          {/* All Courses Tab */}
          {activeTab === 'courses' && (
            <CourseManagementTab />
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <AssessmentsTab />
          )}

          {/* Training Delivery Tab */}
          {activeTab === 'scheduling' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Training Delivery & Scheduling</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Class Setup & Cohort Scheduling</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Schedule live classes, manage cohorts, and track attendance.
                  </p>
                  <Button 
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  >
                    Schedule Class
                  </Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Training Calendar</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    View and manage all scheduled training sessions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Enrollment Tab */}
          {activeTab === 'enrollment' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Student & Enrollment Management</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Enrollment Dashboard</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Manage student enrollments, approvals, and bulk operations.
                  </p>
                  <Button 
                    onClick={() => setShowBulkEnrollModal(true)}
                    className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  >
                    Bulk Enroll
                  </Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Seat Management</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Track available seats and manage course capacity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Faculty Tab */}
          {activeTab === 'faculty' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Faculty & Program Operations</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Faculty Dashboard</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Manage faculty members, assignments, and performance.
                  </p>
                  <Button 
                    onClick={() => setShowAddFacultyModal(true)}
                    className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  >
                    Add Faculty
                  </Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Program Builder</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Create and manage learning programs and curriculum.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === 'communication' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Communication & Support</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Announcement Manager</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Send announcements to learners, faculty, and organizations.
                  </p>
                  <Button 
                    onClick={() => setShowAnnouncementModal(true)}
                    className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  >
                    Create Announcement
                  </Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Support Console</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Manage support tickets and learner inquiries.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Governance Tab */}
          {activeTab === 'governance' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Content Governance & Compliance</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Content CMS & Moderation</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Review and moderate course content for quality and compliance.
                  </p>
                  <Button 
                    onClick={() => setShowReviewContentModal(true)}
                    className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  >
                    Review Content
                  </Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Accessibility Standards</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Ensure all content meets accessibility requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finance' && <FinanceBillingGovernancePanel />}

          {activeTab === 'partner-reporting' && <PartnerAccreditationReportingPanel />}

          {activeTab === 'accreditation' && <AccreditationPanel />}

          {activeTab === 'analytics-performance' && <AnalyticsPerformanceInsightsPanel />}

          {activeTab === 'operations-support' && <OperationsSupportPanel />}

          {activeTab === 'records-certification' && <RecordsCertificationGovernancePanel />}

          {/* System Settings Tab */}
          {activeTab === 'system' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">User, Roles & System Administration</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">System Settings</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Configure platform settings, policies, and feature flags.
                  </p>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Configure Settings</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Audit Logs</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    View system audit logs and compliance reports.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AI Operations Assistant Tab */}
          {activeTab === 'ai-assistant' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Operations Assistant</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Your AI Assistant</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80 mb-4">
                    A general-purpose assistant to support daily operational work.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Platform Activity Summary</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI-generated summaries of platform activity and key metrics.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Generate Summary</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Operational Reports</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create comprehensive reports with AI assistance.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create Report</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Next-Best Actions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests priority actions for admins and faculty.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Draft Responses</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Generate draft responses to learner queries.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Draft Response</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Faculty Support Tab */}
          {activeTab === 'ai-faculty' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Faculty Support Mode</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Transact AI - Faculty Mode</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Extended AI support for faculty to mentor and support learners effectively.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Learner Progress Summaries</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      View AI-generated summaries of individual learner progress.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">View Summaries</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Mentoring Suggestions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI-powered mentoring strategies for each learner.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Get Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Struggling Learner Guidance</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Receive guidance on how to support struggling learners.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Guidance</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Intervention Recommendations</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI recommends timely interventions and outreach actions.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Recommendations</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Content Authoring Tab */}
          {activeTab === 'ai-content' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Content Authoring & Drafting</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">AI-Powered Course Creation</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Accelerate course development with AI assistance while keeping humans in control.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Draft Lesson Outlines</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Generate structured lesson outlines based on learning objectives.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create Outline</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Generate Examples & Exercises</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create relevant examples and practice exercises automatically.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Generate Content</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Propose Learning Objectives</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests clear, measurable learning objectives.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Get Objectives</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Improvement Suggestions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI recommendations to enhance existing content.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Analyze Content</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Assessment Tools Tab */}
          {activeTab === 'ai-assessment' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Assessment Tools</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Intelligent Assessment Creation & Grading</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Streamline quiz creation and grading with AI assistance.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">AI Quiz Generator</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create quizzes from lesson content with varied difficulty levels.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Generate Quiz</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Question Variations</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests question variations and difficulty adjustments.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create Variations</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">AI Grading Helper</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Assist in grading open-ended responses with AI analysis.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Start Grading</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Rubric Matching</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI highlights key points and suggests provisional scores.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Analyze Responses</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Cohort Intelligence Tab */}
          {activeTab === 'ai-cohort' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Cohort Risk & Training Needs Intelligence</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Predictive Learner Analytics</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Identify at-risk learners and skill gaps across cohorts.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Cohort Risk Alerts</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Detect learners falling behind and disengagement patterns.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">View Alerts</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Early Intervention</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI recommends timely interventions for struggling learners.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Get Recommendations</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Training Needs Analysis</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Analyze performance data to identify common skill gaps.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Analyze Cohorts</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Course Planning Insights</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Feed insights into future course planning and development.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Insights</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Feedback Analysis Tab */}
          {activeTab === 'ai-feedback' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Feedback & Sentiment Analysis</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Qualitative Feedback at Scale</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Analyze course reviews, ratings, and feedback automatically.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Sentiment Trends</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Track sentiment trends across courses and time periods.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">View Trends</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Recurring Complaints</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Identify common issues and pain points from feedback.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Analyze Feedback</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Improvement Opportunities</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI highlights areas for course and platform improvement.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Get Recommendations</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Support Ticket Analysis</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Analyze support tickets for patterns and insights.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Analyze Tickets</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Discussion Moderation Tab */}
          {activeTab === 'ai-moderation' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Discussion Moderation</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Safe Learning Environments</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Maintain productive and respectful discussion forums with AI.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Detection</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Detect inappropriate or off-topic content automatically.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">View Flagged Content</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Moderator Review Queue</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Flag posts for human moderator review and action.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Review Queue</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Suggested Responses</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests automated or drafted moderator responses.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Moderation Analytics</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Track moderation metrics and community health.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Analytics</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Support Triage Tab */}
          {activeTab === 'ai-support' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Support Triage</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Optimized Support Operations</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Streamline support with intelligent request classification and routing.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Request Classification</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Automatically classify incoming support requests by type.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">View Requests</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Suggested Replies</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI generates draft responses for common support issues.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Generate Replies</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Smart Routing</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Route issues to the correct team or faculty member.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Configure Routing</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Priority Detection</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Identify and prioritize urgent learner problems.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">View Urgent Issues</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Localization Tab */}
          {activeTab === 'ai-localization' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI-Assisted Localization</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-8 h-8 text-[#ff6b4d]" />
                    <h3 className="text-[20px] leading-[28px] font-medium">Global Program Delivery</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Support multilingual delivery of DTMA programs worldwide.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Translation</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Translate course content while maintaining accuracy.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Translate Content</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Cultural Adaptation</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Suggest culturally appropriate phrasing and examples.
                    </p>
                    <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Get Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Multilingual Support</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Assist with multilingual support responses.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Translate Response</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Consistency Management</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Maintain consistency across localized versions.
                    </p>
                    <Button variant="outline" className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white">Check Consistency</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Announcement Creation Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Create Announcement</h2>
              </div>
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="Enter announcement title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={announcementForm.message}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                  placeholder="Enter your announcement message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Priority Level *
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {(['low', 'normal', 'high', 'urgent'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setAnnouncementForm({ ...announcementForm, priority })}
                      className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                        announcementForm.priority === priority
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'all-learners', label: 'All Learners', icon: Users },
                    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
                    { id: 'organizations', label: 'Organizations', icon: Building2 },
                    { id: 'specific-course', label: 'Specific Course', icon: BookOpen },
                  ].map((audience) => {
                    const Icon = audience.icon;
                    const isSelected = announcementForm.targetAudience.includes(audience.id);
                    return (
                      <button
                        key={audience.id}
                        onClick={() => {
                          const newAudience = isSelected
                            ? announcementForm.targetAudience.filter((a) => a !== audience.id)
                            : [...announcementForm.targetAudience, audience.id];
                          setAnnouncementForm({ ...announcementForm, targetAudience: newAudience });
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-[14px] font-medium transition-all ${
                          isSelected
                            ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {audience.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Channels */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Delivery Channels *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'in-app', label: 'In-App', icon: Bell },
                    { id: 'email', label: 'Email', icon: Send },
                    { id: 'sms', label: 'SMS', icon: MessageSquare },
                  ].map((channel) => {
                    const Icon = channel.icon;
                    const isSelected = announcementForm.channels.includes(channel.id);
                    return (
                      <button
                        key={channel.id}
                        onClick={() => {
                          const newChannels = isSelected
                            ? announcementForm.channels.filter((c) => c !== channel.id)
                            : [...announcementForm.channels, channel.id];
                          setAnnouncementForm({ ...announcementForm, channels: newChannels });
                        }}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-[14px] font-medium transition-all ${
                          isSelected
                            ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {channel.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scheduling */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Schedule Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={announcementForm.scheduledDate}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, scheduledDate: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Expiry Date (Optional)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={announcementForm.expiryDate}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, expiryDate: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Preview</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      announcementForm.priority === 'urgent' ? 'bg-red-500' :
                      announcementForm.priority === 'high' ? 'bg-orange-500' :
                      announcementForm.priority === 'normal' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className="text-[16px] font-semibold text-gray-900 mb-1">
                        {announcementForm.title || 'Announcement Title'}
                      </h4>
                      <p className="text-[14px] text-gray-600">
                        {announcementForm.message || 'Your announcement message will appear here...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowAnnouncementModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white"
                  onClick={() => {
                    toast({
                      title: 'Draft Saved',
                      description: 'Your announcement has been saved as a draft.',
                    });
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  onClick={() => {
                    toast({
                      title: 'Announcement Sent',
                      description: 'Your announcement has been sent successfully.',
                    });
                    setShowAnnouncementModal(false);
                    setAnnouncementForm({
                      title: '',
                      message: '',
                      priority: 'normal',
                      targetAudience: [],
                      scheduledDate: '',
                      expiryDate: '',
                      channels: [],
                    });
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Class Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Schedule Class</h2>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Course Selection */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Select Course *
                </label>
                <select
                  value={scheduleForm.course}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, course: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                >
                  <option value="">Choose a course...</option>
                  <option value="digital-transformation">Digital Transformation Fundamentals</option>
                  <option value="ai-automation">AI & Automation in the Workplace</option>
                  <option value="data-driven">Data-Driven Decision Making</option>
                  <option value="leadership">Leadership in the Digital Age</option>
                  <option value="agile">Agile Project Management</option>
                </select>
              </div>

              {/* Session Type */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Session Type *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['live', 'hybrid', 'recorded'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setScheduleForm({ ...scheduleForm, sessionType: type })}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                        scheduleForm.sessionType === type
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {type === 'live' && <Video className="w-4 h-4" />}
                      {type === 'hybrid' && <Users2 className="w-4 h-4" />}
                      {type === 'recorded' && <FileTextIcon className="w-4 h-4" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Title */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Session Title *
                </label>
                <input
                  type="text"
                  value={scheduleForm.title}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
                  placeholder="e.g., Week 1: Introduction to Digital Transformation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <select
                  value={scheduleForm.instructor}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, instructor: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                >
                  <option value="">Select instructor...</option>
                  <option value="dr-aisha">Dr. Aisha Mensah</option>
                  <option value="james">James Okafor</option>
                  <option value="priya">Priya Nair</option>
                  <option value="marcus">Marcus Webb</option>
                  <option value="sofia">Sofia Reyes</option>
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={scheduleForm.date}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={scheduleForm.startTime}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={scheduleForm.endTime}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, endTime: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Timezone *
                </label>
                <select
                  value={scheduleForm.timezone}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="CET">CET (Central European Time)</option>
                  <option value="IST">IST (Indian Standard Time)</option>
                  <option value="JST">JST (Japan Standard Time)</option>
                </select>
              </div>

              {/* Location & Meeting Link */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Location {scheduleForm.sessionType !== 'live' && '(Optional)'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={scheduleForm.location}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                      placeholder="e.g., Room 301, Building A"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Meeting Link {scheduleForm.sessionType === 'recorded' && '(Optional)'}
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={scheduleForm.meetingLink}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })}
                      placeholder="https://zoom.us/j/..."
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity & Cohort */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Class Capacity *
                  </label>
                  <input
                    type="number"
                    value={scheduleForm.capacity}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, capacity: e.target.value })}
                    placeholder="e.g., 30"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Cohort Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={scheduleForm.cohortName}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, cohortName: e.target.value })}
                    placeholder="e.g., Spring 2026 Cohort"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Session Description (Optional)
                </label>
                <textarea
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                  placeholder="Provide additional details about this session..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Session Preview</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#ff6b4d]" />
                    <span className="text-[16px] font-semibold text-gray-900">
                      {scheduleForm.title || 'Session Title'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[14px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {scheduleForm.date || 'Date'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {scheduleForm.startTime || 'Start'} - {scheduleForm.endTime || 'End'}
                    </span>
                    <span className="capitalize px-2 py-1 rounded bg-[#ff6b4d]/10 text-[#ff6b4d] text-[12px] font-medium">
                      {scheduleForm.sessionType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowScheduleModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white"
                  onClick={() => {
                    toast({
                      title: 'Draft Saved',
                      description: 'Your class schedule has been saved as a draft.',
                    });
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  onClick={() => {
                    toast({
                      title: 'Class Scheduled',
                      description: 'Your class has been scheduled successfully.',
                    });
                    setShowScheduleModal(false);
                    setScheduleForm({
                      course: '',
                      sessionType: 'live',
                      title: '',
                      instructor: '',
                      date: '',
                      startTime: '',
                      endTime: '',
                      timezone: 'UTC',
                      location: '',
                      meetingLink: '',
                      capacity: '',
                      cohortName: '',
                      description: '',
                      materials: [],
                    });
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Class
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Enrollment Modal */}
      {showBulkEnrollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center">
                  <UserPlusIcon className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Bulk Enrollment</h2>
              </div>
              <button
                onClick={() => setShowBulkEnrollModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Course Selection */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Select Course *
                </label>
                <select
                  value={bulkEnrollForm.course}
                  onChange={(e) => setBulkEnrollForm({ ...bulkEnrollForm, course: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                >
                  <option value="">Choose a course...</option>
                  <option value="digital-transformation">Digital Transformation Fundamentals</option>
                  <option value="ai-automation">AI & Automation in the Workplace</option>
                  <option value="data-driven">Data-Driven Decision Making</option>
                  <option value="leadership">Leadership in the Digital Age</option>
                  <option value="agile">Agile Project Management</option>
                  <option value="cybersecurity">Cybersecurity Essentials</option>
                </select>
              </div>

              {/* Enrollment Method */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Enrollment Method *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['manual', 'csv', 'email'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setBulkEnrollForm({ ...bulkEnrollForm, enrollmentMethod: method })}
                      className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border-2 text-[14px] font-medium transition-all ${
                        bulkEnrollForm.enrollmentMethod === method
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {method === 'manual' && <UserPlusIcon className="w-5 h-5" />}
                      {method === 'csv' && <Upload className="w-5 h-5" />}
                      {method === 'email' && <Mail className="w-5 h-5" />}
                      <span className="capitalize">{method === 'csv' ? 'CSV Upload' : method === 'email' ? 'Email Domain' : 'Manual Entry'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Entry */}
              {bulkEnrollForm.enrollmentMethod === 'manual' && (
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Email Addresses *
                  </label>
                  <textarea
                    value={bulkEnrollForm.emails}
                    onChange={(e) => setBulkEnrollForm({ ...bulkEnrollForm, emails: e.target.value })}
                    placeholder="Enter email addresses (one per line)&#10;example1@company.com&#10;example2@company.com&#10;example3@company.com"
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none font-mono text-[14px]"
                  />
                  <p className="text-[12px] text-gray-500 mt-2">
                    {bulkEnrollForm.emails.split('\n').filter(e => e.trim()).length} email(s) entered
                  </p>
                </div>
              )}

              {/* CSV Upload */}
              {bulkEnrollForm.enrollmentMethod === 'csv' && (
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Upload CSV File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#ff6b4d] transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-[14px] text-gray-600 mb-2">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setBulkEnrollForm({ ...bulkEnrollForm, csvFile: e.target.files?.[0] || null })}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label
                      htmlFor="csv-upload"
                      className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Choose File
                    </label>
                    {bulkEnrollForm.csvFile && (
                      <p className="text-[14px] text-[#ff6b4d] mt-3 font-medium">
                        Selected: {bulkEnrollForm.csvFile.name}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-[12px] text-blue-900 font-medium mb-2">CSV Format Requirements:</p>
                    <ul className="text-[12px] text-blue-800 space-y-1 ml-4 list-disc">
                      <li>First column: Email address (required)</li>
                      <li>Second column: Full name (optional)</li>
                      <li>Third column: Organization (optional)</li>
                    </ul>
                    <button className="mt-3 text-[12px] text-[#ff6b4d] font-medium hover:underline flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download sample CSV template
                    </button>
                  </div>
                </div>
              )}

              {/* Email Domain */}
              {bulkEnrollForm.enrollmentMethod === 'email' && (
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Email Domains *
                  </label>
                  <textarea
                    value={bulkEnrollForm.emailDomains}
                    onChange={(e) => setBulkEnrollForm({ ...bulkEnrollForm, emailDomains: e.target.value })}
                    placeholder="Enter email domains (one per line)&#10;@company.com&#10;@organization.org&#10;@university.edu"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none font-mono text-[14px]"
                  />
                  <p className="text-[12px] text-gray-500 mt-2">
                    Anyone with these email domains can self-enroll in the course
                  </p>
                </div>
              )}

              {/* Enrollment Type */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Enrollment Type *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['standard', 'trial', 'sponsored'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setBulkEnrollForm({ ...bulkEnrollForm, enrollmentType: type })}
                      className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                        bulkEnrollForm.enrollmentType === type
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Access Duration */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Access Duration (Days) *
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['30', '60', '90', '365'].map((days) => (
                    <button
                      key={days}
                      onClick={() => setBulkEnrollForm({ ...bulkEnrollForm, accessDuration: days })}
                      className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium transition-all ${
                        bulkEnrollForm.accessDuration === days
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {days === '365' ? '1 Year' : `${days} Days`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bulkEnrollForm.sendWelcomeEmail}
                    onChange={(e) => setBulkEnrollForm({ ...bulkEnrollForm, sendWelcomeEmail: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                  />
                  <div>
                    <span className="text-[14px] font-medium text-gray-700">Send welcome email to learners</span>
                    <p className="text-[12px] text-gray-500">Learners will receive course access details via email</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bulkEnrollForm.notifyInstructors}
                    onChange={(e) => setBulkEnrollForm({ ...bulkEnrollForm, notifyInstructors: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                  />
                  <div>
                    <span className="text-[14px] font-medium text-gray-700">Notify course instructors</span>
                    <p className="text-[12px] text-gray-500">Instructors will be notified of new enrollments</p>
                  </div>
                </label>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Enrollment Summary</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium text-gray-900">
                      {bulkEnrollForm.course ? bulkEnrollForm.course.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {bulkEnrollForm.enrollmentMethod === 'csv' ? 'CSV Upload' : bulkEnrollForm.enrollmentMethod === 'email' ? 'Email Domain' : 'Manual Entry'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-600">Learners:</span>
                    <span className="font-medium text-gray-900">
                      {bulkEnrollForm.enrollmentMethod === 'manual' 
                        ? bulkEnrollForm.emails.split('\n').filter(e => e.trim()).length 
                        : bulkEnrollForm.enrollmentMethod === 'csv' 
                        ? (bulkEnrollForm.csvFile ? '1 file selected' : '0')
                        : bulkEnrollForm.emailDomains.split('\n').filter(d => d.trim()).length + ' domain(s)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-600">Access Duration:</span>
                    <span className="font-medium text-gray-900">
                      {bulkEnrollForm.accessDuration === '365' ? '1 Year' : `${bulkEnrollForm.accessDuration} Days`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowBulkEnrollModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white"
                  onClick={() => {
                    toast({
                      title: 'Preview Generated',
                      description: 'Review the enrollment details before confirming.',
                    });
                  }}
                >
                  Preview
                </Button>
                <Button
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  onClick={() => {
                    const count = bulkEnrollForm.enrollmentMethod === 'manual' 
                      ? bulkEnrollForm.emails.split('\n').filter(e => e.trim()).length 
                      : 0;
                    toast({
                      title: 'Enrollment Complete',
                      description: `Successfully enrolled ${count > 0 ? count : 'learners'} in the course.`,
                    });
                    setShowBulkEnrollModal(false);
                    setBulkEnrollForm({
                      course: '',
                      enrollmentMethod: 'manual',
                      emails: '',
                      csvFile: null,
                      emailDomains: '',
                      sendWelcomeEmail: true,
                      enrollmentType: 'standard',
                      accessDuration: '90',
                      notifyInstructors: true,
                    });
                  }}
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Enroll Learners
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Faculty Modal */}
      {showAddFacultyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Add Faculty Member</h2>
              </div>
              <button
                onClick={() => setShowAddFacultyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={facultyForm.fullName}
                      onChange={(e) => setFacultyForm({ ...facultyForm, fullName: e.target.value })}
                      placeholder="e.g., Dr. Sarah Johnson"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={facultyForm.email}
                        onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                        placeholder="sarah.johnson@university.edu"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={facultyForm.phone}
                        onChange={(e) => setFacultyForm({ ...facultyForm, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={facultyForm.title}
                      onChange={(e) => setFacultyForm({ ...facultyForm, title: e.target.value })}
                      placeholder="e.g., Senior Lecturer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Professional Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      value={facultyForm.department}
                      onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    >
                      <option value="">Select department...</option>
                      <option value="digital-transformation">Digital Transformation</option>
                      <option value="ai-technology">AI & Technology</option>
                      <option value="leadership">Leadership & Management</option>
                      <option value="data-analytics">Data & Analytics</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="business-strategy">Business Strategy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Areas of Specialization *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Digital Strategy', 'AI/ML', 'Cloud Computing', 'Agile', 'Change Management', 'Data Science', 'Leadership', 'Innovation', 'Cybersecurity'].map((spec) => (
                        <label key={spec} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={facultyForm.specialization.includes(spec)}
                            onChange={(e) => {
                              const newSpec = e.target.checked
                                ? [...facultyForm.specialization, spec]
                                : facultyForm.specialization.filter(s => s !== spec);
                              setFacultyForm({ ...facultyForm, specialization: newSpec });
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                          />
                          <span className="text-[14px] text-gray-700">{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Bio / About
                    </label>
                    <textarea
                      value={facultyForm.bio}
                      onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                      placeholder="Brief professional biography..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                        Qualifications
                      </label>
                      <textarea
                        value={facultyForm.qualifications}
                        onChange={(e) => setFacultyForm({ ...facultyForm, qualifications: e.target.value })}
                        placeholder="e.g., PhD in Computer Science, MBA"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        value={facultyForm.experience}
                        onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                        placeholder="e.g., 15+ years"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Presence */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Online Presence</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={facultyForm.linkedIn}
                        onChange={(e) => setFacultyForm({ ...facultyForm, linkedIn: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Personal Website
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={facultyForm.website}
                        onChange={(e) => setFacultyForm({ ...facultyForm, website: e.target.value })}
                        placeholder="https://..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Profile Photo</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#ff6b4d] transition-colors">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-[14px] text-gray-600 mb-2">
                    Upload faculty profile photo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFacultyForm({ ...facultyForm, profilePhoto: e.target.files?.[0] || null })}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Choose Photo
                  </label>
                  {facultyForm.profilePhoto && (
                    <p className="text-[14px] text-[#ff6b4d] mt-3 font-medium">
                      Selected: {facultyForm.profilePhoto.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Course Assignment */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Course Assignment</h3>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Assign to Courses
                  </label>
                  <div className="space-y-2">
                    {['Digital Transformation Fundamentals', 'AI & Automation in the Workplace', 'Leadership in the Digital Age', 'Agile Project Management', 'Cybersecurity Essentials'].map((course) => (
                      <label key={course} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={facultyForm.courses.includes(course)}
                          onChange={(e) => {
                            const newCourses = e.target.checked
                              ? [...facultyForm.courses, course]
                              : facultyForm.courses.filter(c => c !== course);
                            setFacultyForm({ ...facultyForm, courses: newCourses });
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                        />
                        <span className="text-[14px] text-gray-700">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Employment Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Availability *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['full-time', 'part-time', 'contract'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFacultyForm({ ...facultyForm, availability: type })}
                          className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                            facultyForm.availability === type
                              ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {type.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={facultyForm.startDate}
                        onChange={(e) => setFacultyForm({ ...facultyForm, startDate: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Faculty Summary</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#ff6b4d]" />
                    <span className="text-[16px] font-semibold text-gray-900">
                      {facultyForm.fullName || 'Faculty Name'}
                    </span>
                  </div>
                  <div className="text-[14px] text-gray-600 space-y-1">
                    <p>{facultyForm.title || 'Job Title'} • {facultyForm.department ? facultyForm.department.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Department'}</p>
                    <p>{facultyForm.specialization.length} specialization(s) • {facultyForm.courses.length} course(s) assigned</p>
                    <p className="capitalize">{facultyForm.availability.replace('-', ' ')} • Starts {facultyForm.startDate || 'TBD'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowAddFacultyModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white"
                  onClick={() => {
                    toast({
                      title: 'Draft Saved',
                      description: 'Faculty profile has been saved as a draft.',
                    });
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  onClick={() => {
                    toast({
                      title: 'Faculty Added',
                      description: `${facultyForm.fullName || 'Faculty member'} has been added successfully.`,
                    });
                    setShowAddFacultyModal(false);
                    setFacultyForm({
                      fullName: '',
                      email: '',
                      phone: '',
                      title: '',
                      department: '',
                      specialization: [],
                      bio: '',
                      qualifications: '',
                      experience: '',
                      linkedIn: '',
                      website: '',
                      profilePhoto: null,
                      courses: [],
                      availability: 'full-time',
                      startDate: '',
                    });
                  }}
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Add Faculty
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center">
                  <UserPlusIcon className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Create New User</h2>
              </div>
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={createUserForm.fullName}
                      onChange={(e) => setCreateUserForm({ ...createUserForm, fullName: e.target.value })}
                      placeholder="e.g., John Smith"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={createUserForm.email}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, email: e.target.value })}
                        placeholder="john.smith@company.com"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={createUserForm.phone}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Credentials */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Account Credentials</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={createUserForm.password}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1">Minimum 8 characters</p>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={createUserForm.confirmPassword}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role & Permissions */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Role & Permissions</h3>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    User Role *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['learner', 'instructor', 'admin'] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => setCreateUserForm({ ...createUserForm, role })}
                        className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border-2 text-[14px] font-medium transition-all ${
                          createUserForm.role === role
                            ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {role === 'learner' && <Users className="w-5 h-5" />}
                        {role === 'instructor' && <GraduationCap className="w-5 h-5" />}
                        {role === 'admin' && <ShieldIcon className="w-5 h-5" />}
                        <span className="capitalize">{role}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-[12px] text-blue-900">
                      {createUserForm.role === 'learner' && 'Learners can enroll in courses, access content, and track their progress.'}
                      {createUserForm.role === 'instructor' && 'Instructors can create courses, manage content, and interact with learners.'}
                      {createUserForm.role === 'admin' && 'Admins have full access to all platform features and settings.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Organization Details */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Organization Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={createUserForm.organization}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, organization: e.target.value })}
                        placeholder="e.g., Acme Corporation"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={createUserForm.department}
                      onChange={(e) => setCreateUserForm({ ...createUserForm, department: e.target.value })}
                      placeholder="e.g., IT Department"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Account Status</h3>
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Initial Status *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['active', 'pending', 'suspended'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setCreateUserForm({ ...createUserForm, status })}
                        className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                          createUserForm.status === status
                            ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createUserForm.sendWelcomeEmail}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, sendWelcomeEmail: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                  />
                  <div>
                    <span className="text-[14px] font-medium text-gray-700">Send welcome email</span>
                    <p className="text-[12px] text-gray-500">User will receive login credentials and getting started guide</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createUserForm.requirePasswordChange}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, requirePasswordChange: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                  />
                  <div>
                    <span className="text-[14px] font-medium text-gray-700">Require password change on first login</span>
                    <p className="text-[12px] text-gray-500">User must set a new password when they first sign in</p>
                  </div>
                </label>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">User Summary</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <UserPlusIcon className="w-4 h-4 text-[#ff6b4d]" />
                    <span className="text-[16px] font-semibold text-gray-900">
                      {createUserForm.fullName || 'User Name'}
                    </span>
                  </div>
                  <div className="text-[14px] text-gray-600 space-y-1">
                    <p>{createUserForm.email || 'email@example.com'}</p>
                    <p className="capitalize">Role: {createUserForm.role} • Status: {createUserForm.status}</p>
                    {createUserForm.organization && <p>Organization: {createUserForm.organization}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowCreateUserModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white"
                  onClick={() => {
                    toast({
                      title: 'Draft Saved',
                      description: 'User profile has been saved as a draft.',
                    });
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  onClick={() => {
                    if (createUserForm.password !== createUserForm.confirmPassword) {
                      toast({
                        title: 'Error',
                        description: 'Passwords do not match.',
                        variant: 'destructive',
                      });
                      return;
                    }
                    toast({
                      title: 'User Created',
                      description: `${createUserForm.fullName || 'User'} has been created successfully.`,
                    });
                    setShowCreateUserModal(false);
                    setCreateUserForm({
                      fullName: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                      role: 'learner',
                      organization: '',
                      department: '',
                      phone: '',
                      sendWelcomeEmail: true,
                      requirePasswordChange: true,
                      status: 'active',
                    });
                  }}
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Content Modal */}
      {showReviewContentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center">
                  <FileTextIcon className="w-5 h-5 text-[#ff6b4d]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Content Review</h2>
              </div>
              <button
                onClick={() => setShowReviewContentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Content Selection */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Content Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Content Type *
                    </label>
                    <select
                      value={reviewContentForm.contentType}
                      onChange={(e) =>
                        setReviewContentForm({
                          ...reviewContentForm,
                          contentType: e.target.value as 'course' | 'lesson' | 'assessment' | 'resource',
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    >
                      <option value="course">Course</option>
                      <option value="lesson">Lesson</option>
                      <option value="assessment">Assessment</option>
                      <option value="resource">Resource</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                      Select Content *
                    </label>
                    <select
                      value={reviewContentForm.contentId}
                      onChange={(e) => setReviewContentForm({ ...reviewContentForm, contentId: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px]"
                    >
                      <option value="">Choose content...</option>
                      <option value="dt-fundamentals">Digital Transformation Fundamentals</option>
                      <option value="ai-automation">AI & Automation in the Workplace</option>
                      <option value="data-driven">Data-Driven Decision Making</option>
                      <option value="leadership">Leadership in the Digital Age</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Review Type */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Review Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['quality', 'compliance', 'accessibility', 'plagiarism'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setReviewContentForm({ ...reviewContentForm, reviewType: type })}
                      className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border-2 text-[14px] font-medium transition-all ${
                        reviewContentForm.reviewType === type
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {type === 'quality' && <Star className="w-5 h-5" />}
                      {type === 'compliance' && <ShieldIcon className="w-5 h-5" />}
                      {type === 'accessibility' && <Eye className="w-5 h-5" />}
                      {type === 'plagiarism' && <Search className="w-5 h-5" />}
                      <span className="capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Score */}
              {reviewContentForm.reviewType === 'quality' && (
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Quality Score (0-100)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={reviewContentForm.qualityScore}
                      onChange={(e) => setReviewContentForm({ ...reviewContentForm, qualityScore: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ff6b4d 0%, #ff6b4d ${reviewContentForm.qualityScore}%, #e5e7eb ${reviewContentForm.qualityScore}%, #e5e7eb 100%)`
                      }}
                    />
                    <span className="text-[24px] font-semibold text-[#ff6b4d] w-16 text-right">
                      {reviewContentForm.qualityScore}
                    </span>
                  </div>
                  <div className="flex justify-between text-[12px] text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              )}

              {/* Compliance Checks */}
              {reviewContentForm.reviewType === 'compliance' && (
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Compliance Checks
                  </label>
                  <div className="space-y-2">
                    {['Copyright clearance', 'Data privacy compliance', 'Industry regulations', 'Ethical guidelines', 'Content accuracy'].map((check) => (
                      <label key={check} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reviewContentForm.complianceChecks.includes(check)}
                          onChange={(e) => {
                            const newChecks = e.target.checked
                              ? [...reviewContentForm.complianceChecks, check]
                              : reviewContentForm.complianceChecks.filter(c => c !== check);
                            setReviewContentForm({ ...reviewContentForm, complianceChecks: newChecks });
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                        />
                        <span className="text-[14px] text-gray-700">{check}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility Issues */}
              {reviewContentForm.reviewType === 'accessibility' && (
                <div>
                  <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                    Accessibility Issues Found
                  </label>
                  <div className="space-y-2">
                    {['Missing alt text', 'Poor color contrast', 'No keyboard navigation', 'Missing captions', 'Unclear headings'].map((issue) => (
                      <label key={issue} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reviewContentForm.accessibilityIssues.includes(issue)}
                          onChange={(e) => {
                            const newIssues = e.target.checked
                              ? [...reviewContentForm.accessibilityIssues, issue]
                              : reviewContentForm.accessibilityIssues.filter(i => i !== issue);
                            setReviewContentForm({ ...reviewContentForm, accessibilityIssues: newIssues });
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#ff6b4d] focus:ring-[#ff6b4d]"
                        />
                        <span className="text-[14px] text-gray-700">{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Status */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Review Decision</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['pending', 'approved', 'rejected', 'needs-revision'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setReviewContentForm({ ...reviewContentForm, reviewStatus: status })}
                      className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border-2 text-[14px] font-medium transition-all ${
                        reviewContentForm.reviewStatus === status
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {status === 'pending' && <Clock className="w-5 h-5" />}
                      {status === 'approved' && <CheckCircle2 className="w-5 h-5" />}
                      {status === 'rejected' && <XCircleIcon className="w-5 h-5" />}
                      {status === 'needs-revision' && <AlertCircle className="w-5 h-5" />}
                      <span className="capitalize">{status.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Review Priority
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {(['low', 'normal', 'high', 'urgent'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setReviewContentForm({ ...reviewContentForm, priority })}
                      className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                        reviewContentForm.priority === priority
                          ? 'border-[#ff6b4d] bg-[#ff6b4d]/10 text-[#ff6b4d]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Notes */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Review Notes
                </label>
                <textarea
                  value={reviewContentForm.reviewNotes}
                  onChange={(e) => setReviewContentForm({ ...reviewContentForm, reviewNotes: e.target.value })}
                  placeholder="Document your review findings..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Recommendations */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Recommendations for Improvement
                </label>
                <textarea
                  value={reviewContentForm.recommendations}
                  onChange={(e) => setReviewContentForm({ ...reviewContentForm, recommendations: e.target.value })}
                  placeholder="Provide specific recommendations..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Reviewer Comments */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Comments to Content Creator
                </label>
                <textarea
                  value={reviewContentForm.reviewerComments}
                  onChange={(e) => setReviewContentForm({ ...reviewContentForm, reviewerComments: e.target.value })}
                  placeholder="Add comments for the content creator..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Review Summary</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4 text-[#ff6b4d]" />
                    <span className="text-[16px] font-semibold text-gray-900 capitalize">
                      {reviewContentForm.contentType} Review
                    </span>
                  </div>
                  <div className="text-[14px] text-gray-600 space-y-1">
                    <p>Type: {reviewContentForm.reviewType.charAt(0).toUpperCase() + reviewContentForm.reviewType.slice(1)}</p>
                    <p>Status: <span className="capitalize">{reviewContentForm.reviewStatus.replace('-', ' ')}</span></p>
                    <p>Priority: <span className="capitalize">{reviewContentForm.priority}</span></p>
                    {reviewContentForm.reviewType === 'quality' && <p>Quality Score: {reviewContentForm.qualityScore}/100</p>}
                    {reviewContentForm.reviewType === 'compliance' && <p>Compliance Checks: {reviewContentForm.complianceChecks.length} passed</p>}
                    {reviewContentForm.reviewType === 'accessibility' && <p>Issues Found: {reviewContentForm.accessibilityIssues.length}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowReviewContentModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348] hover:text-white"
                  onClick={() => {
                    toast({
                      title: 'Draft Saved',
                      description: 'Review has been saved as a draft.',
                    });
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                  onClick={() => {
                    toast({
                      title: 'Review Submitted',
                      description: `Content review has been submitted with status: ${reviewContentForm.reviewStatus}.`,
                    });
                    setShowReviewContentModal(false);
                    setReviewContentForm({
                      contentType: 'course',
                      contentId: '',
                      reviewType: 'quality',
                      reviewStatus: 'pending',
                      reviewNotes: '',
                      qualityScore: 0,
                      complianceChecks: [],
                      accessibilityIssues: [],
                      recommendations: '',
                      reviewerComments: '',
                      priority: 'normal',
                    });
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
