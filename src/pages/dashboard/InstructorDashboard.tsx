import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  useInstructorCourses,
  useCreateCourse,
  useSubmitCourseForReview,
  useArchiveCourse,
  useRestoreCourse,
  useDuplicateCourse,
  useDeleteCourse,
  useCourseStudents,
} from "@/hooks/useInstructor";
import { useQueryClient } from "@tanstack/react-query";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Plus,
  Users,
  Edit,
  Eye,
  Send,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Copy,
  Archive,
  Undo,
  DollarSign,
  Star,
  Calendar,
  Settings,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  CheckSquare,
  Square,
  Trash2,
  Upload,
} from "lucide-react";

const InstructorDashboard = () => {
  const { profile, signOut, role } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
    price: '',
  });

  // Check if instructor is in verification pending state
  // For now, we'll use a flag from localStorage that gets set when they complete verification
  const isVerificationPending = localStorage.getItem("instructor_verification_pending") === "true";

  const [checklist, setChecklist] = useState({
    profileComplete: false,
    draftCourse: false,
    uploadContent: false,
    payoutMethod: false,
  });

  const { data: courses, isLoading } = useInstructorCourses();
  const createCourse = useCreateCourse();
  const submitForReview = useSubmitCourseForReview();
  const archiveCourse = useArchiveCourse();
  const restoreCourse = useRestoreCourse();
  const duplicateCourse = useDuplicateCourse();
  const deleteCourse = useDeleteCourse();
  const [studentCourseId, setStudentCourseId] = useState<string | null>(null);
  const { data: studentList } = useCourseStudents(studentCourseId || "");
  const queryClient = useQueryClient();

  const handleCreateCourse = async () => {
    if (!newCourse.title || !newCourse.category || !newCourse.level) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const slug = newCourse.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const response = await createCourse.mutateAsync({
        title: newCourse.title,
        slug: `${slug}-${Date.now()}`,
        category: newCourse.category,
        level: newCourse.level,
        description: newCourse.description,
        price: parseFloat(newCourse.price) || 0,
      });

      toast({
        title: 'Course Created',
        description: 'Redirecting to course builder...',
      });
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });

      setIsCreateOpen(false);
      setNewCourse({ title: '', category: '', level: '', description: '', price: '' });
      
      // Redirect to the CourseBuilder with the new course ID
      const courseId = response?.id || newCourse.title.toLowerCase().replace(/\s+/g, '-');
      navigate(`/courses/${courseId}/builder`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create course.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitForReview = async (courseId: string) => {
    try {
      await submitForReview.mutateAsync(courseId);
      toast({
        title: 'Submitted for Review',
        description: 'Your course has been submitted for admin approval.',
      });
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit course for review.',
        variant: 'destructive',
      });
    }
  };

  const handleArchive = async (courseId: string) => {
    try {
      await archiveCourse.mutateAsync(courseId);
      toast({
        title: "Course archived",
        description: "The course has been unpublished and archived.",
      });
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive course.",
        variant: "destructive",
      });
    }
  };

  const handleRestore = async (courseId: string) => {
    try {
      await restoreCourse.mutateAsync(courseId);
      toast({
        title: "Course restored",
        description: "The course is back in draft.",
      });
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore course.",
        variant: "destructive",
      });
    }
  };

  const handleDuplicate = async (courseId: string) => {
    try {
      await duplicateCourse.mutateAsync(courseId);
      toast({
        title: "Course duplicated",
        description: "A draft copy has been created.",
      });
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate course.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse.mutateAsync(courseId);
      toast({
        title: "Course deleted",
        description: "The draft course has been permanently deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (courseId: string) => {
    navigate(`/courses/${courseId}/builder`);
  };

  const statusConfig = useMemo(
    () => ({
      draft: { label: "Draft", badge: <Badge variant="secondary">Draft</Badge> },
      under_review: { label: "Under Review", badge: <Badge className="bg-amber-500 text-white">Under Review</Badge> },
      published: { label: "Published", badge: <Badge className="bg-green-600 text-white">Published</Badge> },
      archived: { label: "Archived", badge: <Badge variant="outline">Archived</Badge> },
    }),
    []
  );

  const totalEnrollments = courses?.reduce((sum, c) => sum + (c._count?.enrollments || 0), 0) || 0;
  const publishedCount = courses?.filter((c) => c.status === "published").length || 0;
  const underReviewCount = courses?.filter((c) => c.status === "under_review").length || 0;
  const draftCount = courses?.filter((c) => c.status === "draft").length || 0;

  if (role !== 'instructor' && role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need instructor privileges to access this page.</p>
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#F5F1ED] text-gray-600 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/log.svg"
                alt="BROWZ Academy"
                className="h-[28px] w-auto"
              />
            </Link>
          </div>

          <RoleSwitcher currentRole="instructor" />

          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => { setActiveTab("overview"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "overview" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => { setActiveTab("courses"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "courses" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <BookOpen className="w-5 h-5" />
              <span>My Courses</span>
            </button>
            <button 
              onClick={() => { setActiveTab("learners"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "learners" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <Users className="w-5 h-5" />
              <span>Learners</span>
            </button>
            <button 
              onClick={() => { setActiveTab("earnings"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "earnings" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Earnings</span>
            </button>
            <button 
              onClick={() => { setActiveTab("verification"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "verification" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verification</span>
            </button>
            <button 
              onClick={() => { setActiveTab("reviews"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "reviews" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <Star className="w-5 h-5" />
              <span>Reviews</span>
            </button>
            <button 
              onClick={() => { setActiveTab("profile"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "profile" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <Settings className="w-5 h-5" />
              <span>Profile & Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[#4A3428] flex items-center justify-center text-sm font-semibold text-white">
                {profile?.full_name?.charAt(0) || 'I'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-gray-800">{profile?.full_name || 'Instructor'}</div>
                <div className="text-xs text-gray-500">Instructor</div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-500 hover:text-gray-800 hover:bg-gray-200"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 lg:ml-64">
        <header className="lg:hidden sticky top-0 z-40 bg-background border-b border-border p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-accent rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold">Instructor Dashboard</span>
          <div className="w-10" />
        </header>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <button className="absolute top-4 right-4 p-2 bg-background rounded-full" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <main className="p-6 lg:p-8">
          {/* Verification Banner */}
          {isVerificationPending && (
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">Verification in Progress</h3>
                  <p className="text-sm text-blue-800 mb-4">
                    We're reviewing your credentials. This typically takes 2-5 business days. In the meantime, you can prepare your courses and complete your profile.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <AlertCircle className="w-4 h-4" />
                    <span>Course publishing is disabled until verification is complete</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-semibold mb-2">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Here's your teaching dashboard overview</p>
              </div>

              {/* Verification Checklist */}
              {isVerificationPending && (
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-semibold mb-4">What you can do while waiting</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <button
                        onClick={() => setChecklist({ ...checklist, profileComplete: !checklist.profileComplete })}
                        className="flex-shrink-0"
                      >
                        {checklist.profileComplete ? (
                          <CheckSquare className="w-5 h-5 text-green-600" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${checklist.profileComplete ? 'text-muted-foreground line-through' : ''}`}>
                          Complete your provider profile
                        </p>
                        <p className="text-xs text-muted-foreground">Add bio, photo, and expertise areas</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <button
                        onClick={() => setChecklist({ ...checklist, draftCourse: !checklist.draftCourse })}
                        className="flex-shrink-0"
                      >
                        {checklist.draftCourse ? (
                          <CheckSquare className="w-5 h-5 text-green-600" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${checklist.draftCourse ? 'text-muted-foreground line-through' : ''}`}>
                          Draft your first course
                        </p>
                        <p className="text-xs text-muted-foreground">Create course outline and structure</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <button
                        onClick={() => setChecklist({ ...checklist, uploadContent: !checklist.uploadContent })}
                        className="flex-shrink-0"
                      >
                        {checklist.uploadContent ? (
                          <CheckSquare className="w-5 h-5 text-green-600" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${checklist.uploadContent ? 'text-muted-foreground line-through' : ''}`}>
                          Upload lesson content
                        </p>
                        <p className="text-xs text-muted-foreground">Add videos, materials, and resources</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <button
                        onClick={() => setChecklist({ ...checklist, payoutMethod: !checklist.payoutMethod })}
                        className="flex-shrink-0"
                      >
                        {checklist.payoutMethod ? (
                          <CheckSquare className="w-5 h-5 text-green-600" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${checklist.payoutMethod ? 'text-muted-foreground line-through' : ''}`}>
                          Set up your payout method
                        </p>
                        <p className="text-xs text-muted-foreground">Add bank details (payouts unlock after approval)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{totalEnrollments}</div>
                  <div className="text-sm text-muted-foreground">Total Learners</div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{courses?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Active Courses</div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">$0</div>
                  <div className="text-sm text-muted-foreground">Earnings (This Month)</div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">0</div>
                  <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" onClick={() => setActiveTab("courses")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("learners")}>
                    <Users className="w-4 h-4 mr-2" />
                    View Learners
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("earnings")}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <CoursesSection
              courses={courses}
              isLoading={isLoading}
              isCreateOpen={isCreateOpen}
              setIsCreateOpen={setIsCreateOpen}
              newCourse={newCourse}
              setNewCourse={setNewCourse}
              handleCreateCourse={handleCreateCourse}
              handleSubmitForReview={handleSubmitForReview}
              handleArchive={handleArchive}
              handleRestore={handleRestore}
              handleDuplicate={handleDuplicate}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              statusConfig={statusConfig}
              createCourse={createCourse}
              publishedCount={publishedCount}
              underReviewCount={underReviewCount}
              draftCount={draftCount}
              isVerificationPending={isVerificationPending}
            />
          )}

          {/* Learners Tab */}
          {activeTab === "learners" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Learners</h1>
                <p className="text-muted-foreground">Manage and track your learners</p>
              </div>
              <div className="bg-card rounded-2xl p-8 text-center border border-border">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Learner Management</h3>
                <p className="text-muted-foreground mb-4">View all learners across your courses</p>
                <p className="text-sm text-muted-foreground">Total Learners: {totalEnrollments}</p>
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Earnings & Payouts</h1>
                <p className="text-muted-foreground">Track your income and payment history</p>
              </div>
              {isVerificationPending && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Payouts Locked</h4>
                      <p className="text-sm text-amber-800">
                        Earnings tracking and payouts are disabled until your verification is complete. You'll be able to request payouts once approved.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="text-sm text-muted-foreground mb-2">Total Lifetime Earnings</div>
                  <div className="text-4xl font-bold mb-4">$0</div>
                  <Button variant="outline" className="w-full" disabled={isVerificationPending}>View Details</Button>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="text-sm text-muted-foreground mb-2">Available Balance</div>
                  <div className="text-4xl font-bold mb-4">$0</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="hero" className="w-full" disabled={isVerificationPending}>
                          Request Payout
                        </Button>
                      </TooltipTrigger>
                      {isVerificationPending && (
                        <TooltipContent>
                          <p>Available after verification is complete</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold mb-4">Transaction History</h3>
                <p className="text-muted-foreground text-center py-8">No transactions yet</p>
              </div>
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === "verification" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Verification & Compliance</h1>
                <p className="text-muted-foreground">Complete your verification to publish courses</p>
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Identity Verification</h3>
                    <p className="text-sm text-muted-foreground mb-3">Verified</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Professional Credentials</h3>
                    <p className="text-sm text-muted-foreground mb-3">Pending Review</p>
                    <Button variant="outline" size="sm">Upload Credentials</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Reviews & Reputation</h1>
                <p className="text-muted-foreground">Manage your course reviews and ratings</p>
              </div>
              <div className="bg-card rounded-2xl p-8 text-center border border-border">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground">Reviews will appear here as learners complete your courses</p>
              </div>
            </div>
          )}

          {/* Profile & Settings Tab */}
          {activeTab === "profile" && (
            <CertificateBrandingSection profile={profile} />
          )}
        </main>
      </div>
    </div>
  );
};

const CertificateBrandingSection = ({ profile }: any) => {
  const { toast } = useToast();
  const [certificateSettings, setCertificateSettings] = useState({
    issuingEntityName: profile?.full_name || "",
    logo: null as File | null,
    logoPreview: "",
    signatoryName: "",
    signature: null as File | null,
    signaturePreview: "",
    accreditationNumber: "",
    footerText: "This certificate verifies that the above-named individual has successfully completed the course requirements.",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateSettings({
        ...certificateSettings,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateSettings({
        ...certificateSettings,
        signature: file,
        signaturePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    // Save to localStorage for now
    localStorage.setItem('certificate_branding', JSON.stringify({
      ...certificateSettings,
      logo: certificateSettings.logoPreview,
      signature: certificateSettings.signaturePreview,
    }));
    
    toast({
      title: "Settings saved",
      description: "Your certificate branding settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your instructor profile and certificate branding</p>
      </div>

      {/* Basic Profile Information */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold mb-4">Public Instructor Profile</h3>
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={profile?.full_name || ''} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={profile?.email || ''} disabled />
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>

      {/* Certificate Branding Settings */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Certificate Branding</h3>
          <p className="text-sm text-muted-foreground">Configure how certificates issued by you will appear</p>
        </div>

        {/* Issuing Entity Name */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Issuing Entity Name</Label>
          <Input
            value={certificateSettings.issuingEntityName}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, issuingEntityName: e.target.value })}
            placeholder="Your name or institution name"
          />
          <p className="text-xs text-muted-foreground mt-1">This will appear as the issuer on all certificates</p>
        </div>

        {/* Logo Upload */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Logo</Label>
          {certificateSettings.logoPreview ? (
            <div className="flex items-center gap-4">
              <img src={certificateSettings.logoPreview} alt="Logo" className="h-16 w-auto border border-border rounded" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCertificateSettings({ ...certificateSettings, logo: null, logoPreview: "" })}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Upload Logo</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </label>
            </div>
          )}
        </div>

        {/* Authorized Signatory Name */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Authorized Signatory Name</Label>
          <Input
            value={certificateSettings.signatoryName}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, signatoryName: e.target.value })}
            placeholder="Name of person authorized to sign certificates"
          />
        </div>

        {/* Signature Upload */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Signature</Label>
          {certificateSettings.signaturePreview ? (
            <div className="flex items-center gap-4">
              <img src={certificateSettings.signaturePreview} alt="Signature" className="h-12 w-auto border border-border rounded bg-white p-2" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCertificateSettings({ ...certificateSettings, signature: null, signaturePreview: "" })}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="hidden"
                id="signature-upload"
              />
              <label htmlFor="signature-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Upload Signature</p>
                <p className="text-xs text-muted-foreground mt-1">PNG with transparent background recommended</p>
              </label>
            </div>
          )}
        </div>

        {/* Accreditation Number */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Accreditation Number (Optional)</Label>
          <Input
            value={certificateSettings.accreditationNumber}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, accreditationNumber: e.target.value })}
            placeholder="e.g., ACC-2024-001"
          />
          <p className="text-xs text-muted-foreground mt-1">If your institution has an accreditation number</p>
        </div>

        {/* Footer Text */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Certificate Footer Text</Label>
          <Textarea
            value={certificateSettings.footerText}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, footerText: e.target.value })}
            rows={3}
            placeholder="Default text that appears at the bottom of certificates"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button onClick={handleSave} variant="hero">
            Save Certificate Settings
          </Button>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Certificate Preview</h3>
        <div className="border-2 border-border rounded-lg p-8 bg-gradient-to-br from-primary/5 to-background">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            {certificateSettings.logoPreview && (
              <img src={certificateSettings.logoPreview} alt="Logo" className="h-12 w-auto mx-auto mb-4" />
            )}
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Certificate of Completion</div>
            <h3 className="text-2xl font-serif font-bold">{certificateSettings.issuingEntityName || "Issuing Entity"}</h3>
            <p className="text-sm text-muted-foreground">This is to certify that</p>
            <div className="text-xl font-semibold border-b-2 border-primary inline-block px-8 pb-1">[Student Name]</div>
            <p className="text-sm text-muted-foreground">has successfully completed</p>
            <div className="text-lg font-semibold">[Course Title]</div>
            <div className="flex justify-center gap-8 pt-6">
              <div className="text-center">
                {certificateSettings.signaturePreview ? (
                  <img src={certificateSettings.signaturePreview} alt="Signature" className="h-12 w-auto mx-auto mb-2" />
                ) : (
                  <div className="border-t border-foreground pt-1 px-8 mb-2">
                    <p className="text-xs text-muted-foreground invisible">Signature</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{certificateSettings.signatoryName || "Authorized Signatory"}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-foreground pt-1 px-8 mb-2">
                  <p className="text-xs text-muted-foreground invisible">Date</p>
                </div>
                <p className="text-xs text-muted-foreground">Date</p>
              </div>
            </div>
            {certificateSettings.accreditationNumber && (
              <p className="text-xs text-muted-foreground pt-4">Accreditation: {certificateSettings.accreditationNumber}</p>
            )}
            <p className="text-xs text-muted-foreground pt-4">{certificateSettings.footerText}</p>
            <p className="text-xs text-muted-foreground">Certificate ID: [Auto-generated]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesSection = ({
  courses,
  isLoading,
  isCreateOpen,
  setIsCreateOpen,
  newCourse,
  setNewCourse,
  handleCreateCourse,
  handleSubmitForReview,
  handleArchive,
  handleRestore,
  handleDuplicate,
  handleDelete,
  handleEdit,
  statusConfig,
  createCourse,
  publishedCount,
  underReviewCount,
  draftCount,
  isVerificationPending,
}: any) => {
  const [studentCourseId, setStudentCourseId] = useState<string | null>(null);
  const { data: studentList } = useCourseStudents(studentCourseId || "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Courses</h1>
          <p className="text-muted-foreground">Create and manage your course content</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Fill in the basic details to create a new course draft.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g., Advanced Hair Coloring Techniques"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select value={newCourse.category} onValueChange={(v) => setNewCourse({ ...newCourse, category: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="body-aesthetics">Body Aesthetics & Sculpting</SelectItem>
                      <SelectItem value="breast-aesthetics">Breast Aesthetics & Enhancement</SelectItem>
                      <SelectItem value="facial-aesthetics">Facial Aesthetics & Rejuvenation</SelectItem>
                      <SelectItem value="eye-feature">Eye, Ear & Feature Enhancement</SelectItem>
                      <SelectItem value="injectables-fillers">Injectables & Fillers</SelectItem>
                      <SelectItem value="client-care">Client Care & Professional Practice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Level *</Label>
                  <Select value={newCourse.level} onValueChange={(v) => setNewCourse({ ...newCourse, level: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="professional awareness">Professional Awareness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  placeholder="99"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Brief description of your course..."
                  rows={3}
                />
              </div>
              <Button className="w-full" onClick={handleCreateCourse} disabled={createCourse.isPending}>
                {createCourse.isPending ? 'Creating...' : 'Create Course'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="text-2xl font-semibold">{courses?.length || 0}</div>
          <div className="text-sm text-muted-foreground">Total Courses</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="text-2xl font-semibold">{publishedCount}</div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="text-2xl font-semibold">{underReviewCount}</div>
          <div className="text-sm text-muted-foreground">Under Review</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="text-2xl font-semibold">{draftCount}</div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </div>
      </div>

      {/* Courses List */}
      {isLoading ? (
        <p className="text-muted-foreground">Loading your courses...</p>
      ) : courses && courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course: any) => (
            <div key={course.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <img
                  src={course.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'}
                  alt={course.title}
                  className="w-32 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {statusConfig[course.status]?.badge}
                        <Badge variant="secondary" className="capitalize">{course.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{course.level}</span>
                        <span>${course.price}</span>
                        <span>{course._count?.lessons || 0} lessons</span>
                        <button
                          className="underline-offset-4 hover:underline"
                          onClick={() => setStudentCourseId(course.id)}
                        >
                          {course._count?.enrollments || 0} students
                        </button>
                      </div>
                      {course.review_feedback && (
                        <p className="text-xs text-muted-foreground mt-2">{course.review_feedback}</p>
                      )}
                    </div>
                    <CourseActions
                      courseId={course.id}
                      status={course.status}
                      onSubmit={() => handleSubmitForReview(course.id)}
                      onArchive={() => handleArchive(course.id)}
                      onRestore={() => handleRestore(course.id)}
                      onDuplicate={() => handleDuplicate(course.id)}
                      onDelete={() => handleDelete(course.id)}
                      onEdit={() => handleEdit(course.id)}
                      isVerificationPending={isVerificationPending}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-12 text-center border border-border">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">Create your first course to start teaching.</p>
          <Button variant="hero" onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>
      )}

      <Dialog open={!!studentCourseId} onOpenChange={(open) => !open && setStudentCourseId(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Learners</DialogTitle>
            <DialogDescription>Enrolled learners and their progress.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {studentList && studentList.length > 0 ? (
              studentList.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="font-medium">{student.full_name}</div>
                    <div className="text-xs text-muted-foreground">{student.email}</div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{student.progress_label || "In progress"}</div>
                    <div className="text-xs">Enrolled {new Date(student.enrolled_at).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No learners enrolled yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CourseActionsProps {
  courseId: string;
  status: "draft" | "under_review" | "published" | "archived";
  onSubmit: () => void;
  onArchive: () => void;
  onRestore: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isVerificationPending?: boolean;
}

const CourseActions = ({ status, onSubmit, onArchive, onRestore, onDuplicate, onDelete, onEdit, courseId, isVerificationPending }: CourseActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isDraft = status === "draft";
  const isUnderReview = status === "under_review";
  const isPublished = status === "published";
  const isArchived = status === "archived";

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Course</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to={`/courses/${courseId}`} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View (learner preview)
            </Link>
          </DropdownMenuItem>
          {!isUnderReview && !isArchived && (
          <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onDuplicate} className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isDraft && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuItem 
                    onClick={onSubmit} 
                    className="flex items-center gap-2"
                    disabled={isVerificationPending}
                  >
                    <Send className="w-4 h-4" />
                    Submit for review
                  </DropdownMenuItem>
                </TooltipTrigger>
                {isVerificationPending && (
                  <TooltipContent>
                    <p>Available after verification is complete</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )}
          {isPublished && (
            <DropdownMenuItem onClick={onArchive} className="flex items-center gap-2 text-destructive">
              <Archive className="w-4 h-4" />
              Archive / Unpublish
            </DropdownMenuItem>
          )}
          {isArchived && (
            <DropdownMenuItem onClick={onRestore} className="flex items-center gap-2">
              <Undo className="w-4 h-4" />
              Restore to draft
            </DropdownMenuItem>
          )}
          {isUnderReview && (
            <DropdownMenuItem disabled className="flex items-center gap-2 text-muted-foreground">
              <Send className="w-4 h-4" />
              Awaiting approval
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {isDraft && (
            <DropdownMenuItem onClick={handleDeleteClick} className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-4 h-4" />
              Delete draft
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete draft course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the draft course and all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InstructorDashboard;
