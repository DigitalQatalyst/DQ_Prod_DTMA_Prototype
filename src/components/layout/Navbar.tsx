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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e8e8ec]">
      <nav className="w-full relative">
        <div className="flex items-center justify-between w-full px-6 md:px-10 lg:px-16 py-2.5" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Left: Logo + Nav links grouped together */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/log.svg"
                alt="DTMA"
                className="h-[26px] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Nav Links — right next to logo */}
            <div className="hidden md:flex items-center gap-5">
                
                {/* Explore Dropdown */}
                <div className="relative" ref={exploreRef}>
                  <button 
                    onClick={() => {
                      setIsExploreOpen(!isExploreOpen);
                      setIsForYouOpen(false);
                    }}
                    className="text-sm font-medium transition-colors duration-200 hover:text-[#ff4500] text-[#0a0f1e] flex items-center gap-1"
                  >
                    Explore Courses
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Full Screen Overlay Dropdown */}
                  {isExploreOpen && (
                    <div className="fixed left-0 right-0 top-[48px] z-[9999] bg-white border-t border-[#e8e8ec] shadow-lg pointer-events-none">
                      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-10 pointer-events-auto">
                        {/* Header */}
                        <div className="flex items-end justify-between mb-8 border-b border-[#e8e8ec] pb-6">
                          <div>
                            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-2">6XD Framework</p>
                            <h2 className="text-[28px] font-bold text-[#0a0f1e]">Explore Courses</h2>
                          </div>
                          <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#ff4500] hover:text-[#cc3700] transition-colors"
                            onClick={() => setIsExploreOpen(false)}
                          >
                            View All Courses
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>

                        {/* Course grid */}
                        <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                          {[
                            { num: "01", to: "/courses/course-economy-40", title: "Mastering Economy 4.0", desc: "Master the fundamentals of the digital economy and Economy 4.0" },
                            { num: "02", to: "/courses/course-cognitive-org", title: "Decoding Digital Cognitive Organisations", desc: "Transform your organization into an intelligent, learning entity" },
                            { num: "03", to: "/courses/course-business-platforms", title: "Building Powerful Digital Business Platforms", desc: "Master the architecture and design of scalable digital platforms" },
                            { num: "04", to: "/courses/course-transformation", title: "Navigating Digital Transformation 2.0", desc: "Lead successful digital transformation initiatives" },
                            { num: "05", to: "/courses/course-digital-workers", title: "Optimizing Digital Workers and Workspaces", desc: "Master tools and practices for modern digital work" },
                            { num: "06", to: "/courses/course-digital-accelerators", title: "Leveraging Digital Accelerators for Growth", desc: "Harness AI, blockchain, IoT, and automation" },
                          ].map((course) => (
                            <Link
                              key={course.num}
                              to={course.to}
                              className="group flex gap-4 items-start py-2 hover:bg-[#f5f4f0] rounded-xl px-3 transition-colors"
                              onClick={() => setIsExploreOpen(false)}
                            >
                              <span className="text-[22px] font-bold text-[#e8e8ec] leading-none mt-0.5 flex-shrink-0 w-8">{course.num}</span>
                              <div>
                                <h3 className="text-[14px] font-semibold text-[#0a0f1e] mb-1 group-hover:text-[#ff4500] transition-colors leading-snug">{course.title}</h3>
                                <p className="text-[13px] text-[#9a9aaa] leading-relaxed">{course.desc}</p>
                              </div>
                            </Link>
                          ))}
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
                    className="text-sm font-medium transition-colors duration-200 hover:text-[#ff4500] text-[#0a0f1e] flex items-center gap-1"
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
                      <div className="px-6 py-2 border-t border-[#EEEDE9] mt-2">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Resources</h3>
                        <ul className="space-y-3">
                          <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Blog & Insights</Link></li>
                          <li><Link to="/help" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Help Center</Link></li>
                          <li><Link to="/accreditation" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Accreditation</Link></li>
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
            </div>

          {/* Right: Auth */}
          <div className="hidden md:flex items-center gap-3">
              {!loading && user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2 text-[#0a0f1e] hover:text-[#ff4500] hover:bg-[#f5f4f0]">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0a0f1e] flex items-center justify-center text-xs font-semibold text-white">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-[#0a0f1e] hover:text-[#ff4500] hover:bg-[#f5f4f0]">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSignIn}
                    className="text-[13px] font-medium px-4 py-1.5 border-2 border-[#0a0f1e] rounded-full hover:bg-[#0a0f1e] hover:text-white text-[#0a0f1e] transition-colors"
                  >
                    Log In
                  </button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    onClick={handleSignIn}
                    className="px-4 py-1.5 bg-[#ff4500] hover:bg-[#cc3700] text-white border-transparent rounded-full text-[13px] font-medium h-auto"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button
                className="p-1 rounded-lg hover:bg-[#f5f4f0] transition-colors text-[#0a0f1e]"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
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

              {/* For You Dropdown Mobile */}
              <div>
                <button
                  onClick={() => setIsForYouOpen(!isForYouOpen)}
                  className="text-base font-medium py-2 transition-colors text-muted-foreground hover:text-primary flex items-center gap-2 w-full"
                >
                  For You
                  <ChevronDown className={`w-4 h-4 transition-transform ${isForYouOpen ? 'rotate-180' : ''}`} />
                </button>
                {isForYouOpen && (
                  <div className="pl-4 space-y-3 mt-3 border-l-2 border-primary/30">
                    <Link
                      to="/personas/digital-workers"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsForYouOpen(false);
                      }}
                    >
                      Digital Workers
                    </Link>
                    <Link
                      to="/personas/organizational-leaders"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsForYouOpen(false);
                      }}
                    >
                      Organizational Leaders
                    </Link>
                    <Link
                      to="/personas/transformation-specialists"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsForYouOpen(false);
                      }}
                    >
                      Transformation Specialists
                    </Link>
                    <div className="border-t border-primary/30 pt-3 mt-3">
                      <Link
                        to="/blog"
                        className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                        onClick={() => {
                          setIsOpen(false);
                          setIsForYouOpen(false);
                        }}
                      >
                        Blog & Insights
                      </Link>
                      <Link
                        to="/help"
                        className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                        onClick={() => {
                          setIsOpen(false);
                          setIsForYouOpen(false);
                        }}
                      >
                        Help Center
                      </Link>
                      <Link
                        to="/accreditation"
                        className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                        onClick={() => {
                          setIsOpen(false);
                          setIsForYouOpen(false);
                        }}
                      >
                        Accreditation
                      </Link>
                    </div>
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
