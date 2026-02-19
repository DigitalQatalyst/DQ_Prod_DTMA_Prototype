import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments, useCertificates, useCourses, Course } from '@/hooks/useCourses';
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
  GraduationCap, 
  Loader2,
  PlayCircle,
  Download,
  User,
  LogOut,
  Settings,
  Home,
  Menu,
  X,
  Trophy,
  Target,
  Calendar,
  CheckCircle,
  ExternalLink,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface OnboardingData {
  learningGoal: string;
  skillLevel: string;
  preferredFormat: string;
}

const LearnerDashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments();
  const { data: certificates, isLoading: certificatesLoading } = useCertificates();
  const { data: allCourses, isLoading: coursesLoading } = useCourses();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get booked masterclass sessions from localStorage
  const bookedSessions = useMemo(() => {
    const bookings = JSON.parse(localStorage.getItem('masterclass_bookings') || '[]');
    return bookings.sort((a: any, b: any) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
  }, []);

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
    if (!allCourses || !onboardingData) return [];

    const enrolledCourseIds = new Set(enrollments?.map(e => e.course_id) || []);
    
    // Map skill level to course level
    const skillLevelMap: Record<string, string> = {
      'Beginner': 'beginner',
      'Intermediate': 'intermediate',
      'Advanced': 'advanced',
    };

    const targetLevel = skillLevelMap[onboardingData.skillLevel] || 'beginner';

    // Map learning goals to course categories
    const goalToCategoryMap: Record<string, string[]> = {
      'Career advancement in beauty': ['Hair Styling', 'Makeup', 'Skincare', 'Nail Artistry'],
      'Start my own beauty business': ['Business', 'Entrepreneurship', 'Hair Styling', 'Makeup'],
      'Learn new beauty techniques': ['Hair Styling', 'Makeup', 'Skincare', 'Nail Artistry'],
      'Professional certification': ['Certification', 'Hair Styling', 'Makeup', 'Skincare'],
      'Personal skill development': ['Hair Styling', 'Makeup', 'Skincare', 'Nail Artistry'],
      'Career change to beauty industry': ['Hair Styling', 'Makeup', 'Skincare', 'Nail Artistry'],
    };

    const targetCategories = goalToCategoryMap[onboardingData.learningGoal] || [];

    // Score courses based on multiple criteria
    const scoredCourses = allCourses
      .filter(course => !enrolledCourseIds.has(course.id))
      .map(course => {
        let score = 0;

        // Skill level match (highest priority)
        if (course.level === targetLevel) {
          score += 50;
        } else if (
          (targetLevel === 'beginner' && course.level === 'intermediate') ||
          (targetLevel === 'intermediate' && (course.level === 'beginner' || course.level === 'advanced')) ||
          (targetLevel === 'advanced' && course.level === 'intermediate')
        ) {
          score += 25; // Partial match for adjacent levels
        }

        // Category match (medium priority)
        if (targetCategories.includes(course.category)) {
          score += 30;
        }

        // Format preference match (lower priority)
        if (onboardingData.preferredFormat === 'self-paced' && course.format === 'self-paced') {
          score += 15;
        } else if (onboardingData.preferredFormat === 'live-classes' && course.format === 'live') {
          score += 15;
        } else if (onboardingData.preferredFormat === 'cohort-based' && course.format === 'cohort') {
          score += 15;
        }

        // Popularity bonus (new courses get a small boost)
        if (course.badge === 'New') {
          score += 10;
        }

        return { course, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ course }) => course);

    return scoredCourses;
  }, [allCourses, onboardingData, enrollments]);

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
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-card border-r border-border transition-transform duration-200 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/log.svg"
              alt="BROWZ Academy"
              className="h-[50px] w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'courses' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">My Courses</span>
              {inProgressCourses.length > 0 && (
                <Badge className="ml-auto bg-primary/20 text-primary-foreground">{inProgressCourses.length}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'certificates' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="font-medium">Certificates</span>
              {certificates && certificates.length > 0 && (
                <Badge className="ml-auto bg-primary/20 text-primary-foreground">{certificates.length}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'sessions' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">My Sessions</span>
              {bookedSessions.length > 0 && (
                <Badge className="ml-auto bg-primary/20 text-primary-foreground">{bookedSessions.length}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
            <Avatar className="w-10 h-10">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{profile?.full_name || 'Learner'}</p>
              <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-3 justify-start gap-3 text-muted-foreground"
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
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border px-4 lg:px-8 h-16 flex items-center justify-between">
          <button 
            className="lg:hidden p-2 -ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-foreground">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'courses' && 'My Courses'}
              {activeTab === 'certificates' && 'Certificates'}
              {activeTab === 'sessions' && 'My Sessions'}
              {activeTab === 'profile' && 'Profile Settings'}
            </h1>
          </div>

          <Link to="/categories">
            <Button variant="outline" size="sm" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Courses
            </Button>
          </Link>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 lg:p-8 text-primary-foreground">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
                      Welcome back, {profile?.full_name?.split(' ')[0] || 'Learner'}! 👋
                    </h2>
                    <p className="text-primary-foreground/80">
                      {inProgressCourses.length > 0 
                        ? `You have ${inProgressCourses.length} course${inProgressCourses.length > 1 ? 's' : ''} in progress. Keep going!`
                        : 'Start your beauty education journey today!'}
                    </p>
                  </div>
                  {inProgressCourses.length > 0 && (
                    <Link to={`/courses/${inProgressCourses[0].course_id}/learn`}>
                      <Button variant="secondary" size="lg" className="gap-2 shrink-0">
                        <PlayCircle className="w-5 h-5" />
                        Continue Learning
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-card rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{inProgressCourses.length}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="bg-card rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{completedCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="bg-card rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{certificates?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
                <div className="bg-card rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{totalProgress}%</div>
                  <div className="text-sm text-muted-foreground">Avg. Progress</div>
                </div>
              </div>

              {/* Continue Learning */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Continue Learning</h3>
                  {inProgressCourses.length > 0 && (
                    <button 
                      onClick={() => setActiveTab('courses')}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
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
                  <div className="bg-card rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No courses yet</h3>
                    <p className="text-muted-foreground mb-6">Start your learning journey by exploring our beauty courses</p>
                    <Link to="/categories">
                      <Button variant="hero">Explore Courses</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {inProgressCourses.slice(0, 3).map((enrollment) => (
                      <Link
                        key={enrollment.id}
                        to={`/courses/${enrollment.course_id}/learn`}
                        className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                      >
                        <div className="relative">
                          <img
                            src={enrollment.course?.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'}
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
                          <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {enrollment.course?.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Clock className="w-4 h-4" />
                            <span>{enrollment.course?.duration_hours || 0} hours</span>
                          </div>
                          <Progress value={enrollment.progress || 0} className="h-2" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {/* Recommended Courses */}
              {onboardingData && recommendedCourses.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">Recommended for You</h3>
                    </div>
                    <Link to="/categories" className="text-sm text-primary hover:underline flex items-center gap-1">
                      View all <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {coursesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {recommendedCourses.map((course) => (
                        <Link
                          key={course.id}
                          to={`/courses/${course.id}`}
                          className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                        >
                          <div className="relative">
                            <img
                              src={course.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'}
                              alt={course.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            {course.badge && (
                              <div className="absolute top-3 right-3">
                                <Badge className="bg-primary text-primary-foreground capitalize">
                                  {course.badge}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {course.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {course.short_description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration_hours} hours</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Recent Certificates */}
              {certificates && certificates.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Recent Certificates</h3>
                    <button 
                      onClick={() => setActiveTab('certificates')}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {certificates.slice(0, 2).map((cert: any) => (
                      <div key={cert.id} className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shrink-0">
                          <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{cert.course?.title}</h4>
                          <p className="text-sm text-muted-foreground">
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
                    <div className="bg-card rounded-2xl p-12 text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No courses in progress</h3>
                      <p className="text-muted-foreground mb-6">Enroll in a course to start learning</p>
                      <Link to="/categories">
                        <Button variant="hero">Browse Courses</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inProgressCourses.map((enrollment) => (
                        <div key={enrollment.id} className="bg-card rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-5">
                          <img
                            src={enrollment.course?.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'}
                            alt={enrollment.course?.title}
                            className="w-full md:w-48 h-32 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{enrollment.course?.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {enrollment.course?.short_description}
                                </p>
                              </div>
                              <Badge variant="secondary">{enrollment.course?.level}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                              <span className="text-sm font-medium">{enrollment.progress || 0}%</span>
                              <Link to={`/courses/${enrollment.course_id}/learn`}>
                                <Button variant="hero" size="sm" className="gap-2">
                                  <PlayCircle className="w-4 h-4" />
                                  Continue
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed">
                  {completedCourses.length === 0 ? (
                    <div className="bg-card rounded-2xl p-12 text-center">
                      <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No completed courses yet</h3>
                      <p className="text-muted-foreground">Complete your first course to earn a certificate!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {completedCourses.map((enrollment) => (
                        <div key={enrollment.id} className="bg-card rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-5">
                          <img
                            src={enrollment.course?.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'}
                            alt={enrollment.course?.title}
                            className="w-full md:w-48 h-32 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{enrollment.course?.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Completed on {enrollment.completed_at ? formatDate(enrollment.completed_at) : 'N/A'}
                                </p>
                              </div>
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
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
                      ))}
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
                <div className="bg-card rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">No certificates yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Complete a course to earn your first certificate. Certificates showcase your achievements and newly acquired skills.
                  </p>
                  {inProgressCourses.length > 0 ? (
                    <Link to={`/courses/${inProgressCourses[0].course_id}/learn`}>
                      <Button variant="hero">Continue Learning</Button>
                    </Link>
                  ) : (
                    <Link to="/categories">
                      <Button variant="hero">Explore Courses</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert: any) => (
                    <div key={cert.id} className="bg-card rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Award className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-white/80 text-sm mb-1">Certificate of Completion</p>
                            <h3 className="font-semibold text-lg">{cert.course?.title}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                            <p className="font-medium">{formatDate(cert.issued_at)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                            <p className="font-medium font-mono text-sm">{cert.certificate_number}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="hero" className="flex-1 gap-2">
                            <Download className="w-4 h-4" />
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

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Upcoming Training Sessions</h2>
                <Link to="/masterclasses">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Browse More Sessions
                  </Button>
                </Link>
              </div>

              {bookedSessions.length === 0 ? (
                <div className="bg-card rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No sessions booked yet</h3>
                  <p className="text-muted-foreground mb-6">Explore our in-person masterclasses and book your first session</p>
                  <Link to="/masterclasses">
                    <Button variant="hero">Browse Sessions</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookedSessions.map((session: any) => (
                    <div key={session.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{session.sessionTitle}</h3>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {session.sessionDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {session.sessionLocation}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 shrink-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Confirmation #</p>
                              <p className="font-mono text-sm font-medium">{session.confirmationNumber}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Price Paid</p>
                              <p className="font-semibold text-primary">${session.price}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Booked On</p>
                              <p className="text-sm">{formatDate(session.bookingDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Status</p>
                              <p className="text-sm capitalize">{session.status}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:w-40">
                          <Link to={`/masterclasses/${session.sessionId}`}>
                            <Button variant="outline" className="w-full gap-2">
                              <ExternalLink className="w-4 h-4" />
                              View Details
                            </Button>
                          </Link>
                          <Button variant="ghost" className="w-full gap-2">
                            <Download className="w-4 h-4" />
                            Download Ticket
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
            <div className="max-w-2xl space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-6">Profile Information</h3>
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(profile?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-xl">{profile?.full_name || 'Learner'}</h4>
                    <p className="text-muted-foreground">{profile?.email}</p>
                    <Badge className="mt-2">Learner</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-accent/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">{profile?.full_name || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{profile?.email}</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{profile?.phone || 'Not set'}</p>
                    </div>
                  </div>
                  
                  {profile?.bio && (
                    <div className="p-4 bg-accent/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Bio</p>
                      <p className="font-medium">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Learning Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-accent/50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{enrollments?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Total Courses</div>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-500">{completedCourses.length}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-xl">
                    <div className="text-2xl font-bold text-amber-500">{certificates?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Certificates</div>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-500">{totalProgress}%</div>
                    <div className="text-sm text-muted-foreground">Avg. Progress</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearnerDashboard;
