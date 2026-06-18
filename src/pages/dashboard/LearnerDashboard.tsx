import { useState, useMemo, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments, useCertificates } from '@/hooks/useCourses';
import { dtmaCoursesNew as dtmaCourses } from '@/data/dtmaCoursesNew';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Loader2,
  PlayCircle,
  Download,
  User,
  LogOut,
  Home,
  Menu,
  X,
  Trophy,
  Target,
  Calendar,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Video,
  TrendingUp,
  MessageSquare,
  Zap,
  Search,
  Bell,
} from 'lucide-react';
import { ProfileManagement } from '@/components/dashboard/ProfileManagement';
import { ProgressTracking } from '@/components/dashboard/ProgressTracking';
import { AssignmentsCredentials } from '@/components/dashboard/AssignmentsCredentials';
import { CertificatesBadges } from '@/components/dashboard/CertificatesBadges';
import { CollaborationTools } from '@/components/dashboard/CollaborationTools';
import { LiveClassesNotifications } from '@/components/dashboard/LiveClassesNotifications';
import { GamificationFeatures } from '@/components/dashboard/GamificationFeatures';
import { TransactAI } from '@/components/mentor/TransactAI';
import DTMALogo from '@/components/layout/DTMALogo';
import JourneyContextSwitcher from '@/components/layout/JourneyContextSwitcher';
import {
  LearnerDashboardSidebar,
  type LearnerTabId,
} from '@/components/dashboard/LearnerDashboardSidebar';
import { CourseCatalogPanel } from '@/components/dashboard/CourseCatalogPanel';
import { LearnerOverviewPanel } from '@/components/dashboard/LearnerOverviewPanel';
import CourseDetail from '@/pages/CourseDetail';
import {
  btnPrimary,
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerLink,
  learnerPageDescription,
  learnerPageTitle,
  learnerPanel,
  learnerWorkspaceBg,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface OnboardingData {
  learningGoal: string;
  skillLevel: string;
  preferredFormat: string;
}

const TAB_DESCRIPTIONS: Partial<Record<LearnerTabId, string>> = {
  assignments: 'Submit assignments, track your progress, and view feedback',
  certificates: 'View your earned certificates and achievement badges',
};

const getPageTitle = (
  activeTab: LearnerTabId,
  firstName: string,
) => {
  if (activeTab === 'getting-started') return 'Home';
  if (activeTab === 'ai-cockpit') return 'AI cockpit';
  if (activeTab === 'catalog') return 'Explore courses';
  if (activeTab === 'overview') return `Welcome back, ${firstName}`;
  return TAB_LABELS[activeTab];
};

const getPageDescription = (
  activeTab: LearnerTabId,
  inProgressCount: number,
) => {
  if (activeTab === 'getting-started') {
    return undefined;
  }
  if (activeTab === 'catalog') {
    return undefined;
  }
  if (activeTab === 'overview') {
    return inProgressCount > 0
      ? `You have ${inProgressCount} course${inProgressCount > 1 ? 's' : ''} in progress. Keep going!`
      : undefined;
  }
  return TAB_DESCRIPTIONS[activeTab];
};

const TAB_LABELS: Record<LearnerTabId, string> = {
  'getting-started': 'Getting started',
  overview: 'Dashboard',
  courses: 'My courses',
  catalog: 'Explore courses',
  gamification: 'Microlearning paths',
  assignments: 'Assignments',
  certificates: 'Certificates & badges',
  collaboration: 'Discussions',
  live: 'Live classes',
  progress: 'Progress & notes',
  profile: 'My profile',
  'ai-cockpit': 'AI cockpit',
};

const LearnerDashboard = () => {
  const { profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments();
  const { data: certificates, isLoading: certificatesLoading } = useCertificates();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LearnerTabId>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get onboarding data from localStorage
  const onboardingData = useMemo(() => {
    const stored = localStorage.getItem('learnerOnboarding');
    return stored ? (JSON.parse(stored) as OnboardingData) : null;
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Get recommended courses based on onboarding preferences
  const recommendedCourses = useMemo(() => {
    if (!onboardingData) {
      // If no onboarding data, show first 6 DTMA courses
      return dtmaCourses.slice(0, 6);
    }

    const enrolledCourseIds = new Set(enrollments?.map(e => e.course_id) || []);
    
    // Map skill level to course level
    const skillLevelMap: Record<string, string> = {
      'Beginner': 'Beginner',
      'Intermediate': 'Intermediate',
      'Advanced': 'Advanced',
    };

    const targetLevel = skillLevelMap[onboardingData.skillLevel] || 'Beginner';

    // Map learning goals to course categories
    const goalToCategoryMap: Record<string, string[]> = {
      'Career advancement in digital transformation': ['digital-economy', 'digital-cognitive-organisation', 'digital-leadership'],
      'Start my own digital business': ['digital-economy', 'digital-business-platform', 'digital-transformation'],
      'Learn new digital technologies': ['digital-technology', 'digital-accelerators', 'ai-innovation'],
      'Professional certification': ['digital-economy', 'digital-cognitive-organisation', 'digital-transformation'],
      'Personal skill development': ['digital-worker-workspace', 'digital-accelerators', 'digital-leadership'],
      'Career change to tech industry': ['digital-economy', 'digital-technology', 'ai-innovation'],
    };

    const targetCategories = goalToCategoryMap[onboardingData.learningGoal] || [];

    // Score courses based on multiple criteria
    const scoredCourses = dtmaCourses
      .filter(course => !enrolledCourseIds.has(course.id))
      .map(course => {
        let score = 0;

        // Skill level match (highest priority)
        if (course.level === targetLevel) {
          score += 50;
        } else if (
          (targetLevel === 'Beginner' && course.level === 'Intermediate') ||
          (targetLevel === 'Intermediate' && (course.level === 'Beginner' || course.level === 'Advanced')) ||
          (targetLevel === 'Advanced' && course.level === 'Intermediate')
        ) {
          score += 25; // Partial match for adjacent levels
        }

        // Category match (medium priority)
        if (targetCategories.includes(course.category)) {
          score += 30;
        }

        // Popularity bonus (new courses get a small boost)
        if (course.badge === 'New' || course.badge === 'Bestseller') {
          score += 10;
        }

        return { course, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ course }) => course);

    return scoredCourses;
  }, [onboardingData, enrollments]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const inProgressCourses = enrollments?.filter(e => e.status === 'active') || [];
  const completedCourses = enrollments?.filter(e => e.status === 'completed') || [];
  const totalProgress = inProgressCourses.length > 0 
    ? Math.round(inProgressCourses.reduce((acc, e) => acc + (e.progress || 0), 0) / inProgressCourses.length)
    : 0;

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleCourseBack = () => {
    setSelectedCourseId(null);
  };

  const handleCourseEnrolled = () => {
    setSelectedCourseId(null);
    setActiveTab('courses');
  };

  const pageDescription = getPageDescription(activeTab, inProgressCourses.length);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <LearnerDashboardSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedCourseId(null);
          setSidebarOpen(false);
        }}
        onSignOut={handleSignOut}
        profileName={profile?.full_name ?? null}
        profileEmail={profile?.email ?? null}
        profileAvatar={profile?.avatar_url}
        inProgressCount={inProgressCourses.length}
        certificateCount={certificates?.length ?? 0}
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 top-0 z-50 transition-transform duration-200 lg:sticky lg:translate-x-0`}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 h-full overflow-y-auto ${learnerWorkspaceBg}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-start justify-between gap-4">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 shrink-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6 text-dq-navy" />
              ) : (
                <Menu className="h-6 w-6 text-dq-navy" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              {selectedCourseId ? (
                <button
                  type="button"
                  onClick={handleCourseBack}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-dq-navy"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <>
                  <h2 className={learnerPageTitle}>
                    {getPageTitle(activeTab, profile?.full_name?.split(' ')[0] || 'Learner')}
                  </h2>
                  {pageDescription && (
                    <p className={cn(learnerPageDescription, 'mt-0.5')}>
                      {pageDescription}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <JourneyContextSwitcher context="dashboard" className="inline-flex shrink-0" />
              <Avatar className="h-8 w-8 shrink-0 ring-2 ring-dq-orange lg:hidden">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-gray-100 text-xs text-dq-navy">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            </div>
          </div>

          {activeTab === 'overview' && inProgressCourses.length > 0 && !selectedCourseId && (
            <div className="mt-4 flex gap-3">
              <Link to={`/courses/${inProgressCourses[0].course_id}/learn`}>
                <Button className={btnPrimary} size="lg">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
              </Link>
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className={
            selectedCourseId
              ? 'p-4 lg:p-6'
              : activeTab === 'catalog'
                ? 'bg-white'
                : 'p-4 lg:p-6'
          }
        >
          {selectedCourseId ? (
            <CourseDetail
              embedded
              courseId={selectedCourseId}
              onBack={handleCourseBack}
              onCourseSelect={handleCourseSelect}
              onEnrolled={handleCourseEnrolled}
            />
          ) : (
          <>
          {activeTab === 'catalog' && (
            <CourseCatalogPanel embedded onCourseClick={handleCourseSelect} />
          )}

          {activeTab === 'getting-started' && (
            <LearnerOverviewPanel
              onNavigate={setActiveTab}
              onboardingData={onboardingData}
            />
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                <div className={learnerKpiCard}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className={learnerKpiValue}>{inProgressCourses.length}</div>
                  <div className={learnerKpiLabel}>In Progress</div>
                </div>
                <div className={learnerKpiCard}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className={learnerKpiValue}>{completedCourses.length}</div>
                  <div className={learnerKpiLabel}>Completed</div>
                </div>
                <div className={learnerKpiCard}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                      <Award className="h-5 w-5 text-dq-orange" />
                    </div>
                  </div>
                  <div className={learnerKpiValue}>{certificates?.length || 0}</div>
                  <div className={learnerKpiLabel}>Certificates</div>
                </div>
                <div className={learnerKpiCard}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className={learnerKpiValue}>{totalProgress}%</div>
                  <div className={learnerKpiLabel}>Avg. Progress</div>
                </div>
              </div>

              {/* Continue Learning */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className={learnerCardTitle}>Continue Learning</h3>
                  {inProgressCourses.length > 0 && (
                    <button 
                      onClick={() => setActiveTab('courses')}
                      className={learnerLink}
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {enrollmentsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : inProgressCourses.length === 0 ? (
                  <div className={cn(learnerPanel, "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between")}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                        <BookOpen className="h-5 w-5 text-dq-navy" />
                      </div>
                      <div>
                        <h3 className={learnerItemTitle}>No courses yet</h3>
                        <p className={learnerBodyMuted}>Start your learning journey by exploring our digital transformation courses</p>
                      </div>
                    </div>
                    <Button
                      className={cn(btnPrimary, "w-full shrink-0 sm:w-auto")}
                      size="sm"
                      onClick={() => setActiveTab('catalog')}
                    >
                      Explore Courses
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {inProgressCourses.slice(0, 3).map((enrollment) => {
                      // Find the actual course data to get the correct image
                      const courseData = dtmaCourses.find(c => c.id === enrollment.course_id);
                      const courseImage = courseData?.image || enrollment.course?.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                      
                      return (
                        <Link
                          key={enrollment.id}
                          to={`/courses/${enrollment.course_id}/learn`}
                          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200"
                        >
                          <div className="relative">
                            <img
                              src={courseImage}
                              alt={enrollment.course?.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                                {enrollment.progress || 0}% complete
                              </Badge>
                            </div>
                          </div>
                          <div className="p-5">
                            <h4 className={cn(learnerItemTitle, "mb-2 line-clamp-2 transition-colors group-hover:text-dq-orange")}>
                              {enrollment.course?.title}
                            </h4>
                            <div className={cn(learnerBodyMuted, "mb-4 flex items-center gap-2")}>
                              <Clock className="w-4 h-4" />
                              <span>{enrollment.course?.duration_hours || 0} hours</span>
                            </div>
                            <Progress value={enrollment.progress || 0} className="h-2" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Recommended Courses - Carousel */}
              {onboardingData && recommendedCourses.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-dq-orange" />
                      <h3 className={learnerCardTitle}>Recommended for You</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className={learnerLink}
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {recommendedCourses.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-dq-orange" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div 
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
                      >
                        {recommendedCourses.map((course) => (
                          <button
                            key={course.id}
                            type="button"
                            disabled={course.comingSoon}
                            onClick={() => !course.comingSoon && handleCourseSelect(course.id)}
                            className={`group bg-white rounded-xl overflow-hidden shadow-sm transition-all h-full flex flex-col border border-gray-200 flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start text-left ${
                              course.comingSoon ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md hover:shadow-dq-orange/20 cursor-pointer'
                            }`}
                          >
                            <div className="relative">
                              <img
                                src={course.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'}
                                alt={course.title}
                                className={`w-full h-40 object-cover transition-transform duration-300 ${
                                  !course.comingSoon && 'group-hover:scale-105'
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              {course.comingSoon && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Badge className="bg-white text-gray-900 text-sm px-4 py-2">
                                    Coming Soon
                                  </Badge>
                                </div>
                              )}
                              {course.badge && !course.comingSoon && (
                                <div className="absolute top-3 right-3">
                                  <Badge className="bg-dq-orange capitalize text-white">
                                    {course.badge}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                              <h4 className={cn(learnerItemTitle, "mb-2 line-clamp-2 transition-colors group-hover:text-dq-orange")}>
                                {course.title}
                              </h4>
                              <p className={cn(learnerBodyMuted, "mb-4 line-clamp-2 flex-1")}>
                                {course.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className={cn(learnerBodyMuted, "flex items-center gap-2")}>
                                  <Clock className="w-4 h-4" />
                                  <span>{course.duration}</span>
                                </div>
                                <Badge
                                  className={course.comingSoon ? 'bg-gray-100 text-gray-500' : ''}
                                  variant={course.comingSoon ? 'default' : 'secondary'}
                                >
                                  {course.comingSoon ? 'Coming Soon' : course.level}
                                </Badge>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Carousel Dots */}
                      <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: Math.ceil(recommendedCourses.length / 3) }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCarouselIndex(index);
                              if (carouselRef.current) {
                                const cardWidth = carouselRef.current.offsetWidth / 3;
                                carouselRef.current.scrollLeft = index * cardWidth * 3;
                              }
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              carouselIndex === index 
                                ? 'w-8 bg-dq-orange' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to carousel page ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Recent Certificates */}
              {certificates && certificates.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={learnerCardTitle}>Recent Certificates</h3>
                    <button 
                      onClick={() => setActiveTab('certificates')}
                      className={learnerLink}
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {certificates.slice(0, 2).map((cert: any) => (
                      <div key={cert.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 border border-gray-200">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                          <Trophy className="h-7 w-7 text-dq-orange" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(learnerItemTitle, "truncate")}>{cert.course?.title}</h4>
                          <p className={learnerBodyMuted}>
                            Issued {formatDate(cert.issued_at)}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <Tabs defaultValue="in-progress" className="w-full">
                <TabsList className="mb-4 h-9">
                  <TabsTrigger value="in-progress" className="gap-2">
                    <PlayCircle className="w-4 h-4" />
                    In Progress ({inProgressCourses.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Completed ({completedCourses.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="in-progress">
                  {inProgressCourses.length === 0 ? (
                    <div className={cn(learnerPanel, "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between")}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                          <BookOpen className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h3 className={learnerItemTitle}>No courses in progress</h3>
                          <p className={learnerBodyMuted}>Enroll in a course to start learning</p>
                        </div>
                      </div>
                      <Button
                        className={cn(btnPrimary, "w-full shrink-0 sm:w-auto")}
                        size="sm"
                        onClick={() => setActiveTab('catalog')}
                      >
                        Browse Courses
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inProgressCourses.map((enrollment) => {
                        const courseData = dtmaCourses.find(c => c.id === enrollment.course_id);
                        const courseImage = courseData?.image || enrollment.course?.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                        
                        return (
                          <div key={enrollment.id} className={cn(learnerPanel, "flex flex-col gap-4 p-4 sm:flex-row")}>
                            <img
                              src={courseImage}
                              alt={enrollment.course?.title}
                              className="h-24 w-full shrink-0 rounded-lg object-cover sm:w-36"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <h3 className={cn(learnerItemTitle, "truncate")}>{enrollment.course?.title}</h3>
                                  <p className={cn(learnerBodyMuted, "line-clamp-1")}>
                                    {enrollment.course?.short_description}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="shrink-0 text-xs">{enrollment.course?.level}</Badge>
                              </div>
                              <div className={cn(learnerBodyMuted, "mb-3 flex flex-wrap items-center gap-3 text-xs")}>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {enrollment.course?.duration_hours || 0}h
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Enrolled {formatDate(enrollment.enrolled_at)}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Progress value={enrollment.progress || 0} className="h-1.5 flex-1" />
                                <span className="text-xs font-medium text-dq-navy">{enrollment.progress || 0}%</span>
                                <Link to={`/courses/${enrollment.course_id}/learn`}>
                                  <Button className={cn(btnPrimary, "h-8 px-3 text-xs")} size="sm">
                                    <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                                    Continue
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed">
                  {completedCourses.length === 0 ? (
                    <div className={cn(learnerPanel, "flex items-center gap-3 p-4")}>
                      <GraduationCap className="h-8 w-8 shrink-0 text-gray-400" />
                      <div>
                        <h3 className={learnerItemTitle}>No completed courses yet</h3>
                        <p className={learnerBodyMuted}>Complete your first course to earn a certificate!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {completedCourses.map((enrollment) => {
                        // Find the actual course data to get the correct image
                        const courseData = dtmaCourses.find(c => c.id === enrollment.course_id);
                        const courseImage = courseData?.image || enrollment.course?.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                        
                        return (
                          <div key={enrollment.id} className="bg-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-5 border border-gray-200">
                            <img
                              src={courseImage}
                              alt={enrollment.course?.title}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h3 className={cn(learnerCardTitle, "mb-1")}>{enrollment.course?.title}</h3>
                                  <p className={learnerBodyMuted}>
                                    Completed on {enrollment.completed_at ? formatDate(enrollment.completed_at) : 'N/A'}
                                  </p>
                                </div>
                                <Badge className="bg-[#dcfce7] text-[#22c55e] border-[#22c55e]/20">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 mt-4">
                                <Link to={`/courses/${enrollment.course_id}/learn`}>
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <PlayCircle className="w-4 h-4" />
                                    Review Course
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Download className="w-4 h-4" />
                                  Certificate
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <ProfileManagement />
          )}

          {/* Progress & Notes Tab */}
          {activeTab === 'progress' && (
            <ProgressTracking />
          )}

          {/* Assignments & Credentials Tab */}
          {activeTab === 'assignments' && (
            <AssignmentsCredentials />
          )}

          {/* Certificates & Badges Tab */}
          {activeTab === 'certificates' && (
            <CertificatesBadges />
          )}

          {/* Collaboration Tools Tab */}
          {activeTab === 'collaboration' && (
            <CollaborationTools />
          )}

          {/* Live Classes & Notifications Tab */}
          {activeTab === 'live' && (
            <LiveClassesNotifications />
          )}

          {/* Gamification Features Tab */}
          {activeTab === 'gamification' && (
            <GamificationFeatures />
          )}

          {activeTab === 'ai-cockpit' && (
            <TransactAI
              embedded
              enrolledCourses={enrollments?.length || 0}
              completedCourses={completedCourses.length}
              averageProgress={totalProgress}
              learningGoal={onboardingData?.learningGoal || ''}
              skillLevel={onboardingData?.skillLevel || 'Beginner'}
              streak={0}
            />
          )}
          </>
          )}
        </div>
      </main>

      {activeTab !== 'ai-cockpit' && (
      <TransactAI
        enrolledCourses={enrollments?.length || 0}
        completedCourses={completedCourses.length}
        averageProgress={totalProgress}
        learningGoal={onboardingData?.learningGoal || ''}
        skillLevel={onboardingData?.skillLevel || 'Beginner'}
        streak={0}
      />
      )}
    </div>
  );
};

export default LearnerDashboard;
