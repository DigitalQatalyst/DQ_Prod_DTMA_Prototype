import { useState, useMemo } from 'react';
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
  Bot,
  Sparkles,
  Video,
  TrendingUp,
  MessageSquare,
  Zap,
  FileText,
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

interface OnboardingData {
  learningGoal: string;
  skillLevel: string;
  preferredFormat: string;
}

const LearnerDashboard = () => {
  const { profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments();
  const { data: certificates, isLoading: certificatesLoading } = useCertificates();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  return (
    <div className="min-h-screen bg-[var(--dq-gray-50)] flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-[var(--dq-navy-950)] border-r border-[var(--dq-surface-border-default)] transition-transform duration-200 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--dq-surface-border-default)]">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/dtma-logo.png"
              alt="DTMA"
              className="h-[50px] w-auto brightness-0 invert"
            />
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'overview' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[16px] leading-[24px] font-normal">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'courses' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[16px] leading-[24px] font-normal">My Courses</span>
              {inProgressCourses.length > 0 && (
                <Badge className="ml-auto bg-[var(--dq-orange-500)] text-white">{inProgressCourses.length}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('gamification')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'gamification' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="text-[16px] leading-[24px] font-normal">Microlearning Paths</span>
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'assignments' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Award className="w-5 h-5 flex-shrink-0" />
              <span className="text-[16px] leading-[24px] font-normal">Assignments</span>
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'certificates' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className="text-[16px] leading-[24px] font-normal">Certificates & Badges</span>
              {certificates && certificates.length > 0 && (
                <Badge className="ml-auto bg-[var(--dq-orange-500)] text-white">{certificates.length}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('collaboration')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'collaboration' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-[16px] leading-[24px] font-normal">Discussions</span>
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'live' 
                  ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                  : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Video className="w-5 h-5" />
              <span className="text-[16px] leading-[24px] font-normal">Live Classes</span>
            </button>
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                onClick={() => setActiveTab('progress')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'progress' 
                    ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                    : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-[16px] leading-[24px] font-normal">Progress & Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'profile' 
                    ? 'bg-[var(--dq-orange-500)] text-white shadow-lg shadow-[var(--dq-orange-500)]/20' 
                    : 'text-[var(--dq-text-on-dark-secondary)] hover:bg-white/10 hover:text-white'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[16px] leading-[24px] font-normal">Profile</span>
              </button>
            </div>
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Avatar className="w-10 h-10 ring-2 ring-[var(--dq-orange-500)]">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-[var(--dq-orange-500)] text-white">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] leading-[20px] font-medium truncate text-white">{profile?.full_name || 'Learner'}</p>
              <p className="text-[12px] leading-[16px] font-normal text-white/60 truncate">{profile?.email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-3 justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button 
            className="lg:hidden p-2 -ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden lg:block">
            <h1 className="text-[20px] leading-[28px] font-medium text-foreground">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'courses' && 'My Courses'}
              {activeTab === 'certificates' && 'Certificates & Badges'}
              {activeTab === 'profile' && 'Profile Settings'}
              {activeTab === 'progress' && 'Progress & Notes'}
              {activeTab === 'assignments' && 'Assignments'}
              {activeTab === 'collaboration' && 'Discussions'}
              {activeTab === 'live' && 'Live Classes'}
              {activeTab === 'gamification' && 'Microlearning Paths'}
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-1 lg:flex-initial justify-end">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-white rounded-lg px-3 py-2 w-64 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent border-none outline-none text-[14px] leading-[20px] font-normal w-full"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--dq-orange-500)] rounded-full"></span>
            </button>

            {/* Browse Courses Button */}
            <Link to="/courses">
              <Button variant="outline" size="sm" className="gap-2 hover:bg-[var(--dq-orange-500)] hover:text-white hover:border-[var(--dq-orange-500)]">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Browse Courses</span>
              </Button>
            </Link>

            {/* User Avatar - Mobile */}
            <Avatar className="w-8 h-8 lg:hidden ring-2 ring-[var(--dq-orange-500)]">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-[var(--dq-navy-950)] text-white text-xs">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-[var(--dq-navy-950)] rounded-xl p-6 lg:p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-[28px] leading-[36px] lg:text-[32px] lg:leading-[40px] font-semibold mb-2">
                      Welcome back, {profile?.full_name?.split(' ')[0] || 'Learner'}! 👋
                    </h2>
                    <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-on-dark-secondary)]">
                      {inProgressCourses.length > 0 
                        ? `You have ${inProgressCourses.length} course${inProgressCourses.length > 1 ? 's' : ''} in progress. Keep going!`
                        : 'Start your digital transformation journey today!'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {inProgressCourses.length > 0 && (
                      <Link to={`/courses/${inProgressCourses[0].course_id}/learn`}>
                        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20" size="lg">
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Continue Learning
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--dq-navy-50)] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[var(--dq-navy-950)]" />
                    </div>
                  </div>
                  <div className="text-[24px] leading-[32px] font-medium text-[var(--dq-text-primary)]">{inProgressCourses.length}</div>
                  <div className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">In Progress</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--dq-success-surface)] rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[var(--dq-success)]" />
                    </div>
                  </div>
                  <div className="text-[24px] leading-[32px] font-medium text-[var(--dq-text-primary)]">{completedCourses.length}</div>
                  <div className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">Completed</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--dq-orange-50)] rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-[var(--dq-orange-500)]" />
                    </div>
                  </div>
                  <div className="text-[24px] leading-[32px] font-medium text-[var(--dq-text-primary)]">{certificates?.length || 0}</div>
                  <div className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">Certificates</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[var(--dq-surface-border-default)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--dq-navy-50)] rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-[var(--dq-navy-950)]" />
                    </div>
                  </div>
                  <div className="text-[24px] leading-[32px] font-medium text-[var(--dq-text-primary)]">{totalProgress}%</div>
                  <div className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">Avg. Progress</div>
                </div>
              </div>

              {/* Continue Learning */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[20px] leading-[28px] font-medium text-foreground">Continue Learning</h3>
                  {inProgressCourses.length > 0 && (
                    <button 
                      onClick={() => setActiveTab('courses')}
                      className="text-[14px] leading-[20px] font-normal text-[var(--dq-orange-500)] hover:underline flex items-center gap-1"
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
                  <div className="bg-white rounded-xl p-8 text-center border border-[var(--dq-surface-border-default)]">
                    <div className="w-16 h-16 bg-[var(--dq-navy-50)] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-[var(--dq-navy-950)]" />
                    </div>
                    <h3 className="text-[20px] leading-[28px] font-medium mb-2">No courses yet</h3>
                    <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-6">Start your learning journey by exploring our digital transformation courses</p>
                    <Link to="/courses">
                      <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white">Explore Courses</Button>
                    </Link>
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
                          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[var(--dq-surface-border-default)]"
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
                            <h4 className="text-[16px] leading-[24px] font-medium mb-2 line-clamp-2 group-hover:text-[var(--dq-orange-500)] transition-colors">
                              {enrollment.course?.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-4">
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
                      <Sparkles className="w-5 h-5 text-[var(--dq-orange-500)]" />
                      <h3 className="text-[20px] leading-[28px] font-medium text-foreground">Recommended for You</h3>
                    </div>
                    <Link to="/courses" className="text-[14px] leading-[20px] font-normal text-[var(--dq-orange-500)] hover:underline flex items-center gap-1">
                      View all <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {recommendedCourses.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-[var(--dq-orange-500)]" />
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Carousel Container */}
                      <div className="overflow-hidden">
                        <div className="flex gap-6 transition-transform duration-300" style={{
                          transform: `translateX(-${carouselIndex * (100 / 3)}%)`
                        }}>
                          {recommendedCourses.map((course) => (
                            <div key={course.id} className="flex-shrink-0 w-1/3">
                              <Link
                                to={course.comingSoon ? '#' : `/courses/${course.id}`}
                                onClick={(e) => course.comingSoon && e.preventDefault()}
                                className={`group bg-white rounded-xl overflow-hidden shadow-sm transition-all h-full flex flex-col border border-[var(--dq-surface-border-default)] ${
                                  course.comingSoon ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md hover:shadow-[var(--dq-orange-500)]/20'
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
                                      <Badge className="bg-[var(--dq-orange-500)] text-white capitalize">
                                        {course.badge}
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                  <h4 className="text-[16px] leading-[24px] font-medium mb-2 line-clamp-2 group-hover:text-[var(--dq-orange-500)] transition-colors">
                                    {course.title}
                                  </h4>
                                  <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-4 line-clamp-2 flex-1">
                                    {course.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">
                                      <Clock className="w-4 h-4" />
                                      <span>{course.duration}</span>
                                    </div>
                                    <Badge
                                      className={course.comingSoon ? 'bg-[var(--dq-gray-100)] text-[var(--dq-text-tertiary)]' : ''}
                                      variant={course.comingSoon ? 'default' : 'secondary'}
                                    >
                                      {course.comingSoon ? 'Coming Soon' : course.level}
                                    </Badge>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      {recommendedCourses.length > 3 && (
                        <div className="flex gap-2 mt-6 justify-center">
                          <button
                            onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                            disabled={carouselIndex === 0}
                            className="p-2 rounded-lg bg-[var(--dq-gray-100)] hover:bg-[var(--dq-gray-200)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Previous"
                          >
                            <ChevronLeft className="w-5 h-5 text-[var(--dq-text-primary)]" />
                          </button>
                          
                          {/* Dots Indicator */}
                          <div className="flex gap-2 items-center px-4">
                            {Array.from({ length: Math.ceil(recommendedCourses.length / 3) }).map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCarouselIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  idx === carouselIndex ? 'bg-[var(--dq-orange-500)]' : 'bg-[var(--dq-gray-300)]'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                              />
                            ))}
                          </div>

                          <button
                            onClick={() => setCarouselIndex(Math.min(Math.ceil(recommendedCourses.length / 3) - 1, carouselIndex + 1))}
                            disabled={carouselIndex >= Math.ceil(recommendedCourses.length / 3) - 1}
                            className="p-2 rounded-lg bg-[var(--dq-gray-100)] hover:bg-[var(--dq-gray-200)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Next"
                          >
                            <ChevronRight className="w-5 h-5 text-[var(--dq-text-primary)]" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )}

              {/* Recent Certificates */}
              {certificates && certificates.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[20px] leading-[28px] font-medium text-foreground">Recent Certificates</h3>
                    <button 
                      onClick={() => setActiveTab('certificates')}
                      className="text-[14px] leading-[20px] font-normal text-[var(--dq-orange-500)] hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {certificates.slice(0, 2).map((cert: any) => (
                      <div key={cert.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 border border-[var(--dq-surface-border-default)]">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shrink-0">
                          <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[16px] leading-[24px] font-medium truncate">{cert.course?.title}</h4>
                          <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">
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
            <div className="space-y-8">
              <Tabs defaultValue="in-progress" className="w-full">
                <TabsList className="mb-6">
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
                    <div className="bg-white rounded-xl p-12 text-center border border-[var(--dq-surface-border-default)]">
                      <BookOpen className="w-12 h-12 text-[var(--dq-text-tertiary)] mx-auto mb-4" />
                      <h3 className="text-[20px] leading-[28px] font-medium mb-2">No courses in progress</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-6">Enroll in a course to start learning</p>
                      <Link to="/courses">
                        <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white">Browse Courses</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inProgressCourses.map((enrollment) => {
                        // Find the actual course data to get the correct image
                        const courseData = dtmaCourses.find(c => c.id === enrollment.course_id);
                        const courseImage = courseData?.image || enrollment.course?.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                        
                        return (
                          <div key={enrollment.id} className="bg-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-5 border border-[var(--dq-surface-border-default)]">
                            <img
                              src={courseImage}
                              alt={enrollment.course?.title}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h3 className="text-[20px] leading-[28px] font-medium mb-1">{enrollment.course?.title}</h3>
                                  <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] line-clamp-2">
                                    {enrollment.course?.short_description}
                                  </p>
                                </div>
                                <Badge variant="secondary">{enrollment.course?.level}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-4">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {enrollment.course?.duration_hours || 0}h
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Enrolled {formatDate(enrollment.enrolled_at)}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <Progress value={enrollment.progress || 0} className="flex-1 h-2" />
                                <span className="text-[14px] leading-[20px] font-medium">{enrollment.progress || 0}%</span>
                                <Link to={`/courses/${enrollment.course_id}/learn`}>
                                  <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white" size="sm">
                                    <PlayCircle className="w-4 h-4 mr-2" />
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
                    <div className="bg-white rounded-xl p-12 text-center border border-[var(--dq-surface-border-default)]">
                      <GraduationCap className="w-12 h-12 text-[var(--dq-text-tertiary)] mx-auto mb-4" />
                      <h3 className="text-[20px] leading-[28px] font-medium mb-2">No completed courses yet</h3>
                      <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">Complete your first course to earn a certificate!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {completedCourses.map((enrollment) => {
                        // Find the actual course data to get the correct image
                        const courseData = dtmaCourses.find(c => c.id === enrollment.course_id);
                        const courseImage = courseData?.image || enrollment.course?.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                        
                        return (
                          <div key={enrollment.id} className="bg-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-5 border border-[var(--dq-surface-border-default)]">
                            <img
                              src={courseImage}
                              alt={enrollment.course?.title}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h3 className="text-[20px] leading-[28px] font-medium mb-1">{enrollment.course?.title}</h3>
                                  <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)]">
                                    Completed on {enrollment.completed_at ? formatDate(enrollment.completed_at) : 'N/A'}
                                  </p>
                                </div>
                                <Badge className="bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] border-[var(--dq-success)]/20">
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

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              {certificatesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : !certificates || certificates.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-[var(--dq-surface-border-default)]">
                  <div className="w-20 h-20 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-[var(--dq-orange-500)]" />
                  </div>
                  <h3 className="text-[20px] leading-[28px] font-medium mb-2">No certificates yet</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-6 max-w-md mx-auto">
                    Complete a course to earn your first certificate. Certificates showcase your achievements and newly acquired skills.
                  </p>
                  {inProgressCourses.length > 0 ? (
                    <Link to={`/courses/${inProgressCourses[0].course_id}/learn`}>
                      <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white">Continue Learning</Button>
                    </Link>
                  ) : (
                    <Link to="/courses">
                      <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white">Explore Courses</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert: any) => (
                    <div key={cert.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--dq-surface-border-default)]">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <Award className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-[12px] leading-[16px] font-medium text-white/80 mb-1">Certificate of Completion</p>
                            <h3 className="text-[20px] leading-[28px] font-medium">{cert.course?.title}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-1">Issue Date</p>
                            <p className="text-[16px] leading-[24px] font-normal">{formatDate(cert.issued_at)}</p>
                          </div>
                          <div>
                            <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-tertiary)] mb-1">Certificate ID</p>
                            <p className="text-[14px] leading-[20px] font-normal font-mono">{cert.certificate_number}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
        </div>
      </main>

      {/* Transact AI - Personal Mentor (Floating Widget) */}
      <TransactAI
        enrolledCourses={enrollments?.length || 0}
        completedCourses={completedCourses.length}
        averageProgress={totalProgress}
        learningGoal={onboardingData?.learningGoal || ''}
        skillLevel={onboardingData?.skillLevel || 'Beginner'}
        streak={0}
      />
    </div>
  );
};

export default LearnerDashboard;
