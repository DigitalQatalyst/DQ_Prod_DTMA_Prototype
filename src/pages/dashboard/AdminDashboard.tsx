import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminAnalytics, usePendingCourses, useAdminUsers, useReviewCourse, useUpdateUserRole } from '@/hooks/useAdmin';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';
import { InviteManagement } from '@/components/admin/InviteManagement';
import { WhatsAppAnalyticsDashboard } from '@/components/admin/WhatsAppAnalyticsDashboard';
import { AIUsageMonitoringDashboard } from '@/components/admin/AIUsageMonitoringDashboard';
import { CommunicationSupportTab } from '@/components/admin/CommunicationSupportTab';
import { CoursePreviewModal } from '@/components/admin/CoursePreviewModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  MoreVertical,
  Copy,
  Archive,
  Trash2,
  Plus,
  DollarSign,
  Share2,
  Activity,
} from 'lucide-react';

type AdminTab = 'overview' | 'users' | 'courses' | 'pending' | 'invites' | 'assessments' | 'scheduling' | 'enrollment' | 'faculty' | 'resources' | 'system' | 'communication' | 'governance' | 'organizations' | 'certification' | 'commerce' | 'whatsapp-analytics' | 'ai-usage' | 'ai-assistant' | 'ai-faculty' | 'ai-content' | 'ai-assessment' | 'ai-cohort' | 'ai-feedback' | 'ai-moderation' | 'ai-support' | 'ai-localization';

// ─── Mock data ───────────────────────────────────────────────────────────────
const MOCK_COURSES = [
  { id: '1', title: 'Mastering Economy 4.0', instructor: 'DTMA Faculty', category: 'Digital Economy', level: 'Beginner', status: 'published', enrollments: 342, lastUpdated: '2026-03-20', rating: 4.8, completion: 72, revenue: 8550 },
  { id: '2', title: 'Decoding Digital Cognitive Organisations', instructor: 'DTMA Faculty', category: 'Digital Cognitive Organisation', level: 'Intermediate', status: 'published', enrollments: 219, lastUpdated: '2026-03-18', rating: 4.9, completion: 65, revenue: 5475 },
  { id: '3', title: 'Building Powerful Digital Business Platforms', instructor: 'DTMA Faculty', category: 'Digital Business Platform', level: 'Intermediate', status: 'draft', enrollments: 0, lastUpdated: '2026-03-25', rating: 0, completion: 0, revenue: 0 },
  { id: '4', title: 'Navigating Digital Transformation 2.0', instructor: 'DTMA Faculty', category: 'Digital Transformation', level: 'Advanced', status: 'pending', enrollments: 0, lastUpdated: '2026-03-22', rating: 0, completion: 0, revenue: 0 },
  { id: '5', title: 'Optimizing Digital Workers and Workspaces', instructor: 'DTMA Faculty', category: 'Digital Worker & Workspace', level: 'Beginner', status: 'published', enrollments: 187, lastUpdated: '2026-03-15', rating: 4.6, completion: 58, revenue: 4675 },
  { id: '6', title: 'Leveraging Digital Accelerators for Growth', instructor: 'DTMA Faculty', category: 'Digital Accelerators', level: 'Advanced', status: 'published', enrollments: 154, lastUpdated: '2026-03-10', rating: 4.9, completion: 81, revenue: 3850 },
];

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]',
  draft:     'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]',
  pending:   'bg-[var(--dq-navy-100)] text-[var(--dq-navy-700)]',
};

const CATEGORIES = ['All Categories', 'Digital Economy', 'Digital Cognitive Organisation', 'Digital Business Platform', 'Digital Transformation', 'Digital Worker & Workspace', 'Digital Accelerators'];

// ─── Mock users data ──────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id: '1', full_name: 'Sarah Johnson', email: 'sarah.johnson@dtma.ae', role: 'admin', created_at: '2026-01-15', status: 'active', lastLogin: '2026-04-14' },
  { id: '2', full_name: 'Ahmed Al-Mansoori', email: 'ahmed.mansoori@dtma.ae', role: 'instructor', created_at: '2026-02-10', status: 'active', lastLogin: '2026-04-13' },
  { id: '3', full_name: 'Maria Garcia', email: 'maria.garcia@example.com', role: 'learner', created_at: '2026-03-05', status: 'active', lastLogin: '2026-04-15' },
  { id: '4', full_name: 'John Smith', email: 'john.smith@example.com', role: 'learner', created_at: '2026-03-12', status: 'active', lastLogin: '2026-04-14' },
  { id: '5', full_name: 'Fatima Hassan', email: 'fatima.hassan@dtma.ae', role: 'instructor', created_at: '2026-02-20', status: 'active', lastLogin: '2026-04-12' },
  { id: '6', full_name: 'David Chen', email: 'david.chen@example.com', role: 'learner', created_at: '2026-03-18', status: 'active', lastLogin: '2026-04-15' },
  { id: '7', full_name: 'Aisha Mohammed', email: 'aisha.mohammed@example.com', role: 'learner', created_at: '2026-03-22', status: 'inactive', lastLogin: '2026-03-25' },
  { id: '8', full_name: 'Robert Taylor', email: 'robert.taylor@dtma.ae', role: 'admin', created_at: '2026-01-20', status: 'active', lastLogin: '2026-04-14' },
  { id: '9', full_name: 'Layla Ibrahim', email: 'layla.ibrahim@example.com', role: 'learner', created_at: '2026-03-28', status: 'active', lastLogin: '2026-04-13' },
  { id: '10', full_name: 'Michael Brown', email: 'michael.brown@example.com', role: 'learner', created_at: '2026-04-02', status: 'active', lastLogin: '2026-04-15' },
];

const ROLE_STYLES: Record<string, string> = {
  admin: 'bg-[var(--dq-navy-100)] text-[var(--dq-navy-700)]',
  instructor: 'bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)]',
  learner: 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]',
};

const STATUS_BADGE_STYLES: Record<string, string> = {
  active: 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]',
  inactive: 'bg-gray-100 text-gray-700',
};

// ─── CourseManagementTab ──────────────────────────────────────────────────────
const CourseManagementTab = ({ onNavigateToPending }: { onNavigateToPending: () => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [previewCourse, setPreviewCourse] = useState<typeof MOCK_COURSES[0] | null>(null);

  // Handler for editing a course
  const handleEditCourse = (courseId: string) => {
    navigate(`/course-builder/${courseId}`);
  };

  // Handler for previewing a course
  const handlePreviewCourse = (courseId: string) => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (course) {
      setPreviewCourse(course);
    }
  };

  // Handler for duplicating a course
  const handleDuplicateCourse = (courseId: string, courseTitle: string) => {
    toast({
      title: "Course Duplicated",
      description: `"${courseTitle}" has been duplicated successfully.`,
    });
    // TODO: Implement actual duplication logic
  };

  // Handler for archiving a course
  const handleArchiveCourse = (courseId: string, courseTitle: string) => {
    toast({
      title: "Course Archived",
      description: `"${courseTitle}" has been archived.`,
    });
    // TODO: Implement actual archive logic
  };

  // Handler for deleting a course
  const handleDeleteCourse = (courseId: string, courseTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${courseTitle}"? This action cannot be undone.`)) {
      toast({
        title: "Course Deleted",
        description: `"${courseTitle}" has been permanently deleted.`,
        variant: "destructive",
      });
      // TODO: Implement actual delete logic
    }
  };

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
      <h1 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]">Course &amp; Content Management</h1>

      {/* ── Section 1: Authoring & Publishing ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Course Authoring &amp; Publishing</h2>
          <Button 
            onClick={onNavigateToPending}
            className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white gap-2"
          >
            <Clock className="w-4 h-4" />
            View Pending Reviews
          </Button>
        </div>

        {/* Summary stat pills */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: 'Total Courses', value: MOCK_COURSES.length, color: 'bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)]' },
            { label: 'Published',     value: published,            color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
            { label: 'Draft',         value: drafts,               color: 'bg-amber-50 text-amber-700 border border-amber-200' },
            { label: 'Pending Review',value: pending,              color: 'bg-purple-50 text-purple-700 border border-purple-200' },
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
            <input
              type="text"
              placeholder="Search courses or instructors…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
            >
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Courses table */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--dq-surface-border-default)] overflow-hidden">
          <div className="w-full">
            <table className="w-full table-fixed">
              <thead className="bg-[var(--dq-navy-950)]">
                <tr>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[20%]">Course</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[15%]">Instructor</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[18%]">Category</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[10%]">Level</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[10%]">Status</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[12%]">Enrollments</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[12%]">Last Updated</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-white w-[3%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[14px] text-[var(--dq-text-disabled)]">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No courses match your filters.
                    </td>
                  </tr>
                ) : filtered.map((course, idx) => (
                  <tr key={course.id} className={`border-t border-[var(--dq-surface-border-default)] transition-colors hover:bg-[var(--dq-gray-50)] ${idx % 2 === 0 ? '' : 'bg-[var(--dq-gray-50)]/50'}`}>
                    <td className="px-4 py-3 w-[20%]">
                      <div className="font-medium text-[14px] text-[var(--dq-navy-950)] truncate" title={course.title}>{course.title}</div>
                    </td>
                    <td className="px-4 py-3 w-[15%] text-[13px] text-[var(--dq-text-secondary)] truncate">{course.instructor}</td>
                    <td className="px-4 py-3 w-[18%] text-[13px] text-[var(--dq-text-secondary)] truncate">{course.category}</td>
                    <td className="px-4 py-3 w-[10%]">
                      <span className="text-[12px] px-2 py-0.5 rounded-full bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)] font-medium capitalize">{course.level}</span>
                    </td>
                    <td className="px-4 py-3 w-[10%]">
                      <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[course.status]}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-[12%] text-[14px] font-medium text-[var(--dq-navy-950)]">{course.enrollments.toLocaleString()}</td>
                    <td className="px-4 py-3 w-[12%] text-[13px] text-[var(--dq-text-secondary)]">{course.lastUpdated}</td>
                    <td className="px-4 py-3 w-[3%]">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handlePreviewCourse(course.id)}
                          className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-navy-950)] hover:text-[var(--dq-orange-500)] transition-colors" 
                          title="Preview course"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button 
                              className="p-1.5 rounded-lg hover:bg-[var(--dq-gray-50)] text-[var(--dq-text-secondary)] transition-colors"
                              title="More actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem 
                              onClick={() => handleDuplicateCourse(course.id, course.title)}
                              className="cursor-pointer"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate Course
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleArchiveCourse(course.id, course.title)}
                              className="cursor-pointer"
                            >
                              <Archive className="w-4 h-4 mr-2" />
                              Archive Course
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCourse(course.id, course.title)}
                              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
          <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Course Performance Analytics</h2>
          <p className="text-[13px] text-[var(--dq-text-secondary)] mt-0.5">Track engagement, completion rates, and learner feedback across all courses.</p>
        </div>

        {/* KPI stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: BookOpen,   label: 'Total Courses',      value: MOCK_COURSES.length,               suffix: '',   color: 'text-[var(--dq-orange-500)]', bg: 'bg-[var(--dq-orange-50)]' },
            { icon: TrendingUp, label: 'Avg Completion Rate', value: avgCompletion,                     suffix: '%',  color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: Star,       label: 'Avg Course Rating',   value: avgRating,                         suffix: '★', color: 'text-amber-500',  bg: 'bg-amber-50' },
            { icon: Users,      label: 'Total Enrollments',   value: totalEnrollments.toLocaleString(), suffix: '',   color: 'text-purple-600',   bg: 'bg-purple-50' },
          ].map(card => (
            <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-[var(--dq-surface-border-default)]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-[22px] font-bold text-[var(--dq-navy-950)]">{card.value}{card.suffix}</div>
              <div className="text-[12px] text-[var(--dq-text-secondary)] mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top performing courses table */}
          <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-[16px] font-semibold text-foreground">Top Performing Courses</h3>
              <span className="text-[12px] text-muted-foreground">By Enrollments</span>
            </div>
            <div className="w-full">
              <table className="w-full table-fixed">
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
                          <span className="w-5 h-5 rounded-full bg-[var(--dq-navy-950)]/10 text-[var(--dq-navy-950)] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
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
          <div className="bg-card rounded-xl shadow-sm border border-border">
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
                    <div className="w-8 h-8 rounded-lg bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                      <row.icon className="w-4 h-4 text-[var(--dq-orange-500)]" />
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

      {/* Course Preview Modal */}
      {previewCourse && (
        <CoursePreviewModal
          isOpen={!!previewCourse}
          onClose={() => setPreviewCourse(null)}
          course={previewCourse}
          onEdit={handleEditCourse}
        />
      )}
    </div>
  );
};

// ─── Mock assessments data ────────────────────────────────────────────────────
const MOCK_QUIZZES = [
  { id: 'q1', title: 'Module 1: Economy 4.0 Fundamentals Check', course: 'Mastering Economy 4.0', type: 'Quiz',       questions: 15, submissions: 287, avgScore: 78, passRate: 84, status: 'active'   },
  { id: 'q2', title: 'Digital Cognitive Organizations Assessment',    course: 'Decoding Digital Cognitive Organisations',  type: 'Quiz',       questions: 20, submissions: 174, avgScore: 71, passRate: 76, status: 'active'   },
  { id: 'q3', title: 'Platform Architecture Project',          course: 'Building Powerful Digital Business Platforms',       type: 'Assignment', questions: 5,  submissions: 52,  avgScore: 82, passRate: 90, status: 'active'   },
  { id: 'q4', title: 'Transformation Strategy Reflection',          course: 'Navigating Digital Transformation 2.0',     type: 'Assignment', questions: 3,  submissions: 0,   avgScore: 0,  passRate: 0,  status: 'draft'    },
  { id: 'q5', title: 'Digital Workspace Optimization Quiz',           course: 'Optimizing Digital Workers and Workspaces',         type: 'Quiz',       questions: 12, submissions: 143, avgScore: 74, passRate: 79, status: 'active'   },
  { id: 'q6', title: 'AI & Automation Accelerators Quiz',       course: 'Leveraging Digital Accelerators for Growth',         type: 'Quiz',       questions: 18, submissions: 121, avgScore: 69, passRate: 71, status: 'active'   },
];

const MOCK_SUBMISSIONS = [
  { id: 's1', learner: 'Amara Osei',    assessment: 'Platform Architecture Project',       course: 'Building Powerful Digital Business Platforms',      submitted: '2026-03-26', score: null, maxScore: 100 },
  { id: 's2', learner: 'James Kariuki', assessment: 'Transformation Strategy Reflection',       course: 'Navigating Digital Transformation 2.0',    submitted: '2026-03-25', score: null, maxScore: 100 },
  { id: 's3', learner: 'Fatou Diallo',  assessment: 'Platform Architecture Project',       course: 'Building Powerful Digital Business Platforms',      submitted: '2026-03-25', score: null, maxScore: 100 },
  { id: 's4', learner: 'Kofi Mensah',   assessment: 'Transformation Strategy Reflection',       course: 'Navigating Digital Transformation 2.0',    submitted: '2026-03-24', score: null, maxScore: 100 },
];

const SCORE_DISTRIBUTION = [
  { range: '90–100', count: 48,  color: 'bg-emerald-500' },
  { range: '80–89',  count: 112, color: 'bg-[var(--dq-orange-500)]'    },
  { range: '70–79',  count: 134, color: 'bg-amber-400'   },
  { range: '60–69',  count: 67,  color: 'bg-orange-400'  },
  { range: 'Below 60', count: 31, color: 'bg-red-400'    },
];
const DIST_MAX = Math.max(...SCORE_DISTRIBUTION.map(d => d.count));

const QUIZ_TYPE_STYLE: Record<string, string> = {
  Quiz:       'bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)]',
  Assignment: 'bg-[var(--dq-navy-100)] text-[var(--dq-navy-700)]',
};

// ─── Mock scheduled sessions data ─────────────────────────────────────────────
const MOCK_SCHEDULED_SESSIONS = [
  { 
    id: 'sess1', 
    title: 'Week 1: Introduction to Economy 4.0', 
    course: 'Mastering Economy 4.0', 
    instructor: 'Dr. Aisha Mensah',
    type: 'live' as const,
    date: '2026-04-18',
    startTime: '14:00',
    endTime: '16:00',
    enrolled: 45,
    capacity: 50,
    meetingLink: 'https://meet.dtma.ae/economy-week1',
    status: 'upcoming' as const
  },
  { 
    id: 'sess2', 
    title: 'Module 2: Cognitive Organizations Deep Dive', 
    course: 'Decoding Digital Cognitive Organisations', 
    instructor: 'James Okafor',
    type: 'hybrid' as const,
    date: '2026-04-19',
    startTime: '10:00',
    endTime: '12:00',
    enrolled: 32,
    capacity: 40,
    meetingLink: 'https://meet.dtma.ae/cognitive-module2',
    status: 'upcoming' as const
  },
  { 
    id: 'sess3', 
    title: 'Platform Architecture Workshop', 
    course: 'Building Powerful Digital Business Platforms', 
    instructor: 'Priya Nair',
    type: 'live' as const,
    date: '2026-04-20',
    startTime: '15:00',
    endTime: '17:30',
    enrolled: 28,
    capacity: 30,
    meetingLink: 'https://meet.dtma.ae/platform-workshop',
    status: 'upcoming' as const
  },
  { 
    id: 'sess4', 
    title: 'Digital Transformation Case Studies', 
    course: 'Navigating Digital Transformation 2.0', 
    instructor: 'Marcus Webb',
    type: 'recorded' as const,
    date: '2026-04-15',
    startTime: '13:00',
    endTime: '14:30',
    enrolled: 67,
    capacity: 100,
    meetingLink: 'https://meet.dtma.ae/transformation-cases',
    status: 'completed' as const
  },
  { 
    id: 'sess5', 
    title: 'AI & Automation in Digital Workspaces', 
    course: 'Optimizing Digital Workers and Workspaces', 
    instructor: 'Sofia Reyes',
    type: 'live' as const,
    date: '2026-04-21',
    startTime: '11:00',
    endTime: '13:00',
    enrolled: 38,
    capacity: 45,
    meetingLink: 'https://meet.dtma.ae/ai-workspaces',
    status: 'upcoming' as const
  },
  { 
    id: 'sess6', 
    title: 'Leveraging Digital Accelerators Q&A', 
    course: 'Leveraging Digital Accelerators for Growth', 
    instructor: 'Dr. Aisha Mensah',
    type: 'hybrid' as const,
    date: '2026-04-22',
    startTime: '16:00',
    endTime: '17:00',
    enrolled: 41,
    capacity: 50,
    meetingLink: 'https://meet.dtma.ae/accelerators-qa',
    status: 'upcoming' as const
  },
];

const SESSION_TYPE_STYLE: Record<string, { bg: string; text: string; icon: string }> = {
  live: { bg: 'bg-red-100', text: 'text-red-700', icon: '🔴' },
  hybrid: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '🔄' },
  recorded: { bg: 'bg-[var(--dq-orange-50)]', text: 'text-[var(--dq-orange-500)]', icon: '📹' },
};

