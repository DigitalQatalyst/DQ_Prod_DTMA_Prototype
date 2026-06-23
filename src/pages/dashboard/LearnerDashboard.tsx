import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments, useCertificates } from '@/hooks/useCourses';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight,
  ChevronLeft,
  Loader2,
  PlayCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { ProfileManagement } from '@/components/dashboard/ProfileManagement';
import { ProgressTracking } from '@/components/dashboard/ProgressTracking';
import { AssignmentsCredentials } from '@/components/dashboard/AssignmentsCredentials';
import { CertificatesBadges } from '@/components/dashboard/CertificatesBadges';
import { CollaborationTools } from '@/components/dashboard/CollaborationTools';
import { LiveClassesNotifications } from '@/components/dashboard/LiveClassesNotifications';
import { GamificationFeatures } from '@/components/dashboard/GamificationFeatures';
import { AIAgentStackWorkspace } from '@/components/dashboard/ai-cockpit/AIAgentStackWorkspace';
import { TransactAI } from '@/components/mentor/TransactAI';
import DTMALogo from '@/components/layout/DTMALogo';
import JourneyContextSwitcher from '@/components/layout/JourneyContextSwitcher';
import {
  LearnerDashboardSidebar,
  type LearnerTabId,
} from '@/components/dashboard/LearnerDashboardSidebar';
import { CourseCatalogPanel } from '@/components/dashboard/CourseCatalogPanel';
import { LearnerOverviewPanel } from '@/components/dashboard/LearnerOverviewPanel';
import { LearnerDashboardOverview } from '@/components/dashboard/LearnerDashboardOverview';
import { LearnerCoursesHub } from '@/components/dashboard/LearnerCoursesHub';
import CourseDetail from '@/pages/CourseDetail';
import {
  btnPrimary,
  learnerPageDescription,
  learnerPageTitle,
  learnerWorkspaceBg,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface OnboardingData {
  learningGoal: string;
  skillLevel: string;
  preferredFormat: string;
}

const TAB_DESCRIPTIONS: Partial<Record<LearnerTabId, string>> = {
  courses: 'Your personal learning workspace for progress, certification readiness, and AI guidance.',
  gamification: 'Daily challenges, streaks, and bite-sized learning paths.',
  assignments:
    'Submit work, track progress, review feedback, and stay on top of certification requirements.',
  certificates: 'View your earned certificates and achievement badges.',
  collaboration: 'Ask questions, join forums, and chat with your cohort.',
  live: 'Join instructor-led sessions, prepare for upcoming classes, and track your attendance.',
  progress:
    'Track learning activity, measure capability growth, capture knowledge, and prepare for certification success.',
  profile: 'Update your personal details and account preferences.',
  'ai-cockpit': 'Personalized digital transformation intelligence workspace.',
  catalog: 'Browse the DTMA transformation capability catalog and discover your next learning milestone.',
};

const getPageTitle = (
  activeTab: LearnerTabId,
  firstName: string,
) => {
  if (activeTab === 'getting-started') return 'Home';
  if (activeTab === 'ai-cockpit') return 'AI Agent Stack';
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
    return TAB_DESCRIPTIONS.catalog;
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
  const { data: certificates } = useCertificates();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LearnerTabId>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Get onboarding data from localStorage
  const onboardingData = useMemo(() => {
    const stored = localStorage.getItem('learnerOnboarding');
    return stored ? (JSON.parse(stored) as OnboardingData) : null;
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };


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
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-[1200px] px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="lg:hidden -ml-2 shrink-0 p-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
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
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-dq-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2 rounded-sm"
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
                      <p className={cn(learnerPageDescription, 'mt-1')}>
                        {pageDescription}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <JourneyContextSwitcher className="inline-flex shrink-0" />
                <Avatar className="h-8 w-8 shrink-0 ring-2 ring-dq-orange lg:hidden">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-gray-100 text-xs text-dq-navy">
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {activeTab === 'overview' && inProgressCourses.length > 0 && !selectedCourseId && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <Link to={`/courses/${inProgressCourses[0].course_id}/learn`}>
                  <Button className={btnPrimary} size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Continue Learning
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className={cn(
            'mx-auto w-full max-w-[1200px]',
            selectedCourseId
              ? 'p-4 lg:p-6'
              : activeTab === 'catalog'
                ? 'px-4 pb-8 pt-4 lg:px-8'
                : 'p-4 lg:p-6'
          )}
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
            <CourseCatalogPanel
              embedded
              onCourseClick={handleCourseSelect}
              userName={profile?.full_name?.split(' ')[0] ?? 'Learner'}
              enrollments={enrollments ?? []}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'getting-started' && (
            <LearnerOverviewPanel
              onNavigate={setActiveTab}
              onboardingData={onboardingData}
            />
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <LearnerDashboardOverview
              enrollments={enrollments ?? []}
              certificateCount={certificates?.length ?? 0}
              onboardingGoal={onboardingData?.learningGoal}
              onNavigate={(tab) => setActiveTab(tab)}
              onCourseSelect={handleCourseSelect}
            />
          )}


          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <LearnerCoursesHub
              enrollments={enrollments ?? []}
              certificateCount={certificates?.length ?? 0}
              onboardingGoal={onboardingData?.learningGoal}
              isLoading={enrollmentsLoading}
              onNavigate={setActiveTab}
              onCourseSelect={handleCourseSelect}
            />
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <ProfileManagement />
          )}

          {/* Progress & Notes Tab */}
          {activeTab === 'progress' && (
            <ProgressTracking onNavigate={setActiveTab} />
          )}

          {/* Assignments & Credentials Tab */}
          {activeTab === 'assignments' && (
            <AssignmentsCredentials onNavigate={setActiveTab} />
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
            <LiveClassesNotifications onNavigate={setActiveTab} />
          )}

          {/* Gamification Features Tab */}
          {activeTab === 'gamification' && (
            <GamificationFeatures />
          )}

          {activeTab === 'ai-cockpit' && (
            <AIAgentStackWorkspace
              enrolledCourses={enrollments?.length || 0}
              completedCourses={completedCourses.length}
              averageProgress={totalProgress}
              streak={5}
            />
          )}
          </>
          )}
        </div>
      </main>

      {activeTab !== 'ai-cockpit' && activeTab !== 'assignments' && activeTab !== 'progress' && (
      <TransactAI
        enrolledCourses={enrollments?.length || 0}
        completedCourses={completedCourses.length}
        averageProgress={totalProgress}
        learningGoal={onboardingData?.learningGoal || ''}
        skillLevel={onboardingData?.skillLevel || 'Beginner'}
        streak={5}
        contextualHint={activeTab === 'live'}
      />
      )}
    </div>
  );
};

export default LearnerDashboard;
