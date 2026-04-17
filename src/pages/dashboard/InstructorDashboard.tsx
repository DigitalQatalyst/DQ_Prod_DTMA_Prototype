import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { LearnerManagementTable } from "@/components/instructor/LearnerManagementTable";
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
  Award,
} from "lucide-react";

const InstructorDashboard = () => {
  const { profile, signOut, role } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
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

  // Check for tab state from navigation
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
      // Clear the state after using it
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Check if instructor is in verification pending state
  // For now, we'll use a flag from localStorage that gets set when they complete verification
  const isVerificationPending = localStorage.getItem("instructor_verification_pending") === "true";

  const [checklist, setChecklist] = useState({
    profileComplete: false,
    draftCourse: false,
    uploadContent: false,
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
    <div className="min-h-screen bg-[#F5F6FA] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2348] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/dtma-logo.png"
                alt="DTMA"
                className="h-[32px] w-auto"
              />
            </Link>
          </div>

          <RoleSwitcher currentRole="instructor" />

          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => { setActiveTab("overview"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "overview" ? "bg-[#ff6b4d] text-white" : "text-white/70 hover:bg-white/10"}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => { setActiveTab("courses"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "courses" ? "bg-[#ff6b4d] text-white" : "text-white/70 hover:bg-white/10"}`}
            >
              <BookOpen className="w-5 h-5" />
              <span>My Courses</span>
            </button>
            <button 
              onClick={() => { setActiveTab("learners"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "learners" ? "bg-[#ff6b4d] text-white" : "text-white/70 hover:bg-white/10"}`}
            >
              <Users className="w-5 h-5" />
              <span>Learners</span>
            </button>
            <button 
              onClick={() => { setActiveTab("verification"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "verification" ? "bg-[#ff6b4d] text-white" : "text-white/70 hover:bg-white/10"}`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verification</span>
            </button>
            <button 
              onClick={() => { setActiveTab("reviews"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "reviews" ? "bg-[#ff6b4d] text-white" : "text-white/70 hover:bg-white/10"}`}
            >
              <Star className="w-5 h-5" />
              <span>Reviews</span>
            </button>
            <button 
              onClick={() => { setActiveTab("profile"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "profile" ? "bg-[#ff6b4d] text-white" : "text-white/70 hover:bg-white/10"}`}
            >
              <Settings className="w-5 h-5" />
              <span>Profile & Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[#ff6b4d] flex items-center justify-center text-sm font-semibold text-white">
                {profile?.full_name?.charAt(0) || 'I'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-white">{profile?.full_name || 'Instructor'}</div>
                <div className="text-xs text-white/70">Instructor</div>
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

      {/* Mobile Header */}
      <div className="flex-1 lg:ml-64">
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-[#fff0ed] rounded-lg">
            <Menu className="w-6 h-6 text-[#1e2348]" />
          </button>
          <span className="font-semibold text-[#1e2348]">Instructor Dashboard</span>
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
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Verification Banner - Only shown on Dashboard tab */}
              {isVerificationPending && (
                <div className="bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] border border-[#ff6b4d]/20 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Clock className="w-6 h-6 text-[#ff6b4d]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-[24px] font-semibold text-[#1e2348] mb-2">Verification in Progress</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[#4B5563] mb-4">
                        We're reviewing your credentials. This typically takes 2-5 business days. In the meantime, you can prepare your courses and complete your profile.
                      </p>
                      <div className="flex items-center gap-2 text-[13px] leading-[18px] font-medium text-[#1e2348] bg-white rounded-xl px-4 py-3 border border-[#ff6b4d]/10 shadow-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#ff6b4d]" />
                        <span>Course publishing is disabled until verification is complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[#1e2348]">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[#4B5563]">Here's your teaching dashboard overview</p>
              </div>

              {/* Verification Checklist */}
              {isVerificationPending && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E5E7EB]">
                  <h3 className="text-[20px] leading-[28px] font-semibold mb-6 text-[#1e2348]">What you can do while waiting</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F5F6FA] transition-colors cursor-pointer border border-[#E5E7EB] hover:border-[#ff6b4d]/30 hover:shadow-sm">
                      <button
                        onClick={() => setChecklist({ ...checklist, profileComplete: !checklist.profileComplete })}
                        className="flex-shrink-0"
                      >
                        {checklist.profileComplete ? (
                          <CheckSquare className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Square className="w-6 h-6 text-[#9CA3AF]" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-[15px] leading-[22px] font-semibold ${checklist.profileComplete ? 'text-[#9CA3AF] line-through' : 'text-[#1e2348]'}`}>
                          Complete your provider profile
                        </p>
                        <p className="text-[13px] leading-[18px] font-normal text-[#4B5563] mt-1">Add bio, photo, and expertise areas</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F5F6FA] transition-colors cursor-pointer border border-[#E5E7EB] hover:border-[#ff6b4d]/30 hover:shadow-sm">
                      <button
                        onClick={() => setChecklist({ ...checklist, draftCourse: !checklist.draftCourse })}
                        className="flex-shrink-0"
                      >
                        {checklist.draftCourse ? (
                          <CheckSquare className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Square className="w-6 h-6 text-[#9CA3AF]" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-[15px] leading-[22px] font-semibold ${checklist.draftCourse ? 'text-[#9CA3AF] line-through' : 'text-[#1e2348]'}`}>
                          Draft your first course
                        </p>
                        <p className="text-[13px] leading-[18px] font-normal text-[#4B5563] mt-1">Create course outline and structure</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F5F6FA] transition-colors cursor-pointer border border-[#E5E7EB] hover:border-[#ff6b4d]/30 hover:shadow-sm">
                      <button
                        onClick={() => setChecklist({ ...checklist, uploadContent: !checklist.uploadContent })}
                        className="flex-shrink-0"
                      >
                        {checklist.uploadContent ? (
                          <CheckSquare className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Square className="w-6 h-6 text-[#9CA3AF]" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-[15px] leading-[22px] font-semibold ${checklist.uploadContent ? 'text-[#9CA3AF] line-through' : 'text-[#1e2348]'}`}>
                          Upload lesson content
                        </p>
                        <p className="text-[13px] leading-[18px] font-normal text-[#4B5563] mt-1">Add videos, materials, and resources</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-xl flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold mb-1 text-[#1e2348]">{totalEnrollments}</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Total Learners</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-emerald-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% this month</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-xl flex items-center justify-center shadow-sm">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold mb-1 text-[#1e2348]">{courses?.length || 0}</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Active Courses</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-[#4B5563] font-medium">
                    <span>{publishedCount} published</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-xl flex items-center justify-center shadow-sm">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold mb-1 text-[#1e2348]">0</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Upcoming Sessions</div>
                  <div className="mt-3 flex items-center gap-1 text-[13px] text-[#4B5563] font-medium">
                    <span>No sessions scheduled</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-white to-[#F5F6FA] rounded-2xl p-6 shadow-md border border-[#E5E7EB]">
                <h3 className="text-[20px] leading-[28px] font-semibold mb-5 text-[#1e2348]">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" onClick={() => setActiveTab("courses")} className="bg-[#ff6b4d] hover:bg-[#e66045] text-white shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("learners")} className="border-[#E5E7EB] text-[#1e2348] hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d]">
                    <Users className="w-4 h-4 mr-2" />
                    View Learners
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
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[#1e2348]">Learners</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[#4B5563]">Manage and track your learners</p>
              </div>
              <LearnerManagementTable />
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === "verification" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[#1e2348]">Verification & Compliance</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[#4B5563]">Complete your verification to publish courses</p>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">Identity Verification</h3>
                        <span className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-emerald-100 text-emerald-700">
                          Verified
                        </span>
                      </div>
                      <p className="text-[15px] leading-[22px] font-normal text-[#4B5563] mb-4">
                        Your identity has been successfully verified. You can now proceed with credential submission.
                      </p>
                      <div className="flex items-center gap-2 text-[14px] text-emerald-600 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <AlertCircle className="w-8 h-8 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">Professional Credentials</h3>
                        <span className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-amber-100 text-amber-700">
                          Pending Review
                        </span>
                      </div>
                      <p className="text-[15px] leading-[22px] font-normal text-[#4B5563] mb-4">
                        Upload your professional credentials, certifications, or qualifications to verify your expertise.
                      </p>
                      <div className="bg-gradient-to-r from-[#F5F6FA] to-[#E5E7EB] rounded-xl p-4 mb-4">
                        <p className="text-[14px] leading-[20px] font-medium text-[#1e2348] mb-2">Required Documents:</p>
                        <ul className="space-y-1.5 text-[13px] leading-[18px] text-[#4B5563]">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b4d]" />
                            Professional certifications or degrees
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b4d]" />
                            Proof of teaching experience (optional)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b4d]" />
                            Industry credentials or licenses
                          </li>
                        </ul>
                      </div>
                      <Button className="bg-[#ff6b4d] hover:bg-[#e66045] text-white shadow-sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Credentials
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[#1e2348]">Reviews & Reputation</h1>
                <p className="text-[15px] leading-[22px] font-normal text-[#4B5563]">Manage your course reviews and ratings</p>
              </div>

              {/* Rating Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center shadow-sm">
                      <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[#1e2348] mb-1">0.0</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Average Rating</div>
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-[#E5E7EB]" />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[#1e2348] mb-1">0</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Total Reviews</div>
                  <div className="mt-3 text-[13px] text-[#4B5563] font-medium">
                    <span>Across all courses</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="text-[36px] leading-[44px] font-bold text-[#1e2348] mb-1">0%</div>
                  <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Response Rate</div>
                  <div className="mt-3 text-[13px] text-[#4B5563] font-medium">
                    <span>Last 30 days</span>
                  </div>
                </div>
              </div>

              {/* Empty State */}
              <div className="bg-gradient-to-br from-white to-[#F5F6FA] rounded-2xl p-12 text-center border border-[#E5E7EB] shadow-md">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Star className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-[20px] leading-[28px] font-semibold mb-3 text-[#1e2348]">No reviews yet</h3>
                <p className="text-[15px] leading-[22px] font-normal text-[#4B5563] mb-6 max-w-md mx-auto">
                  Reviews will appear here as learners complete your courses and share their feedback
                </p>
                <div className="bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] rounded-xl p-4 max-w-lg mx-auto border border-[#ff6b4d]/20">
                  <p className="text-[14px] leading-[20px] text-[#1e2348] font-medium">
                    💡 Tip: Encourage learners to leave reviews by providing excellent course content and support
                  </p>
                </div>
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
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] leading-[36px] font-semibold mb-2 text-[#1e2348]">Profile & Settings</h1>
        <p className="text-[15px] leading-[22px] font-normal text-[#4B5563]">Manage your instructor profile and certificate branding</p>
      </div>

      {/* Basic Profile Information */}
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-2xl flex items-center justify-center shadow-sm">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">Public Instructor Profile</h3>
            <p className="text-[14px] leading-[20px] text-[#4B5563]">Your profile information visible to learners</p>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Full Name</Label>
            <Input 
              value={profile?.full_name || ''} 
              disabled 
              className="bg-[#F5F6FA] border-[#E5E7EB] text-[#1e2348] font-medium" 
            />
          </div>
          <div>
            <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Email</Label>
            <Input 
              value={profile?.email || ''} 
              disabled 
              className="bg-[#F5F6FA] border-[#E5E7EB] text-[#1e2348] font-medium" 
            />
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="border-[#E5E7EB] text-[#1e2348] hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d] shadow-sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Certificate Branding Settings */}
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] space-y-8 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-2xl flex items-center justify-center shadow-sm">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">Certificate Branding</h3>
            <p className="text-[14px] leading-[20px] text-[#4B5563]">Configure how certificates issued by you will appear</p>
          </div>
        </div>

        {/* Issuing Entity Name */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Issuing Entity Name</Label>
          <Input
            value={certificateSettings.issuingEntityName}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, issuingEntityName: e.target.value })}
            placeholder="Your name or institution name"
            className="focus:ring-[#ff6b4d] focus:border-[#ff6b4d] border-[#E5E7EB]"
          />
          <p className="text-[13px] leading-[18px] text-[#4B5563] mt-2">This will appear as the issuer on all certificates</p>
        </div>

        {/* Logo Upload */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Logo</Label>
          {certificateSettings.logoPreview ? (
            <div className="flex items-center gap-4 p-4 bg-[#F5F6FA] rounded-xl border border-[#E5E7EB]">
              <img src={certificateSettings.logoPreview} alt="Logo" className="h-16 w-auto rounded-lg shadow-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCertificateSettings({ ...certificateSettings, logo: null, logoPreview: "" })}
                className="border-[#E5E7EB] hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#ff6b4d] hover:bg-[#fff0ed]/30 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-[#F5F6FA] to-[#E5E7EB] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7 text-[#4B5563]" />
                </div>
                <p className="text-[15px] leading-[22px] font-semibold text-[#1e2348]">Upload Logo</p>
                <p className="text-[13px] leading-[18px] text-[#4B5563] mt-1">PNG, JPG up to 2MB</p>
              </label>
            </div>
          )}
        </div>

        {/* Authorized Signatory Name */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Authorized Signatory Name</Label>
          <Input
            value={certificateSettings.signatoryName}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, signatoryName: e.target.value })}
            placeholder="Name of person authorized to sign certificates"
            className="focus:ring-[#ff6b4d] focus:border-[#ff6b4d] border-[#E5E7EB]"
          />
        </div>

        {/* Signature Upload */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Signature</Label>
          {certificateSettings.signaturePreview ? (
            <div className="flex items-center gap-4 p-4 bg-[#F5F6FA] rounded-xl border border-[#E5E7EB]">
              <img src={certificateSettings.signaturePreview} alt="Signature" className="h-12 w-auto rounded-lg bg-white p-2 shadow-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCertificateSettings({ ...certificateSettings, signature: null, signaturePreview: "" })}
                className="border-[#E5E7EB] hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#ff6b4d] hover:bg-[#fff0ed]/30 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="hidden"
                id="signature-upload"
              />
              <label htmlFor="signature-upload" className="cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-[#F5F6FA] to-[#E5E7EB] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7 text-[#4B5563]" />
                </div>
                <p className="text-[15px] leading-[22px] font-semibold text-[#1e2348]">Upload Signature</p>
                <p className="text-[13px] leading-[18px] text-[#4B5563] mt-1">PNG with transparent background recommended</p>
              </label>
            </div>
          )}
        </div>

        {/* Accreditation Number */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Accreditation Number (Optional)</Label>
          <Input
            value={certificateSettings.accreditationNumber}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, accreditationNumber: e.target.value })}
            placeholder="e.g., ACC-2024-001"
            className="focus:ring-[#ff6b4d] focus:border-[#ff6b4d] border-[#E5E7EB]"
          />
          <p className="text-[13px] leading-[18px] text-[#4B5563] mt-2">If your institution has an accreditation number</p>
        </div>

        {/* Footer Text */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[#1e2348] mb-2 block">Certificate Footer Text</Label>
          <Textarea
            value={certificateSettings.footerText}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, footerText: e.target.value })}
            rows={3}
            placeholder="Default text that appears at the bottom of certificates"
            className="focus:ring-[#ff6b4d] focus:border-[#ff6b4d] border-[#E5E7EB]"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-[#E5E7EB]">
          <Button onClick={handleSave} className="bg-[#ff6b4d] hover:bg-[#e66045] text-white text-[15px] leading-[22px] font-semibold px-8 shadow-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Certificate Settings
          </Button>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-xl flex items-center justify-center shadow-sm">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">Certificate Preview</h3>
            <p className="text-[14px] leading-[20px] text-[#4B5563]">See how your certificate will look</p>
          </div>
        </div>
        <div className="border-2 border-[#E5E7EB] rounded-2xl overflow-hidden bg-white shadow-lg">
          {/* Certificate Header with Gradient */}
          <div className="bg-gradient-to-r from-[#1e2348] to-[#2a3058] p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-sm">
                {certificateSettings.logoPreview ? (
                  <img src={certificateSettings.logoPreview} alt="Logo" className="h-16 w-auto" />
                ) : (
                  <Award className="w-10 h-10" />
                )}
              </div>
              <div className="text-left">
                <p className="text-white/80 text-[12px] leading-[16px] font-semibold mb-1 uppercase tracking-wide">
                  KHDA-Attested Certificate
                </p>
                <h3 className="font-semibold text-[18px] leading-[24px]">
                  {certificateSettings.issuingEntityName || "Issuing Entity"}
                </h3>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-10 bg-gradient-to-br from-white to-[#F5F6FA]">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="text-[12px] leading-[16px] text-[#4B5563] uppercase tracking-wider font-semibold">
                Certificate of Completion
              </div>
              
              <p className="text-[14px] leading-[20px] text-[#4B5563]">
                This is to certify that
              </p>
              
              <div className="text-[24px] leading-[32px] font-bold text-[#1e2348] border-b-2 border-[#ff6b4d] inline-block px-8 pb-2">
                [Student Name]
              </div>
              
              <p className="text-[14px] leading-[20px] text-[#4B5563]">
                has successfully completed
              </p>
              
              <div className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">
                [Course Title]
              </div>

              {/* Issue Date and Certificate ID */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
                  <p className="text-[13px] leading-[18px] text-[#4B5563] mb-1 font-medium">
                    Issue Date
                  </p>
                  <p className="font-semibold text-[15px] leading-[22px] text-[#1e2348]">
                    [Date]
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
                  <p className="text-[13px] leading-[18px] text-[#4B5563] mb-1 font-medium">
                    Certificate ID
                  </p>
                  <p className="font-semibold font-mono text-[13px] leading-[18px] text-[#1e2348]">
                    [Auto-generated]
                  </p>
                </div>
              </div>

              {/* Signature Section */}
              <div className="flex justify-center gap-12 pt-8 border-t-2 border-[#E5E7EB]">
                <div className="text-center">
                  {certificateSettings.signaturePreview ? (
                    <img src={certificateSettings.signaturePreview} alt="Signature" className="h-16 w-auto mx-auto mb-2" />
                  ) : (
                    <div className="h-16 flex items-center justify-center mb-2">
                      <div className="border-t-2 border-[#1e2348] w-32"></div>
                    </div>
                  )}
                  <p className="text-[13px] leading-[18px] font-semibold text-[#1e2348]">
                    {certificateSettings.signatoryName || "Authorized Signatory"}
                  </p>
                  <p className="text-[12px] leading-[16px] text-[#4B5563] mt-1">
                    Instructor
                  </p>
                </div>
              </div>

              {/* Footer Information */}
              {certificateSettings.accreditationNumber && (
                <div className="pt-6">
                  <p className="text-[12px] leading-[16px] text-[#4B5563] font-medium">
                    Accreditation: {certificateSettings.accreditationNumber}
                  </p>
                </div>
              )}
              
              {certificateSettings.footerText && (
                <div className="bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] rounded-xl p-4 border border-[#ff6b4d]/20">
                  <p className="text-[12px] leading-[16px] text-[#1e2348]">
                    {certificateSettings.footerText}
                  </p>
                </div>
              )}
            </div>
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
          <h1 className="text-[28px] leading-[36px] font-semibold text-[#1e2348]">My Courses</h1>
          <p className="text-[15px] leading-[22px] font-normal text-[#4B5563]">Create and manage your course content</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="bg-[#ff6b4d] hover:bg-[#e66045]">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">Create New Course</DialogTitle>
              <DialogDescription className="text-[14px] leading-[20px] font-normal text-[#4B5563]">Fill in the basic details to create a new course draft.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="title" className="text-[13px] leading-[18px] font-medium text-[#1e2348]">Course Title *</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g., Digital Transformation Strategy Fundamentals"
                  className="mt-1.5 focus:ring-[#ff6b4d] focus:ring-opacity-40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[13px] leading-[18px] font-medium text-[#1e2348]">Category *</Label>
                  <Select value={newCourse.category} onValueChange={(v) => setNewCourse({ ...newCourse, category: v })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-transformation" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Digital Transformation</SelectItem>
                      <SelectItem value="digital-business-platform" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Digital Business Platform</SelectItem>
                      <SelectItem value="digital-accelerators" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Digital Accelerators</SelectItem>
                      <SelectItem value="digital-workers" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Digital Workers</SelectItem>
                      <SelectItem value="digital-economy" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Digital Economy</SelectItem>
                      <SelectItem value="digital-cognitive-organisation" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Digital Cognitive Organisation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[13px] leading-[18px] font-medium text-[#1e2348]">Level *</Label>
                  <Select value={newCourse.level} onValueChange={(v) => setNewCourse({ ...newCourse, level: v })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Beginner</SelectItem>
                      <SelectItem value="intermediate" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Intermediate</SelectItem>
                      <SelectItem value="advanced" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Advanced</SelectItem>
                      <SelectItem value="expert" className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="price" className="text-[13px] leading-[18px] font-medium text-[#1e2348]">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  placeholder="99"
                  className="mt-1.5 focus:ring-[#ff6b4d] focus:ring-opacity-40"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-[13px] leading-[18px] font-medium text-[#1e2348]">Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Brief description of your course..."
                  rows={3}
                  className="mt-1.5 focus:ring-[#ff6b4d] focus:ring-opacity-40"
                />
              </div>
              <Button className="w-full bg-[#ff6b4d] hover:bg-[#e66045] text-white" onClick={handleCreateCourse} disabled={createCourse.isPending}>
                {createCourse.isPending ? 'Creating...' : 'Create Course'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[36px] leading-[44px] font-bold text-[#1e2348] mb-1">{courses?.length || 0}</div>
          <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Total Courses</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[36px] leading-[44px] font-bold text-emerald-600 mb-1">{publishedCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Published</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[36px] leading-[44px] font-bold text-amber-600 mb-1">{underReviewCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Under Review</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[36px] leading-[44px] font-bold text-[#9CA3AF] mb-1">{draftCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-[#4B5563]">Drafts</div>
        </div>
      </div>

      {/* Courses List */}
      {isLoading ? (
        <p className="text-[16px] leading-[24px] font-normal text-[#4B5563]">Loading your courses...</p>
      ) : courses && courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course: any) => (
            <div key={course.id} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md hover:shadow-lg transition-all hover:border-[#ff6b4d]/30">
              <div className="flex items-start gap-6">
                <div className="relative flex-shrink-0 group">
                  <img
                    src={course.thumbnail_url || course.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'}
                    alt={course.title}
                    className="w-48 h-32 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {statusConfig[course.status]?.badge}
                        <Badge variant="secondary" className="capitalize bg-[#F5F6FA] text-[#1e2348] border border-[#E5E7EB]">{course.category}</Badge>
                      </div>
                      <h3 className="text-[20px] leading-[28px] font-semibold mb-3 text-[#1e2348]">{course.title}</h3>
                      <div className="flex items-center gap-5 text-[14px] leading-[20px] font-medium text-[#4B5563]">
                        <span className="capitalize flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b4d]" />
                          {course.level}
                        </span>
                        <span className="text-[#ff6b4d] font-semibold text-[16px]">${course.price}</span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#9CA3AF]" />
                          {course._count?.lessons || 0} lessons
                        </span>
                        <button
                          className="flex items-center gap-1.5 hover:text-[#ff6b4d] transition-colors"
                          onClick={() => setStudentCourseId(course.id)}
                        >
                          <Users className="w-4 h-4 text-[#9CA3AF]" />
                          {course._count?.enrollments || 0} students
                        </button>
                      </div>
                      {course.review_feedback && (
                        <div className="mt-3 bg-gradient-to-r from-[#fff0ed] to-[#ffe9e4] px-4 py-3 rounded-xl border border-[#ff6b4d]/20">
                          <p className="text-[13px] leading-[18px] font-medium text-[#1e2348]">{course.review_feedback}</p>
                        </div>
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
        <div className="bg-gradient-to-br from-white to-[#F5F6FA] rounded-2xl p-12 text-center border border-[#E5E7EB] shadow-md">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b4d] to-[#e66045] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-[20px] leading-[28px] font-semibold mb-2 text-[#1e2348]">No courses yet</h3>
          <p className="text-[15px] leading-[22px] font-normal text-[#4B5563] mb-6">Create your first course to start teaching.</p>
          <Button variant="hero" onClick={() => setIsCreateOpen(true)} className="bg-[#ff6b4d] hover:bg-[#e66045] shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>
      )}

      <Dialog open={!!studentCourseId} onOpenChange={(open) => !open && setStudentCourseId(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">Learners</DialogTitle>
            <DialogDescription className="text-[14px] leading-[20px] font-normal text-[#4B5563]">Enrolled learners and their progress.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {studentList && studentList.length > 0 ? (
              studentList.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4 hover:bg-[#F5F6FA] transition-colors">
                  <div>
                    <div className="text-[16px] leading-[24px] font-medium text-[#1e2348]">{student.full_name}</div>
                    <div className="text-[13px] leading-[18px] font-normal text-[#4B5563]">{student.email}</div>
                  </div>
                  <div className="text-right text-[14px] leading-[20px] font-normal text-[#4B5563]">
                    <div>{student.progress_label || "In progress"}</div>
                    <div className="text-[12px] leading-[16px]">Enrolled {new Date(student.enrolled_at).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[14px] leading-[20px] font-normal text-[#4B5563] text-center py-8">No learners enrolled yet.</p>
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
          <Button variant="outline" size="sm" className="border-[#E5E7EB] hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-[#1e2348]">Course</DropdownMenuLabel>
          <DropdownMenuItem asChild className="hover:bg-[#fff0ed] hover:text-[#ff6b4d]">
            <Link to={`/courses/${courseId}`} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View (learner preview)
            </Link>
          </DropdownMenuItem>
          {!isUnderReview && !isArchived && (
          <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2 hover:bg-[#fff0ed] hover:text-[#ff6b4d]">
            <Edit className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onDuplicate} className="flex items-center gap-2 hover:bg-[#fff0ed] hover:text-[#ff6b4d]">
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
                    className="flex items-center gap-2 hover:bg-[#fff0ed] hover:text-[#ff6b4d]"
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
            <DropdownMenuItem onClick={onArchive} className="flex items-center gap-2 text-destructive hover:bg-red-50">
              <Archive className="w-4 h-4" />
              Archive / Unpublish
            </DropdownMenuItem>
          )}
          {isArchived && (
            <DropdownMenuItem onClick={onRestore} className="flex items-center gap-2 hover:bg-[#fff0ed] hover:text-[#ff6b4d]">
              <Undo className="w-4 h-4" />
              Restore to draft
            </DropdownMenuItem>
          )}
          {isUnderReview && (
            <DropdownMenuItem disabled className="flex items-center gap-2 text-[#9CA3AF]">
              <Send className="w-4 h-4" />
              Awaiting approval
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {isDraft && (
            <DropdownMenuItem onClick={handleDeleteClick} className="flex items-center gap-2 text-destructive hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              Delete draft
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[20px] leading-[28px] font-semibold text-[#1e2348]">Delete draft course?</AlertDialogTitle>
            <AlertDialogDescription className="text-[14px] leading-[20px] text-[#4B5563]">
              This action cannot be undone. This will permanently delete the draft course and all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#E5E7EB] hover:bg-[#F5F6FA]">Cancel</AlertDialogCancel>
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
