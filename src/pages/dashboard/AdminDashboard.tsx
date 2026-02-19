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
} from 'lucide-react';

type AdminTab = 'overview' | 'users' | 'courses' | 'pending' | 'invites';

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
    { id: 'users' as AdminTab, label: 'Users', icon: Users },
    { id: 'invites' as AdminTab, label: 'Invites', icon: UserPlus },
    { id: 'pending' as AdminTab, label: 'Pending Approval', icon: Clock, badge: pendingCourses?.length },
    { id: 'courses' as AdminTab, label: 'All Courses', icon: BookOpen },
  ];

  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <Link to="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal text-primary-foreground transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/10">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/B%20LOGO.png"
                alt="BROWZ Academy"
                className="h-[40px] w-auto"
              />
            </Link>
          </div>

          <RoleSwitcher currentRole="admin" />

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">{item.badge}</Badge>
                )}
              </button>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-primary-foreground/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold">
                {profile?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{profile?.full_name || 'Admin'}</div>
                <div className="text-xs text-primary-foreground/60">Administrator</div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
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
              <h1 className="text-2xl font-semibold mb-6">Platform Overview</h1>
              
              {analyticsLoading ? (
                <p className="text-muted-foreground">Loading analytics...</p>
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
                      <div className="text-2xl font-semibold">{analytics?.totalUsers || 0}</div>
                      <div className="text-sm text-muted-foreground">Total Users</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-2xl font-semibold">{analytics?.publishedCourses || 0}</div>
                      <div className="text-sm text-muted-foreground">Published Courses</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-2xl font-semibold">{analytics?.totalEnrollments || 0}</div>
                      <div className="text-sm text-muted-foreground">Enrollments</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-2xl font-semibold">{analytics?.certificatesIssued || 0}</div>
                      <div className="text-sm text-muted-foreground">Certificates</div>
                    </div>
                  </div>

                  {/* Role Distribution */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <h3 className="font-semibold mb-4">Users by Role</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Learners</span>
                          <span className="font-semibold">{analytics?.usersByRole.learner || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Instructors</span>
                          <span className="font-semibold">{analytics?.usersByRole.instructor || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Admins</span>
                          <span className="font-semibold">{analytics?.usersByRole.admin || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                      <h3 className="font-semibold mb-4">Quick Stats</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Completion Rate</span>
                          <span className="font-semibold">{analytics?.completionRate || 0}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Pending Reviews</span>
                          <span className="font-semibold text-amber-600">{analytics?.pendingReviews || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Total Courses</span>
                          <span className="font-semibold">{analytics?.totalCourses || 0}</span>
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
              <h1 className="text-2xl font-semibold mb-6">User Management</h1>
              
              {usersLoading ? (
                <p className="text-muted-foreground">Loading users...</p>
              ) : (
                <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user.id} className="border-t border-border">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                                  {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium">{user.full_name || 'No name'}</span>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground">{user.email}</td>
                            <td className="p-4">
                              <Select
                                value={user.role}
                                onValueChange={(value) => handleUpdateRole(user.id, value as 'learner' | 'instructor' | 'admin')}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="learner">Learner</SelectItem>
                                  <SelectItem value="instructor">Instructor</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {(!users || users.length === 0) && (
                    <div className="p-8 text-center text-muted-foreground">
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
              <h1 className="text-2xl font-semibold mb-6">Pending Course Approvals</h1>
              
              {pendingLoading ? (
                <p className="text-muted-foreground">Loading pending courses...</p>
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
                              <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                by {course.instructor?.full_name || 'Unknown'} • {course.instructor?.email}
                              </p>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="capitalize">{course.category}</Badge>
                                <Badge variant="outline" className="capitalize">{course.level}</Badge>
                                <span className="text-sm text-muted-foreground">${course.price}</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
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
                  <h3 className="font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">There are no courses pending approval.</p>
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
              <h1 className="text-2xl font-semibold mb-6">All Courses</h1>
              <p className="text-muted-foreground">Course management coming soon. Use the Pending Approval tab to review new submissions.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;