const SESSION_STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  upcoming: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  completed: { bg: 'bg-gray-100', text: 'text-gray-700' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
};

// ─── AssessmentsTab ───────────────────────────────────────────────────────────
const AssessmentsTab = () => {
  const [quizSearch, setQuizSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'quizzes' | 'submissions' | 'analytics'>('quizzes');
  const [scores, setScores] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, boolean>>({});
  const [viewingAssessment, setViewingAssessment] = useState<typeof MOCK_QUIZZES[0] | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<typeof MOCK_QUIZZES[0] | null>(null);

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
      <h1 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]">Assessments &amp; Evaluation</h1>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total Assessments',  value: MOCK_QUIZZES.length,                                    color: 'bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)]'    },
          { label: 'Total Submissions',  value: totalSubmissions.toLocaleString(),                       color: 'bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)] border border-[var(--dq-orange-500)]/30'          },
          { label: 'Avg Score',          value: `${avgScore}%`,                                          color: 'bg-amber-50 text-amber-700 border border-amber-200'        },
          { label: 'Avg Pass Rate',      value: `${avgPassRate}%`,                                       color: 'bg-emerald-50 text-emerald-700 border border-emerald-200'    },
          { label: 'Pending Grading',    value: MOCK_SUBMISSIONS.filter(s => !graded[s.id]).length,      color: 'bg-red-50 text-red-700 border border-red-200'            },
        ].map(p => (
          <div key={p.label} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium ${p.color}`}>
            <span className="font-bold text-[15px]">{p.value}</span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-[var(--dq-gray-50)] p-1 rounded-xl w-fit">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              activeSection === s.id
                ? 'bg-white shadow-sm text-[var(--dq-navy-950)]'
                : 'text-[var(--dq-text-secondary)] hover:text-[var(--dq-navy-950)]'
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
              <input
                type="text"
                placeholder="Search assessments or courses…"
                value={quizSearch}
                onChange={e => setQuizSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--dq-surface-border-default)] shadow-sm overflow-hidden">
            <div className="w-full">
              <table className="w-full table-fixed">
                <thead className="bg-[var(--dq-navy-950)]">
                  <tr>
                    {['Assessment', 'Course', 'Type', 'Questions', 'Submissions', 'Avg Score', 'Pass Rate', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[12px] font-medium text-white whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredQuizzes.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-10 text-[14px] text-[var(--dq-text-disabled)]">
                        No assessments match your search.
                      </td>
                    </tr>
                  ) : filteredQuizzes.map((q, idx) => (
                    <tr key={q.id} className={`border-t border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)] transition-colors ${idx % 2 === 0 ? '' : 'bg-[var(--dq-gray-50)]/50'}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[13px] text-[var(--dq-navy-950)] max-w-[180px] truncate" title={q.title}>{q.title}</div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-[var(--dq-text-secondary)] max-w-[160px] truncate" title={q.course}>{q.course}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${QUIZ_TYPE_STYLE[q.type]}`}>{q.type}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-center text-[var(--dq-navy-950)]">{q.questions}</td>
                      <td className="px-4 py-3 text-[13px] text-center font-medium text-[var(--dq-navy-950)]">{q.submissions.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        {q.avgScore > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-14 h-1.5 rounded-full bg-[var(--dq-surface-border-default)] overflow-hidden">
                              <div className={`h-full rounded-full ${q.avgScore >= 75 ? 'bg-emerald-500' : q.avgScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${q.avgScore}%` }} />
                            </div>
                            <span className="text-[12px] text-[var(--dq-text-secondary)]">{q.avgScore}%</span>
                          </div>
                        ) : <span className="text-[12px] text-[var(--dq-text-disabled)]">—</span>}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-center font-medium text-[var(--dq-navy-950)]">{q.passRate > 0 ? `${q.passRate}%` : '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold capitalize ${q.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' : 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]'}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => setEditingAssessment(q)}
                            className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)] transition-colors" 
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setViewingAssessment(q)}
                            className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-navy-950)] hover:text-[var(--dq-orange-500)] transition-colors" 
                            title="View"
                          >
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
        </div>
      )}

      {/* ── Section: Pending Grading ── */}
      {activeSection === 'submissions' && (
        <div className="space-y-4">
          <p className="text-[13px] text-muted-foreground">Review and grade open-ended learner submissions. Scores are out of 100.</p>
          {MOCK_SUBMISSIONS.map(sub => (
            <div key={sub.id} className={`bg-card rounded-xl border shadow-sm overflow-hidden transition-all ${graded[sub.id] ? 'border-emerald-200 opacity-70' : 'border-border'}`}>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center text-[var(--dq-orange-500)] font-bold text-[13px]">
                      {sub.learner.charAt(0)}
                    </div>
                    <span className="font-semibold text-[14px] text-foreground">{sub.learner}</span>
                    {graded[sub.id] && <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] font-semibold">Graded</span>}
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
                      className="w-24 px-3 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-[12px] font-medium text-foreground block mb-1">Instructor Feedback</label>
                    <textarea
                      placeholder="Write feedback for the learner…"
                      rows={2}
                      value={feedbacks[sub.id] || ''}
                      onChange={e => setFeedbacks(prev => ({ ...prev, [sub.id]: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-xl text-[13px] bg-background resize-none focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
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
              <CheckCircle className="w-10 h-10 text-[var(--dq-orange-500)] mx-auto mb-2" />
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
                      <span className="w-5 h-5 rounded-full bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
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
              { icon: TrendingUp, label: 'Highest Pass Rate',  value: `${Math.max(...activeQuizzes.map(q => q.passRate))}%`, color: 'text-purple-600',    bg: 'bg-purple-100'    },
              { icon: Target,     label: 'Avg Pass Rate',      value: `${avgPassRate}%`,                                     color: 'text-amber-600',   bg: 'bg-amber-100'   },
              { icon: Users,      label: 'Total Submissions',  value: totalSubmissions.toLocaleString(),                     color: 'text-[var(--dq-orange-500)]',   bg: 'bg-[var(--dq-orange-500)]/10'},
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

      {/* View Assessment Modal */}
      {viewingAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[var(--dq-surface-border-default)]">
              <div>
                <h2 className="text-[20px] font-semibold text-[var(--dq-navy-950)]">{viewingAssessment.title}</h2>
                <p className="text-[13px] text-[var(--dq-text-secondary)] mt-1">{viewingAssessment.course}</p>
              </div>
              <button 
                onClick={() => setViewingAssessment(null)}
                className="p-2 rounded-lg hover:bg-[var(--dq-gray-50)] text-[var(--dq-text-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Assessment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                  <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Type</div>
                  <div className="text-[14px] font-semibold text-[var(--dq-navy-950)]">{viewingAssessment.type}</div>
                </div>
                <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                  <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Questions</div>
                  <div className="text-[14px] font-semibold text-[var(--dq-navy-950)]">{viewingAssessment.questions}</div>
                </div>
                <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                  <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Status</div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold capitalize inline-block ${viewingAssessment.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' : 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]'}`}>
                    {viewingAssessment.status}
                  </span>
                </div>
                <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                  <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Submissions</div>
                  <div className="text-[14px] font-semibold text-[var(--dq-navy-950)]">{viewingAssessment.submissions.toLocaleString()}</div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-[15px] font-semibold text-[var(--dq-navy-950)] mb-3">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[var(--dq-text-secondary)]">Average Score</span>
                      <span className="text-[14px] font-semibold text-[var(--dq-navy-950)]">{viewingAssessment.avgScore}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--dq-surface-border-default)] overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${viewingAssessment.avgScore >= 75 ? 'bg-emerald-500' : viewingAssessment.avgScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} 
                        style={{ width: `${viewingAssessment.avgScore}%` }} 
                      />
                    </div>
                  </div>
                  <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[var(--dq-text-secondary)]">Pass Rate</span>
                      <span className="text-[14px] font-semibold text-[var(--dq-navy-950)]">{viewingAssessment.passRate}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--dq-surface-border-default)] overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-[var(--dq-orange-500)]" 
                        style={{ width: `${viewingAssessment.passRate}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Questions Preview */}
              <div>
                <h3 className="text-[15px] font-semibold text-[var(--dq-navy-950)] mb-3">Sample Questions</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--dq-navy-950)] text-white text-[11px] font-bold flex items-center justify-center">
                          {i}
                        </span>
                        <div className="flex-1">
                          <p className="text-[13px] text-[var(--dq-navy-950)]">
                            {viewingAssessment.type === 'Quiz' 
                              ? `Sample multiple choice question ${i} for ${viewingAssessment.title}`
                              : `Sample assignment question ${i} for ${viewingAssessment.title}`
                            }
                          </p>
                          <p className="text-[11px] text-[var(--dq-text-disabled)] mt-1">
                            {viewingAssessment.type === 'Quiz' ? 'Multiple Choice' : 'Open-ended'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--dq-surface-border-default)]">
              <button 
                onClick={() => setViewingAssessment(null)}
                className="px-4 py-2 rounded-xl border border-[var(--dq-surface-border-default)] text-[var(--dq-text-secondary)] hover:bg-[var(--dq-gray-50)] transition-colors text-[13px] font-medium"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setEditingAssessment(viewingAssessment);
                  setViewingAssessment(null);
                }}
                className="px-4 py-2 rounded-xl bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white transition-colors text-[13px] font-medium"
              >
                Edit Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Assessment Modal */}
      {editingAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[var(--dq-surface-border-default)]">
              <h2 className="text-[20px] font-semibold text-[var(--dq-navy-950)]">Edit Assessment</h2>
              <button 
                onClick={() => setEditingAssessment(null)}
                className="p-2 rounded-lg hover:bg-[var(--dq-gray-50)] text-[var(--dq-text-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Basic Information */}
              <div>
                <label className="block text-[13px] font-medium text-[var(--dq-navy-950)] mb-2">Assessment Title</label>
                <input
                  type="text"
                  defaultValue={editingAssessment.title}
                  className="w-full px-4 py-2.5 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                  placeholder="Enter assessment title"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[var(--dq-navy-950)] mb-2">Course</label>
                <input
                  type="text"
                  defaultValue={editingAssessment.course}
                  className="w-full px-4 py-2.5 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                  placeholder="Enter course name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[var(--dq-navy-950)] mb-2">Type</label>
                  <select
                    defaultValue={editingAssessment.type}
                    className="w-full px-4 py-2.5 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                  >
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[var(--dq-navy-950)] mb-2">Number of Questions</label>
                  <input
                    type="number"
                    defaultValue={editingAssessment.questions}
                    min={1}
                    className="w-full px-4 py-2.5 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[var(--dq-navy-950)] mb-2">Status</label>
                <select
                  defaultValue={editingAssessment.status}
                  className="w-full px-4 py-2.5 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Assessment Settings */}
              <div className="border-t border-[var(--dq-surface-border-default)] pt-5">
                <h3 className="text-[15px] font-semibold text-[var(--dq-navy-950)] mb-4">Assessment Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl">
                    <div>
                      <div className="text-[13px] font-medium text-[var(--dq-navy-950)]">Time Limit</div>
                      <div className="text-[11px] text-[var(--dq-text-disabled)] mt-0.5">Set a time limit for this assessment</div>
                    </div>
                    <input
                      type="number"
                      placeholder="Minutes"
                      defaultValue={60}
                      className="w-24 px-3 py-2 border border-[var(--dq-surface-border-default)] rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl">
                    <div>
                      <div className="text-[13px] font-medium text-[var(--dq-navy-950)]">Passing Score</div>
                      <div className="text-[11px] text-[var(--dq-text-disabled)] mt-0.5">Minimum score required to pass</div>
                    </div>
                    <input
                      type="number"
                      placeholder="%"
                      defaultValue={70}
                      min={0}
                      max={100}
                      className="w-24 px-3 py-2 border border-[var(--dq-surface-border-default)] rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl">
                    <div>
                      <div className="text-[13px] font-medium text-[var(--dq-navy-950)]">Allow Multiple Attempts</div>
                      <div className="text-[11px] text-[var(--dq-text-disabled)] mt-0.5">Let learners retake this assessment</div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded border-[var(--dq-surface-border-default)] text-[var(--dq-orange-500)] focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl">
                    <div>
                      <div className="text-[13px] font-medium text-[var(--dq-navy-950)]">Randomize Questions</div>
                      <div className="text-[11px] text-[var(--dq-text-disabled)] mt-0.5">Show questions in random order</div>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-[var(--dq-surface-border-default)] text-[var(--dq-orange-500)] focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Questions Management */}
              <div className="border-t border-[var(--dq-surface-border-default)] pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--dq-navy-950)]">Questions</h3>
                  <button className="px-3 py-1.5 rounded-lg bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white text-[12px] font-medium transition-colors">
                    + Add Question
                  </button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--dq-navy-950)] text-white text-[11px] font-bold flex items-center justify-center">
                          {i}
                        </span>
                        <div className="flex-1">
                          <input
                            type="text"
                            defaultValue={`Question ${i} for ${editingAssessment.title}`}
                            className="w-full px-3 py-2 border border-[var(--dq-surface-border-default)] rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                          />
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-white text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--dq-surface-border-default)]">
              <button 
                onClick={() => setEditingAssessment(null)}
                className="px-4 py-2 rounded-xl border border-[var(--dq-surface-border-default)] text-[var(--dq-text-secondary)] hover:bg-[var(--dq-gray-50)] transition-colors text-[13px] font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Save logic would go here
                  setEditingAssessment(null);
                }}
                className="px-4 py-2 rounded-xl bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white transition-colors text-[13px] font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Mock pending review data ─────────────────────────────────────────────────
const MOCK_PENDING = [
  {
    id: 'course-economy-40',
    title: 'Mastering Economy 4.0',
    instructor: 'DTMA Faculty',
    email: 'faculty@dtma.ae',
    category: 'Digital Economy',
    level: 'Beginner',
    price: 149,
    duration: '1 hour',
    lessons: 6,
    submittedDate: '2026-04-10',
    description: 'Master the fundamentals of the digital economy and understand how Economy 4.0 is reshaping industries, business models, and competitive dynamics.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    whatsappEnabled: true,
    whatsappDeliveryType: 'both',
    aiTutorEnabled: true,
    aiTone: 'professional',
  },
  {
    id: 'course-cognitive-org',
    title: 'Decoding Digital Cognitive Organisations',
    instructor: 'DTMA Faculty',
    email: 'faculty@dtma.ae',
    category: 'Digital Cognitive Organisation',
    level: 'Intermediate',
    price: 149,
    duration: '15 hours',
    lessons: 45,
    submittedDate: '2026-04-08',
    description: 'Transform your organization into an intelligent, learning entity that adapts and thrives in the digital age through AI-driven decision making and continuous learning.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    whatsappEnabled: true,
    whatsappDeliveryType: 'daily',
    aiTutorEnabled: true,
    aiTone: 'encouraging',
  },
  {
    id: 'course-business-platforms',
    title: 'Building Powerful Digital Business Platforms',
    instructor: 'DTMA Faculty',
    email: 'faculty@dtma.ae',
    category: 'Digital Business Platform',
    level: 'Intermediate',
    price: 149,
    duration: '18 hours',
    lessons: 54,
    submittedDate: '2026-04-12',
    description: 'Master the architecture, design, and implementation of scalable digital business platforms that drive innovation and competitive advantage.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    whatsappEnabled: true,
    whatsappDeliveryType: 'both',
    aiTutorEnabled: true,
    aiTone: 'professional',
  },
  {
    id: 'course-transformation',
    title: 'Navigating Digital Transformation 2.0',
    instructor: 'DTMA Faculty',
    email: 'faculty@dtma.ae',
    category: 'Digital Transformation',
    level: 'Advanced',
    price: 149,
    duration: '16 hours',
    lessons: 48,
    submittedDate: '2026-04-09',
    description: 'Lead successful digital transformation initiatives with proven strategies, change management techniques, and agile methodologies.',
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    whatsappEnabled: true,
    whatsappDeliveryType: 'daily',
    aiTutorEnabled: true,
    aiTone: 'encouraging',
  },
  {
    id: 'course-digital-workers',
    title: 'Optimizing Digital Workers and Workspaces',
    instructor: 'DTMA Faculty',
    email: 'faculty@dtma.ae',
    category: 'Digital Worker & Workspace',
    level: 'Beginner',
    price: 149,
    duration: '10 hours',
    lessons: 30,
    submittedDate: '2026-04-11',
    description: 'Master the tools, practices, and mindset needed to thrive as a digital worker in modern, distributed work environments.',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    whatsappEnabled: true,
    whatsappDeliveryType: 'both',
    aiTutorEnabled: true,
    aiTone: 'friendly',
  },
  {
    id: 'course-digital-accelerators',
    title: 'Leveraging Digital Accelerators for Growth',
    instructor: 'DTMA Faculty',
    email: 'faculty@dtma.ae',
    category: 'Digital Accelerators',
    level: 'Advanced',
    price: 149,
    duration: '20 hours',
    lessons: 60,
    submittedDate: '2026-04-07',
    description: 'Harness emerging technologies like AI, blockchain, IoT, and automation to accelerate business growth and innovation.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    whatsappEnabled: true,
    whatsappDeliveryType: 'daily',
    aiTutorEnabled: true,
    aiTone: 'professional',
  },
];

const RECENT_ACTIVITY = [
  { action: 'approved',           course: 'Mastering Economy 4.0', reviewer: 'Admin', time: '2 hours ago', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { action: 'rejected',           course: 'Advanced Data Analytics',             reviewer: 'Admin', time: '5 hours ago', color: 'text-red-600',     bg: 'bg-red-100'     },
  { action: 'approved',           course: 'Optimizing Digital Workers and Workspaces',            reviewer: 'Admin', time: 'Yesterday',   color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { action: 'changes requested',  course: 'Cloud Architecture Basics',           reviewer: 'Admin', time: 'Yesterday',   color: 'text-amber-600',   bg: 'bg-amber-100'   },
  { action: 'approved',           course: 'Decoding Digital Cognitive Organisations',    reviewer: 'Admin', time: '2 days ago',  color: 'text-emerald-600', bg: 'bg-emerald-100' },
];

const PENDING_CATEGORIES = ['All Categories', 'Digital Economy', 'Digital Cognitive Organisation', 'Digital Business Platform', 'Digital Transformation', 'Digital Worker & Workspace', 'Digital Accelerators'];

// ─── PendingApprovalsTab ──────────────────────────────────────────────────────
const PendingApprovalsTab = () => {
  const [pendingSearch, setPendingSearch] = useState('');
  const [pendingCategory, setPendingCategory] = useState('All Categories');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [previewCourse, setPreviewCourse] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (course: any) => {
    // Convert pending course to the format expected by CoursePreviewModal
    const courseForPreview = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      category: course.category,
      level: course.level,
      status: 'pending',
      enrollments: 0,
      lastUpdated: course.submittedDate,
      rating: 0,
      completion: 0,
      revenue: 0,
    };
    setPreviewCourse(courseForPreview);
    setIsPreviewOpen(true);
  };

  const filtered = MOCK_PENDING.filter(c => {
    const matchSearch =
      c.title.toLowerCase().includes(pendingSearch.toLowerCase()) ||
      c.instructor.toLowerCase().includes(pendingSearch.toLowerCase());
    const matchCat = pendingCategory === 'All Categories' || c.category === pendingCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]">Pending Course Approvals</h1>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Awaiting Review',     value: MOCK_PENDING.length, color: 'bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)] border border-[#dddee4]'       },
          { label: 'Approved This Month', value: 12,                  color: 'bg-white text-green-700 border border-[var(--dq-surface-border-default)]'  },
          { label: 'Rejected This Month', value: 2,                   color: 'bg-white text-red-700 border border-[var(--dq-surface-border-default)]'          },
          { label: 'Changes Requested',   value: 1,                   color: 'bg-white text-amber-700 border border-[var(--dq-surface-border-default)]'      },
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
          <input
            type="text"
            placeholder="Search by course or instructor…"
            value={pendingSearch}
            onChange={e => setPendingSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
          />
        </div>
        <Select value={pendingCategory} onValueChange={setPendingCategory}>
          <SelectTrigger className="w-[200px] border-[var(--dq-surface-border-default)] focus:ring-[var(--dq-orange-500)]/40">
            <BookOpen className="w-4 h-4 mr-2 text-[var(--dq-text-disabled)]" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PENDING_CATEGORIES.map(cat => (
              <SelectItem 
                key={cat} 
                value={cat}
                className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]"
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Review cards */}
        <div className="lg:col-span-2 space-y-5">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[var(--dq-surface-border-default)]">
              <CheckCircle className="w-12 h-12 text-[var(--dq-orange-500)] mx-auto mb-3" />
              <h3 className="text-[18px] font-semibold mb-1 text-[var(--dq-navy-950)]">All caught up!</h3>
              <p className="text-[14px] text-[var(--dq-text-secondary)]">No courses match your filters.</p>
            </div>
          ) : filtered.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-[var(--dq-surface-border-default)] shadow-sm overflow-hidden">
              <div className="flex gap-4 p-5">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-semibold text-[var(--dq-navy-950)] leading-tight">{course.title}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)] font-semibold whitespace-nowrap flex-shrink-0">
                      Pending Review
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--dq-text-secondary)] mt-1">
                    by <span className="font-medium text-[var(--dq-navy-950)]">{course.instructor}</span> · {course.email}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)] font-medium">{course.category}</span>
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-[var(--dq-gray-50)] text-[var(--dq-text-secondary)] capitalize">{course.level}</span>
                    <span className="text-[12px] text-[var(--dq-text-secondary)] flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="text-[12px] text-[var(--dq-text-secondary)]">{course.lessons} lessons</span>
                    <span className="text-[13px] font-semibold text-[var(--dq-orange-500)]">${course.price}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-4">
                <p className="text-[13px] text-[var(--dq-text-secondary)] leading-relaxed line-clamp-2">{course.description}</p>
                <p className="text-[12px] text-[var(--dq-text-disabled)] mt-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Submitted: {course.submittedDate}
                </p>
                
                {/* WhatsApp & AI Settings */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[var(--dq-surface-border-default)]">
                  {course.whatsappEnabled ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 border border-green-200">
                      <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-[11px] font-medium text-green-700">
                        WhatsApp: {course.whatsappDeliveryType === 'both' ? 'Daily + Practice' : course.whatsappDeliveryType === 'daily' ? 'Daily Micro-Learning' : 'Practice Questions'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200">
                      <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-medium text-gray-500">WhatsApp: Disabled</span>
                    </div>
                  )}
                  
                  {course.aiTutorEnabled ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--dq-orange-50)] border border-[#ffe9e4]">
                      <Bot className="w-3.5 h-3.5 text-[var(--dq-orange-500)]" />
                      <span className="text-[11px] font-medium text-[var(--dq-orange-500)]">
                        AI Tutor: {course.aiTone.charAt(0).toUpperCase() + course.aiTone.slice(1)} tone
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200">
                      <Bot className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-medium text-gray-500">AI Tutor: Disabled</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 bg-[var(--dq-gray-50)] border-t border-[var(--dq-surface-border-default)]">
                {confirmingId === course.id ? (
                  <>
                    <span className="text-[13px] text-[var(--dq-text-secondary)] flex-1">Confirm approval?</span>
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="px-3 py-1.5 rounded-lg border border-[var(--dq-surface-border-default)] text-[13px] hover:bg-white transition-colors"
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
                    <button className="px-4 py-1.5 rounded-lg bg-amber-50 hover:bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)] text-[13px] font-medium border border-amber-200 transition-colors flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> Request Changes
                    </button>
                    <button className="px-4 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-medium border border-red-200 transition-colors flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button 
                      onClick={() => handlePreview(course)}
                      className="ml-auto px-3 py-1.5 rounded-lg border border-[var(--dq-surface-border-default)] text-[13px] text-[var(--dq-text-secondary)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity sidebar */}
        <div className="bg-white rounded-2xl border border-[var(--dq-surface-border-default)] shadow-sm h-fit">
          <div className="px-5 py-4 border-b border-[var(--dq-surface-border-default)]">
            <h3 className="text-[16px] font-semibold text-[var(--dq-navy-950)]">Recent Review Activity</h3>
            <p className="text-[12px] text-[var(--dq-text-secondary)] mt-0.5">Last 5 review decisions</p>
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
                  <p className="text-[13px] font-medium text-[var(--dq-navy-950)] truncate">{item.course}</p>
                  <p className="text-[12px] text-[var(--dq-text-secondary)]">
                    <span className={`font-medium capitalize ${item.color}`}>{item.action}</span> by {item.reviewer}
                  </p>
                  <p className="text-[11px] text-[var(--dq-text-disabled)] mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <button className="w-full py-2 text-[13px] text-[var(--dq-orange-500)] font-medium border border-[var(--dq-orange-500)]/30 rounded-xl hover:bg-[var(--dq-orange-50)] transition-colors">
              View Full History
            </button>
          </div>
        </div>
      </div>

      {/* Course Preview Modal */}
      {previewCourse && (
        <CoursePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setPreviewCourse(null);
          }}
          course={previewCourse}
        />
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { profile, signOut, role } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [governanceSubTab, setGovernanceSubTab] = useState<'overview' | 'workflow' | 'reporting' | 'scanning' | 'policies' | 'activity'>('overview');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBulkEnrollModal, setShowBulkEnrollModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showReviewContentModal, setShowReviewContentModal] = useState(false);
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [showFacultyListModal, setShowFacultyListModal] = useState(false);
  const [showPerformanceReportsModal, setShowPerformanceReportsModal] = useState(false);
  const [facultySubTab, setFacultySubTab] = useState<'overview' | 'faculty-list' | 'programs' | 'assignments' | 'performance'>('overview');
  
  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  // Filter users based on search and filters
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchSearch = user.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = userRoleFilter === 'all' || user.role === userRoleFilter;
    const matchStatus = userStatusFilter === 'all' || user.status === userStatusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  // User Management Handlers
  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: "User edit functionality coming soon.",
    });
  };

  const handleViewUser = (userId: string) => {
    toast({
      title: "View User",
      description: "User details view coming soon.",
    });
  };

  const handleResetPassword = (userId: string, email: string) => {
    toast({
      title: "Password Reset",
      description: `Password reset link sent to ${email}`,
    });
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: "Status Updated",
      description: `User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`,
    });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      toast({
        title: "User Deleted",
        description: `${userName} has been permanently deleted.`,
        variant: "destructive",
      });
    }
  };
  
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
  
  // Certification & Customer Success State
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showCreateBadgeModal, setShowCreateBadgeModal] = useState(false);
  const [showVerifyCertificateModal, setShowVerifyCertificateModal] = useState(false);
  const [showIssuanceRulesModal, setShowIssuanceRulesModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  
  const [certificateTemplateForm, setCertificateTemplateForm] = useState({
    name: '',
    type: 'course' as 'course' | 'badge' | 'specialization' | 'micro' | 'executive' | 'team',
    description: '',
    orientation: 'landscape' as 'landscape' | 'portrait',
    backgroundColor: '#ffffff',
    borderStyle: 'classic' as 'classic' | 'modern' | 'minimal' | 'elegant',
    includeQRCode: true,
    includeSignature: true,
    includeDate: true,
    includeCredentialID: true,
  });
  
  const [badgeForm, setBadgeForm] = useState({
    name: '',
    description: '',
    category: 'achievement' as 'achievement' | 'skill' | 'milestone' | 'special',
    icon: '🏆',
    criteria: '',
    points: 100,
    stackable: true,
  });
  
  const [verifyCertificateForm, setVerifyCertificateForm] = useState({
    certificateID: '',
    verificationMethod: 'id' as 'id' | 'qr' | 'blockchain',
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
    { id: 'whatsapp-analytics' as AdminTab, label: 'WhatsApp Analytics', icon: MessageSquare },
    { id: 'ai-usage' as AdminTab, label: 'AI Usage Monitoring', icon: Bot },
    { id: 'communication' as AdminTab, label: 'Communication', icon: Settings },
    { id: 'governance' as AdminTab, label: 'Content Governance', icon: Settings },
    { id: 'organizations' as AdminTab, label: 'Organizations', icon: Settings },
    { id: 'certification' as AdminTab, label: 'Certification', icon: Award },
    { id: 'commerce' as AdminTab, label: 'Commerce & Billing', icon: Settings },
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[var(--dq-navy-950)] to-[#2a3058] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
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
                    ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="bg-[var(--dq-orange-500)] text-white">{item.badge}</Badge>
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
                      ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20'
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
              <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)] flex items-center justify-center text-[14px] leading-[20px] font-medium">
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
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-[32px] leading-[40px] font-semibold text-[var(--dq-navy-950)] mb-2">Platform Overview</h1>
                <p className="text-[14px] leading-[20px] text-[var(--dq-text-disabled)]">Monitor key metrics and platform performance at a glance</p>
              </div>
              
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--dq-surface-border-default)] border-t-[var(--dq-orange-500)] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-disabled)]">Loading analytics...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Primary Stats Grid - Clean Executive Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center group-hover:bg-[#ffe9e4] transition-colors">
                          <Users className="w-6 h-6 text-[var(--dq-orange-500)]" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+12%</span>
                        </div>
                      </div>
                      <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">{analytics?.totalUsers || 0}</div>
                      <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Total Users</div>
                      <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Active platform members</div>
                    </div>

                    {/* Published Courses Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-[var(--dq-gray-100)] rounded-xl flex items-center justify-center group-hover:bg-[#dddee4] transition-colors">
                          <BookOpen className="w-6 h-6 text-[var(--dq-navy-950)]" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+8%</span>
                        </div>
                      </div>
                      <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">{analytics?.publishedCourses || 0}</div>
                      <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Published Courses</div>
                      <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Live learning content</div>
                    </div>

                    {/* Enrollments Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center group-hover:bg-[#ffe9e4] transition-colors">
                          <TrendingUp className="w-6 h-6 text-[var(--dq-orange-500)]" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+24%</span>
                        </div>
                      </div>
                      <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">{analytics?.totalEnrollments || 0}</div>
                      <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Total Enrollments</div>
                      <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Course registrations</div>
                    </div>

                    {/* Certificates Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-[var(--dq-gray-100)] rounded-xl flex items-center justify-center group-hover:bg-[#dddee4] transition-colors">
                          <Award className="w-6 h-6 text-[var(--dq-navy-950)]" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+18%</span>
                        </div>
                      </div>
                      <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">{analytics?.certificatesIssued || 0}</div>
                      <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Certificates Issued</div>
                      <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Completed achievements</div>
                    </div>
                  </div>

                  {/* Secondary Metrics Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Users by Role */}
                    <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)]">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[18px] leading-[26px] font-semibold text-[var(--dq-navy-950)]">Users by Role</h3>
                        <div className="w-8 h-8 bg-[var(--dq-gray-50)] rounded-lg flex items-center justify-center">
                          <Users2 className="w-4 h-4 text-[var(--dq-text-secondary)]" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--dq-orange-500)]"></div>
                            <span className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Learners</span>
                          </div>
                          <span className="text-[18px] leading-[26px] font-bold text-[var(--dq-navy-950)]">{analytics?.usersByRole.learner || 0}</span>
                        </div>
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--dq-navy-950)]"></div>
                            <span className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Instructors</span>
                          </div>
                          <span className="text-[18px] leading-[26px] font-bold text-[var(--dq-navy-950)]">{analytics?.usersByRole.instructor || 0}</span>
                        </div>
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--dq-text-disabled)]"></div>
                            <span className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Admins</span>
                          </div>
                          <span className="text-[18px] leading-[26px] font-bold text-[var(--dq-navy-950)]">{analytics?.usersByRole.admin || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)]">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[18px] leading-[26px] font-semibold text-[var(--dq-navy-950)]">Performance</h3>
                        <div className="w-8 h-8 bg-[var(--dq-gray-50)] rounded-lg flex items-center justify-center">
                          <BarChart2 className="w-4 h-4 text-[var(--dq-text-secondary)]" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Completion Rate</span>
                            <span className="text-[18px] leading-[26px] font-bold text-[var(--dq-navy-950)]">{analytics?.completionRate || 0}%</span>
                          </div>
                          <div className="w-full h-2 bg-[var(--dq-gray-50)] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[var(--dq-orange-500)] to-[#e66045] rounded-full transition-all duration-500"
                              style={{ width: `${analytics?.completionRate || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-[var(--dq-surface-border-default)]">
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Avg. Course Rating</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-[18px] leading-[26px] font-bold text-[var(--dq-navy-950)]">4.7</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[18px] leading-[26px] font-semibold text-white">Quick Actions</h3>
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <button 
                          onClick={() => setActiveTab('pending')}
                          className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4" />
                            <span className="text-[14px] leading-[20px] font-medium">Pending Reviews</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] leading-[24px] font-bold text-[var(--dq-orange-500)]">{analytics?.pendingReviews || 0}</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                        <button 
                          onClick={() => setActiveTab('courses')}
                          className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-[14px] leading-[20px] font-medium">Total Courses</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] leading-[24px] font-bold">{analytics?.totalCourses || 0}</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                        <button 
                          onClick={() => setActiveTab('users')}
                          className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4" />
                            <span className="text-[14px] leading-[20px] font-medium">Manage Users</span>
                          </div>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
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
                <h1 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]">User Management</h1>
                <Button 
                  onClick={() => setShowCreateUserModal(true)}
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] text-white transition-colors"
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { label: 'Total Users', value: MOCK_USERS.length, color: 'bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)] border border-[#dddee4]' },
                  { label: 'Admins', value: MOCK_USERS.filter(u => u.role === 'admin').length, color: 'bg-white text-[var(--dq-navy-950)] border border-[var(--dq-surface-border-default)]' },
                  { label: 'Instructors', value: MOCK_USERS.filter(u => u.role === 'instructor').length, color: 'bg-white text-[var(--dq-navy-950)] border border-[var(--dq-surface-border-default)]' },
                  { label: 'Learners', value: MOCK_USERS.filter(u => u.role === 'learner').length, color: 'bg-white text-emerald-700 border border-[var(--dq-surface-border-default)]' },
                  { label: 'Active', value: MOCK_USERS.filter(u => u.status === 'active').length, color: 'bg-white text-emerald-700 border border-[var(--dq-surface-border-default)]' },
                ].map(pill => (
                  <div key={pill.label} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium ${pill.color}`}>
                    <span className="font-bold text-[15px]">{pill.value}</span>
                    <span>{pill.label}</span>
                  </div>
                ))}
              </div>

              {/* Search and Filters */}
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
                  <input
                    type="text"
                    placeholder="Search by name or email…"
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
                  <select
                    value={userRoleFilter}
                    onChange={e => setUserRoleFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                    <option value="learner">Learner</option>
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dq-text-disabled)]" />
                  <select
                    value={userStatusFilter}
                    onChange={e => setUserStatusFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-[var(--dq-surface-border-default)] overflow-hidden">
                <div className="w-full">
                  <table className="w-full table-fixed" role="table" aria-label="User management table">
                    <thead className="bg-[var(--dq-navy-950)]">
                      <tr>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">User</th>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">Email</th>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">Role</th>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">Status</th>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">Joined</th>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">Last Login</th>
                        <th scope="col" className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-[14px] text-[var(--dq-text-secondary)]">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            No users match your filters.
                          </td>
                        </tr>
                      ) : filteredUsers.map((user, idx) => (
                        <tr key={user.id} className={`border-t border-[var(--dq-surface-border-default)] transition-colors hover:bg-[var(--dq-gray-50)] ${idx % 2 === 0 ? 'bg-white' : 'bg-[var(--dq-gray-50)]'}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-50)] flex items-center justify-center text-[14px] font-medium text-[var(--dq-orange-500)]">
                                {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-[14px] font-medium text-[var(--dq-navy-950)]">{user.full_name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)]">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-semibold capitalize ${ROLE_STYLES[user.role]}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-semibold capitalize ${STATUS_BADGE_STYLES[user.status]}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)] whitespace-nowrap">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)] whitespace-nowrap">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => handleEditUser(user.id)}
                                className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)] transition-colors" 
                                title="Edit user"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleViewUser(user.id)}
                                className="p-1.5 rounded-lg hover:bg-[var(--dq-gray-50)] text-[var(--dq-text-secondary)] transition-colors" 
                                title="View user details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button 
                                    className="p-1.5 rounded-lg hover:bg-[var(--dq-gray-50)] text-[var(--dq-text-secondary)] transition-colors"
                                    title="More actions"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem 
                                    onClick={() => handleResetPassword(user.id, user.email)}
                                    className="cursor-pointer"
                                  >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleToggleStatus(user.id, user.status)}
                                    className="cursor-pointer"
                                  >
                                    {user.status === 'active' ? (
                                      <>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Deactivate User
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Activate User
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteUser(user.id, user.full_name)}
                                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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

          {/* Pending Courses Tab */}
          {activeTab === 'pending' && (
            <PendingApprovalsTab />
          )}

          {/* Invites Tab */}
          {activeTab === 'invites' && (
            <InviteManagement />
          )}

          {/* WhatsApp Analytics Tab */}
          {activeTab === 'whatsapp-analytics' && (
            <WhatsAppAnalyticsDashboard />
          )}

          {/* AI Usage Monitoring Tab */}
          {activeTab === 'ai-usage' && (
            <AIUsageMonitoringDashboard />
          )}

          {/* All Courses Tab */}
          {activeTab === 'courses' && (
            <CourseManagementTab onNavigateToPending={() => setActiveTab('pending')} />
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <AssessmentsTab />
          )}

          {/* Training Delivery Tab */}
          {activeTab === 'scheduling' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-[var(--dq-navy-950)]">Training Delivery & Scheduling</h1>
              <div className="grid gap-6">
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-[var(--dq-navy-950)]">Class Setup & Cohort Scheduling</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)] mb-4">
                    Schedule live classes, manage cohorts, and track attendance.
                  </p>
                  <Button 
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] text-white transition-colors"
                  >
                    Schedule Class
                  </Button>
                </div>
                
                {/* Training Calendar Section */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[20px] leading-[28px] font-medium text-[var(--dq-navy-950)]">Training Calendar</h3>
                    <div className="flex items-center gap-3">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] border-[var(--dq-surface-border-default)] focus:ring-[var(--dq-orange-500)]/40">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">All Sessions</SelectItem>
                          <SelectItem value="live" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">Live Only</SelectItem>
                          <SelectItem value="hybrid" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">Hybrid Only</SelectItem>
                          <SelectItem value="recorded" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">Recorded Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="upcoming">
                        <SelectTrigger className="w-[180px] border-[var(--dq-surface-border-default)] focus:ring-[var(--dq-orange-500)]/40">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">All Status</SelectItem>
                          <SelectItem value="upcoming" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">Upcoming</SelectItem>
                          <SelectItem value="completed" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                      <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Total Sessions</div>
                      <div className="text-[24px] font-bold text-[var(--dq-navy-950)]">{MOCK_SCHEDULED_SESSIONS.length}</div>
                    </div>
                    <div className="bg-[var(--dq-orange-50)] rounded-xl p-4">
                      <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Upcoming</div>
                      <div className="text-[24px] font-bold text-[var(--dq-orange-500)]">
                        {MOCK_SCHEDULED_SESSIONS.filter(s => s.status === 'upcoming').length}
                      </div>
                    </div>
                    <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                      <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Total Enrolled</div>
                      <div className="text-[24px] font-bold text-[var(--dq-navy-950)]">
                        {MOCK_SCHEDULED_SESSIONS.reduce((sum, s) => sum + s.enrolled, 0)}
                      </div>
                    </div>
                    <div className="bg-[var(--dq-gray-50)] rounded-xl p-4">
                      <div className="text-[11px] text-[var(--dq-text-disabled)] uppercase tracking-wide mb-1">Avg Capacity</div>
                      <div className="text-[24px] font-bold text-[var(--dq-navy-950)]">
                        {Math.round((MOCK_SCHEDULED_SESSIONS.reduce((sum, s) => sum + (s.enrolled / s.capacity * 100), 0) / MOCK_SCHEDULED_SESSIONS.length))}%
                      </div>
                    </div>
                  </div>

                  {/* Sessions List */}
                  <div className="space-y-3">
                    {MOCK_SCHEDULED_SESSIONS.map((session) => (
                      <div 
                        key={session.id} 
                        className="border border-[var(--dq-surface-border-default)] rounded-xl p-4 hover:border-[var(--dq-orange-500)]/30 hover:bg-[var(--dq-orange-50)]/20 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-[15px] font-semibold text-[var(--dq-navy-950)]">{session.title}</h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${SESSION_TYPE_STYLE[session.type].bg} ${SESSION_TYPE_STYLE[session.type].text}`}>
                                {SESSION_TYPE_STYLE[session.type].icon} {session.type}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${SESSION_STATUS_STYLE[session.status].bg} ${SESSION_STATUS_STYLE[session.status].text}`}>
                                {session.status}
                              </span>
                            </div>
                            <p className="text-[13px] text-[var(--dq-text-secondary)] mb-2">{session.course}</p>
                            <div className="flex items-center gap-4 text-[12px] text-[var(--dq-text-disabled)]">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{session.startTime} - {session.endTime}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                <span>{session.instructor}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <div className="text-[13px] font-semibold text-[var(--dq-navy-950)]">
                                {session.enrolled}/{session.capacity}
                              </div>
                              <div className="text-[11px] text-[var(--dq-text-disabled)]">enrolled</div>
                            </div>
                            <div className="w-24 h-1.5 rounded-full bg-[var(--dq-surface-border-default)] overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-[var(--dq-orange-500)]" 
                                style={{ width: `${(session.enrolled / session.capacity) * 100}%` }} 
                              />
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              {session.status === 'upcoming' && (
                                <>
                                  <button 
                                    className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)] transition-colors"
                                    title="Edit Session"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-navy-950)] hover:text-[var(--dq-orange-500)] transition-colors"
                                    title="View Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button 
                                    className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-navy-950)] hover:text-[var(--dq-orange-500)] transition-colors"
                                    title="Copy Meeting Link"
                                  >
                                    <LinkIcon className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              {session.status === 'completed' && (
                                <button 
                                  className="p-1.5 rounded-lg hover:bg-[var(--dq-orange-50)] text-[var(--dq-navy-950)] hover:text-[var(--dq-orange-500)] transition-colors"
                                  title="View Recording"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enrollment Tab */}
          {activeTab === 'enrollment' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[var(--dq-navy-950)]">Student & Enrollment Management</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[var(--dq-text-secondary)]">Manage enrollments, track capacity, and oversee student operations</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">1,247</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Total Enrolled</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18% this month</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">23</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Pending Approval</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-[var(--dq-text-secondary)] font-medium">
                    <span>Requires action</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-2xl flex items-center justify-center shadow-sm">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">42</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Active Courses</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-[var(--dq-text-secondary)] font-medium">
                    <span>With enrollments</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">89%</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Completion Rate</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>+5% vs last month</span>
                  </div>
                </div>
              </div>

              {/* Enrollment Dashboard */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Enrollment Dashboard</h3>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">Manage student enrollments, approvals, and bulk operations</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setShowBulkEnrollModal(true)}
                    className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white shadow-sm h-auto py-4"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Bulk Enroll Students</div>
                      <div className="text-xs opacity-90">Upload CSV or Excel file</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-[var(--dq-surface-border-default)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)] shadow-sm h-auto py-4"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">View Pending Approvals</div>
                      <div className="text-xs opacity-70">23 awaiting review</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Seat Management - Enhanced */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-2xl flex items-center justify-center shadow-sm">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Seat Management</h3>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">Track available seats and manage course capacity across all programs</p>
                  </div>
                </div>

                {/* Capacity Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[var(--dq-gray-50)] to-[var(--dq-surface-border-default)] rounded-xl p-6 border border-[var(--dq-surface-border-default)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[14px] leading-[20px] font-semibold text-[var(--dq-navy-950)]">Total Capacity</div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Users className="w-5 h-5 text-[var(--dq-navy-950)]" />
                      </div>
                    </div>
                    <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-navy-950)] mb-1">2,500</div>
                    <div className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">Seats across all courses</div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[14px] leading-[20px] font-semibold text-emerald-900">Occupied</div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div className="text-[32px] leading-[40px] font-bold text-emerald-900 mb-1">1,247</div>
                    <div className="text-[13px] leading-[18px] text-emerald-700">50% utilization rate</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[14px] leading-[20px] font-semibold text-blue-900">Available</div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-[32px] leading-[40px] font-bold text-blue-900 mb-1">1,253</div>
                    <div className="text-[13px] leading-[18px] text-blue-700">Ready for enrollment</div>
                  </div>
                </div>

                {/* Course-wise Seat Breakdown */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[18px] leading-[26px] font-semibold text-[var(--dq-navy-950)]">Course Capacity Breakdown</h4>
                    <Button variant="outline" size="sm" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Capacity
                    </Button>
                  </div>

                  {/* Sample Course Capacity Cards */}
                  {[
                    { name: 'Digital Transformation Strategy', total: 500, occupied: 387, status: 'healthy', color: 'emerald' },
                    { name: 'Digital Business Platform', total: 400, occupied: 312, status: 'healthy', color: 'emerald' },
                    { name: 'Digital Accelerators', total: 350, occupied: 298, status: 'warning', color: 'amber' },
                    { name: 'Digital Workers', total: 300, occupied: 250, status: 'healthy', color: 'emerald' },
                  ].map((course, index) => {
                    const percentage = Math.round((course.occupied / course.total) * 100);
                    const available = course.total - course.occupied;
                    
                    return (
                      <div key={index} className="bg-gradient-to-r from-white to-[var(--dq-gray-50)] rounded-xl p-6 border border-[var(--dq-surface-border-default)] hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h5 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-1">{course.name}</h5>
                            <div className="flex items-center gap-4 text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.occupied} enrolled
                              </span>
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-4 h-4" />
                                {available} available
                              </span>
                              <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {course.total} total
                              </span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                            course.status === 'healthy' 
                              ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' 
                              : 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]'
                          }`}>
                            {percentage}% Full
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative">
                          <div className="w-full bg-[var(--dq-surface-border-default)] rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                course.status === 'healthy'
                                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                                  : 'bg-gradient-to-r from-amber-400 to-amber-600'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-[12px] text-[var(--dq-text-secondary)]">
                            <span>0</span>
                            <span>{course.total}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-[var(--dq-surface-border-default)]">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Seats
                    </Button>
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      View Alerts
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Faculty Tab */}
          {activeTab === 'faculty' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[var(--dq-navy-950)]">Faculty & Program Operations</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[var(--dq-text-secondary)]">Manage faculty members, assignments, and learning programs</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">87</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Active Faculty</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12 this quarter</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-2xl flex items-center justify-center shadow-sm">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">24</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Learning Programs</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-[var(--dq-text-secondary)] font-medium">
                    <span>Across 6 categories</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Star className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">4.8</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Avg Faculty Rating</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-amber-600 font-medium">
                    <Star className="w-4 h-4 fill-amber-600" />
                    <span>Based on 2,341 reviews</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">156</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Active Assignments</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>92% completion rate</span>
                  </div>
                </div>
              </div>

              {/* Faculty Dashboard */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Faculty Dashboard</h3>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">Manage faculty members, assignments, and performance tracking</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setShowAddFacultyModal(true)}
                    className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white shadow-sm h-auto py-4"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Add Faculty Member</div>
                      <div className="text-xs opacity-90">Invite new instructor</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setFacultySubTab('faculty-list')}
                    variant="outline"
                    className="border-[var(--dq-surface-border-default)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)] shadow-sm h-auto py-4"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">View All Faculty</div>
                      <div className="text-xs opacity-70">87 active members</div>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => setFacultySubTab('performance')}
                    variant="outline"
                    className="border-[var(--dq-surface-border-default)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)] shadow-sm h-auto py-4"
                  >
                    <BarChart2 className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Performance Reports</div>
                      <div className="text-xs opacity-70">Analytics & insights</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Program Builder - Enhanced */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-2xl flex items-center justify-center shadow-sm">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Program Builder</h3>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">Create and manage comprehensive learning programs and curriculum pathways</p>
                  </div>
                </div>

                {/* Program Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[var(--dq-gray-50)] to-[var(--dq-surface-border-default)] rounded-xl p-6 border border-[var(--dq-surface-border-default)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[14px] leading-[20px] font-semibold text-[var(--dq-navy-950)]">Total Programs</div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <BookOpen className="w-5 h-5 text-[var(--dq-navy-950)]" />
                      </div>
                    </div>
                    <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-navy-950)] mb-1">24</div>
                    <div className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">Active learning programs</div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[14px] leading-[20px] font-semibold text-emerald-900">Published</div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div className="text-[32px] leading-[40px] font-bold text-emerald-900 mb-1">18</div>
                    <div className="text-[13px] leading-[18px] text-emerald-700">Live and enrolling</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[14px] leading-[20px] font-semibold text-amber-900">In Development</div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="text-[32px] leading-[40px] font-bold text-amber-900 mb-1">6</div>
                    <div className="text-[13px] leading-[18px] text-amber-700">Being created</div>
                  </div>
                </div>

                {/* Program Categories */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[18px] leading-[26px] font-semibold text-[var(--dq-navy-950)]">Program Categories</h4>
                    <Button 
                      onClick={() => setShowCreateProgramModal(true)}
                      variant="outline" 
                      size="sm" 
                      className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Program
                    </Button>
                  </div>

                  {/* Sample Program Categories */}
                  {[
                    { 
                      name: 'Digital Transformation', 
                      programs: 6, 
                      courses: 24, 
                      students: 487,
                      icon: Sparkles,
                      color: 'from-purple-400 to-purple-600',
                      bgColor: 'from-purple-50 to-purple-100',
                      borderColor: 'border-purple-200'
                    },
                    { 
                      name: 'Business Platform', 
                      programs: 4, 
                      courses: 18, 
                      students: 356,
                      icon: Building2,
                      color: 'from-blue-400 to-blue-600',
                      bgColor: 'from-blue-50 to-blue-100',
                      borderColor: 'border-blue-200'
                    },
                    { 
                      name: 'Digital Accelerators', 
                      programs: 5, 
                      courses: 22, 
                      students: 412,
                      icon: TrendingUp,
                      color: 'from-emerald-400 to-emerald-600',
                      bgColor: 'from-emerald-50 to-emerald-100',
                      borderColor: 'border-emerald-200'
                    },
                    { 
                      name: 'Digital Workers', 
                      programs: 4, 
                      courses: 16, 
                      students: 298,
                      icon: Users,
                      color: 'from-orange-400 to-orange-600',
                      bgColor: 'from-orange-50 to-orange-100',
                      borderColor: 'border-orange-200'
                    },
                    { 
                      name: 'Digital Economy', 
                      programs: 3, 
                      courses: 14, 
                      students: 234,
                      icon: DollarSign,
                      color: 'from-green-400 to-green-600',
                      bgColor: 'from-green-50 to-green-100',
                      borderColor: 'border-green-200'
                    },
                    { 
                      name: 'Cognitive Organization', 
                      programs: 2, 
                      courses: 10, 
                      students: 178,
                      icon: Brain,
                      color: 'from-pink-400 to-pink-600',
                      bgColor: 'from-pink-50 to-pink-100',
                      borderColor: 'border-pink-200'
                    },
                  ].map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={index} className={`bg-gradient-to-r ${category.bgColor} rounded-xl p-6 border ${category.borderColor} hover:shadow-md transition-all`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-sm`}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-2">{category.name}</h5>
                              <div className="flex items-center gap-6 text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">
                                <span className="flex items-center gap-1.5">
                                  <BookOpen className="w-4 h-4" />
                                  {category.programs} programs
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <FileText className="w-4 h-4" />
                                  {category.courses} courses
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Users className="w-4 h-4" />
                                  {category.students} students
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              onClick={() => {
                                setFacultySubTab('programs');
                                toast({
                                  title: "Program Details",
                                  description: `Viewing ${category.name} programs`,
                                });
                              }}
                              variant="outline" 
                              size="sm" 
                              className="border-[var(--dq-surface-border-default)] hover:bg-white hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              onClick={() => {
                                toast({
                                  title: "Edit Program",
                                  description: `Editing ${category.name} program settings`,
                                });
                              }}
                              variant="outline" 
                              size="sm" 
                              className="border-[var(--dq-surface-border-default)] hover:bg-white hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Program Builder Features */}
                <div className="bg-gradient-to-r from-[var(--dq-navy-950)]/5 to-[var(--dq-orange-500)]/5 rounded-xl p-6 border border-[var(--dq-orange-500)]/20 mb-6">
                  <h4 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-4">Program Builder Features</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: Target, title: 'Learning Pathways', desc: 'Create structured learning journeys' },
                      { icon: Calendar, title: 'Scheduling', desc: 'Set program timelines and milestones' },
                      { icon: Award, title: 'Certifications', desc: 'Design completion certificates' },
                      { icon: Users2, title: 'Cohort Management', desc: 'Organize student groups' },
                      { icon: BarChart2, title: 'Progress Tracking', desc: 'Monitor program completion' },
                      { icon: Settings, title: 'Prerequisites', desc: 'Set course requirements' },
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[var(--dq-surface-border-default)]">
                          <div className="w-10 h-10 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-[14px] leading-[20px] font-semibold text-[var(--dq-navy-950)]">{feature.title}</div>
                            <div className="text-[12px] leading-[18px] text-[var(--dq-text-secondary)] mt-1">{feature.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-6 border-t border-[var(--dq-surface-border-default)]">
                  <div className="grid md:grid-cols-4 gap-4">
                    <Button 
                      onClick={() => setShowCreateProgramModal(true)}
                      className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Program
                    </Button>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Duplicate Program",
                          description: "Select a program to duplicate from the list above",
                        });
                      }}
                      variant="outline" 
                      className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate Program
                    </Button>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Export Programs",
                          description: "Exporting program data to CSV...",
                        });
                      }}
                      variant="outline" 
                      className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Programs
                    </Button>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Program Settings",
                          description: "Opening program configuration settings",
                        });
                      }}
                      variant="outline" 
                      className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === 'communication' && <CommunicationSupportTab />}

          {/* Governance Tab */}
          {activeTab === 'governance' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-[var(--dq-navy-950)]">Content Governance & Compliance</h1>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: CheckCircle, label: 'Approved Content', value: '342', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { icon: Clock, label: 'Pending Review', value: '28', color: 'text-amber-600', bg: 'bg-amber-50' },
                  { icon: ShieldIcon, label: 'Compliance Score', value: '94%', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: AlertTriangle, label: 'Issues Found', value: '12', color: 'text-red-600', bg: 'bg-red-50' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div className="text-[32px] leading-[40px] font-semibold mb-1 text-[var(--dq-navy-950)]">{stat.value}</div>
                    <div className="text-[13px] leading-[18px] font-normal text-[var(--dq-text-secondary)]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Governance Sub-Tabs */}
              <Tabs value={governanceSubTab} onValueChange={(value: any) => setGovernanceSubTab(value)} className="w-full">
                <TabsList className="bg-white border border-[var(--dq-surface-border-default)] p-1 rounded-xl mb-6">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-[var(--dq-orange-500)] data-[state=active]:text-white">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="workflow" className="data-[state=active]:bg-[var(--dq-orange-500)] data-[state=active]:text-white">
                    Workflow
                  </TabsTrigger>
                  <TabsTrigger value="reporting" className="data-[state=active]:bg-[var(--dq-orange-500)] data-[state=active]:text-white">
                    Reporting
                  </TabsTrigger>
                  <TabsTrigger value="scanning" className="data-[state=active]:bg-[var(--dq-orange-500)] data-[state=active]:text-white">
                    Scanning
                  </TabsTrigger>
                  <TabsTrigger value="policies" className="data-[state=active]:bg-[var(--dq-orange-500)] data-[state=active]:text-white">
                    Policies
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-[var(--dq-orange-500)] data-[state=active]:text-white">
                    Activity
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0">
                  <div className="grid lg:grid-cols-2 gap-6">
                {/* Content CMS & Moderation */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[var(--dq-orange-50)] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-[var(--dq-orange-500)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold mb-2 text-[var(--dq-navy-950)]">Content CMS & Moderation</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Review and moderate course content for quality and compliance. Ensure all materials meet institutional standards.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Pending Reviews</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">28 items</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Avg Review Time</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">2.4 days</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setShowReviewContentModal(true)}
                    className="w-full bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white shadow-sm"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Review Content
                  </Button>
                </div>

                {/* Accessibility Standards */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold mb-2 text-[var(--dq-navy-950)]">Accessibility Standards</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Ensure all content meets WCAG 2.1 AA accessibility requirements for inclusive learning.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">WCAG 2.1 AA Compliant</span>
                      </div>
                      <span className="text-[15px] leading-[22px] font-semibold text-emerald-600">89%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Issues to Fix</span>
                      </div>
                      <span className="text-[15px] leading-[22px] font-semibold text-amber-600">34</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => toast({ title: "Accessibility Audit", description: "Running accessibility audit..." })}
                    variant="outline"
                    className="w-full border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Run Accessibility Audit
                  </Button>
                </div>

                {/* Copyright & IP Protection */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <ShieldIcon className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold mb-2 text-[var(--dq-navy-950)]">Copyright & IP Protection</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Monitor and protect intellectual property. Detect plagiarism and unauthorized content usage.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Content Scanned</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">1,247 items</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Violations Detected</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-red-600">3</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => toast({ title: "Plagiarism Check", description: "Scanning content for plagiarism..." })}
                    variant="outline"
                    className="w-full border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                  >
                    <ShieldIcon className="w-4 h-4 mr-2" />
                    Run Plagiarism Check
                  </Button>
                </div>

                {/* Data Privacy & GDPR */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold mb-2 text-[var(--dq-navy-950)]">Data Privacy & GDPR</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Ensure compliance with GDPR, FERPA, and other data protection regulations.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">GDPR Compliant</span>
                      </div>
                      <span className="text-[15px] leading-[22px] font-semibold text-emerald-600">Yes</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Data Requests</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">7 pending</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => toast({ title: "Privacy Audit", description: "Reviewing data privacy compliance..." })}
                    variant="outline"
                    className="w-full border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    View Privacy Dashboard
                  </Button>
                </div>

                {/* Quality Assurance */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Star className="w-7 h-7 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold mb-2 text-[var(--dq-navy-950)]">Quality Assurance</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Monitor content quality metrics and learner feedback to maintain high standards.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Avg Quality Score</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">4.6/5.0</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Courses Audited</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">156/180</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => toast({ title: "Quality Report", description: "Generating quality assurance report..." })}
                    variant="outline"
                    className="w-full border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    View Quality Reports
                  </Button>
                </div>

                {/* Version Control & Audit Trail */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold mb-2 text-[var(--dq-navy-950)]">Version Control & Audit Trail</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Track all content changes and maintain comprehensive audit logs for compliance.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Content Versions</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">2,847</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                      <span className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">Recent Changes</span>
                      <span className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)]">142 today</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => toast({ title: "Audit Trail", description: "Loading audit trail..." })}
                    variant="outline"
                    className="w-full border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    View Audit Trail
                  </Button>
                </div>
              </div>
            </TabsContent>

                {/* Workflow Tab */}
                <TabsContent value="workflow" className="mt-0">
                  {/* Content Workflow Management */}
                  <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Content Workflow Management</h2>
                        <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                          Configure approval workflows and content lifecycle stages
                        </p>
                      </div>
                      <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Workflow
                      </Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {[
                        { 
                          stage: 'Draft', 
                          count: 45, 
                          color: 'bg-[var(--dq-gray-50)]', 
                          textColor: 'text-[var(--dq-text-secondary)]',
                          icon: FileText 
                        },
                        { 
                          stage: 'In Review', 
                          count: 28, 
                          color: 'bg-amber-50', 
                          textColor: 'text-amber-700',
                          icon: Clock 
                        },
                        { 
                          stage: 'Published', 
                          count: 342, 
                          color: 'bg-emerald-50', 
                          textColor: 'text-emerald-700',
                          icon: CheckCircle 
                        },
                      ].map((workflow) => (
                        <div key={workflow.stage} className={`${workflow.color} rounded-xl p-6 border border-[var(--dq-surface-border-default)]`}>
                          <div className="flex items-center gap-3 mb-4">
                            <workflow.icon className={`w-6 h-6 ${workflow.textColor}`} />
                            <h3 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)]">{workflow.stage}</h3>
                          </div>
                          <div className="text-[32px] leading-[40px] font-bold text-[var(--dq-navy-950)] mb-2">{workflow.count}</div>
                          <p className="text-[13px] leading-[18px] font-normal text-[var(--dq-text-secondary)]">Content items</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-4 w-full hover:bg-white/50 hover:text-[var(--dq-orange-500)]"
                          >
                            View Details →
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Reporting Tab */}
                <TabsContent value="reporting" className="mt-0">
                  {/* Compliance Reporting */}
                  <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Compliance Reporting</h2>
                        <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                          Generate and export compliance reports for audits and regulatory requirements
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'WCAG Compliance', value: '89%', status: 'good', icon: Eye },
                        { label: 'GDPR Compliance', value: '100%', status: 'excellent', icon: Lock },
                        { label: 'Copyright Clear', value: '97%', status: 'good', icon: ShieldIcon },
                        { label: 'Quality Score', value: '4.6/5', status: 'excellent', icon: Star },
                      ].map((metric) => (
                        <div key={metric.label} className="bg-[var(--dq-gray-50)] rounded-xl p-5 border border-[var(--dq-surface-border-default)]">
                          <div className="flex items-center gap-2 mb-3">
                            <metric.icon className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                            <span className="text-[13px] leading-[18px] font-medium text-[var(--dq-text-secondary)]">{metric.label}</span>
                          </div>
                          <div className="text-[24px] leading-[32px] font-bold text-[var(--dq-navy-950)]">{metric.value}</div>
                          <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-lg text-[11px] font-semibold ${
                            metric.status === 'excellent' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' : 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]'
                          }`}>
                            {metric.status === 'excellent' ? '✓ Excellent' : '⚠ Needs Attention'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Scanning Tab */}
                <TabsContent value="scanning" className="mt-0">
                  {/* Automated Content Scanning */}
                  <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Automated Content Scanning</h2>
                        <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                          Configure automated scans for accessibility, plagiarism, and quality checks
                        </p>
                      </div>
                      <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure Scans
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          name: 'Accessibility Scan', 
                          schedule: 'Daily at 2:00 AM', 
                          lastRun: '2 hours ago', 
                          status: 'active',
                          issues: 34 
                        },
                        { 
                          name: 'Plagiarism Detection', 
                          schedule: 'On content upload', 
                          lastRun: '15 minutes ago', 
                          status: 'active',
                          issues: 3 
                        },
                        { 
                          name: 'Quality Assessment', 
                          schedule: 'Weekly on Monday', 
                          lastRun: '3 days ago', 
                          status: 'active',
                          issues: 12 
                        },
                        { 
                          name: 'Link Validation', 
                          schedule: 'Daily at 3:00 AM', 
                          lastRun: '1 hour ago', 
                          status: 'active',
                          issues: 8 
                        },
                      ].map((scan) => (
                        <div key={scan.name} className="flex items-center justify-between p-5 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-100)] transition-colors">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[var(--dq-surface-border-default)]">
                              <Settings className="w-6 h-6 text-[var(--dq-orange-500)]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)] mb-1">{scan.name}</h3>
                              <div className="flex items-center gap-4 text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">
                                <span>Schedule: {scan.schedule}</span>
                                <span>•</span>
                                <span>Last run: {scan.lastRun}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-[18px] leading-[24px] font-bold text-[var(--dq-navy-950)]">{scan.issues}</div>
                              <div className="text-[12px] leading-[16px] text-[var(--dq-text-secondary)]">Issues</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="text-[13px] leading-[18px] font-medium text-emerald-600">Active</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-white hover:text-[var(--dq-orange-500)]"
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Policies Tab */}
                <TabsContent value="policies" className="mt-0">
                  {/* Policy & Standards Management */}
                  <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Policy & Standards Management</h2>
                        <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                          Define and enforce content policies, guidelines, and institutional standards
                        </p>
                      </div>
                      <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Policy
                      </Button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {[
                        {
                          title: 'Content Quality Standards',
                          description: 'Minimum requirements for course content quality and presentation',
                          rules: 12,
                          enforced: true,
                          icon: Star,
                          color: 'bg-amber-50'
                        },
                        {
                          title: 'Accessibility Guidelines',
                          description: 'WCAG 2.1 AA compliance requirements for all learning materials',
                          rules: 8,
                          enforced: true,
                          icon: Eye,
                          color: 'bg-purple-50'
                        },
                        {
                          title: 'Copyright Policy',
                          description: 'Rules for using third-party content and intellectual property',
                          rules: 15,
                          enforced: true,
                          icon: ShieldIcon,
                          color: 'bg-purple-50'
                        },
                        {
                          title: 'Data Privacy Standards',
                          description: 'GDPR and FERPA compliance requirements for learner data',
                          rules: 10,
                          enforced: true,
                          icon: Lock,
                          color: 'bg-green-50'
                        },
                      ].map((policy) => (
                        <div key={policy.title} className="bg-[var(--dq-gray-50)] rounded-xl p-6 border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-14 h-14 rounded-xl ${policy.color} flex items-center justify-center flex-shrink-0`}>
                              <policy.icon className="w-7 h-7 text-[var(--dq-navy-950)]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-2">{policy.title}</h3>
                              <p className="text-[13px] leading-[18px] font-normal text-[var(--dq-text-secondary)]">{policy.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-[var(--dq-surface-border-default)]">
                            <div className="flex items-center gap-4">
                              <div className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">
                                <span className="font-semibold text-[var(--dq-navy-950)]">{policy.rules}</span> rules
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-[13px] leading-[18px] font-medium text-emerald-600">Enforced</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-white hover:text-[var(--dq-orange-500)]"
                            >
                              Edit Policy →
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="mt-0">
                  {/* Recent Activity & Alerts */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                      <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)] mb-5">Recent Activity</h2>
                      <div className="space-y-4">
                        {[
                          { action: 'Content approved', item: 'Digital Marketing 101', time: '5 minutes ago', type: 'success' },
                          { action: 'Accessibility issue detected', item: 'Python Basics', time: '12 minutes ago', type: 'warning' },
                          { action: 'Policy violation flagged', item: 'Web Development', time: '1 hour ago', type: 'error' },
                          { action: 'Quality review completed', item: 'Data Science Course', time: '2 hours ago', type: 'success' },
                          { action: 'Content updated', item: 'Machine Learning', time: '3 hours ago', type: 'info' },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-[var(--dq-gray-50)] rounded-xl hover:bg-[var(--dq-gray-100)] transition-colors">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              activity.type === 'success' ? 'bg-emerald-500' :
                              activity.type === 'warning' ? 'bg-amber-500' :
                              activity.type === 'error' ? 'bg-red-500' : 'bg-[var(--dq-orange-500)]'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] leading-[20px] font-medium text-[var(--dq-navy-950)]">{activity.action}</p>
                              <p className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)] truncate">{activity.item}</p>
                              <p className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 hover:bg-[var(--dq-gray-50)] hover:text-[var(--dq-orange-500)]"
                      >
                        View All Activity →
                      </Button>
                    </div>

                    {/* Compliance Alerts */}
                    <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Compliance Alerts</h2>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">12 Active</Badge>
                      </div>
                      <div className="space-y-4">
                        {[
                          { 
                            severity: 'high', 
                            title: 'Copyright violation detected', 
                            course: 'Web Development Bootcamp',
                            action: 'Review Required'
                          },
                          { 
                            severity: 'medium', 
                            title: 'Accessibility issues found', 
                            course: 'Python for Beginners',
                            action: 'Fix Issues'
                          },
                          { 
                            severity: 'high', 
                            title: 'GDPR data request pending', 
                            course: 'User: john.doe@example.com',
                            action: 'Process Request'
                          },
                          { 
                            severity: 'low', 
                            title: 'Quality score below threshold', 
                            course: 'Introduction to AI',
                            action: 'Review Content'
                          },
                        ].map((alert, index) => (
                          <div key={index} className={`p-4 rounded-xl border-2 ${
                            alert.severity === 'high' ? 'bg-red-50 border-red-200' :
                            alert.severity === 'medium' ? 'bg-amber-50 border-amber-200' :
                            'bg-purple-50 border-purple-200'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className={`w-5 h-5 ${
                                  alert.severity === 'high' ? 'text-red-600' :
                                  alert.severity === 'medium' ? 'text-amber-600' :
                                  'text-purple-600'
                                }`} />
                                <span className={`text-[11px] leading-[16px] font-bold uppercase tracking-wide ${
                                  alert.severity === 'high' ? 'text-red-700' :
                                  alert.severity === 'medium' ? 'text-amber-700' :
                                  'text-purple-700'
                                }`}>
                                  {alert.severity} Priority
                                </span>
                              </div>
                            </div>
                            <h3 className="text-[14px] leading-[20px] font-semibold text-[var(--dq-navy-950)] mb-1">{alert.title}</h3>
                            <p className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)] mb-3">{alert.course}</p>
                            <Button 
                              size="sm"
                              className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white text-[12px] h-8"
                            >
                              {alert.action} →
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Organizations Tab */}
          {activeTab === 'organizations' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-[var(--dq-navy-950)]">Organization & Integration Management</h1>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: Building2, label: 'Active Organizations', value: '24', color: 'text-[var(--dq-orange-500)]', bg: 'bg-[var(--dq-orange-50)]' },
                  { icon: Users2, label: 'Total Users', value: '1,847', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { icon: Globe, label: 'Active Integrations', value: '12', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: TrendingUp, label: 'API Calls Today', value: '45.2K', color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div className="text-[32px] leading-[40px] font-semibold mb-1 text-[var(--dq-navy-950)]">{stat.value}</div>
                    <div className="text-[13px] leading-[18px] font-normal text-[var(--dq-text-secondary)]">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                {/* Organization Management */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Organization Management</h2>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Manage organizational accounts, multi-tenant access, and hierarchies
                      </p>
                    </div>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Organization
                    </Button>
                  </div>

                  {/* Organizations List */}
                  <div className="space-y-4">
                    {[
                      { 
                        name: 'DTMA Academy', 
                        type: 'Enterprise', 
                        users: 450, 
                        courses: 28, 
                        status: 'active',
                        plan: 'Enterprise Plus',
                        renewal: 'Dec 2026'
                      },
                      { 
                        name: 'Tech University', 
                        type: 'Educational', 
                        users: 1200, 
                        courses: 45, 
                        status: 'active',
                        plan: 'Academic',
                        renewal: 'Mar 2027'
                      },
                      { 
                        name: 'Corporate Training Co', 
                        type: 'Corporate', 
                        users: 85, 
                        courses: 12, 
                        status: 'active',
                        plan: 'Business',
                        renewal: 'Aug 2026'
                      },
                      { 
                        name: 'Startup Accelerator', 
                        type: 'Startup', 
                        users: 112, 
                        courses: 8, 
                        status: 'trial',
                        plan: 'Trial',
                        renewal: 'May 2026'
                      },
                    ].map((org, index) => (
                      <div key={index} className="flex items-center justify-between p-6 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center border border-[var(--dq-surface-border-default)]">
                            <Building2 className="w-8 h-8 text-[var(--dq-orange-500)]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)]">{org.name}</h3>
                              <Badge className={`${
                                org.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' : 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]'
                              }`}>
                                {org.status === 'active' ? 'Active' : 'Trial'}
                              </Badge>
                              <Badge variant="outline" className="border-[var(--dq-surface-border-default)]">{org.type}</Badge>
                            </div>
                            <div className="flex items-center gap-6 text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">
                              <span><span className="font-semibold text-[var(--dq-navy-950)]">{org.users}</span> users</span>
                              <span>•</span>
                              <span><span className="font-semibold text-[var(--dq-navy-950)]">{org.courses}</span> courses</span>
                              <span>•</span>
                              <span>Plan: <span className="font-semibold text-[var(--dq-navy-950)]">{org.plan}</span></span>
                              <span>•</span>
                              <span>Renewal: {org.renewal}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                            <Settings className="w-4 h-4 mr-2" />
                            Manage
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                              <DropdownMenuItem>Manage Users</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External Integrations */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">External Integrations</h2>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Configure integrations with external systems, LMS platforms, and APIs
                      </p>
                    </div>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Integration
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {[
                      {
                        name: 'Canvas LMS',
                        type: 'LMS Platform',
                        status: 'connected',
                        lastSync: '2 hours ago',
                        icon: BookOpen,
                        color: 'bg-[var(--dq-orange-50)]',
                        iconColor: 'text-[var(--dq-orange-500)]'
                      },
                      {
                        name: 'Zoom',
                        type: 'Video Conferencing',
                        status: 'connected',
                        lastSync: '15 minutes ago',
                        icon: Video,
                        color: 'bg-indigo-50',
                        iconColor: 'text-indigo-600'
                      },
                      {
                        name: 'Stripe',
                        type: 'Payment Gateway',
                        status: 'connected',
                        lastSync: '1 hour ago',
                        icon: DollarSign,
                        color: 'bg-purple-50',
                        iconColor: 'text-purple-600'
                      },
                      {
                        name: 'Google Workspace',
                        type: 'SSO Provider',
                        status: 'connected',
                        lastSync: '30 minutes ago',
                        icon: Globe,
                        color: 'bg-red-50',
                        iconColor: 'text-red-600'
                      },
                      {
                        name: 'Salesforce',
                        type: 'CRM',
                        status: 'pending',
                        lastSync: 'Not synced',
                        icon: Users2,
                        color: 'bg-cyan-50',
                        iconColor: 'text-cyan-600'
                      },
                      {
                        name: 'Slack',
                        type: 'Communication',
                        status: 'connected',
                        lastSync: '5 minutes ago',
                        icon: MessageSquare,
                        color: 'bg-pink-50',
                        iconColor: 'text-pink-600'
                      },
                    ].map((integration, index) => (
                      <div key={index} className="bg-[var(--dq-gray-50)] rounded-xl p-6 border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl ${integration.color} flex items-center justify-center flex-shrink-0`}>
                            <integration.icon className={`w-7 h-7 ${integration.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)]">{integration.name}</h3>
                              <div className={`flex items-center gap-1 ${
                                integration.status === 'connected' ? 'text-emerald-600' : 'text-amber-600'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  integration.status === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}></div>
                                <span className="text-[12px] leading-[16px] font-medium capitalize">{integration.status}</span>
                              </div>
                            </div>
                            <p className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)] mb-1">{integration.type}</p>
                            <p className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)]">Last sync: {integration.lastSync}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-4 border-t border-[var(--dq-surface-border-default)]">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-white hover:text-[var(--dq-orange-500)]"
                          >
                            Test
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Management */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">API Management</h2>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Manage API keys, webhooks, and developer access
                      </p>
                    </div>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate API Key
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {[
                      { label: 'API Keys', value: '8', icon: LinkIcon },
                      { label: 'Webhooks', value: '12', icon: Send },
                      { label: 'Rate Limit', value: '10K/hr', icon: TrendingUp },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-[var(--dq-gray-50)] rounded-xl p-5 border border-[var(--dq-surface-border-default)]">
                        <div className="flex items-center gap-2 mb-3">
                          <metric.icon className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                          <span className="text-[13px] leading-[18px] font-medium text-[var(--dq-text-secondary)]">{metric.label}</span>
                        </div>
                        <div className="text-[28px] leading-[36px] font-bold text-[var(--dq-navy-950)]">{metric.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* API Keys List */}
                  <div className="space-y-3">
                    {[
                      { name: 'Production API Key', created: 'Jan 15, 2026', lastUsed: '2 hours ago', status: 'active' },
                      { name: 'Development API Key', created: 'Feb 20, 2026', lastUsed: '1 day ago', status: 'active' },
                      { name: 'Testing API Key', created: 'Mar 10, 2026', lastUsed: 'Never', status: 'inactive' },
                    ].map((key, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)]">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[var(--dq-surface-border-default)]">
                            <LinkIcon className="w-5 h-5 text-[var(--dq-orange-500)]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[14px] leading-[20px] font-semibold text-[var(--dq-navy-950)] mb-1">{key.name}</h3>
                            <div className="flex items-center gap-4 text-[12px] leading-[16px] text-[var(--dq-text-secondary)]">
                              <span>Created: {key.created}</span>
                              <span>•</span>
                              <span>Last used: {key.lastUsed}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${
                            key.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' : 'bg-[var(--dq-gray-50)] text-[var(--dq-text-disabled)]'
                          }`}>
                            {key.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SSO Configuration */}
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Single Sign-On (SSO)</h2>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)]">
                        Configure SAML, OAuth, and other SSO providers for seamless authentication
                      </p>
                    </div>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add SSO Provider
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {[
                      { provider: 'Google Workspace', type: 'OAuth 2.0', users: 450, status: 'active' },
                      { provider: 'Microsoft Azure AD', type: 'SAML 2.0', users: 320, status: 'active' },
                      { provider: 'Okta', type: 'SAML 2.0', users: 180, status: 'active' },
                    ].map((sso, index) => (
                      <div key={index} className="bg-[var(--dq-gray-50)] rounded-xl p-6 border border-[var(--dq-surface-border-default)]">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[var(--dq-surface-border-default)]">
                            <ShieldIcon className="w-5 h-5 text-[var(--dq-orange-500)]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[12px] leading-[16px] font-medium text-emerald-600">Active</span>
                          </div>
                        </div>
                        <h3 className="text-[15px] leading-[22px] font-semibold text-[var(--dq-navy-950)] mb-1">{sso.provider}</h3>
                        <p className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)] mb-3">{sso.type}</p>
                        <div className="text-[12px] leading-[16px] text-[var(--dq-text-secondary)]">
                          <span className="font-semibold text-[var(--dq-navy-950)]">{sso.users}</span> users authenticated
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full mt-4 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                        >
                          Configure
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Certification Tab */}
          {activeTab === 'certification' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[var(--dq-navy-950)]">Certification & Customer Success</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[var(--dq-text-secondary)]">Manage certificates, badges, and learner achievements</p>
              </div>

              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">2,847</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Certificates Issued</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>+234 this month</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">78%</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Completion Rate</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+5% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">1,234</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Active Learners</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-[var(--dq-text-secondary)] font-medium">
                    <span>Pursuing certifications</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Star className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">4.7★</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Avg Satisfaction</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-amber-600 font-medium">
                    <Star className="w-4 h-4 fill-amber-600" />
                    <span>Based on 1,847 reviews</span>
                  </div>
                </div>
              </div>

              {/* Certificate Template Management */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-2xl flex items-center justify-center shadow-sm">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Certificate Template Management</h2>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                      Design and manage certificate templates for courses and achievements
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowCreateTemplateModal(true)}
                    className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </div>

                {/* Template List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      name: 'Course Completion Certificate', 
                      type: 'Course', 
                      courses: 28, 
                      issued: 1847,
                      status: 'active',
                      preview: '📜',
                      gradient: 'from-[var(--dq-orange-500)]/10 to-[var(--dq-orange-500)]/5'
                    },
                    { 
                      name: 'Professional Achievement Badge', 
                      type: 'Badge', 
                      courses: 12, 
                      issued: 543,
                      status: 'active',
                      preview: '🏆',
                      gradient: 'from-amber-50 to-amber-100/50'
                    },
                    { 
                      name: 'Specialization Certificate', 
                      type: 'Specialization', 
                      courses: 6, 
                      issued: 287,
                      status: 'active',
                      preview: '🎓',
                      gradient: 'from-purple-50 to-purple-100/50'
                    },
                    { 
                      name: 'Micro-Credential Certificate', 
                      type: 'Micro', 
                      courses: 15, 
                      issued: 892,
                      status: 'active',
                      preview: '⭐',
                      gradient: 'from-emerald-50 to-emerald-100/50'
                    },
                    { 
                      name: 'Executive Program Certificate', 
                      type: 'Executive', 
                      courses: 4, 
                      issued: 156,
                      status: 'draft',
                      preview: '👔',
                      gradient: 'from-blue-50 to-blue-100/50'
                    },
                    { 
                      name: 'Team Achievement Award', 
                      type: 'Team', 
                      courses: 8, 
                      issued: 234,
                      status: 'active',
                      preview: '👥',
                      gradient: 'from-pink-50 to-pink-100/50'
                    },
                  ].map((template, index) => (
                    <div key={index} className={`bg-gradient-to-br ${template.gradient} rounded-xl p-6 border border-[var(--dq-surface-border-default)] hover:shadow-md transition-all cursor-pointer`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl">
                          {template.preview}
                        </div>
                        <Badge className={`${
                          template.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] border-emerald-200' : 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)] border-amber-200'
                        } border`}>
                          {template.status}
                        </Badge>
                      </div>
                      <h3 className="text-[16px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-2">{template.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className="border-[var(--dq-surface-border-default)] text-[var(--dq-text-secondary)] bg-white">{template.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-[13px] text-[var(--dq-text-secondary)] mb-4">
                        <span><span className="font-semibold text-[var(--dq-navy-950)]">{template.courses}</span> courses</span>
                        <span><span className="font-semibold text-[var(--dq-navy-950)]">{template.issued}</span> issued</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-[var(--dq-surface-border-default)] bg-white hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                          onClick={() => {
                            setPreviewTemplate(template);
                            toast({
                              title: "Preview Template",
                              description: `Viewing ${template.name}`,
                            });
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="bg-white hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]"
                          onClick={() => {
                            setEditingTemplate(template);
                            toast({
                              title: "Edit Template",
                              description: `Editing ${template.name}`,
                            });
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Issuance & Verification */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)] mb-2">Certificate Issuance</h2>
                      <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                        Automated and manual certificate generation and distribution
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Auto-Issue on Completion', value: 'Enabled', status: 'active' },
                      { label: 'Manual Review Required', value: 'Disabled', status: 'inactive' },
                      { label: 'Email Delivery', value: 'Enabled', status: 'active' },
                      { label: 'Blockchain Verification', value: 'Enabled', status: 'active' },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-surface-border-default)] transition-colors">
                        <span className="text-[14px] font-medium text-[var(--dq-navy-950)]">{setting.label}</span>
                        <div className="flex items-center gap-3">
                          <Badge className={`${
                            setting.status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                          } border`}>
                            {setting.value}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-white hover:text-[var(--dq-orange-500)]"
                            onClick={() => {
                              toast({
                                title: "Settings",
                                description: `Configure ${setting.label}`,
                              });
                            }}
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setShowIssuanceRulesModal(true)}
                    className="w-full mt-6 bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white shadow-sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Issuance Rules
                  </Button>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)] mb-2">Certificate Verification</h2>
                      <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                        Verify authenticity of issued certificates
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                        <span className="text-[14px] font-semibold text-purple-900">Verification Methods</span>
                      </div>
                      <div className="space-y-2 text-[13px] text-purple-700">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                          <span>Certificate ID Lookup</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                          <span>QR Code Scanning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                          <span>Blockchain Validation</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)] text-center">
                        <div className="text-[24px] font-bold text-[var(--dq-navy-950)] mb-1">2,847</div>
                        <div className="text-[12px] text-[var(--dq-text-secondary)]">Verified Today</div>
                      </div>
                      <div className="p-4 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)] text-center">
                        <div className="text-[24px] font-bold text-[var(--dq-navy-950)] mb-1">99.8%</div>
                        <div className="text-[12px] text-[var(--dq-text-secondary)]">Success Rate</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setShowVerifyCertificateModal(true)}
                    variant="outline"
                    className="w-full border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify Certificate
                  </Button>
                </div>
              </div>

              {/* Customer Success Tracking */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--dq-orange-500)] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Customer Success Tracking</h2>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                      Monitor learner success metrics, engagement, and satisfaction
                    </p>
                  </div>
                  <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>

                {/* Success Metrics */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Target, label: 'Goal Achievement', value: '82%', trend: '+5%', up: true },
                    { icon: Clock, label: 'Avg Time to Complete', value: '6.2 weeks', trend: '-0.8 weeks', up: true },
                    { icon: TrendingUp, label: 'Career Advancement', value: '67%', trend: '+12%', up: true },
                    { icon: Star, label: 'NPS Score', value: '72', trend: '+8', up: true },
                  ].map((metric) => (
                    <div key={metric.label} className="bg-[var(--dq-gray-50)] rounded-xl p-5 border border-[var(--dq-surface-border-default)]">
                      <div className="flex items-center gap-2 mb-3">
                        <metric.icon className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                        <span className="text-[12px] font-medium text-[var(--dq-text-secondary)]">{metric.label}</span>
                      </div>
                      <div className="text-[24px] font-bold text-[var(--dq-navy-950)] mb-1">{metric.value}</div>
                      <div className={`text-[12px] font-medium ${metric.up ? 'text-emerald-600' : 'text-red-600'}`}>
                        {metric.trend}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Learner Journey Stages */}
                <div className="mb-8">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-4">Learner Journey Stages</h3>
                  <div className="grid md:grid-cols-5 gap-4">
                    {[
                      { stage: 'Onboarding', count: 234, color: 'bg-purple-500' },
                      { stage: 'Active Learning', count: 892, color: 'bg-[var(--dq-orange-500)]' },
                      { stage: 'Near Completion', count: 156, color: 'bg-amber-500' },
                      { stage: 'Completed', count: 1847, color: 'bg-emerald-500' },
                      { stage: 'At Risk', count: 67, color: 'bg-red-500' },
                    ].map((stage) => (
                      <div key={stage.stage} className="bg-white rounded-xl p-5 border-2 border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                        <div className={`w-3 h-3 rounded-full ${stage.color} mb-3`}></div>
                        <div className="text-[28px] font-bold text-[var(--dq-navy-950)] mb-1">{stage.count}</div>
                        <div className="text-[13px] text-[var(--dq-text-secondary)]">{stage.stage}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Success Stories */}
                <div>
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[var(--dq-navy-950)] mb-4">Recent Success Stories</h3>
                  <div className="space-y-3">
                    {[
                      { 
                        learner: 'Sarah Johnson', 
                        achievement: 'Completed Digital Transformation Specialization', 
                        outcome: 'Promoted to Senior Manager',
                        date: '2 days ago',
                        rating: 5
                      },
                      { 
                        learner: 'Ahmed Al-Mansoori', 
                        achievement: 'Earned 6 Professional Certificates', 
                        outcome: 'Started new role at Fortune 500',
                        date: '5 days ago',
                        rating: 5
                      },
                      { 
                        learner: 'Maria Garcia', 
                        achievement: 'Mastered Economy 4.0 Course', 
                        outcome: 'Led digital initiative at company',
                        date: '1 week ago',
                        rating: 4
                      },
                    ].map((story, index) => (
                      <div key={index} className="flex items-start gap-4 p-5 bg-[var(--dq-gray-50)] rounded-xl border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-[var(--dq-orange-500)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {story.learner.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-[15px] font-semibold text-[var(--dq-navy-950)]">{story.learner}</h4>
                              <p className="text-[13px] text-[var(--dq-text-secondary)]">{story.achievement}</p>
                            </div>
                            <span className="text-[12px] text-[var(--dq-text-disabled)]">{story.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {story.outcome}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: story.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badge & Micro-Credentials */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Digital Badges & Micro-Credentials</h2>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                      Manage stackable credentials and achievement badges
                    </p>
                  </div>
                  <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white" onClick={() => setShowCreateBadgeModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Badge
                  </Button>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { name: 'AI Mastery', earned: 234, icon: '🤖', color: 'bg-purple-50' },
                    { name: 'Leadership Excellence', earned: 189, icon: '👑', color: 'bg-amber-50' },
                    { name: 'Innovation Champion', earned: 156, icon: '💡', color: 'bg-emerald-50' },
                    { name: 'Digital Pioneer', earned: 298, icon: '🚀', color: 'bg-[var(--dq-orange-50)]' },
                  ].map((badge, index) => (
                    <div key={index} className={`${badge.color} rounded-xl p-6 border border-[var(--dq-surface-border-default)] text-center hover:shadow-md transition-shadow`}>
                      <div className="text-5xl mb-3">{badge.icon}</div>
                      <h3 className="text-[15px] font-semibold text-[var(--dq-navy-950)] mb-2">{badge.name}</h3>
                      <div className="text-[13px] text-[var(--dq-text-secondary)]">
                        <span className="font-bold text-[var(--dq-navy-950)]">{badge.earned}</span> earned
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Template Modal */}
              {showCreateTemplateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-[var(--dq-surface-border-default)] p-6 flex items-center justify-between">
                      <h2 className="text-[24px] font-semibold text-[var(--dq-navy-950)]">Create Certificate Template</h2>
                      <button onClick={() => setShowCreateTemplateModal(false)} className="p-2 hover:bg-[var(--dq-gray-50)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Template Name</label>
                        <input
                          type="text"
                          value={certificateTemplateForm.name}
                          onChange={(e) => setCertificateTemplateForm({ ...certificateTemplateForm, name: e.target.value })}
                          className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                          placeholder="e.g., Professional Certificate"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Template Type</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['course', 'badge', 'specialization', 'micro', 'executive', 'team'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setCertificateTemplateForm({ ...certificateTemplateForm, type: type as any })}
                              className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                                certificateTemplateForm.type === type
                                  ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
                                  : 'border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Description</label>
                        <textarea
                          value={certificateTemplateForm.description}
                          onChange={(e) => setCertificateTemplateForm({ ...certificateTemplateForm, description: e.target.value })}
                          className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)] min-h-[100px]"
                          placeholder="Describe the certificate template..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Orientation</label>
                          <select
                            value={certificateTemplateForm.orientation}
                            onChange={(e) => setCertificateTemplateForm({ ...certificateTemplateForm, orientation: e.target.value as any })}
                            className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                          >
                            <option value="landscape">Landscape</option>
                            <option value="portrait">Portrait</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Border Style</label>
                          <select
                            value={certificateTemplateForm.borderStyle}
                            onChange={(e) => setCertificateTemplateForm({ ...certificateTemplateForm, borderStyle: e.target.value as any })}
                            className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                          >
                            <option value="classic">Classic</option>
                            <option value="modern">Modern</option>
                            <option value="minimal">Minimal</option>
                            <option value="elegant">Elegant</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-3">Include Elements</label>
                        <div className="space-y-3">
                          {[
                            { key: 'includeQRCode', label: 'QR Code for Verification' },
                            { key: 'includeSignature', label: 'Digital Signature' },
                            { key: 'includeDate', label: 'Issue Date' },
                            { key: 'includeCredentialID', label: 'Credential ID' },
                          ].map((element) => (
                            <label key={element.key} className="flex items-center gap-3 p-3 bg-[var(--dq-gray-50)] rounded-lg cursor-pointer hover:bg-[var(--dq-surface-border-default)] transition-colors">
                              <input
                                type="checkbox"
                                checked={certificateTemplateForm[element.key as keyof typeof certificateTemplateForm] as boolean}
                                onChange={(e) => setCertificateTemplateForm({ ...certificateTemplateForm, [element.key]: e.target.checked })}
                                className="w-5 h-5 text-[var(--dq-orange-500)] rounded focus:ring-[var(--dq-orange-500)]"
                              />
                              <span className="text-[14px] text-[var(--dq-navy-950)]">{element.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-[var(--dq-surface-border-default)]">
                        <Button
                          variant="outline"
                          className="flex-1 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]"
                          onClick={() => setShowCreateTemplateModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white"
                          onClick={() => {
                            toast({ title: "Template Created", description: `"${certificateTemplateForm.name}" has been created successfully.` });
                            setShowCreateTemplateModal(false);
                            setCertificateTemplateForm({
                              name: '',
                              type: 'course',
                              description: '',
                              orientation: 'landscape',
                              backgroundColor: '#ffffff',
                              borderStyle: 'classic',
                              includeQRCode: true,
                              includeSignature: true,
                              includeDate: true,
                              includeCredentialID: true,
                            });
                          }}
                        >
                          Create Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Create Badge Modal */}
              {showCreateBadgeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-[var(--dq-surface-border-default)] p-6 flex items-center justify-between">
                      <h2 className="text-[24px] font-semibold text-[var(--dq-navy-950)]">Create Digital Badge</h2>
                      <button onClick={() => setShowCreateBadgeModal(false)} className="p-2 hover:bg-[var(--dq-gray-50)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Badge Name</label>
                        <input
                          type="text"
                          value={badgeForm.name}
                          onChange={(e) => setBadgeForm({ ...badgeForm, name: e.target.value })}
                          className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                          placeholder="e.g., AI Mastery"
                        />
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Badge Icon</label>
                        <div className="grid grid-cols-6 gap-3">
                          {['🏆', '⭐', '🎓', '💡', '🚀', '👑', '🤖', '💪', '🎯', '🔥', '✨', '🌟'].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => setBadgeForm({ ...badgeForm, icon: emoji })}
                              className={`text-3xl p-4 rounded-lg border-2 transition-all ${
                                badgeForm.icon === emoji
                                  ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10'
                                  : 'border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Category</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['achievement', 'skill', 'milestone', 'special'].map((category) => (
                            <button
                              key={category}
                              onClick={() => setBadgeForm({ ...badgeForm, category: category as any })}
                              className={`px-4 py-3 rounded-lg border-2 text-[14px] font-medium capitalize transition-all ${
                                badgeForm.category === category
                                  ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
                                  : 'border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Description</label>
                        <textarea
                          value={badgeForm.description}
                          onChange={(e) => setBadgeForm({ ...badgeForm, description: e.target.value })}
                          className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)] min-h-[80px]"
                          placeholder="Describe what this badge represents..."
                        />
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Earning Criteria</label>
                        <textarea
                          value={badgeForm.criteria}
                          onChange={(e) => setBadgeForm({ ...badgeForm, criteria: e.target.value })}
                          className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)] min-h-[80px]"
                          placeholder="What must learners do to earn this badge?"
                        />
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Points Value</label>
                        <input
                          type="number"
                          value={badgeForm.points}
                          onChange={(e) => setBadgeForm({ ...badgeForm, points: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                          min="0"
                        />
                      </div>

                      <label className="flex items-center gap-3 p-3 bg-[var(--dq-gray-50)] rounded-lg cursor-pointer hover:bg-[var(--dq-surface-border-default)] transition-colors">
                        <input
                          type="checkbox"
                          checked={badgeForm.stackable}
                          onChange={(e) => setBadgeForm({ ...badgeForm, stackable: e.target.checked })}
                          className="w-5 h-5 text-[var(--dq-orange-500)] rounded focus:ring-[var(--dq-orange-500)]"
                        />
                        <span className="text-[14px] text-[var(--dq-navy-950)]">Stackable (can be earned multiple times)</span>
                      </label>

                      <div className="flex items-center gap-3 pt-4 border-t border-[var(--dq-surface-border-default)]">
                        <Button
                          variant="outline"
                          className="flex-1 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]"
                          onClick={() => setShowCreateBadgeModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white"
                          onClick={() => {
                            toast({ title: "Badge Created", description: `"${badgeForm.name}" badge has been created successfully.` });
                            setShowCreateBadgeModal(false);
                            setBadgeForm({
                              name: '',
                              description: '',
                              category: 'achievement',
                              icon: '🏆',
                              criteria: '',
                              points: 100,
                              stackable: true,
                            });
                          }}
                        >
                          Create Badge
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Verify Certificate Modal */}
              {showVerifyCertificateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-lg w-full">
                    <div className="border-b border-[var(--dq-surface-border-default)] p-6 flex items-center justify-between">
                      <h2 className="text-[24px] font-semibold text-[var(--dq-navy-950)]">Verify Certificate</h2>
                      <button onClick={() => setShowVerifyCertificateModal(false)} className="p-2 hover:bg-[var(--dq-gray-50)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Verification Method</label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {[
                            { value: 'id', label: 'Certificate ID', icon: '🔢' },
                            { value: 'qr', label: 'QR Code', icon: '📱' },
                            { value: 'blockchain', label: 'Blockchain', icon: '⛓️' },
                          ].map((method) => (
                            <button
                              key={method.value}
                              onClick={() => setVerifyCertificateForm({ ...verifyCertificateForm, verificationMethod: method.value as any })}
                              className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg border-2 text-[14px] font-medium transition-all ${
                                verifyCertificateForm.verificationMethod === method.value
                                  ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
                                  : 'border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30'
                              }`}
                            >
                              <span className="text-2xl">{method.icon}</span>
                              <span>{method.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {verifyCertificateForm.verificationMethod === 'id' && (
                        <div>
                          <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Certificate ID</label>
                          <input
                            type="text"
                            value={verifyCertificateForm.certificateID}
                            onChange={(e) => setVerifyCertificateForm({ ...verifyCertificateForm, certificateID: e.target.value })}
                            className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                            placeholder="Enter certificate ID..."
                          />
                        </div>
                      )}

                      {verifyCertificateForm.verificationMethod === 'qr' && (
                        <div className="text-center py-8">
                          <div className="w-48 h-48 mx-auto bg-[var(--dq-gray-50)] rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--dq-surface-border-default)]">
                            <div className="text-center">
                              <Upload className="w-12 h-12 mx-auto mb-2 text-[var(--dq-text-disabled)]" />
                              <p className="text-[14px] text-[var(--dq-text-secondary)]">Scan or upload QR code</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {verifyCertificateForm.verificationMethod === 'blockchain' && (
                        <div>
                          <label className="block text-[14px] font-medium text-[var(--dq-navy-950)] mb-2">Blockchain Transaction Hash</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]"
                            placeholder="Enter transaction hash..."
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-4 border-t border-[var(--dq-surface-border-default)]">
                        <Button
                          variant="outline"
                          className="flex-1 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]"
                          onClick={() => setShowVerifyCertificateModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white"
                          onClick={() => {
                            toast({ 
                              title: "Certificate Verified", 
                              description: "This certificate is authentic and was issued by DTMA Academy." 
                            });
                            setShowVerifyCertificateModal(false);
                          }}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Template Preview Modal */}
              {previewTemplate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-[var(--dq-surface-border-default)] p-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-[24px] font-semibold text-[var(--dq-navy-950)]">{previewTemplate.name}</h2>
                        <p className="text-[14px] text-[var(--dq-text-secondary)]">Template Preview</p>
                      </div>
                      <button onClick={() => setPreviewTemplate(null)} className="p-2 hover:bg-[var(--dq-gray-50)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--dq-text-secondary)]" />
                      </button>
                    </div>
                    <div className="p-8">
                      {/* Certificate Preview matching learner/instructor dashboard design */}
                      <div className="aspect-[16/11] bg-gradient-to-r from-[var(--dq-navy-950)] via-[#2a3058] to-[var(--dq-orange-500)] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                        <div className="h-full flex flex-col items-center justify-center text-white p-12 relative">
                          {/* Decorative corner elements */}
                          <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-white/30 rounded-tl-xl"></div>
                          <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-white/30 rounded-tr-xl"></div>
                          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-white/30 rounded-bl-xl"></div>
                          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-white/30 rounded-br-xl"></div>
                          
                          {/* Certificate icon */}
                          <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm mb-6">
                            <div className="text-5xl">{previewTemplate.preview}</div>
                          </div>
                          
                          {/* Certificate content */}
                          <h3 className="text-[40px] font-bold mb-6 tracking-wide">Certificate of Completion</h3>
                          <p className="text-[18px] mb-4 text-white/90">This certifies that</p>
                          <p className="text-[32px] font-bold mb-6 tracking-wide">[Learner Name]</p>
                          <p className="text-[16px] mb-4 text-white/90">has successfully completed</p>
                          <p className="text-[28px] font-bold mb-8 text-center max-w-2xl">[Course Title]</p>
                          
                          {/* Certificate details */}
                          <div className="flex items-center gap-12 text-[14px] mt-4">
                            <div className="text-center">
                              <p className="text-white/70 mb-1">Issue Date</p>
                              <p className="font-semibold text-[16px]">[Date]</p>
                            </div>
                            <div className="w-px h-12 bg-white/30"></div>
                            <div className="text-center">
                              <p className="text-white/70 mb-1">Credential ID</p>
                              <p className="font-semibold text-[16px] font-mono">[ID]</p>
                            </div>
                          </div>
                          
                          {/* KHDA Badge */}
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                              <p className="text-[12px] font-medium text-white/90">KHDA-Attested Certificate</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="mt-6 flex items-center gap-3">
                        <Button variant="outline" className="flex-1 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]" onClick={() => setPreviewTemplate(null)}>
                          Close
                        </Button>
                        <Button className="flex-1 bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download Sample
                        </Button>
                        <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Commerce Tab */}
          {activeTab === 'commerce' && (
            <div className="space-y-8">
              <h1 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]">Commerce & Billing Operations</h1>

              {/* Revenue Overview Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: DollarSign, label: 'Total Revenue', value: '$284,750', trend: '+18%', color: 'text-[var(--dq-orange-500)]', bg: 'bg-[var(--dq-orange-50)]' },
                  { icon: TrendingUp, label: 'Monthly Recurring', value: '$42,890', trend: '+12%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { icon: Users, label: 'Paying Customers', value: '1,847', trend: '+24%', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: Award, label: 'Avg Order Value', value: '$154', trend: '+8%', color: 'text-amber-500', bg: 'bg-amber-50' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div className="text-[32px] leading-[40px] font-semibold mb-1 text-[var(--dq-navy-950)]">{stat.value}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] leading-[18px] text-[var(--dq-text-secondary)]">{stat.label}</div>
                      <div className="text-[12px] font-medium text-emerald-600">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Pricing & Plans */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Course Pricing & Plans</h2>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                      Manage course pricing, discount codes, and subscription plans
                    </p>
                  </div>
                  <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Pricing Plan
                  </Button>
                </div>

                {/* Pricing Plans Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { 
                      name: 'Individual Course', 
                      price: '$99', 
                      period: 'one-time',
                      courses: 28,
                      sales: 1247,
                      revenue: '$123,453',
                      status: 'active'
                    },
                    { 
                      name: 'Monthly Subscription', 
                      price: '$49', 
                      period: 'per month',
                      courses: 'All',
                      sales: 342,
                      revenue: '$16,758',
                      status: 'active'
                    },
                    { 
                      name: 'Annual Subscription', 
                      price: '$499', 
                      period: 'per year',
                      courses: 'All',
                      sales: 258,
                      revenue: '$128,742',
                      status: 'active'
                    },
                  ].map((plan, index) => (
                    <div key={index} className="bg-[var(--dq-gray-50)] rounded-xl p-6 border-2 border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)] hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-[18px] font-semibold text-[var(--dq-navy-950)] mb-1">{plan.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-bold text-[var(--dq-orange-500)]">{plan.price}</span>
                            <span className="text-[14px] text-[var(--dq-text-secondary)]">{plan.period}</span>
                          </div>
                        </div>
                        <Badge className="bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]">{plan.status}</Badge>
                      </div>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-[var(--dq-text-secondary)]">Courses</span>
                          <span className="font-semibold text-[var(--dq-navy-950)]">{plan.courses}</span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-[var(--dq-text-secondary)]">Total Sales</span>
                          <span className="font-semibold text-[var(--dq-navy-950)]">{plan.sales}</span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-[var(--dq-text-secondary)]">Revenue</span>
                          <span className="font-semibold text-[var(--dq-navy-950)]">{plan.revenue}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Codes */}
                <div className="border-t border-[var(--dq-surface-border-default)] pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[18px] font-semibold text-[var(--dq-navy-950)]">Active Discount Codes</h3>
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Code
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { code: 'WELCOME20', discount: '20%', uses: 234, limit: 500, expires: '2026-06-30' },
                      { code: 'SUMMER50', discount: '50%', uses: 89, limit: 100, expires: '2026-08-31' },
                      { code: 'EARLYBIRD', discount: '$25', uses: 156, limit: 200, expires: '2026-05-15' },
                      { code: 'STUDENT15', discount: '15%', uses: 412, limit: 1000, expires: '2026-12-31' },
                    ].map((code, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[var(--dq-surface-border-default)]">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono font-bold text-[16px] text-[var(--dq-navy-950)]">{code.code}</span>
                            <Badge className="bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)]">{code.discount} off</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-[12px] text-[var(--dq-text-secondary)]">
                            <span>{code.uses}/{code.limit} uses</span>
                            <span>•</span>
                            <span>Expires {code.expires}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment & Refunds */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)] mb-2">Payment Processing</h2>
                      <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                        Monitor payment transactions and success rates
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Successful', value: '2,847', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: 'Pending', value: '23', color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: 'Failed', value: '12', color: 'text-red-600', bg: 'bg-red-50' },
                      { label: 'Success Rate', value: '99.6%', color: 'text-[var(--dq-orange-500)]', bg: 'bg-[var(--dq-orange-50)]' },
                    ].map((metric) => (
                      <div key={metric.label} className={`${metric.bg} rounded-lg p-4 border border-[var(--dq-surface-border-default)]`}>
                        <div className={`text-[24px] font-bold ${metric.color} mb-1`}>{metric.value}</div>
                        <div className="text-[12px] text-[var(--dq-text-secondary)]">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[16px] font-semibold text-[var(--dq-navy-950)]">Payment Methods</h3>
                    {[
                      { method: 'Credit/Debit Cards', percentage: 68, icon: '💳' },
                      { method: 'PayPal', percentage: 22, icon: '🅿️' },
                      { method: 'Bank Transfer', percentage: 10, icon: '🏦' },
                    ].map((pm) => (
                      <div key={pm.method} className="flex items-center gap-3">
                        <span className="text-2xl">{pm.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[14px] font-medium text-[var(--dq-navy-950)]">{pm.method}</span>
                            <span className="text-[13px] font-semibold text-[var(--dq-text-secondary)]">{pm.percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-[var(--dq-gray-50)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--dq-orange-500)] rounded-full" style={{ width: `${pm.percentage}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight className="w-7 h-7 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)] mb-2">Refunds & Disputes</h2>
                      <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                        Manage refund requests and payment disputes
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Pending Refunds', value: '8' },
                      { label: 'Processed', value: '142' },
                      { label: 'Total Refunded', value: '$12,450' },
                      { label: 'Refund Rate', value: '4.2%' },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-[var(--dq-gray-50)] rounded-lg p-4 border border-[var(--dq-surface-border-default)]">
                        <div className="text-[20px] font-bold text-[var(--dq-navy-950)] mb-1">{metric.value}</div>
                        <div className="text-[12px] text-[var(--dq-text-secondary)]">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[16px] font-semibold text-[var(--dq-navy-950)] mb-3">Recent Refund Requests</h3>
                    {[
                      { user: 'John Smith', course: 'Digital Economy', amount: '$99', date: '2 hours ago', status: 'pending' },
                      { user: 'Sarah Lee', course: 'Platform Economics', amount: '$99', date: '5 hours ago', status: 'pending' },
                      { user: 'Mike Chen', course: 'Digital Transformation', amount: '$99', date: '1 day ago', status: 'approved' },
                    ].map((refund, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[var(--dq-gray-50)] rounded-lg border border-[var(--dq-surface-border-default)]">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[14px] font-medium text-[var(--dq-navy-950)]">{refund.user}</span>
                            <Badge className={`${
                              refund.status === 'pending' ? 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]' : 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]'
                            }`}>
                              {refund.status}
                            </Badge>
                          </div>
                          <div className="text-[12px] text-[var(--dq-text-secondary)]">
                            {refund.course} • {refund.amount} • {refund.date}
                          </div>
                        </div>
                        {refund.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Transaction History</h2>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                      View and manage all payment transactions
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="w-full">
                  <table className="w-full table-fixed">
                    <thead className="bg-[var(--dq-navy-950)]">
                      <tr>
                        {['Transaction ID', 'Customer', 'Course/Plan', 'Amount', 'Payment Method', 'Status', 'Date', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-[13px] font-medium text-white whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'TXN-2024-5847', customer: 'Sarah Johnson', item: 'Annual Subscription', amount: '$499', method: 'Credit Card', status: 'completed', date: '2026-04-17 14:23' },
                        { id: 'TXN-2024-5846', customer: 'Ahmed Al-Mansoori', item: 'Digital Economy Course', amount: '$99', method: 'PayPal', status: 'completed', date: '2026-04-17 13:45' },
                        { id: 'TXN-2024-5845', customer: 'Maria Garcia', item: 'Monthly Subscription', amount: '$49', method: 'Credit Card', status: 'pending', date: '2026-04-17 12:10' },
                        { id: 'TXN-2024-5844', customer: 'John Smith', item: 'Platform Economics', amount: '$99', method: 'Bank Transfer', status: 'completed', date: '2026-04-17 11:30' },
                        { id: 'TXN-2024-5843', customer: 'Fatima Hassan', item: 'Digital Transformation', amount: '$99', method: 'Credit Card', status: 'failed', date: '2026-04-17 10:15' },
                      ].map((txn, index) => (
                        <tr key={index} className={`border-t border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)] ${index % 2 === 0 ? '' : 'bg-[var(--dq-gray-50)]/50'}`}>
                          <td className="px-4 py-3">
                            <span className="font-mono text-[13px] text-[var(--dq-navy-950)]">{txn.id}</span>
                          </td>
                          <td className="px-4 py-3 text-[14px] font-medium text-[var(--dq-navy-950)]">{txn.customer}</td>
                          <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)]">{txn.item}</td>
                          <td className="px-4 py-3 text-[14px] font-semibold text-[var(--dq-navy-950)]">{txn.amount}</td>
                          <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)]">{txn.method}</td>
                          <td className="px-4 py-3">
                            <Badge className={`${
                              txn.status === 'completed' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' :
                              txn.status === 'pending' ? 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {txn.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[var(--dq-text-secondary)] whitespace-nowrap">{txn.date}</td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)]">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue Analytics */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--dq-navy-950)] mb-2">Revenue Analytics</h2>
                    <p className="text-[14px] leading-[20px] text-[var(--dq-text-secondary)]">
                      Track revenue trends and performance metrics
                    </p>
                  </div>
                  <select className="px-4 py-2 border border-[var(--dq-surface-border-default)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--dq-orange-500)]/40 focus:border-[var(--dq-orange-500)]">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This year</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: 'Course Sales', value: '$156,890', change: '+15%', icon: BookOpen },
                    { label: 'Subscriptions', value: '$89,640', change: '+22%', icon: Users },
                    { label: 'Certifications', value: '$38,220', change: '+8%', icon: Award },
                  ].map((metric) => (
                    <div key={metric.label} className="bg-[var(--dq-gray-50)] rounded-xl p-6 border border-[var(--dq-surface-border-default)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border border-[var(--dq-surface-border-default)]">
                          <metric.icon className="w-6 h-6 text-[var(--dq-orange-500)]" />
                        </div>
                        <div>
                          <div className="text-[12px] text-[var(--dq-text-secondary)] mb-1">{metric.label}</div>
                          <div className="text-[24px] font-bold text-[var(--dq-navy-950)]">{metric.value}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="text-[13px] font-medium text-emerald-600">{metric.change} vs last period</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* System Settings Tab */}
          {activeTab === 'system' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-[var(--dq-navy-950)]">User, Roles & System Administration</h1>
              
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-2">
                    <Shield className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <span className="text-[13px] text-[#10B981] font-medium">Active</span>
                  </div>
                  <p className="text-[32px] font-bold text-[var(--dq-navy-950)]">8</p>
                  <p className="text-[14px] text-[var(--dq-text-secondary)]">User Roles</p>
                </div>
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <span className="text-[13px] text-[#10B981] font-medium">+8%</span>
                  </div>
                  <p className="text-[32px] font-bold text-[var(--dq-navy-950)]">1,234</p>
                  <p className="text-[14px] text-[var(--dq-text-secondary)]">Active Sessions</p>
                </div>
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <span className="text-[13px] text-[var(--dq-text-secondary)] font-medium">Last 24h</span>
                  </div>
                  <p className="text-[32px] font-bold text-[var(--dq-navy-950)]">3,456</p>
                  <p className="text-[14px] text-[var(--dq-text-secondary)]">Audit Events</p>
                </div>
                <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center justify-between mb-2">
                    <Lock className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <span className="text-[13px] text-emerald-600 font-medium">Secure</span>
                  </div>
                  <p className="text-[32px] font-bold text-[var(--dq-navy-950)]">99.9%</p>
                  <p className="text-[14px] text-[var(--dq-text-secondary)]">System Uptime</p>
                </div>
              </div>

              {/* Roles & Permissions */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Roles & Permissions</h3>
                    <p className="text-[14px] text-[var(--dq-text-secondary)] mt-1">Define and manage user roles with granular permissions</p>
                  </div>
                  <Button className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Role
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Super Admin', users: 3, permissions: 'Full Access', color: 'bg-red-100 text-red-700' },
                    { name: 'Admin', users: 12, permissions: '45 Permissions', color: 'bg-[var(--dq-orange-50)] text-[var(--dq-orange-500)]' },
                    { name: 'Instructor', users: 156, permissions: '28 Permissions', color: 'bg-blue-100 text-blue-700' },
                    { name: 'Content Manager', users: 8, permissions: '22 Permissions', color: 'bg-[var(--dq-navy-100)] text-[var(--dq-navy-700)]' },
                    { name: 'Learner', users: 2654, permissions: '12 Permissions', color: 'bg-green-100 text-green-700' },
                    { name: 'Guest', users: 14, permissions: '5 Permissions', color: 'bg-gray-100 text-gray-600' },
                    { name: 'Support Staff', users: 6, permissions: '18 Permissions', color: 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]' },
                    { name: 'Auditor', users: 2, permissions: 'Read Only', color: 'bg-indigo-100 text-indigo-700' },
                  ].map((role, index) => (
                    <div key={index} className="bg-[var(--dq-gray-50)] rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <Shield className="w-6 h-6 text-[var(--dq-orange-500)]" />
                        <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <h4 className="text-[16px] font-semibold text-[var(--dq-navy-950)] mb-2">{role.name}</h4>
                      <p className="text-[13px] text-[var(--dq-text-secondary)] mb-3">{role.permissions}</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[var(--dq-text-disabled)]" />
                        <span className="text-[13px] text-[var(--dq-text-secondary)]">{role.users} users</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Settings */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)] mb-6">
                <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)] mb-6">System Settings</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* General Settings */}
                  <div className="space-y-4">
                    <h4 className="text-[16px] font-semibold text-[var(--dq-navy-950)] mb-4">General Settings</h4>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Platform Name</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">DTMA Learning Platform</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Time Zone</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">UTC+04:00 (Dubai)</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Default Language</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">English (US)</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Maintenance Mode</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">Disabled</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--dq-orange-500)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--dq-orange-500)]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="space-y-4">
                    <h4 className="text-[16px] font-semibold text-[var(--dq-navy-950)] mb-4">Security Settings</h4>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Two-Factor Authentication</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">Required for admins</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--dq-orange-500)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--dq-orange-500)]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Session Timeout</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">30 minutes of inactivity</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">Password Policy</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">Strong (12+ chars, mixed)</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dq-gray-50)] rounded-lg">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--dq-navy-950)]">IP Whitelist</p>
                        <p className="text-[13px] text-[var(--dq-text-secondary)]">8 addresses configured</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Logs */}
              <div className="bg-white rounded-xl p-$1 shadow-sm border border-[var(--dq-surface-border-default)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]">Audit Logs</h3>
                    <p className="text-[14px] text-[var(--dq-text-secondary)] mt-1">Track all system activities and user actions</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" className="border-[var(--dq-surface-border-default)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { action: 'User Login', user: 'Sarah Johnson', details: 'Successful login from 192.168.1.100', time: '2 mins ago', type: 'success' },
                    { action: 'Role Updated', user: 'Michael Chen', details: 'Changed role from Learner to Instructor', time: '15 mins ago', type: 'info' },
                    { action: 'Course Published', user: 'Emma Williams', details: 'Published "Digital Transformation Fundamentals"', time: '1 hour ago', type: 'success' },
                    { action: 'Failed Login Attempt', user: 'Unknown', details: 'Multiple failed attempts from 203.45.67.89', time: '2 hours ago', type: 'warning' },
                    { action: 'User Suspended', user: 'Admin', details: 'Suspended user account: john.doe@example.com', time: '3 hours ago', type: 'error' },
                    { action: 'Settings Changed', user: 'Sarah Johnson', details: 'Updated system timezone settings', time: '5 hours ago', type: 'info' },
                  ].map((log, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-[var(--dq-gray-50)] rounded-lg hover:bg-[var(--dq-orange-50)] transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.type === 'success' ? 'bg-emerald-500' :
                        log.type === 'warning' ? 'bg-amber-500' :
                        log.type === 'error' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[14px] font-semibold text-[var(--dq-navy-950)]">{log.action}</p>
                          <span className="text-[13px] text-[var(--dq-text-secondary)]">{log.time}</span>
                        </div>
                        <p className="text-[13px] text-[var(--dq-text-secondary)] mb-1">{log.details}</p>
                        <p className="text-[12px] text-[var(--dq-text-disabled)]">By: {log.user}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[var(--dq-navy-950)] hover:bg-white hover:text-[var(--dq-orange-500)]">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <Button variant="outline" className="border-[var(--dq-surface-border-default)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]">
                    Load More Logs
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* AI Operations Assistant Tab */}
          {activeTab === 'ai-assistant' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">AI Operations Assistant</h1>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Your AI Assistant</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80 mb-4">
                    A general-purpose assistant to support daily operational work.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Platform Activity Summary</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI-generated summaries of platform activity and key metrics.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Generate Summary</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Operational Reports</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create comprehensive reports with AI assistance.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Create Report</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Next-Best Actions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests priority actions for admins and faculty.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Draft Responses</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Generate draft responses to learner queries.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Draft Response</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Transact AI - Faculty Mode</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Extended AI support for faculty to mentor and support learners effectively.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Learner Progress Summaries</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      View AI-generated summaries of individual learner progress.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">View Summaries</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Mentoring Suggestions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI-powered mentoring strategies for each learner.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Get Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Struggling Learner Guidance</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Receive guidance on how to support struggling learners.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Guidance</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Intervention Recommendations</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI recommends timely interventions and outreach actions.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Recommendations</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">AI-Powered Course Creation</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Accelerate course development with AI assistance while keeping humans in control.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Draft Lesson Outlines</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Generate structured lesson outlines based on learning objectives.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Create Outline</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Generate Examples & Exercises</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create relevant examples and practice exercises automatically.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Generate Content</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Propose Learning Objectives</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests clear, measurable learning objectives.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Get Objectives</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Improvement Suggestions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI recommendations to enhance existing content.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Analyze Content</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Intelligent Assessment Creation & Grading</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Streamline quiz creation and grading with AI assistance.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">AI Quiz Generator</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create quizzes from lesson content with varied difficulty levels.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Generate Quiz</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Question Variations</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests question variations and difficulty adjustments.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Create Variations</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">AI Grading Helper</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Assist in grading open-ended responses with AI analysis.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Start Grading</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Rubric Matching</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI highlights key points and suggests provisional scores.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Analyze Responses</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Predictive Learner Analytics</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Identify at-risk learners and skill gaps across cohorts.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Cohort Risk Alerts</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Detect learners falling behind and disengagement patterns.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">View Alerts</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Early Intervention</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI recommends timely interventions for struggling learners.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Get Recommendations</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Training Needs Analysis</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Analyze performance data to identify common skill gaps.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Analyze Cohorts</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Course Planning Insights</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Feed insights into future course planning and development.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Insights</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Qualitative Feedback at Scale</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Analyze course reviews, ratings, and feedback automatically.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Sentiment Trends</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Track sentiment trends across courses and time periods.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">View Trends</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Recurring Complaints</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Identify common issues and pain points from feedback.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Analyze Feedback</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Improvement Opportunities</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI highlights areas for course and platform improvement.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Get Recommendations</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Support Ticket Analysis</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Analyze support tickets for patterns and insights.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Analyze Tickets</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Safe Learning Environments</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Maintain productive and respectful discussion forums with AI.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Detection</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Detect inappropriate or off-topic content automatically.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">View Flagged Content</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Moderator Review Queue</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Flag posts for human moderator review and action.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Review Queue</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Suggested Responses</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests automated or drafted moderator responses.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Moderation Analytics</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Track moderation metrics and community health.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Analytics</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Optimized Support Operations</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Streamline support with intelligent request classification and routing.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Request Classification</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Automatically classify incoming support requests by type.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">View Requests</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Suggested Replies</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI generates draft responses for common support issues.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Generate Replies</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Smart Routing</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Route issues to the correct team or faculty member.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Configure Routing</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Priority Detection</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Identify and prioritize urgent learner problems.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">View Urgent Issues</Button>
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
                <div className="bg-gradient-to-br from-[var(--dq-navy-950)] to-[#2a3058] rounded-xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-8 h-8 text-[var(--dq-orange-500)]" />
                    <h3 className="text-[20px] leading-[28px] font-medium text-white">Global Program Delivery</h3>
                  </div>
                  <p className="text-[14px] leading-[20px] font-normal text-white/80">
                    Support multilingual delivery of DTMA programs worldwide.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Translation</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Translate course content while maintaining accuracy.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Translate Content</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Cultural Adaptation</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Suggest culturally appropriate phrasing and examples.
                    </p>
                    <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white">Get Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Multilingual Support</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Assist with multilingual support responses.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Translate Response</Button>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Consistency Management</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Maintain consistency across localized versions.
                    </p>
                    <Button variant="outline" className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white">Check Consistency</Button>
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
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[var(--dq-orange-500)]" />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                            ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                            ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      announcementForm.priority === 'normal' ? 'bg-[var(--dq-orange-500)]' :
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
                  className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white"
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
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white"
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
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[var(--dq-orange-500)]" />
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
                <Select
                  value={scheduleForm.course}
                  onValueChange={(value) => setScheduleForm({ ...scheduleForm, course: value })}
                >
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]">
                    <SelectValue placeholder="Choose a course..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy-40" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Mastering Economy 4.0
                    </SelectItem>
                    <SelectItem value="cognitive-org" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Decoding Digital Cognitive Organisations
                    </SelectItem>
                    <SelectItem value="business-platforms" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Building Powerful Digital Business Platforms
                    </SelectItem>
                    <SelectItem value="transformation" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Navigating Digital Transformation 2.0
                    </SelectItem>
                    <SelectItem value="digital-workers" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Optimizing Digital Workers and Workspaces
                    </SelectItem>
                    <SelectItem value="digital-accelerators" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Leveraging Digital Accelerators for Growth
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <Select
                  value={scheduleForm.instructor}
                  onValueChange={(value) => setScheduleForm({ ...scheduleForm, instructor: value })}
                >
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]">
                    <SelectValue placeholder="Select instructor..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-aisha" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Dr. Aisha Mensah
                    </SelectItem>
                    <SelectItem value="james" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      James Okafor
                    </SelectItem>
                    <SelectItem value="priya" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Priya Nair
                    </SelectItem>
                    <SelectItem value="marcus" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Marcus Webb
                    </SelectItem>
                    <SelectItem value="sofia" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Sofia Reyes
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Session Preview</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[var(--dq-orange-500)]" />
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
                    <span className="capitalize px-2 py-1 rounded bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)] text-[12px] font-medium">
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
                  className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white"
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
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white"
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
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <UserPlusIcon className="w-5 h-5 text-[var(--dq-orange-500)]" />
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
                <Select
                  value={bulkEnrollForm.course}
                  onValueChange={(value) => setBulkEnrollForm({ ...bulkEnrollForm, course: value })}
                >
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]">
                    <SelectValue placeholder="Choose a course..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy-40" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Mastering Economy 4.0
                    </SelectItem>
                    <SelectItem value="cognitive-org" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Decoding Digital Cognitive Organisations
                    </SelectItem>
                    <SelectItem value="business-platforms" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Building Powerful Digital Business Platforms
                    </SelectItem>
                    <SelectItem value="transformation" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Navigating Digital Transformation 2.0
                    </SelectItem>
                    <SelectItem value="digital-workers" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Optimizing Digital Workers and Workspaces
                    </SelectItem>
                    <SelectItem value="digital-accelerators" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                      Leveraging Digital Accelerators for Growth
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none font-mono text-[14px]"
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--dq-orange-500)] transition-colors">
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
                      <p className="text-[14px] text-[var(--dq-orange-500)] mt-3 font-medium">
                        Selected: {bulkEnrollForm.csvFile.name}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 p-4 bg-[var(--dq-orange-50)] rounded-lg">
                    <p className="text-[12px] text-[var(--dq-navy-950)] font-medium mb-2">CSV Format Requirements:</p>
                    <ul className="text-[12px] text-[var(--dq-text-secondary)] space-y-1 ml-4 list-disc">
                      <li>First column: Email address (required)</li>
                      <li>Second column: Full name (optional)</li>
                      <li>Third column: Organization (optional)</li>
                    </ul>
                    <button className="mt-3 text-[12px] text-[var(--dq-orange-500)] font-medium hover:underline flex items-center gap-1">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none font-mono text-[14px]"
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                    className="w-5 h-5 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                    className="w-5 h-5 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                  className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white"
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
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white"
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
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[var(--dq-orange-500)]" />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                    <Select
                      value={facultyForm.department}
                      onValueChange={(value) => setFacultyForm({ ...facultyForm, department: value })}
                    >
                      <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]">
                        <SelectValue placeholder="Select department..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-transformation" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                          Digital Transformation
                        </SelectItem>
                        <SelectItem value="ai-technology" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                          AI & Technology
                        </SelectItem>
                        <SelectItem value="leadership" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                          Leadership & Management
                        </SelectItem>
                        <SelectItem value="data-analytics" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                          Data & Analytics
                        </SelectItem>
                        <SelectItem value="cybersecurity" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                          Cybersecurity
                        </SelectItem>
                        <SelectItem value="business-strategy" className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] focus:bg-[var(--dq-orange-50)] focus:text-[var(--dq-orange-500)]">
                          Business Strategy
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                            className="w-4 h-4 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <h3 className="text-[18px] leading-[28px] font-semibold text-gray-900 mb-4">Profile Photo</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[var(--dq-orange-500)] transition-colors">
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
                    <p className="text-[14px] text-[var(--dq-orange-500)] mt-3 font-medium">
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
                    {['Mastering Economy 4.0', 'Decoding Digital Cognitive Organisations', 'Building Powerful Digital Business Platforms', 'Navigating Digital Transformation 2.0', 'Optimizing Digital Workers and Workspaces', 'Leveraging Digital Accelerators for Growth'].map((course) => (
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
                          className="w-4 h-4 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                              ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                    <GraduationCap className="w-4 h-4 text-[var(--dq-orange-500)]" />
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
                  className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white"
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
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white"
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
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <UserPlusIcon className="w-5 h-5 text-[var(--dq-orange-500)]" />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                            ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                  <div className="mt-3 p-3 bg-[var(--dq-orange-50)] rounded-lg">
                    <p className="text-[12px] text-[var(--dq-navy-950)]">
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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                            ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                    className="w-5 h-5 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                    className="w-5 h-5 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                    <UserPlusIcon className="w-4 h-4 text-[var(--dq-orange-500)]" />
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
                  className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white"
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
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white"
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
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <FileTextIcon className="w-5 h-5 text-[var(--dq-orange-500)]" />
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
                      onChange={(e) => setReviewContentForm({ ...reviewContentForm, contentType: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px]"
                    >
                      <option value="">Choose content...</option>
                      <option value="economy-40">Mastering Economy 4.0</option>
                      <option value="cognitive-org">Decoding Digital Cognitive Organisations</option>
                      <option value="business-platforms">Building Powerful Digital Business Platforms</option>
                      <option value="transformation">Navigating Digital Transformation 2.0</option>
                      <option value="digital-workers">Optimizing Digital Workers and Workspaces</option>
                      <option value="digital-accelerators">Leveraging Digital Accelerators for Growth</option>
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                        background: `linear-gradient(to right, var(--dq-orange-500) 0%, var(--dq-orange-500) ${reviewContentForm.qualityScore}%, var(--dq-surface-border-default) ${reviewContentForm.qualityScore}%, var(--dq-surface-border-default) 100%)`
                      }}
                    />
                    <span className="text-[24px] font-semibold text-[var(--dq-orange-500)] w-16 text-right">
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
                          className="w-4 h-4 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                          className="w-4 h-4 rounded border-gray-300 text-[var(--dq-orange-500)] focus:ring-[var(--dq-orange-500)]"
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                          ? 'border-[var(--dq-orange-500)] bg-[var(--dq-orange-500)]/10 text-[var(--dq-orange-500)]'
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent text-[16px] resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-[14px] leading-[20px] font-medium text-gray-700 mb-3">Review Summary</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4 text-[var(--dq-orange-500)]" />
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
                  className="border-[var(--dq-navy-950)] text-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)] hover:text-white"
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
                  className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white"
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

      {/* Create Program Modal */}
      {showCreateProgramModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[var(--dq-orange-500)]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Create New Learning Program</h2>
              </div>
              <button
                onClick={() => setShowCreateProgramModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[var(--dq-orange-50)] border border-[var(--dq-orange-500)]/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[var(--dq-orange-500)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[14px] font-semibold text-[var(--dq-navy-950)] mb-1">Program Builder</h3>
                    <p className="text-[13px] text-[var(--dq-text-secondary)]">
                      Create comprehensive learning programs by combining multiple courses into structured pathways. 
                      Define prerequisites, set milestones, and design certification requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">Program Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Digital Transformation Leadership Program"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">Category *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent">
                  <option>Select a category</option>
                  <option>Digital Transformation</option>
                  <option>Business Platform</option>
                  <option>Digital Accelerators</option>
                  <option>Digital Workers</option>
                  <option>Digital Economy</option>
                  <option>Cognitive Organization</option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the program objectives, target audience, and learning outcomes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">Duration (weeks)</label>
                  <input
                    type="number"
                    placeholder="12"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--dq-orange-500)] focus:border-transparent">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => setShowCreateProgramModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowCreateProgramModal(false);
                    toast({
                      title: "Program Created",
                      description: "New learning program has been created successfully.",
                    });
                  }}
                  className="flex-1 bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Program
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Faculty List Modal */}
      {showFacultyListModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[var(--dq-orange-500)]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">All Faculty Members</h2>
              </div>
              <button
                onClick={() => setShowFacultyListModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-[var(--dq-gray-50)] rounded-xl p-8 text-center">
                <Users className="w-12 h-12 text-[var(--dq-orange-500)] mx-auto mb-4" />
                <h3 className="text-[18px] font-semibold text-[var(--dq-navy-950)] mb-2">Faculty Management</h3>
                <p className="text-[14px] text-[var(--dq-text-secondary)] mb-4">
                  View and manage all faculty members, their courses, and performance metrics.
                </p>
                <Button
                  onClick={() => {
                    setShowFacultyListModal(false);
                    setShowAddFacultyModal(true);
                  }}
                  className="bg-[var(--dq-orange-500)] hover:bg-[#e66045] text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Faculty
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Reports Modal */}
      {showPerformanceReportsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)]/10 flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-[var(--dq-orange-500)]" />
                </div>
                <h2 className="text-[24px] leading-[32px] font-semibold">Faculty Performance Reports</h2>
              </div>
              <button
                onClick={() => setShowPerformanceReportsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-[var(--dq-gray-50)] rounded-xl p-8 text-center">
                <BarChart2 className="w-12 h-12 text-[var(--dq-orange-500)] mx-auto mb-4" />
                <h3 className="text-[18px] font-semibold text-[var(--dq-navy-950)] mb-2">Performance Analytics</h3>
                <p className="text-[14px] text-[var(--dq-text-secondary)]">
                  Comprehensive analytics and insights on faculty performance, student ratings, and course effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;



