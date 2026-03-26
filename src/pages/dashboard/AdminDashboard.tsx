import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminAnalytics, usePendingCourses, useAdminUsers, useReviewCourse, useUpdateUserRole } from '@/hooks/useAdmin';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';
import { InviteManagement } from '@/components/admin/InviteManagement';
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
} from 'lucide-react';

type AdminTab = 'overview' | 'users' | 'courses' | 'pending' | 'invites' | 'assessments' | 'scheduling' | 'enrollment' | 'faculty' | 'resources' | 'system' | 'communication' | 'governance' | 'organizations' | 'certification' | 'commerce' | 'ai-assistant' | 'ai-faculty' | 'ai-content' | 'ai-assessment' | 'ai-cohort' | 'ai-feedback' | 'ai-moderation' | 'ai-support' | 'ai-localization';

const AdminDashboard = () => {
  const { profile, signOut, role } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
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
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.totalUsers || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Total Users</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.publishedCourses || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Published Courses</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-[24px] leading-[32px] font-medium">{analytics?.totalEnrollments || 0}</div>
                      <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Enrollments</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
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
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">User Management</h1>
              
              {usersLoading ? (
                <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">Loading users...</p>
              ) : (
                <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full" role="table" aria-label="User management table">
                      <thead className="bg-secondary">
                        <tr>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-muted-foreground">User</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-muted-foreground">Email</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-muted-foreground">Role</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-muted-foreground">Joined</th>
                          <th scope="col" className="text-left p-4 text-[14px] leading-[20px] font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user.id} className="border-t border-border">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-[14px] leading-[20px] font-medium text-primary" aria-hidden="true">
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
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6">Pending Course Approvals</h1>
              
              {pendingLoading ? (
                <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">Loading pending courses...</p>
              ) : pendingCourses && pendingCourses.length > 0 ? (
                <div className="space-y-4">
                  {pendingCourses.map((course) => (
                    <div key={course.id} className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <img
                          src={course.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'}
                          alt={course.title}
                          className="w-32 h-24 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-[20px] leading-[28px] font-medium mb-1">{course.title}</h3>
                              <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-2">
                                by {course.instructor?.full_name || 'Unknown'} • {course.instructor?.email}
                              </p>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="capitalize">{course.category}</Badge>
                                <Badge variant="outline" className="capitalize">{course.level}</Badge>
                                <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">${course.price}</span>
                              </div>
                              <p className="text-[14px] leading-[20px] font-normal text-muted-foreground line-clamp-2">
                                {course.short_description || course.description || 'No description provided'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleReviewCourse(course.id, 'approve')}
                            disabled={reviewCourse.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReviewCourse(course.id, 'reject')}
                            disabled={reviewCourse.isPending}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-[20px] leading-[28px] font-medium mb-2">All caught up!</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">There are no courses pending approval.</p>
                </div>
              )}
            </div>
          )}

          {/* Invites Tab */}
          {activeTab === 'invites' && (
            <InviteManagement />
          )}

          {/* All Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Course & Content Management</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Course Authoring & Publishing</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Create, edit, and publish courses with version control and approval workflows.
                  </p>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create New Course</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Course Performance Analytics</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Track course engagement, completion rates, and learner feedback.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Assessments & Evaluation</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Quiz Management</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Create and manage quizzes, assignments, and assessments.
                  </p>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create Quiz</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Answer Review Workflows</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Review and grade learner submissions with instructor feedback.
                  </p>
                </div>
              </div>
            </div>
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
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Schedule Class</Button>
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
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Bulk Enroll</Button>
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
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Add Faculty</Button>
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
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create Announcement</Button>
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
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Review Content</Button>
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

          {/* Organizations Tab */}
          {activeTab === 'organizations' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Organization & Integration Management</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Organization Management</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Manage organizational accounts and multi-tenant access.
                  </p>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Add Organization</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">External Integrations</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Configure integrations with external systems and APIs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Certification Tab */}
          {activeTab === 'certification' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Certification & Customer Success</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Certificate Template Management</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Design and manage certificate templates for courses.
                  </p>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Create Template</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Customer Success Tracking</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Track learner success metrics and engagement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Commerce Tab */}
          {activeTab === 'commerce' && (
            <div>
              <h1 className="text-[28px] leading-[36px] font-semibold mb-6 text-foreground">Commerce & Billing Operations</h1>
              <div className="grid gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Course Pricing & Plans</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                    Manage course pricing, discount codes, and subscription plans.
                  </p>
                  <Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">Set Pricing</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-3 text-foreground">Payment & Refunds</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                    Process payments, manage refunds, and view transaction history.
                  </p>
                </div>
              </div>
            </div>
          )}

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
                    <Button>Generate Summary</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Operational Reports</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create comprehensive reports with AI assistance.
                    </p>
                    <Button>Create Report</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Next-Best Actions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests priority actions for admins and faculty.
                    </p>
                    <Button variant="outline">View Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Draft Responses</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Generate draft responses to learner queries.
                    </p>
                    <Button variant="outline">Draft Response</Button>
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
                    <Button>View Summaries</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Mentoring Suggestions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI-powered mentoring strategies for each learner.
                    </p>
                    <Button>Get Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Struggling Learner Guidance</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Receive guidance on how to support struggling learners.
                    </p>
                    <Button variant="outline">View Guidance</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Intervention Recommendations</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI recommends timely interventions and outreach actions.
                    </p>
                    <Button variant="outline">View Recommendations</Button>
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
                    <Button>Create Outline</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Generate Examples & Exercises</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Create relevant examples and practice exercises automatically.
                    </p>
                    <Button>Generate Content</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Propose Learning Objectives</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests clear, measurable learning objectives.
                    </p>
                    <Button variant="outline">Get Objectives</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Content Improvement Suggestions</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Get AI recommendations to enhance existing content.
                    </p>
                    <Button variant="outline">Analyze Content</Button>
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
                    <Button>Generate Quiz</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Question Variations</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests question variations and difficulty adjustments.
                    </p>
                    <Button>Create Variations</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">AI Grading Helper</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Assist in grading open-ended responses with AI analysis.
                    </p>
                    <Button variant="outline">Start Grading</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Rubric Matching</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI highlights key points and suggests provisional scores.
                    </p>
                    <Button variant="outline">Analyze Responses</Button>
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
                    <Button>View Alerts</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Early Intervention</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI recommends timely interventions for struggling learners.
                    </p>
                    <Button>Get Recommendations</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Training Needs Analysis</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Analyze performance data to identify common skill gaps.
                    </p>
                    <Button variant="outline">Analyze Cohorts</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Course Planning Insights</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Feed insights into future course planning and development.
                    </p>
                    <Button variant="outline">View Insights</Button>
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
                    <Button>View Trends</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Recurring Complaints</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Identify common issues and pain points from feedback.
                    </p>
                    <Button>Analyze Feedback</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Improvement Opportunities</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI highlights areas for course and platform improvement.
                    </p>
                    <Button variant="outline">Get Recommendations</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Support Ticket Analysis</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Analyze support tickets for patterns and insights.
                    </p>
                    <Button variant="outline">Analyze Tickets</Button>
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
                    <Button>View Flagged Content</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Moderator Review Queue</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Flag posts for human moderator review and action.
                    </p>
                    <Button>Review Queue</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Suggested Responses</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI suggests automated or drafted moderator responses.
                    </p>
                    <Button variant="outline">View Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Moderation Analytics</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Track moderation metrics and community health.
                    </p>
                    <Button variant="outline">View Analytics</Button>
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
                    <Button>View Requests</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Suggested Replies</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      AI generates draft responses for common support issues.
                    </p>
                    <Button>Generate Replies</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Smart Routing</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Route issues to the correct team or faculty member.
                    </p>
                    <Button variant="outline">Configure Routing</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Priority Detection</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Identify and prioritize urgent learner problems.
                    </p>
                    <Button variant="outline">View Urgent Issues</Button>
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
                    <Button>Translate Content</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Cultural Adaptation</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Suggest culturally appropriate phrasing and examples.
                    </p>
                    <Button>Get Suggestions</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Multilingual Support</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Assist with multilingual support responses.
                    </p>
                    <Button variant="outline">Translate Response</Button>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-4">Consistency Management</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4">
                      Maintain consistency across localized versions.
                    </p>
                    <Button variant="outline">Check Consistency</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;