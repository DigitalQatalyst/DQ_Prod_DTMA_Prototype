import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/contexts/AuthContext";
import { useFlow } from "@/contexts/FlowContext";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

type SignInRole = "learner" | "instructor" | "admin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const { flow } = useFlow();
  const exploreRef = useRef<HTMLDivElement>(null);
  const forYouRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setIsExploreOpen(false);
      }
      if (forYouRef.current && !forYouRef.current.contains(event.target as Node)) {
        setIsForYouOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Disable body scroll when dropdown is open
  useEffect(() => {
    if (isExploreOpen || isForYouOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExploreOpen, isForYouOpen]);

  const navLinks: { href: string; label: string }[] = [];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleSignIn = () => {
    const path = flow === "provider" ? "/auth/instructor" : "/auth";
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e2348]/20 backdrop-blur-md">
      <nav className="w-full relative">
        <div className="flex items-center w-full px-8 md:px-12 lg:px-16 py-3 gap-8 lg:gap-16 xl:gap-24" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Left: Logo Area */}
          <div className="flex items-center flex-shrink-0 gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/dtma-logo.png"
                alt="DTMA"
                className="h-[40px] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="h-[40px] w-[1px] bg-white/20"></div>
          </div>

          {/* Right: Single Row with Nav Links and Auth */}
          <div className="flex items-center justify-between flex-grow">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium transition-colors duration-200 text-white hover:text-white">
                  Home
                </Link>
                
                {/* Explore Dropdown */}
                <div className="relative" ref={exploreRef}>
                  <button 
                    onClick={() => {
                      setIsExploreOpen(!isExploreOpen);
                      setIsForYouOpen(false);
                    }}
                    className="text-sm font-medium transition-colors duration-200 hover:text-white text-white/90 flex items-center gap-1"
                  >
                    Explore Courses
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Full Screen Overlay Dropdown */}
                  {isExploreOpen && (
                    <div className="fixed left-0 right-0 top-[80px] z-[9999] bg-white border-t border-b pointer-events-none" style={{ height: 'calc(100vh - 80px)', borderColor: '#EEEDE9' }}>
                      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12 pointer-events-auto">
                        <div className="mb-8">
                          <h2 className="text-2xl font-semibold text-[#1e2348] mb-2">6XD Framework Courses</h2>
                          <p className="text-sm text-muted-foreground">Master the six dimensions of digital transformation</p>
                        </div>
                        
                        {/* First Row - 3 Courses */}
                        <div className="grid grid-cols-3 gap-8 mb-8">
                          {/* Course 1: Economy 4.0 */}
                          <Link to="/courses/course-economy-40" className="group">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all">
                              <h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[#ff6b4d] transition-colors">Mastering Economy 4.0</h3>
                              <p className="text-sm text-muted-foreground">Master the fundamentals of the digital economy and Economy 4.0</p>
                            </div>
                          </Link>

                          {/* Course 2: Cognitive Organisations */}
                          <Link to="/courses/course-cognitive-org" className="group">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all">
                              <h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[#ff6b4d] transition-colors">Decoding Digital Cognitive Organisations</h3>
                              <p className="text-sm text-muted-foreground">Transform your organization into an intelligent, learning entity</p>
                            </div>
                          </Link>

                          {/* Course 3: Business Platforms */}
                          <Link to="/courses/course-business-platforms" className="group">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all">
                              <h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[#ff6b4d] transition-colors">Building Powerful Digital Business Platforms</h3>
                              <p className="text-sm text-muted-foreground">Master the architecture and design of scalable digital platforms</p>
                            </div>
                          </Link>
                        </div>

                        {/* Second Row - 3 Courses */}
                        <div className="grid grid-cols-3 gap-8">
                          {/* Course 4: Digital Transformation */}
                          <Link to="/courses/course-transformation" className="group">
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-all">
                              <h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[#ff6b4d] transition-colors">Navigating Digital Transformation 2.0</h3>
                              <p className="text-sm text-muted-foreground">Lead successful digital transformation initiatives</p>
                            </div>
                          </Link>

                          {/* Course 5: Digital Workers */}
                          <Link to="/courses/course-digital-workers" className="group">
                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 hover:shadow-lg transition-all">
                              <h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[#ff6b4d] transition-colors">Optimizing Digital Workers and Workspaces</h3>
                              <p className="text-sm text-muted-foreground">Master tools and practices for modern digital work</p>
                            </div>
                          </Link>

                          {/* Course 6: Digital Accelerators */}
                          <Link to="/courses/course-digital-accelerators" className="group">
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 hover:shadow-lg transition-all">
                              <h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[#ff6b4d] transition-colors">Leveraging Digital Accelerators for Growth</h3>
                              <p className="text-sm text-muted-foreground">Harness AI, blockchain, IoT, and automation</p>
                            </div>
                          </Link>
                        </div>

                        {/* View All Link */}
                        <div className="mt-8 text-center">
                          <Link to="/courses" className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-sm transition-colors inline-flex items-center gap-2">
                            View All Courses
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* For You Dropdown */}
                <div className="relative" ref={forYouRef}>
                  <button 
                    onClick={() => {
                      setIsForYouOpen(!isForYouOpen);
                      setIsExploreOpen(false);
                    }}
                    className="text-sm font-medium transition-colors duration-200 hover:text-white text-white/90 flex items-center gap-1"
                  >
                    For You
                    <ChevronDown className={`w-4 h-4 transition-transform ${isForYouOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isForYouOpen && (
                    <div className="absolute left-0 mt-6 w-64 bg-white border shadow-lg rounded-xl z-[9999] py-4 pointer-events-auto" style={{ borderColor: '#EEEDE9' }}>
                      <div className="px-6 py-2">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Choose Your Path</h3>
                        <ul className="space-y-3">
                          <li><Link to="/personas/digital-workers" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Workers</Link></li>
                          <li><Link to="/personas/organizational-leaders" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Organizational Leaders</Link></li>
                          <li><Link to="/personas/transformation-specialists" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Transformation Specialists</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-white ${
                      isActive(link.href) ? "text-white" : "text-white/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            {/* Auth / Right Side Actions */}
            <div className="hidden md:flex items-center gap-6">
              {!loading && user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white/80 hover:bg-white/10">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1e2348] flex items-center justify-center text-xs font-semibold text-white">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:text-white/80 hover:bg-white/10">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSignIn}
                    className="text-sm font-semibold transition-colors duration-200 hover:text-white text-white/90"
                  >
                    Log In
                  </button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    onClick={handleSignIn}
                    className="px-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button
                className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {/* Explore Dropdown Mobile */}
              <div>
                <button
                  onClick={() => setIsExploreOpen(!isExploreOpen)}
                  className="text-base font-medium py-2 transition-colors text-muted-foreground hover:text-primary flex items-center gap-2 w-full"
                >
                  Explore
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isExploreOpen && (
                  <div className="pl-4 space-y-3 mt-3 border-l-2 border-primary/30">
                    <Link
                      to="/categories"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsExploreOpen(false);
                      }}
                    >
                      Course Categories
                    </Link>
                    <Link
                      to="/masterclasses"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsExploreOpen(false);
                      }}
                    >
                      In-Person Trainings
                    </Link>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-base font-medium py-2 transition-colors ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {!loading && user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="hero" 
                    className="w-full px-6"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
