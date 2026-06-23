import { useMemo, useState, useEffect, useRef } from "react";
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
import {
  InstructorDashboardSidebar,
  type InstructorTabId,
} from "@/components/dashboard/InstructorDashboardSidebar";
import { LearnerManagementTable } from "@/components/instructor/LearnerManagementTable";
import { InstructorCourseBuilderPanel } from "@/components/instructor/InstructorCourseBuilderPanel";
import { InstructorDashboardOverview } from "@/components/dashboard/instructor-overview/InstructorDashboardOverview";
import { LearnerOverviewPanel } from "@/components/dashboard/LearnerOverviewPanel";
import { CourseCatalogPanel } from "@/components/dashboard/CourseCatalogPanel";
import { InstructorAICockpitWorkspace } from "@/components/dashboard/instructor-ai-cockpit/InstructorAICockpitWorkspace";
import { InstructorCoursesHub } from "@/components/dashboard/instructor-courses/InstructorCoursesHub";
import { InstructorReputationHub } from "@/components/dashboard/instructor-reputation/InstructorReputationHub";
import JourneyContextSwitcher from "@/components/layout/JourneyContextSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  User,
  Edit,
  Eye,
  Send,
  Menu,
  X,
  Copy,
  Archive,
  Undo,
  Star,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Trash2,
  Upload,
  Award,
  Camera,
  Save,
  FileText,
  Bell,
  RefreshCw,
} from "lucide-react";
import {
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerIconWell,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerPageDescription,
  learnerPageTitle,
  learnerPanel,
  learnerSectionHeading,
  learnerWorkspaceBg,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

const TAB_LABELS: Record<InstructorTabId, string> = {
  "getting-started": "Home",
  overview: "Dashboard",
  "ai-cockpit": "AI cockpit",
  courses: "My Courses",
  catalog: "Explore courses",
  "course-builder": "Course builder",
  learners: "Learners",
  verification: "Verification & Compliance",
  reviews: "Reviews & Reputation",
  profile: "Profile & Settings",
};

const TAB_DESCRIPTIONS: Partial<Record<InstructorTabId, string>> = {
  overview: "Here's your teaching dashboard overview",
  "ai-cockpit": "Your AI-powered teaching operations center",
  courses: "Create, manage, publish, and optimize your course portfolio.",
  "course-builder": "Build and refine draft courses before marketplace submission",
  learners: "Manage and track your learners",
  verification: "Complete your verification to publish courses",
  reviews: "Monitor learner feedback, strengthen your reputation, and improve course quality.",
  profile: "Manage your instructor profile and certificate branding",
};

const getPageTitle = (activeTab: InstructorTabId, firstName: string) => {
  if (activeTab === "getting-started") return "Home";
  if (activeTab === "ai-cockpit") return "AI Cockpit";
  if (activeTab === "catalog") return "Explore courses";
  if (activeTab === "course-builder") return "Course builder";
  if (activeTab === "overview") return `Welcome back, ${firstName} ðŸ‘‹`;
  return TAB_LABELS[activeTab];
};

const InstructorDashboard = () => {
  const { profile, signOut, role } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<InstructorTabId>("overview");
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
      const tab = location.state.tab as InstructorTabId;
      setActiveTab(tab);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Check if instructor is in verification pending state
  const [isVerificationPending, setIsVerificationPending] = useState(
    () => localStorage.getItem("instructor_verification_pending") === "true"
  );

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

  const totalEnrollments = courses?.reduce((sum, c) => sum + (c._count?.enrollments || 0), 0) || 0;
  const publishedCount = courses?.filter((c) => c.status === "published").length || 0;
  const underReviewCount = courses?.filter((c) => c.status === "under_review").length || 0;
  const draftCount = courses?.filter((c) => c.status === "draft").length || 0;

  const averageRating = useMemo(() => {
    const rated = courses?.filter((c) => (c._avg?.rating ?? 0) > 0) ?? [];
    if (rated.length === 0) return 0;
    return rated.reduce((sum, c) => sum + (c._avg?.rating ?? 0), 0) / rated.length;
  }, [courses]);

  const formattedDate = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [],
  );
  const hasCredentials = useMemo(() => {
    try {
      const raw = localStorage.getItem("instructor_credentials_uploads");
      return raw ? (JSON.parse(raw) as unknown[]).length > 0 : false;
    } catch {
      return false;
    }
  }, [isVerificationPending]);

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

  const firstName = profile?.full_name?.split(" ")[0] || "Instructor";
  const pageDescription = TAB_DESCRIPTIONS[activeTab];

  const handleDashboardRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    toast({ title: "Dashboard refreshed", description: "Latest data loaded." });
  };

  const handleOverviewNavigate = (tab: "catalog" | "overview" | "courses") => {
    setActiveTab(tab);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <InstructorDashboardSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        onSignOut={handleSignOut}
        profileName={profile?.full_name ?? null}
        profileEmail={profile?.email ?? null}
        profileAvatar={profile?.avatar_url}
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-50 transition-transform duration-200 lg:sticky lg:translate-x-0`}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className={cn("flex-1 h-full overflow-y-auto", learnerWorkspaceBg)}>
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-start justify-between gap-4">
            <button
              type="button"
              className="-ml-2 shrink-0 p-2 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6 text-dq-navy" />
              ) : (
                <Menu className="h-6 w-6 text-dq-navy" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <h2 className={learnerPageTitle}>{getPageTitle(activeTab, firstName)}</h2>
              {activeTab === "overview" && (
                <p className="mt-0.5 text-sm text-gray-400">{formattedDate}</p>
              )}
              {pageDescription && (
                <p className={cn(learnerPageDescription, "mt-0.5")}>{pageDescription}</p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {activeTab === "overview" && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden h-9 w-9 rounded-full sm:inline-flex"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4 text-dq-navy" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden h-9 w-9 rounded-full sm:inline-flex"
                    aria-label="Refresh dashboard"
                    onClick={handleDashboardRefresh}
                  >
                    <RefreshCw className="h-4 w-4 text-dq-navy" />
                  </Button>
                </>
              )}
              <JourneyContextSwitcher context="dashboard" className="inline-flex shrink-0" />
              <Avatar className="hidden h-9 w-9 shrink-0 ring-2 ring-dq-orange sm:flex">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gray-100 text-xs text-dq-navy">
                  {profile?.full_name?.charAt(0) || "I"}
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 shrink-0 ring-2 ring-dq-orange sm:hidden">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-gray-100 text-xs text-dq-navy">
                {profile?.full_name?.charAt(0) || "I"}
              </AvatarFallback>
            </Avatar>
            </div>
          </div>
        </header>

        <div className={activeTab === "catalog" ? "bg-white" : "p-4 lg:p-6"}>
          {activeTab === "getting-started" && (
            <LearnerOverviewPanel onNavigate={handleOverviewNavigate} />
          )}

          {activeTab === "catalog" && (
            <CourseCatalogPanel
              embedded
              viewerMode="instructor"
              onNavigate={(tab) => setActiveTab(tab as InstructorTabId)}
            />
          )}

          {activeTab === "ai-cockpit" && (
            <InstructorAICockpitWorkspace
              instructorName={firstName}
              courseCount={courses?.length || 0}
              publishedCount={publishedCount}
              draftCount={draftCount}
              totalEnrollments={totalEnrollments}
            />
          )}

          {activeTab === "course-builder" && (
            <InstructorCourseBuilderPanel
              courses={courses}
              isLoading={isLoading}
              onCreateCourse={() => {
                setActiveTab("courses");
                setIsCreateOpen(true);
              }}
            />
          )}

          {activeTab === "overview" && (
            <InstructorDashboardOverview
              courseCount={courses?.length || 0}
              publishedCount={publishedCount}
              draftCount={draftCount}
              totalEnrollments={totalEnrollments}
              isVerificationPending={isVerificationPending}
              hasCredentials={hasCredentials}
              isLoading={isLoading}
              onNavigate={setActiveTab}
              onCreateCourse={() => {
                setActiveTab("course-builder");
                setIsCreateOpen(true);
              }}
            />
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <InstructorCoursesHub
              courses={courses}
              isLoading={isLoading}
              publishedCount={publishedCount}
              underReviewCount={underReviewCount}
              draftCount={draftCount}
              totalEnrollments={totalEnrollments}
              averageRating={averageRating}
              isVerificationPending={isVerificationPending}
              hasCredentials={hasCredentials}
              isCreateOpen={isCreateOpen}
              setIsCreateOpen={setIsCreateOpen}
              newCourse={newCourse}
              setNewCourse={setNewCourse}
              handleCreateCourse={handleCreateCourse}
              handleSubmitForReview={handleSubmitForReview}
              handleArchive={handleArchive}
              handleDuplicate={handleDuplicate}
              handleEdit={handleEdit}
              createCoursePending={createCourse.isPending}
              onNavigate={setActiveTab}
            />
          )}

          {/* Learners Tab */}
          {activeTab === "learners" && (
            <div className="space-y-4">
              <LearnerManagementTable />
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === "verification" && (
            <VerificationSection onCredentialsUploaded={() => setIsVerificationPending(true)} />
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <InstructorReputationHub
              courses={courses}
              publishedCount={publishedCount}
              averageRating={averageRating}
              onNavigate={setActiveTab}
            />
          )}

          {/* Profile & Settings Tab */}
          {activeTab === "profile" && <CertificateBrandingSection />}
        </div>
      </main>
    </div>
  );
};

const CREDENTIALS_STORAGE_KEY = "instructor_credentials_uploads";

type UploadedCredential = {
  name: string;
  size: number;
  uploadedAt: string;
};

function loadUploadedCredentials(): UploadedCredential[] {
  try {
    const raw = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UploadedCredential[]) : [];
  } catch {
    return [];
  }
}

const VerificationSection = ({
  onCredentialsUploaded,
}: {
  onCredentialsUploaded?: () => void;
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedCredential[]>(loadUploadedCredentials);
  const hasSubmittedCredentials = uploadedFiles.length > 0;

  const handleUploadCredentials = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const newEntries: UploadedCredential[] = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    }));

    const next = [...uploadedFiles, ...newEntries];
    setUploadedFiles(next);
    localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(next));
    localStorage.setItem("instructor_verification_pending", "true");
    onCredentialsUploaded?.();

    toast({
      title: "Credentials uploaded",
      description: `${newEntries.length} file${newEntries.length === 1 ? "" : "s"} submitted for review.`,
    });

    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className={cn(learnerPanel, "p-6")}>
        <div className="flex items-start gap-5">
          <div className={cn(learnerIconWell, "h-14 w-14 bg-emerald-50")}>
            <CheckCircle className="h-7 w-7 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className={learnerSectionHeading}>Identity Verification</h3>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Verified
              </span>
            </div>
            <p className={cn(learnerBody, "mb-3")}>
              Your identity has been successfully verified. You can now proceed with credential submission.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span>Completed on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(learnerPanel, "p-6")}>
        <div className="flex items-start gap-5">
          <div className={cn(learnerIconWell, "h-14 w-14 bg-amber-50")}>
            <AlertCircle className="h-7 w-7 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className={learnerSectionHeading}>Professional Credentials</h3>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  hasSubmittedCredentials
                    ? "bg-amber-50 text-amber-700"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {hasSubmittedCredentials ? "Pending Review" : "Not Submitted"}
              </span>
            </div>
            <p className={cn(learnerBody, "mb-4")}>
              Upload your professional credentials, certifications, or qualifications to verify your expertise.
            </p>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <p className={cn(learnerItemTitle, "mb-2 text-sm")}>Required Documents:</p>
              <ul className={cn(learnerBodyMuted, "space-y-1.5 text-sm")}>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-dq-orange" />
                  Professional certifications or degrees
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-dq-orange" />
                  Proof of teaching experience (optional)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-dq-orange" />
                  Industry credentials or licenses
                </li>
              </ul>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              multiple
              className="hidden"
              onChange={handleUploadCredentials}
            />
            <Button
              type="button"
              className={learnerBtnPrimary}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Credentials
            </Button>

            {hasSubmittedCredentials ? (
              <div className="mt-4 space-y-2">
                <p className={cn(learnerItemTitle, "text-sm")}>Submitted files</p>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.uploadedAt}-${index}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-dq-orange" />
                    <span className="min-w-0 flex-1 truncate">{file.name}</span>
                    <span className="shrink-0 text-xs text-gray-400">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateBrandingSection = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url ?? null);
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

  useEffect(() => {
    setAvatarPreview(profile?.avatar_url ?? null);
  }, [profile?.avatar_url]);

  const getInitials = (name: string | null) => {
    if (!name) return "I";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file (PNG, JPG, or WebP).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Profile picture must be under 2MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSaveProfile = async () => {
    const { error } = await updateProfile({ avatar_url: avatarPreview });
    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setIsEditingProfile(false);
    toast({
      title: "Profile updated",
      description: "Your profile picture has been saved.",
    });
  };

  const handleCancelProfileEdit = () => {
    setAvatarPreview(profile?.avatar_url ?? null);
    setIsEditingProfile(false);
  };

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
    <div className="space-y-4">
      <div className={cn(learnerPanel, "p-6")}>
        <div className="mb-6 flex items-center gap-4">
          <div className={cn(learnerIconWell, "h-14 w-14 bg-orange-50")}>
            <User className="h-7 w-7 text-dq-orange" />
          </div>
          <div>
            <h3 className={learnerSectionHeading}>Public Instructor Profile</h3>
            <p className={learnerBodyMuted}>Your profile information visible to learners</p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatarPreview || undefined} />
                <AvatarFallback className="bg-dq-navy text-sm text-white">
                  {getInitials(profile?.full_name ?? null)}
                </AvatarFallback>
              </Avatar>
              {isEditingProfile ? (
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-dq-orange text-white hover:bg-[#E04020]"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
            <div>
              <p className={learnerItemTitle}>{profile?.full_name || "Instructor"}</p>
              <p className={cn(learnerBodyMuted, "text-sm")}>{profile?.email}</p>
            </div>
          </div>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <div>
            <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Full Name</Label>
            <Input 
              value={profile?.full_name || ''} 
              disabled 
              className="bg-[var(--dq-gray-50)] border-[var(--dq-surface-border-default)] text-[var(--dq-text-primary)] font-medium" 
            />
          </div>
          <div>
            <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Email</Label>
            <Input 
              value={profile?.email || ''} 
              disabled 
              className="bg-[var(--dq-gray-50)] border-[var(--dq-surface-border-default)] text-[var(--dq-text-primary)] font-medium" 
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {isEditingProfile ? (
              <>
                <Button className={learnerBtnPrimary} onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
                <Button variant="outline" onClick={handleCancelProfileEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="border-[var(--dq-surface-border-default)] text-[var(--dq-text-primary)] hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-200)] shadow-sm"
                onClick={() => setIsEditingProfile(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={cn(learnerPanel, "space-y-6 p-6")}>
        <div className="flex items-center gap-4">
          <div className={learnerIconWell}>
            <Award className="h-7 w-7 text-dq-navy" />
          </div>
          <div>
            <h3 className={learnerSectionHeading}>Certificate Branding</h3>
            <p className={learnerBodyMuted}>Configure how certificates issued by you will appear</p>
          </div>
        </div>

        {/* Issuing Entity Name */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Issuing Entity Name</Label>
          <Input
            value={certificateSettings.issuingEntityName}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, issuingEntityName: e.target.value })}
            placeholder="Your name or institution name"
            className="focus:ring-[var(--dq-orange-500)] focus:border-[var(--dq-orange-500)] border-[var(--dq-surface-border-default)]"
          />
          <p className="text-[13px] leading-[18px] text-[var(--dq-text-tertiary)] mt-2">This will appear as the issuer on all certificates</p>
        </div>

        {/* Logo Upload */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Logo</Label>
          {certificateSettings.logoPreview ? (
            <div className="flex items-center gap-4 p-4 bg-[var(--dq-gray-50)] rounded-lg border border-[var(--dq-surface-border-default)]">
              <img src={certificateSettings.logoPreview} alt="Logo" className="h-16 w-auto rounded-lg shadow-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCertificateSettings({ ...certificateSettings, logo: null, logoPreview: "" })}
                className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-error-surface)] hover:text-[var(--dq-error-text)] hover:border-[var(--dq-error)]"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-[var(--dq-surface-border-default)] rounded-lg p-8 text-center hover:border-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-50)] transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="w-14 h-14 bg-[var(--dq-gray-100)] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7 text-[var(--dq-text-tertiary)]" />
                </div>
                <p className="text-[15px] leading-[22px] font-semibold text-[var(--dq-text-primary)]">Upload Logo</p>
                <p className="text-[13px] leading-[18px] text-[var(--dq-text-tertiary)] mt-1">PNG, JPG up to 2MB</p>
              </label>
            </div>
          )}
        </div>

        {/* Authorized Signatory Name */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Authorized Signatory Name</Label>
          <Input
            value={certificateSettings.signatoryName}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, signatoryName: e.target.value })}
            placeholder="Name of person authorized to sign certificates"
            className="focus:ring-[var(--dq-orange-500)] focus:border-[var(--dq-orange-500)] border-[var(--dq-surface-border-default)]"
          />
        </div>

        {/* Signature Upload */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Signature</Label>
          {certificateSettings.signaturePreview ? (
            <div className="flex items-center gap-4 p-4 bg-[var(--dq-gray-50)] rounded-lg border border-[var(--dq-surface-border-default)]">
              <img src={certificateSettings.signaturePreview} alt="Signature" className="h-12 w-auto rounded-lg bg-white p-2 shadow-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCertificateSettings({ ...certificateSettings, signature: null, signaturePreview: "" })}
                className="border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-error-surface)] hover:text-[var(--dq-error-text)] hover:border-[var(--dq-error)]"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-[var(--dq-surface-border-default)] rounded-lg p-8 text-center hover:border-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-50)] transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="hidden"
                id="signature-upload"
              />
              <label htmlFor="signature-upload" className="cursor-pointer">
                <div className="w-14 h-14 bg-[var(--dq-gray-100)] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7 text-[var(--dq-text-tertiary)]" />
                </div>
                <p className="text-[15px] leading-[22px] font-semibold text-[var(--dq-text-primary)]">Upload Signature</p>
                <p className="text-[13px] leading-[18px] text-[var(--dq-text-tertiary)] mt-1">PNG with transparent background recommended</p>
              </label>
            </div>
          )}
        </div>

        {/* Accreditation Number */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Accreditation Number (Optional)</Label>
          <Input
            value={certificateSettings.accreditationNumber}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, accreditationNumber: e.target.value })}
            placeholder="e.g., ACC-2024-001"
            className="focus:ring-[var(--dq-orange-500)] focus:border-[var(--dq-orange-500)] border-[var(--dq-surface-border-default)]"
          />
          <p className="text-[13px] leading-[18px] text-[var(--dq-text-tertiary)] mt-2">If your institution has an accreditation number</p>
        </div>

        {/* Footer Text */}
        <div>
          <Label className="text-[14px] leading-[20px] font-semibold text-[var(--dq-text-primary)] mb-2 block">Certificate Footer Text</Label>
          <Textarea
            value={certificateSettings.footerText}
            onChange={(e) => setCertificateSettings({ ...certificateSettings, footerText: e.target.value })}
            rows={3}
            placeholder="Default text that appears at the bottom of certificates"
            className="focus:ring-[var(--dq-orange-500)] focus:border-[var(--dq-orange-500)] border-[var(--dq-surface-border-default)]"
          />
        </div>

        <div className="flex justify-end border-t border-gray-200 pt-6">
          <Button onClick={handleSave} className={learnerBtnPrimary}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Save Certificate Settings
          </Button>
        </div>
      </div>

      <div className={cn(learnerPanel, "p-6")}>
        <div className="mb-6 flex items-center gap-3">
          <div className={cn(learnerIconWell, "bg-orange-50")}>
            <Eye className="h-5 w-5 text-dq-orange" />
          </div>
          <div>
            <h3 className={learnerSectionHeading}>Certificate Preview</h3>
            <p className={learnerBodyMuted}>See how your certificate will look</p>
          </div>
        </div>
        <div className="border-2 border-[var(--dq-surface-border-default)] rounded-xl overflow-hidden bg-white shadow-lg">
          {/* Certificate Header with Gradient */}
          <div className="bg-gradient-to-r from-[var(--dq-navy-950)] to-[#2a3058] p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-sm">
                {certificateSettings.logoPreview ? (
                  <img src={certificateSettings.logoPreview} alt="Logo" className="h-16 w-auto" />
                ) : (
                  <Award className="w-10 h-10 text-white" />
                )}
              </div>
              <div className="text-left">
                <p className="text-white text-[12px] leading-[16px] font-semibold mb-1 uppercase tracking-wide">
                  KHDA-Attested Certificate
                </p>
                <h3 className="font-semibold text-[18px] leading-[24px] text-white">
                  {certificateSettings.issuingEntityName || "Issuing Entity"}
                </h3>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-10 bg-white">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="text-[12px] leading-[16px] text-[var(--dq-text-tertiary)] uppercase tracking-wider font-semibold">
                Certificate of Completion
              </div>
              
              <p className="text-[14px] leading-[20px] text-[var(--dq-text-tertiary)]">
                This is to certify that
              </p>
              
              <div className="text-[24px] leading-[32px] font-bold text-[var(--dq-text-primary)] border-b-2 border-[var(--dq-orange-500)] inline-block px-8 pb-2">
                [Student Name]
              </div>
              
              <p className="text-[14px] leading-[20px] text-[var(--dq-text-tertiary)]">
                has successfully completed
              </p>
              
              <div className="text-[20px] leading-[28px] font-semibold text-[var(--dq-text-primary)]">
                [Course Title]
              </div>

              {/* Issue Date and Certificate ID */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-[var(--dq-gray-50)] rounded-lg p-4 border border-[var(--dq-surface-border-default)] shadow-sm">
                  <p className="text-[13px] leading-[18px] text-[var(--dq-text-tertiary)] mb-1 font-medium">
                    Issue Date
                  </p>
                  <p className="font-semibold text-[15px] leading-[22px] text-[var(--dq-text-primary)]">
                    [Date]
                  </p>
                </div>
                <div className="bg-[var(--dq-gray-50)] rounded-lg p-4 border border-[var(--dq-surface-border-default)] shadow-sm">
                  <p className="text-[13px] leading-[18px] text-[var(--dq-text-tertiary)] mb-1 font-medium">
                    Certificate ID
                  </p>
                  <p className="font-semibold font-mono text-[13px] leading-[18px] text-[var(--dq-text-primary)]">
                    [Auto-generated]
                  </p>
                </div>
              </div>

              {/* Signature Section */}
              <div className="flex justify-center gap-12 pt-8 border-t-2 border-[var(--dq-surface-border-default)]">
                <div className="text-center">
                  {certificateSettings.signaturePreview ? (
                    <img src={certificateSettings.signaturePreview} alt="Signature" className="h-16 w-auto mx-auto mb-2" />
                  ) : (
                    <div className="h-16 flex items-center justify-center mb-2">
                      <div className="border-t-2 border-[var(--dq-text-primary)] w-32"></div>
                    </div>
                  )}
                  <p className="text-[13px] leading-[18px] font-semibold text-[var(--dq-text-primary)]">
                    {certificateSettings.signatoryName || "Authorized Signatory"}
                  </p>
                  <p className="text-[12px] leading-[16px] text-[var(--dq-text-tertiary)] mt-1">
                    Instructor
                  </p>
                </div>
              </div>

              {/* Footer Information */}
              {certificateSettings.accreditationNumber && (
                <div className="pt-6">
                  <p className="text-[12px] leading-[16px] text-[var(--dq-text-tertiary)] font-medium">
                    Accreditation: {certificateSettings.accreditationNumber}
                  </p>
                </div>
              )}
              
              {certificateSettings.footerText && (
                <div className="bg-[var(--dq-orange-50)] rounded-lg p-4 border border-[var(--dq-orange-200)]">
                  <p className="text-[12px] leading-[16px] text-[var(--dq-text-primary)]">
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
export default InstructorDashboard;
